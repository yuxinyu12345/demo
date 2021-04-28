<template>
    <BaseElSelect
        :selected.sync="selected"
        :options="selectList"
        :page.sync="page"
        :isLoaded="isLoaded"
        :optionskey="'id'"
        :optionsLabel="'title'"
        :optionsValue="'id'"
        :request="getData"/>
</template>

<script>
  export default {
    name: "BaseElSelect",
    data() {
      return {
        selected: "",
        page: 1,
        pageSize: 10,
        isLoaded: true,
        selectList: []
      }
    },
    methods: {
      getData({ isLoaded = false, keyword = null } = {}) {
        let params = {
          title: keyword,
          type: 2,
          page: this.page,
          pageSize: this.pageSize
        }
        this.$fetch.api_news.getNewsList(params)
            .then(res => {
              if(res.success){
                if (isLoaded) {
                  this.selectList = [...this.selectList, ...res.data];
                } else {
                  this.selectList = res.data;
                }
                this.isLoaded = this.selectList.length >= res.total;
              }
            })
      },
    }
  }
</script>

<style scoped>

</style>
