<template lang="html">
  <div class="hbssjk">
    <div class="top mb-6">
      <el-row type="flex" >
        <el-col :span="22" class="br">
          <el-row :gutter="2" class="pr-20 top-row">
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班号：</span>
              <el-input  v-model="pd.fltNo" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航站：</span>
              <el-select  v-model="pd.port" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option
                  v-for="item in airport"
                  v-if="item.JCDM"
                  :key="item.JCDM"
                  :label="item.JCDM+' - '+item.KAMC"
                  :value="item.JCDM">
                </el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select  v-model="pd.ioType" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <el-option label="A - 入出境" value=""></el-option>
              </el-select>
            </el-col>
            <!--   0:计划 1:值机 3:已起飞 4:已办理入境 5:取消 6:已到达 7:已失效-->
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">航班状态：</span>
              <el-select v-model="pd.status" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                <el-option label="0 - 计划" value="0"></el-option>
                <el-option label="1 - 已预检" value="1"></el-option>
                <el-option label="2 - 已起飞" value="2"></el-option>
                <el-option label="3 - 已到达" value="3"></el-option>
                <el-option label="4 - 已办理入境手续" value="4"></el-option>
                <el-option label="5 - 已取消" value="5"></el-option>
                <el-option label="6 - 无关闭报文" value="6"></el-option>
                <el-option label="7 - 无值机报文" value="7"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">报警类型：</span>
              <el-select v-model="bjsj"  multiple placeholder="请选择"  size="small" clearable filterable class="block input-input">
                <el-option label="1 - 白名单" value="whtSel"></el-option>
                <el-option label="2 - 黑名单" value="blkSel"></el-option>
                <el-option label="3 - 临控名单" value="ctlSel"></el-option>
                <el-option label="4 - 重点关注人员名单" value="fcsSel"></el-option>
              </el-select>
            </el-col>
            <!-- <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班日期：</span>
              <el-date-picker
                class="input-input"
                v-model="pd.fltDate"
                @change="getList(CurrentPage,pageSize,pd)"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="选择时间"  >
              </el-date-picker>
            </el-col> -->
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
              <span class="input-text">航班日期：</span>
              <div class="input-input t-flex t-date">
                <el-date-picker
                 type="date" size="small"
                 :editable="false"
                 :clearable="false"
                 v-model="pd.fltDateFr"
                 value-format="yyyyMMdd"
                 placeholder="开始时间" >
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker
                  type="date" size="small"
                  :editable="false"
                  :clearable="false"
                  v-model="pd.fltDateTo"
                  value-format="yyyyMMdd"
                  placeholder="结束时间">
                </el-date-picker>
              </div>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="2" class="down-btn-area">
          <el-button type="success" class="" size="small" @click="getList(CurrentPage,pageSize,pd,orders,direction)">查询</el-button>
          <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
        </el-col>

      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9 mr-15" @click="getList(CurrentPage,pageSize,pd,orders,direction)">刷新</el-button>
      <el-checkbox v-model="checked" class="mr-15">自动刷新</el-checkbox>
      <span class="tc-999 f-14">注：点击每行可查看航班详情</span>
      <el-table
        class="o-table3"
        ref="multipleTable"
        :data="tableData"
        @row-click="rowClick"
        @sort-change="sortChange"
        border
        style="width: 100%;">
        <el-table-column
          label="航班号"
          prop="fltNo"
          sortable
          width="90">
        </el-table-column>
        <el-table-column
          label="出发站"
          prop="portFrom"
          sortable
          width="87"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="目的站"
          prop="portTo"
          sortable
          width="87"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="出入标识"
          sortable
          width="90"
          prop="FLIGHTTYPE"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.ioType=='I'">入境</span>
              <span v-if="scope.row.ioType=='O'">出境</span>
            </div>
          </template>

        </el-table-column>
        <el-table-column
          label="航班日期"
          prop="SCHEDULEDATIME"
          sortable
          width="101"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{scope.row.fltDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="航班状态"
          prop="status"
          sortable
          width="101"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.status==0">计划</span>
              <span v-if="scope.row.status==1">已预检</span>
              <span v-if="scope.row.status==2">已起飞</span>
              <span v-if="scope.row.status==3">已到达</span>
              <span v-if="scope.row.status==4">已办理入境手续</span>
              <span v-if="scope.row.status==5">已取消</span>
              <span v-if="scope.row.status==6">无关闭报文</span>
              <span v-if="scope.row.status==7">无值机报文</span>
            </div>
          </template>

        </el-table-column>
        <el-table-column
          label="名单报警"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>
              <span class="tc-o">黑({{scope.row.blkNum}})</span>
              <span class="tc-666">临({{scope.row.ctlNum}})</span>
              <span>白({{scope.row.whtNum}})</span>
              <span class="redx">重({{scope.row.fcsNum}})</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="值机时间"
          prop="checkInTime"
          sortable
          width="110"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="计划起降时间"
          prop="scheduleDaTime"
          sortable
          width="120"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="实际起降时间"
          prop="daTime"
          sortable
          width="120"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="值机人员详情">
          <el-table-column
            label="中国内地"
            prop="inlandNum"
            width="50">
          </el-table-column>
          <el-table-column
            label="港澳台"
            prop="gatNum"
            width="50">
          </el-table-column>
          <el-table-column
            label="外国人"
            prop="foreignNum"
            width="50">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="登机人员详情">
          <el-table-column
            label="实际登机"
            prop="boarding"
            width="50">
          </el-table-column>
          <el-table-column
            label="允许登机"
            prop="chk0Z"
            width="50">
          </el-table-column>
          <el-table-column
            label="禁止登机"
            prop="chk1Z"
            width="50">
          </el-table-column>
          <el-table-column
            label="非法载运"
            prop="illegalBoarding"
            width="50">
          </el-table-column>
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
          :current-page.sync ="CurrentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"
      width="950px">
      <div class="detail-msg-text">
        <el-row  class="detail-msg-row">
          <el-col :sm="24" :md="12" :lg="8" >
            <span>航班号：</span>
            {{detailsData.fltNo}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>航班日期：</span>
            {{detailsData.fltDate}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>出入境标识：</span>
            <!-- {{detailsData.ioType}} -->
            <a v-if="detailsData.ioType=='I'">入境</a>
            <a v-if="detailsData.ioType=='O'">出境</a>

          </el-col>

          <el-col :sm="24" :md="12" :lg="8" >
            <span>出发地：</span>
            {{detailsData.portFrom}}

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>目的地：</span>
            {{detailsData.portTo}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>航空公司：</span>
            {{detailsData.airlineCompany}}
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" >
            <span>预计起飞时间：</span>
            {{detailsData.departuretime}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>预计到达时间：</span>
            {{detailsData.arrivetime}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>航班状态：</span>
            <!-- {{detailsData.status}} -->
            <a v-if="detailsData.status==0">计划</a>
            <a v-if="detailsData.status==1">已预检</a>
            <a v-if="detailsData.status==2">已起飞</a>
            <a v-if="detailsData.status==3">已到达</a>
            <a v-if="detailsData.status==4">已办理入境手续</a>
            <a v-if="detailsData.status==5">已取消</a>
            <a v-if="detailsData.status==6">无关闭报文</a>
            <a v-if="detailsData.status==7">无值机报文</a>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>实际起飞时间：</span>
            {{detailsData.realDeparturetime}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>实际到达时间：</span>
            {{detailsData.realArrivetime}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>值机时间：</span>
            {{detailsData.checkInTime}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>订票总人数：</span>
            {{detailsData.bookingcount}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>值机人数：</span>
            {{detailsData.checkinCount}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>黑名单人数：</span>
            {{detailsData.blkNum}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>临控名单人数：</span>
            {{detailsData.ctlNum}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>重点关注名单人数：</span>
            {{detailsData.fcsNum}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>白名单人数：</span>
            {{detailsData.whtNum}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>内地人数：</span>
            {{detailsData.inlandNum}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>港澳台人数：</span>
            {{detailsData.gatNum}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>外国人人数：</span>
            {{detailsData.foreignNum}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>允许登机人数：</span>
            {{detailsData.chk0Z}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>实际登机人数：</span>
            {{detailsData.boarding}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>非法运载人数：</span>
            {{detailsData.illegalBoarding}}
          </el-col>

        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="detailsDialogVisible = false" size="small">关闭页面</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/date.js'
export default {
  data(){
    return{
      tableData:null,
      CurrentPage:1,
      pageSize:10,
      orders:"",
      direction:0,
      TotalResult:0,
      bjsj:[],
      pd:{whtSel:'0',blkSel:'0',ctlSel:'0',fcsSel:'0',fltDateFr:'',fltDateTo:''},
      airport:null,
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
      checked:true,
      timer:null,
      detailsDialogVisible:false,
      detailsData:{},
    }
  },
  mounted(){
    // this.getTimePage();
    let end = new Date();
    let begin = new Date(end - 24*60*60*1000);
    this.pd.fltDateFr= formatDate(begin, 'yyyyMMdd');
    this.pd.fltDateTo= formatDate(end, 'yyyyMMdd');
    this.queryAirport();

  },
  activated(){

    // this.initTimer()
    this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);

    if(this.checked){
      let that=this;
      console.log(that.CurrentPage,that.pageSize,that.pd)
      this.timer=setInterval(function(){
        that.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
      },60000)
    }

  },
  deactivated(){
　　clearInterval(this.timer)
  },
  watch:{
    checked:function(val){
      console.log(val)
      if(val){
        let that=this;
        this.timer=setInterval(function(){
          that.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
        },60000)
      }else{
        clearInterval(this.timer);
      }
    }
  },
  methods:{
    pageSizeChange(val) {
      this.pageSize=val;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage=val
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
      console.log(`当前页: ${val}`);
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirportMatch',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
    rowClick(row,event,column){
      let p={
        flightRecordnum:row.flightRecordnum,
        portto:row.portto
      }
      this.$api.post('/manage-platform/flightRealTime/queryFightDetail',p,
       r => {
         console.log(r)
         this.detailsDialogVisible=true;
         this.detailsData=r.data
      })
    },
    sortChange(data){
      console.log(data)
      this.orders=data.prop;
      if(data.order=='descending'){
        this.direction=0
      }else{
        this.direction=1
      }
      console.log(this.orders,this.direction)
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
    },
    // 航班实时查询
    getList(CurrentPage,showCount,pd,orders,direction){
      // console.log(this.bjsj,pd)
      let arr =this.bjsj;
      pd.whtSel='0';pd.blkSel='0';pd.ctlSel='0';pd.fcsSel='0';
      for(var i=0;i<arr.length;i++){
        pd[arr[i]]='1';
      }
      // console.log(pd)
      let p={
    		"showCount": showCount,
    		"currentPage": CurrentPage,
        "totalResult": this.TotalResult,
    		"pd": pd,
        "order":orders,
	      "direction":direction
      }
      console.log(CurrentPage,showCount,pd)
      this.$api.post('/manage-platform/flightRealTime/queryRealTimePage',p,
       r => {
         console.log(r)
         this.tableData=r.data.pdList;
         this.TotalResult=r.data.totalResult;
      })
    },
  }
}
</script>

<style scoped>

</style>
