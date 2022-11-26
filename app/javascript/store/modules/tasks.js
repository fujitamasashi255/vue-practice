import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const TasksStore = {
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
        async restore({ commit, rootGetters }){
            try{
                // console.log(axios.defaults.headers.common['Authorization'])
                let response = await axios.get('/api/tasks', rootGetters.axiosOption);
                commit('restore', { tasks: response.data });
            } catch(error) {
                console.log(error); 
            }
        },
        async addTask({ commit, rootGetters }, task){
            try{
                const response = await axios.post('api/tasks', task, rootGetters.axiosOption);
                commit('addTask', response.data);
            } catch(error) {
                console.log(error);
            }
        },
        async updateTask({ dispatch, rootGetters }, task){
            try{
                const response = await axios.put(`api/tasks/${task.id}`, task, rootGetters.axiosOption);
                dispatch('restore');
            } catch(error){
                console.log(error);
            };
        },
        async deleteTask({ dispatch, rootGetters }, task){
            const result = await axios.delete(`api/tasks/${task.id}`, rootGetters.axiosOption);
            dispatch('restore');
        },
    },
}

export default TasksStore;