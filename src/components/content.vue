<template lang="html">
  <el-container class="content">

    <el-header height="150px">
      <img src="../assets/img/logoo.png" alt="">
      <div class="top-right">
        <div class="top-nav">
          <ul class="top-nav-ul" v-if="navUlShow">
            <li class="top-nav-li hand" @click="$router.push('/')">
              首页
            </li>
            <li class="top-nav-li hand" v-for="i in muneListOne" :class="{'topCheckLi':navId==i.SERIAL}" @click="topNavTo(i.SERIAL)">
              {{i.name}}
            </li>

          </ul>
          <div class="nav-btn mr-30 hand" :class="{'openNav':navUlShow}" @click="openNav" >
            <img src="../assets/img/nav_icon.png" alt="" v-if="!navUlShow">
            <i class="el-icon-arrow-left" style="color:#fff"  v-if="navUlShow"></i>
            导航
          </div>
        </div>

        <div class="top-right-1">
          <span class="mb-6">欢迎您！管理员</span>
          <span @click="logOut"><img src="../assets/img/logout.png" style="width:20px;height:20px;vertical-align:bottom;margin-right:5px;"alt="">退出</span>
        </div>
      </div>
    </el-header>
    <el-container class="main">
      <el-aside :width="sideWidth" class="left">
        <ul class="nav1">
          <li class="nav1bar-up" @click="preList">
            <img src="../assets/img/navbar-up.png" alt="">
          </li>
          <li class="nav1-item " :class="{'nav1-checked':nav1Id==i.SERIAL}" v-for="(i,index) in nav1List.slice(nav1Star, nav1End)" @click="nav1to2(i,1)">

            <img src="../assets/img/navIcon/i_qg_1.png" alt="" class="nav1-icon"  v-if="navId=='cc'">
            <img :src='"../assets/img/navIcon/"+i.MENU_ICON+"_0.png"' alt="" class="nav1-icon" v-if="nav1Id!=i.SERIAL&&navId!='cc'">
            <img :src='"../assets/img/navIcon/"+i.MENU_ICON+"_1.png"' alt="" class="nav1-icon"  v-if="nav1Id==i.SERIAL&&navId!='cc'">

            <span class="nav1-text" :class="{'text-checked':nav1Id==i.SERIAL}">{{i.name}}</span>
          </li>

          <li class="nav1bar-down" @click="nextList">
            <img src="../assets/img/navbar-down.png" alt="">
          </li>
        </ul>
        <!-- <transition  name="bounce"> -->
        <ul class="nav2" v-if="nav2Show">
          <li class="nav2-item hand" :class="{'nav2-checked':nav2Id==x.url}" v-for="x in nav2List" @click="nav2(x)">
            {{x.name}}
          </li>
        </ul>
        <!-- </transition> -->
        <div class="fold-bar" @click="isNav2Hide" v-if="nav2HideBar" @mouseover="navh=1" @mouseout="navh=0">
          <el-tooltip class="item" effect="light" content="收起菜单" placement="right">
            <img :src='"../assets/img/elasticbar_"+navh+".png"' >
          </el-tooltip>
        </div>
        <div class="fold-bar" @click="isNav2Show" v-else  @mouseover="navh=1" @mouseout="navh=0">
          <el-tooltip class="item" effect="light" content="展开菜单" placement="left">
              <img :src='"../assets/img/spread_"+navh+".png"' >
          </el-tooltip>


        </div>
      </el-aside>
      <el-main class="right-main">
        <ul class="tabList">
          <li class="tabList-item hand" :style="{width:tabliwidth}" :class="{'tabList-checked':nav2Id==i.url}" v-for="(i, index) in tabList">
            <el-tooltip class="item" effect="dark" :content="i.name" placement="top">
              <span  @click="nav2(i,index)">{{i.name}}</span>
            </el-tooltip>

            <img src="../assets/img/tab-close1.png" alt="guanbi" @click="close1(index)" class="hand" style="padding:8px" v-if="nav2Id==i.url">
            <img src="../assets/img/tab-close2.png" alt="" @click="tabList.splice(index, 1)" style="padding:8px" class="hand" v-else>
          </li>
          <!-- <li class="tabList-item">
            <img src="../assets/img/add_tab.png" class="hand">
          </li> -->
        </ul>
        <div class="tab-content">
            <transition name="fade">
              <router-view></router-view>
            </transition>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      navUlShow: false,
      tabliwidth:'120px',
      muneListOne: [
        // {
        //     "MENU_ICON":"iconYC",
        //     "SERIAL":"1",
        //     "choose":true,
        //     "name":"业务处理",
        //     "parentId":"0",
        //     "type":"1",
        //     "url":"#"
        // },
        // {
        //     "MENU_ICON":"iconYY",
        //     "SERIAL":"2",
        //     "choose":true,
        //     "name":"业务应用",
        //     "parentId":"0",
        //     "type":"1",
        //     "url":"#"
        // },
        // {
        //     "MENU_ICON":"iconYK",
        //     "SERIAL":"3",
        //     "choose":true,
        //     "name":"业务监控",
        //     "parentId":"0",
        //     "type":"1",
        //     "url":"#"
        // },
        // {
        //     "MENU_ICON":"iconYG",
        //     "SERIAL":"4",
        //     "choose":true,
        //     "name":"业务管理",
        //     "parentId":"0",
        //     "type":"1",
        //     "url":"#"
        // },
        // {
        //     "MENU_ICON":"iconXG",
        //     "SERIAL":"5",
        //     "choose":true,
        //     "name":"系统管理",
        //     "parentId":"0",
        //     "type":"1",
        //     "url":"#"
        // },
        // {
        //     "MENU_ICON":"iconXK",
        //     "SERIAL":"6",
        //     "choose":true,
        //     "name":"系统监控",
        //     "parentId":"0",
        //     "type":"1",
        //     "url":"#"
        // }
      ],

      sideWidth: '295px',
      isCollapse: false,
      nav2Show: true,
      nav2HideBar: true,
      navId:0,
      nav1Id: 1,
      navh: 0,
      nav2List: [],
      nav1List: [],
      nav1List1: [
        {
          SERIAL: 1,
          name: "报警处理",
          MENU_ICON:'i_bj',
          menuList: [
            {
              SERIAL: 11,
              name: "名单比对报警",
              url: "ProcessMDBJ"
            },
            // {
            //   SERIAL:12,
            //   text:"二次查控报警",
            //   name:"ProcessECBDBJ"
            // },
            {
              SERIAL: 13,
              name: "重点关注人员预报警",
              url: "ProcessZDGZRY"
            },

          ]
        },
        {
          SERIAL: 2,
          name: "常规业务处理",
          MENU_ICON:'i_cgyw',
          menuList: [
            {
              SERIAL: 21,
              name: "指令变更",
              url: "ProcessZLBG"
            },

          ]
        },
        {
          SERIAL: 3,
          name: "备降航班处理",
          MENU_ICON:'i_bjhb',
          menuList: [{
            SERIAL: 31,
            name: "航班状态变更",
            url: "ProcessHBZT"
          }]
        }
      ],
      nav1List2: [
        {
          SERIAL: 1,
          name: "信息查询",
          MENU_ICON:'i_xx',
          menuList: [{
              SERIAL: 11,
              name: "人员信息查询",
              url: "QueryRYXX"
            },
            {
              SERIAL: 12,
              name: "业务事件查询",
              url: "QueryYWSJ"
            },
            {
              SERIAL: 13,
              name: "航班信息查询",
              url: "QueryHBXX"
            },
            {
              SERIAL: 14,
              name: "命中人员查询",
              url: "QueryMZRY"
            },
            {
              SERIAL: 15,
              name: "关联人员查询",
              url: "QueryGLRY"
            },
            {
              SERIAL: 16,
              name: "航班座位查询",
              url: "QueryHBZW"
            },

          ]
        },
        {
          SERIAL: 2,
          name: "校验比对结果",
          MENU_ICON:'i_xybd',
          menuList: [{
              SERIAL: 21,
              name: "数据项校验结果查询",
              url: "DataItem"
            },
            {
              SERIAL: 22,
              name: "业务规则校验结果查询",
              url: "Rules"
            },
            {
              SERIAL: 23,
              name: "名单比对结果查询",
              url: "ListComparison"
            },
          ]
        }
      ],
      nav1List3: [
        {
          SERIAL: 1,
          name: "名单管理",
          MENU_ICON:'i_md',
          menuList: [{
              SERIAL: 11,
              name: "名单数据分析",
              url: "ListMDSJFX"
            },
            {
              SERIAL: 12,
              name: "白名单管理",
              url: "ListBMD"

            },
            {
              SERIAL: 13,
              name: "临控名单管理",
              url: "ListLKMD"
            },
            {
              SERIAL: 14,
              name: "重点关注人员",
              url: "LIstZDGZRYMD"
            },

          ]
        },
        {
          SERIAL: 2,
          name: "业务规则管理",
          MENU_ICON:'i_ywgz',
          menuList: [{
              SERIAL: 21,
              name: "数据项校验规则管理",
              url: "ListSJXJYGZ"
            },
            {
              SERIAL: 22,
              name: "一般性规则管理",
              url: "ListYBXGZ"
            },
            {
              SERIAL: 23,
              name: "免签规则管理",
              url: "ListMQGZ"
            },

          ]
        },

      ],
      nav1List4: [{
        SERIAL: 1,
        name: "全国监控",
        MENU_ICON:'i_qg',
        menuList: [{
            SERIAL: 11,
            name: "全国航班实时监控",
            url: "NationalHBSSJK"
          },


        ]
      }],
      nav1List5: [
        {
          SERIAL: 1,
          name: "权限管理",
          MENU_ICON:'i_qx',
          menuList: [{
              SERIAL: 11,
              name: "部门管理",
              url: "ManageBM"
            },
            {
              SERIAL: 12,
              name: "用户管理",
              url: "ManageYH"
            },
            {
              SERIAL: 13,
              name: "角色管理",
              url: "ManageJS"
            },
          ]
        },
        {
          SERIAL: 2,
          name: "配置管理",
          MENU_ICON:'i_pz',
          menuList: [

            // {
            //   id:22,
            //   text:"集中用户管理",
            //   name:"ManageJZYH"
            // },
            // {
            //   id:23,
            //   text:"用户认证与登录",
            //   name:"ManageDL"
            // },

          ]
        },
      ],
      nav1List6: [
        {
          SERIAL: 1,
          name: "运行状态监控",
          MENU_ICON:'i_yxzt',
          menuList: [{
              SERIAL: 11,
              name: "网络综合监控",
              url: "MonitorBJJHPT"
            },
            {
              SERIAL: 12,
              name: "服务器监控",
              url: "MonitorFWQ"
            },
            {
              SERIAL: 13,
              name: "接口服务监控",
              url: "MonitorJKFW"
            },
            {
              SERIAL: 14,
              name: "数据库监控",
              url: "MonitorSJK"

            },
            // {
            //   id:13,
            //   name:"应用程序监控",
            //   name:"MonitorYYCX"
            // },
            {
              SERIAL: 15,
              name: "Redis监控",
              url: "MonitorRedis"
            },
            {
              SERIAL: 16,
              name: "MQ监控",
              url: "MonitorMQ"
            },

          ]
        },
        {
          SERIAL: 2,
          name: "数据监控",
          MENU_ICON:'i_sj',
          menuList: [{
              SERIAL: 21,
              name: "数据一致性监控",
              url: "MonitorSJYZX"
            },
            // {
            //   id:22,
            //   name:"技术网关监控",
            //   name:"MonitorJSWG"
            // },
            // {
            //   id:23,
            //   name:"整合分发监控",
            //   name:"MonitorZHFF"
            // },
            // {
            //   id:24,
            //   name:"数据定位",
            //   name:"MonitorSJDW"
            // },
          ]
        },
        {
          SERIAL: 3,
          name: "日志监控",
          MENU_ICON:'i_rz',
          menuList: [{
            SERIAL: 31,
            name: "日志监控",
            url: "MonitorRZJK"
          }, ]
        },
        {
          SERIAL: 4,
          name: "性能监控",
          MENU_ICON:'i_xn',
          menuList: [{
              SERIAL: 41,
              name: "校验比对性能监控",
              url: "MonitorJYBDXN"
            },
            {
              SERIAL: 42,
              name: "整合分发性能监控",
              url: "MonitorZHFFXN"
            },
          ]
        },
        {
          SERIAL: 5,
          name: "监控报警",
          MENU_ICON:'i_zkbj',
          menuList: [{
            SERIAL: 51,
            name: "监控报警",
            url: "MonitorJKBJ"
          }, ]
        },
      ],
      nav1List7: [{
        SERIAL: 1,
        name: "菜单设置",
        MENU_ICON:'i_cdss',
        menuList: [{
          SERIAL: 11,
          name: "常用菜单设置",
          url: "Menu"
        }, ]
      }],
      nav2Id: 1,
      nav1Star: 0,
      nav1End: 6,
      tabList: []
    }
  },
  mounted() {
    this.navId = this.$route.params.navId;
    console.log("youmeiyou",this.navId)

    if (this.navId == 'cc') {
      this.nav1List = this.nav1List7;
      this.nav1to2(this.nav1List[0])
    }else {
      this.getNav(this.navId)
      // this.getpp();
    }
    console.log("route",this.$route)
  },
  methods: {
    logOut(){
      // localStorage.removeItem('login')
      // this.$message({
      //   message: '退出成功',
      //   type: 'success'
      // });
      this.$api.post('/manage-platform/landout',{},
       r => {
        console.log(r)
        if(r.success){
          this.$message({
            message: '退出成功',
            type: 'success'
          });
        }
        this.$router.push('/')

      })
    },
    getNav(navId) {
      this.navId = navId;
      // this.getpp();
      this.$api.post('/manage-platform/muneSys/menuChild', {
          SERIAL: navId
        },
        r => {
          console.log(r);
          if(r.success){
            this.nav1List = r.data.menuChild;
            let arr=r.data.menuChild
            let nav1Id =this.$route.query.nav1Id;
            console.log(nav1Id)
            if(nav1Id){
              for(var i in arr){
                if(arr[i].SERIAL==nav1Id){
                  this.nav1to2(arr[i])
                }
              }
            }else{
              this.nav1to2(this.nav1List[0],1)
            }
          }
        },e=>{
          console.log(e)
        })

    },
    getpp(){
      if(this.navId==1){
        this.nav1List = this.nav1List1;

      }else if(this.navId==2){
        this.nav1List = this.nav1List2;

      }else if(this.navId==3){
        this.nav1List = this.nav1List3;

      }else if(this.navId==4){
        this.nav1List = this.nav1List4;

      }else if(this.navId==5){
        this.nav1List = this.nav1List5;

      }else if(this.navId==6){
        this.nav1List = this.nav1List6;
      }
      // this.nav1to2(this.nav1List[0])

    },
    openNav() {
      this.navUlShow = !this.navUlShow
      if (this.navUlShow) {
        this.$api.post('/manage-platform/muneSys/selectMenuOne', {},
          r => {
            console.log(r);
            if(r.success){
              this.muneListOne = r.data.muneListOne

            }
          })
      }
    },
    topNavTo(SERIAL){
      this.$router.push({ name: 'Content', params: {navId:SERIAL} });
      this.getNav(SERIAL);
      console.log(this.tabList)
      this.tabList=[];
    },
    nav1to2(nav1Itme,click) {
      console.log(nav1Itme)
      this.isNav2Show();
      this.$router.push({query:{nav1Id:nav1Itme.SERIAL}})
      this.nav1Id = nav1Itme.SERIAL;
      // this.nav2Id=11;
      this.nav2List = nav1Itme.menuList;
      console.log("this.nav2List",this.nav2List)
      let that=this;
      // let flag=0
      if(click==1){
        this.nav2(nav1Itme.menuList[0])
      }else{
        for(var i in nav1Itme.menuList){
          if(nav1Itme.menuList[i].url==that.$route.name){
            that.nav2(nav1Itme.menuList[i])
          }
        }
      }




    },
    nav2(item,index) {
      // console.log(index)
      if(this.tabList.length>8){
        console.log(this.tabList.length)
        this.tabliwidth=100/(this.tabList.length+1)+'%'
        // this.$confirm('您打开过多标签窗口，请关闭一些窗口后再操作', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   return
        // }).catch(() => {
        //   return
        // });
        // return
      }

      this.nav2Id = item.url;
      console.log(item, item.url)
      new Set(this.tabList)
      console.log(this.tabList)

      this.tabList.push(item)
      this.tabList = Array.from(new Set(this.tabList));
      console.log(item.url)
      this.$router.push({name: item.url,query:{nav1Id:item.parentId}})
    },
    nav2Top(item){
      // this.nav2Id = item.url;
      // this.nav1Id=item.parentId
      // this.nav2List = nav1Itme.menuList;
      // console.log(item, item.url)
      // new Set(this.tabList)
      // this.tabList.push(item)
      // this.tabList = Array.from(new Set(this.tabList));
      // console.log(item.url)
      // this.$router.push({name: item.url,query:{nav1Id:item.parentId}})

    },
    preList() {
      if (this.nav1Star == 0) {
        return
      }
      this.nav1Star--;
      this.nav1End--;
    },
    nextList() {
      if (this.nav1End >= this.nav1List.length) {
        return;
      }
      this.nav1Star++;
      this.nav1End++;
      console.log(this.nav1Star, this.nav1End)
    },
    isNav2Hide() {
      this.sideWidth = '120px';
      this.nav2Show = false;
      this.nav2HideBar = false;
    },
    isNav2Show() {
      this.sideWidth = '295px';
      this.nav2Show = true;
      this.nav2HideBar = true;
    },
    close1(index) {
      this.tabList.splice(index, 1);
      console.log(index)
      if (index > 0) {
        this.nav2Id = this.tabList[index - 1].url
        this.$router.push({name: this.nav2Id,query:{nav1Id:this.nav1Id}})
      }if(index==0){
        // console.log(this.tabList[index])
        if(this.tabList.length!=0){
          this.nav2Id = this.tabList[index].url
          this.$router.push({name: this.nav2Id,query:{nav1Id:this.nav1Id}})
        }else {
          this.nav2Id=null;
          this.$router.push({name: 'Content',query:{nav1Id:this.nav1Id}})

        }


      }
    }
  }
}
</script>

<style scoped>
.top-right {
  display: flex;
  align-items: center;
}

.top-right-1 {
  width: 116px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
}

.top-right-1 a {
  color: #fff;
}

.top-nav {
  display: flex;
  align-items: center;
}

.top-nav-ul {
  height: 40px;
  display: flex;
  background: rgba(27, 92, 168, 0.50);
  color: #fff;
  line-height: 40px;
  border-radius: 6px 0 0 6px;

}

.top-nav-li {
  width: 94px;
  text-align: center;
}

.top-nav-li:hover,
.topCheckLi {
  border-radius: 6px;
  color: #4a90e2;
  background: #ddeffd;
}

.nav-btn {
  width: 86px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: rgba(27, 92, 168, 0.50);
  color: #fff;
  border-radius: 6px;
}

.openNav {
  border-radius: 0 6px 6px 0;

}

.text-checked {
  color: #0781e5 !important;
  font-weight: bold;
}

.el-header {
  padding: 0 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-header img {}

.content {
  background: url(./../assets/img/bg.png) no-repeat;
  background-size: 100% 100%;
  padding-bottom: 115px;
}

.main {
  margin: 0 60px;
  padding: 40px 0 0px 20px;
  background-color: rgba(27, 92, 168, 0.502);
  border-radius: 8px;
  min-height: 830px;
  display: flex;

}

.el-header {
  /* background-color: #B3C0D1; */
  color: #333;
  line-height: 60px;
}

.left {
  color: #333;
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.fold-bar {
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -22px;
  padding: 0 0 0 5px;
}

.nav1 {
  width: 110px;
  position: relative;
  margin-right: 9px;
}


.nav1bar-up {
  background-color: rgba(255, 255, 255, 0.2);
  width: 110px;
  height: 40px;
  margin-bottom: 9px;
  border-radius: 6px 6px 0 0;
  text-align: center;
  line-height: 40px;
}

.nav1bar-down {
  background-color: rgba(255, 255, 255, 0.2);
  width: 110px;
  height: 40px;
  border-radius: 0 0 6px 6px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  bottom: 17px;
}

.nav1-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: rgb(12, 74, 147);
  width: 110px;
  height: 105px;
  margin-bottom: 9px;
}

.nav1-checked {
  border-radius: 6px 0 0 6px;
  background-color: #e8f3fc;
  color: #007be2;
  border-right: 9px #e8f3fc solid;
}

.nav1-icon {
  margin-bottom: 12px;
}

.nav1-text {
  color: #2ad9f4;
  font-size: 15px;

}

.nav2 {
  width: 176px;
  background: #e8f3fc;
  /* margin-left: 9px; */
  padding: 49px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.nav2-item {
  text-align: center;
  height: 32px;
  /* width: 128px; */
  padding: 0 10px;
  line-height: 32px;
  margin-bottom: 12px;
  font-size: 15px;
}

.nav2-checked {
  border-radius: 5px;
  width: 80%;
  background: linear-gradient( 360deg, rgb(9, 171, 236) 0%, rgb(0, 121, 228) 100%);
  color: #fff;
  font-weight: bold;
}

.right-main {
  min-width: 748px;
  padding: 0;
  position: relative;
  overflow: inherit !important;
  background: #def0fc;
}

.tabList {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 36px;
  position: absolute;
  top: -36px;
  flex-wrap: nowrap;
}

.tabList-item {
  margin-right: 5px;
  /* width: 120px; */
  padding: 0 18px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #fff;

}

.tabList-item span {
  /* margin-right: 10px; */
  /* width: 80%; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}

.tabList-checked {
  background: #def0fc;
  color: #0084cc;
}

.tab-content {
  padding: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: all  0.3s;
}
.fade-enter-active {
    transition-delay: 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-left-enter-active, .slide-left-leave-active {
    transition: transform .5s;
    transform-origin: left;
}
.slide-left-enter-active {
    transition-delay: .5s;
}
.slide-left-enter, .slide-left-leave-active {
    transform: scale(0,1);
}
.bounce-enter-active {
  animation: bounce-in .5s;
  transform-origin: left;
}
.bounce-enter-active {
  animation-delay: .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scaleX(0);
  }
  50% {
    transform: scaleX(0.5);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>
