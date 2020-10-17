<template>
  <div class="o-vertical-fill has-text-centered box">
    <h1 class="title o-vertical-fill__item">Congratulations, you won!</h1>
    <h1 class="title o-vertical-fill__item">Your reward: {{ currentQuestion.reward }}</h1>
    <hr>
    <div class="columns">
      <div class="column">
        <button class="button is-fullwidth" @click="$router.push({name: 'play'})">Play again</button>
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
import {useQuiz} from '../logic';

export default {
  setup() {
    const {currentQuestion} = useQuiz()
    return {currentQuestion}
  }
}
</script>
