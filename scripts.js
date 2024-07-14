// the section number
const sectNum = document.querySelector('.sect-num');

// the scroll prompt
const scrollPrompt = document.querySelector('.scroll-prompt');

// the nav
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('.seclink');

// page indicators
const pageIndicators = document.querySelectorAll('.page-indicator');
const pageIndicatorsCluster = document.querySelector('.page-indicators');

// placeholders
const placeholders = document.querySelectorAll('.placeholder');

// vertical sections
const sections = document.querySelectorAll('section');
const getCurrentSection = (pos) => {
    let currentSect = sections[0];
    const triggerPoint = window.innerHeight / 2;
    sections.forEach((section) => {
        if (section.offsetTop <= pos + triggerPoint) {
            currentSect = section;
        }
    });
    return currentSect;
}

// project panel -> details transition
const projectPanel = document.getElementById('works-panel');
// const projectContent = document.getElementById('works-content');
const projectTitle = document.getElementById('project-title');
const projectHeadline = document.getElementById('project-headline');
const thumbnails = document.querySelectorAll('.thumbnail');
const backButton = document.getElementById('project-back-button');

thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', (ev) => {
        projectPanel.classList.add('flipped');
        history.pushState(null, null, `#${thumbnail.id}`);
    });
});

backButton.addEventListener('click', (ev) => {
    projectPanel.classList.remove('flipped');
    history.pushState(null, null, '#');
});

// support for pressing back in the browser
window.addEventListener('popstate', (ev) => {
    projectPanel.classList.remove('flipped');
});

// change project title shown when thumbnail is hovered
// and change back when not hovered
thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('mouseover', (ev) => {
        projectTitle.innerHTML = `Project ${thumbnail.id}`;
        projectHeadline.classList.remove('hidden');
    });
    thumbnail.addEventListener('mouseout', (ev) => {
        projectHeadline.classList.add('hidden');
    });
});


// global var for current section
let currSect = 0;

const onScroll = (ev) => {
    currSect = getCurrentSection(window.scrollY);
    sectNum.innerHTML = "#0"+currSect.dataset.secid;
    if (currSect.dataset.secid == 0) {
        sectNum.classList.add('hidden');
        nav.classList.add('hidden');
        pageIndicatorsCluster.classList.add('hidden');
        setTimeout(() => scrollPrompt.classList.remove('hidden'), 5000);
    }else{
        sectNum.classList.remove('hidden');
        nav.classList.remove('hidden');
        // scrollPrompt.classList.add('hidden');
        pageIndicatorsCluster.classList.remove('hidden');
    }
}

const highlightNavLink = (idx) => {
    if (idx < 0) return;
    navLinks.forEach((navLink) => {
        navLink.classList.remove('active');
    });
    if (navLinks[idx - 1]) navLinks[idx - 1].classList.add('active');
}

const changePageIndicator = (idx) => {
    if (idx < 0) return;
    pageIndicators.forEach((pageIndicator) => {
        pageIndicator.classList.remove('active');
    });
    if (pageIndicators[idx - 1]) pageIndicators[idx - 1].classList.add('active');
}

const onLoaded = (ev) => {
    // console.log('loaded');
    setTimeout(() => scrollPrompt.classList.remove('hidden'), 1000);
}

// scroll to vertical section when nav link is clicked
navLinks.forEach((navLink) => {
    navLink.addEventListener(('click'), (ev) => {
        const target = navLink.getAttribute('href');
        if (!target.startsWith('#')) return;

        const targetSection = document.querySelector(target);
        ev.preventDefault();
        window.scroll({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});

// debouncer
const debounce = (func, delay = 50) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {func.apply(null, args);}, delay);
    };
};

// listeners
window.addEventListener('scroll', debounce(() => onScroll(), 25));
window.addEventListener('scroll', debounce(() => highlightNavLink(currSect.dataset.secid)));
window.addEventListener('scroll', debounce(() => changePageIndicator(currSect.dataset.secid)));
window.addEventListener('load', onLoaded);

// placeholders.forEach((placeholder) => {
//     placeholder.addEventListener('click', (ev) => {
//         console.log(ev.target);
//     });
// });