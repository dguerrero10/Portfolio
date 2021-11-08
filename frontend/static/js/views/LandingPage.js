import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Hello")
    }

    async getHtml() {
        return `
            <div id="grid-to-flex" class="landing-page__grid">
                <div id="init-container" class="text-container">
                    <h1 class="landing-page__header">Hello, I'm Dave.</h1>
                    <p class="landing-page__para">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <div class="row-center">
                        <button id="game-btn">Play a game</button>
                    </div>
                </div>

                <div id="grid-col" class="landing-page__sub-grid">
                    <div id="skill-container-1" class="skill-container"></div>
                    <div id="skill-container-2" class="skill-container"></div>
                    <div id="skill-container-3" class="skill-container"></div>
                    <div id="skill-container-4" class="skill-container"></div>
                </div>
            </div>

            <script src="/static/js/controllers/landing-page.js"></script>
        `;
    }
  
}