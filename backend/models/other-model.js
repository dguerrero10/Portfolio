const mongoose = require('mongoose');

Schema = mongoose.Schema;

const OtherSchema = new Schema({
    date: {type: Date, default: Date.now},
    A_inv: {type: [], required: true},
    B: {type: [], required: true},
    answerText: {type: String, required: true},
    userToken: {type: String, required: true},
    read: {type: Boolean, required: false, default: false}
});

module.exports = mongoose.model("Other", OtherSchema);

