import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    var firebaseConfig = {
      apiKey: 'AIzaSyDzwMSWStpCDdevStHz0pIvSaPpGhFp1yw',
      authDomain: 'crm-project-fdc46.firebaseapp.com',
      databaseURL: 'https://crm-project-fdc46-default-rtdb.firebaseio.com',
      projectId: 'crm-project-fdc46',
      storageBucket: 'crm-project-fdc46.appspot.com',
      messagingSenderId: '820426898912',
      appId: '1:820426898912:web:134d7af39b2713349b3f85',
      measurementId: 'G-XJYZSZ3SCR'
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
  }
}).$mount('#app')
