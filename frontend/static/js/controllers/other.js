var OnInit = class {

    constructor() {
        this.elementIds = ['nav', 'quote-row', '_terminal'];
    }

    static delay(t) { return new Promise(resolve => setTimeout(resolve, t)) };

    init() {
        var self = this;
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

    static delay(t) { return new Promise(resolve => setTimeout(resolve, t)) };

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
    }

    submitAnswer() {
        var token = localStorage.getItem('token');
        var answerText = document.getElementById('answerText');
        var matrixAnswerObj = { answerText: answerText.value, token: token };
        var matrixAnswerJSON = JSON.stringify(matrixAnswerObj);

        fetch('http://localhost:3000/api/other/matrix-answer', {
            method: 'post',
            body: matrixAnswerJSON,
            headers: { 'content-type': 'application/json' }
        }).then(response => response.json())
            .then(result => {
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

    static delay(t) { return new Promise(resolve => setTimeout(resolve, t)) };

    init() {
        this.matrixGrid.replaceWith(this.poemContainer);
        this.inputRow.remove();
        document.getElementById('nav').classList.add('hide');
        this.poemContainer.style.display = 'flex';
        this.poemWrapper.insertAdjacentHTML('afterbegin', this.poem);

        Render.delay(3000).then(() => {

            var randomChars = [
                '$', '%', '@', '*', '/', '&', '#', '0', '1', '2',
                '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c',
                'm', 'n', 'z', 'd', 'f', 'e', 'g', 'i', 'j', 'l'
            ];
            var i = 0;
            var speed = 2800;

            return new Promise((resolve) => {
                setInterval(() => {
                    if (i < this.poemWrapper.children.length - 1) {
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

var Terminal = class {
    constructor() {
        this.terminalContainer = document.querySelector('.terminal__container');
        this.terminal = document.querySelector('.terminal');
        this.currentCommandLineCount = 1;
        this.currentCommandLine = document.getElementById(`c-${this.currentCommandLineCount}`);
        this.currentInput = document.getElementById(`in-${this.currentCommandLineCount}`);
        this.terminalWrapper = document.querySelector('.terminal__wrapper');
        this.terminalClose = document.getElementById('terminal__close');
        this.terminalCommands = ['cd', 'cd..', 'sudo', 'pwd', 'ls', 'rm', 'rm -r', 'help', 'exit'];
    }

    terminalActions(command) {
        switch (command) {
            case '':
                this.createNewCommandLine();
            case 'help':
                 this.printAvailableCommands();
                 this.createNewCommandLine()
            case 'cd':
                console.log('cd')
                return;
            case 'ls':
                console.log('ls')
                return;
            case 'rm':
                console.log('rm')
                return;
            case 'rm -r':
                console.log('rm -r')
                return;
            case 'cd..':
                console.log('cd..')
                return;
            case 'exit':
                this.removeTerminalContainer();
            default:
                this.commandNotFound(command);
                this.createNewCommandLine();
                return;
        }
    }

    printAvailableCommands() {
        var p = document.createElement('p');
        p.classList.add('terminal__msg-output');
        p.textContent = 'Available commands: '
        this.terminalWrapper.append(p);

        this.terminalCommands.forEach(command => {
            var p = document.createElement('p');
            p.classList.add('terminal__msg-output');
            p.textContent = command;
            this.terminalWrapper.append(p);
        });

        return;
    }

    commandNotFound(command) {
        var p = document.createElement('p');
        p.classList.add('terminal__msg-output');
        p.textContent = `${command}: command not found`;

        var p2 = document.createElement('p');
        p2.classList.add('terminal__msg-output');
        p2.textContent = "Type 'help' for list of available commands.";

        this.terminalWrapper.append(p);
        this.terminalWrapper.append(p2);

        return;
    }

    createNewCommandLine() {
        // Clone current command line element
        var newCommandLine = this.currentCommandLine.cloneNode(true);

        // Get current input element
        var _currentInput = newCommandLine.querySelector(`#in-${this.currentCommandLineCount}`);

        // Increase command line count by 1, so that we can create new ids 
        this.currentCommandLineCount++;

        // Set new ids 
        newCommandLine.setAttribute('id', `c-${this.currentCommandLineCount}`);
        _currentInput.setAttribute('id', `in-${this.currentCommandLineCount}`);

        // Set old elements = to new elements
        this.currentInput = _currentInput;
        this.currentCommandLine = newCommandLine;

        // Append the new command line to the terminal wrapper
        this.terminalWrapper.appendChild(newCommandLine);

        // Remove old event handlers
        this.terminal.removeEventListener('click', this.clickHandler);
        this.terminal.removeEventListener('keypress', this.keyHandler);

        // Add new event handlers
        this.terminal.addEventListener('click', this.clickHandler.bind(this));
        this.currentCommandLine.addEventListener('keypress', this.keyHandler.bind(this));

        // Remove old element inputs
        document.getElementById(`in-${this.currentCommandLineCount - 1}`).remove();

        // Clear input value
        this.currentInput.value = '';

        // Focus new input
        this.currentInput.focus();

        return;
    }

    clickHandler = function () {
        this.currentInput.focus();
    }

    keyHandler = function (e) {
        if (e.key === 'Enter') {
            this.terminalActions(this.currentInput.value);
        }
    }

    removeTerminalContainer = function() {
        this.terminalContainer.remove();
    }

    init() {
        this.terminalClose.addEventListener('click', this.removeTerminalContainer.bind(this));
        this.currentInput.focus();
        this.terminal.addEventListener('click', this.clickHandler.bind(this));
        this.currentCommandLine.addEventListener('keypress', this.keyHandler.bind(this));
    }
}

var init = new OnInit();
init.init();

var terminal = new Terminal();
terminal.init();