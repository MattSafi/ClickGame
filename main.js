const button = document.getElementById("button");
const counter = document.getElementById("clicks");

const modal = document.getElementById("reset-modal");
const modalConfirm = document.getElementById("modal-confirm");
const modalCancel = document.getElementById("modal-cancel");
const resetButton = document.getElementById("reset-button");
const title = document.getElementById("title");

const plusOneButton = document.getElementById("+1-button");
const x2Button = document.getElementById("x2-button");

const currentMultiplier = document.getElementById("current-multiplier");

let clicks = 0;
let clickMultiplier = 1;

function onClick(event) {
  clicks += clickMultiplier;
  document.getElementById("clicks").innerHTML = clicks;
  showFloatingText(event.clientX, event.clientY, "+");
}

// Reset and Modal Functions

resetButton.addEventListener("click", function () {
  modal.style.display = "flex";
});

modalConfirm.addEventListener("click", function () {
  clicks = 0;
  clickMultiplier = 1;
  document.getElementById("clicks").innerHTML = clicks;
  modal.style.display = "none";
  title.innerText = "Welcome to my Click Game! Get to 1000 Clicks to win!";
  currentMultiplier.innerText = `Current Multiplier: ${clickMultiplier}`;
});

modalCancel.addEventListener("click", function () {
  modal.style.display = "none";
});

// Upgrade Functions

plusOneButton.addEventListener("click", function () {
  if (clicks >= 50) {
    clicks -= 50;
    document.getElementById("clicks").innerHTML = clicks;
    clickMultiplier += 1;
    currentMultiplier.innerText = `Current Multiplier: ${clickMultiplier}`;
  }
});

x2Button.addEventListener("click", function () {
  if (clicks >= 200) {
    clicks -= 200;
    document.getElementById("clicks").innerHTML = clicks;
    clickMultiplier *= 2;
    currentMultiplier.innerText = `Current Multiplier: ${clickMultiplier}`;
  }
});

currentMultiplier.innerText = `Current Multiplier: ${clickMultiplier}`;

// Win Conditions

button.addEventListener("click", function () {
  if (clicks >= 1000) {
    title.innerText = "YOU WIN!😁";
  }
});

button.addEventListener("click", function () {
  if (clicks >= 2000) {
    title.innerText = "Okay You Can Stop Now 😅";
  }
});

button.addEventListener("click", function () {
  if (clicks >= 3000) {
    title.innerText = "Not Sure What You're Trying To Prove Here, Bud 😐";
  }
});

button.addEventListener("click", function () {
  if (clicks >= 4000) {
    title.innerText = "Okay, Stop. Please. 😰";
  }
});

button.addEventListener("click", function () {
  if (clicks >= 5000) {
    title.innerText = "I'm Begging You 😭";
  }
});

button.addEventListener("click", function () {
  if (clicks >= 6000) {
    title.innerText = "I'm Going To Bed 😴";
  }
});

button.addEventListener("click", function () {
  if (clicks >= 7000) {
    title.innerText = "Goodnight 😴";
  }
});

button.addEventListener("click", function () {
  if (clicks >= 8000) {
    title.innerText = "I'm Not Coming Back 😤";
  }
});

button.addEventListener("click", function () {
  if (clicks >= 9000) {
    title.innerText = "Stop Right Now. I'm Warning You 😡";
  }
});

button.addEventListener("click", function () {
  if (clicks >= 10000) {
    clicks = 0;
    clickMultiplier = 1;
    document.getElementById("clicks").innerHTML = clicks;
    modal.style.display = "none";
    title.innerText = "Welcome to my Click Game! Get to 1000 Clicks to win!";
    currentMultiplier.innerText = `Current Multiplier: ${clickMultiplier}`;
  }
});
// Floating plus symbols

function showFloatingText(x, y, text) {
  const floatingText = document.createElement("div");
  floatingText.className = "floating-text";
  floatingText.textContent = "+";

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
