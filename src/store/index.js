import Vue from "vue";
import Vuex from "vuex";
import { registerModule } from "./registerstore/registerModule"
import { loginModule } from "./loginStore/loginModule"
Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        registerModule,
        loginModule,
    }
});