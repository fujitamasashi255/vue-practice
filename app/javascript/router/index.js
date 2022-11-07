//import Vue from "vue"
import VueRouter from "vue-router";
import Index from "../pages/top/index.vue"
import Tasks from "../pages/task/index.vue"
import Vue from "vue"

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
    },
]

export default new VueRouter({
    mode: 'history',
    routes,
})
