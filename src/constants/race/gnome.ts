import { STATS } from 'constants/stats';
import {
  HUMANOID_TYPE_FEATURE,
  getBasicFeature,
  getDarkvision,
  getLanguageFeature,
  getStatsFeature,
  getMovementFeature,
} from './commonRace';
import { LANGUAGES } from 'constants/languages';
import {
  MULTI_PATH,
  RACE_CONFIG_FORMAT,
  RACE_CONFIG_TYPE,
} from 'constants/raceTypes';
import { ProficiencyConfig } from 'constants/general';
import { ResourceConfig } from 'constants/resources';

export const GNOME_CREATE_CONFIG = {
  base: [
    getStatsFeature({ [STATS.INT]: 2 }),
    HUMANOID_TYPE_FEATURE,
    getMovementFeature(25),
    getLanguageFeature(
      [LANGUAGES.GNOMISH],
      'You can speak, read, and write Common and Gnomish. The Gnomish language, which uses the Dwarvish script, is renowned for its technical treatises and its catalogs of knowledge about the natural world.',
    ),
    getBasicFeature({
      label: 'Gnome Cunning',
      description:
        'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
    }),
    getDarkvision(),
  ],

  subRaceOptions: [
    { value: 'Forest Gnome', label: 'Forest Gnome' },
    { value: 'Rock Gnome', label: 'Rock Gnome' },
  ],
  subRace: {
    'Forest Gnome': [
      getStatsFeature({ [STATS.DEX]: 1 }),
      getBasicFeature({
        label: 'Speak with Small Beasts',
        description:
          'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts. Forest gnomes love animals and often keep squirrels, badgers, rabbits, moles, woodpeckers, and other creatures as beloved pets.',
      }),
      //TODO: SPELLCASTING
      /*Natural Illusionist
You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.*/
    ],
    'Rock Gnome': [
      getStatsFeature({ [STATS.CON]: 1 }),
      getBasicFeature({
        label: "Artificer's Lore",
        description:
          'Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.',
      }),
      {
        type: RACE_CONFIG_TYPE.STATIC,
        format: RACE_CONFIG_FORMAT.FEATURE,
        path: MULTI_PATH,
        value: {
          label: 'Tinker',
          description:
            'You have proficiency with artisan’s tools (tinker’s tools). Using those tools, you can spend 1 hour and 10 gp worth of materials to construct a Tiny clockwork device (AC 5, 1 hp). The device ceases to function after 24 hours (unless you spend 1 hour repairing it to keep the device functioning), or when you use your action to dismantle it; at that time, you can reclaim the materials used to create it. You can have up to three such devices active at a time.\n\nWhen you create a device, choose one of the following options:\n\nClockwork Toy: This toy is a clockwork animal, monster, or person, such as a frog, mouse, bird, dragon, or soldier. When placed on the ground, the toy moves 5 feet across the ground on each of your turns in a random direction. It makes noises as appropriate to the creature it represents.\n\nFire Starter: The device produces a miniature flame, which you can use to light a Candle, torch, or campfire. Using the device requires your action.\n\nMusic Box: When opened, this music box plays a single song at a moderate volume. The box stops playing when it reaches the song’s end or when it is closed.',
        },
        config: {
          getFinalValue: (v) => ({
            otherProficiencies: [
              { label: "Tinker's Tools", category: 'Tools' },
            ],
            customChecks: [{ label: "Tinker's Tools" } as ProficiencyConfig],
            resources: [
              {
                label: 'Tinker',
                source: 'Rock Gnome',
                total: 3,
                max: 3,
              } as ResourceConfig,
            ],
          }),
        },
      },
    ],
  },
};
