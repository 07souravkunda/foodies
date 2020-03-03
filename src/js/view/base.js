export const elements = {
    searchArea : document.querySelector('.search'),
    searchField : document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList : document.querySelector('.results__list'),
    searchResPages : document.querySelector('.results__pages'),
    recipe : document.querySelector('.recipe'),
    list : document.querySelector('.shopping__list')
};

const elementString = {
    loader : 'loader'
}
export const renderLoader =parent => {
    const loader = `
        <div class="${elementString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></svg>
            </svg>
        </div>
    `
    parent.insertAdjacentHTML('afterbegin',loader);
} ;

export const clearLoader = () => {
    const loader=document.querySelector(`.${elementString.loader}`);
    if(loader)
    loader.parentElement.removeChild(loader);
}