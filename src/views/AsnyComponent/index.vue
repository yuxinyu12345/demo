<template>
  <div class="father">
    <button @click="show = !show">异步组件</button>
    <component v-if="show"></component>
  </div>
</template>

<script>
export default {
  components: {
    'component': () => import('./component.vue')
  },
  data() {
    return {
      show: false
    }
  },
}
</script>

<style>

</style>