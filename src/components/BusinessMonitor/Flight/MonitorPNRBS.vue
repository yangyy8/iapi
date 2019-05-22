<template lang="html">
  <div class="pnrbs">
    <div class="middle mb-6">
        <el-row type="flex">
          <el-col :span="20" class="br pr-20">
            <!-- <div class="title-green ">
              查询条件
            </div> -->
            <el-row align="center" :gutter="2">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班号：</span>
                <el-input  v-model="pd.fltNo" placeholder="请输入" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班日期：</span>
                <el-date-picker
                  class="input-input"
                  v-model="pd.fltDate"
                  :editable="false"
                  :clearable="false"
                  :picker-options="pickerOptions"
                  type="date" size="small" value-format="yyyyMMdd"
                  placeholder="选择时间"  >
                </el-date-picker>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.ioType"  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value=""></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">口岸：</span>
                <el-select  placeholder="请选择"  size="mini"  class="input-input" v-model="pd.port" filterable clearable @visible-change="portMethod">
                  <el-option
                  v-for="item in portName"
                  :key="item.KADM"
                  :value="item.KADM"
                  :label="item.KADM+' - '+item.KAMC"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area">
            <el-button type="success" class="" size="small" @click="getList(CurrentPage,pageSize,pd,orders,direction)">查询</el-button>
            <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
          </el-col>
        </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-row class="mb-15" type="flex" justify="space-between">
        <div class="">
          <el-checkbox v-model="checked" class="mr-15">自动刷新</el-checkbox>
          <span class="tc-999 f-14">注：点击每行可查看航班详情</span>
        </div>
        <div class="">
          <el-button type="text" class="a-btn" title="帮助" @click="help">帮助</el-button>
        </div>
      </el-row>
      <el-table
        class="mt-10 o-table3"
        :data="tableData"
        border
        @sort-change="sortChange"
        @row-click="rowClick"
        style="width: 100%;">
        <el-table-column
          label="航班号"
          prop="fltno"
          sortable="custom"
          width="90"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="航班日期"
          prop="fltDate"
          sortable="custom"
          width="101"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="出入标识"
          prop="ioType"
          sortable="custom"
          width="90"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.ioType=='I'">入境</span>
              <span v-if="scope.row.ioType=='O'">出境</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="计划起飞时间"
          prop="preDepartTime"
          sortable="custom"
          width="135"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="计划到达时间"
          prop="preArriveTime"
          sortable="custom"
          width="135"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="出发站"
          sortable="custom"
          prop="from"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="目的站"
          sortable="custom"
          prop="to"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="航空公司"
          sortable="custom"
          prop="aircompanyName"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="72小时"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>正常：{{scope.row.pnr72}}<br/>
            异常：{{scope.row.pnr72Ex}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="24小时"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>正常：{{scope.row.pnr24}}<br/>
            异常：{{scope.row.pnr24Ex}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="2小时"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>正常：{{scope.row.pnr2}}<br/>
            异常：{{scope.row.pnr2Ex}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="1小时"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>正常：{{scope.row.pnr1}}<br/>
            异常：{{scope.row.pnr1Ex}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="航班关闭"
          :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div>正常：{{scope.row.pnr0}}<br/>
            异常：{{scope.row.pnr0Ex}}</div>
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
            <a v-if="detailsData.status==3">已起飞</a>
            <a v-if="detailsData.status==6">已到达</a>
            <a v-if="detailsData.status==4">已办理入境手续</a>
            <a v-if="detailsData.status==5">已取消</a>
            <a v-if="detailsData.status==7">无关闭报文</a>
            <a v-if="detailsData.status==8">无值机报文</a>
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
          <el-col :sm="24" :md="12" :lg="8" >
            <span>72小时报送时间：</span>
            {{detailsData.t72}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>24小时报送时间：</span>
            {{detailsData.t24}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>2小时报送时间：</span>
            {{detailsData.t2}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>1小时报送时间：</span>
            {{detailsData.t1}}
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" >
            <span>航班关闭报送时间：</span>
            {{detailsData.t0}}
          </el-col>

        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="warning" @click="detailsDialogVisible = false" size="small">关闭页面</el-button>
      </span>
    </el-dialog>
    <el-dialog  title="名词解释"  :visible.sync="helpDialogVisible" width="750px">
      <div class="helpBody">
        <div>1、72小时：计划起飞时间72小时前发送视为“正常”，72小时之内发送</div>
        <div>2、24小时：计划起飞时间24小时之前、72小时之内发送</div>
        <div>3、2小时：距计划起飞时间2小时之前、24小时之内发送</div>
        <div>4、1小时：距计划起飞时间1小时之前、2小时之内发送</div>
        <div>5、航班关闭：距计划起飞时间之前、1小时之内发送</div>
        <div>6、“正常” 指报文接收解析成功</div>
        <div>7、“异常” 指报文接收解析失败</div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="helpDialogVisible=false" size="small">返回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/date.js'
export default {
  data(){
    return{
      helpDialogVisible:false,
      portName:[],
      tableData:[],
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      orders:"",
      direction:0,
      pd:{fltDate:''},
      airport:null,
      checked:true,
      timer:null,
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
      detailsDialogVisible:false,
      detailsData:{},
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < (Date.now() - 3600 * 1000 * 24*2)
        }
      },
    }
  },
  mounted(){
    let end = new Date();
    this.pd.fltDate= formatDate(end, 'yyyyMMdd');
  },
  activated(){
    this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);

    if(this.checked){
      let that=this;
      this.timer=setInterval(function(){
        that.getList(that.CurrentPage,that.pageSize,that.pd,that.orders,that.direction);
      },180000)
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
          that.getList(that.CurrentPage,that.pageSize,that.pd,that.orders,that.direction);
        },180000)
      }else{
        clearInterval(this.timer);
      }
    }
  },
  methods:{
    portMethod(){
      this.$api.post('/manage-platform/codeTable/queryAirportMatch1',{},
      r =>{
        if(r.success){
          this.portName = r.data
        }
      })
    },
    help(){
      this.helpDialogVisible=true;
    },
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
    getList(CurrentPage,showCount,pd,orders,direction){
      let p={
        "showCount": showCount,
        "currentPage": CurrentPage,
        "totalResult": this.TotalResult,
        "pd": pd,
        "order":orders,
	      "direction":direction
      }
      this.$api.post('/manage-platform/flightMonitor/queryPnrMessageCountPage',p,
       r => {
         console.log(r)
         this.tableData=r.data.pdList;
         this.TotalResult=r.data.totalResult;
      })
    },
    rowClick(row,event,column){
      // console.log("row",row)
      let p={
        flightRecordnum:row.fltKey,
        portto:row.portto,
        ioflag:row.ioType
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
  }
}
</script>

<style scoped>

</style>
