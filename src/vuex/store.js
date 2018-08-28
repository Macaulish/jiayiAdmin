import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    updateProductionList: false
}

const mutations = {
    add(state){
        state.count+=1;
    }
}

export default new Vuex.Store({
    state
});