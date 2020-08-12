const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors= require("cors");
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
    return res.status(200).json(commentsByPostId[req.params.id] || []);
})

app.post("/posts/:id/comments", (req, res) => {
    const id = randomBytes(4).toString("hex");
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({id,content});
    commentsByPostId[req.params.id]=comments;
    return res.status(201).json(comments);
})
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`server is runnig o port ${PORT}`)
})