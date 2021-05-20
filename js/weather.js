const weather = document.querySelector(".js-weather");
let weatherChk = 0;
let chk_Number = weather.childNodes.length + 5;

const API_KEY = 'c65eec58bb72eba4ba267415b3d37432';
const COORDS = 'coords';


function getWeather(lat, lng)   {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
        )
        .then(function(response){
            return response.json();
        })
        .then(function(json)  {

            const newWeatherChk =  json;
            const newWeatherWeather =  json.list[chk_Number].weather[0].main;
            const newWeatherTime = json.list[chk_Number].dt_txt;
            const newWeatherTemp = json.list[chk_Number].main.temp;

            console.log(json);
            
            const divContainerId = weatherChk + 1;

            
            const newWeather = document.createElement("div");
            const newWeatherTimeSpan = document.createElement("span");
            const newWeatherTempSpan = document.createElement("span");
            const newWeatherWeatherSpan = document.createElement("span");
            
            weather.appendChild(newWeather);
            newWeather.appendChild(newWeatherTimeSpan);
            newWeather.appendChild(newWeatherTempSpan);
            newWeather.appendChild(newWeatherWeatherSpan);
            
            newWeather.id = divContainerId;
            newWeatherTimeSpan.id = `span${divContainerId}_1`;
            newWeatherTempSpan.id = `span${divContainerId}_2`;
            newWeatherWeatherSpan.id = `span${divContainerId}_3`;

            newWeatherTimeSpan.innerText = `${newWeatherTime}`;
            newWeatherTempSpan.innerText = `${newWeatherTemp}`;
            newWeatherWeatherSpan.innerText = `${newWeatherWeather}`;

            chk_Number = chk_Number + 8 ;
            console.log(chk_Number);
        })
}

function saveCoords(coordsObj)   {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position)  {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
    for (step = 0; step < 5; step++) {
        getWeather(latitude,longitude);
      }
}

function handleGeoError()  {
    console.log('cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}

function loadCoords()   {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else  {
        const parsedCoords = JSON.parse(loadedCoords);
        for (step = 0; step < 5; step++) {
            getWeather(parsedCoords.latitude, parsedCoords.longitude);
          }
    }
}

function init() {
    loadCoords();
}
init();
