<template>
<div class="nationlHBSSJK">
  <div class="map-top">
    <h3 class="map-title">公安部出入境旅客检测体系</h3>
    <ul class="map-tabul">
      <li class="map-tabli mr-30 hand" :class="{'check-tab':tabId==1}" @click="tabId=1">
        <img src="../../../assets/img/qgjk/tab1_1.png" alt="" v-if="tabId==1">
        <img src="../../../assets/img/qgjk/tab1_0.png" alt="" v-else>
        <span>口岸监控</span>
      </li>
      <li class="map-tabli mr-30 hand" :class="{'check-tab':tabId==2}" @click="tabId=2">
        <img src="../../../assets/img/qgjk/tab2_1.png" alt="" v-if="tabId==2">
        <img src="../../../assets/img/qgjk/tab2_0.png" alt="" v-else>
        <span>航班监控</span>
      </li>
      <li class="map-tabli hand" :class="{'check-tab':tabId==3}" @click="tabId=3">
        <img src="../../../assets/img/qgjk/tab3_1.png" alt="" v-if="tabId==3">
        <img src="../../../assets/img/qgjk/tab3_0.png" alt="" v-else>
        <span>人员监控</span>
      </li>
    </ul>
  </div>
  <transition name="el-zoom-in-left">
    <div class="left-list" v-if="showLeft">
      <img src="../../../assets/img/qgjk/list1.png" alt="" @click="showLeft=false">
    </div>
  </transition>
  <transition name="el-zoom-in-left">
    <div class="left-box" v-if="!showLeft">
      <div class="left-box1 mb-6">
        <div class="box-title">
          <div class="title-top"></div>
          <div class="title-text">
            全国航班统计
          </div>
          <div class="title-down" @click="showLeft=true">
            收起
          </div>
        </div>
        <div class="box-content">
          <div class="content-top mb-6">
            当日航班数量统计
          </div>
          <div class="content-middle">
            <ul class="middleUl">
              <li class="middleLi content-middle-head">
                <div class="td1">

                </div>
                <div class="td2">
                  入境
                </div>
                <div class="td3">
                  出境
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  计划
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td3">
                  2880
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  预检
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td3">
                  2880
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  取消
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td3">
                  2880
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  重点
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td3">
                  2880
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  延误
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td3">
                  2880
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  实际
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td3">
                  2880
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="left-box1">
          <div class="box-title">
            <div class="title-top o-title"></div>
            <div class="title-text">
              口岸航班统计
            </div>
            <div class="title-down" @click="showLeft=true">
              收起
            </div>
          </div>
          <div class="box-content">
            <div class="content-middle">
              <ul class="middleUl">
                <li class="middleLi2 content-middle-head2">
                  <div class="td1">

                  </div>
                  <div class="td2">
                    入境
                  </div>
                  <div class="td2">
                    出境
                  </div>
                  <div class="td2">
                    入境
                  </div>
                  <div class="td2">
                    出境
                  </div>
                  <div class="td2">
                    入境
                  </div>
                  <div class="td2">
                    出境
                  </div>
                </li>
                <li class="middleLi2">
                  <div class="td1">
                    北京
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                </li>
                <li class="middleLi2">
                  <div class="td1">
                    北京
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                </li>
                <li class="middleLi2">
                  <div class="td1">
                    北京
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                </li>
                <li class="middleLi2">
                  <div class="td1">
                    北京
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                </li>
                <li class="middleLi2">
                  <div class="td1">
                    北京
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                </li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  </transition>
  <transition name="el-zoom-in-right">
    <div class="right-list" v-show="showRight">
      <img src="../../../assets/img/qgjk/list2.png" alt="" @click="showRight=false">
    </div>
  </transition>
  <transition name="el-zoom-in-right">
    <div class="right-box" v-show="!showRight">
      <div class="left-box1 mb-6">
        <div class="box-title">
          <div class="title-top b-title"></div>
          <div class="title-text">
            全国人员统计
          </div>
          <div class="title-down" @click="showRight=true">
            收起
          </div>
        </div>
        <div class="box-content">
          <div class="content-top mb-6">
            当日人员概况
          </div>
          <div class="content-middle">
            <ul class="middleUl">
              <li class="middleLi3 content-middle-head3">
                <div class="td1">

                </div>
                <div class="td2">
                  入境
                </div>
                <div class="td2">
                  出境
                </div>
                <div class="td2">
                  过境
                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  计划
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  预检
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  取消
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
      <div class="left-box1">
          <div class="box-title">
            <div class="title-top g-title"></div>
            <div class="title-text">
              口岸人员统计
            </div>
            <div class="title-down" @click="showRight=true">
              收起
            </div>
          </div>
          <div class="box-content">
            <div class="content-middle">
              <ul class="middleUl">
                <li class="middleLi4 content-middle-head4">
                  <div class="td1">

                  </div>
                  <div class="td2">
                    内地
                  </div>
                  <div class="td2">
                    港澳台
                  </div>
                  <div class="td2">
                    外国人
                  </div>
                  <div class="td2">
                    合计
                  </div>
                  <div class="td2">
                    命中
                  </div>
                </li>
                <li class="middleLi4">
                  <div class="td1">
                    北京
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                </li>
                <li class="middleLi4">
                  <div class="td1">
                    北京
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>

                </li>
                <li class="middleLi4">
                  <div class="td1">
                    北京
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                </li>
                <li class="middleLi4">
                  <div class="td1">
                    北京
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                </li>
                <li class="middleLi4">
                  <div class="td1">
                    北京
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                  <div class="td2">
                    4000
                  </div>
                </li>
              </ul>
            </div>
          </div>
      </div>
    </div>
  </transition>
  <transition name="el-zoom-in-top">
    <div class="tan-box" v-show="tabId==1">
    <span class="top-left"></span>
    <span class="top-right"></span>
    <span class="down-left"></span>
    <span class="down-right"></span>

    <div class="tan-row1 mb-20">
      <div class="tan-row-text mr-20">
        出入类型
      </div>
      <div class="tan-right">
        <el-radio v-model="crType" label="0" class="mr-15">全部</el-radio>
        <el-radio v-model="crType" label="1" class="mr-15">入境</el-radio>
        <el-radio v-model="crType" label="2">出境</el-radio>
      </div>
    </div>
    <div class="tan-row2 mb-20">
      <div class="tan-row-text">
        境内口岸
      </div>
      <div class="tan-content">
        <el-row >

        </el-row>
      </div>
    </div>
    <div class="tan-row2">
      <div class="tan-row-text">
        境外口岸
      </div>
    </div>
  </div>
  </transition>
  <transition name="el-zoom-in-top">
    <div class="tan-box" v-show="tabId==2">
    <span class="top-left"></span>
    <span class="top-right"></span>
    <span class="down-left"></span>
    <span class="down-right"></span>
    <div class="tan-row2">
      <div class="tan-row-text">
        境外口岸
      </div>
    </div>
  </div>
  </transition>

  <transition name="el-zoom-in-top">
    <div class="tan-box" v-show="tabId==3">
    <span class="top-left"></span>
    <span class="top-right"></span>
    <span class="down-left"></span>
    <span class="down-right"></span>
    <div class="tan-row2">
      <div class="tan-row-text">
        航班筛选条件
      </div>
    </div>
  </div>
  </transition>
  <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart" class="canvas"></div>
</div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/world.js';

export default {
  name: "echarts",
  props: {
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "700px"
    }
  },
  data() {
    return {
      tabId:0,
      crType:"0",
      title: "图表",
      placeholder: "用户名/电话",
      showLeft:true,
      showRight:true,
      find: "2", //1显示新增按钮，2显示导入按钮，若不显示这两个按钮可以写0或者不写值
      chart: null,
      geoCoordMap: {
        '南宁': [108.479, 23.1152],
        '广州': [113.5107, 23.2196],
        '重庆': [107.7539, 30.1904],
        '芬兰': [24.909912, 60.169095],
        '美国': [-100.696295, 33.679979],
        '日本': [139.710164, 35.706962],
        '韩国': [126.979208, 37.53875],
        '瑞士': [7.445147, 46.956241],
        '东南亚': [117.53244, 5.300343],
        '澳大利亚': [135.193845, -25.304039],
        '德国': [13.402393, 52.518569],
        '英国': [-0.126608, 51.208425],
        '加拿大': [-102.646409, 59.994255]
      },
      // 重庆
      CQData: [
        [{
          name: '重庆'
        }, {
          name: "芬兰",
          value: 30
        }],
        [{
          name: '重庆'
        }, {
          name: "德国",
          value: 90
        }],
        [{
          name: '重庆'
        }, {
          name: "英国",
          value: 30
        }],
        [{
          name: '重庆'
        }, {
          name: "韩国",
          value: 30
        }]
      ],

      // 广州
      GZData: [
        [{
          name: '广州'
        }, {
          name: "日本",
          value: 30
        }],
        [{
          name: '广州'
        }, {
          name: "东南亚",
          value: 30
        }]
      ],

      // 南宁
      NNData: [
        [{
          name: '南宁'
        }, {
          name: "加拿大",
          value: 30
        }],
        [{
          name: '南宁'
        }, {
          name: "美国",
          value: 100
        }],
        [{
          name: '南宁'
        }, {
          name: "澳大利亚",
          value: 95
        }],
        [{
          name: '南宁'
        }, {
          name: "瑞士",
          value: 30
        }]
      ],
      planePath: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
      color: ['#10fb46', '#dcbf71'], // 自定义图中要用到的颜色
      series:[], // 用来存储地图数据
    };
  },

  mounted() {
    this.fn();
    // this.chinaConfigure();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    ff(){
      alert(this.showLeft)
    },
    //搜索回调
    searchItem(val) {
      console.log(val)
    },
    //新增回调
    addNew(val) {
      console.log(val)
    },
    //导入
    leadingItem(val) {
      console.log(val)
    },
    // 获取地图中起点和终点的坐标，以数组形式保存下来
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = this.geoCoordMap[dataItem[1].name];
        var toCoord = this.geoCoordMap[dataItem[0].name];
        if (fromCoord && toCoord) {
          res.push([{
            coord: fromCoord // 起点坐标
          }, {
            coord: toCoord // 终点坐标
          }])
        }
      }
      return res;
    },
    fn(){
      /*
      图中一共用到三种效果，分别为航线特效图、飞机航线图以及城市图标涟漪图。
      要用到setOption中的series属性，并且对每个城市都要进行三次设置。
  */
    let that=this;
      [
        ['重庆',this.CQData],
        ['广州', this.GZData],
        ['南宁', this.NNData]
      ].forEach(function(item, i) {
        that.series.push({
          // 白色航线特效图
          type: 'lines',
          zlevel: 1, // 用于分层，z-index的效果
          effect: {
            show: true, // 动效是否显示
            period: 6, // 特效动画时间
            trailLength: 0.7, // 特效尾迹的长度
            color: '#fff', // 特效颜色
            symbolSize: 3 // 特效大小
          },
          lineStyle: {
            normal: { // 正常情况下的线条样式
              color: that.color[0],
              width: 0, // 因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
              curveness: -0.2 // 线条曲度
            }
          },
          data: that.convertData(item[1]) // 特效的起始、终点位置
        }, { // 小飞机航线效果
          type: 'lines',
          zlevel: 2,
          //symbol: ['none', 'arrow'],   // 用于设置箭头
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: that.planePath, // 特效形状，可以用其他svg pathdata路径代替
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: that.color[0],
              width: 1,
              opacity: 0.6,
              curveness: -0.2
            }
          },
          data: that.convertData(item[1]) // 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
        }, { // 散点效果
          type: 'effectScatter',
          coordinateSystem: 'geo', // 表示使用的坐标系为地理坐标系
          zlevel: 3,
          rippleEffect: {
            brushType: 'stroke' // 波纹绘制效果
          },
          label: {
            normal: { // 默认的文本标签显示样式
              show: true,
              position: 'left', // 标签显示的位置
              formatter: '{b}' // 标签内容格式器
            }
          },
          itemStyle: {
            normal: {
              color: '#ffffff'
            }
          },
          data: item[1].map(function(dataItem) {
            return {
              name: dataItem[1].name,
              value: that.geoCoordMap[dataItem[1].name], // 起点的位置
              symbolSize: dataItem[1].value / 8, // 散点的大小，通过之前设置的权重来计算，val的值来自data返回的value
            };
          })
        });
      });

      // 显示终点位置,类似于上面最后一个效果，放在外面写，是为了防止被循环执行多次
      that.series.push({
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 3,
        rippleEffect: {
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            position: 'left',
            formatter: '{b}'
          }
        },
        symbolSize: function(val) {
          return val[2] / 8;
        },
        itemStyle: {
          normal: {
            color: that.color[1]
          }
        },
        data: [{
          // 这里面的数据，由于一开始就知道终点位置是什么，所以直接写死，如果通过ajax来获取数据的话，还要进行相应的处理
          name: "重庆",
          value: [107.7539, 30.1904, 30],
          label: {
            normal: {
              position: 'top'
            }
          }
        }, {
          name: '广州',
          value: [113.5107, 23.2196, 30],
          label: {
            normal: {
              position: 'right'
            }
          }
        }, {
          name: '南宁',
          value: [108.479, 23.1152, 30]
        }]
      });
      console.log(that.series)
      this.initChart(that.series)
    },
    initChart(series) {

      this.chart = echarts.init(this.$refs.myEchart);
      window.onresize = echarts.init(this.$refs.myEchart).resize;
      // 把配置和数据放这里
      this.chart.setOption({
        // backgroundColor: "#040c21",

       //  title: {
       //     text: '全国主要城市空气质量',
       //     subtext: 'data from PM25.in',
       //     sublink: 'http://www.pm25.in',
       //     left: 'center',
       //     textStyle: {
       //         color: '#fff'
       //     }
       // },
        geo: {
          map: 'world', // 与引用进来的地图js名字一致
          roam: true, // 禁止缩放平移
          itemStyle: { // 每个区域的样式
            normal: {
              areaColor: '#02b0d2'
            },
            emphasis: {
              areaColor: '#3dbb7a'
            }
          },
          regions: [{ // 选中的区域
            name: 'China',
            selected: true,
            itemStyle: { // 高亮时候的样式
              emphasis: {
                areaColor: '#3dbb7a'
              }
            },
            label: { // 高亮的时候不显示标签
              emphasis: {
                show: false
              }
            }
          }]
        },
        series:series,   // 将之前处理的数据放到这里
        textStyle: {
            fontSize: 12
        }
      });
    }
  }
}
</script>
<style scoped>
 @import 'nationalHBSSJK.css';
</style>
