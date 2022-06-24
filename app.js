// import services and utilities
import { getBeanieBabies } from './services/beanie-babies-service.js';

// import component creators
import createFilter from './components/Filter.js';
import createList from './components/List.js';

// declare state variables
const state = {
    beanieBabies: [],
    nameQuery: '',
    astroSign: '',
};

// write handler functions
async function handlePageLoad() {
    state.beanieBabies = await getBeanieBabies();
    display();
}

function handleFilter({ nameQuery, astroSign }) {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('nameQuery', nameQuery);
    searchParams.set('astroSign', astroSign ?? '');

    window.location.search = searchParams.toString();
}

// Create each component:
// - pass in the root element via querySelector
// - pass any needed handler functions as properties of an actions object
const Filter = createFilter(document.querySelector('#filter'), { handleFilter });
const List = createList(document.querySelector('#list'));

// Roll-up display function that renders (calls with state) each component
let firstRender = true;
function display() {
    if (firstRender) {
        document.querySelector('main').classList.remove('hidden');
        firstRender = false;
    }
    Filter({ nameQuery: state.nameQuery, astroSign: state.astroSign });
    List({ beanieBabies: state.beanieBabies });
}

// Page load actions
handlePageLoad();
