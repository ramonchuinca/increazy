import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "cep",
    component: () => import('../views/AddCepView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router