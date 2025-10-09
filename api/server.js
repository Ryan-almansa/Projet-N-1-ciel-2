// Simple Node.js/Express API for user authentication
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const users = [];
let sessions = {};

// Register endpoint
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required.' });
    }
    if (users.find(u => u.email === email)) {
        return res.status(409).json({ error: 'User already exists.' });
    }
    users.push({ email, password });
    res.json({ success: true });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // Simple session (for demo)
    const sessionId = Math.random().toString(36).substring(2);
    sessions[sessionId] = email;
    res.json({ success: true, sessionId });
});

// Logout endpoint
app.post('/logout', (req, res) => {
    const { sessionId } = req.body;
    if (sessions[sessionId]) {
        delete sessions[sessionId];
        return res.json({ success: true });
    }
    res.status(400).json({ error: 'Invalid session.' });
});

app.listen(PORT, () => {
    console.log(`API server running on http://localhost:${PORT}`);
});
