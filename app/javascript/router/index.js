import Vue from "vue"
import VueRouter from "vue-router";
import Index from "../pages/top/index.vue"
import Tasks from "../pages/task/index.vue"
import Register from "../pages/register/index.vue"
import Login from "../pages/login/index.vue"
import Profile from "../pages/profile/index.vue"
import store from "../store/index"


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
    },
    {
        path: '/tasks',
        name: 'Tasks',
        component: Tasks,
        meta: { requiresLogin: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresLogin: true }
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

router.beforeEach(async function(to, from, next){
    await store.dispatch('users/setUser')
    if (to.matched.some(record => record.meta.requiresLogin)) {
        // await store.dispatch('users/setUser')
        if(store.getters['users/isLoggedIn']){
            next()
        }else{
            next('/login')
        }
    }else{
        next()
    }
})

export default router
