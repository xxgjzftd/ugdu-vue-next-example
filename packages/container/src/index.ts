import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import routes from 'routes/container'

// @ts-ignore
import App from '@container/app.vue'

const app = createApp(App)

const router = createRouter(
  {
    history: createWebHistory(),
    routes
  }
)

app.use(router)

export default {
  mount () {
    app.mount('#app')
  },
  unmount () {
    app.unmount()
  }
}
