const Express = require("express");

const bodyParser = require("body-parser");
const axios = require("axios");
const app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/events", (req, res) => {
    const event = req.body;
    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);
    return res.send({ status: "Ok" })
});

app.listen(4005,()=>{
    console.log("listning on port 4005")
})