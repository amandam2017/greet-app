'use strict';

const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');
const greet = require('./greetMe');

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}


// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_app';

const pool = new Pool({
  //connection to the address
    connectionString,
    ssl : useSSL
  });

// poolg
// .query('SELECT * FROM greetUsers', function(){
//   return 

// })

let salutedName = ''
let nameList = [];
// let eachUserGreetedMany = ''
// const userCounter = {};
let counter = 0;
let errors = ''


//instantiate app
const app = express();
//create instance for greet factory
const greetPeeps = greet(pool);

// initialise session middleware - flash-express depends on it
app.use(session({
  secret : 'this is my session string',
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//middlewere to make public folder visible
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//default route
app.get("/", async function(req, res){
  counter = await greetPeeps.greetCounter();

  res.render("index", {
    salutedthisname : salutedName,
    counter,
    errors,
    // nameList
  });

});

//name route
app.post('/greet', async function(req, res){
  var name =  req.body.userName
  var language = req.body.userLanguage

  if(name && language){
  salutedName = await greetPeeps.greetEnteredName({
    name: req.body.userName, 
    language:req.body.userLanguage,
}) 
  
  counter = await greetPeeps.greetCounter();

  } else if(!name && !language){
    req.flash('error', "*please enter name and select a language*")
  }else if(!name){
    req.flash('error', "*please enter name*")
  }else if(!language){
    req.flash('error', "*please select a language*")
  }
  // console.log(salutedName);
  // console.log(greetPeeps.greetCounter());
// }
  res.redirect('/');
});


// info to be retrieved on database
app.get('/greeted', async function(req, res){
  console.log(greetPeeps.getName())
  res.render('greetedNames', {
    nameList: await greetPeeps.getName()
  })
  
})


app.get('/counter/:greeted_names', async function(req, res){
  let names = req.params.greeted_names;
  let counter_names = await greetPeeps.greetedManyTimes(names)
  res.render('counter', {
    names,
    counter_names
  })
  
 })
 
 

// app.get('/counter/:userName', async function(req, res){
//   await greetPeeps.greetedManyTimes()
// })

app.get('/reset', async function(req, res){

  await greetPeeps.resert()

  res.redirect('/')
})


let PORT = process.env.PORT || 3015;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});