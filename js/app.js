/*
  THE PLAYER LAB
  File: js/app.js

  PURPOSE
  Handles Player Lab application logic.

  IMPORTANT
  - Badge requirements do not belong in this file.
  - Badge data is read from data/badges-2k27.js.
  - This file evaluates the data and displays results.
  - Future game versions should reuse this engine whenever possible.
*/

// ======================================================
// ACTIVE GAME DATA
// ======================================================

const ACTIVE_BADGE_DATA = window.BADGES_2K27;

// ======================================================
// BADGE LEVEL ORDER
// ======================================================
// NBA 2K27 attribute qualification stops at HOF.
// Legend is not attribute-qualified here.

const BADGE_LEVELS = [
  { key: "hallOfFame", label: "Hall of Fame", cssClass: "hall-of-fame" },
  { key: "gold", label: "Gold", cssClass: "gold" },
  { key: "silver", label: "Silver", cssClass: "silver" },
  { key: "bronze", label: "Bronze", cssClass: "bronze" }
];

// ======================================================
// PAGE ELEMENTS
// ======================================================

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

function trackPlayerLabEvent(eventName) {
  if (
    !window.umami ||
    typeof window.umami.track !== "function"
  ) {
    return;
  }

  const competition =
    getInputValue("competitionLevel");

  window.umami.track(eventName, {
    competition: competition
  });
}

// ======================================================
// LIVE BADGE ANALYSIS
// ======================================================

let liveBadgeTimer = null;

function scheduleLiveBadgeCalculation() {
  clearTimeout(liveBadgeTimer);

  liveBadgeTimer = setTimeout(
    function () {
      if (hasMeaningfulPlayerInput()) {
        calculateBadges();
      } else {
        showLiveBadgeIdleState();
      }
    },
    120
  );
}

function hasMeaningfulPlayerInput() {
  const attributeInputs =
    document.querySelectorAll("[data-attribute]");

  const hasChangedAttribute =
    Array.from(attributeInputs).some(
      function (input) {
        const value = Number(input.value);

        return (
          Number.isFinite(value) &&
          value !== 25
        );
      }
    );

  if (hasChangedAttribute) {
    return true;
  }

  const liveFields = [
    "position",
    "heightFeet",
    "heightInches",
    "weight",
    "wingspanFeet",
    "wingspanInches"
  ];

  return liveFields.some(
    function (id) {
      return getInputValue(id) !== "";
    }
  );
}

function showLiveBadgeIdleState() {
  if (!badgeResults) {
    return;
  }

  badgeResults.innerHTML = `
    <div class="empty-results">
      <p>Adjust the player attributes to see qualified badges.</p>
    </div>
  `;
}

function initializeLiveBadgeAnalysis() {
  const liveFieldIds = [
    "position",
    "heightFeet",
    "heightInches",
    "weight",
    "wingspanFeet",
    "wingspanInches"
  ];

  liveFieldIds.forEach(
    function (id) {
      const element =
        document.getElementById(id);

      if (!element) {
        return;
      }

      element.addEventListener(
        "input",
        scheduleLiveBadgeCalculation
      );

      element.addEventListener(
        "change",
        scheduleLiveBadgeCalculation
      );
    }
  );

  showLiveBadgeIdleState();
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

  attributeInputs.forEach(
    function (input) {
      const attributeName =
        input.dataset.attribute;

      const attributeValue =
        Number(input.value);

      player.attributes[attributeName] =
        Number.isFinite(attributeValue)
          ? attributeValue
          : 0;
    }
  );

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
          description: badge.description || "",
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

  const summary =
    document.createElement("div");

  summary.className =
    "results-summary";

  const playerName =
    player.name || "Player";

  summary.innerHTML = `
    <p>
      <strong>${escapeHTML(playerName)}</strong>
      qualifies for
      <strong>${qualifiedBadges.length}</strong>
      badge${qualifiedBadges.length === 1 ? "" : "s"}.
    </p>
  `;

  badgeResults.appendChild(summary);

  const badgesByCategory = {};

  qualifiedBadges.forEach(
    function (badge) {
      const category =
        badge.category || "Other";

      if (!badgesByCategory[category]) {
        badgesByCategory[category] = [];
      }

      badgesByCategory[category].push(badge);
    }
  );

  Object.keys(badgesByCategory).forEach(
    function (category) {
      const categorySection =
        document.createElement("div");

      categorySection.className =
        "badge-category-results " +
        "badge-category-" +
        category
          .toLowerCase()
          .replace(/\s+/g, "-");

      const heading =
        document.createElement("h3");

      heading.textContent = category;

      categorySection.appendChild(heading);

      const badgeGrid =
        document.createElement("div");

      badgeGrid.className =
        "badge-results-grid";

      badgesByCategory[category].forEach(
        function (badge) {
          badgeGrid.appendChild(
            createBadgeResultCard(badge)
          );
        }
      );

      categorySection.appendChild(badgeGrid);
      badgeResults.appendChild(categorySection);
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

  const toggle =
    document.createElement("span");

  toggle.className =
    "badge-result-toggle";

  toggle.textContent = "+";

  const description =
    document.createElement("div");

  description.className =
    "badge-result-description";

  description.textContent =
    badge.description || "";

  card.appendChild(name);
  card.appendChild(level);

  if (badge.description) {
    card.appendChild(toggle);
    card.appendChild(description);
    card.classList.add("has-description");

    card.addEventListener(
      "click",
      function () {
        card.classList.toggle("is-expanded");

        toggle.textContent =
          card.classList.contains("is-expanded")
            ? "−"
            : "+";
      }
    );
  }

  return card;
}

// ======================================================
// ATTRIBUTE SLIDERS
// ======================================================

function initializeAttributeSliders() {
  const attributeInputs =
    document.querySelectorAll("[data-attribute]");

  attributeInputs.forEach(
    function (input) {
      const field =
        input.closest(".attribute-field");

      if (!field) {
        return;
      }

      if (
        field.querySelector(".attribute-slider")
      ) {
        return;
      }

      const sliderWrap =
        document.createElement("div");

      sliderWrap.className =
        "attribute-slider-wrap";

      const slider =
        document.createElement("input");

      slider.type = "range";
      slider.className = "attribute-slider";
      slider.min = "25";
      slider.max = "99";
      slider.step = "1";
      slider.value = input.value || "25";

      sliderWrap.appendChild(slider);
      field.appendChild(sliderWrap);

      slider.addEventListener(
        "input",
        function () {
          input.value = slider.value;

          updateAttributeSliderFill(slider);
          scheduleLiveBadgeCalculation();
        }
      );

      input.addEventListener(
        "input",
        function () {
          syncAttributeSlider(input);
          scheduleLiveBadgeCalculation();
        }
      );

      syncAttributeSlider(input);
    }
  );
}

function syncAttributeSlider(attributeInput) {
  if (!attributeInput) {
    return;
  }

  const field =
    attributeInput.closest(".attribute-field");

  if (!field) {
    return;
  }

  const slider =
    field.querySelector(".attribute-slider");

  if (!slider) {
    return;
  }

  let value =
    Number(attributeInput.value);

  if (!Number.isFinite(value)) {
    value = 25;
  }

  value = Math.max(
    25,
    Math.min(99, value)
  );

  slider.value = value;

  updateAttributeSliderFill(slider);
}

function updateAttributeSliderFill(slider) {
  if (!slider) {
    return;
  }

  const min = Number(slider.min);
  const max = Number(slider.max);
  const value = Number(slider.value);

  const percentage =
    ((value - min) / (max - min)) * 100;

  slider.style.background =
    `linear-gradient(
      to right,
      var(--attribute-accent) 0%,
      var(--attribute-accent) ${percentage}%,
      #242d3b ${percentage}%,
      #242d3b 100%
    )`;
}

// ======================================================
// TEST PLAYER RANDOMIZER
// ======================================================

function randomizeTestPlayer() {
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

  const playerName =
    document.getElementById("playerName");

  if (playerName) {
    playerName.value =
      "Random Test Player";
  }

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

  const physicals =
    profile.physicals || {};

  const heightMin =
    Number.isFinite(physicals.heightMin)
      ? physicals.heightMin
      : 68;

  const heightMax =
    Number.isFinite(physicals.heightMax)
      ? physicals.heightMax
      : 88;

  const heightTotal =
    randomInteger(
      heightMin,
      heightMax
    );

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

  const weightMin =
    Number.isFinite(physicals.weightMin)
      ? physicals.weightMin
      : 160;

  const weightMax =
    Number.isFinite(physicals.weightMax)
      ? physicals.weightMax
      : 300;

  setInputValue(
    "weight",
    randomInteger(
      weightMin,
      weightMax
    )
  );

  const wingspanDifferenceMin =
    Number.isFinite(
      physicals.wingspanDifferenceMin
    )
      ? physicals.wingspanDifferenceMin
      : 0;

  const wingspanDifferenceMax =
    Number.isFinite(
      physicals.wingspanDifferenceMax
    )
      ? physicals.wingspanDifferenceMax
      : 5;

  const wingspanDifference =
    randomInteger(
      wingspanDifferenceMin,
      wingspanDifferenceMax
    );

  const wingspanTotal =
    heightTotal +
    wingspanDifference;

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

  const attributeInputs =
    document.querySelectorAll("[data-attribute]");

  attributeInputs.forEach(
    function (input) {
      input.value =
        randomizeAttributeFromProfile(profile);

      syncAttributeSlider(input);
    }
  );

  calculateBadges();
}

// ======================================================
// RANDOMIZER HELPERS
// ======================================================

function randomizeAttributeFromProfile(profile) {
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
    Math.random() *
    (max - min + 1)
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

function initializeAttributeInputs() {
  const attributeInputs =
    document.querySelectorAll("[data-attribute]");

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
            syncAttributeSlider(input);
            scheduleLiveBadgeCalculation();
            return;
          }

          if (value < 25) {
            input.value = 25;
            syncAttributeSlider(input);
            scheduleLiveBadgeCalculation();
            return;
          }

          if (value > 99) {
            input.value = 99;
            syncAttributeSlider(input);
            scheduleLiveBadgeCalculation();
          }
        }
      );
    }
  );
}

// ======================================================
// PLAYER INPUT AUTO-ADVANCE
// ======================================================

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
      document.querySelectorAll("[data-attribute]")
    );

  function focusElement(element) {
    if (!element) {
      return;
    }

    element.focus();
  }

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

        if (
          !Number.isFinite(number) ||
          number < 0 ||
          number > 11
        ) {
          input.value = lastValidValue;
          return;
        }

        lastValidValue = value;

        if (
          value === "10" ||
          value === "11"
        ) {
          focusElement(nextElement);
          return;
        }

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
          scheduleLiveBadgeCalculation();
          return;
        }

        if (number < 0) {
          number = 0;
        }

        if (number > 11) {
          number = 11;
        }

        if (
          options.enforceMinimumHeight &&
          Number(heightFeet.value) === 5 &&
          number < 7
        ) {
          number = 7;
        }

        input.value = number;
        scheduleLiveBadgeCalculation();
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

  if (
    wingspanInches &&
    attributeInputs.length > 0
  ) {
    initializeInchesField(
      wingspanInches,
      attributeInputs[0]
    );
  }

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
    document.querySelectorAll("[data-attribute]");

  attributeInputs.forEach(
    function (input) {
      input.value = 25;
      syncAttributeSlider(input);
    }
  );

  showLiveBadgeIdleState();
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
initializeAttributeSliders();
initializeAttributeInputs();
initializeAutoAdvance();
initializeLiveBadgeAnalysis();
