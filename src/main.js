import Vue from 'vue'
import App from './App.vue'
import SweetModal from "sweet-modal-vue/src/plugin.js";
import store from "./store/store.js";
Vue.use(SweetModal);

Vue.config.productionTip = false




new Vue({
  el: "#app",
  store, 
  render: h => h(App)
});