import { showQuestion } from "./src/dom/dom.js";

document.addEventListener("keydown", (e) => {
    const key = e.key;


    if (/^[1-5]$/.test(key)) {
        const choiceButtons = document.querySelectorAll("#choices button");
        const index = parseInt(key) - 1;

        if (choiceButtons[index]) {
            choiceButtons[index].click();
        }
    }


    if (key.toLowerCase() === "r") {
        const retryBtn = document.querySelector("#retry");
        if (retryBtn) retryBtn.click();
    }
});


showQuestion();