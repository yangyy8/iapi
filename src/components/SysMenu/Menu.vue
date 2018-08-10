<template lang="html">
  <div class="menu">
      <div class="middle">
          <div class="ak-tab">
            <div class="ak-tabs">
              <div class="ak-tab-item hand" :class="{'ak-checked':page==i.SERIAL}" @click="based(i)" v-for="i in menuList">
                {{i.name}}
              </div>
              <!-- <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="page=1;">
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
              </div> -->
            </div>
          </div>
          <div class="ak-tab-pane" >
            <el-row type="flex" style="height:100%" v-for="x in menuList2" :key="index">
              <el-col :span="24" >
                <span style="color:#BBBBBB; font-weight: bold">{{x.name}}</span>
                <ul  class="checkmenu-ul">
                    <li v-for='i in x.menuList'  :key="index" @click="update(i)" class="checkmenu mr-30 hand">

                      <img src="../../assets/img/menu/menu1.png" alt="" v-if="!i.choose">
                      <!-- <img src="../../assets/img/menu/menu2.png" alt="" > -->
                      <img src="../../assets/img/menu/menu3.png" alt="" v-if="i.choose">

                      <span :class="{'ckeckNav':i.choose}">{{i.name}}</span>
                    </li>
                </ul>

              </el-col>
            </el-row>
          </div>

          <div  class="checktitle">
            <span>已添加</span>
            <!-- <el-button type="primary" plain size='small' @click="update">保存</el-button> -->
          </div>
          <div class="ak-tab-pane1" >
            <ul  class="checkmenu-ul">
                <li v-for='i in nav1List'  :key="index" class="checkmenu mr-30 hand">


                  <img src="../../assets/img/menu/menu2.png">

                  <span class="ckeckNav">{{i.name}}</span>
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
      menuList: [],
      menuList2:[],
      nav1List: [],
    }
  },
  mounted() {
    this.openCYCC();
    this.getcc();
  },
  methods: {
    based(i) {
      console.log(i)
      this.page = i.SERIAL;
      this.menuList2=i.menuList;
    },
    openCYCC() {
      this.cyccShow = true;
      this.$api.post('/manage-platform/roleSys/menuSet', {},
        r => {
          console.log(r);
          this.menuList = r.data.menuSet
          this.based(this.menuList[0])
        })
    },
    getcc(){
      this.$api.post('/manage-platform/roleSys/selectmenuSet', {},
        r => {
          console.log(r);
          this.nav1List=r.data.menuSetChoose
        })
    },
    checkmm(i) {

      i.choose = !i.choose
      if (i.choose) {
        this.nav1List.push(i)
      } else {
        this.nav1List.splice(this.nav1List.indexOf(i), 1)

      }
    },
    update(i){
      this.checkmm(i);
      this.$api.post('/manage-platform/roleSys/menuSetUpdate', this.nav1List,
        r => {
          console.log(r);
          if(r.success){
            this.$message({
              message: '恭喜你，保存成功！',
              type: 'success'
            });
            this.getcc()
          }else{
            this.$message.error(r.message);
          }
        })
    }
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

.t-save {
  display: flex;
  justify-content: flex-end !important;
  width: 100%;
}

.t-save button {
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

.t-ak-li {
  margin-top: 6px;
  height: 45px !important;
}

.queryLeft {
  height: 107px;
  overflow-y: auto;
  border-right: 1px solid #ccc;
}

.queryRight {
  height: 107px;

}

.expression-text {
  width: 15% !important;
}

.checkmenu-ul {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0px;
}
.checkmenu-ul span{
  margin-top: 5px;
  display: inline-block;
  height: 40px;
  line-height: 20px;
  text-align: center;
  color: #bbb;
}
.ckeckNav{
  color: #333!important;
}
.checkmenu{
  width: 118px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.checktitle {
  margin-top: 20px;
  color: #417FC8;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}
</style>
