async function getWeather() {
  const city = document.getElementById("cityInput").value || "Bengaluru";
  const apiKey = "3ed6dd4f7f702dab95a5a7cd72c2bf13";
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  const [currentRes, forecastRes] = await Promise.all([
    fetch(currentURL),
    fetch(forecastURL)
  ]);

  const currentData = await currentRes.json();
  const forecastData = await forecastRes.json();

  document.querySelector(".city").textContent = currentData.name;
  document.querySelector(".temp").textContent = `${currentData.main.temp}°C`;
  document.querySelector(".condition").textContent = currentData.weather[0].main;

  // Sound effect logic
  const audio = new Audio();
  const condition = currentData.weather[0].main;
  if (condition === "Rain") audio.src = "rain.mp3";
  else if (condition === "Clear") audio.src = "sunny.mp3";
  audio.loop = true;
  audio.play();

  // Forecast cards
  const forecastDiv = document.querySelector(".forecast");
  forecastDiv.innerHTML = "";
  for (let i = 0; i < forecastData.list.length; i += 8) {
    const f = forecastData.list[i];
    const card = document.createElement("div");
    card.innerHTML = `
      <p>${f.dt_txt.split(" ")[0]}</p>
      <p>${f.main.temp}°C</p>
      <p>${f.weather[0].main}</p>
    `;
    card.style.padding = "10px";
    card.style.border = "1px solid #fff";
    card.style.borderRadius = "6px";
    forecastDiv.appendChild(card);
  }
}
