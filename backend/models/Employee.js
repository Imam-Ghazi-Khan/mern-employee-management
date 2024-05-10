const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    f_image: String,
    f_Name: {
        type: String,
        required: true
    },
    f_Email: {
        type: String,
        required: true,
        unique: true
    },
    f_Mobile: {
        type: String,
        required: true
    },
    f_Designation: String,
    f_gender: String,
    f_Course: String,
    f_Createdate: {
        type: Date,
        default: Date.now
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
