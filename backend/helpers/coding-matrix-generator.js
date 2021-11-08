const math = require('mathjs');

module.exports = function () {
    this.codingMatrix = createCodingMatrix = () => {
        try {
            this.transformDict = {
                'a': 1, 'b': 2, 'c': 3,
                'd': 4, 'e': 5, 'f': 6,
                'g': 7, 'h': 8, 'i': 9,
                'j': 10, 'k': 11, 'l': 12,
                'm': 13, 'n': 14, 'o': 15,
                'p': 16, 'q': 17, 'r': 18,
                's': 19, 't': 20, 'u': 21,
                'v': 22, 'w': 23, 'x': 24,
                'y': 25, 'z': 26
            };

            let len = 4;
            let characters = 'abcdefghijklmnopqrstuvwxyz';
            let txt = '';

            for (let k = len; k > 0; k--) {
                txt += characters[Math.floor(Math.random() * characters.length)];
            };

            let X = [];
            let tempXArr = [];
            let i = 0;
            while (i < 4) {
                tempXArr.push(this.transformDict[txt[i]])
                i++;
                if (i % 2 === 0) {
                    X.push(tempXArr);
                    tempXArr = [];
                };
            }

            X = math.matrix(X);

            let A = [];
            let tempAArr = [];

            let j = 0;
            while (j < 4) {
                tempAArr.push(Math.floor(Math.random() * 9))
                j++;
                if (j % 2 === 0) {
                    A.push(tempAArr);
                    tempAArr = [];
                };
            }

            A = math.matrix(A);

            let x1 = math.multiply(A, X._data[0]);
            let x2 = math.multiply(A, X._data[1]);

            let B = [x1._data, x2._data];

            B = math.matrix(B);

            let A_inv = math.inv(A);

            return {
                A_inv: A_inv._data,
                B: B._data,
                answerText: txt
            };

        } catch (err) {
            return createCodingMatrix();
        }
    }
    createCodingMatrix();
}
