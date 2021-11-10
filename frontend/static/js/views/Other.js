import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Other")
    }

    async getHtml() {
        return `
        <div class="black-hole__container">
            <div id="quote-row" class="row">
                <p class="quote">"There are more things in heaven and earth, Horatio, than are dreamt of in your philosophy.” - Hamlet</p>
            </div>
            <div class="outer-ring">
            <div class="second-ring">
                    <div class="black-hole-wrapper">
                        <div id="black-hole"></div>
                    </div>
                </div>
            </div>
            <div id="_terminal" class="terminal__container">
                <div class="terminal">
                    <div class="terminal__bar">
                        <span id="terminal__close"></span>
                        <p class="terminal__user">root@Machine: ~</p>
                    </div>
                    <div class="terminal__wrapper">
                        <div id="c-1" class="terminal__start">
                            <span class="terminal__root">root@Machine</span>
                            <span class="terminal__tilde">~</span> 
                            <span class="terminal__dollar-sign">$<input id="in-1" class="terminal__command" type="text"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="matrix__grid">
            <div class="matrix__Ainv">
                <span class="matrix__inverse--notation">-1</span>
                <div id="Ainv__row--1" class="matrix__row">
                    <p id="a11" class="number"></p>
                    <p id="a12" class="number"></p>
                </div>
                <div id="Ainv__row--2" class="matrix__row">
                    <p id="a21" class="number"></p>
                    <p id="a22" class="number"></p>
                </div>
            </div>
            <div class="matrix__B">
                <div id="B__col--1" class="matrix__col">
                    <p id="b1_1" class="number"></p>
                    <p id="b1_2" class="number"></p>
                </div>
                <div id="B__col--2" class="matrix__col">
                    <p id="b2_1" class="number"></p>
                    <p id="b2_2" class="number"></p>
                </div>
            </div>
        </div>
        <div class="input__row">
            <div class="input__field">
                <input class="form__input" name="answerText" type="text" id="answerText">
                <button class="input__submit-btn">Enter</button> 
            </div>
        </div>
        <div class="poem__container">
            <div class="poem__wrapper"></div>
        </div>
        <script src="/static/js/controllers/other.js"></script>
        `;
    }
  
}
