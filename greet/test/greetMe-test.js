const assert = require('assert');
const greetPeeps = require('../greetMe');
const pg = require("pg");


const Pool = pg.Pool;

// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_app';

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
        it('should be able to set and get the entered name Yolie' , async function(){

            let salute = greetPeeps(pool);
    
            // salute.greetEnteredName()
            assert.deepEqual([{name: "Yolie"}], await salute.getName());

            // assert.equal('Yolie', await salute.getName());
            
        });
    });

    describe("The greetEnteredName function", function () {


        it("Should be able to greet in Isixhosa", async function () {
            let salute = greetPeeps(pool);
            
            await salute.greetEnteredName('Xhosa', 'Mandy');


            assert.equal('Molo, Mandy', await salute.greetEnteredName('Xhosa', 'Mandy'));

        });
        it("Should be able to greet in English", async function () {
            let salute = greetPeeps(pool);

            await salute.greetEnteredName('English', 'Boys');



            assert.equal('Hellow, Boys', await salute.greetEnteredName('English', 'Boys'));

        });

        it("Should be able to greet in Afrikaans", async function () {
            let salute = greetPeeps(pool);

            await salute.greetEnteredName('Hallo', 'Nandy');


            assert.equal('Hallo, Nandy', await salute.greetEnteredName('Afrikaans', 'Nandy'));

        });
    });

    describe("The greetCounter function", function () {
        it("Should be able to count 2 names entered", async function () {
            let salute = greetPeeps(pool);

            await salute.greetEnteredName('Yolie');
            await salute.greetEnteredName('Bulie');

            assert.equal(2, await salute.greetCounter());
        });

        it("Should be able to count 4 names entered and increment the counter", async function () {
            let salute = greetPeeps(pool);

            await salute.greetEnteredName('amanda');
            await salute.greetEnteredName('lina');
            await salute.greetEnteredName('mnashe');
            await salute.greetEnteredName('Izie');


            assert.equal(4, await salute.greetCounter());
        });

    });

    describe("The name greeted function", function () {
        it("should be able to return all the greetEnteredName names as an object", async function () {
            let salute = greetPeeps(pool);

            await salute.greetEnteredName('Sibo');
            await salute.greetEnteredName('Sinazo');
            await salute.greetEnteredName('Mzi');
            await salute.greetEnteredName('Bonolo');
            assert.deepEqual([{ name: 'Sibo' }, { name: 'Sinazo' }, { name: 'Mzi' }, { name: 'Bonolo' }], await salute.getName());

        });
    });

    describe("The namegreetEnteredName function", function () {
        it("should be able to add a name and conter in a sentence", async function () {
            let salute = greetPeeps(pool);

            await salute.greetEnteredName('Amanda');
            
            assert.equal('Hello, ' + 'Amanda' + ' has been greeted ' + 1 + ' times!', await salute.greetedManyTimes('Amanda'));
        });
    });
    after(function () {
        pool.end();
    });

});

