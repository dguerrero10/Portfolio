var pollPanels = document.querySelectorAll('.poll-panel');
var contactForm = document.getElementById('contact-form');

var nameValidator = document.getElementById('name');
var emailValidator = document.getElementById('email');
var messageValidator = document.getElementById('message');

var nameErrorMsg = document.getElementById('name__error--msg');
var emailErrorMsg = document.getElementById('email__error--msg');
var messageErrorMsg = document.getElementById('message__error--msg');

var snackbarError = document.getElementById('snackbar-error');
var snackbar = document.getElementById('snackbar');

pollPanels.forEach((element, index) => {
    element.addEventListener('click', function a() {
        submitFeedback(index, element.textContent.trim());
    });
});

contactForm.addEventListener('submit', function b(e) {
    e.preventDefault();
    submitForm(this);
});

function delay(t) {return new Promise(resolve => setTimeout(resolve, t))};

function validateForm() {
    var isValid = true;
    var re = /\S+@\S+\.\S+/;

    if (contactForm.name.value === '') {
        nameValidator.classList.add('form__input--error');
        nameErrorMsg.textContent = 'Please supply your name.'

        delay(2000).then(() => {
            nameValidator.classList.remove('form__input--error')
            nameErrorMsg.textContent = '';
        });
        
        isValid = false;
    }

    if (contactForm.email.value === '' || !re.test(contactForm.email.value)) {
        emailValidator.classList.add('form__input--error');
        emailErrorMsg.textContent = 'Please supply a valid email.'

        delay(2000).then(() => {
            emailValidator.classList.remove('form__input--error');
            emailErrorMsg.textContent = '';
        });

        isValid = false;
    }

    if (contactForm.message.value === '') {
        messageValidator.classList.add('form__input--error');
        messageErrorMsg.textContent = 'Please supply a message.'

        delay(2000).then(() => {
            messageValidator.classList.remove('form__input--error');
            messageErrorMsg.textContent = '';
        });

        isValid = false;
    }

    return isValid;
}

function submitFeedback(feedbackIndex, feedbackContent) {
    var token = localStorage.getItem('token');
    var feedbackObj = {
        feedbackIndex: feedbackIndex,
        feedbackContent: feedbackContent,
        token: token
    };
    var feedbackJSON = JSON.stringify(feedbackObj);
    fetch('http://localhost:3000/api/contact-me/submit-feedback', {
        method: 'post',
        body: feedbackJSON,
        headers: { 'content-type': 'application/json' }
      })
        .then(response => response.json())
        .then(result => {
            if (result.success) {

                var node = document.createElement('h1');
                node.id = 'feedback-majority';
                var textNode = document.createTextNode(`${result.feedbackMajority}%`);
                node.appendChild(textNode);

                pollPanels.forEach(element => element.remove());
                document.getElementById('msgHeader').textContent = 'Thanks for the feedback!';
                document.getElementById('msgPara').textContent = '% of others who agree with you:';
                document.getElementById('msgFeedback').appendChild(node);
            }
            if (!result.success) {
                snackbarError.textContent = `${result.message}`
                snackbarError.className = "show";
                delay(2000).then(() => {snackbarError.className = snackbarError.className.replace("show", "")});
            }

        }).catch(err => {
            console.log(err.json())
        });
};

function submitForm(form) {
    if (validateForm() === false) {
        return;
    }
    var token = localStorage.getItem('token');
    var formData = { name: '', email: '', message: '', token: token };
    
    for (var pair of new FormData(form)) {
        formData[pair[0]] = pair[1];
    }

    var formDataJSON = JSON.stringify(formData);

    fetch('http://localhost:3000/api/contact-me/submit-message', {
        method: 'post',
        body: formDataJSON,
        headers: { 'content-type': 'application/json' }
    })
     .then(response => response.json())
     .then(result => {
        if (result.success) {
            snackbar.textContent = `${result.message}`
            snackbar.className = "show";
            delay(2000).then(() => {snackbarError.className = snackbarError.className.replace("show", "")});
            contactForm.reset();
        }
        if (!result.success) {
            snackbarError.textContent = `${result.message}`
            snackbarError.className = "show";
            delay(2000).then(() => {snackbarError.className = snackbarError.className.replace("show", "")});
        }

     }).catch(error => {
         console.log(error)
     })
}