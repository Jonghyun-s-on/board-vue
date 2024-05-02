import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import boards from './modules/boards'
import comments from './modules/comments'

export default createStore({
  modules: { boards, comments },
  plugins: [
    createPersistedState()
  ]
})
