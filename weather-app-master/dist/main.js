/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const displayController = (() => {
  const content = document.getElementById('content');
  content.innerHTML = `
  <header>
    <form action="#" id="form">
      <div id="input-container">
        <input type="text" placeholder="City" id="input-city" required/>
        <button type="submit" id="submit">
          <i class="fas fa-search" ></i>
        </button>
      </div>
      <p id="invalid-city-text">* Not Found</p>
    </form>
  </header>
  <main>
    <h1 id="city-name"></h1>
    <div id="weather-icon"></div>
    <h3 id="temperature"></h3>
    <p id="weather-text"></p>
    <div id="group-1">
      <p id="humidity"></p>
      <p id="winds"></p>
    </div>
  </main>
  `;

  const inputCity = document.getElementById('input-city');
  const invalidCityText = document.getElementById('invalid-city-text');
  const form = document.getElementById('form');

  const convert = temp => {
    const formula = parseInt(((temp - 273.15) * 9) / 5 + 32);
    return formula;
  };

  // Fetch api data
  async function apiCall() {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=8d1c03ca974d24a85e482dd06b1f0a63
      `,
        { mode: 'cors' }
      );
      if (response.status === 404) {
        invalidCityText.style.display = 'block';
      } else {
        let weatherData = await response.json().then(data => populate(data));
        invalidCityText.style.display = 'none';
      }
    } catch (e) {
      console.log(e);
    }
  }

  const conditions = [
    {
      condition: 'Thunderstorm',
      icon: '<i class="fas fa-thunderstorm"></i>',
    },
    {
      condition: 'Drizzle',
      icon: '<i class="fas fa-cloud-rain"></i>',
    },
    {
      condition: 'Rain',
      icon: '<i class="fas fa-cloud-showers-heavy"></i>',
    },
    {
      condition: 'Snow',
      icon: '<i class="fas fa-snowflake"></i>',
    },
    {
      condition: 'Clear',
      icon: '<i class="fas fa-sun"></i>',
    },
    {
      condition: 'Clouds',
      icon: '<i class="fas fa-cloud"></i>',
    },
    {
      condition: 'Mist',
      icon: '<i class="fas fa-cloud-sun"></i>',
    },
  ];

  const populate = data => {
    const cityName = document.getElementById('city-name');
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const weatherText = document.getElementById('weather-text');
    const humidity = document.getElementById('humidity');
    const winds = document.getElementById('winds');

    cityName.textContent = data.name;
    temperature.textContent = `${convert(data.main.temp)}°`;
    weatherText.textContent = data.weather[0].main;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    winds.textContent = `Winds: ${data.wind.speed} meter/sec`;

    for (let i = 0; i < conditions.length; i++) {
      if (conditions[i].condition === data.weather[0].main) {
        weatherIcon.innerHTML = conditions[i].icon;
      }
    }
  };

  form.addEventListener('submit', apiCall);

  // Initialize los angeles weather by default
  async function init(city) {
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d1c03ca974d24a85e482dd06b1f0a63
      `,
        { mode: 'cors' }
      );
      let weatherData = await response.json().then(data => populate(data));
    } catch (e) {
      console.log(e);
    }
  }

  init('Ferizaj');
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELGdCQUFnQjtBQUM3RTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyx3QkFBd0I7QUFDekQ7QUFDQSx3Q0FBd0MsbUJBQW1CO0FBQzNELGtDQUFrQyxnQkFBZ0I7O0FBRWxELG1CQUFtQix1QkFBdUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxLQUFLO0FBQ2xFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGlzcGxheUNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKTtcbiAgY29udGVudC5pbm5lckhUTUwgPSBgXG4gIDxoZWFkZXI+XG4gICAgPGZvcm0gYWN0aW9uPVwiI1wiIGlkPVwiZm9ybVwiPlxuICAgICAgPGRpdiBpZD1cImlucHV0LWNvbnRhaW5lclwiPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkNpdHlcIiBpZD1cImlucHV0LWNpdHlcIiByZXF1aXJlZC8+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGlkPVwic3VibWl0XCI+XG4gICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2VhcmNoXCIgPjwvaT5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxwIGlkPVwiaW52YWxpZC1jaXR5LXRleHRcIj4qIE5vdCBGb3VuZDwvcD5cbiAgICA8L2Zvcm0+XG4gIDwvaGVhZGVyPlxuICA8bWFpbj5cbiAgICA8aDEgaWQ9XCJjaXR5LW5hbWVcIj48L2gxPlxuICAgIDxkaXYgaWQ9XCJ3ZWF0aGVyLWljb25cIj48L2Rpdj5cbiAgICA8aDMgaWQ9XCJ0ZW1wZXJhdHVyZVwiPjwvaDM+XG4gICAgPHAgaWQ9XCJ3ZWF0aGVyLXRleHRcIj48L3A+XG4gICAgPGRpdiBpZD1cImdyb3VwLTFcIj5cbiAgICAgIDxwIGlkPVwiaHVtaWRpdHlcIj48L3A+XG4gICAgICA8cCBpZD1cIndpbmRzXCI+PC9wPlxuICAgIDwvZGl2PlxuICA8L21haW4+XG4gIGA7XG5cbiAgY29uc3QgaW5wdXRDaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0LWNpdHknKTtcbiAgY29uc3QgaW52YWxpZENpdHlUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ludmFsaWQtY2l0eS10ZXh0Jyk7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybScpO1xuXG4gIGNvbnN0IGNvbnZlcnQgPSB0ZW1wID0+IHtcbiAgICBjb25zdCBmb3JtdWxhID0gcGFyc2VJbnQoKCh0ZW1wIC0gMjczLjE1KSAqIDkpIC8gNSArIDMyKTtcbiAgICByZXR1cm4gZm9ybXVsYTtcbiAgfTtcblxuICAvLyBGZXRjaCBhcGkgZGF0YVxuICBhc3luYyBmdW5jdGlvbiBhcGlDYWxsKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcbiAgICAgICAgYGh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9JHtpbnB1dENpdHkudmFsdWV9JmFwcGlkPThkMWMwM2NhOTc0ZDI0YTg1ZTQ4MmRkMDZiMWYwYTYzXG4gICAgICBgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgICApO1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIGludmFsaWRDaXR5VGV4dC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKS50aGVuKGRhdGEgPT4gcG9wdWxhdGUoZGF0YSkpO1xuICAgICAgICBpbnZhbGlkQ2l0eVRleHQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb25kaXRpb25zID0gW1xuICAgIHtcbiAgICAgIGNvbmRpdGlvbjogJ1RodW5kZXJzdG9ybScsXG4gICAgICBpY29uOiAnPGkgY2xhc3M9XCJmYXMgZmEtdGh1bmRlcnN0b3JtXCI+PC9pPicsXG4gICAgfSxcbiAgICB7XG4gICAgICBjb25kaXRpb246ICdEcml6emxlJyxcbiAgICAgIGljb246ICc8aSBjbGFzcz1cImZhcyBmYS1jbG91ZC1yYWluXCI+PC9pPicsXG4gICAgfSxcbiAgICB7XG4gICAgICBjb25kaXRpb246ICdSYWluJyxcbiAgICAgIGljb246ICc8aSBjbGFzcz1cImZhcyBmYS1jbG91ZC1zaG93ZXJzLWhlYXZ5XCI+PC9pPicsXG4gICAgfSxcbiAgICB7XG4gICAgICBjb25kaXRpb246ICdTbm93JyxcbiAgICAgIGljb246ICc8aSBjbGFzcz1cImZhcyBmYS1zbm93Zmxha2VcIj48L2k+JyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGNvbmRpdGlvbjogJ0NsZWFyJyxcbiAgICAgIGljb246ICc8aSBjbGFzcz1cImZhcyBmYS1zdW5cIj48L2k+JyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGNvbmRpdGlvbjogJ0Nsb3VkcycsXG4gICAgICBpY29uOiAnPGkgY2xhc3M9XCJmYXMgZmEtY2xvdWRcIj48L2k+JyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGNvbmRpdGlvbjogJ01pc3QnLFxuICAgICAgaWNvbjogJzxpIGNsYXNzPVwiZmFzIGZhLWNsb3VkLXN1blwiPjwvaT4nLFxuICAgIH0sXG4gIF07XG5cbiAgY29uc3QgcG9wdWxhdGUgPSBkYXRhID0+IHtcbiAgICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaXR5LW5hbWUnKTtcbiAgICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3ZWF0aGVyLWljb24nKTtcbiAgICBjb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZW1wZXJhdHVyZScpO1xuICAgIGNvbnN0IHdlYXRoZXJUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dlYXRoZXItdGV4dCcpO1xuICAgIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2h1bWlkaXR5Jyk7XG4gICAgY29uc3Qgd2luZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luZHMnKTtcblxuICAgIGNpdHlOYW1lLnRleHRDb250ZW50ID0gZGF0YS5uYW1lO1xuICAgIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7Y29udmVydChkYXRhLm1haW4udGVtcCl9wrBgO1xuICAgIHdlYXRoZXJUZXh0LnRleHRDb250ZW50ID0gZGF0YS53ZWF0aGVyWzBdLm1haW47XG4gICAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgSHVtaWRpdHk6ICR7ZGF0YS5tYWluLmh1bWlkaXR5fSVgO1xuICAgIHdpbmRzLnRleHRDb250ZW50ID0gYFdpbmRzOiAke2RhdGEud2luZC5zcGVlZH0gbWV0ZXIvc2VjYDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZGl0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGNvbmRpdGlvbnNbaV0uY29uZGl0aW9uID09PSBkYXRhLndlYXRoZXJbMF0ubWFpbikge1xuICAgICAgICB3ZWF0aGVySWNvbi5pbm5lckhUTUwgPSBjb25kaXRpb25zW2ldLmljb247XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXBpQ2FsbCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBsb3MgYW5nZWxlcyB3ZWF0aGVyIGJ5IGRlZmF1bHRcbiAgYXN5bmMgZnVuY3Rpb24gaW5pdChjaXR5KSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JmFwcGlkPThkMWMwM2NhOTc0ZDI0YTg1ZTQ4MmRkMDZiMWYwYTYzXG4gICAgICBgLFxuICAgICAgICB7IG1vZGU6ICdjb3JzJyB9XG4gICAgICApO1xuICAgICAgbGV0IHdlYXRoZXJEYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YSA9PiBwb3B1bGF0ZShkYXRhKSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgfVxuICB9XG5cbiAgaW5pdCgnbG9zIGFuZ2VsZXMnKTtcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9