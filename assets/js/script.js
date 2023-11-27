//HTML References
var startButton = document.getElementById("start-quiz");
var timerElement = document.getElementById("timer");
var answersElement = document.getElementById("answers");
var retakeButton = document.getElementById("reset-button");
var clearScoresButton = document.getElementById("clearscoresbutton");
var showHighScoresButton = document.getElementById("showHighScores")
//Timer Variables
var timer;
var startingTimerCount = 60;
var timerCount = startingTimerCount;
//Tracks current question starting with first question
var currentQuestionIndex = 0;
//Tracks whether quiz has been completed 
var quizCompleted = false
var userInitials = null;
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
    //Reference to quiz container which holds all dynamic questions and answers
    var quizContainer = document.getElementById("quiz-container");
    //Initially hidden before the quiz starts
    quizContainer.style.display = "none";   
    // Hide the start screen once quiz begins
    document.getElementById("start-screen").style.display = "none";
    // Show the quiz container to show quiz elements
    document.getElementById("quiz-container").style.display = "block";
    //start quiz timer
    startTimer()
    // Start displaying questions
    displayQuestion();
}

// Displays the current question
function displayQuestion() {
    //Retrieve current question based on the question index
    var currentQuestion = questions[currentQuestionIndex];
    // Display dynamic question
    displayContent("questions", currentQuestion.question);
    // Display dynamic answers with a click handler
    displayAnswers("answers", currentQuestion.answers, handleAnswerClick);
}
// Function to display content in an element
// -elementId: ID o the html element where content will be displayed
//-content: The text content to be displayed in a specific element
function displayContent(elementId, content) {
    //Get html element with specific ID
    var element = document.getElementById(elementId);
    //set text content to the provided content
    element.textContent = content;
}
//Displays dynamic answer choices in the html element
//element Id: ID of the html element where answers will be displayed
//answerChoices: an array of objects representing answer choices
//clickHandler: event handler for user interaction with choices
function displayAnswers(elementId, answerChoices, clickHandler) {

    // Get the HTML element with the specified ID
    var answersElement = document.getElementById(elementId);
    //clear and replace array of answers from previous question
    answersElement.textContent = "";

    // Loop through answer choices
    for (var index = 0; index < answerChoices.length; index++) {
        var choice = answerChoices[index];    
        // Create a dynamic list element for current answers choices
        var choiceElement = document.createElement("li");
        // Set the text content of the list element for current choice
        choiceElement.textContent = choice.text;
        // User click will be handled
        choiceElement.addEventListener("click", clickHandler);
        // Append the list element to the "answers" element
        answersElement.appendChild(choiceElement);
    }
}
//Displays feedback based on users answer to current question
function showQuestionFeedback() {
    //Current question object
    var currentQuestion = questions[currentQuestionIndex - 1];
    //Find the correct answer for current question
    var correctAnswer = findCorrectAnswer(currentQuestion.answers);
    //User's answer to current question
    var userAnswer = currentQuestion.userAnswer;
    //html element where feedback is displayed
    var feedbackMessage = document.getElementById("feedback-message");
    //Check if the user's answer matches the correct answer
    if (userAnswer === correctAnswer.text) {
        feedbackMessage.textContent = "Correct!";
    } else {
        feedbackMessage.textContent = "Incorrect.";
    }
}
//Displays a feedback message in the designated html element
function displayFeedbackMessage(message) {
    //html element where feedback will be displayed
    var feedbackElement = document.getElementById("feedback-message");
    //set content to a message the user will see
    feedbackElement.textContent = message;
    // Clear the feedback message after a 1 second delay
    setTimeout(function () {
        feedbackElement.textContent = "";
    }, 1000);
}

//Will find the correct answer in each set of answers
function findCorrectAnswer(answers){
    return answers.find(answer => answer.correct);
}

//Handles the click event when any answer is selected
function handleAnswerClick(event) {
    //Check if there are more questions to be displayed
    if(currentQuestionIndex < questions.length){
    //Current Question
    var currentQuestion = questions[currentQuestionIndex];
    //Text content of the selected answer
    var selectedAnswerText = event.target.textContent;
    //Find the correct answer for the current question
    var correctAnswer = findCorrectAnswer(currentQuestion.answers)
    //Handles correct answer
    if (selectedAnswerText === correctAnswer.text) {
        displayFeedbackMessage("Correct");
        //Records users answers
        currentQuestion.userAnswer = selectedAnswerText;
    //Handles incorrect answer with a penalty of -10 seconds
    } else {
        displayFeedbackMessage("Incorrect");
        //Record users answer
        currentQuestion.userAnswer = selectedAnswerText;
        timerCount -= 10;
    }
    // Move to the next question or end the quiz if there are no more questions
    currentQuestionIndex++;
    //Check if there are more questions to display
    if (currentQuestionIndex < questions.length) {
        //If yes, display question
        displayQuestion();
    } else {
        showQuestionFeedback();
        //If no more questions, show feedback and end quiz after 1 second delay
        setTimeout(endQuiz, 1000);
        }
    }
}
//Quiz has ended, final score displayed 
function endQuiz() {
    //Users score is based on remaining timerCount
    var userScore = timerCount;
    //Update Leader board if user qualifies 
    updateLeaderBoard(userScore);
    //Display score on the final screen
    displayFinishScreen(userScore);
    //stop the timer
    clearInterval(timer);
    //boolean value indicating quiz is over
    quizCompleted = true
 }
//Updates the leader board if user qualifies 
function updateLeaderBoard(userScore){
    // Check if user initials are already set
    if (userInitials === null || userInitials === "") {
         // Prompts user to enter their first name or initials
        userInitials = prompt("Enter your first name or enter your initials");

    // If users click OK with an empty string, they will be prompted until they fill in the field
    if (userInitials === "") {
        alert("Please enter your first name or initials");
        // Recursive call to prompt again
        updateLeaderBoard(userScore);
    }
    }
    //leader board credentials
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
//Displays the final screen with the users score
function displayFinishScreen(userScore){
    //Reference to the high scores link
    var showHighScores= document.getElementById("showHighScores");
    //Allows user to click on the link and be taken to the high scores screen
    showHighScores.addEventListener("click", displayHighScores);
     // Check if the element exists before adding the event listener
    
    //Hide the quiz container and show the "finish" screen
    var quizContainer = document.getElementById("quiz-container");
    quizContainer.style.display = "none";

    var finishScreen = document.getElementById("finish-screen");
    finishScreen.style.display = "block";
    //Shows the user what their score is
    var resultMessage = document.getElementById("result-message");
    resultMessage.innerText = "Your Score is: " + userScore;
}

function displayHighScores(event){
     //html references
     var highScoresList = document.getElementById("highScoresList");
     var highScoresScreen = document.getElementById("highScoresScreen");
     var quizContainer = document.getElementById("quiz-container");
     var finishScreen = document.getElementById("finish-screen");
     //Retrieve high scores from local storage or initialize an empty array if there are no scores
     var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    // Sort scores from highest to lowest
    highScores.sort((a, b) => b.score - a.score); 
    // Clear any existing content
    highScoresList.innerHTML = ""
    //Determined number of scores to display (10 max)
    var numberOfScoresToDisplay = Math.min(highScores.length, 15);

    // Use a for loop to iterate through highScores
    for (var i = 0; i < numberOfScoresToDisplay; i++) {
        var score = highScores[i];
        var listItem = createScoreListItem(score, i);
        highScoresList.appendChild(listItem);
    }
    // Show the high scores screen and hide the other screens
    highScoresScreen.style.display = "block";
    quizContainer.style.display = "none";
    finishScreen.style.display = "none";
}       

    // Create a button to go back to the final screen from high scores list
    var backButton = document.createElement("button");
    backButton.textContent = "Back";
    //add event listener to make button interactive
    backButton.addEventListener("click", function () {
    //references to high scores screen and finish screen elements
    var highScoresScreen = document.getElementById("highScoresScreen");
    var finishScreen = document.getElementById("finish-screen");
    //If button is clicked...hide the high scores screen and go back to previous screen
    highScoresScreen.style.display = "none";
    finishScreen.style.display = "block";
    });

    // Append the back button to the high scores screen
    highScoresScreen.appendChild(backButton);   

// Function to create a list item for a high score
 function createScoreListItem(score, index) {
        //Create new list item 
         var listItem = document.createElement("li");
         //String representing a users rank, name, and score
         listItem.textContent = (index + 1) + ". " + score.name + ": " + score.score
        return listItem;      
}
// Call the function to display high scores
function showHighScores() {
    displayHighScores();
}

//Function to reset quiz
function resetQuiz() {
    clearInterval(timer);
    timerCount = startingTimerCount;
    timerElement.textContent = timerCount;
    //variable preventing user from checking high scores during the quiz
    quizCompleted = false
    //reset to null so user has to be enter initials if they retake the quiz
    userInitials = null 
    //reset the question index and timer count if user chooses to retake the quiz
    currentQuestionIndex = 0;

    // Iterate over each question and reset userAnswer 
    for (var i = 0; i < questions.length; i++) {
        questions[i].userAnswer = null;
    }

    startQuiz();
    document.getElementById("finish-screen").style.display = "none";
}
    //Retrieve button element   
    var retakeButton = document.getElementById("reset-button");
    //Add event listener to make button interactive 
    retakeButton.addEventListener("click", function () {
        // Handle the click event for the retake button
        resetQuiz();
    });
    //Retrieve the button element
    var clearScoresButton = document.getElementById("clearscoresbutton");
    //Add event listener to the clear scores button to handle click event
    clearScoresButton.addEventListener("click", function() {
        // Remove high scores from local storage
        localStorage.removeItem("highScores");
        //reload page to show changes
        location.reload();
});

    
    
    
    
    
    
