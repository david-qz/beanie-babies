// import services and utilities
import { getBeanieBabies } from './services/beanie-babies-service.js';

// import component creators
import createBeanieBabyList from './components/BeanieBabyList.js';

// declare state variables
let beanieBabies = [];

// write handler functions
async function handlePageLoad() {
    beanieBabies = await getBeanieBabies();
    display();
}

// Create each component:
// - pass in the root element via querySelector
// - pass any needed handler functions as properties of an actions object
const beanieBabyList = createBeanieBabyList(document.querySelector('#beanie-baby-list'));

// Roll-up display function that renders (calls with state) each component
let firstRender = true;
function display() {
    if (firstRender) {
        document.querySelector('main').classList.remove('hidden');
        firstRender = false;
    }
    beanieBabyList({ beanieBabies });
}

// Page load actions
handlePageLoad();
