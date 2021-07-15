import { getFromLocalStorage, setToLocalStorage } from './storage.js';

export function statusUpdate() {
  const todoItems = document.getElementsByClassName('todo-item');

  [...todoItems].forEach(todoItem => {
    todoItem.children[0].children[0].addEventListener('change', (e) => {
      updateTodo(todoItem);
    });
  });
}

function updateTodo(todoItem) {
  let checkbox = todoItem.children[0].children[0];

  const checkboxIndex = checkbox.getAttribute('name').split('-')[1];
  
  if (checkbox.checked) {
    markTodoItem(checkboxIndex, true);
    checkbox.nextElementSibling.style.textDecoration = 'line-through';
  } else {
    markTodoItem(checkboxIndex, false);
    checkbox.nextElementSibling.style.textDecoration = 'none';
  }
}

function markTodoItem(index, value) {
  const list = getFromLocalStorage();

  list.forEach((item) => {
    if (item.index === Number(index) || item.index === index.toString()) {
      item.completed = value;
    }
  });
  
  setToLocalStorage(list);
}