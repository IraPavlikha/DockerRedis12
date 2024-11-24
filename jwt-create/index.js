const express = require('express');
const jwt = require('jsonwebtoken');
const Redis = require('ioredis');

// Підключення до Redis
const redis = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
});

const app = express();
const port = 3000;

app.get('/create', async (req, res) => {
    const user = { id: 1, name: 'John Doe' };
    const token = jwt.sign(user, 'your_jwt_secret');

    // Збереження токена в Redis (як приклад кешування)
    await redis.set('jwt_token', token);

    res.json({ token });
});

app.listen(port, () => {
    console.log(`JWT Create service running on http://localhost:${port}`);
});
