import Vue from 'vue'
import App from './App'
import router from './router'
import HttpClient from './core/http-client';
import ElementUI from 'element-ui';
import 'bootstrap/dist/css/bootstrap.css';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.less';
import Pipes from './pipes';
import Plugins from './plugins';
import Components from './components';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill();

Vue.use(ElementUI);
Vue.use(HttpClient);
initPlugins(Plugins);
initPipe(Pipes);
initComponent(Components);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

function initPlugins(plugins) {
  plugins.forEach(plugin => {
    Vue.use(plugin);
  })
}
function initComponent(components) {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
function initPipe(pipes) {
  Object.keys(pipes).forEach(key => {
    Vue.filter(key, pipes[key]);
  })
}
