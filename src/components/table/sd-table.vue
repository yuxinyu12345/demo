<template>
 
  <div class="sd-table"
       :class="[{
            'sd-table--border': border
        }]"
       :style="tableStyle">
    <!-- 隐藏列 -->
    <div class="hidden-columns"><slot></slot></div>
    <div class="pos-relative">
      <div class="header-warp" :ref="headRef">
        <sd-table-head class="sd-table-head" :store="store"></sd-table-head>
      </div>
      <!-- 遮挡竖直滚动条 -->
      <div class="hiddenBlock"></div>
    </div>
<!--    <div v-loading="loadingFlag" class="pos-relative" :class="textAlign">-->
    <div  class="pos-relative" :class="textAlign">
      <div :style="bodyWrapperStyle" class="body-wrap" :ref="bodyRef" @scroll="handleScroll">
        <sd-table-body :store="store"></sd-table-body>
      </div>
      <div class="noData flex-midcenter" v-show="!data.length">暂无数据</div>
    </div>
  </div>
</template>
 
<script>
import SdTableStore from "./sd-table-store";
import SdTableHead  from "./sd-table-head";
import SdTableBody  from "./sd-table-body";
import {calcColumnWidth} from './util';
let tableIdSeed = 0 ;
export default {
  name: "sd-table",
  data () {
    return {
      store: null,
      curPage: 1,
      allPages: 0,
      bodyWrapperStyle: {
        height: this.height+'px',
        'text-align': this.align,
        overflow: 'auto'
      },
      loadingFlag: true,
      tableStyle: {
        width: this.width
      },
      fixedHeight: 1,
      tableData: [],
      selectRowData:[],
      isSelectedAll:false,
      order:'asc',
    }
  },
  computed: {
    tableId () {
      return 'tableId-' + (tableIdSeed++)
    },
    bodyRef () {
      return 'tableBody-' + tableIdSeed
    },
    tBody () {
      return this.$refs[this.bodyRef]
    },
    headRef () {
      return 'tableHead-' + tableIdSeed
    },
    tHead () {
      return this.$refs[this.headRef]
    },
    'textAlign' () {
      return 'align-' + this.align
    }
  },
  components:{
    SdTableHead,
    SdTableBody,
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    width: {
      type: String,
      default: '100%'
    },
    total: {
      type: [Number, String],
      default: 0
    },
    align: {
      type: String,
      default: 'center'
    },
    height: {
      type: String,
      default: '300'
    },
    border: Boolean,
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    initData () {
      this.curPage = 1
      this.tableData = []
      this.allPages = Math.ceil(parseInt(this.total) / this.data.length)
      //this.tBody.scrollTop = 0
    },
    handleScroll (e) {
 
      this.tHead.scrollLeft = this.tBody.scrollLeft
      // fixedHeight修正由水平滚动条带来的高度计算误差
      if ((this.tBody.scrollTop + this.tBody.clientHeight + this.fixedHeight >= this.tBody.scrollHeight) && (this.curPage < this.allPages)) {
        this.loadingFlag = true
        this.$emit('loadMore', ++this.curPage)
      }
    },
    toggleRowSelection(rows){
      // 交集
      this.tableData.forEach((item)=>{
        rows.forEach((itm)=>{
          if(item == itm){
            this.$set(item,"$checked",true);
          }
        })
      })
      this.selectRowData = rows ;
      console.log(this.selectRowData) ;
    },
    clearSelection(){
      this.selectRowData = [] ;
      this.isSelectedAll = false;
      this.tableData.forEach((item)=>{
        this.$set(item,"$checked",false);
      })
    },
    doLayout () {
      calcColumnWidth(this.store.columns, this)
    }
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler (n, o) {
        this.loadingFlag = false
        if (this.currentPage === 1) {
          this.initData()
        }
        this.tableData = [...this.tableData, ...n]
      }
    }
  },
  created () {
    let store = new SdTableStore(this.tableId)
    this.store = store;
  },
  mounted () {
    if (!this.data.length) {
      this.loadingFlag = false
    }
 
    let self = this;
    self.doLayout()
    window.addEventListener('resize', function () {
      self.doLayout()
    })
  },
}
</script>
 
<style>
 
.sd-table{
  width: 100%;
  padding: 5px 20px 5px 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.sd-table .header-warp{
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 12px;
  padding: 10px 0 10px 0;
}
 
.body-wrap {
  position: relative;
}
 
 
.sd-table-tr{
  height: 60px;
  background-color: white;
  border-top: 1px solid #eeeeee;
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: border-color .3s,background-color .3s,color .3s;
  flex-shrink: 0;
}
 
 
.sd-table-tr:hover{
  padding: 0 0 0 0;
  background-color: #e8f8f7;
}
 
/**当选中，item背景状态**/
.sd-table-tr-choose{
  padding: 0 0 0 0;
  background-color: #e8f8f7 !important;
}
 
.checkboxshow{
  visibility:visible !important;
}
 
.sd-table .item input[type=checkbox]{
  visibility:visible;
}
 
.sd-table .item:hover .share{
  display: block;
}
 
 
.sd-table .item:hover .itesd-time>span{
  display: none;
}
 
 
.hiddenBlock {
  position: absolute;
  background: #fff;
  width: 25px;
  height: calc(100% - 1px);
  top: 0;
  right: 0;
  border-bottom: 1px solid #ebeef5;
}
 
 
.forbidden-child-pointer-events >* {
  pointer-events: none;
}
 
 
 
 
.sd-table .caret-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 34px;
  width: 24px;
  vertical-align: middle;
  overflow: initial;
  position: relative;
}
.sort-caret.ascending {
  border-bottom-color: #c0c4cc;
  top: 5px;
}
.sort-caret-ascending {
  border-bottom-color: #409eff;
}
 
.sort-caret.descending {
  border-top-color: #409eff;
}
.sort-caret.descending {
  border-top-color: #c0c4cc;
  bottom: 7px;
}
 
 .sort-caret {
  width: 0;
  height: 0;
  border: 5px solid transparent;
  position: absolute;
  left: 7px;
}
 
 
</style>