const todoList = [{
  name: 'make dinner',
  dueDate: '2022-12-22'
}, {
  name: 'wash dishes',
  dueDate: '2022-12-22'
}];
renderTodoList();
// render means to display something on the page)
function renderTodoList() {
  // accumulator pattern:
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button">Delete</button>
    `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  // we can use dot notation only after the buttons have acually been created in HTML. We need to use querySelectorAll, which selects all the elemnts with this class and use forEach() method:
  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
    });
  });
}

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
  addTodo();
});

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  // the .value is the text inside of the input
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
  todoList.push({
    // we could type like this:
    // name: name,
    // dueDate: dueDate
    // but if property amd value have the same name we can just type (shorthand property):
    name,
    dueDate
  });
  // to reset text inside of text box after clicking add:
  inputElement.value = '';

  renderTodoList();
}