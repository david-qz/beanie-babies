import { camelToTitleWithSpaces } from '/utils.js';

export default function createTable(root) {
    const tbody = root.querySelector('tbody');

    return ({ beanieBaby }) => {
        tbody.innerHTML = '';

        for (let [k, v] of Object.entries(beanieBaby)) {
            if (k === 'id' || k === 'link' || k === 'image') {
                continue;
            }

            k = camelToTitleWithSpaces(k);

            tbody.append(createTableRow(k, v));
        }
    };
}

function createTableRow(k, v) {
    const tr = document.createElement('tr');

    const th = document.createElement('th');
    th.textContent = k;

    const td = document.createElement('td');
    td.textContent = v;

    tr.append(th, td);
    return tr;
}
