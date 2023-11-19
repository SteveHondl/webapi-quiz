//HTML References
var quizContainer = document.getElementById("big-container");
var startButton = document.getElementById("start-quiz");
var questionElement = document.getElementById("questions");
var answersElement = document.getElementById("answers");
var correctAnswer = document.getElementById("correct-answer")

//Timer Variables
var timer;
var timerCount = 100;
//Tracks current question starting with first question
var currentQuestionIndex = 0;
//Quiz questions with array of answers and correct answer
var questions = [
  {
    quizQuestion: "How many days did it take Brendan Eich to create Javascript?",
    answers:["10 days", "20 days", "30 days", "40 days"], 
    correctAnswer: "10 days"
  },

  {
    quizQuestion: "Question 2",
    answers:["1", "2", "3", "4"], 
    correctAnswer: "2"
  },

  {
    quizQuestion: "Question 3",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "3"
  },

  {
    quizQuestion: "Question 4",
    answers: ["1", "2", "3", "4"],
    correctAnswer: "4"
  },

];
//Interactive start button for user to start quiz
startButton.addEventListener("click", startQuiz);
//Once user starts quiz, start-screen is hidden and quiz is started
function startQuiz() {
    console.log("Quiz has started");
    // Hide the start screen
    document.getElementById("start-screen").style.display = "none";
    // Show the quiz container
    document.getElementById("quiz-container").style.display = "block";
    // Start displaying questions
    displayQuestion();
}
 //Displays the current question
 function displayQuestion(){
    var currentQuestion = questions[currentQuestionIndex];
    console.log("displaying question: " + currentQuestion.quizQuestion)
    //Displays question and answer choices
    showQuestion(currentQuestion.quizQuestion)
    showAnswers(currentQuestion.answers)
    //allows user to select an answer
    addAnswerListeners();
 }

 //shows question text for each dynamic question
 function showQuestion(questionText){
    console.log("showing question text " + questionText);
    questionElement.innerText = questionText;
 }

 //shows dynamic answers
 function showAnswers(answerChoices){
    console.log("displaying answers " + answerChoices.join(", "))
    //sets element to an empty string, content is cleared and ready for a new set of answers
    answersElement.innerHTML = "";
    //
    for (let index = 0; index < answerChoices.length; index++) {
        //get the current choice from the array
        var choice = answerChoices[index];
        //create a dynamic list element
        var choiceElement = document.createElement("li");
        //set the text inside the list item to the current choice
        choiceElement.textContent = choice;
        //user click will be handled
        choiceElement.addEventListener("click", handleAnswerClick);
        //append to HTML element
        answersElement.appendChild(choiceElement);
    }
}

function addAnswerListeners() {
    // get all list items inside the HTML element
    var answerElements = answersElement.getElementsByTagName("li");

    for (var i = 0; i < answerElements.length; i++) {
        //add click event listener to each list item
        //when list item is clicked, it will be handled 
        answerElements[i].addEventListener("click", handleAnswerClick);
    }
}
//handles the click even when any answer is selected
function handleAnswerClick(event) {

    console.log(event.target);
    //get the text content of the clicked element
    var selectedAnswer = event.target.textContent;
    //get the current question from an array using an index
    var currentQuestion = questions[currentQuestionIndex];

    console.log(currentQuestion);

    if (selectedAnswer === currentQuestion.correctAnswer) {
        console.log("correct answer selected!");
        // Handle correct answer
    } else {
        // Handle incorrect answer
        console.log("Incorrect answer selected!");
    }

    // Move to the next question or end the quiz if there are no more questions
    currentQuestionIndex++;
    //check if there are more questions to display
    if (currentQuestionIndex < questions.length) {
        //if yes, display question
        displayQuestion();
    } else {
        //if no more questions, end quiz
        endQuiz();
    }
}

function endQuiz() {
    // Display a message or perform any actions when the quiz is completed
    console.log("Quiz completed!");
}

    













