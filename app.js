import express from "express";
import ejs from "ejs";
const app = express();
const port = 4000;

let posts = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res)=>{
    res.render('index', {posts});
})

app.get('/create', (req, res)=>{
    res.render('create');
});

app.post("/create", (req, res) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        updatedAt: new Date()
    };

    posts.push(newPost);

    console.log(posts);

    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    res.render("edit", { post });
});

app.post("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);

    if (post) {
        post.title = req.body.title;
        post.author = req.body.author;
        post.content = req.body.content;
        post.updatedAt = new Date();
    }
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    posts = posts.filter(post => post.id !== id);
    res.redirect("/");
});

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})