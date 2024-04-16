const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");
const addBtn = document.querySelector(".add-btn");
const countDisplay = document.querySelector(".counts-display");

const todos = JSON.parse(localStorage.getItem("todos"));

// looping through todos to get each todo
if (todos) {
	todos.forEach((todo) => {
		handleEvents(todo);
	});
}

// add todo event control
addBtn.addEventListener("click", (e) => {
	if (input.value === "") {
		alert("Please you must insert something in the input provided.");
	} else {
		handleEvents();
	}
});

// handling events function
function handleEvents(todo) {
	let todoText = input.value.toLowerCase();

	if (todo) {
		todoText = todo.text;
	}

	if (todoText) {
		const todoEl = document.createElement("li");
		// creating a div to contain delete and edit btn
		const buttonsContainer = document.createElement("div");
		buttonsContainer.classList.add("buttons");
		// creating delete and edit btn
		const deletebtn = document.createElement("button");
		deletebtn.innerHTML = "delete";
		deletebtn.classList.add("delete-btn");
		editbtn = document.createElement("button");
		editbtn.innerHTML = "edit";
		editbtn.classList.add("edit-btn");
		// creating a paragraph to insert each todo text
		const paragraph = document.createElement("p");
		paragraph.innerHTML = todoText;
		buttonsContainer.appendChild(editbtn);
		buttonsContainer.appendChild(deletebtn);
		// adding both paragraph and buttons to the todo list for display
		todoEl.appendChild(paragraph);
		todoEl.appendChild(buttonsContainer);

		// completed event control
		if (todo && todo.completed) {
			todoEl.classList.add("completed");
		}
		paragraph.addEventListener("click", () => {
			todoEl.classList.toggle("completed");

			updatetodos();
		});

		// delete todo event control
		deletebtn.addEventListener("click", (e) => {
			e.preventDefault();

			localStorage.setItem("todos", JSON.stringify(todos));

			JSON.parse(localStorage.getItem("todos"));

			todoEl.remove();

			updatetodos();
		});

		// edit todo  event control
		editbtn.addEventListener("click", (e) => {
			const newTodo = prompt("Edit to-do: Insert your new to-do here.");

			if (newTodo.length > 19) {
				alert("Please, to-do must be short and precise. ");
			} else {
				const newTodoText = todo.text;

				const todoToUpdate = todos.find((todo) => todo.text === newTodoText);
				if (!newTodo) {
					todoToUpdate.text = todo.text;
				} else {
					todoToUpdate.text = newTodo.toLowerCase();
				}

				localStorage.setItem("todos", JSON.stringify(todos));

				JSON.parse(localStorage.getItem("todos"));
			}
		});

		todosUL.appendChild(todoEl);

		input.value = "";

		updatetodos();
	}
}



function updatetodos() {
	const todosEl = document.querySelectorAll("li");

	const todos = [];

	todosEl.forEach((todoEl) => {
		todos.push({
			text: todoEl.firstChild.innerHTML,
			completed: todoEl.classList.contains("completed"),
		});
	});
	// numbers of completed todo
	const completedArray = todos.filter((todo) => todo.completed === true);
	const completed = completedArray.length;

	// numbers of todo in todolist
	const count = todos.length;
	countDisplay.innerHTML = `You have (${count}) to-dos in your to-do list and have  completed (${completed})`;

	localStorage.setItem("todos", JSON.stringify(todos));
}
updatetodos();
