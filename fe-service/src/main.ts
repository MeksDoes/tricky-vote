import { createApp } from 'vue'

import './assets/main.css'
import { i18n } from './i18n/i18n'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
