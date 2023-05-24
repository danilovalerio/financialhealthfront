import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import icons from './fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add({ ...icons })

createApp(App)
    .component("fa", FontAwesomeIcon)
    .use(store)
    .use(router)
    .mount('#app')
