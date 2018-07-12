import Vue from 'vue'
import App from './App.vue'
import SweetModal from "sweet-modal-vue/src/plugin.js";
Vue.use(SweetModal);

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
