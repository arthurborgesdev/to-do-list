import { getFromLocalStorage, setToLocalStorage } from "./storage";

function appendToDOM(todo) {
  document.getElementById('todo-list').insertAdjacentHTML('beforeend', `
    <div class="todo-item" draggable="true">
      <div>
        <input type="checkbox" name="item-${todo.index}">
        <label for="item-${todo.index}" style="text-decoration: none;"}>
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
  newTodo.index = todoLength + 1;
  
  currentTodoList.push(newTodo);
  setToLocalStorage(currentTodoList);
  appendToDOM(newTodo);
}

