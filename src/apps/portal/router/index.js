import {
  createRouter,
  createWebHistory,
  createMemoryHistory
} from 'vue-router'
import routes from './routes'

const history = typeof window === 'undefined'
  ? createMemoryHistory()
  : createWebHistory()

export default function () {
  return createRouter({ history, routes })
}
