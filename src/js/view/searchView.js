import {elements} from './base';

export const searchValue = () => elements.searchField.value;

export const clearField = () => {
    elements.searchField.value ='';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}

const limitResTitle = (title,limit = 17) => {
    if(title.length > limit){
        const newTitle = [];
        const titleArr = title.split(' ');
        titleArr.reduce((acc,cur) => {
            if((acc + cur.length) <= limit)
                newTitle.push(cur);
            return acc+cur.length;
        },0); 
        return `${newTitle.join(' ')}...`
    }else
    return title;
}

const renderRecipe = recipe => {

    const markup = 
    `  
 <li>
    <a class="results__link results__link--active" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${limitResTitle(recipe.title)}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitResTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
  `
elements.searchResList.insertAdjacentHTML('beforeend',markup);

}

const buttonString = (page,type) => 
    `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page-1 : page+1}>
        <span>Page ${type === 'prev' ? page-1 : page+1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>  
    </button>
    `
;

const renderButtons = (page,resPerPages,results) => {
    const pages =Math.ceil( results.length / resPerPages);
    let button;
    if(page === 1 && pages > 1 ){
        //only next button
        button = buttonString(page,'next');
    }else if(page < pages){
        //both button
        button = `${buttonString(page,'prev')}${buttonString(page,'next')}`
    }else if(page === pages){
        //only prev button
        button = buttonString(page,'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',button);
};

export const renderResults = (results,page = 1,resPerPage = 10) => {
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;
    results.slice(start,end).forEach(renderRecipe);
    renderButtons(page,resPerPage,results);
};


