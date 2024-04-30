import { createRouter, createWebHistory } from 'vue-router'
import BoardListView from '../views/BoardListView.vue'
import BoardViewView from '../views/BoardViewView.vue'
import BoardWriteView from '../views/BoardWriteView.vue'

const routes = [
  {
    path: '/',
    name: 'boardList',
    component: BoardListView
  },
  {
    path: '/view',
    name: 'boardView',
    component: BoardViewView,
    // props: true // set value in props
  },
  {
    path: '/write',
    name: 'boardWrite',
    component: BoardWriteView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
