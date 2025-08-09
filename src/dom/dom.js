



import { current, getScore, reset, submit } from "../state/quiz.js";
import { startTimer, stopTimer } from "../state/timer.js";
import { updateHighScore, getHighScore } from "../state/highScore.js";

let quizCard = document.createElement("div");
quizCard.id = "quiz-card";
document.body.append(quizCard);




export function showQuestion() {
    let q = current();
    if (!q) return;

    quizCard.innerHTML = `
        <h2>${q.text}</h2>
        <div id="choices"></div>
        <p id="progress"></p>
        <p id="timer">Time left: 10s</p>
    `;

    const choiceBox = quizCard.querySelector("#choices");

    q.choices.forEach((el, i) => {
        const button = document.createElement("button");
        button.innerText = el;

        button.onclick = () => {
            stopTimer(); 
            let more = submit(i);
            more ? showQuestion() : showResult();
        };

        choiceBox.append(button);
    });

    getProgress();

  
    startTimer(
        (secondsLeft) => {
            document.querySelector("#timer").textContent = `Time left: ${secondsLeft}s`;
        },
        () => {
           
            let more = submit(-1); 
            more ? showQuestion() : showResult();
        }
    );
}


export function getProgress() {
    const { score, total } = getScore(); 
    quizCard.querySelector("#progress").textContent = `Score: ${score} / Total: ${total}`;
}



export function showResult() {
    stopTimer(); 

    const { score, total } = getScore();
    const isNewHighScore = updateHighScore(score, total);
    const best = getHighScore();

    quizCard.innerHTML = `
        <h2>Quiz Completed</h2>
        <p>Your Score: ${score} / ${total}</p>
        ${isNewHighScore ? `<p>🏆 <strong>New High Score!</strong></p>` : ""}
        <p>Best: ${best.score} / ${best.total}</p>
        <button id="retry">Try Again</button>
    `;

    quizCard.querySelector("#retry").onclick = () => {
        reset();
        showQuestion();
    };
}


reset();
showQuestion();

