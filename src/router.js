import { createRouter, createWebHistory } from 'vue-router'
import store from './store'
import Intro from './common/Intro.vue'
import quizRoutes from './apps/quiz/routes'
import adminRoutes from './apps/settings/routes'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'intro',
      component: Intro,
      path: '/'
    },
    ...quizRoutes,
    ...adminRoutes
  ]
})

router.beforeEach((to, from, next) => {
  const routeMeta = to.matched
    .filter(record => record.meta)
    .map(record => record.meta)
  for (const meta of routeMeta) {
    const requiredQuizStatus = meta.requiredQuizStatus
    if (requiredQuizStatus) {
      const currentStatus = store.getters['quiz/status']
      if (requiredQuizStatus !== currentStatus) {
        const redirectTarget = meta.redirect || {name: 'game'}
        redirectTarget.replace = true
        next(redirectTarget)
        return
      }
    }
  }

  next() // make sure to always call next()!
})

export default router
