var mongodb = require("mongodb");
var mongoClient = mongodb.MongoClient;
var express = require("express");
var router = express.Router();
var submit = require("./submit");
var app = new express();
var bodyParser = require("body-parser");
var CryptoJS = require("crypto-js");
var url = "mongodb://localhost:27017/";

app.use(bodyParser.urlencoded({extended:true}));
router.post("/",function(req,response)
{
    var obj = req.body;
    var name = obj.username;
    console.log(name);
    var msg = obj.message;
    mongoClient.connect(url,function(err,db)
    {
        if(err) throw err;
        var dbo = db.db("chatdetails");
        // dbo.createCollection("details",function(err,result)
        // {
        //     if(err) throw err;
        //     console.log(result);
        //     // res.send(JSON.stringify({username:name}));
    
        // });
        var key = "mykey";
        var a = CryptoJS.AES.encrypt(msg.toString(),key);
        //response.write(a.toString());
        var bytes  = CryptoJS.AES.decrypt(a.toString(),key);
        // response.write("\n");
        // response.write(bytes.toString());
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);
        // response.write("\n");
        // response.write(plaintext);
        var obj = {username:name,encdata:a.toString(),enckey:key};
        console.log(obj);
        dbo.collection("details").insertOne(obj,function(err,result)
        {
            if(err) throw err;
            //console.log(result);
            
        response.send(obj);
            //response.sendFile(__dirname + '/blank.html');

        });
    });
});

module.exports = router;