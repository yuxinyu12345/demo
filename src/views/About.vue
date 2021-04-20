<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div v-for="(item,index) in imgList" :key="index">
      <img :src="item.imgUrl" />
    </div>
    <div>
      按附件
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { reqSwipes } from '../api/mockDemo'
export default {
  data() {
    return {
      // imgList:[]
    }
  },
  computed: {
    ...mapGetters({
      imgList: 'lazyImg/imgList'
    })
  },
  mounted() {
    // this.getImg()
  },
  methods: {
    /* async getImg() {
      const { data } = await reqSwipes()
      this.imgList = data
    } */
    loadingImg() {
      let imgArr = this.imgList
    }
  }
}
</script>
