document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from local storage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  // Add Task
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const newTask = { id: Date.now(), text: taskText, completed: false };
    tasks.push(newTask);
    updateLocalStorage();
    renderTasks();
    taskInput.value = "";
  });

  // Render Tasks
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.text;
      li.classList.toggle("completed", task.completed);

      // Toggle completion
      li.addEventListener("click", () => {
        task.completed = !task.completed;
        updateLocalStorage();
        renderTasks();
      });

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✖";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent toggling
        tasks = tasks.filter((t) => t.id !== task.id);
        updateLocalStorage();
        renderTasks();
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  // Update Local Storage
  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
