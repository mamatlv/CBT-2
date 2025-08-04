
let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let timer;
let timeLeft = 35;

const questionContainer = document.getElementById('question-container');
const choicesContainer = document.getElementById('choices-container');
const timeDisplay = document.getElementById('time');
const resultContainer = document.getElementById('result-container');
const nextButton = document.getElementById('next-button');

function startQuiz() {
    showQuestion();
}

function showQuestion() {
    resetState();
    const q = questions[currentQuestionIndex];
    questionContainer.textContent = q.question;
    q.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-btn');
        button.addEventListener('click', () => selectAnswer(index));
        choicesContainer.appendChild(button);
    });
    startTimer();
}

function resetState() {
    clearInterval(timer);
    timeLeft = 35;
    timeDisplay.textContent = timeLeft;
    choicesContainer.innerHTML = '';
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            selectAnswer(null);  // No answer selected
        }
    }, 1000);
}

function selectAnswer(selected) {
    clearInterval(timer);
    const correct = questions[currentQuestionIndex].answer;
    if (selected === correct) {
        correctCount++;
    } else {
        wrongCount++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    resultContainer.style.display = 'block';
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('wrong-count').textContent = wrongCount;
}

nextButton.addEventListener('click', () => selectAnswer(null));

startQuiz();
