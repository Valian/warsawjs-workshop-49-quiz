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
        <PlayWindow
          class="box"
          :currentQuestion="currentQuestion"
          :key="currentRound"
          @submit="submitAnswer">
        </PlayWindow>
      </transition>
    </template>

    <template #side>
      <QuestionsWindow
        :questions="questions.slice().reverse()">
      </QuestionsWindow>
    </template>
  </PlayLayout>
</template>

<script setup>
export {default as QuestionsWindow} from '../components/QuestionsBar.vue'
export {default as PlayWindow} from '../components/Game.vue'
export {default as PlayLayout} from '../components/PlayLayout.vue'

import {STATUSES} from '../const'
import {useRouter} from 'vue-router';
import {useQuiz} from '../logic';
import {watch} from 'vue'


const router = useRouter()
export const {
  cash,
  currentRound,
  status,
  maxRounds,
  questions,
  currentQuestion,
  submitAnswer,
  initQuiz
} = useQuiz()

watch(status, curr => {
  if (curr === STATUSES.WON) router.push({name: 'won'})
  if (curr === STATUSES.LOST) router.push({name: 'lost'})
})

initQuiz()

</script>

<style>
  .flip-enter-active, .flip-leave-active {
    transition: all 0.5s linear;
  }
  .flip-enter-from, .flip-leave-to {
    transform: rotateY(90deg) scale(0.5, 1);
  }
</style>
