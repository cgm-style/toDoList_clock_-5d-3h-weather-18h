const toDoForm = document.querySelector(".js-toDoForm"),
	toDoInput = toDoForm.querySelector("input"),
	toDoList = document.querySelector(".js-toDoList");
	toDoEndList = document.querySelector(".js-toDoEndList");

function saveTodo()	{
	event.preventDefault();
	const nowToDo = toDoInput.value;
	console.log("ok");
}

const TODOS_LS = 'toDos'

let toDos = [];

function deletToDo(event)	{
	const btn	=	event.target;
	const li = btn.parentNode;
	toDoList.removeChild(li);

	const cleanToDos = toDos.filter(function(toDo){
		return toDo.id !== parseInt(li.id);
	});
	toDos = cleanToDos;
	saveToDos();
}

function saveToDos() {
	localStorage.setItem(TODOS_LS, JSON.stringify(toDos))
}

function paintToDo(text)	{
	const li = document.createElement("li");
	const delBtn = document.createElement("button");
	const span = document.createElement("span");
	const newId = toDos.length + 1;
	delBtn.innerText = "X";
	delBtn.addEventListener("click", deletToDo)
	span.innerText = text;
	li.appendChild(delBtn);
	li.appendChild(span)
	li.id = newId;
	toDoList.appendChild(li);

	const toDoObj = {
		text : text,
		id : newId
	}
	toDos.push(toDoObj);
	saveToDos();
}

function handleSubmut(event)	{
	event.preventDefault();
	const currentValue = toDoInput.value;
	paintToDo(currentValue);
	toDoInput.value = "";
}

function loadToDos()	{
	const loadToDos = localStorage.getItem(TODOS_LS)
	if(loadToDos !== null)	{
		const parsedToDos = JSON.parse(loadToDos);
		console.log(parsedToDos);
		parsedToDos.forEach(function(toDo) {
			paintToDo(toDo.text)
		})
	}
}

function init()	{
	loadToDos();
	toDoForm.addEventListener("submit", handleSubmut)
}

init();