<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p v-html="KeyRegExp('距离结束: 6天 12时 36分', '6')"></p>
    <img
      alt="图片懒加载"
      :src="isLoadStart ? src : ''"
      class="imgLazyLoading"
      ref="imgLazyLoading"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { reqSwipes } from "@/api/mockDemo";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      src: "",
      isLoadStart: false,
      overTime: "距离结束: 6天 12时 36分",
    };
  },
  mounted() {
    this.getSwipes();
    this.addScrollListener();
    this.getStringColorReplace();
  },
  watch: {},
  methods: {
    async getSwipes() {
      const res = await reqSwipes();
      this.src = res.data[0].imgUrl;
      console.log(res);
      // this.$store.dispatch('setImgList')
    },
    // 懒加载有一个缺点，就是它会反弹，如何处理
    checkLazyLoad() {
      // 这个元素的顶部 距离 父元素的顶端距离
      let toTop = this.$refs.imgLazyLoading.offsetTop;
      // 用户看的的整个页面的height
      let clientHeight = document.documentElement.clientHeight;
      // 轮滑当前界面上最顶部的节点距离窗口顶端的距离
      let scorllTop = document.documentElement.scrollTop;
      if (toTop - scorllTop - clientHeight <= 500) {
        this.isLoadStart = true;
        document.removeEventListener("scroll", this.checkLazyLoad);
      }
      
    },
    addScrollListener() {
      // 这个监听是有三个参数，第三个具体是干嘛的
      document.addEventListener("scroll", this.checkLazyLoad);
    },
    getStringColorReplace: function () {
      //假设使用固定的文本，可后台接收
      var show_text = this.overTime;
      var replace_text = ["6", "12", "36"];
      var color_dict = {
        6: "rgb(76,142,218)",
        12: "rgb(76,142,218)",
        36: "rgb(76,142,218)",
      };
      for (var i = 0; i < replace_text.length; i++) {
        var color_temp = color_dict[replace_text[i]];
        var replaceString =
          '<span style="color: ' +
          color_temp +
          ';">' +
          replace_text[i] +
          "</span>";
        show_text = show_text.replace(
          RegExp(replace_text[i], "g"),
          replaceString
        );
      }
      this.overTime = show_text;
    },
    KeyRegExp: function (val, keyword) {
      val = val + "";
      if (val.indexOf(keyword) !== -1 && keyword !== "") {
        return val.replace(
          keyword,
          '<font color="#f00">' + keyword + "</font>"
        );
      } else {
        return val;
      }
    },
  },
};
</script>

<style scoped>
.imgLazyLoading {
  margin-top: 3000px;
}
</style>