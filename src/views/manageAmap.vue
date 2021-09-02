<template>
  <div class="manageAmap">
    <div class="amap-wrapper">
      <el-amap
        vid="amapDemo"
        :map-style="mapStyle"
        :center="center"
        :zoom="zoom"
        :plugin="plugin"
        class="amap-demo"
      >
        <el-amap-marker
          v-for="(marker,index) in markers"
          :position="marker.position"
          :key="index"
          
        ></el-amap-marker>
        <!--圆点标记-->
        <el-amap-circle
          v-for="(circle,index) in circles"
          :key="index"
          :center="circle.center"
          :radius="circle.radius"
          :fill-opacity="circle.fillOpacity"
          :events="circle.events"
        ></el-amap-circle>
        <el-amap-info-window
          v-if="window"
          :position="window.position"
          :visible="window.visible"
          :offset="window.offset"
        >
          <div>
            <div v-html="window.content"></div>
            <button class="infoBtn" @click="toProjectMain(window.projectMain)">查看详情</button>
          </div>
        </el-amap-info-window>

        <el-amap-polygon
          :editable="polyline.editable"
          :path="polyline.path"
          :events="polyline.events"
          :fill-opacity="0"
          stroke-color="#24C2FF"
          fill-color="#24C2FF"
        ></el-amap-polygon>
        <el-amap-polygon
          :editable="polyline2.editable"
          :path="polyline2.path"
          :events="polyline2.events"
          :fill-opacity="0"
          stroke-color="#f00"
          fill-color="#24C2FF"
        ></el-amap-polygon>
        <el-amap-polygon
          :editable="polyline3.editable"
          :path="polyline3.path"
          :events="polyline3.events"
          :fill-opacity="0"
          stroke-color="#24C2FF"
          fill-color="#24C2FF"
        ></el-amap-polygon>
        <el-amap-polygon
          :editable="polyline4.editable"
          :path="polyline4.path"
          :events="polyline4.events"
          :fill-opacity="0"
          stroke-color="#24C2FF"
          fill-color="#24C2FF"
        ></el-amap-polygon>
      </el-amap>
    </div>
    <div class="pointFrame">
      <div class="pointLine">
        <div class="pointImg">
          <img src="../../assets/manage/point1.png" />
        </div>
        <div class="pointTxt">新开工</div>
      </div>
      <div class="pointLine">
        <div class="pointImg">
          <img src="../../assets/manage/point2.png" />
        </div>
        <div class="pointTxt">续建</div>
      </div>
      <div class="pointLine">
        <div class="pointImg">
          <img src="../../assets/manage/point3.png" />
        </div>
        <div class="pointTxt">竣工</div>
      </div>
      <div class="pointLine">
        <div class="pointImg">
          <img src="../../assets/manage/point4.png" />
        </div>
        <div class="pointTxt">预备</div>
      </div>
      <!--    <div class="pointLine">-->
      <!--      <div class="pointImg">-->
      <!--        <img src="../../assets/manage/point5.png" />-->
      <!--      </div>-->
      <!--      <div class="pointTxt">已验收</div>-->
      <!--    </div>-->
    </div>
  </div>
</template>

<script>
import { findTableMain, findTableMainId } from "../../api/index";
import { natureToIcon } from "../../libs/natureToIcon";
// import projectMain from "../../views/projectMain";
var coordinate = require("../../libs/coordinate");
var coordinate2 = require("../../libs/coordinate2");
var coordinate3 = require("../../libs/coordinate3");
var coordinate4 = require("../../libs/coordinate4");
import { EventBus } from "../../utils/event-bus";
export default {
  name: "manageAmap",
  data() {
    return {
      demoData: [
        {
          position: [111.196156, 23.429467],
        },
        {
          position: [111.235535, 23.432444],
        },
        {
          position: [111.258641, 23.434507],
        },
        
      ],
      center: [111.242378, 23.441007],
      zoom: 12,
      // mapStyle: "amap://styles/270ee58fd4794774d6ba40c80265dc14", //设置地图样式
      mapStyle: "",
      markers: [],
      windows: [],
      circles: [],
      window: "",
      projectId: "",
      plugin: [
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {},
        },
      ],
      polyline: {
        path: coordinate.path, //点击多边形点触发
        fillColor: "red",
        events: {
          click() {
            // alert('click polyline');
          },
          end: (e) => {
            let newPath = e.target
              .getPath()
              .map((point) => [point.lng, point.lat]);
            console.log(newPath);
          },
        },
        editable: false, //是否显示线路上的点
      },
      polyline2: {
        path: coordinate2.path, //点击多边形点触发
        events: {
          click() {
            // alert('click polyline2');
          },
          end: (e) => {
            let newPath = e.target
              .getPath()
              .map((point) => [point.lng, point.lat]);
            console.log(newPath);
          },
        },
        editable: false, //是否显示线路上的点
      },
      polyline3: {
        path: coordinate3.path, //点击多边形点触发
        events: {
          click() {
            // alert('click polyline3');
          },
          end: (e) => {
            let newPath = e.target
              .getPath()
              .map((point) => [point.lng, point.lat]);
          },
        },
        editable: false, //是否显示线路上的点
      },
      polyline4: {
        path: coordinate4.path, //点击多边形点触发
        events: {
          click() {
            // alert('click polyline3');
          },
          end: (e) => {
            let newPath = e.target
              .getPath()
              .map((point) => [point.lng, point.lat]);
          },
        },
        editable: false, //是否显示线路上的点
      },
    };
  },
  created() {},
  methods: {
    getLeftName() {
      EventBus.$on("listone", (res) => {
        console.log(res);
        let windows = [];
        windows.push({
          position: [res[0].projectLongitude, res[0].projectLatitude],
          content: ` <div  style="font-size: 0.8rem;color: gray;box-sizing: border-box;padding: 6% 6% 0% 6%;">
              <div style="font-size: 0.8rem;color: black;width: 100%;text-align: center;margin-top: 1vh;">${res[0].projectName}</div><br>
              <div style="color: #A2C1E0;margin-bottom: 0.3rem;">项目地址：${res[0].projectAddress}</div>
              <div style="color: #A2C1E0;margin-bottom: 0.3rem;">项目目前进度：${res[0].projectCurProgress}</div>
              <div style="color: #A2C1E0;">项目开始日期：${res[0].projectStart}</div>
              <br>
            </div>`,
          offset: [0, 0], //窗体偏移
          visible: false, //初始是否显示
          projectId: res[0].projectId,
          projectMain: res[0],
        });
        //加弹窗
        // this.windows.forEach(window => {
        //   window.visible = false; //关闭窗体
        //   // that.icon="";
        // });
        // console.log(this.windows);
        // console.log(this.window);
        // console.log(res[0].projectId);
        // res.forEach((item,inedex)=>{
        //
        // })
        for (let i = 0; i < this.windows.length; i++) {
          // console.log(res[0].projectId);
          // console.log(this.windows[i].projectId);
          if (res[0].projectId == this.windows[i].projectId) {
            this.window = this.windows[i];
            this.$nextTick(() => {
              this.window.visible = true; //点击点坐标，出现信息窗体
            });
          }
        }

        // this.windows=windows;
      });
    },
    //查看详情
    toProjectMain(data) {
      let that = this;
      that.$router.push({ path: "projectMain", query: { data: data } });
    },
    // toScreen(data){
    //   let that =this;
    //   console.log(data);
    //   // that.$router.push({path: "shuiLiItem", query: {projectId: data}});
    // },
    //获取点
    point() {
      let markers = [];
      let windows = [];
      let circles = [];
      let that = this;
      let pointType = [
        require("../../assets/amap/point1.png"),
        require("../../assets/amap/point2.png"),
        require("../../assets/amap/point3.png"),
        require("../../assets/amap/point4.png"),
      ];
      let sIcon = require("../../assets/sandImgs/sIcon.png");
      let bIcon = require("../../assets/sandImgs/bIcon.png");
      let pointMarker = [];
      findTableMain().then((res) => {
        // console.log(res);
        console.log("zwzzzzzz");
        let arrs = res.rows;
        let uniqueArr = [];
        for (let i = 0; i < arrs.length; i++) {
          let flag = true;
          for (let j = 0; j < uniqueArr.length; j++) {
            if (arrs[i].projectName == uniqueArr[j].projectName) {
              flag = false;
              break;
            }
          }
          if (flag) {
            uniqueArr.push(arrs[i]);
          }
        }
        for (let i = 0; i < uniqueArr.length; i++) {
          uniqueArr[i].projectCurProgress =
            uniqueArr[i].projectCurProgress + "%";
        }
        pointMarker = uniqueArr;
        // console.log(pointMarker);
        that.pointMarker = pointMarker;
        // console.log(uniqueArr);
        // console.log(11,pointMarker);
        pointMarker.forEach((item, index) => {
          this.markers.push({
            position: [item.projectLongitude, item.projectLatitude],
          })
          // console.log(item);
          markers.push({
            position: [item.projectLongitude, item.projectLatitude],
            // icon:pointType[Math.floor(Math.random()*4)],
            // icon:item.url, //不设置默认蓝色水滴
            // icon:"",
            // icon:pointType[3],
            // icon:sIcon,
            icon: natureToIcon(item.projectNature),
            // icon:require("../assets/manage/point1.png"),
            events: {
              click(e) {
                that.windows.forEach((window) => {
                  window.visible = false; //关闭窗体
                  // that.icon="";
                });
                that.window = that.windows[index];
                that.$nextTick(() => {
                  that.window.visible = true; //点击点坐标，出现信息窗体
                  // that.icon="";
                  // this.icon=bIcon;
                  that.projectId = item.projectId;
                  console.log(that.projectId);
                });
              },
            },
          });

          windows.push({
            position: [item.projectLongitude, item.projectLatitude],
            content: ` <div  style="font-size: 0.8rem;color: gray;box-sizing: border-box;padding: 6% 6% 0% 6%;">
              <div style="font-size: 0.8rem;color: black;width: 100%;text-align: center;margin-top: 1vh;">${item.projectName}</div><br>
              <div style="color: black;margin-bottom: 0.3rem;">项目地址：${item.projectAddress}</div>
              <div style="color: black;margin-bottom: 0.3rem;">项目目前进度：${item.projectCurProgress}</div>
              <div style="color:black;">项目开始日期：${item.projectStart}</div>
              <br>
            </div>`,
            offset: [0, 0], //窗体偏移
            visible: false, //初始是否显示
            projectId: item.projectId,
            projectMain: item,
          });
          circles.push({
            center: [item.projectLongitude, item.projectLatitude],
            radius: 300,
            fillOpacity: 0.5,
            events: {
              click: () => {
                // alert('click');
              },
            },
          });
        });
      });
      //  加点
      /* this.markers = markers; */
      /* this.markers.push(markers[0])  */
      console.log('markers',markers);
      console.log('isarr',Array.isArray(markers));
      console.log('shitt',markers.shift);
      console.log('typeof',typeof(markers));
      console.log('markers[0]',markers[0]);
      console.log("this.markers", this.markers);
      console.log('arrrrr',this.markers[0]);
      // console.log(windows);
      //加弹窗
      this.windows = windows;
      //加电子围栏
      this.circles = circles;
    },
  },
  created() {
    this.point();
  },
  mounted() {
    this.getLeftName();
  },
};
</script>

<style lang="scss" scoped>
.manageAmap {
  position: relative;
  width: 100%;
  height: 100%;
}
.amap-wrapper {
  width: 100%;
  height: 100%;
}
/deep/ .amap-icon img {
  max-width: 40px !important;
  height: auto;
}

/deep/ .amap-info-content .amap-info-outer {
}
/deep/ .amap-info-contentContainer {
}
.infoBtn {
  position: relative;
  border-style: none;
  color: white;
  background: #66a0ff;
  border-radius: 10%;
  padding: 3px 5px;
  outline: none;
  cursor: pointer;
  float: right;
  font-size: 0.8rem;
  margin-bottom: 1.3vh;
  margin-right: 0.5vw;
  opacity: 0.9;
}
/deep/ .amap-info-content {
  //background: none;
  position: relative;
  background: url("../../assets/riverImgs/info.png") !important;
  background-size: 100% 100% !important;
}

/deep/ .amap-info-outer,
/deep/ .amap-menu-outer {
  background: none;
  width: 115%;
  height: 160%;
}
/deep/ .amap-logo,
/deep/ .amap-copyright {
  display: none !important;
}
/*amap-info-content amap-info-outer*/

/deep/ .bottom-center /deep/.amap-info-sharp {
  border-style: none !important;
}
.pointFrame {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 5.5vw;
  min-height: 15vh;
  background: rgba(0, 0, 0, 0.7);
}
.pointLine {
  position: relative;
  width: 100%;
  min-height: 3vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  /*border:1px solid red;*/
  .pointImg {
    position: relative;
    min-height: 2.5vh;
    width: 2.5vh;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pointTxt {
    position: relative;
    width: 3.5vw;
    min-height: 1vh;
    color: #a2c1e0;
    font-size: 0.8rem;
    margin-left: 0.5vw;
  }
}
</style>
