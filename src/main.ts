import { createApp } from 'vue';
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGamepad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faGamepad)
createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(store)
    .provide('store', store)
    .mount('#app');
