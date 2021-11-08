import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Contact Me")
    }

    async getHtml() {
        return `
            <div class="contact-me__grid">
                <div class="contact-me__poll-container">
                    <h1 id="msgHeader" class="contact-me__header">Are you enjoying my website?</h1>
                    <p id="msgPara" class="contact-me__para">Submit feedback!</p>
                    <div id="msgFeedback" class="poll-panel__container">
                        <div class="poll-panel">
                            <p class="poll-answer">No. You're not that guy, pal.</p>
                        </div>
                        <div class="poll-panel">
                            <p class="poll-answer">It's whatever.</p>
                        </div>
                        <div class="poll-panel">
                            <p class="poll-answer">It's pretty cool.</p>
                        </div>
                        <div class="poll-panel">
                            <p class="poll-answer">It's awesome!</p>
                        </div>
                    </div>
                </div>
               <div class="divider-line"></div>
                <div class="contact-me__form-container">
                    <h1 class="contact-me__header">Send me a message.</h1>
                    <p class="contact-me__para">I'm currently looking for work ;)</p>
                    <div class="contact-me__form-wrapper">
                        <form id="contact-form" class="form">
                            <div class="form__field">
                                <label for="name" class="form__label">Name</label>
                                <input type="text" class="form__input" name="name" 
                                       placeholder="Enter your name" id="name">
                                <span id="name__error--msg" class="form__error"></span>
                            </div>
                            <div class="form__field">
                                <label for="email" class="form__label">Email</label>
                                <input type="text" class="form__input" name="email" 
                                    placeholder="Enter your email" id="email">
                                <span id="email__error--msg" class="form__error"></span>
                            </div>
                            <div class="form__field">
                                <label for="message" class="form__label">Message</label>
                                <textarea class="form__input form__textarea" name="message" id="message"
                                 placeholder="Send me a nice or mean message..."></textarea>
                                 <span id="message__error--msg" class="form__error"></span>
                            </div>
                            <div class="form__row">
                                <button type="submit" class="form__btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="snackbar"></div>
            <div id="snackbar-error"></div>
            <script src="/static/js/controllers/contact-me.js"></script>
        `;
    }
}