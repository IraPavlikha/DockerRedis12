// jwt-verify/index.js
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const port = 4000;

app.get('/verify', (req, res) => {
    const token = req.query.token;
    const secretKey = 'yourSecretKey';

    try {
        const decoded = jwt.verify(token, secretKey);
        res.json({ valid: true, decoded });
    } catch (err) {
        res.json({ valid: false, error: err.message });
    }
});

app.listen(port, () => {
    console.log(`JWT Verify service listening at http://localhost:${port}`);
});
