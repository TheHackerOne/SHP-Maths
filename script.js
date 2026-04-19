let level = 1;
let xp = 0;
let streak = 0;

let currentAnswer = 0;
let currentMethod = "";
let timer;
let timeLeft = 10;

let weaknesses = {};

function updateStats() {
  document.getElementById("level").innerText = `Level: ${level}`;
  document.getElementById("xp").innerText = `XP: ${xp}`;
  document.getElementById("streak").innerText = `Streak: ${streak}`;
  document.getElementById("timer").innerText = `⏱ ${timeLeft}s`;
}

// ---------------- TIMER ----------------

function startTimer() {
  timeLeft = 10;
  clearInterval(timer);

  timer = setInterval(() => {
    timeLeft--;
    updateStats();

    if (timeLeft <= 0) {
      clearInterval(timer);
      streak = 0;
      nextQuestion();
    }
  }, 1000);
}

// ---------------- QUESTION ENGINE ----------------

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
  let a, b, type;

  // weighted based on weakness
  let pool = ["add", "mul", "div", "percent", "mix"];

  type = pool[rand(0, pool.length - 1)];

  switch (type) {
    case "add":
      a = rand(20, 100);
      b = rand(20, 100);
      currentAnswer = a + b;
      currentMethod = "Round + adjust";
      return `${a} + ${b}`;

    case "mul":
      a = rand(20, 80);
      b = rand(10, 30);
      currentAnswer = a * b;
      currentMethod = "Distributive";
      return `${a} × ${b}`;

    case "div":
      b = rand(2, 20);
      currentAnswer = rand(5, 20);
      a = b * currentAnswer;
      currentMethod = "Simplify / split";
      return `${a} ÷ ${b}`;

    case "percent":
      a = rand(5, 50);
      b = rand(20, 200);
      currentAnswer = (a * b) / 100;
      currentMethod = "Break %";
      return `${a}% of ${b}`;

    case "mix":
      a = rand(10, 50);
      b = rand(10, 30);
      let c = rand(1, 10);
      currentAnswer = a * b + c;
      currentMethod = "Distribute + add";
      return `${a} × ${b} + ${c}`;
  }
}

// ---------------- FLOW ----------------

function startSession() {
  nextQuestion();
}

function nextQuestion() {
  let q = generateQuestion();
  document.getElementById("question").innerText = q;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").innerText = "";
  startTimer();
}

function submitAnswer() {
  clearInterval(timer);

  let user = parseFloat(document.getElementById("answer").value);

  let correct = false;

  if (Math.abs(user - currentAnswer) < 0.01) {
    correct = true;
  }

  if (correct) {
    xp += 10;
    streak++;
    document.getElementById("feedback").innerText =
      `✅ Correct | Method: ${currentMethod}`;
  } else {
    streak = 0;
    document.getElementById("feedback").innerText =
      `❌ Correct: ${currentAnswer} | Method: ${currentMethod}`;
  }

  if (xp > level * 100) {
    level++;
  }

  updateStats();

  setTimeout(nextQuestion, 1500);
}

updateStats();
