function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time))
}

function tabHome() {
    OpenTab('home');

    var navLinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
    }
    navLinks[0 + 6].classList.add('active');
    navLinks[0].classList.add('active');
}

function tabAiRinri() {
    OpenTab('aiRinri');

    var navLinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
    }

    navLinks[1 + 6].classList.add('active');
    navLinks[1].classList.add('active');
}

function tabCodeRinri() {
    OpenTab('codeRinri');

    var navLinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
    }

    navLinks[2 + 6].classList.add('active');
    navLinks[2].classList.add('active');
}

function tabLifeRinri() {
    OpenTab('lifeRinri');

    var navLinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
    }

    navLinks[3 + 6].classList.add('active');
    navLinks[3].classList.add('active');
}

function tabAbout() {
    OpenTab('about');

    var navLinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove('active');
    }
    navLinks[4 + 6].classList.add('active');
    navLinks[4].classList.add('active');
}

document.querySelectorAll('.video-popup-button').forEach(button => {
    button.addEventListener('click', function () {
        const expandBtn = this.closest('.courseCard').querySelector('#toggleButton');

        var forceExpand = false

        var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        })

        if (expandBtn.textContent == 'Show more') {
            console.log(true)
            expandBtn.dispatchEvent(event)
            forceExpand = true
        }

        const youtubeLink = this.getAttribute('data-youtube-link');
        const modalTitle = this.closest('.courseCard').querySelector('.card-title').textContent;
        const modalText = this.closest('.courseCard').querySelector('.card-text').textContent;

        async function dispW() {
            await delay(1)

            // Update the modal title and body
            document.querySelector('#videoPopup .modal-title').textContent = modalTitle;
            document.querySelector('#videoPopup .modal-body').innerHTML = `
        <p class="fs-4 fw-bold text-primary">${modalText}</p>
        <div class="embed-responsive embed-responsive-16by9">
          <iframe src="${youtubeLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      `;

            // Show the modal
            new bootstrap.Modal(document.getElementById('videoPopup')).show();

            if (forceExpand) {
                expandBtn.dispatchEvent(event)
            }
        }

        dispW()

    });
});

const courseDescriptions = document.getElementsByClassName('courseDescription');
let isTruncated = [];
let fullTexts = [];
let truncatedTexts = [];

Array.from(courseDescriptions).forEach((description, index) => {
    const fullText = description.innerText;
    const truncatedText = fullText.slice(0, 70) + '...';
    isTruncated[index] = true;
    fullTexts[index] = fullText;
    truncatedTexts[index] = truncatedText;

    description.innerText = truncatedText;
});

function toggleText(event) {
    const index = Array.from(courseDescriptions).indexOf(event.target.previousElementSibling);
    // Toggle the text only if not in a popup
    if (isTruncated[index]) {
        courseDescriptions[index].innerText = fullTexts[index];
        event.target.innerText = 'Show less';
    } else {
        courseDescriptions[index].innerText = truncatedTexts[index];
        event.target.innerText = 'Show more';
    }
    isTruncated[index] = !isTruncated[index];
}

function mobileNavTab() {
    async function pressNav() {
        await delay(10)

        const expandBtn = document.getElementById('mobileNavTabBtn')

        var event = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
        })

        expandBtn.dispatchEvent(event)
    }

    pressNav()
}

Array.from(document.getElementsByClassName('mobileNavTab')).forEach((button) => {
    button.addEventListener('click', mobileNavTab);
});

Array.from(document.getElementsByClassName('toggleButton')).forEach((button) => {
    button.addEventListener('click', toggleText);
});

function searchCards() {
    const searchInput = document.querySelector('#searchInput'); // Assuming you have an input field with id="searchInput"
    const cards = document.querySelectorAll('.courseCard');
    const searchResultsContainer = document.querySelector('#searchResults'); // Assuming you have a container to display search results with id="searchResults"

    searchInput.addEventListener('keyup', function (event) {
        searchResultsContainer.classList.remove('d-none');

        const searchTerm = event.target.value.toLowerCase();
        const searchResults = [];

        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const subtitle = card.querySelector('.courseDescription').textContent.toLowerCase();

            if (title.includes(searchTerm) || subtitle.includes(searchTerm)) {
                searchResults.push({
                    title,
                    element: card
                });
            }
        });

        // Clear previous results
        searchResultsContainer.innerHTML = '';

        // Display new results
        searchResults.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.textContent = result.title;

            // Add Bootstrap classes
            resultElement.classList.add('border', 'btn-primary', 'btn', 'border-primary', 'rounded', 'p-3', 'm-3', 'text-center');

            resultElement.addEventListener('click', function () {
                result.element.querySelector('.video-popup-button').click(); // Assuming the button to open the popup has class="video-popup-button"
            });

            searchResultsContainer.appendChild(resultElement);
        });
    });

    // Hide the search results when the user clicks outside the search box
    document.addEventListener('click', function (event) {
        if (!searchInput.contains(event.target)) {
            searchResultsContainer.classList.add('d-none');
        }
    });
}

// Call the function to set up the search
searchCards();