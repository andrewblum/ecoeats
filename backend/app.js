const express = require('express')
const app = express()
const port = 3000
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/json-test', function(req, res) { 
  res.json({ 
    number: 1, 
    name: 'ecoeats', 
  }); 
}); 

app.post('/api/login', async function(req, res) { 
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  })
  if (user.password === req.body.password) {
    res.json({ message: "OK"})
  } else {
    res.status(401).json({ message: "Wrong password"})
  }
}); 

app.post('/api/user', async function(req, res) {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: req.body.password,
    },
  })
  res.json(user)
});

app.get('/api/user/:id', async function(req, res) {
  const { id } = req.params
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  })
  res.json(user)
});

app.get('/api/user/:id/food', async function(req, res) {
  const { id } = req.params
  const foods = await prisma.food.findMany({
    where: {
      userId: Number(id), 
    }
  });
  res.json(foods)
});

app.post('/api/food', async function(req, res) {
  const food = await prisma.food.create({
    data: {
      name: req.body.name,
      content: req.body.content,
      userId: req.body.userId,
      expirationDate: req.body.expirationDate
    },
  })
  res.json(food)
});

app.delete(`/api/food/:id`, async (req, res) => {
  const { id } = req.params
  const food = await prisma.food.delete({
    where: {
      id: Number(id),
    },
  })
  res.json(food)
})

app.get('/api/query-ai', async (req, res) => {
    const prompt = req.query.prompt;
    const apiKey = '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';
    const apiUrl = 'https://api.perplexity.ai/chat/completions';
  
    const requestBody = {
      model: 'sonar-medium-online',
      messages: [
        { role: 'user', content: prompt }
      ]
    };
  
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json()
    res.json({message: "ok", content: data.choices[0].message.content})
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})