import { createStore } from 'vuex'
import { STATUSES, REWARDS } from './const'
import { getQuestions } from './api'
import { delay } from '/@/utils'

const NUMBER_OF_QUESTIONS = 10

const initialState = {
  cash: 0,
  currentRound: null,
  status: STATUSES.NOT_STARTED,
  questions: []
}

const getters = {
  cash: state => state.cash,
  status: state => state.status,
  currentRound: state => state.currentRound,
  maxRounds: state => Math.min(REWARDS.length, state.questions.length),
  questions: state => state.questions
    .slice(0, getters.maxRounds(state))
    .map((q, number) => ({
      ...q,
      reward: REWARDS[number],
      isAnswered: number < getters.currentRound(state)
    })),
  currentQuestion: state => {
    const questions = getters.questions(state)
    const currentRound = getters.currentRound(state)
    return questions[currentRound]
  }
}

const actions = {
  initGame: ({commit}) => {
    return getQuestions(NUMBER_OF_QUESTIONS)
      .then(questions => commit('resetGame', questions))
  },
  answerQuestion ({commit}, answerNumber) {
    return delay(Math.random() * 500 + 500)
      .then(() => commit('answerQuestion', answerNumber))
  }
}

const mutations = {
  resetGame: (state, questions) => {
    state.cash = 0
    state.currentRound = 0
    state.questions = questions
    state.status = STATUSES.PLAYING
  },
  answerQuestion: (state, answerNumber) => {
    const q = getters.currentQuestion(state)
    const currentRound = getters.currentRound(state)
    const maxRounds = getters.maxRounds(state)
    if (q.correctAnswer === answerNumber) {
      state.cash = q.reward
      if (currentRound < maxRounds) {
        state.currentRound += 1
      }
      if (currentRound + 1 === maxRounds) {
        state.status = STATUSES.WON
      }
    } else {
      state.status = STATUSES.LOST
    }
  }
}

export default createStore({
  actions,
  getters,
  mutations,
  state: initialState,
})
