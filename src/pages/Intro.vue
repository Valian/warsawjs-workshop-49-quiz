<template>
    <div class="column is-offset-4 is-4 box has-text-centered">
      <h1 class="title">Who Wants To Be a Milionaire?</h1>
      <div>
        <img src="/logo.png">
      </div>
      <start-game-button class="is-fullwidth">PLAY</start-game-button>
    </div>
</template>

<script>
import StartGameButton from '../components/StartGameButton.vue';

export default {
  components: {
    StartGameButton
  }
}
</script>