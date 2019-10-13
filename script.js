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

var navigation = document.getElementById("nav");
var questionPose = document.createElement("h3");
var descriptionEl = document.createElement("p");
var startEl = document.createElement("button");
var initialsEl = document.createElement("input");
var initialsSub = document.createElement("button");
var highScore = document.createElement("ul");
scoreList.setAttribute("class", "list-group");
var returnBtn = document.createElement("button");;
var clearBtn = document.createElement("button");
var scores = JSON.parse(localStorage.getItem("score"));
var quizScore = 0;
var questionEl = document.createElement("h3");
var optionOne = document.createElement("button");
var optionTwo = document.createElement("button");
var optionThree = document.createElement("button");
var optionFour = document.createElement("button");
var quizEl = document.getElementById("quizForm");
var timeEl = document.getElementById("timer");
var viewScores = document.getElementById("viewScores");

var questionIndex = 0;
var questionNo = 1;
var score = 0;
var secondsLeft = 75;

navigation.addEventListener("click", function(){
    var highScore = event.target;
    var elementType = highScore.getAttribute("data-btnType");
    if (elementType == "viewScores"){
        clearScreen();
        renderHighScores();
    }
})

function start(){

    quizEl.setAttribute("class","col-lg-10 text-center")

    questionPose.textContent = "Code Quiz Challenge";
    questionPose.setAttribute("class","text-center");
    quizEl.appendChild(questionPose);

    descriptionEl.textContent = "Answer as many questions correctly as possible within the allotted time. Any questions not answered correctly will deduct time. Good luck!";
    quizEl.appendChild(descriptionEl);

    startButton.innerHTML = "Start!";
    startButton.setAttribute("type", "button");
    startButton.setAttribute("class","btn btn-primary mb-1");
    startButton.setAttribute("id","startButton");
    startButton.setAttribute("data-btnType", "start")
    quizEl.appendChild(startButton);
};

quizEl.addEventListener("click", function(event) {
    var answer = event.target;

    if (answer.matches("button") === true) {
      
        var buttonType = answer.getAttribute("data-btnType");

        if (buttonType == "start"){

            startTimer();
            clearScreen(); 
            quizEl.setAttribute("class","col-md-10 pt-2") 
            renderQuestion(questionIndex);
        }

        if (buttonType == "optionOne" || buttonType == "optionTwo" || buttonType == "optionThree" || buttonType == "optionFour"){

            if(secondsLeft < 1) {
                secondsLeft = 0;
                timeEl.textContent = "Time: " + secondsLeft;
                viewFinalScore();
            }

            if(questionNo < questions.length){
                var answerIndex = element.getAttribute("data-answerIndex");
                var userAnswer = questions[questionIndex].choices[answerIndex];
                var questionAnswer = questions[questionIndex].answer;

                if (userAnswer == questionAnswer){
                    quizScore = quizScore + 10;
                }
                if(userAnswer != questionAnswer){
                    if(quizScore > 0 ){
                        quizScore = quizScore - 10;
                    }
                    secondsLeft = secondsLeft - 10;
                    timeEl.textContent = "Time: " + secondsLeft;
                }

                clearScreen(); 
                questionIndex++; 
                questionNo++;
                renderQuestion(questionIndex); 
            }
            else{ 
                viewFinalScore();
            }
        }

        if (buttonType == "goBack"){
            clearScreen();
            questionIndex = 0;
            questionNo = 1;
            score = 0;
            secondsLeft = 75;
            timeEl.textContent = "Time: " + secondsLeft;
            start();
        }

        if (buttonType == "initialsSubmit"){
            recordScore();
            clearScreen();
            renderHighScores();
        }

        if (buttonType == "clearScores"){
            scores = []; 
            localStorage.clear();
            renderHighScores();
        }

        console.log(quizScore);
    }
});
