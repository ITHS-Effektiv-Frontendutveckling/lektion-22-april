/**
 * Endpoints
 * 
 * Url: /api/todo
 * Metod: GET
 * Beskrivning: Hämta alla todos
 * 
 * Url: /api/todo
 * Metod: POST
 * Body: { task: <String> }
 * Beskrivning: Lägg till en ny todo
 * 
 * Url: /api/todo/:id
 * Metod: DELETE
 * Beskrivning: Ta bort en todo
 */

/**
 * Data
 * 
 * Vad ingår i en todo?
 * Själva todo-texten, unikt id
 * 
 * Ex: { task: 'Köp kaffe', id: 1 }
 */

const express = require('express');
//Importerar en specifik funktion från modulen nanoid
//Detta kallas för object destructuring, se exempel nedan
const { nanoid } = require('nanoid');
const app = express();

let todos = [];

//Säger åt express att läsa av body som ett JSON-objekt om Content-type är satt till application/json
app.use(express.json());
app.use(express.static('frontend'));

//Hämta alla todos
app.get('/api/todo', (request, response) => {
  response.json(todos);
});

//Lägg till en ny todo
app.post('/api/todo', (request, response) => {
  const todoItem = request.body;
  todoItem.id = nanoid(); //Genererar ett unikt id åt oss ex: DucBYz5CfaPA1INSzINyz
  console.log('Todo att lägga till:', todoItem);
  todos.push(todoItem);

  //Vad ska vi skicka tillbaka för svar?
  response.json(todoItem);
});

//Ta bort en todo
app.delete('/api/todo/:id', (request, response) => {
  console.log('Param:', request.params.id);
  const todoId = request.params.id;
  
  //Returnera alla todos som inte är lika med det id som vi vill ta bort
  todos = todos.filter((todo) => {
    return todo.id !== todoId
  });

  console.log(todos);

  //Vad ska vi skicka tillbaka för svar?
  response.json(todos);
});

app.listen(8000, () => {
  console.log('Server started');
});




//Nedan är ett exempel på object destructuring
// const person = {
//   firstname: 'Christoffer',
//   lastname: 'Wallenberg',
//   getName: function() {
//     return this.firstname + ' ' + this.lastname
//   }
// }

// const { firstname } = person;
// console.log(firstname); Skriver ut 'Christoffer'

// const { getName } = person;
// console.log(getName()); Skriver ut 'Christoffer Wallenberg'