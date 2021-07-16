import { getFromLocalStorage, setToLocalStorage } from "./storage";
import { dragAndDrop, refreshLocalStorage } from './drag_drop.js';

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
      refreshLocalStorage();
    });
  }
}

export function addButtonHandlers() {
  const todoList = document.getElementsByClassName('todo-item');
  for (let i = 0; i < todoList.length; i += 1) {
    let buttonElem = todoList[i].children[1].children[0];
    buttonElem.addEventListener('click', (e) => { 
      buttonElem.parentElement.parentElement.remove();
      refreshLocalStorage();
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
        <button id="item-${todo.index}"><i class="fas fa-trash"></i></button>
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