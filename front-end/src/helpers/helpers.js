import Vue from 'vue';
import axios from "axios";
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
  messageOptions: {
    timeout: 3000,
    pauseOnInteract: true
  }
});

const vm = new Vue();

const baseURL = "http://localhost:3000/responses/";

const handleError = (fn) => async (...params) => {
  try {
    return await fn(...params);
  } catch (error) {
    console.log(error);
    vm.flash(`${error.response ? error.response.status : 'Error'}: ${error.response ? error.response.statusText : error.message}`, 'error');
  }
};

export const api = {
  getResponse: handleError(async (id) => {
    const res = await axios.get(baseURL + id);
    return res.data;
  }),

  getResponses: handleError(async () => {
    const res = await axios.get(baseURL);
    return res.data;
  }),

  deleteResponse: handleError(async (id) => {
    const res = await axios.delete(baseURL + id);
    return res.data;
  }),

  createResponse: handleError(async (payload) => {
    const res = await axios.post(baseURL, payload);
    return res.data;
  }),

  updateResponse: handleError(async (payload) => {
    const res = await axios.put(baseURL + payload._id, payload);
    return res.data;
  })
};