<template>
  <PlayLayout>
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
          :loading="submitAnswerLoading"
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
  import QuestionsWindow from '../components/QuestionsBar.vue'
  import PlayWindow from '../components/Game.vue'
  import PlayLayout from './PlayLayout.vue'
  import { mapGetters } from 'vuex'
  import { STATUSES } from '../const'

  export default {
    components: { QuestionsWindow, PlayWindow, PlayLayout },
    loading: ['submitAnswer'],
    methods: {
      submitAnswer (number) {
        return this.$store.dispatch('quiz/answerQuestion', number)
          .then(() => {
            if (this.status === STATUSES.WON) {
              this.$router.push({name: 'won'})
            }
            if (this.status === STATUSES.LOST) {
              this.$router.push({name: 'lost'})
            }
          })
      }
    },
    computed: mapGetters({
      status: 'quiz/status',
      currentRound: 'quiz/currentRound',
      currentQuestion: 'quiz/currentQuestion',
      questions: 'quiz/questions',
      cash: 'quiz/cash',
      maxRounds: 'quiz/maxRounds'
    })
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
