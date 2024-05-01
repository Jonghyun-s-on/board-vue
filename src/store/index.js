import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import boards from './modules/boards'

export default createStore({
  modules: { boards },
  plugins: [
    createPersistedState()
  ]
})
