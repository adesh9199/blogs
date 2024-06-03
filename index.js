const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override')

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'))

let posts = [
    { id: uuidv4(), username: "Adesh Bhardwaj", content: "Happy Coding!" },
    { id: uuidv4(), username: "Abhishek Kumar", content: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated" },
    { id: uuidv4(), username: "Aditya Dubey", content: "A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with" },
];

app.get("/posts", (req, res) => {
    res.render("home", { posts });
});
app.get("/posts/new", (req, res) => {
    res.render("form");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => id === p.id);
    res.render("edit", { post });


});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newPost = req.body.content;
    let post = posts.find(p => id === p.id);
    post.content = newPost

    res.redirect("/posts")
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter(p => id !== p.id);
    res.redirect("/posts")
});



app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find(p => id === p.id);
    if (post) {
        res.render("show", { post });
    } else {
        res.status(404).send("Post not found");
    }
});





app.post("/posts", (req, res) => {
    const { username, content } = req.body;
    console.log("Publishing data and creating new post");
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

