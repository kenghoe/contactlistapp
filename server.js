var express = require("express");
var mongojs = require("mongojs");

var app = express();
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

console.log("__filename - '" + __filename + "'");
//console.log("__dir - '" + __dir + "'");
//console.log("__file - '" + __file + "'");
//console.log("__ext - '" + __ext + "'");

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
});

app.post('/contactlist', function(req, res) {
    console.log("server.js : POST '/contactlist'!!");
    console.log(req.body);
    db.contactlist.insert(req.body, function(err, doc) {
	res.json(doc);
    });
});

app.delete('/contactlist/:id', function(req, res) {
    console.log("server.js : DELETE '/contactlist/:id'!!");

    var id = req.params.id;

    console.log(id);

    db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
	res.json(doc);
    });
});

app.get('/contactlist/:id', function(req, res) {
    var id = req.params.id;

    console.log(id);

    db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
	res.json(doc);
    });
});

app.put('/contactlist/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body.name);

    db.contactlist.findAndModify(
	{
	    query: {_id: mongojs.ObjectId(id)},
	    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
	    new: true
	}, function(err, doc) {
	    res.json(doc);	
	});
});


app.listen(3000);
console.log("Server running on port '3000'");
