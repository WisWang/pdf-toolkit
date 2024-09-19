import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueGtag from 'vue-gtag'

const app = createApp(App)
app.use(
  VueGtag,
  {
    config: { id: 'G-JGNDK9BZ44' }
  },
  router
)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
