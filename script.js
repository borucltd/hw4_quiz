// =================
// Section variables
// =================

// 5-minutes quiz
let quizTime = 120;

// each wrong answer decreases time by 10 seconds
let decreaseTime = 10;

// total answers, index 0 correct answer, index 1 wrong answer
let totalAnswers = [0, 0];

// timerid
let timerId=0;

// current question number, we start from 0
let currentQuestion = 0;

// questions (some are taken from https://www.guru99.com/javascript-interview-questions-answers.html )
let questionsArray = [
    "What is JavaScript?",
    "Which symbol is used for comments in Javascript?",
    "What is === operator?",
    "How can you increment integer by 5?",
    "What are all the types of Pop up boxes available in JavaScript?",
    "Is JavaScript and older brother to Java?"
]

// total questions
let totalQuestions = questionsArray.length;

// all possible answers, each answer separate by ,
let answersArray = [
    "A - low level programming language,B - subprogram written in Java,C - scripting lanugage for websites,D - hell knows ",
    "A - //,B - *,C - <!--,D - #",
    "A - assingment,B - value comparison,C - type comparison,D - value and type comparison",
    "A - i++,B - i = i + 1,C - i%2,D - you can't do that",
    "A - prompts,B - alerts,C - popup,D - config",
    "A - true,B - false"
]

// correct answers
let correctAnswersArray = [
    "C - scripting lanugage for websites",
    "A - //",
    "D - value and type comparison",
    "A - i++, B - i = i + 1",
    "A - prompts, B - alerts,D - config",
    "B - false"
]

// questions - this is array of objects
let questions = [];
for (let i = 0; i < questionsArray.length; i++){

    // create new object
    let question_object = new question(questionsArray[i],answersArray[i],correctAnswersArray[i]);
    // push new object to array
    questions.push(question_object);

}

//  DOM elements, which will not change, lets select them once ONLY
let lastAnswer = document.querySelector("#lastAnswer");
let summary = document.querySelector("#summary");
let timeLeft = document.querySelector("#timeLeft");
let startButton = document.querySelector("#startButton");
let stopButton = document.querySelector("#stopButton");
let submitButton = document.querySelector("#submitButton");


// =================
// Section functions
// =================

// function which sets page to initial state
function onPageLoad() {
    // set the time
    timeLeft.textContent = quizTime;
    // disable buttons
    stopButton.setAttribute("class","btn btn-dark disabled no-click");
    submitButton.setAttribute("class","btn btn-dark disabled no-click")

    // initiate default values - when we repeat the test
    // 5-minutes quiz
    quizTime = 120;
    decreaseTime = 10;
    totalAnswers = [0, 0];
    timerId=0;
    currentQuestion = 0;

}

function startQuiz() {

    // set time back
    quizTime = 120;
    // disable start button using custom CSS from style.css -> no-click
    startButton.setAttribute("class","btn btn-dark disabled no-click");   
    // enable stop button
    stopButton.setAttribute("class","btn btn-dark active");
    // enable submit button
    submitButton.setAttribute("class","btn btn-dark active");
    // final message

    //start counting
    document.querySelector("#timeLeft").textContent = quizTime;


    timerId = setInterval(function() {
        quizTime--; 
        // need to check <= 0, === 0 is not enough
        if(quizTime <= 0) {
            
            // stop the timer
            clearInterval(timerId);
            stopButton.setAttribute("class","btn btn-dark disabled no-click");
            submitButton.setAttribute("class","btn btn-dark disabled no-click")
            // enable start button
            startButton.setAttribute("class","btn btn-dark")
            displayResult();
        }
        document.querySelector("#timeLeft").textContent = quizTime;       
      }, 1000);
    askQuestion(questions,currentQuestion,true);
    askQuestion(questions,0,false);


}

function stopQuiz() {

    // disable buttons
    startButton.setAttribute("class","btn btn-dark disabled no-click");
    submitButton.setAttribute("class","btn btn-dark disabled no-click");

    // stop timer
    clearInterval(timerId);
    quizTime = 1;
    summary.textContent = "YOU GAVE UP - refresh the page!!!";

}

// This function displays question
// It removes previous question before displaying the new one
function askQuestion( question,  questionNumber, clear) { 
        
    // if clear is false just display new question
    if (clear === false && currentQuestion < totalQuestions) {
        
        // create DOM elements to display actual question
        let questionParagraph = document.createElement("P");  
        let questionText = document.createTextNode(question[questionNumber].question);       
        questionParagraph.appendChild(questionText);
        document.querySelector("#questionSection").appendChild(questionParagraph);

        // create DOM elements to display answers 
        // number of answers is dynamic and depends on the question
        // each answer is a pair of LABEL and CHECKBOX
        for (let i = 0; i < question[questionNumber].choices; i++) {

            // create DOMs
            let answerFormGroup = document.createElement("SECTION");
            let answerCheckBox = document.createElement("INPUT");
            let answerLabel = document.createElement("LABEL");

            // add attributes to DOMs
            answerFormGroup.setAttribute("class","form-group");
            // this id will be used later to remove DOMs
            answerFormGroup.setAttribute("id","answerFG");
            answerCheckBox.setAttribute("type", "checkbox");
            // id will be used to check the answer
            answerCheckBox.setAttribute("id", "chk" + i);
            answerLabel.setAttribute("for","chk" + i);
            answerLabel.setAttribute("id","lbl" + i);
            
            // split array with asnwers and index it
            answerLabel.textContent = question[questionNumber].answers.split(",")[i];
        
            // add checkbox to form
            answerFormGroup.appendChild(answerCheckBox);
            // add label to form
            answerFormGroup.appendChild(answerLabel);
            // add form to answerSection
            document.querySelector("#answersSection").appendChild(answerFormGroup);
        }
        } else {

        // Remove question and answers
        let removeQuestion = document.querySelector("#questionSection");
        let removeAnswers = document.querySelector("#answersSection");
        
        // remove question
        while (removeQuestion.hasChildNodes()){
            removeQuestion.removeChild(removeQuestion.firstChild);
        }
       
        // remove answers
        while (removeAnswers.hasChildNodes()){
            removeAnswers.removeChild(removeAnswers.firstChild);
        }

        }            
}

// function which displays resuls
function displayResult() {
    lastAnswer.remove();
    summary.setAttribute("class","text-info");
    summary.textContent = "Correct: " + totalAnswers[0] + ", Incorrect: " + totalAnswers[1] +", Time left " + quizTime + "s.";

}

// functions which safes results to local storage
function safeResult() {


    console.log("Saved results");
}


// function which submits answers
function submitAnswer() {

    // placeholders
    let tmp_checkbox;
    let single_answer;
    let givenAnswers = [];
    
    // Check if there are answers to process
    if (currentQuestion <= totalQuestions - 1) {

        // iterate over answers (checkbox and labels)
        for (let i = 0; i < questions[currentQuestion].choices; i++) {

            tmp_checkbox = document.querySelector("#chk"+i);
            single_answer = document.querySelector("#lbl"+i);
    
            // selected checkbox indicates lables which are addedd to final answer
            if (tmp_checkbox.checked) {
                
                // push related label to aarray givenAnswers
                givenAnswers.push(single_answer.textContent);
    
            }
    
        }
    
        // compare user answer with correct answer
        if ( givenAnswers.join(",") === correctAnswersArray[currentQuestion]) {
           
            // increase the counter for good answers
            totalAnswers[0]++;
            lastAnswer.setAttribute("class","text-success");
            lastAnswer.textContent = "CORRECT";
        
        } else {
        
            // increase counter for wrong answers
            totalAnswers[1]++;
            lastAnswer.setAttribute("class","text-danger");
            lastAnswer.textContent = "INCORRECT";

            // reduce total time by decreaseTime
            quizTime-=decreaseTime;
        
        }  
        console.log( lastAnswer);    
    } 
    
    // if this is the last question
    if (currentQuestion == totalQuestions - 1 ) {
        
        // stop timer
        clearInterval(timerId);
        // manage results
        displayResult();
        submitButton.setAttribute("class","btn btn-dark disabled no-click");
        stopButton.setAttribute("class","btn btn-dark disabled no-click");
        startButton.setAttribute("class","btn btn-dark");
        onPageLoad();
        safeResult();

    } else {
     
        // prepare for the next question
        // remove DOM for actual question
        askQuestion(questions,currentQuestion,true);
        // create new question
        currentQuestion++;
        // display DOM for new question
        askQuestion(questions,currentQuestion,false);

    }   
}

// =================
// Section dynamic HTML
// =================

document.querySelector("#startButton").addEventListener("click",startQuiz);
document.querySelector("#stopButton").addEventListener("click",stopQuiz);
document.querySelector("#submitButton").addEventListener("click",submitAnswer);