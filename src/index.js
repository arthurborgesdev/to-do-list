import './style.css';

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const todo = [
  {
    description: "Finish watching S.H.I.E.L.D season 2",
    completed: false,
    index: 0
  },
  {
    description: "Win the Indigo League in Pokémon Yellow",
    completed: false,
    index: 1
  },
  {
    description: "Finish the course about NodeJS in Udemy",
    completed: false,
    index: 2
  }
]

const populateTodos = () => {
  const sortedTodo = todo.sort((a, b) => a.index - b.index)

  for(let i = 0; i < sortedTodo.length; i += 1) {
    document.getElementById('todo-list').insertAdjacentHTML('beforeend',`
      <div class="todo-item">
        <div>
          <input type="checkbox" name="item-${sortedTodo[i].index}">
          <label for="item-${sortedTodo[i].index}">${sortedTodo[i].description}</label>
        </div>
        <i class="fas fa-ellipsis-v"></i> 
      </div>
    `)
  }
}

window.onload = populateTodos()