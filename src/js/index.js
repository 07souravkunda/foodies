import Search from './model/Search';
import * as searchView from './view/searchView';
import {elements,renderLoader,clearLoader} from './view/base';
import Recipe from './model/Recipe';
import * as recipeView from './view/recipeView';
import List from './model/List';
import * as listView from './view/listView';

const state = {};

const controlSearch =async () => {
    const query = searchView.searchValue();
    console.log(query);
    if(query){
        state.search = new Search(query);

        searchView.clearField();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        await state.search.getResults();

        console.log(state.search.result);
        clearLoader();
    
        searchView.renderResults(state.search.result);
    }
    
}

elements.searchResPages.addEventListener('click',e => {
    const btn = e.target.closest('.btn-inline');
    if(btn){
        const page = parseInt(btn.dataset.goto,10);

        searchView.clearResults();

        searchView.renderResults(state.search.result,page);
    }
})

elements.searchArea.addEventListener('submit',event => {
    event.preventDefault();
    controlSearch();
});

const getHashId = () => {
    const loc = window.location.hash;
    const id = parseInt(loc.replace('#',''));
    return id;
}


const recipeSearch = async () => {
    const id =getHashId();
    if(id) {

        state.recipe = new Recipe(getHashId());
        renderLoader(elements.recipe);
        
        try{
            
                await state.recipe.getRecipe();
    
                state.recipe.calcTime();
                state.recipe.calcServings();
                state.recipe.parseIngredients();
                window.r = state.recipe;
                console.log(state.recipe);
                clearLoader();
                recipeView.clearRecipe();
                recipeView.renderRecipe(state.recipe);
    
        }catch(err){
            alert('something went wrong!!');
            console.log(err);
        }
    }
    
}

window.addEventListener('hashchange',recipeSearch);
window.addEventListener('load',recipeSearch);

elements.recipe.addEventListener('click',e => {
    if(e.target.matches('#btn-inc ,#btn-inc *')){
        state.recipe.updateServings('inc');
        recipeView.updateRecipe(state.recipe);
        console.log(state.recipe);
    }else if(e.target.matches('#btn-dec ,#btn-dec *')){
        if(state.recipe.servings > 1){
        state.recipe.updateServings('dec');
        recipeView.updateRecipe(state.recipe);
        }
    }
     else if(e.target.matches('.recipe__btn , .recipe__btn *')){
        state.list = new List();

        listView.clearList();

        state.list.createList(state.recipe.ingredients);

        listView.addShopingList(state.list.list);
        
     }
});

elements.list.addEventListener('click',e => {
    if(e.target.matches('.shopping__delete , .shopping__delete *')){
        const id = e.target.closest('.shopping__delete').parentElement.dataset.setid;
        console.log(id);
        state.list.deleteList(id);
        console.log(state.list);
        listView.removeList(id);
    }else if(e.target.matches('.shopping__count,.shopping__count *')){
        const id = e.target.closest('.shopping__count').parentElement.dataset.setid;
        const query = e.target.closest('.input--value');
        if(query){
        const value = parseFloat(query.value,10);
        console.log(id);
        state.list.updateCount(id,value);
        console.log(state.list);
        }
        }
});


