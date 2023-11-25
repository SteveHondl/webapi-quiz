//HTML References
var startButton = document.getElementById("start-quiz");
var timerElement = document.getElementById("timer");
var answersElement = document.getElementById("answers");
//Timer Variables
var timer;
var timerCount = 60;
//Tracks current question starting with first question
var currentQuestionIndex = 0;
//Initialize Quiz Questions 
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
        },
        {
            question: "In what year was JavaScript invented according to Google?",
            answers: [
                { text: "1994", correct: false },
                { text: "1995", correct: true },
                { text: "1996", correct: false },
                { text: "2000", correct: false },
            ],
        },
        {
            question: "What was the original name of JavaScript?",
            answers: [
                { text: "Latte", correct: false },
                { text: "Chai tea", correct: false },
                { text: "Mocha", correct: true },
                { text: "Cappuccino", correct: false },
            ],
        },
        {
            question: "Which of the following items does not involve the use of JavasScript?",
            answers: [
                {text: "VideoGame Development", correct: false},
                {text: "Online Shopping", correct: false},
                {text: "Checking the score of the Super Bowl on your phone", correct: false},
                {text: "Parallel parking your vehicle", correct: true},
            ],
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
        timerCount -=1;
        
        // Display the updated timer count
        timerElement.textContent = timerCount;
        
        // Check if the timer has reached 0
        if (timerCount <= 0) {
            // End the quiz if the timer has reached 0
            endQuiz();
        }
    // Update the timer every 1000 milliseconds (1 second)
    }, 1000);
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

    // Get the HTML element with the specified ID
    var answersElement = document.getElementById(elementId);

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
        // // Clear any existing content in the "answers" element
    }
}

function showQuestionFeedback() {
    var currentQuestion = questions[currentQuestionIndex - 1];
    var correctAnswer = findCorrectAnswer(currentQuestion.answers);
    var userAnswer = currentQuestion.userAnswer;

    var feedbackMessage = document.getElementById("feedback-message");

    if (userAnswer === correctAnswer.text) {
        feedbackMessage.textContent = "Correct!";
    } else {
        feedbackMessage.textContent = "Incorrect.";
    }
}
function displayFeedbackMessage(message) {
    var feedbackElement = document.getElementById("feedback-message");
    feedbackElement.textContent = message;

    // Clear the feedback message after a brief delay
    setTimeout(function () {
        feedbackElement.textContent = "";
    }, 1000);
}

//will find the correct answer in each set of answers
function findCorrectAnswer(answers){
    return answers.find(answer => answer.correct);
}

//handles the click even when any answer is selected
function handleAnswerClick(event) {
    if(currentQuestionIndex < questions.length){
    var currentQuestion = questions[currentQuestionIndex];
    var selectedAnswerText = event.target.textContent;

    var correctAnswer = findCorrectAnswer(currentQuestion.answers)

    //Handles correct answer
    if (selectedAnswerText === correctAnswer.text) {
        displayFeedbackMessage("Correct");
        currentQuestion.userAnswer = selectedAnswerText;
    //Handles incorrect answer with a penalty of -10
    } else {
        displayFeedbackMessage("Incorrect");
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

        showQuestionFeedback();
        //if no more questions, end quiz

        setTimeout(endQuiz, 1000);

        
        }
    }
}

//Quiz has ended, final score displayed 
function endQuiz() {
        // Calculate the number of correct answers
        // var correctAnswers = totalNumberOfCorrectAnswers();
        var userScore = timerCount;
        
        updateLeaderBoard(userScore);

        displayFinishScreen(userScore);
        
        clearInterval(timer);
        
    }
function totalNumberOfCorrectAnswers(){
        var correctAnswers = 0
    
    // Loop through all questions and check if the user's answer matches the correct answer
    for (var i = 0; i < questions.length; i++) {
        var correctAnswer = findCorrectAnswer(questions[i].answers);
        if (questions[i].userAnswer === correctAnswer.text) {
            correctAnswers++;
        }
    }
    return correctAnswers
}
        
function updateLeaderBoard(userScore){
    
    //prompts user to enter their initials 
    var userInitials = prompt("Enter your first name or enter your initials");
    //if users clicks ok with an empty string, they will be prompted until they fill in the field
    if (userInitials === ""){
        alert("please enter your first name or initials");
        updateLeaderBoard(userScore);
    }
    //leader-board credentials
    var leaderBoard = {
        name: userInitials,
        score: userScore    
    };

    //retrieve high score from local storage OR initialize an empty array
    var userScores = JSON.parse(localStorage.getItem("highScores")) || [];
    //add new entry to the leader board
    userScores.push(leaderBoard);
    //save the updated high scores to local storage
    localStorage.setItem("highScores", JSON.stringify(userScores));
}

function displayFinishScreen(userScore){
        // Display the finish screen with the number of correct answers
        var quizContainer = document.getElementById("quiz-container");
        quizContainer.style.display = "none";
        
        var finishScreen = document.getElementById("finish-screen");
        finishScreen.style.display = "block";
        
        var resultMessage = document.getElementById("result-message");
        resultMessage.innerText = "Your Score is: " + userScore;

        var existingRetakeButton = document.getElementById("reset-button");

    if (!existingRetakeButton) {
         // Create a button element for retaking the quiz
         var retakeButton = document.createElement("button");
         retakeButton.textContent = "Retake Quiz";
        retakeButton.id = "reset-button"; // Set the id for easy retrieval
        retakeButton.addEventListener("click", function () {
        // Handle the click event for the retake button
        resetQuiz();
    });

        // Append the retake button to the finish screen
        finishScreen.appendChild(retakeButton);

    }
}


    
    var highScoresLink = document.getElementById("highScoresLink");
    
    highScoresLink.addEventListener("click", displayHighScores);
    
function displayHighScores(){
        var highScoresList = document.getElementById("highScoresList");
        var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
       // Sort scores in descending order
        highScores.sort((a, b) => b.score - a.score); 
        
        console.log("Local Storage Content (Before Update):", localStorage);
        // Clear any existing content
        highScoresList.innerHTML = "";
        
        var numberOfScoresToDisplay = Math.min(highScores.length, 15);

        // Use a for loop to iterate through highScores
        for (var i = 0; i < numberOfScoresToDisplay; i++) {
            var score = highScores[i];
            var listItem = createScoreListItem(score, i);
            highScoresList.appendChild(listItem);
        }
        // Show the high scores screen
        var highScoresScreen = document.getElementById("highScoresScreen");
        highScoresScreen.style.display = "block";
    
        // Hide other screens if needed
        var quizContainer = document.getElementById("quiz-container");
        quizContainer.style.display = "none";
    
        var finishScreen = document.getElementById("finish-screen");
        finishScreen.style.display = "none";
    
        // Log the updated content in localStorage
        console.log("Local Storage Content (After Update):", localStorage);
    
    };
    
    // Function to create a list item for a high score
    function createScoreListItem(score, index) {
         var listItem = document.createElement("li");
         listItem.textContent = `${index + 1}. ${score.name}: ${score.score}`;
        return listItem;      
}

function resetQuiz() {
    // Reset variables and state to start the quiz again
    currentQuestionIndex = 0;
    timerCount = 100;

    // Iterate over each question and reset userAnswer to null
    for (var i = 0; i < questions.length; i++) {
        questions[i].userAnswer = null;
    }

    // Start the quiz again
    startQuiz();
}
    
var retakeButton = document.getElementById("reset-button");

retakeButton.addEventListener("click", function () {
    // Handle the click event for the retake button
    resetQuiz();
});

var clearScoresButton = document.getElementById("clearScoresButton");

clearScoresButton.addEventListener("click", function() {
    // Remove high scores from local storage
    localStorage.removeItem("highScores");
 
    location.reload();
});

    
    
    
    
    
    
