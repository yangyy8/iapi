<template lang="html">
  <div class="visaRules">
    <el-row  type="flex" style="height:100%" class="middle">
      <!-- 证件规则-->
      <el-col :span="8">
        <div class="middle">
          <!-- 证件规则标题 -->
          <el-row>
            <div class="title-green t-flex t-bb">
              <div>证件规则</div>
              <div>
                <span class="t-active">{{inactive}}</span>
                <el-switch
                  v-model="data.visaStatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value = '1'
                  inactive-value = '0'
                  @change="cardState(data.visaStatus)">
                </el-switch>
              </div>
            </div>
          </el-row>
          <div class="t-text" :class="{active:isActive}">注：有效期 ><= 时间（时间以服务器为准）</div>
          <!-- 证件规则搜索框 -->
          <el-row type="flex" align="center" style="width:100%">
            <div class="t-flex">
              <el-col :sm="24" :md="12" :lg="6" class="input-item t-input">
                <el-input v-model="card" :disabled="isActive" size="mini"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="4" class="input-item t-input-operator">
                <el-select placeholder="请选择" v-model="data.visaOperator" filterable  size="mini" :disabled="isActive">
                  <el-option label=">" value="1"></el-option>
                  <el-option label="<" value="2"></el-option>
                  <!-- <el-option label="=" value="3"></el-option> -->
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="4" class="input-item t-input">
                <el-select placeholder="时间选择" v-model="data.visaTime" filterable  size="mini" :disabled="isActive">
                  <el-option label="当前系统时间" value="sysdate"></el-option>
                  <el-option label="一个月" value="sysdate+30"></el-option>
                  <el-option label="两个月" value="sysdate+60"></el-option>
                  <el-option label="三个月" value="sysdate+90"></el-option>
                  <el-option label="六个月" value="sysdate+180"></el-option>
                  <el-option label="九个月" value="sysdate+270"></el-option>
                  <el-option label="一年" value="sysdate+360"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="3" class="selfButton">
                <el-button type="primary" size="mini" @click="addList(data.visaTime,data.visaOperator)" :disabled="isActive">修改</el-button>
              </el-col>
            </div>
          </el-row>
          <!-- 卡片 -->
          <el-row style="position:relative">
            <div class="card-disabled" v-show="isActive"></div>
            <el-card class="box-card t-card">
              <div slot="header" class="clearfix">
                <span>已加入</span>
              </div>
              <div class="t-list">
                <span>{{listText}}</span>
                <el-button icon="el-icon-delete" style="border:none" @click="deleteList(i)"></el-button>
              </div>
            </el-card>
          </el-row>
          <!--证件规则 登机牌 -->
          <el-row>
            <el-select placeholder="登机牌" v-model="data.visaCheckResult" filterable  size="mini" class="t-width100" :disabled="isActive">
              <!-- <el-option label="0Z - 允许登机" value="0Z"></el-option>
              <el-option label="1Z - 禁止登机" value="1Z"></el-option> -->
              <el-option label="2Z - 再次核对" value="2Z"></el-option>
              <!-- <el-option label="4Z - 数据错误" value="4Z"></el-option> -->
            </el-select>
            <el-input type="textarea" v-model="data.visaRuleDesc" class="t-width100" placeholder="请输入描述" autosize :disabled="isActive"></el-input>
          </el-row>
        </div>
      </el-col>
      <!-- 国家 -->
      <el-col :span="8">
        <div class="middle">
          <!-- 国家标题 -->
          <el-row>
            <div class="title-green t-flex t-bb">
              <div>国家</div>
              <div>
                <span class="t-active">{{countryInactive}}</span>
                <el-switch
                  v-model="data.nationalityStatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="1"
                  inactive-value="0"
                  @change="state(data.nationalityStatus)">
                </el-switch>
              </div>

            </div>
          </el-row>
          <!-- <div class="" style="position:relative"> -->

            <div class="t-text" :class="{active:countryIsActive}">注：输入关键字搜索国家并加入</div>
            <!-- 国家搜索框 -->
            <el-row type="flex" align="center" style="width:100%;margin-bottom: 5px;" :gutter="10">

              <div class="t-flex t-width100">
                <el-col :sm="24" :md="12" :lg="20" class="t-width100">
                  <el-select v-model="nationily" filterable @visible-change="nation" placeholder="国家搜索"  size="small" class="t-width100" :disabled="countryIsActive">
                    <el-option
                      v-for="item in nationName"
                      :key="item.CODE"
                      :value="item.CODE"
                      :label="item.CNAME"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="3" class="selfButton">
                  <el-button type="primary" size="mini" @click="countryAddList(nationily)" :disabled="countryIsActive">添加</el-button>
                </el-col>
              </div>
            </el-row>
            <!-- 卡片 -->
            <el-row style="position:relative">
              <div class="card-disabled" v-show="countryIsActive"></div>
              <el-card class="box-card t-card">
                <div slot="header" class="clearfix">
                  <span>已加入</span>
                </div>
                <div v-for="i in data.nationalityMapList" class="t-list">
                  <span>{{i.name}}</span>
                  <el-button icon="el-icon-delete" style="border:none" @click="countryDeleteList(i)"></el-button>
                </div>
              </el-card>
            </el-row>
            <!--证件规则 登机牌 -->
            <el-row>
              <el-select placeholder="登机牌" v-model="data.nationalityCheckResult" filterable  size="mini" class="t-width100" :disabled="countryIsActive">
                <!-- <el-option label="0Z - 允许登机" value="0Z"></el-option>
                <el-option label="1Z - 禁止登机" value="1Z"></el-option> -->
                <el-option label="2Z - 再次核对" value="2Z"></el-option>
                <!-- <el-option label="4Z - 数据错误" value="4Z"></el-option> -->
              </el-select>
              <el-input type="textarea" v-model="data.nationalityResponseresult" class="t-width100" placeholder="请输入描述" autosize :disabled="countryIsActive"></el-input>
            </el-row>
          <!-- </div> -->

        </div>
      </el-col>
      <!-- 入境口岸-->
      <el-col :span="8">
        <div class="middle">
          <!-- 入境口岸标题 -->
          <el-row>
            <div class="title-green t-flex t-bb">
              <div>入境口岸</div>
              <div>
                <span class="t-active">{{entryInactive}}</span>
                <el-switch
                  v-model="data.airportStatus"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="1"
                  inactive-value="0"
                  @change="entryState(data.airportStatus)">
                </el-switch>
              </div>
            </div>
          </el-row>
          <div class="t-text" :class="{active:entryIsActive}">注：输入关键字搜索口岸并加入</div>
          <!-- 入境搜索框 -->
          <el-row type="flex" align="center" style="width:100%;margin-bottom: 5px;" :gutter="10">

            <div class="t-flex t-width100">
              <el-col :sm="24" :md="12" :lg="20" class="t-width100">
                <el-select v-model="entry" filterable @visible-change="entrySearch" placeholder="入境口岸搜索"  size="small" class="t-width100" :disabled="entryIsActive">
                  <el-option
                    v-for="item in entryName"
                    :key="item.AIRPORT_CODE"
                    :value="item.AIRPORT_CODE"
                    :label="item.AIRPORT_NAME"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="3" class="selfButton">
                <el-button type="primary" size="mini" @click="entryAddList(entry)" :disabled="entryIsActive">添加</el-button>
              </el-col>
            </div>
          </el-row>
          <!-- 卡片 -->
          <el-row style="position:relative">
            <div class="card-disabled" v-show="entryIsActive"></div>
            <el-card class="box-card t-card">
              <div slot="header" class="clearfix">
                <span>已加入</span>
              </div>
              <div v-for="i in data.airportMapList" class="t-list">
                <span>{{i.name}}</span>
                <el-button icon="el-icon-delete" style="border:none" @click="entryDeleteList(i)"></el-button>
              </div>
            </el-card>
          </el-row>
          <!--证件规则 登机牌 -->
          <el-row>
            <el-select placeholder="登机牌" v-model="data.airportCheckResult" filterable  size="mini" class="t-width100" :disabled="entryIsActive">
              <!-- <el-option label="0Z - 允许登机" value="0Z"></el-option>
              <el-option label="1Z - 禁止登机" value="1Z"></el-option> -->
              <el-option label="2Z - 再次核对" value="2Z"></el-option>
              <!-- <el-option label="4Z - 数据错误" value="4Z"></el-option> -->
            </el-select>
            <el-input type="textarea" v-model="data.airportResponseresult" class="t-width100" placeholder="请输入描述" autosize :disabled="entryIsActive"></el-input>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="pd20 middle" type="flex" justify="center" style="height:100%">
      <!-- <el-col :span="24"> -->
        <el-button type="primary" size="medium" @click="save">保存并发布</el-button>
      <!-- </el-col> -->
    </el-row>
  </div>





</template>

<script>
export default {
  data(){
    return{
      card:'签证有效期',
      data:{
        visaRuleSerial:'',//证件规则id
        visaOperator:'>',
        visaTime:'',//证件有效期
        visaCheckResult:'2Z',//证件校验结果
        visaStatus:'1',//证件开关
        visaResponseresult:'',//证件规则描述

        nationalityRuleSerial:'',//国家规则id
        nationalityStatus:'1',//国家开关
        nationalityMapList:[],//已加入的国家代码集合
        nationalityCheckResult:'2Z',//国家规则校验结果
        nationalityResponseresult:'',//国家规则反馈结果

        airportRuleSerial:'',//口岸规则id
        airportStatus:'1',//入境口岸开关
        airportMapList:[],//已加入的口岸代码集合
        airportCheckResult:'2Z',//口岸规则校验结果
        airportResponseresult:''//口岸规则反馈结果
      },
      // 不需要传的参
      nationName:[],//国家接口list
      entryName:[],//入境口岸接口list
      nationily:'',//国家搜索框
      entry:'',//入境口岸搜索框

      country:"",
      listText:'',//证件已加入的证件有效期

      value:"0",
      isActive:false,
      countryIsActive:false,
      entryIsActive:false,

      inactive:'启用',
      countryInactive:'启用',
      entryInactive:'启用',

      show:false
    }
  },
  mounted(){
    this.getDate();
    this.addList(this.data.visaTime,this.data.visaOperator);
  },
  methods:{
    addList(item,oper){
      let itemLabel = '';
      if(item == 'sysdate'){
        itemLabel = '当前系统时间'
      }else if(item == 'sysdate+30'){
        itemLabel = '一个月'
      }else if(item == 'sysdate+60'){
        itemLabel = '两个月'
      }else if(item == 'sysdate+90'){
        itemLabel = '三个月'
      }else if(item == 'sysdate+180'){
        itemLabel = '六个月'
      }else if(item == 'sysdate+270'){
        itemLabel = '九个月'
      }else if(item == 'sysdate+360'){
        itemLabel = '一年'
      }

      let operLabel = '';
      if(oper == '1'){
        operLabel = '>'
      }else if(oper == '2'){
        operLabel = '<'
      }
      if(this.data.visaTime == ''){
        this.$message({
          message: '请填写完整信息！',
          type: 'warning'
        });
      }else{
        this.show = true;
        let str = "";
        str = this.card + '  ' +operLabel + '  ' +itemLabel;
        this.listText = str;
      }
    },
    deleteList(item){
      this.show = false;
    },
    countryAddList(item){
      let arr = this.nationName;
      let arr1 = this.data.nationalityMapList;
      let that = this;
      for(var i=0;i<arr.length;i++){
        let obj = {};
        if(arr[i].CODE == item){
          obj.name = arr[i].CNAME;
          obj.code = arr[i].CODE;
          for(var j=0;j<arr1.length;j++){
            if(arr1[j].code == item){
              this.$message({
                message: '此国籍已经加入，请重新选择！',
                type: 'warning'
              });
              return false
            }
          }
          this.data.nationalityMapList.push(obj);
        }
      }
    },
    countryDeleteList(i){
      let country = this.data.nationalityMapList.indexOf(i);
      this.data.nationalityMapList.splice(country,1);
    },
    entryAddList(item){
      let arr = this.entryName;
      let arr1 = this.data.airportMapList;
      let that = this;
      for(var i=0;i<arr.length;i++){
        let obj = {};
        if(arr[i].AIRPORT_CODE == item){
          obj.name = arr[i].AIRPORT_NAME;
          obj.code = arr[i].AIRPORT_CODE;
          for(var j=0;j<arr1.length;j++){
            if(arr1[j].code == item){
              this.$message({
                message: '此入境口岸已经加入，请重新选择！',
                type: 'warning'
              });
              return false
            }
          }
          this.data.airportMapList.push(obj);
        }
      }

    },
    entryDeleteList(it){
      let entry = this.data.airportMapList.indexOf(it);
      this.data.airportMapList.splice(entry,1);
    },
    state(item){
      if(item == '1'){
        this.countryInactive = "启用";
        this.countryIsActive = false;
      }else if(item == '0'){
        this.countryInactive = "禁用";
        this.countryIsActive = true;
      }
    },
    cardState(item){
      console.log(this.data.visaStatus);
      if(item == '1'){
        console.log(1);
        this.inactive = "启用";
        this.isActive = false;
      }else if(item == '0'){
        console.log(2);
        this.inactive = "禁用";
        this.isActive = true;
      }
    },
    entryState(item){
      if(item == '1'){
        this.entryInactive = "启用";
        this.entryIsActive = false;
      }else if(item == '0'){
        this.entryInactive = "禁用";
        this.entryIsActive = true;
      }
    },
    nation(){ //国籍搜索
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationName = r.data;
         };
       })
    },
    entrySearch(){//入境口岸搜索
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r => {
         if(r.success){
           console.log(r);
           this.entryName = r.data;
         };
       })
    },
    getDate(){
      this.$api.post('/manage-platform/visaRule/queryVisaRule',{},
      r =>{
        if(r.success){
          this.data = r.data;
          if(this.data.visaTime != ''){
            this.addList(this.data.visaTime,this.data.visaOperator);
          }
          this.state(this.data.nationalityStatus);
          this.cardState(this.data.visaStatus);
          this.entryState(this.data.airportStatus);
        }
      })
    },
    save(){
      this.$api.post('/manage-platform/visaRule/saveVisaRule',this.data,
      r =>{
        if(r.success){
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
<style media="screen">
.t-flex{
  display: flex;
  justify-content: space-between;
}
.t-bb{
  border-bottom: 1px solid #ccc;
}
.tooltip{
  margin-top: 6px;
}
.t-input{
  width: 30%!important;
}
.t-input-operator{
  width: 22%!important;
}
.t-text{
  font-size: 12px;
  color: #F7B74E;
}
.el-card__header{
  padding: 2px 0px 2px 20px!important;
}
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
  box-shadow: 0 0px 0px 0 rgba(0,0,0,0);
}
.t-list{
  border-bottom: 1px solid #ccc;
  padding: 5px 0px 5px 20px;
  display: flex;
  justify-content: space-between;
}
.el-card__body{
  padding: 0!important;
}
.t-card{
  height: 400px;
  overflow-y: scroll;
}
.t-width100{
  width: 100%;
}
.t-active{
  color: #000;
  font-weight: normal;
  font-size: 13px;
}
.active{
  color: #ccc;
}
.card-disabled{
  position:absolute;
  width:100%;
  height:100%;
  z-index:999;
  background:rgba(245,247,250,0.7)
}
.pd20{
  padding: 40px;
}
</style>
