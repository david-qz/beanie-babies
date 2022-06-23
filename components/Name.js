export default function createBeanieBabyName(root) {

    return ({ name }) => {
        root.textContent = name;
        document.title = name;
    };
}
