import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
import map from '../pages/map/index.vue'
import listPage from '../pages/list.vue'
import statisticsPage from '../pages/statistics/index.vue'
// import wellPage from '../pages/municipal/well/index.vue'
import operationCenterPage from "../pages/operation-center/index.vue"
const lightPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/light/index.vue');
const loopPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/loop/index.vue');
const taskPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/task/index.vue');
const lampsPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/lamps/index.vue');
// const userPage = () => import(/* webpackChunkName: "system" */ '../pages/system/user.vue');
const logPage = () => import(/* webpackChunkName: "system" */ '../pages/system/log/index.vue');
const organizePage = () => import(/* webpackChunkName: "system" */ '../pages/system/organize/index.vue');
const userPage = () => import(/* webpackChunkName: "system" */ '../pages/system/user/index.vue');

const wellPage = () => import(/* webpackChunkName: "terminal" */'../pages/municipal/well/index.vue');
const doorPage = () => import(/* webpackChunkName: "terminal" */'../pages/municipal/door/index.vue');
const illuminancePage = () => import(/* webpackChunkName: "terminal" */'../pages/municipal/illuminance/index.vue');
const inundatePage = () => import(/* webpackChunkName: "terminal" */'../pages/municipal/inundate/index.vue');
const posePage = () => import(/* webpackChunkName: "terminal" */'../pages/municipal/pose/index.vue');
const shakePage = () => import(/* webpackChunkName: "terminal" */'../pages/municipal/shake/index.vue');
const voicePage = () => import(/* webpackChunkName: "terminal" */'../pages/municipal/voice/index.vue');
const waterLevelPage = () => import(/* webpackChunkName: "terminal" */'../pages/municipal/water-level/index.vue');
const weatherPage = () => import(/* webpackChunkName: "terminal" */'../pages/municipal/weather/index.vue');
Vue.use(Router);
import StoreUser from "../store/user"

let router = new Router({
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
            {path: 'door', name: 'door', component: doorPage},
            {path: 'illuminance', name: 'illuminance', component: illuminancePage},
            {path: 'inundate', name: 'inundate', component: inundatePage},
            {path: 'pose', name: 'pose', component: posePage},
            {path: 'shake', name: 'shake', component: shakePage},
            {path: 'voice', name: 'voice', component: voicePage},
            {path: 'water-level', name: 'water-level', component: waterLevelPage},
            {path: 'weather', name: 'weather', component: weatherPage},
        ]},
    ]
})

router.beforeEach((to, from, next) => {
    if (to.query.loginname && to.query.password) {
        StoreUser.login(to.query).then(res => {
            next(to.path)
        }).catch(err => {
            next('login')
        })
    } else {
        next()
    }
})
export default router
