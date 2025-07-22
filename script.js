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

  // Weather ICON logic (ADD THIS BLOCK)
  const condition = currentData.weather[0].main;
  let iconSrc = "";
  if (condition === "Rain") iconSrc = "assets/icons/rain.png";
  else if (condition === "Clear") iconSrc = "assets/icons/sun.png";
  else if (condition === "Clouds") iconSrc = "assets/icons/cloud.png";
  else if (condition === "Snow") iconSrc = "assets/icons/snow.png";
  else if (condition === "Mist") iconSrc = "assets/icons/mist.png";
  const iconImg = document.getElementById("weatherIcon");
  iconImg.src = iconSrc;
  iconImg.style.display = iconSrc ? "inline-block" : "none";

  // Rain Effect logic (ADD THESE FUNCTIONS ABOVE OR BELOW getWeather)
  function showRainEffect() {
    const rainEffect = document.getElementById("rainEffect");
    rainEffect.innerHTML = "";
    for(let i=0; i<100; i++) {
      const drop = document.createElement('div');
      drop.classList.add('raindrop');
      drop.style.left = Math.random()*100 + "vw";
      drop.style.animationDuration = (0.7+Math.random()*0.5) + "s";
      rainEffect.appendChild(drop);
    }
    rainEffect.style.display = "block";
  }
  function hideRainEffect() {
    document.getElementById("rainEffect").style.display = "none";
  }

  // Call Rain Effect based on condition (right after icon logic)
  if (condition === "Rain") showRainEffect();
  else hideRainEffect();

  // Sound effect logic (keep as is, or move after condition)
  const audio = new Audio();
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

// ---- Place these functions OUTSIDE getWeather() if you want ----
// function showRainEffect() { ... }
// function hideRainEffect() { ... }
