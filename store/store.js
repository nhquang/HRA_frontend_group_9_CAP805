import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        apiUrl: 'http://hrm-backend-group-9.herokuapp.com',
        loading: false,
        data: [],
    },
});