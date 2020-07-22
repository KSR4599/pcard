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
const nodemailer = require('nodemailer');
const { ifError } = require('assert');
var vCardsJS = require('vcards-js');
var fs = require('fs');
const FileReader = require('filereader');




router.post('/del_request', function(req, res,next) {

    var username = req.body.username;
    var email = req.body.email;


      
      User.findOne({ 'pref_username': username}, function(err, user) {
        if(user){
            user.remove();
            user.save(function(err, userDeleted) {
                if (err) {
                console.log(err);
                } else {
            console.log("User Deleted Succesfully");

        }
    })
}
      })


   
   
    Admin.findOne({ 'name': 'admin'}, function(err, admin) {
        if(admin){

           for(var i=0; i<admin.requests.length;i++){
             if(admin.requests[i].pref_username == username ) {
                 console.log("request removed");
                admin.requests[i].remove();
             }
           }

                  admin.save(function(err, adminUpdated) {
                    if (err) {
                     console.log(err);
                    } else {
                     console.log("Admin Updated Succesfully : "+ adminUpdated);

                     //  //nodemailer
     let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'killershell9@gmail.com', // generated ethereal user
            pass:  'KILLKILL459945'// generated ethereal password
        },
        tls:{
          rejectUnauthorized:false
        }
    });

    var code_string = '<p> Your request is rejected by the admin. Please contact admin support for more details. </p>';

    let mailOptions = {
    from: '"KSR Corp." <killershell9@gmail.com>', // sender address
    to: email, // list of receivers
    subject: '❗️❗️ Tappy Registration Failure',
    html: code_string
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });


    //END OF MAIL TRIGGERING //
    res.status(200).send("request deleted");
                     //res.redirect('/api/login')
                    }
                  });

                        }
                  })
                        })




    router.post('/approve_request', function(req, res,next) {

            var username = req.body.username;
            var email = req.body.email;
            var code = req.body.code;
                        
                           

            User.findOne({ 'pref_username': username}, function(err, user) {
                if(user){
                    user.verified = true;
                    user.save(function(err, userUpdated) {
                        if (err) {
                        console.log(err);
                        } else {
                    console.log("User Updated to Verified "+userUpdated);
        
                }
            })
        }
              })


            Admin.findOne({ 'name': 'admin'}, function(err, admin) {
              if(admin){
                        
                 for(var i=0; i<admin.requests.length;i++){
                   if(admin.requests[i].pref_username == username ) {
                        console.log("request removed");
                            admin.requests[i].remove();
                              }
                            }
                        
                         admin.save(function(err, adminUpdated) {
                           if (err) {
                           console.log(err);
                           } else {
                       console.log("Admin Updated Succesfully : "+ adminUpdated);


                       //MAIL TRIGGERING //
  
 
    //  console.log("Now triggering mail to "+ email + "with a unique code of "+ result);
 
    //  //nodemailer
     let transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 587,
         secure: false, // true for 465, false for other ports
         auth: {
             user: 'killershell9@gmail.com', // generated ethereal user
             pass:  'KILLKILL459945'// generated ethereal password
         },
         tls:{
           rejectUnauthorized:false
         }
     });
 
     var code_string = '<p> Thank you for registering with us! Your unique code is ' + code + '. </p>';
 
     let mailOptions = {
     from: '"KSR Corp." <killershell9@gmail.com>', // sender address
     to: email, // list of receivers
     subject: '✅ Tappy Registration Succesful',
     html: code_string
     };
 
     // send mail with defined transport object
     transporter.sendMail(mailOptions, (error, info) => {
         if (error) {
             return console.log(error);
         }
         console.log('Message sent: %s', info.messageId);
         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
 
     });
 
 
     //END OF MAIL TRIGGERING //
     res.status(200).send("request approved");
                     //res.redirect('/api/login')
               }
           });
                        
          }
     })
      })



      router.post('/update_handle', function(req, res, next) {
        var username = req.body.username;
  

      console.log("In update_handle username is  " + username );


      User.findOne({ 'pref_username': username}, function(err, user) {
                if(user){
                    console.log("User Found");

                        user.firstname = req.firstname; 

                        user.lastname = req.lastname; 
                        
                        user.socialSchema.instagram=  req.instagram;
      
                        user.socialSchema.twitter=  req.twitter;
              
                        user.socialSchema.facebook=  req.facebook;
          
                        user.socialSchema.pinterest=  req.pinterest;
        
                        user.socialSchema.youtube=  req.youtube;
                  
                        user.socialSchema.linkedin =  req.linkedin;
           
                        user.socialSchema.reddit =  req.reddit;
                
                        user.bio = req.bio;

                        user.address = req.address;

                        user.contactSchema.country = req.country;

                        user.contactSchema.state = req.state;
                         
                        user.contactSchema.cell = req.cell;
                         
                        user.contactSchema.home = req.home;

                        user.contactSchema.fax = req.fax;
                    
                      user.save(function(err, userUpdated) {
                        if (err) {
                        console.log(err);
                        } else {
                    console.log("User Profile Updated to  "+userUpdated);
        
                }
            })                 
                    
        } else {
          res.status(404).send("user not found");
        }
              })

              //return res.json({ done : true });
              res.status(200).send(JSON.stringify(user));
      })


      router.post('/get_profile', function(req, res, next) {

        var username = req.body.username;
        
    User.findOne({ 'pref_username': username}, function(err, user) {
                if(user){
                    console.log("User Found in get profile");
                    res.status(200).send(user);
                } else {
                  res.status(404).send("user not found");
                }
              })


      })


      router.get('/get_vcard', function(req, res, next) {
        var vCard = vCardsJS();
 
        //set properties
        vCard.firstName = 'Eric';
        vCard.middleName = 'J';
        vCard.lastName = 'Nesser';
        vCard.organization = 'ACME Corporation';
        vCard.photo.attachFromUrl('https://avatars2.githubusercontent.com/u/5659221?v=3&s=460', 'JPEG');
        vCard.workPhone = '312-555-1212';
        vCard.birthday = new Date(1985, 0, 1);
        vCard.title = 'Software Developer';
        vCard.url = 'https://github.com/enesser';
        vCard.note = 'Notes on Eric';
        
        console.log(vCard.getFormattedString());

        vCard.saveToFile('./eric-nesser.vcf');  
        
        

        const fileName = 'eric-nesser.vcf';
        const filePath = path.join('./', fileName);
    
        // File options
         const options = {
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true,
                'content-disposition': "attachment; filename=" + fileName, // gets ignored
                'content-type': "text/vcard"
            }
        }
    
        try {
            res.download(
                filePath,
                fileName,
                options
            );
            console.log("File sent successfully!");
        }
        catch (error) {
            console.error("File could not be sent!");
            next(error);
        }

      })
      

