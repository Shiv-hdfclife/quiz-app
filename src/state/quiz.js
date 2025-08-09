import { questions as originalQuestions } from "../data/questions.js";
import { shuffle } from "../utils/shuffle.js";

let questions = [];
let index = 0;
let score = 0;

export function current() {
    return questions[index] || null;
}

export function submit(choiceIndex) {
    if (choiceIndex === current()?.answer) {
        score++;
    }
    index++;
    return index < questions.length;
}

export function getScore() {
    return { score, total: questions.length };
}

export function reset() {
    questions = shuffle(originalQuestions);
    index = 0;
    score = 0;
}
