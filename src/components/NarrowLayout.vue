<template>
  <div class="columns">
    <router-view class="column is-4 is-offset-4" v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
