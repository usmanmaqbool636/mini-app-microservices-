const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");
const posts = {};

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/posts", (req, res) => {
    return res.status(200).json(posts);
})

app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString("hex");
    posts[id] = {
        id,
        title: req.body.title
    }
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