const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'todos.json');

// Lire les tâches depuis le fichier JSON
const readTodos = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// Écrire les tâches dans le fichier JSON
const writeTodos = (todos) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
};

// GET toutes les tâches
app.get('/api/todos', (req, res) => {
    const todos = readTodos();
    res.json(todos);
});

// POST nouvelle tâche
app.post('/api/todos', (req, res) => {
    const todos = readTodos();
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        isCompleted: false,
        isEditing: false
    };
    todos.push(newTodo);
    writeTodos(todos);
    res.status(201).json(newTodo);
});

// PUT mettre à jour une tâche
app.put('/api/todos/:id', (req, res) => {
    let todos = readTodos();
    const id = Number(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index !== -1) {
        todos[index] = { ...todos[index], ...req.body };
        writeTodos(todos);
        res.json(todos[index]);
    } else {
        res.status(404).json({ message: 'Tâche non trouvée' });
    }
});

// DELETE supprimer une tâche
app.delete('/api/todos/:id', (req, res) => {
    let todos = readTodos();
    const id = Number(req.params.id);
    todos = todos.filter(t => t.id !== id);
    writeTodos(todos);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`API Express démarrée sur http://localhost:${PORT}`);
});
