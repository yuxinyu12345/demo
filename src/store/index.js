import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

// 取出modules下面的js文件，false表示不用往下面的子文件继续寻找
const files = require.context('./modules', false, /\.js$/)
const modules = {}


// 这就是拿到导出文件下面default赋值到modules.lazyImg这个是我写的文件名，modules.lazyImg === modules['lazyImg']
files.keys().forEach((key) => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

// 这个把下面的每一个模块都填加Vuex的namespaced属性，这个namespace属性是解决Vuex下面模块state、getters、actions等属性的重名，所以我们在调用时候都需要带上前缀如...mapState([lazyImg/imgList])
Object.keys(modules).forEach((key) => {
  modules[key]['namespaced'] = true
})


// 这个就是把每一个模块导入到Vuex中去
const store = new Vuex.Store({
  modules,
})
export default store

