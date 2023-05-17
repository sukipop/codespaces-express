const express = require('express')
const app = express()
const port = 3000

// Use body-parser middleware to handle json body in request
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const checkKey = (req, res, next) => {
  const key = req.headers['x-api-key']

  if (key === 'your_secret_key') {
    next()
  } else {
    res.status(403).json({ error: 'Unauthorized' })
  }
}

app.get('/', checkKey, (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
