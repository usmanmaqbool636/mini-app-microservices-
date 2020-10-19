const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
<<<<<<< HEAD
app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    console.log("mod=>", data)
    if (type === "CommentCreated") {
        const status = data.content.includes("orange") ? "rejected" : "approved";
        await axios.post("http://event-bus-srv:4005/events", { type: "CommentModerated", data: { ...data, status, } })
    }
    return res.send({});
=======

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    });
  }

  res.send({});
>>>>>>> dff3e7d7f66615923cc05af7b67399a3eba0924e
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
