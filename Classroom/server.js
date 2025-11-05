const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const ejsMate = require("ejs-mate");


app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: "mysupersecretestring",
    resave: false,
    saveUninitialized: true,
  }

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next)=>{
  res.locals.successMsg = req.flash("Success");
  res.locals.errorMsg = req.flash("error");
})

app.get("/register", (req, res) => {
    let { name = "anonymous"} = req.query;
    req.session.name = name;
    if(name=="anonymous"){
      req.flash("error","User not registered");
    }else{
      req.flash("Success","User registered successfully!");
    }
    res.redirect("/hello");
});

app.get("/hello", (req, res)=>{
    res.render("page.ejs", {name:req.session.name});
})

// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//          req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
    
//   res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test", (req, res)=>{
//     res.send("Test Successful");
// })

app.listen(3000, () => {
  console.log("Server is listening to the port 3000");
});
