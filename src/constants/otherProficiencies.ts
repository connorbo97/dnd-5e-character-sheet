export enum OTHER_PROFICIENCY_CATEGORY {
  ARMOR = 'Armor',
  WEAPON = 'Weapon',
  TOOL = 'Tool',
  LANGUAGE = 'Language',
}
const { ARMOR, WEAPON } = OTHER_PROFICIENCY_CATEGORY;

export const getBasicProficiencyConfig = (label, category) => ({
  proficient: true,
  category,
  label,
});

export const LIGHT_ARMOR_PROFICIENCY = {
  LIGHT_ARMOR: getBasicProficiencyConfig('Light Armor', ARMOR),
};
export const MEDIUM_ARMOR_PROFICIENCY = {
  MEDIUM_ARMOR: getBasicProficiencyConfig('Medium Armor', ARMOR),
};
export const HEAVY_ARMOR_PROFICIENCY = {
  HEAVY_ARMOR: getBasicProficiencyConfig('Heavy Armor', ARMOR),
};
export const SHIELD_PROFICIENCY = {
  SHIELD: getBasicProficiencyConfig('Shields', ARMOR),
};
export const SIMPLE_WEAPON_PROFICIENCY = {
  SIMPLE_WEAPON: getBasicProficiencyConfig('Simple weapons', WEAPON),
};
export const MARTIAL_WEAPON_PROFICIENCY = {
  MARTIAL_WEAPON: getBasicProficiencyConfig('Martial weapons', WEAPON),
};
