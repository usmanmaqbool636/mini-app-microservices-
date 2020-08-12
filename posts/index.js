const Express = require("express");
const app = Express();
const bodyParser= require("body-parser");
const { randomBytes } = require("crypto");
const cors= require("cors");

const posts = {};

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get("/posts", (req, res) => {
    return res.status(200).json(posts);
})

app.post("/posts", (req, res) => {
    const id = randomBytes(4).toString("hex");
    posts[id] = {
        id,
        title: req.body.title
    }
    return res.status(201).json(posts[id]);
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`server is runnig o port ${PORT}`)
})