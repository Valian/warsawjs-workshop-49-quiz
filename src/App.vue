<template>
  <h3>Hello Vue i Vite!</h3>
  <hello-world></hello-world>
  <div class="item">{{name}}</div>
  <div class="item">{{street}}</div>
  <div class="item">{{country}}</div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      name: '',
      street: '',
      country: ''
    }
  }
}
</script>

<style scoped>
.item {
  margin: 10px;
}
</style>