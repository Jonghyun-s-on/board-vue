import { createRouter, createWebHistory } from 'vue-router'
import BoardListView from '../views/BoardListView.vue'
import BoardViewAView from '../views/BoardViewView.vue'
import BoardWriteAView from '../views/BoardWriteAView.vue'

const routes = [
  {
    path: '/',
    name: 'boardList',
    component: BoardListView
  },
  {
    path: '/view',
    name: 'boardView',
    component: BoardViewAView
  },
  {
    path: '/write',
    name: 'boardWrite',
    component: BoardWriteAView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
