window.addEventListener("load", () => {
  // DOM section
  const temperature = document.querySelector(".temperature-degree");
  const icon = document.querySelector("#wicon");
  const description = document.querySelector(".temperature-description");
  const locationTimezone = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector(".degree-section span");
  const cityName = document.querySelector("#city");

  // API section
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=5373c4cddef772929f3ad80e11bea837`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //   set DOM elements from the API
          //   -----------------------------------------
          //   temperature information
          let temperatureDegree = data.main.temp - 272.15;
          temperature.textContent = temperatureDegree.toFixed(1);

          //   ICON information
          var iconCode = data.weather[0].icon;
          var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
          icon.src = `${iconURL}`;

          //   Temperature Description
          description.textContent = data.weather[0].description.replace(
            /(^\w{1})|(\s+\w{1})/g,
            (letter) => letter.toUpperCase()
          );

          // Location Timezone
          locationTimezone.textContent = `UTC+${data.timezone / 3600}`;

          // Change temperature to Celcius / Fahrenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSection.textContent === "C") {
              temperatureSection.textContent = "F";
              temperatureDegree = temperatureDegree * 1.8 + 32;
              console.log(temperatureDegree);
            } else {
              temperatureSection.textContent = "C";
              temperatureDegree = (temperatureDegree - 32) / 1.8;
            }
            temperature.textContent = temperatureDegree.toFixed(1);
          });

          //   City Information
          cityName.textContent = data.name;
        });
    });
  }
});
