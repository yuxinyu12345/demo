<template>
  <div class="son">
    <!-- 这里的v-bind="$attrs"是继承了其他各位的attribute(属性) -->
    <input v-bind="$attrs" :checked="value" @change="update">
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean
    }
  },
  methods: {
    update(e) {
      this.$emit('change', e.target.checked)
    }
  },
}
</script>