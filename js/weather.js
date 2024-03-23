const API_KEY = "cd72c13ba57a691599aba1777a26c4f3";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const city = data.name;
            const weather = data.weather[0].main;
            const temperature = data.main.feels_like;

            const weatherDiv = document.querySelector("#weather span");
            // const weatherDiv = document.querySelector("#weather span:nth-child(2)");

            weatherDiv.innerText = `${weather} ${temperature}°C @ ${city}`;
        });
}
function onGeoError() {
    alert("couldn't detect location; no weather showing");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);