import { get } from 'lodash';
import { BACKGROUNDS, BackgroundConfig } from './backgroundTypes';
import { CreateConfigEntry } from './characterCreatorSections';
import { LANGUAGE_OPTIONS } from './languages';
import {
  getBasicDropdownChoice,
  getChoiceLanguageProficiencies,
  getChoiceSkillProficiencies,
  getConditionalFeatureByReference,
  getMoneyFeature,
  getStaticWithChoices,
} from './race/commonCreatorConfigs';
import { SKILL_OPTIONS } from './skills';
import {
  ARTISAN_TOOL_OPTIONS,
  GAMING_SET_OPTIONS,
  KIT_OPTIONS,
  MUSICAL_INSTRUMENT_OPTIONS,
  SKILL_TOOL_OPTIONS,
  TOOLS_CONFIG,
  VEHICLE_OPTIONS,
} from './tools';
import { MONEY } from './money';
import { IGNORE_PATH, MULTI_PATH } from './raceTypes';
import {
  EQUIPMENT_PACK_CONFIGS,
  EQUIPMENT_PACK_OPTIONS,
} from './adventuringGear';
import {
  getInventoryItemEquipmentLabel,
  getInventoryItemFromEquipmentType,
} from './class/commonEquipmentConfigs';
import { CharacterSheetPath } from './characterSheetPaths';

export const BACKGROUND_CONFIGS: { [c in BACKGROUNDS]: BackgroundConfig } = {
  [BACKGROUNDS.ACOLYTE]: { label: 'Acolyte', createConfig: [] },
  [BACKGROUNDS.SOLDIER]: { label: 'Soldier', createConfig: [] },
  [BACKGROUNDS.CUSTOM]: { label: 'Custom', createConfig: [] },
};

export const BACKGROUND_SKILL_CONFIG = getChoiceSkillProficiencies(
  SKILL_OPTIONS,
  2,
);
// export const BACKGROUND_EQUIPMENT_CONFIG = getBasicDropdownChoice({
//   options: [{ value: 'test', label: 'test' }],
//   path: 'equipment',
//   getFinalValue: (v) => v,
//   header: 'Equipment',
// });

const generateConditionalTraits = (index) => [
  getConditionalFeatureByReference(
    'VARIABLE_TRAIT',
    (v) => get(v, `custom.${index}.value`) === 'LANGUAGE',
    getChoiceLanguageProficiencies(LANGUAGE_OPTIONS),
  ),
  getConditionalFeatureByReference(
    'VARIABLE_TRAIT',
    (v) => get(v, `custom.${index}.value`) === 'ARTISAN_TOOL',
    getBasicDropdownChoice({
      options: ARTISAN_TOOL_OPTIONS,
      path: MULTI_PATH,
      header: 'Artisan Tool',
      getFinalValue: (v) => ({
        otherProficiencies: [
          { category: 'Tool', label: TOOLS_CONFIG[v].label },
        ],
        customChecks: [{ label: TOOLS_CONFIG[v].label, proficient: true }],
      }),
    }),
  ),
  getConditionalFeatureByReference(
    'VARIABLE_TRAIT',
    (v) => get(v, `custom.${index}.value`) === 'SKILL_TOOL',
    getBasicDropdownChoice({
      options: [...SKILL_TOOL_OPTIONS, ...KIT_OPTIONS],
      path: MULTI_PATH,
      header: 'Skill Tool',
      getFinalValue: (v) => ({
        otherProficiencies: [
          { category: 'Tool', label: TOOLS_CONFIG[v].label },
        ],
        customChecks: [{ label: TOOLS_CONFIG[v].label, proficient: true }],
      }),
    }),
  ),
  getConditionalFeatureByReference(
    'VARIABLE_TRAIT',
    (v) => get(v, `custom.${index}.value`) === 'MUSICAL_INSTRUMENT',
    getBasicDropdownChoice({
      options: MUSICAL_INSTRUMENT_OPTIONS,
      path: MULTI_PATH,
      header: 'Musical Instrument',
      getFinalValue: (v) => ({
        otherProficiencies: [
          { category: 'Tool', label: TOOLS_CONFIG[v].label },
        ],
      }),
    }),
  ),
  getConditionalFeatureByReference(
    'VARIABLE_TRAIT',
    (v) => get(v, `custom.${index}.value`) === 'GAMING_SET',
    getBasicDropdownChoice({
      options: GAMING_SET_OPTIONS,
      path: MULTI_PATH,
      header: 'Gaming Set',
      getFinalValue: (v) => ({
        otherProficiencies: [
          { category: 'Tool', label: TOOLS_CONFIG[v].label },
        ],
        customChecks: [{ label: TOOLS_CONFIG[v].label, proficient: true }],
      }),
    }),
  ),
  getConditionalFeatureByReference(
    'VARIABLE_TRAIT',
    (v) => get(v, `custom.${index}.value`) === 'VEHICLE',
    getBasicDropdownChoice({
      options: VEHICLE_OPTIONS,
      path: MULTI_PATH,
      header: 'Vehicle Proficiency',
      getFinalValue: (v) => ({
        otherProficiencies: [{ category: 'Tool', label: v }],
        customChecks: [{ label: TOOLS_CONFIG[v].label, proficient: true }],
      }),
    }),
  ),
  getConditionalFeatureByReference(
    'VARIABLE_TRAIT',
    (v) => get(v, `custom.${index}.value`) === 'GOLD',
    getMoneyFeature({ [MONEY.GOLD]: 25 }),
  ),
];

export const BACKGROUND_CLOTHES_CONFIG = getBasicDropdownChoice({
  options: [
    { value: 'NONE', label: 'None' },
    { value: 'COMMON', label: 'Common Clothes' },
    { value: 'COSTUME', label: 'Costume' },
    { value: 'FINE', label: 'Fine Clothes' },
    { value: 'OCCUPATION', label: 'Occupational Clothes' },
    { value: 'TRAVELERS', label: "Traveler's Clothes" },
  ],
  path: 'clothes',
  getFinalValue: (v) => v,
  header: 'Clothes',
});

export const BACKGROUND_TOOL_PROFICIENCY_CONFIG = getBasicDropdownChoice({
  options: [
    { value: 'NONE', label: 'None' },
    { value: 'A', label: 'Tool A' },
    { value: 'B', label: 'Tool B' },
    { value: 'C', label: 'Tool C' },
    { value: 'D', label: 'Tool D' },
    { value: 'E', label: 'Tool E' },
  ],
  path: 'tools',
  getFinalValue: (v) => v,
  header: 'Tool Proficiency',
});

export const BACKGROUND_CREATE_CONFIG: Array<CreateConfigEntry> = [
  getChoiceSkillProficiencies(SKILL_OPTIONS, 2),
  getStaticWithChoices(
    {
      path: IGNORE_PATH,
      custom: [
        {
          options: [
            { value: 'LANGUAGE', label: 'Language' },
            { value: 'ARTISAN_TOOL', label: 'Artisan Tool' },
            { value: 'SKILL_TOOL', label: 'Skill Tool' },
            { value: 'MUSICAL_INSTRUMENT', label: 'Musical Instrument' },
            { value: 'GAMING_SET', label: 'Gaming set' },
            { value: 'VEHICLE', label: 'Vehicle proficiency' },
            { value: 'GOLD', label: '25 extra gold' },
          ],
        },
        {
          options: [
            { value: 'LANGUAGE', label: 'Language' },
            { value: 'ARTISAN_TOOL', label: 'Artisan Tool' },
            { value: 'SKILL_TOOL', label: 'Skill Tool' },
            { value: 'MUSICAL_INSTRUMENT', label: 'Musical Instrument' },
            { value: 'GAMING_SET', label: 'Gaming set' },
            { value: 'VEHICLE', label: 'Vehicle proficiency' },
            { value: 'GOLD', label: '25 extra gold' },
          ],
        },
      ],
    },
    {
      header: 'Choose your proficiencies',
      description:
        'As part of your background, you have had a variety of experiences that have granted you special proficiency in various fields. We can boil down those proficiencies to the below categories. Please pick two',
      getPlaceholder: () => 'Choose',
      reference: 'VARIABLE_TRAIT',
    },
  ),
  ...generateConditionalTraits(0),
  ...generateConditionalTraits(1),
  getBasicDropdownChoice({
    options: EQUIPMENT_PACK_OPTIONS,
    header: 'Equipment',
    getFinalValue: (value) =>
      EQUIPMENT_PACK_CONFIGS[value]?.equipment?.map(({ type, count }) =>
        getInventoryItemFromEquipmentType(type, count),
      ),
    path: CharacterSheetPath.inventory,
    config: {
      description:
        'You have collected or obtained gear in your past that you have taken with you on your travels. Please select an equipment pack below that closest resembles what your character would have. Feel free to make substitutions/changes after character creation.',
      getPostDescription: (value) => {
        const inventoryList = EQUIPMENT_PACK_CONFIGS[value]?.equipment?.map(
          ({ type, count }) => getInventoryItemFromEquipmentType(type, count),
        );

        if (!inventoryList) {
          return null;
        }

        return `Contains:\n${inventoryList
          .map((i) => '- ' + getInventoryItemEquipmentLabel(i))
          .join('\n')}`;
      },
    },
  }),
];
