<template>
  <el-select v-model="currentSelected"
             filterable
             remote
             clearable
             v-bind="$attrs"
             v-on="$listeners"
             :filter-method="fetchRequest"
             :loading="loading"
             @clear="clear"
             @visible-change="showAndHide"
             v-el-load-more="loadMore"
  >

    <el-option
        v-for="item in options"
        :key="item[optionskey]"
        :label="item[optionsLabel]"
        :value="item[optionsValue]"
    />
    <!-- 此处加载中的value可以随便设置，只要不与其他数据重复即可 -->
    <el-option v-if="!isLoaded" disabled label="加载中..." value="-10000"/>
  </el-select>
</template>

<script>
export default {
  name: "BaseElSelect",
  data() {
    return {
      keyword: "", // 存储关键字用
      loading: false
    };
  },
  props: {
    selected: {
      default: ""
    },
    // 列表数据
    options: {
      type: Array,
      default() {
        return []
      }
    },
    //  key
    optionskey: {
      type: String,
      default: 'value'
    },
    optionsLabel: {
      type: String,
      default: 'label'
    },
    optionsValue: {
      type: String,
      default: 'value'
    },
    // 调用页数的接口
    request: {
      type: Function,
      default: () => {}
    },
    // 传入的页码
    page: {
      type: [Number, String],
      default: 1
    },
    // 是否加载完成
    isLoaded: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    currentSelected: {
      get () {
        return this.selected
      },
      set (val) {
        this.$emit('update:selected', val)
      }
    },
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    }
  },
  methods: {
    async fetchRequest(params) {
      let currentParams = typeof params === "string"?{
        keyword: params
      }:params

      if(this.loading) return
      this.loading = true
      await this.request(currentParams)
      this.loading = false;
    },
    // 删除选中时，如果请求了关键字，则清除关键字再请求第一页的数据
    clear() {
      if (this.keyword) {
        this.keyword = "";
        this.currentPage = 1
        let payload = { keyword: this.keyword }
        this.fetchRequest(payload)
      }
    },
    showAndHide(val) {
      if(!val) {
        setTimeout(()=> {
          this.keyword = "";
          this.currentPage = 1
          this.fetchRequest({ keyword: this.keyword })
          // this.resetProjectQuery()
          // this.getProjectList()
        },200)
      }
    },
    loadMore() {
      // 如果没有更多数据，则不请求
      if (this.isLoaded) {
        return
      }
      this.currentPage += 1
      this.fetchRequest({
        page: this.currentPage,
        isLoaded: true,
        keyword: this.keyword
      })
    }
  }
}
</script>
