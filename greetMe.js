'use strict';
 
 module.exports = function greet(pool) {
    //create a map to store names
    // var theName = {} 
    async function greetEnteredName(enterYourName) {
        try {
            name = enterYourName.name
            language = enterYourName.language
    
            name = name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase()
    
            var greetMe = {}
            // console.log(greetMe)
            if (pattern.test(name)) {
    
                // if(theName[name]=== undefined){
                //create a variable that will have a query selector
                var checkName = await pool.query('SELECT greeted_names FROM greetUsers WHERE greeted_names = $1', [name]);
                if (checkName.rowCount === 0) {
                    const INSERT_QUERY = await pool.query('INSERT INTO greetUsers (greeted_names, counter_names) values ($1, 1)', [name]);
                }
                // theName[name] = 1
                // }
                else {
                    var UPDATE_QUERY = await pool.query('UPDATE greetUsers SET counter_names = counter_names+1 WHERE greeted_names = $1', [name]);
    
                    // theName[name]++
                }
                // console.log(name);
                if (language === 'isiXhosa' && name != '') {
                    greetMe = "Molo, " + name;
                }
    
                if (language === 'English' && name != '') {
                    greetMe = "Hello, " + name;
                }
    
                else if (language === 'Afrikaans' && name != '') {
                    greetMe = "Hallo, " + name;
                }
    
                return greetMe
            }
            
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

    async function greetedManyTimes(name){
        try {
            var list = await pool.query('SELECT counter_names FROM greetUsers WHERE greeted_names = $1', [name]);
            return list.rows[0].counter_names
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

    var pattern = /^[A-Za-z]+$/;
    var pattern1 = /[0-9]/
    // var noLetterError = 'letters only'
    var name = ''
    var language = ''
    
    async function resert(){
        try {
            var clearData = await pool.query('DELETE FROM greetUsers');
            return clearData.row;
        } catch (error) {
            console.log(error)
        }
    }

    return {
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
