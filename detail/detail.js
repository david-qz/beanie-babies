// import services and utilities
import { getBeanieBaby } from '/services/beanie-babies-service.js';

// import component creators
import createBeanieBabyName from '/components/BeanieBabyName.js';
import createBeanieBabyOverview from '/components/BeanieBabyOverview.js';
import createBeanieBabyTable from '/components/BeanieBabyTable.js';

// declare state variables
let beanieBaby;

// write handler functions
async function handlePageLoad() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) window.location = '/';

    beanieBaby = await getBeanieBaby(id);
    if (!beanieBaby) window.location = '/';

    display();
}

// Create each component:
// - pass in the root element via querySelector
// - pass any needed handler functions as properties of an actions object
const Name = createBeanieBabyName(document.querySelector('header h1'));
const Overview = createBeanieBabyOverview(document.querySelector('#details-overview'));
const Detail = createBeanieBabyTable(document.querySelector('#details-table'));

// Roll-up display function that renders (calls with state) each component
let firstRender = true;
function display() {
    if (firstRender) {
        document.querySelector('main').classList.remove('hidden');
        firstRender = false;
    }
    Name({ name: beanieBaby.title });
    Overview({ beanieBaby });
    Detail({ beanieBaby });
}

// Page load actions
handlePageLoad();
