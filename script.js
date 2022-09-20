const classNames = {
  TODO_ITEM: "todo-container",
  TODO_CHECKBOX: "todo-checkbox",
  TODO_TEXT: "todo-text",
  TODO_DELETE: "todo-delete",
}

const list = document.getElementById("todo-list");
const itemCountSpan = document.getElementById("item-count");
const uncheckedCountSpan = document.getElementById("unchecked-count");
let todos = [];

function newTodo() {
  let text = prompt("Enter new task to do", "Do something");
  const todo = {
    text, checked: false, id: Date.now(),
  };
  todos.push(todo);
  renderTodo(todo);
}

function toggleTodoCheck(key) {
  const index = todos.findIndex(el => el.id === Number(key));
  todos[index].checked = !todos[index].checked;
  updateCounters();
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodo(item) {
  if (item?.deleted) {
    const li = document.getElementById(`${item.id}`);
    li?.remove();
  } else {
    const li = document.createElement("li");
    li.setAttribute("id", `${item.id}`);
    li.setAttribute("class", `${classNames.TODO_ITEM}`)
    li.innerHTML = `<input class="${classNames.TODO_CHECKBOX}" onClick="toggleTodoCheck(${item.id})" type="checkbox" ${item.checked ? "checked" : ""}>
                    <label class="${classNames.TODO_TEXT}"><span>${item.text}</span></label>
                    <button class="${classNames.TODO_DELETE}" onClick="deleteTodo(${item.id})">delete</button>`;
    list.appendChild(li);
  }
  updateCounters();
  localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodo(key) {
  const index = todos.findIndex(item => item.id === Number(key));
  if (index >= 0) {
    const todo = {
      deleted: true, id: key,
      ...todos[index]
    };
    todos = todos.filter(item => item.id !== Number(key));
    renderTodo(todo);
  }
}

function updateCounters() {
  itemCountSpan.textContent = todos.length.toString();
  uncheckedCountSpan.textContent = todos.filter((todoEl) => todoEl.checked === false).length.toString();
}

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todos');
  if (ref) {
    todos = JSON.parse(ref);
    todos.forEach(t => {
      renderTodo(t);
    });
  }
});
