const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/posts", (req, res) => {

})

app.post("/events", (req, res) => {

});

app.listen(4002, () => {
    console.log("listning on port 4002");
})