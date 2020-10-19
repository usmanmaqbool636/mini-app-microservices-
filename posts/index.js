const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title
  };

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: {
      id,
      title
    }
<<<<<<< HEAD
    await axios.post("http://event-bus-srv:4005/events", {
        type: "PostCreated",
        data: {
            ...posts[id]
        }
    })
    return res.status(201).json(posts[id]);
})

app.post("/events", (req, res) => {
    console.log("received Event =>", req.body.type)
    res.send({})
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is running o port ${PORT}`)
})
=======
  });

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
>>>>>>> dff3e7d7f66615923cc05af7b67399a3eba0924e
