/*
  THE PLAYER LAB
  File: data/badges-2k27.js
  Version: 0.1.2
  Updated: 2026-08-21

  PURPOSE
  Stores verified NBA 2K27 badge requirements only.

  SOURCE
  NBA 2K27 Badge Requirements chart provided by the user.
  Chart credit: JPforThree

  IMPORTANT
  - This file contains DATA only.
  - Badge qualification logic belongs in js/app.js.
  - Do not invent or estimate badge requirements.
  - Do not overwrite prior NBA 2K badge datasets.
  - NBA 2K27 requirements remain stored separately in:
      data/badges-2k27.js

  DATA FORMAT
  - allOf = every listed requirement must be met
  - anyOf = at least one listed requirement must be met
  - heightRestriction = optional minimum or maximum player height
  - NBA 2K27 source chart currently contains:
      Bronze
      Silver
      Gold
      Hall of Fame
  - No Legend requirements are included because they are not
    present in the verified source chart.

  CHANGELOG
 0.1.2 - Added full NBA 2K27 badge descriptions
        - Replaced temporary shortened badge summaries
        - Added full descriptions for all 53 NBA 2K27 badges
        - Preserved all existing badge requirements and restrictions
        - Kept descriptions separate from qualification logic
  0.1.1 - Added NBA 2K27 badge descriptions
      - Added concise descriptions for all 53 badges
      - Kept badge descriptions separate from qualification requirements
      - Applied descriptions to badge records by badge name
      - Preserved all existing badge thresholds, restrictions, and qualification logic
  0.1.0 - Initial NBA 2K27 badge database
        - Added 53 badges from the verified requirement chart
        - Added Bronze through Hall of Fame requirements
        - Added single-attribute requirements
        - Added AND requirements using allOf
        - Added OR requirements using anyOf
        - Added height restrictions
*/

window.BADGES_2K27 = {
  gameVersion: "NBA 2K27",
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
            { attribute: "drivingDunk", min: 60 },
            { attribute: "standingDunk", min: 60 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "drivingDunk", min: 70 },
            { attribute: "standingDunk", min: 70 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "drivingDunk", min: 80 },
            { attribute: "standingDunk", min: 80 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "drivingDunk", min: 94 },
            { attribute: "standingDunk", min: 93 }
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
            { attribute: "closeShot", min: 65 },
            { attribute: "drivingLayup", min: 65 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "closeShot", min: 80 },
            { attribute: "drivingLayup", min: 85 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "closeShot", min: 90 },
            { attribute: "drivingLayup", min: 93 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "closeShot", min: 96 },
            { attribute: "drivingLayup", min: 95 }
          ]
        }
      }
    },

    {
      name: "Ghost Stepper",
      category: "Finishing",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "closeShot", min: 55 },
            { attribute: "postControl", min: 55 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "closeShot", min: 77 },
            { attribute: "postControl", min: 77 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "closeShot", min: 86 },
            { attribute: "postControl", min: 86 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "closeShot", min: 94 },
            { attribute: "postControl", min: 94 }
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
            { attribute: "postControl", min: 55 }
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
        }
      }
    },

    {
      name: "Layup Mixmaster",
      category: "Finishing",
      heightRestriction: {
        maxInches: 84,
        display: "Max Height: 7'0\""
      },
      levels: {
        bronze: {
          allOf: [{ attribute: "drivingLayup", min: 70 }]
        },
        silver: {
          allOf: [{ attribute: "drivingLayup", min: 83 }]
        },
        gold: {
          allOf: [{ attribute: "drivingLayup", min: 90 }]
        },
        hallOfFame: {
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
          allOf: [{ attribute: "closeShot", min: 60 }]
        },
        silver: {
          allOf: [{ attribute: "closeShot", min: 85 }]
        },
        gold: {
          allOf: [{ attribute: "closeShot", min: 90 }]
        },
        hallOfFame: {
          allOf: [{ attribute: "closeShot", min: 96 }]
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
            { attribute: "drivingLayup", min: 60 },
            { attribute: "strength", min: 60 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "drivingLayup", min: 80 },
            { attribute: "strength", min: 70 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "drivingLayup", min: 90 },
            { attribute: "strength", min: 80 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "drivingLayup", min: 96 },
            { attribute: "strength", min: 90 }
          ]
        }
      }
    },

    {
      name: "Post Powerhouse",
      category: "Finishing",
      heightRestriction: {
        minInches: 77,
        display: "Min Height: 6'5\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "postControl", min: 60 },
            { attribute: "strength", min: 65 }
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
            { attribute: "postControl", min: 95 },
            { attribute: "strength", min: 95 }
          ]
        }
      }
    },

    {
      name: "Post Spin Catalyst",
      category: "Finishing",
      heightRestriction: {
        minInches: 73,
        display: "Min Height: 6'1\""
      },
      levels: {
        bronze: {
          allOf: [{ attribute: "postControl", min: 65 }]
        },
        silver: {
          allOf: [{ attribute: "postControl", min: 83 }]
        },
        gold: {
          allOf: [{ attribute: "postControl", min: 91 }]
        },
        hallOfFame: {
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
        minInches: 77,
        display: "Min Height: 6'5\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "standingDunk", min: 60 },
            { attribute: "vertical", min: 55 }
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
            { attribute: "standingDunk", min: 99 },
            { attribute: "vertical", min: 70 }
          ]
        }
      }
    },


    // =========================================================
    // SHOOTING
    // =========================================================

    {
      name: "Arc Cadence",
      category: "Shooting",
      heightRestriction: {
        maxInches: 83,
        display: "Max Height: 6'11\""
      },
      levels: {
        bronze: {
          allOf: [{ attribute: "threePointShot", min: 70 }]
        },
        silver: {
          allOf: [{ attribute: "threePointShot", min: 86 }]
        },
        gold: {
          allOf: [{ attribute: "threePointShot", min: 91 }]
        },
        hallOfFame: {
          allOf: [{ attribute: "threePointShot", min: 98 }]
        }
      }
    },

    {
      name: "Deadeye",
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
          allOf: [{ attribute: "threePointShot", min: 99 }]
        }
      }
    },

    {
      name: "Mini Marksman",
      category: "Shooting",
      heightRestriction: {
        maxInches: 76,
        display: "Max Height: 6'4\""
      },
      levels: {
        bronze: {
          anyOf: [
            { attribute: "midRangeShot", min: 60 },
            { attribute: "threePointShot", min: 60 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "midRangeShot", min: 79 },
            { attribute: "threePointShot", min: 79 }
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
            { attribute: "midRangeShot", min: 99 },
            { attribute: "threePointShot", min: 99 }
          ]
        }
      }
    },

    {
      name: "Post Fade Phenom",
      category: "Shooting",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [
            { attribute: "midRangeShot", min: 60 },
            { attribute: "postControl", min: 55 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "midRangeShot", min: 71 },
            { attribute: "postControl", min: 74 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "midRangeShot", min: 84 },
            { attribute: "postControl", min: 84 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "midRangeShot", min: 91 },
            { attribute: "postControl", min: 93 }
          ]
        }
      }
    },

    {
      name: "Quick Trigger",
      category: "Shooting",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "midRangeShot", min: 80 },
            { attribute: "threePointShot", min: 80 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "midRangeShot", min: 88 },
            { attribute: "threePointShot", min: 88 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "midRangeShot", min: 95 },
            { attribute: "threePointShot", min: 95 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "midRangeShot", min: 99 },
            { attribute: "threePointShot", min: 99 }
          ]
        }
      }
    },

    {
      name: "Set and Fire",
      category: "Shooting",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [{ attribute: "threePointShot", min: 60 }]
        },
        silver: {
          allOf: [{ attribute: "threePointShot", min: 78 }]
        },
        gold: {
          allOf: [{ attribute: "threePointShot", min: 89 }]
        },
        hallOfFame: {
          allOf: [{ attribute: "threePointShot", min: 97 }]
        }
      }
    },

    {
      name: "Smooth Operator",
      category: "Shooting",
      heightRestriction: {
        maxInches: 83,
        display: "Max Height: 6'11\""
      },
      levels: {
        bronze: {
          allOf: [{ attribute: "midRangeShot", min: 70 }]
        },
        silver: {
          allOf: [{ attribute: "midRangeShot", min: 87 }]
        },
        gold: {
          allOf: [{ attribute: "midRangeShot", min: 93 }]
        },
        hallOfFame: {
          allOf: [{ attribute: "midRangeShot", min: 99 }]
        }
      }
    },

    {
      name: "Static Middy",
      category: "Shooting",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [{ attribute: "midRangeShot", min: 55 }]
        },
        silver: {
          allOf: [{ attribute: "midRangeShot", min: 75 }]
        },
        gold: {
          allOf: [{ attribute: "midRangeShot", min: 85 }]
        },
        hallOfFame: {
          allOf: [{ attribute: "midRangeShot", min: 95 }]
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
        hallOfFame: { allOf: [{ attribute: "ballHandle", min: 96 }] }
      }
    },

    {
      name: "Bail Out",
      category: "Playmaking",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "passAccuracy", min: 85 }] },
        silver: { allOf: [{ attribute: "passAccuracy", min: 93 }] },
        gold: { allOf: [{ attribute: "passAccuracy", min: 96 }] },
        hallOfFame: { allOf: [{ attribute: "passAccuracy", min: 99 }] }
      }
    },

    {
      name: "Break Starter",
      category: "Playmaking",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "passAccuracy", min: 65 }] },
        silver: { allOf: [{ attribute: "passAccuracy", min: 77 }] },
        gold: { allOf: [{ attribute: "passAccuracy", min: 89 }] },
        hallOfFame: { allOf: [{ attribute: "passAccuracy", min: 97 }] }
      }
    },

    {
      name: "Dimer",
      category: "Playmaking",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "passAccuracy", min: 50 }] },
        silver: { allOf: [{ attribute: "passAccuracy", min: 70 }] },
        gold: { allOf: [{ attribute: "passAccuracy", min: 86 }] },
        hallOfFame: { allOf: [{ attribute: "passAccuracy", min: 95 }] }
      }
    },

    {
      name: "Handles for Days",
      category: "Playmaking",
      heightRestriction: {
        maxInches: 84,
        display: "Max Height: 7'0\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "ballHandle", min: 71 }] },
        silver: { allOf: [{ attribute: "ballHandle", min: 81 }] },
        gold: { allOf: [{ attribute: "ballHandle", min: 90 }] },
        hallOfFame: { allOf: [{ attribute: "ballHandle", min: 95 }] }
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
        hallOfFame: { allOf: [{ attribute: "speedWithBall", min: 91 }] }
      }
    },

    {
      name: "Pace",
      category: "Playmaking",
      heightRestriction: {
        maxInches: 82,
        display: "Max Height: 6'10\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "speedWithBall", min: 70 }] },
        silver: { allOf: [{ attribute: "speedWithBall", min: 80 }] },
        gold: { allOf: [{ attribute: "speedWithBall", min: 88 }] },
        hallOfFame: { allOf: [{ attribute: "speedWithBall", min: 93 }] }
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
            { attribute: "strength", min: 75 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "ballHandle", min: 67 },
            { attribute: "strength", min: 82 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "ballHandle", min: 73 },
            { attribute: "strength", min: 89 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "ballHandle", min: 78 },
            { attribute: "strength", min: 95 }
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
            { attribute: "postControl", min: 65 },
            { attribute: "ballHandle", min: 65 }
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
          allOf: [{ attribute: "ballHandle", min: 97 }]
        }
      }
    },

    {
      name: "Versatile Visionary",
      category: "Playmaking",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "passAccuracy", min: 65 }] },
        silver: { allOf: [{ attribute: "passAccuracy", min: 80 }] },
        gold: { allOf: [{ attribute: "passAccuracy", min: 90 }] },
        hallOfFame: { allOf: [{ attribute: "passAccuracy", min: 99 }] }
      }
    },


    // =========================================================
    // DEFENSE
    // =========================================================

    {
      name: "Ankle Braces",
      category: "Defense",
      heightRestriction: {
        maxInches: 81,
        display: "Max Height: 6'9\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "perimeterDefense", min: 60 },
            { attribute: "agility", min: 65 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "perimeterDefense", min: 86 },
            { attribute: "agility", min: 82 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "perimeterDefense", min: 93 },
            { attribute: "agility", min: 89 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "perimeterDefense", min: 95 },
            { attribute: "agility", min: 92 }
          ]
        }
      }
    },

    {
      name: "Challenger",
      category: "Defense",
      heightRestriction: {
        maxInches: 83,
        display: "Max Height: 6'11\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "perimeterDefense", min: 71 }] },
        silver: { allOf: [{ attribute: "perimeterDefense", min: 82 }] },
        gold: { allOf: [{ attribute: "perimeterDefense", min: 92 }] },
        hallOfFame: { allOf: [{ attribute: "perimeterDefense", min: 98 }] }
      }
    },

    {
      name: "Glove",
      category: "Defense",
      heightRestriction: {
        maxInches: 84,
        display: "Max Height: 7'0\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "steal", min: 70 }] },
        silver: { allOf: [{ attribute: "steal", min: 83 }] },
        gold: { allOf: [{ attribute: "steal", min: 93 }] },
        hallOfFame: { allOf: [{ attribute: "steal", min: 99 }] }
      }
    },

    {
      name: "High-Flying Denier",
      category: "Defense",
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
        }
      }
    },

    {
      name: "Immovable Enforcer",
      category: "Defense",
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
            { attribute: "perimeterDefense", min: 91 },
            { attribute: "strength", min: 92 }
          ]
        }
      }
    },

    {
      name: "Interceptor",
      category: "Defense",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "steal", min: 60 }] },
        silver: { allOf: [{ attribute: "steal", min: 77 }] },
        gold: { allOf: [{ attribute: "steal", min: 90 }] },
        hallOfFame: { allOf: [{ attribute: "steal", min: 97 }] }
      }
    },

    {
      name: "Off-Ball Pest",
      category: "Defense",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "interiorDefense", min: 60 },
            { attribute: "perimeterDefense", min: 55 }
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
            { attribute: "interiorDefense", min: 93 },
            { attribute: "perimeterDefense", min: 89 }
          ]
        }
      }
    },

    {
      name: "Paint Patroller",
      category: "Defense",
      heightRestriction: {
        minInches: 77,
        display: "Min Height: 6'5\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "interiorDefense", min: 60 },
            { attribute: "block", min: 70 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "interiorDefense", min: 71 },
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
            { attribute: "block", min: 99 }
          ]
        }
      }
    },

    {
      name: "Pick Dodger",
      category: "Defense",
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
            { attribute: "agility", min: 81 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "perimeterDefense", min: 90 },
            { attribute: "agility", min: 88 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "perimeterDefense", min: 97 },
            { attribute: "agility", min: 91 }
          ]
        }
      }
    },

    {
      name: "Post Lockdown",
      category: "Defense",
      heightRestriction: {
        minInches: 77,
        display: "Min Height: 6'5\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "interiorDefense", min: 65 },
            { attribute: "strength", min: 65 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "interiorDefense", min: 82 },
            { attribute: "strength", min: 74 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "interiorDefense", min: 88 },
            { attribute: "strength", min: 80 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "interiorDefense", min: 93 },
            { attribute: "strength", min: 88 }
          ]
        }
      }
    },

    {
      name: "Seatbelt",
      category: "Defense",
      heightRestriction: {
        maxInches: 81,
        display: "Max Height: 6'9\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "perimeterDefense", min: 75 },
            { attribute: "agility", min: 70 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "perimeterDefense", min: 85 },
            { attribute: "agility", min: 77 }
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
            { attribute: "perimeterDefense", min: 99 },
            { attribute: "agility", min: 86 }
          ]
        }
      }
    },

    {
      name: "Wall Up",
      category: "Defense",
      heightRestriction: {
        minInches: 77,
        display: "Min Height: 6'5\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "interiorDefense", min: 80 },
            { attribute: "strength", min: 75 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "interiorDefense", min: 85 },
            { attribute: "strength", min: 80 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "interiorDefense", min: 95 },
            { attribute: "strength", min: 90 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "interiorDefense", min: 99 },
            { attribute: "strength", min: 92 }
          ]
        }
      }
    },


    // =========================================================
    // REBOUNDING
    // =========================================================

    {
      name: "Boxout Boss",
      category: "Rebounding",
      heightRestriction: {
        minInches: 75,
        display: "Min Height: 6'3\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "defensiveRebound", min: 65 },
            { attribute: "strength", min: 60 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "defensiveRebound", min: 75 },
            { attribute: "strength", min: 76 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "defensiveRebound", min: 90 },
            { attribute: "strength", min: 88 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "defensiveRebound", min: 98 },
            { attribute: "strength", min: 94 }
          ]
        }
      }
    },

    {
      name: "Breaker",
      category: "Rebounding",
      heightRestriction: {
        minInches: 75,
        display: "Min Height: 6'3\""
      },
      levels: {
        bronze: {
          allOf: [
            { attribute: "offensiveRebound", min: 65 },
            { attribute: "strength", min: 70 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "offensiveRebound", min: 82 },
            { attribute: "strength", min: 79 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "offensiveRebound", min: 92 },
            { attribute: "strength", min: 90 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "offensiveRebound", min: 98 },
            { attribute: "strength", min: 96 }
          ]
        }
      }
    },

    {
      name: "Crasher",
      category: "Rebounding",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [
            { attribute: "offensiveRebound", min: 60 },
            { attribute: "vertical", min: 60 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "offensiveRebound", min: 80 },
            { attribute: "vertical", min: 65 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "offensiveRebound", min: 93 },
            { attribute: "vertical", min: 67 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "offensiveRebound", min: 99 },
            { attribute: "vertical", min: 70 }
          ]
        }
      }
    },

    {
      name: "Possession Closer",
      category: "Rebounding",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [
            { attribute: "defensiveRebound", min: 67 },
            { attribute: "vertical", min: 60 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "defensiveRebound", min: 87 },
            { attribute: "vertical", min: 65 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "defensiveRebound", min: 95 },
            { attribute: "vertical", min: 67 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "defensiveRebound", min: 99 },
            { attribute: "vertical", min: 70 }
          ]
        }
      }
    },

    {
      name: "Sync Snatcher",
      category: "Rebounding",
      heightRestriction: null,
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
            { attribute: "offensiveRebound", min: 82 },
            { attribute: "defensiveRebound", min: 82 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "offensiveRebound", min: 90 },
            { attribute: "defensiveRebound", min: 90 }
          ]
        }
      }
    },


    // =========================================================
    // GENERAL
    // =========================================================

    {
      name: "Brick Wall",
      category: "General",
      heightRestriction: {
        minInches: 77,
        display: "Min Height: 6'5\""
      },
      levels: {
        bronze: { allOf: [{ attribute: "strength", min: 75 }] },
        silver: { allOf: [{ attribute: "strength", min: 83 }] },
        gold: { allOf: [{ attribute: "strength", min: 95 }] },
        hallOfFame: { allOf: [{ attribute: "strength", min: 99 }] }
      }
    },

    {
      name: "Bruiser",
      category: "General",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "strength", min: 71 }] },
        silver: { allOf: [{ attribute: "strength", min: 84 }] },
        gold: { allOf: [{ attribute: "strength", min: 93 }] },
        hallOfFame: { allOf: [{ attribute: "strength", min: 99 }] }
      }
    },

    {
      name: "Flash",
      category: "General",
      heightRestriction: null,
      levels: {
        bronze: {
          allOf: [
            { attribute: "speed", min: 70 },
            { attribute: "agility", min: 60 }
          ]
        },
        silver: {
          allOf: [
            { attribute: "speed", min: 82 },
            { attribute: "agility", min: 78 }
          ]
        },
        gold: {
          allOf: [
            { attribute: "speed", min: 87 },
            { attribute: "agility", min: 81 }
          ]
        },
        hallOfFame: {
          allOf: [
            { attribute: "speed", min: 95 },
            { attribute: "agility", min: 91 }
          ]
        }
      }
    },

    {
      name: "Pogo Stick",
      category: "General",
      heightRestriction: null,
      levels: {
        bronze: { allOf: [{ attribute: "vertical", min: 63 }] },
        silver: { allOf: [{ attribute: "vertical", min: 70 }] },
        gold: { allOf: [{ attribute: "vertical", min: 80 }] },
        hallOfFame: { allOf: [{ attribute: "vertical", min: 90 }] }
      }
    },

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
            { attribute: "speed", min: 94 },
            { attribute: "agility", min: 90 }
          ]
        }
      }
    },

    {
      name: "Work Horse",
      category: "General",
      heightRestriction: null,
      levels: {
        bronze: {
          anyOf: [
            { attribute: "agility", min: 60 },
            { attribute: "strength", min: 60 }
          ]
        },
        silver: {
          anyOf: [
            { attribute: "agility", min: 75 },
            { attribute: "strength", min: 75 }
          ]
        },
        gold: {
          anyOf: [
            { attribute: "agility", min: 85 },
            { attribute: "strength", min: 85 }
          ]
        },
        hallOfFame: {
          anyOf: [
            { attribute: "agility", min: 95 },
            { attribute: "strength", min: 95 }
          ]
        }
      }
    }

  ]
};

// =========================================================
// BADGE DESCRIPTIONS
// =========================================================
//
// Concise badge descriptions based on published
// NBA 2K27 badge descriptions.
//
// Kept separate from qualification requirements so
// descriptive copy can be maintained independently.

const BADGE_DESCRIPTIONS_2K27 = {
  "Aerial Wizard": "Increases ability to finish an alley-oop dunk from a teammate, or an in-air putback dunk off an offensive rebound.",

  "Float Game": "Increases a player's ability to finish floaters.",

  "Ghost Stepper": "Increases the effectiveness of step-through layups or other close-range shots that come after a shot fake.",

  "Hook Specialist": "Improves ability to make post hooks.",

  "Layup Mixmaster": "Improves a player's ability to finish fancy or acrobatic layups.",

  "Paint Prodigy": "Improves a player's ability to quickly and effectively score while going to work in the paint.",

  "Physical Finisher": "Improves a player's ability to battle through contact and convert contact layups.",

  "Post Powerhouse": "Strengthens a player's ability at backing down defenders and moving them with drop steps.",

  "Post Spin Catalyst": "Attempting post spins or drives results in more effective moves and less of a chance to be stripped.",

  "Posterizer": "Increases the chances of throwing down a dunk on your defender while driving to the hoop.",

  "Rise Up": "Increases the likelihood of dunking on your opponent when standing in the painted area.",


  "Arc Cadence": "Improves a player's ability to knock down 3-point shots on the move, including pull-ups, hop-steps, or spin shots.",

  "Deadeye": "Jump shots taken with a defender closing out receive less of a penalty from a shot contest.",

  "Limitless Range": "Extends the range from which a player can shoot 3PT shots effectively from deep.",

  "Mini Marksman": "Shorter shooters are less bothered by lengthy defenders.",

  "Post Fade Phenom": "Improves ability to make post fades and hop shots.",

  "Quick Trigger": "Improves a player's ability to make no-dip jump shots.",

  "Set and Fire": "Applies a shooting boost to 3-point shots when the player's feet are completely set.",

  "Smooth Operator": "Improves a player's ability to knock down mid-range shots on the move, including pull-ups, hop-steps, or spin shots.",

  "Static Middy": "Applies a shooting boost to stand-still mid-range shots.",


  "Ankle Assassin": "Increases the ability to break down the defender and cross them up.",

  "Bail Out": "Passing out of a jump shot or layup yields fewer errant passes than normal. Additionally helps passing out of double teams.",

  "Break Starter": "After grabbing a defensive rebound, deep outlet passes made up the court are more accurate. Passes must be made quickly following the defensive rebound.",

  "Dimer": "Boosts the shot percentage for open teammates after catching a pass.",

  "Handles for Days": "Allows a player to take less of an energy hit when performing consecutive dribble moves.",

  "Lightning Launch": "Speeds up launches when attacking from the perimeter.",

  "Pace": "Raises the speed of the ball handler when sprinting.",

  "Strong Handle": "Reduces the likelihood of being bothered by defenders when dribbling.",

  "Unpluckable": "Defenders have a tougher time poking the ball free with their steal attempts.",

  "Versatile Visionary": "Improves a player's ability to thread and fire tight passes, including alley-oops, quickly and on time.",


  "Ankle Braces": "Lowers the likelihood of getting ankle-broken by opposing dribble moves.",

  "Challenger": "Improves the effectiveness of well-timed contests against perimeter shooters.",

  "Glove": "Increases the ability to successfully steal from ball handlers or strip layup attempts.",

  "High-Flying Denier": "Boosts the speed and leaping ability of a defensive player in anticipation of a chase-down block attempt.",

  "Immovable Enforcer": "Improves a defensive player's strength when defending ball handlers and finishers coming straight at them.",

  "Interceptor": "The frequency of successfully tipped or intercepted passes greatly increases.",

  "Off-Ball Pest": "Makes players more difficult to get past when playing off-ball, as they can grab and hold their matchup.",

  "Paint Patroller": "Increases a player's ability to block or contest shots at the rim.",

  "Pick Dodger": "Improves a player's ability to navigate through and around screens while on defense.",

  "Post Lockdown": "Strengthens a player's ability to effectively defend moves in the post, with an increased chance of stripping the opponent.",

  "Seatbelt": "Boost body-up defense effectiveness, making it easier to clamp opponents and disrupt their drive path.",

  "Wall Up": "Improves shot contest effectiveness during hands-up defense when guarding the paint.",


  "Boxout Boss": "Improves the effectiveness of boxouts as the boxer.",

  "Breaker": "Increases the success rate of breaking through opponent boxouts.",

  "Crasher": "Boost a player's ability to track down or grab rebounds on the offensive end.",

  "Possession Closer": "Boost a player's ability to grab rebounds on the defensive end.",

  "Sync Snatcher": "Gives an additional Vertical and Rebounding boost when perfectly timing the jump.",


  "Brick Wall": "Increases the effectiveness of screens.",

  "Bruiser": "Drains energy from opponents when making physical contact.",

  "Flash": "Speeds up movement without the ball while in transition on offense or defense.",

  "Pogo Stick": "Allows players to quickly go back up for another jump upon landing. This applies after a rebound, block attempt, or jump shot.",

  "Slippery Off-Ball": "When attempting to get open off screens, the player more effectively navigates through traffic.",

  "Work Horse": "Increases a player's speed and ability to get loose balls over the opponent."
};

// =========================================================
// APPLY BADGE DESCRIPTIONS
// =========================================================

window.BADGES_2K27.badges.forEach(
  function (badge) {

    badge.description =
      BADGE_DESCRIPTIONS_2K27[badge.name] || "";
  }
);
