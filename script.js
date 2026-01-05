let correctAnswer = null;
let startTime = null;

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rangeForDifficulty(d) {
  return [
    [1, 12],
    [5, 50],
    [20, 200],
    [50, 1000]
  ][d - 1];
}

function generateQuestion() {
  let mode = document.getElementById("mode").value;
  let diff = parseInt(document.getElementById("difficulty").value);
  let [lo, hi] = rangeForDifficulty(diff);

  if (mode === "mixed") {
    mode = ["add", "sub", "mul", "div", "pct"][rand(0, 4)];
  }

  let a = rand(lo, hi);
  let b = rand(lo, hi);
  let text = "";

  switch (mode) {
    case "add":
      correctAnswer = a + b;
      text = `${a} + ${b}`;
      break;
    case "sub":
      correctAnswer = a - b;
      text = `${a} - ${b}`;
      break;
    case "mul":
      correctAnswer = a * b;
      text = `${a} × ${b}`;
      break;
    case "div":
      correctAnswer = Math.round((a / b) * 100) / 100;
      text = `${a} ÷ ${b}`;
      break;
    case "pct":
      let p = rand(5, 25);
      correctAnswer = Math.round((p / 100) * a);
      text = `${p}% of ${a}`;
      break;
  }

  return text;
}

function nextQuestion() {
  document.getElementById("feedback").textContent = "";
  document.getElementById("answer").value = "";

  const q = generateQuestion();
  document.getElementById("question").textContent = q;

  startTime = performance.now();
}

document.getElementById("answer").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const userAns = parseFloat(e.target.value);
    const time = ((performance.now() - startTime) / 1000).toFixed(2);

    if (Math.abs(userAns - correctAnswer) < 1) {
      document.getElementById("feedback").textContent = `✅ Correct (${time}s)`;
    } else {
      document.getElementById("feedback").textContent =
        `❌ Wrong. Correct: ${correctAnswer} (${time}s)`;
    }
  }
});

/* THEME TOGGLE */
function toggleTheme() {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
}

(function () {
  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light");
  }
})();
