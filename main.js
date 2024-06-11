let clicks = 0;
let clickMultiplier = 1;
let autoClickerInterval = null;
let autoClicker2Interval = null;
let circleSpawning = true;
let circlePenalty = 100;

let upgrades = {
  upgrade1: { cost: 50, multiplier: 1 },
  upgrade2: { cost: 100, multiplier: 2 },
  upgrade3: { cost: 400, doubleClickMultiplier: true },
  upgrade4: { cost: 600, tripleClickMultiplier: true },
  autoClicker: { cost: 50, interval: 3000, increment: 1 }, // Adds 1 click every 3 seconds
  autoClicker2: { cost: 100, interval: 1000, increment: 2 },
  disableCircle: { cost: 1000, disableCircle: true },
  reducedCirclePenalty: { cost: 20, reducedPenalty: true },
};

function onClick(event) {
  clicks += clickMultiplier;
  document.getElementById("clicks").innerHTML = clicks;
  showFloatingText(event.clientX, event.clientY, "+1");

  // Check if the user has reached 2000 clicks
  if (clicks >= 2000) {
    endGame();
  }
}

function endGame() {
  // Open "endGame.html" in a new tab
  window.open("endGame.html", "_blank");
}

function resetGame() {
  if (confirm("Are you sure you want to reset?")) {
    clicks = 0;
    document.getElementById("clicks").innerHTML = clicks;
    clickMultiplier = 1;
    circlePenalty = 100;

    // Stop the auto-clickers if they're running
    if (autoClickerInterval !== null) {
      clearInterval(autoClickerInterval);
      autoClickerInterval = null;
    }

    if (autoClicker2Interval !== null) {
      clearInterval(autoClicker2Interval);
      autoClicker2Interval = null;
    }

    // Re-enable all upgrade buttons and remove the upgrade-purchased class
    for (let upgrade in upgrades) {
      const upgradeButton = document.getElementById(upgrade);
      upgradeButton.disabled = false;
      upgradeButton.classList.remove("upgrade-purchased");
    }

    // Re-enable circle spawning
    circleSpawning = true;
  }
}

function buyUpgrade(upgrade) {
  if (clicks >= upgrades[upgrade].cost) {
    clicks -= upgrades[upgrade].cost;
    document.getElementById("clicks").innerHTML = clicks;
    const upgradeButton = document.getElementById(upgrade);
    upgradeButton.disabled = true; // Disable the button after purchase
    upgradeButton.classList.add("upgrade-purchased"); // Add class to change background color

    // Apply upgrade effects
    if (upgrades[upgrade].doubleClickMultiplier) {
      clickMultiplier *= 2; // Double the current click multiplier
    } else if (upgrade === "autoClicker") {
      autoClickerInterval = setInterval(() => {
        clicks += upgrades.autoClicker.increment;
        document.getElementById("clicks").innerHTML = clicks;
        checkWinCondition();
      }, upgrades.autoClicker.interval);
    } else if (upgrade === "autoClicker2") {
      autoClicker2Interval = setInterval(() => {
        clicks += upgrades.autoClicker2.increment;
        document.getElementById("clicks").innerHTML = clicks;
        checkWinCondition();
      }, upgrades.autoClicker2.interval);
    } else if (upgrade === "upgrade4") {
      clickMultiplier *= 3;
    } else if (upgrade === "disableCircle") {
      circleSpawning = false; // Disable circle spawning
    } else if (upgrade === "reducedCirclePenalty") {
      circlePenalty = 50;
    } else {
      // For other upgrades, increase the click multiplier
      clickMultiplier += upgrades[upgrade].multiplier;
    }
  } else {
    alert("Not enough clicks to buy this upgrade!");
  }
}

// Function to start auto-clicker
function startAutoClicker(upgrade) {
  const interval = upgrades[upgrade].interval;
  const increment = upgrades[upgrade].increment;
  const autoClickerInterval = setInterval(() => {
    clicks += increment;
    document.getElementById("clicks").innerHTML = clicks;
  }, interval);

  // Store the interval in a variable so it can be stopped later
  if (upgrade === "autoClicker") {
    autoClickerInterval = autoClickerInterval;
  } else if (upgrade === "autoClicker2") {
    autoClicker2Interval = autoClickerInterval;
  }
}

function showFloatingText(x, y, text) {
  const floatingText = document.createElement("div");
  floatingText.className = "floating-text";
  floatingText.textContent = "+"; // Always display "+"

  // Append the floating text to the container
  const container = document.querySelector(".container");
  container.appendChild(floatingText);

  // Calculate position relative to the container
  const rect = container.getBoundingClientRect();
  floatingText.style.left = `${x - rect.left}px`;
  floatingText.style.top = `${y - rect.top}px`;

  // Remove the floating text after a short delay
  setTimeout(() => {
    floatingText.remove();
  }, 1000);
}

// Function to create a randomly spawning circle
function spawnCircle() {
  if (!circleSpawning) return; // Do not spawn circles if disabled

  const circle = document.createElement("div");
  circle.className = "circle";

  const container = document.querySelector(".container");
  const rect = container.getBoundingClientRect();
  const x = Math.random() * (rect.width - 50); // 50 is the width of the circle
  const y = Math.random() * (rect.height - 50); // 50 is the height of the circle
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  container.appendChild(circle);

  circle.addEventListener("click", () => {
    circle.remove();
  });

  setTimeout(() => {
    if (container.contains(circle)) {
      circle.remove();
      clicks = Math.max(clicks - circlePenalty, 0);
      document.getElementById("clicks").innerHTML = clicks;
    }
  }, 3000);
}

// Spawn a circle every 8 seconds
setInterval(spawnCircle, 8000);
