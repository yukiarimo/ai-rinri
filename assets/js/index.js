function tabRelated() {
    OpenTab('related');

    var navLinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
    }
    navLinks[1].classList.add('active');
}

function tabHome() {
    OpenTab('home');

    var navLinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
    }
    navLinks[0].classList.add('active');
}

function tabAbout() {
    OpenTab('about');

    var navLinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
    }
    navLinks[2].classList.add('active');
}