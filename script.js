// 5-minutes quiz
let quizTime = 300;

// each wrong answer decreases time by 10 seconds
let decreaseTime = 10;

// total answers, index 0 correct answer, index 1 wrong answer
let totalAnswers = [0, 0];

// questions (some are taken from https://www.guru99.com/javascript-interview-questions-answers.html )
let questionsArray = [
    "What is JavaScript?",
    "Which symbol is used for comments in Javascript?",
    "What is === operator?",
    "How can you increment integer by 5?",
    "What are all the types of Pop up boxes available in JavaScript?",
    "Is JavaScript and older brother to Java?"
]

let answersArray = [
    "A - low level programming language, B - subprogram written in Java, C - scripting lanugage for websites, D - hell knows ",
    "A - //, B - *, C - <!--, D - #",
    "A - assingment, B - value comparison, C - type comparison, D - value and type comparison",
    "A - i++, B - i = i + 1, C - i%2, D - you can't do that",
    "A - prompts, B - alerts, C - popup, D - config",
    "A - true, B - false"
]

// questions -> we create array of objects "question"
let questions = [
    new question(questionsArray[0],answersArray[0]),
    new question(questionsArray[1],answersArray[1]),
    new question(questionsArray[2],answersArray[2]),
    new question(questionsArray[3],answersArray[3]),
    new question(questionsArray[4],answersArray[4]),
]



console.log(questions[0]);