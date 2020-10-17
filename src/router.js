import { createRouter, createWebHistory } from 'vue-router'
import Intro from './pages/Intro.vue'
import Play from './pages/PlayView.vue'
import WonView from './pages/WonView.vue'
import LostView from './pages/LostView.vue'
import NarrowLayout from './components/NarrowLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'play',
      component: Play,
      path: '/play',
    },
    {
      path: '/',
      component: NarrowLayout,
      children: [
        {
          name: 'intro',
          component: Intro,
          path: '/'
        },
        {
          name: 'won',
          component: WonView,
          path: '/won',
        },
        {
          name: 'lost',
          component: LostView,
          path: '/lost',
        }
      ]
    }
  ]
})

export default router
