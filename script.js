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
    "What does \"===\" operator do?",
    "How to increment and integer by 5?",
    "What dialog boxes are available in JavaScript?",
    "Is JavaScript and older brother to Java?"
]

// total questions
let totalQuestions = questionsArray.length;

// all possible answers, each answer separate by ,
let answersArray = [
    "A - low level programming language,B - subprogram written in Java,C - scripting lanugage for websites,D - hell knows ",
    "A - //,B - *,C - <!--,D - #",
    "A - assingment,B - value comparison,C - type comparison,D - value and type comparison",
    "A - i++,B - i = i + 5,C - i%5 + 5,D - i+5",
    "A - prompt dialog box,B - alert dialog box,C - popup dialog box,D - confirmation dialog box",
    "A - true,B - false"
]

// correct answers
let correctAnswersArray = [
    "C - scripting lanugage for websites",
    "A - //",
    "D - value and type comparison",
    "B - i = i + 5",
    "A - prompt dialog box,B - alert dialog box,D - confirmation dialog box",
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
let resultSection = document.querySelector("#resultSection");

// =================
// Section functions
// =================

// function which sets up page to initial state
function onPageLoad() {

    //initiate default values - when we repeat the test
    //quizTime = 120;
    //decreaseTime = 10;
    //totalAnswers = [0, 0];
    //timerId=0;
    //currentQuestion = 0;

    // read the time from global variabla and display in DOM
    timeLeft.textContent = quizTime;

    // disable stop, submit buttons using custom CSS from style.css -> no-click
    stopButton.setAttribute("class","btn btn-dark disabled no-click");
    submitButton.setAttribute("class","btn btn-dark disabled no-click");    

}

// function which starts the quiz
function startQuiz() {

    // set some values back to defaults, this is becaue we can click start button many times
    quizTime = 120;
    totalAnswers = [0, 0];
    timerId=0;
    currentQuestion = 0;

    // disable start button using custom CSS from style.css -> no-click
    startButton.setAttribute("class","btn btn-dark disabled no-click");   
    // enable stop button
    stopButton.setAttribute("class","btn btn-dark active");
    // enable submit button
    submitButton.setAttribute("class","btn btn-dark active");
    // hide save section
    let saveSection = document.querySelector("#saveSection");

    if (saveSection != null) {
        saveSection.remove();

        // check local storage and display if it is not null
        summary.setAttribute("class","text-info");
        let initials = localStorage.getItem("lsInitials");
        let time = localStorage.getItem("lsTime");
        let correct = localStorage.getItem("lsCorrect");

        if (initials != null && time != null && correct != null) {

            summary.textContent = "Hey " + initials + " last time you had " + correct + " correct answers. Your time was:" + time + "s.";

        }

    }    
    
    // re-load the total time, we do this when we refresh the page (function onpageload) AND when we click start button
    timeLeft.textContent = quizTime;
    
    // start the timer
    timerId = setInterval(function() {
        quizTime--; 
        // need to check <= 0
        if(quizTime <= 0) {
            
            // stop the timer
            clearInterval(timerId);
            stopButton.setAttribute("class","btn btn-dark disabled no-click");
            submitButton.setAttribute("class","btn btn-dark disabled no-click")
            // enable start button
            startButton.setAttribute("class","btn btn-dark")
            displayResult();
        }
        // update how much time is left, write it to DOM
        timeLeft.textContent = quizTime;     
      }, 1000);
    // here we clear question and its answer from DOM
    askQuestion(questions,currentQuestion,true);
    // here we display FIRST question and its answers
    askQuestion(questions,0,false);
}

function stopQuiz() {

    // disable buttons
    startButton.setAttribute("class","btn btn-dark disabled no-click");
    submitButton.setAttribute("class","btn btn-dark disabled no-click");

    // stop timer
    clearInterval(timerId);
    //quizTime = 1;
    summary.setAttribute("class","text-danger");
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
        // add border to qasection
        document.querySelector("#qasection").setAttribute("class","col-lg-6 col-md-6 col-sm-6 pt-3 border rounded text-center");
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

// function which displays results
function displayResult() {

    //lastAnswer.remove();
    summary.setAttribute("class","text-info");

    if (localStorage.getItem("lsInitials") == null) {
        let initials = "UNKNOWN";
    } else {
        let initials = localStorage.getItem("lsInitials");
        summary.textContent = "Hey " + initials + " this time you have " + totalAnswers[0] + " correct and " + totalAnswers[1] +" incorrect answers. Your time:" + quizTime + "s.";
    }
}

// functions which saves results to local storage
function saveResult() {

    // create save section form
    let saveSection = document.createElement("SECTION");
    let saveLabel = document.createElement("LABEL");
    let saveInitials = document.createElement("INPUT");
    let saveButton = document.createElement("BUTTON");

    saveSection.setAttribute("id","saveSection");
    saveInitials.setAttribute("maxlength","16");
    saveButton.innerText = "SAVE";
    saveButton.setAttribute("class","btn btn-dark");
    saveLabel.innerText = "Not you? provide you initials: ";

    saveSection.appendChild(saveLabel);
    saveSection.appendChild(saveInitials);
    saveSection.appendChild(saveButton);
    resultSection.appendChild(saveSection);
    
    // save data to local storage
    saveButton.addEventListener("click", function () {
        
        // save initials
        if (saveInitials.value === "" ) {
            localStorage.setItem("lsInitials","UNKNOWN");
        } else {
            localStorage.setItem("lsInitials",saveInitials.value);
        }
        // save time
        localStorage.setItem("lsTime",timeLeft.textContent.toString());
        // save number of correct answers
        localStorage.setItem("lsCorrect",totalAnswers[0].toString());
        // change button to success
        saveButton.setAttribute("class","btn btn-success");

    });

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
                
                // push related label to array givenAnswers
                givenAnswers.push(single_answer.textContent);
    
            }
    
        }
    
        // compare user answer with correct answer
        if ( givenAnswers.join(",") === correctAnswersArray[currentQuestion]) {
           
            // increase the counter for good answers
            totalAnswers[0]=totalAnswers[0] + 1;
            lastAnswer.setAttribute("class","text-success");
            lastAnswer.textContent = "CORRECT";
        
        } else {
        
            // increase counter for wrong answers
            totalAnswers[1] = totalAnswers[1] + 1 ;
            lastAnswer.setAttribute("class","text-danger");
            lastAnswer.textContent = "INCORRECT";

            // reduce total time by decreaseTime
            quizTime-=decreaseTime;
        
        }  
           
    } 
    
    // if this is the last question
    if (currentQuestion == totalQuestions - 1 ) {

        submitButton.setAttribute("class","btn btn-dark disabled no-click");
        stopButton.setAttribute("class","btn btn-dark disabled no-click");
        startButton.setAttribute("class","btn btn-dark");
        // stop timer
        clearInterval(timerId);
        // manage results
        displayResult();
        // save results
        saveResult();

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
onPageLoad();
document.querySelector("#startButton").addEventListener("click",startQuiz);
document.querySelector("#stopButton").addEventListener("click",stopQuiz);
document.querySelector("#submitButton").addEventListener("click",submitAnswer);