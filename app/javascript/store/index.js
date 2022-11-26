import Vue from 'vue'
import Vuex from 'vuex'
import TasksStore from './modules/tasks.js'
import UsersStore from './modules/users.js'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    tasks: {
      namespaced: true,
      ...TasksStore,
    },
    users: {
      namespaced: true,
      ...UsersStore,
    }
  },
  state: {
    token: null,
  },
  getters: {
    axiosOption(state){
      return { 
        headers: {
          Authorization: `Bearer ${state.token}`,
        }
      }
    },
  },
  actions: {
    async setTokenToLocalStorage({ state }){
      state.token = await localStorage.getItem("token")
    },
  }
})

export default store;