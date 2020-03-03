import {elements} from './base'

export const addShopingList = list => {
    list.forEach(el => {
        addList(el);
    })
};

export const clearList = () => {
    elements.list.innerHTML = '';
}

const addList = list => {
    const markup = `
        <li class="shopping__item" data-setid=${list.id}>
            <div class="shopping__count">
                <input class="input--value" type="number" value="${list.count}" step="0.1">
                <p>${list.unit}</p>
            </div>
            <p class="shopping__description">${list.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `
    elements.list.insertAdjacentHTML('beforeend',markup);
};

export const removeList =id => {
    const query = document.querySelector(`.shopping__item[data-setid=${id}]`);
    query.parentElement.removeChild(query);
}