/*
  THE PLAYER LAB
  File: data/randomizer-profiles.js
  Version: 0.1.2
  Updated: 2026-08-21

  PURPOSE
  Stores Player Lab competition-level randomization profiles.

  IMPORTANT
  - These are Player Lab generation defaults.
  - These are NOT official NBA 2K attribute or overall limits.
  - Generated players remain fully editable.
  - NBA 2K ultimately determines the in-game player result.

  CHANGELOG
  0.1.2 - Refined randomized wingspan generation
      - Changed randomized wingspan to never be shorter than player height
      - Limited randomized wingspan to a maximum of 5 inches above player height
      - Applied the same wingspan difference range across High School, NCAA, and NBA profiles
      - Preserved existing attribute and physical generation behavior
  
  0.1.1 - Fixed randomizer profile syntax
        - Added missing comma after High School eliteChance
        - Restored loading of PLAYER_LAB_RANDOMIZER_PROFILES
        - Restored Randomize Player functionality

  0.1.0 - Initial competition generation profiles
        - Added High School profile
        - Added NCAA profile
        - Added NBA profile
        - Added normal and rare elite attribute ranges
*/

window.PLAYER_LAB_RANDOMIZER_PROFILES = {

  "high-school": {
    label: "High School",

    normalMin: 25,
    normalMax: 78,

    eliteMin: 79,
    eliteMax: 88,

    eliteChance: 0.08,

    physicals: {
      heightMin: 65,
      heightMax: 82,
      weightMin: 135,
      weightMax: 260,

      wingspanDifferenceMin: 0,
      wingspanDifferenceMax: 6
    }
  },


  "ncaa": {
    label: "NCAA",

    normalMin: 25,
    normalMax: 84,

    eliteMin: 85,
    eliteMax: 93,

    eliteChance: 0.10,

    physicals: {
      wingspanDifferenceMin: 0,
      wingspanDifferenceMax: 6
    }
  },


  "nba": {
    label: "NBA",

    normalMin: 25,
    normalMax: 92,

    eliteMin: 93,
    eliteMax: 99,

    eliteChance: 0.12,

    physicals: {
      wingspanDifferenceMin: 0,
      wingspanDifferenceMax: 6
    }
  }

};
