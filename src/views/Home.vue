<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { reqSwipes } from '@/api/mockDemo'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    this.getSwipes()
  },
  methods: {
    async getSwipes() {
      const res = await reqSwipes()
      console.log(res);
    }
  }
}
</script>
