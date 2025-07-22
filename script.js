const apiKey = "3ed6dd4f7f702dab95a5a7cd72c2bf13"; // <-- Replace with your actual API key

async function getWeather() {
  const city = document.getElementById("cityInput").value || "Bengaluru";
  // Current weather API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  // Forecast API (5 days, every 3 hours)
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

  try {
    // Get current weather
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const currentData = await response.json();

    document.querySelector(".city").textContent = currentData.name;
    document.querySelector(".temp").textContent = `${currentData.main.temp}°C`;
    document.querySelector(".condition").textContent = currentData.weather[0].main;

    // --- WEATHER ICON CODE ---
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

    if (condition === "Rain") showRainEffect();
    else hideRainEffect();

    // --- 5-DAY FORECAST ---
    const forecastRes = await fetch(forecastUrl);
    if (!forecastRes.ok) throw new Error("5-day forecast not found");
    const forecastData = await forecastRes.json();

    // Group forecasts by day (1 forecast per day at 12:00)
    const daily = {};
    forecastData.list.forEach(item => {
      if (item.dt_txt.includes("12:00:00")) {
        const date = item.dt_txt.split(" ")[0];
        daily[date] = item;
      }
    });

    // Render forecast
    let forecastHtml = "<h2>5-Day Forecast</h2><div style='display:flex; justify-content:center; gap:16px;'>";
    Object.keys(daily).slice(0,5).forEach(date => {
      const f = daily[date];
      const fCondition = f.weather[0].main;
      let fIcon = "";
      if (fCondition === "Rain") fIcon = "assets/icons/rain.png";
      else if (fCondition === "Clear") fIcon = "assets/icons/sun.png";
      else if (fCondition === "Clouds") fIcon = "assets/icons/cloud.png";
      else if (fCondition === "Snow") fIcon = "assets/icons/snow.png";
      else if (fCondition === "Mist") fIcon = "assets/icons/mist.png";
      forecastHtml += `
        <div style="text-align:center;">
          <div>${date}</div>
          <img src="${fIcon}" alt="${fCondition}" style="width:48px; height:48px;">
          <div>${f.main.temp}°C</div>
          <div>${fCondition}</div>
        </div>
      `;
    });
    forecastHtml += "</div>";
    document.querySelector(".forecast").innerHTML = forecastHtml;

  } catch (error) {
    document.querySelector(".city").textContent = "City not found";
    document.querySelector(".temp").textContent = "--°C";
    document.querySelector(".condition").textContent = error.message;
    document.getElementById("weatherIcon").style.display = "none";
    document.querySelector(".forecast").innerHTML = "";
    hideRainEffect();
  }
}

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

window.onload = getWeather;
  document.getElementById("rainEffect").style.display = "none";
}

// Optional: Run weather check on load for Bengaluru
window.onload = getWeather;
