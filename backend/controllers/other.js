const Other = require('../models/other-model');
const crypto = require('crypto');
const math = require('mathjs');

require('../helpers/coding-matrix-generator')();
const poem = require('../helpers/poem');

exports.getMatrixProblem = async (req, res, next) => {
    let token = req.params.token;
    let matrixData = codingMatrix();

    let findDocQuery = await Other.findOne({ userToken: token });
    if (findDocQuery !== null && findDocQuery.read !== true ) {
        try {
            let updateQuery = await Other.findOneAndUpdate(
                { userToken: token }, {
                $set:
                {
                    'A_inv': matrixData.A_inv,
                    'B': matrixData.B,
                    'answerText': matrixData.answerText
                }
            }, { returnOriginal: false });
            return res.status(200).json({
                A_inv: updateQuery.A_inv,
                B: updateQuery.B
            });
        } catch (err) {
            console.log(err);
        }
    }
    else if (findDocQuery !== null && findDocQuery.read === true) {
        let A = [[0,0], [0,0]];
        let B = [[0,0], [0,0]];
    
        A = math.matrix(A);
        B = math.matrix(B);

        return res.status(200).json({
            success: true,
            A_inv: A._data,
            B: B._data
        });
    }
    else {
        let other = Other({
            A_inv: matrixData.A_inv,
            B: matrixData.B,
            answerText: matrixData.answerText,
            userToken: req.params.token
        });
    
        other.save().then(result => {
            return res.status(200).json({
                success: true,
                A_inv: result.A_inv,
                B: result.B
            });
        }).catch(err => {
            console.log(err)
        });
    }
}
exports.MatrixAnswer = async (req, res, next) => {
    let token = req.body.token;
    try {
      queryResult = await Other.findOne({ 'userToken': token, 'answerText': req.body.answerText });
      if (queryResult !== null) {
          let hashedText = crypto.createHash('md5').update(queryResult.answerText).digest('hex');
          queryResult.read = true;
          queryResult.answerText = hashedText;
          queryResult.save().then(() => {
            res.status(200).json({
                success: true,
                poem: poem.poem
            });
          });
      }
      else {
        res.status(200).json({
            success: false
        });
      }
    }
    catch (err) {
        console.log(err)
    }

}