<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <img alt="图片懒加载" :src="isLoadStart?src:''" class="imgLazyLoading" ref="imgLazyLoading"/>
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
  data() {
    return {
      src: '',
      isLoadStart: false
    }
  },
  mounted() {
    this.getSwipes()
    this.addScrollListener()
  },
  watch: {
    
  },
  methods: {
    async getSwipes() {
      const res = await reqSwipes()
      this.src = res.data[0].imgUrl
      console.log(res);
      // this.$store.dispatch('setImgList')
    },
    // 懒加载有一个缺点，就是它会反弹，如何处理
    checkLazyLoad() {
      // 这个元素的顶部 距离 父元素的顶端距离
      let toTop = this.$refs.imgLazyLoading.offsetTop 
      // 用户看的的整个页面的height
      let clientHeight = document.documentElement.clientHeight
      // 轮滑当前界面上最顶部的节点距离窗口顶端的距离
      let scorllTop = document.documentElement.scrollTop
      if(toTop - scorllTop - clientHeight <= 500) {
        this.isLoadStart = true
        document.removeEventListener('scroll', this.checkLazyLoad)
      }
    },
    addScrollListener() {
      // 这个监听是有三个参数，第三个具体是干嘛的
      document.addEventListener('scroll', this.checkLazyLoad)
    }
  }
}
</script>

<style scoped>
.imgLazyLoading {
  margin-top: 3000px;
}
</style>