import { entries, mapValues, pickBy } from 'lodash';
import { AttackEntry, UNUSED_DAMAGE, UNUSED_SAVING_THROW } from './attacks';
import { DICE } from './dice';
import { EquipmentConfig } from './equipmentTypes';
import { InventoryItemMods } from './inventory';
import { Rollable } from './rollable';
import { STATS } from './stats';

export enum WEAPON_PROPERTIES {
  AMMUNITION = 'AMMUNITION',
  FINESSE = 'FINESSE',
  HEAVY = 'HEAVY',
  LIGHT = 'LIGHT',
  LOADING = 'LOADING',
  RANGE = 'RANGE',
  REACH = 'REACH',
  SPECIAL = 'SPECIAL',
  THROWN = 'THROWN',
  TWO_HANDED = 'TWO_HANDED',
  VERSATILE = 'VERSATILE',
}

export enum BASIC_DAMAGE_TYPES {
  BLUDGEONING = 'bludgeoning',
  PIERCING = 'piercing',
  SLASHING = 'SLASHING',
}
const { BLUDGEONING, PIERCING, SLASHING } = BASIC_DAMAGE_TYPES;

export const WEAPON_PROPERTY_CONFIG: {
  [s in WEAPON_PROPERTIES]: { label: string; description: string };
} = {
  [WEAPON_PROPERTIES.AMMUNITION]: {
    label: 'Ammunition',
    description:
      'You can use a weapon that has the ammunition property to make a ranged attack only if you have ammuni⁠tion to fire from the weapon. Each time you atta⁠ck with the weapon, you expend one piece of ammu⁠nition. Drawing the ammuni⁠tion from a quiver, case, or other container is part of the atta⁠ck (you need a free hand to load a one-handed weapon). At the end of the battle, you can recover half your expended ammu⁠nition by taking a minute to sear⁠ch the battlefield.\n\nIf you use a weapon that has the ammunition property to make a melee attack, you treat the weapon as an improvised weapon (see “Improvised Weapons” later in the section). A sling must be loaded to deal any damage when used in this way.',
  },
  [WEAPON_PROPERTIES.FINESSE]: {
    label: 'Finesse',
    description:
      'When making an attack with a finesse weapon, you use your choice of your Strength or Dexterity modifier for the attack and damage rolls. You must use the same modifier for both rolls.',
  },
  [WEAPON_PROPERTIES.HEAVY]: {
    label: 'Heavy',
    description:
      'Creatures that are Small or Tiny have disadvantage on attack rolls with heavy weapons. A heavy weapon’s size and bulk make it too large for a Small or Tiny creature to use effectively.',
  },
  [WEAPON_PROPERTIES.LIGHT]: {
    label: 'Heavy',
    description:
      'A lig⁠ht weapon is small and easy to handle, making it ideal for use when fighting with two weapons. See the rules for two-weapon fighting in " Making an Attack " section.',
  },
  [WEAPON_PROPERTIES.LOADING]: {
    label: 'Loading',
    description:
      'Because of the time required to load this weapon, you can fire only one piece of ammunition from it when you use an action, bonus action, or reaction to fire it, regardless of the number of attacks you can normally make.',
  },
  [WEAPON_PROPERTIES.RANGE]: {
    label: 'Range',
    description:
      'A weapon that can be used to make a ranged attack has a range in parentheses after the ammunition or thrown property. The range lists two numbers. The first is the weapon’s normal range in feet, and the second indicates the weapon’s long range. When attacking a target beyond normal range, you have disadvantage on the attack roll. You can’t attack a target beyond the weapon’s long range.',
  },
  [WEAPON_PROPERTIES.REACH]: {
    label: 'Reach',
    description:
      'This weapon adds 5 feet to your reach when you attack with it, as well as when determining your reach for opportunity attacks with it.',
  },
  [WEAPON_PROPERTIES.SPECIAL]: {
    label: 'Special',
    description:
      'A weapon with the special property has unusual rules governing its use, explained in the weapon’s description',
  },
  [WEAPON_PROPERTIES.THROWN]: {
    label: 'Thrown',
    description:
      'If a weapon has the thrown property, you can throw the weapon to make a ranged attack. If the weapon is a melee weapon, you use the same ability modifier for that atta⁠ck roll and damage roll that you would use for a melee att⁠ack with the weapon. For example, if you throw a handaxe, you use your Strength, but if you throw a dagger, you can use either your Strength or your Dexterity, since the dagger has the finesse property.',
  },
  [WEAPON_PROPERTIES.TWO_HANDED]: {
    label: 'Two-handed',
    description: 'This weapon requires two hands when you attack with it.',
  },
  [WEAPON_PROPERTIES.VERSATILE]: {
    label: 'Versatile',
    description:
      'This weapon can be used with one or two hands. A damage value in parentheses appears with the property—the damage when the weapon is used with two hands to make a melee attack.',
  },
};

export enum WEAPONS {
  CLUB = 'CLUB',
  DAGGER = 'DAGGER',
  GREATCLUB = 'GREATCLUB',
  HANDAXE = 'HANDAXE',
  JAVELIN = 'JAVELIN',
  LIGHT_HAMMER = 'LIGHT_HAMMER',
  MACE = 'MACE',
  QUARTERSTAFF = 'QUARTERSTAFF',
  SICKLE = 'SICKLE',
  SPEAR = 'SPEAR',
  CROSSBOW_LIGHT = 'CROSSBOW_LIGHT',
  DART = 'DART',
  SHORTBOW = 'SHORTBOW',
  SLING = 'SLING',
  BATTLEAXE = 'BATTLEAXE',
  FLAIL = 'FLAIL',
  GLAIVE = 'GLAIVE',
  GREATAXE = 'GREATAXE',
  GREATSWORD = 'GREATSWORD',
  HALBERD = 'HALBERD',
  LANCE = 'LANCE',
  LONGSWORD = 'LONGSWORD',
  MAUL = 'MAUL',
  MORNINGSTAR = 'MORNINGSTAR',
  PIKE = 'PIKE',
  RAPIER = 'RAPIER',
  SCIMITAR = 'SCIMITAR',
  SHORTSWORD = 'SHORTSWORD',
  TRIDENT = 'TRIDENT',
  WAR_PICK = 'WAR_PICK',
  WARHAMMER = 'WARHAMMER',

  WHIP = 'WHIP',
  BLOWGUN = 'BLOWGUN',
  CROSSBOW_HAND = 'CROSSBOW_HAND',
  CROSSBOW_HEAVY = 'CROSSBOW_HEAVY',
  LONGBOW = 'LONGBOW',
  NET = 'NET',
}

export const getWeaponAttackFromConfig = (
  config: WeaponConfig,
  source = '',
): AttackEntry => {
  const { label, properties, damage } = config;
  const attackStat = properties.includes(WEAPON_PROPERTIES.FINESSE)
    ? STATS.DEX
    : STATS.STR;

  return {
    label,
    source,
    attack: {
      stat: attackStat,
      critRange: 20,
      isEnabled: true,
    },
    damage: [
      {
        base: damage,
        isEnabled: true,
        stat: attackStat,
      },
      UNUSED_DAMAGE,
    ],
    savingThrow: UNUSED_SAVING_THROW,
  };
};
export const getEquipmentConfigFromWeaponConfig = (
  weaponConfig: WeaponConfig,
): EquipmentConfig => ({
  label: weaponConfig.label,
  cost: weaponConfig.cost,
  weight: weaponConfig.weight,
  description: weaponConfig.properties?.length
    ? `Weapon Properties: ${weaponConfig.properties
        .map((p) => WEAPON_PROPERTY_CONFIG[p].label)
        .join(', ')}`
    : '',
  attack: getWeaponAttackFromConfig(weaponConfig),
  mods: weaponConfig.mods,
  isMartial: weaponConfig.isMartial,
});

export type WeaponConfig = {
  label: string;
  damage: Rollable;
  versatileDamage?: Rollable;
  special?: string;
  damageType: string;
  weight: number;
  cost: number;
  range?: string;
  properties: Array<WEAPON_PROPERTIES>;
  isMartial?: boolean;
  mods?: InventoryItemMods;
};
export const WEAPON_CONFIGS: {
  [s in WEAPONS]: WeaponConfig;
} = {
  [WEAPONS.CLUB]: {
    label: 'Club',
    damage: [[1, DICE.d4]],
    damageType: BLUDGEONING,
    weight: 2,
    cost: 0.1,
    properties: [WEAPON_PROPERTIES.LIGHT],
  },
  [WEAPONS.DAGGER]: {
    label: 'Dagger',
    damage: [[1, DICE.d4]],
    damageType: PIERCING,
    weight: 1,
    cost: 2,
    range: '20/60',
    properties: [
      WEAPON_PROPERTIES.LIGHT,
      WEAPON_PROPERTIES.FINESSE,
      WEAPON_PROPERTIES.THROWN,
    ],
  },
  [WEAPONS.GREATCLUB]: {
    label: 'Greatclub',
    damage: [[1, DICE.d8]],
    damageType: BLUDGEONING,
    weight: 10,
    cost: 0.2,
    properties: [WEAPON_PROPERTIES.TWO_HANDED],
  },
  [WEAPONS.HANDAXE]: {
    label: 'Handaxe',
    cost: 5,
    damage: [[1, DICE.d6]],
    damageType: SLASHING,
    weight: 2,
    range: '20/60',
    properties: [WEAPON_PROPERTIES.LIGHT, WEAPON_PROPERTIES.THROWN],
  },
  [WEAPONS.JAVELIN]: {
    label: 'Javelin',
    cost: 0.5,
    damage: [[1, DICE.d6]],
    damageType: PIERCING,
    weight: 2,
    range: '30/120',
    properties: [WEAPON_PROPERTIES.THROWN],
  },
  [WEAPONS.LIGHT_HAMMER]: {
    label: 'Light hammer',
    cost: 2,
    damage: [[1, DICE.d4]],
    damageType: BLUDGEONING,
    weight: 2,
    range: '20/60',
    properties: [WEAPON_PROPERTIES.LIGHT, WEAPON_PROPERTIES.THROWN],
  },
  [WEAPONS.MACE]: {
    label: 'Mace',
    cost: 5,
    damage: [[1, DICE.d6]],
    damageType: BLUDGEONING,
    weight: 4,
    properties: [],
  },
  [WEAPONS.QUARTERSTAFF]: {
    label: 'Quarterstaff',
    cost: 0.2,
    damage: [[1, DICE.d6]],
    versatileDamage: [[1, DICE.d8]],
    damageType: BLUDGEONING,
    weight: 4,
    properties: [WEAPON_PROPERTIES.VERSATILE],
  },
  [WEAPONS.SICKLE]: {
    label: 'Sickle',
    cost: 1,
    damage: [[1, DICE.d4]],
    damageType: SLASHING,
    weight: 2,
    properties: [WEAPON_PROPERTIES.LIGHT],
  },
  [WEAPONS.SPEAR]: {
    label: 'Spear',
    cost: 1,
    damage: [[1, DICE.d6]],
    versatileDamage: [[1, DICE.d8]],
    damageType: PIERCING,
    weight: 3,
    properties: [WEAPON_PROPERTIES.THROWN, WEAPON_PROPERTIES.VERSATILE],
  },
  [WEAPONS.CROSSBOW_LIGHT]: {
    label: 'Light Crossbow',
    cost: 15,
    damage: [[1, DICE.d8]],
    damageType: PIERCING,
    weight: 5,
    range: '80/320',
    properties: [
      WEAPON_PROPERTIES.AMMUNITION,
      WEAPON_PROPERTIES.LOADING,
      WEAPON_PROPERTIES.TWO_HANDED,
    ],
  },
  [WEAPONS.DART]: {
    label: 'Dart',
    cost: 0.05,
    damage: [[1, DICE.d4]],
    damageType: PIERCING,
    weight: 0.25,
    range: '20/60',
    properties: [WEAPON_PROPERTIES.FINESSE, WEAPON_PROPERTIES.THROWN],
  },
  [WEAPONS.SHORTBOW]: {
    label: 'Shortbow',
    cost: 25,
    damage: [[1, DICE.d6]],
    damageType: PIERCING,
    weight: 2,
    range: '80/320',
    properties: [WEAPON_PROPERTIES.AMMUNITION, WEAPON_PROPERTIES.TWO_HANDED],
  },
  [WEAPONS.SLING]: {
    label: 'Sling',
    cost: 0.1,
    damage: [[1, DICE.d4]],
    damageType: PIERCING,
    weight: 0,
    range: '30/120',
    properties: [WEAPON_PROPERTIES.AMMUNITION],
  },
  [WEAPONS.BATTLEAXE]: {
    label: 'Battleaxe',
    cost: 10,
    damage: [[1, DICE.d8]],
    versatileDamage: [[1, DICE.d10]],
    damageType: SLASHING,
    weight: 4,
    properties: [WEAPON_PROPERTIES.VERSATILE],
    isMartial: true,
  },
  [WEAPONS.FLAIL]: {
    label: 'Flail',
    cost: 10,
    damage: [[1, DICE.d8]],
    damageType: BLUDGEONING,
    weight: 4,
    properties: [],
    isMartial: true,
  },
  [WEAPONS.GLAIVE]: {
    label: 'Glaive',
    cost: 10,
    damage: [[1, DICE.d10]],
    damageType: SLASHING,
    weight: 6,
    properties: [
      WEAPON_PROPERTIES.HEAVY,
      WEAPON_PROPERTIES.REACH,
      WEAPON_PROPERTIES.TWO_HANDED,
    ],
    isMartial: true,
  },
  [WEAPONS.GREATAXE]: {
    label: 'Greataxe',
    cost: 30,
    damage: [[1, DICE.d12]],
    damageType: SLASHING,
    weight: 7,
    properties: [WEAPON_PROPERTIES.HEAVY, WEAPON_PROPERTIES.TWO_HANDED],
    isMartial: true,
  },
  [WEAPONS.GREATSWORD]: {
    label: 'Greatsword',
    cost: 50,
    damage: [[2, DICE.d6]],
    damageType: SLASHING,
    weight: 6,
    properties: [WEAPON_PROPERTIES.HEAVY, WEAPON_PROPERTIES.TWO_HANDED],
    isMartial: true,
  },
  [WEAPONS.HALBERD]: {
    label: 'Halberd',
    cost: 20,
    damage: [[1, DICE.d10]],
    damageType: SLASHING,
    weight: 6,
    properties: [
      WEAPON_PROPERTIES.HEAVY,
      WEAPON_PROPERTIES.REACH,
      WEAPON_PROPERTIES.TWO_HANDED,
    ],
    isMartial: true,
  },
  [WEAPONS.LANCE]: {
    label: 'Lance',
    cost: 10,
    damage: [[1, DICE.d12]],
    damageType: PIERCING,
    weight: 6,
    special:
      'You have disadvantage when you use a lance to attack a target within 5 feet of you. Also, a lance requires two hands to wield when you aren’t mounted.',
    properties: [WEAPON_PROPERTIES.REACH, WEAPON_PROPERTIES.SPECIAL],
    isMartial: true,
  },
  [WEAPONS.LONGSWORD]: {
    label: 'Longsword',
    cost: 15,
    damage: [[1, DICE.d8]],
    versatileDamage: [[1, DICE.d10]],
    damageType: SLASHING,
    weight: 3,
    properties: [WEAPON_PROPERTIES.VERSATILE],
    isMartial: true,
  },
  [WEAPONS.MAUL]: {
    label: 'Maul',
    cost: 10,
    damage: [[2, DICE.d6]],
    damageType: BLUDGEONING,
    weight: 10,
    properties: [WEAPON_PROPERTIES.HEAVY, WEAPON_PROPERTIES.TWO_HANDED],
    isMartial: true,
  },
  [WEAPONS.MORNINGSTAR]: {
    label: 'Morningstar',
    cost: 15,
    damage: [[1, DICE.d8]],
    damageType: PIERCING,
    weight: 4,
    properties: [],
    isMartial: true,
  },
  [WEAPONS.PIKE]: {
    label: 'Pike',
    cost: 5,
    damage: [[1, DICE.d10]],
    damageType: PIERCING,
    weight: 18,
    properties: [
      WEAPON_PROPERTIES.HEAVY,
      WEAPON_PROPERTIES.REACH,
      WEAPON_PROPERTIES.TWO_HANDED,
    ],
    isMartial: true,
  },
  [WEAPONS.RAPIER]: {
    label: 'Rapier',
    cost: 25,
    damage: [[1, DICE.d8]],
    damageType: PIERCING,
    weight: 2,
    properties: [WEAPON_PROPERTIES.FINESSE],
    isMartial: true,
  },
  [WEAPONS.SCIMITAR]: {
    label: 'Scimitar',
    cost: 25,
    damage: [[1, DICE.d6]],
    damageType: SLASHING,
    weight: 3,
    properties: [WEAPON_PROPERTIES.FINESSE, WEAPON_PROPERTIES.LIGHT],
    isMartial: true,
  },
  [WEAPONS.SHORTSWORD]: {
    label: 'Shortsword',
    cost: 10,
    damage: [[1, DICE.d6]],
    damageType: PIERCING,
    weight: 2,
    properties: [WEAPON_PROPERTIES.FINESSE, WEAPON_PROPERTIES.LIGHT],
    isMartial: true,
  },
  [WEAPONS.TRIDENT]: {
    label: 'Trident',
    cost: 5,
    damage: [[1, DICE.d6]],
    versatileDamage: [[1, DICE.d8]],
    damageType: PIERCING,
    weight: 4,
    range: '20/60',
    properties: [WEAPON_PROPERTIES.THROWN, WEAPON_PROPERTIES.VERSATILE],
    isMartial: true,
  },
  [WEAPONS.WAR_PICK]: {
    label: 'War pick',
    cost: 5,
    damage: [[1, DICE.d8]],
    damageType: PIERCING,
    weight: 2,
    properties: [],
    isMartial: true,
  },
  [WEAPONS.WARHAMMER]: {
    label: 'Warhammer',
    cost: 15,
    damage: [[1, DICE.d8]],
    versatileDamage: [[1, DICE.d10]],
    damageType: BLUDGEONING,
    weight: 2,
    properties: [WEAPON_PROPERTIES.VERSATILE],
    isMartial: true,
  },
  [WEAPONS.WHIP]: {
    label: 'Whip',
    cost: 2,
    damage: [[1, DICE.d4]],
    damageType: SLASHING,
    weight: 3,
    properties: [WEAPON_PROPERTIES.FINESSE, WEAPON_PROPERTIES.REACH],
    isMartial: true,
  },
  [WEAPONS.BLOWGUN]: {
    label: 'Blowgun',
    cost: 10,
    damage: [1],
    damageType: PIERCING,
    weight: 1,
    range: '25/100',
    properties: [WEAPON_PROPERTIES.AMMUNITION, WEAPON_PROPERTIES.LOADING],
    isMartial: true,
  },
  [WEAPONS.CROSSBOW_HAND]: {
    label: 'Hand Crossbow',
    cost: 75,
    damage: [[1, DICE.d6]],
    damageType: PIERCING,
    weight: 3,
    range: '30/120',
    properties: [
      WEAPON_PROPERTIES.AMMUNITION,
      WEAPON_PROPERTIES.LIGHT,
      WEAPON_PROPERTIES.LOADING,
    ],
    isMartial: true,
  },
  [WEAPONS.CROSSBOW_HEAVY]: {
    label: 'Heavy Crossbow',
    cost: 50,
    damage: [[1, DICE.d6]],
    damageType: PIERCING,
    weight: 18,
    range: '100/400',
    properties: [
      WEAPON_PROPERTIES.HEAVY,
      WEAPON_PROPERTIES.AMMUNITION,
      WEAPON_PROPERTIES.LOADING,
      WEAPON_PROPERTIES.TWO_HANDED,
    ],
    isMartial: true,
  },
  [WEAPONS.LONGBOW]: {
    label: 'Longbow',
    cost: 50,
    damage: [[1, DICE.d8]],
    damageType: PIERCING,
    weight: 2,
    range: '150/600',
    properties: [
      WEAPON_PROPERTIES.HEAVY,
      WEAPON_PROPERTIES.AMMUNITION,
      WEAPON_PROPERTIES.LOADING,
      WEAPON_PROPERTIES.TWO_HANDED,
    ],
    isMartial: true,
  },
  [WEAPONS.NET]: {
    label: 'Net',
    cost: 1,
    damage: [],
    damageType: '',
    weight: 3,
    range: '5/15',
    special:
      'A Large or smaller creature hit by a net is restrained until it is freed. A net has no effect on creatures that are formless, or creatures that are Huge or larger. A creature can use its action to make a DC 10 Strength check, freeing itself or another creature within its reach on a success. Dealing 5 slashing damage to the net (AC 10) also frees the creature without harming it, ending the effect and destroying the net.\n\nWhen you use an action, bonus action, or reaction to attack with a net, you can make only one atta⁠ck regardless of the number of attacks you can normally make.',
    properties: [WEAPON_PROPERTIES.SPECIAL, WEAPON_PROPERTIES.THROWN],
    isMartial: true,
  },
};

export const WEAPON_EQUIPMENT_CONFIGS = mapValues(
  WEAPON_CONFIGS,
  getEquipmentConfigFromWeaponConfig,
);
export const SIMPLE_WEAPON_EQUIPMENT_CONFIGS = pickBy(
  WEAPON_EQUIPMENT_CONFIGS,
  (value, key) => !WEAPON_CONFIGS[key]?.isMartial,
);
export const MARTIAL_WEAPON_EQUIPMENT_CONFIGS = pickBy(
  WEAPON_EQUIPMENT_CONFIGS,
  (value, key) => WEAPON_CONFIGS[key]?.isMartial,
);
