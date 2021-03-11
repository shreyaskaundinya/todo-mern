const mongoose = require('mongoose');

/*

fieldname: {
    type: dataType,
    default: defaultValue
}

*/


var TodoItem = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    body: {
        type: String,
        default: ''
    },
    checked : {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('TodoItem', TodoItem);