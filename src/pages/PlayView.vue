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
import { ref, computed, watch } from 'vue'
import QuestionsWindow from '../components/QuestionsBar.vue'
import PlayWindow from '../components/Game.vue'
import PlayLayout from '../components/PlayLayout.vue'
import {REWARDS, STATUSES} from '../const'
import {getQuestions} from '../api';
import {delay} from '../utils';
import {useRouter} from 'vue-router';

export default {
  components: { QuestionsWindow, PlayWindow, PlayLayout },
  setup() {
    const router = useRouter()

    const cash = ref(0)
    const currentRound = ref(null)
    const status = ref(STATUSES.NOT_STARTED)
    const rawQuestions = ref([])

    const maxRounds = computed(() => Math.min(REWARDS.length, rawQuestions.value.length))
    const questions = computed(() => rawQuestions.value
      .slice(0, maxRounds.value)
      .map((q, number) => ({
        ...q,
        reward: REWARDS[number],
        isAnswered: number < currentRound.value
      }))
    )
    const currentQuestion = computed(() => questions.value[currentRound.value])

    watch(status, curr => {
      if (curr === STATUSES.WON) router.push({name: 'won'})
      if (curr === STATUSES.LOST) router.push({name: 'lost'})
    })

    getQuestions(10).then(questions => {
      currentRound.value = 0
      rawQuestions.value = questions
      status.value = STATUSES.PLAYING
    })

    const submitAnswer = answerNumber => delay(Math.random() * 500 + 500)
      .then(() => {
        if (currentQuestion.value.correctAnswer === answerNumber) {
          cash.value = currentQuestion.value.reward
          if (currentRound.value < maxRounds.value) currentRound.value += 1
          if (currentRound.value + 1 === maxRounds.value) {
            status.value = STATUSES.WON
          }
        } else {
        status.value = STATUSES.LOST
      }
     })

    return {
      cash,
      currentRound,
      status,
      rawQuestions,
      maxRounds,
      questions,
      currentQuestion,
      submitAnswer
    }
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
