import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import router from '../router';

const getDefaultState = () => {
  return {
    currentUser: null,
    test: null,
  }
}

export default createStore({
  state() {
    return getDefaultState();
  },
  getters: {
    getCurrentUser(state) {
      return state.currentUser;
    },
  },
  mutations: {
    updateCurrentUser(state, data) {
      state.currentUser = data;
    },
    logout(state, data) {
      Object.assign(state, getDefaultState());
      router.push("/");
    }
  },
  actions: {
    updateCurrentUser(context, data) {
      context.commit("updateCurrentUser", data);
    },
  },
  plugins: [createPersistedState()]
})
