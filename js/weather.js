const weather = document.querySelector(".js-weather"),
      timeChk = document.querySelector(".js-timeChk"),
      timeChkOption = timeChk.querySelector("option"),
      js_NowWeather = document.querySelector(".js_NowWeather");
let weatherChk = 0;
let chk_Number = weather.childNodes.length + 5;
let chkTime =  null;

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
            if (chkTime === null)   {
                for(time=0; time < 8; time++){
                    chkTime =  json.list[time].dt_txt;
                    chkTime = chkTime.substr(11,2);
                    //  console.log(chkTime); 모든 시간 체크

                    const timeChkOption = document.createElement("option");
                    timeChk.appendChild(timeChkOption);
                    timeChkOption.id = `option${time}`;
                    timeChkOption.innerText = `${chkTime}`;
                }
            }
            
            const newWeatherWeather =  json.list[chk_Number].weather[0].main;
            const newWeatherTime = json.list[chk_Number].dt_txt;
            const newWeatherTemp = json.list[chk_Number].main.temp;
            const cityChk  = json.city.name;


            // console.log(json); api값 확인
            
            const divContainerId = weatherChk + 1;

            
            const newWeather = document.createElement("div"),
                  newWeatherTimeSpan = document.createElement("span"),
                  newWeatherTempSpan = document.createElement("span"),
                  newWeatherWeatherSpan = document.createElement("span");

            
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
            js_NowWeather.innerText = `now_city_${cityChk}`;

            
            

            chk_Number = chk_Number + 8 ;
            
            //  console.log(chk_Number); 시간대 확인


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
    timeChk.addEventListener("change", changeTime);

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

function changeTime(event)   {
    const selectTime = timeChk.selectedIndex;
    weather.innerHTML="";
    chk_Number = selectTime;
    loadCoords();
}

function init() {
    loadCoords();
}
init();
