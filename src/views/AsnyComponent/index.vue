<template>
  <div class="father">
    <button @click="show = !show">异步组件</button>
    <button @click="text = 'qqqqq'">点击改变</button>
    {{text}}
    <component1 v-if="show"></component1>
  </div>
</template>

<script>
export default {
  components: {
    'component1': () => import('./component1.vue')
  },
  updated() {
    console.log('master --- commit')
    console.log('father --- updated')
  },
  data() {
    return {
      show: false,
      text: 'pppp'
    }
  },
}
</script>

<style>

</style>