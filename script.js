// =================
// Section variables
// =================

// 5-minutes quiz
let quizTime = 300;

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

// all possible answers
let answersArray = [
    "A - low level programming language, B - subprogram written in Java, C - scripting lanugage for websites, D - hell knows ",
    "A - //, B - *, C - <!--, D - #",
    "A - assingment, B - value comparison, C - type comparison, D - value and type comparison",
    "A - i++, B - i = i + 1, C - i%2, D - you can't do that",
    "A - prompts, B - alerts, C - popup, D - config",
    "A - true, B - false"
]

// c
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
    // debug
    console.log(questions[i].choices);
    console.log(questions[i].correctChoices);

}

// =================
// Section functions
// =================
function startQuiz() {

    // enable stop button
    document.querySelector("#stopButton").setAttribute("class","btn btn-dark active");
    //start counting
    document.querySelector("#timeLeft").textContent = quizTime;


    timerId = setInterval(function() {
        quizTime--; 
        // need to check <= 0, === 0 is not enough
        if(quizTime <= 0) {
          // stop the timer
          clearInterval(timerId);
        }
        document.querySelector("#timeLeft").textContent = quizTime;       
      }, 1000);
    
    askQuestion(questions,0,false);


}

function stopQuiz() {

    // disable buttons
    document.querySelector("#startButton").setAttribute("class","btn btn-dark disabled");
    document.querySelector("#submitButton").setAttribute("class","btn btn-dark disabled");

    // stop timer
    clearInterval(timerId);
    quizTime = 1;
    console.log("YOU GAVE UP!!!");

}

// This function displays question
// It removes previous question before displaying the new one
function askQuestion( question,  questionNumber, clear) { 
        
    // if clear is false just display new question
    if (clear === false) {
        console.log("dsda");
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

            // add attributes do DOMs
            answerFormGroup.setAttribute("class","form-group");
            // thid id will be used later to remove DOMs
            answerFormGroup.setAttribute("id","answerFG");
            answerCheckBox.setAttribute("type", "checkbox");
            answerLabel.setAttribute("for",i);
            
            // split array with asnwers and index it
            answerLabel.innerHTML = question[questionNumber].answers.split(",")[i];

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


function submitAnswer() {

    // Check if there is a not-asked questions
    if (currentQuestion < 5) {

        askQuestion(questions,currentQuestion,true);
        currentQuestion++;
        askQuestion(questions,currentQuestion,false);
    }



}

// =================
// Section dynamic HTML
// =================
document.querySelector("#startButton").addEventListener("click",startQuiz);
document.querySelector("#stopButton").addEventListener("click",stopQuiz);
document.querySelector("#submitButton").addEventListener("click",submitAnswer);