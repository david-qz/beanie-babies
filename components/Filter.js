export default function createFilter(form, { handleFilter }) {
    const nameSearch = form.querySelector('input');
    const astroSignSelect = form.querySelector('select');

    form.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(form);
        const nameQuery = formData.get('name');
        const astroSign = formData.get('astroSign');

        handleFilter({ nameQuery, astroSign });
    });

    return ({ nameQuery, astroSign }) => {
        nameSearch.value = nameQuery;
        astroSignSelect.value = astroSign;
    };
}
