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

function askQuestion( question,  questionNumber, clear) {

    // display question
    let questionParagraph = document.createElement("P");  
    let questionText = document.createTextNode(question[questionNumber].question);       
    document.querySelector("#questionSection").appendChild(questionParagraph.appendChild(questionText));
   
    // form answer section, it depends on number of answers
    for (let i = 0; i < question[questionNumber].choices; i++) {
        
        
        
        //answer.innerHTML = question[questionNumber].answers[i];
        if (clear === false) {
            let answerFormGroup = document.createElement("SECTION");
        let answerCheckBox = document.createElement("INPUT");
        let answerLabel = document.createElement("LABEL");

        answerFormGroup.setAttribute("class","form-group");
        answerFormGroup.setAttribute("id","fg"+i);
        answerCheckBox.setAttribute("type", "checkbox");
        answerCheckBox.setAttribute("id", i);
        answerLabel.setAttribute("for",i);
            answerLabel.innerHTML = question[questionNumber].answers.split(",")[i];
            answerFormGroup.appendChild(answerCheckBox);
            answerFormGroup.appendChild(answerLabel);
            document.querySelector("#answersSection").appendChild(answerFormGroup);
        } else {
            console.log("removing actual question");
            var removeFormGroup = document.getElementById("fg"+i);   
            for (let j =0; j < removeFormGroup.childElementCount; j++){
                removeFormGroup.removeChild(removeFormGroup.childNodes[j]);


            }            
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