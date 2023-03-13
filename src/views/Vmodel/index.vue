<template>
  <div>
    <sd-table :data="tableData" ref="sdTable" :width="'800'" :height="'500'" :total="1000" :current-page="currentPage"
      @selection-change="handleSelectionChange" @loadMore='loadMore'>
      <sd-table-column type="selection" width="20">
      </sd-table-column>
      <sd-table-column label="姓名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </sd-table-column>
      <sd-table-column prop="name" label="姓名" width="600" sortable></sd-table-column>
      <sd-table-column prop="date" label="日期" width="200" sortable></sd-table-column>
      <sd-table-column prop="address" label="地址"></sd-table-column>
    </sd-table>
    <button style="width: 100px;height: 50px" @click="add">添加数据</button>
    <button style="width: 100px;height: 50px" @click="figureChoose">指定选择</button>
    <button style="width: 100px;height: 50px" @click="cancel">取消选择</button>

    <yxy-table :data="tableData" style="width: 600px; height: 300px;">
      <yxy-table-column label="姓名" width="15">
        <template slot-scope="scope">
          <div>{{ scope.row.name }}</div>
        </template>
      </yxy-table-column>
      <yxy-table-column prop="date" label="日期" width="25"></yxy-table-column>
      <yxy-table-column prop="address" label="地址" width="60"></yxy-table-column>
    </yxy-table>
  </div>
</template>
   
<script>
import SdTable from "@/components/table/sd-table";
import SdTableColumn from "@/components/table/sd-table-column";

import yxyTable from "./ceshi/yxy-table.vue";
import yxyTableColumn from "./ceshi/yxy-table-column";
export default {
  name: "test-table",
  components: { SdTableColumn, SdTable, yxyTable, yxyTableColumn },
  data() {
    return {
      tableData: [
        {
          no: 0,
          date: "2022-01-01",
          name: "徐凤年",
          address: "北凉国",
        },
        {
          no: 1,
          date: "2022-01-02",
          name: "姜泥",
          address: "楚国1",
        },
        {
          no: 2,
          date: "2022-01-03",
          name: "王仙芝",
          address: "武帝城",
        },
        {
          no: 3,
          date: "2022-01-04",
          name: "李淳罡",
          address: "剑仙一键开天门",
        },
        {
          no: 0,
          date: "2022-01-01",
          name: "徐凤年",
          address: "北凉国",
        },
        {
          no: 1,
          date: "2022-01-02",
          name: "姜泥",
          address: "楚国1",
        },
        {
          no: 2,
          date: "2022-01-03",
          name: "王仙芝",
          address: "武帝城",
        },
        {
          no: 3,
          date: "2022-01-04",
          name: "李淳罡",
          address: "剑仙一键开天门",
        }
      ],
      currentPage: 1,
    }
  }, methods: {
    add() {
      let one = {
        no: 5,
        date: "2022-01-05",
        name: "呵呵姑娘",
        address: "不详",
      };
      this.tableData.push(one);
    },
    figureChoose() {
      this.$refs.sdTable.toggleRowSelection([this.tableData[1], this.tableData[2]])
    },
    handleSelectionChange(val) {
      console.log("handleSelectionChange", val);
    },
    cancel() {
      this.$refs.sdTable.clearSelection();
      console.log("cancel");
    }, loadMore(val) {
      console.log(val);
      this.currentPage = val;
    }
  }
}
</script>
   
<style scoped></style>