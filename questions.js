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

var questionArr = 0;
var questionNum = 1;
var score = 0;
var denTimer = 75;
var timerCount

var qPose = document.createElement("h3");
var questionText = document.createElement("p");
var startQuiz = document.createElement("button");
var initsEl = document.createElement("input");
var initsSub = document.createElement("button");
var scoreLi = document.createElement("ul");
scoreLi.setAttribute("class", "list-group");
var returnBtn = document.createElement("button");;
var resetBtn = document.createElement("button");

var scoreTrack = 0;

var questionPose = document.createElement("h5");
var optionOne = document.createElement("button");
var optionTwo = document.createElement("button");
var optionThree = document.createElement("button");
var optionFour = document.createElement("button");

var quizCard = document.getElementById("quizCard");
var ticker = document.getElementById("ticker");
var viewScores = document.getElementById("viewHighScores");
var navBar = document.getElementById("navbar");
var row1 = document.createElement("div");
row1.setAttribute("class", "row");
var row2 = document.createElement("div");
row2.setAttribute("class", "row");
var row3 = document.createElement("div");
row3.setAttribute("class", "row");
var col1 = document.createElement("div");
var col2 = document.createElement("div");
var col3 = document.createElement("div");

var scores = JSON.parse(localStorage.getItem("score"));


//************************ FUNCTIONS & EVENT LISTENSERS ************************

// Event Listenser for Navigation bar
navBar.addEventListener("click", function(event){
    var element = event.target;
    var elementType = element.getAttribute("data-btnType");
    if (elementType == "viewHighScores"){
        clearScreen(); // Clears the screen
        renderHighScores(); // renders all the scores from local storage
    }
})

// Event Listener for Quiz Area
quizCard.addEventListener("click", function(event) {
    var element = event.target;

    // If that element is a button...
    if (element.matches("button") === true) {
      
        // Check what type of button it is. Start button, Answer Button, etc.
        var buttonType = element.getAttribute("data-btnType");

        if (buttonType == "start"){ // If button is the start button

            startTimer();
            console.log("Start button Pressed");
            console.log("Current Scores Array: " + scores )
            clearScreen(); // Clears the screen
            quizCard.setAttribute("class","col-md-6 pt-2") // removed center alignment
            renderQuestion(questionArr); // Renders first question
        }

        // If the button is an answer from a question
        if (buttonType == "optionOne" || buttonType == "optionTwo" || buttonType == "optionThree" || buttonType == "optionFour"){

            // Will clear if seconds ever reached less than 1 second after an answer press
            if(denTimer < 1) {
                denTimer = 0;
                ticker.textContent = "Time: " + denTimer;
                viewFinalScore();
            }

            console.log("Question Number: " + questionNum);
            console.log("Question Lenth: " + questions.length)
            if(questionNum < questions.length){
                // calls Answer Index from answers, and calls question answer
                var answerIndex = element.getAttribute("data-answerIndex");
                var userAnswer = questions[questionArr].choices[answerIndex];
                var questionAnswer = questions[questionArr].answer;

                console.log("Answer Index: " + answerIndex);
                console.log("User Answer: " + userAnswer);
                console.log("Question Answer: " + questionAnswer);

                // Compares user answer and question answer
                if (userAnswer == questionAnswer){
                    console.log("CORRECT");
                    // Add points if correct
                    scoreTrack = scoreTrack + 10;
                }
                if(userAnswer != questionAnswer){
                    console.log("WRONG");
                    if(scoreTrack > 0 ){
                        console.log("WRONG");
                        scoreTrack = scoreTrack - 10;
                    }
                    denTimer = denTimer - 10;
                    ticker.textContent = "Time: " + denTimer;
                }

                clearScreen(); // clears screen
                questionArr++; //goes to next question
                questionNum++;
                renderQuestion(questionArr); // renders question
            }
            else{ // Will view final score once it reaches end of the questions array
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
});

// Function for Start Screen
function start(){

    // Setting all elements wthin Quiz Area
    quizCard.setAttribute("class","col-md-6 text-center pt-2")

    // Title
    qPose.textContent = "Code Quiz Challenge";
    qPose.setAttribute("class","text-center");
    quizCard.appendChild(qPose);

    // Descroption
    questionText.textContent = "Answer as many questions correctly as possible within the allotted time. Any questions not answered correctly will deduct time. Good luck!";
    quizCard.appendChild(questionText);

    //Start Button
    startQuiz.innerHTML = "Start!";
    startQuiz.setAttribute("type", "button");
    startQuiz.setAttribute("class","btn btn-primary mb-1");
    startQuiz.setAttribute("id","startQuiz");
    startQuiz.setAttribute("data-btnType", "start")
    quizCard.appendChild(startQuiz);
};

// Function to degenerate question
function renderQuestion(num){

    // Display Question        
    questionPose.textContent = questions[num].title;
    questionPose.setAttribute("class", "m-2")
    quizCard.appendChild(questionPose);


    console.log(questions[0].title);
    console.log(questions[0].choices[0])
    console.log(brEl);

    // Display First Answer
    optionOne.textContent = "1. " + questions[num].choices[0];
    optionOne.setAttribute("type", "button");
    optionOne.setAttribute("class","btn btn-primary mb-1");
    optionOne.setAttribute("data-btnType", "optionOne");
    optionOne.setAttribute("data-answerIndex", "0")
    quizCard.appendChild(optionOne);
    quizCard.appendChild(brEl.cloneNode());
    
    // Display Second Answer
    optionTwo.textContent = "2. " + questions[num].choices[1];
    optionTwo.setAttribute("type", "button");
    optionTwo.setAttribute("class","btn btn-primary mb-1");
    optionTwo.setAttribute("data-btnType", "optionTwo");
    optionTwo.setAttribute("data-answerIndex", "1")
    quizCard.appendChild(optionTwo);
    quizCard.appendChild(brEl.cloneNode());

    // Display third Answer
    if (questions[num].choices[2] != undefined){ // If third choice does not exist
        optionThree.textContent = "3. " +  questions[num].choices[2];
        optionThree.setAttribute("type", "button");
        optionThree.setAttribute("class","btn btn-primary mb-1");
        optionThree.setAttribute("data-btnType", "optionThree");
        optionThree.setAttribute("data-answerIndex", "2")
        quizCard.appendChild(optionThree);
        quizCard.appendChild(brEl.cloneNode());
    };

    // Display Forth Answer
    if (questions[num].choices[3] != undefined){ // If forth choice does not exist
        optionFour.textContent = "4. " +  questions[num].choices[3];
        optionFour.setAttribute("type", "button");
        optionFour.setAttribute("class","btn btn-primary mb-1");
        optionFour.setAttribute("data-btnType", "optionFour");
        optionFour.setAttribute("data-answerIndex", "3")
        quizCard.appendChild(optionFour);
        quizCard.appendChild(brEl.cloneNode());
    };

};

// View final Score and input initials after end of quiz
function viewFinalScore(){

    // Clears screen of any elements
    clearScreen();

    // Setting all elements wthin Quiz Area
    quizCard.setAttribute("class","col-md-6 text-center pt-2")

    // Title
    qPose.textContent = "FINISHED!";
    qPose.setAttribute("class","text-center");
    quizCard.appendChild(qPose);

    
    questionText.textContent = "Your Score: " + scoreTrack; // SCORE GOES HERE
    quizCard.appendChild(questionText);
    initsEl.setAttribute("class", "form-control mb-2");
    initsEl.setAttribute("placeholder", "Enter Initials");

    // Bootstrap layout for Initals form to be responsive
    quizCard.appendChild(row1);
    col1.setAttribute("class", "col-sm-3")
    col2.setAttribute("class", "col-sm-6")
    col3.setAttribute("class", "col-sm-3")
    row1.appendChild(col1);
    row1.appendChild(col2);
    row1.appendChild(col3);
    col2.appendChild(initsEl);
 
    // Submit Initials button
    initsSub.innerHTML = "Submit";
    initsSub.setAttribute("type", "button");
    initsSub.setAttribute("class","btn btn-primary my-1");
    initsSub.setAttribute("id","initsSub");
    initsSub.setAttribute("data-btnType", "initsSub");
    quizCard.appendChild(initsSub);
};

// Function to view all scores
function renderHighScores(){
    console.log("Scores array before render: " +scores);
    // Clears the quiz area.
    clearScreen();
    
    // Title for High Scores Screen
    qPose.textContent = "High Scores";
    qPose.setAttribute("class","text-center mb-3");
    quizCard.appendChild(qPose);

    // Append the List
    quizCard.appendChild(scoreLi);

    // Get stored scores from localStorage
    // Parsing the JSON string to an object

    // Render a new li for each score
    for (var i = 0; i < scores.length; i++) {
        console.log("li: " + i)
        let score = scores[i];
        console.log("score :" + score)
        console.log("scores[i]: " + scores[i])
        // Creates a list item with score with boostrap attributes
        var li = document.createElement("li");
        li.textContent = score.initials + " - " + score.score;
        li.setAttribute("class", "list-group-item");

        // Appends the list items
        scoreLi.appendChild(li);
        console.log("li: " + li);
    }

    returnBtn.innerHTML = "Go Back";
    returnBtn.setAttribute("type", "button");
    returnBtn.setAttribute("class","btn btn-primary m-2");
    returnBtn.setAttribute("id","returnBtn");
    returnBtn.setAttribute("data-btnType", "goBack")
    //quizCard.appendChild(returnBtn);

    resetBtn.innerHTML = "Clear High Scores";
    resetBtn.setAttribute("type", "button");
    resetBtn.setAttribute("class","btn btn-primary m-2");
    resetBtn.setAttribute("id","resetBtn");
    resetBtn.setAttribute("data-btnType", "clearScores")
    //quizCard.appendChild(resetBtn);

    // Using Bootstrap layout for repsonsiveness
    quizCard.appendChild(row2);
    row2.appendChild(col1);
    col1.setAttribute("class", "col-sm-12")
    col1.appendChild(returnBtn);
    col1.appendChild(resetBtn);
    console.log("Scores array after render: " +scores);
    localStorage.setItem("score", JSON.stringify(scores));
};

// function for timer
function startTimer(){

    timerCount = setInterval(function() {
        denTimer--;
        ticker.textContent = "Time: " + denTimer; // updates timer div
    
        // Break out of the timer if seconds left reaches less that 0
        if(denTimer < 1) {
          clearInterval(timerCount);
          denTimer = 0;
          ticker.textContent = "Time: " + denTimer;
          viewFinalScore();
        }
    
    }, 1000);
};

// Function to record the score from the game to all scores
function recordScore(){

    // clears screen of any elements
    clearScreen();
    
    // sets all references to local variables to use
    var initial = initsEl.value;
    var uscore = scoreTrack;
    var pushScore = {initials: initial, score: uscore};

    console.log(initsEl);
    console.log("Initial: " + initial);
    console.log("uscore: " + uscore);
    console.log("pushScore: " + pushScore);
    console.log("Scores Gobal Varible: " + scores)

    // pushes the score object into the scores array
    scores.push(pushScore);
    console.log("Local Scores array after push: " + scores);

    // Stores the scores array in local storage
    localStorage.setItem("score", JSON.stringify(scores));

    // Resets values in initsEl and scoreTrack back to 0
    initsEl.value = "";
    scoreTrack = 0;

};

// Function to clear all elements within the quiz area for reuse - COMPLETE
function clearScreen(){

    //clears all child nodes in quiz area
    while (quizCard.firstChild) {
        quizCard.removeChild(quizCard.firstChild);
    }

    //clears all child nodes in row1 element
    while(row1.firstChild){
        row1.removeChild(row1.firstChild);
    }

    //clears all child nodes in row2 element
    while(row2.firstChild){
        row2.removeChild(row2.firstChild);
    }

    //clears all child nodes in  scores list element
    while(scoreLi.firstChild){
        scoreLi.removeChild(scoreLi.firstChild);
    }

    //clears all child nodes in col1 element
    while(col1.firstChild){
        col1.removeChild(col1.firstChild);
    }

    //clears all child nodes in col2 element
    while(col2.firstChild){
        col2.removeChild(col2.firstChild);
    }

    //clears all child nodes in col3 element
    while(col3.firstChild){
        col3.removeChild(col3.firstChild);
    }
};


//************************ CODE ************************

// Initializes scores key in local storage for use if null (loads for the first time)
console.log("Scores at start of page: "+ scores)
if (scores == undefined){
    scores = [];
    localStorage.setItem("score", JSON.stringify(scores));
}

// Set timer to 75 in HTML
ticker.textContent = "Time: " + denTimer;

//starts quiz
start();