<template lang="html">
  <el-container class="content">
    <el-header height="150px">
      <img src="../assets/img/logoo.png" alt=""  @click="rightShow=null">
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
          <el-dropdown trigger="click">
             <span class="el-dropdown-link hand" style="color:#fff">
               欢迎您！{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
             </span>
             <el-dropdown-menu slot="dropdown">
               <!-- <el-dropdown-item><span style="display:block;width:100%;height:100%" @click="$router.push('/content/cc/ManageCenter')">个人中心</span></el-dropdown-item> -->
               <!-- <el-dropdown-item><span @click="$router.push('/content/cc/UpdatePass')">修改密码</span></el-dropdown-item> -->
               <!-- <el-dropdown-item><span @click="window.print()">打印</span></el-dropdown-item> -->

               <el-dropdown-item><span style="display:block;width:100%;height:100%" @click="logOut">退出</span></el-dropdown-item>
             </el-dropdown-menu>
          </el-dropdown>
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
      <el-main class="right-main" :class="{'nobg':tabList.length==0}">
        <ul class="tabList">
          <li class="tabList-item hand" :style="{width:tabliwidth}" :class="{'tabList-checked':nav2Id==i.url}" @click.right="closeRight(index)"  v-for="(i, index) in tabList">
            <!-- <el-tooltip class="item" effect="dark" :content="i.name" placement="top"> -->
              <span  @click="nav2(i)">{{i.name}}</span>
            <!-- </el-tooltip> -->
            <img src="../assets/img/tab-close1.png" alt="guanbi" @click="close1(index)" class="hand" style="padding:8px" v-if="nav2Id==i.url">
            <img src="../assets/img/tab-close2.png" alt="" @click="tabList.splice(index, 1)" style="padding:8px" class="hand" v-else>
            <!-- <div class="rightClick" v-if="rightShow==index" @click="rightShow=null">
              <ul>
                <li>关闭全部页面</li>
                <li>关闭全部页面</li>
                <li>关闭全部页面</li>
              </ul>
            </div> -->
          </li>

          <!-- <li class="tabList-item">
            <img src="../assets/img/add_tab.png" class="hand">
          </li> -->
        </ul>
        <div class="tab-content">
            <transition name="fade">
              <!-- <keep-alive> -->
              <router-view></router-view>
              <!-- </keep-alive> -->
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
      rightShow:null,
      userName:'',
      navUlShow: false,
      tabliwidth:'120px',
      muneListOne: [],
      sideWidth: '295px',
      isCollapse: false,
      nav2Show: true,
      nav2HideBar: true,
      navId:0,
      nav1Id: 1,
      navh: 0,
      nav2List: [],
      nav1List: [],
      nav1List7: [{
        SERIAL: 1,
        name: "菜单设置",
        MENU_ICON:'i_cdss',
        menuList: [{
          SERIAL: 'cycd',
          name: "常用菜单设置",
          url: "Menu"
        },{
          SERIAL: 'grzx',
          name: "个人中心",
          url: "ManageCenter"
        },{
          SERIAL: 'pwd',
          name: "修改密码",
          url: "UpdatePass"
        }

      ]
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
    this.getUers();
    if (this.navId == 'cc') {
      this.nav1List = this.nav1List7;
      if(this.$route.params.tiao){
        this.nav1to2(this.nav1List[0],1)
      }else{
        this.nav1to2(this.nav1List[0])

      }
    }else {
      this.getNav(this.navId)
    }
  },
  methods: {
    getUers(){
      this.$api.post('/manage-platform/homePage/userInfo',{},
       r => {
         this.userName=r.data.userName;
      })
    },
    msg(){
      this.$api.post('/manage-platform/alarmEvents/getUntreatedNum',{},
       r => {
        console.log(r)
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
        }
        this.$router.push('/')

      })
    },
    getNav(navId) {
      this.navId = navId;
      this.$api.post('/manage-platform/muneSys/menuChild', {
          SERIAL: navId
        },
        r => {
          if(r.success){
            this.nav1List = r.data.menuChild;
            let arr=r.data.menuChild
            let nav1Id =this.$route.query.nav1Id;
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
        })

    },

    openNav() {
      this.navUlShow = !this.navUlShow
      if (this.navUlShow) {
        this.$api.post('/manage-platform/muneSys/selectMenuOne', {},
          r => {
            if(r.success){
              this.muneListOne = r.data.muneListOne
            }
          })
      }
    },
    topNavTo(SERIAL){
      this.$router.push({ name: 'Content', params: {navId:SERIAL} });
      this.getNav(SERIAL);
      this.tabList=[];
    },
    closeRight(index){
      // alert("杀杀杀")
      this.rightShow=index;
      document.oncontextmenu=function(){
          return false;
      }
    },
    nav1to2(nav1Itme,click) {
      this.isNav2Show();
      this.$router.push({query:{nav1Id:nav1Itme.SERIAL}})
      this.nav1Id = nav1Itme.SERIAL;
      this.nav2List = nav1Itme.menuList;
      let that=this;
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
      this.nav1Id=item.parentId;
      this.nav1List.map(function(a,b){
        if(a.SERIAL==item.parentId){
          this.nav2List = a.menuList;
        }
      },this)
      console.log(item, item.url)
      new Set(this.tabList)
      this.tabList.push(item)
      this.tabList = Array.from(new Set(this.tabList));
      this.$router.push({name: item.url,query:{nav1Id:item.parentId}})
    },
    nav2Top(item){
      console.log(item)
      this.nav2Id = item.url;
      this.nav1Id=item.parentId;
      this.nav1List.map(function(a,b){
        if(a.SERIAL==item.parentId){
          this.nav2List = a.menuList;
        }
      },this)
      // console.log(item, item.url)
      // new Set(this.tabList)
      // console.log(this.tabList)

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
      if (index > 0) {
        this.nav2Id = this.tabList[index - 1].url
        this.$router.push({name: this.nav2Id,query:{nav1Id:this.nav1Id}})
      }if(index==0){
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
  /* width: 116px; */
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
  background: url(./../assets/img/bg.png) ;
  /* background-size:  100% 100%; */
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
  top: 400px;
  margin-top: -22px;
  padding: 0 0 0 5px;
}

.nav1 {
  width: 110px;
  position: relative;
  margin-right: 10px;
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
  border-right: 10px #e8f3fc solid;
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
.nobg{
  background: none!important;
}
.tabList {
  width: 68%;
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
  position: relative;
}
.rightClick{
  position: absolute;
  top:36px;
  left: 0;
  width: 150px;
  background: #fff;
  padding: 20px;
  box-shadow:0 0 18px rgba(0, 204, 204, .5);
  z-index: 6;
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
