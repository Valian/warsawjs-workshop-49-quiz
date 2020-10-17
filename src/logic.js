import {computed, ref} from 'vue';
import {REWARDS, STATUSES} from './const';
import {delay} from './utils';
import {getQuestions} from './api';

const cash = ref(0)
const currentRound = ref(null)
const status = ref(STATUSES.NOT_STARTED)
const rawQuestions = ref([])

const maxRounds = computed(() => Math.min(REWARDS.length, rawQuestions.value.length))
const currentQuestion = computed(() => questions.value[currentRound.value])
const questions = computed(() => rawQuestions.value
  .slice(0, maxRounds.value)
  .map((q, number) => ({
    ...q,
    reward: REWARDS[number],
    isAnswered: number < currentRound.value
  }))
)

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

const initQuiz = () => {
  currentRound.value = null
  rawQuestions.value = []
  status.value = STATUSES.NOT_STARTED
  return getQuestions(10).then(questions => {
    currentRound.value = 0
    rawQuestions.value = questions
    status.value = STATUSES.PLAYING
  })
}

export const useQuiz = () => {
  return {
    cash,
    currentRound,
    status,
    maxRounds,
    questions,
    currentQuestion,
    submitAnswer,
    initQuiz
  }
}