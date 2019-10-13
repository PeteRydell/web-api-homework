
//NavBar
var ticker = document.getElementById("ticker");
var viewScores = document.getElementById("viewScores");
var navBar = document.getElementById("navbar");
var quizCard = document.getElementById("quizCard");

navBar.onclick = function(){
    var element = event.target;
    var elementType = element.getAttribute("data-btnType");
    if (elementType == "viewScores"){
        clearScreen();
        renderHighScores();
    }
};

//Quiz Card Values
var cardTitle = document.createElement("h3");
var questionText = document.createElement("p");
var startQuiz = document.createElement("button");
var initsEl = document.createElement("input");
var initsSub = document.createElement("button");
var scoreLi = document.createElement("ul");
var returnBtn = document.createElement("button");;
var resetBtn = document.createElement("button");
var questionPose = document.createElement("h5");
var optionOne = document.createElement("button");
var optionTwo = document.createElement("button");
var optionThree = document.createElement("button");
var optionFour = document.createElement("button");

var scoreTrack = 0;
var questionArr = 0;
var questionNum = 1;
var score = 0;
var denTimer = 75;
var timerCount

var scores = JSON.parse(localStorage.getItem("score"));

quizCard.onclick = function() {
    var element = event.target;

    if (element.matches("button") === true) {
    
        var buttonType = element.getAttribute("data-btnType");

        if (buttonType == "start"){ 

            startTimer();
            console.log("Start button Pressed");
            console.log("Current Scores Array: " + scores )
            clearScreen(); 
            quizCard.setAttribute("class","col-md-6") 
            renderQuestion(questionArr); 
        }

        if (buttonType == "optionOne" || buttonType == "optionTwo" || buttonType == "optionThree" || buttonType == "optionFour"){

            if(denTimer < 1) {
                denTimer = 0;
                ticker.textContent = "Time: " + denTimer;
                viewFinalScore();
            }

            if(questionNum < questions.length){

                var answerIndex = element.getAttribute("data-answerIndex");
                var userAnswer = questions[questionArr].choices[answerIndex];
                var questionAnswer = questions[questionArr].answer;

                if (userAnswer == questionAnswer){
                    scoreTrack = scoreTrack + 10;
                }
                if(userAnswer != questionAnswer){
                    if(scoreTrack > 0 ){
                        scoreTrack = scoreTrack - 10;
                    }
                    denTimer = denTimer - 10;
                    ticker.textContent = "Time: " + denTimer;
                }

                clearScreen(); 
                questionArr++; 
                questionNum++;
                renderQuestion(questionArr); 
            }
            else{
                console.log("viewFinalScore");
                viewFinalScore();
                console.log("View final scores");
            }
        }

        // If button is the Go Back button
        if (buttonType == "goBack"){
            console.log("Back Button Pressed");
            clearScreen();

            // Resets all gloval variables back to start
            questionArr = 0;
            questionNum = 1;
            score = 0;
            denTimer = 75;
            ticker.textContent = "Time: " + denTimer;

            //start the first page.
            start();
        }

        // If button is the submit button on
        if (buttonType == "initsSub"){
            console.log("Submit Button Press");
            console.log("recordScore");
            recordScore(); // Records the score
            console.log("Clear Screen");
            clearScreen(); // Clears the screen
            console.log("Render Scores");
            renderHighScores(); // renders all the scores from local storage
        }

        if (buttonType == "clearScores"){
            scores = []; // clears score array;
            localStorage.clear(); // clears the local storage
            renderHighScores(); // rerenders the scores
        }

        console.log(scoreTrack);
    }
};

