const Express = require("express");

const bodyParser = require("body-parser");
const axios = require("axios");
const app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const events = []
app.post("/events", (req, res) => {
    const event = req.body;
    events.push(event);
    console.log("event", event);
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    axios.post("http://localhost:4003/events", event);
    return res.send({ status: "Ok" })
});

app.get("/events", (req, res) => {
    return res.send(events);
})

app.listen(4005, () => {
    console.log("listning on port 4005")
})