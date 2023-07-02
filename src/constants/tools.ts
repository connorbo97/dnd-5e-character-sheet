export enum ARTISAN_TOOLS {
  ALCHEMY = 'ALCHEMY',
  BREWER = 'BREWER',
  CALLIGRAPHY = 'CALLIGRAPHY',
  CARPENTER = 'CARPENTER',
  CARTOGRAPHER = 'CARTOGRAPHER',
  COBBLER = 'COBBLER',
  COOK = 'COOK',
  GLASSBLOWER = 'GLASSBLOWER',
  JEWELER = 'JEWELER',
  LEATHERWORKER = 'LEATHERWORKER',
  MASON = 'MASON',
  PAINTER = 'PAINTER',
  POTTER = 'POTTER',
  SMITH = 'SMITH',
  TINKER = 'TINKER',
  WEAVER = 'WEAVER',
  WOODCARVER = 'WOODCARVER',
}

export enum SKILL_TOOLS {
  NAVIGATOR = 'NAVIGATOR',
  THIEVES = 'THIEVES',
}

export enum KITS {
  DISGUISE = 'DISGUISE',
  FORGERY = 'FORGERY',
  HERBALISM = 'HERBALISM',
  POISONER = 'POISONER',
}

export enum VEHICLES {
  LAND = 'LAND',
  WATER = 'WATER',
}

export enum GAMING_SETS {
  DICE = 'DICE',
  CHESS = 'CHESS',
  PLAYING_CARDS = 'PLAYING_CARDS',
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
export const TOOLS_DICTIONARY: {
  [s in TOOLS]: string;
} = {
  ...ARTISAN_TOOLS,
  ...SKILL_TOOLS,
  ...KITS,
  ...VEHICLES,
  ...GAMING_SETS,
  ...MUSICAL_INSTRUMENTS,
};

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
