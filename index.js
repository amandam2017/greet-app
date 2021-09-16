'use strict';

const flash = require('express-flash');
const session = require('express-session');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const greet = require('./greetMe');
//require a routes file
const Routes = require('./routesFile');

const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
  useSSL = true;
}


// which db connection to connect to
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_app';


const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

    // let salutedName = ''
    // let nameList = [];
    let errors = ''


//instantiate app
const app = express();
//create instance for greet factory
const greetPeeps = greet(pool);
//create an instance for the routees
const routesFileInstance = Routes(greetPeeps);

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: 'this is my session string',
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//middlewere to make public folder visible
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyparser.urlencoded({extended: true}));

// parse application/json
// app.use(bodyParser.json());
app.use(bodyparser.json()); 
// app.use(bodyparser.json()); //utilizes the body-parser package

//default route
app.get("/", routesFileInstance.home);

app.post('/greet', routesFileInstance.greeting);


// info to be retrieved on database
app.get('/greeted', routesFileInstance.greetedlist)

app.get('/counter/:greeted_names', routesFileInstance.greetCounterList)

app.get('/reset', routesFileInstance.clearDataBase)


let PORT = process.env.PORT || 3015;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});