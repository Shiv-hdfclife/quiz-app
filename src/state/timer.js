let countdown = 10;
let intervalId = null;
let onTick = () => {};
let onTimeout = () => {};

export function startTimer(tickCallback, timeoutCallback) {
    stopTimer(); 

    countdown = 10;
    onTick = tickCallback;
    onTimeout = timeoutCallback;

    onTick(countdown); 

    intervalId = setInterval(() => {
        countdown--;
        onTick(countdown);

        if (countdown <= 0) {
            stopTimer();
            onTimeout();
        }
    }, 1000);
}

export function stopTimer() {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
}
