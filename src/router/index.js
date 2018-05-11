import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
import map from '../pages/map/index.vue'
import listPage from '../pages/list.vue'
import statisticsPage from '../pages/statistics.vue'
import wellPage from '../pages/municipal/well/index.vue'
import operationCenterPage from "../pages/operation-center/index.vue"
const lightPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/light/index.vue');
const loopPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/loop/index.vue');
const taskPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/task/index.vue');
const lampsPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/lamps/index.vue');
// const userPage = () => import(/* webpackChunkName: "system" */ '../pages/system/user.vue');
const logPage = () => import(/* webpackChunkName: "system" */ '../pages/system/log/index.vue');
const organizePage = () => import(/* webpackChunkName: "system" */ '../pages/system/organize/index.vue');
const userPage = () => import(/* webpackChunkName: "system" */ '../pages/system/user/index.vue');
Vue.use(Router);

export default new Router({
    routes: [
        {path: '/login', name: 'login', component: login},
        {path: '/', name: 'map', component: map},
        {path: '/operation', name: 'operation', component: operationCenterPage},
        {path: '/list', name: 'list', component: listPage, children: [
            {path: 'analyze', name: 'analyze', component: statisticsPage},
            {path: 'light', name: 'light', component: lightPage},
            {path: 'loop', name: 'loop', component: loopPage},
            {path: 'task', name: 'task', component: taskPage},
            {path: 'lamps', name: 'lamps', component: lampsPage},
            {path: 'log', name: 'log', component: logPage},
            {path: 'organize', name: 'organize', component: organizePage},
            {path: 'user', name: 'user', component: userPage},
            {path: 'well', name: 'well', component: wellPage},
        ]},
    ]
})
