// jwt-create/index.js
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const port = 3000;

app.get('/create', (req, res) => {
    const payload = { user: 'user1', role: 'admin' };
    const secretKey = 'yourSecretKey';
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

app.listen(port, () => {
    console.log(`JWT Create service listening at http://localhost:${port}`);
});
