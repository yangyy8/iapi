<template lang="html">
  <div class="eventbjsj">
    <div class="middle mb-6">
        <el-row type="flex">
          <el-col :span="20" class="pr-20">
            <el-row align="center" :gutter="2">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">证件号：</span>
                <el-input v-model="pd.passportno" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班号：</span>
                <el-input v-model="pd.fltno" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">国籍/地区：</span>
                <el-select v-model="pd.nationality" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option
                    v-for="item in nationAlone"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-collapse-transition>
            <el-row align="center" :gutter="2" v-if="moreShow">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">姓名：</span>
                <el-input v-model="pd.name" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">出生日期：</span>
                <div class="input-input t-flex t-date">
                  <el-date-picker
                   type="date" size="small" format="yyyy-MM-dd"
                   v-model="pd.birthday_start"
                   value-format="yyyyMMdd"
                   placeholder="开始时间" >
                  </el-date-picker>
                  <span class="septum">-</span>
                  <el-date-picker
                    type="date" size="small" format="yyyy-MM-dd"
                    v-model="pd.birthday_end"
                    value-format="yyyyMMdd"
                    placeholder="结束时间">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班日期：</span>
                <div class="input-input t-flex t-date">
                  <el-date-picker
                   type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                   v-model="pd.fltnoDate_start"
                   value-format="yyyyMMddHHmm"
                   placeholder="开始时间" >
                  </el-date-picker>
                  <span class="septum">-</span>
                  <el-date-picker
                    type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                    v-model="pd.fltnoDate_end"
                    value-format="yyyyMMddHHmm"
                    placeholder="结束时间">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">证件类型：</span>
                <el-select v-model="pd.passportType" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option
                    v-for="(item,ind) in docCode"
                    :key="ind"
                    :label="item.CODE+' - '+item.NAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">历次风评：</span>
                <div class="input-input t-flex t-date">
                  <el-input-number size="small" v-model="pd.eachEvent_start"></el-input-number>
                  <span class="septum">-</span>
                  <el-input-number size="small" v-model="pd.eachEvent_end"></el-input-number>
                </div>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">命中模型：</span>
                <el-select v-model="pd.hit_mode" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option
                    v-for="(item,ind) in ModelHis"
                    v-if="item.MODEL_CODE"
                    :key="ind"
                    :label="item.MODEL_CODE+' - '+item.MODEL_JC"
                    :value="item.MODEL_CODE">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.flightType" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">事件来源：</span>
                <el-select v-model="pd.centre_port" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="1 - 中心" value="1"></el-option>
                  <el-option label="2 - 口岸" value="2"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">口岸：</span>
                <el-select v-model="pd.port_name" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option
                    v-for="(item,ind) in airport"
                    v-if="item.DEPT_CODE"
                    :key="ind"
                    :label="item.DEPT_CODE+' - '+item.DEPT_JC"
                    :value="item.DEPT_CODE">
                  </el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">推送人：</span>
                <el-input v-model="pd.change_people" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">处理人：</span>
                <el-input v-model="pd.processor_people" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">归档人：</span>
                <el-input v-model="pd.archive_pepole" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
            </el-row>
            </el-collapse-transition>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="text" size="small" @click="moreShow=true" v-if="!moreShow">高级查询 ﹀</el-button>
            <el-button type="text" size="small" @click="moreShow=false" v-if="moreShow">收起 ︿</el-button>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
            <el-button type="primary" plain size="small"  class="mt-15" @click="reset" v-if="moreShow">重置</el-button>

          </el-col>
        </el-row>
    </div>
    <div class="middle">
      <!-- <div class="ak-tab">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type==0}" @click="pd.type=0">
            全部
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type==1}" @click="pd.type=1;">
            未核查
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type==2}" @click="pd.type=2;">
            已核查
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type==3}" @click="pd.type=3;">
            已流转
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':pd.type==4}" @click="pd.type=4;">
            已归档
          </div>

        </div>
      </div> -->
      <div class="" >
        <!-- <el-button type="primary" class="mr-5" plain size="small" @click="openGdTc" :disabled="isdisable">批量归档</el-button>
        <el-button type="primary" plain size="small" @click="openCzTc" :disabled="isdisable">批量事件处理</el-button> -->

        <el-table
          class="mt-10"
          ref="multipleTable"
          :data="tableData"
          border
          cell-class-name="cellClass"
          style="width: 100%;">
          <!-- <el-table-column
            label="唯一编号"
            prop="serial"
            sortable
            width="101">
          </el-table-column> -->
          <el-table-column
            label="姓名"
            prop="name"
            sortable
            width="80"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出生日期"
            prop="birthday"
            sortable
            width="101">
          </el-table-column>
          <el-table-column
            label="国籍地区"
            prop="nationalityName"
            sortable
            width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出入标识"
            prop="flightTypeName"
            sortable
            width="50">
          </el-table-column>
          <el-table-column
            label="证件类型"
            prop="passportTypeName"
            sortable
            width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="证件号"
            prop="passportno"
            sortable
            width="90"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span class="tc-b hand" @click="$router.push({name:'DZDA',query:{nationality:scope.row.nationality,passportno:scope.row.passportno,type:2}})">{{scope.row.passportno}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="航班号"
            prop="fltno"
            sortable
            width="90">
          </el-table-column>
          <el-table-column
            label="航班日期"
            prop="fltnoDate"
            sortable
            width="101">
          </el-table-column>
          <el-table-column
            label="口岸"
            prop="port_name"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="命中模型"
            prop="hit_mode_gc"
            width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="命中规则"
            prop="hit_rule_name"
            width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="风险等级"
            prop="grade"
            sortable
            width="145">
            <template slot-scope="scope">
              <el-rate :value="scope.row.grade" size="mini" disabled></el-rate>
            </template>
          </el-table-column>
          <el-table-column
            label="风评结果"
            prop="checkResult"
            width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="事件来源"
            width="50"
            sortable
            prop="centre_port">
          </el-table-column>
          <el-table-column
            label="推送人"
            prop="change_peopleName"
            sortable
            width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="处理人"
            prop="processor_peopleName"
            sortable
            width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="归档人"
            prop="processor_peopleName"
            sortable
            width="50"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="归档时间"
            prop="archive_time"
            sortable
            width="101">
          </el-table-column>
          <el-table-column
            label="操作"
            width="90">
            <template slot-scope="scope">
              <el-button type="text" class="a-btn" icon="el-icon-view" title="查看" @click="$router.push({name:'BJCLCX',query:{serial:scope.row.serial,grade:scope.row.grade}})"></el-button>
              <el-button type="text" class="a-btn" icon="el-icon-edit-outline"  title="归档追加" @click="openGdTc(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="middle-foot">
          <div class="page-msg">
            <div class="">
              共{{Math.ceil(TotalResult/pageSize)}}页
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
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="TotalResult">
          </el-pagination>
        </div>
      </div>
    </div>
    <GDTC :gtitle="'归档追加'" :gvisible="gdDialogVisible" :garr="checkeditem" :gtype="'3'" @gclose="gclose"></GDTC>


  </div>
</template>

<script>
import GDTC from './GDTC'
import { formatDate } from '@/assets/js/date.js'

export default {
  components:{GDTC},

  data(){
    return{
      moreShow:false,
      page: 0,
      multipleSelection:null,
      tableData:[],
      eachData:[],
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:{fltnoDate_start:'',fltnoDate_end:''},
      airport:null,
      docCode:null,
      nationAlone:null,
      ModelHis:null,
      isdisable:true,
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

      czDialogVisible:false,
      czform:{},
      gdDialogVisible:false,

      checkeditem:null,
    }
  },
  mounted(){
    // let begin = new Date();
    // let end = new Date(begin.getTime()+24*60*60*1000);
    // this.pd.fltnoDate_start= formatDate(begin, 'yyyyMMdd')+'000000';
    // this.pd.fltnoDate_end= formatDate(end, 'yyyyMMdd')+'000000';

    this.queryAirport();
    this.queryNationalityAlone();
    this.queryDocCode();
    this.getRiskModelHisInfo();

  },
  activated(){
    this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(this.multipleSelection.length==0){
        this.isdisable=true;
      }else{
        this.isdisable=false;
      }
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage,val,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },
    handleClose(done) {
      // this.czform={};
      done();
    },
    reset(){
      this.CurrentPage=1;
      this.pageSize=10;
      this.pd={};
      this.getList(this.CurrentPage,this.pageSize,this.pd);
    },
    queryAirport(){
      this.$api.post('/manage-platform/riskEventController/getDeptInfo',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },

    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
    queryDocCode(){
      this.$api.post('/manage-platform/cardAndVisaTypeController/queryDmDocCodeAndDmDocCodes',{},
       r => {
         if(r.success){
           this.docCode=r.data;
         }
      })
    },
    getRiskModelHisInfo(){
      this.$api.post('/manage-platform/riskEventController/getRiskModelHisInfo',{},
       r => {
         if(r.success){
           this.ModelHis=r.data;
         }
      })
    },
    getList(CurrentPage,showCount,pd){
      if(this.pd.fltnoDate_start||this.pd.fltnoDate_end){
        if(!(this.pd.fltnoDate_end&&this.pd.fltnoDate_start)){
          this.$message.error('请输入完整的航班日期区间！');
          return
        }
      }
      if(this.pd.birthday_start||this.pd.birthday_end){
        if(!(this.pd.birthday_end&&this.pd.birthday_start)){
          this.$message.error('请输入完整的出生日期区间！');
          return
        }
      }
      if(this.pd.eachEvent_start||this.pd.eachEvent_end){
        if(!(this.pd.eachEvent_end&&this.pd.eachEvent_start)){
          this.$message.error('请输入完整的历次风评区间！');
          return
        }
      }
      let p={
        "showCount": showCount,
        "currentPage": CurrentPage,
        "pd": pd
      }
      this.$api.post('/manage-platform/riskEventController/queryRiskGdEventInfo',p,
       r => {
         console.log(r)
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },
    queryEach(serial,nationality,passportno){
      let p={
        "pd": {
          "serial":serial,
      		"nationality":nationality,
      		"passportno":passportno
        }
      }
      this.$api.post('/manage-platform/riskEventController/queryEachRiskEventInfo',p,
       r => {
         this.eachData=r.data
      })
    },
    openCzTc(){
      this.czform={};
      this.czDialogVisible=true
    },
    czSave(){
      let arr1=this.multipleSelection;
      let p={
        list:[]
      };
      let that=this;
      for(var i=0;i<arr1.length;i++){
        let a={
          "processorResult":that.czform.processorResult,
    			"change_port":that.czform.change_port,
    			"processor_desc":that.czform.processor_desc,
        	"processor_people":arr1[i].processor_people,
    			"serial":arr1[i].serial
        }
        p.list.push(a)
      }

      this.$api.post('/manage-platform/riskEventController/updateBatchDisposeEventInfo',p,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，操作成功！',
             type: 'success'
           });
           this.czDialogVisible=false;
         }
      })
    },
    openGdTc(item){
      this.checkeditem=item;
      this.gdDialogVisible=true;
    },
    gclose(data){
      console.log(data)
      this.gdDialogVisible=data;
      this.getList(this.CurrentPage,this.pageSize,this.pd);

    },

  }
}
</script>

<style scoped>
.cellClass{
  height: 32px;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}
.tag-list{
  color: #0274f1;
  border-bottom: 1px solid #0274f1;
  font-size: 16px;
  padding-bottom: 3px;
  display: flex;
  /* justify-content: space-between; */
}
.tag-list span{
  display: inline-block;
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px!important;
}
.checked-tag{
  background: #0274f1;
  color: #fff;
  border-radius: 50%;
}
.tag-list span:hover{
  background: #0274f1;
  color: #fff;
  border-radius: 50%;
}
</style>
