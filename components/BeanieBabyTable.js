export default function createBeanieBabyTable(root) {
    const tbody = root.querySelector('tbody');

    return ({ beanieBaby }) => {
        tbody.innerHTML = '';

        for (const [k, v] of Object.entries(beanieBaby)) {
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
