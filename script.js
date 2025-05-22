const questions = [
    {
        question : "What does the 'M' in MERN stack stand for?",
        answers:[
            {text:"MySQL",correct:false},
            {text:"Markdown",correct:false},
            {text:"MongoDB",correct:true},
            {text:"Machine Learning",correct:false},
        ]
    },
    {
        question : "Which of the following is a NoSQL database used in the MERN stack?",
        answers:[
            {text:"PostgreSQL",correct:false},
            {text:"SQLite",correct:false},
            {text:"MongoDB",correct:true},
            {text:"Oracle",correct:false},
        ] 
    },
    {
        question : "What is Express.js primarily used for?",
        answers:[
            {text:"Server-side routing and middleware",correct:true},
            {text:"Front-end styling",correct:false},
            {text:"Managing MongoDB",correct:false},
            {text:"Compiling JavaScript",correct:false},
        ] 
    },
    {
        question : "Which library is used for building user interfaces in the MERN stack?",
        answers:[
            {text:"Angular",correct:false},
            {text:"Vue",correct:false},
            {text:"jQuery",correct:false},
            {text:"react",correct:true}
            ,
        ] 
    },
    {
        question : "Which of the following is used to run JavaScript on the server side in the MERN stack?",
        answers:[
            {text:"Python",correct:false},
            {text:"React",correct:false},
            {text:"jQuery",correct:false},
            {text:"Node.js",correct:true}
            ,
        ] 
    },
     {
        question : "What command initializes a new React app using Create React App?",
        answers:[
            {text:"npx start react-app",correct:false},
            {text:"npm install react",correct:false},
            {text:"npx react-init",correct:false},
            {text:"npx create-react-app my-app",correct:true}
            ,
        ] 
    },
      {
        question : "Which method is used to connect a Node.js app to MongoDB?",
        answers:[
            {text:"MongoClient.connect()",correct:false},
            {text:"mongoose.connect()",correct:true},
            {text:"jQueconnect.mongo()",correct:false},
            {text:"mongo.link()",correct:false}
            ,
        ] 
    },
       {
        question : "What is JSX in React?",
        answers:[
            {text:"A new CSS syntax",correct:false},
            {text:"A file format for routing",correct:false},
            {text:"A syntax extension for JavaScript",correct:true},
            {text:"A database query language",correct:false},
        ] 
    },
       {
        question : "In Express, what is req short for?",
        answers:[
            {text:"Requestion",correct:false},
            {text:"Required",correct:false},
            {text:"Request",correct:true},
            {text:"Requisition",correct:false},
        ] 
    },
       {
        question : "Which of the following is used to manage packages in a MERN stack project?",
        answers:[
            {text:"Git",correct:false},
            {text:"Mongo",correct:false},
            {text:"npm",correct:true},
            {text:"Babel",correct:false},
        ] 
    },
    
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
    
    currentQuestion.answers.forEach(answer => {
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