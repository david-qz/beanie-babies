export default function createBeanieBabyOverview(root) {

    return ({ beanieBaby }) => {
        root.innerHTML = '';

        const img = document.createElement('img');
        img.src = beanieBaby.image;

        const p = document.createElement('p');
        p.textContent = beanieBaby.title;

        const a = document.createElement('a');
        a.textContent = 'beaniepedia⧉';
        a.href = beanieBaby.link;

        root.append(img, p, a);
    };
}
