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
            <li class="top-nav-li hand" v-for="i in muneListOne" :class="{'topCheckLi':navId==i.SERIAL}" @click="$router.push({ name: 'Content', params: {navId:i.SERIAL} });getNav(i.SERIAL)">
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
          <span>欢迎您！管理员</span>
          <!-- <div class="top-list-down">
            <a> 报警</a>
            <a> 设置</a>
            <a> 退出</a>
          </div> -->
        </div>
      </div>
    </el-header>
    <el-container class="main">
      <el-aside :width="sideWidth" class="left">
        <ul class="nav1">
          <li class="nav1bar-up" @click="preList">
            <img src="../assets/img/navbar-up.png" alt="">
          </li>
          <li class="nav1-item " :class="{'nav1-checked':nav1Id==i.SERIAL}" v-for="(i,index) in nav1List.slice(nav1Star, nav1End)" @click="nav1to2(i.SERIAL,i.menuList)">
            <img :src='"../assets/img/navIcon/"+i.MENU_ICON+"_0.png"' alt="" class="nav1-icon" v-if="nav1Id!=i.SERIAL">
            <img :src='"../assets/img/navIcon/"+i.MENU_ICON+"_1.png"' alt="" class="nav1-icon"  v-if="nav1Id==i.SERIAL">

            <span class="nav1-text" :class="{'text-checked':nav1Id==i.SERIAL}">{{i.name}}</span>
          </li>

          <li class="nav1bar-down" @click="nextList">
            <img src="../assets/img/navbar-down.png" alt="">
          </li>
        </ul>
        <ul class="nav2" v-show="nav2Show">
          <li class="nav2-item hand" :class="{'nav2-checked':nav2Id==x.SERIAL}" v-for="x in nav2List" @click="nav2(x)">
            {{x.name}}
          </li>

        </ul>
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
          <li class="tabList-item hand" :class="{'tabList-checked':nav2Id==i.SERIAL}" v-for="(i, index) in tabList">
            <el-tooltip class="item" effect="dark" :content="i.name" placement="top">
              <span  @click="nav2(i)">{{i.name}}</span>
            </el-tooltip>

            <img src="../assets/img/tab-close1.png" alt="guanbi" @click="close1(index)" class="hand" v-if="nav2Id==i.SERIAL">
            <img src="../assets/img/tab-close2.png" alt="" @click="tabList.splice(index, 1)" class="hand" v-else>
          </li>
          <!-- <li class="tabList-item">
            <img src="../assets/img/add_tab.png" class="hand">
          </li> -->
        </ul>
        <div class="tab-content">
            <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      navUlShow:false,
      muneListOne:[],
      sideWidth: '295px',
      isCollapse: false,
      nav2Show: true,
      nav2HideBar: true,
      nav1Id: 1,
      navh: 0,
      nav1List:[],
      nav2List: [],
      nav2Id: 1,
      nav1Star: 0,
      nav1End: 6,
      tabList: []
    }
  },
  mounted() {
    this.navId = this.$route.params.navId;
    console.log(this.navId)

    this.getNav(this.navId)
  },
  methods: {
    getNav(navId){
      this.navId=navId;

      this.$api.post('/eamp/muneSys/menuChild', {SERIAL:navId},
        r => {
          console.log(r);
          this.nav1List=r.data.menuChild;
          console.log(this.nav1List[0].SERIAL)
          this.nav1to2(this.nav1List[0].SERIAL, this.nav1List[0].menuList)

      })

    },
    openNav(){
      this.navUlShow=!this.navUlShow
      if(this.navUlShow){
        this.$api.post('/eamp/muneSys/selectMenuOne',{},
         r => {
           console.log(r);
           this.muneListOne=r.data.muneListOne
        })
      }
    },
    nav1to2(id, list) {
      this.isNav2Show();
      console.log(id)
      this.nav1Id = id;
      // this.nav2Id=11;
      this.nav2List = list
    },
    nav2(item) {
      this.nav2Id = item.SERIAL;
      console.log(item, item.SERIAL)
      new Set(this.tabList)
      this.tabList.push(item)
      this.tabList = Array.from(new Set(this.tabList));
      this.$router.push({
        name: item.url
      })
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
        this.nav2Id = this.tabList[index - 1].SERIAL
      }
    }
  }
}
</script>

<style scoped>
.top-right{
  display: flex;
  align-items: center;
}
.top-right-1{
  width: 116px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  line-height: 20px;
}
.top-right-1 a{
  color: #fff;
}
.top-nav{
  display: flex;
  align-items: center;
}
.top-nav-ul{
  height: 40px;
  display: flex;
  background: rgba(27,92,168,0.50);
  color: #fff;
  line-height: 40px;
  border-radius:6px 0 0 6px;

}
.top-nav-li{
  width: 94px;
  text-align: center;
}
.top-nav-li:hover,.topCheckLi{
  border-radius:6px;
  color: #4a90e2;
  background: #ddeffd;
}

.nav-btn{
  width: 86px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: rgba(27,92,168,0.50);
  color: #fff;
  border-radius:6px;
}
.openNav{
  border-radius:0 6px 6px 0;

}
.text-checked{
  color: #0781e5!important;
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
}

.nav1 {
  width: 110px;
  position: relative;
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
  margin-left: 9px;
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
}

.tabList-item {
  margin-right: 5px;
  width: 120px;
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
  width: 105px;
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
</style>
