import Vue from 'vue'
import Router from 'vue-router'
import login from '../pages/login.vue'
import map from '../pages/map/index.vue'
Vue.use(Router);

export default new Router({
    routes: [
        {path: '/login', name: 'login', component: login},
        {path: '/', name: 'map', component: map}
    ]
})
