module.exports = function greet(){
    //create a map to store names
    var theName = {}

    function getName(){
        return theName;
    }

    function greetCounter(name,language){
        return Object.keys(theName).length
    } 

    var pattern = /^[A-Za-z]+$/;
    var pattern1 = /[0-9]/
    // var noLetterError = 'letters only'
    var name = ''
    var language = ''
    // greet a person
    function greetEnteredName(enterYourName){ 

        name = enterYourName.name
        language = enterYourName.language
        
        name = name.charAt(0).toUpperCase() + name.slice(1).toLocaleLowerCase()
        var greetMe = {}
        console.log(greetMe)
        if(pattern.test(name)){
            // if(!theName.includes(name)){
            //     theName.push(name);
            // }
            if(theName[name]=== undefined){
                theName[name] = 1
            }else{
                theName[name]++
            }

            if(language  === 'isiXhosa' && name != ''){
                greetMe = "Molo, " + name;
            }
    
            if(language === 'English' && name != ''){
                greetMe = "Hello, " + name;
            }
    
            else if(language === 'Afrikaans' && name != ''){
                greetMe = "Hallo, " + name;
            }

            return greetMe
        }
        
        // else{
        //     return noLetterError
        // }
            
    }
    
    function withRadionCheckedValidation(name, language){
            var requiredXhosaError = "*Faka igama lakho*"
            var requiredEnglishError = "*Please enter in your name*"
            var requiredAfrikaansError = "*Tik asseblief jou naam in*"

            if (language === 'isiXhosa' && name === '') {
                return requiredXhosaError
            }

            else if (language === 'English' && name === '') {
                return requiredEnglishError
            }

            else if (language === 'Afrikaans' && name === '') {
                return requiredAfrikaansError
            }
            else{
                return ''
            }
    }

    function validateEmptyForm(name, language){
            var noName = "*please enter your name*"
            var noLanguage = "*Please select a language*"
            var noSelection = "*please enter your name and select a language*"

            if (name === '' || name === undefined && language === '') {
                return noSelection
            }

            if (language === '' && name !== '' || name !== undefined) {
                return noLanguage
            }

            else if (language && name === '' || name === undefined) {
                return noName
            }
            else{
                return ''
            }
    }

    return{
        getName,
        greetCounter,
        greetEnteredName,
        withRadionCheckedValidation,
        validateEmptyForm,
    }
}

// create table users(
// 	id serial not null primary key,
// 	greeted_names text not null,
//     counter_names int
// );