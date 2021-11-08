const mongoose = require('mongoose');

Schema = mongoose.Schema;

const UserTokenSchema = new Schema({
    date: {type: Date, default: Date.now},
    token: {type: String}
});

module.exports = mongoose.model("UserToken", UserTokenSchema);

