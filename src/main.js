import Vue from 'vue'
import App from './App.vue'
import Vuelidate from "vuelidate"
import "./components/Form.sass"
import "./App.sass"

Vue.config.productionTip = false

Vue.use(Vuelidate)

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
