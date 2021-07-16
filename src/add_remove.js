import { getFromLocalStorage, setToLocalStorage } from "./storage";
import { dragAndDrop, refreshLocalStorage } from './drag_drop.js';

document.querySelector('.todo-new > input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') { 
    addTodo(e.target.value);
    e.target.value = "";
  }
});

document.getElementById('clear-all').addEventListener('click', () => {
  const todoList = document.getElementsByClassName('todo-item');
  [...todoList].filter((todoItem) => todoItem.children[0].children[0].checked)
    .forEach((item) => item.remove());
    refreshLocalStorage();
});

export function addEditHandlers() {
  const todoList = document.getElementsByClassName('todo-item');
  for (let i = 0; i < todoList.length; i += 1) {
    let labelElem = todoList[i].children[0].children[1];
    labelElem.addEventListener('input', (e) => {
      refreshLocalStorage();
    });
  }
}

export function addButtonHandlers() {
  const buttons = document.getElementsByClassName('remove-button');
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', (e) => {
      buttons[i].parentElement.parentElement.remove();
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
        <span class="remove-button"><i id="item-${todo.index}" class="fas fa-trash"></i></span>
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
  addButtonHandlers();
}