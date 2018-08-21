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
          <div class="t-text" :class="{active:isActive}">注：当前系统时间以服务器为准</div>
          <!-- 证件规则搜索框 -->
          <el-row type="flex" align="center" justify="space-between" style="width:100%;margin-bottom: 5px;">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <el-select placeholder="请选择" v-model="data.fieldName" filterable clearable size="mini" :disabled="isActive" @visible-change="codeName" class="t-input">
                  <el-option
                   v-for="item in code"
                  :key="item.FIELDNAME"
                  :value="item.FIELDNAME"
                  :label="item.FIELDDES">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="5" class="input-item">
                <el-select placeholder="请选择" v-model="data.visaOperator" filterable clearable  size="mini" :disabled="isActive" class="t-input">
                  <el-option label="大于" value="1"></el-option>
                  <el-option label="小于" value="2"></el-option>
                  <!-- <el-option label="=" value="3"></el-option> -->
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <el-select placeholder="时间选择" v-model="data.visaTime" filterable clearable  size="mini" :disabled="isActive" class="t-input">
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
                <el-button type="primary" size="mini" @click="addList(data.fieldName,data.visaTime,data.visaOperator)" :disabled="isActive">添加</el-button>
              </el-col>
            <!-- </div> -->
          </el-row>
          <!-- 卡片 -->
          <el-row style="position:relative">
            <div class="card-disabled" v-show="isActive"></div>
            <el-card class="box-card t-card">
              <div slot="header" class="clearfix">
                <span>准入规则</span>
              </div>
              <div class="t-list" v-show="show">
                <span>{{listText}}</span>
                <el-button icon="el-icon-delete" style="border:none" @click="deleteList(i)"></el-button>
              </div>
            </el-card>
          </el-row>
          <!--证件规则 登机牌 -->
          <el-row>
            <div class="checkResultContent">
              <div class="checkResult">
                <div class="clearfix">
                  <span>反馈结果</span>
                </div>
              </div>
              <div class="checkResultInput">
                <el-select placeholder="请选择反馈结果" v-model="data.visaCheckResult" filterable clearable size="mini" class="t-width100" :disabled="isActive">
                  <!-- <el-option label="0Z - 允许登机" value="0Z"></el-option> -->
                  <el-option label="1Z - 禁止登机" value="1Z"></el-option>
                  <el-option label="2Z - 再次核对" value="2Z"></el-option>
                  <el-option label="4Z - 数据错误" value="4Z"></el-option>
                </el-select>
              </div>
            </div>
          </el-row>
          <!-- 证件规则 反馈描述 -->
          <el-row>
            <div class="checkResultContent">
              <div class="checkResult">
                <div class="clearfix">
                  <span>反馈描述</span>
                </div>
              </div>
              <div class="checkResultInput">
                <el-input type="textarea" v-verify.input.blur="{regs:'noCinese',submit:'card'}" maxlength="100" v-model="data.visaResponseresult" class="t-width100" placeholder="请输入描述"  :autosize="{ minRows: 3, maxRows: 3}" :disabled="isActive"></el-input>
              </div>
             </div>
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
            <el-row type="flex" align="center" justify="space-between" style="width:100%;margin-bottom: 5px;">
                <el-col :sm="24" :md="18" :lg="21" class="input-item">
                  <el-select v-model="nationily" filterable clearable @visible-change="nation" placeholder="国家搜索"  size="small" class="t-input" :disabled="countryIsActive">
                    <el-option
                      v-for="item in nationName"
                      :key="item.CODE"
                      :value="item.CODE"
                      :label="item.CODE+' - '+item.CNAME"
                    ></el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="6" :lg="3" class="selfButton">
                  <el-button type="primary" size="mini" @click="countryAddList(nationily)" :disabled="countryIsActive">添加</el-button>
                </el-col>
            </el-row>
            <!-- 卡片 -->
            <el-row style="position:relative">
              <div class="card-disabled" v-show="countryIsActive"></div>
              <el-card class="box-card t-card">
                <div slot="header" class="clearfix">
                  <span>准入国家</span>
                </div>
                <div v-for="i in data.nationalityMapList" class="t-list">
                  <span>{{i.name}}</span>
                  <el-button icon="el-icon-delete" style="border:none" @click="countryDeleteList(i)"></el-button>
                </div>
              </el-card>
            </el-row>
            <!--国家 登机牌 -->
            <el-row>
              <div class="checkResultContent">
                <div class="checkResult">
                  <div class="clearfix">
                    <span>反馈结果</span>
                  </div>
                </div>
                <div class="checkResultInput">
                  <el-select placeholder="请选择反馈结果" v-model="data.nationalityCheckResult" filterable clearable size="mini" class="t-width100" :disabled="countryIsActive">
                    <!-- <el-option label="0Z - 允许登机" value="0Z"></el-option> -->
                    <el-option label="1Z - 禁止登机" value="1Z"></el-option>
                    <el-option label="2Z - 再次核对" value="2Z"></el-option>
                    <el-option label="4Z - 数据错误" value="4Z"></el-option>
                  </el-select>
                </div>
              </div>
            </el-row>
            <!-- 国家 反馈描述 -->
            <el-row>
              <div class="checkResultContent">
                <div class="checkResult">
                  <div class="clearfix">
                    <span>反馈描述</span>
                  </div>
                </div>
                <div class="checkResultInput">
                  <el-input type="textarea" v-verify.input.blur="{regs:'noCinese',submit:'contryCard'}" maxlength="100" v-model="data.nationalityResponseresult" class="t-width100" placeholder="请输入描述" :autosize="{ minRows: 3, maxRows: 3}" :disabled="countryIsActive"></el-input>
                </div>
               </div>
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
          <el-row type="flex" align="center" justify="space-between" style="width:100%;margin-bottom: 5px;">
              <el-col :sm="24" :md="18" :lg="21" class="input-item">
                <el-select v-model="entry" filterable clearable @visible-change="entrySearch" placeholder="入境口岸搜索"  size="small" class="t-input" :disabled="entryIsActive">
                  <el-option
                    v-for="item in entryName"
                    :key="item.AIRPORT_CODE"
                    :value="item.AIRPORT_CODE"
                    :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="6" :lg="3" class="selfButton">
                <el-button type="primary" size="mini" @click="entryAddList(entry)" :disabled="entryIsActive">添加</el-button>
              </el-col>
          </el-row>
          <!-- 卡片 -->
          <el-row style="position:relative">
            <div class="card-disabled" v-show="entryIsActive"></div>
            <el-card class="box-card t-card">
              <div slot="header" class="clearfix">
                <span>准入口岸</span>
              </div>
              <div v-for="i in data.airportMapList" class="t-list">
                <span>{{i.name}}</span>
                <el-button icon="el-icon-delete" style="border:none" @click="entryDeleteList(i)"></el-button>
              </div>
            </el-card>
          </el-row>
          <!--入境 登机牌 -->
          <el-row>
            <div class="checkResultContent">
              <div class="checkResult">
                <div class="clearfix">
                  <span>反馈结果</span>
                </div>
              </div>
              <div class="checkResultInput">
                <el-select placeholder="请选择反馈结果" v-model="data.airportCheckResult" filterable clearable size="mini" class="t-width100" :disabled="entryIsActive">
                  <!-- <el-option label="0Z - 允许登机" value="0Z"></el-option> -->
                  <el-option label="1Z - 禁止登机" value="1Z"></el-option>
                  <el-option label="2Z - 再次核对" value="2Z"></el-option>
                  <el-option label="4Z - 数据错误" value="4Z"></el-option>
                </el-select>
              </div>
            </div>
          </el-row>
          <!-- 入境 反馈描述 -->
          <el-row>
            <div class="checkResultContent">
              <div class="checkResult">
                <div class="clearfix">
                  <span>反馈描述</span>
                </div>
              </div>
              <div class="checkResultInput">
                <el-input type="textarea" v-verify.input.blur="{regs:'noCinese',submit:'entryCard'}" maxlength="100" v-model="data.airportResponseresult" class="t-width100" placeholder="请输入描述" :autosize="{ minRows: 3, maxRows: 3}" :disabled="entryIsActive"></el-input>
              </div>
             </div>
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
        fieldName:'',
        visaRuleSerial:'',//证件规则id
        visaOperator:'2',
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
      code:[],
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
    this.codeName();
    this.getDate();
    this.addList(this.data.fieldName,this.data.visaTime,this.data.visaOperator);
  },
  methods:{
    addList(fname,item,oper){
      let fnameLabel = '';
      for(var i=0;i<this.code.length;i++){
        if(fname == this.code[i].FIELDNAME){
          fnameLabel = this.code[i].FIELDDES;
        }
      }
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
        operLabel = '大于'
      }else if(oper == '2'){
        operLabel = '小于'
      }
      if(this.data.visaTime == ''||this.data.fieldName == ''||this.data.visaTime == undefined||this.data.fieldName == undefined){
        this.show = false;
      }else{
        this.show = true;
        let str = "";
        str = fnameLabel + '  ' +operLabel + '  ' +itemLabel;
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
      if(item == '1'){
        this.inactive = "启用";
        this.isActive = false;
      }else if(item == '0'){
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
          if(r.hasOwnProperty('data') == true){
            this.data = r.data;
          }
          if(this.data.visaTime != ''){
            this.addList(this.data.fieldName,this.data.visaTime,this.data.visaOperator);
          }
          this.state(this.data.nationalityStatus);
          this.cardState(this.data.visaStatus);
          this.entryState(this.data.airportStatus);
        }
      })
    },
    save(){
      if(this.data.visaStatus == '1'){
        const result = this.$validator.verifyAll('card')
        console.log(result);
         if (result.indexOf(false) > -1) {
           return
         }
      }else if(this.data.nationalityStatus == '1'){
        const contryResult = this.$validator.verifyAll('contryCard')
         if (contryResult.indexOf(false) > -1) {
           return
         }
      }else if(this.data.airportStatus == '1'){
         const entryResult = this.$validator.verifyAll('entryCard')
         if (result.indexOf(entryResult) > -1) {
           return
         }
      }

      this.$api.post('/manage-platform/visaRule/saveVisaRule',this.data,
      r =>{
        if(r.success){
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }
      })
    },
    codeName(){//字段名称的接口
      this.$api.post('/manage-platform/ruleConfig/getRuleConfigFieldNameList/1',{},
       r => {
         console.log(r);
         if(r.success){
           this.code = r.data
         }
      })
    },
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
  width: 100%!important;
  padding-right: 5px;
}
/* .t-input-operator{
  width: 100%!important;
  padding-right: 5px;
} */
.t-text{
  font-size: 12px;
  color: #F7B74E;
}
.el-card__header{
  padding: 2px 0px 2px 20px!important;
  /* background-color: #d4e1f1; */
  background-color: #F4F4F4;
}
.checkResult{
  padding: 2px 0px 2px 20px!important;
  background-color: #F4F4F4;
  font-size: 14px;
  border-bottom: 1px solid #ebeef5;
  /* border: 1px solid #ebeef5; */
  /* border-radius:4px; */
  box-sizing: border-box;
}
.checkResultContent{
    margin-top: 3px;
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    border-radius: 4px;
}
.checkResultInput .el-input__inner{
  border: 1px solid #ebeef5;
}
.checkResultInput textarea{
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-bottom: 1px solid #ebeef5;
  border-top: 1px solid #ebeef5;
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
  overflow-y: auto;
  font-size: 14px;
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
  padding: 20px 40px 40px 40px;
}
.selfButton button{
  padding: 7px!important;
  width: 100%;
}
</style>
