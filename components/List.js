export default function createList(root) {

    return ({ beanieBabies }) => {
        root.innerHTML = '';

        for (const beanieBaby of beanieBabies) {
            const element = createBeanieBabyCard({ beanieBaby });
            root.append(element);
        }
    };
}

function createBeanieBabyCard({ beanieBaby }) {
    const li = document.createElement('li');
    li.classList.add('beanie-baby-card');
    li.classList.add('panel');

    const a = document.createElement('a');
    const params = new URLSearchParams();
    params.set('id', beanieBaby.id);
    a.href = `detail/?${params.toString()}`;

    const img = document.createElement('img');
    img.src = beanieBaby.image;
    img.alt = beanieBaby.title;

    const p = document.createElement('p');
    p.textContent = beanieBaby.title;

    li.append(img, p);
    a.append(li);

    return a;
}
