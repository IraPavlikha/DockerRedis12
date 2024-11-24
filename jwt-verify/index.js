const express = require('express');
const jwt = require('jsonwebtoken');
const Redis = require('ioredis');

// Підключення до Redis
const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
});

const app = express();
const port = 4000;

app.get('/verify', async (req, res) => {
    const token = req.query.token;

    // Перевірка токена з Redis
    const storedToken = await redis.get('jwt_token');

    if (storedToken === token) {
        jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token is invalid' });
            }
            res.json({ message: 'Token is valid', decoded });
        });
    } else {
        res.status(403).json({ message: 'Token does not match stored value' });
    }
});

app.listen(port, () => {
    console.log(`JWT Verify service running on http://localhost:${port}`);
});
