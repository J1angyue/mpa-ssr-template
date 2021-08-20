const routes = [
  {
    path: '/funcs',
    // ssr也可通过import()减小首屏体积
    component: () => import('../views/FunctionList.vue')
  },
  {
    path: '/welcome',
    component: () => import('../views/Welcome.vue')
  }
]

export default routes