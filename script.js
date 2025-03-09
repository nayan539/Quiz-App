const questions = [
    {
        question : "which language is used in frontend development",
        answers:[
            {text:"react",correct:true},
            {text:"nodejs",correct:false},
            {text:"sql",correct:false},
            {text:"express",correct:false},
        ]
    },
    {
        question : "which language is used in backend development",
        answers:[
            {text:"react",correct:false},
            {text:"html",correct:false},
            {text:"css",correct:false},
            {text:"node js",correct:true},
        ] 
    },
    {
        question : "which language is used in App development",
        answers:[
            {text:"react native",correct:true},
            {text:"html",correct:false},
            {text:"css",correct:false},
            {text:"html",correct:false},
        ] 
    }
];

const questionElement = document.querySelector("#question");
const answerbtns = document.querySelector("#answer-btns");
const nextbtn = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer =>{
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        answerbtns.appendChild(btn);

        if(answer.correct){
            btn.dataset.correct = answer.correct;
        }

        btn.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextbtn.style.display ="none";
    while(answerbtns.firstChild){
        answerbtns.removeChild(answerbtns.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerbtns.children).forEach(btn =>{
        if(btn.dataset.correct === "true"){
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });
    nextbtn.style.display = "block";

}

function showScore(){
    resetState();
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}`;
    nextbtn.innerHTML = "Play Again";
    nextbtn.style.display = "block";
    
    if(score === questions.length){
        nextbtn.innerHTML = "Play Again , You Win";
    }
}

function handleNextbtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex <questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextbtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextbtn();
    }else{
        startQuiz();
    }
})

startQuiz();