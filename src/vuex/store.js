import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
    isUpdateProductionList: false,//是否刷新作品管理列表
    isUpdateCharacterList: false,//是否刷新人物管理列表
    isUpdateDynamicList: false,//是否刷新人物动态列表
}

const mutations = {
    updateProductionList(state,isUpdate){
    	  //console.log(isUpdate);
    	  //console.log('mutations');
        state.isUpdateProductionList = isUpdate;
    },
    updateCharacterList(state,isUpdate){
    	  //console.log(isUpdate);
    	  //console.log('mutations');
        state.isUpdateCharacterList = isUpdate;
    },
    updateDynamicList(state,isUpdate){
    	  //console.log(isUpdate);
    	  //console.log('mutations');
        state.isUpdateDynamicList = isUpdate;
    }
}

const getters = {
	productionListState(state){
		//console.log('getters');
		return state.isUpdateProductionList;
	},
	characterListState(state){
		//console.log('getters');
		return state.isUpdateCharacterList;
	},
	dynamicListState(state){
		//console.log('getters');
		return state.isUpdateDynamicList;
	}
}

export default new Vuex.Store({
    state,
    mutations,
    getters
});