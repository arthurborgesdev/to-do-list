let dragSrcEl = null;

import { setToLocalStorage } from './storage.js';

export function dragHover() {
  const todoItems = document.getElementsByClassName('todo-item');
  [...todoItems].forEach(todoItem => {
    todoItem.addEventListener('dragstart', dragStart, false);
    todoItem.addEventListener('dragend', dragEnd, false);
    todoItem.addEventListener('drop', drop, false);
    todoItem.addEventListener('dragover', dragOver, false);
  });
}

function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = e.currentTarget;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', dragSrcEl.innerHTML);
}

function dragEnd(e) {
  this.style.opacity = '1';
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.stopPropagation();
  
  let dropDestEl = e.currentTarget;

  if (dragSrcEl !== dropDestEl) {
    const currentId = dragSrcEl.children[0]
      .children[0]
      .getAttribute('name')
      .split('-')[1];
    
    const destinyId = dropDestEl.children[0]
      .children[0]
      .getAttribute('name')
      .split('-')[1];

    console.log(currentId);
    console.log(destinyId);

    dragSrcEl.innerHTML = dropDestEl.innerHTML;
    dropDestEl.innerHTML = e.dataTransfer.getData('text/html');

    // Set values for source element
    dragSrcEl.children[0]
      .children[0]
      .setAttribute('name', `item-${destinyId}`);

    dragSrcEl.children[0]
      .children[1]
      .setAttribute('for', `item-${destinyId}`);

    // Set values for destiny element
    dropDestEl.children[0]
      .children[0]
      .setAttribute('name', `item-${currentId}`);

    dropDestEl.children[0]
      .children[1]
      .setAttribute('for', `item-${currentId}`);
  }

  refreshLocalStorage();  

  return false;
}

function generateListFromDOM() {
  const list = document.getElementsByClassName('todo-item');
  const resultList = [];
  for(let i = 0; i < list.length; i += 1) {
    let description = list[i].children[0].children[1].innerText;
    let completed = list[i].children[0].children[0].checked;
    let index = list[i].children[0].children[0].name.split('-')[1];
    
    resultList.push({
      description: description,
      completed: completed,
      index: index
    });
  }
  return resultList;
}

function refreshLocalStorage() {
  localStorage.removeItem('todo');
  let resultList = generateListFromDOM()
  setToLocalStorage(resultList);
}