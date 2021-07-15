export function dragHover(todo) {
  const todoItems = document.getElementsByClassName('todo-item');

  [...todoItems].forEach(todoItem => {
    todoItem.children[0].children[0].addEventListener('change', () => {
      todoItem.children[0].children[0].checked = true;
    });
  });
}