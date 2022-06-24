// import services and utilities
import { getBeanieBaby } from '/services/beanie-babies-service.js';

// import component creators
import createName from '/components/Name.js';
import createOverview from '/components/Overview.js';
import createTable from '/components/Table.js';

// declare state variables
let beanieBaby;

// write handler functions
async function handlePageLoad() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) window.location = '/';

    const response = await getBeanieBaby(id);
    beanieBaby = response.data;
    if (!beanieBaby) window.location = '/';

    display();
}

// Create each component:
// - pass in the root element via querySelector
// - pass any needed handler functions as properties of an actions object
const Name = createName(document.querySelector('header h1'));
const Overview = createOverview(document.querySelector('#overview'));
const Table = createTable(document.querySelector('#table'));

// Roll-up display function that renders (calls with state) each component
let firstRender = true;
function display() {
    if (firstRender) {
        document.querySelector('main').classList.remove('hidden');
        firstRender = false;
    }
    Name({ name: beanieBaby.title });
    Overview({ beanieBaby });
    Table({ beanieBaby });
}

// Page load actions
handlePageLoad();
