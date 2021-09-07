const assert = require('assert');
const greetPeeps = require('../greetMe');
const pg = require("pg");


const Pool = pg.Pool;

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_testing';

const pool = new Pool({
    //connection to the address
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

let salute = greetPeeps(pool);

describe("The greet_app", function () {
    beforeEach(async function () {
        await pool.query("delete from greetUsers");
    });

    describe("The greetEnteredName function", function () {
        it('should be able to set and get the entered name Maarman' , async function(){

            let salute = greetPeeps(pool);
    
            await salute.greetEnteredName({name:"Maarman"})
            assert.deepEqual([{greeted_names:"Maarman"}], await salute.getName());
            
        });

    });

    describe("The greetEnteredName function", function () {


        it("Should be able to greet in Isixhosa", async function () {
            let salute = greetPeeps(pool);
            
            // await salute.greetEnteredName({name:'Mandy', language:'Xhosa'});

            assert.deepEqual("Molo, Mandy", await salute.greetEnteredName({name:"Mandy", language:"isiXhosa"}));


            // assert.deepEqual('Molo, Mandy', await salute.greetEnteredName('Xhosa', 'Mandy'));

        });
        it("Should be able to greet in English", async function () {
            let salute = greetPeeps(pool);

            // await salute.greetEnteredName({name:"Boys", language:"English"});

            assert.deepEqual("Hello, Boys", await salute.greetEnteredName({name:"Boys", language:"English"}));

        });

        it("Should be able to greet in Afrikaans", async function () {
            let salute = greetPeeps(pool);

            // await salute.greetEnteredName('Hallo', 'Nandy');


            assert.equal('Hallo, Nandy', await salute.greetEnteredName({name:"nandy", language:"Afrikaans"}));

        });
    });

    describe("The greetCounter function", function () {
        it("Should be able to count 2 names entered", async function () {
            let salute = greetPeeps(pool);

            await salute.greetEnteredName({name:"Yolie", language:"isiXhosa"});
            await salute.greetEnteredName({name:"Bulie", language:"isiXhosa"});

            assert.equal(2, await salute.greetCounter());
        });

        it("Should be able to count 4 names entered and increment the counter", async function () {
            let salute = greetPeeps(pool);

            await salute.greetEnteredName({name:"amanda", language:"isiXhosa"});
            await salute.greetEnteredName({name:"LInamandla", language:"isiXhosa"});
            await salute.greetEnteredName({name:"Lusanda", language:"isiXhosa"});
            await salute.greetEnteredName({name:"Xolie", language:"isiXhosa"});

            assert.equal(4, await salute.greetCounter());
        });

    });

    describe("The name greeted function", function () {
        it("should be able to return all the greetEnteredName names as an object", async function () {
            let salute = greetPeeps(pool);
            await salute.greetEnteredName({name:"Wendy", language:"isiXhosa"});
            await salute.greetEnteredName({name:"Zolie", language:"isiXhosa"});
            await salute.greetEnteredName({name:"Joubert", language:"isiXhosa"});
            await salute.greetEnteredName({name:"Ish", language:"isiXhosa"});

            assert.deepEqual([{ greeted_names: 'Wendy' }, { greeted_names: 'Zolie' }, { greeted_names: 'Joubert' }, { greeted_names: 'Ish' }], await salute.getName());

        });
    });

    // describe("The namegreetEnteredName function", function () {
    //     it("should be able to add a name and conter in a sentence", async function () {
    //         let salute = greetPeeps(pool);

    //         await salute.greetEnteredName('Amanda');
            
    //         assert.equal(1, await salute.greetedManyTimes());
    //     });
    // });
    after(function () {
        pool.end();
    });

});

