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

const newTodo = () => {
  let text = prompt("Enter new task to do", "Do something");
  const todo = {
    text, checked: false, id: Date.now(),
  };
  todos.push(todo);
  renderTodo(todo);
}

const toggleTodoCheck = (key) => {
  todos = todos.map(todo => {
    if (todo.id !== key) return todo
    return {...todo, checked: !todo.checked}
  });
  submitChanges();
}

const renderTodo = (item) => {
  const li = document.createElement("li");
  li.setAttribute("id", `${item.id}`);
  li.setAttribute("class", `${classNames.TODO_ITEM}`)
  li.innerHTML = `<input class="${classNames.TODO_CHECKBOX}" onClick="toggleTodoCheck(${item.id})" type="checkbox" ${item.checked ? "checked" : ""}>
                  <label class="${classNames.TODO_TEXT}"><span>${item.text}</span></label>
                  <button class="${classNames.TODO_DELETE}" onClick="deleteTodo(${item.id})">delete</button>`;
  list.appendChild(li);
  submitChanges();
}

const deleteTodo = (key) => {
  const li = document.getElementById(`${key}`);
  li?.remove();
  todos = todos.filter(item => item.id !== Number(key));
  submitChanges();
}

const updateStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
}

const updateCounters = () => {
  itemCountSpan.textContent = todos.length.toString();
  uncheckedCountSpan.textContent = todos.filter((todoEl) => !todoEl.checked).length.toString();
}

const submitChanges = () => {
  updateStorage();
  updateCounters();
}

document.addEventListener('DOMContentLoaded', () => {
  const ref = localStorage.getItem('todos');
  if (!ref) return;
  todos = JSON.parse(ref);
  todos.forEach(t => {
    renderTodo(t);
  });
});
