<template>
  <div class="table">
    <!-- 这个handleSelectionChange可以拿到选择的项 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="日期" width="120">
        <!-- 这个template应该是害怕prop绑定的数据与其他数据发生了冲突 -->
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="test1" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="test2" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="test3" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="test4" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="test5" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <!-- 这个template应该是害怕prop绑定的数据与其他数据发生了冲突 -->
        <template slot-scope="scope">
         <el-button type="primary" @click="confirm(scope)">确认</el-button>
         <el-button type="primary" @click="confirm(scope)">修改</el-button>
         <el-button type="primary" @click="confirm(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 删除数据 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <p>是否确认删除数据</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="deletedata"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqTableData } from "@/api/mockDemo";
export default {
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      const res = await reqTableData();
      console.log(res);
      this.tableData = res;
    },
    handleSelectionChange(val){
      console.log(val);
    },
    confirm(val) {
      console.log(val);
    },
    deletedata() {
      this.dialogFormVisible = false
      
    }
  },
};
</script>

<style>
</style>