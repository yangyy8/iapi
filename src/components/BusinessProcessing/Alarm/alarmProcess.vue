<template lang="html">
  <div class="alarmProcess">
    <div class="top mb-6">
      <el-row type="flex" class="row-bg">
        事件编号：
        <el-input
          placeholder="请输入内容"
          size="small"
          v-model="eventserial"
          :disabled="true"
          class="apInput">
        </el-input>
      </el-row>

    </div>
    <div class="middle mb-6">
      <div class="middle-tab">
        <div class="middle-tab-item hand" :class="{'middle-checked':tabIsShow==false}" @click="xinxi">
          基本信息
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':tabIsShow==true}" @click="shijian">
          事件文档
        </div>
      </div>
      <div class="middle-tab-content" v-show="!tabIsShow">
        <div class="middle-content1">
          <el-row type="flex" >
            <el-col :span="20" class="middle-msg-left">
              <el-row type="flex" class="middle-msg-row">
                <el-col :span="5">
                  <span>姓名</span>
                  {{iapiMap.name}}

                </el-col>
                <el-col :span="5">
                  <span>性别</span>
                  {{iapiMap.gender}}

                </el-col>
                <el-col :span="5">
                  <span>出生日期</span>
                  {{iapiMap.dateofbirth}}

                </el-col>
                <el-col :span="5">
                  <span>证件号码</span>
                  {{iapiMap.passportno}}

                </el-col>
                <el-col :span="4">
                  <span>国籍</span>
                  {{iapiMap.nationality}}

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row">
                <el-col :span="5">
                  <span>签证号码</span>
                  {{iapiMap.visano}}

                </el-col>
                <el-col :span="5">
                  <span>出入类型</span>
                  {{iapiMap.flightType}}

                </el-col>
                <el-col :span="5">
                  <span>第二证号</span>
                  {{iapiMap.otherNo}}

                </el-col>
                <el-col :span="5">
                  <span>第二国籍</span>
                  {{iapiMap.otherNationality}}

                </el-col>

              </el-row>
              <el-row type="flex" class="middle-msg-row">
                <el-col :span="5">
                  <span>航班号</span>
                  {{iapiMap.fltno}}

                </el-col>
                <el-col :span="5">
                  <span>出发地</span>
                  {{iapiMap.origin}}

                </el-col>
                <el-col :span="5">
                  <span>目的地</span>
                  {{iapiMap.destination}}

                </el-col>
                <el-col :span="5">
                  <span>报警时间</span>
                  {{iapiMap.destination}}

                </el-col>

              </el-row>

            </el-col>
            <el-col :span="4" class="middle-msg-right">
              <el-button type="warning" size="small">远程查询</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="middle-content1">
          <div class="title-green">
            甄别信息列表
          </div>

          <el-table
            :data="listMap"
            border
            style="width: 100%;">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="dh"
              label="档号"
              >
            </el-table-column>
            <el-table-column
              prop="alarmType"
              label="名单类型">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="dateofbirth"
              label="出生日期">
            </el-table-column>
            <el-table-column
              prop="nationality"
              label="国籍">
            </el-table-column>
            <el-table-column
              prop="passportno"
              label="证件号码">
            </el-table-column>
            <el-table-column
              prop="visaType"
              label="签证种类">
            </el-table-column>
            <el-table-column
              prop="visano"
              label="签证号码">
            </el-table-column>
            <el-table-column

              label="甄别状态"
              width="80">
              <template slot-scope="scope">
              <span v-if="scope.row.status==1">已甄别</span>

              <span v-else>未甄别</span>

              </template>
            </el-table-column>

            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status==1" class="table-btn" size="mini" plain @click="$router.push({name:'infoComparison',query:{isZDGZ:$route.query.isZDGZ,NameListType:scope.row.alarmTypeNum,eventserial:eventserial,iapiSerial:iapiMap.iapiSerial,nationAndPass:scope.row.nationalityCode+scope.row.passportno,visaNo:scope.row.visaNo,inOut:iapiMap.flightType}})">查看</el-button>
                <el-button v-else class="table-btn" size="mini" plain @click="$router.push({name:'infoComparison',query:{isZDGZ:$route.query.isZDGZ,NameListType:scope.row.alarmTypeNum,eventserial:eventserial,iapiSerial:iapiMap.iapiSerial,nationAndPass:scope.row.nationalityCode+scope.row.passportno,visaNo:scope.row.visaNo,inOut:iapiMap.flightType}})">名单甄别</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="middle-tab-content" v-show="tabIsShow">
        <div class="middle-content1 ">
          <div class="title-green">
            人员信息
          </div>
          <el-row type="flex" >
            <el-col class="middle-msg-img">
              <img src="../../../assets/img/bp_ap/photo.png" alt="">
            </el-col>
            <el-col class="middle-msg-text">
              <el-row type="flex" class="middle-msg-row2">
                <el-col :span="5">
                  <span>姓名</span>
                  {{warnMap.name}}
                </el-col>
                <el-col :span="5">
                  <span>性别</span>
                  {{warnMap.gender}}
                </el-col>
                <el-col :span="5">
                  <span>出生日期</span>
                  {{warnMap.birthday}}

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row2">
                <el-col :span="5">
                  <span>国籍</span>
                  {{warnMap.nationality}}

                </el-col>
                <el-col :span="5">
                  <span>证件号码</span>
                  {{warnMap.passportno}}

                </el-col>
                <el-col :span="5">
                  <span>签证号码</span>
                  {{warnMap.visano}}

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row2">
                <el-col :span="5">
                  <span>出入标识</span>
                  {{warnMap.flightType}}

                </el-col>
                <el-col :span="5">
                  <span>第二证号</span>
                  {{warnMap.otherNo}}

                </el-col>
                <el-col :span="5">
                  <span>第二国籍</span>
                  {{warnMap.otherIssuecountry}}

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row2">
                <el-col :span="5">
                  <span>航班号</span>
                  {{warnMap.fltno}}

                </el-col>
                <el-col :span="5">
                  <span>出发地</span>
                  {{warnMap.cityFrom}}

                </el-col>
                <el-col :span="5">
                  <span>目的地</span>
                  {{warnMap.cityto}}

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row2">
                <el-col :span="5">
                  <span>报警类型</span>
                  {{warnMap.alarmtype}}

                </el-col>
                <el-col :span="5">
                  <span>报警时间</span>
                  {{warnMap.alarmtime}}

                </el-col>

              </el-row>

            </el-col>

          </el-row>
        </div>
        <div class="middle-content1 ">
          <div class="title-green">
            甄别信息
          </div>
          <el-table
            :data="listMap2"
            border
            style="width: 100%;">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="dh"
              label="档号"
              >
            </el-table-column>
            <el-table-column
              prop="namelistType"
              label="名单类型">
            </el-table-column>
            <el-table-column
              prop="namelistName"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="namelistGendor"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="namelistBirthday"
              label="出生日期">
            </el-table-column>
            <el-table-column
              prop="namelistNationalityDesc"
              label="国籍">
            </el-table-column>
            <el-table-column
              prop="namelistPassportno"
              label="证件号码">
            </el-table-column>
            <el-table-column
              prop="visatype"
              label="签证种类">
            </el-table-column>
            <el-table-column
              prop="visano"
              label="签证号码">
            </el-table-column>
            <el-table-column
              prop="confirmResult"
              label="甄别结果">
            </el-table-column>
            <el-table-column
              prop="compareDesc"
              label="甄别说明">
            </el-table-column>
          </el-table>

        </div>
        <div class="middle-content1 mb-2">
          <div class="title-grey">
            处理结果
          </div>
          <el-row type="flex" class="middle-text-g">
            <el-col :span="4">
              <span>处理结果：</span>
              {{warnMap.distinguishResult}}
            </el-col>
            <el-col :span="4">
              <span>处理人：</span>
              {{warnMap.solver}}
            </el-col>
            <el-col :span="4">
              <span>审批人：</span>
              {{warnMap.approver}}
            </el-col>

          </el-row>
        </div>
        <div class="middle-content1 middle-btn-g">
          <el-button type="primary" class="mr-22" size="small">打印</el-button>
          <el-button type="success" size="small">导出</el-button>
        </div>
      </div>
    </div>
    <div class="down" v-show="!tabIsShow">
      <div class="title-grey">
        甄别结果
      </div>
      <el-row type="flex" class="mb-15">
        <el-col :span="20">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="甄别说明必须填写原因(不超过100个字符)"
            v-model="pd.CHANGE_RESON">
          </el-input>
        </el-col>
        <el-col :span="4" class="down-btn-area">
          <el-button type="primary" class="mb-15" size="small" @click="upDate" v-show="isUpdate">确定</el-button>
          <el-button type="info" class="mb-15" size="small" @click="archive" v-show="!isUpdate">归档</el-button>

          <el-button type="warning" size="small">取消</el-button>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="6" class="input-item">
          <span >处理结果：</span>
          <el-select v-model="pd.DEALRESULT" placeholder="请选择"  size="small" class="input-input">
            <el-option label="不做变更处理" value="0"></el-option>
            <el-option label="变更处理" value="1"></el-option>
            <el-option label="数据推送" value="2"></el-option>

          </el-select>
        </el-col>
        <el-col :span="6" class="input-item">
          <span >处理人：</span>
          <el-input placeholder="请输入内容" size="small" class="input-input" v-model="pd.USERID"></el-input>
        </el-col>
        <el-col :span="6" class="input-item">
          <span >审批人：</span>
          <el-input placeholder="请输入内容" size="small" class="input-input" v-model="pd.APPROVALUSER"></el-input>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
   return {
     eventserial:"ddddddd",
     tabIsShow:false,
     iapiMap:{},
     listMap:[{}],
     warnMap:{},
     listMap2:[{}],
     pd:{},
     isUpdate:true,
     tableData:[]
   }
 },
 mounted(){
   this.eventserial=this.$route.query.eventserial;
   this.getList();
 },
 methods:{
   getList(){
     let p={
       "currentPage":0,
       "showCount":3,
       "pd":{
          eventserial:this.eventserial
       }
     };
     if(this.$route.query.isZDGZ){
       this.$api.post('/eamp/pnrAlarmEvent/queryPnrAlarmPassInfo',p,
        r => {
          console.log(r);
          this.iapiMap=r.data.iapiMap
          this.listMap=r.data.listMap;
          var arr=this.listMap
          var thar=this;
          this.pd.CHANGE_RESON="";
          for(var i in arr){
            console.log(arr[i].compareDesc)
            that.pd.CHANGE_RESON+=parseInt(i+1)+"."+arr[i].compareDesc
          }
       })
     }else {
       this.$api.post('/eamp/alarmEvents/getListAlarmEventsInfo',p,
        r => {
          console.log(r);
          this.iapiMap=r.data.iapiMap
          this.listMap=r.data.listMap;
          var arr=this.listMap
          var thar=this;
          this.pd.CHANGE_RESON="";
          for(var i in arr){
            console.log(arr[i].compareDesc)
            that.pd.CHANGE_RESON+=parseInt(i+1)+"."+arr[i].compareDesc
          }
       })
     }

   },
   xinxi(){
     this.tabIsShow=false;
     console.log(this.tabIsShow)
   },
   shijian(){
     this.tabIsShow=true;
     this.documentInfo()
   },
   upDate(){
     this.pd.eventserial=this.eventserial;
     console.log(".....")
     let p={
       "currentPage":0,
       "showCount":3,
       pd:this.pd
     };
     if(this.pd.DEALRESULT==0){
       this.$api.post('/eamp/alarmEvents/getUpdateResult',p,
        r => {
          console.log(r);
          if(r.success){
            this.$message({
              message: '恭喜你，操作成功！',
              type: 'success'
            });
            this.isUpdate=false;
          }else{
            this.$message.error(r.message);
          }
       })
     }

   },
   archive(){
     let p={
       "currentPage":0,
       "showCount":3,
       "pd":{
          eventserial:this.eventserial
       }
     };

     this.$api.post('/eamp/alarmEvents/archiveDocument',p,
      r => {
        console.log(r);
        if(r.success){
          this.$message({
            message: '归档完毕！',
            type: 'success'
          });
          this.isUpdate=true;
          var arr=this.listMap;
          this.pd.CHANGE_RESON="";
          for(var i in arr){
            console.log(arr[i].compareDesc)
            that.pd.CHANGE_RESON+=parseInt(i+1)+"."+arr[i].compareDesc
          }

        }else{
          this.$message.error(r.message);
        }

     })
   },
   documentInfo(){
     let sjwd;
     this.$route.query.isZDGZ? sjwd=1:sjwd=0;
     let p={
       "currentPage":0,
       "showCount":3,
       "pd":{
          sjwd:sjwd,
          eventserial:this.eventserial
       }
     };
     this.$api.post('/eamp/alarmEvents/getEventDocumentInfo',p,
      r => {
        console.log(r);
        this.warnMap=r.data.warnMap
        this.listMap2=r.data.listMap;
        // if(r.success){
        //   this.$message({
        //     message: '恭喜你，操作成功！',
        //     type: 'success'
        //   });
        // }else{
        //   this.$message.error(r.message);
        // }
     })
   },

 }
}
</script>

<style scoped>
.apInput{
  width: 330px;

}
.middle{
  background: none;
  padding: 0;
}
.middle-tab{
  width: 252px;
  background:#fff;
  display: flex;

}
.middle-tab-item{
  width: 50%;
  text-align: center;
  background: #a2ddd7;
  color: #4bc3a0;
}
.middle-checked{
  background: #fff;
  border-top: 3px #4bc3a0 solid;
}
.middle-content1{
  background: #fff;
  padding:15px 20px 5px 20px;
}
.middle-msg-left{
  padding-right: 60px;
  border-right: 1px #eee solid;
}
.middle-msg-img{
  width: 130px;
  margin-right: 60px;
}
.middle-msg-row{
  border-bottom: 1px #eee solid;
  color:#666;
  height: 38px;
  line-height: 38px;
}
.middle-msg-row:last-child{
  border: none;
}
.middle-msg-row span{
  display: inline-block;
  width: 80px;
  color: #333;
}
.middle-msg-row2 span{
  display: inline-block;
  width: 75px;
  color: #333;
  font-weight: bold;
}
.middle-msg-right{
  display: flex;
  justify-content: center;
  align-items: center;
}
.middle-text-g span{
  font-weight: bold;
}
.middle-btn-g{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
}


</style>
