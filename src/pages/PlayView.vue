<template>
  <div class="box is-fullwidth title" v-if="currentRound === null">Loading...</div>
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
  import QuestionsWindow from '../components/QuestionsBar.vue'
  import PlayWindow from '../components/Game.vue'
  import PlayLayout from '../components/PlayLayout.vue'
  import {REWARDS, STATUSES} from '../const'
  import {getQuestions} from '../api';
  import {delay} from '../utils';

  export default {
    components: { QuestionsWindow, PlayWindow, PlayLayout },
    created() {
      if (this.currentRound === null) this.initGame()
    },
    data() {
      return {
        cash: 0,
        currentRound: null,
        status: STATUSES.NOT_STARTED,
        rawQuestions: []
      }
    },
    computed: {
      maxRounds() {
        return Math.min(REWARDS.length, this.questions.length)
      },
      questions() {
        return this.rawQuestions
        .slice(0, this.maxRounds)
        .map((q, number) => ({
          ...q,
          reward: REWARDS[number],
          isAnswered: number < this.currentRound
        }))
      },
      currentQuestion() {
        return this.questions[this.currentRound]
      }
    },
    methods: {
      initGame() {
        return getQuestions(10).then(questions => {
          this.cash = 0
          this.currentRound = 0
          this.rawQuestions = questions
          this.status = STATUSES.PLAYING
        })
      },
      answerQuestion(answerNumber) {
        return delay(Math.random() * 500 + 500).then(() => {
          if (this.currentQuestion.correctAnswer === answerNumber) {
            this.cash = this.currentQuestion.reward
            if (this.currentRound < this.maxRounds) {
              this.currentRound += 1
            }
            if (this.currentRound + 1 === this.maxRounds) {
              this.status = STATUSES.WON
            }
          } else {
            this.status = STATUSES.LOST
          }
        })
      },
      submitAnswer (number) {
        return this.answerQuestion(number)
          .then(() => {
            if (this.status === STATUSES.WON) {
              this.$router.push({name: 'won'})
            }
            if (this.status === STATUSES.LOST) {
              this.$router.push({name: 'lost'})
            }
          })
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
