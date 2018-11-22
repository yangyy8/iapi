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
                <span class="input-text">航班日期：</span>
                <el-date-picker
                  class="input-input"
                  v-model="pd.fltDate"
                  :editable="false"
                  :clearable="false"
                  type="date" size="small" value-format="yyyyMMdd"
                  placeholder="选择时间"  >
                </el-date-picker>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.iOType"  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>

            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area">
            <el-button type="success" class="" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
            <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
          </el-col>
        </el-row>
    </div>
    <div class="middle">
      <el-checkbox v-model="checked" class="mr-15">自动刷新</el-checkbox>

      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          label="航班号"
          prop="fltno">
        </el-table-column>
        <el-table-column
          label="航班日期"
          prop="fltDate">
        </el-table-column>
        <el-table-column
          label="出入标识"
          prop="iOType">
          <template slot-scope="scope">
            <div>
              <span v-if="scope.row.ioType=='I'">入境</span>
              <span v-if="scope.row.ioType=='O'">出境</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="计划起飞时间"
          prop="preDepartTime">
        </el-table-column>
        <el-table-column
          label="计划到达时间"
          prop="preArriveTime">
        </el-table-column>
        <el-table-column
          label="出发站"
          prop="from">
        </el-table-column>
        <el-table-column
          label="目的站"
          prop="to">
        </el-table-column>
        <el-table-column
          label="航空公司"
          prop="aircompanyName">
        </el-table-column>
        <el-table-column
          label="72小时">
          <template slot-scope="scope">
            <div>正常：{{scope.row.pnr72}}<br/>
            异常：{{scope.row.pnr72Ex}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="24小时">
          <template slot-scope="scope">
            <div>正常：{{scope.row.pnr24}}<br/>
            异常：{{scope.row.pnr24Ex}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="2小时">
          <template slot-scope="scope">
            <div>正常：{{scope.row.pnr2}}<br/>
            异常：{{scope.row.pnr2Ex}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="1小时">
          <template slot-scope="scope">
            <div>正常：{{scope.row.pnr1}}<br/>
            异常：{{scope.row.pnr1Ex}}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="航班关闭">
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
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/date.js'
export default {
  data(){
    return{
      tableData:[],
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
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
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  activated(){
    this.getList(this.CurrentPage,this.pageSize,this.pd);
    let end = new Date();
    this.pd.fltDate= formatDate(end, 'yyyyMMdd');
    if(this.checked){
      let that=this;
      this.timer=setInterval(function(){
        that.getList(that.CurrentPage,that.pageSize,that.pd);
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
          that.getList(that.CurrentPage,that.pageSize,that.pd);
        },15000)
      }else{
        clearInterval(this.timer);
      }
    }
  },
  methods:{
    pageSizeChange(val) {
      this.getList(this.CurrentPage,val,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },
    getList(CurrentPage,showCount,pd){
      let p={
        "showCount": showCount,
        "currentPage": CurrentPage,
        "totalResult": this.TotalResult,
        "pd": pd
      }
      this.$api.post('/manage-platform/flightMonitor/queryPnrMessageCountPage',p,
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
