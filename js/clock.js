const clockContainer = document.querySelector(".js-clock"),
        clockTitle = clockContainer.querySelector("h1"); //or .js-title을 해도 상관없음

function getTime()  {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconde = date.getSeconds();

  clockTitle.innerText = `${
    hours < 10 ? `0${hours}` : hours
    }:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${
      seconde < 10 ? `0${seconde}` : seconde
    }`; 
}

function clock()  {
  getTime();
  
  setInterval(getTime, 1000)
}

clock();