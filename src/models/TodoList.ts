/*
Författare: Leander Norberg
Projketnamn: Moment 2
Beskrivning: Praktisk laboration utvecklat i samband med kursen 
Programmering i TypeScript (DT208G ) vid mittuniversitetet, VT2025 
*/

//Importering av interface för att fastställa typsäkert
import type { Todo } from './Todo';

//Klass som bygger på interfacet "Todo" och innehåller projektets centrala funktionalitet
export class TodoList {
    //Array som lagrar objekt av uppgifter
    private todos: Todo[] = [];

    //Konstruerare som laddar sparad data från local storage
    constructor() {
        this.loadFromLocalStorage();
    }

    //Metrod för att lägga till nya uppgifter
    addTodo(task: string, completed: boolean, priority: number): boolean {
        if (!task.trim()) return false;

        const newTodo: Todo = { task, completed, priority };
        this.todos.push(newTodo);
        this.saveToLocalStorage();
        return true;
    }

    //Metod för att markera eller avmerkera en uppfigt som avklarad
    toggleTodoCompleted(index: number): void {
        if (index >= 0 && index < this.todos.length) {
            this.todos[index].completed = !this.todos[index].completed;
            this.saveToLocalStorage();
        }
    }

    //Metod för att tömma listan på uppgifter från local storage
    clearTodos(): void {
        this.todos = [];
        localStorage.removeItem('todos');
    }

    //Metod för att hämta samtliga uppgifter 
    getTodos(): Todo[] {
        return this.todos;
    }

    //Metod för att spara data till local storage
    saveToLocalStorage(): void {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    //Metod för att radera data från local storage
    loadFromLocalStorage(): void {
        const data = localStorage.getItem('todos');
        if (data) {
            this.todos = JSON.parse(data);
        }
    }
}