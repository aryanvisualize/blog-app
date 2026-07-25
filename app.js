import express from "express";
import ejs from "ejs";
const app = express();
const port = 4000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res)=>{
    res.render('index');
})

app.listen(port, ()=>{
    console.log(`Server is running at ${port}`);
})