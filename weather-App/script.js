const apiKey = "442e974e12da2739b6981c209ff5150b";
const cityInput = document.getElementById("cityInput");
const weatherFetchBtn = document.getElementById("weatherFetchBtn");
const weatherInfo = document.getElementById("weatherInfo");

async function fetchWaether(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City Not Found");
    }
    const data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    weatherInfo.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

function displayWeather(data) {
  weatherInfo.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature:${data.main.temp}°C</p>
    <p>Humidity:${data.main.humidity}%</p>
    <p>${data.weather[0].description}</p>
    <p>Wind Speed: ${data.wind.speed} KM/HR</p>
    `;
}

weatherFetchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city) {
    weatherInfo.innerHTML = `<p>Loading .....</p>`;
    fetchWaether(city);
  } else {
    weatherInfo.innerHTML = `<p style="color:red;">Please Enter City Name</p>`;
  }
});
