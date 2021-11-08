const express = require('express');
const router = express.Router();

const otherController = require('../controllers/other');

router.get('/get-matrix/:token', otherController.getMatrixProblem)
router.post('/matrix-answer', otherController.MatrixAnswer)

module.exports = router;