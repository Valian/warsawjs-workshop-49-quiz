import { createStore } from 'vuex'
import settings from './apps/settings/store'
import quiz from './apps/quiz/store'

export default createStore({
  modules: {
    settings,
    quiz
  }
})
