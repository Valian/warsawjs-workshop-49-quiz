import { shuffle } from 'lodash-es'
import axios from 'axios'

const QUESTION_API_ENDPOINT = 'https://opentdb.com/api.php'

const mapApiQuestionToAppQuestion = q => {
  const answers = shuffle([
    q.correct_answer,
    ...q.incorrect_answers
  ])
  return {
    text: q.question,
    category: q.category,
    correctAnswer: answers.indexOf(q.correct_answer),
    difficulty: q.difficulty,
    answers
  }
}

export const getQuestions = amount =>
  axios.get(QUESTION_API_ENDPOINT, {params: { amount, difficulty: 'easy' }})
    .then(response => response.data.results.map(mapApiQuestionToAppQuestion))
