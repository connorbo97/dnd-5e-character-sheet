import { STATS } from "constants/stats";
import { HUMANOID_TYPE_FEATURE, MEDIUM_SIZE_FEATURE, getStatsFeature, getMovementFeature, getSkillProficiencies, getLanguageFeature, getDarkvision, getBasicFeature } from "./commonRace";
import { SKILLS } from "constants/skills";
import { MULTI_PATH, RACE_CONFIG_FORMAT, RACE_CONFIG_TYPE } from "constants/raceTypes";
import { ResourceConfig } from "constants/resources";

export const HALF_ORC_CREATE_CONFIG = {
    base: [
        getStatsFeature({
            [STATS.STR]: 2,
            [STATS.CON]: 1,
        }),
        HUMANOID_TYPE_FEATURE,
        MEDIUM_SIZE_FEATURE,
        getMovementFeature(30),
        getSkillProficiencies([SKILLS.INTIMIDATION]),
        getLanguageFeature(['Orc'], 'You can speak, read, and write Common and Orc. Orc⁠ is a harsh, grating language with hard consonants. It has no script of its own but is written in the Dwarvish script.'),
        getDarkvision(),
        {
          type: RACE_CONFIG_TYPE.STATIC,
          format: RACE_CONFIG_FORMAT.FEATURE,
          path: MULTI_PATH,
          value: {
            label: 'Relentless Endurance',
            description: "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this feature again until you finish a long rest."
          },
          config: {
            getFinalValue: (v) => ({
              features: v,
              resources: [
                {
                  max: 1,
                  total: 1,
                  resetOnLongRest: true,
                  label: 'Relentless Endurance',
                } as ResourceConfig,
              ],
            }),
          },
        },
        getBasicFeature({
            label: 'Savage Attacks',
            description: "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit."
        })
    ]
}