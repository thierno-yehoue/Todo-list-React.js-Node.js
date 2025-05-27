import React, { useState, useEffect, useRef } from 'react';
import TodoCreator from "./FormInput";
import TodoList from "./List";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: { main: '#000000' },
  },
});

const API_URL = process.env.REACT_APP_API_URL+'/api/todos'  || 'http://localhost:5000/api/todos';

const Form = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [isInputEmpty, setInputEmpty] = useState(false);
  const [filter, setFilter] = useState("all");

  const inputRef = useRef();
  const noteRef = useRef({});

  // Charger les todos depuis l'API
  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      console.error('Erreur lors du chargement des tâches :', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Ajouter une tâche via l'API
  const addTodo = async (text) => {
    if (text.trim() === '') {
      setInputEmpty(true);
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const newTodo = await res.json();
      setTodos(prev => [...prev, newTodo]);
      setNewTodo('');
    } catch (err) {
      console.error('Erreur lors de l’ajout :', err);
    }
  };

  //  Supprimer une tâche
  const removeTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Erreur de suppression :', err);
    }
  };

  //  Marquer comme terminé
  const completeTodo = async (inx) => {
    const todo = todos[inx];
    try {
      const res = await fetch(`${API_URL}/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !todo.isCompleted })
      });
      const updated = await res.json();
      const updatedTodos = [...todos];
      updatedTodos[inx] = updated;
      setTodos(updatedTodos);
    } catch (err) {
      console.error('Erreur de mise à jour :', err);
    }
  };

  // Activer/Désactiver mode édition
  const editTodo = (inx) => {
    const updated = [...todos];
    updated[inx].isEditing = !updated[inx].isEditing;
    setTodos(updated);
  };

  // Sauvegarder une tâche modifiée
  const saveTodo = async (inx) => {
    const todo = todos[inx];
    const newText = noteRef.current[todo.id].value;
    try {
      const res = await fetch(`${API_URL}/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newText, isEditing: false })
      });
      const updated = await res.json();
      const updatedTodos = [...todos];
      updatedTodos[inx] = updated;
      setTodos(updatedTodos);
    } catch (err) {
      console.error('Erreur d’édition :', err);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    addTodo(newTodo);
    clearInput();
    inputRef.current.focus();
  };

  const preventSubmit = e => {
    if (e.key === 'Enter') e.preventDefault();
  };

  const clearInput = () => setNewTodo('');
  const setTodo = todo => {
    setInputEmpty(false);
    setNewTodo(todo);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;
    return true;
  });

  return (
    <form onSubmit={handleSubmit} className="form">
      <TodoCreator
        theme={theme}
        todo={newTodo}
        setTodo={setTodo}
        clearInput={clearInput}
        inputRef={inputRef}
        isInputEmpty={isInputEmpty}
        preventSubmit={preventSubmit}
      />

      <div className="filters">
        <button type="button" onClick={() => setFilter("all")}>Tous</button>
        <button type="button" onClick={() => setFilter("active")}>Actifs</button>
        <button type="button" onClick={() => setFilter("completed")}>Complétés</button>
      </div>

      <TodoList
        theme={theme}
        todos={filteredTodos}
        completeTodo={completeTodo}
        editTodo={editTodo}
        deleteTodo={(inx) => removeTodo(todos[inx].id)}
        saveTodo={saveTodo}
        noteRef={noteRef}
        preventSubmit={preventSubmit}
      />
    </form>
  );
};

export default Form;
