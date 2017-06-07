//require js
var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    method      = require("method-override"),
    app         = express();


//middleware

app.use(express.static("public")); //untuk menambahkan file pada folder public css js img
app.set("view engine", "ejs"); //menjadikan folder views sebagai pusat engine dan dnegan format ejs

app.get("/", function(req,res){
  res.redirect("/time")
});

app.get("/time", function(req, res){
  res.render("index");
});

app.get("/time/add", function(req, res){
  res.render("add");
});

app.listen(process.env.PORT||3000);
