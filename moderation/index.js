const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    console.log("mod=>", data)
    if (type === "CommentCreated") {
        const status = data.content.includes("orange") ? "rejected" : "approved";
        await axios.post("http://event-bus-srv:4005/events", { type: "CommentModerated", data: { ...data, status, } })
    }
    return res.send({});
});

app.listen(4003, () => {
    console.log("listning on port 4003")
});