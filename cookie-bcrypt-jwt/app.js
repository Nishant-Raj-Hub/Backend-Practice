const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');


app.use(cookieParser());

app.get("/", (req, res)=>{
    //BCRYPT ENCRIPTION
    // bcrypt.genSalt(10, function(err, salt) {
    //     bcrypt.hash("noddy", salt, function(err, hash) {
    //         console.log(hash)
    //     });
    // });


    //BCRYPT DECRYPTION OR COMPARE
    // bcrypt.compare("noddy", "$2b$10$mc5warkU1Db9gRblLsFAR.gPMngArJ5KxG1iTXFR2LtsnPQJzVn.W", function(err, result){
    //     console.log(result);
    // });


    //JWT
    let token = jwt.sign({email: "noddy@gmail.com"}, "secret");
    res.cookie("token", token);
    res.cookie("age", "23");
    res.send("Done");
})

//JWT
app.get("/read", (req, res)=>{
    let data = jwt.verify(req.cookies.token, "secret");
    res.send(data);
})

app.listen(3000, ()=>{
    console.log("Server running on 3000")
});