import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    isModalVisible: false,
  },
  mutations: {
    isModalVisible: (state) => {
      state.isModalVisible = !state.isModalVisible;
    },
  },
});
