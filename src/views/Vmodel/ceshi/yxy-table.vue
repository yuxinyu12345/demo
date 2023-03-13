<template>
  <div class="yxy-table">
    <div class="hidden-columns">
      <slot></slot>
    </div>
    <div class="header">
      <div class="sequence">序列</div>
      <div v-for="item in columnList" :key="item.columnId"
        :style="{ width: item.originWidth + '%', textAlign: item.textAlign }">{{
          item.label }}</div>
    </div>
    <yxy-table-body :scrollOption="scrollOption"/>
  </div>
</template>
<script>
import YxyTableBody  from "./yxy-table-body";

export default {
  components: {
    YxyTableBody
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    scrollOption: {
      type: Object,
      default: () => ({
        singleHeight: 50,
        waitTime: 3000
      })
    }
  },
  data() {
    return {
      columnList: []
    }
  },
}
</script>
<style>
.yxy-table {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.header {
  width: 100%;
  display: flex;
  font-family: "思源黑体 CN-Regular";
  font-size: 14px;
}

.sequence {
  width: 5%;
  text-align: center;
}

.id {
  height: 50px;
  text-align: center;
  line-height: 50px;
  background-image: url(https://saas-engine.oss-cn-hangzhou.aliyuncs.com/project-seawall/image/kaihua/smart-construction/images/center-circle.png);
  background-repeat: no-repeat;
  background-size: 30px 30px;
  background-position: center;
}

.main {
  width: 100%;
  overflow: hidden;
}

.hidden-columns {
  display: none;
}

.table-item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  display: flex;
}
</style>