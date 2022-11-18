import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        tasks: [],
    },
    getters: {
        todoTasks: state => state.tasks.filter(function(task){ return task.status === 'todo' }),
        doingTasks: state => state.tasks.filter(function(task){ return task.status === 'doing' }),
        doneTasks: state => state.tasks.filter(function(task){ return task.status === 'done' }),
    },
    mutations: {
        restore(state, { tasks }){
            state.tasks = tasks;                
        },
        addTask(state, task){
            state.tasks.push(task);
        },
    },
    actions: {
        async restore({ commit }){
            try{
                let response = await axios.get('/api/tasks');
                commit('restore', { tasks: response.data });
            } catch(error) {
                console.log(error); 
            }
        },
        async addTask({ commit }, task){
            try{
                const response = await axios.post('api/tasks', task);
                commit('addTask', response.data);
            } catch(error) {
                console.log(error);
            }
        },
        async updateTask({ dispatch }, task){
            try{
                const response = await axios.put(`api/tasks/${task.id}`, task);
                dispatch('restore');
            } catch(error){
                console.log(error);
            };
        },
        async deleteTask({ dispatch }, task){
            const result = await axios.delete(`api/tasks/${task.id}`);
            dispatch('restore');
        }
    },
})

export default store;