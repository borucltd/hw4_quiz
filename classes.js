class question {

    constructor(question,answers,correctAnswers){
        // define question
        this.question = question;
        // define answers
        this.answers = answers;
        // define correct answers
        this.correctAnswers = correctAnswers;

        // we need to count how many answer have we got
        this.choices = this.answers.split(",").length;
        // number of correct choices
        this.correctChoices = this.correctAnswers.split(",").length;
        

    }



};