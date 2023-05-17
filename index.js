const express = require('express');
const app = express();
const port = 3000;

// Use built-in middleware to handle json body in request
app.use(express.json());

const checkKey = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).json({ error: 'Token error.' });
  }

  const [ scheme, token ] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token malformatted.' });
  }

  if (token !== process.env.MY_SECRET_KEY) {
    return res.status(403).json({ error: 'Invalid token.' });
  }

  next();
};

app.post('/', checkKey, (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
