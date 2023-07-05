import { values } from 'lodash';

export enum CharacterSheetPath {
  name = 'name',
  advantageToggle = 'advantageToggle',
  whisperToggle = 'whisperToggle',
  skillSort = 'skillSort',
  profBonus = 'profBonus',
  levels = 'levels',
  spellcastingAbility = 'spellcastingAbility',
  race = 'race',
  background = 'background',
  alignment = 'alignment',
  stats = 'stats',
  savingThrows = 'savingThrows',
  customChecks = 'customChecks',
  otherProficiencies = 'otherProficiencies',
  money = 'money',
  inventory = 'inventory',
  deathSaves = 'deathSaves',
  inspiration = 'inspiration',
  curHp = 'curHp',
  tempHp = 'tempHp',
  tempMaxHp = 'tempMaxHp',
  hitDice = 'hitDice',
  customBonuses = 'customBonuses',

  globalAttackModifier = 'globalAttackModifier',
  globalACModifier = 'globalACModifier',
  globalDamageModifier = 'globalDamageModifier',
  features = 'features',
  attacks = 'attacks',
  resources = 'resources',
  skills = 'skills',
}

export const CHARACTER_SHEET_PATH_LIST = values(CharacterSheetPath);
export const CHARACTER_SHEET_PATH_SET = new Set(CHARACTER_SHEET_PATH_LIST);
