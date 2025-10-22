/*
Författare: Leander Norberg
Projektnamn: Moment 2
Beskrivning: Praktisk laboration utvecklat i samband med kursen 
Programmering i TypeScript (DT208G ) vid mittuniversitetet, VT2025 
*/

//Importering av CSS och klass-fil
import './style.css'
import { TodoList } from './models/TodoList';

//Skapar en instans av klassen "TodoList"
const todoList = new TodoList();

//Hämtar relevanta element från HTML-koden
const taskInput = document.getElementById('task') as HTMLInputElement;
const statusSelect = document.getElementById('status') as HTMLSelectElement;
const prioritySelect = document.getElementById('priority') as HTMLSelectElement;
const form = document.querySelector('form') as HTMLFormElement;
const clearBtn = document.getElementById('clearList') as HTMLButtonElement;
const listBody = document.getElementById('listBody') as HTMLTableSectionElement;

//Funktion som skriver ut sparad information om uppgifter
function renderTodos() {
    listBody.innerHTML = '';
    const todos = todoList.getTodos();

    //Skriver ut nya rader i tabellen och fyller i data i respektive cell
    todos.forEach((todo, index) => {
        const row = document.createElement('tr');

        //Cellen för uppgiftens beskrivning
        const taskCell = document.createElement('td');
        taskCell.textContent = todo.task;

        //Cellen för uppgiftens status
        const statusCell = document.createElement('td');
        statusCell.textContent = todo.completed ? 'Klar' : 'Ej påbörjad';

        //Cellen för uppgiftens prioritet
        const priorityCell = document.createElement('td');
        const priorities = ['Låg', 'Medel', 'Hög'];
        priorityCell.textContent = priorities[todo.priority - 1] ?? '';

        //Cellen för checkboxen som markerar om uppgiften är klar eller inte
        const checkboxCell = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;

        //Event-lyssnare som styr vad som händer om checkboxen klickas
        checkbox.addEventListener('change', () => {
            todoList.toggleTodoCompleted(index);
            renderTodos();
        });

        checkboxCell.appendChild(checkbox);

        //Cellerna fylls på i raden
        row.appendChild(taskCell);
        row.appendChild(statusCell);
        row.appendChild(priorityCell);
        row.appendChild(checkboxCell);

        //Raden fylls på i tabellen
        listBody.appendChild(row);
    });
}

//Event-lyssnare som styr vad som händer om knappen i formuläret klickas
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const task = taskInput.value;
    const completed = statusSelect.value === 'true';
    const priority = Number(prioritySelect.value);

    if (todoList.addTodo(task, completed, priority)) {
        taskInput.value = '';
        statusSelect.value = 'false';
        prioritySelect.value = '1';
        renderTodos();
    }
});

//Event-lyssnare som styr vad som händer om rensa-knappen klickas
clearBtn.addEventListener('click', () => {
    //Ett varningsmeddelande skrivs ut för att undvika misstag
    if (confirm('Är du säker på att du vill rensa listan?')) {
        todoList.clearTodos();
        renderTodos();
    }
});

renderTodos();
