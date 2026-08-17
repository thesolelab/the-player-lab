/*
  THE PLAYER LAB
  File: data/badges-2k26.js
  Version: 0.1.0
  Updated: 2026-08-16

  PURPOSE
  Stores verified NBA 2K26 badge requirements only.

  SOURCE
  NBA 2K26 Badge Requirements chart provided by the user.
  Chart credit: JPforThree

  IMPORTANT
  - This file contains DATA only.
  - Badge qualification logic belongs in js/app.js.
  - Do not invent or estimate badge requirements.
  - Do not overwrite this file when NBA 2K27 releases.
  - Future NBA 2K versions should use separate files such as:
      data/badges-2k27.js
      data/badges-2k28.js

  DATA FORMAT
  - allOf = every listed requirement must be met
  - anyOf = at least one listed requirement must be met
  - heightRestriction = optional minimum or maximum player height

  CHANGELOG
  0.1.0 - Initial NBA 2K26 badge database
        - Added all verified NBA 2K26 badges
        - Added Bronze through Legend requirements
        - Added single-attribute requirements
        - Added AND requirements using allOf
        - Added OR requirements using anyOf
        - Added height restrictions
*/

window.BADGES_2K26 = {
  gameVersion: "NBA 2K26",
  dataVersion: "0.1.0",

  badges: [
    // =========================================================
    // FINISHING
    // =========================================================

    {
      name: "Aerial Wizard",
      category: "Finishing",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "drivingDunk", min: 64 },
            { attribute: "standingDunk", min: 60 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "drivingDunk", min: 70 },
            { attribute: "standingDunk", min: 75 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "drivingDunk", min: 80 },
            { attribute: "standingDunk", min: 84 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "drivingDunk", min: 89 },
            { attribute: "standingDunk", min: 92 }
          ]
        },
        legend: {
          anyOf: [
            { attribute: "drivingDunk", min: 97 },
            { attribute: "standingDunk", min: 98 }
          ]
        }
      }
    },

    {
      name: "Float Game",
      category: "Finishing",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "closeShot", min: 68 },
            { attribute: "drivingLayup", min: 65 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "closeShot", min: 78 },
            { attribute: "drivingLayup", min: 78 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "closeShot", min: 86 },
            { attribute: "drivingLayup", min: 88 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "closeShot", min: 92 },
            { attribute: "drivingLayup", min: 95 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "closeShot", min: 98 },
            { attribute: "drivingLayup", min: 98 }
          ]
        }
      }
    },

    {
      name: "Hook Specialist",
      category: "Finishing",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [
            { attribute: "closeShot", min: 60 },
            { attribute: "postControl", min: 61 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "closeShot", min: 75 },
            { attribute: "postControl", min: 65 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "closeShot", min: 87 },
            { attribute: "postControl", min: 80 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "closeShot", min: 94 },
            { attribute: "postControl", min: 90 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "closeShot", min: 99 },
            { attribute: "postControl", min: 97 }
          ]
        }
      }
    },

    {
      name: "Layup Mixmaster",
      category: "Finishing",
      heightRestriction: {
        maxInches: 83,
        display: "Max Height: 6'11\""
      },
      levels: {
        bronze: {
          allOf: [{ attribute: "drivingLayup", min: 75 }]
        },
        silver: {
          allOf: [{ attribute: "drivingLayup", min: 85 }]
        },
        gold: {
          allOf: [{ attribute: "drivingLayup", min: 93 }]
        },
        hallOfFame: {
          allOf: [{ attribute: "drivingLayup", min: 97 }]
        },
        legend: {
          allOf: [{ attribute: "drivingLayup", min: 99 }]
        }
      }
    },

    {
      name: "Paint Prodigy",
      category: "Finishing",
      heightRestriction: {
        minInches: 75,
        display: "Min Height: 6'3\""
      },
      levels: {
        bronze: {
          allOf: [{ attribute: "closeShot", min: 73 }]
        },
        silver: {
          allOf: [{ attribute: "closeShot", min: 84 }]
        },
        gold: {
          allOf: [{ attribute: "closeShot", min: 92 }]
        },
        hallOfFame: {
          allOf: [{ attribute: "closeShot", min: 96 }]
        },
        legend: {
          allOf: [{ attribute: "closeShot", min: 99 }]
        }
      }
    },

    {
      name: "Physical Finisher",
      category: "Finishing",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [
            { attribute: "strength", min: 60 },
            { attribute: "drivingLayup", min: 70 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "strength", min: 67 },
            { attribute: "drivingLayup", min: 80 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "strength", min: 75 },
            { attribute: "drivingLayup", min: 90 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "strength", min: 83 },
            { attribute: "drivingLayup", min: 96 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "strength", min: 97 },
            { attribute: "drivingLayup", min: 97 }
          ]
        }
      }
    },

    {
      name: "Post Fade Phenom",
      category: "Finishing",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [
            { attribute: "postControl", min: 60 },
            { attribute: "midRangeShot", min: 61 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "postControl", min: 70 },
            { attribute: "midRangeShot", min: 71 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "postControl", min: 79 },
            { attribute: "midRangeShot", min: 80 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "postControl", min: 84 },
            { attribute: "midRangeShot", min: 90 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "postControl", min: 90 },
            { attribute: "midRangeShot", min: 94 }
          ]
        }
      }
    },

    {
      name: "Post Powerhouse",
      category: "Finishing",
      heightRestriction: {
        minInches: 76,
        display: "Min Height: 6'4\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "postControl", min: 64 },
            { attribute: "strength", min: 70 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "postControl", min: 75 },
            { attribute: "strength", min: 79 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "postControl", min: 85 },
            { attribute: "strength", min: 86 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "postControl", min: 93 },
            { attribute: "strength", min: 95 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "postControl", min: 98 },
            { attribute: "strength", min: 96 }
          ]
        }
      }
    },

    {
      name: "Post-Up Poet",
      category: "Finishing",
      heightRestriction: {
        minInches: 72,
        display: "Min Height: 6'0\""
      },
      levels: {
        bronze: {
          allOf: [{ attribute: "postControl", min: 67 }]
        },
        silver: {
          allOf: [{ attribute: "postControl", min: 77 }]
        },
        gold: {
          allOf: [{ attribute: "postControl", min: 87 }]
        },
        hallOfFame: {
          allOf: [{ attribute: "postControl", min: 95 }]
        },
        legend: {
          allOf: [{ attribute: "postControl", min: 99 }]
        }
      }
    },

    {
      name: "Posterizer",
      category: "Finishing",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [
            { attribute: "drivingDunk", min: 73 },
            { attribute: "vertical", min: 65 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "drivingDunk", min: 87 },
            { attribute: "vertical", min: 75 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "drivingDunk", min: 93 },
            { attribute: "vertical", min: 80 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "drivingDunk", min: 96 },
            { attribute: "vertical", min: 85 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "drivingDunk", min: 99 },
            { attribute: "vertical", min: 90 }
          ]
        }
      }
    },

    {
      name: "Rise Up",
      category: "Finishing",
      heightRestriction: {
        minInches: 78,
        display: "Min Height: 6'6\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "standingDunk", min: 72 },
            { attribute: "vertical", min: 60 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "standingDunk", min: 81 },
            { attribute: "vertical", min: 62 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "standingDunk", min: 90 },
            { attribute: "vertical", min: 66 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "standingDunk", min: 95 },
            { attribute: "vertical", min: 69 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "standingDunk", min: 99 },
            { attribute: "vertical", min: 71 }
          ]
        }
      }
    },


    // =========================================================
    // SHOOTING
    // =========================================================

    {
      name: "Deadeye",
      category: "Shooting",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "midRangeShot", min: 73 },
            { attribute: "threePointShot", min: 73 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "midRangeShot", min: 85 },
            { attribute: "threePointShot", min: 85 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "midRangeShot", min: 92 },
            { attribute: "threePointShot", min: 92 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "midRangeShot", min: 95 },
            { attribute: "threePointShot", min: 95 }
          ]
        },
        legend: {
          anyOf: [
            { attribute: "midRangeShot", min: 99 },
            { attribute: "threePointShot", min: 99 }
          ]
        }
      }
    },

    {
      name: "Limitless Range",
      category: "Shooting",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [{ attribute: "threePointShot", min: 83 }]
        },
        silver: {
          allOf: [{ attribute: "threePointShot", min: 89 }]
        },
        gold: {
          allOf: [{ attribute: "threePointShot", min: 93 }]
        },
        hallOfFame: {
          allOf: [{ attribute: "threePointShot", min: 96 }]
        },
        legend: {
          allOf: [{ attribute: "threePointShot", min: 99 }]
        }
      }
    },

    {
      name: "Mini Marksman",
      category: "Shooting",
      heightRestriction: {
        maxInches: 75,
        display: "Max Height: 6'3\""
      },
      levels: {
        bronze: {
          anyOf: [
            { attribute: "midRangeShot", min: 71 },
            { attribute: "threePointShot", min: 71 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "midRangeShot", min: 82 },
            { attribute: "threePointShot", min: 82 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "midRangeShot", min: 94 },
            { attribute: "threePointShot", min: 94 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "midRangeShot", min: 97 },
            { attribute: "threePointShot", min: 97 }
          ]
        },
        legend: {
          anyOf: [
            { attribute: "midRangeShot", min: 99 },
            { attribute: "threePointShot", min: 99 }
          ]
        }
      }
    },

    {
      name: "Set Shot Specialist",
      category: "Shooting",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "midRangeShot", min: 65 },
            { attribute: "threePointShot", min: 65 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "midRangeShot", min: 78 },
            { attribute: "threePointShot", min: 78 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "midRangeShot", min: 89 },
            { attribute: "threePointShot", min: 89 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "midRangeShot", min: 93 },
            { attribute: "threePointShot", min: 95 }
          ]
        },
        legend: {
          anyOf: [
            { attribute: "midRangeShot", min: 98 },
            { attribute: "threePointShot", min: 98 }
          ]
        }
      }
    },

    {
      name: "Shifty Shooter",
      category: "Shooting",
      heightRestriction: {
        maxInches: 83,
        display: "Max Height: 6'11\""
      },
      levels: {
        bronze: {
          anyOf: [
            { attribute: "midRangeShot", min: 76 },
            { attribute: "threePointShot", min: 76 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "midRangeShot", min: 87 },
            { attribute: "threePointShot", min: 87 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "midRangeShot", min: 91 },
            { attribute: "threePointShot", min: 91 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "midRangeShot", min: 96 },
            { attribute: "threePointShot", min: 96 }
          ]
        },
        legend: {
          anyOf: [
            { attribute: "midRangeShot", min: 99 },
            { attribute: "threePointShot", min: 99 }
          ]
        }
      }
    },


    // =========================================================
    // PLAYMAKING
    // =========================================================

    {
      name: "Ankle Assassin",
      category: "Playmaking",
      heightRestriction: {
        maxInches: 82,
        display: "Max Height: 6'10\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "ballHandle", min: 75 }] },
        silver: { allOf: [{ attribute: "ballHandle", min: 86 }] },
        gold: { allOf: [{ attribute: "ballHandle", min: 93 }] },
        hallOfFame: { allOf: [{ attribute: "ballHandle", min: 95 }] },
        legend: { allOf: [{ attribute: "ballHandle", min: 98 }] }
      }
    },

    {
      name: "Bail Out",
      category: "Playmaking",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "passAccuracy", min: 85 }] },
        silver: { allOf: [{ attribute: "passAccuracy", min: 91 }] },
        gold: { allOf: [{ attribute: "passAccuracy", min: 94 }] },
        hallOfFame: { allOf: [{ attribute: "passAccuracy", min: 96 }] },
        legend: { allOf: [{ attribute: "passAccuracy", min: 99 }] }
      }
    },

    {
      name: "Break Starter",
      category: "Playmaking",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "passAccuracy", min: 65 }] },
        silver: { allOf: [{ attribute: "passAccuracy", min: 75 }] },
        gold: { allOf: [{ attribute: "passAccuracy", min: 87 }] },
        hallOfFame: { allOf: [{ attribute: "passAccuracy", min: 93 }] },
        legend: { allOf: [{ attribute: "passAccuracy", min: 98 }] }
      }
    },

    {
      name: "Dimer",
      category: "Playmaking",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "passAccuracy", min: 55 }] },
        silver: { allOf: [{ attribute: "passAccuracy", min: 71 }] },
        gold: { allOf: [{ attribute: "passAccuracy", min: 82 }] },
        hallOfFame: { allOf: [{ attribute: "passAccuracy", min: 92 }] },
        legend: { allOf: [{ attribute: "passAccuracy", min: 98 }] }
      }
    },

    {
      name: "Handles For Days",
      category: "Playmaking",
      heightRestriction: {
        maxInches: 84,
        display: "Max Height: 7'0\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "ballHandle", min: 71 }] },
        silver: { allOf: [{ attribute: "ballHandle", min: 81 }] },
        gold: { allOf: [{ attribute: "ballHandle", min: 90 }] },
        hallOfFame: { allOf: [{ attribute: "ballHandle", min: 94 }] },
        legend: { allOf: [{ attribute: "ballHandle", min: 97 }] }
      }
    },

    {
      name: "Lightning Launch",
      category: "Playmaking",
      heightRestriction: {
        maxInches: 83,
        display: "Max Height: 6'11\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "speedWithBall", min: 68 }] },
        silver: { allOf: [{ attribute: "speedWithBall", min: 75 }] },
        gold: { allOf: [{ attribute: "speedWithBall", min: 86 }] },
        hallOfFame: { allOf: [{ attribute: "speedWithBall", min: 91 }] },
        legend: { allOf: [{ attribute: "speedWithBall", min: 94 }] }
      }
    },

    {
      name: "Strong Handle",
      category: "Playmaking",
      heightRestriction: {
        maxInches: 83,
        display: "Max Height: 6'11\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "ballHandle", min: 60 },
            { attribute: "strength", min: 60 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "ballHandle", min: 67 },
            { attribute: "strength", min: 65 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "ballHandle", min: 73 },
            { attribute: "strength", min: 73 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "ballHandle", min: 77 },
            { attribute: "strength", min: 84 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "ballHandle", min: 80 },
            { attribute: "strength", min: 93 }
          ]
        }
      }
    },

    {
      name: "Unpluckable",
      category: "Playmaking",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "postControl", min: 75 },
            { attribute: "ballHandle", min: 70 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "postControl", min: 86 },
            { attribute: "ballHandle", min: 80 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "postControl", min: 96 },
            { attribute: "ballHandle", min: 92 }
          ]
        },
        hallOfFame: {
          allOf: [{ attribute: "ballHandle", min: 96 }]
        },
        legend: {
          allOf: [{ attribute: "ballHandle", min: 99 }]
        }
      }
    },

    {
      name: "Versatile Visionary",
      category: "Playmaking",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "passAccuracy", min: 70 }] },
        silver: { allOf: [{ attribute: "passAccuracy", min: 76 }] },
        gold: { allOf: [{ attribute: "passAccuracy", min: 84 }] },
        hallOfFame: { allOf: [{ attribute: "passAccuracy", min: 95 }] },
        legend: { allOf: [{ attribute: "passAccuracy", min: 99 }] }
      }
    },


    // =========================================================
    // DEFENSE / REBOUNDING
    // =========================================================

    {
      name: "Boxout Beast",
      category: "Defense / Rebounding",
      heightRestriction: {
        minInches: 75,
        display: "Min Height: 6'3\""
      },
      levels: {
        bronze: {
          anyOf: [
            { attribute: "offensiveRebound", min: 55 },
            { attribute: "defensiveRebound", min: 55 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "offensiveRebound", min: 70 },
            { attribute: "defensiveRebound", min: 70 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "offensiveRebound", min: 85 },
            { attribute: "defensiveRebound", min: 85 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "offensiveRebound", min: 94 },
            { attribute: "defensiveRebound", min: 94 }
          ]
        },
        legend: {
          anyOf: [
            { attribute: "offensiveRebound", min: 98 },
            { attribute: "defensiveRebound", min: 98 }
          ]
        }
      }
    },

    {
      name: "Rebound Chaser",
      category: "Defense / Rebounding",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "offensiveRebound", min: 60 },
            { attribute: "defensiveRebound", min: 60 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "offensiveRebound", min: 80 },
            { attribute: "defensiveRebound", min: 80 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "offensiveRebound", min: 92 },
            { attribute: "defensiveRebound", min: 92 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "offensiveRebound", min: 96 },
            { attribute: "defensiveRebound", min: 96 }
          ]
        },
        legend: {
          anyOf: [
            { attribute: "offensiveRebound", min: 99 },
            { attribute: "defensiveRebound", min: 99 }
          ]
        }
      }
    },

    {
      name: "Challenger",
      category: "Defense / Rebounding",
      heightRestriction: {
        maxInches: 83,
        display: "Max Height: 6'11\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "perimeterDefense", min: 71 }] },
        silver: { allOf: [{ attribute: "perimeterDefense", min: 82 }] },
        gold: { allOf: [{ attribute: "perimeterDefense", min: 92 }] },
        hallOfFame: { allOf: [{ attribute: "perimeterDefense", min: 95 }] },
        legend: { allOf: [{ attribute: "perimeterDefense", min: 99 }] }
      }
    },

    {
      name: "Glove",
      category: "Defense / Rebounding",
      heightRestriction: {
        maxInches: 84,
        display: "Max Height: 7'0\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "steal", min: 67 }] },
        silver: { allOf: [{ attribute: "steal", min: 79 }] },
        gold: { allOf: [{ attribute: "steal", min: 91 }] },
        hallOfFame: { allOf: [{ attribute: "steal", min: 96 }] },
        legend: { allOf: [{ attribute: "steal", min: 99 }] }
      }
    },

    {
      name: "High-Flying Defender",
      category: "Defense / Rebounding",
      heightRestriction: {
        minInches: 75,
        display: "Min Height: 6'3\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "block", min: 68 },
            { attribute: "vertical", min: 60 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "block", min: 78 },
            { attribute: "vertical", min: 74 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "block", min: 88 },
            { attribute: "vertical", min: 80 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "block", min: 92 },
            { attribute: "vertical", min: 83 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "block", min: 99 },
            { attribute: "vertical", min: 85 }
          ]
        }
      }
    },

    {
      name: "Immovable Enforcer",
      category: "Defense / Rebounding",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [
            { attribute: "perimeterDefense", min: 62 },
            { attribute: "strength", min: 71 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "perimeterDefense", min: 72 },
            { attribute: "strength", min: 82 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "perimeterDefense", min: 84 },
            { attribute: "strength", min: 85 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "perimeterDefense", min: 89 },
            { attribute: "strength", min: 91 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "perimeterDefense", min: 94 },
            { attribute: "strength", min: 92 }
          ]
        }
      }
    },

    {
      name: "Interceptor",
      category: "Defense / Rebounding",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "steal", min: 60 }] },
        silver: { allOf: [{ attribute: "steal", min: 73 }] },
        gold: { allOf: [{ attribute: "steal", min: 85 }] },
        hallOfFame: { allOf: [{ attribute: "steal", min: 94 }] },
        legend: { allOf: [{ attribute: "steal", min: 98 }] }
      }
    },

    {
      name: "Off-Ball Pest",
      category: "Defense / Rebounding",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "interiorDefense", min: 69 },
            { attribute: "perimeterDefense", min: 58 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "interiorDefense", min: 76 },
            { attribute: "perimeterDefense", min: 68 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "interiorDefense", min: 85 },
            { attribute: "perimeterDefense", min: 80 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "interiorDefense", min: 94 },
            { attribute: "perimeterDefense", min: 87 }
          ]
        },
        legend: {
          anyOf: [
            { attribute: "interiorDefense", min: 97 },
            { attribute: "perimeterDefense", min: 98 }
          ]
        }
      }
    },

    {
      name: "On-Ball Menace",
      category: "Defense / Rebounding",
      heightRestriction: {
        maxInches: 81,
        display: "Max Height: 6'9\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "perimeterDefense", min: 74 },
            { attribute: "agility", min: 70 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "perimeterDefense", min: 85 },
            { attribute: "agility", min: 76 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "perimeterDefense", min: 91 },
            { attribute: "agility", min: 80 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "perimeterDefense", min: 96 },
            { attribute: "agility", min: 84 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "perimeterDefense", min: 99 },
            { attribute: "agility", min: 86 }
          ]
        }
      }
    },

    {
      name: "Paint Patroller",
      category: "Defense / Rebounding",
      heightRestriction: {
        minInches: 78,
        display: "Min Height: 6'6\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "interiorDefense", min: 60 },
            { attribute: "block", min: 74 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "interiorDefense", min: 70 },
            { attribute: "block", min: 84 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "interiorDefense", min: 77 },
            { attribute: "block", min: 93 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "interiorDefense", min: 84 },
            { attribute: "block", min: 97 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "interiorDefense", min: 89 },
            { attribute: "block", min: 99 }
          ]
        }
      }
    },

    {
      name: "Pick Dodger",
      category: "Defense / Rebounding",
      heightRestriction: {
        maxInches: 82,
        display: "Max Height: 6'10\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "perimeterDefense", min: 73 },
            { attribute: "agility", min: 71 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "perimeterDefense", min: 83 },
            { attribute: "agility", min: 75 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "perimeterDefense", min: 90 },
            { attribute: "agility", min: 79 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "perimeterDefense", min: 97 },
            { attribute: "agility", min: 85 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "perimeterDefense", min: 99 },
            { attribute: "agility", min: 92 }
          ]
        }
      }
    },

    {
      name: "Post Lockdown",
      category: "Defense / Rebounding",
      heightRestriction: {
        minInches: 77,
        display: "Min Height: 6'5\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "interiorDefense", min: 74 },
            { attribute: "strength", min: 70 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "interiorDefense", min: 82 },
            { attribute: "strength", min: 78 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "interiorDefense", min: 88 },
            { attribute: "strength", min: 84 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "interiorDefense", min: 93 },
            { attribute: "strength", min: 92 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "interiorDefense", min: 99 },
            { attribute: "strength", min: 97 }
          ]
        }
      }
    },

    {
      name: "Pogo Stick",
      category: "Defense / Rebounding",
      heightRestriction: {
        minInches: 76,
        display: "Min Height: 6'4\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "vertical", min: 65 }] },
        silver: { allOf: [{ attribute: "vertical", min: 70 }] },
        gold: { allOf: [{ attribute: "vertical", min: 77 }] },
        hallOfFame: { allOf: [{ attribute: "vertical", min: 83 }] },
        legend: { allOf: [{ attribute: "vertical", min: 88 }] }
      }
    },


    // =========================================================
    // GENERAL
    // =========================================================

    {
      name: "Slippery Off-Ball",
      category: "General",
      heightRestriction: {
        maxInches: 81,
        display: "Max Height: 6'9\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "speed", min: 57 },
            { attribute: "agility", min: 57 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "speed", min: 73 },
            { attribute: "agility", min: 65 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "speed", min: 85 },
            { attribute: "agility", min: 77 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "speed", min: 92 },
            { attribute: "agility", min: 88 }
          ]
        },
        legend: {
          allOf: [
            { attribute: "speed", min: 99 },
            { attribute: "agility", min: 96 }
          ]
        }
      }
    },

    {
      name: "Brick Wall",
      category: "General",
      heightRestriction: {
        minInches: 77,
        display: "Min Height: 6'5\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "strength", min: 72 }] },
        silver: { allOf: [{ attribute: "strength", min: 83 }] },
        gold: { allOf: [{ attribute: "strength", min: 91 }] },
        hallOfFame: { allOf: [{ attribute: "strength", min: 95 }] },
        legend: { allOf: [{ attribute: "strength", min: 99 }] }
      }
    }

  ]
};
