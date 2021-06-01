const toDoForm = document.querySelector(".js-toDoForm"),
	toDoInput = toDoForm.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList"),
	toDoEndList = document.querySelector(".js-toDoEndList");

function saveTodo()	{	// saveTodo
	event.preventDefault(); // 이벤트 막기
	const nowToDo = toDoInput.value;	// input의 값을 저장
}

let TODOS_LS = '';

let toDos = [];	// 빈 객체 생성

function deletToDo(event)	{		// X 버튼 누를시 이벤트
	const btn	=	event.target;	// 이벤트가 발생한 객체를 선택
	const li = btn.parentNode.parentNode;	//	그 객체의 부모의 부모를 찾아감.
	console.dir(li);

	if(li.parentNode.className === "js-toDoEndList")	{	// 찾아간 객체의 부모의 클래스 네임이 같을경우
		toDoEndList.removeChild(li);	// toDoEndList 에서 객체를 삭제
	}else	{	// 같지 않을 경우
		toDoList.removeChild(li);	// toDolist 에서 삭제
	}
	

	const cleanToDos = toDos.filter(function(toDo){	// 필터 추정function의 toDo값은 변수 toDos에서 걸래낸다
		return toDo.id !== parseInt(li.id);	//	toDos의 객체 임의값의 ID가 li의 ID와 같을 경우 이것을 제외한 나머지 값을 리턴.
	});
	toDos = cleanToDos;	// filter에 일치한 li 객체를 제외한 내용을 받음
	saveToDos();	//위의 필터링 된것을 저장 결과적으로 삭제한것이 됨
}

function clearBtnToDo(event)	{	// v체크 표시를 눌렀을떄
	const clearBtn = event.target,	// 이벤트가 발생한 객체
		  clearBtnli = clearBtn.parentNode.parentNode,	// 해당 엘리먼트의 부모의 부모
		  clickCheckId = clearBtnli.id;	// 엘리먼트의 id 키 

		  console.dir(clearBtn);

		  toDoList.removeChild(clearBtnli);	// 우선 toDoList에서 체크표시한 객체를 삭제

		let cleanToDos = toDos.filter(function(toDo){	// 필터 추정function의 toDo값은 변수 toDos에서 걸래낸다
			return  toDo.id === parseInt(clickCheckId);	// toDo에서 id 중 선택한 엘리먼트키와 같은 id를 가진아이만 리턴
		})

		cleanToDos[0].clearOn = true;	// 위 필터에서 나온 id값이 같은 객체에 clearOn을 true로 추가

		paintToDo(cleanToDos[0].text,cleanToDos[0].clearOn); //위의 모든 값을 텍스트,clear 여부,id값을 paintToDo로 보냄

		let clearRemoveToDos = toDos.filter(function(toDo){	// 필터 추정function의 toDo값은 변수 toDos에서 걸래낸다
			return toDo.clearOn !== true;	//	toDos의 모든 객체중 ClearOn이 아닌 객체만 리턴
		});

		toDos = clearRemoveToDos;	// 리턴받은 Clear이 false 없는 아이들만 toDos에 저장
		saveToDos();	//위의 필터링 된것을 저장 결과적으로 삭제한것이 됨

}

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos))	// 받아온 내용을 로컬스토리지에 저장
}

function paintToDo(text,clear)	{	// 텍스트,클리어여부,id값을 받아옴
	const li = document.createElement("li");	// li 생성
	const delBtn = document.createElement("button");	// button 생성
	const span = document.createElement("span");	// span 생성
	const newId = toDos.length + 1,	// 새로운 id생성 toDos의 객체 수 +1의 값
		  clearBtn = document.createElement("button");	// button생성

	delBtn.innerHTML = "<i class='fas fa-times'></i>";	// x아이콘 생성
	clearBtn.innerHTML= '<i class="fas fa-check"></i>';	// v체크 아이콘 생성

	delBtn.addEventListener("click", deletToDo);	// x버튼 클릭시 이벤트
	clearBtn.addEventListener("click", clearBtnToDo);	// v버튼 클릭시 이벤트

	li.appendChild(delBtn);	// li에 삭제버튼 생성
	li.appendChild(clearBtn);	// li에 체크버튼 생성
	li.appendChild(span);	// li에 span 생성

	span.innerText = text;	// span의 text 내용 
	li.id = newId;	// li에 id 값 생성
	delBtn.className = "delBtn";	// 삭제 버튼에 class 생성
	clearBtn.className = "clearBtn";	// 체크 버튼에 class 생성

	if(clear === false)	{	// clear가 아니라면
		

		let checkItem = toDos.filter(function(hitChk){	// 필터 toDos에서 
			return hitChk.text === text;	//	객체 하나하나의 text와 받아오는 text의 값이 같은 값을 보내줌
		});
		if(checkItem.length >= 1)	{	// 위의 필터에서 받은 값중 .length가 1이상이라면 즉, 중복되는 값이 없다면 (단점 같은 일을 집어 넣어도 저장이 불가능하나 toDO에 같은일 2개 넣는게 이상함)
			let remindId = checkItem[0].id;	// 필터에서 리턴 받은 값의 id

			let reTdItem = toDos.filter(function(chkTd){	// 필터 toDos에서
				return chkTd.text !== text;	//	객체 하나하나의 text를 받아오는 text값과 대조하여 아닌 모든 값을 리턴
			});

			toDos = reTdItem;	//toDos에 위의 필터에 걸러진 text값이 동일한 아이를 제외한 모든 객체를 저장

			const toDoObj = {	// 새로 생성되는 오브젝트 차이점은 페이지 새로고침없이 다시 달력으로 돌아갈 경우 이전 Id값을 기억하여 li에게 줌
				text : text,
				id : remindId,
				clear : clear
			}


			toDos.push(toDoObj);	// 새로 생성된 오브젝트를 toDos에 추가

			li.id = remindId;	// 이전의 Id를 새로만들 id에 입력

		}else	{	// 만약 length가 0이라면
			const toDoObj = {	// 새로 생성되는 오브젝트
				text : text,
				id : newId,	
				clear : clear
			}
			toDos.push(toDoObj);	// 새로 생성된 오브젝트를 toDos에 추가
		}
		saveToDos();	// 바뀐 내용을 localStorage에 저장


		toDoList.appendChild(li);	// 해야할 리스트에 생성
	}else	{	// clear라면 

		let check = toDos.filter(function(chk){	// 필터 toDos에서
			return chk.text !== text;	//	toDos의 모든 객체중 text가 중복되는 값을 제외한 모두
		});
		toDos = check;	// 위의 값을 toDos에 저장
		saveToDos();	// localstory

		toDoEndList.appendChild(li);	// 클리어 리스트에 생성
		clearBtn.remove();	// 클리어를 이미 했기에 클리어 버튼 삭제

		const toDoObj = {	// 새로 생성되는 오브젝트
			text : text,
			id : newId,
			clear : clear
		}

		toDos.push(toDoObj);	// 새로 생성된 오브젝트를 toDos에 추가
		saveToDos();	// 바뀐 내용을 로컬스토리지에 저장
	}
}

function handleSubmut(event)	{	// toDO input 타이핑 시
	event.preventDefault();	// 이벤트를 막음 
	const currentValue = toDoInput.value;	// input의 값을 저장
	paintToDo(currentValue,false);	// 해당하는 내용을 paint에 저장
	toDoInput.value = "";	// input 추가
}

function loadToDos(y,m,d)	{	// 저장된 것을 프린팅
	toDoList.innerHTML = "";	// 혹시 새로고침 없이 한번 load한 리스트를 다시 불러올때 기존의 내용을 삭제
	toDoEndList.innerHTML = "";	// 위 내용과 동일

	const loadToDos = localStorage.getItem(TODOS_LS) // 로컬 스토리지에 저장된 내용 불러오기
	if(loadToDos !== null)	{	// 로드된 값이 null(없는) 값이 아니라면
		const parsedToDos = JSON.parse(loadToDos);	// 로컬스토리지에서 가져온값
		parsedToDos.forEach(function(toDo) {	// 내용 찾기
			let tdId = toDo.id,
				tdText = toDo.text,
				tdClear = toDo.clear;

				paintToDo(tdText,tdClear);	// 텍스트와 클리어 여부를 찾은후 이것을 paintToDo로 보냄
				
			//toDos = cleanToDos;	// filter에 일치한 li 객체를 제외한 내용을 받음
			//saveToDos();	// 바뀐 내용을 로컬스토리지에 저장
		})
	}
}

function init()	{	// 함수 실행
	toDoForm.addEventListener("submit", handleSubmut);
}

init();
