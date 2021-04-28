<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p v-html="KeyRegExp('距离结束: 6天 12时 36分', '6')"></p>
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>

    <el-select v-model="xin" placeholder="请选择" @change="change">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <div v-html="html"></div>
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
import { reqSwipes, reqPatientByPid } from "@/api/mockDemo";
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
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
      options: [
        {
          value: 1,
          label: "黄金糕",
        },
        {
          value: 2,
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      xin: "选项1",
      html: ''
    };
  },
  mounted() {
    this.getSwipes();
    this.addScrollListener();
    this.getStringColorReplace();
    reqPatientByPid(1);
  },
  watch: {},
  methods: {
    change() {
      console.log(typeof this.xin);
      this.html = `<p style='color:red;'>${this.xin}</p>`
      console.log('value',this.xin);
    },
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
      console.log(clientHeight);
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style scoped>
.imgLazyLoading {
  margin-top: 3000px;
}
</style>