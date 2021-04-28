const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const { json } = require("express");


require("./db/conn");
const Register = require("./models/registers");

const port = process.env.PORT || 5000;

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );
//console.log(path.join(__dirname));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//app.use(express.json());
//app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path))
app.set("view engine", "hbs")
app.set("views", template_path)
hbs.registerPartials(partials_path)

app.get("/" ,(req, res) => {
    res.render("index") 
});


app.get("/register", (req, res) =>{
    res.render("register");
})

app.post("/register", async (req, res) => {
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const registernew = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword,
            })
            const registered = await registernew.save();
            res.status(201).render("index");
            //alert("Your stored successfully");
        }else{
            res.send("password is not matching");
        }
        //console.log(req.body.firstname);
        //res.send(req.body.firstname);
    }catch(error){
        res.status(400).send(error);
    }
});

//login validation check
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})