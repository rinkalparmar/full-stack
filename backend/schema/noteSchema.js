const mongoose = require('mongoose');
const { Schema } = mongoose;

const noteSchema = new Schema({
   // it define which user id.token set note 
    // it used as foreign key
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'//name of router
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true,
    },
    tag: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("mynotes", noteSchema);