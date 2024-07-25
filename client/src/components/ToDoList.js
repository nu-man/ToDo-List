import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ToDoList.css';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/todos')
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const addTodo = (e) => {
        e.preventDefault();
        if (!task) return;

        axios.post('http://localhost:5000/todos', { task })
            .then((response) => {
                setTodos([...todos, response.data]);
                setTask('');
            })
            .catch((error) => {
                console.error('There was an error adding the to-do item!', error);
            });
    };

    const deleteTodo = (id) => {
        axios.delete(`http://localhost:5000/todos/${id}`)
            .then(() => {
                setTodos(todos.filter((todo) => todo._id !== id));
            })
            .catch((error) => {
                console.error('There was an error deleting the to-do item!', error);
            });
    };

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <form onSubmit={addTodo}>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter a new task"
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo._id}>
                        {todo.task}
                        <button onClick={() => deleteTodo(todo._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
