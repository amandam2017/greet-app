'use strict';
 
 module.exports = function Routes(greetPeeps) {

    let salutedName = ''
    let nameList = [];
    // let errors = ''


    async function home(req, res) {

        // console.log(await greetPeeps.greetCounter())
      
        try {
        let counter =  await greetPeeps.greetCounter();
      
      
          res.render("index", {
            salutedthisname: salutedName,
            counter,
            // errors,
            // nameList
          });
      
      
      
        } catch (error) {
          console.log(error);
        }
      
      }

      async function greeting(req, res) {
        // console.log(await greetPeeps.greetEnteredName({name: req.body.userName,
        //   language: req.body.userLanguage}))
        try {
        var pattern = /^[A-Za-z]+$/;

          var name = req.body.userName
          var language = req.body.userLanguage
      
          if(pattern.test(name)){
            if (name && language) {
              salutedName = await greetPeeps.greetEnteredName({
                name: req.body.userName,
                language: req.body.userLanguage,
              });
            }
           
            else if (!name && !language) {
                req.flash('error', "*Please enter name and select a language*")
              } 
              else if (!name) {
                req.flash('error', "*Please enter name*")
              } 
              else if (!language) {
                req.flash('error', "*Please select a language*")
              }
            }
            // else{
            //   req.flash('error', "*letters only*")
          
            // }  
          res.redirect('/');
      
        } catch (error) {
          console.log(error);
        }
      }

      async function greetedlist(req, res) {
        try {
          // console.log(await greetPeeps.getName())
          res.render('greetedNames', {
            nameList: await greetPeeps.getName()
          })
        } catch (error) {
          console.log(error);
        }
      }

      async function greetCounterList(req, res) {
        try {
          let names = req.params.greeted_names;
          let counter_names = await greetPeeps.greetedManyTimes(names)
          res.render('counter', {
            names,
            counter_names
          })
      
        } catch (error) {
          console.log(error);
        }
      
      }

      async function clearDataBase(req, res) {
        try {
      
          await greetPeeps.resert()
      
          res.redirect('/')
        } catch (error) {
          console.log(error);
        }
      }

      function errors(){
        try {
            var pattern = /^[A-Za-z]+$/;
    
              var name = req.body.userName
              var language = req.body.userLanguage
               
              if (!name && !language) {
                req.flash('error', "*Please enter name and select a language*")
              } else if (!name) {
                req.flash('error', "*Please enter name*")
              } else if (!language) {
                req.flash('error', "*Please select a language*")
              }
            else{
              req.flash('error', "*letters only*")
          
            }
          
            // counter = await greetPeeps.dbqueries(counter);
          
          
              res.redirect('/');
          
            } catch (error) {
              console.log(error);
            }
      }


    return{
        home,
        greeting,
        greetedlist,
        greetCounterList,
        clearDataBase,
        errors
    }

 }