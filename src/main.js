import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import { router } from './router'
app.use(router)

import { store } from './store/store.js'
app.use(store)

app.mount('#app')