const STORAGE_KEY = "bestScore";

export function getHighScore() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { score: 0, total: 0 };
}

export function updateHighScore(currentScore, currentTotal) {
    const best = getHighScore();
    if (currentScore > best.score) {
        const newBest = { score: currentScore, total: currentTotal };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newBest));
        return true; 
    }
    return false; 
}
