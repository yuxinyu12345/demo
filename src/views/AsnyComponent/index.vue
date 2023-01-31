<template>
  <div class="father">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      custom-class="test"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {
    component1: () => import("./component1.vue"),
  },
  updated() {
    console.log("master --- commit");
    console.log("father --- updated");
  },
  data() {
    return {
      show: false,
      text: "pppp",
      dialogVisible: true
    };
  },
};
</script>

<style >
.test {
  border-radius: 100px;
}
</style>
