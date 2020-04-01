import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

let state, mutations, actions = {};
const stroeContext = require.context('./', true, /index\.js$/);

stroeContext.keys().forEach(route => {
    // 如果是根目录的 index.js、 不做任何处理         
    if (route.startsWith('./index')) {
        return
    }                   
    const routerModule = stroeContext(route)       
    state = {...state, ...(routerModule.state)}
    mutations = {...mutations, ...(routerModule.mutation)}
    actions = {...actions, ...(routerModule.action)}    
 })

const store = new Vuex.Store({
    state,
    mutations,
    actions
});

export default store;