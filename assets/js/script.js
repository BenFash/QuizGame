const questions = [{
        question: "What is the capital city of Australia?",
        answers: [{
            text: "Sydney",
            correct: false
        }, {
            text: "Canberra",
            correct: true
        }, {
            text: "Melbourne",
            correct: false
        }, {
            text: "Brisbane",
            correct: false
        }]
    },
    {
        question: "In which year did the first manned moon landing take place?",
        answers: [{
            text: "1969",
            correct: true
        }, {
            text: "1942",
            correct: false
        }, {
            text: "1975",
            correct: false
        }, {
            text: "1937",
            correct: false
        }]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        answers: [{
            text: "J. K. Rowling",
            correct: false
        }, {
            text: "Charles Dickens",
            correct: false
        }, {
            text: "Beatrix Potter",
            correct: false
        }, {
            text: "William Shakespeare",
            correct: true
        }]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [{
            text: "Mars",
            correct: false
        }, {
            text: "Venus",
            correct: false
        }, {
            text: "Jupiter",
            correct: true
        }, {
            text: "Neptune",
            correct: false
        }]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// score index and score //
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    // When starting we want to set scores to 0 //
    currentQuestionIndex = 0;
    score = 0;
    // button should show next for next questions// 
    nextButton.innerHTML = "Next"
    showQuestion();
}
// fucntion will diplay questions// 
function showQuestion() {
    resetState();
    // looks in the questions varable array.//
    let currentQuestion = questions[currentQuestionIndex];
    //thake the index number of the question and adds one. so array item 0 will show as 1 
    let questionNo = currentQuestionIndex + 1;
    // questionElements is the H2 with question id //
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Below pulls the answers into created buttons placed in the parent answer button DIV.   (forEach is a method) //
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

//this function will remove previous question's answers from the list.// 
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    // this looks inside the event listeners target wihch is button element//
    const selectedBtn = e.target;
    // then looks in the buttons dataset and looks in the key of "correct" to see if if equal to true//
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        // if it is adds class to button of correct. //
        selectedBtn.classList.add("correct");
        score++;
    } else {
        // if not it  adds class to button of incorrect. We then need to change the background colour to these classes //
        selectedBtn.classList.add("incorrect");
    }
    // to stop multiselecting, when you select your answer. for each button that is child of answerButtons DIV check the correct answer then apply correct class with styling to this answer // 
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        // then disable all buttons 
        button.disabled = true;
    }); // bring the next button up
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();