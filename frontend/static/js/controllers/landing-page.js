var OnInit = class {
    constructor(subGrid, gameBtn, answers, answer) {
        this.subGrid = subGrid;
        this.gameBtn = gameBtn;
        this.answers = answers;
        this.answer = answer;
      }
        init() {
           var skillContainers = document.querySelectorAll('.skill-container');
            skillContainers.forEach((element, index) => {
                element.addEventListener('mouseover', function a() {
                    element.classList.add('skill-container-grow');
                    skillContainers.forEach(element => {
                        if (element !== skillContainers[index]) {
                            element.classList.add('skill-container-shrink');
                        };
                    });
                });
                element.addEventListener('mouseleave', function  b() {
                    element.classList.remove('skill-container-grow');
                    skillContainers.forEach(element => element.classList.remove('skill-container-shrink'));
                });
            });
        }
    }

var Game = class extends OnInit {
    constructor() {
        super(subGrid, gameBtn, answers, answer)
        this.guessCounter = 0;
    }
   // Return all elements of certain class 
   static _getElementsByClass(elementClass) {
        return document.querySelectorAll(`.${elementClass}`);
    };
   // Return element by id 
   static _getElementById(elementId) {
        return document.getElementById(elementId);
    };
   // Remove element by id    
   static _removeElementById(elementId) {
        var el = document.getElementById(elementId);
        el.remove();
        return;
    };
   // Give an element a new class  
   static _changeElementClass(element, _className) {
        element.className = _className;
        return;
    };
    static _addNewClass(element, _className) {
        element.classList.add(_className);
        return;
    };
   // Change element styling   
   static _changeElementStyle(elements, styleObj, multiple) {
       if (multiple) {
            elements.forEach(element => {
                var css = '';
                for (var property in styleObj) {
                    css += `${property}:${styleObj[property]};`;
                };
                element.style.cssText = css;
            });
       }
       else {
            var css = '';
            for (var property in styleObj) {
                css += `${property}:${styleObj[property]};`;
            };
            elements.style.cssText = css;
       }
       return;
    };

    static _delay(duration) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), timeout);
        })
    }

    // Create element and append to parent node
    createElementAndAppend(elementParent, elementType,
                           content, multiple, _className,
                           attributeType, attributeName) 
      {
        _className = (_className === undefined) ? '' : _className;
        attributeName = (attributeName === undefined) ? '' : attributeName;
 
        //  If 'multiple' evaluates to true, then iterate over parent elements 
        // and create children elements and append them to parent
        if (multiple) {
            elementParent.forEach((element, index) => {
                var el = document.createElement(elementType);
                el.textContent = content[index];
                if (attributeName !== '') {
                    el.setAttribute(attributeType, attributeName);
                };
                if (_className !== '') {
                    Game._addNewClass(el, _className);
                };
                element.appendChild(el);
            });
        }
        // If 'multiple' evaluates to false, then do the same thing, except with no iterating
        else {
            var el = document.createElement(elementType);
            el.textContent = content[0];
            if (attributeName !== '') {
                el.setAttribute(attributeType, attributeName);
            };
            if (_className !== '') {
                Game._addNewClass(el, _className);
            };
            elementParent.appendChild(el);
        };
    };

    // Perform actions based on user guess
    gradeAnswer(guess, skillDivs, index) {

        this.guessCounter++;
        var guessEl = skillDivs[index];
        if (guess !== this.answer) {
            Game._addNewClass(guessEl, 'wrong-answer');
            guessEl.textContent = '';
            setTimeout(() => {
                guessEl.remove();
            }, 1000);
        };

        var feedback = Game._getElementById('question-id');

        // If answer is correct, remove all elements that are not the answer
        // and convert grid to 1fr to center answer
        if (guess === this.answer) {            
            skillDivs.forEach((element) => {
                if (element.textContent !== this.answer) {
                    element.remove();
                };
            });

            // Transform grid styling to center container 
            Game._changeElementStyle(this.subGrid, {
                'grid-template-columns': '1fr', 'margin-left': '0'},
                false);
        
            // Based on how many guesses the user took, display the answer with appropriate message
            switch(this.guessCounter) {
                case 1:
                    feedback.textContent = 'Nice, you know your stuff!';
                    break;
                case 2:
                    feedback.textContent = '2 tries. Not bad!';
                    break;
                case 3:
                    feedback.textContent = '3 tries. Maybe next time ;)'
                    break;
                default:
                    break;
            }
            setTimeout(() => {
                Game._addNewClass(guessEl, 'correct-answer');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }, 100);
        };

        // If the user did not get the right answer and has guessed 3 times, end the game
        if (guess !== this.answer && this.guessCounter === 3) {
            setTimeout(() => {
                feedback.textContent = 'The answer was :';
                Game._changeElementStyle(this.subGrid, {
                    'grid-template-columns': '1fr', 'margin-left': '0'}, false);
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }, 1200);
           
        };
    };
};

var subGrid = document.getElementById('grid-col');
var gameBtn = document.getElementById('game-btn');
var answers = ['Ubuntu', 'Arch', 'Mint', 'Kali'];
var answer = this.answers[0];

var init = new OnInit(subGrid, gameBtn, answers, answer);
init.init();
this.init.gameBtn.addEventListener('click', playGame);

var game = new Game();

function playGame() {
    // Make the grid columns smaller
    Game._changeElementStyle(game.subGrid, { 'grid-template-columns': '200px 200px', 'margin-left': '0'}, false);
    
    //  Remove initial container with text
    Game._removeElementById('init-container');

    // Transform grid layout to 'game mode' layout
    var gridToFlex = Game._getElementById('grid-to-flex');
    Game._changeElementClass(gridToFlex, 'game-mode-layout');

    // Transform 'skill-containers' to make them smaller and have flex layout
    var skillDivs = Game._getElementsByClass('skill-container');
    Game._changeElementStyle(skillDivs, 
        {
            'cursor': 'pointer',
            'width': '200px', 
            'height': '200px', 
            'display': 'flex', 
            'justify-content': 'center', 
            'align-items': 'center'
        }, true);
    
    skillDivs.forEach((element, index) => {
        element.addEventListener('click', function c() {
            game.gradeAnswer(element.textContent, skillDivs, index)
        });
    });
    
   setTimeout(() => {
       // Create answer elements and append them to parents 'skillDivs'   
       game.createElementAndAppend(skillDivs, 'p', game.answers, true, 'answer');
       // Create question and append to parent 'gridToFlex'    
       game.createElementAndAppend(gridToFlex, 'h3', ['What Linux Distro has the most users?'], 
                                          false, 'question', 'id', 'question-id');
   }, 1000);
};



