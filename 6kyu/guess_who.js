// https://www.codewars.com/kata/58b2c5de4cf8b90723000051

// Character database: [name, [characteristics]]
const CHARACTERS = [
  [
    "Jean-Claude",
    [
      "Male",
      "Glasses",
      "Brown eyes",
      "Bald",
      "White hair",
      "Small mouth",
      "Small nose",
    ],
  ],
  [
    "Pierre",
    ["Male", "Mustache", "Brown eyes", "Brown hair", "Big mouth", "Small nose"],
  ],
  ["Jean", ["Male", "White hair", "Big nose", "Big mouth", "Blue eyes"]],
  [
    "Amelie",
    [
      "Female",
      "Hat",
      "Brown hair",
      "Small mouth",
      "Long hair",
      "Brown eyes",
      "Small nose",
    ],
  ],
  [
    "Mirabelle",
    [
      "Female",
      "Black hair",
      "Earrings",
      "Small mouth",
      "Brown eyes",
      "Big nose",
    ],
  ],
  [
    "Isabelle",
    [
      "Female",
      "Blonde hair",
      "Glasses",
      "Hat",
      "Small mouth",
      "Small nose",
      "Brown eyes",
    ],
  ],
  ["Antonin", ["Male", "Brown eyes", "Black hair", "Small nose", "Big mouth"]],
  ["Bernard", ["Male", "Brown eyes", "Brown hair", "Small nose", "Hat"]],
  ["Owen", ["Male", "Blue eyes", "Blonde hair", "Small nose", "Small mouth"]],
  [
    "Dylan",
    [
      "Male",
      "Brown eyes",
      "Blonde hair",
      "Small nose",
      "Small mouth",
      "Bald",
      "Beard",
    ],
  ],
  [
    "Herbert",
    ["Male", "Brown eyes", "Blonde hair", "Big nose", "Small mouth", "Bald"],
  ],
  [
    "Christine",
    [
      "Female",
      "Blue eyes",
      "Blonde hair",
      "Small nose",
      "Small mouth",
      "Long hair",
    ],
  ],
  [
    "Luc",
    [
      "Male",
      "Brown eyes",
      "White hair",
      "Small nose",
      "Small mouth",
      "Glasses",
    ],
  ],
  [
    "Cecilian",
    ["Male", "Brown eyes", "Ginger hair", "Small nose", "Small mouth"],
  ],
  [
    "Lionel",
    ["Male", "Brown eyes", "Brown hair", "Big nose", "Big mouth", "Mustache"],
  ],
  [
    "Benoit",
    [
      "Male",
      "Brown eyes",
      "Brown hair",
      "Small mouth",
      "Small nose",
      "Mustache",
      "Beard",
    ],
  ],
  ["Robert", ["Male", "Blue eyes", "Brown hair", "Big nose", "Big mouth"]],
  [
    "Charline",
    ["Female", "Brown hair", "White hair", "Small nose", "Big mouth"],
  ],
  [
    "Renaud",
    [
      "Male",
      "Brown eyes",
      "Blonde hair",
      "Small nose",
      "Big mouth",
      "Mustache",
    ],
  ],
  [
    "Michel",
    ["Male", "Brown eyes", "Blonde hair", "Small nose", "Big mouth", "Beard"],
  ],
  [
    "Pierre-Louis",
    [
      "Male",
      "Blue eyes",
      "Brown hair",
      "Small nose",
      "Small mouth",
      "Bald",
      "Glasses",
    ],
  ],
  [
    "Etienne",
    [
      "Male",
      "Brown eyes",
      "Blonde hair",
      "Small nose",
      "Small mouth",
      "Glasses",
    ],
  ],
  [
    "Henri",
    ["Male", "Brown eyes", "White hair", "Small nose", "Big mouth", "Hat"],
  ],
  [
    "Damien",
    ["Male", "Brown eyes", "Blonde hair", "Small nose", "Big mouth", "Hat"],
  ],
];

class GuessWho {
  constructor(secretName) {
    this.secretName = secretName; // The chosen character
    this.turns = 0; // Number of guesses made
    this.remaining = [...CHARACTERS]; // Current pool of possible candidates
  }

  /** Utility: get only the names from remaining candidates */
  getRemainingNames() {
    return this.remaining.map(([name]) => name);
  }

  /** Utility: find the chosen character’s entry */
  getChosenEntry() {
    return this.remaining.find(([name]) => name === this.secretName);
  }

  /** Main guess logic */
  guess(input) {
    this.turns++;
    const [chosenName, chosenTraits] = this.getChosenEntry();
    const allNames = this.remaining.map(([name]) => name);

    const isGuessingName = allNames.includes(input);
    const isCorrectForChosen =
      input === chosenName || chosenTraits.includes(input);

    if (isGuessingName) {
      // Case 1: player guesses a name
      if (input === chosenName) {
        return [`Correct! in ${this.turns} turns`];
      }

      // Wrong name → eliminate that person
      this.remaining = this.remaining.filter(([name]) => name !== input);
      return this.getRemainingNames();
    } else {
      // Case 2: player guesses a characteristic
      if (isCorrectForChosen) {
        // Keep only candidates that have this trait
        this.remaining = this.remaining.filter(([, traits]) =>
          traits.includes(input)
        );
      } else {
        // Remove candidates that have this trait
        this.remaining = this.remaining.filter(
          ([, traits]) => !traits.includes(input)
        );
      }

      return this.getRemainingNames();
    }
  }
}
