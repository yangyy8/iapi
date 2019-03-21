<template lang="html">
  <div class="ffbs">
    <div class="mb-6 middle">
      <div class="ak-tab">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':tabId==0}" @click="tabId=0">
            整体监控
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':tabId==1}" @click="tabId=1">
            航班关闭
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':tabId==2}" @click="tabId=2">
            航班取消
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':tabId==3}" @click="tabId=3">
            预检信息
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':tabId==4}" @click="tabId=4">
            订票信息
          </div>
        </div>
      </div>
      <div class="ak-tab-pane" v-show="tabId==0" @mouseover="mouseHeader">

        <el-row class="mb-9">
          <el-col :span="20" class="br pr-20">
            <el-row align="center" :gutter="2">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班日期：</span>
                <el-date-picker
                  class="input-input"
                  :editable="false"
                  :clearable="false"
                  v-model="pd2.fltDate"
                  type="date" size="mini" value-format="yyyyMMdd"
                  placeholder="选择时间"  >
                </el-date-picker>

              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">机场：</span>
                <el-select v-model="pd2.port" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option
                    v-for="item in airport"
                    v-if="item.JCDM"
                    :key="item.JCDM"
                    :label="item.JCDM+' - '+item.KAMC"
                    :value="item.JCDM">
                  </el-option>
                </el-select>
              </el-col>

            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area">
            <el-button type="success" class="" size="small" @click="getList2(CurrentPage,pageSize,pd2)">查询</el-button>
            <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
          </el-col>
        </el-row>
        <!-- <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9 mr-15" @click="getList2(CurrentPage,pageSize,pd2)">刷新</el-button> -->
        <el-checkbox v-model="checked">自动刷新</el-checkbox>

        <el-table
          :data="tableData2"
          class="mt-10 o-table3"
          border
          max-height="600"
          style="width: 100%;">
          <el-table-column
            label="航班号"
            prop="fltno"
            sortable
            width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出入标识"
            prop="ioType"
            sortable
            width="110"
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
            sortable
            width="132"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="计划到达时间"
            prop="preArriveTime"
            sortable
            width="132"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出发站"
            prop="from"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="目的站"
            prop="to"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="航空公司"
            prop="aircompanyName"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="航班状态"
            width="110"
            sortable
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
            label="航班关闭报文次数"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>正常：{{scope.row.close}}<br/>
              异常：{{scope.row.closeEx}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="航班取消报文次数"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>正常：{{scope.row.cancel}}<br/>
              异常：{{scope.row.cancelEx}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="IAPI报文次数"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>正常：{{scope.row.iapi}}<br/>
              异常：{{scope.row.iapiEx}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="PNR报文次数"
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>正常：{{scope.row.pnr}}<br/>
              异常：{{scope.row.pnrEx}}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="ak-tab-pane" v-show="tabId!=0" @mouseover="mouseHeader">

        <el-row class="mb-9">
          <el-col :span="20" class="br pr-20">
            <el-row align="center" :gutter="2">

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班日期：</span>
                <el-date-picker
                  class="input-input"
                  v-model="pd1.fltDate"
                  :editable="false"
                  :clearable="false"
                  type="date" size="mini" value-format="yyyyMMdd"
                  placeholder="选择时间"  >
                </el-date-picker>

              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">机场：</span>
                <el-select v-model="pd1.port" placeholder="请选择"  size="small" clearable filterable class="block input-input">
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
                <span class="input-text">非法报送阈值：</span>
                <el-input v-model="yuzhi" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>

              </el-col>

            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area">
            <el-button type="success" class="" size="small" @click="getList">查询</el-button>
            <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
          </el-col>
        </el-row>
        <el-checkbox v-model="checked2" class="mr-15">自动刷新</el-checkbox>

        <el-table
          class="mt-10 o-table3"
          :data="tableData"
          max-height="600"
          border
          style="width: 100%;">
          <el-table-column
            label="航班号"
            prop="fltno"
            sortable
            width="90"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出入标识"
            prop="ioType"
            sortable
            width="101"
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
            sortable
            width="145"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="计划到达时间"
            prop="preArriveTime"
            sortable
            width="145"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出发站"
            prop="from"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="目的站"
            prop="to"
            sortable
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="航空公司"
            prop="aircompanyName"
            sortable
            width="280"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="航班状态"
            prop="status"
            sortable
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
            label="非法报送数"
            prop="closeEx"
            sortable
            :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <div>
                <span v-if="tabId==1">{{scope.row.close+scope.row.closeEx}}</span>
                <span v-if="tabId==2">{{scope.row.cancel+scope.row.cancelEx}}</span>
                <span v-if="tabId==3">{{scope.row.iapi+scope.row.iapiEx}}</span>
                <span v-if="tabId==4">{{scope.row.pnr+scope.row.pnrEx}}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>

    <!-- <div class="middle-top middle mb-2">
      <div class="title-green ">
        报送实时查询
      </div>
      <el-row>
        <el-col :span="20" class="pr-20">
          <el-row align="center" :gutter="2">
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班日期：</span>
              <el-date-picker
                class="input-input"
                :editable="false"
                :clearable="false"
                @change="getList2(CurrentPage,pageSize,pd2)"
                v-model="pd2.fltDate"
                type="date" size="mini" value-format="yyyyMMdd"
                placeholder="选择时间"  >
              </el-date-picker>

            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">机场：</span>
              <el-select v-model="pd2.port" @change="getList2(CurrentPage,pageSize,pd2)" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                <el-option
                  v-for="item in airport"
                  v-if="item.JCDM"
                  :key="item.JCDM"
                  :label="item.JCDM+' - '+item.KAMC"
                  :value="item.JCDM">
                </el-option>
              </el-select>
            </el-col>

          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
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
    </div> -->
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/date.js'

export default {
  data(){
    return{
      tabId:0,
      yuzhi:null,
      tableData:null,
      tableData2:null,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd1:{fltDate:''},
      pd2:{fltDate:''},
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
      checked2:true,
      timer:null,
      timer2:null
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryAirport();
    let end = new Date();
    this.pd1.fltDate= formatDate(end, 'yyyyMMdd');
    this.pd2.fltDate= formatDate(end, 'yyyyMMdd');

  },
  activated(){
    console.log(this.tabId)
    console.log("get1")
    this.getList();
    this.getList2(this.CurrentPage,this.pageSize,this.pd2);

    if(this.checked&&this.tabId==0){
      let that=this;
      this.timer=setInterval(function(){
        that.getList2(that.CurrentPage,that.pageSize,that.pd2);
      },60000)
    }
    if(this.checked2&&this.tabId!=0){
      let that=this;
      console.log("get2")
      this.timer2=setInterval(function(){
        that.getList();
      },180000)
    }

  },
  deactivated(){
　　clearInterval(this.timer);
    clearInterval(this.timer2);
    this.timer=null;
    this.timer2=null;
    console.log(this.timer,this.timer2)
  },
  watch:{
    // tabId:function(val){
    //   console.log(val)
    //   if(val==0&&this.checked){
    //     let that=this;
    //     this.timer=setInterval(function(){
    //       that.getList2(that.CurrentPage,that.pageSize,that.pd2);
    //     },60000)
    //   }else {
    //     clearInterval(this.timer);
    //   }
    //   if(val!=0&&this.checked2){
    //     let that=this;
    //     this.timer2=setInterval(function(){
    //       that.getList();
    //     },180000)
    //   }else {
    //     clearInterval(this.timer2);
    //
    //   }
    // },
    checked:function(val){
      console.log(val)
      if(val&&this.tabId==0){
        let that=this;
        this.timer=setInterval(function(){
          that.getList2(that.CurrentPage,that.pageSize,that.pd2);
        },60000)
      }else{
        clearInterval(this.timer);
      }
    },
    checked2:function(val){
      console.log(val)
      if(val&&this.tabId!=0){
        let that=this;
        console.log("get3")
        this.timer2=setInterval(function(){
          that.getList();
        },180000)
      }else{
        clearInterval(this.timer2);
      }
    }
  },
  methods:{
    pageSizeChange(val) {
      this.getList2(this.CurrentPage,val,this.pd2);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList2(val,this.pageSize,this.pd2);
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
    getList(){
      if(this.tabId==1){
        this.pd1.closeThreshold=this.yuzhi
      }else if(this.tabId==2){
        this.pd1.cancelThreshold=this.yuzhi
      }else if(this.tabId==3){
        this.pd1.iapiThreshold=this.yuzhi
      }else if(this.tabId==4){
        this.pd1.pnrThreshold=this.yuzhi
      }
      let p={
        "pd": this.pd1
      }
      this.$api.post('/manage-platform/flightMonitor/queryIllegalFlight',p,
       r => {
         console.log(r)
         this.tableData=r.data.pdList;
      })
    },
    getList2(CurrentPage,pageSize,pd2){
      let p={
        "showCount": pageSize,
         "currentPage": CurrentPage,
        "pd": pd2
      }
      this.$api.post('/manage-platform/flightMonitor/queryIllegalRealTime',p,
       r => {
         console.log(r)
         this.tableData2=r.data.pdList;
         // this.TotalResult=r.data.totalResult;

      })
    },
  }
}
</script>

<style scoped>
.middle-tab {
  /* width: 252px; */
  display: flex;
}
.middle-tab-item {
  /* width: 33.3%; */
  box-sizing: border-box;

  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #a2ddd7;
  color: #4bc3a0;
  padding: 0 20px;
}
.middle-tab-content{
  background: #fff;
  padding: 15px;
}
</style>
