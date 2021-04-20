import { reqSwipes } from '@/api/mockDemo'

const state = () => ({
  imgList: []
})
const mutations =  {
  SET_IMGLIST(state, data) {
    state.imgList = data
  }
}
  /* 
    这里actions也是可以拿到state的，但是因为actions执行的是异步代码，他是使用promise.all来进行全部的请求，由于请求回来的数据是不知道谁快的，所以会导致数据的错误性。
    还有就是commit里面有一个this._committing, Vue组件会对state做了监听，这个监听就是来判断参数是不是为true，如果不是就会产生出异常。
  */
const actions = {
  async setImgList({commit}) {
    const res = await reqSwipes()
    const data = res?.data
    commit('SET_IMGLIST', data)
  }
}

const getters = {
  imgList: (state) => state.imgList
}

export default { state, mutations, actions, getters}