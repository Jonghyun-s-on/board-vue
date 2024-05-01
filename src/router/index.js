import { createRouter, createWebHistory } from 'vue-router'
import BoardListView from '../views/BoardListView.vue'
import BoardViewView from '../views/BoardViewView.vue'
import BoardWriteView from '../views/BoardWriteView.vue'
import { useStore } from 'vuex'

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
    beforeEnter: (to, from, next) => {
      if (to.query.number) {
        let board = useStore().getters.getBoard(to.query.number)
        if (Object.keys(board).length == 0) {
          alert('data does not exists.')
          next(false)
        }
      } else {
        alert('query value is invalid.')
        next(false)
      }
      next()
    }
  },
  {
    path: '/write/:number?',
    name: 'boardWrite',
    component: BoardWriteView,
    props: true, // set value in props (default: false)
    beforeEnter: (to, from, next) => {
      if (to.params.number) {
        let board = useStore().getters.getBoard(to.params.number)
        if (Object.keys(board).length > 0) {
          let password = prompt('Please enter board\'s password to modify.')
          if (password) {
            if (password != board.password) {
              alert('The password does not match.')
              next(false)
            }
          } else {
            next(false)
          }
        } else {
          alert('data does not exists.')
          next(false)
        }
      }
      next()
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
