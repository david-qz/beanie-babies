// import services and utilities
import { getBeanieBaby } from '/services/beanie-babies-service.js';

// import component creators
import createBeanieBabyName from '../components/BeanieBabyName.js';

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

// Roll-up display function that renders (calls with state) each component
function display() {
    Name({ name: beanieBaby.title });
}

// Page load actions
handlePageLoad();
