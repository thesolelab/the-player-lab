/*
  THE PLAYER LAB
  File: js/app.js
  Version: 0.2.6
  Updated: 2026-08-21

  PURPOSE
  Handles Player Lab application logic.

  IMPORTANT
  - Badge requirements do not belong in this file.
  - Badge data is read from data/badges-2k27.js.
  - This file evaluates the data and displays results.
  - Future game versions should reuse this engine whenever possible.

  CHANGELOG
 0.2.6  - Added League Type analytics and improved player entry
        - Added Umami event properties to Calculate Badges and Randomize Player
        - Tracks selected League Type using existing nba, ncaa, and high-school values
        - Prevented duplicate analytics events
        - Added automatic field-to-field advancement for manual player entry
        - Added strict 0-11 validation for height and wingspan inches
        - Enforced a minimum player height of 5'7"
        - Removed Secondary Position from player data handling
        - Preserved badge calculations, randomizer behavior, and attribute validation 
  0.2.5 - Improved manual player-entry workflow
        - Removed Secondary Position from player data handling
        - Added automatic field-to-field input advancement
          - Added strict 0–11 validation for height and wingspan inches
        - Added 5'7" minimum player-height enforcement
        - Preserved 10 and 11 inch entry with delayed single-digit advance
        - Preserved attribute input validation and badge calculation behavior
  0.2.4 - Activated NBA 2K27 badge calculations
        - Updated the live badge engine to use window.BADGES_2K27
        - Preserved historical NBA 2K26 badge data separately
        - Cleaned duplicate attribute input initialization
        - Removed duplicate initializeAttributeInputs function
        - Consolidated attribute input setup into a single implementation
        - Preserved Randomize Player functionality
        - Preserved badge calculation functionality
        - Preserved default-value clearing and 25–99 validation
  0.2.3 - Fixed attribute input initialization
        - Corrected misplaced attribute input initialization code
        - Restored Randomize Player button functionality
        - Kept default-value clearing behavior for attribute fields
        - Preserved 25–99 attribute validation and empty-field fallback
  0.2.2 - Improved attribute input usability
        - Added mobile-friendly attribute input behavior
        - Clears the default value of 25 when an attribute field is selected
        - Restores 25 when an attribute field is left empty
        - Enforces the valid 25–99 attribute range
  0.2.1 - Updated player measurement handling
        - Reads Height from separate feet and inches fields
        - Reads Wingspan from separate feet and inches fields
        - Removed ambiguous single-field height parsing
        - Converts measurements directly to total inches
  0.2.0 - Added initial NBA 2K26 badge qualification engine
        - Reads window.BADGES_2K26
        - Collects player attributes from the UI
        - Converts player height to inches
        - Supports allOf requirements
        - Supports anyOf requirements
        - Supports height restrictions
        - Returns highest qualified badge level
        - Displays qualified badges by category
        - Added reset functionality
*/


// ======================================================
// ACTIVE GAME DATA
// ======================================================
//
// The Player Lab uses the latest supported NBA 2K
// ruleset for live calculations.
//
// Historical badge datasets remain stored separately
// in the repository for reference.

const ACTIVE_BADGE_DATA = window.BADGES_2K27;


// ======================================================
// BADGE LEVEL ORDER
// ======================================================
//
// Highest to lowest.
// The first level the player qualifies for is returned.

const BADGE_LEVELS = [
  {
    key: "legend",
    label: "Legend",
    cssClass: "legend"
  },
  {
    key: "hallOfFame",
    label: "Hall of Fame",
    cssClass: "hall-of-fame"
  },
  {
    key: "gold",
    label: "Gold",
    cssClass: "gold"
  },
  {
    key: "silver",
    label: "Silver",
    cssClass: "silver"
  },
  {
    key: "bronze",
    label: "Bronze",
    cssClass: "bronze"
  }
];


// ======================================================
// PAGE ELEMENTS
// ======================================================

const calculateBadgesButton =
  document.getElementById("calculateBadgesButton");

const randomizePlayerButton =
  document.getElementById("randomizePlayerButton");

const resetPlayerButton =
  document.getElementById("resetPlayerButton");

const badgeResults =
  document.getElementById("badgeResults");

const gameVersionDisplay =
  document.getElementById("gameVersion");


// ======================================================
// UMAMI EVENT TRACKING
// ======================================================
//
// Tracks meaningful Player Lab actions with the
// currently selected Competition Level.
//
// Uses the existing Competition Level values:
// - high-school
// - ncaa
// - nba
//
// Tracking failures never block Player Lab functionality.

function trackPlayerLabEvent(eventName) {

  if (
    !window.umami ||
    typeof window.umami.track !== "function"
  ) {
    return;
  }

  const competition =
    getInputValue("competitionLevel");

  window.umami.track(
    eventName,
    {
      competition: competition
    }
  );
}


// ======================================================
// INITIALIZE PLAYER LAB
// ======================================================

function initializePlayerLab() {

  if (
    !ACTIVE_BADGE_DATA ||
    !Array.isArray(ACTIVE_BADGE_DATA.badges)
  ) {
    console.error(
      "The Player Lab badge dataset could not be loaded."
    );

    showError(
      "Badge data could not be loaded. Check data/badges-2k27.js."
    );

    return;
  }

  if (
    gameVersionDisplay &&
    ACTIVE_BADGE_DATA.gameVersion
  ) {
    gameVersionDisplay.textContent =
      ACTIVE_BADGE_DATA.gameVersion;
  }

  if (calculateBadgesButton) {
    calculateBadgesButton.addEventListener(
      "click",
      function () {

        trackPlayerLabEvent(
          "calculate-badges"
        );

        calculateBadges();
      }
    );
  }

  if (randomizePlayerButton) {
    randomizePlayerButton.addEventListener(
      "click",
      function () {

        trackPlayerLabEvent(
          "randomize-player"
        );

        randomizeTestPlayer();
      }
    );
  }

  if (resetPlayerButton) {
    resetPlayerButton.addEventListener(
      "click",
      resetPlayer
    );
  }
}


// ======================================================
// COLLECT PLAYER DATA
// ======================================================

function getPlayerData() {

  const heightFeet =
    getNumberValue("heightFeet");

  const heightInches =
    getNumberValue("heightInches");

  const wingspanFeet =
    getNumberValue("wingspanFeet");

  const wingspanInches =
    getNumberValue("wingspanInches");


  const player = {
    name: getInputValue("playerName"),
    competitionLevel: getInputValue("competitionLevel"),
    position: getInputValue("position"),

    heightFeet: heightFeet,
    heightInches: heightInches,

    heightTotalInches:
      convertFeetAndInchesToTotal(
        heightFeet,
        heightInches
      ),

    wingspanFeet: wingspanFeet,
    wingspanInches: wingspanInches,

    wingspanTotalInches:
      convertFeetAndInchesToTotal(
        wingspanFeet,
        wingspanInches
      ),

    weight: getNumberValue("weight"),

    attributes: {}
  };


  const attributeInputs =
    document.querySelectorAll("[data-attribute]");


  attributeInputs.forEach(function (input) {

    const attributeName =
      input.dataset.attribute;

    const attributeValue =
      Number(input.value);

    player.attributes[attributeName] =
      Number.isFinite(attributeValue)
        ? attributeValue
        : 0;
  });


  return player;
}


// ======================================================
// INPUT HELPERS
// ======================================================

function getInputValue(id) {

  const element =
    document.getElementById(id);

  if (!element) {
    return "";
  }

  return String(element.value).trim();
}


function getNumberValue(id) {

  const value =
    Number(getInputValue(id));

  return Number.isFinite(value)
    ? value
    : null;
}


// ======================================================
// MEASUREMENT CONVERSION
// ======================================================
//
// Converts separate feet and inches fields
// into total inches.
//
// Example:
// 6 ft 4 in = 76 inches

function convertFeetAndInchesToTotal(
  feet,
  inches
) {

  if (
    feet === null ||
    inches === null
  ) {
    return null;
  }

  if (
    !Number.isFinite(feet) ||
    !Number.isFinite(inches)
  ) {
    return null;
  }

  return (feet * 12) + inches;
}


// ======================================================
// CALCULATE BADGES
// ======================================================

function calculateBadges() {

  if (
    !ACTIVE_BADGE_DATA ||
    !Array.isArray(ACTIVE_BADGE_DATA.badges)
  ) {
    showError(
      "The active badge dataset is unavailable."
    );

    return;
  }

  const player =
    getPlayerData();

  const qualifiedBadges = [];

  ACTIVE_BADGE_DATA.badges.forEach(
    function (badge) {

      const highestLevel =
        getHighestQualifiedBadgeLevel(
          player,
          badge
        );

      if (highestLevel) {

        qualifiedBadges.push({
          name: badge.name,
          category: badge.category,
          level: highestLevel.label,
          levelKey: highestLevel.key,
          cssClass: highestLevel.cssClass
        });
      }
    }
  );

  displayBadgeResults(
    player,
    qualifiedBadges
  );
}


// ======================================================
// FIND HIGHEST QUALIFIED LEVEL
// ======================================================

function getHighestQualifiedBadgeLevel(
  player,
  badge
) {

  if (
    !badge ||
    !badge.levels
  ) {
    return null;
  }

  if (
    !meetsHeightRestriction(
      player,
      badge.heightRestriction
    )
  ) {
    return null;
  }

  for (
    let i = 0;
    i < BADGE_LEVELS.length;
    i++
  ) {

    const level =
      BADGE_LEVELS[i];

    const levelRequirements =
      badge.levels[level.key];

    if (!levelRequirements) {
      continue;
    }

    if (
      playerQualifiesForLevel(
        player,
        levelRequirements
      )
    ) {
      return level;
    }
  }

  return null;
}


// ======================================================
// CHECK LEVEL REQUIREMENTS
// ======================================================

function playerQualifiesForLevel(
  player,
  levelRequirements
) {

  if (!levelRequirements) {
    return false;
  }

  const allOf =
    Array.isArray(levelRequirements.allOf)
      ? levelRequirements.allOf
      : [];

  const anyOf =
    Array.isArray(levelRequirements.anyOf)
      ? levelRequirements.anyOf
      : [];


  // ------------------------------------------
  // ALL OF
  // Every requirement must pass.
  // ------------------------------------------

  if (allOf.length > 0) {

    const meetsAll =
      allOf.every(
        function (requirement) {

          return meetsAttributeRequirement(
            player,
            requirement
          );
        }
      );

    if (!meetsAll) {
      return false;
    }
  }


  // ------------------------------------------
  // ANY OF
  // At least one requirement must pass.
  // ------------------------------------------

  if (anyOf.length > 0) {

    const meetsAny =
      anyOf.some(
        function (requirement) {

          return meetsAttributeRequirement(
            player,
            requirement
          );
        }
      );

    if (!meetsAny) {
      return false;
    }
  }


  // A level should contain at least one
  // verified requirement.

  if (
    allOf.length === 0 &&
    anyOf.length === 0
  ) {
    return false;
  }

  return true;
}


// ======================================================
// CHECK ATTRIBUTE REQUIREMENT
// ======================================================

function meetsAttributeRequirement(
  player,
  requirement
) {

  if (
    !requirement ||
    !requirement.attribute
  ) {
    return false;
  }

  const playerValue =
    Number(
      player.attributes[
        requirement.attribute
      ]
    );

  if (!Number.isFinite(playerValue)) {
    return false;
  }

  if (
    requirement.min !== undefined &&
    requirement.min !== null
  ) {

    if (
      playerValue <
      Number(requirement.min)
    ) {
      return false;
    }
  }

  if (
    requirement.max !== undefined &&
    requirement.max !== null
  ) {

    if (
      playerValue >
      Number(requirement.max)
    ) {
      return false;
    }
  }

  return true;
}


// ======================================================
// CHECK HEIGHT RESTRICTION
// ======================================================

function meetsHeightRestriction(
  player,
  heightRestriction
) {

  if (!heightRestriction) {
    return true;
  }

  if (
    player.heightTotalInches === null ||
    !Number.isFinite(player.heightTotalInches)
  ) {
    return false;
  }

  if (
    heightRestriction.minInches !== undefined &&
    heightRestriction.minInches !== null
  ) {

    if (
      player.heightTotalInches <
      Number(heightRestriction.minInches)
    ) {
      return false;
    }
  }

  if (
    heightRestriction.maxInches !== undefined &&
    heightRestriction.maxInches !== null
  ) {

    if (
      player.heightTotalInches >
      Number(heightRestriction.maxInches)
    ) {
      return false;
    }
  }

  return true;
}


// ======================================================
// DISPLAY RESULTS
// ======================================================

function displayBadgeResults(
  player,
  qualifiedBadges
) {

  if (!badgeResults) {
    return;
  }

  badgeResults.innerHTML = "";

  if (qualifiedBadges.length === 0) {

    badgeResults.innerHTML = `
      <div class="empty-results">
        <p>No qualified badges were found for these attributes.</p>
      </div>
    `;

    return;
  }


  // ------------------------------------------
  // SUMMARY
  // ------------------------------------------

  const summary =
    document.createElement("div");

  summary.className =
    "results-summary";

  const playerName =
    player.name || "Player";

  summary.innerHTML = `
    <p>
      <strong>${escapeHTML(playerName)}</strong>
      qualified for
      <strong>${qualifiedBadges.length}</strong>
      badge${qualifiedBadges.length === 1 ? "" : "s"}.
    </p>
  `;

  badgeResults.appendChild(summary);


  // ------------------------------------------
  // GROUP BY CATEGORY
  // ------------------------------------------

  const badgesByCategory = {};

  qualifiedBadges.forEach(
    function (badge) {

      const category =
        badge.category || "Other";

      if (!badgesByCategory[category]) {
        badgesByCategory[category] = [];
      }

      badgesByCategory[category].push(
        badge
      );
    }
  );


  Object.keys(badgesByCategory)
    .forEach(
      function (category) {

        const categorySection =
          document.createElement("div");

        categorySection.className =
          "badge-category-results";


        const heading =
          document.createElement("h3");

        heading.textContent =
          category;

        categorySection.appendChild(
          heading
        );


        const badgeGrid =
          document.createElement("div");

        badgeGrid.className =
          "badge-results-grid";


        badgesByCategory[category]
          .forEach(
            function (badge) {

              badgeGrid.appendChild(
                createBadgeResultCard(
                  badge
                )
              );
            }
          );


        categorySection.appendChild(
          badgeGrid
        );

        badgeResults.appendChild(
          categorySection
        );
      }
    );
}


// ======================================================
// CREATE BADGE CARD
// ======================================================

function createBadgeResultCard(badge) {

  const card =
    document.createElement("div");

  card.className =
    "badge-result-card";


  const name =
    document.createElement("div");

  name.className =
    "badge-result-name";

  name.textContent =
    badge.name;


  const level =
    document.createElement("span");

  level.className =
    "badge-level " +
    badge.cssClass;

  level.textContent =
    badge.level;


  card.appendChild(name);
  card.appendChild(level);

  return card;
}

// ======================================================
// TEST PLAYER RANDOMIZER
// ======================================================
//
// TEMPORARY MVP TESTING TOOL
//
// This function exists to quickly generate players
// for badge-engine testing.
//
// It is NOT the final Player Lab randomizer.
//
// Future HS / NCAA / NBA randomization logic should
// replace or extend this function without changing
// the badge qualification engine.

function randomizeTestPlayer() {

  // ------------------------------------------
  // COMPETITION PROFILE
  // ------------------------------------------

  const competitionLevel =
    getInputValue("competitionLevel");

  const profiles =
    window.PLAYER_LAB_RANDOMIZER_PROFILES;

  const profile =
    profiles
      ? profiles[competitionLevel]
      : null;


  if (!profile) {

    console.error(
      "Randomizer profile could not be found for:",
      competitionLevel
    );

    showError(
      "The selected competition randomizer profile could not be loaded."
    );

    return;
  }


  // ------------------------------------------
  // PLAYER INFORMATION
  // ------------------------------------------

  const playerName =
    document.getElementById("playerName");

  if (playerName) {
    playerName.value =
      "Random Test Player";
  }


  // Random position

  const position =
    document.getElementById("position");

  const positions = [
    "PG",
    "SG",
    "SF",
    "PF",
    "C"
  ];

  if (position) {

    position.value =
      positions[
        randomInteger(
          0,
          positions.length - 1
        )
      ];
  }


  // ------------------------------------------
  // HEIGHT
  // ------------------------------------------
  //
  // Temporary testing range unless a
  // competition profile provides its own
  // verified Player Lab generation range.

  const physicals =
    profile.physicals || {};


  const heightMin =
    Number.isFinite(
      physicals.heightMin
    )
      ? physicals.heightMin
      : 68;


  const heightMax =
    Number.isFinite(
      physicals.heightMax
    )
      ? physicals.heightMax
      : 88;


  const heightTotal =
    randomInteger(
      heightMin,
      heightMax
    );


  const heightFeet =
    Math.floor(
      heightTotal / 12
    );

  const heightInches =
    heightTotal % 12;


  setInputValue(
    "heightFeet",
    heightFeet
  );

  setInputValue(
    "heightInches",
    heightInches
  );


  // ------------------------------------------
  // WEIGHT
  // ------------------------------------------

  const weightMin =
    Number.isFinite(
      physicals.weightMin
    )
      ? physicals.weightMin
      : 160;


  const weightMax =
    Number.isFinite(
      physicals.weightMax
    )
      ? physicals.weightMax
      : 300;


  setInputValue(
    "weight",
    randomInteger(
      weightMin,
      weightMax
    )
  );


  // ------------------------------------------
  // WINGSPAN
  // ------------------------------------------
  //
  // Wingspan is generated relative to height
  // instead of independently.
  //
  // Player Lab default:
  // minimum = height - 1 inch
  // maximum = height + 6 inches

  const wingspanDifferenceMin =
    Number.isFinite(
      physicals.wingspanDifferenceMin
    )
      ? physicals.wingspanDifferenceMin
      : -1;


  const wingspanDifferenceMax =
    Number.isFinite(
      physicals.wingspanDifferenceMax
    )
      ? physicals.wingspanDifferenceMax
      : 6;


  const wingspanDifference =
    randomInteger(
      wingspanDifferenceMin,
      wingspanDifferenceMax
    );


  const wingspanTotal =
    heightTotal +
    wingspanDifference;


  const wingspanFeet =
    Math.floor(
      wingspanTotal / 12
    );

  const wingspanInches =
    wingspanTotal % 12;


  setInputValue(
    "wingspanFeet",
    wingspanFeet
  );

  setInputValue(
    "wingspanInches",
    wingspanInches
  );


  // ------------------------------------------
  // ATTRIBUTES
  // ------------------------------------------
  //
  // Attribute generation is based on the
  // selected Player Lab competition profile.
  //
  // These ranges are Player Lab generation
  // guidance only and are not official 2K limits.

  const attributeInputs =
    document.querySelectorAll(
      "[data-attribute]"
    );


  attributeInputs.forEach(
    function (input) {

      input.value =
        randomizeAttributeFromProfile(
          profile
        );
    }
  );


  // ------------------------------------------
  // CLEAR OLD RESULTS
  // ------------------------------------------

  if (badgeResults) {

    badgeResults.innerHTML = `
      <div class="empty-results">
        <p>
          Random player generated. Click Calculate Badges to analyze the player.
        </p>
      </div>
    `;
  }
}

// ======================================================
// RANDOMIZER HELPERS
// ======================================================
function randomizeAttributeFromProfile(
  profile
) {

  const eliteRoll =
    Math.random();

  if (
    eliteRoll <
    profile.eliteChance
  ) {

    return randomInteger(
      profile.eliteMin,
      profile.eliteMax
    );
  }


  return randomInteger(
    profile.normalMin,
    profile.normalMax
  );
}

function randomInteger(min, max) {

  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}


function setInputValue(id, value) {

  const element =
    document.getElementById(id);

  if (element) {
    element.value = value;
  }
}

// ======================================================
// ATTRIBUTE INPUT QUALITY OF LIFE
// ======================================================
//
// Improves attribute entry on desktop and mobile.
//
// - Clears the default value of 25 when focused
// - Restores 25 if the field is left empty
// - Keeps attribute values between 25 and 99

function initializeAttributeInputs() {

  const attributeInputs =
    document.querySelectorAll(
      "[data-attribute]"
    );

  attributeInputs.forEach(
    function (input) {

      input.addEventListener(
        "focus",
        function () {

          if (input.value === "25") {
            input.value = "";
          }
        }
      );


      input.addEventListener(
        "blur",
        function () {

          let value =
            Number(input.value);

          if (
            input.value === "" ||
            !Number.isFinite(value)
          ) {
            input.value = 25;
            return;
          }

          if (value < 25) {
            input.value = 25;
            return;
          }

          if (value > 99) {
            input.value = 99;
          }
        }
      );
    }
  );
}

// ======================================================
// PLAYER INPUT AUTO-ADVANCE
// ======================================================
//
// Moves focus through manual player entry.
//
// Flow:
// Position
// -> Height Feet
// -> Height Inches
// -> Weight
// -> Wingspan Feet
// -> Wingspan Inches
// -> Attributes in page order
//
// Measurement behavior:
// - Feet advances after 1 digit.
// - Height and wingspan inches are limited to 0-11.
// - Minimum player height is 5'7".
// - Single-digit inches wait briefly so 10 or 11 can be entered.
// - Weight advances after 3 digits.
// - Attributes advance after 2 digits.

function initializeAutoAdvance() {

  const position =
    document.getElementById("position");

  const heightFeet =
    document.getElementById("heightFeet");

  const heightInches =
    document.getElementById("heightInches");

  const weight =
    document.getElementById("weight");

  const wingspanFeet =
    document.getElementById("wingspanFeet");

  const wingspanInches =
    document.getElementById("wingspanInches");

  const attributeInputs =
    Array.from(
      document.querySelectorAll(
        "[data-attribute]"
      )
    );


  function focusElement(element) {

    if (!element) {
      return;
    }

    element.focus();
  }


  // ------------------------------------------
  // POSITION
  // ------------------------------------------

  if (position) {

    position.addEventListener(
      "change",
      function () {

        if (position.value) {
          focusElement(heightFeet);
        }
      }
    );
  }


  // ------------------------------------------
  // FEET FIELDS
  // ------------------------------------------

  function addFeetAdvance(
    input,
    nextElement
  ) {

    if (!input || !nextElement) {
      return;
    }

    input.addEventListener(
      "input",
      function () {

        if (
          String(input.value).length >= 1
        ) {
          focusElement(nextElement);
        }
      }
    );
  }


  addFeetAdvance(
    heightFeet,
    heightInches
  );

  addFeetAdvance(
    wingspanFeet,
    wingspanInches
  );


  // ------------------------------------------
  // INCHES FIELDS
  // ------------------------------------------
  //
  // Valid range: 0-11.
  //
  // Invalid values such as 12, 31, or 61
  // are rejected and the last valid value
  // is restored.
  //
  // A short delay on single-digit values
  // allows 10 or 11 to be entered normally.

  function initializeInchesField(
    input,
    nextElement,
    options = {}
  ) {

    if (!input || !nextElement) {
      return;
    }

    let advanceTimer = null;
    let lastValidValue = "";


    input.addEventListener(
      "focus",
      function () {

        const currentValue =
          String(input.value);

        const currentNumber =
          Number(currentValue);

        if (
          currentValue !== "" &&
          Number.isFinite(currentNumber) &&
          currentNumber >= 0 &&
          currentNumber <= 11
        ) {
          lastValidValue = currentValue;
        } else {
          lastValidValue = "";
        }
      }
    );


    input.addEventListener(
      "input",
      function () {

        clearTimeout(advanceTimer);

        const value =
          String(input.value);

        const number =
          Number(value);


        if (value === "") {
          lastValidValue = "";
          return;
        }


        // Reject anything outside 0-11.
        // Restore the last valid value instead
        // of converting an invalid entry to 11.

        if (
          !Number.isFinite(number) ||
          number < 0 ||
          number > 11
        ) {

          input.value =
            lastValidValue;

          return;
        }


        lastValidValue =
          value;


        // 10 and 11 are complete immediately.

        if (
          value === "10" ||
          value === "11"
        ) {

          focusElement(nextElement);

          return;
        }


        // Valid single-digit values wait briefly
        // so the user can still type 10 or 11.

        if (
          value.length === 1 &&
          number >= 0 &&
          number <= 9
        ) {

          advanceTimer =
            setTimeout(
              function () {

                if (
                  document.activeElement === input
                ) {
                  focusElement(nextElement);
                }

              },
              400
            );
        }
      }
    );


    input.addEventListener(
      "blur",
      function () {

        if (input.value === "") {
          return;
        }

        let number =
          Number(input.value);


        if (!Number.isFinite(number)) {
          input.value = "";
          return;
        }


        if (number < 0) {
          number = 0;
        }

        if (number > 11) {
          number = 11;
        }


        // Overall minimum player height = 5'7".

        if (
          options.enforceMinimumHeight &&
          Number(heightFeet.value) === 5 &&
          number < 7
        ) {
          number = 7;
        }


        input.value =
          number;
      }
    );
  }


  initializeInchesField(
    heightInches,
    weight,
    {
      enforceMinimumHeight: true
    }
  );


  // ------------------------------------------
  // WEIGHT
  // ------------------------------------------

  if (weight && wingspanFeet) {

    weight.addEventListener(
      "input",
      function () {

        if (
          String(weight.value).length >= 3
        ) {
          focusElement(wingspanFeet);
        }
      }
    );
  }


  // ------------------------------------------
  // WINGSPAN INCHES -> FIRST ATTRIBUTE
  // ------------------------------------------

  if (
    wingspanInches &&
    attributeInputs.length > 0
  ) {

    initializeInchesField(
      wingspanInches,
      attributeInputs[0]
    );
  }


  // ------------------------------------------
  // ATTRIBUTES
  // ------------------------------------------

  attributeInputs.forEach(
    function (input, index) {

      const nextInput =
        attributeInputs[index + 1];

      if (!nextInput) {
        return;
      }


      input.addEventListener(
        "input",
        function () {

          if (
            String(input.value).length >= 2
          ) {
            focusElement(nextInput);
          }
        }
      );
    }
  );
}
// ======================================================
// RESET PLAYER
// ======================================================

function resetPlayer() {

  const playerInfoInputs =
    document.querySelectorAll(
      "#playerInfoSection input, #playerInfoSection select"
    );

  playerInfoInputs.forEach(
    function (input) {

      if (input.tagName === "SELECT") {
        input.selectedIndex = 0;
      } else {
        input.value = "";
      }
    }
  );


  const attributeInputs =
    document.querySelectorAll(
      "[data-attribute]"
    );

  attributeInputs.forEach(
    function (input) {

      input.value = 25;
    }
  );


  if (badgeResults) {

    badgeResults.innerHTML = `
      <div class="empty-results">
        <p>No badge calculations have been run yet.</p>
      </div>
    `;
  }
}


// ======================================================
// ERROR DISPLAY
// ======================================================

function showError(message) {

  if (!badgeResults) {
    return;
  }

  badgeResults.innerHTML = `
    <div class="empty-results">
      <p>${escapeHTML(message)}</p>
    </div>
  `;
}


// ======================================================
// HTML SAFETY
// ======================================================

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ======================================================
// START APPLICATION
// ======================================================

initializePlayerLab();
initializeAttributeInputs();
initializeAutoAdvance();
