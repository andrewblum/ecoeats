const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/json-test', function(req, res) { 
  res.json({ 
    number: 1, 
    name: 'ecoeats', 
  }); 
}); 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})