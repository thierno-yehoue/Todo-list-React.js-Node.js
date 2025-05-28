const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'todos.json');

class Tache {
  constructor() {
    this.todos = this.readTodos();
  }

  readTodos() {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  writeTodos() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.todos, null, 2));
  }

  lister() {
    return this.todos;
  }

  creer(text) {
    const newTache = {
      id: Date.now(),
      text: text,
      isCompleted: false,
      isEditing: false
    };
    this.todos.push(newTache);
    this.writeTodos();
    return newTache;
  }

  mettreAJour(id, data) {
    const index = this.todos.findIndex(t => t.id === Number(id));
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...data };
      this.writeTodos();
      return this.todos[index];
    }
    return null;
  }

  supprimer(id) {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter(t => t.id !== Number(id));
    if (this.todos.length < initialLength) {
      this.writeTodos();
      return true;
    }
    return false;
  }
}

module.exports = Tache;
