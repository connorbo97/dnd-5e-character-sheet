import {
  CHARACTER_CREATOR_PAGES,
  CHARACTER_CREATOR_PATHS,
  CharacterBackgroundForm,
  CharacterClassForm,
  CharacterCreatorForm,
  CharacterEquipmentForm,
} from 'constants/characterCreator';
import { concat, entries, get, identity, size, uniqBy, values } from 'lodash';
import memoizeOne from 'memoize-one';
import {
  CharacterCreatorValidation,
  CharacterCreatorValidationType,
  addSourceToSheet,
  getFormJointArrayByPath,
  getFormJointObjectArrayFromPath,
  getMergedCustomBonuses,
  mergeAllMoney,
  mergeAllProficiencies,
  mergeAllStatBlocks,
  mergeInventoryItems,
  mergeProficiencies,
  parseCreateConfig,
  parseCreateConfigs,
} from './characterCreator/ccParserUtils';
import { RaceConfigsCreateConfig } from 'constants/raceTypes';
import { RACE_CONFIGS } from 'constants/race';
import { STATS, STATS_CONFIGS, STATS_LIST } from 'constants/stats';
import { joinAndStrings } from './stringUtils';
import { CharacterSheetPath } from 'constants/characterSheetPaths';
import { CLASS_CONFIGS } from 'constants/classConfigs';
import { ALIGNMENTS } from 'constants/alignments';
import { ADVANTAGE_TOGGLE } from 'constants/advantageToggle';
import { WHISPER_TOGGLE } from 'constants/whisperToggle';
import { SKILL_CONFIGS, SKILL_SORT } from 'constants/skills';
import { MONEY } from 'constants/money';
import { InventoryItem } from 'constants/inventory';
import { ClassConfig } from 'constants/classes';
import { getDiceMax } from './diceUtils';
import { getModifier } from './statUtils';

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
      text: 'Missing background description',
    });
  }

  if (!specialFeature?.label && !specialFeature?.description) {
    nonConfigValidations.push({
      type: CharacterCreatorValidationType.WARNING,
      text: 'Missing Special Feature',
    });
  } else if (!specialFeature?.description) {
    nonConfigValidations.push({
      type: CharacterCreatorValidationType.WARNING,
      text: 'Missing Special Feature description',
    });
  } else if (!specialFeature?.label) {
    nonConfigValidations.push({
      type: CharacterCreatorValidationType.WARNING,
      text: 'Missing Special Feature name',
    });
  }

  const [result, validations] = parseCreateConfigs(config);

  return [
    {
      ...addSourceToSheet(result, `Background: ${name || 'Background'}`),
      name,
      summary,
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

  return [
    {
      class: value,
      ...addSourceToSheet(
        result,
        `Class: ${CLASS_CONFIGS[value]?.label || value}`,
      ),
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

  return [
    addSourceToSheet(
      result,
      `Class: ${CLASS_CONFIGS[curClass]?.label || curClass}`,
    ),
    validations,
  ];
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

  return [
    addSourceToSheet(
      result,
      `Race: ${RACE_CONFIGS[selectedRace].label}${
        selectedSubRace ? ` (${selectedSubRace})` : ''
      }`,
    ),
    validations,
  ];
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
  const selectedClass = finalClass.class;
  const [finalEquipment, equipmentValidations] = calcFinalEquipment(
    equipment,
    selectedClass,
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
  const selectedClassConfig: ClassConfig = CLASS_CONFIGS[selectedClass];

  const finalStats = mergeAllStatBlocks([finalRace?.stats, stats]);

  const forms = [
    finalRace,
    finalBackground,
    finalClass,
    finalBackground,
    finalEquipment,
  ];

  const result: { [s in CharacterSheetPath]: any } = {
    [CharacterSheetPath.name]: bio.name || 'New Character',
    [CharacterSheetPath.advantageToggle]: ADVANTAGE_TOGGLE.NORMAL,
    [CharacterSheetPath.whisperToggle]: WHISPER_TOGGLE.NORMAL,
    [CharacterSheetPath.skillSort]: SKILL_SORT.ALPHABETICAL,
    [CharacterSheetPath.profBonus]: 2,
    [CharacterSheetPath.levels]: selectedClass
      ? {
          [selectedClass]: {
            total: 1,
            isMain: true,
          },
        }
      : {},
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
    [CharacterSheetPath.stats]: finalStats || {},
    [CharacterSheetPath.savingThrows]: finalClass?.savingThrows || {},
    [CharacterSheetPath.skills]: mergeAllProficiencies(
      getFormJointObjectArrayFromPath(forms, CharacterSheetPath.skills),
    ),
    [CharacterSheetPath.customChecks]: values(
      getFormJointArrayByPath(forms, CharacterSheetPath.customChecks).reduce(
        (acc, cur) => {
          const label = cur.label;

          acc[label] = mergeProficiencies(acc[label] || {}, cur);

          return acc;
        },
        {},
      ),
    ),
    [CharacterSheetPath.resources]: getFormJointArrayByPath(
      forms,
      CharacterSheetPath.resources,
    ),
    [CharacterSheetPath.features]: getFormJointArrayByPath(
      forms,
      CharacterSheetPath.features,
    ),
    [CharacterSheetPath.otherProficiencies]: mergeAllProficiencies(
      getFormJointObjectArrayFromPath(
        forms,
        CharacterSheetPath.otherProficiencies,
      ),
    ),
    [CharacterSheetPath.money]: mergeAllMoney([
      {
        [MONEY.GOLD]: 25,
      },
      ...getFormJointArrayByPath(forms, CharacterSheetPath.money, {
        defaultValue: {},
      }),
    ]),
    [CharacterSheetPath.inventory]: values(
      getFormJointArrayByPath(forms, CharacterSheetPath.inventory).reduce(
        (acc, cur: InventoryItem) => {
          const label = cur.label;

          acc[label] = mergeInventoryItems(acc[label] || null, cur);

          return acc;
        },
        {},
      ),
    ).filter(identity),
    [CharacterSheetPath.deathSaves]: {
      successes: [false, false, false],
      failures: [false, false, false],
    },
    [CharacterSheetPath.inspiration]: false,
    [CharacterSheetPath.curHp]: selectedClassConfig
      ? getDiceMax(selectedClassConfig.hitDice) +
        getModifier(finalStats[STATS.CON])
      : 0,
    [CharacterSheetPath.tempHp]: 0,
    [CharacterSheetPath.tempMaxHp]: 0,
    [CharacterSheetPath.hitDice]: selectedClassConfig
      ? {
          [selectedClassConfig.hitDice]: {
            total: 1,
            max: 1,
          },
        }
      : {},
    [CharacterSheetPath.customBonuses]: getMergedCustomBonuses(
      getFormJointObjectArrayFromPath(forms, CharacterSheetPath.customBonuses),
    ),
    [CharacterSheetPath.attacks]: uniqBy(
      getFormJointArrayByPath(forms, CharacterSheetPath.attacks),
      ({ label }: any) => label,
    ),
    [CharacterSheetPath.globalAttackModifier]: getFormJointArrayByPath(
      forms,
      CharacterSheetPath.globalAttackModifier,
    ),
    [CharacterSheetPath.globalACModifier]: getFormJointArrayByPath(
      forms,
      CharacterSheetPath.globalACModifier,
    ),
    [CharacterSheetPath.globalDamageModifier]: getFormJointArrayByPath(
      forms,
      CharacterSheetPath.globalDamageModifier,
    ),
  };

  console.log(result);

  const reviewValidations: Array<CharacterCreatorValidation> = [];

  const multiSourceSkills = entries(get(result, CharacterSheetPath.skills, {}))
    .map(([type, { source }]: any) => ({
      label: SKILL_CONFIGS[type]?.label,
      sources: source?.split('|') || [],
    }))
    .filter(({ sources }) => sources.length > 1);
  console.log(multiSourceSkills, get(result, CharacterSheetPath.skills, {}));
  if (size(multiSourceSkills) > 0) {
    reviewValidations.push({
      type: CharacterCreatorValidationType.WARNING,
      text: `Gained proficiency in the following skills from multiple sources:\n${multiSourceSkills
        .map(
          ({ label, sources }) => `\t- ${label} -> ${joinAndStrings(sources)}`,
        )
        .join('\n')}`,
    });
  }

  return {
    sheet: result,
    formSheets: {
      [CHARACTER_CREATOR_PATHS['race']]: finalRace,
      [CHARACTER_CREATOR_PATHS['class']]: finalClass,
      [CHARACTER_CREATOR_PATHS['equipment']]: finalEquipment,
      [CHARACTER_CREATOR_PATHS['background']]: finalBackground,
    },
    validationsBySection: {
      [CHARACTER_CREATOR_PAGES.RACE]: raceValidations,
      [CHARACTER_CREATOR_PAGES.CLASS]: classValidations,
      [CHARACTER_CREATOR_PAGES.STATS]: statsValidation,
      [CHARACTER_CREATOR_PAGES.BACKGROUND]: backgroundValidations,
      [CHARACTER_CREATOR_PAGES.EQUIPMENT]: equipmentValidations,
      [CHARACTER_CREATOR_PAGES.BIO]: bioValidations,
      [CHARACTER_CREATOR_PAGES.REVIEW]: reviewValidations,
    },
  };
});
