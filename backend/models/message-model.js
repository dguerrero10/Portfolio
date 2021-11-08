const mongoose = require('mongoose');

Schema = mongoose.Schema;

const MessageSchema = new Schema({
    date: {type: Date, default: Date.now},
    name: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
    userToken: {type: String, required: true}
});

module.exports = mongoose.model("Message", MessageSchema);

