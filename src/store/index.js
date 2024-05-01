import { createStore } from 'vuex'
import boards from './modules/boards'

export default createStore({
  modules: { boards },
})
