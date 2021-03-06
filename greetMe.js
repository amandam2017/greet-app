'use strict';
 
 module.exports = function greet(pool) {

    async function dbqueries(name){
        let strName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        if(name){
            var checkName = await pool.query('SELECT greeted_names FROM greetUsers WHERE greeted_names = $1', [strName]);
            if (checkName.rowCount === 0) {
                const INSERT_QUERY = await pool.query('INSERT INTO greetUsers (greeted_names, counter_names) values ($1, 1)', [strName]);
            }
            
            else {
                var UPDATE_QUERY = await pool.query('UPDATE greetUsers SET counter_names = counter_names+1 WHERE greeted_names = $1', [strName]);
            }
        }
        
    }

    async function greetEnteredName(enterYourName) {
        
        try {

            name = enterYourName.name
            language = enterYourName.language

            await dbqueries(name)

    
            let strName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

            if (pattern.test(strName)) {
   
                if (language === 'isiXhosa' && strName != '') {
                    return "Molo, " + strName;
                }
    
                if (language === 'English' && strName != '') {
                    return "Hello, " + strName;
                }
    
                else if (language === 'Afrikaans' && strName != '') {
                    return "Hallo, " + strName;
                }
    
            }else{
                return "Please enter letters Only [a-z]"
            }
            
        } catch (error) {
            console.log(error)
            
        }
    }

    async function getName() {
        try {
            var storedNames = await pool.query('SELECT greeted_names FROM greetUsers')
            // console.log(storedNames.rows)
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
        resert,
        dbqueries
    }
}
