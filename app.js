// import services and utilities
import { getBeanieBabies, searchBeanieBabies } from './services/beanie-babies-service.js';

// import component creators
import createBeanieBabyList from './components/BeanieBabyList.js';
import createBeanieBabySearch from './components/BeanieBabySearch.js';

// Constants
const SEARCH_DEBOUNCE = 500; // Number of milliseconds to wait for no input
                             // before performing search query.

// declare state variables
let beanieBabies = [];
let filteredBabies = [];
let activeSearch = false;
let searchTimeout;

// write handler functions
async function handlePageLoad() {
    beanieBabies = await getBeanieBabies();
    filteredBabies = beanieBabies;
    display();
}

function handleSearch(query) {
    clearTimeout(searchTimeout);
    if (query) {
        activeSearch = true;
        searchTimeout = setTimeout(async() => {
            filteredBabies = await searchBeanieBabies(query);
            display();
        }, SEARCH_DEBOUNCE);
    } else {
        activeSearch = false;
        setTimeout(display, 10); // timeout so lag on full display doesn't affect user typing.
    }
}


// Create each component:
// - pass in the root element via querySelector
// - pass any needed handler functions as properties of an actions object
const beanieBabyList = createBeanieBabyList(document.querySelector('#beanie-baby-list'));
const beanieBabySearch = createBeanieBabySearch(document.querySelector('#search'), {
    handleSearch
});

// Roll-up display function that renders (calls with state) each component
let firstRender = true;
function display() {
    if (firstRender) {
        document.querySelector('main').classList.remove('hidden');
        firstRender = false;
    }
    beanieBabyList({ beanieBabies: activeSearch ? filteredBabies : beanieBabies });
    beanieBabySearch();
}

// Page load actions
handlePageLoad();
