import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Delivery from './components/Delivery'
import Payment from './components/Payment'
import Success from './components/Success'


const routes = [
	{ path: '/', component: Delivery },
  { path: '/payment', component: Payment },
  { path: '/success', component: Success }
]

const router = new VueRouter({
  routes, 
  mode: 'history'
})

import Vuelidate from 'vuelidate'
import VuelidateErrorExtractor, { templates } from "vuelidate-error-extractor"; //IMPORT VuelidateErrorExtractor
Vue.use(Vuelidate)

Vue.config.productionTip = false
//DEFINE ERROR MESSAGE
Vue.use(VuelidateErrorExtractor, {
  i18n: false,
  messages: {
    required: "{attribute} is required!",
    notGmail: "{attribute} must gmail address",
    notPhone: "{attribute} must phone number Indonesia format",
    email: "{attribute} is not a valid Email address.",
    isEmailAvailable:
      "{attribute} is not available. Must be at least 10 characters long."
  }
});

Vue.component("form-group", templates.singleErrorExtractor.foundation6);

new Vue({
	
  el: '#app',
  
  template: '<App/>',
  
  components: { App },
  
  router
}).$mount('#app')
