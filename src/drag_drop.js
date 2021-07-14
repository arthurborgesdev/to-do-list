export function dragHover() {
  let dots = document.getElementsByClassName('dots-button');
  [...dots].forEach(dot => {
    dot.addEventListener('click', () => {
      const todoItems = document.getElementsByClassName('todo-item');
      [...todoItems].forEach(todoItem => {
        todoItem.addEventListener("dragstart", dragStart)
      });
    });
  });
}

function dragStart(ev) {
  ev.preventDefault();
  console.log("Halabalujah", ev.parent);
  let xOffset = 0;
  let yOffset = 0;
  let initialX = ev.clientX - xOffset;
  let initialY = ev.clientY - yOffset;
  console.log('initialX', initialX);
  console.log('initialY', initialY);
}

function dragEnd(ev) {
  ev.preventDefault();
  let initialX = currentX;
  let initialY = currentY;
}

function drag(ev) {
  ev.preventDefault();
  currentX = ev.clientX - initialX;
  currentY = ev.clientY - initialY;

  xOffset = currentX;
  yOffset = currentY;

  setTranslate(currentX, currentY, dragItem);
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
}