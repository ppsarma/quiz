const questionsRound1 = [
    "Spot the lie about Manoj: has travelled to 6 out of the 7 continents, favourite dessert is Tiramisu, has run a half-marathon",
    "What was Manoj's favourite subject in School?",
    "What educational degrees does Manoj hold? (clue: he holds one Bachelors and one Masters degree)",
    "What is Manoj's favourite football club in the English Premier League, and why?",
    "Which of Manoj's once beloved Movie series has he decided not to watch new movies of (no matter what)?",
    "What is Manoj's current job title?",
    "Name 5 popular authors that Manoj has read",
    "What notable academic distinction did Manoj achieve while doing his Masters in Sydney?",
    "What was Manoj's pet's name?",
    "What is Manoj's official birthday (as per his passport and other docs)?",
    "How tall is Manoj? :) ",
    "What is Manoj's favourite Indian Maccas item?"
];

const questionsRound2 = [
"Manoj’s first ever trek/hike destination (starts with M)",
"Coffee beverage that starts with an M that he is not a fan of",
"Favourite thing to put on bread that starts with an M (The answer is a Tamil word, but the English equivalent is acceptable)",
"Favourite chocolate",
"Luxury car that he was being encouraged to buy second hand instead of his new Honda Civic",
"A book that Manoj has not been able to finish reading"
];

let remainingQuestionsRound1 = [...questionsRound1];
let displayedQuestionsRound1 = Array(12).fill(null);

function createSquare(number) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.innerHTML = `
        <div class="front">${number}</div>
        <div class="back"></div>
    `;

    square.addEventListener('click', () => {
        if (!square.classList.contains('flip')) {
            square.classList.add('flip');
            revealQuestion(square, number - 1);
        } else {
            revealNewQuestion(square, number - 1);
        }
    });

    return square;
}

function revealQuestion(square, index) {
    if (displayedQuestionsRound1[index] === null && remainingQuestionsRound1.length > 0) {
        const questionIndex = Math.floor(Math.random() * remainingQuestionsRound1.length);
        const question = remainingQuestionsRound1.splice(questionIndex, 1)[0];
        displayedQuestionsRound1[index] = question;
        square.querySelector('.back').innerText = question;
        addQuestionToList(question);
    }
}

function revealNewQuestion(square, index) {
    if (remainingQuestionsRound1.length > 0) {
        const questionIndex = Math.floor(Math.random() * remainingQuestionsRound1.length);
        const question = remainingQuestionsRound1.splice(questionIndex, 1)[0];
        displayedQuestionsRound1[index] = question;
        square.querySelector('.back').innerText = question;
        addQuestionToList(question);
    }
}

function addQuestionToList(question) {
    // This function is no longer needed as we are displaying the scoreboard now
}

function createScattegoriesQuestion(question) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('scattegories-question');
    questionDiv.innerHTML = `
        <div>${question}</div>
        <input type="text" placeholder="Answer">
    `;
    return questionDiv;
}

function init() {
    const quizContainer = document.getElementById('quiz-container');
    for (let i = 1; i <= 12; i++) {
        quizContainer.appendChild(createSquare(i));
    }

    const scattegoriesQuestionsContainer = document.getElementById('scattegories-questions');
    questionsRound2.forEach(question => {
        scattegoriesQuestionsContainer.appendChild(createScattegoriesQuestion(question));
    });
}

function showRound(roundNumber) {
    document.querySelectorAll('.round').forEach(round => round.style.display = 'none');
    document.getElementById(`round-${roundNumber}`).style.display = 'flex';
}

function updateScores() {
    const teamScores = [];
    for (let i = 1; i <= 4; i++) {
        const scoreInput = document.getElementById(`team-${i}-score`);
        teamScores.push(scoreInput.value);
    }

    localStorage.setItem('teamScores', JSON.stringify(teamScores));
}

function updateScoresRound2() {
    const teamScores = [];
    for (let i = 1; i <= 4; i++) {
        const scoreInput = document.getElementById(`team-${i}-score-round-2`);
        teamScores.push(scoreInput.value);
    }

    localStorage.setItem('teamScoresRound2', JSON.stringify(teamScores));
}

function loadScores() {
    const savedScores = JSON.parse(localStorage.getItem('teamScores'));
    if (savedScores) {
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`team-${i}-score`).value = savedScores[i - 1];
        }
    }

    const savedScoresRound2 = JSON.parse(localStorage.getItem('teamScoresRound2'));
    if (savedScoresRound2) {
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`team-${i}-score-round-2`).value = savedScoresRound2[i - 1];
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    loadScores();
});
