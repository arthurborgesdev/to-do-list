import './style.css';
import { dragAndDrop } from './drag_drop.js';
import { setToLocalStorage } from './storage.js';
import { statusUpdate } from './status_update.js';

import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';
import '@fortawesome/fontawesome-free/js/brands.js';

const todo = [
  {
    description: 'Finish watching S.H.I.E.L.D season 2',
    completed: false,
    index: 0,
  },
  {
    description: 'Win the Indigo League in Pokémon Yellow',
    completed: false,
    index: 1,
  },
  {
    description: 'Finish the course about NodeJS in Udemy',
    completed: false,
    index: 2,
  },
];

const populateTodos = () => {
  const sortedTodo = todo.sort((a, b) => a.index - b.index);

  for (let i = 0; i < sortedTodo.length; i += 1) {
    document.getElementById('todo-list').insertAdjacentHTML('beforeend', `
      <div class="todo-item" draggable="true">
        <div>
          <input type="checkbox" name="item-${sortedTodo[i].index}">
          <label for="item-${sortedTodo[i].index}">${sortedTodo[i].description}</label>
        </div>
        <div class="dots-button">
          <i class="fas fa-ellipsis-v"></i>
        </div> 
      </div>
    `);
  }
};

window.addEventListener('load', () => {
  setToLocalStorage(todo);
  populateTodos();
  dragAndDrop();
  statusUpdate();
}); 