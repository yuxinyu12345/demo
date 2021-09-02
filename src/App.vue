<template>
  <div id="app">
    <!-- <router-link to="/about">About</router-link> -->
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {},
  data() {
    return {
      data: '2'
    }
  },
  mounted() {
    this.preload()
  },
  methods: {
    async toAbout() {
    },
    async preload() {
      let count = 0;
      let imgs;
      // imgs = [
      //   //用require的方式添加图片地址，直接添加图片地址的话，在build打包之后会查找不到图片，因为打包之后的图片名称会有一个加密的字符串
      //   require("../assets/img/pic@2x.png"),
      //   require("../assets/img/pic1@2x.png"),
      // ];
      await this.$store.dispatch("lazyImg/setImgList");
      imgs = this.$store.state.lazyImg.imgList
      for (let img of imgs) {
        let image = new Image();
        image.src = img.imgUrl;
        let that = this;
        image.onload = () => {
          count++;
        };
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
