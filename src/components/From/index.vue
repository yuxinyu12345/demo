<template>
  <div class="from">
    <!-- 刚好可以来练习v-model的实现, 这种写法好像没啥意义，要么就是吧整个diglog 给搬过来 -->
    <el-input :value='value' @input="updataInput"  autocomplete="off" class="width"></el-input>
  </div>
</template>

<script>
export default {
  props:{
    value: String
  },
  methods: {
    updataInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>

</style>