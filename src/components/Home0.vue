<template>
  <el-container class="home">
    <el-main class="home-main">
      <div class="home-top">
        <div class="home-top-left">
         {{dateData.mm+dateData.dd+' '+dateData.xx}}
        </div>
        <div class="home-top-right hand" @click="isLogin=false" v-if="!isLogin">
          <img src="../assets/img/home/p.png" alt="">
          登录
        </div>
        <div class="home-top-right hand" v-if="isLogin">
          <!-- <RightMenu></RightMenu> -->
          <el-dropdown trigger="click">
             <span class="el-dropdown-link" style="color:#fff">
               欢迎您！{{userName}}<i class="el-icon-arrow-down el-icon-right"></i>
             </span>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item v-for="(x,index) in navIdCCdata" v-if="index!=0" :key="index"><span style="display:block;width:100%;height:100%" @click="$router.push('/content/'+navIdcc+'/ManageCenter?nav1Id='+x.parentId+'&nav2Id='+x.SERIAL)">{{x.name}}</span></el-dropdown-item>
               <el-dropdown-item><span style="display:block;width:100%;height:100%" @click="logOut">退出</span></el-dropdown-item>
             </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="home-title1">
        国家移民管理局旅客预报预检系统
      </div>
      <div class="home-title2-box">
        <span class="home-title2">
          National Immigration Administration iAPI and PNR System
        </span>
      </div>
      <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart" class="canvas"></div>
      <div class="nav-left" v-if="isLogin">
        <svg class="svg-nav" data-name="d" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 178 422.26" >
          <path class="cls-1" :class="{'clss':left==1}" d="M126.5,142.19a131.62,131.62,0,0,1,50.24-47L127.43.2A239.16,239.16,0,0,0,35,86.68Z" fill="#032552" transform="translate(0 -0.2)" @mouseover="leftOver(1)"/>
          <path class="cls-1" :class="{'clss':left==2}" d="M0,210H107a130.43,130.43,0,0,1,18.46-66.1L34,88.39A236.89,236.89,0,0,0,0,210Z" fill="#032552" transform="translate(0 -0.2)" @mouseover="leftOver(2)"/>
          <path class="cls-1" :class="{'clss':left==3}" d="M126.47,279.75A130.32,130.32,0,0,1,107,212H0A236.89,236.89,0,0,0,35.81,336.6Z" fill="#032552" transform="translate(0 -0.2)" @mouseover="leftOver(3)"/>
          <path class="cls-1" :class="{'clss':left==4}" d="M178,327.48a131.56,131.56,0,0,1-50.47-46L36.87,338.29a239,239,0,0,0,91.82,84.17Z" fill="#032552" transform="translate(0 -0.2)" @mouseover="leftOver(4)"/>
        </svg>
        <router-link :to="{ name: 'Content', params: {navId:val.SERIAL} }" class="nav-item" :class='"nav-item"+parseInt(ind)' v-for="(val,ind) in muneListOne" :key="val.SERIAL" v-if="ind<4&&(val.name!='常用菜单')">
          <img :src='"../assets/img/navIcon/"+val.MENU_ICON+".png"' alt="">
          <span>{{val.name}}</span>
        </router-link>
        <!-- <a @click="rcgz" class="nav-item" :class='"nav-item"+parseInt(ind)' v-for="(val,ind) in muneListOne" :key="val.SERIAL" v-if="ind<4&&val.name=='日常工作'">
          <img :src='"../assets/img/navIcon/"+val.MENU_ICON+".png"' alt="">
          <span>{{val.name}}</span>
        </a> -->
        <a @click="getcc(val.SERIAL)" class="nav-item" :class='"nav-item"+parseInt(ind)' v-for="(val,ind) in muneListOne" :key="val.SERIAL" v-if="ind<4&&val.name=='常用菜单'">
          <img :src='"../assets/img/navIcon/"+val.MENU_ICON+".png"' alt="">
          <span>{{val.name}}</span>
        </a>
      </div>
      <div class="nav-left-0" v-if="isLogin">
        <img :src='"../assets/img/home/left_"+left+".png"'>
      </div>
      <div class="nav-right-0" v-if="isLogin">
        <img :src='"../assets/img/home/right_"+right+".png"'>
      </div>
      <div class="nav-right" v-if="isLogin">
        <svg xmlns="http://www.w3.org/2000/svg" class="svg-nav" data-name="d" viewBox="0 0 178 422.26">
          <path class="cls-1" :class="{'clss':right==1}" d="M51.5,142.19a131.62,131.62,0,0,0-50.24-47L50.57.2A239.16,239.16,0,0,1,143,86.68Z" transform="translate(0 -0.2)" fill="#032552" @mouseover="rightOver(1)"/>
          <path class="cls-1" :class="{'clss':right==2}" d="M178,210H71a130.43,130.43,0,0,0-18.46-66.1L144,88.39A236.89,236.89,0,0,1,178,210Z" transform="translate(0 -0.2)" fill="#032552" @mouseover="rightOver(2)"/>
          <path class="cls-1" :class="{'clss':right==3}" d="M51.53,279.75A130.32,130.32,0,0,0,71,212H178a236.89,236.89,0,0,1-35.81,124.6Z" transform="translate(0 -0.2)" fill="#032552" @mouseover="rightOver(3)"/>
          <path class="cls-1" :class="{'clss':right==4}" d="M0,327.48a131.56,131.56,0,0,0,50.47-46l90.66,56.84a239,239,0,0,1-91.82,84.17Z" transform="translate(0 -0.2)" fill="#032552" @mouseover="rightOver(4)"/>
        </svg>
        <router-link :to="{ name: 'Content', params: {navId:val.SERIAL} }" class="nav-item" :class='"nav-item"+parseInt(ind)' v-for="(val,ind) in muneListOne" :key="val.SERIAL" v-if="ind>3&&(val.name!='常用菜单')">
          <img :src='"../assets/img/navIcon/"+val.MENU_ICON+".png"' alt="">
          <span>{{val.name}}</span>
        </router-link>
        <!-- <a @click="rcgz" class="nav-item" :class='"nav-item"+parseInt(ind)' v-for="(val,ind) in muneListOne" :key="val.SERIAL" v-if="ind>3&&val.name=='日常工作'">
          <img :src='"../assets/img/navIcon/"+val.MENU_ICON+".png"' alt="">
          <span>{{val.name}}</span>
        </a> -->
        <a @click="getcc(val.SERIAL)" class="nav-item" :class='"nav-item"+parseInt(ind)' v-for="(val,ind) in muneListOne" :key="val.SERIAL" v-if="ind>3&&val.name=='常用菜单'">
          <img :src='"../assets/img/navIcon/"+val.MENU_ICON+".png"' alt="">
          <span>{{val.name}}</span>
        </a>
      </div>
      <div class="cycc-box" v-if="cyccShow">
        <div class="cycc-top">
          <div class="cycc-title">
            常用菜单
          </div>
          <i class="el-icon-close" @click="cyccShow=false"></i>
        </div>
        <div class="cycc-content">
          <ul class="cycc-ul">
            <li v-for="i in ccList" class="cycc-li" :class="{'cd':ccd==i.SERIAL}" @click="$router.push('/content/'+i.rootId+'/'+i.url+'?nav1Id='+i.parentId+'&nav2Id='+i.SERIAL)" @mouseover="cdHover(i.SERIAL)" @mouseout="cdOut()">
              <img src="../assets/img/home/micon2.png" alt="">
              <span>{{i.name}}</span>
            </li>
          </ul>
        </div>
        <div class="cycc-down">
          <router-link :to="{ name: 'Content', params: {navId:navIdcc,tiao:'1'} }">
            <i class="el-icon-setting"></i>菜单设置
          </router-link>
        </div>
      </div>
      <div class="login-box" v-if="!isLogin">
        <div class="login-item ">
          <el-input  placeholder="用户名" v-model="user.userName"  style="display:none"></el-input>
          <el-input  placeholder="用户名" v-model="user.userName" v-verify.input.blur ="{regs:'required',submit:'demo2'}" @keyup.enter.native="keyLogin">
            <i slot="prefix" class="el-input__icon"><img src="../assets/img/home/login_06.png"></i>
          </el-input>
        </div>
        <div class="login-item">
          <el-input
            placeholder="密码"
            type="password" v-model="user.password" v-verify.input.blur ="{regs:'required',submit:'demo2'}"  @keyup.enter.native="keyLogin">
            <i slot="prefix" class="el-input__icon"><img src="../assets/img/home/login_03.png"></i>
          </el-input>
        </div>
        <div class="login-item2">
          <el-checkbox v-model="jzmm">记住密码</el-checkbox>
          <!-- <a class="login-a">忘记密码</a> -->
        </div>
        <button class="login-btn" @click="login">登录</button>
      </div>
      <div class="home-foot">
        <div class="foot1">
          全国出入境人员数量统计
        </div>
        <div class="foot2">
          {{dateData.year}}年
          <span class="rs" v-for="i in rcList">{{i}}</span>
          <span v-if="isWan">万</span><span style="font-size:14px">人次</span>
        </div>
        <div class="foot3">
          Copyright © 2018 中华人民共和国国家移民管理局 ALL Right Reserved <span> 技术支持:太极计算机股份有限公司</span>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/world.js';
// import RightMenu from './other/rightMenu'
export default {
  name: "echarts",
  // components:{RightMenu},
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
      default: "500px"
    }
  },
  data() {
    return {
      loginType:0,//第三方登录
      dateData:{
        year:'',
        mm:"",
        dd:"",
        xx:""
      },
      navIdcc:null,
      navIdCCdata:null,
      userName:"",
      jzmm:false,
      bynav:true,
      isLogin:true,
      tabId:0,
      crType:"0",
      showLeft:true,
      showRight:true,
      left:0,
      right:0,
      ccd:'0',
      cyccShow:false,
      ccList:[],
      rcList:[],
      muneListOne:[],
      user:{},
      find: "2", //1显示新增按钮，2显示导入按钮，若不显示这两个按钮可以写0或者不写值
      chart: null,
      isWan:false,
      geoCoordMap: {
        '南宁': [108.479, 23.1152],
        '广州': [113.5107, 23.2196],
        '北京': [116.5810964525, 39.7399177259],
        '芬兰': [24.909912, 60.169095],
        '美国': [-100.696295, 33.679979],
        '日本': [139.710164, 35.706962],
        '韩国': [126.979208, 37.53875],
        '瑞士': [7.445147, 46.956241],
        '东南亚': [117.53244, 5.300343],
        '澳大利亚': [135.193845, -25.304039],
        '德国': [13.402393, 52.518569],
        '英国': [-0.126608, 51.208425],
        '加拿大': [-102.646409, 59.994255],
        '阿根廷':[-58.30000,-34.200000],
        '俄罗斯':[93.470000,63.270000]
      },
      // 北京
      CQData: [
        [{
          name: '北京'
        }, {
          name: "芬兰",
          value: 60
        }],
        [{
          name: '北京'
        }, {
          name: "澳大利亚",
          value: 60
        }],
        [{
          name: '北京'
        }, {
          name: "英国",
          value: 60
        }],
        [{
          name: '北京'
        }, {
          name: "韩国",
          value: 60
        }],
        [{
          name: '北京'
        }, {
          name: "加拿大",
          value: 60
        }],
        [{
          name: '北京'
        }, {
          name: "阿根廷",
          value: 60
        }],
        [{
          name: '北京'
        }, {
          name: "俄罗斯",
          value: 60
        }],
      ],
      planePath: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
      color: ['#11fb44', '#dcbf71'], // 自定义图中要用到的颜色
      series:[], // 用来存储地图数据
      timer:null,
      loginId:'',
      dlType:0,
      dlState:'',
      dlmessage:'',
    };
  },
  mounted() {

    this.fn();
    var _this=this;
    _this.getSatus();
    this.timer=setInterval(function(){
      _this.getSatus();

    },1200000)

    this.getTime();
    this.initJzmm();
    if(this.$route.query.isLogin){
      console.log(this.$route.query.isLogin)
      this.isLogin=this.$route.query.isLogin
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },

  computed:{
    sortarr:function(){
      return this.sortByKey(this.muneListOne,'SERIAL')
    }
  },
  watch:{
    $route(val){
      if(!val.query.isLogin){
        this.$router.go(0)
      }
    }
  },
  methods: {
    initJzmm(){
      if(sessionStorage.getItem('jzmm')==1){
        this.jzmm=true;
        this.user={
          userName:sessionStorage.getItem('userName'),
          password:sessionStorage.getItem('password')
        }
      }
    },
    isJzmm(){
      if(this.jzmm){
        sessionStorage.setItem('jzmm',1);
        sessionStorage.setItem('userName',this.user.userName);
        sessionStorage.setItem('password',this.user.password);
      }else {
        sessionStorage.clear();
        // sessionStorage.setItem('jzmm',0);
      }
    },
    getTime(){
      let myDate = new Date();
      let a = new Array("日", "一", "二", "三", "四", "五", "六");
      this.dateData.year=myDate.getFullYear();
      this.dateData.mm=parseInt(myDate.getMonth()+1)+'月';
      this.dateData.dd=myDate.getDate()+'日';
      let week = myDate.getDay();
      this.dateData.xx = '星期'+a[week];
      this.$api.post('/manage-platform/homePage/iapiSize',{},
       r => {
        this.isWan=r.data.isShow;
        this.rcList=r.data.number.toString().split('')
        console.log(this.rcList)
      })
    },
    leftOver(i){
      this.left=i;
      this.right=0;
    },
    rightOver(i){
      this.right=i;
      this.left=0;
    },
    cdHover(i){
      this.ccd=i;
    },
    cdOut(){
      this.ccd = "0"
    },
    window_close(){
      // if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1) {
      //       window.location.href="http://localhost/fastflow/winform/cn/myprocessform.aspx";
      //       window.close();
      //   } else {
            window.opener = null;
            window.open(" ", "_self");
            window.close();
        // }
    },
    getdlType(){
      this.$api.post('/manage-platform/landingMessage',{},
        r =>{
          this.dlType = r.code;
          this.dlState = r.success;
          this.dlmessage = r.message
          // console.log('r.code',r.code)
          // console.log('r.successbbbbbb',r.success)
        })
    },
    getSatus(){
      this.$api.post('/manage-platform/isLanding',{},
        r => {
          this.isLogin=r.data;
          if(this.isLogin){
            this.getUers();
            this.getNav0();
          }else{
            this.$router.push({path:"/20080806AdminLoginPassword"})
          }
       })
    },
    getUers(){
      this.$api.post('/manage-platform/homePage/userInfo',{},
       r => {
         this.userName=r.data.userName;
      })
    },
    keyLogin(){
      // console.log("dddd")
      if(this.user.userName&&this.user.password){
        this.login();
      }
    },
    login(){
      if(this.$validator.listener.demo2){
        const result = this.$validator.verifyAll('demo2')
         if (result.indexOf(false) > -1) {
           return
         } else {
         }
      }
      this.isJzmm()
      this.$api.post('/manage-platform/landing',this.user,
       r => {
        if(r.success){
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          sessionStorage.setItem('loginType',1)//正常登录
          this.getNav0();
          this.getUers();
          let _this=this;
          setTimeout(function(){
              _this.isLogin=true;
              _this.user={
                userName:"",
                password:""
              }
          },1000)
        }
      })
    },
    logOut(){
      this.$api.post('/manage-platform/landout',{},
       r => {
        if(r.success){
          this.$message({
            message: '退出成功',
            type: 'success'
          });
          this.$router.go(0)
        }
      })
      // this.$confirm('确定要退出？', '提示', {
      //    confirmButtonText: '确定',
      //    type: 'warning'
      //  }).then(() => {
      //    this.window_close();
      //  }).catch(() => {
      //
      //  });
    },
    getNav0(){
      this.$api.post('/manage-platform/muneSys/selectMenuOne',{},
       r => {
         this.bynav=false;
         this.muneListOne=r.data.muneListOne
         this.muneListOne.map(function(a){
           if(a.name=='常用菜单'){
             this.navIdcc=a.SERIAL
             this.getNavCC(this.navIdcc)
           }
         },this)
      })
    },
    getNavCC(navId){
      this.$api.post('/manage-platform/muneSys/menuChild', {
          SERIAL: navId
        },
        r => {
          if(r.success){
            this.navIdCCdata=r.data.menuChild[0].menuList;
            // console.log(this.navIdCCdata)
          }
        })
    },
    getcc(){
      this.cyccShow=true,
      this.$api.post('/manage-platform/roleSys/selectmenuSet', {},
        r => {
          this.ccList=r.data.menuSetChoose
        })
    },
    rcgz(){
      this.$message({
          message: '开发中...敬请期待',
          type: 'warning'
        });
    },
    sortByKey(array,key){
      return array.sort(function(a,b){
        var x=a[key];
        var y=b[key];
        return ((x<y)?-1:((x>y)?1:0));
      });
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
      let that=this;
        [
          ['北京',this.CQData],

        ].forEach(function(item, i) {
          // console.log(item[1]);
          that.series.push({
            // 白色航线特效图
            type: 'lines',
            zlevel: 1, // 用于分层，z-index的效果
            effect: {
              show: true, // 动效是否显示
              period: 12, // 特效动画时间
              trailLength: 0.7, // 特效尾迹的长度
              color: '#fff', // 特效颜色
              symbolSize: 3 // 特效大小
            },
            lineStyle: {
              normal: { // 正常情况下的线条样式
                color: that.color[0],
                width: 0.5, // 因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
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
              period: 12,
              trailLength: 0,
              symbol: that.planePath, // 特效形状，可以用其他svg pathdata路径代替
              symbolSize: 15,
              color:'#ffffff'
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
                show: false,
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

        //显示终点位置,类似于上面最后一个效果，放在外面写，是为了防止被循环执行多次
        that.series.push({
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: false,
              position: 'left',
              formatter: '{b}'
            }
          },
          symbolSize: function(val) {
            return val[2] / 3;
          },
          itemStyle: {
            normal: {
              color: that.color[0]
            }
          },
          data: [{
            // 这里面的数据，由于一开始就知道终点位置是什么，所以直接写死，如果通过ajax来获取数据的话，还要进行相应的处理
            name: "北京",
            value: [116.5810964525, 39.7399177259, 30],
            label: {
              normal: {
                position: 'top'
              }
            }
          }]
        });
        this.initChart(that.series)
      },
    initChart(series) {

      this.chart = echarts.init(this.$refs.myEchart);
      // window.onresize = echarts.init(this.$refs.myEchart).resize;
      // 把配置和数据放这里
      this.chart.setOption({

        geo: {
          map: 'world', // 与引用进来的地图js名字一致
          roam: false, // 禁止缩放平移
          itemStyle: { // 每个区域的样式
            normal: {
              areaColor: '#022d61',
              borderColor:'#2fadf1',
              borderWidth:0.3
            },
            emphasis: {
              areaColor: '#022d61'
            },

          },
          label: { // 高亮的时候不显示标签
            emphasis: {
              show: false
            }
          },
          regions: [{ // 选中的区域
            name: 'China',
            selected: true,
            itemStyle: { // 高亮时候的样式
              emphasis: {
                areaColor: '#1161da'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clss{
  fill:#0977b6;
  stroke:#0977b6;
  /* stroke-width:3; */
  /* transform: scale(1.1); */
}
.home{
  width: 100%;
  height: 100%;
  background: url('../assets/img/home/bg.png');
  background-size: 100% 100%;
  color: #fff;
}
.home-top{
  padding: 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.home-top-left span{
  color: #c53510;
}
.home-top-right img{
  vertical-align:bottom;
}
.home-title1{
  text-align: center;
  font-size: 33px;
  margin-bottom: 15px;
}
.home-title2-box{
  text-align: center;
  margin-bottom: 40px;

}
.home-title2{
  padding: 0 10px;
  font-size: 15px;
  border: 1px #fff solid;
  box-shadow: 0 0 12px #5eeeff;
}
.left-1{
  width: 200px;
  height: 400px;
  background: red;
  border-radius: 400px 0 0  400px;
}
.home-main{
  position: relative;
}
.nav-left{
  position: absolute;
  top:180px;
  left: 20%;
}
.nav-left-0{
  position: absolute;
  top:330px;
  left:16%;
}
.nav-right-0{
  position: absolute;
  top:330px;
  right:16%;
}
.nav-right{
  position: absolute;
  top:180px;
  right: 20%;
}
.svg-nav{
  width: 175px;
  height: 100%;
}
.nav-item:hover+.cls-1{
  fill:red;
  stroke:#032552;
  /* stroke-width:4; */
  /* color: red; */
  /* width: 180px */
}
.nav-item{
  color: #2bd7f3;
  width: 64px;
  /* text-align: center; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
}
.nav-item img{
  margin: 5px;
}
.nav-item0{
  position:absolute;
  top:38px;
  left:80px;
}
.nav-item1{
  position:absolute;
  top:128px;
  left:30px;
}
.nav-item2{
  position:absolute;
  top:220px;
  left:33px;
}
.nav-item3{
  position:absolute;
  top:308px;
  left:80px;
}
.nav-item4{
  position:absolute;
  top:38px;
  right:80px;
}
.nav-item5{
  position:absolute;
  top:128px;
  right:30px;
}
.nav-item6{
  position:absolute;
  top:220px;
  right:33px;
}
.nav-item7{
  position:absolute;
  top:308px;
  right:80px;
}
.cycc-box{
  width: 612px;
  height: 300px;
  position: fixed;
  top:50%;
  left: 50%;
  margin-left: -306px;
  margin-top: -150px;
  background: #032552;
  border-radius: 6px;
  padding: 0 0 0 20px;
}
.cycc-top{
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  color: #0eb5c7;
  align-items: center;
}
.cycc-content{
  height: 200px;
  overflow-y: auto;
}
.cycc-ul{
  display: flex;
  flex-wrap: wrap;
}
.cycc-li{
  padding: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #29d8f3;
  color: #032552;
  width: 90px;
  border-radius: 6px;
  font-size:14px;
  margin-right: 20px;
  margin-bottom: 15px;
}
.cd{
  background: #c6dee2!important;
}
.cycc-li:last-child{
  margin-right: 0;
}
.cycc-li span{
  margin-top:6px;
  text-align: center;
  /* width: 36px;
  height: 36px; */
}
.cycc-down{
 height: 50px;
 line-height: 50px;
 text-align: right;
 padding-right: 20px;
}
.cycc-down a{
  color: #fff;

}
.login-box{
  width: 466px;
  height: 302px;
  position: fixed;
  top:50%;
  left:50%;
  margin-left: -233px;
  margin-top: -151px;
  z-index: 7;
  background:url(../assets/img/home/login_bg.png);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
}
.login-item{
  margin-top: 10px;
  width: 60%;
  color: #fff;
  line-height: 32px;
}

.el-input__icon img{
  vertical-align: middle;
}
.login-item2{
  margin-top: 10px;
  width: 60%;
  font-size: 14px;
  display: flex;
  justify-content:space-between;
  align-items: center;
}
.login-a{
  color: #6d90c0;
  text-decoration: underline;
}
.login-btn{
  border: none;
  background: #27d9f3;
  width: 160px;
  height: 38px;
  margin-top: 20px;
  font-size: 16px;
  color: #032552;
}
.home-foot{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}
.foot1{
  font-size: 15px;
  color: #022d61;
  margin-bottom: 15px;
}
.foot2{
  font-size: 18px;
  margin-bottom: 27px;
}
.foot2 .rs{
  font-size: 20px;
  background: #0e6eba;
  padding: 4px 7px;
  margin: 0 5px;
}
.foot3{
  font-size: 12px;
  color: #5ec0ff;
}
.foot3 span{
  margin-left: 8px;
}
</style>
