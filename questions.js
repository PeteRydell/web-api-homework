var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"   
    },
    {
      title: "String numbers must be closed within ____ when being assigned to variables.",
      choices: ["commas", "curly brackets", "quotes", "parentheses"],
      answer: "quotes"   
    },
    {
      title: "A very useful tool used during debugging to printing content to the debugger is ____.",
      choices: ["javascript", "terminal/bash", "for loops", "console log"],
      answer: "console log"   
    },   
  ];


//HTML Elements and IDs
var ticker = document.getElementById("ticker");
var viewScores = document.getElementById("viewScores");
var navBar = document.getElementById("navbar");
var quizCard = document.getElementById("quizCard");
var startEl = document.getElementById("startBtn")

//Additional Variables
var cardTitle = document.createElement("h3");
var questionText = document.createElement("p");
var startQuiz = document.createElement("button");
var initsEl = document.createElement("input");
var initsSub = document.createElement("button");
var scoreLi = document.createElement("ul");
var returnBtn = document.createElement("button");;
var questionPose = document.createElement("h5");
var optionOne = document.createElement("button");
var optionTwo = document.createElement("button");
var optionThree = document.createElement("button");
var optionFour = document.createElement("button");


viewScores.onclick = function(){
    var element = event.target;
    var elementType = element.getAttribute("data-btnType");
    if (elementType == "viewScores"){
        clearScreen();
        renderHighScores();
    }
};

quizCard.addEventListener(click, function(event){
    var element = event.target;
    if(element === "startBtn")
    startTimer();
    clearScreen();

})


function startTimer(){

    timerInterval = setInterval(function() {
        secondsLeft--;
        ticker.textContent = "Time: " + secondsLeft;
    
        if(secondsLeft < 1) {
          clearInterval(timerInterval);
          secondsLeft = 0;
          ticker.textContent = "Time: " + secondsLeft;
          viewFinalScore();
        }
    
    }, 1000);
};

function clearScreen(){

    while (quizCard.firstChild) {
        quizCard.removeChild(quizCard.firstChild);
    };

function renderQuestion(num){
      
    questionText.textContent = questions[num].title;
    questionText.setAttribute("class")
    quizCard.appendChild(questionText);

    optionOne.textContent = "1. " + questions[num].choices[0];
    optionOne.setAttribute("type", "button");
    optionOne.setAttribute("class","btn btn-primary mb-1");
    optionOne.setAttribute("data-btnType", "optionOne");
    optionOne.setAttribute("data-answerIndex", "0")
    quizCard.appendChild(optionOne);
    
    optionTwo.textContent = "2. " + questions[num].choices[1];
    optionTwo.setAttribute("type", "button");
    optionTwo.setAttribute("class","btn btn-primary mb-1");
    optionTwo.setAttribute("data-btnType", "optionTwo");
    optionTwo.setAttribute("data-answerIndex", "1")
    quizCard.appendChild(optionTwo);

    optionThree.textContent = "2. " + questions[num].choices[1];
    optionThree.setAttribute("type", "button");
    optionThree.setAttribute("class","btn btn-primary mb-1");
    optionThree.setAttribute("data-btnType", "optionThree");
    optionThree.setAttribute("data-answerIndex", "1")
    quizCard.appendChild(optionThree);

    optionFour.textContent = "2. " + questions[num].choices[1];
    optionFour.setAttribute("type", "button");
    optionFour.setAttribute("class","btn btn-primary mb-1");
    optionFour.setAttribute("data-btnType", "optionFour");
    optionFour.setAttribute("data-answerIndex", "1")
    quizCard.appendChild(optionFour);

};

//Quiz Score Values
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
                viewFinalScore();
            }
        }

        if (buttonType == "goBack"){

            questionArr = 0;
            questionNum = 1;
            score = 0;
            denTimer = 75;
            ticker.textContent = "Time: " + denTimer;

            start();
        }
        
        if (buttonType == "initsSub"){
            renderHighScores();
        }

        if (buttonType == "clearScores"){
            scores = []; 
            localStorage.clear(); 
            renderHighScores();
        }
    }
}};

