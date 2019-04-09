<template lang="html">
  <div class="whitelist">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="21" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text"><i class="t-must">*</i>航班日期：</span>
                <div class="input-input t-flex t-date">
                   <el-date-picker
                     v-model="cdt.startFlightDate"
                     type="datetime"
                     size="small"
                     format="yyyy-MM-dd HH:mm"
                     value-format="yyyyMMddHHmm"
                     placeholder="开始时间">
                   </el-date-picker>
                   <span class="septum">-</span>
                   <el-date-picker
                      v-model="cdt.endFlightDate"
                      type="datetime"
                      size="small"
                      align="right"
                      format="yyyy-MM-dd HH:mm"
                      value-format="yyyyMMddHHmm"
                      placeholder="结束时间">
                  </el-date-picker>
              </div>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select  placeholder="请选择"  size="small" v-model="cdt.flightype" clearable filterable class="block input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <el-option label="A - 入出境" value="A"></el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item my-form-group" data-scope="demo" data-name="fltnoStr" data-type="input"
            v-validate-easy="[['maxLength',[35]]]">
              <span class="input-text">航班号：</span>
              <el-input placeholder="多个航班号请用分号隔开" size="small" v-model="cdt.fltnoStr" clearable class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">中心/口岸：</span>
              <el-select v-model="cdt.port" filterable clearable placeholder="请选择"  size="small" class="input-input" @visible-change="centerK" @change="centerReal(cdt.port)">
                <el-option
                  v-for="item in centerColl"
                  :key="item.DEPT_CODE"
                  :label="item.DEPT_CODE+' - '+item.DEPT_JC"
                  :value="item.DEPT_CODE">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">模型：</span>
              <el-select v-model="cdt.modelSerial" filterable clearable placeholder="请选择"  size="small" class="input-input" @visible-change="modelK" :disabled="able">
                <el-option
                  v-for="item in modelColl"
                  :key="item.MODEL_CODE"
                  :label="item.MODEL_CODE+' - '+item.MODEL_NAME"
                  :value="item.MODEL_CODE">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3" class="down-btn-area">
          <el-button type="success" size="small"  class="mt-15" @click="CurrentPage=1;getList(CurrentPage,pageSize,cdt,order,direction)">查询</el-button>
          <el-button type="primary" class="mt-15" plain size="small" @click="reset">重置</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-row>
        <el-button  size="small"  class="mb-15 table-btn" @click="tableDown">导出</el-button>
        <el-button  size="small"  class="mb-15 table-btn" @click="colorSet">色彩设置</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width:100%;"
        class="o-table3"
        @sort-change='sortChange'
        @header-click="headerClick">
        <!-- <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column> -->
        <el-table-column
          prop="FLTNO"
          label="航班号"
          sortable='custom'
          width="100">
        </el-table-column>
        <el-table-column
          prop="FLIGHTDATESTR"
          sortable='custom'
          label="航班日期"
          width="140">
        </el-table-column>
        <el-table-column
          prop="ARRIVDATESTR"
          label="到达时间"
          width="140">
        </el-table-column>
        <el-table-column
          prop="FLIGHTTYPE"
          label="出入标识"
          width="120"
          sortable='custom'>
          <template slot-scope="scope">
            {{ scope.row.FLIGHTTYPE | fifterInOut}}
          </template>
        </el-table-column>
        <el-table-column
          prop="CITYFROMSTR"
          label="起飞机场"
          width="150">
        </el-table-column>
        <el-table-column
          prop="CITYTOSTR"
          width="150"
          label="到达机场">
        </el-table-column>
        <el-table-column
          prop="MODELNAMES"
          width="150"
          label="参与运算模型">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              trigger="hover"
              :disabled="scope.row.MODELNAMES.length==1"
              popper-class="maxWidth">
              <div class="">
                <el-row type="flex" class="detailFat" v-for="(i,ind) in scope.row.MODELNAMES" :key="ind">
                  <el-col :span="24"><div class="tipDetail">{{i}}</div></el-col>
                </el-row>
              </div>
              <span slot="reference">{{scope.row.MODELNAMES[0]}}<span v-if="scope.row.MODELNAMES.length>1" class="cellColor">*</span></span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="CHECKINCOUNT"
          label="预报旅客"
          width="120">
        </el-table-column>
        <el-table-column
          prop="CHINACOUNT"
          label="预报中国旅客"
          width="130">
        </el-table-column>
        <el-table-column
          prop="NOTCHINACOUNT"
          label="预报外籍旅客"
          width="130">
        </el-table-column>
        <el-table-column
          prop="ONEEVENT"
          label="一级预警人数"
          width="130">
        </el-table-column>
        <el-table-column
          prop="TWOEVENT"
          label="二级预警人数"
          width="130">
        </el-table-column>
        <el-table-column
          prop="THREEEVENT"
          label="三级预警人数"
          width="130">
        </el-table-column>
        <el-table-column
          prop="FOUREVENT"
          label="四级预警人数"
          width="130">
        </el-table-column>
        <el-table-column
          prop="FIVEEVENT"
          label="五级预警人数"
          width="130">
        </el-table-column>
        <el-table-column
          prop="DOWN_HIT"
          label="未查获人数"
          width="130">
        </el-table-column>
        <el-table-column
          prop="UP_HIT"
          label="已查获人数"
          width="130">
        </el-table-column>
        <el-table-column
          label="报警率"
          width="100">
          <template slot-scope="scope">
            <span :style="{color:color1}" v-if="scope.row.PERCENT < high1&&scope.row.PERCENT >=low1">{{scope.row.PERCENT}}</span>
            <span :style="{color:color2}" v-else-if="scope.row.PERCENT < high2&&scope.row.PERCENT >=low2">{{scope.row.PERCENT}}</span>
            <span :style="{color:color3}" v-else-if="scope.row.PERCENT < high3&&scope.row.PERCENT >=low3">{{scope.row.PERCENT}}</span>
            <span :style="{color:color4}" v-else-if="scope.row.PERCENT < high4&&scope.row.PERCENT >=low4">{{scope.row.PERCENT}}</span>
            <span v-else>{{scope.row.PERCENT}}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="middle-foot">
        <div class="page-msg">
          <div class="">
            第{{CurrentPage}}页
          </div>
          <div class="">
            每页
            <el-select v-model="pageSize" @change="pageSizeChange(pageSize)" placeholder="10" size="mini" class="page-select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            条
          </div>
          <div class="">
            共{{TotalResult}}条
          </div>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync ="CurrentPage"
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
          layout="prev,next">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="色彩设置" :visible.sync="colorDialogVisible"   width="40%">
      <el-row align="center" class="mb-6" v-for="(i,ind) in colorArr" :key="ind">
        <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
          <span class="input-text tt-input-text">颜色值{{i.useColour.COL_NUMBER}}：</span>
          <el-input placeholder="请输入内容" size="small" v-model="i.useColour.COL_VALUE"  class="t-input-input"></el-input>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
          <span class="input-text tt-input-text">区间：</span>
          <el-input placeholder="请输入内容" size="small" v-model="i.useColour.LOW_VALUE"  class="input-input"></el-input>
          <span class="septum line-h">-</span>
          <el-input placeholder="请输入内容" size="small" v-model="i.useColour.HIGH_VALUE"  class="input-input"></el-input>
          <span class="septum line-h">%</span>
        </el-col>
      </el-row>

      <h4>历史参数设置参考</h4>
      <el-row align="center" class="mb-6" v-for="(item,ind) in historyArr" :key="ind">
        <el-col  :sm="4" :md="4" :lg="4"  class="input-item" style="justify-content: center;">
          颜色值{{item.useColour.COL_NUMBER}}：
        </el-col>
        <el-col  :sm="20" :md="20" :lg="20" style="margin-left:-20px">
          <span>历次设置的范围平均值 低区间平均值 {{item.useColour.LOW_AVG_VALUE}} 高区间平均值 {{item.useColour.HIGH_AVG_VALUE}}</span><br/>
          <span style="padding-top:10px;display:inline-block">最近设置（<i v-for="j in item.oldColour">{{j.COL_VALUE+' '+j.LOW_VALUE+' -- '+j.HIGH_VALUE +' / '}}</i>）</span>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="colorDialogVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click="colorReal" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  data(){
    return{
      order:'',
      direction:0,
      airport:[],
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      cdt:{
        startFlightDate:'',
        endFlightDate:''
      },
      centerColl:[],
      modelColl:[],
      colorDialogVisible:false,
      colorArr:[],
      historyArr:[],
      colorList:[],
      able:true,
      color1:'',
      color2:'',
      color3:'',
      color4:'',
      low1:'',
      low2:'',
      low3:'',
      low4:'',
      high1:'',
      high2:'',
      high3:'',
      high4:'',
      options:[
        {
          value:10,
          label:"10"
        },
        {
          value:20,
          label:"20"
        },
        {
          value:30,
          label:"30"
        }
      ],
      tableData: [],
    }
  },
  mounted(){
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.cdt.startFlightDate=formatDate(begin,'yyyyMMddhhmm');
    this.cdt.endFlightDate=formatDate(end,'yyyyMMddhhmm');
    let that = this
    setTimeout(function(){
      that.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
    },100)
    this.queryNationalityAlone();
    this.queryAirport();
    document.getElementsByClassName('btn-next')[0].disabled=true;
  },
  activated(){
    this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
  },
  methods:{
    sortChange(column, prop, order){
      column.order=='ascending'?this.direction=1:this.direction=0;
      this.order=column.prop;
      this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    totalPageM(i){
      this.$api.post('/manage-platform/eventMonitor/queryFlightMonitorCount',i,
      r =>{
        if(r.success){
          this.TotalResult = r.data;
        }
      })
    },
    colorSet(){
      this.colorDialogVisible = true;
      this.$api.post('/manage-platform/eventMonitor/queryUserColour',{},
       r => {
         if(r.success){
           this.colorArr=[];
           this.historyArr=[];
           this.colorArr = r.data;
           this.historyArr = r.data;
         }
      })
    },
    centerK(){
      this.$api.post('/manage-platform/census/queryPort',{},
      r => {
        if(r.success){
          this.centerColl = r.data;
        }
      })
    },
    modelK(){
      let p={
        'DEPT_CODE':this.cdt.port
      }
      this.$api.post('/manage-platform/census/queryModels',p,
      r => {
        if(r.success){
          this.modelColl = r.data;
        }
      })
    },
    centerReal(val){
      this.$set(this.cdt,'modelSerial','');
      if(val==''||val==undefined){
        this.able=true;
      }else{
        this.able=false;
      }
    },
    colorReal(){
      let arrColor = this.colorArr;
      for(var i=0;i<arrColor.length;i++){
        delete arrColor[i].oldColour
      }
      this.$api.post('/manage-platform/eventMonitor/saveUserColour',arrColor,
       r => {
         if(r.success){
           this.$message({
             message: '设置成功！',
             type: 'success'
           });
         }
         this.colorDialogVisible = false;
         this.colorJudge(this.colorArr);
      })
    },
    colorJudge(arr){
      for(var j=0;j<arr.length;j++){
        if(arr[j].useColour.COL_NUMBER == 1){
          this.color1=arr[j].useColour.COL_VALUE;
          this.low1 = arr[j].useColour.LOW_VALUE;
          this.high1 = arr[j].useColour.HIGH_VALUE;
          // console.log(this.low1,this.high1)
        }else if(arr[j].useColour.COL_NUMBER == 2){
          this.color2=arr[j].useColour.COL_VALUE;
          this.low2 = arr[j].useColour.LOW_VALUE;
          this.high2 = arr[j].useColour.HIGH_VALUE;
          // console.log(this.low2,this.color2,this.high2)
        }else if(arr[j].useColour.COL_NUMBER == 3){
          this.color3=arr[j].useColour.COL_VALUE;
          this.low3 = arr[j].useColour.LOW_VALUE;
          this.high3 = arr[j].useColour.HIGH_VALUE;
          // console.log(low3,high3)
        }else if(arr[j].useColour.COL_NUMBER == 4){
          this.color4=arr[j].useColour.COL_VALUE;
          this.low4 = arr[j].useColour.LOW_VALUE;
          this.high4 = arr[j].useColour.HIGH_VALUE;
          // console.log(low4,high4)
        }
      }
    },
    downloadM (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', format(new Date(),'yyyy-MM-dd hh:mm:ss')+'.xlsx')
        document.body.appendChild(link)
        link.click()
    },
    tableDown(){
      axios({
       method: 'post',
       // url: 'http://192.168.99.245:8080/manage-platform/eventMonitor/exportFileIo/600',
       url: this.$api.rootUrl+"/manage-platform/eventMonitor/exportFileIo/600",
       data: {
         "currentPage": 1,
         "showCount": 600,
         "cdt": this.cdt
       },
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
       });
    },
    reset(){
      this.CurrentPage=1;
      this.pageSize=10;
      let time = new Date();
      let end = new Date();
      let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
      this.cdt={
        startFlightDate:'',
        endFlightDate:''
      };
      this.cdt.startFlightDate=formatDate(begin,'yyyyMMddhhmm');
      this.cdt.endFlightDate=formatDate(end,'yyyyMMddhhmm');
      this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList(this.CurrentPage,val,this.cdt,this.order,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.getList(val,this.pageSize,this.cdt,this.order,this.direction);
      console.log(`当前页: ${val}`);
    },

    getList(currentPage,showCount,pd,order,direction){
      if(this.cdt.startFlightDate==''||this.cdt.endFlightDate==''||this.cdt.startFlightDate==null||this.cdt.endFlightDate==null){
        this.$message({
          message: '航班日期不能为空',
          type: 'warning'
        });
        return
      }
      this.V.$submit('demo', (canSumit,data) => {
        // canSumit为true时，则所有该scope的所有表单验证通过
        if(!canSumit) return
        let p={
          "currentPage":currentPage,
          "showCount":showCount,
          "cdt":pd,
          "order":order,
          "direction":direction
        };
          this.$api.post('/manage-platform/eventMonitor/queryFlightMonitor',p,
           r => {
             if(r.success){
               if(r.data.nextState==0){
                 document.getElementsByClassName('btn-next')[0].disabled=true;
               }else{
                 document.getElementsByClassName('btn-next')[0].disabled=false;
               }
               this.tableData=r.data.resultList;
               this.CurrentPage = r.data.currentPage;
               this.colorList = r.data.pd.useColour;
               for(var j=0;j<this.colorList.length;j++){
                 if(this.colorList[j].COL_NUMBER == 1){
                   this.color1=this.colorList[j].COL_VALUE;
                   this.low1 = this.colorList[j].LOW_VALUE;
                   this.high1 = this.colorList[j].HIGH_VALUE;
                 }else if(this.colorList[j].COL_NUMBER == 2){
                   this.color2=this.colorList[j].COL_VALUE;
                   this.low2 = this.colorList[j].LOW_VALUE;
                   this.high2 = this.colorList[j].HIGH_VALUE;
                 }else if(this.colorList[j].COL_NUMBER == 3){
                   this.color3=this.colorList[j].COL_VALUE;
                   this.low3 = this.colorList[j].LOW_VALUE;
                   this.high3 = this.colorList[j].HIGH_VALUE;
                 }else if(this.colorList[j].COL_NUMBER == 4){
                   this.color4=this.colorList[j].COL_VALUE;
                   this.low4 = this.colorList[j].LOW_VALUE;
                   this.high4 = this.colorList[j].HIGH_VALUE;
                 }
               }
               this.totalPageM(p)
             }
          })
      })

    },
    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         console.log(r);
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r => {
         console.log(r);
         if(r.success){
           this.airport=r.data;
           // this.$emit('transAirport',this.airportModel)
         }
      })
    },

  },
  filters: {
    fifterInOut(val){
      if(val=="O"){
        return "出境"
      }else if(val == "I"){
        return "入境"
      }
    }

  }
}
</script>

<style scoped>
.add-dialog{
  /* padding-left:40px; */
}
.line-h{
  line-height: 30px
}
.t-input-input{
  width: 60%!important;
}
.pd-6{
  padding-bottom: 6px!important
}
.bb{
  border-bottom: 1px solid #ccc;
}
.tt-input-text{
  width: 24%!important;
}
.wrapper{
  padding-left:3%;
}

</style>
