<template lang="html">
  <div class="menu">
      <div class="middle">
          <div class="ak-tab">
            <div class="ak-tabs">
              <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="based">
                业务处理
              </div>
              <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="page=1;">
                业务应用
              </div>
              <div class="ak-tab-item hand" :class="{'ak-checked':page==2}" @click="page=2;">
                业务监控
              </div>
              <div class="ak-tab-item hand" :class="{'ak-checked':page==3}" @click="page=3;">
                业务管理
              </div>
              <div class="ak-tab-item hand" :class="{'ak-checked':page==4}" @click="page=4;">
                系统管理
              </div>
              <div class="ak-tab-item hand" :class="{'ak-checked':page==5}" @click="page=5;">
                系统监控
              </div>
            </div>
          </div>

              <div class="ak-tab-pane" >
                <el-row type="flex" style="height:100%" v-show="page==0">
                  <el-col :span="24" style="color:#BBBBBB; font-weight: bold">
                    <span>名单管理</span>
                    <ul  class="checkmenu-ul">
                        <li v-for='i in nav1List3[0].list' @click="checkmm(i)" @mouseover="checkmm()" class="checkmenu mr-30 hand">

                          <img src="../../assets/img/menu/menu1.png" alt="" v-if="i.incy==0">
                          <!-- <img src="../../assets/img/menu/menu2.png" alt="" > -->
                          <img src="../../assets/img/menu/menu3.png" alt="" v-if="i.incy==1">

                          <span>{{i.text}}</span>
                        </li>
                    </ul>

                  </el-col>
                </el-row>
                <el-row type="flex" style="height:100%" v-show="page==1">
                  <el-col :span="24" >adsfsdf</el-col>
                </el-row>
                <el-row type="flex" style="height:100%" v-show="page==2">
                  <el-col :span="24" >adsfsdf</el-col>
                </el-row>
                <el-row type="flex" style="height:100%" v-show="page==3">
                  <el-col :span="24" >adsfsdf</el-col>
                </el-row>
                <el-row type="flex" style="height:100%" v-show="page==4">
                  <el-col :span="24" >adsfsdf</el-col>
                </el-row>
                <el-row type="flex" style="height:100%" v-show="page==5">
                  <el-col :span="24" >adsfsdf</el-col>
                </el-row>
              </div>

                <div  class="checktitle">已添加</div>
                <div class="ak-tab-pane1" >
                  <ul  class="checkmenu-ul">
                      <li v-for='i in nav1List' class="checkmenu mr-30 hand">


                        <img src="../../assets/img/menu/menu2.png">

                        <span>{{i.text}}</span>
                      </li>
                  </ul>
                </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        page: 0,
        nav1List:[],
        nav1List3: [{
            id: 1,
            text: "名单管理",
            list: [{
                id: 11,
                text: "名单数据分析",
                name: "ListMDSJFX",
                incy:0
              },
              {
                id: 12,
                text: "白名单管理",
                name: "ListBMD",
                incy:0
              },
              {
                id: 13,
                text: "临控名单管理",
                name: "ListLKMD",
                incy:0
              },
              {
                id: 14,
                text: "重点关注人员",
                name: "LIstZDGZRYMD",
                incy:0
              },

            ]
          },
          {
            id: 2,
            text: "业务规则管理",
            list: [{
                id: 21,
                text: "数据项校验规则管理",
                name: "ListSJXJYGZ"
              },
              {
                id: 22,
                text: "一般性规则管理",
                name: "ListYBXGZ"
              },
              {
                id: 23,
                text: "免签规则管理",
                name: "ListMQGZ"
              },

            ]
          },

        ],
    }
  },
    methods: {
      based(){
        this.page = 0;
      },
      checkmm(i){

        i.incy=!i.incy
        if(i.incy){
          this.nav1List.push(i)
        }else{
          this.nav1List.splice(this.nav1List.indexOf(i),1)

        }
      },
    }
}
</script>

<style scoped>
.ak-tab {}
.ak-tabs {
  display: flex;
}

.ak-tab-item {
  background: #399bfe;
  color: #fff;
  font-size: 14px;
  margin-right: 6px;
  border-radius: 5px 5px 0 0;
  padding: 0 16px;
}

.ak-checked {
  background: #fff;
  color: #399bfe;
  border: 1px #cccccc solid;
  border-bottom: 1px #fff solid;
  margin-bottom: -1px;
}

.ak-tab-pane {
  border: 1px #cccccc solid;
  padding: 20px;
  border-radius: 0 5px 5px 5px;
}

.ak-tab-pane1 {
  border: 1px #417FC8 solid;
  padding: 20px;
  border-radius: 0 5px 5px 5px;
}

.akcheck2top {
  background: #f6f7fb;
  /* height: 28px; */
  padding: 6px;
}

.middle-btn-g {
  display: flex;
  justify-content: center;
}
.t-save{
  display: flex;
  justify-content: flex-end!important;
  width:100%;
}
.t-save button{
  font-size: 14px;
  height: 27px;
  width: 80px;
  border: none;
  border-radius: 5px;
  background-color: #16A4FD;
  color: #fff;
  margin-top: 2px;
}
.middle-btn-g button {
  height: 32px;
  width: 107px;
  border: none;
  border-radius: 5px;
  background: none;
  background: linear-gradient( 360deg, rgb(9, 171, 236) 0%, rgb(0, 121, 228) 100%);
  color: #fff;
}

.akUl {
  height: 110px;
  overflow-y: auto;
  overflow-x: scroll;
}

.akUl img {
  height: 15px;
  width: 21px;
  margin-right: 8px;
}

.ak-li {
  width: 3000px;
  height: 58px;
  align-items: center;
  /* padding: 0 30px; */
  /* line-height: 32px; */

}
.t-ak-li{
  margin-top: 6px;
  height: 45px!important;
}
.queryLeft{
  height: 107px;
  overflow-y: auto;
  border-right: 1px solid #ccc;
}
.queryRight{
  height:107px;

}
.expression-text{
  width: 15%!important;
}
.checkmenu-ul{
  display: flex;
  margin: 10px 0px;
}
.checkmenu{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.checktitle{margin-top: 20px;color:#417FC8; font-weight:bold;}
</style>
