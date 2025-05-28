const express = require('express');
const cors = require('cors');
const Tache = require('./Tache');

const app = express();
const PORT = 5000;
const gestionnaireTache = new Tache();

app.use(cors());
app.use(express.json());

// GET liste toutes les tâches
app.get('/api/todos', (req, res) => {
  res.json(gestionnaireTache.lister());
});

// POST creer une nouvelle tâche
app.post('/api/todos', (req, res) => {
  const newTodo = gestionnaireTache.creer(req.body.text);
  res.status(201).json(newTodo);
});

// PUT mettre à jour une tâche
app.put('/api/todos/:id', (req, res) => {
  const updated = gestionnaireTache.mettreAJour(req.params.id, req.body);
  if (updated) {
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Tâche non trouvée' });
  }
});

// DELETE supprimer une tâche
app.delete('/api/todos/:id', (req, res) => {
  const success = gestionnaireTache.supprimer(req.params.id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Tâche non trouvée' });
  }
});

app.listen(PORT, () => {
  console.log(`API Express démarrée sur http://localhost:${PORT}`);
});
