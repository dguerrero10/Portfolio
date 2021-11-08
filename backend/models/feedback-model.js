const mongoose = require('mongoose');

Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    date: {type: Date, default: Date.now},
    feedbackIndex: {type: Number, required: true},
    feedbackContent: {type: String, required: true},
    userToken: {type: String, required: true}
});

module.exports = mongoose.model("Feedback", FeedbackSchema);

