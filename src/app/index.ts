import { createApp } from 'vue'
import { store } from './providers'
import App from './index.vue'

export const app = createApp(App).use(store)
