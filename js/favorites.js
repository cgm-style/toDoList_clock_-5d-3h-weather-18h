const favoritesform = document.querySelector("#formFavorites"), // form 즐겨찾기 name과 url을 물어보는 곳
      favorites = document.querySelector("#favorites"), // 즐겨찾기 리스트
      addFavorites = document.querySelector("#addFavorites"),   // 즐겨찾기 추가하는 버튼
      favoritesName = document.querySelector("#favoritesName"), // 즐겨찾기 이름 input
      favoritesUrl = document.querySelector("#favoritesUrl"),   // 즐겨찾기 url input
      addFavoritesBtn = document.querySelector("#addFavoritesBtn"), // 생성 버튼
      removeFavorites = document.querySelectorAll(".removeFavorites");  // 삭제 버튼

let favoritesList = "favoritesList",    // 로컬스토리지에 저장할 key 이름
    saveFavoritesList = []; // 로컬스토리지 key에 저장될 값 빈 객체

function handleblackBackEvent() {   //  즐겨찾기 생성을 누르면
    blackBack.style.display = "block";  // 뒤에 검은색 배경 생성

    setTimeout(() => {  // 0.1초 후
        blackBack.className = "blackBack";  // 검은색 배경 css 생성
        favoritesform.style.display = "block";  // 즐겨찾기 생성 form 생성
    }, 100);

}

function handleFavoritesForm(event)  {  // 즐겨찾기 생성 버튼에 submit이 된 경우
    event.preventDefault(); // submit의 이벤트를 막음
    
    let fvrtName = favoritesName.value, // 즐겨찾기 이름 값
        fvrtUrl = favoritesUrl.value;   // 즐겨찾기 url 값

        addLocalFavorites(fvrtName,fvrtUrl) // 즐겨찾기 생성.

    favoritesName.value = "";   // 즐겨찾기 이름 input 초기화
    favoritesUrl.value = "";    // 즐겨찾기 url input  초기화

    reMoveCalender();   // 검은색 배경 및 생성 form 닫기
}

function addLocalFavorites(favrtname,favrturl)    { // 즐겨찾기 생성
    const addFavoritesDiv = document.createElement("a"),    // 즐겨찾기 container
          favoritesIconDiv = document.createElement("div"), // 파비콘이 담길 div
          removeFavoritesDiv = document.createElement("div"),   // 삭제 버튼 div
          removeIconI = document.createElement("i"),    // 삭제 버튼 아이콘
          favoritesIconDivI = document.createElement("i"),  // 파비콘
          favoritesTextP = document.createElement("p"); // 즐겨찾기 이름

    favorites.appendChild(addFavoritesDiv); // 각 위에서 설명한 단 생성
    addFavoritesDiv.appendChild(favoritesIconDiv);
    favoritesIconDiv.appendChild(favoritesIconDivI);
    addFavoritesDiv.appendChild(favoritesTextP);
    addFavoritesDiv.appendChild(removeFavoritesDiv);
    removeFavoritesDiv.appendChild(removeIconI);
    
    addFavoritesDiv.className = "aLink";    // 즐겨찾기 클래스 생성
    favoritesIconDiv.className = "favoritesIcon";   // 파비콘 클래스 생성
    favoritesIconDivI.style.background = `url("http://www.google.com/s2/favicons?domain=${favrturl}")`; // 파비콘 생성
    favoritesTextP.className = "favoritesText"; // 즐겨찾기 이름 클래스 생성
    removeFavoritesDiv.className = "removeFavorites";   // 삭제 버튼 클래스 생성
    removeIconI.className = "fas fa-times"; // 삭제버튼 아이콘 생성

    addFavoritesDiv.href = favrturl;    // 즐겨찾기 링크 추가
    favoritesTextP.innerText = favrtname;   // 즐겨찾기 이름 추가

    let favoritesObject = { // 로컬에 저장될 객체값 생성
        name : favrtname,   // name 에 input에 입력된 name값
        url : favrturl  // url에 input에 입련된 url값
    }
    saveFavoritesList.push(favoritesObject);    // 위의 내용을 객체 값에 추가

    saveLocalFavorites();   // 추가된 객체값을 로컬스토리지에 저장

    removeFavoritesDiv.addEventListener("click", function(event) {  // 삭제 버튼이 클릭될 경우
        addFavoritesDiv.href = "#"; // 이벤트 임시 막기

        addFavoritesDiv.remove();   // 삭제 버튼을 누른 div 삭제

        const removeFavorList = localStorage.getItem(favoritesList);    // 로컬스토리지에서 현재 객체값을 가져옴

        const filterRemoveFavorlist = saveFavoritesList.filter(function(filterFvrt){    // 객체값을 비교
            return filterFvrt.url !== favrturl; // 가져온 객체값의 url과 클릭한 버튼의 이동될 url이 같지 않은 것들만 리턴
        })
        saveFavoritesList = filterRemoveFavorlist;  // 리턴받은 값을 객체에 다시 저장
        saveLocalFavorites();   // 저장받은 값을 로컬스토리지에 저장
    })
}

function saveLocalFavorites()   {   // 로컬스토리지에 저장 favoritesList 라는 키의 값에 saveFavoritesList라는 객체를 저장
    localStorage.setItem(`${favoritesList}`,JSON.stringify(saveFavoritesList))  
}

function loadFavoritesList()  { // 읽어오기 
    const favoritesLoadList = localStorage.getItem(favoritesList);  // 저장되어 있는 로컬스토리지를 가져옴 아직 가공이 안되어 읽을 수 없음

    if(favoritesLoadList !== null)    {
        const favrtSaveList = JSON.parse(favoritesLoadList) // 가져온 데이터의 문자열을 분석하고 스크립트 값이나 객체를 생성함 
        favrtSaveList.forEach(function(favrtList) { // 가져온 객체 하나하나 실행
            let favrtName = favrtList.name, // 가져온 객체의 name값
                favrtUrl = favrtList.url;   // 가져온 객체의 url값
            addLocalFavorites(favrtName,favrtUrl);  // 가져온 값들을 즐겨찾기 생성단으로 이동
        });
    }
}

addFavorites.addEventListener("click",handleblackBackEvent);    // 즐겨찾기 생성 버튼 클릭
favoritesform.addEventListener("submit",handleFavoritesForm);   // 즐겨찾기 submit 완료 되었을때

loadFavoritesList(); // 기본 즐겨찾기 로드