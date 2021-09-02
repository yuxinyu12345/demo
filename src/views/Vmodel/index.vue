<template>
  <div>
    <input type="text" v-myModel.number="value" />
    {{ value }}
    <input type="checkbox" v-myModel="checked">
    {{checked}}
  </div>
</template>

<script>
export default {
  directives: {
    myModel: {
      inserted(el, binding, vnode) {
        if ((typeof binding.value) == 'undefined') {
          return console.error('v-myModel未赋值')
        }
        // 这里是获取input上type属性值
        const type = vnode.data.attrs.type
        const numberModifiers = binding.modifiers.number
        let event = ''
        let targetValue = ''
        // 就是不同的类型有对应的事件和事件下获得的值
        switch (type) {
          case 'text':
            event = 'input'
            targetValue = 'value'
            break;
          case 'textarea':
            event = 'input'
            targetValue = 'value'
            break;
          case 'checkbox':
            event = 'change'
            targetValue = 'checked'
            break;
          case 'radio':
            event = 'change'
            targetValue = 'checked'
            break;
          case 'select':
            event = 'change'
            targetValue = 'value'
            break;

        }
        // binding.value就是给v-myModel的值,这里为1和false给页面渲染使用
        el.value = binding.value
        // 这里的监听就是给组件上的data赋值
        el.addEventListener(event, (e) => {
          vnode.context[binding.expression] = e.target[targetValue]
        })
      },
    }
  },
  data() {
    return {
      value: '1',
      checked: false
    }
  },
  mounted() {
    console.log('window', window)
  },
}
</script>

<style>
</style>