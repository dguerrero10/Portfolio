import AbstractView from './AbstractView.js';

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Resume")
    }

    async getHtml() {
        return `
        <div class="resume__grid--wrapper">
        <div class="resume__grid">
            <div class="resume__sidebar">
                <div class="resume__sidebar--col">
                    <h1 class="resume__header--lg">David Guerrero</h1>
                    <h3 class="resume__header--sm">Software Developer</h3>
                </div>
                <h4 class="resume__sidebar--section-catg">Personal Info</h4>
                <div class="resume__sidebar--col">
                    <p class="resume__sidebar--section-p">Phone</p>
                    <p class="resume__sidebar--section-p-sm">626-348-6225</p>
                </div>
                <div class="resume__sidebar--col">
                    <p class="resume__sidebar--section-p">Email</p>
                    <p class="resume__sidebar--section-p-sm">daveabdouguerrero@gmail.com</p>
                </div>
                <div class="resume__sidebar--col">
                    <img class="resume__sidebar--icon-img" src="./static/assets/images/linkedin.png" alt="">
                    <p class="resume__sidebar--section-p">LinkedIn</p>
                    <p class="resume__sidebar--section-p-sm">link</p>
                </div>
                <div class="resume__sidebar--col">
                    <img class="resume__sidebar--icon-img" src="./static/assets/images/github.png" alt="">
                    <p class="resume__sidebar--section-p">GitHub</p>
                    <p class="resume__sidebar--section-p-sm">link</p>
                </div>
                <h4 class="resume__sidebar--section-catg">Technical Skills</h4>
                <div class="resume__sidebar--col">
                    <p class="resume__sidebar--section-skills">Frontend Dev. using Angular 2+, React, pure JS, and CSS/SCSS
                    </p>
                    <p class="resume__sidebar--section-skills">Backend Dev. using Node.js, Express, Mongoose, MySQL,
                        Postgres</p>
                    <p class="resume__sidebar--section-skills">Data science using Python</p>
                    <p class="resume__sidebar--section-skills">Web scraping and automation using Python</p>
                    <p class="resume__sidebar--section-skills">Linux / Bash</p>
                    <p class="resume__sidebar--section-skills">Git</p>
                </div>
                <h4 class="resume__sidebar--section-catg">Soft Skills</h4>
                <div class="resume__sidebar--col">
                    <p class="resume__sidebar--section-skills">Strong communicator, both verbally and written</p>
                    <p class="resume__sidebar--section-skills">100% a team player</p>
                    <p class="resume__sidebar--section-skills">Adaptive, organized, able to learn quickly</p>
                    <p class="resume__sidebar--section-skills">Highly self-motivated</p>
                    <p class="resume__sidebar--section-skills">Creative and curious</p>
                    <p class="resume__sidebar--section-skills">Accountable</p>
                </div>
            </div>
            <div class="resume__body">
                <div class="resume__body--row">
                    <p class="resume__body--p">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui in quis
                        asperiores mollitia minima
                        tempora voluptate cupiditate accusantium. Ipsum suscipit amet iusto tempore corp</p>
                </div>
                <div class="resume__body--section-row">
                    <h4 class="resume__body--section-catg">Experience</h4>
                </div>
                <div class="resume__body-grid">
                    <div id="date-1" class="resume__body--date">
                        01-2020 - Present
                    </div>
                    <div id="date-2" class="resume__body--date">
                        01-2020 - Present
                    </div>
                    <div id="date-3" class="resume__body--date">
                        01-2020 - Present
                    </div>
                    <div id="exp-1" class="resume__body--section">
                        <h2 class="resume__body--title">
                            Lead Developer
                        </h2>
                        <h4 class="resume__body--title-sm">Bridg</h4>
                        <ul class="resume__body--list">
                            <li class="resume__body--list-item">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quaerat architecto optio ut impedit quisquam cupiditate dolorum nulla, ipsum rem aut?
                            </li>
                            <li class="resume__body--list-item">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quaerat architecto optio ut impedit quisquam cupiditate dolorum nulla, ipsum rem aut?
                            </li>
                            <li class="resume__body--list-item">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quaerat architecto optio ut impedit quisquam cupiditate dolorum nulla, ipsum rem aut?
                            </li>
                        </ul>
                    </div>
                    <div id="exp-2" class="resume__body--section">
                        <h2 class="resume__body--title">
                            Lead Developer
                        </h2>
                        <h4 class="resume__body--title-sm">Bridg</h4>
                        <ul class="resume__body--list">
                            <li class="resume__body--list-item">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quaerat architecto optio ut impedit quisquam cupiditate dolorum nulla, ipsum rem aut?
                            </li>
                            <li class="resume__body--list-item">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quaerat architecto optio ut impedit quisquam cupiditate dolorum nulla, ipsum rem aut?
                            </li>
                            <li class="resume__body--list-item">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quaerat architecto optio ut impedit quisquam cupiditate dolorum nulla, ipsum rem aut?
                            </li>
                        </ul>
                    </div>
                    <div id="exp-3" class="resume__body--section">
                        <h2 class="resume__body--title">
                            Lead Developer
                        </h2>
                        <h4 class="resume__body--title-sm">Bridg</h4>
                        <ul class="resume__body--list">
                            <li class="resume__body--list-item">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quaerat architecto optio ut impedit quisquam cupiditate dolorum nulla, ipsum rem aut?
                            </li>
                            <li class="resume__body--list-item">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quaerat architecto optio ut impedit quisquam cupiditate dolorum nulla, ipsum rem aut?
                            </li>
                            <li class="resume__body--list-item">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Quaerat architecto optio ut impedit quisquam cupiditate dolorum nulla, ipsum rem aut?
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    }
  
}