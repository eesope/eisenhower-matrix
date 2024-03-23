const clock = document.querySelector("div#clock");

function getClock() {
    const date = new Date();
    clock.innerText = `${date}`
    // const seconds = String(date.getSeconds()).padStart(2, "0");
}

getClock();
setInterval(getClock, 1000); // looks like real-time