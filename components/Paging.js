export default function createPaging(root, { handlePaging }) {
    const pageSizeSelect = root.querySelector('select');
    const pageLocationSpan = root.querySelector('span');
    const [firstButton, prevButton, nextButton, lastButton] = root.querySelectorAll('button');

    pageSizeSelect.addEventListener('change', () => {
        handlePaging(null, pageSizeSelect.value);
    });

    firstButton.addEventListener('click', () => {
        handlePaging('first', pageSizeSelect.value);
    });

    prevButton.addEventListener('click', () => {
        handlePaging('prev', pageSizeSelect.value);
    });

    nextButton.addEventListener('click', () => {
        handlePaging('next', pageSizeSelect.value);
    });

    lastButton.addEventListener('click', () => {
        handlePaging('last', pageSizeSelect.value);
    });

    return ({ pageSize, pageNumber, totalPages }) => {
        pageSizeSelect.value = pageSize;
        pageLocationSpan.textContent = `Page ${pageNumber + 1} of ${totalPages}`;

        firstButton.disabled = pageNumber <= 0;
        prevButton.disabled = pageNumber <= 0;
        nextButton.disabled = pageNumber >= totalPages - 1;
        lastButton.disabled = pageNumber >= totalPages - 1;
    };
}
