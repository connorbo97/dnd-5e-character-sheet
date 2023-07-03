import { entries } from 'lodash';
import {
  AttackEntry,
  UNUSED_ATTACK,
  UNUSED_DAMAGE,
  UNUSED_SAVING_THROW,
} from './attacks';
import { DICE } from './dice';
import { ResourceConfig } from './resources';
import { ROLLABLES } from './rollable';
import { STATS } from './stats';
import { BASIC_DAMAGE_TYPES } from './weapons';
import { CharacterSheetPath } from './characterSheetPaths';

export enum FIGHTING_STYLES {
  ARCHERY = 'ARCHERY',
  BLIND_FIGHTING = 'BLIND_FIGHTING',
  DEFENSE = 'DEFENSE',
  DUELING = 'DUELING',
  GREAT_WEAPON_FIGHTING = 'GREAT_WEAPON_FIGHTING',
  INTERCEPTION = 'INTERCEPTION',
  PROTECTION = 'PROTECTION',
  SUPERIOR_TECHNIQUE = 'SUPERIOR_TECHNIQUE',
  THROWN_WEAPON_FIGHTING = 'THROWN_WEAPON_FIGHTING',
  TWO_WEAPON_FIGHTING = 'TWO_WEAPON_FIGHTING',
  UNARMED_FIGHTING = 'UNARMED_FIGHTING',
}

export const FIGHTING_STYLE_CONFIGS: {
  [s in FIGHTING_STYLES]: { label: string; description: string; config?: any };
} = {
  [FIGHTING_STYLES.ARCHERY]: {
    label: 'Archery',
    description:
      'You gain a +2 bonus to attack rolls you make with ranged weapons.',
    config: {
      [CharacterSheetPath.globalAttackModifier]: [
        { base: [2], label: 'Archery (Ranged Only)' },
      ],
    },
  },
  [FIGHTING_STYLES.BLIND_FIGHTING]: {
    label: 'Blind Fighting',
    description:
      "You have blindsight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you.",
  },
  [FIGHTING_STYLES.DEFENSE]: {
    label: 'Defense',
    description: 'While you are wearing armor, you gain a +1 bonus to AC.',
    config: {
      [CharacterSheetPath.globalACModifier]: [
        { base: [[1]], label: 'Fighting Style: Defense' },
      ],
    },
  },
  [FIGHTING_STYLES.DUELING]: {
    label: 'Dueling',
    description:
      'When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.',
    config: {
      [CharacterSheetPath.globalDamageModifier]: [
        { base: [[2]], label: 'Fighting Style: Dueling' },
      ],
    },
  },
  [FIGHTING_STYLES.GREAT_WEAPON_FIGHTING]: {
    label: 'Great Weapon Fighting',
    description:
      'When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.',
  },
  [FIGHTING_STYLES.INTERCEPTION]: {
    label: 'Interception',
    description:
      'When a creature you can see hits a target, other than you, within 5 feet of you with an attack, you can use your reaction to reduce the damage the target takes by 1d10 + your proficiency bonus (to a minimum of 0 damage). You must be wielding a shield or a simple or martial weapon to use this reaction.',
    config: {
      [CharacterSheetPath.attacks]: {
        label: 'Interception',
        source: 'Fighting Style',
        attack: UNUSED_ATTACK,
        damage: [
          {
            isEnabled: true,
            base: [[1, DICE.d10], ROLLABLES.PB],
            stat: null,
          },
          UNUSED_DAMAGE,
        ],
        savingThrow: UNUSED_SAVING_THROW,
      } as AttackEntry,
    },
  },
  [FIGHTING_STYLES.PROTECTION]: {
    label: 'Protection',
    description:
      'When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.',
  },
  [FIGHTING_STYLES.SUPERIOR_TECHNIQUE]: {
    label: 'Superior Technique',
    description:
      "You learn one maneuver of your choice from among those available to the Battle Master archetype. If a maneuver you use requires your target to make a saving throw to resist the maneuver's effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice.)\n\nYou gain one superiority die, which is a d6 (this die is added to any superiority dice you have from another source). This die is used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a short or long rest.",
    config: {
      [CharacterSheetPath.resources]: [
        {
          label: 'Superior Technique',
          max: 1,
          resetOnShortRest: true,
          resetOnLongRest: true,
        } as ResourceConfig,
      ],
      [CharacterSheetPath.attacks]: [
        {
          label: 'Superiority Die',
          source: 'Superior Technique',
          attack: UNUSED_ATTACK,
          damage: [
            {
              isEnabled: true,
              base: [[1, DICE.d6], ROLLABLES.PB],
              stat: null,
            },
            UNUSED_DAMAGE,
          ],
          savingThrow: {
            dc: STATS.STR,
            dcSave: STATS.STR,
            effect: '',
            flatDC: 10,
            isEnabled: true,
          },
        } as AttackEntry,
      ],
    },
  },
  [FIGHTING_STYLES.THROWN_WEAPON_FIGHTING]: {
    label: 'Thrown Weapon Fighting',
    description:
      'You can draw a weapon that has the thrown property as part of the attack you make with the weapon.\n\nIn addition, when you hit with a ranged attack using a thrown weapon, you gain a +2 bonus to the damage roll.',
    config: {
      [CharacterSheetPath.globalDamageModifier]: [
        { base: [2], label: 'Thrown Weapon Fighting (Thrown Only)' },
      ],
    },
  },
  [FIGHTING_STYLES.TWO_WEAPON_FIGHTING]: {
    label: 'Two-Weapon Fighting',
    description:
      'When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.',
  },
  [FIGHTING_STYLES.UNARMED_FIGHTING]: {
    label: 'Unarmed Fighting',
    description:
      "Your unarmed strikes can deal bludgeoning damage equal to 1d6 + your Strength modifier on a hit. If you aren't wielding any weapons or a shield when you make the attack roll, the d6 becomes a d8.\n\nAt the start of each of your turns, you can deal 1d4 bludgeoning damage to one creature grappled by you.",
    config: {
      [CharacterSheetPath.attacks]: [
        {
          label: 'Unarmed Strike',
          source: 'Fighting Style: Unarmed Fighting',
          attack: {
            isEnabled: true,
            critRange: 20,
            stat: STATS.STR,
            proficient: true,
          },
          damage: [
            {
              isEnabled: true,
              base: [[1, DICE.d6]],
              stat: STATS.STR,
              type: BASIC_DAMAGE_TYPES.BLUDGEONING,
            },
            UNUSED_DAMAGE,
          ],
          savingThrow: UNUSED_SAVING_THROW,
        } as AttackEntry,
        {
          label: 'Unarmed Strike (Improved)',
          source: 'Fighting Style: Unarmed Fighting',
          attack: {
            isEnabled: true,
            critRange: 20,
            stat: STATS.STR,
            proficient: true,
          },
          damage: [
            {
              isEnabled: true,
              base: [[1, DICE.d8]],
              stat: STATS.STR,
              type: BASIC_DAMAGE_TYPES.BLUDGEONING,
            },
            UNUSED_DAMAGE,
          ],
          savingThrow: UNUSED_SAVING_THROW,
        } as AttackEntry,
        {
          label: 'Squeeze',
          source: 'Fighting Style: Unarmed Fighting',
          attack: UNUSED_ATTACK,
          damage: [
            {
              isEnabled: true,
              base: [[1, DICE.d4]],
              stat: null,
              type: BASIC_DAMAGE_TYPES.BLUDGEONING,
            },
            UNUSED_DAMAGE,
          ],
          savingThrow: UNUSED_SAVING_THROW,
        } as AttackEntry,
      ],
    },
  },
};

export const FIGHTING_STYLE_OPTIONS = entries(FIGHTING_STYLE_CONFIGS).map(
  ([style, config]) => ({ value: style, label: config.label }),
);
