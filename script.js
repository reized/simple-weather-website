const apiKey = "37d5e33549d6b0a5b0bb4fadf2811e66";
const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector("#search-input");
const searchBtn = document.querySelector(".search-btn");

const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        let data = await response.json();

        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        console.log(data.weather[0].main);

        switch (data.weather[0].main) {
            case "Clear":
                weatherIcon.src = "assets/sunny-icon.svg";
                break;
            case "Clouds":
                weatherIcon.src = "assets/cloudy-icon.svg";
                break;
            case "Rain":
                weatherIcon.src = "assets/rain-icon.svg";
                break;
            case "Drizzle":
                weatherIcon.src = "assets/drizzle-icon.svg";
                break;
            case "Mist":
                weatherIcon.src = "assets/mist-icon.svg";
                break;
        }

        document.querySelector(".weather").style.display = "flex";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
