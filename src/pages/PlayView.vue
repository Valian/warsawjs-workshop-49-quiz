<template>
  <div class="box has-text-centered title" v-if="currentRound === null">Loading...</div>
  <PlayLayout v-else>
    <template #title>
      <div class="has-text-centered">
        <h1 class="title">Currently won: <strong>{{ $filters.currency(cash) }}</strong></h1>
        <h2 class="subtitle">Round {{ currentRound + 1 }} of {{ maxRounds }}</h2>
      </div>
    </template>

    <template #main>
      <transition name="flip" mode="out-in">
        <play-window
          class="box"
          :currentQuestion="currentQuestion"
          :key="currentRound"
          @submit="submitAnswer">
        </play-window>
      </transition>
    </template>

    <template #side>
      <questions-window
        :questions="questions.slice().reverse()">
      </questions-window>
    </template>
  </PlayLayout>
</template>

<script>
import {  watch } from 'vue'
import QuestionsWindow from '../components/QuestionsBar.vue'
import PlayWindow from '../components/Game.vue'
import PlayLayout from '../components/PlayLayout.vue'
import {STATUSES} from '../const'
import {useRouter} from 'vue-router';
import {useQuiz} from '../logic';

export default {
  components: { QuestionsWindow, PlayWindow, PlayLayout },
  setup() {
    const router = useRouter()
    const {initQuiz, ...quizProps} = useQuiz()

    watch(quizProps.status, curr => {
      if (curr === STATUSES.WON) router.push({name: 'won'})
      if (curr === STATUSES.LOST) router.push({name: 'lost'})
    })

    initQuiz()

    return quizProps
  }
}
</script>

<style>
  .flip-enter-active, .flip-leave-active {
    transition: all 0.5s linear;
  }
  .flip-enter-from, .flip-leave-to {
    transform: rotateY(90deg) scale(0.5, 1);
  }
</style>
