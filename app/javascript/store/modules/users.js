import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../../router/index.js'

Vue.use(Vuex);

const UsersStore = {
    state: {
        user: null
    },
    getters: {
        isLoggedIn(state){
            return !!(state.user)
        }
    },
    mutations: {
    },
    actions: {
        async createUser(user_params){
            const request = { user: user_params }
            try{
                await axios.post('api/users', request)
                // 登録完了後ログインページへ遷移
                router.push('/login')
            } catch(error){
                console.log(error)
            }
        },
        async login({ state, dispatch }, user_params){
            const request = { user: user_params }
            try{
                const response = await axios.post('api/login', request)
                await localStorage.setItem("token", response.data.token)
                // await dispatch('setUser')
                router.push('/tasks')
            } catch(error){
                console.log(error)
            }
        },
        async logout({ state }){
            await localStorage.removeItem("token")
            state.user = null
            router.push('/')
        },
        async setUser(ctx){
            // let token = await localStorage.getItem("token")
            await ctx.dispatch('setTokenToLocalStorage', null, { root: true })
            const response = await axios.get(`api/user`, ctx.rootGetters.axiosOption)
            ctx.state.user = response.data
        },
        async updateUser(ctx, formData){
            try{
                await axios.put(`api/users/${ctx.state.user.id}`, formData, ctx.rootGetters.axiosOption)
                // 登録完了後ログインページへ遷移
                router.push('/tasks')
            } catch(error){
                console.log(error)
            }
        },
    },
}

export default UsersStore;