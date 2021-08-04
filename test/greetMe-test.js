const assert = require('assert');
const greet = require('../greetMe');

describe("This instance is testing greet function", function(){
    it('should be able to set and get the entered name Yolie' , function(){

        const greetMe = greet();

        greetMe.setName('yolie');    
        assert.equal('Yolie', greetMe.getName());
        
    });
    // it('should greet Amanda in isiXhosa, the selected language and increment the counter' , function(){

    //     const greetMe = greet();
    //     let name = 'Amanda' 

    //     greetMe.setName('Molo,' + name)     
    //     assert.equal('Molo, Amanda', greetMe.getName());
        
    // });

    it('should greet Xolie with a selected language which is Afrikaans and increment the counter' , function(){

        const greetMe = greet();
        let name = 'Xolie' 

        greetMe.setName(name)     
        assert.equal(1, greetMe.greetCounter());
        
    });

    it('should show that counter does not increment if a person is greeted more than one time' , function(){

        const greetMe = greet()
        greetMe.setName('lol')
        greetMe.setName('LOL')
        greetMe.setName('Lol')

        assert.equal(1, greetMe.greetCounter())
   
    });


    it('should increment the counter if three different users are greeted' , function(){

        const greetMe = greet()
        greetMe.setName('Mishy')
        greetMe.setName('lina')
        greetMe.setName('buhle')

        assert.equal(3, greetMe.greetCounter())
        
    });

    it('should increment the counter if three different names are greeted and should continue with the local storage counter on page reload. Before the page loads 3 people were greeted and 3 more are greeted after the page/browser reload and now there are 6 greeted people' , function(){

        const greetMe = greet()
        greetMe.setName('busie')
        greetMe.setName('Nandy')
        greetMe.setName('Nzwakie')

        assert.equal(3, greetMe.greetCounter())

        greetMe.setName('Sasa')
        greetMe.setName('Pinky')
        greetMe.setName('Lelo')

        assert.equal(6, greetMe.greetCounter())
        
    });

    it('should display error messages saysing "plaese enter a name and select a language if no name entered and no language selected"' , function(){

        const greetMe = greet()
        let userName = ''

        greetMe.setName(userName);
        
        assert.equal('', greetMe.getName())        
    });

     it('should not allow a user to enter a letiable type if its not a string and not letters(A-Za-z)' , function(){

        const greetMe = greet();
        let pattern1 = /^((CA|CK|CL)\s([0-9]){6})$/ ;
        let pattern3 = /^((CA|CK|CL)\s\d{3}\-\d{3})$/;
        let pattern2 =  /^((CA|CK|CL)\s\d{3}\s\d{3})$/;
        greetMe.setName('')

        assert.equal('', greetMe.getName())
   
    });   

    it('should display error messages saying *please enter your name* if a user selected a language and clicked greet button without entering a name' , function(){

        const greetMe = greet()
        let noName = "*please enter your name*"

        greetMe.getName('');
        
        assert.equal(noName, greetMe.validateEmptyForm())        
    });

    // it('should display error messages saying *please enter your name* if a user selected a language and clicked greet button without entering a name' , function(){

    //     const greetMe = greet()
    //     let noSelection = "*please enter your name and select a language*"

    //     greetMe.greetEnteredName('');
        
    //     assert.equal(noSelection, greetMe.validateNoLangAndName())        
    // });

})

