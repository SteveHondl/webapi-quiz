//HTML References
var startButton = document.getElementById("start-quiz");
var timerElement = document.getElementById("timer");
var questionElement = document.getElementById("questions");
var answersElement = document.getElementById("answers");

//Timer Variables
var timer;
var timerCount = 100;
//Tracks current question starting with first question
var currentQuestionIndex = 0;

var questions = InitializeQuestions();
//Quiz questions with array of answers and correct answer
function InitializeQuestions(){

    var allQuizQuestions = [
        {
            question: "How many days did it take Brendan Eich to create JavaScript?",
            answers: [
                {text: "10 days", correct: true},
                {text: "20 days", correct: false},
                {text:"30 days", correct: false},
                {text:"40 days", correct: false},
            ],
            correctAnswer: "10 days",
        },
        {
            question: "In what year was JavaScript invented according to Google?",
            answers: [
                { text: "1994", correct: false },
                { text: "1995", correct: true },
                { text: "1996", correct: false },
                { text: "2000", correct: false },
            ],

            correctAnswer: "1995",
        },
        {
            question: "What was the original name of JavaScript?",
            answers: [
                { text: "Latte", correct: false },
                { text: "Chai tea", correct: false },
                { text: "Mocha", correct: true },
                { text: "Cappuccino", correct: false },
            ],
            correctAnswer: "Mocha",
        },
        {
            question: "Which of the following items does not involve the use of JavasScript?",
            answers: [
                {text: "VideoGame Development", correct: false},
                {text: "Online Shopping", correct: false},
                {text: "Checking the score of the Super Bowl on your phone", correct: false},
                {text: "Parallel parking your vehicle", correct: true},
            ],
            correctAnswer:"Parallel parking your vehicle",
        }
        
    ];
    
    
    // Add a property to each question object to track the user's answer
    for (var i = 0; i < allQuizQuestions.length; i++) {
        // Initialize to null, indicating no user answer yet
    allQuizQuestions[i].userAnswer = null;
    }
    
    return allQuizQuestions;
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

// Displays the current question
function displayQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    
    // Display question
    displayContent("questions", currentQuestion.question);
    
    // Display dynamic answers with a click handler
    displayAnswers("answers", currentQuestion.answers, handleAnswerClick);
}

// Function to display content in an element
function displayContent(elementId, content) {
    var element = document.getElementById(elementId);
    
    element.textContent = content;
   
}

// Shows dynamic answers
function displayAnswers(elementId, answerChoices, clickHandler) {
    console.log("Displaying answers: " + answerChoices.join(", "));
    
    // Get the HTML element with the specified ID
    var answersElement = document.getElementById(elementId);
    
    // Clear any existing content in the "answers" element
    answersElement.innerHTML = "";
    
    // Loop through answer choices
    for (var index = 0; index < answerChoices.length; index++) {
        var choice = answerChoices[index];
        
        // Create a dynamic list element
        var choiceElement = document.createElement("li");
        
        // Set the HTML of the list element with the current choice
        choiceElement.textContent = choice.text;
        
        // User click will be handled
        choiceElement.addEventListener("click", clickHandler);
        
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
    var currentQuestion = questions[currentQuestionIndex];
    var selectedAnswerText = event.target.textContent;

    var correctAnswer = currentQuestion.answers.find(answer =>answer.correct)


    if (selectedAnswerText === correctAnswer.text) {
        console.log("Correct answer selected!");
        currentQuestion.userAnswer = selectedAnswerText;
        // Handle correct answer
    } else {
        console.log("Incorrect answer selected!");
        currentQuestion.userAnswer = selectedAnswerText;
        timerCount -= 10;
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
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    