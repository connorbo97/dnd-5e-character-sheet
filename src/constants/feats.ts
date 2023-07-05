export enum FEATS {
  ABERRANT_DRAGONMARK = 'ABERRANT_DRAGONMARK',
  ACTOR = 'ACTOR',
  ADEPT_OF_THE_BLACK_ROBES = 'ADEPT_OF_THE_BLACK_ROBES',
  ADEPT_OF_THE_RED_ROBES = 'ADEPT_OF_THE_RED_ROBES',
  ADEPT_OF_THE_WHITE_ROBES = 'ADEPT_OF_THE_WHITE_ROBES',
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
  SHIELD_MASTER = 'SHIELD_MASTERa',
  SKILL_EXPERT = 'SKILL_EXPERT',
  SKILLED = 'SKILLED',
  SKULKER = 'SKULKER',
  SLASHER = 'SLASHER',
  SPELL_SNIPER = 'SPELL_SNIPER',
  SQUIRE_OF_SOLAMNIA = 'SQUIRE_OF_SOLAMNIA',
  STRIXHAVEN_INITIATE = 'STRIXHAVEN_INITIATE',
  STRIXHAVEN_MASCOT = 'STRIXHAVEN_MASCOT',
  TAVERN_BRAWLER = 'TAVERN_BRAWLER',
  TELEKINETIC = 'TELEKINETIC',
  TELEPATHIC = 'TELEPATHIC',
  TOUGH = 'TOUGH',
  WAR_CASTER = 'WAR_CASTER',
  WEAPON_MASTER = 'WEAPON_MASTER',
}

export const FEAT_CONFIGS: {
  [f in FEATS]: { label: string; bookSource: string; description: string };
} = {
  [FEATS.ABERRANT_DRAGONMARK]: {
    label: 'Aberrant Dragonmark',
    bookSource: 'Eberron - Rising from the Last War',
    description:
      "Prerequisite: No other dragonmark\nYou have manifested an aberrant dragonmark. Determine its appearance and the flaw associated with it. You gain the following benefits:\n\nIncrease your Constitution score by 1, to a maximum of 20.\nYou learn a cantrip of your choice from the sorcerer spell list. In addition, choose a 1st-level spell from the sorcerer spell list. You learn that spell and can cast it through your mark. Once you cast it, you must finish a short or long rest before you can cast it again through the mark. Constitution is your spellcasting ability for these spells.\nWhen you cast the 1st-level spell through your mark, you can expend one of your Hit Dice and roll it. If you roll an even number, you gain a number of temporary hit points equal to the number rolled. If you roll an odd number, one random creature within 30 feet of you (not including you) takes force damage equal to the number rolled. If no other creatures are in range, you take the damage.\n\nYou also develop a random flaw from the Aberrant Dragonmark Flaws table.\n\n\nAberrant Dragonmark Flaws\n\n\nd8\nFlaw\n\n\n1\nYour mark is a source of constant physical pain.\n\n\n2\nYour mark whispers to you. Its meaning can be unclear.\n\n\n3\nWhen you're stressed, the mark hisses audibly.\n\n\n4\nThe skin around the mark is burned, scaly, or withered.\n\n\n5\nAnimals are uneasy around you.\n\n\n6\nYou have a mood swing any time you use your mark.\n\n\n7\nYour looks change slightly whenever you use the mark.\n\n\n8\nYou have horrific nightmares after you use your mark.\n\n\nOption: Greater Aberrant Powers\n\nAt the DM's option, a character who has the Aberrant Dragonmark feat has a chance of manifesting greater power. Upon reaching 10th level, such a character has a 10 percent chance of gaining an epic boon from among the options in chapter 7 of the Dungeon Master's Guide. If the character fails to gain a boon, they have a 10 percent chance the next time they gain a level.\nIf the character gains a boon, the DM chooses it or determines it randomly. The character also permanently loses one of their Hit Dice, and their hit point maximum is reduced by an amount equal to a roll of that die plus their Constitution modifier (minimum reduction of 1). This reduction can't be reversed by any means.\n",
  },
  [FEATS.ACTOR]: {
    label: 'Actor',
    bookSource: "Player's Handbook",
    description:
      'Skilled at mimicry and dramatics, you gain the following benefits:\n\nIncrease your Charisma score by 1, to a maximum of 20.\n\n\nYou have an advantage on Charisma (Deception) and Charisma (Performance) checks when trying to pass yourself off as a different person.\n\n\nYou can mimic the speech of another person or the sounds made by other creatures. You must have heard the person speaking, or heard the creature make the sound, for at least 1 minute. A successful Wisdom (Insight) check contested by your Charisma (Deception) check allows a listener to determine that the effect is faked.\n',
  },
  [FEATS.ADEPT_OF_THE_BLACK_ROBES]: {
    label: 'Adept of the Black Robes',
    bookSource: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      'Prerequisite: 4th Level, Initiate of High Sorcery (Nuitari) Feat\nYou chose the moon Nuitari to influence your magic, and your ambition and loyalty to the Order of the Black Robes has been recognized, granting you these benefits:\n\nAmbitious Magic. You learn one 2nd-level spell of your choice. The 2nd-level spell must be from the Enchantment or Necromancy school of magic. You can cast this feat’s 2nd-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast this spell using spell slots you have of the appropriate level. The spell’s spellcasting ability is the one chosen when you gained the Initiate of High Sorcery feat.\n\n\nLife Channel. You can channel your life force into the power of your magic. When a creature you can see within 60 feet of you fails a saving throw against a spell that deals damage that you cast, you can expend a number of Hit Dice equal to the level of the spell. Roll the expended Hit Dice and add them together. The damage that the creature takes increases by an amount equal to that total.\n',
  },
  [FEATS.ADEPT_OF_THE_RED_ROBES]: {
    label: 'Adept of the Red Robes',
    bookSource: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      'Prerequisite: 4th Level, Initiate of High Sorcery (Lunitari) Feat\nYou chose the moon Lunitari to influence your magic, and your dedication to maintaining the balance between all things has been recognized by the Order of the Red Robes, granting you these benefits:\n\nInsightful Magic. You learn one 2nd-level spell of your choice. The 2nd-level spell must be from the Illusion or Transmutation school of magic. You can cast this feat’s 2nd-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast this spell using spell slots you have of the appropriate level. The spell’s spellcasting ability is the one chosen when you gained the Initiate of High Sorcery feat.\n\n\nMagical Balance. When you make an attack roll or an ability check and roll a 9 or lower on the d20, you can balance fate and treat the roll as a 10. You can balance fate in this way a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\n',
  },
  [FEATS.ADEPT_OF_THE_WHITE_ROBES]: {
    label: 'Adept of the White Robes',
    bookSource: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      'Prerequisite: 4th Level, Initiate of High Sorcery Feat\nYou chose the moon Solinari to influence your magic, and your oath to use magic to make the world a better place has been recognized by the Order of the White Robes, granting you these benefits:\n\nProtective Magic. You learn one 2nd-level spell of your choice. The 2nd-level spell must be from the Abjuration or Divination school of magic. You can cast this feat’s 2nd-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast this spell using spell slots you have of the appropriate level. The spell’s spellcasting ability is the one chosen when you gained the Initiate of High Sorcery feat.\n\n\nProtective Ward. When you or a creature you can see within 30 feet of you takes damage, you can use your reaction to expend a spell slot and weave protective magic around the target. Roll a number of d6s equal to the level of the spell slot expended and reduce the damage the target takes by the total rolled on those dice + your spellcasting ability modifier.\n',
  },
  [FEATS.ALERT]: {
    label: 'Alert',
    bookSource: "Player's Handbook",
    description:
      "Always on the lookout for danger, you gain the following benefits:\n\nYou can't be surprised while you are conscious.\n\n\nYou gain a +5 bonus to initiative.\n\n\nOther creatures don't gain advantage on attack rolls against you as a result of being unseen by you.\n",
  },
  [FEATS.ARTIFICER_INITIATE]: {
    label: 'Artificer Initiate',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "You’ve learned some of an artificer’s inventiveness:\n\nYou learn one cantrip of your choice from the Artificer spell list, and you learn one 1st-level spell of your choice from that list. Intelligence is your spellcasting ability for these spells.\n\n\nYou can cast this feat's 1st-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spell using any spell slots you have.\n\n\nYou gain proficiency with one type of artisan's tools of your choice, and you can use that type of tool as a spellcasting focus for any spell you cast that uses Intelligence as its spellcasting ability.\n",
  },
  [FEATS.ATHLETE]: {
    label: 'Athlete',
    bookSource: "Player's Handbook",
    description:
      "You have undergone extensive physical training to gain the following benefits:\n\nIncrease your Strength or Dexterity score by 1, to a maximum of 20.\n\n\nWhen you are prone, standing up uses only 5 feet of your movement.\n\n\nClimbing doesn't cost you extra movement.\n\n\nYou can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet.\n",
  },
  [FEATS.CHARGER]: {
    label: 'Charger',
    bookSource: "Player's Handbook",
    description:
      'When you use your action to Dash, you can use a bonus action to make one melee weapon attack or to shove a creature. If you move at least 10 feet in a straight line immediately before taking this bonus action, you either gain a +5 bonus to the attack’s damage roll (if you chose to make a melee attack and hit) or push the target up to 10 feet away from you (if you chose to shove and you succeed).',
  },
  [FEATS.CHEF]: {
    label: 'Chef',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "Time and effort spent mastering the culinary arts has paid off. You gain the following benefits:\n\nIncrease your Constitution or Wisdom score by 1, to a maximum of 20.\n\n\nYou gain proficiency with cook’s utensils if you don’t already have it.\n\n\nAs part of a short rest, you can cook special food, provided you have ingredients and cook's utensils on hand. You can prepare enough of this food for a number of creatures equal to 4 + your proficiency bonus. At the end of the short rest, any creature who eats the food and spends one or more Hit Dice to regain hit points regains an extra 1d8 hit points.\n\n\nWith one hour of work or when you finish a long rest, you can cook a number of treats equal to your proficiency bonus. These special treats last 8 hours after being made. A creature can use a bonus action to eat one of those treats to gain temporary hit points equal to your proficiency bonus.\n",
  },
  [FEATS.CROSSBOW_EXPERT]: {
    label: 'Crossbow Expert',
    bookSource: "Player's Handbook",
    description:
      'Thanks to extensive practice with the crossbow, you gain the following benefits:\n\nYou ignore the loading quality of crossbows with which you are proficient.\n\n\nBeing within 5 feet of a hostile creature doesn’t impose disadvantage on your ranged attack rolls.\n\n\nWhen you use the Attack action and attack with a one handed weapon, you can use a bonus action to attack with a hand crossbow you are holding.\n',
  },
  [FEATS.CRUSHER]: {
    label: 'Crusher',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      'You are practiced in the art of crushing your enemies, granting you the following benefits:\n\nIncrease your Strength or Constitution by 1, to a maximum of 20.\n\n\nOnce per turn, when you hit a creature with an attack that deals bludgeoning damage, you can move it 5 feet to an unoccupied space, provided the target is no more than one size larger than you.\n\n\nWhen you score a critical hit that deals bludgeoning damage to a creature, attack rolls against that creature are made with advantage until the start of your next turn.\n',
  },
  [FEATS.DEFENSIVE_DUELIST]: {
    label: 'Defensive Duelist',
    bookSource: "Player's Handbook",
    description:
      'Prerequisite: Dexterity 13 or higher\nWhen you are wielding a finesse weapon with which you are proficient and another creature hits you with a melee attack, you can use your reaction to add your proficiency bonus to your AC for that attack, potentially causing the attack to miss you.',
  },
  [FEATS.DIVINELY_FAVORED]: {
    label: 'Divinely Favored',
    bookSource: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      'Prerequisite: 4th Level, Dragonlance Campaign\nA god chose you to carry a spark of their power.\nYou learn one cantrip of your choice from the Cleric spell list and one 1st-level spell based on the alignment of your character, as specified in the Alignment Spells table below. You also learn the Augury spell.\n\n\nAlignment Spells\n\n\nAlignment\n1st-level Spells\n\n\nEvil\nChoose one 1st-level Warlock spell\n\n\nGood\nChoose one 1st-level Cleric spell.\n\n\nNeutral\nChoose one 1st-level Druid spell\n\n\nYou can cast the chosen 1st-level spell and the Augury spell without a spell slot, and you must finish a long rest before you can cast either of these spells in this way again. You can also cast these spells using spell slots you have of the appropriate level.\nYour spellcasting ability for this feat’s spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).\nIn addition, you can use a holy symbol as a spellcasting focus for any spell you cast that uses the spellcasting ability you choose when you select this feat.',
  },
  [FEATS.DUAL_WIELDER]: {
    label: 'Dual Wielder',
    bookSource: "Player's Handbook",
    description:
      "You master fighting with two weapons, gaining the following benefits:\n\nYou gain a +1 bonus to AC while you are wielding a separate melee weapon in each hand.\n\n\nYou can use two-weapon fighting even when the one handed melee weapons you are wielding aren't light.\n\n\nYou can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.\n",
  },
  [FEATS.DUNGEON_DELVER]: {
    label: 'Dungeon Delver',
    bookSource: "Player's Handbook",
    description:
      "Alert to the hidden traps and secret doors found in many dungeons, you gain the following benefits:\n\nYou have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.\n\n\nYou have advantage on saving throws made to avoid or resist traps.\n\n\nYou have resistance to the damage dealt by traps.\n\n\nTravelling at a fast pace doesn't impose the normal -5 penalty on your passive Wisdom (Perception) score.\n",
  },
  [FEATS.DURABLE]: {
    label: 'Durable',
    bookSource: "Player's Handbook",
    description:
      'Hardy and resilient, you gain the following benefits:\n\nIncrease your Constitution score by 1, to a maximum of 20.\n\n\nWhen you roll a Hit Die to regain hit points, the minimum number of hit points you regain from the roll equals twice your Constitution modifier (minimum of 2).\n',
  },
  [FEATS.ELDRITCH_ADEPT]: {
    label: 'Eldritch Adept',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "Prerequisite: Spellcasting or Pact Magic feature\nStudying occult lore, you have unlocked eldritch power within yourself: you learn one Eldritch Invocation option of your choice from the warlock class. If the invocation has a prerequisite, you can choose that invocation only if you're a warlock and only if you meet the prerequisite.\nWhenever you gain a level, you can replace the invocation with another one from the warlock class.",
  },
  [FEATS.ELEMENTAL_ADEPT]: {
    label: 'Elemental Adept',
    bookSource: "Player's Handbook",
    description:
      'Prerequisite: The ability to cast at least one spell\n\nWhen you gain this feat, choose one of the following damage types: acid, cold, fire, lightning, or thunder.\n\n\nSpells you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.\n\n\nYou can select this feat multiple times. Each time you do so, you must choose a different damage type.\n',
  },
  [FEATS.FEY_TOUCHED]: {
    label: 'Fey Touched',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "Your exposure to the Feywild's magic has changed you, granting you the following benefits:\n\nIncrease your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n\n\nYou learn the Misty Step spell and one 1st-level spell of your choice. The 1st-level spell must be from the Divination or Enchantment school of magic. You can cast each of these spells without expending a spell slot. Once you cast either of these spells in this way, you can't cast that spell in this way again until you finish a long rest. You can also cast these spells using spell slots you have of the appropriate level. The spells' spellcasting ability is the ability increased by this feat.\n",
  },
  [FEATS.FIGHTING_INITIATE]: {
    label: 'Fighting Initiate',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "Prerequisite: Proficiency with a martial weapon\nYour martial training has helped you develop a particular style of fighting. As a result, you learn one Fighting Style option of your choice from the fighter class. If you already have a style, the one you choose must be different.\nWhenever you reach a level that grants the Ability Score Improvement feature, you can replace this feat's fighting style with another one from the fighter class that you don't have.",
  },
  [FEATS.GIFT_OF_THE_CHROMATIC_DRAGON]: {
    label: 'Gift of the Chromatic Dragon',
    bookSource: "Fizban's Treasury of Dragons",
    description:
      'You’ve manifested some of the power of chromatic dragons, granting you the following benefits:\n\nChromatic Infusion. As a bonus action, you can touch a simple or martial weapon and infuse it with one of the following damage types: acid, cold, fire, lightning, or poison. For the next minute, the weapon deals an extra 1d4 damage of the chosen type when it hits. After you use this bonus action, you can’t do so again until you finish a long rest.\n\n\nReactive Resistance. When you take acid, cold, fire, lightning, or poison damage, you can use your reaction to give yourself resistance to that instance of damage. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\n',
  },
  [FEATS.GIFT_OF_THE_GEM_DRAGON]: {
    label: 'Gift of the Gem Dragon',
    bookSource: "Fizban's Treasury of Dragons",
    description:
      'You’ve manifested some of the power of gem dragons, granting you the following benefits:\n\nAbility Score Increase. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n\n\nTelekinetic Reprisal. When you take damage from a creature that is within 10 feet of you, you can use your reaction to emanate telekinetic energy. The creature that dealt damage to you must make a Strength saving throw (DC equals 8 + your proficiency bonus + the ability modifier of the score increased by this feat). On a failed save, the creature takes 2d8 force damage and is pushed up to 10 feet away from you. On a successful save, the creature takes half as much damage and isn’t pushed. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\n',
  },
  [FEATS.GIFT_OF_THE_METALLIC_DRAGON]: {
    label: 'Gift of the Metallic Dragon',
    bookSource: "Fizban's Treasury of Dragons",
    description:
      'You’ve manifested some of the power of metallic dragons, granting you the following benefits:\n\nDraconic Healing. You learn the Cure Wounds spell. You can cast this spell without expending a spell slot. Once you cast this spell in this way, you can’t do so again until you finish a long rest. You can also cast this spell using spell slots you have. The spell’s spellcasting ability is Intelligence, Wisdom, or Charisma when you cast it with this feat (choose when you gain the feat).\n\n\nProtective Wings. You can manifest protective wings that can shield you or others. When you or another creature you can see within 5 feet of you is hit by an attack roll, you can use your reaction to manifest spectral wings from your back for a moment. You grant a bonus to the target’s AC equal to your proficiency bonus against that attack roll, potentially causing it to miss. You can use this reaction a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\n',
  },
  [FEATS.GRAPPLER]: {
    label: 'Grappler',
    bookSource: "Player's Handbook",
    description:
      "Prerequisite: Strength 13 or higher\nYou've developed the skills necessary to hold your own in close-quarters grappling. You gain the following benefits:\n\nYou have advantage on attack rolls against a creature you are grappling.\n\n\nYou can use your action to try to pin a creature grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both restrained until the grapple ends.\n",
  },
  [FEATS.GREAT_WEAPON_MASTER]: {
    label: 'Great Weapon Master',
    bookSource: "Player's Handbook",
    description:
      "You've learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain the following benefits:\n\nOn your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action.\n\n\nBefore you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack's damage.\n",
  },
  [FEATS.GUNNER]: {
    label: 'Gunner',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "You have a quick hand and keen eye when employing firearms, granting you the following benefits:\n\nIncrease your Dexterity score by 1, to a maximum of 20.\n\n\nYou gain proficiency with firearms (see “Firearms” in the Dungeon Master’s Guide).\n\n\nYou ignore the loading property of firearms.\n\n\nBeing within 5 feet of a hostile creature doesn't impose disadvantage on your ranged attack rolls.\n",
  },
  [FEATS.HEALER]: {
    label: 'Healer',
    bookSource: "Player's Handbook",
    description:
      "You are an able physician, allowing you to mend wounds quickly and get your allies back in the fight. You gain the following benefits:\n\nWhen you use a healer's kit to stabilize a dying creature, that creature also regains 1 hit point.\n\n\nAs an action. you can spend one use of a healer's kit to tend to a creature and restore 1d6 + 4 hit points to it, plus additional hit points equal to the creature's maximum number of Hit Dice. The creature can't regain hit points from this feat again until it finishes a short or long rest.\n",
  },
  [FEATS.HEAVILY_ARMORED]: {
    label: 'Heavily Armored',
    bookSource: "Player's Handbook",
    description:
      'Prerequisite: Proficiency with medium armor\nYou have trained to master the use of heavy armor, gaining the following benefits:\n\nIncrease your Strength score by 1, to a maximum of 20.\n\n\nYou gain proficiency with heavy armor.\n',
  },
  [FEATS.HEAVY_ARMOR_MASTER]: {
    label: 'Heavy Armor Master',
    bookSource: "Player's Handbook",
    description:
      'Prerequisite: Proficiency with heavy armor\nYou can use your armor to deflect strikes that would kill others. You gain the following benefits:\n\nIncrease your Strength score by 1, to a maximum of 20.\n\n\nWhile you are wearing heavy armor, bludgeoning, piercing, and slashing damage that you take from nonmagical attacks is reduced by 3.\n',
  },
  [FEATS.INITIATE_OF_HIGH_SORCERY]: {
    label: 'Initiate of High Sorcery',
    bookSource: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      "Prerequisite: Dragonlance Campaign, Sorcerer or Wizard Class or Mage of High Sorcery Background\nYou've received training from magic-users affiliated with the Mages of High Sorcery.\nChoose one of the three moons of Krynn to influence your magic: the black moon, Nuitari; the red moon, Lunitari; or the white moon Solinari. You learn one cantrip of your choice from the Wizard spell list and two 1st-level spells based on the moon you choose, as specified in the Lunar Spells table.\n\n\nLunar Spells\n\n\nMoon\n1st-Level Spell\n\n\nNuitari\nChoose two from Dissonant Whispers, False Life, Hex, and Ray of Sickness\n\n\nLunitari\nChoose two from Color Spray, Disguise Self, Feather Fall, and Longstrider\n\n\nSolinari\nChoose two from Comprehend Languages, Detect Evil and Good, Protection from Evil and Good, and Shield\n\n\nYou can cast each of the chosen 1st-level spells without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spells using any spell slots you have.\nYour spellcasting ability for this feat’s spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).",
  },
  [FEATS.INSPIRING_LEADER]: {
    label: 'Inspiring Leader',
    bookSource: "Player's Handbook",
    description:
      "Prerequisite: Charisma 13 or higher\nYou can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level + your Charisma modifier. A creature can't gain temporary hit points from this feat again until it has finished a short or long rest.",
  },
  [FEATS.KEEN_MIND]: {
    label: 'Keen Mind',
    bookSource: "Player's Handbook",
    description:
      'You have a mind that can track time, direction, and detail with uncanny precision. You gain the following benefits.\n\nIncrease your Intelligence score by 1, to a maximum of 20.\n\n\nYou always know which way is north.\n\n\nYou always know the number of hours left before the next sunrise or sunset.\n\n\nYou can accurately recall anything you have seen or heard within the past month.\n',
  },
  [FEATS.KNIGHT_OF_THE_CROWN]: {
    label: 'Knight of the Crown',
    bookSource: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      "Prerequisite: 4th Level, Squire of Solamnia Feat\nYou are a Knight of Solamnia aligned with the Order of the Crown, a group that extols the virtues of cooperation, loyalty, and obedience. You excel in group combat and gain these benefits:\n\nAbility Score Increase. Increase your Strength, Dexterity, or Constitution score by 1, to a maximum of 20.\n\n\nCommanding Rally. As a bonus action, you can command one ally within 30 feet of yourself to attack. If that ally can see or hear you, they can immediately make one weapon attack as a reaction. If the attack hits, the ally can roll a d8 and add the number rolled as a bonus to the attack's damage roll. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\n",
  },
  [FEATS.KNIGHT_OF_THE_SWORD]: {
    label: 'Knight of the Sword',
    bookSource: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      'Prerequisite: 4th Level, Squire of Solamnia Feat\nYou are a Knight of Solamnia aligned with the Order of the Sword, a group devoted to heroism and courage. Bravery steels your spirit, granting you these benefits:\n\nAbility Score Increase Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n\n\nDemoralizing Strike. Once per turn, when you hit a creature with a weapon attack roll, you can attempt to frighten that target. The target must make a Wisdom saving throw (DC equals 8 + your proficiency bonus + the ability modifier of the score increased by this feat). On a failed save, the target is frightened of you until the end of your next turn. On a successful save, the target has disadvantage on the next attack roll it makes before the end of its next turn. You can use this benefit a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\n',
  },
  [FEATS.KNIGHT_OF_THE_ROSE]: {
    label: 'Knight of the Rose',
    bookSource: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      'Prerequisite: 4th Level, Squire of Solamnia Feat\nYou are a Knight of Solamnia aligned with the Order of the Rose, a group known for leadership, justice, and wisdom. Your resolve grants you these benefits:\n\nAbility Score Increase. Increase your Constitution, Wisdom, or Charisma score by 1, to a maximum of 20.\n\n\nBolstering Rally. As a bonus action, you can encourage one creature you can see within 30 feet of yourself (you can choose yourself). If the target can see or hear you, the target gains temporary hit points equal to 1d8 + your proficiency bonus + the ability modifier of the ability score increased by this feat. You can use this bonus action a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.\n',
  },
  [FEATS.LIGHTLY_ARMORED]: {
    label: 'Lightly Armored',
    bookSource: "Player's Handbook",
    description:
      'You have trained to master the use of light armor, gaining the following benefits.\n\nIncrease your Strength or Dexterity score by 1, to a maximum of 20.\n\n\nYou gain proficiency with light armor.\n',
  },
  [FEATS.LINGUIST]: {
    label: 'Linguist',
    bookSource: "Player's Handbook",
    description:
      "You have studied languages and codes, gaining the following benefits:\n\nIncrease your Intelligence score by 1, to a maximum of 20.\n\n\nYou learn three languages of your choice.\n\n\nYou can ably create written ciphers. Others can't decipher a code you create unless you teach them, they succeed on an Intelligence check (DC equal to your Intelligence score + your proficiency bonus), or they use magic to decipher it.\n",
  },
  [FEATS.LUCKY]: {
    label: 'Lucky',
    bookSource: "Player's Handbook",
    description:
      "You have inexplicable luck that seems to kick in at just the right moment.\nYou have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw.\nYou can also spend one luck point when an attack roll is made against you. Roll a d20 and then choose whether the attack uses the attacker's roll or yours.\nIf more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled.\nYou regain your expended luck points when you finish a long rest.",
  },
  [FEATS.MAGE_SLAYER]: {
    label: 'Mage Slayer',
    bookSource: "Player's Handbook",
    description:
      'You have practiced techniques in melee combat against spellcasters, gaining the following benefits.\n\nWhen a creature within 5 feet of you casts a spell, you can use your reaction to make a melee weapon attack against that creature.\n\n\nWhen you damage a creature that is concentrating on a spell, that creature has disadvantage on the saving throw it makes to maintain its concentration.\n\n\nYou have advantage on saving throws against spells cast by creatures within 5 feet of you.\n',
  },
  [FEATS.MAGIC_INITIATE]: {
    label: 'Magic Initiate',
    bookSource: "Player's Handbook",
    description:
      "Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class's spell list.\nIn addition, choose one 1st-level spell to learn from that same list. Using this feat, you can cast the spell once at its lowest level, and you must finish a long rest before you can cast it in this way again.\nYour spellcasting ability for these spells depends on the class you chose: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard.",
  },
  [FEATS.MARTIAL_ADEPT]: {
    label: 'Martial Adept',
    bookSource: "Player's Handbook",
    description:
      "You have martial training that allows you to perform special combat maneuvers. You gain the following benefits.\n\nYou learn two maneuvers of your choice from among those available to the Battle Master archetype in the fighter class. If a maneuver you use requires your target to make a saving throw to resist the maneuver's effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice).\n\n\nYou gain one superiority die, which is a d6 (this die is added to any superiority dice you have from another source). This die is used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a short or long rest.\n",
  },
  [FEATS.MEDIUM_ARMOR_MASTER]: {
    label: 'Medium Armor Master',
    bookSource: "Player's Handbook",
    description:
      "Prerequisite: Proficiency with medium armor\nYou have practiced moving in medium armor to gain the following benefits:\n\nWearing medium armor doesn't impose disadvantage on your Dexterity (Stealth) checks.\n\n\nWhen you wear medium armor, you can add 3, rather than 2, to your AC if you have a Dexterity of 16 or higher.\n",
  },
  [FEATS.METAMAGIC_ADEPT]: {
    label: 'Metamagic Adept',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "Prerequisite: Spellcasting or Pact Magic feature\nYou've learned how to exert your will on your spells to alter how they function:\n\nYou learn two Metamagic options of your choice from the sorcerer class. You can use only one Metamagic option on a spell when you cast it, unless the option says otherwise. Whenever you reach a level that grants the Ability Score Improvement feature, you can replace one of these Metamagic options with another one from the sorcerer class.\n\n\nYou gain 2 sorcery points to spend on Metamagic (these points are added to any sorcery points you have from another source but can be used only on Metamagic). You regain all spent sorcery points when you finish a long rest.\n",
  },
  [FEATS.MOBILE]: {
    label: 'Mobile',
    bookSource: "Player's Handbook",
    description:
      "You are exceptionally speedy and agile. You gain the following benefits:\n\nYour speed increases by 10 feet.\n\n\nWhen you use the Dash action, difficult terrain doesn't cost you extra movement on that turn.\n\n\nWhen you make a melee attack against a creature, you don't provoke opportunity attacks from that creature for the rest of the turn, whether you hit or not.\n",
  },
  [FEATS.MODERATELY_ARMORED]: {
    label: 'Moderately Armored',
    bookSource: "Player's Handbook",
    description:
      'Prerequisite: Proficiency with light armor\nYou have trained to master the use of medium armor and shields, gaining the following benefits:\n\nIncrease your Strength or Dexterity score by 1, to a maximum of 20.\n\n\nYou gain proficiency with medium armor and shields.\n',
  },
  [FEATS.MOUNTED_COMBATANT]: {
    label: 'Mounted Combatant',
    bookSource: "Player's Handbook",
    description:
      "You are a dangerous foe to face while mounted. While you are mounted and aren't incapacitated, you gain the following benefits:\n\nYou have advantage on melee attack rolls against any unmounted creature that is smaller than your mount.\n\n\nYou can force an attack targeted at your mount to target you instead.\n\n\nIf your mount is subjected to an effect that allows it to make Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.\n",
  },
  [FEATS.OBSERVANT]: {
    label: 'Observant',
    bookSource: "Player's Handbook",
    description:
      "Quick to notice details of your environment, you gain the following benefits:\n\nIncrease your Intelligence or Wisdom score by 1, to a maximum of 20.\n\n\nIf you can see a creature's mouth while it is speaking a language you understand, you can interpret what it's saying by reading its lips.\n\n\nYou have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.\n",
  },
  [FEATS.PIERCER]: {
    label: 'Piercer',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      'You have achieved a penetrating precision in combat, granting you the following benefits:\n\nIncrease your Strength or Dexterity by 1, to a maximum of 20.\n\n\nOnce per turn, when you hit a creature with an attack that deals piercing damage, you can re-roll one of the attack’s damage dice, and you must use the new roll.\n\n\nWhen you score a critical hit that deals piercing damage to a creature, you can roll one additional damage die when determining the extra piercing damage the target takes.\n',
  },
  [FEATS.POISONER]: {
    label: 'Poisoner',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "You can prepare and deliver deadly poisons, gaining the following benefits:\n\nWhen you make a damage roll, you ignore resistance to poison damage.\n\n\nYou can coat a weapon in poison as a bonus action, instead of an action.\n\n\nYou gain proficiency with the poisoner's kit if you don't already have it. With one hour of work using a poisoner's kit and expending 50 gp worth of materials, you can create a number of doses of potent poison equal to your proficiency bonus. Once applied to a weapon or piece of ammunition, the poison retains its potency for 1 minute or until you hit with the weapon or ammunition. When a creature takes damage from the coated weapon or ammunition, that creature must succeed on a DC 14 Constitution saving throw or take 2d8 poison damage and become poisoned until the end of your next turn.\n",
  },
  [FEATS.POLEARM_MASTER]: {
    label: 'Polearm Master',
    bookSource: "Player's Handbook",
    description:
      "You gain the following benefits:\n\nWhen you take the Attack action and attack with only a glaive, halberd, quarterstaff, or spear, you can use a bonus action to make a melee attack with the opposite end of the weapon. This attack uses the same ability modifier as the primary attack. The weapon's damage die for this attack is a d4, and it deals bludgeoning damage.\n\n\nWhile you are wielding a glaive, halberd, pike, quarterstaff, or spear, other creatures provoke an opportunity attack from you when they enter the reach you have with that weapon.\n",
  },
  [FEATS.RESILIENT]: {
    label: 'Resilient',
    bookSource: "Player's Handbook",
    description:
      'Choose one ability score. You gain the following benefits:\n\nIncrease the chosen ability score by 1, to a maximum of 20.\n\n\nYou gain proficiency in saving throws using the chosen ability.\n',
  },
  [FEATS.RITUAL_CASTER]: {
    label: 'Ritual Caster',
    bookSource: "Player's Handbook",
    description:
      "Prerequisite: Intelligence or Wisdom of 13 or higher\nYou have learned a number of spells that you can cast as rituals. These spells are written in a ritual book, which you must have in hand while casting one of them.\nWhen you choose this feat, you acquire a ritual book holding two 1st-level spells of your choice. Choose one of the following classes: bard, cleric, druid, sorcerer, warlock, or wizard. You must choose your spells from that class's spell list, and the spells you choose must have the ritual tag. The class you choose also must have the ritual tag. The class you choose also determines your spellcasting ability for these spells: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard.\nIf you come across a spell in written form, such as a magical spell scroll or a wizard's spellbook, you might be able to add it to your ritual book. The spell must be on the spell list for the class you chose, the spell's level can be no higher than half your level (rounded up), and it must have the ritual tag. The process of copying the spell into your ritual book takes 2 hours per level of the spell, and costs 50 gp per level. The cost represents the material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it.",
  },
  [FEATS.SAVAGE_ATTACKER]: {
    label: 'Savage Attacker',
    bookSource: "Player's Handbook",
    description:
      "Once per turn when you roll damage for a melee weapon attack, you can reroll the weapon's damage dice and use either total.",
  },
  [FEATS.SENTINEL]: {
    label: 'Sentinel',
    bookSource: "Player's Handbook",
    description:
      "You have mastered techniques to take advantage of every drop in any enemy's guard, gaining the following benefits.\n\nWhen you hit a creature with an opportunity attack, the creature's speed becomes 0 for the rest of the turn.\n\n\nCreatures provoke opportunity attacks from you even if they take the Disengage action before leaving your reach.\n\n\nWhen a creature makes an attack against a target other than you (and that target doesn't have this feat), you can use your reaction to make a melee weapon attack against the attacking creature.\n",
  },
  [FEATS.SHADOW_TOUCHED]: {
    label: 'Shadow Touched',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "Your exposure to the Shadowfell's magic has changed you, granting you the following benefits:\n\nIncrease your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n\n\nYou learn the Invisibility spell and one 1st-level spell of your choice. The 1st-level spell must be from the Illusion or Necromancy school of magic. You can cast each of these spells without expending a spell slot. Once you cast either of these spells in this way, you can't cast that spell in this way again until you finish a long rest. You can also cast these spells using spell slots you have of the appropriate level. The spells' spellcasting ability is the ability increased by this feat.\n",
  },
  [FEATS.SHARPSHOOTER]: {
    label: 'Sharpshooter',
    bookSource: "Player's Handbook",
    description:
      "You have mastered ranged weapons and can make shots that others find impossible. You gain the following benefits:\n\nAttacking at long range doesn't impose disadvantage on your ranged weapon attack rolls.\n\n\nYour ranged weapon attacks ignore half and three-quarters cover.\n\n\nBefore you make an attack with a ranged weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If that attack hits, you add +10 to the attack's damage.\n",
  },
  [FEATS.SHIELD_MASTER]: {
    label: 'Shield Master',
    bookSource: "Player's Handbook",
    description:
      "You use shields not just for protection but also for offense. You gain the following benefits while you are wielding a shield:\n\nIf you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you with your shield.\n\n\nIf you aren't incapacitated, you can add your shield's AC bonus to any Dexterity saving throw you make against a spell or other harmful effect that targets only you.\n\n\nIf you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can use your reaction to take no damage if you succeed on the saving throw, interposing your shield between yourself and the source of the effect.\n",
  },
  [FEATS.SKILL_EXPERT]: {
    label: 'Skill Expert',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "You have honed your proficiency with particular skills, granting you the following benefits:\n\nIncrease one ability score of your choice by 1, to a maximum of 20.\n\n\nYou gain proficiency in one skill of your choice.\n\n\nChoose one skill in which you have proficiency. You gain expertise with that skill, which means your proficiency bonus is doubled for any ability check you make with it. The skill you choose must be one that isn't already benefiting from a feature, such as Expertise, that doubles your proficiency bonus.\n",
  },
  [FEATS.SKILLED]: {
    label: 'Skilled',
    bookSource: "Player's Handbook",
    description:
      'You gain proficiency in any combination of three skills or tools of your choice.',
  },
  [FEATS.SKULKER]: {
    label: 'Skulker',
    bookSource: "Player's Handbook",
    description:
      "Prerequisite: Dexterity 13 or higher\nYou are an expert at slinking through shadows. You gain the following benefits:\n\nYou can try to hide when you are lightly obscured from the creature from which you are hiding.\n\n\nWhen you are hidden from a creature and miss it with a ranged weapon attack, making the attack doesn't reveal your position.\n\n\nDim light doesn't impose disadvantage on your Wisdom (Perception) checks relying on sight.\n",
  },
  [FEATS.SLASHER]: {
    label: 'Slasher',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "You've learned where to cut to have the greatest results, granting you the following benefits:\n\nIncrease your Strength or Dexterity by 1, to a maximum of 20.\n\n\nOnce per turn when you hit a creature with an attack that deals slashing damage, you can reduce the speed of the target by 10 feet until the start of your next turn.\n\n\nWhen you score a critical hit that deals slashing damage to a creature, you grievously wound it. Until the start of your next turn, the target has disadvantage on all attack rolls.\n",
  },
  [FEATS.SPELL_SNIPER]: {
    label: 'Spell Sniper',
    bookSource: "Player's Handbook",
    description:
      "Prerequisite: The ability to cast at least one spell\nYou have learned techniques to enhance your attacks with certain kinds of spells, gaining the following benefits:\n\nWhen you cast a spell that requires you to make an attack roll, the spell's range is doubled.\n\n\nYour ranged spell attacks ignore half cover and three-quarters cover.\n\n\nYou learn one cantrip that requires an attack roll. Choose the cantrip from the bard, cleric, druid, sorcerer, warlock, or wizard spell list. Your spellcasting ability for this cantrip depends on the spell list you chose from: Charisma for bard, sorcerer, and warlock; Wisdom for cleric or druid; or Intelligence for wizard.\n",
  },
  [FEATS.SQUIRE_OF_SOLAMNIA]: {
    label: 'Squire of Solamnia',
    bookSource: 'Dragonlance: Shadow of the Dragon Queen',
    description:
      "Prerequisite: Dragonlance Campaign, Fighter or Paladin Class or Knight of Solamnia Background\nYour training in the ways of the Knights of Solamnia grants you these benefits:\n\nMount Up. Mounting or dismounting costs you only 5 feet of movement.\n\n\nPrecise Strike. Once per turn, when you make a weapon attack roll against a creature, you can cause the attack roll to have advantage. If the attack hits, you roll a d8 and add the number rolled as a bonus to the attack's damage roll. You can use this benefit a number of times equal to your proficiency bonus, but a use is expended only if the attack hits. You regain all expended uses when you finish a long rest.\n",
  },
  [FEATS.STRIXHAVEN_INITIATE]: {
    label: 'Strixhaven Initiate',
    bookSource: 'Strixhaven: A Curriculum of Chaos',
    description:
      "You have studied some magical theory and have learned a few spells associated with Strixhaven University.\nChoose one of Strixhaven's colleges: Lorehold, Prismari. Quandrix, Silverquill, or Witherbloom. You learn two cantrips and one 1st-level spell based on the college you choose, as specified in the Strixhaven Spells table.\nYou can cast the chosen 1st-level spell without a spell slot, and you must finish a long rest before you can cast it in this way again. You can also cast the spell using any spell slots you have.\nYour spellcasting ability for this feat's spells is Intelligence, Wisdom, or Charisma (choose when you select this feat).\n\n\nStrixhaven Spells\n\n\nCollege\nCantrips\n1st-Level Spell\n\n\nLorehold\nChoose two from Light, Sacred Flame, and Thaumaturgy.\nChoose one 1st-level Cleric or Wizard spell.\n\n\nPrismari\nChoose two from Fire Bolt, Prestidigitation, and Ray of Frost.\nChoose one 1st-level Bard or Sorcerer spell.\n\n\nQuandrix\nChoose two from Druidcraft, Guidance, and Mage Hand.\nChoose one 1st-level Druid or Wizard spell.\n\n\nSilverquill\nChoose two from Sacred Flame, Thaumaturgy, and Vicious Mockery.\nChoose one 1st-level Bard or Cleric spell.\n\n\nWitherbloom\nChoose two from Chill Touch, Druidcraft, and Spare the Dying.\nChoose one 1st-level Druid or Wizard spell.\n\n",
  },
  [FEATS.STRIXHAVEN_MASCOT]: {
    label: 'Strixhaven Mascot',
    bookSource: 'Strixhaven: A Curriculum of Chaos',
    description:
      "Prerequisite: 4th Level, Strixhaven Initiate Feat\nYou have learned how to summon a Strixhaven mascot to assist you, granting you these benefits:\n\nYou can cast the Find Familiar spell as a ritual. Your familiar can take the form of the mascot associated with the college you chose for the Strixhaven Initiate feat: a spirit statue mascot (Lorehold), an art elemental mascot (Prismari), a fractal mascot (Quandrix), an inkling mascot (Silverquill), or a pest mascot (Witherbloom).\n\n\nWhen you take the Attack action on your turn, you can forgo one attack to allow your mascot familiar to make one attack of its own with its reaction.\n\n\nIf your mascot familiar is within 60 feet of you, you can be teleported as an action, swapping places with the familiar. If your destination space is too small for you to occupy, the teleportation fails and is wasted. Once you teleport this way, you can't do so again until you finish a long rest, unless you expend a spell slot of 2nd level or higher to do it again.\n",
  },
  [FEATS.TAVERN_BRAWLER]: {
    label: 'Tavern Brawler',
    bookSource: "Player's Handbook",
    description:
      'Accustomed to the rough-and-tumble fighting using whatever weapons happen to be at hand, you gain the following benefits:\n\nIncrease your Strength or Consititution score by 1, to a maximum of 20.\n\n\nYou are proficient with improvised weapons.\n\n\nYour unarmed strike uses a d4 for damage.\n\n\nWhen you hit a creature with an unarmed strike or an improvised weapon on your turn, you can use a bonus action to attempt to grapple the target.\n',
  },
  [FEATS.TELEKINETIC]: {
    label: 'Telekinetic',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      'You learn to move things with your mind, granting you the following benefits:\n\nIncrease your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n\n\nYou learn the mage hand cantrip. You can cast it without verbal or somatic components, and you can make the spectral hand invisible. If you already know this spell, its range increases by 30 feet when you cast it. Its spellcasting ability is the ability increased by this feat.\n\n\nAs a bonus action, you can try to telekinetically shove one creature you can see within 30 feet of you. When you do so, the target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + the ability modifier of the score increased by this feat) or be moved 5 feet toward or away from you. A creature can willingly fail this save.\n',
  },
  [FEATS.TELEPATHIC]: {
    label: 'Telepathic',
    bookSource: "Tasha's Cauldron of Everything",
    description:
      "You awaken the ability to mentally connect with others, granting you the following benefits:\n\nIncrease your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n\n\nYou can speak telepathically to any creature you can see within 60 feet of you. Your telepathic utterances are in a language you know, and the creature understands you only if it knows that language. Your communication doesn't give the creature the ability to respond to you telepathically.\n\n\nYou can cast the Detect Thoughts spell, requiring no spell slot or components, and you must finish a long rest before you can cast it this way again. Your spellcasting ability for the spell is the ability increased by this feat. If you have spell slots of 2nd level or higher, you can cast this spell with them.\n",
  },
  [FEATS.TOUGH]: {
    label: 'Tough',
    bookSource: "Player's Handbook",
    description:
      'Your hit point maximum increases by an amount equal to twice your level when you gain this feat. Whenever you gain a level thereafter, your hit point maximum increases by an additional 2 hit points.',
  },
  [FEATS.WAR_CASTER]: {
    label: 'War Caster',
    bookSource: "Player's Handbook",
    description:
      "Prerequisite: The ability to cast at least one spell\nYou have practiced casting spells in the midst of combat, learning techniques that grant you the following benefits:\n\nYou have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage.\n\n\nYou can perform the somatic components of spells even when you have weapons or a shield in one or both hands.\n\n\nWhen a hostile creature's movement provokes an opportunity attack from you, you can use your reaction to cast a spell at the creature, rather than making an opportunity attack. The spell must have a casting time of 1 action and must target only that creature.\n",
  },
  [FEATS.WEAPON_MASTER]: {
    label: 'Weapon Master',
    bookSource: "Player's Handbook",
    description:
      'You have practiced extensively with a variety of weapons, gaining the following benefits:\n\nIncrease your Strength or Dexterity score by 1, to a maximum of 20.\n\n\nYou gain proficiency with four weapons of your choice. Each one must be a simple or a martial weapon.\n',
  },
};
