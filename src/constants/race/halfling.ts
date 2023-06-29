import { STATS } from "constants/stats";
import { HUMANOID_TYPE_FEATURE, getBasicFeature, getLanguageFeature, getMovementFeature, getSizeFeature, getStatsFeature } from "./commonRace";
import { CREATURE_SIZE } from "constants/raceTypes";

export const HALFLING_CREATE_CONFIG = {
    base: [
        getStatsFeature({
            [STATS.DEX]: 2
        }),
        HUMANOID_TYPE_FEATURE,
        getSizeFeature(CREATURE_SIZE.SMALL),
        getMovementFeature(25),
        getLanguageFeature(['Halfling'], "You can speak, read, and write Common and Halfling. The Halfling language isn’t secret, but halflings⁠ are loath to share it with others. They write very little, so they don’t have a rich body of literature. Their oral tradition, however, is very strong. Almost all halflings⁠ speak Common to converse with the people in whose lands they dwell or through which they are traveling."),
        getBasicFeature({
            label: 'Lucky',
            description: "When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.",
        }),
        getBasicFeature({
            label: 'Brave',
            description: 'You have advantage on saving throws against being frightened.',
        }),
        getBasicFeature({
            label: 'Halfling Nimbleness',
            description: 'You can move through the space of any creature that is of a size larger than yours.',
        }),
    ],
    subRaceOptions: [{ value: 'Lightfoot', label: 'Lightfoot' }, { value: 'Stout', label: 'Stout' }],
    subRace: {
        'Lightfoot': [
            getStatsFeature({ [STATS.CHA]: 1 }),
            getBasicFeature({
                label: 'Naturally Stealthy',
                description: "You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you."
            })
        ],
        'Stout': [
            getStatsFeature({ [STATS.CON]: 1 }),
            getBasicFeature({ 
                label: 'Stout Resilience',
                description: "You have advantage on saving throws against poison, and you have resistance against poison damage.",
            })
        ]
    }
}