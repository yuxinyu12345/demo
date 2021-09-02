<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="(item, index) in imgList" :key="index">
      <img :src="item.imgUrl" />
    </div>
    <div>
      <Render msg="Render Test" :level="3" :items="items">
        <div class="header">default header</div>
        <div class="header">default header</div>
        <p slot="header">slot header</p>
      </Render>
    </div>
    <div>
      <el-select v-model="value" filterable placeholder="请选择" class="input">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="box">
      <ul>
        <li>1111</li>
        <li>1111</li>
        <li>1111</li>
        <li>1111</li>
        <li>1111</li>
        <li>1111</li>
        <li>1111</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { reqSwipes } from "../api/mockDemo";
import Render from "../components/Render.vue";
export default {
  components: {
    Render,
  },
  data() {
    return {
      // imgList:[]
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
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
      value: "",
      items: [
        {
          name: "hello",
        },
        {
          name: "vue",
        },
        {
          name: "js",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      imgList: "lazyImg/imgList",
    }),
  },
  mounted() {
    // this.getImg()
    console.log("this.$attr1", this.$root);
  },
  methods: {
    /* async getImg() {
      const { data } = await reqSwipes()
      this.imgList = data
    } */
    loadingImg() {
      let imgArr = this.imgList;
    },
  },
};
</script>

<style scoped>
.input {
  width: 400px;
  height: 250px;
}

.box{
    width: 200px;
    height: 100px;
    overflow:hidden;
    border:1px solid #000;
    margin:50px auto;
}
ul {
    height: 100%;
    width: 120px;
    overflow-x: hidden;
    overflow-y: scroll;
} 
 
ul li{
    list-style: none;
    width: 100px;
    height:60px;
    line-height: 60px;
    text-align: center;
    border:1px solid #ccc;
    margin-top: -1px;
}


</style>