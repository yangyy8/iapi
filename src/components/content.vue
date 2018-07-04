<template lang="html">
  <el-container class="content">

    <el-header height="150px">
      <img src="../assets/img/logoo.png" alt="">
      <div class="top-right">
        <el-button @click="$router.push('/')">返回主菜单</el-button>
      </div>
    </el-header>
    <el-container class="main">
      <el-aside :width="sideWidth" class="left">
        <ul class="nav1">
          <li class="nav1bar-up" @click="preList">
            <img src="../assets/img/navbar-up.png" alt="">
          </li>
          <li class="nav1-item " :class="{'nav1-checked':nav1Id==i.id}" v-for="(i,index ) in nav1List.slice(nav1Star, nav1End)" @click="nav1to2(i.id,i.list)">
            <img src="../assets/img/nav1.png" alt="" class="nav1-icon">
            <span class="nav1-text">{{i.text}}</span>
          </li>

          <li class="nav1bar-down" @click="nextList">
            <img src="../assets/img/navbar-down.png" alt="">
          </li>
        </ul>
        <ul class="nav2" v-show="nav2Show">
          <li class="nav2-item hand" :class="{'nav2-checked':nav2Id==x.id}" v-for="x in nav2List" @click="nav2(x)">
            {{x.text}}
          </li>

        </ul>
        <div class="fold-bar" @click="isNav2Hide" v-if="nav2HideBar">
          <img src="../assets/img/elasticbar_nor.png" alt="">
        </div>
        <div class="fold-bar" @click="isNav2Show" v-else>
          <img src="../assets/img/spread_nor.png" alt="">
        </div>
      </el-aside>


      <el-main class="right-main">
        <ul class="tabList">
          <li class="tabList-item hand" :class="{'tabList-checked':nav2Id==i.id}" v-for="(i, index) in tabList">
            <span  @click="nav2(i)">{{i.text}}</span>
            <img src="../assets/img/tab-close1.png" alt="" @click="tabList.splice(index, 1)" class="hand" v-if="nav2Id==i.id">
            <img src="../assets/img/tab-close2.png" alt="" @click="tabList.splice(index, 1)" class="hand" v-else>
          </li>
          <li class="tabList-item">
            <img src="../assets/img/add_tab.png" class="hand">
          </li>
        </ul>
        <div class="tab-content">
          <router-view></router-view>
        </div>
        <!-- <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
     return {
       sideWidth:'295px',
       isCollapse: false,
       tableData: Array(6).fill(item),
       nav2Show:true,
       nav2HideBar:true,
       nav1Id:1,
       nav1List:[
         {
           id:1,
           text:"报警处理",
           list:[
             {
               id:1,
               text:"名单比对报警",
               name:"ProcessMDBJ"
             },
             {
               id:2,
               text:"二次查控报警",
               name:"ProcessECBDBJ"
             },
             {
               id:3,
               text:"重点关注人员预报警"
               name:"ProcessZDGZRY"
             },

           ]
         },
         {
           id:2,
           text:"常规业务处理",
           list:[
             {
               id:1,
               text:"指令变更",
               name:"ProcessZLBG"
             },

           ]
         },
         {
           id:3,
           text:"备降航班处理",
           list:[
             {
               id:1,
               text:"航班状态变更",
               name:"ProcessHBZT"
             },
           ]
         },

           ]
         }
       ],
       nav1List2:[
         {
           id:1,
           text:"信息查询",
           list:[
             {
               id:1,
               text:"人员信息查询",
               name:"QueryRYXX"
             },
             {
               id:2,
               text:"业务事件查询",
               name:"QueryYWSJ"
             },
             {
               id:3,
               text:"航班信息查询",
               name:"QueryHBXX"
             },
             {
               id:4,
               text:"命中人员查询",
               name:"QueryMZRY"
             },
             {
               id:5,
               text:"关联人员查询",
               name:"QueryGLRY"
             },
             {
               id:6,
               text:"业务规则查询",
               name:"QueryYWGZ"
             },
             {
               id:7,
               text:"校验比对结果查询",
               name:"QueryJYBDJG"
             },

           ]
         },
       }

           ]
         }
       ],
       nav1List3:[
         {
           id:1,
           text:"名单管理",
           list:[
             {
               id:1,
               text:"名单数据分析",
               name:"ListMDSJFX"
             },
             {
               id:2,
               text:"白名单管理",
               name:"ListBMD"

             },
             {
               id:3,
               text:"临控名单管理",
               name:"ListLKMD"
             },
             {
               id:4,
               text:"重点关注人员",
               name:"LIstZDGZRYMD"
             },

           ]
         },
         {
           id:2,
           text:"业务规则管理",
           list:[
             {
               id:1,
               text:"数据项校验规则管理",
               name:"ListSJXJYGZ"
             },
             {
               id:2,
               text:"一般性规则管理",
               name:"ListYBXGZ"
             },
             {
               id:3,
               text:"免签规则管理",
               name:"ListMQGZ"
             },

           ]
         },

       ],
       nav1List4:[
         {
           id:1,
           text:"全国监控",
           list:[
             {
               id:1,
               text:"全国航班实时监控",
               name:"NationalHBSSJK"
             },


           ]
         },


       ],
       nav1List5:[
         {
           id:1,
           text:"机构管理",
           list:[
             {
               id:1,
               text:"部门管理",
               name:"ManageBM"
             },
             {
               id:2,
               text:"用户管理",
               name:"ManageYH"

             },


           ]
         },
         {
           id:2,
           text:"权限管理",
           list:[
             {
               id:1,
               text:"角色管理",
               name:"ManageJS"
             },
             {
               id:2,
               text:"集中用户管理",
               name:"ManageJZYH"
             },
             {
               id:3,
               text:"用户认证与登录",
               name:"ManageDL"
             },

           ]
         },

       ],
       nav1List6:[
         {
           id:1,
           text:"运行状态监控",
           list:[
             {
               id:1,
               text:"服务器监控",
               name:"MonitorFWQ"
             },
             {
               id:2,
               text:"数据库监控",
               name:"MonitorSJK"

             },
             {
               id:3,
               text:"应用程序监控",
               name:"MonitorYYCX"
             },
             {
               id:4,
               text:"接口服务监控",
               name:"MonitorJKFW"
             },
             {
               id:5,
               text:"Redis监控",
               name:"MonitorRedis"
             },
             {
               id:6,
               text:"MQ监控",
               name:"MonitorMQ"
             },
             {
               id:7,
               text:"边界交换平台监控",
               name:"MonitorBJJHPT"
             },

           ]
         },
         {
           id:2,
           text:"数据监控",
           list:[
             {
               id:1,
               text:"数据一致性监控",
               name:"MonitorSJYZX"
             },
             {
               id:2,
               text:"技术网关监控",
               name:"MonitorJSWG"
             },
             {
               id:3,
               text:"整合分发监控",
               name:"MonitorZHFF"
             },
             {
               id:4,
               text:"数据定位",
               name:"MonitorSJDW"
             },

           ]
         },
         {
           id:3,
           text:"日志监控",
           list:[
             {
               id:1,
               text:"日志监控",
               name:"MonitorRZJK"
             },

           ]
         },
         {
           id:4,
           text:"性能监控",
           list:[
             {
               id:1,
               text:"校验比对性能监控",
               name:"MonitorJYBDXN"
             },
             {
               id:2,
               text:"整合分发性能监控",
               name:"MonitorZHFFXN"
             },
             
           ]
         },

       ],
       nav2List:[],
       nav2Id:1,
       nav1Star:0,
       nav1End:6,
       tabList:[]
     }
   },
   mounted(){
     this.navId=this.$route.query.navId;
     console.log(this.navId)
     if(this.navId==2){
       this.nav1List=this.nav1List2
     }else if(this.navId==3){
       this.nav1List=this.nav1List3
     }
     this.nav1to2(1,this.nav1List[0].list)

   },
   methods: {
     nav0(){
       let p={};
       this.$api.post('/',p,
        r => {
          console.log(r);
          this.nav1List=r.Data.DataChecks;
       })
     },
     nav1to2(id,list){
       this.isNav2Show();
       this.nav1Id=id;
       this.nav2Id=1;
       this.nav2List=list
     },
     nav2(item){
       this.nav2Id=item.id;
       console.log(item)
       new Set(this.tabList)

       this.tabList.push(item)
       this.tabList = Array.from(new Set(this.tabList));
       this.$router.push({name:item.name})

     },
     preList(){
       if(this.nav1Star==0){
         return
       }
       this.nav1Star--;
       this.nav1End--;

     },
     nextList(){
      if(this.nav1End==this.nav1List.length){
        return;
      }
       this.nav1Star++;
       this.nav1End++;
       console.log(this.nav1Star,this.nav1End)
     },
     isNav2Hide(){
       this.sideWidth='120px';
       this.nav2Show=false;
       this.nav2HideBar=false;
     },
     isNav2Show(){
       this.sideWidth='295px';
       this.nav2Show=true;
       this.nav2HideBar=true;
     }
   }
}
</script>

<style scoped>
.el-header{
  padding: 0 88px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-header img{

}
.content{
  background: url(../assets/img/bg.png) no-repeat;
  background-size: 100% 100%;
  padding-bottom: 115px;
}
.main{
  margin: 0 60px;
  padding: 40px 0 0px 20px;
  background-color: rgba(27, 92, 168, 0.502);
  border-radius: 8px;
  min-height: 830px;
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
.fold-bar{
  position: absolute;
  right:0;
  top:50%;
  margin-top: -22px;
}
.nav1{
  width: 110px;
  position: relative;
}


.nav1bar-up{
  background-color: rgba(255, 255, 255, 0.2);
  width: 110px;
  height: 40px;
  margin-bottom: 9px;
  border-radius: 6px 6px 0 0 ;
  text-align: center;
  line-height: 40px;
}
.nav1bar-down{
  background-color: rgba(255, 255, 255, 0.2);
  width: 110px;
  height: 40px;
  border-radius:  0 0 6px 6px;
  text-align: center;
  line-height: 40px;
  position: absolute;
  bottom: 17px;
}
.nav1-item{
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
.nav1-checked{
  border-radius: 6px 0 0 6px;
  background-color: #e8f3fc;
  color: #007be2;
  border-right: 9px #e8f3fc solid;
}
.nav1-icon{
  margin-bottom: 12px;
}
.nav1-text{
  color: #2ad9f4;
  font-size: 15px;
}
.nav2{
  width:176px;
  background: #e8f3fc;
  margin-left: 9px;
  padding: 49px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.nav2-item{
  text-align: center;
  height: 32px;
  /* width: 128px; */
  padding: 0 10px;
  line-height: 32px;
  margin-bottom: 12px;
  font-size: 15px;
}
.nav2-checked{
  border-radius: 5px;
  width: 80%;
  background: linear-gradient( 360deg, rgb(9,171,236) 0%, rgb(0,121,228) 100%);
  color: #fff;
  font-weight: bold;
}


.right-main{
  padding: 0;
  position: relative;
  overflow: inherit !important;
  background: #def0fc;
}
.tabList{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 36px;

  position: absolute;
  top:-36px;
}
.tabList-item{
  margin-right: 5px;
  /* width: 130px; */
  padding: 0 18px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 6px 6px 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 14px;
  color: #fff;
}
.tabList-item span{
  margin-right: 10px;
}
.tabList-checked{
  background: #def0fc;
  color: #0084cc;
}
.tab-content{
  padding: 20px;
}
</style>
