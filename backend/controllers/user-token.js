const crypto = require('crypto');
const UserToken = require('../models/user-token-model');

exports.GenerateUserToken = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            return;
        }
        let token = buffer.toString('hex');
        let userToken = new UserToken({
            token: token
        });
        return userToken.save().then(token => {
            return res.status(200).json({
                success: true,
                token: token
            });
        }).catch(err => {
            return res.status(500).json({
                error: err,
                message: 'Something went wrong.'
            });
        });
    });
}