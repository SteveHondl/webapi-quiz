//HTML References
var startButton = document.getElementById("start-quiz");
var timerElement = document.getElementById("timer");
// var questionElement = document.getElementById("questions");
var answersElement = document.getElementById("answers");

//Timer Variables
var timer;
var timerCount = 100;
//Tracks current question starting with first question
var currentQuestionIndex = 0;

var questions = InitializeQuestions();
//Quiz questions with array of answers and correct answer
function InitializeQuestions(){
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

// Add a property to each question object to track the user's answer
for (var i = 0; i < questions.length; i++) {
     // Initialize to null, indicating no user answer yet
    questions[i].userAnswer = null;
    }

    return questions
}

// Function to start the timer
function startTimer() {
    timer = setInterval(function () {
        // Update the timer count
        timerCount--;

        // Display the updated timer count
        timerElement.textContent = timerCount;

        // Check if the timer has reached 0
        if (timerCount <= 0) {
            // End the quiz if the timer has reached 0
            endQuiz();
        }
    }, 1000); // Update the timer every 1000 milliseconds (1 second)
}

//Interactive start button for user to start quiz
startButton.addEventListener("click", startQuiz);
//Once user starts quiz, start-screen is hidden and quiz is started
function startQuiz() {

    var quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";

    console.log("Quiz has started");
    // Hide the start screen
    document.getElementById("start-screen").style.display = "none";
    // Show the quiz container
    document.getElementById("quiz-container").style.display = "block";

    startTimer()
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
// Function to display a question on the screen
function showQuestion(questionText) {
   
    console.log("Displaying question: " + questionText);

    // Get the HTML element with the ID "questions"
    var questionElement = document.getElementById("questions");

    // Create a text node with the question text
    var textNode = document.createTextNode(questionText);

    // Clear any existing content in the element
    while (questionElement.firstChild) {
        questionElement.removeChild(questionElement.firstChild);
    }

    // Append the new text node to the element
    questionElement.appendChild(textNode);
}

 //shows dynamic answers
 function showAnswers(answerChoices){
    console.log("displaying answers " + answerChoices.join(", "));
    //sets element to an empty string, content is cleared and ready for a new set of answers
    var answersElement = document.getElementById("answers")
    
    while (answersElement.firstChild) {
        answersElement.removeChild(answersElement.firstChild);
    }

    for (var index = 0; index < answerChoices.length; index++) {
        // Get the current choice from the array
        var choice = answerChoices[index];

        // Create a dynamic list element
        var choiceElement = document.createElement("li");

        // Create a text node with the current choice
        var textNode = document.createTextNode(choice);

        // Append the text node to the list element
        choiceElement.appendChild(textNode);

        // User click will be handled
        choiceElement.addEventListener("click", handleAnswerClick);

        // Append the list element to the "answers" element
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

        currentQuestion.userAnswer = selectedAnswer;
        // Handle correct answer
    } else {
        // Handle incorrect answer
        console.log("Incorrect answer selected!");

        currentQuestion.userAnswer = selectedAnswer;

        timerCount -=10;
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
    // Calculate the number of correct answers
    var correctAnswers = 0;

    // Loop through all questions and check if the user's answer matches the correct answer
    for (var i = 0; i < questions.length; i++) {
        if (questions[i].userAnswer === questions[i].correctAnswer) {
            correctAnswers++;
        }
    }

    // Display the finish screen with the number of correct answers
    var quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";

    var finishScreen = document.getElementById("finish-screen");
    finishScreen.style.display = "block";

    var resultMessage = document.getElementById("result-message");
    resultMessage.innerText = "You got " + correctAnswers + " out of " + questions.length + " questions right!";

    clearInterval(timer)
}










    













