//HTML References
var startButton = document.getElementById("start-quiz");
var timerElement = document.getElementById("timer");
var answersElement = document.getElementById("answers");
//Timer Variables
var timer;
var timerCount = 100;
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
        timerCount -=5;
        
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
    console.log("Displaying answers: " + answerChoices.join(", "));
    
    // Get the HTML element with the specified ID
    var answersElement = document.getElementById(elementId);
    
    // // Clear any existing content in the "answers" element
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
//will find the correct answer in each set of answers
function findCorrectAnswer(answers){
    return answers.find(answer => answer.correct);
}

//handles the click even when any answer is selected
function handleAnswerClick(event) {
    var currentQuestion = questions[currentQuestionIndex];
    var selectedAnswerText = event.target.textContent;

    var correctAnswer = findCorrectAnswer(currentQuestion.answers)

    //Handles correct answer
    if (selectedAnswerText === correctAnswer.text) {
        console.log("Correct answer selected!");
        currentQuestion.userAnswer = selectedAnswerText;
    //Handles incorrect answer with a penalty of -10
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
//Quiz has ended, final score displayed 
function endQuiz() {
        // Calculate the number of correct answers
        var correctAnswers = 0;
        var userScore = timerCount;
    
        
        // Loop through all questions and check if the user's answer matches the correct answer
        for (var i = 0; i < questions.length; i++) {
            var correctAnswer = findCorrectAnswer(questions[i].answers);
            if (questions[i].userAnswer === correctAnswer.text) {
                correctAnswers++;
            }
        }
        //prompts user to enter their initials 
        var userInitials = prompt("Enter your initials");
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
        
        // Display the finish screen with the number of correct answers
        var quizContainer = document.getElementById("quiz-container");
        quizContainer.style.display = "none";
        
        var finishScreen = document.getElementById("finish-screen");
        finishScreen.style.display = "block";
        
        var resultMessage = document.getElementById("result-message");
        resultMessage.innerText = "Your Score is: " + userScore;
        
        clearInterval(timer);
        
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

    
    
    
    
    
    
    
    
