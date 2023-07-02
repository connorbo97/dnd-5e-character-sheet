import { keyBy, keys, values } from 'lodash';

export enum ARTISAN_TOOLS {
  ALCHEMY = 'ALCHEMY_TOOLS',
  BREWER = 'BREWER_TOOLS',
  CALLIGRAPHY = 'CALLIGRAPHY_TOOLS',
  CARPENTER = 'CARPENTER_TOOLS',
  CARTOGRAPHER = 'CARTOGRAPHER_TOOLS',
  COBBLER = 'COBBLER_TOOLS',
  COOK = 'COOK_TOOLS',
  GLASSBLOWER = 'GLASSBLOWER_TOOLS',
  JEWELER = 'JEWELER_TOOLS',
  LEATHERWORKER = 'LEATHERWORKER_TOOLS',
  MASON = 'MASON_TOOLS',
  PAINTER = 'PAINTER_TOOLS',
  POTTER = 'POTTER_TOOLS',
  SMITH = 'SMITH_TOOLS',
  TINKER = 'TINKER_TOOLS',
  WEAVER = 'WEAVER_TOOLS',
  WOODCARVER = 'WOODCARVER_TOOLS',
}

export enum SKILL_TOOLS {
  NAVIGATOR = 'NAVIGATOR_TOOLS',
  THIEVES = 'THIEVES_TOOLS',
}

export enum KITS {
  DISGUISE = 'DISGUISE_KIT',
  FORGERY = 'FORGERY_KIT',
  HERBALISM = 'HERBALISM_KIT',
  POISONER = 'POISONER_KIT',
}

export enum VEHICLES {
  LAND = 'LAND_PROFICIENCY',
  WATER = 'WATER_PROFICIENCY',
}

export enum GAMING_SETS {
  DICE = 'DICE_SET',
  CHESS = 'CHESS_SET',
  PLAYING_CARDS = 'PLAYING_CARDS_SET',
}

export enum MUSICAL_INSTRUMENTS {
  BAGPIPES = 'BAGPIPES',
  DRUM = 'DRUM',
  DULCIMER = 'DULCIMER',
  FLUTE = 'FLUTE',
  LUTE = 'LUTE',
  LYRE = 'LYRE',
  HORN = 'HORN',
  PAN_FLUTE = 'PAN_FLUTE',
  SHAWM = 'SHAWM',
  VIOL = 'VIOL',
}

export type TOOLS =
  | ARTISAN_TOOLS
  | SKILL_TOOLS
  | GAMING_SETS
  | VEHICLES
  | KITS
  | MUSICAL_INSTRUMENTS;

export const TOOLS_CONFIG: {
  [s in TOOLS]: {
    label: string;
    weight: number;
    cost: number;
    isNotInventory?: boolean;
  };
} = {
  [ARTISAN_TOOLS.ALCHEMY]: {
    label: "Alchemist's supplies",
    weight: 8,
    cost: 500,
  },
  [ARTISAN_TOOLS.BREWER]: {
    label: "Brewer's supplies",
    weight: 9,
    cost: 200,
  },
  [ARTISAN_TOOLS.CALLIGRAPHY]: {
    label: "Calligrapher's supplies",
    weight: 5,
    cost: 100,
  },
  [ARTISAN_TOOLS.CARPENTER]: {
    label: "Carpenter's tools",
    weight: 6,
    cost: 80,
  },
  [ARTISAN_TOOLS.CARTOGRAPHER]: {
    label: "Cartographer's tools",
    weight: 6,
    cost: 150,
  },
  [ARTISAN_TOOLS.COBBLER]: {
    label: "Cobbler's tools",
    weight: 5,
    cost: 5,
  },
  [ARTISAN_TOOLS.COOK]: {
    label: "Cook's Utensils",
    weight: 8,
    cost: 10,
  },
  [ARTISAN_TOOLS.GLASSBLOWER]: {
    label: "Glassblower's tools",
    cost: 300,
    weight: 5,
  },
  [ARTISAN_TOOLS.JEWELER]: {
    label: "Jeweler's Tools",
    cost: 250,
    weight: 2,
  },
  [ARTISAN_TOOLS.LEATHERWORKER]: {
    label: "Leatherworker's tools",
    cost: 50,
    weight: 5,
  },
  [ARTISAN_TOOLS.MASON]: {
    label: "Mason's tools",
    cost: 100,
    weight: 8,
  },
  [SKILL_TOOLS.NAVIGATOR]: {
    label: "Navigator's tools",
    cost: 250,
    weight: 2,
  },
  [ARTISAN_TOOLS.PAINTER]: {
    label: "Painter's supplies",
    cost: 100,
    weight: 5,
  },
  [ARTISAN_TOOLS.POTTER]: {
    label: "Potter's tools",
    cost: 100,
    weight: 3,
  },
  [ARTISAN_TOOLS.SMITH]: {
    label: "Smith's tools",
    cost: 20,
    weight: 8,
  },
  [SKILL_TOOLS.THIEVES]: {
    label: "Thieves' tools",
    cost: 250,
    weight: 1,
  },
  [ARTISAN_TOOLS.TINKER]: {
    label: "Tinker's tools",
    cost: 500,
    weight: 10,
  },
  [ARTISAN_TOOLS.WEAVER]: {
    label: "Weaver's tools",
    cost: 10,
    weight: 5,
  },
  [ARTISAN_TOOLS.WOODCARVER]: {
    label: "Woodcarver's tools",
    cost: 10,
    weight: 5,
  },
  [KITS.DISGUISE]: {
    label: 'Disguise kit',
    cost: 250,
    weight: 3,
  },
  [KITS.FORGERY]: {
    label: 'Forgery kit',
    cost: 150,
    weight: 5,
  },
  [KITS.HERBALISM]: {
    label: 'Herbalism kit',
    cost: 50,
    weight: 3,
  },
  [KITS.POISONER]: {
    label: "Poisoner's kit",
    cost: 500,
    weight: 2,
  },
  [VEHICLES.LAND]: {
    label: 'Land vehicle',
    cost: 0,
    weight: 0,
    isNotInventory: true,
  },
  [VEHICLES.WATER]: {
    label: 'Water vehicle',
    cost: 0,
    weight: 0,
    isNotInventory: true,
  },
  [GAMING_SETS.DICE]: {
    label: 'Dice set',
    cost: 1,
    weight: 0,
  },
  [GAMING_SETS.CHESS]: {
    label: 'Chess set',
    cost: 10,
    weight: 0.5,
  },
  [GAMING_SETS.PLAYING_CARDS]: {
    label: 'Playing card set',
    cost: 5,
    weight: 0,
  },
  [MUSICAL_INSTRUMENTS.BAGPIPES]: {
    label: 'Bagpipes',
    cost: 300,
    weight: 6,
  },
  [MUSICAL_INSTRUMENTS.DRUM]: {
    label: 'Drum',
    cost: 60,
    weight: 3,
  },
  [MUSICAL_INSTRUMENTS.DULCIMER]: {
    label: 'Dulcimer',
    cost: 250,
    weight: 10,
  },
  [MUSICAL_INSTRUMENTS.FLUTE]: {
    label: 'Flute',
    cost: 20,
    weight: 1,
  },
  [MUSICAL_INSTRUMENTS.LUTE]: {
    label: 'Lute',
    cost: 350,
    weight: 2,
  },
  [MUSICAL_INSTRUMENTS.LYRE]: {
    label: 'Lyre',
    cost: 300,
    weight: 2,
  },
  [MUSICAL_INSTRUMENTS.HORN]: {
    label: 'Horn',
    cost: 30,
    weight: 2,
  },
  [MUSICAL_INSTRUMENTS.PAN_FLUTE]: {
    label: 'Pan flute',
    cost: 120,
    weight: 2,
  },
  [MUSICAL_INSTRUMENTS.SHAWM]: {
    label: 'Shawm',
    cost: 20,
    weight: 1,
  },
  [MUSICAL_INSTRUMENTS.VIOL]: {
    label: 'Viol',
    cost: 300,
    weight: 1,
  },
};

export const TOOLS_LIST = keys(TOOLS_CONFIG);
export const TOOLS_DICTIONARY = keyBy(TOOLS_LIST, (k) => k);
const generateToolOption = (t) => ({
  value: t,
  label: TOOLS_CONFIG[t].label,
});
export const TOOL_OPTIONS = TOOLS_LIST.map(generateToolOption);

export const ARTISAN_TOOLS_LIST = values(ARTISAN_TOOLS);
export const ARTISAN_TOOL_OPTIONS = ARTISAN_TOOLS_LIST.map(generateToolOption);

export const SKILL_TOOLS_LIST = values(SKILL_TOOLS);
export const SKILL_TOOL_OPTIONS = SKILL_TOOLS_LIST.map(generateToolOption);

export const KITS_LIST = values(KITS);
export const KIT_OPTIONS = KITS_LIST.map(generateToolOption);

export const VEHICLES_LIST = values(VEHICLES);
export const VEHICLE_OPTIONS = VEHICLES_LIST.map(generateToolOption);

export const GAMING_SETS_LIST = values(GAMING_SETS);
export const GAMING_SET_OPTIONS = GAMING_SETS_LIST.map(generateToolOption);

export const MUSICAL_INSTRUMENTS_LIST = values(MUSICAL_INSTRUMENTS);
export const MUSICAL_INSTRUMENT_OPTIONS =
  MUSICAL_INSTRUMENTS_LIST.map(generateToolOption);
