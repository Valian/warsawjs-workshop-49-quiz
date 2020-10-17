<template>
    <button
      class="button"
      :disabled="tryAgainLoading"
      @click="tryAgain">
      <o-loading :loading="tryAgainLoading">
        {{ label }}
      </o-loading>
    </button>
</template>

<script>
import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      label: {
        type: String,
        default: 'Start game'
      }
    },
    loading: ['tryAgain'],
    methods: {
      tryAgain () {
        return this.$store.dispatch('initGame')
          .then(() => this.$router.push({name: 'play'}))
      }
    }
  })
</script>
