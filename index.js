const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const greet = require('./greetMe');

let salutedName = ''
let counter = 0;
let errors = ''

//instantiate app
const app = express();
//create instance for greet factory
const greetPeeps = greet();

// initialise session middleware - flash-express depends on it
app.use(session({
  secret : 'this is my session string',
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

// // Use req.flash() in your middleware

//   app.get('/', function (req, res) {
//     req.flash('info', 'Welcome');
//     res.render('index', {
//       title: 'Home'
//     })
//   });
//   app.get('/addFlash', function (req, res) {
//     req.flash('info', 'Flash Message Added');
//     res.redirect('/');
//   });

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
    counter,
    errors
  });
});

//name route
app.post('/greet', function(req, res){
  var name =  req.body.userName
  var language = req.body.userLanguage
  // console.log(req.body);
// if(language === undefined && name === undefined){
//   req.flesh('error', 'please enter a name and select a language')
// } else{
  if(name && language){
  salutedName = greetPeeps.greetEnteredName({
    name: req.body.userName, 
    language:req.body.userLanguage,
}) 
  
  counter = greetPeeps.greetCounter();

  } else if(!name && !language){
    req.flash('error', "*please enter name and select a language*")
  }else if(!name){
    req.flash('error', "*please enter name*")
  }else if(!language){
    req.flash('error', "*please select a language*")
  }
  console.log(salutedName);
  console.log(greetPeeps.greetCounter());
// }
  res.redirect('/');
});



// info to be retrieved on database
app.get('/greeted', function(req, res){
  
  res.render('greetedNames')
})


app.get('/counter/:users', function(req, res){
    res.render()
})

app.get('/reset', function(req, res){
  
})


let PORT = process.env.PORT || 3015;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
