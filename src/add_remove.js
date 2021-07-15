import { getFromLocalStorage, setToLocalStorage } from "./storage";
import dragAndDrop from './drag_drop.js';

document.querySelector('.todo-new > input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') { 
    addTodo(e.target.value);
    e.target.value = "";
  }
});

export function addEditHandlers() {
  const todoList = document.getElementsByClassName('todo-item');
  for (let i = 0; i < todoList.length; i += 1) {
    let labelElem = todoList[i].children[0].children[1];
    labelElem.addEventListener('input', () => {
      editTodo(labelElem);
    });
  }
}

function appendToDOM(todo) {
  document.getElementById('todo-list').insertAdjacentHTML('beforeend', `
    <div class="todo-item" draggable="true">
      <div>
        <input type="checkbox" name="item-${todo.index}" readonly="true">
        <label for="item-${todo.index}" style="text-decoration: none;" contenteditable=true>
          ${todo.description}
        </label>
      </div>
      <div class="dots-button">
        <i class="fas fa-ellipsis-v"></i>
      </div> 
    </div>
  `);
}

export function addTodo(description) {
  let newTodo = {
    description: description,
    completed: false
  };

  let currentTodoList = getFromLocalStorage();
  let todoLength = currentTodoList.length;
  if (todoLength === 0) {
    newTodo.index = 0;
  } else {
    newTodo.index = todoLength;
  }
  
  
  currentTodoList.push(newTodo);
  setToLocalStorage(currentTodoList);
  appendToDOM(newTodo);
  dragAndDrop();

  addEditHandlers();
}

export function editTodo(item) {
  let todoIndex = item.getAttribute('for').split('-')[1];
  let todoDescription = item.innerText;

  updateTodo(todoIndex, todoDescription);
}

function updateTodo(todoIndex, description) {
  let currentTodoList = getFromLocalStorage();

  currentTodoList.forEach((item) => {
    if (item.index === Number(todoIndex) || item.index === todoIndex.toString()) {
      item.description = description;
    }
  });

  setToLocalStorage(currentTodoList);
}