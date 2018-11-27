<template lang="html">
  <el-container class="content">
    <div class="bg-carousel">
      <transition name="fade2" mode="out-in">
        <div class="child1" v-if="bgjpg==1" key="1"></div>
        <div class="child2" v-if="bgjpg==2" key="2"></div>
        <div class="child3" v-if="bgjpg==3" key="3"></div>
      </transition>

    </div>

    <!-- <el-carousel :interval="20000" arrow="never" indicator-position="none" class="bg-carousel" height="100%">
      <el-carousel-item v-for="item in 3" :key="item">
      </el-carousel-item>
    </el-carousel> -->
    <el-header height="101px">
      <img src="../assets/img/logoo.png"  @click="rightShow=null">
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
          <el-dropdown trigger="click" >
             <span class="el-dropdown-link hand" style="color:#fff" @click.self="getNavData">
               欢迎您！{{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
             </span>
             <el-dropdown-menu slot="dropdown">
               <el-dropdown-item v-for="(x,index) in navIdCCdata" v-if="index!=0" :key="index"><span style="display:block;width:100%;height:100%" @click="rightNav(x)">{{x.name}}</span></el-dropdown-item>

               <!-- <el-dropdown-item><span style="display:block;width:100%;height:100%" @click="$router.push('/content/70/ManageCenter?nav1Id=71&nav2Id=73')">个人中心</span></el-dropdown-item> -->
               <!-- <el-dropdown-item><span @click="$router.push('/content/70/UpdatePass');navId='cc';nav2(x.SERIAL)">修改密码</span></el-dropdown-item> -->

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
          <li class="nav1-item " :class="{'nav1-checked':nav1Id==i.SERIAL}" v-for="(i,index) in nav1List.slice(nav1Star, nav1End)" @click="nav1to2(i.SERIAL,1)">

            <!-- <img src="../assets/img/navIcon/i_cc_1.png" alt="" class="nav1-icon"  v-if="navId=='cc'"> -->
            <img :src='"../assets/img/navIcon/"+i.MENU_ICON+"_0.png"' alt="" class="nav1-icon" v-if="nav1Id!=i.SERIAL">
            <img :src='"../assets/img/navIcon/"+i.MENU_ICON+"_1.png"' alt="" class="nav1-icon"  v-if="nav1Id==i.SERIAL">

            <span class="nav1-text" :class="{'text-checked':nav1Id==i.SERIAL}">{{i.name}}</span>
          </li>

          <li class="nav1bar-down" @click="nextList">
            <img src="../assets/img/navbar-down.png" alt="">
          </li>
        </ul>
        <!-- <transition  name="bounce"> -->
        <ul class="nav2" v-if="nav2Show">
          <li class="nav2-item hand" :class="{'nav2-checked':nav2Id==x.SERIAL}" v-for="x in nav2List" @click="nav2(x.SERIAL)">
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
          <li class="tabList-item hand" :style="{width:tabliwidth}" :class="{'tabList-checked':nav2Id==i.SERIAL}" @click.right="closeRight(index)"  v-for="(i, index) in tabList">
            <!-- <el-tooltip class="item" effect="dark" :content="i.name" placement="top"> -->
              <span  @click="tabNav2(i)">{{i.name}}</span>
            <!-- </el-tooltip> -->
            <img src="../assets/img/tab-close1.png" alt="guanbi" @click="close1(index,i)" class="hand" style="padding:8px" v-if="nav2Id==i.SERIAL">
            <img src="../assets/img/tab-close2.png" alt="" @click="tabList.splice(index, 1)" style="padding:8px" class="hand" v-else>

          </li>

          <!-- <li class="tabList-item">
            <img src="../assets/img/add_tab.png" class="hand">
          </li> -->
        </ul>
        <div class="tab-content">
            <transition name="fade"  mode="out-in">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
        </div>
      </el-main>
      <div class="rb-msg" v-if="msgShow">
        <div class="">
          <div class="rb-title">
            未处理消息
          </div>
          <div class="rb-closeBtn el-icon-close" @click="msgShow=false"></div>
          <div class="rb-content">
            <div class="rb-msg-item" v-for="(i,ind) in msgList" :key="ind">
              <a href="javascript:void(0)" @click="msgNav(i)">{{i.CONTENT}}，请点击查看</a>
            </div>
          </div>
        </div>

      </div>
    </el-container>
  </el-container>
</template>

<script>

export default {
  data() {
    return {
      bgjpg:1,
      rightShow:null,
      userName:'',
      navIdcc:null,
      nav1IdCC:null,
      navUlShow: false,
      tabliwidth:'120px',
      muneListOne: null,

      sideWidth: '295px',
      isCollapse: false,
      nav2Show: true,
      nav2HideBar: true,

      navId:null,
      nav1Id: null,
      nav1List: [],
      nav2Id: 1,
      nav2List: [],

      tabList: [],
      checkItem:{},

      navIdcc:null,
      navIdCCdata:null,
      navh: 0,
      nav1Star: 0,
      nav1End: 6,

      msgList:null,
      msgShow:false
    }
  },
  mounted() {
    this.getUers();
    this.bgChange();
    this.navInit();
    let _this=this;
    // this.msg()
    // setInterval(function() {
    //   _this.msg()
    // },180000)
  },
  watch:{
    tabList:function(val){
      if(val.length>8){
        console.log(this.tabList.length)
        this.tabliwidth=Math.floor(100/(this.tabList.length+1))+'%'
        console.log(this.tabliwidth)

      }
    }
  },
  methods: {
    // 背景动画效果=====================
    bgChange(){
      let that=this
      setInterval(function(){
        that.bgjpg++;
        if(that.bgjpg>3){
          that.bgjpg=1
        }
      },20000)
    },
    // 用户信息获取=========================
    getUers(){
      this.$api.post('/manage-platform/homePage/userInfo',{},
       r => {
         this.userName=r.data.userName;
      })
    },
    // 弹窗信息=============================
    msg(){
      this.$api.post('/manage-platform/MessageBounced/getMessageInfo ',{type:'bjcl'},
       r => {
        console.log(r);

        if(r.data.result.length!=0){
          this.msgList=r.data.result
          this.msgShow=true;
          // let html='';let arr= r.data.result;
          // for (var i = 0; i <arr.length; i++) {
          //   html+='<div><a href="#/content/1/ProcessMDBJ?nav1Id=8&nav2Id=22" onclick="aa()">'+arr[i].CONTENT+'</a></div>'
          // }
          // this.$notify({
          //   title: '未处理消息',
          //   duration:0,
          //   dangerouslyUseHTMLString:true,
          //   message: '<strong>'+html+'</strong>',
          //   position: 'bottom-right'
          // });
        }

      })
    },
    // 左侧菜单初始化=====================
    navInit(){
      this.navId = this.$route.params.navId;
      this.getNav(this.navId);
    },
    // 左侧菜单获取===============================
    getNav(navId) {
      this.$api.post('/manage-platform/muneSys/menuChild', {
          SERIAL: navId
        },
        r => {
          // console.log(r)
          if(r.success){
            this.nav1List = r.data.menuChild;
            this.nav1Id=this.$route.query.nav1Id||r.data.menuChild[0].SERIAL;
            console.log("nav1Id:",this.nav1Id);
            console.log("nav1List",this.nav1List)

            this.nav1to2(this.nav1Id);
          }
        })

    },

    // 点击一级菜单================================
    nav1to2(nav1Id,click) {
      this.nav1Id=nav1Id;
      this.$router.push({query:{nav1Id:nav1Id}})
      console.log(nav1Id)
      let _this=this;
      for(var i=0;i<this.nav1List.length;i++){
        var a=_this.nav1List[i];
        if(a.SERIAL==nav1Id){
          _this.nav2List=a.menuList;
          if(click==1){
            _this.nav2Id=a.menuList[0].SERIAL
          }else{
            _this.nav2Id=_this.$route.query.nav2Id||a.menuList[0].SERIAL
          }
          console.log("nav2List:",_this.nav2List);
          console.log("nav2Id1:",_this.nav2Id);
          _this.nav2(_this.nav2Id)
        }
      }

    },
    // 点击二级菜单======================================
    nav2(nav2Id) {
      console.log("nav2List:",this.nav2List);

      this.nav2Id = nav2Id;
      for(var i=0;i<this.nav2List.length;i++){
        if(this.nav2List[i].SERIAL==nav2Id){
          this.checkItem=this.nav2List[i];
          console.log("nav2Id2:",this.nav2Id);
          let _this=this;
          setTimeout(function(){
            _this.$router.push({name: _this.checkItem.url,query:{nav1Id:_this.checkItem.parentId,nav2Id:nav2Id}})

          },400)

          for(var j=0;j<this.tabList.length;j++){
            if(this.tabList[j].SERIAL==this.checkItem.SERIAL){
              // console.log("重复")
              return
            }
          }
          this.tabList.push(this.checkItem)
        }
      }




    },
    tabNav2(nav2Item){
      if(this.nav2Id==nav2Item.SERIAL) return;
      console.log('nav2Item:',nav2Item);
      console.log('nav2Id',this.nav2Id)
      if(nav2Item.rootId!=this.$route.params.navId){
        this.navId=nav2Item.rootId;
        console.log(nav2Item.rootId,this.$route.params.navId)
        let _this=this;
        setTimeout(function(){
          _this.$router.push({params: {navId:nav2Item.rootId}});
          _this.getNav(nav2Item.rootId)
        },400)


      }

      this.nav1Id = nav2Item.parentId;
      this.nav2Id = nav2Item.SERIAL;
      let _this=this;
      for(var i=0;i<this.nav1List.length;i++){
        if(_this.nav1List[i].SERIAL==_this.nav1Id){
          _this.nav2List=_this.nav1List[i].menuList
        }
      }

      console.log("nav1List",this.nav1List)
      console.log("nav2List:",this.nav2List);
      this.$router.push({name: nav2Item.url,query:{nav1Id:this.nav1Id,nav2Id:this.nav2Id}})

    },
    // 关闭tab页面==========================
    close1(index,item) {
      this.tabList.splice(index, 1);
      if (index > 0) {
        // this.nav2Id = this.tabList[index - 1].SERIAL
        this.tabNav2(this.tabList[index - 1])
        // this.$router.push({name: this.tabList[index - 1].url,query:{nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
      }if(index==0){
        if(this.tabList.length!=0){
          // this.nav2Id = this.tabList[index].SERIAL
          this.tabNav2(this.tabList[index])

          // this.$router.push({name: this.tabList[index].url,query:{nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
        }else {
          this.nav2Id=null;
          this.$router.push({name: 'Content',query:{nav1Id:this.nav1Id}})

        }

      }
    },
    // 顶部菜单获取=================================
    openNav() {
      this.navUlShow = !this.navUlShow
      if (this.navUlShow) {
      this.getNavData()
      }
    },
    getNavData(){
      if(this.muneListOne)return;
      this.$api.post('/manage-platform/muneSys/selectMenuOne', {},
        r => {
          if(r.success){
            this.muneListOne = r.data.muneListOne;
            this.muneListOne.map(function(a){
              if(a.name=='常用菜单'){
                this.navIdcc=a.SERIAL
                this.getNavCC(this.navIdcc)
              }
            },this)
          }
        })
    },
    getNavCC(navId){
      this.$api.post('/manage-platform/muneSys/menuChild', {
          SERIAL: navId
        },
        r => {
          if(r.success){
            // console.log(r)
            this.navIdCCdata=r.data.menuChild[0].menuList;
          }
        })

    },
    rightNav(x){
      this.$router.push({params:{navId:x.rootId},query:{nav1Id:x.parentId,nav2Id:x.SERIAL}})
      this.getNav(x.rootId);
    },
    msgNav(x){
      this.$router.push({params:{navId:x.ROOTID},query:{nav1Id:x.PARENTID,nav2Id:x.URLID}})
      this.getNav(x.ROOTID);
      this.msgShow=false;
    },
    // 顶部菜单跳转================================
    topNavTo(SERIAL){
      console.log(this.$route.params.navId,SERIAL)
      if(this.$route.params.navId==SERIAL)return;
      this.navId=SERIAL;
      console.log("顶部菜单跳转",SERIAL)
      this.$router.push({params: {navId:SERIAL}});
      console.log("this.$route.params.navId",this.$route.params.navId)
      let _this=this;
      setTimeout(function(){
        _this.getNav(SERIAL);
      },500)
      // this.tabList=[];
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
    closeRight(index){
      this.rightShow=index;
      document.oncontextmenu=function(){
          return false;
      }
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

  }
}

</script>

<style scoped>
.rb-msg{
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  z-index: 2000;
  bottom: 16px;
  right:16px;
  width: 330px;
  padding: 14px 26px 14px 13px;
  border-radius: 8px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #ebeef5;
  position: fixed;
  background-color: #fff;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  -webkit-transition: opacity .3s, left .3s, right .3s, top .4s, bottom .3s, -webkit-transform .3s;
  transition: opacity .3s, left .3s, right .3s, top .4s, bottom .3s, -webkit-transform .3s;
  transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s;
  transition: opacity .3s, transform .3s, left .3s, right .3s, top .4s, bottom .3s, -webkit-transform .3s;
  overflow: hidden;
}
.rb-title{
  font-weight: 700;
  font-size: 16px;
  color: #303133;
  /* margin-bottom: 10px; */
}
.rb-closeBtn{
  position: absolute;
  top: 18px;
  right: 15px;
  cursor: pointer;
  color: #909399;
  font-size: 16px;
}
.rb-content{
  font-size: 15px;
  line-height: 21px;
  margin: 6px 0 0;
  color: #606266;
  text-align: justify;
}
.rb-content a{
  line-height: 21px;
  font-weight: bold;
  color: #ff8b8b;
}
.rb-msg-item{
  padding: 10px;
}
.bg-carousel{
  position: absolute;
  top:0;
  left:0;
  height: 100%;
  width: 100%;
  z-index: -1;
}
.bg-carousel>div{
  width: 100%;
  height: 100%;
}
.el-carousel__item:nth-child(1),.child1 {

   background: url(../assets/img/bg/bg_9.jpg)
 }

 .el-carousel__item:nth-child(2),.child2{
   background: url(../assets/img/bg/bg_10.jpg)
 }
 .el-carousel__item:nth-child(3),.child3 {
   background: url(../assets/img/bg/bg_17.jpg)
 }
 /* .el-carousel__item:nth-child(4) {
   background: url(../assets/img/bg/bg_17.jpg)
 } */
.top-right {
  display: flex;
  align-items: center;
  position: absolute;
  right: 88px;
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

  padding: 25px 88px 16px 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  /* height:101px; */
  line-height: 60px;
}

.el-header img {}

.content {
  /* background: url(./../assets/img/bg.png) ; */
  /* background-size:  100% 100%; */
  padding-bottom: 115px;
  position: relative;
}

.main {
  margin: 0 30px;
  padding: 40px 0 0px 20px;
  background-color: rgba(27, 92, 168, 0.502);
  border-radius: 8px;
  min-height: 830px;
  display: flex;

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
  width: 100%;
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
  overflow: hidden;
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
  transition: all  0.2s;
}
.fade-enter-active {
    transition-delay:all 0.2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}


.fade2-enter-active, .fade2-leave-active {
  transition: opacity 0.5s;
}
.fade2-enter, .fade2-leave-to{
  opacity: 0.3;
}
</style>
