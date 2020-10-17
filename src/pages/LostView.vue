<template>
  <div class="has-text-centered box">
    <h1 class="title">Incorrect answer, you lost!</h1>
    <h2 class="subtitle" v-if="currentQuestion">
      Correct answer: {{ currentQuestion.answers[currentQuestion.correctAnswer] }}
    </h2>
    <hr>
    <div class="columns">
      <div class="column">
        <button class="button is-fullwidth" @click="$router.push({name: 'play'})">Try again</button>
      </div>
      <div class="column">
        <router-link
          :to="{name: 'intro'}"
          class="button is-fullwidth">
          Main menu
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuiz } from '../logic';

export default {
  setup() {
    const {currentQuestion} = useQuiz()
    return {currentQuestion}
  }
}
</script>
