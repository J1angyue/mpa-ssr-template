import { createSSRApp } from 'vue'
import App from './component/App.vue'

import createRouter from './router'
import createStore from './store'

export default function createApp() {
  const app = createSSRApp(App)
  const router = createRouter()
  const store = createStore()

  app.use(router).use(store)

  return {
    app,
    store,
    router
  }
}
