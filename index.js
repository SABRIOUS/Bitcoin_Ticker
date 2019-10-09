// jshint esversion:6

const express = require("express");

const bodyparser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.post("/",function(req,res){
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from:crypto,
      to:fiat,
      amount:amount,
    }
  };


  request(options, function(error,response, body){
    var data = JSON.parse(body);
    var price = data.price;
    var currentDate = data.time;
    
    console.log(price);
    res.write("<p>the current date is "+ currentDate+"</p>");
    res.write("the current price of "+crypto+" is "+price+" "+fiat);
    res.send();
  });

});



app.get("/", function(req,res){
  res.sendFile(__dirname +"/index.html");
});


app.listen(3000,function(){
  console.log("server is running on port 3000.");
});
