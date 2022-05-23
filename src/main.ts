import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css';

createApp(App)
.use(VueToast, { 
  position: "top-right", 
  duration: 4000, 
  dismissible: true 
})
.use(store)
.use(router)
.mount('#app')