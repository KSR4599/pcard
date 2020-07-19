"use strict";
var express = require('express');
var app = express()
var expressValidator = require('express-validator');
var router = express.Router();
module.exports = router;
const multer = require('multer');
//var upload = multer({dest: '../resdem/views/images'})
var mongoose=require('mongoose');
var bodyParser= require('body-parser')
var Ask= mongoose.model('User')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var flash = require('express-flash-notification')
var User=mongoose.model('User')
var Admin = mongoose.model('Admin')
var ctrlUsers = require('../controllers/users.controllers.js');
var hbs  = require('express-handlebars');
var path= require('path')
var asy = require("async");
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
  var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const nodemailer = require('nodemailer')

var flag = 0;


router.get('/',function(req, res,next){

    
          console.log("Register page called!");

          res.render('index');
        
    })

 router.get('/login',function(req, res,next){

    
        console.log("Complete Registration page called!");

        res.render('login');
      
  })


 router.post('/new_admin',function(req, res,next){

  var newUser = new User({
    firstname: 'admin',
    lastname: 'admin',
    email: 'killershell9@gmail.com',
    pref_username: 'admin',
    verified : true
  })

  
  User.createUser(newUser,function(err, user){
    if(err) { 
        throw err;  } else {
         console.log("Admin is inserted as user succesfully!");
        }
      })

    var newAdmin = new Admin({
        name :'admin',
       requests : []
      })

      Admin.createAdmin(newAdmin,function(err, newAdmin){
        if(err) { 
            throw err;  } else {

    return res.json({ done : true });
      
  }
})
 })



  router.get('/wrong_login',function(req, res,next){

    
    console.log("wrong login!");

    res.render('wrong_login');
  
})

  router.get('/login1',function(req, res,next){

    
    console.log("Login page called!");

    res.render('login1');
  
})


  router.get('/register',function(req, res,next){

    
    console.log("register succesful!");

    res.render('login');
  
})

router.get('/admin',function(req, res,next){

    
    console.log("admin login called");
    Admin.findOne({ 'name': 'admin'}, function(err, admin) {
        if(admin){
            console.log("admin found : "+ admin); 

            res.render('admin', {requests: [admin.requests]});

        } else {
            console.log("admin not found"); 
        }


    //res.render('admin');
  
})
})


router.get('/profile',function(req, res,next){

    
    console.log("profile page called");

    var user=req.user;

    console.log("Profile of user is : "+ user);

    res.render('profile', {user:user});
  
})




  router.post('/register', function(req, res) {

    var firstname= req.query.fname;
  var email = req.query.email;
  var lastname=req.query.lname;
  var preferredname=req.query.pname;
  var result = '';

  result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < 7; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  

    if(false){
    //PASSWORD MATCHING VERIFICATION
    //VALID EMAIL MATCHING
    } else {

        //Creating the user in DB
        User.findOne({ 'email': req.body.email}, function(err, user) {
            if(user){
                console.log("Duplicate email found!");
                res.status(201).send("Duplicate Email");
              //res.render('index',{x:3});
            } else {
                User.findOne({ 'pref_username': req.body.pname}, function(err, user1) {
                    if(user1){
                        console.log("Duplicate pname found!");
                        res.status(202).send("Duplicate Pname");
                        
                      //res.render('index',{x:33});
            } else {
                console.log("Unique user detected!");

                var newUser = new User({
                    firstname:firstname,
                    lastname: lastname,
                    email:email,
                    pref_username:preferredname,
                    verified : false,
                    socialSchema : {},
                    unique_code : result
                  })
                  User.createUser(newUser,function(err, user){
                    if(err) { 
                        throw err;  } else {

                           

     Admin.findOne({ 'name': 'admin'}, function(err, admin) {
        if(admin){
            console.log("admin found : "+ admin);
                    
            admin.requests.push({


                firstname:firstname,
                    lastname: lastname,
                    email:email,
                    pref_username:preferredname,
                    verified : false,
                    unique_code : result
                
                  });
                
                  admin.save(function(err, adminUpdated) {
                    if (err) {
                     console.log(err);
                    } else {
                     console.log("Admin Updated Succesfully : "+ adminUpdated);
                      res.status(200).send("Registered successfully");
                     //res.redirect('./login')
                    }
                  });

                        }
                  })
            }
        })
    } 
    })
   
    } 

        })
}
  })




router.post('/login', function(req, res,next) {

    var username= req.body.username;
    var code = req.body.unique_code;
    var password1 =req.body.password;
    var password2 =req.body.password_repeat;

//Check for same password

User.findOne({ 'pref_username': req.body.username}, function(err, user) {
    if(user){

        if(user.verified){
        var stored_code = user.unique_code;


        if(code === stored_code){
            console.log("Unique Code Matched for "+ user);
            user.password = password1;
            user.verified = true;

            user.save(function(err, userUpdated) {
                if (err) {
                  console.log(err)
                } else {
                    User.cryptUser(userUpdated,function(err, user){
                        if(err) throw err;
                        console.log(user);
                  
                      })
                  console.log("User is updated : "+ userUpdated);
                  res.render('login1');
                }
              });

        } else {
            console.log("User found but Unique Code MisMatched!");
        }
      
    } else {
        console.log("User not verified");
    }
    } 
    else{
        console.log("User not Found!");
    }
})
})




//LOGIN
router.post('/login1',
passport.authenticate('local',{failureRedirect:'/api/wrong_login'}),
function(req, res, next){

    if(flag == 2){
 res.redirect('/api/profile');
    } else {
        if(flag == 1){
            res.redirect('/api/admin');
        }
    }

});


passport.serializeUser(function(user, done) {
       return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      return done(err, user);
});
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username,function(err,user){

      if(err) {return done(err);}

      if(!user){
        console.log("No user found");
         return done(null,false,{message:'Unknown User!'});
        }

      User.comparePassword(password,user.password,function(err,isMatch){
        if(err) {return done(err); }

        if(isMatch){
       console.log("User Found!")
             console.log("User found to be :"+ user);

             if(user.pref_username === 'admin' && user.email == 'killershell9@gmail.com') {
                 flag = 1;
             } else {
                 flag = 2;
             }
              return done(null,user);
        }
          else {
              return done(null, false, {
                  message: "Invalid password"})

           //return done(null,false)
         }
         })
})

}));