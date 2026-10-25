//  _____                                                 _____
// ( ___ )-----------------------------------------------( ___ )
//  |   |              >>================<<               |   |
//  |   |              ||   DO NOT USE   ||               |   |
//  |   |              >>================<<               |   |
//  |   |  ╔───────────────────────────────────────────╗  |   |
//  |   |  │    This script is specifically crafted    │  |   |
//  |   |  │        for the MajiLyde.art site.         │  |   |
//  |___|  ╚───────────────────────────────────────────╝  |___|
// (_____)-----------------------------------------------(_____) 
//

const smolSubpageTitleSelector = ".majilyde-smol-subpage-tag-title";

const path = window.location.pathname;
const pathSegments = path.split("/");

const tagDictionary = {
    'YourMagicChapters': "MajiLyde--Your-Magic",
    'Art': "MajiLyde--Art",
    'Illustration': "MajiLyde--Illustration",
    'Sketch': "MajiLyde--Sketch",
    'MajiLydeLab': "MajiLydeLab",
    'ENTrITIES': "ENTrITIES",
    'ChickenGame': "Chicken-Game",
    'CozyVampireSimulator': "Cozy-Vampire-Simulator"
}
const YourMagicChapterPathIdentifier = "your-magic-chapter"

const isYourMagicPage = path.includes(tagDictionary['YourMagicChapters']);
    const isYourMagicChapterPage = path.includes(YourMagicChapterPathIdentifier);
    const isChronologicallyOrdered = path.includes("chrono");

const isArtPage = path.includes(tagDictionary['Art']);
    const isSketchPage = path.includes(tagDictionary['Sketch']);
    const isIllustrationPage = path.includes(tagDictionary['Illustration']);

const isMajiLydeLabPage = path.includes(tagDictionary['MajiLydeLab']);
    const isENTrITIESPage = path.includes(tagDictionary['ENTrITIES']);
    const isCozyVampireSimulator = path.includes(tagDictionary['CozyVampireSimulator']);
    const isChickenGamePage = path.includes(tagDictionary['ChickenGame']);

const allChaptersURL = "/tagged/MajiLyde--Your-Magic";


function formatSmolSupbageTitle(){
    document.querySelectorAll(smolSubpageTitleSelector).forEach(function(el) {
        el.textContent = el.textContent.replace(/--/g, ' :: ').replace(/-/g, ' ').replace(/ :: /g, ' - ');
    });
}

function setUpHeaderButtons() {
    const returnButton = document.getElementById('majiLydePageReturn');
    if (returnButton){
        if (isSketchPage || isIllustrationPage){
            returnButton.href = `/tagged/${tagDictionary['Art']}`;
        }
        if (isENTrITIESPage || isCozyVampireSimulator || isChickenGamePage){
            returnButton.href = `/tagged/${tagDictionary['MajiLydeLab']}`;
        }
    }
    
    const YourMagicNavigation = document.getElementById('majiLydeYourmagicNavigation');
    const YourMagicNavigationPhone = document.getElementById('majiLydeYourmagicNavigationPhone');
    const ArtNavigation = document.getElementById('majiLydeArtNavigation');
    const ArtNavigationPhone = document.getElementById('majiLydeArtNavigationPhone');
    const MajiLydeLabNavigation =  document.getElementById('majiLydeGameDevNavigation');
    const MajiLydeLabNavigationPhone =  document.getElementById('majiLydeGameDevNavigationPhone');

    if(isYourMagicPage && YourMagicNavigation && YourMagicNavigationPhone){
        YourMagicNavigation.classList.remove('majilyde-thingie-hidden');
        YourMagicNavigationPhone.classList.remove('majilyde-thingie-hidden');
        const chronoButton = document.getElementById('sortByChrono');
        const notChronoButton = document.getElementById('dontSortByChrono');
        if(isChronologicallyOrdered){
            chronoButton.classList.add('majilyde-highlighted-text');
        } else {
            notChronoButton.classList.add('majilyde-highlighted-text');
        }
    }

    if (isArtPage && ArtNavigation && ArtNavigationPhone){
        ArtNavigation.classList.remove('majilyde-thingie-hidden');
        ArtNavigationPhone.classList.remove('majilyde-thingie-hidden');
    }

    if (isMajiLydeLabPage && MajiLydeLabNavigation && MajiLydeLabNavigationPhone){
        MajiLydeLabNavigation.classList.remove('majilyde-thingie-hidden');
        MajiLydeLabNavigationPhone.classList.remove('majilyde-thingie-hidden');
    }
}

function formatChapterElement() {
    document.querySelectorAll('.post-content').forEach(function(post) {
        const titleEl = post.querySelector('.title');
        const postBody = post.querySelector('.body-text');
        const pEls = [...postBody.querySelectorAll('p')];
        const readOnSiteEl = pEls.find(p => p.textContent.trim().startsWith('Read on our site'));
        const twEl = pEls.find(p => p.textContent.trim().startsWith('TW:'));
        const thumbnail = post.querySelector('.npf_row');
        const readMoreContainer = post.querySelector('.read_more_container');
        const readMore = readMoreContainer.querySelector('.read_more');

        if (!titleEl || !thumbnail || !readMoreContainer || !readOnSiteEl || !readMore) return;

        titleEl.classList.add("majilyde-thingie-hidden");

        const chapterTitle = document.createElement('p');
        chapterTitle.className = 'chapter-title';
        chapterTitle.textContent = titleEl.textContent;
        
        readMore.textContent = 'Read →';

        const chapterPostBody = document.createElement('div');
        chapterPostBody.classList.add("your-magic-chapter-post-body");
        chapterPostBody.append(thumbnail, chapterTitle, readMore);
        
        post.innerHTML = '';

        post.append(chapterPostBody);

        if (twEl){
            twEl.classList.add("trigger-warning");
            post.append(twEl);
        }
    });
}

function setUpYourMagicChapterPage(){
    const header = document.querySelector('.header-wrapper');
    if (header) header.classList.add('majilyde-thingie-hidden');
    const customNavbar = document.querySelector('.nav-custom-wrapper');
    if (customNavbar) customNavbar.classList.add('majilyde-thingie-hidden');

    const pageHeader = document.getElementById('yourMagicChapterHeader');
    if(pageHeader){
        pageHeader.classList.remove('majilyde-thingie-hidden');
    }

    const chapterNavigation = document.getElementById('majilydeChapterNavigation');
    if(chapterNavigation){
        chapterNavigation.classList.remove('majilyde-thingie-hidden');
    }

    const previous = document.getElementById('previousChapter');
    const allChapters = document.getElementById('allChapters');
    const next = document.getElementById('nextChapter');

    const post = document.querySelector('.majilyde-post.majilyde_your_magic');
    const postBody = post.querySelector('.body-text');
    const aEls = [...postBody.querySelectorAll('a')];

    const prevChaptEl = aEls.find(p => p.textContent.trim().includes('Previous Chapter'));
    const nextChaptEl = aEls.find(p => p.textContent.trim().includes('Next Chapter'));

    if (prevChaptEl) {
        const previousURL = prevChaptEl.href;

        previous.text = "←";
        previous.href = previousURL;
    } else {
        previous.classList.add('majilyde-thingie-hidden');
        allChapters.classList.remove('majilyde-thingie-hidden');
    }

    if (nextChaptEl) {
        const nextURL = nextChaptEl.href;

        next.text = "→";
        next.href = nextURL;
    } else {
        next.classList.add('majilyde-thingie-hidden');
        allChapters.classList.remove('majilyde-thingie-hidden');
    }
}

function hideLoadScreen(){
    const loadScreen = document.getElementById('loading-screen');
    if (loadScreen) loadScreen.classList.add('majilyde-thingie-hidden');
}

function init() {
    console.log("Hi 🐈‍⬛");

    formatSmolSupbageTitle();
    setUpHeaderButtons();

    if(isYourMagicPage){
        formatChapterElement();
    }
    if(isYourMagicChapterPage){
        setUpYourMagicChapterPage();
    }

    hideLoadScreen();
}

document.addEventListener('DOMContentLoaded', init);