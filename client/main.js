import './assets/main.css'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify/lib/framework.mjs'
import App from './app/App.vue'
import router from './app/router'
const vuetify = createVuetify()
const app = createApp(App).use(vuetify)

app.use(router)

app.mount('#app')
