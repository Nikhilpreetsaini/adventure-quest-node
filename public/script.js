/*
 * Adventure Quest interactive story engine.
 *
 * This script defines a simple choose‑your‑own‑adventure game. The
 * story is represented as a dictionary (object) where each node has
 * narrative text and a list of choices. When a user clicks a choice,
 * the engine loads the corresponding next node. Some nodes mark
 * endings by omitting the choices array; in that case, a single
 * "Restart" button is provided.
 */

(() => {
  // Story definition. Each key maps to a node in the story. A node
  // consists of a text property and an array of choice objects. A
  // choice object includes text and a next property pointing to
  // another node key. If a node omits the choices property, it is
  // treated as an ending.
  const story = {
    start: {
      text:
        "You wake up on a mysterious island with no memory of how you arrived. The sun is rising over the sea. You see a dense jungle ahead and a rocky path along the shore.",
      choices: [
        { text: "Enter the jungle", next: "jungle" },
        { text: "Follow the shore", next: "shore" },
      ],
    },
    jungle: {
      text:
        "The jungle is thick with vegetation. You hear birds and a waterfall in the distance. A path leads deeper into the jungle; another path seems to circle around towards the waterfall.",
      choices: [
        { text: "Head deeper into the jungle", next: "clearing" },
        { text: "Head towards the waterfall", next: "waterfall" },
      ],
    },
    shore: {
      text:
        "You walk along the shore. The waves lap gently. You see a small boat anchored near some rocks and a cave entrance near the shore.",
      choices: [
        { text: "Investigate the boat", next: "boat" },
        { text: "Enter the cave", next: "cave" },
      ],
    },
    clearing: {
      text:
        "After walking, you encounter a clearing with a strange stone altar covered in ancient symbols. On the altar is a glowing artifact. Do you take it or leave it alone?",
      choices: [
        { text: "Take the artifact", next: "takeArtifact" },
        { text: "Leave it alone", next: "leaveArtifact" },
      ],
    },
    waterfall: {
      text:
        "You approach the waterfall; behind it you see a hidden passage leading to a secret chamber.",
      choices: [
        { text: "Enter the hidden passage", next: "hiddenPassage" },
        { text: "Return to the beach", next: "start" },
      ],
    },
    boat: {
      text:
        "You inspect the boat and find supplies inside: rope, water, and a map. Do you take the boat to leave the island or use the map to explore?",
      choices: [
        { text: "Use the boat to leave", next: "boatEnding" },
        { text: "Take the map and explore", next: "mapExplore" },
      ],
    },
    cave: {
      text:
        "Inside the cave you find ancient drawings. Deeper in the cave there is a chest.",
      choices: [
        { text: "Open the chest", next: "chest" },
        { text: "Exit the cave", next: "start" },
      ],
    },
    takeArtifact: {
      text:
        "As you grab the artifact, the ground shakes and the temple collapses! You are trapped. Your adventure ends here.",
      // No choices means this is an ending
    },
    leaveArtifact: {
      text:
        "You decide not to disturb the artifact; a wise choice. A hidden door opens revealing a path to a treasure and an exit from the island.",
      choices: [
        { text: "Take the treasure and leave", next: "treasureEnding" },
        { text: "Return to the jungle", next: "jungle" },
      ],
    },
    hiddenPassage: {
      text:
        "You find a chamber with ancient knowledge carved on the walls. This knowledge helps you build a raft and return home safely. Congratulations!",
      // Ending
    },
    boatEnding: {
      text:
        "You sail away, but a storm hits and your boat capsizes. You are lost at sea. Unfortunately, your journey ends in the vast ocean.",
      // Ending
    },
    mapExplore: {
      text:
        "The map reveals a safe path across the island to a hidden village where survivors welcome you. You have found a new home and friends. Congratulations!",
      // Ending
    },
    chest: {
      text:
        "The chest contains a trap! Poisonous gas fills the cave. You cough and collapse. This is the end of your journey.",
      // Ending
    },
    treasureEnding: {
      text:
        "You leave the island with treasure and live a prosperous life. Well done, adventurer!",
      // Ending
    },
  };

  // DOM elements
  const storyText = document.getElementById("story-text");
  const choicesContainer = document.getElementById("choices");

  // Current node key
  let currentNodeKey = "start";

  /**
   * Renders the current story node onto the page. It updates the story
   * text and generates buttons for each available choice. For
   * endings, it shows a single restart button that returns to the
   * start.
   */
  function render() {
    const node = story[currentNodeKey];
    if (!node) {
      storyText.textContent = "Oops! The story node does not exist.";
      choicesContainer.innerHTML = "";
      return;
    }
    // Set the story text
    storyText.textContent = node.text;

    // Clear previous choices
    choicesContainer.innerHTML = "";

    // If the node has choices, create buttons for them. Otherwise,
    // provide a restart button to begin again.
    if (node.choices && Array.isArray(node.choices)) {
      node.choices.forEach((choice) => {
        const button = document.createElement("button");
        button.className = "choice-button";
        button.textContent = choice.text;
        button.addEventListener("click", () => {
          currentNodeKey = choice.next;
          render();
        });
        choicesContainer.appendChild(button);
      });
    } else {
      const restartButton = document.createElement("button");
      restartButton.className = "choice-button";
      restartButton.textContent = "Restart";
      restartButton.addEventListener("click", () => {
        currentNodeKey = "start";
        render();
      });
      choicesContainer.appendChild(restartButton);
    }
  }

  // Initialize the game on page load
  render();
})();
