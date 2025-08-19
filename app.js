var express = require("express");

var bodyParser = require("body-parser");
var expressSanitizer = require("express-sanitizer")
var methodOverride = require("method-override");
var session = require('express-session');

var mongoose = require("mongoose");

var passport = require("passport");

var LocalStrategy = require("passport-local");

var passportLocalMongoose = require("passport-local-mongoose");

var app = express();

var http = require('http');

var Twitter = require('twitter');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
var jsonParser = bodyParser.json()

var urlencodedParser = bodyParser.urlencoded({ extended: false })



app.set("view engine", "ejs");

mongoose.connect("mongodb://f0a03ddc81807c2bfa85212aa379dc16:karanfil@10a.mongo.evennode.com:27017,10b.mongo.evennode.com:27017/f0a03ddc81807c2bfa85212aa379dc16?replicaSet=us-10", {useNewUrlParser:true});

var tweetSchema = new mongoose.Schema({title:String, image:String, comment:String, datetime:Date, cookingTime:Number, tID:String, author:String})

var pinnedtweets = mongoose.model("tweet", tweetSchema);

var userSchema = new mongoose.Schema({username:String, password:String})

var user = mongoose.model("user", userSchema);

var client = new Twitter({
  consumer_key: 'QBrLJXGaHizZIQlG7Nhchcs52',
  consumer_secret: '1SPoEwaJFWmq7HHlzFr5d8F6mOyyEn08JrAQ692Fl024YYcXBk',
  access_token_key: '1187730839670607874-Q6cOkorS75WUvD8zLFdtmd0bi4h5v0',
  access_token_secret: 'KiW3hpOdw8VzEfO1e5x9p1QKMdJA45BXNVtkCyqP1HWyl'
});


var directory = "/";


app.get(directory + "register", function(req,res){
       if (!req.session.loggedin) {
res.render("register", { username:req.session.username, host: "http://"+req.headers.host, directory:directory });}
else
{
          res.redirect("./")
}
})


app.get(directory +"login", function(req,res){
      if (!req.session.loggedin) {
res.render("login", { username:req.session.username, host: "http://"+req.headers.host, directory:directory });
}
else
{
          res.redirect("./")
}
})


app.get(directory +"logout", function(req,res){
    if (req.session.loggedin) {
                req.session.loggedin = false;
				req.session.username = null;
				res.redirect("./");
    }
})








app.get(directory, function(req,res){

pinnedtweets.find({},function(err,tweets)
{
    if (err)
    {
                       res.render('message', {username:req.session.username, host: "http://"+req.headers.host, directory:directory,message:"Error occured and could not retrieve data! <a href='javascript:history.back()'>Go Back</a>"})
    }
    else
    {
        
                    res.render("index",{tweets: tweets, username: req.session.username,  host: "http://"+req.headers.host, directory:directory})
        
    }
    
    
}).sort({'_id': -1})

    

})





app.get(directory+"contact/", function(req,res){

 res.render("contact",{username: req.session.username, host: "http://"+req.headers.host, directory:directory})

})



app.get(directory +"show/:id", function(req,res){

pinnedtweets.findById(req.params.id, function (err, foundRec) {
    if (err) { 
                              res.render('message', {username:req.session.username, host: "http://"+req.headers.host, directory:directory, message:err})
 
    }
    else { 
	
	
	
	
	
	
	
	
				
					 
			 const params = {
				 id: foundRec.tID
			  } 


			 client.get('statuses/show', params, function(error, tweets, response){

		
			  res.render('show', { tweet: foundRec, feed:tweets , username: req.session.username, host: "http://"+req.headers.host, directory:directory});
			});
    
	
	

	
	
      
    }

})

})



app.get(directory +"delete/:id", function(req,res){
  
  
  
  pinnedtweets.remove({ _id: req.params.id }, function(err) {
    if (!err) {
            res.redirect(directory);
    }
    else {
            res.redirect(directory);
    }
});
   
    


})


app.post(directory +"login",urlencodedParser, function(req,res){
const username = req.body.username
const password  = req.body.password
var newUser = user({
        username:  username,
        password: password
})
    
    
    

user.findOne({'username': req.body.username, 'password': req.body.password}, function(err, record)
{
    
    if (record === null)
    {
                      res.render('message', {username:req.session.username, host: "http://"+req.headers.host, directory:directory, message:"Your user/password pair is wrong! <a href='javascript:history.back()'>Go Back</a>"})
    }
    else
    {
        
    if (err)
    {
    }
    else
    {
            if (!req.session.loggedin) {
                req.session.loggedin = true;
				req.session.username = username;
                res.redirect("./")
            }   
    }
    }
         
    
    
    
})





})


app.post(directory +"register", urlencodedParser, function(req,res){


const username = req.body.username
const password  = req.body.password
   var newUser = user({
        username:  username,
        password: password
    })
    
    

 newUser.save(function(err,record){
	           

        if (err)
        {
            res.render('message', {username:req.session.username, host: "http://"+req.headers.host, directory:directory,message:"Error happened in your user registration! <a href='javascript:history.back()'>Go Back</a>"})
        }
        else
        {
                        res.render('message', {username:req.session.username, host: "http://"+req.headers.host, directory:directory, message:"Thank you "+username+"!<br>You are registered with id:" + record._id + "<br><a href='" + directory + "'>Home</a>"})

        }
        
    } );
    
    

 
})
 



 
 
 
 
 
 
 
 
 
 
 
 
  
 
app.get(directory + "livefeed", function(req,res){
 
 const params = {
     from: 'elonmusk', count: 40
  } 


 client.get('search/tweets', params, function(error, tweets, response){

   var tw = tweets.statuses;
   res.render("live", { username:req.session.username,tweets:tw, host: "http://"+req.headers.host, directory:directory})

});
                 

})

 
 
 
 
 
app.get(directory + "pinnew/:id", function(req,res){
	
    if (req.session.loggedin) {
                    res.render("pinnew", { username:req.session.username, tID: req.params.id, host: "http://"+req.headers.host, directory:directory})
    }
    else
    {
           res.render('message', {username:req.session.username, host: "http://"+req.headers.host, directory:directory, message:"You have to be logged-in to pin new tweet! <a href='" + directory + "login'>Login Now!</a>"})

    }
})

app.post(directory +"pinnew/:id", urlencodedParser, function(req,res){


   var newTweet = pinnedtweets({
        title:req.body.title,
        comment:req.body.comment,
		datetime:new Date().toString().slice(0, 24),
        tID:req.body.tID,
		author:req.session.username
    })
    
    newTweet.save(function(err,record){
        
  
        if (err)
        {
  
                   res.render('message', {username:req.session.username, host: "http://"+req.headers.host, directory:directory, message:"error happened in pinning new tweet into database."})
        }
        else
        {
           // console.log("new record added into database with id:" + record._id);
           res.render('message', {username:req.session.username, host: "http://"+req.headers.host, directory:directory, message:"new tweet was pinned into database with id:" + record._id + "<br><a href='" + directory + "'>Home</a>"})
        }
        
    })
    
})




		   








app.listen(process.env.PORT, "0.0.0.0", function () {
    console.log("PinTweet Server has started");

});

