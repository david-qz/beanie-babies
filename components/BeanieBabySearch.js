export default function createBeanieBabySearch(root, { handleSearch }) {
    const input = root.querySelector('input');

    input.addEventListener('input', () => {
        handleSearch(input.value);
    });

    return () => {};
}
