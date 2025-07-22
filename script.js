async function getWeather() {
  // ... your code ...
  document.querySelector(".city").textContent = currentData.name;
  document.querySelector(".temp").textContent = `${currentData.main.temp}°C`;
  document.querySelector(".condition").textContent = currentData.weather[0].main;

  // --- WEATHER ICON CODE HERE ---
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

  // --- RAIN EFFECT CODE HERE ---
  if (condition === "Rain") showRainEffect();
  else hideRainEffect();

  // ... rest of your code ...
}

// Add these helper functions anywhere in script.js
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
