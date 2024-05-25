const quizData =[
    {
        question : "What is the most used programming language in 2019?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d",
    },
    {
        question:  "Who is the President of US?",
        a: "Florin Pop",
        b: "Joe Biden",
        c: "Ivan Saldano",
        d: "Mihai Andrei",
        correct: "b",
    },
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Cascading Style Sheet",
        c: "Jason Object Notation",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a"
    },
    {
        question: "What year was JavaScript launched?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "none of the above",
        correct:"b",
    },
];
let currentQuiz = 0;
let score = 0;
loadQuiz();

function loadQuiz() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText =currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}
submitBtn.addEventListener("click", () =>{
    // check to see the answer
    let answer = undefined;
    answerEls.forEach((answerEl) => {
        if (answerEl.checked){
            answer = answerEl.id;
        }
    });
    if (answer){
        if (answer === quizData[currentQuiz].correct){
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        }
        else {
            result = document.createElement("h2");
            result.innerText = 'You answered correctly at ${score}/${quizData.length} questions.';
            buttonReload = document.createElement("button");
            buttonReload.innerText = "Reload";
            buttonReload.onclick = () => location.reload();
            quiz.innerHTML =  "";
            quiz.append(result);
            quiz.append(buttonReload);
    }
}
});