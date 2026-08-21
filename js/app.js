/*
  THE PLAYER LAB
  File: js/app.js
  Version: 0.2.4
  Updated: 2026-08-21

  PURPOSE
  Handles Player Lab application logic.

  IMPORTANT
  - Badge requirements do not belong in this file.
  - Badge data is read from data/badges-2k26.js.
  - This file evaluates the data and displays results.
  - Future game versions should reuse this engine whenever possible.

  CHANGELOG
  0.2.4 - Cleaned duplicate attribute input initialization
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
      "Badge data could not be loaded. Check data/badges-2k26.js."
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
      calculateBadges
    );
  }

  if (randomizePlayerButton) {
  randomizePlayerButton.addEventListener(
    "click",
    randomizeTestPlayer
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
    secondaryPosition: getInputValue("secondaryPosition"),

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
  // PLAYER INFORMATION
  // ------------------------------------------

  const playerName =
    document.getElementById("playerName");

  if (playerName) {
    playerName.value = "Random Test Player";
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
        randomInteger(0, positions.length - 1)
      ];
  }


  // ------------------------------------------
  // HEIGHT
  // ------------------------------------------
  //
  // Temporary testing range only.
  // Not competition-level generation logic.

  const heightTotal =
    randomInteger(68, 88);

  const heightFeet =
    Math.floor(heightTotal / 12);

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

  setInputValue(
    "weight",
    randomInteger(160, 300)
  );


  // ------------------------------------------
  // WINGSPAN
  // ------------------------------------------

  const wingspanTotal =
    randomInteger(68, 96);

  const wingspanFeet =
    Math.floor(wingspanTotal / 12);

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
