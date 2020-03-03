import axios from "axios";
import * as config from "../config";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axios(
        `${config.proxy}https://recipesapi.herokuapp.com/api/get?key=${config.key}&rId=${this.id}`
      );
      const recipe = result.data.recipe;
      this.img = recipe.image_url;
      this.ingredients = recipe.ingredients;
      this.title = recipe.title;
      this.url = recipe.source_url;
      this.author = recipe.publisher;
    } catch (error) {
      alert(error);
    }
  }

  calcTime() {
    this.time = (this.ingredients.length / 3) * 15;
  }
  calcServings() {
    this.servings = 4;
  }
  parseIngredients() {
    this.ingredients = this.ingredients.map(el => {
      //uiform units
      const unitLong = [
        "tablespoons",
        "tablespoon",
        "teaspoons",
        "teaspoon",
        "ounces",
        "ounce",
        "cups",
        "bowls"
      ];
      const unitShort = [
        "tbsp",
        "tbsp",
        "tsp",
        "tsp",
        "oz",
        "oz",
        "cup",
        "bowl"
      ];

      let ingredient = el.toLowerCase();
      unitLong.forEach((el2, i) => {
        ingredient = ingredient.replace(el2, unitShort[i]);
      });

      //remove brackets
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

      const arrIng = ingredient.split(" ");
      const unitIndex = arrIng.findIndex(el3 => unitShort.includes(el3));
      //separate to count,unit,ingredient
      let ing;
      let obj;

      if (unitIndex > -1) {
        ing = ingredient.split(arrIng[unitIndex]);
        obj = {
          count: this.getCount(arrIng[0], arrIng[1]),
          unit: arrIng[unitIndex],
          ingredient: ing[1]
        };
      } else if (parseInt(arrIng[0], 10)) {
        if (parseInt(arrIng[0]) && parseInt(arrIng[1])) {
          ing = arrIng.slice(2);
        } else {
          ing = arrIng.slice(1);
        }
        obj = {
          count: this.getCount(arrIng[0], arrIng[1]),
          unit: " ",
          ingredient: ing.join(" ")
        };
      } else if (unitIndex === -1) {
        obj = {
          count: 1,
          unit: " ",
          ingredient
        };
      }

      return obj;
    });
  }
  getCount(int, dec) {
    if (parseInt(int) && parseInt(dec)) {
      const str = `${int}+${dec}`;
      return eval(str);
    } else if (parseInt(int)) {
      return eval(int);
    }
  }
  updateServings(type) {
    let serv;
    type === "inc" ? (serv = this.servings + 1) : (serv = this.servings - 1);
    this.ingredients.forEach(el => {
      el.count = (el.count * serv) / this.servings;
    });
    this.servings = serv;
  }
}
