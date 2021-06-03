const search = document.querySelector("#search"),   // 검색 div
      searchInput = search.querySelector("input"),  // 검색 div 의 input
      searcForm = document.querySelector("#searcForm"); // 검색 div의 form

let searchOn = false;   // 검색 on/off


function handleSearchEvent()    {   // 검색 div 클릭시
    setTimeout(() => {  // 0.3초후 실행
        if(searchOn === false)    { // 기본 검색이 on 되었을때
            search.className = "searchOn"   // 검색 div 확장을 위한 클래스 추가
            searchOn = true;    // 검색 on
        } else  { // 검색 div 재 클릭시
            searchOn = false;   // 검색이 off 되며
            search.className = "";  // 검색 div가 축소
        }
    }, 300);
}

function handleSearchInput()    {   // 검색 input 클릭시
    searchOn = false;   // 검색이 클릭되어 off로 변하지 않고 on을 유지
    search.className = "searchOn"   // 위의 내용과 동일
}

function handleSearchSubmit(event)   {  // 검색 form에 submit 시
    event.preventDefault(); // 페이지 submit 막기
    const searchData = searchInput.value;   // input에 입력된 값을 가져옴
    location.href = `https://www.google.com/search?q=${searchData}`;    // 위의 값을 입력하여 구글 검색으로 이동
}

search.addEventListener("click",handleSearchEvent); // 검색 div 클릭시
searchInput.addEventListener("click",handleSearchInput);    // 검색 input 클릭시
searcForm.addEventListener("submit",handleSearchSubmit);    // 검색 submit 되었을때