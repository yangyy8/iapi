<template lang="html">
  <div id="div2">
    <el-row align="center"  type="flex">
      <el-col  :span="5" style="border-right:1px solid #cccccc; margin-right:30px;">
          <img src="../../assets/img/port.png">
      </el-col>
      <el-col  :span="190" style="padding-top:50px;">
        <ul class="planUL">
          <li class="planLifirst">
            <div  v-for="i in list2">
              {{i}}
            </div>
          </li>
          <li v-for="i in list1" class="planLi">
            <div  v-for="j in list2">
              <span v-if="getlight(i,j)">
                <el-popover
                  placement="right"
                  width="800"
                  trigger="click">
                  <el-form :model="dform">
                    <el-row type="flex"  class="t-detail">
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">姓名：</div><div class="t-el-sub">{{dform.CNAME}}</div></el-col>
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">性别：</div><div class="t-el-sub">{{dform.GENDERNAME}}</div></el-col>
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">出生日期：</div><div class="t-el-sub">{{dform.BIRTHDAYSTR}}</div></el-col>

                    </el-row>
                    <el-row type="flex"  class="t-detail">
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">出入境类型：</div><div class="t-el-sub">{{dform.FLIGHTINOUT}}</div></el-col>
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">国籍/地区：</div><div class="t-el-sub">{{dform.NATIONALITYNAME}}</div></el-col>
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">证件号码：</div><div class="t-el-sub">{{dform.PASSPORTNO}}</div></el-col>

                    </el-row>
                    <el-row type="flex"  class="t-detail">
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">口岸：</div><div class="t-el-sub">{{dform.PORTNAME}}</div></el-col>
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">订票号：</div><div class="t-el-sub">{{dform.PNR_RCI}}</div></el-col>
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">航班号：</div><div class="t-el-sub">{{dform.FLTNO}}</div></el-col>

                    </el-row>
                    <el-row type="flex"  class="t-detail">
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">航班日期：</div><div class="t-el-sub">{{dform.FLIGHTDATESTR}}</div></el-col>
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞机场：</div><div class="t-el-sub">{{dform.CITYFROMNAME}}</div></el-col>
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">座位号：</div><div class="t-el-sub">{{dform.PNR_SPECIFIGSEAT}}</div></el-col>
                    </el-row>

                    <el-row type="flex"  class="t-detail">
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">值机时间：</div><div class="t-el-sub">{{dform.IAPI_RECEIVETIMESTR}}</div></el-col>
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">到达机场：</div><div class="t-el-sub">{{dform.CITYTONAME}}</div></el-col>
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">校验结果：</div><div class="t-el-sub">{{dform.CHECKRESULTNAME}}</div></el-col>
                    </el-row>
                    <el-row type="flex"  class="t-detail">
                      <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司：</div><div class="t-el-sub">{{dform.APPLICATIONSENDERNAME}}</div></el-col>
                    </el-row>
                  </el-form>
                  <div :class="{'gaoliang':specifigseat==i+j}" @click="enter(i+j)" @mouseenter="hoverTitle(i+j)" slot="reference">
                    <img src="../../assets/img/renB.png" :title="biaoti" v-if="specifigseat==i+j"/>
                    <img src="../../assets/img/ren.png" :title="biaoti" v-else/>
                  </div>

                </el-popover>

              </span>
              <span v-else>
                <div class="" :title="i+j"></div>
              </span>
            </div>
            <div class="">{{i}}</div>
          </li>
        </ul>
        <div class="" style="margin-top:10px;margin-left:10px">
          <el-row align="center" type="flex" style="height:100%">
            <el-col :span='24'>
              <el-row align="center" style="width:1200px">
                <el-col v-for="(item,ind) in tableBody" :key="ind" style="width:40%">
                  <span>{{item}}</span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
import {formatDate} from '@/assets/js/date.js'
export default {
  data() {
    return {
      list1:[],
      list2:[],
      light:[],
      // isgao:'',
      // panduan:false,
      tableBody:[],
      serialList:{},
      serial:'',
      form: {},
      dform:{},
      biaoti:'',
      flightNumber:this.flightNumber,
      globalserial:this.globalserial,
      // specifigseat:this.specifigseat,
      detailsDialogVisible:false,
    }
  },
  watch:{
    globalserial:function(newVal,oldVal){
        console.log(newVal,oldVal)
        this.globalserial = newVal;  //newVal即是chartData
        this.getimgtable();
    }
  },
  // props:{
  //   'globalserial':{
  //     type:String,
  //     default:''
  //   },
  //   'flightNumber':{
  //     type:String,
  //     default:''
  //   }
  // },
  props:['globalserial','flightNumber','specifigseat','FLTNO','FLTDATE','seatType'],
  mounted(){
    this.getimgtable()
  },
  methods: {
    getimgtable(){
      if(this.seatType==1){
        let p={
          "flightRecordnum": this.flightNumber,
          "fltno":this.FLTNO,
          "fltdate":this.FLTDATE
        }

        this.$api.post('/manage-platform/statusUpdate/seat/queryListPagesSeatInfoSearch', p,
          r => {
            this.panduan=true;
            if(r.success){
              this.list1 = r.data.list123;
              this.list2 = r.data.listabc;
              this.light=r.data.highlight;
              this.tableBody = r.data.portList;
              this.serialList = r.data.seatAndIdMap;
            }
            for(var i=0;i<this.list1.length;i++){
              for(var j=0;j<this.list2.length;j++){
                if(this.getlight(this.list1[i],this.list2[j])){
                  this.biaoti = this.list1[i]+this.list2[j];
                }
              }
            }
          })
      }else{
        let p = {
          "flightRecordnum": this.flightNumber,
        };
        this.$api.post('/manage-platform/statusUpdate/seat/queryListPagesSeat', p,
          r => {
            this.panduan=true;
            if(r.success){
              this.list1 = r.data.list123;
              this.list2 = r.data.listabc;
              this.light=r.data.highlight;
              this.tableBody = r.data.portList;
              this.serialList = r.data.seatAndIdMap;
            }
            for(var i=0;i<this.list1.length;i++){
              for(var j=0;j<this.list2.length;j++){
                if(this.getlight(this.list1[i],this.list2[j])){
                  this.biaoti = this.list1[i]+this.list2[j];
                }
              }
            }
          })
      }

    },
    enter(item){

      if(this.seatType==1){
        console.log(this.seatType,'========')
        this.$api.post('/manage-platform/iapiHead/queryIapiHead',{serial:this.serialList[item]},
         r =>{
           if(r.success){
             this.dform = r.data.IAPI;
           }
         })
      }else{
        this.$api.post('/manage-platform/iapi/queryIapiInfo',{serial:this.serialList[item]},
         r =>{
           if(r.success){
             this.dform = r.data.IAPI;
           }
         })
      }

    },
    hoverTitle(item){
      this.biaoti = item;
    },
    getlight(n,m){
    var ss=this.light;
    var se=n+m;
    for(var i=0;i<ss.length;i++){

     if(ss[i]==se){
      return true;
     }
    }
    return false;
  }
  },
}
</script>

<style scoped>
.add-dialog {
  /* padding-left:40px; */
}
.detail-msg-row {
  color: #999;
  line-height: 32px;
}
.detail-msg-row span {
  color: #333;
  display: inline-block;
  width: 60px;
}
.planUL{
  display: flex;
  /* flex-direction:column; */
}
.planLi{
  display: flex;
  margin: 5px;
  flex-direction: column;
}
/* .planLi:first-child div{
  border: none;
  background: none
} */
.planLi div{
  width: 20px;
  height: 20px;
  border: 1px #105D93 solid;
  background: #70BDEB; text-align: center;
}
.planLifirst{
  display: flex;
  margin: 5px;
  flex-direction: column;
}
.planLifirst div{
  width: 20px;
  height: 22.5px;
  text-align: center;

}
.planLi div:last-child{
  border: none;
  background: none;text-align: center;
}
.gaoliang{
  background-color: #EBAD6F!important;
}
</style>
