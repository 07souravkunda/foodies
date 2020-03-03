import axios from "axios";
import * as config from "../config";

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const result = await axios(
        `${config.proxy}https://recipesapi.herokuapp.com/api/search?key=${config.key}&q=${this.query}`
      );
      this.result = result.data.recipes;
      //console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
}
