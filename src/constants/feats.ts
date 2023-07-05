import { values } from 'lodash';
import {
  getHiddenBasicFeatureByLD,
  getHiddenFeature,
} from './race/commonCreatorConfigs';
import { STATS } from './stats';
import { CreateConfigEntry } from './characterCreatorSections';
import { CharacterSheetCustomBonuses } from './characterSheet';
import { getFeatStatBoost } from './commonFeatConfigs';

export enum FEATS {
  ABERRANT_DRAGONMARK = 'ABERRANT_DRAGONMARK',
  ACTOR = 'ACTOR',
  // ADEPT_OF_THE_BLACK_ROBES = 'ADEPT_OF_THE_BLACK_ROBES',
  // ADEPT_OF_THE_RED_ROBES = 'ADEPT_OF_THE_RED_ROBES',
  // ADEPT_OF_THE_WHITE_ROBES = 'ADEPT_OF_THE_WHITE_ROBES',
  ALERT = 'ALERT',
  ARTIFICER_INITIATE = 'ARTIFICER_INITIATE',
  ATHLETE = 'ATHLETE',
  CHARGER = 'CHARGER',
  CHEF = 'CHEF',
  CROSSBOW_EXPERT = 'CROSSBOW_EXPERT',
  CRUSHER = 'CRUSHER',
  DEFENSIVE_DUELIST = 'DEFENSIVE_DUELIST',
  DIVINELY_FAVORED = 'DIVINELY_FAVORED',
  DUAL_WIELDER = 'DUAL_WIELDER',
  DUNGEON_DELVER = 'DUNGEON_DELVER',
  DURABLE = 'DURABLE',
  ELDRITCH_ADEPT = 'ELDRITCH_ADEPT',
  ELEMENTAL_ADEPT = 'ELEMENTAL_ADEPT',
  FEY_TOUCHED = 'FEY_TOUCHED',
  FIGHTING_INITIATE = 'FIGHTING_INITIATE',
  GIFT_OF_THE_CHROMATIC_DRAGON = 'GIFT_OF_THE_CHROMATIC_DRAGON',
  GIFT_OF_THE_GEM_DRAGON = 'GIFT_OF_THE_GEM_DRAGON',
  GIFT_OF_THE_METALLIC_DRAGON = 'GIFT_OF_THE_METALLIC_DRAGON',
  GRAPPLER = 'GRAPPLER',
  GREAT_WEAPON_MASTER = 'GREAT_WEAPON_MASTER',
  GUNNER = 'GUNNER',
  HEALER = 'HEALER',
  HEAVILY_ARMORED = 'HEAVILY_ARMORED',
  HEAVY_ARMOR_MASTER = 'HEAVY_ARMOR_MASTER',
  INITIATE_OF_HIGH_SORCERY = 'INITIATE_OF_HIGH_SORCERY',
  INSPIRING_LEADER = 'INSPIRING_LEADER',
  KEEN_MIND = 'KEEN_MIND',
  KNIGHT_OF_THE_CROWN = 'KNIGHT_OF_THE_CROWN',
  KNIGHT_OF_THE_SWORD = 'KNIGHT_OF_THE_SWORD',
  KNIGHT_OF_THE_ROSE = 'KNIGHT_OF_THE_ROSE',
  LIGHTLY_ARMORED = 'LIGHTLY_ARMORED',
  LINGUIST = 'LINGUIST',
  LUCKY = 'LUCKY',
  MAGE_SLAYER = 'MAGE_SLAYER',
  MAGIC_INITIATE = 'MAGIC_INITIATE',
  MARTIAL_ADEPT = 'MARTIAL_ADEPT',
  MEDIUM_ARMOR_MASTER = 'MEDIUM_ARMOR_MASTER',
  METAMAGIC_ADEPT = 'METAMAGIC_ADEPT',
  MOBILE = 'MOBILE',
  MODERATELY_ARMORED = 'MODERATELY_ARMORED',
  MOUNTED_COMBATANT = 'MOUNTED_COMBATANT',
  OBSERVANT = 'OBSERVANT',
  PIERCER = 'PIERCER',
  POISONER = 'POISONER',
  POLEARM_MASTER = 'POLEARM_MASTER',
  RESILIENT = 'RESILIENT',
  RITUAL_CASTER = 'RITUAL_CASTER',
  SAVAGE_ATTACKER = 'SAVAGE_ATTACKER',
  SENTINEL = 'SENTINEL',
  SHADOW_TOUCHED = 'SHADOW_TOUCHED',
  SHARPSHOOTER = 'SHARPSHOOTER',
  SHIELD_MASTER = 'SHIELD_MASTER',
  SKILL_EXPERT = 'SKILL_EXPERT',
  SKILLED = 'SKILLED',
  SKULKER = 'SKULKER',
  SLASHER = 'SLASHER',
  SPELL_SNIPER = 'SPELL_SNIPER',
  // SQUIRE_OF_SOLAMNIA = 'SQUIRE_OF_SOLAMNIA',
  // STRIXHAVEN_INITIATE = 'STRIXHAVEN_INITIATE',
  // STRIXHAVEN_MASCOT = 'STRIXHAVEN_MASCOT',
  TAVERN_BRAWLER = 'TAVERN_BRAWLER',
  TELEKINETIC = 'TELEKINETIC',
  TELEPATHIC = 'TELEPATHIC',
  TOUGH = 'TOUGH',
  WAR_CASTER = 'WAR_CASTER',
  WEAPON_MASTER = 'WEAPON_MASTER',
}

export const FEAT_CONFIGS: {
  [f: string]: {
    label: string;
    sourceBook: string;
    description: string;
    config?: Array<CreateConfigEntry>;
  };
} = {
  ABERRANT_DRAGONMARK: {
    label: 'Aberrant Dragonmark',
    sourceBook: 'Eberron - Rising from the Last War',
    description:
      '<div><p><em>Prerequisite: No other dragonmark</em></p><p>You have manifested an aberrant dragonmark. Determine its appearance and the flaw associated with it. You gain the following benefits:</p><ul><li>Increase your Constitution score by 1, to a maximum of 20.</li><li>You learn a cantrip of your choice from the <a href="http://dnd5e.wikidot.com/spells:sorcerer">sorcerer spell list</a>. In addition, choose a 1st-level spell from the <a href="http://dnd5e.wikidot.com/spells:sorcerer">sorcerer spell list</a>. You learn that spell and can cast it through your mark. Once you cast it, you must finish a short or long rest before you can cast it again through the mark. Constitution is your spellcasting ability for these spells.</li><li>When you cast the 1st-level spell through your mark, you can expend one of your Hit Dice and roll it. If you roll an even number, you gain a number of temporary hit points equal to the number rolled. If you roll an odd number, one random creature within 30 feet of you (not including you) takes force damage equal to the number rolled. If no other creatures are in range, you take the damage.</li></ul><p>You also develop a random flaw from the Aberrant Dragonmark Flaws table.</p><table><tbody><tr><th colspan="2">Aberrant Dragonmark Flaws</th></tr><tr><th>d8</th><th>Flaw</th></tr><tr><td>1</td><td>Your mark is a source of constant physical pain.</td></tr><tr><td>2</td><td>Your mark whispers to you. Its meaning can be unclear.</td></tr><tr><td>3</td><td>When you\'re stressed, the mark hisses audibly.</td></tr><tr><td>4</td><td>The skin around the mark is burned, scaly, or withered.</td></tr><tr><td>5</td><td>Animals are uneasy around you.</td></tr><tr><td>6</td><td>You have a mood swing any time you use your mark.</td></tr><tr><td>7</td><td>Your looks change slightly whenever you use the mark.</td></tr><tr><td>8</td><td>You have horrific nightmares after you use your mark.</td></tr></tbody></table><p><strong>Option: Greater Aberrant Powers</strong></p><ul><li>At the DM\'s option, a character who has the <em>Aberrant Dragonmark</em> feat has a chance of manifesting greater power. Upon reaching 10th level, such a character has a 10 percent chance of gaining an epic boon from among the options in chapter 7 of the <em>Dungeon Master\'s Guide</em>. If the character fails to gain a boon, they have a 10 percent chance the next time they gain a level.</li><li>If the character gains a boon, the DM chooses it or determines it randomly. The character also permanently loses one of their Hit Dice, and their hit point maximum is reduced by an amount equal to a roll of that die plus their Constitution modifier (minimum reduction of 1). This reduction can\'t be reversed by any means.</li></ul></div>',
  },
  ACTOR: {
    label: 'Actor',
    sourceBook: "Player's Handbook",
    config: [
      getHiddenBasicFeatureByLD(
        'Alert',
        "Always on the lookout for danger, you gain the following benefits\n- Other creatures don't gain advantage on attack rolls against you as a result of being unseen by you.\n- You can't be surprised while you are conscious.\n- You gain a +5 bonus to initiative.",
      ),
      getHiddenFeature({
        path: 'customBonuses.initiative',
        value: {
          initiative: [{ source: 'Alert', value: 5, isStatic: true }],
        } as CharacterSheetCustomBonuses,
      }),
    ],
    description:
      '<div><p>Skilled at mimicry and dramatics, you gain the following benefits:</p><ul><li>Increase your Charisma score by 1, to a maximum of 20.</li></ul><ul><li>You have an advantage on Charisma (Deception) and Charisma (Performance) checks when trying to pass yourself off as a different person.</li></ul><ul><li>You can mimic the speech of another person or the sounds made by other creatures. You must have heard the person speaking, or heard the creature make the sound, for at least 1 minute. A successful Wisdom (Insight) check contested by your Charisma (Deception) check allows a listener to determine that the effect is faked.</li></ul></div>',
  },
  ADEPT_OF_THE_BLACK_ROBES: {
    label: 'Adept of the Black Robes',
    sourceBook: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      '<div><p><em>Prerequisite: 4th Level, <a href="/feat:initiate-of-high-sorcery">Initiate of High Sorcery</a> (Nuitari) Feat</em></p><p>You chose the moon Nuitari to influence your magic, and your ambition and loyalty to the Order of the Black Robes has been recognized, granting you these benefits:</p><ul><li><strong>Ambitious Magic.</strong> You learn one 2nd-level spell of your choice. The 2nd-level spell must be from the <a href="/spells:enchantment">Enchantment</a> or <a href="/spells:necromancy">Necromancy</a> school of magic. You can cast this feat’s 2nd-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast this spell using spell slots you have of the appropriate level. The spell’s spellcasting ability is the one chosen when you gained the <a href="/feat:initiate-of-high-sorcery">Initiate of High Sorcery</a> feat.</li></ul><ul><li><strong>Life Channel.</strong> You can channel your life force into the power of your magic. When a creature you can see within 60 feet of you fails a saving throw against a spell that deals damage that you cast, you can expend a number of Hit Dice equal to the level of the spell. Roll the expended Hit Dice and add them together. The damage that the creature takes increases by an amount equal to that total.</li></ul></div>',
  },
  ADEPT_OF_THE_RED_ROBES: {
    label: 'Adept of the Red Robes',
    sourceBook: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      '<div><p><em>Prerequisite: 4th Level, <a href="/feat:initiate-of-high-sorcery">Initiate of High Sorcery</a> (Lunitari) Feat</em></p><p>You chose the moon Lunitari to influence your magic, and your dedication to maintaining the balance between all things has been recognized by the Order of the Red Robes, granting you these benefits:</p><ul><li><strong>Insightful Magic.</strong> You learn one 2nd-level spell of your choice. The 2nd-level spell must be from the <a href="/spells:illusion">Illusion</a> or <a href="/spells:transmutation">Transmutation</a> school of magic. You can cast this feat’s 2nd-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast this spell using spell slots you have of the appropriate level. The spell’s spellcasting ability is the one chosen when you gained the <a href="/feat:initiate-of-high-sorcery">Initiate of High Sorcery</a> feat.</li></ul><ul><li><strong>Magical Balance.</strong> When you make an attack roll or an ability check and roll a 9 or lower on the d20, you can balance fate and treat the roll as a 10. You can balance fate in this way a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.</li></ul></div>',
  },
  ADEPT_OF_THE_WHITE_ROBES: {
    label: 'Adept of the White Robes',
    sourceBook: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      '<div><p><em>Prerequisite: 4th Level, <a href="/feat:initiate-of-high-sorcery">Initiate of High Sorcery</a> Feat</em></p><p>You chose the moon Solinari to influence your magic, and your oath to use magic to make the world a better place has been recognized by the Order of the White Robes, granting you these benefits:</p><ul><li><strong>Protective Magic.</strong> You learn one 2nd-level spell of your choice. The 2nd-level spell must be from the <a href="/spells:abjuration">Abjuration</a> or <a href="/spells:divination">Divination</a> school of magic. You can cast this feat’s 2nd-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast this spell using spell slots you have of the appropriate level. The spell’s spellcasting ability is the one chosen when you gained the <a href="/feat:initiate-of-high-sorcery">Initiate of High Sorcery</a> feat.</li></ul><ul><li><strong>Protective Ward.</strong> When you or a creature you can see within 30 feet of you takes damage, you can use your reaction to expend a spell slot and weave protective magic around the target. Roll a number of d6s equal to the level of the spell slot expended and reduce the damage the target takes by the total rolled on those dice + your spellcasting ability modifier.</li></ul></div>',
  },
  ALERT: {
    label: 'Alert',
    sourceBook: "Player's Handbook",
    config: [
      getHiddenBasicFeatureByLD(
        'Alert',
        "Always on the lookout for danger, you gain the following benefits\n- Other creatures don't gain advantage on attack rolls against you as a result of being unseen by you.\n- You can't be surprised while you are conscious.\n- You gain a +5 bonus to initiative.",
      ),
      getHiddenFeature({
        path: 'customBonuses.initiative',
        value: {
          initiative: [{ source: 'Alert', value: 5, isStatic: true }],
        } as CharacterSheetCustomBonuses,
      }),
    ],
    description:
      "<div><p>Always on the lookout for danger, you gain the following benefits:</p><ul><li>You can't be surprised while you are conscious.</li></ul><ul><li>You gain a +5 bonus to initiative.</li></ul><ul><li>Other creatures don't gain advantage on attack rolls against you as a result of being unseen by you.</li></ul></div>",
  },
  ARTIFICER_INITIATE: {
    label: 'Artificer Initiate',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      '<div><p>You’ve learned some of an artificer’s inventiveness:</p><ul><li>You learn one cantrip of your choice from the <a href="http://dnd5e.wikidot.com/spells:artificer">Artificer</a> spell list, and you learn one 1st-level spell of your choice from that list. Intelligence is your spellcasting ability for these spells.</li></ul><ul><li>You can cast this feat\'s 1st-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spell using any spell slots you have.</li></ul><ul><li>You gain proficiency with one type of artisan\'s tools of your choice, and you can use that type of tool as a spellcasting focus for any spell you cast that uses Intelligence as its spellcasting ability.</li></ul></div>',
  },
  ATHLETE: {
    label: 'Athlete',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You have undergone extensive physical training to gain the following benefits:</p><ul><li>Increase your Strength or Dexterity score by 1, to a maximum of 20.</li></ul><ul><li>When you are prone, standing up uses only 5 feet of your movement.</li></ul><ul><li>Climbing doesn't cost you extra movement.</li></ul><ul><li>You can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet.</li></ul></div>",
  },
  CHARGER: {
    label: 'Charger',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>When you use your action to Dash, you can use a bonus action to make one melee weapon attack or to shove a creature. If you move at least 10 feet in a straight line immediately before taking this bonus action, you either gain a +5 bonus to the attack’s damage roll (if you chose to make a melee attack and hit) or push the target up to 10 feet away from you (if you chose to shove and you succeed).</p></div>',
  },
  CHEF: {
    label: 'Chef',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      "<div><p>Time and effort spent mastering the culinary arts has paid off. You gain the following benefits:</p><ul><li>Increase your Constitution or Wisdom score by 1, to a maximum of 20.</li></ul><ul><li>You gain proficiency with cook’s utensils if you don’t already have it.</li></ul><ul><li>As part of a short rest, you can cook special food, provided you have ingredients and cook's utensils on hand. You can prepare enough of this food for a number of creatures equal to 4 + your proficiency bonus. At the end of the short rest, any creature who eats the food and spends one or more Hit Dice to regain hit points regains an extra 1d8 hit points.</li></ul><ul><li>With one hour of work or when you finish a long rest, you can cook a number of treats equal to your proficiency bonus. These special treats last 8 hours after being made. A creature can use a bonus action to eat one of those treats to gain temporary hit points equal to your proficiency bonus.</li></ul></div>",
  },
  CROSSBOW_EXPERT: {
    label: 'Crossbow Expert',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>Thanks to extensive practice with the crossbow, you gain the following benefits:</p><ul><li>You ignore the loading quality of crossbows with which you are proficient.</li></ul><ul><li>Being within 5 feet of a hostile creature doesn’t impose disadvantage on your ranged attack rolls.</li></ul><ul><li>When you use the Attack action and attack with a one handed weapon, you can use a bonus action to attack with a hand crossbow you are holding.</li></ul></div>',
  },
  CRUSHER: {
    label: 'Crusher',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      '<div><p>You are practiced in the art of crushing your enemies, granting you the following benefits:</p><ul><li>Increase your Strength or Constitution by 1, to a maximum of 20.</li></ul><ul><li>Once per turn, when you hit a creature with an attack that deals bludgeoning damage, you can move it 5 feet to an unoccupied space, provided the target is no more than one size larger than you.</li></ul><ul><li>When you score a critical hit that deals bludgeoning damage to a creature, attack rolls against that creature are made with advantage until the start of your next turn.</li></ul></div>',
  },
  DEFENSIVE_DUELIST: {
    label: 'Defensive Duelist',
    sourceBook: "Player's Handbook",
    description:
      '<div><p><em>Prerequisite: Dexterity 13 or higher</em></p><p>When you are wielding a finesse weapon with which you are proficient and another creature hits you with a melee attack, you can use your reaction to add your proficiency bonus to your AC for that attack, potentially causing the attack to miss you.</p></div>',
  },
  DIVINELY_FAVORED: {
    label: 'Divinely Favored',
    sourceBook: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      '<div><p><em>Prerequisite: 4th Level, Dragonlance Campaign</em></p><p>A god chose you to carry a spark of their power.</p><p>You learn one cantrip of your choice from the <a href="/spells:cleric">Cleric spell list</a> and one 1st-level spell based on the alignment of your character, as specified in the Alignment Spells table below. You also learn the <a href="/spell:augury">Augury</a> spell.</p><table><tbody><tr><th colspan="2">Alignment Spells</th></tr><tr><th>Alignment</th><th>1st-level Spells</th></tr><tr><td>Evil</td><td>Choose one 1st-level <a href="/spells:warlock">Warlock</a> spell</td></tr><tr><td>Good</td><td>Choose one 1st-level <a href="/spells:cleric">Cleric</a> spell.</td></tr><tr><td>Neutral</td><td>Choose one 1st-level <a href="/spells:druid">Druid</a> spell</td></tr></tbody></table><p>You can cast the chosen 1st-level spell and the <a href="/spell:augury">Augury</a> spell without a spell slot, and you must finish a long rest before you can cast either of these spells in this way again. You can also cast these spells using spell slots you have of the appropriate level.</p><p>Your spellcasting ability for this feat’s spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).</p><p>In addition, you can use a holy symbol as a spellcasting focus for any spell you cast that uses the spellcasting ability you choose when you select this feat.</p></div>',
  },
  DUAL_WIELDER: {
    label: 'Dual Wielder',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You master fighting with two weapons, gaining the following benefits:</p><ul><li>You gain a +1 bonus to AC while you are wielding a separate melee weapon in each hand.</li></ul><ul><li>You can use two-weapon fighting even when the one handed melee weapons you are wielding aren't light.</li></ul><ul><li>You can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.</li></ul></div>",
  },
  DUNGEON_DELVER: {
    label: 'Dungeon Delver',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>Alert to the hidden traps and secret doors found in many dungeons, you gain the following benefits:</p><ul><li>You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.</li></ul><ul><li>You have advantage on saving throws made to avoid or resist traps.</li></ul><ul><li>You have resistance to the damage dealt by traps.</li></ul><ul><li>Travelling at a fast pace doesn't impose the normal -5 penalty on your passive Wisdom (Perception) score.</li></ul></div>",
  },
  DURABLE: {
    label: 'Durable',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>Hardy and resilient, you gain the following benefits:</p><ul><li>Increase your Constitution score by 1, to a maximum of 20.</li></ul><ul><li>When you roll a Hit Die to regain hit points, the minimum number of hit points you regain from the roll equals twice your Constitution modifier (minimum of 2).</li></ul></div>',
  },
  ELDRITCH_ADEPT: {
    label: 'Eldritch Adept',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      '<div><p><em>Prerequisite: Spellcasting or Pact Magic feature</em></p><p>Studying occult lore, you have unlocked eldritch power within yourself: you learn one <a href="http://dnd5e.wikidot.com/warlock:eldritch-invocations">Eldritch Invocation</a> option of your choice from the warlock class. If the invocation has a prerequisite, you can choose that invocation only if you\'re a warlock and only if you meet the prerequisite.</p><p>Whenever you gain a level, you can replace the invocation with another one from the warlock class.</p></div>',
  },
  ELEMENTAL_ADEPT: {
    label: 'Elemental Adept',
    sourceBook: "Player's Handbook",
    description:
      '<div><p><em>Prerequisite: The ability to cast at least one spell</em></p><ul><li>When you gain this feat, choose one of the following damage types: acid, cold, fire, lightning, or thunder.</li></ul><ul><li>Spells you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.</li></ul><ul><li>You can select this feat multiple times. Each time you do so, you must choose a different damage type.</li></ul></div>',
  },
  FEY_TOUCHED: {
    label: 'Fey Touched',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      '<div><p>Your exposure to the Feywild\'s magic has changed you, granting you the following benefits:</p><ul><li>Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.</li></ul><ul><li>You learn the <a href="http://dnd5e.wikidot.com/spell:misty-step">Misty Step</a> spell and one 1st-level spell of your choice. The 1st-level spell must be from the <a href="http://dnd5e.wikidot.com/spells:divination">Divination</a> or <a href="http://dnd5e.wikidot.com/spells:enchantment">Enchantment</a> school of magic. You can cast each of these spells without expending a spell slot. Once you cast either of these spells in this way, you can\'t cast that spell in this way again until you finish a long rest. You can also cast these spells using spell slots you have of the appropriate level. The spells\' spellcasting ability is the ability increased by this feat.</li></ul></div>',
  },
  FIGHTING_INITIATE: {
    label: 'Fighting Initiate',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      "<div><p><em>Prerequisite: Proficiency with a martial weapon</em></p><p>Your martial training has helped you develop a particular style of fighting. As a result, you learn one Fighting Style option of your choice from the fighter class. If you already have a style, the one you choose must be different.</p><p>Whenever you reach a level that grants the Ability Score Improvement feature, you can replace this feat's fighting style with another one from the fighter class that you don't have.</p></div>",
  },
  GIFT_OF_THE_CHROMATIC_DRAGON: {
    label: 'Gift of the Chromatic Dragon',
    sourceBook: "Fizban's Treasury of Dragons",
    description:
      '<div><p>You’ve manifested some of the power of chromatic dragons, granting you the following benefits:</p><ul><li><strong>Chromatic Infusion.</strong> As a bonus action, you can touch a simple or martial weapon and infuse it with one of the following damage types: acid, cold, fire, lightning, or poison. For the next minute, the weapon deals an extra 1d4 damage of the chosen type when it hits. After you use this bonus action, you can’t do so again until you finish a long rest.</li></ul><ul><li><strong>Reactive Resistance.</strong> When you take acid, cold, fire, lightning, or poison damage, you can use your reaction to give yourself resistance to that instance of damage. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.</li></ul></div>',
  },
  GIFT_OF_THE_GEM_DRAGON: {
    label: 'Gift of the Gem Dragon',
    sourceBook: "Fizban's Treasury of Dragons",
    description:
      '<div><p>You’ve manifested some of the power of gem dragons, granting you the following benefits:</p><ul><li><strong>Ability Score Increase.</strong> Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.</li></ul><ul><li><strong>Telekinetic Reprisal.</strong> When you take damage from a creature that is within 10 feet of you, you can use your reaction to emanate telekinetic energy. The creature that dealt damage to you must make a Strength saving throw (DC equals 8 + your proficiency bonus + the ability modifier of the score increased by this feat). On a failed save, the creature takes 2d8 force damage and is pushed up to 10 feet away from you. On a successful save, the creature takes half as much damage and isn’t pushed. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.</li></ul></div>',
  },
  GIFT_OF_THE_METALLIC_DRAGON: {
    label: 'Gift of the Metallic Dragon',
    sourceBook: "Fizban's Treasury of Dragons",
    description:
      '<div><p>You’ve manifested some of the power of metallic dragons, granting you the following benefits:</p><ul><li><strong>Draconic Healing.</strong> You learn the <a href="http://dnd5e.wikidot.com/spell:cure-wounds">Cure Wounds</a> spell. You can cast this spell without expending a spell slot. Once you cast this spell in this way, you can’t do so again until you finish a long rest. You can also cast this spell using spell slots you have. The spell’s spellcasting ability is Intelligence, Wisdom, or Charisma when you cast it with this feat (choose when you gain the feat).</li></ul><ul><li><strong>Protective Wings.</strong> You can manifest protective wings that can shield you or others. When you or another creature you can see within 5 feet of you is hit by an attack roll, you can use your reaction to manifest spectral wings from your back for a moment. You grant a bonus to the target’s AC equal to your proficiency bonus against that attack roll, potentially causing it to miss. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.</li></ul></div>',
  },
  GRAPPLER: {
    label: 'Grappler',
    sourceBook: "Player's Handbook",
    description:
      "<div><p><em>Prerequisite: Strength 13 or higher</em></p><p>You've developed the skills necessary to hold your own in close-quarters grappling. You gain the following benefits:</p><ul><li>You have advantage on attack rolls against a creature you are grappling.</li></ul><ul><li>You can use your action to try to pin a creature grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both restrained until the grapple ends.</li></ul></div>",
  },
  GREAT_WEAPON_MASTER: {
    label: 'Great Weapon Master',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You've learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain the following benefits:</p><ul><li>On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action.</li></ul><ul><li>Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage.</li></ul></div>",
  },
  GUNNER: {
    label: 'Gunner',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      "<div><p>You have a quick hand and keen eye when employing firearms, granting you the following benefits:</p><ul><li>Increase your Dexterity score by 1, to a maximum of 20.</li></ul><ul><li>You gain proficiency with firearms (see “Firearms” in the <em>Dungeon Master’s Guide</em>).</li></ul><ul><li>You ignore the loading property of firearms.</li></ul><ul><li>Being within 5 feet of a hostile creature doesn't impose disadvantage on your ranged attack rolls.</li></ul></div>",
  },
  HEALER: {
    label: 'Healer',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You are an able physician, allowing you to mend wounds quickly and get your allies back in the fight. You gain the following benefits:</p><ul><li>When you use a healer's kit to stabilize a dying creature, that creature also regains 1 hit point.</li></ul><ul><li>As an action. you can spend one use of a healer's kit to tend to a creature and restore 1d6 + 4 hit points to it, plus additional hit points equal to the creature's maximum number of Hit Dice. The creature can't regain hit points from this feat again until it finishes a short or long rest.</li></ul></div>",
  },
  HEAVILY_ARMORED: {
    label: 'Heavily Armored',
    sourceBook: "Player's Handbook",
    description:
      '<div><p><em>Prerequisite: Proficiency with medium armor</em></p><p>You have trained to master the use of heavy armor, gaining the following benefits:</p><ul><li>Increase your Strength score by 1, to a maximum of 20.</li></ul><ul><li>You gain proficiency with heavy armor.</li></ul></div>',
  },
  HEAVY_ARMOR_MASTER: {
    label: 'Heavy Armor Master',
    sourceBook: "Player's Handbook",
    description:
      '<div><p><em>Prerequisite: Proficiency with heavy armor</em></p><p>You can use your armor to deflect strikes that would kill others. You gain the following benefits:</p><ul><li>Increase your Strength score by 1, to a maximum of 20.</li></ul><ul><li>While you are wearing heavy armor, bludgeoning, piercing, and slashing damage that you take from nonmagical attacks is reduced by 3.</li></ul></div>',
  },
  INITIATE_OF_HIGH_SORCERY: {
    label: 'Initiate of High Sorcery',
    sourceBook: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      '<div><p><em>Prerequisite: Dragonlance Campaign, Sorcerer or Wizard Class or Mage of High Sorcery Background</em></p><p>You\'ve received training from magic-users affiliated with the Mages of High Sorcery.</p><p>Choose one of the three moons of Krynn to influence your magic: the black moon, Nuitari; the red moon, Lunitari; or the white moon Solinari. You learn one cantrip of your choice from the <a href="/spells:wizard">Wizard spell list</a> and two 1st-level spells based on the moon you choose, as specified in the Lunar Spells table.</p><table><tbody><tr><th colspan="3">Lunar Spells</th></tr><tr><th>Moon</th><th>1st-Level Spell</th></tr><tr><td>Nuitari</td><td>Choose two from <a href="/spell:dissonant-whispers">Dissonant Whispers</a>, <a href="/spell:false-life">False Life</a>, <a href="/spell:hex">Hex</a>, and <a href="/spell:ray-of-sickness">Ray of Sickness</a></td></tr><tr><td>Lunitari</td><td>Choose two from <a href="/spell:color-spray">Color Spray</a>, <a href="/spell:disguise-self">Disguise Self</a>, <a href="/spell:feather-fall">Feather Fall</a>, and <a href="/spell:longstrider">Longstrider</a></td></tr><tr><td>Solinari</td><td>Choose two from <a href="/spell:comprehend-languages">Comprehend Languages</a>, <a href="/spell:detect-evil-and-good">Detect Evil and Good</a>, <a href="/spell:protection-from-evil-and-good">Protection from Evil and Good</a>, and <a href="/spell:shield">Shield</a></td></tr></tbody></table><p>You can cast each of the chosen 1st-level spells without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spells using any spell slots you have.</p><p>Your spellcasting ability for this feat’s spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).</p></div>',
  },
  INSPIRING_LEADER: {
    label: 'Inspiring Leader',
    sourceBook: "Player's Handbook",
    description:
      "<div><p><em>Prerequisite: Charisma 13 or higher</em></p><p>You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level + your Charisma modifier. A creature can't gain temporary hit points from this feat again until it has finished a short or long rest.</p></div>",
  },
  KEEN_MIND: {
    label: 'Keen Mind',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>You have a mind that can track time, direction, and detail with uncanny precision. You gain the following benefits.</p><ul><li>Increase your Intelligence score by 1, to a maximum of 20.</li></ul><ul><li>You always know which way is north.</li></ul><ul><li>You always know the number of hours left before the next sunrise or sunset.</li></ul><ul><li>You can accurately recall anything you have seen or heard within the past month.</li></ul></div>',
  },
  KNIGHT_OF_THE_CROWN: {
    label: 'Knight of the Crown',
    sourceBook: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      '<div><p><em>Prerequisite: 4th Level, <a href="/feat:squire-of-solamnia">Squire of Solamnia</a> Feat</em></p><p>You are a Knight of Solamnia aligned with the Order of the Crown, a group that extols the virtues of cooperation, loyalty, and obedience. You excel in group combat and gain these benefits:</p><ul><li><strong>Ability Score Increase.</strong> Increase your Strength, Dexterity, or Constitution score by 1, to a maximum of 20.</li></ul><ul><li><strong>Commanding Rally.</strong> As a bonus action, you can command one ally within 30 feet of yourself to attack. If that ally can see or hear you, they can immediately make one weapon attack as a reaction. If the attack hits, the ally can roll a d8 and add the number rolled as a bonus to the attack\'s damage roll. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.</li></ul></div>',
  },
  KNIGHT_OF_THE_SWORD: {
    label: 'Knight of the Sword',
    sourceBook: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      '<div><p><em>Prerequisite: 4th Level, <a href="/feat:squire-of-solamnia">Squire of Solamnia</a> Feat</em></p><p>You are a Knight of Solamnia aligned with the Order of the Sword, a group devoted to heroism and courage. Bravery steels your spirit, granting you these benefits:</p><ul><li><strong>Ability Score Increase</strong> Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.</li></ul><ul><li><strong>Demoralizing Strike.</strong> Once per turn, when you hit a creature with a weapon attack roll, you can attempt to frighten that target. The target must make a Wisdom saving throw (DC equals 8 + your proficiency bonus + the ability modifier of the score increased by this feat). On a failed save, the target is frightened of you until the end of your next turn. On a successful save, the target has disadvantage on the next attack roll it makes before the end of its next turn. You can use this benefit a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.</li></ul></div>',
  },
  KNIGHT_OF_THE_ROSE: {
    label: 'Knight of the Rose',
    sourceBook: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      '<div><p><em>Prerequisite: 4th Level, <a href="/feat:squire-of-solamnia">Squire of Solamnia</a> Feat</em></p><p>You are a Knight of Solamnia aligned with the Order of the Rose, a group known for leadership, justice, and wisdom. Your resolve grants you these benefits:</p><ul><li><strong>Ability Score Increase.</strong> Increase your Constitution, Wisdom, or Charisma score by 1, to a maximum of 20.</li></ul><ul><li><strong>Bolstering Rally.</strong> As a bonus action, you can encourage one creature you can see within 30 feet of yourself (you can choose yourself). If the target can see or hear you, the target gains temporary hit points equal to 1d8 + your proficiency bonus + the ability modifier of the ability score increased by this feat. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.</li></ul></div>',
  },
  LIGHTLY_ARMORED: {
    label: 'Lightly Armored',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>You have trained to master the use of light armor, gaining the following benefits.</p><ul><li>Increase your Strength or Dexterity score by 1, to a maximum of 20.</li></ul><ul><li>You gain proficiency with light armor.</li></ul></div>',
  },
  LINGUIST: {
    label: 'Linguist',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You have studied languages and codes, gaining the following benefits:</p><ul><li>Increase your Intelligence score by 1, to a maximum of 20.</li></ul><ul><li>You learn three languages of your choice.</li></ul><ul><li>You can ably create written ciphers. Others can't decipher a code you create unless you teach them, they succeed on an Intelligence check (DC equal to your Intelligence score + your proficiency bonus), or they use magic to decipher it.</li></ul></div>",
  },
  LUCKY: {
    label: 'Lucky',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You have inexplicable luck that seems to kick in at just the right moment.</p><p>You have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw.</p><p>You can also spend one luck point when an attack roll is made against you. Roll a d20 and then choose whether the attack uses the attacker's roll or yours.</p><p>If more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled.</p><p>You regain your expended luck points when you finish a long rest.</p></div>",
  },
  MAGE_SLAYER: {
    label: 'Mage Slayer',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>You have practiced techniques in melee combat against spellcasters, gaining the following benefits.</p><ul><li>When a creature within 5 feet of you casts a spell, you can use your reaction to make a melee weapon attack against that creature.</li></ul><ul><li>When you damage a creature that is concentrating on a spell, that creature has disadvantage on the saving throw it makes to maintain its concentration.</li></ul><ul><li>You have advantage on saving throws against spells cast by creatures within 5 feet of you.</li></ul></div>',
  },
  MAGIC_INITIATE: {
    label: 'Magic Initiate',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class's spell list.</p><p>In addition, choose one 1st-level spell to learn from that same list. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.</p><p>Your spellcasting ability for these spells depends on the class you chose: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard.</p></div>",
  },
  MARTIAL_ADEPT: {
    label: 'Martial Adept',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>You have martial training that allows you to perform special combat maneuvers. You gain the following benefits.</p><ul><li>You learn two <a href="/fighter:battle-master:maneuvers">maneuvers</a> of your choice from among those available to the Battle Master archetype in the fighter class. If a maneuver you use requires your target to make a saving throw to resist the maneuver\'s effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice).</li></ul><ul><li>You gain one superiority die, which is a d6 (this die is added to any superiority dice you have from another source). This die is used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a short or long rest.</li></ul></div>',
  },
  MEDIUM_ARMOR_MASTER: {
    label: 'Medium Armor Master',
    sourceBook: "Player's Handbook",
    description:
      "<div><p><em>Prerequisite: Proficiency with medium armor</em></p><p>You have practiced moving in medium armor to gain the following benefits:</p><ul><li>Wearing medium armor doesn't impose disadvantage on your Dexterity (Stealth) checks.</li></ul><ul><li>When you wear medium armor, you can add 3, rather than 2, to your AC if you have a Dexterity of 16 or higher.</li></ul></div>",
  },
  METAMAGIC_ADEPT: {
    label: 'Metamagic Adept',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      '<div><p><em>Prerequisite: Spellcasting or Pact Magic feature</em></p><p>You\'ve learned how to exert your will on your spells to alter how they function:</p><ul><li>You learn two <a href="http://dnd5e.wikidot.com/sorcerer#toc12">Metamagic options</a> of your choice from the sorcerer class. You can use only one Metamagic option on a spell when you cast it, unless the option says otherwise. Whenever you reach a level that grants the Ability Score Improvement feature, you can replace one of these Metamagic options with another one from the sorcerer class.</li></ul><ul><li>You gain 2 sorcery points to spend on Metamagic (these points are added to any sorcery points you have from another source but can be used only on Metamagic). You regain all spent sorcery points when you finish a long rest.</li></ul></div>',
  },
  MOBILE: {
    label: 'Mobile',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You are exceptionally speedy and agile. You gain the following benefits:</p><ul><li>Your speed increases by 10 feet.</li></ul><ul><li>When you use the Dash action, difficult terrain doesn't cost you extra movement on that turn.</li></ul><ul><li>When you make a melee attack against a creature, you don't provoke opportunity attacks from that creature for the rest of the turn, whether you hit or not.</li></ul></div>",
  },
  MODERATELY_ARMORED: {
    label: 'Moderately Armored',
    sourceBook: "Player's Handbook",
    description:
      '<div><p><em>Prerequisite: Proficiency with light armor</em></p><p>You have trained to master the use of medium armor and shields, gaining the following benefits:</p><ul><li>Increase your Strength or Dexterity score by 1, to a maximum of 20.</li></ul><ul><li>You gain proficiency with medium armor and shields.</li></ul></div>',
  },
  MOUNTED_COMBATANT: {
    label: 'Mounted Combatant',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You are a dangerous foe to face while mounted. While you are mounted and aren't incapacitated, you gain the following benefits:</p><ul><li>You have advantage on melee attack rolls against any unmounted creature that is smaller than your mount.</li></ul><ul><li>You can force an attack targeted at your mount to target you instead.</li></ul><ul><li>If your mount is subjected to an effect that allows it to make Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.</li></ul></div>",
  },
  OBSERVANT: {
    label: 'Observant',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>Quick to notice details of your environment, you gain the following benefits:</p><ul><li>Increase your Intelligence or Wisdom score by 1, to a maximum of 20.</li></ul><ul><li>If you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.</li></ul><ul><li>You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.</li></ul></div>",
  },
  PIERCER: {
    label: 'Piercer',
    sourceBook: "Tasha's Cauldron of Everything",
    config: [
      getFeatStatBoost([STATS.STR, STATS.DEX]),
      getHiddenBasicFeatureByLD(
        'Piercer',
        'You have achieved a penetrating precision in combat, granting you the following benefits:\n- Increase your Strength or Dexterity by 1, to a maximum of 20.\n- Once per turn, when you hit a creature with an attack that deals piercing damage, you can re-roll one of the attack’s damage dice, and you must use the new roll.\n- When you score a critical hit that deals piercing damage to a creature, you can roll one additional damage die when determining the extra piercing damage the target takes.',
      ),
    ],
    description:
      '<div><p>You have achieved a penetrating precision in combat, granting you the following benefits:</p><ul><li>Increase your Strength or Dexterity by 1, to a maximum of 20.</li></ul><ul><li>Once per turn, when you hit a creature with an attack that deals piercing damage, you can re-roll one of the attack’s damage dice, and you must use the new roll.</li></ul><ul><li>When you score a critical hit that deals piercing damage to a creature, you can roll one additional damage die when determining the extra piercing damage the target takes.</li></ul></div>',
  },
  POISONER: {
    label: 'Poisoner',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      "<div><p>You can prepare and deliver deadly poisons, gaining the following benefits:</p><ul><li>When you make a damage roll, you ignore resistance to poison damage.</li></ul><ul><li>You can coat a weapon in poison as a bonus action, instead of an action.</li></ul><ul><li>You gain proficiency with the poisoner's kit if you don't already have it. With one hour of work using a poisoner's kit and expending 50 gp worth of materials, you can create a number of doses of potent poison equal to your proficiency bonus. Once applied to a weapon or piece of ammunition, the poison retains its potency for 1 minute or until you hit with the weapon or ammunition. When a creature takes damage from the coated weapon or ammunition, that creature must succeed on a DC 14 Constitution saving throw or take 2d8 poison damage and become poisoned until the end of your next turn.</li></ul></div>",
  },
  POLEARM_MASTER: {
    label: 'Polearm Master',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You gain the following benefits:</p><ul><li>When you take the Attack action and attack with only a glaive, halberd, quarterstaff, or spear, you can use a bonus action to make a melee attack with the opposite end of the weapon. This attack uses the same ability modifier as the primary attack. The weapon's damage die for this attack is a d4, and it deals bludgeoning damage.</li></ul><ul><li>While you are wielding a glaive, halberd, pike, quarterstaff, or spear, other creatures provoke an opportunity attack from you when they enter the reach you have with that weapon.</li></ul></div>",
  },
  RESILIENT: {
    label: 'Resilient',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>Choose one ability score. You gain the following benefits:</p><ul><li>Increase the chosen ability score by 1, to a maximum of 20.</li></ul><ul><li>You gain proficiency in saving throws using the chosen ability.</li></ul></div>',
  },
  RITUAL_CASTER: {
    label: 'Ritual Caster',
    sourceBook: "Player's Handbook",
    description:
      "<div><p><em>Prerequisite: Intelligence or Wisdom of 13 or higher</em></p><p>You have learned a number of spells that you can cast as rituals. These spells are written in a ritual book, which you must have in hand while casting one of them.</p><p>When you choose this feat, you acquire a ritual book holding two 1st-level spells of your choice. Choose one of the following classes: bard, cleric, druid, sorcerer, warlock, or wizard. You must choose your spells from that class's spell list, and the spells you choose must have the ritual tag. The class you choose also must have the ritual tag. The class you choose also determines your spellcasting ability for these spells: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard.</p><p>If you come across a spell in written form, such as a magical spell scroll or a wizard's spellbook, you might be able to add it to your ritual book. The spell must be on the spell list for the class you chose, the spell's level can be no higher than half your level (rounded up), and it must have the ritual tag. The process of copying the spell into your ritual book takes 2 hours per level of the spell, and costs 50 gp per level. The cost represents the material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it.</p></div>",
  },
  SAVAGE_ATTACKER: {
    label: 'Savage Attacker',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>Once per turn when you roll damage for a melee weapon attack, you can reroll the weapon's damage dice and use either total.</p></div>",
  },
  SENTINEL: {
    label: 'Sentinel',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You have mastered techniques to take advantage of every drop in any enemy's guard, gaining the following benefits.</p><ul><li>When you hit a creature with an opportunity attack, the creature's speed becomes 0 for the rest of the turn.</li></ul><ul><li>Creatures provoke opportunity attacks from you even if they take the Disengage action before leaving your reach.</li></ul><ul><li>When a creature makes an attack against a target other than you (and that target doesn't have this feat), you can use your reaction to make a melee weapon attack against the attacking creature.</li></ul></div>",
  },
  SHADOW_TOUCHED: {
    label: 'Shadow Touched',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      '<div><p>Your exposure to the Shadowfell\'s magic has changed you, granting you the following benefits:</p><ul><li>Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.</li></ul><ul><li>You learn the <a href="http://dnd5e.wikidot.com/spell:invisibility">Invisibility</a> spell and one 1st-level spell of your choice. The 1st-level spell must be from the <a href="http://dnd5e.wikidot.com/spells:illusion">Illusion</a> or <a href="http://dnd5e.wikidot.com/spells:necromancy">Necromancy</a> school of magic. You can cast each of these spells without expending a spell slot. Once you cast either of these spells in this way, you can\'t cast that spell in this way again until you finish a long rest. You can also cast these spells using spell slots you have of the appropriate level. The spells\' spellcasting ability is the ability increased by this feat.</li></ul></div>',
  },
  SHARPSHOOTER: {
    label: 'Sharpshooter',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You have mastered ranged weapons and can make shots that others find impossible. You gain the following benefits:</p><ul><li>Attacking at long range doesn't impose disadvantage on your ranged weapon attack rolls.</li></ul><ul><li>Your ranged weapon attacks ignore half and three-quarters cover.</li></ul><ul><li>Before you make an attack with a ranged weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If that attack hits, you add +10 to the attack's damage.</li></ul></div>",
  },
  SHIELD_MASTER: {
    label: 'Shield Master',
    sourceBook: "Player's Handbook",
    description:
      "<div><p>You use shields not just for protection but also for offense. You gain the following benefits while you are wielding a shield:</p><ul><li>If you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you with your shield.</li></ul><ul><li>If you aren't incapacitated, you can add your shield's AC bonus to any Dexterity saving throw you make against a spell or other harmful effect that targets only you.</li></ul><ul><li>If you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can use your reaction to take no damage if you succeed on the saving throw, interposing your shield between yourself and the source of the effect.</li></ul></div>",
  },
  SKILL_EXPERT: {
    label: 'Skill Expert',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      "<div><p>You have honed your proficiency with particular skills, granting you the following benefits:</p><ul><li>Increase one ability score of your choice by 1, to a maximum of 20.</li></ul><ul><li>You gain proficiency in one skill of your choice.</li></ul><ul><li>Choose one skill in which you have proficiency. You gain expertise with that skill, which means your proficiency bonus is doubled for any ability check you make with it. The skill you choose must be one that isn't already benefiting from a feature, such as Expertise, that doubles your proficiency bonus.</li></ul></div>",
  },
  SKILLED: {
    label: 'Skilled',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>You gain proficiency in any combination of three skills or tools of your choice.</p></div>',
  },
  SKULKER: {
    label: 'Skulker',
    sourceBook: "Player's Handbook",
    description:
      "<div><p><em>Prerequisite: Dexterity 13 or higher</em></p><p>You are an expert at slinking through shadows. You gain the following benefits:</p><ul><li>You can try to hide when you are lightly obscured from the creature from which you are hiding.</li></ul><ul><li>When you are hidden from a creature and miss it with a ranged weapon attack, making the attack doesn't reveal your position.</li></ul><ul><li>Dim light doesn't impose disadvantage on your Wisdom (Perception) checks relying on sight.</li></ul></div>",
  },
  SLASHER: {
    label: 'Slasher',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      "<div><p>You've learned where to cut to have the greatest results, granting you the following benefits:</p><ul><li>Increase your Strength or Dexterity by 1, to a maximum of 20.</li></ul><ul><li>Once per turn when you hit a creature with an attack that deals slashing damage, you can reduce the speed of the target by 10 feet until the start of your next turn.</li></ul><ul><li>When you score a critical hit that deals slashing damage to a creature, you grievously wound it. Until the start of your next turn, the target has disadvantage on all attack rolls.</li></ul></div>",
  },
  SPELL_SNIPER: {
    label: 'Spell Sniper',
    sourceBook: "Player's Handbook",
    description:
      "<div><p><em>Prerequisite: The ability to cast at least one spell</em></p><p>You have learned techniques to enhance your attacks with certain kinds of spells, gaining the following benefits:</p><ul><li>When you cast a spell that requires you to make an attack roll, the spell's range is doubled.</li></ul><ul><li>Your ranged spell attacks ignore half cover and three-quarters cover.</li></ul><ul><li>You learn one cantrip that requires an attack roll. Choose the cantrip from the bard, cleric, druid, sorcerer, warlock, or wizard spell list. Your spellcasting ability for this cantrip depends on the spell list you chose from: Charisma for bard, sorcerer, and warlock; Wisdom for cleric or druid; or Intelligence for wizard.</li></ul></div>",
  },
  SQUIRE_OF_SOLAMNIA: {
    label: 'Squire of Solamnia',
    sourceBook: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      "<div><p><em>Prerequisite: Dragonlance Campaign, Fighter or Paladin Class or Knight of Solamnia Background</em></p><p>Your training in the ways of the Knights of Solamnia grants you these benefits:</p><ul><li><strong>Mount Up.</strong> Mounting or dismounting costs you only 5 feet of movement.</li></ul><ul><li><strong>Precise Strike.</strong> Once per turn, when you make a weapon attack roll against a creature, you can cause the attack roll to have advantage. If the attack hits, you roll a d8 and add the number rolled as a bonus to the attack's damage roll. You can use this benefit a number of times equal to your proficiency bonus, but a use is expended only if the attack hits. You regain all expended uses when you finish a long rest.</li></ul></div>",
  },
  STRIXHAVEN_INITIATE: {
    label: 'Strixhaven Initiate',
    sourceBook: 'Strixhaven: A Curriculum of Chaos',
    description:
      '<div><p>You have studied some magical theory and have learned a few spells associated with Strixhaven University.</p><p>Choose one of Strixhaven\'s colleges: Lorehold, Prismari. Quandrix, Silverquill, or Witherbloom. You learn two cantrips and one 1st-level spell based on the college you choose, as specified in the Strixhaven Spells table.</p><p>You can cast the chosen 1st-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spell using any spell slots you have.</p><p>Your spellcasting ability for this feat\'s spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).</p><table><tbody><tr><th colspan="3">Strixhaven Spells</th></tr><tr><th>College</th><th>Cantrips</th><th>1st-Level Spell</th></tr><tr><td>Lorehold</td><td>Choose two from <a href="http://dnd5e.wikidot.com/spell:light">Light</a>, <a href="http://dnd5e.wikidot.com/spell:sacred-flame">Sacred Flame</a>, and <a href="http://dnd5e.wikidot.com/spell:thaumaturgy">Thaumaturgy</a>.</td><td>Choose one 1st-level <a href="http://dnd5e.wikidot.com/spells:cleric">Cleric</a> or <a href="http://dnd5e.wikidot.com/spells:wizard">Wizard</a> spell.</td></tr><tr><td>Prismari</td><td>Choose two from <a href="http://dnd5e.wikidot.com/spell:fire-bolt">Fire Bolt</a>, <a href="http://dnd5e.wikidot.com/spell:prestidigitation">Prestidigitation</a>, and <a href="http://dnd5e.wikidot.com/spell:ray-of-frost">Ray of Frost</a>.</td><td>Choose one 1st-level <a href="http://dnd5e.wikidot.com/spells:bard">Bard</a> or <a href="http://dnd5e.wikidot.com/spells:sorcerer">Sorcerer</a> spell.</td></tr><tr><td>Quandrix</td><td>Choose two from <a href="http://dnd5e.wikidot.com/spell:druidcraft">Druidcraft</a>, <a href="http://dnd5e.wikidot.com/spell:guidance">Guidance</a>, and <a href="http://dnd5e.wikidot.com/spell:mage-hand">Mage Hand</a>.</td><td>Choose one 1st-level <a href="http://dnd5e.wikidot.com/spells:druid">Druid</a> or <a href="http://dnd5e.wikidot.com/spells:wizard">Wizard</a> spell.</td></tr><tr><td>Silverquill</td><td>Choose two from <a href="http://dnd5e.wikidot.com/spell:sacred-flame">Sacred Flame</a>, <a href="http://dnd5e.wikidot.com/spell:thaumaturgy">Thaumaturgy</a>, and <a href="http://dnd5e.wikidot.com/spell:vicious-mockery">Vicious Mockery</a>.</td><td>Choose one 1st-level <a href="http://dnd5e.wikidot.com/spells:bard">Bard</a> or <a href="http://dnd5e.wikidot.com/spells:cleric">Cleric</a> spell.</td></tr><tr><td>Witherbloom</td><td>Choose two from <a href="http://dnd5e.wikidot.com/spell:chill-touch">Chill Touch</a>, <a href="http://dnd5e.wikidot.com/spell:druidcraft">Druidcraft</a>, and <a href="http://dnd5e.wikidot.com/spell:spare-the-dying">Spare the Dying</a>.</td><td>Choose one 1st-level <a href="http://dnd5e.wikidot.com/spells:druid">Druid</a> or <a href="http://dnd5e.wikidot.com/spells:wizard">Wizard</a> spell.</td></tr></tbody></table></div>',
  },
  STRIXHAVEN_MASCOT: {
    label: 'Strixhaven Mascot',
    sourceBook: 'Strixhaven: A Curriculum of Chaos',
    description:
      '<div><p><em>Prerequisite: 4th Level, Strixhaven Initiate Feat</em></p><p>You have learned how to summon a Strixhaven mascot to assist you, granting you these benefits:</p><ul><li>You can cast the <a href="http://dnd5e.wikidot.com/spell:find-familiar">Find Familiar</a> spell as a ritual. Your familiar can take the form of the mascot associated with the college you chose for the Strixhaven Initiate feat: a <strong>spirit statue mascot</strong> (Lorehold), an <strong>art elemental mascot</strong> (Prismari), a <strong>fractal mascot</strong> (Quandrix), an <strong>inkling mascot</strong> (Silverquill), or a <strong>pest mascot</strong> (Witherbloom).</li></ul><ul><li>When you take the Attack action on your turn, you can forgo one attack to allow your mascot familiar to make one attack of its own with its reaction.</li></ul><ul><li>If your mascot familiar is within 60 feet of you, you can be teleported as an action, swapping places with the familiar. If your destination space is too small for you to occupy, the teleportation fails and is wasted. Once you teleport this way, you can\'t do so again until you finish a long rest, unless you expend a spell slot of 2nd level or higher to do it again.</li></ul></div>',
  },
  TAVERN_BRAWLER: {
    label: 'Tavern Brawler',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>Accustomed to the rough-and-tumble fighting using whatever weapons happen to be at hand, you gain the following benefits:</p><ul><li>Increase your Strength or Consititution score by 1, to a maximum of 20.</li></ul><ul><li>You are proficient with improvised weapons.</li></ul><ul><li>Your unarmed strike uses a d4 for damage.</li></ul><ul><li>When you hit a creature with an unarmed strike or an improvised weapon on your turn, you can use a bonus action to attempt to grapple the target.</li></ul></div>',
  },
  TELEKINETIC: {
    label: 'Telekinetic',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      '<div><p>You learn to move things with your mind, granting you the following benefits:</p><ul><li>Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.</li></ul><ul><li>You learn the <em><a href="/spell:mage-hand">mage hand</a></em> cantrip. You can cast it without verbal or somatic components, and you can make the spectral hand invisible. If you already know this spell, its range increases by 30 feet when you cast it. Its spellcasting ability is the ability increased by this feat.</li></ul><ul><li>As a bonus action, you can try to telekinetically shove one creature you can see within 30 feet of you. When you do so, the target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + the ability modifier of the score increased by this feat) or be moved 5 feet toward or away from you. A creature can willingly fail this save.</li></ul></div>',
  },
  TELEPATHIC: {
    label: 'Telepathic',
    sourceBook: "Tasha's Cauldron of Everything",
    description:
      '<div><p>You awaken the ability to mentally connect with others, granting you the following benefits:</p><ul><li>Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.</li></ul><ul><li>You can speak telepathically to any creature you can see within 60 feet of you. Your telepathic utterances are in a language you know, and the creature understands you only if it knows that language. Your communication doesn\'t give the creature the ability to respond to you telepathically.</li></ul><ul><li>You can cast the <a href="http://dnd5e.wikidot.com/spell:detect-thoughts">Detect Thoughts</a> spell, requiring no spell slot or components, and you must finish a long rest before you can cast it this way again. Your spellcasting ability for the spell is the ability increased by this feat. If you have spell slots of 2nd level or higher, you can cast this spell with them.</li></ul></div>',
  },
  TOUGH: {
    label: 'Tough',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>Your hit point maximum increases by an amount equal to twice your level when you gain this feat. Whenever you gain a level thereafter, your hit point maximum increases by an additional 2 hit points.</p></div>',
  },
  WAR_CASTER: {
    label: 'War Caster',
    sourceBook: "Player's Handbook",
    description:
      "<div><p><em>Prerequisite: The ability to cast at least one spell</em></p><p>You have practiced casting spells in the midst of combat, learning techniques that grant you the following benefits:</p><ul><li>You have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage.</li></ul><ul><li>You can perform the somatic components of spells even when you have weapons or a shield in one or both hands.</li></ul><ul><li>When a hostile creature's movement provokes an opportunity attack from you, you can use your reaction to cast a spell at the creature, rather than making an opportunity attack. The spell must have a casting time of 1 action and must target only that creature.</li></ul></div>",
  },
  WEAPON_MASTER: {
    label: 'Weapon Master',
    sourceBook: "Player's Handbook",
    description:
      '<div><p>You have practiced extensively with a variety of weapons, gaining the following benefits:</p><ul><li>Increase your Strength or Dexterity score by 1, to a maximum of 20.</li></ul><ul><li>You gain proficiency with four weapons of your choice. Each one must be a simple or a martial weapon.</li></ul></div>',
  },
};
export const FEAT_OPTIONS = values(FEATS).map((f) => ({
  value: f,
  label: FEAT_CONFIGS[f]?.label,
}));
