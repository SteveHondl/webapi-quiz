var quizContainer = document.getElementById("big-container");
var startButton = document.getElementById("start-quiz");
var questions = document.getElementById("questions");
var answers = document.getElementById("answers");

var timer;
var timerCount = 100;

var currentQuestionIndex = 0;
var questions = [
  {
    question: "Question 1",
    answers: ["1,2,3,4"],
    correctAnswer: "1"
  },

  {
    question: "Question 2",
    answers: ["1,2,3,4"],
    correctAnswer: "2"
  },

  {
    question: "Question 3",
    answers: ["1,2,3,4"],
    correctAnswer: "3"
  },

  {
    question: "Question 4",
    answers: ["1,2,3,4"],
    correctAnswer: "4"
  },

];

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    console.log("quiz has started");
    console.log("current question", questions[currentQuestionIndex].question);
}

