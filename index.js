const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const greet = require('./greetMe');

let salutedName = ''
let counter = 0;

//instantiate app
const app = express();
//create instance for greet factory
const greetPeeps = greet();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//middlewere to make public folder visible
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//default route
app.get("/", function(req, res){
  res.render("index", {
    salutedthisname : salutedName,
    counter
  });
});

//name route
app.post('/enterYourName', function(req, res){
  // console.log(req.body);
  salutedName = greetPeeps.greetEnteredName({
    name: req.body.userName, 
    language:req.body.userLanguage,
}) 
counter = greetPeeps.greetCounter()

  console.log(salutedName);
  console.log(greetPeeps.greetCounter());

  res.redirect('/');
});


// app.post('/', function(req, res){
//   counter = greetPeeps.greetCounter({
//     greetedNamesCount: req.body.countGreeteNames});
//   console.log(counter);
//   res.redirect('/');

// })

let PORT = process.env.PORT || 3015;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});