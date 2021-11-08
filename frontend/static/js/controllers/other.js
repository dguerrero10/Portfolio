var OnInit = class {

    constructor() {
        this.binary = '11100010 10000000 10010100 01001001 01110011 00100000 01110111 01101000 01100101 01110010 01100101 00100000 01110011 01110000 01100001 01100011 01100101 00100000 01100101 01101110 01100100 01110011 00100000 01100011 01100001 01101100 01101100 01100101 01100100 00100000 01100100 01100101 01100001 01110100 01101000 00100000 01101111 01110010 00100000 01101001 01101110 01100110 01101001 01101110 01101001 01110100 01111001 00111111';
        this.binaryRow = document.getElementById('binary');
        this.elementIds = ['nav', 'quote-row', 'binary-row'];
    }

    static delay(t) {return new Promise(resolve => setTimeout(resolve, t))};

    init() {
        // Declare variables for typeBinaryToScreen func
        // and set 'self' = 'this' to access class vars inside other function scopes 
        var i = 0;
        var speed = 20;
        var self = this;

        return new Promise((resolve) => {
            setInterval(() => {
                if (i < self.binary.length) {
                    self.binaryRow.innerHTML += self.binary.charAt(i);
                    i++;
                }
                else {
                    clearInterval();
                    resolve();
                }
            }, speed);
        }).then(() => {
            var token = localStorage.getItem('token');
            fetch(`http://localhost:3000/api/other/get-matrix/${encodeURIComponent(token)}`, {
                method: 'get',
                headers: { 'content-type': 'application/json' }
            }).then(response => response.json())
                .then(result => {
                    var BH = document.getElementById('black-hole');
                    var BH_Container = document.querySelector('.black-hole__container');
                    // Add a mouseover event listener to black-hole__container, but first check if it is not null
                    if (BH_Container) {
                        BH.addEventListener('mouseover', function handler(e) {
    
                            // Immediately remove the event listener so it doesn't run again on another mouseover event
                            e.currentTarget.removeEventListener(e.type, handler);
    
                            // On mouseover, change the body background color 
                            document.body.style.backgroundColor = '#000';
    
                            // Set "display: none;" for all the elements of interest
                            self.elementIds.forEach(el => {
                                document.getElementById(el).classList.add('hide');
                            });
    
                            // Scale the size of the black hole
                            BH.style.cssText = 'transform: scale(2.8);'
    
                            // After 6500 ms scale the BH_Container to zero and remove it from the DOM
                           OnInit.delay(6500).then(() => BH_Container.style.cssText = 'transform: scale(0);')
    
                            // After 7000 ms replace black-hole__container with matrix grid 
                            // And add navbar back
                            OnInit.delay(7000).then(() => {
                                BH_Container.remove();
                                document.getElementById('nav').classList.remove('hide');
                                var matrix = new Matrix(BH_Container, result.A_inv, result.B);
                                matrix.init();
                                matrix.submitBtn.addEventListener('click', matrix.submitAnswer);
                            });
                        });
                    }
                });
        });
    };
};

var Matrix = class {

    constructor(parentDiv, A_inv, B) {
        this.parentDiv = parentDiv;
        this.submitBtn = document.querySelector('.input__submit-btn');
        this.matrixGrid = document.querySelector('.matrix__grid');
        this.inputRow = document.querySelector('.input__row');
        this.A_indices = ['a11', 'a12', 'a21', 'a22'];
        this.B_indices = ['b1_1', 'b1_2', 'b2_1', 'b2_2'];
        this.A_inv = A_inv;
        this.B = B;
    }

    static delay(t) {return new Promise(resolve => setTimeout(resolve, t))};

    init() {
        
        this.parentDiv.replaceWith(this.matrixGrid);
        this.matrixGrid.style.display = 'grid';
        this.inputRow.style.display = 'flex';

        var i = 0;
        var j = 0;
        // Build the inverse matrix
        this.A_indices.forEach((element, index) => {
            document.getElementById(element).textContent = `${this.A_inv[i][j]}`;
            j++;
            if (index === 1) {
                i = 1;
                j = 0;
            }
        });

        var n = 0;
        var k = 0;
        // Build the transformed matrix
        this.B_indices.forEach((element, index) => {
            document.getElementById(element).textContent = `${this.B[n][k]}`;
            k++;
            if (index === 1) {
                n = 1;
                k = 0;
            }
        });
        console.log('Enter the letters.')
    }

    submitAnswer() {
       var token = localStorage.getItem('token');
       var answerText = document.getElementById('answerText');
       var matrixAnswerObj = { answerText : answerText.value, token: token };
       var matrixAnswerJSON = JSON.stringify(matrixAnswerObj);

       fetch('http://localhost:3000/api/other/matrix-answer', {
            method: 'post',
            body: matrixAnswerJSON,
            headers: {'content-type':'application/json'}
       }).then(response => response.json())
         .then(result => {
             console.log(result)
             if (result.success) {
                 var render = new Render(result.poem);
                 render.init()
             }
             if (!result.success) {
                answerText.classList.add('form__input--error');
                Matrix.delay(3000).then(() => answerText.classList.remove('form__input--error'));
             }
         })
       .catch(error => console.log(error))
    }
}

var Render = class extends Matrix {
    constructor(poem) {
        super();
        this.poem = poem;
        this.poemContainer = document.querySelector('.poem__container');
        this.poemWrapper = document.querySelector('.poem__wrapper');
    }

    static delay(t) {return new Promise(resolve => setTimeout(resolve, t))};

    init() {
        this.matrixGrid.replaceWith(this.poemContainer);
        this.inputRow.remove();
        document.getElementById('nav').classList.add('hide');
        this.poemContainer.style.display = 'flex';
        this.poemWrapper.insertAdjacentHTML('afterbegin', this.poem);
    
        Render.delay(3000).then(() => {

            var randomChars = [
                                '$', '%', '@', '*', '/', '&', '#', '0', '1', '2', 
                                '3', '4', '5', '6', '7', '8','9', 'a', 'b','c', 
                                'm', 'n', 'z', 'd', 'f', 'e', 'g', 'i', 'j', 'l'
                            ];
            var i = 0;
            var speed = 2800;

            return new Promise((resolve) => {
                setInterval(() => {
                    if (i < this.poemWrapper.children.length -1) {
                        var temp = randomChars.sort(() => Math.random() - 0.5)
                        this.poemWrapper.children[i].textContent = temp.join('');
                        i++;
                    }
                    else {
                        clearInterval();
                        resolve();
                        location.reload();
                    }
                }, speed);
            });
        });
    }
}

var init = new OnInit();
init.init();

