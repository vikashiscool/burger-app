var express = require("express"),
    app = express();


var path = require("path");
// define the ./views directory as a variable
var views = path.join(process.cwd(), "views");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//use static assets like javascripts, stylesheets, and images...
app.use(express.static("public"));

app.use(express.static("bower_components"));

var sandwiches = [
    "Grilled Cheese",
    "Fried Chicken",
    "PB&J"
  ];

//root route
app.get("/", function (req, res){
  var text = "View all the sandwiches at " +
    "<a href='/sandwiches'>/sandwiches</a>";
    res.send(text);
});


app.get("/sandwiches", function (req, res){
  var sandwichesText = sandwiches.join(", ");
  res.send(sandwichesText);
});


app.get("/sandwich/:name", function (req, res) {
    res.send("Your sandwich is: " + req.params.name);
});

app.post("/sandwiches", function (req, res){
  var sandwich = req.body.sandwich;
  sandwiches.push(sandwich.name); //adds new sandwich to list
  res.redirect("/sandwiches");
});

app.get("/home", function (req, res){
  var homePath = path.join(views, "home.html");
  res.sendFile(homePath);
})

app.get("/contact", function (req, res) {
  // helps grab ./views/contact.html
  var contactPath = path.join(views, "contact.html");
  console.log(contactPath);
  res.sendFile(contactPath);
});

app.listen(3000, function(){
  console.log("listening on port 3000");
});



// res.sendFile --> built into Express to help send files.