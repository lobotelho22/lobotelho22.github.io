const addTask = document.getElementById('criar-tarefa');
const clearTasks = document.getElementById('apaga-tudo');
const rmvFinished = document.getElementById('remover-finalizados');
const saveBtn = document.getElementById('salvar-tarefas');
const input = document.getElementById('texto-tarefa');
const tarefas = document.getElementsByClassName('tarefa-por-fazer');

function localStorageIsVoid() {
  if (localStorage.length > 0) {
    return false;
  }
  return true;
}

function generateDataString() {
  let dataString = localStorage.data;
  dataString = dataString.replaceAll(',', '');
  return dataString;
}

function loadTaskItens(dataString) {
  const storageTask = document.getElementById('guarda-lista');
  storageTask.innerHTML = '   ';
  const TaskItens = document.createElement('ol');
  TaskItens.id = 'lista-tarefas';
  TaskItens.innerHTML = dataString;
  storageTask.appendChild(TaskItens);
}

function bgColorTask(event) {
  const listTaskItens = document.querySelectorAll('.tarefa-por-fazer');
  const changesBgColor = event.target;

  for (let i = 0; i < listTaskItens.length; i += 1) {
    if (listTaskItens[i].style.backgroundColor === 'gray') {
      listTaskItens[i].removeAttribute('style');
    }
  }
  changesBgColor.style.backgroundColor = 'gray';
}

function completed(event) {
  const listClasses = event.target.classList;

  if (listClasses[1] === 'completed') {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

function adjustTasks() {
  for (let i = 0; i < tarefas.length; i += 1) {
    tarefas[i].addEventListener('click', bgColorTask);
    tarefas[i].addEventListener('dblclick', completed);
  }
}

function startSetUp() {
  const storageVoid = localStorageIsVoid();

  if (storageVoid === false) {
    const dataString = generateDataString();

    if (dataString !== '') {
      loadTaskItens(dataString);
    }
    adjustTasks();
  }
}

function appendTask(taskText, taskList) {
  const taskItem = document.createElement('li');
  taskItem.innerText = taskText;
  taskItem.className = 'tarefa-por-fazer';
  taskList.appendChild(taskItem);
}

function createTask() {
  const taskList = document.getElementById('lista-tarefas');
  const taskText = input.value;
  if (taskText !== '') {
    appendTask(taskText, taskList);
  }
  adjustTasks();
  input.value = '';
}

function clearAll() {
  for (let i = tarefas.length - 1; i >= 0; i -= 1) {
    tarefas[i].remove();
  }
}

function rmvFinishedItens() {
  const completedList = document.getElementsByClassName('completed');

  for (let i = completedList.length - 1; i >= 0; i -= 1) {
    completedList[i].remove();
  }
}

function createDataArray(taskData) {
  const dataArray = [];

  for (let i = 0; i < taskData.length; i += 1) {
    const dataContent = taskData[i].outerHTML;
    dataArray[i] = dataContent;
  }

  return dataArray;
}

function saveData() {
  localStorage.clear();
  const dataArray = createDataArray(tarefas);
  localStorage.setItem('data', dataArray);
}

function disparaEnter(e) {
  if (e.keyCode === 13) {
    createTask();
  }
}

addTask.addEventListener('click', createTask);
input.addEventListener('keyup', disparaEnter);
clearTasks.addEventListener('click', clearAll);
rmvFinished.addEventListener('click', rmvFinishedItens);
saveBtn.addEventListener('click', saveData);

window.onload = startSetUp;
