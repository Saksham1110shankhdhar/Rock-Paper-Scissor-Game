// =========================
// GLOBAL STATE VARIABLES
// =========================
let isDark = localStorage.getItem("isDark") === "true";
let isMuted = localStorage.getItem("isMuted") === "true";

// =========================
// SOUND EFFECTS
// =========================
const clickSound = new Audio("./sounds/click.mp3");
const winSound = new Audio("./sounds/win.mp3");
const loseSound = new Audio("./sounds/lose.mp3");
const tieSound = new Audio("./sounds/tie.mp3");

// =========================
// SCORE & RESULT SYSTEM
// =========================
const Score = {
  user: 0,
  computer: 0,
  tie: 0,
  updateScore: function () {
    const scoreBox = document.querySelector(".Score");
    scoreBox.classList.remove("hidden");
    scoreBox.innerHTML = `
      <p>Score : Computer Won ➡ ${this.computer}</p>
      <p>You Won ➡ ${this.user}</p>
      <p>Tie ➡ ${this.tie}</p>
    `;
  },
};

// =========================
// COMPUTER CHOICE
// =========================
function computeComputerChoice() {
  const choices = ["✊Rock", "📄Paper", "✂Scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

// =========================
// RESULT CALCULATION
// =========================
function ComputeResult(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    Score.tie++;
    if (!isMuted) tieSound.play();
    return "Tie";
  } else if (
    (userChoice === "✊Rock" && computerChoice === "✂Scissors") ||
    (userChoice === "📄Paper" && computerChoice === "✊Rock") ||
    (userChoice === "✂Scissors" && computerChoice === "📄Paper")
  ) {
    Score.user++;
    if (!isMuted) winSound.play();
    return "User Wins!";
  } else {
    Score.computer++;
    if (!isMuted) loseSound.play();
    return "Computer Wins!";
  }
}

// =========================
// UPDATE RESULT UI
// =========================
function updateResult(userChoice, computerChoice, result) {
  const resultBox = document.querySelector(".result");
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `
    <p>You Chose ➡ ${userChoice}</p>
    <p>Computer Chose ➡ ${computerChoice}</p>
    <p>The Result is ▶▶ <b>${result}</b></p>
  `;
  Score.updateScore();
}

// =========================
// BUTTON FUNCTIONS
// =========================
window.onRock = () => {
  if (!isMuted) clickSound.play();
  const userChoice = "✊Rock";
  const computerChoice = computeComputerChoice();
  updateResult(userChoice, computerChoice, ComputeResult(userChoice, computerChoice));
};

window.onPaper = () => {
  if (!isMuted) clickSound.play();
  const userChoice = "📄Paper";
  const computerChoice = computeComputerChoice();
  updateResult(userChoice, computerChoice, ComputeResult(userChoice, computerChoice));
};

window.onScissors = () => {
  if (!isMuted) clickSound.play();
  const userChoice = "✂Scissors";
  const computerChoice = computeComputerChoice();
  updateResult(userChoice, computerChoice, ComputeResult(userChoice, computerChoice));
};

window.onReset = () => {
  if (!isMuted) clickSound.play();
  Score.user = 0;
  Score.computer = 0;
  Score.tie = 0;
  document.querySelector(".result").classList.add("hidden");
  document.querySelector(".Score").classList.add("hidden");
};

// =========================
// DARK MODE + SOUND TOGGLE
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("darkModeToggle");
  const soundToggleBtn = document.getElementById("soundToggle");
  const gameContainer = document.getElementById("gameContainer");
  const buttons = document.querySelectorAll(".game-button");
  const resultBox = document.querySelector(".result");
  const scoreBox = document.querySelector(".Score");

  // Initialize sound button icon
  soundToggleBtn.innerHTML = isMuted ? "🔇" : "🔊";

  // Smooth transitions
  gameContainer.style.transition = "all 0.4s ease";
  buttons.forEach((btn) => (btn.style.transition = "all 0.4s ease"));
  resultBox.style.transition = "all 0.4s ease";
  scoreBox.style.transition = "all 0.4s ease";
  gameContainer.style.minHeight = "700px";
  gameContainer.style.position = "relative";

  // SOUND TOGGLE BUTTON FUNCTION
  soundToggleBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    localStorage.setItem("isMuted", isMuted);
    soundToggleBtn.innerHTML = isMuted ? "🔇" : "🔊";
    if (!isMuted) clickSound.play();
    soundToggleBtn.style.transform = "scale(1.2)";
    setTimeout(() => (soundToggleBtn.style.transform = "scale(1)"), 150);
  });

  // THEME APPLY FUNCTION
  const applyTheme = () => {
    const body = document.body;

    // Body Background Animation
    if (isDark) {
      body.style.background =
        "linear-gradient(135deg, #0f172a, #1e293b, #2b3a67, #4f46e5)";
      body.style.backgroundSize = "400% 400%";
      body.style.animation = "darkBGMove 15s ease infinite";
    } else {
      body.style.background =
        "linear-gradient(135deg, #fce1ec, #f9b4c8, #f77b99, #c94f6e)";
      body.style.backgroundSize = "400% 400%";
      body.style.animation = "lightBGMove 15s ease infinite";
    }

    // Game Container Styles
    if (isDark) {
      gameContainer.className =
        "p-8 rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white transition-all h-[700px] flex flex-col gap-6";
      gameContainer.style.border = "2px solid rgba(0, 255, 255, 0.8)";
      gameContainer.style.boxShadow =
        "0 0 15px rgba(0, 255, 255, 0.7), 0 0 30px rgba(0, 255, 255, 0.5), 0 0 45px rgba(0, 255, 255, 0.3)";
      gameContainer.style.paddingTop = "80px";

      resultBox.className =
        "result p-4 rounded-lg bg-gray-900 shadow-lg shadow-purple-500/40 text-purple-300 text-center border border-purple-600";
      scoreBox.className =
        "Score p-4 rounded-lg bg-gray-900 shadow-lg shadow-blue-500/40 text-blue-400 text-center border border-blue-600";

      toggleBtn.style.cssText = `
        width: 120px !important;
        padding: 10px 0;
        background-color: #f3f4f6;
        color: #111;
        border-radius: 8px;
        box-shadow: 0 0 12px rgba(0,255,255,0.6);
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        position: absolute;
        top: 20px;
        left: 20px;
        margin: 0;
      `;
      toggleBtn.innerHTML = "☀️ Light";
    } else {
      gameContainer.className =
        "p-8 rounded-2xl shadow-xl bg-gradient-to-br from-pink-100 via-rose-200 to-red-200 text-black transition-all h-[700px] flex flex-col gap-6";
      gameContainer.style.boxShadow = "0 6px 20px rgba(255, 0, 100, 0.2)";
      gameContainer.style.paddingTop = "80px";

      toggleBtn.style.cssText = `
        width: 120px !important;
        padding: 10px 0;
        background-color: #1f2937;
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        position: absolute;
        top: 20px;
        left: 20px;
        margin: 0;
      `;
      toggleBtn.innerHTML = "🌙 Dark";
    }

    // Sound Button Position
    soundToggleBtn.style.position = "absolute";
    soundToggleBtn.style.top = "20px";
    soundToggleBtn.style.right = "20px";
    soundToggleBtn.style.fontSize = "1.5rem";
    soundToggleBtn.style.background = "transparent";
    soundToggleBtn.style.border = "none";
    soundToggleBtn.style.outline = "none";
    soundToggleBtn.style.cursor = "pointer";
    soundToggleBtn.style.transition = "transform 0.2s ease";

    soundToggleBtn.onmouseenter = () =>
      (soundToggleBtn.style.transform = "scale(1.2)");
    soundToggleBtn.onmouseleave = () =>
      (soundToggleBtn.style.transform = "scale(1)");

    // 3D Buttons
    buttons.forEach((btn) => {
      if (isDark) {
        btn.style.cssText = `
          background: linear-gradient(145deg, #1f2937, #111827);
          color: #f9fafb;
          border: 2px solid rgba(0,255,255,0.4);
          border-radius: 10px;
          padding: 12px 24px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 4px 4px 10px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(255,255,255,0.05);
          transition: all 0.2s ease-in-out;
        `;
      } else {
        btn.style.cssText = `
          background: linear-gradient(145deg, #ffdd80, #fbbf24);
          color: #111;
          border: 2px solid rgba(255, 182, 36, 0.7);
          border-radius: 10px;
          padding: 12px 24px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 4px 4px 10px rgba(255,182,36,0.4), inset -2px -2px 6px rgba(255,255,255,0.4);
          transition: all 0.2s ease-in-out;
        `;
      }

      btn.onmouseenter = () =>
        (btn.style.transform = "scale(1.08) translateY(-2px)");
      btn.onmouseleave = () => (btn.style.transform = "scale(1)");

      // Reset Button (Red)
      if (btn.textContent.includes("Reset")) {
        btn.style.background = isDark
          ? "linear-gradient(145deg, #991b1b, #7f1d1d)"
          : "linear-gradient(145deg, #ef4444, #dc2626)";
        btn.style.color = "#fff";
      }
    });
  };

  // Initial Load
  applyTheme();
  Score.updateScore();

  // Dark Mode Toggle
  toggleBtn.addEventListener("click", () => {
    if (!isMuted) clickSound.play();
    isDark = !isDark;
    localStorage.setItem("isDark", isDark);
    applyTheme();
  });

  // Background Animations
  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = `
    @keyframes lightBGMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes darkBGMove {
      0% { background-position: 50% 0%; }
      50% { background-position: 50% 100%; }
      100% { background-position: 50% 0%; }
    }
  `;
  document.head.appendChild(styleSheet);
});

