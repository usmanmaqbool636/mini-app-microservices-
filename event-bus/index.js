const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
<<<<<<< HEAD
app.use(bodyParser.urlencoded({ extended: true }));
const events = []
app.post("/events", (req, res) => {
    const event = req.body;
    events.push(event);
    console.log("event", event);
    axios.post("http://posts-clusterip-srv/events", event);
    // axios.post("http://localhost:4001/events", event);
    // axios.post("http://localhost:4002/events", event);
    // axios.post("http://localhost:4003/events", event);
    return res.send({ status: "Ok" })
=======

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://localhost:4000/events', event);
  axios.post('http://localhost:4001/events', event);
  axios.post('http://localhost:4002/events', event);
  axios.post('http://localhost:4003/events', event);

  res.send({ status: 'OK' });
>>>>>>> dff3e7d7f66615923cc05af7b67399a3eba0924e
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
<<<<<<< HEAD
    console.log("listening on port 4005")
})
=======
  console.log('Listening on 4005');
});
>>>>>>> dff3e7d7f66615923cc05af7b67399a3eba0924e
