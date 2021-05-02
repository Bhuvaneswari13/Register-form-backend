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

app.get("/login", (req, res) =>{
    res.render("login");
})

app.post("/login", async (req, res) =>{
    try{
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
        if((useremail===email) || (useremail.password === password)){
            res.status(201).render("index");
        }else{
            res.send("invalid login details");
        }
        //Testing
        //res.send(useremail.password);
        
        //console.log(`${email} and password is ${password}`);
        
    }catch(error){
        res.status(400).send("Invalid login details");
    }
})

app.get("/members", (req, res) =>{
    Register.find((err, docs) =>{
        if(!err){
            res.render("members", {
                members: docs
            });
        }
        else {
            console.log("Error in retrieving members list: "+ err);
        }
    });
    //Register.find({}, function(err,docs){
      //  if(err)
       // res.json(err);
        //else
        //res.render("members", {Register: docs});
    //});
})


app.post("/members", async (req,res) => {
    try{
        const email = req.body.email;
        //const password = req.body.password;
        const useremail = await Register.findOne({email:email});
        res.send(useremail);
        //console.log(`${email}`);
    }catch(error){
        res.status(400).send(error);
      }
    })
         /*Register.find((err, docs) =>{
        if(!err){
            res.render("views/members", {
                members: docs
            });
        }
        else {
            console.log("Error in retrieving members list: "+ err);
        }
    });*/


        
  

//login validation check
app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})