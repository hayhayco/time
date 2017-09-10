//require js
var express     = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    method      = require("method-override"),
    app         = express();

mongoose.connect("mongodb://admin:admin@ds019893.mlab.com:19893/time")
//middleware
app.use(method("_method"));//dipakai untuk diurl pada bagian edit delete
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public")); //untuk menambahkan file pada folder public css js img
app.set("view engine", "ejs"); //menjadikan folder views sebagai pusat engine dan dnegan format ejs


var timeSchema = new mongoose.Schema({
  name    :String,
  image   :String,
  des     :String
});

var time = mongoose.model("time",timeSchema);// untuk CRUD "world"database, worldSchema (Bentuk collection)

app.get("/", function(req,res){
  res.redirect("/time")
});


app.get("/time", function(req, res){
  time.find({}, function(err, allTimes){
    if(err){
      console.log(err);
    }else {
      res.render("index", {time:allTimes});
    }
  })
});


//adding event
app.get("/time/add", function(req, res){
  res.render("add");
});


// create post route
app.post("/time", function(req,res){
  var name    = req.body.name;
  var image   = req.body.image;
  var des     = req.body.des;
  var newTime = {name:name,image:image,des:des};

  time.create(newTime, function(err){
    if (err){
      console.log(err);
    }else {
    ya  res.redirect("/");
    }
  })
})

//detail route

app.get("/time/:id", function(req,res){
  time.findById(req.params.id, function(err, foundTime){
    if(err){
      console.log(err);
    }else {
      res.render("detail", {time:foundTime});
    }
  })
});

//edit route

app.get("/time/:id/edit", function(req,res){
    time.find({"isdel":"0"});
    time.findById(req.params.id, function(err,foundTime){
      if (err){
        console.log(err);
      }else {
        res.render("edit",{time:foundTime});
      }
    });
});

//update route

app.put("/time/:id", function(req,res){
  var name = req.body.name;
  var image = req.body.image;
  var des = req.body.des;
  var editTime = {name:name, image:image, des:des};

  time.findByIdAndUpdate(req.params.id, editTime, function(err, updateTime){
    if (err){
      console.log(err);
    }else {
      res.redirect(req.params.id);
    };
  });
});

//delete route
app.delete("/time/:id", function(req,res){
  time.findByIdAndRemove(req.params.id, function(err){
    if (err){
      console.log(err);
    }else {
      res.redirect("/");
    }
  })
})
app.listen(process.env.PORT||3000);
