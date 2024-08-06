const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/employeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const employeeSchema = new mongoose.Schema({
    name: String,
    id: String,
    city: String,
    dob: Date,
    age: Number,
    currentWorkingYear: Number,
    position: String
});

const Employee = mongoose.model('Employee', employeeSchema);

app.post('/addEmployee', (req, res) => {
    const newEmployee = new Employee(req.body);

    newEmployee.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send('Successfully added a new employee.');
        }
    });
});

app.get('/getEmployee/:id/:name', (req, res) => {
    Employee.findOne({ id: req.params.id, name: req.params.name }, (err, foundEmployee) => {
        if (err) {
            res.send(err);
        } else {
            res.send(foundEmployee);
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
