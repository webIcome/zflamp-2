import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
import map from '../pages/map/index.vue'
import listPage from '../pages/list.vue'
const lightPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/light/index.vue');
const loopPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/loop/index.vue');
const taskPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/task/index.vue');
// const userPage = () => import(/* webpackChunkName: "system" */ '../pages/system/user.vue');
Vue.use(Router);

export default new Router({
    routes: [
        {path: '/login', name: 'login', component: login},
        {path: '/', name: 'map', component: map},
        {path: '/list', name: 'list', component: listPage, children: [
            {path: 'light', name: 'light', component: lightPage},
            {path: 'loop', name: 'loop', component: loopPage},
            {path: 'task', name: 'task', component: taskPage},
            // {path: 'user', name: 'user', component: userPage},
        ]},
    ]
})
