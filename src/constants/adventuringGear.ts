import { entries, pickBy } from 'lodash';
import { AttackEntry, UNUSED_DAMAGE, UNUSED_SAVING_THROW } from './attacks';
import { DICE } from './dice';
import { STATS } from './stats';
import { KITS } from './tools';

export enum ADVENTURING_GEAR_TYPE {
  ARCANE_FOCUS = 'ARCANE_FOCUS',
  DRUIDIC_FOCUS = 'DRUIDIC_FOCUS',
  HOLY_SYMBOL = 'HOLY_SYMBOL',
  CLOTHES = 'CLOTHES',
  CONTAINER = 'CONTAINER',
}
export enum ADVENTURING_GEAR {
  ABACUS = 'ABACUS',
  ACID_VIAL = 'ACID_VIAL',
  ALCHEMISTS_FIRE_FLASK = 'ALCHEMISTS_FIRE_FLASK',
  ALMS_BOX = 'ALMS_BOX',
  AMULET = 'AMULET',
  ANTITOXIN_VIAL = 'ANTITOXIN_VIAL',
  ARROW = 'ARROW',
  BACKPACK = 'BACKPACK',
  BALL_BEARINGS = 'BALL_BEARINGS',
  BARREL = 'BARREL',
  BASKET = 'BASKET',
  BEDROLL = 'BEDROLL',
  BELL = 'BELL',
  BLANKET = 'BLANKET',
  BLOCK_AND_TACKLE = 'BLOCK_AND_TACKLE',
  BLOWGUN_NEEDLE = 'BLOWGUN_NEEDLE',
  BOOK = 'BOOK',
  BOTTLE_GLASS = 'BOTTLE_GLASS',
  BUCKET = 'BUCKET',
  CALTROPS = 'CALTROPS',
  CANDLE = 'CANDLE',
  CASE_CROSSBOW_BOLT = 'CASE_CROSSBOW_BOLT',
  CASE_MAP_OR_SCROLL = 'CASE_MAP_OR_SCROLL',
  CENSER = 'CENSER',
  CHAIN__FEET = 'CHAIN__FEET',
  CHALK__PIECE = 'CHALK__PIECE',
  CHEST = 'CHEST',
  CLIMBERS_KIT = 'CLIMBERS_KIT',
  CLOTHES_COMMON = 'CLOTHES_COMMON',
  CLOTHES_COSTUME = 'CLOTHES_COSTUME',
  CLOTHES_FINE = 'CLOTHES_FINE',
  CLOTHES_OCCUPATIONAL = 'CLOTHES_OCCUPATIONAL',
  CLOTHES_TRAVELERS = 'CLOTHES_TRAVELERS',
  COMPONENT_POUCH = 'COMPONENT_POUCH',
  CROSSBOW_BOLT = 'CROSSBOW_BOLT',
  CROWBAR = 'CROWBAR',
  CRYSTAL = 'CRYSTAL',
  EMBLEM = 'EMBLEM',
  FISHING_TACKLE = 'FISHING_TACKLE',
  FLASK_OR_TANKARD = 'FLASK_OR_TANKARD',
  GRAPPLING_HOOK = 'GRAPPLING_HOOK',
  HAMMER = 'HAMMER',
  HAMMER_SLEDGE = 'HAMMER_SLEDGE',
  HEALERS_KIT = 'HEALERS_KIT',
  HOLY_WATER_FLASK = 'HOLY_WATER_FLASK',
  HOURGLASS = 'HOURGLASS',
  HUNTING_TRAP = 'HUNTING_TRAP',
  INCENSE_BLOCK = 'INCENSE_BLOCK',
  INK_OUNCE_BOTTLE = 'INK_OUNCE_BOTTLE',
  INK_PEN = 'INK_PEN',
  JUG_OR_PITCHER = 'JUG_OR_PITCHER',
  KNIFE_SMALL = 'KNIFE_SMALL',
  LADDER_FOOT = 'LADDER_FOOT',
  LAMP = 'LAMP',
  LANTERN_BULLSEYE = 'LANTERN_BULLSEYE',
  LANTERN_HOODED = 'LANTERN_HOODED',
  LOCK = 'LOCK',
  MAGNIFYING_GLASS = 'MAGNIFYING_GLASS',
  MANACLES = 'MANACLES',
  MESS_KIT = 'MESS_KIT',
  MIRROR_STEEL = 'MIRROR_STEEL',
  OIL_FLASK = 'OIL_FLASK',
  ORB = 'ORB',
  PAPER_ONE_SHEET = 'PAPER_ONE_SHEET',
  PARCHMENT_ONE_SHEET = 'PARCHMENT_ONE_SHEET',
  PERFUME_VIAL = 'PERFUME_VIAL',
  PICK_MINERS = 'PICK_MINERS',
  PITON = 'PITON',
  POISON_BASIC_VIAL = 'POISON_BASIC_VIAL',
  POLE_FOOT = 'POLE_FOOT',
  POTION_OF_HEALING = 'POTION_OF_HEALING',
  POT_IRON = 'POT_IRON',
  POUCH = 'POUCH',
  QUIVER = 'QUIVER',
  RAM_PORTABLE = 'RAM_PORTABLE',
  RATIONS_DAY = 'RATIONS_DAY',
  RELIQUARY = 'RELIQUARY',
  ROBES = 'ROBES',
  ROD = 'ROD',
  ROPE_HEMPEN_50 = 'ROPE_HEMPEN_50',
  ROPE_SILK__FEET = 'ROPE_SILK__FEET',
  SACK = 'SACK',
  SAND_BAG_OF = 'SAND_BAG_OF',
  SCALE_MERCHANTS = 'SCALE_MERCHANTS',
  SEALING_WAX = 'SEALING_WAX',
  SHOVEL = 'SHOVEL',
  SIGNAL_WHISTLE = 'SIGNAL_WHISTLE',
  SIGNET_RING = 'SIGNET_RING',
  SLING_BULLETS_ = 'SLING_BULLETS_',
  SOAP = 'SOAP',
  SPELLBOOK = 'SPELLBOOK',
  SPIKES_IRON_ = 'SPIKES_IRON_',
  SPRIG_OF_MISTLETOE = 'SPRIG_OF_MISTLETOE',
  SPYGLASS = 'SPYGLASS',
  STAFF = 'STAFF',
  STRING = 'STRING',
  TENT_TWOPERSON = 'TENT_TWOPERSON',
  TINDERBOX = 'TINDERBOX',
  TORCH = 'TORCH',
  TOTEM = 'TOTEM',
  VIAL = 'VIAL',
  WAND = 'WAND',
  WATERSKIN = 'WATERSKIN',
  WHETSONE = 'WHETSONE',
  WOODEN_STAFF = 'WOODEN_STAFF',
  YEW_WAND = 'YEW_WAND',
}

export const ADVENTURING_GEAR_CONFIG: {
  [s: string]: {
    label: string;
    cost: number;
    weight: number;
    description?: string;
    attack?: AttackEntry;
    type?: ADVENTURING_GEAR_TYPE;
  };
} = {
  ABACUS: {
    label: 'Abacus',
    cost: 2,
    weight: 2,
  },
  ACID_VIAL: {
    label: 'Acid (vial)',
    cost: 25,
    weight: 1,
    description:
      'As an action, you can splash the contents of this vial onto a creature within 5 feet of you or throw the vial up to 20 feet, shattering it on impact. In either case, make a ranged attack against a creature or object, treating the acid as an improvised weapon. On a hit, the target takes 2d6 acid damage.',
    attack: {
      label: 'Acid (vial)',
      source: 'Equipment',
      attack: { range: '20', isEnabled: true, stat: STATS.STR, critRange: 20 },
      damage: [
        {
          base: [[2, DICE.d6]],
          isEnabled: true,
          stat: null,
          type: 'acid',
        },
        UNUSED_DAMAGE,
      ],
      savingThrow: UNUSED_SAVING_THROW,
    },
  },
  AMULET: {
    label: 'Amulet',
    cost: 5,
    weight: 1,
    type: ADVENTURING_GEAR_TYPE.HOLY_SYMBOL,
  },
  ALCHEMISTS_FIRE_FLASK: {
    label: "Alchemist's fire (flask)",
    cost: 50,
    weight: 1,
    description:
      "This sticky, adhesive fluid ignites when exposed to air. As an action, you can throw this flask up to 20 feet, shattering it on impact. Make a ranged attack against a creature or object, treating the alchemist's fire as an improvised weapon. On a hit, the target takes 1d4 fire damage at the start of each of its turns. A creature can end this damage by using its action to make a DC 10 Dexterity check to extinguish the flames.",
    attack: {
      label: "Alchemist's fire (flask)",
      source: 'Equipment',
      description:
        'On a hit, the target takes 1d4 fire damage at the start of each of its turns. A creature can end this damage by using its action to make a DC 10 Dexterity check to extinguish the flames.',
      attack: { range: '20', isEnabled: true, stat: STATS.STR, critRange: 20 },
      damage: [
        {
          base: [[1, DICE.d4]],
          isEnabled: true,
          stat: null,
          type: 'fire',
        },
        UNUSED_DAMAGE,
      ],
      savingThrow: UNUSED_SAVING_THROW,
    },
  },
  EMBLEM: {
    label: 'Emblem',
    cost: 5,
    weight: 0,
    type: ADVENTURING_GEAR_TYPE.HOLY_SYMBOL,
  },
  RELIQUARY: {
    label: 'Reliquary',
    cost: 5,
    weight: 2,
    type: ADVENTURING_GEAR_TYPE.HOLY_SYMBOL,
  },
  ARROW: {
    label: 'Arrow',
    cost: 0.05,
    weight: 0.05,
  },
  HOLY_WATER_FLASK: {
    label: 'Holy water (flask)',
    cost: 25,
    weight: 1,
    description:
      'As an action, you can splash the contents of this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. In either case, make a ranged attack against a target creature, treating the holy water as an improvised weapon. If the target is a fiend or undead, it takes 2d6 radiant damage.',
    attack: {
      label: 'Holy water (flask)',
      source: 'Equipment',
      description: 'only deals radiant damage to undead',
      attack: { range: '20', isEnabled: true, stat: STATS.STR, critRange: 20 },
      damage: [
        { base: [[2, DICE.d6]], isEnabled: true, stat: null, type: 'radiant' },
        UNUSED_DAMAGE,
      ],
      savingThrow: UNUSED_SAVING_THROW,
    },
  },
  BLOWGUN_NEEDLE: {
    label: 'Blowgun needle',
    cost: 0.02,
    weight: 0.02,
  },
  HOURGLASS: {
    label: 'Hourglass',
    cost: 25,
    weight: 1,
  },
  CROSSBOW_BOLT: {
    label: 'Crossbow bolt',
    cost: 0.05,
    weight: 0.05,
  },
  HUNTING_TRAP: {
    label: 'Hunting trap',
    cost: 5,
    weight: 25,
    description:
      'When you use your action to set it, this trap forms a saw-toothed steel ring that snaps shut when a creature steps on a pressure plate in the center. The trap is affixed by a heavy chain to an immobile object, such as a tree or a spike driven into the ground. A creature that steps on the plate must succeed on a DC 13 Dexterity saving throw or take 1d4 piercing damage and stop moving. Thereafter, until the creature breaks free of the trap, its movement is limited by the length of the chain (typically 3 feet long). A creature can use its action to make a DC 13 Strength check, freeing itself or another creature within its reach on a success. Each failed check deals 1 piercing damage to the trapped creature.',
  },
  SLING_BULLETS_: {
    label: 'Sling bullets (20)',
    cost: 0.04,
    weight: 1,
  },
  INK_OUNCE_BOTTLE: {
    label: 'Ink (1 ounce bottle)',
    cost: 10,
    weight: 0,
  },
  ANTITOXIN_VIAL: {
    label: 'Antitoxin (vial)',
    cost: 50,
    weight: 0,
    description:
      'A creature that drinks this vial of liquid gains advantage on saving throws against poison for 1 hour. It confers no benefit to undead or constructs.',
  },
  INK_PEN: {
    label: 'Ink pen',
    cost: 0.02,
    weight: 0,
  },
  JUG_OR_PITCHER: {
    label: 'Jug or pitcher',
    cost: 0.02,
    weight: 4,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  CRYSTAL: {
    label: 'Crystal',
    cost: 10,
    weight: 1,
    type: ADVENTURING_GEAR_TYPE.ARCANE_FOCUS,
  },
  LADDER_FOOT: {
    label: 'Ladder (10-foot)',
    cost: 0.1,
    weight: 25,
  },
  ORB: {
    label: 'Orb',
    cost: 20,
    weight: 3,
    type: ADVENTURING_GEAR_TYPE.ARCANE_FOCUS,
  },
  LAMP: {
    label: 'Lamp',
    cost: 0.5,
    weight: 1,
    description:
      'A lamp casts bright ligh⁠⁠t in a 15-foot radius and dim li⁠g⁠ht for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil.',
  },
  ROD: {
    label: 'Rod',
    cost: 10,
    weight: 2,
    type: ADVENTURING_GEAR_TYPE.ARCANE_FOCUS,
  },
  LANTERN_BULLSEYE: {
    label: 'Lantern, bullseye',
    cost: 10,
    weight: 2,
    description:
      'A bullseye lantern casts bright lig⁠⁠ht in a 60-foot cone and dim lig⁠ht for an additional 60 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil.',
  },
  STAFF: {
    label: 'Staff',
    cost: 5,
    weight: 4,
    type: ADVENTURING_GEAR_TYPE.ARCANE_FOCUS,
  },
  LANTERN_HOODED: {
    label: 'Lantern, hooded',
    cost: 5,
    weight: 2,
    description:
      'A hooded lantern casts bright lig⁠ht in a 30-foot radius and dim lig⁠ht for an additional 30 feet. Once lit, it burns for 6 hours on a flask (1 pint) of oil. As an action, you can lower the hood, reducing the lig⁠ht to dim lig⁠ht in a 5-foot radius.',
  },
  WAND: {
    label: 'Wand',
    cost: 10,
    weight: 1,
    type: ADVENTURING_GEAR_TYPE.ARCANE_FOCUS,
  },
  LOCK: {
    label: 'Lock',
    cost: 10,
    weight: 1,
    description:
      'A key is provided with the lock. Without the key, a creature proficient with thieves’ tools can pick this lock with a successful DC 15 Dexterity check. Your DM may decide that better locks are available for higher prices.',
  },
  BACKPACK: {
    label: 'Backpack',
    cost: 2,
    weight: 5,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  MAGNIFYING_GLASS: {
    label: 'Magnifying glass',
    cost: 100,
    weight: 0,
    description:
      'This lens allows a closer look at small objects. It is also useful as a substitute for flint and steel when starting fires. Lighting a fire with a magnifying glass requires lig⁠ht as bright as sunlight to focus, tinder to ignite, and about 5 minutes for the fire to ignite. A magnifying glass grants advantage on any ability check made to appraise or inspect an item that is small or highly detailed.',
  },
  BALL_BEARINGS: {
    label: 'Ball bearings (bag of 1,000)',
    cost: 1,
    weight: 2,
    description:
      'As an action, you can spill these tiny metal balls from their pouch to cover a level, square area that is 10 feet on a side. A creature moving across the covered area must succeed on a DC 10 Dexterity saving throw or fall prone. A creature moving through the area at half speed doesn’t need to make the save.',
  },
  MANACLES: {
    label: 'Manacles',
    cost: 2,
    weight: 6,
    description:
      'These metal restraints can bind a Small or Medium creature. Escaping the manacles requires a successful DC 20 Dexterity check. Breaking them requires a successful DC 20 Strength check. Each set of manacles comes with one key. Without the key, a creature proficient with thieves’ tools can pick the manacles’ lock with a successful DC 15 Dexterity check. Manacles have 15 hit points.',
  },
  BARREL: {
    label: 'Barrel',
    cost: 2,
    weight: 70,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  MESS_KIT: {
    label: 'Mess kit',
    cost: 0.2,
    weight: 1,
    description:
      'This tin box contains a cup and simple cutlery. The box clamps together, and one side can be used as a cooking pan and the other as a plate or shallow bowl.',
  },
  KNIFE_SMALL: {
    label: 'Knife, small',
    cost: 0.1,
    weight: 0.1,
  },
  SAND_BAG_OF: {
    label: 'Bag of sand',
    cost: 0.05,
    weight: 0.05,
  },
  BASKET: {
    label: 'Basket',
    cost: 0.4,
    weight: 2,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  MIRROR_STEEL: {
    label: 'Mirror, steel',
    cost: 5,
    weight: 1,
  },
  BEDROLL: {
    label: 'Bedroll',
    cost: 1,
    weight: 7,
  },
  OIL_FLASK: {
    label: 'Oil (flask)',
    cost: 0.1,
    weight: 1,
    description:
      'Oil usually comes in a clay flask that holds 1 pint. As an action, you can splash the oil in this flask onto a creature within 5 feet of you or throw it up to 20 feet, shattering it on impact. Make a ranged attack against a target creature or object, treating the oil as an improvised weapon. On a hit, the target is covered in oil. If the target takes any fire damage before the oil dries (after 1 minute), the target takes an additional 5 fire damage from the burning oil. You can also pour a flask of oil on the ground to cover a 5-foot-square area, provided that the surface is level. If lit, the oil burns for 2 rounds and deals 5 fire damage to any creature that enters the area or ends its turn in the area. A creature can take this damage only once per turn.',
    attack: {
      label: 'Oil (flask)',
      source: 'Equipment',
      description:
        'Creature is doused with oil on hit. If the target takes any fire damage before the oil dries (after 1 minute), the target takes an additional 5 fire damage from the burning oil.',
      attack: { range: '20', isEnabled: true, stat: STATS.STR, critRange: 20 },
      damage: [
        {
          base: [[1, DICE.d4]],
          isEnabled: true,
          stat: STATS.STR,
          type: 'bludgeoning',
        },
        UNUSED_DAMAGE,
      ],
      savingThrow: UNUSED_SAVING_THROW,
    },
  },
  BELL: {
    label: 'Bell',
    cost: 1,
    weight: 0,
  },
  PAPER_ONE_SHEET: {
    label: 'Paper (one sheet)',
    cost: 0.2,
    weight: 0,
  },
  BLANKET: {
    label: 'Blanket',
    cost: 0.5,
    weight: 3,
  },
  PARCHMENT_ONE_SHEET: {
    label: 'Parchment (one sheet)',
    cost: 0.1,
    weight: 0,
  },
  BLOCK_AND_TACKLE: {
    label: 'Block and tackle',
    cost: 1,
    weight: 5,
    description:
      'A set of pulleys with a cable threaded through them and a hook to attach to objects, a block and tackle allows you to hoist up to four times the weight you can normally lift.',
  },
  PERFUME_VIAL: {
    label: 'Perfume (vial)',
    cost: 5,
    weight: 0,
  },
  BOOK: {
    label: 'Book',
    cost: 25,
    weight: 5,
    description:
      'A book might contain poetry, historical accounts, information pertaining to a particular field of lore, diagrams and notes on gnomish contraptions, or just about anything else that can be represented using text or pictures. A book of spells is a spellbook (described later in this section).',
  },
  PICK_MINERS: {
    label: "Pick, miner's",
    cost: 2,
    weight: 10,
  },
  BOTTLE_GLASS: {
    label: 'Bottle, glass',
    cost: 2,
    weight: 2,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  PITON: {
    label: 'Piton',
    cost: 0.05,
    weight: 1,
  },
  BUCKET: {
    label: 'Bucket',
    cost: 0.05,
    weight: 2,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  POISON_BASIC_VIAL: {
    label: 'Poison, basic (vial)',
    cost: 100,
    weight: 0,
    description:
      'You can use the poison in this vial to coat one slashing or piercing weapon or up to three pieces of ammunition. Applying the poison takes an action. A creature hit by the poisoned weapon or ammunition must make a DC 10 Constitution saving throw or take 1d4 poison damage. Once applied, the poison retains potency for 1 minute before drying.',
    // TODO: GLOBAL DAMAGE MODIFIER
  },
  CALTROPS: {
    label: 'Caltrops (bag of 20)',
    cost: 1,
    weight: 2,
    description:
      'As an action, you can spread a bag of caltrops to cover a square area that is 5 feet on a side. Any creature that enters the area must succeed on a DC 15 Dexterity saving throw or stop moving this turn and take 1 piercing damage. Taking this damage reduces the creature’s walking speed by 10 feet until the creature regains at least 1 hit point. A creature moving through the area at half speed doesn’t need to make the save',
  },
  POLE_FOOT: {
    label: 'Pole (10-foot)',
    cost: 0.05,
    weight: 7,
  },
  CANDLE: {
    label: 'Candle',
    cost: 0.01,
    weight: 0,
    description:
      'For 1 hour, a candle sheds bright li⁠g⁠ht in a 5-foot radius and dim li⁠g⁠ht for an additional 5 feet.',
  },
  POT_IRON: {
    label: 'Pot, iron',
    cost: 2,
    weight: 10,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  CASE_CROSSBOW_BOLT: {
    label: 'Case, crossbow bolt',
    cost: 1,
    weight: 1,
    description: 'This wooden case can hold up to twenty crossbow bolts',
  },
  POTION_OF_HEALING: {
    label: 'Potion of ⁠healing',
    cost: 50,
    weight: 1,
    description:
      'A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points. Drinking or administering a potion takes an action.',
  },
  CASE_MAP_OR_SCROLL: {
    label: 'Case, map or scroll',
    cost: 1,
    weight: 1,
    description:
      'This cylindrical leather case can hold up to ten rolled-up sheets of paper or five rolled-up sheets of parchment.',
  },
  POUCH: {
    label: 'Pouch',
    cost: 0.5,
    weight: 1,
    description:
      'A cloth or leather pouch can hold up to 20 sling bullets or 50 blowgun needles, among other things. A compartmentalized pouch for holding spell components is called a component pouch (described earlier in this section).',
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  CHAIN__FEET: {
    label: 'Chain (10 feet)',
    cost: 5,
    weight: 10,
    description:
      'A chain has 10 hit points. It can be burst with a successful DC 20 Strength check.',
  },
  QUIVER: {
    label: 'Quiver',
    cost: 1,
    weight: 1,
    description: 'A quiver can hold up to 20 arrows',
  },
  CHALK__PIECE: {
    label: 'Chalk (1 piece)',
    cost: 0.01,
    weight: 0,
  },
  RAM_PORTABLE: {
    label: 'Ram, portable',
    cost: 4,
    weight: 35,
    description:
      'You can use a portable ram to break down doors. When doing so, you gain a +4 bonus on the Strength check. One other character can help you use the ram, giving you advantage on this check.',
  },
  CHEST: {
    label: 'Chest',
    cost: 5,
    weight: 25,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  RATIONS_DAY: {
    label: 'Rations (1/day)',
    cost: 0.5,
    weight: 2,
    description:
      'Rations consist of dry foods suitable for extended travel, including jerky, dried fruit, hardtack, and nuts.',
  },
  CLIMBERS_KIT: {
    label: "Climber's kit",
    cost: 25,
    weight: 12,
    description:
      'A climber’s kit includes spec⁠ial pitons, boot tips, gloves, and a harness. You can use the climber’s kit as an action to anchor yourself; when you do, you can’t fall more than 25 feet from the point where you anchored yourself, and you can’t climb more than 25 feet away from that point without undoing the anchor.',
  },
  ROBES: {
    label: 'Robes',
    cost: 1,
    weight: 4,
  },
  CLOTHES_COMMON: {
    label: 'Clothes, com⁠mon',
    cost: 0.5,
    weight: 3,
    type: ADVENTURING_GEAR_TYPE.CLOTHES,
  },
  ROPE_HEMPEN_50: {
    label: 'Rope, hempen (50 feet)',
    cost: 1,
    weight: 10,
    description:
      'Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check.',
  },
  CLOTHES_COSTUME: {
    label: 'Clothes, costume',
    cost: 5,
    weight: 4,
    type: ADVENTURING_GEAR_TYPE.CLOTHES,
  },
  ROPE_SILK__FEET: {
    label: 'Rope, silk (50 feet)',
    cost: 10,
    weight: 5,
  },
  CLOTHES_FINE: {
    label: 'Clothes, fine',
    cost: 15,
    weight: 6,
    type: ADVENTURING_GEAR_TYPE.CLOTHES,
  },
  CLOTHES_OCCUPATIONAL: {
    label: 'Clothes, occupational',
    cost: 5,
    weight: 7,
    type: ADVENTURING_GEAR_TYPE.CLOTHES,
  },
  SACK: {
    label: 'Sack',
    cost: 0.01,
    weight: 1,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  CLOTHES_TRAVELERS: {
    label: "Clothes, traveler's",
    cost: 2,
    weight: 4,
    type: ADVENTURING_GEAR_TYPE.CLOTHES,
  },
  SCALE_MERCHANTS: {
    label: "Scale, merchant's",
    cost: 5,
    weight: 3,
    description:
      'A scale includes a small balance, pans, and a suitable assortment of weights up to 2 pounds. With it, you can measure the exact weight of small objects, such as raw precious metals or trade goods, to help determine their worth.',
  },
  COMPONENT_POUCH: {
    label: 'Component pouch',
    cost: 25,
    weight: 2,
    description:
      "A component pouch is a small, watertight leather belt pouch that has compartments to hold all the material components and other spe⁠cial items you need to cast your spells, except for those components that have a specific cost (as indicated in a spell's description).",
    type: ADVENTURING_GEAR_TYPE.ARCANE_FOCUS,
  },
  SEALING_WAX: {
    label: 'Sealing wax',
    cost: 0.5,
    weight: 0,
  },
  CROWBAR: {
    label: 'Crowbar',
    cost: 2,
    weight: 5,
    description:
      'Using a crowbar grants advantage to Strength checks where the crowbar’s leverage can be applied.',
  },
  SHOVEL: {
    label: 'Shovel',
    cost: 2,
    weight: 5,
  },
  SIGNAL_WHISTLE: {
    label: 'Signal whistle',
    cost: 0.05,
    weight: 0,
  },
  SPRIG_OF_MISTLETOE: {
    label: 'Sprig of mistletoe',
    cost: 1,
    weight: 0,
    type: ADVENTURING_GEAR_TYPE.DRUIDIC_FOCUS,
  },
  SIGNET_RING: {
    label: 'Signet ring',
    cost: 5,
    weight: 0,
  },
  TOTEM: {
    label: 'Totem',
    cost: 1,
    weight: 0,
    type: ADVENTURING_GEAR_TYPE.DRUIDIC_FOCUS,
  },
  SOAP: {
    label: 'Soap',
    cost: 0.02,
    weight: 0,
  },
  WOODEN_STAFF: {
    label: 'Wooden staff',
    cost: 5,
    weight: 4,
    type: ADVENTURING_GEAR_TYPE.DRUIDIC_FOCUS,
  },
  SPELLBOOK: {
    label: 'Spellbook',
    cost: 50,
    weight: 3,
    description:
      'Essential for wizards, a spellbook is a leather-bound tome with 100 blank vellum pages suitable for recording spells.',
  },
  YEW_WAND: {
    label: 'Yew wand',
    cost: 10,
    weight: 1,
    type: ADVENTURING_GEAR_TYPE.DRUIDIC_FOCUS,
  },
  SPIKES_IRON_: {
    label: 'Spikes, iron (10)',
    cost: 1,
    weight: 5,
  },
  FISHING_TACKLE: {
    label: 'Fishing tackle',
    cost: 1,
    weight: 4,
    description:
      'This kit includes a wooden rod, silken line, corkwood bobbers, steel hooks, lead sinkers, velvet lures, and narrow netting.',
  },
  SPYGLASS: {
    label: 'Spyglass',
    cost: 1,
    weight: 1,
    description:
      'Objects viewed through a spyglass are magnified to twice their size.',
  },
  FLASK_OR_TANKARD: {
    label: 'Flask or tankard',
    cost: 0.02,
    weight: 1,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  TENT_TWOPERSON: {
    label: 'Tent, two-person',
    cost: 2,
    weight: 20,
    description: 'A simple and portable canvas shelter, a tent sleeps two.',
  },
  GRAPPLING_HOOK: {
    label: 'Grappling hook',
    cost: 2,
    weight: 4,
  },
  TINDERBOX: {
    label: 'Tinderbox',
    cost: 0.5,
    weight: 1,
    description:
      'This small container holds flint, fire steel, and tinder (usually dry cloth soaked in lig⁠ht oil) used to kindle a fire. Using it to lig⁠ht a torch—or anything else with abundant, exposed fuel—takes an action. Lighting any other fire takes 1 minute.',
  },
  HAMMER: {
    label: 'Hammer',
    cost: 1,
    weight: 3,
  },
  TORCH: {
    label: 'Torch',
    cost: 0.01,
    weight: 1,
    description:
      'A torch burns for 1 hour, providing bright lig⁠ht in a 20-foot radius and dim lig⁠ht for an additional 20 feet. If you make a melee attack with a burning torch and hit, it deals 1 fire damage.',
  },
  STRING: {
    label: 'String (10 feet)',
    cost: 0.1,
    weight: 1,
  },
  HAMMER_SLEDGE: {
    label: 'Hammer, sledge',
    cost: 2,
    weight: 10,
  },
  VIAL: {
    label: 'Vial',
    cost: 1,
    weight: 0,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  HEALERS_KIT: {
    label: "Healer's kit",
    cost: 5,
    weight: 3,
    description:
      'This kit is a leather pouch containing bandages, salves, and splints. The kit has ten uses. As an action, you can expend one use of the kit to stabilize a creature that has 0 hit points, without needing to make a Wisdom (Medicine) check.',
  },
  WATERSKIN: {
    label: 'Waterskin',
    cost: 0.2,
    weight: 5,
    type: ADVENTURING_GEAR_TYPE.CONTAINER,
  },
  ALMS_BOX: {
    label: 'Alms box',
    cost: 1,
    weight: 6,
  },
  INCENSE_BLOCK: {
    label: 'Incense, block',
    cost: 0.1,
    weight: 0.5,
  },
  CENSER: {
    label: 'Censer',
    cost: 5,
    weight: 2,
  },
  WHETSONE: {
    label: 'Whetsone',
    cost: 0.01,
    weight: 1,
  },
};
console.log(ADVENTURING_GEAR_CONFIG);
export const ARCANE_FOCUS_GEAR = pickBy(
  ADVENTURING_GEAR,
  (v) => ADVENTURING_GEAR_CONFIG[v].type === ADVENTURING_GEAR_TYPE.ARCANE_FOCUS,
);
export const HOLY_SYMBOL_GEAR = pickBy(
  ADVENTURING_GEAR,
  (v) => ADVENTURING_GEAR_CONFIG[v].type === ADVENTURING_GEAR_TYPE.HOLY_SYMBOL,
);
export const DRUIDIC_FOCUS_GEAR = pickBy(
  ADVENTURING_GEAR,
  (v) =>
    ADVENTURING_GEAR_CONFIG[v].type === ADVENTURING_GEAR_TYPE.DRUIDIC_FOCUS,
);

export enum EQUIPMENT_PACKS {
  BURGLAR = 'BURGLAR',
  DIPLOMAT = 'DIPLOMAT',
  DUNGEONEER = 'DUNGEONEER',
  ENTERTAINER = 'ENTERTAINER',
  EXPLORER = 'EXPLORER',
  PRIEST = 'PRIEST',
  SCHOLAR = 'SCHOLAR',
}

export const EQUIPMENT_PACK_CONFIGS: {
  [s in EQUIPMENT_PACKS]: {
    label: string;
    equipment: Array<{ type: string; count: number }>;
    cost: number;
  };
} = {
  [EQUIPMENT_PACKS.BURGLAR]: {
    label: "Burglar's pack",
    equipment: [
      { type: ADVENTURING_GEAR.BACKPACK, count: 1 },
      { type: ADVENTURING_GEAR.BALL_BEARINGS, count: 1 },
      { type: ADVENTURING_GEAR.STRING, count: 1 },
      { type: ADVENTURING_GEAR.BELL, count: 1 },
      { type: ADVENTURING_GEAR.CANDLE, count: 5 },
      { type: ADVENTURING_GEAR.CROWBAR, count: 1 },
      { type: ADVENTURING_GEAR.HAMMER, count: 1 },
      { type: ADVENTURING_GEAR.PITON, count: 10 },
      { type: ADVENTURING_GEAR.LANTERN_HOODED, count: 1 },
      { type: ADVENTURING_GEAR.OIL_FLASK, count: 2 },
      { type: ADVENTURING_GEAR.RATIONS_DAY, count: 5 },
      { type: ADVENTURING_GEAR.TINDERBOX, count: 1 },
      { type: ADVENTURING_GEAR.WATERSKIN, count: 1 },
      { type: ADVENTURING_GEAR.ROPE_HEMPEN_50, count: 1 },
    ],
    cost: 16,
  },
  [EQUIPMENT_PACKS.DIPLOMAT]: {
    label: "Diplomat's pack",
    equipment: [
      { type: ADVENTURING_GEAR.CHEST, count: 1 },
      { type: ADVENTURING_GEAR.CASE_MAP_OR_SCROLL, count: 2 },
      { type: ADVENTURING_GEAR.CLOTHES_FINE, count: 1 },
      { type: ADVENTURING_GEAR.INK_OUNCE_BOTTLE, count: 1 },
      { type: ADVENTURING_GEAR.INK_PEN, count: 1 },
      { type: ADVENTURING_GEAR.LAMP, count: 1 },
      { type: ADVENTURING_GEAR.OIL_FLASK, count: 2 },
      { type: ADVENTURING_GEAR.PAPER_ONE_SHEET, count: 5 },
      { type: ADVENTURING_GEAR.PERFUME_VIAL, count: 1 },
      { type: ADVENTURING_GEAR.SEALING_WAX, count: 1 },
      { type: ADVENTURING_GEAR.SOAP, count: 1 },
    ],
    cost: 39,
  },
  [EQUIPMENT_PACKS.DUNGEONEER]: {
    label: "Dungeoneer's pack",
    equipment: [
      { type: ADVENTURING_GEAR.BACKPACK, count: 1 },
      { type: ADVENTURING_GEAR.CROWBAR, count: 1 },
      { type: ADVENTURING_GEAR.HAMMER, count: 1 },
      { type: ADVENTURING_GEAR.PITON, count: 10 },
      { type: ADVENTURING_GEAR.TORCH, count: 10 },
      { type: ADVENTURING_GEAR.TINDERBOX, count: 1 },
      { type: ADVENTURING_GEAR.RATIONS_DAY, count: 10 },
      { type: ADVENTURING_GEAR.WATERSKIN, count: 1 },
      { type: ADVENTURING_GEAR.ROPE_HEMPEN_50, count: 1 },
    ],
    cost: 12,
  },
  [EQUIPMENT_PACKS.ENTERTAINER]: {
    label: "Entertainer's pack",
    equipment: [
      { type: ADVENTURING_GEAR.BACKPACK, count: 1 },
      { type: ADVENTURING_GEAR.BEDROLL, count: 1 },
      { type: ADVENTURING_GEAR.CLOTHES_COSTUME, count: 2 },
      { type: ADVENTURING_GEAR.TORCH, count: 10 },
      { type: ADVENTURING_GEAR.WATERSKIN, count: 1 },
      { type: KITS.DISGUISE, count: 1 },
    ],
    cost: 40,
  },
  [EQUIPMENT_PACKS.EXPLORER]: {
    label: "Explorer's pack",
    equipment: [
      { type: ADVENTURING_GEAR.BACKPACK, count: 1 },
      { type: ADVENTURING_GEAR.BEDROLL, count: 1 },
      { type: ADVENTURING_GEAR.MESS_KIT, count: 1 },
      { type: ADVENTURING_GEAR.TINDERBOX, count: 1 },
      { type: ADVENTURING_GEAR.TORCH, count: 10 },
      { type: ADVENTURING_GEAR.RATIONS_DAY, count: 10 },
      { type: ADVENTURING_GEAR.WATERSKIN, count: 1 },
      { type: ADVENTURING_GEAR.ROPE_HEMPEN_50, count: 1 },
    ],
    cost: 16,
  },
  [EQUIPMENT_PACKS.PRIEST]: {
    label: "Priest's pack",
    equipment: [
      { type: ADVENTURING_GEAR.BACKPACK, count: 1 },
      { type: ADVENTURING_GEAR.BLANKET, count: 1 },
      { type: ADVENTURING_GEAR.CANDLE, count: 10 },
      { type: ADVENTURING_GEAR.TINDERBOX, count: 1 },
      { type: ADVENTURING_GEAR.ALMS_BOX, count: 1 },
      { type: ADVENTURING_GEAR.INCENSE_BLOCK, count: 2 },
      { type: ADVENTURING_GEAR.CENSER, count: 1 },
      { type: ADVENTURING_GEAR.CLOTHES_OCCUPATIONAL, count: 1 },
      { type: ADVENTURING_GEAR.RATIONS_DAY, count: 2 },
      { type: ADVENTURING_GEAR.WATERSKIN, count: 1 },
    ],
    cost: 16,
  },
  [EQUIPMENT_PACKS.SCHOLAR]: {
    label: "Scholar's pack",
    equipment: [
      { type: ADVENTURING_GEAR.BACKPACK, count: 1 },
      { type: ADVENTURING_GEAR.BOOK, count: 1 },
      { type: ADVENTURING_GEAR.INK_OUNCE_BOTTLE, count: 1 },
      { type: ADVENTURING_GEAR.INK_PEN, count: 1 },
      { type: ADVENTURING_GEAR.PAPER_ONE_SHEET, count: 10 },
      { type: ADVENTURING_GEAR.RATIONS_DAY, count: 10 },
      { type: ADVENTURING_GEAR.KNIFE_SMALL, count: 1 },
      { type: ADVENTURING_GEAR.SAND_BAG_OF, count: 1 },
    ],
    cost: 16,
  },
};
export const EQUIPMENT_PACK_OPTIONS = entries(EQUIPMENT_PACK_CONFIGS).map(
  ([type, config]) => ({ value: type, label: config?.label }),
);
