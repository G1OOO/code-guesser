const triesSpan = document.getElementById('tries');
const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const feedbackDiv = document.getElementById('feedback');
const historyList = document.getElementById('history');

let secret = [];
let tries = 20;

function generateCode() {
    secret = [];
    for (let i = 0; i < 4; i++) {
        secret.push(Math.floor(Math.random() * 10));
    }
}

generateCode();

submitButton.addEventListener("click", () => {
    const guess = guessInput.value.trim();
    if (guess.length !== 4 || isNaN(guess)) {
        feedbackDiv.textContent = "Please enter a valid 4-digit number.";
        return;
    }

    if (tries <= 0) {
        feedbackDiv.textContent = `Game Over! The code was ${secret.join('')}.`;
        submitButton.disabled = true;
        return;
    }

    let guessArr = guess.split('').map(Number);

    let correctPlace = 0;
    let correctDigit = 0;
    let secretCopy = [...secret];
    let guessCopy = [...guessArr];

    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] === secretCopy[i]) {
            correctPlace++;
            guessCopy[i] = secretCopy[i] = null;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] === null) continue;
        const found = secretCopy.indexOf(guessCopy[i]);
        if (found !== -1) {
            correctDigit++;
            secretCopy[found] = null;
        }
    }

    tries--;
    triesSpan.textContent = tries;

    let msg = `Correct Place: ${correctPlace}, Correct Digit: ${correctDigit}`;
    feedbackDiv.textContent = msg;

    const li = document.createElement('li');
    li.textContent = `Guess: ${guess} - ${msg}`;
    historyList.appendChild(li);

    if (correctPlace === 4) {
        feedbackDiv.textContent = `Congratulations! You've cracked the code ${secret.join('')}!`;
        submitButton.disabled = true;
        guessInput.disabled = true;
    } else if (tries === 0) {
        feedbackDiv.textContent = `Out of tries! The code was ${secret.join('')}`;
        submitButton.disabled = true;
        guessInput.disabled = true;
    }
    guessInput.value = '';
});