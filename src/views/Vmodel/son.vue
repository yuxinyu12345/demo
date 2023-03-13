<template>
  <div>
    {{ ceshi }}
  </div>
</template>

<script setup>

import { ref } from 'vue'

const ceshi = ref('ceshi1')

defineOptions({
  name: 'Foo',
  inheritAttrs: false,
})


</script>