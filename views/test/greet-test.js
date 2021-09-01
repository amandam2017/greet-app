// const assert = require('assert');
// const greet = require('./greetMe');
// const pg = require("pg");
// const Pool = pg.Pool;

// // which db connection to use
// const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_app';

// const pool = new Pool({
//   //connection to the address
//     connectionString,
//     ssl : {
//       rejectUnauthorized: false
//     }
//   });

// describe('this instance is testing greet function', function(){
//     it('should be able to set and get the entered name Yolie' , function(){

//         const greetMe = greet(pool);

//         greetMe.greetEnteredName('yolie');    
//         assert.equal('Yolie', greetMe.greetEnteredName());
        
//     });
// })
