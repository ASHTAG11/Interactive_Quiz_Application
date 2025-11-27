
    function startQuiz() {
        window.location.href = "quiz.html"; 
        
    }

    const questions = [
    {
        question: "Which term describes an interactive game where players influence the story through choices?",
        answers: [
            { text: "Strategy Game", correct: false },
            { text: "Open-World Game", correct: false },
            { text: "Narrative-driven Game", correct: true },
            { text: "Sandbox Game", correct: false }
        ]
    },
    {
        question: "What is the main purpose of a branching storyline in games?",
        answers: [
            { text: "To improve graphics", correct: false },
            { text: "To allow multiple outcomes", correct: true },
            { text: "To make games longer", correct: false },
            { text: "To increase difficulty", correct: false }
        ]
    },
    {
        question: "Which technology is often used to save player choices in story-based games?",
        answers: [
            { text: "Local Storage", correct: true },
            { text: "Voice Recognition", correct: false },
            { text: "Bluetooth", correct: false },
            { text: "Firewall", correct: false }
        ]
    },
    {
        question: "In storytelling games, what does the term 'cutscene' mean?",
        answers: [
            { text: "A hidden cheat code", correct: false },
            { text: "A non-playable story segment", correct: true },
            { text: "A player inventory item", correct: false },
            { text: "A game-ending bug", correct: false }
        ]
    },
    {
        question: "Which device is commonly used to run VR story games?",
        answers: [
            { text: "Headphones", correct: false },
            { text: "VR Headset", correct: true },
            { text: "Smartwatch", correct: false },
            { text: "PC Speakers", correct: false }
        ]
    },
    {
        question: "Which term refers to the main character in a story game?",
        answers: [
            { text: "NPC", correct: false },
            { text: "Antagonist", correct: false },
            { text: "Protagonist", correct: true },
            { text: "Sidekick", correct: false }
        ]
    },
    {
        question: "Which component is most important for smooth gaming performance?",
        answers: [
            { text: "GPU", correct: true },
            { text: "Wi-Fi Router", correct: false },
            { text: "USB Cable", correct: false },
            { text: "Printer", correct: false }
        ]
    },
    {
        question: "Which programming language is widely used to build game engines?",
        answers: [
            { text: "C++", correct: true },
            { text: "HTML", correct: false },
            { text: "CSS", correct: false },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "What is the role of an NPC in story games?",
        answers: [
            { text: "A character controlled by AI", correct: true },
            { text: "A second player", correct: false },
            { text: "A paid DLC item", correct: false },
            { text: "A hidden boss", correct: false }
        ]
    },
    {
        question: "What does autosave do in a game?",
        answers: [
            { text: "Automatically saves progress", correct: true },
            { text: "Deletes old saves", correct: false },
            { text: "Restarts the game", correct: false },
            { text: "Increases game difficulty", correct: false }
        ]
    }
];

const queselement = document.getElementById("ques");
const ansbt = document.getElementById("ansbtns");
const nextbt = document.getElementById("nextbtn");
const refreshBtn = document.getElementById("refreshBtn");
const homebtn = document.getElementById("homebtn");


let currquesIndex = 0;
let score = 0;
let refreshChances = 3;


function start(){
    currquesIndex = 0;
    score = 0;
    nextbt.innerHTML = "Next";
    showQuestion();
    refreshChances = 3;



}


function showQuestion(){
    reset();
    let currquestion = questions[currquesIndex]; 
    let quesNum = currquesIndex+1;
    queselement.innerHTML = quesNum + "." + currquestion.question;

    currquestion.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.innerHTML = answer.text;
        btn.classList.add("btn");
        ansbt.appendChild(btn);
        if(answer.correct){
            btn.dataset.correct = answer.correct;
        }
        btn.addEventListener("click",selectans);

    });
}

function reset(){
    nextbt.style.display = "none";
    refreshBtn.disabled = false;
    refreshBtn.style.opacity = "1";


    while(ansbt.firstChild){
        ansbt.removeChild(ansbt.firstChild);
    }
}

function selectans(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true" ;
    if(isCorrect){
        selectedbtn.classList.add("correct");
        score = score+1;
    }
    else{
        selectedbtn.classList.add("incorrect");
        refreshBtn.style.display = "block";
    }

    Array.from(ansbt.children).forEach(btn =>{
        if(btn.dataset.correct === "true"){
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });
    nextbt.style.display = "block";


}

function showScore(){
    reset();
    queselement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbt.innerHTML = "Play Again";
    nextbt.style.display = "inline-block";
    homebtn.style.display = "inline-block"; 
    document.getElementById("homebtn").style.display = "block";

}


function handlenextbutton(){
    currquesIndex++;
    if(currquesIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextbt.addEventListener("click", ()=>{
    if(currquesIndex < questions.length){
        handlenextbutton();
    }else{
        start();
    }
});

refreshBtn.addEventListener("click", () => {
      if (refreshChances > 0) {
        refreshChances--;
        showQuestion();   
      }

        if (refreshChances === 0) {
        refreshBtn.disabled = true;
        refreshBtn.style.opacity = "0.4";   
        refreshBtn.style.cursor = "not-allowed";
    }
    
});

homebtn.addEventListener("click", () => {
    window.location.href = "main.html";
});



start();