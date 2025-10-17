/*
Författare: Leander Norberg
Projketnamn: Moment 2
Beskrivning: Praktisk laboration utvecklat i samband med kursen 
Programmering i TypeScript (DT208G ) vid mittuniversitetet, VT2025 
*/

//Interface som fungerar som mall vid konstruering av en uppgift
export interface Todo {
    task: string;
    completed: boolean;
    priority: number; 
}