// const assert = require('assert');
// // const salute = require('./greetMe');
// const pg = require("pg");
// const greetPeeps = greet(pool);
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

//   describe("The greet_app", function(){
//     beforeEach(async function () {
//         await pool.query("delete from greeting");
    
//     });
    
//     describe("The greetEnteredName function", function () {
//         it("should be able to insert a name Amanda and increment the counter", async function () {
//             //connect to the factory function
//             let greetPeeps = greet(pool);
//              await greetPeeps.getName("Amanda")
             
            
//             assert.deepEqual([{name: "Amanda"}], await greetPeeps.getName());
    
//         });
//     });
    
//         describe("The greetEnteredName function", function() {
    
       
//         it("Should be able to greet in Isixhosa", async function () {
//             let greetPeeps = greet(pool);
//              await greetPeeps.greetEnteredName('Xhosa', 'Mandy');
    
           
//             assert.equal('Molo, Mandy', await greetPeeps.greetEnteredName('Xhosa', 'Mandy'));
    
//         });
//         it("Should be able to greet in English", async function () {
//             let greetPeeps = greet(pool);
            
//              await greetPeeps.greetEnteredName('English', 'Boys');
             
    
           
//             assert.equal('Hellow, Boys', await greetPeeps.greetEnteredName('English', 'Boys'));
    
//         });
    
//         it("Should be able to greet in Afrikaans", async function () {
//             let greetPeeps = greet(pool);
            
//              await greetPeeps.greetEnteredName('Hallo', 'Nandy');
             
           
//             assert.equal('Hallo, Nandy', await greetPeeps.greetEnteredName('Afrikaans', 'Nandy'));
    
//         });
//     });
    
//         describe("The greetCounter function", function() {
//         it("Should be able to count 2 names entered", async function () {
//             let greetPeeps = greet(pool);
            
//             await greetPeeps.greetEnteredName('Yolie');
//             await greetPeeps.greetEnteredName('Bulie');
    
//         assert.equal(2, await greetPeeps.greetCounter());
//         });
    
//             it("Should be able to count 4 names entered and increment the counter", async function () {
//                 let greetPeeps = greet(pool);
            
//                 await greetPeeps.greetEnteredName('amanda');
//                 await greetPeeps.greetEnteredName('lina');
//                 await greetPeeps.greetEnteredName('mnashe');
//                 await greetPeeps.greetEnteredName('Izie');
    
        
//             assert.equal(4, await greetPeeps.greetCounter());
//             });
        
//     });
    
//     describe("The name greeted function", function() {
//         it("should be able to return all the greetEnteredName names as an object", async function() {
//             let greetPeeps = greet(pool);
            
//             await greetPeeps.greetEnteredName('Sibo');
//             await greetPeeps.greetEnteredName('Sinazo');
//             await greetPeeps.greetEnteredName('Mzi');
//             await greetPeeps.greetEnteredName('Bonolo');
//             assert.deepEqual([{name: 'Sibo'}, {name: 'Sinazo'}, {name: 'Mzi'}, {name: 'Bonolo'}], await greetPeeps.getName());
    
//         });
//     });
    
//     describe("The namegreetEnteredName function", function() {
//         it("should be able to add a name and conter in a sentence", async function() {
//             let greetPeeps = greet(pool);
            
//             await greetPeeps.greetEnteredName('Anam');
            
//             assert.equal('Hello, ' + 'Anam' + ' has been greetEnteredName ' + 1 + ' times!', await greetPeeps.getName('Anam'));
//         });
//     });
//     after(function() {
//         pool.end();
//     });
    
//     });
    
