import './style.css';
import { dragAndDrop } from './drag_drop.js';
import { setToLocalStorage, getFromLocalStorage } from './storage.js';
import statusUpdate from './status_update.js';
import { addEditHandlers, addButtonHandlers } from './add_remove.js';
import { sortIndex } from './drag_drop.js';

import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';

const todo = [];

const populateTodos = (todo, sort) => {
  let sortedTodo = [];
  if (sort) {
    sortedTodo = todo.sort((a, b) => a.index - b.index);
  } else {
    sortedTodo = todo;
  }

  for (let i = 0; i < sortedTodo.length; i += 1) {
    let style = '';
    let checkbox = '';
    if (sortedTodo[i].completed) {
      style = 'text-decoration: line-through;';
      checkbox = 'checked';
    } else {
      style = 'text-decoration: none;';
      checkbox = '';
    }

    document.getElementById('todo-list').insertAdjacentHTML('beforeend', `
      <div class="todo-item" draggable="true">
        <div>
          <input type="checkbox" name="item-${sortedTodo[i].index}" ${checkbox}>
          <label for="item-${sortedTodo[i].index}" style="${style}" contenteditable=true>
            ${sortedTodo[i].description} 
          </label>
        </div>
        <div class="dots-button">
          <button id="item-${sortedTodo[i].index}"><i class="fas fa-trash"></i></button>
          <i class="fas fa-ellipsis-v"></i>
        </div> 
      </div>
    `);
  }
};

window.addEventListener('load', () => {
  let localStorageList = getFromLocalStorage();

  if (localStorageList == null) {
    setToLocalStorage(todo, true);
    populateTodos(todo);
  } else {
    let sortedList = sortIndex(localStorageList);
    populateTodos(sortedList, false);
  }
  dragAndDrop();
  statusUpdate();

  addEditHandlers();
  addButtonHandlers();
});