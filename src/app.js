const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
// if we host this website, first it will check for the port(process.env.PORT) where it was hosted. In case if not available, it will run on 8000
const port= process.env.PORT || 8000;


const staticPath=path.join(__dirname,"../public");
const templatesPath=path.join(__dirname,"../templates/views");
const partialsPath=path.join(__dirname,"../templates/partials");


hbs.registerPartials(partialsPath);

app.set('view engine','hbs');
app.set('views',templatesPath);
app.use(express.static(staticPath));

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/weather",(req,res)=>{
    res.render("weather");
})


app.get("*",(req,res)=>{
    res.render("404error",{
        errorMsg:"Oops! Page not found"
    });
})

app.listen(port,()=>{
    console.log(`listening on the port ${port}`);
})