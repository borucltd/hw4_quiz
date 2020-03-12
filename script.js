// 5-minutes quiz
let quizTime = 300;

// each wrong answer decreases time by 10 seconds
let deceeaseTime = 10;

// total answers, index 0 correct answer, index 1 wrong answer
let totalAnswers = [0, 0];

// questions (taken from https://www.guru99.com/javascript-interview-questions-answers.html )
let questionsArray = [
    "What is JavaScript?",
    "Which symbol is used for comments in Javascript?",
    "What is === operator?",
    "How can you increment integer by 5?",
    "What are all the types of Pop up boxes available in JavaScript?",
    "Is JavaScript and older brother to Java?"
]

// answers -> correlated to questions array
// 4 means we have 4 multipe choice answers
// 4 -> 4 answers, answer A and B are correct
let numberOfAnswers = [4,4,4,4,4,2];

