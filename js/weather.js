const weather = document.querySelector(".js-weather"),
      timeChk = document.querySelector(".js-timeChk"),
      timeChkOption = timeChk.querySelector(".js-timeChk option"),
      js_NowWeather = document.querySelector(".js_NowWeather"),
      prevBtn = document.querySelector("#prevBtn"),
      nextBtn = document.querySelector("#nextBtn"),
      API_KEY = 'c65eec58bb72eba4ba267415b3d37432',
      COORDS = 'coords',
      selectMonth = document.querySelector("#jsMonth form select"),
      monthText = document.querySelectorAll("#jsMonth form select option"),
      calendarBtn = document.querySelector("#calendarBtn"),
      tableBox = document.querySelector("#tableBox"),
      nowDate = new Date(),
      Tbody = document.querySelector("#jsTbody"),
      calendarContainerBox = document.querySelector("#calendarBox"),
      jsCalenderTitle = document.querySelector("#jsCalenderTitle"),
      blackBack = document.querySelector("#blackBack");


let weatherChk = 0,
    chk_Number = weather.childNodes.length + 5,
    chkTime =  null,
    calendarToggle = false,
    nowDays = nowDate.getDate(),
    nowMonth = nowDate.getMonth(),
    nowyers = nowDate.getFullYear(),
    days = false,
    countDays = 1,
    nextDate = 1,
    date = new Date(nowyers,nowMonth,nowDays),
    firstDate = new Date(nowyers,nowMonth,1),
    lastDate = new Date(nowyers,nowMonth+1,0),
    prevMonthFirstDate = new Date(nowyers,nowMonth-1,1),
    prevMonthLastDate = new Date(nowyers,nowMonth,0);



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


function addCalendar()  {
    let checkd = 0,
    firstDate = new Date(nowyers,nowMonth,1),
    countDays = 1,
    nextDate = 1;
    
    for(let adtr=1; adtr<=6; adtr++ )  {    // 달력의 몸통부분을 만드는 반복문 
        const addtr = document.createElement("tr");
        addtr.id = `tr${adtr}`;
        Tbody.appendChild(addtr);
        for(let adtd=1; adtd<=7; adtd++)   {
            const   addtd = document.createElement("td"),
                    dayChack = firstDate.getDay()+1;

            let checkLenght = Tbody.rows.length;

                checkd = checkd+1;

            addtr.appendChild(addtd);
            addtd.className = `td${checkd}`;
            addtd.name = checkd;

            const nameChack = addtd.name;

            checktd(dayChack,nowMonth);

            const TbodyTd = addtd;

            TbodyTd.addEventListener("mousedown",handleTdCalender);
        }
    }
}

function checktd(firstDay,nowMonth)  {
    const tdList = document.querySelectorAll("#jsTbody tr:last-child td:last-child");

    firstDate = new Date(nowyers,nowMonth,1)
    lastDate = new Date(nowyers,nowMonth+1,0)
    prevMonthFirstDate = new Date(nowyers,nowMonth-1,1)
    prevMonthLastDate = new Date(nowyers,nowMonth,0)

    

    monthText[nowMonth].defaultSelected = true;


    if(days === false){
        if(tdList[0].name === firstDay) {
            tdList[0].innerText = `${countDays}`;
            tdList[0].style.color = "white";
            days = true;
            if(countDays === nowDays)   {
                tdList[0].style.background = "skyblue";
            }

        } else  {
            let prevDate = prevMonthLastDate.getDate()+1;
            prevDate = prevDate - (firstDay - tdList[0].name);
            tdList[0].innerText = `${prevDate}`;
            tdList[0].style.color = "gray";
        }
    } else {
        if (countDays < lastDate.getDate())  {
            countDays = countDays + 1;
            tdList[0].innerText = `${countDays}`;
            tdList[0].style.color = "white";
            if(countDays === nowDays)   {
                tdList[0].style.background = "skyblue";
            }
            return false;
        }else  {
            tdList[0].innerText = `${nextDate}`;
            nextDate = nextDate + 1;
            tdList[0].style.color = "gray";
        }
    }
}

function prevMonthCalendar()    {
    if(nowMonth >= 1)   {
        nowMonth = nowMonth - 1;
        date = new Date(nowyers,nowMonth,nowDays);

        Tbody.innerHTML = "";
        days = false,
        countDays = 1,
        nextDate = 1;

        selectMonth.selectedIndex = nowMonth;

        addCalendar();
    }
}

function nextMonthCalendar()    {
    if(nowMonth < 11)   {
        nowMonth = nowMonth + 1;
        date = new Date(nowyers,nowMonth,nowDays);

        Tbody.innerHTML = "";
        days = false,
        countDays = 1,
        nextDate = 1;

        selectMonth.selectedIndex = nowMonth;

        addCalendar();
    }
}

function selectMonthCalendar()  {
    let selectMonthValue = selectMonth.selectedIndex;
    nowMonth = selectMonthValue;

    date = new Date(nowyers,nowMonth,nowDays);

    Tbody.innerHTML = "";
    days = false,
    countDays = 1,
    nextDate = 1;

    addCalendar();
}

function handlecalendarBtn()    {
    if(calendarToggle === false)    {
        calendarBtn.className = "calendarOn";
        tableBox.style.display="block";
        calendarToggle = true;
        setTimeout(() => {
            tableBox.className = "tableBoxOn"
        }, 100);
    } else  {
        calendarContainerBox.style.display ="none";
    blackBack.style.display = "none"
    tableBox.style.display="none";
    blackBack.className = "";
    calendarContainerBox.className = "";

    calendarBtn.className = "";
    tableBox.className = ""
    calendarToggle = false;
    }
}
tableBox.style.display="none";
blackBack.style.display = "none"
calendarContainerBox.style.display ="none";
function handleTdCalender(event) {
    calendarContainerBox.style.display ="block";
    blackBack.style.display = "block";
    calendarContainerBox.className = "";
    toDos= [];

    const checkTd = event.target;
    
    let checkMonth = selectMonth.selectedIndex+1;

    for(i=1; i <= 42; i++)   {
        let tdBackground = document.querySelector(`.td${i}`);
        tdBackground.style.background = "";
    }

    checkTd.style.background = "pink";

    TODOS_LS = `${nowyers}-${checkMonth}-${checkTd.innerText}`;
    newId = 0;
    
    loadToDos(nowyers,checkMonth,checkTd.innerText);

    setTimeout(() => {
        blackBack.className = "blackBack";
    }, 200)

    setTimeout(() => {
        tableBox.className = "tableBoxOn"
        calendarContainerBox.className = "calenderBoxOn";
    }, 300);

    jsCalenderTitle.innerText = `${nowyers}-${checkMonth}-${checkTd.innerText}`;
}

function reMoveCalender()   {
    tableBox.style.display="none";
    calendarContainerBox.style.display ="none";
    blackBack.style.display = "none";
    favoritesform.style.display = "none";
    blackBack.className = "";
    calendarContainerBox.className = "";

    calendarBtn.className = "";
    tableBox.className = ""
    calendarToggle = false;
}

selectMonth.addEventListener("change",selectMonthCalendar);
prevBtn.addEventListener("click",prevMonthCalendar);
nextBtn.addEventListener("click",nextMonthCalendar);
calendarBtn.addEventListener("click",handlecalendarBtn);
blackBack.addEventListener("click",reMoveCalender);

function init() {
    loadCoords();
    addCalendar();
}
init();
