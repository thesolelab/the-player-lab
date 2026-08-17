/*
  THE PLAYER LAB
  File: data/badges-2k26.js
  Version: 0.1.0
  Updated: 2026-08-16

  PURPOSE
  Stores verified NBA 2K26 badge requirements only.

  IMPORTANT
  - Do not place badge calculation logic in this file.
  - Do not invent or estimate badge requirements.
  - Future NBA 2K versions should use separate files such as:
      data/badges-2k27.js
      data/badges-2k28.js

  CHANGELOG
  0.1.0 - Created NBA 2K26 badge data structure
        - Added support for badge categories
        - Added Bronze through Legend levels
        - Added single-attribute requirements
        - Added AND requirements
        - Added OR requirements
        - Added height restrictions
*/


const PLAYER_LAB_BADGE_DATA_2K26 = {
  gameVersion: "NBA 2K26",

  badges: [

    /*
      BADGE RECORD FORMAT

      Each badge should follow this structure:

      {
        name: "Badge Name",
        category: "Finishing",

        levels: {
          bronze: {
            requirements: {
              all: [],
              any: []
            },
            height: null
          },

          silver: {
            requirements: {
              all: [],
              any: []
            },
            height: null
          },

          gold: {
            requirements: {
              all: [],
              any: []
            },
            height: null
          },

          hallOfFame: {
            requirements: {
              all: [],
              any: []
            },
            height: null
          },

          legend: {
            requirements: {
              all: [],
              any: []
            },
            height: null
          }
        }
      }

      --------------------------------------------------

      SINGLE ATTRIBUTE EXAMPLE

      requirements: {
        all: [
          {
            attribute: "drivingDunk",
            min: 75
          }
        ],
        any: []
      }

      Meaning:
      Driving Dunk must be at least 75.

      --------------------------------------------------

      AND REQUIREMENT EXAMPLE

      requirements: {
        all: [
          {
            attribute: "drivingDunk",
            min: 85
          },
          {
            attribute: "vertical",
            min: 70
          }
        ],
        any: []
      }

      Meaning:
      Driving Dunk >= 85
      AND
      Vertical >= 70

      --------------------------------------------------

      OR REQUIREMENT EXAMPLE

      requirements: {
        all: [],
        any: [
          {
            attribute: "midRangeShot",
            min: 80
          },
          {
            attribute: "threePointShot",
            min: 80
          }
        ]
      }

      Meaning:
      Mid-Range Shot >= 80
      OR
      Three-Point Shot >= 80

      --------------------------------------------------

      AND + OR EXAMPLE

      requirements: {
        all: [
          {
            attribute: "ballHandle",
            min: 80
          }
        ],

        any: [
          {
            attribute: "speedWithBall",
            min: 75
          },
          {
            attribute: "speed",
            min: 80
          }
        ]
      }

      Meaning:
      Ball Handle >= 80
      AND
      either:
        Speed With Ball >= 75
        OR
        Speed >= 80

      --------------------------------------------------

      HEIGHT RESTRICTION FORMAT

      height: {
        minInches: 72,
        maxInches: 80
      }

      Either value can be null.

      Examples:

      Maximum height only:

      height: {
        minInches: null,
        maxInches: 78
      }

      Minimum height only:

      height: {
        minInches: 80,
        maxInches: null
      }

      No height restriction:

      height: null

      --------------------------------------------------

      IMPORTANT

      The numbers in these examples are formatting
      examples only.

      They are NOT verified NBA 2K26 badge requirements
      and should NOT be copied into actual badge records.
    */

  ]
};


// Make the active dataset available to js/app.js.
//
// app.js will eventually read PLAYER_LAB_BADGE_DATA
// rather than hard-coding NBA 2K26-specific requirements.

const PLAYER_LAB_BADGE_DATA = PLAYER_LAB_BADGE_DATA_2K26;
