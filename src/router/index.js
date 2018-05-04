import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
import map from '../pages/map/index.vue'
import listPage from '../pages/list.vue'
const lightPage = () => import(/* webpackChunkName: "lamp" */ '../pages/lamp/light/index.vue');
Vue.use(Router);

export default new Router({
    routes: [
        {path: '/login', name: 'login', component: login},
        {path: '/', name: 'map', component: map},
        {path: '/list', name: 'list', component: listPage, children: [
            {path: 'light', name: 'light', component: lightPage},
        ]},
    ]
})
