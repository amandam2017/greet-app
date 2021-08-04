module.exports = function greet(localData){

    var theName = localData || [];
    
    function setName(enterYourName){
        enterYourName = enterYourName.charAt(0).toUpperCase() + enterYourName.slice(1).toLowerCase();
        
        if(!theName.includes(enterYourName) && enterYourName.match(pattern)){
            
            theName.push(enterYourName);
        }

        return;
    }

    function getName(){
        return theName;
    }

    function greetCounter(){
        return theName.length;   
    }

    var pattern = /^[A-Za-z]+$/;
    var noLetterError = 'letters only'
     
    // greet a person
    function greetEnteredName(name,language){
        var greetMe = [];
        if(pattern.test(name)){

            if(language  === 'isiXhosa' && name != ''){
                greetMe += "Molo, " + name;
            }
    
            if(language === 'English' && name != ''){
                greetMe += "Hello, " + name;
            }
    
            else if(language === 'Afrikaans' && name != ''){
                greetMe += "Hallo, " + name;
            }

            return greetMe

        }
        
        else{
            return noLetterError
        }
            

    }

    function withRadionCheckedValidation(name, language){
        // console.log(name)
            
            var requiredXhosaError = "**Faka igama lakho**"
            var requiredEnglishError = "**Please enter in your name**"
            var requiredAfrikaansError = "**Tik asseblief jou naam in**"

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
        // console.log(name)
            
            var noName = "*please enter your name*"
            var noLanguage = "*Please select a language*"
            var noSelection = "*please enter your name and select a language*"

            if (name === '' || name === undefined && language === '') {
                return noSelection
            }

            else if (language === '' && name !== '' || name !== undefined) {
                return noLanguage
            }

            else if (language !== '' && name === '' || name === undefined) {
                return noName
            }
            else{
                return ''
            }

    }

    function validateNoLangAndName(name, language){
        // console.log(name)
            
            // var noName = "*please enter your name*"
            // var noLanguage = "*Please select a language*"
            var noSelection = "*please enter your name and select a language*"

            if (name === '' || name === undefined && language === '') {
                return noSelection
            }

            // else if (language === '' && name !== '' || name !== undefined) {
            //     return noLanguage
            // }

            // else if (language !== '' && name === '' || name === undefined) {
            //     return noName
            // }
            else{
                return ''
            }

    }


    return{
        setName,
        getName,
        greetCounter,
        greetEnteredName,
        withRadionCheckedValidation,
        validateEmptyForm,
        // adding these for testing more errors
        validateNoLangAndName
    }
}