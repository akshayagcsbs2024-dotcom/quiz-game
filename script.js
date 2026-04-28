const quiz = [
  {
    question: "What is my favorite place?",
    options: ["Mall", "Beach", "Park", "Home"],
    answer: 1
  },
  {
    question: "What is my favorite food?",
    options: ["Pizza", "Burger", "Biryani", "Pasta"],
    answer: 2
  },
  {
    question: "What is my favorite ice cream flavor?",
    options: ["Chocolate", "Vanilla", "Strawberry", "Butterscotch"],
    answer: 3
  },
  {
    question: "When do I feel the happiest?",
    options: [
      "When I'm alone",
      "While studying",
      "When vibing with friends",
      "While sleeping"
    ],
    answer: 2
  },
  {
    question: "My favorite movie/series genre?",
    options: ["Romance", "Comedy", "Horror & Thriller", "Action"],
    answer: 2
  },
  {
    question: "What is my full name?",
    options: ["Akshaya.R", "Akshi", "Akshaya.G", "Akshu"],
    answer: 2
  },
  {
    question: "Who is my favorite cricket player?",
    options: ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Hardik Pandya"],
    answer: 1
  },
  {
    question: "How do I behave in a group?",
    options: [
      "Very talkative",
      "Silent observer but sometimes interacts",
      "Always joking",
      "Leader type"
    ],
    answer: 1
  },
  {
    question: "What kind of music do I like?",
    options: ["Classical", "Melody & Chill songs", "Rap", "Rock"],
    answer: 1
  },
  {
    question: "What do I do most in free time?",
    options: ["Reading books", "Scrolling phone", "Watching series", "Sleeping"],
    answer: 2
  }
];

let current = 0;
let score = 0;

function loadQuestion() {
  document.getElementById("result").innerText = "";
  document.getElementById("score").innerText = "";

  document.getElementById("question").innerText = quiz[current].question;

  const buttons = document.querySelectorAll("#answers button");
  buttons.forEach((btn, i) => {
    btn.innerText = quiz[current].options[i];
  });
}

function checkAnswer(i) {
  if (i === quiz[current].answer) {
    score++;
    document.getElementById("result").innerText = "Correct!";
  } else {
    document.getElementById("result").innerText = "Wrong!";
  }

  current++;

  if (current < quiz.length) {
    setTimeout(loadQuestion, 800);
  } else {
    showResult();
  }
}

function showResult() {
  let message = "";

  if (score >= 8) {
    message = "Besties ❤️";
  } else if (score >= 4) {
    message = "Friends 🙂";
  } else {
    message = "Stranger 😐";
  }

  document.getElementById("question").innerText = "Quiz Finished!";
  document.getElementById("answers").style.display = "none";
  document.getElementById("result").innerText = message;
  document.getElementById("score").innerText = "Your Score: " + score + "/10";
}

loadQuestion();
