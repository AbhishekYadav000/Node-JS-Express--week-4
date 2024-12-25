var express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
var app = express();

//Basic express application -Exercise 1
app.get("/", function (req, res) {
    res.send("Hello, this is my first Express application.");
});


app.get('/about', function (req, res) {
    res.send("This is a basic Express application.");
});

//Adding Routes and parameters-Exercise 2
app.get('/users/:userId/books/:bookId', function (req, res) {
    res.send(req.params);
});

app.get('/GetStudents', function (req, res) {
    fs.readFile(__dirname + "/" + "Student.json", 'utf8', function (err, data) {
        if (err) throw err;
        console.log(data);
        res.json({
            'status': true,
            'Status_Code': 200,
            'requested at': req.localtime,
            'requrl': req.url,
            'request Method': req.method,
            'studentdata': JSON.parse(data)
        });
    });
});

//Working with JSON Files-Exercise 3 
app.get('/GetStudentid/:id', (req, res) => {
    fs.readFile(__dirname + "/" + "Student.json", 'utf8', function (err, data) {
        if (err) throw err;
        var students = JSON.parse(data);
        var student = students["Student" + req.params.id];
        console.log("student", student);
        if (student) {
            res.json(student);
        } else {
            res.json({
                'status': true,
                'Status_Code': 200,
                'requested at': req.localtime,
                'requrl': req.url,
                'request Method': req.method,
                'studentdata': JSON.parse(data)
            });
        }
    });
});

//Use of post  method-Exercise 4
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/studentinfo', function (req, res) {
    res.sendFile('StudentInfo.html', { root: __dirname });
});

app.post('/submit-data', function (req, res) {
    var name = req.body.firstName + ' ' + req.body.lastName;
    var Age = req.body.myAge + ' Gender: ' + req.body.gender;
    var Qual = 'Qualification: ' + req.body.Qual;
    console.log(req.body.Qual);
    res.send({
        status: true,
        message: 'Form Details',
        data: {
            name: name,
            age: Age,
            Qualification: Qual
        }
    });
});

app.listen(5000, function () {
    console.log("Server running at http://localhost:5000/");
});



