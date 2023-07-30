import axios from "axios";

export const api = axios.create({
    baseURL: 'https://crudcrud.com/api/958ab29760ba49829fcfab9ef2931db5',
    timeout: 10000000
  });