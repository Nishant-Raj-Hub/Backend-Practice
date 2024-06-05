const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('./models/user');

const cookieParser = require('cookie-parser');
const path = require('path');

//to set ejs as view engine
app.set("view engine", "ejs");

//to data to be read in json and one other form
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());


app.get("/", (req, res)=>{
    res.render("index");
})

app.post("/create", async (req, res)=>{
    const {username, email, password, age } = req.body;

    const userExist = await userModel.findOne({email});
    if(userExist){
        res.status(400).json({message: "something went wronggg!"})
    }

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            const createdUser = await userModel.create({
                username, 
                email,
                password: hash,
                age
            });

            let token = jwt.sign({email}, "dholubholu");
            res.cookie("token", token);

            res.send(createdUser);
        })
    })

})

app.get("/login", (req, res)=>{
    res.render("login");
})

app.post("/login", async (req, res)=>{
    let userExist = await userModel.findOne({email: req.body.email});

    if(!userExist) res.send("something went wrong!");
    
    bcrypt.compare(req.body.password, userExist.password, (err, result)=>{
        if(result)  {    
            const token = jwt.sign({email: userExist.email}, "dholubholu");
            res.cookie("token", token);

            res.send("Yes you can login");
        }
        else    res.send("No you cannot login");
    })
})

app.get("/logout", (req, res)=>{
    res.cookie("token", "");
    res.redirect("/");
})

app.listen(8000, ()=>{
    console.log("Server running on 8000");
})