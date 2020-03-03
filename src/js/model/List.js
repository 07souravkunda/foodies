import uniqid from 'uniqid';

export default class List {
    constructor(){
        this.list = []
    }

    generateId(){
        const id = uniqid();
        return id;
    }
    createList(ingredients){
        ingredients.forEach(el => {
            const obj = {
                id : this.generateId(),
                count : el.count,
                unit : el.unit,
                ingredient : el.ingredient
            }
            this.list.push(obj);

            
        });
        console.log(this.list);
    }
    updateCount(id,newCount) {
        const index = this.list.findIndex(el => el.id === id);
        this.list[index].count = newCount;
    }
    deleteList(id) {
        const index = this.list.findIndex(el => el.id === id);
        this.list.splice(index,1);
    }
}