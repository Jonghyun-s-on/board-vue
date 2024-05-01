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
  },
  {
    path: '/write/:number?',
    name: 'boardWrite',
    component: BoardWriteView,
    props: true // set value in props (default: false)
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
