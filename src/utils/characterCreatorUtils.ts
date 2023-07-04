import {
  CHARACTER_CREATOR_PAGES,
  CharacterBackgroundForm,
  CharacterClassForm,
  CharacterCreatorForm,
  CharacterEquipmentForm,
} from 'constants/characterCreator';
import { concat, entries, get, identity, size, values } from 'lodash';
import memoizeOne from 'memoize-one';
import {
  CharacterCreatorValidation,
  CharacterCreatorValidationType,
  appendSourceToMap,
  mergeAllProficiencies,
  mergeAllStatBlocks,
  mergeInventoryItems,
  mergeProficiencies,
  parseCreateConfig,
  parseCreateConfigs,
} from './characterCreator/ccParserUtils';
import { RaceConfigsCreateConfig } from 'constants/raceTypes';
import { RACE_CONFIGS } from 'constants/race';
import { STATS_CONFIGS, STATS_LIST } from 'constants/stats';
import { joinAndStrings } from './stringUtils';
import { CharacterSheetPath } from 'constants/characterSheetPaths';
import { CLASS_CONFIGS } from 'constants/classConfigs';
import { ALIGNMENTS } from 'constants/alignments';
import { ADVANTAGE_TOGGLE } from 'constants/advantageToggle';
import { WHISPER_TOGGLE } from 'constants/whisperToggle';
import { SKILL_SORT } from 'constants/skills';
import { MONEY } from 'constants/money';
import { InventoryItem } from 'constants/inventory';

const calcFinalBackground = (
  background: CharacterBackgroundForm,
): [any, Array<CharacterCreatorValidation>] => {
  const { name, specialFeature, summary, config } = background;
  const nonConfigValidations: Array<CharacterCreatorValidation> = [];

  if (!name) {
    nonConfigValidations.push({
      type: CharacterCreatorValidationType.REQUIRED,
      text: 'Missing background name',
    });
  }

  if (!summary) {
    nonConfigValidations.push({
      type: CharacterCreatorValidationType.WARNING,
      text: 'No background description provided',
    });
  }

  if (!specialFeature?.label && !specialFeature?.description) {
    nonConfigValidations.push({
      type: CharacterCreatorValidationType.WARNING,
      text: 'No Special Feature provided',
    });
  } else if (!specialFeature?.description) {
    nonConfigValidations.push({
      type: CharacterCreatorValidationType.WARNING,
      text: 'No Special Feature description provided',
    });
  } else if (!specialFeature?.label) {
    nonConfigValidations.push({
      type: CharacterCreatorValidationType.WARNING,
      text: 'No Special Feature name provided',
    });
  }

  const [result, validations] = parseCreateConfigs(config);

  result.skills = appendSourceToMap(result.skills, 'Background');

  return [
    {
      name,
      summary,
      ...result,
    },
    [...nonConfigValidations, ...validations],
  ];
};

const calcFinalClass = (
  rawClass: CharacterClassForm,
): [any, Array<CharacterCreatorValidation>] => {
  const { value, static: staticConfigs = [], config = [] } = rawClass;

  if (!value) {
    return [
      {},
      [
        {
          type: CharacterCreatorValidationType.REQUIRED,
          text: 'Missing class selection',
        },
      ],
    ];
  }
  const [result, validations] = parseCreateConfigs([
    ...staticConfigs,
    ...config,
  ]);

  result.skills = appendSourceToMap(
    result.skills,
    CLASS_CONFIGS[value]?.label || 'Class',
  );

  return [
    {
      class: value,
      ...result,
    },
    validations,
  ];
};
const calcFinalEquipment = (
  equipment: CharacterEquipmentForm,
  curClass: string,
): [any, Array<CharacterCreatorValidation>] => {
  const { config = [] } = equipment;

  if (!curClass) {
    return [
      {},
      [
        {
          type: CharacterCreatorValidationType.REQUIRED,
          text: 'Must choose a class before selecting equipment',
        },
      ],
    ];
  }

  const [result, validations] = parseCreateConfigs(config);

  return [result, validations];
};

const calcFinalRace = (
  createConfig: RaceConfigsCreateConfig,
  selectedRace: string = '',
  selectedSubRace: string = '',
): [any, Array<CharacterCreatorValidation>] => {
  let result: any = {};

  if (!selectedRace || !RACE_CONFIGS[selectedRace]) {
    return [
      result,
      [
        {
          type: CharacterCreatorValidationType.REQUIRED,
          text: 'Missing race selection',
        },
      ],
    ];
  }

  const { base, subRace, subRaceOptions } = createConfig;

  let validations: Array<CharacterCreatorValidation> = [];
  base.forEach((c, i) =>
    parseCreateConfig(c, base, result, validations, { index: i }),
  );
  validations = validations.map(({ type, index }) => ({
    type,
    text: `Missing ${get(base, `${index}.config.header`, 'selection')} for ${
      RACE_CONFIGS[selectedRace].label
    }`,
  }));

  // if theres a subrace and it has a config, start parsing it
  if (selectedSubRace && subRace?.[selectedSubRace]) {
    const subraceValidations = [];
    subRace[selectedSubRace].forEach((c, i) =>
      parseCreateConfig(
        c,
        subRace[selectedSubRace],
        result,
        subraceValidations,
        {
          index: i,
        },
      ),
    );

    validations = concat(
      validations,
      subraceValidations.map(({ index, type }) => ({
        type,
        text: `Missing ${get(
          subRace[selectedSubRace],
          `${index}.config.header`,
          'selection',
        )} for ${RACE_CONFIGS[selectedRace].label}`,
      })),
    );
    // else if there's no valid subrace and config but it has options, mark it as required
  } else if (subRaceOptions?.length) {
    validations.push({
      type: CharacterCreatorValidationType.REQUIRED,
      text: 'Missing subrace selection',
    });
  }

  result.skills = appendSourceToMap(
    result.skills,
    RACE_CONFIGS[selectedRace]?.label || 'Race',
  );

  return [result, validations];
};

export const calcCharacterSheet = memoizeOne((form: CharacterCreatorForm) => {
  const { race, stats, bio, background, class: rawClass, equipment } = form;
  const [finalRace, raceValidations] = calcFinalRace(
    get(race, 'config', { base: [] }),
    race.value,
    race.subRace,
  );
  const [finalBackground, backgroundValidations] =
    calcFinalBackground(background);
  const [finalClass, classValidations] = calcFinalClass(rawClass);
  const [finalEquipment, equipmentValidations] = calcFinalEquipment(
    equipment,
    get(finalClass, 'class', ''),
  );
  const statEntries = entries(stats);
  const statsValidation =
    size(stats) === 6 && statEntries.every(([stat, v]) => v > 0)
      ? []
      : [
          {
            type: CharacterCreatorValidationType.REQUIRED,
            text: `Missing selection for ${joinAndStrings(
              STATS_LIST.filter((s) => (stats[s] || 0) <= 0).map(
                (s) => STATS_CONFIGS[s].label,
              ),
            )}`,
          },
        ];
  const bioValidations: Array<CharacterCreatorValidation> = [];
  const { name } = bio;
  if (!name) {
    bioValidations.push({
      type: CharacterCreatorValidationType.REQUIRED,
      text: 'Missing name',
    });
  }

  console.log(finalRace, finalClass, finalBackground);
  const result = {
    [CharacterSheetPath.name]: bio.name || 'New Character',
    [CharacterSheetPath.advantageToggle]: ADVANTAGE_TOGGLE.NORMAL,
    [CharacterSheetPath.whisperToggle]: WHISPER_TOGGLE.NORMAL,
    [CharacterSheetPath.skillSort]: SKILL_SORT.ALPHABETICAL,
    [CharacterSheetPath.levels]: {
      [finalClass.class]: {
        total: 1,
        isMain: true,
      },
    },
    [CharacterSheetPath.spellcastingAbility]:
      finalClass?.spellcastingAbility || 'NONE',
    [CharacterSheetPath.race]: {
      value: race.value,
      subRace: race.subRace,
    },
    [CharacterSheetPath.background]: {
      value: finalBackground?.name,
      label: finalBackground?.name,
      description: finalBackground?.summary,
    },
    [CharacterSheetPath.alignment]: bio.alignment || ALIGNMENTS.N,
    [CharacterSheetPath.stats]: mergeAllStatBlocks([finalRace?.stats, stats]),
    [CharacterSheetPath.savingThrows]: finalClass?.savingThrows,
    [CharacterSheetPath.skills]: mergeAllProficiencies([
      finalRace?.skills,
      finalClass?.skills,
      finalBackground?.skills,
    ]),
    [CharacterSheetPath.customChecks]: values(
      [
        ...(finalRace?.customChecks || []),
        ...(finalClass?.customChecks || []),
        ...(finalBackground?.customChecks || []),
      ].reduce((acc, cur) => {
        const label = cur.label;

        acc[label] = mergeProficiencies(acc[label] || {}, cur);

        return acc;
      }, {}),
    ),
    [CharacterSheetPath.otherProficiencies]: mergeAllProficiencies([
      finalRace?.otherProficiencies,
      finalClass?.otherProficiencies,
      finalBackground?.otherProficiencies,
    ]),
    [CharacterSheetPath.money]: {
      [MONEY.GOLD]: 25,
    },
    [CharacterSheetPath.inventory]: values(
      [
        ...(finalRace?.inventory || []),
        ...(finalClass?.inventory || []),
        ...(finalEquipment?.inventory || []),
      ].reduce((acc, cur: InventoryItem) => {
        const label = cur.label;

        acc[label] = mergeInventoryItems(acc[label] || null, cur);

        return acc;
      }, {}),
    ).filter(identity),
    bio,
    class: finalClass,
    equipment: finalEquipment,
  };

  console.log(result);

  return {
    sheet: result,
    validationsBySection: {
      [CHARACTER_CREATOR_PAGES.RACE]: raceValidations,
      [CHARACTER_CREATOR_PAGES.CLASS]: classValidations,
      [CHARACTER_CREATOR_PAGES.STATS]: statsValidation,
      [CHARACTER_CREATOR_PAGES.BACKGROUND]: backgroundValidations,
      [CHARACTER_CREATOR_PAGES.EQUIPMENT]: equipmentValidations,
      [CHARACTER_CREATOR_PAGES.BIO]: bioValidations,
    },
  };
});
