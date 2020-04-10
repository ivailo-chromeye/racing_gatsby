import axios from 'axios';
const api = axios.create({
  baseURL: 'https://development.chromeye.com/rp/hubs/cheltenham/wp-json/',
})

export class API {
  constructor() {

  }

  async getItems() {
    return api.get("wp/v2/item?per_page=100&offset=0");
  }

  async getOptions() {
    return api.get("acf/v3/options/options");
  }

}

