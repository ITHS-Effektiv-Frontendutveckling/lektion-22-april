const buttonElem = document.querySelector('#todoButton');
const inputElem = document.querySelector('#todoInput');

async function addTodo(todo) {
  const todoItem = {
    task: todo
  }

  const response = await fetch('http://localhost:8000/api/todo', {
    method: 'POST',
    body: JSON.stringify(todoItem),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
}

buttonElem.addEventListener('click', () => {
  const todo = inputElem.value;
  addTodo(todo);
});