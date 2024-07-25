import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './dbconnect.js'; // Ensure this path is correct
import ToDo from './models/ToDo.js'; // Ensure this path is correct

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// API Endpoints

// Get all to-do items
app.get('/todos', async (req, res) => {
    try {
        const todos = await ToDo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a new to-do item
app.post('/todos', async (req, res) => {
    const { task } = req.body;
    try {
        const newTodo = new ToDo({
            task,
        });
        await newTodo.save();
        res.json(newTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a to-do item
app.delete('/todos/:id', async (req, res) => {
    try {
        await ToDo.findByIdAndDelete(req.params.id);
        res.json({ message: 'To-Do item deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a to-do item
app.put('/todos/:id', async (req, res) => {
    const { task, completed } = req.body;
    try {
        const updatedTodo = await ToDo.findByIdAndUpdate(
            req.params.id,
            { task, completed },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
