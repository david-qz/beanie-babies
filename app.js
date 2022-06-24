// import services and utilities
import { getBeanieBabies } from './services/beanie-babies-service.js';

// import component creators
import createFilter from './components/Filter.js';
import createPaging from './components/Paging.js';
import createList from './components/List.js';

// declare state variables
const state = {
    beanieBabies: [],
    nameQuery: '',
    astroSign: '',
    pageNumber: 0,
    pageSize: 10,
    totalPages: 0,
};

// write handler functions
async function handlePageLoad() {
    state.beanieBabies = await getBeanieBabies();
    display();
}

function handleFilter({ nameQuery, astroSign }) {
    // Modify search string and reload page
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('nameQuery', nameQuery);
    searchParams.set('astroSign', astroSign ?? '');

    window.location.search = searchParams.toString();
}

function handlePaging(pageChange, pageSize) {
    /* eslint-disable no-multi-spaces */
    if (pageChange === 'first')      state.pageNumber = 0;
    else if (pageChange === 'prev')  state.pageNumber -= 1;
    else if (pageChange === 'next')  state.pageNumber += 1;
    else if (pageChange === 'last')  state.pageNumber = state.totalPages;
    /* eslint-enable no-multi-spaces */

    // Make sure we haven't paged below 0
    state.pageNumber = Math.max(0, state.pageNumber);

    // If the page size has changed, go back to first page
    if (parseInt(pageSize) !== state.pageSize) {
        state.pageNumber = 0;
        state.pageSize = pageSize;
    }

    // Modify search string and reload page
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('pageNumber', state.pageNumber);
    searchParams.set('pageSize', state.pageSize);

    window.location.search = searchParams.toString();
}

// Create each component:
// - pass in the root element via querySelector
// - pass any needed handler functions as properties of an actions object
const Filter = createFilter(document.querySelector('#filter'), { handleFilter });
const Paging = createPaging(document.querySelector('#paging'), { handlePaging });
const List = createList(document.querySelector('#list'));

// Roll-up display function that renders (calls with state) each component
let firstRender = true;
function display() {
    if (firstRender) {
        document.querySelector('main').classList.remove('hidden');
        firstRender = false;
    }
    Filter({ nameQuery: state.nameQuery, astroSign: state.astroSign });
    Paging({ pageSize: state.pageSize, pageNumber: state.pageNumber, totalPages: state.totalPages });
    List({ beanieBabies: state.beanieBabies });
}

// Page load actions
handlePageLoad();
