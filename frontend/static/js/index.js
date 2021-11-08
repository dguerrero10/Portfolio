import ContactMe from './views/ContactMe.js';
import LandingPage from './views/LandingPage.js';
import Other from './views/Other.js';
import Projects from './views/Projects.js';
import Resume from './views/Resume.js';

function nodeScriptReplace(node) {
    if (nodeScriptIs(node) === true) {
        node.parentNode.replaceChild(nodeScriptClone(node), node);
    }
    else {
        var i = -1, children = node.childNodes;
        while (++i < children.length) {
            nodeScriptReplace(children[i]);
        }
    }

    return node;
}

function nodeScriptClone(node) {
    var script = document.createElement("script");
    script.text = node.innerHTML;

    var i = -1, attrs = node.attributes, attr;
    while (++i < attrs.length) {
        script.setAttribute((attr = attrs[i]).name, attr.value);
    }
    return script;
}

function nodeScriptIs(node) {
    return node.tagName === 'SCRIPT';
}

function navState(path) {
    const navPaths = {
        1: '/',
        2: '/projects',
        3: '/resume',
        4: '/contact-me',
        5: '/other'
    };
    for (let key in navPaths) {
        if (path === navPaths[key]) {
            document.getElementById(`nav_${key}`).classList.add('active');
        } else {
            document.getElementById(`nav_${key}`).classList.remove('active');
        };
    };
}

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
    navState(location.pathname);
}

const router = async () => {
    const routes = [
        { path: '/', view: LandingPage },
        { path: '/projects', view: Projects },
        { path: '/resume', view: Resume },
        { path: '/contact-me', view: ContactMe },
        { path: '/other', view: Other }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match) match = { route: routes[0], isMatch: true };

    const view = new match.route.view(match);

    document.querySelector("#app").innerHTML = await view.getHtml();
    nodeScriptReplace(document.getElementsByTagName("body")[0]);
};

window.addEventListener("popstate", router);

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
    router();
    navState(location.pathname);
    var token = localStorage.getItem('token');
    if (token === null) {
        fetch('http://localhost:3000/api/user-token', {
            method: 'get',
            headers: { 'content-type': 'application/json' }
        }).then(response => response.json())
          .then(result => {
             localStorage.setItem('token', result.token.token)
        });    
    }
});