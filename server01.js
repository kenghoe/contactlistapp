var express = require("express");
var mongojs = require("mongojs");

var app = express();
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//app.get("/", function(req, res) {
//    res.send("Hello world from server.js! ;-)");
//});


app.get('/contactlist', function(req, res) {
    console.log("I received a GET request");

    db.contactlist.find(function(err, docs) {
	console.log(docs);
	res.json(docs);
    });

/*    person1 = {
	name:	'Tim',
	email:	'tim@email.com',
	number:	'(111) 111-1111'
    };

    person2 = {
	name:	'Emily',
	email:	'email@email2.com',
	number:	'(222) 222-2222'
    };

    person3 = {
	name:	'John',
	email:	'joh@email3.com',
	number:	'(333) 333-3333'
    };

    var contactlist = [person1, person2, person3];

    res.json(contactlist); */
});

app.post('/contactlist', function(req, res) {
    console.log("server.js : POST '/contactlist'!!");
    console.log(req.body);
    db.contactlist.insert(res.body, function(err, doc) {
	res.json(doc);
    });
});

app.listen(3000);
console.log("Server running on port '3000'");
