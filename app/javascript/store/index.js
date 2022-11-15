import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tasks: [],
    },
    getters: {
        fetchTasks: (state) => state.tasks,
    },
    mutations: {
        restore(state, { tasks }){
            state.tasks = tasks;                
        },
        addTask(state, { title, description }){
            const newTask = {
                title,
                description,
            };
            state.tasks.push(newTask);
        }
    },
    actions: {
        async restore({ commit }){
            try{
                let response = await axios.get('/api/tasks');
                console.log(response.data);
                commit('restore', { tasks: response.data });
            } catch(error) {
                console.log(error); 
            }
        },
        async addTask({ commit }, { title, description }){
            try{
                await axios.post('api/tasks', {
                    title,
                    description,
                });
                commit('addTask', { title, description })
            } catch(error) {
                console.log(error);
            }
        }
    },
})

export default store;