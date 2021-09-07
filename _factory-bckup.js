'use strict';

module.exports = function greet(pool) {
    //create a map to store names
    // var theName = {} 

    async function setName(name) {
        // var nameEntered = name.chartArt(0).toUpperCase() + name.slice(1).toLocaleLowerCase();
        if (name) {
            var checkName = await pool.query('SELECT greeted_names FROM greetUsers WHERE greeted_names = $1', [name]);
            if (checkName.rowCount === 0) {
                const INSERT_QUERY = await pool.query('INSERT INTO greetUsers (greeted_names, counter_names) values ($1, 1)', [name]);
            }else {
                var UPDATE_QUERY = await pool.query('UPDATE greetUsers SET counter_names = counter_names+1 WHERE greeted_names = $1', [name]);
            }
        }

    }

    async function greetedManyTimes(name) {
        try {
            var list = await pool.query('SELECT counter_names FROM greetUsers WHERE greeted_names = $1', [name]);
            return list.rows[0].counter_names
        } catch (error) {
            console.log(error)
        }
    }

    async function greetEnteredName(name, language) {
        try {

            if (pattern.test(name)) {

                if (language === 'isiXhosa' && name != '') {
                    return "Molo, " + name;
                }

                if (language === 'English' && name != '') {
                    return "Hello, " + name;
                }

                else if (language === 'Afrikaans' && name != '') {
                    return "Hallo, " + name;
                }

                // return greetMe
            }

        } catch (error) {
            console.log(error)

        }
    }

    async function greetCounter() {
        //create a variable to select greeted from the database and return count.rowCount
        try {
            var count = await pool.query('SELECT greeted_names FROM greetUsers')
            return count.rowCount;
        } catch (error) {
            console.log(error)
        }
    }

    async function getName() {
        try {
            var storedNames = await pool.query('SELECT greeted_names FROM greetUsers')
            return storedNames.rows;
        } catch (error) {
            console.log(error)
        }
    }

    var pattern = /^[A-Za-z]+$/;
    // var pattern1 = /[0-9]/
    // var noLetterError = 'letters only'
    var name = ''
    var language = ''

    async function resert() {
        try {
            var clearData = await pool.query('DELETE FROM greetUsers');
            return clearData.row;
        } catch (error) {
            console.log(error)
        }
    }

    return {
        setName,
        greetEnteredName,
        greetCounter,
        getName,
        greetedManyTimes,
        resert
    }
}

// create table users(
// 	id serial not null primary key,
// 	greeted_names text not null,
//     counter_names int
// );

//whoiam --to check the super user
//keep password -- make sure it corresponds with the super user
//Learnt to be flexible --- to not get too attached to the code
//keep the counter persist
//when writing your queries from the database you need to first insert
