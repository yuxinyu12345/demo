<template>
  <div>
    <viewer  :images="images"
            @inited="inited"
            class="viewer" ref="viewer"
    >
        <img v-for="src in images" :src="src" :key="src" class="imagesSize">
    </viewer>
    <button type="button" @click="show">Show</button>
  </div>
</template>
<script>
  import 'viewerjs/dist/viewer.css'
  import { component as Viewer } from "v-viewer"
  export default {
    components: {
      Viewer
    },
    data() {
      return {
        images: [
          "https://picsum.photos/200/200",
          "https://picsum.photos/300/200",
          "https://picsum.photos/250/200"
        ]
      };
    },
    methods: {
      inited (viewer) {
        this.$viewer = viewer
      },
      show () {
        this.$viewer.show()
      }
    }
  }
</script>

<style scoped>
  .imagesSize {
    width: 60px;
    height: 60px;
  }
</style>