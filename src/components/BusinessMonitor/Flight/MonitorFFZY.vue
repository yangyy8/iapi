<template lang="html">
  <div class="ffzy">
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
                  type="date" size="small" value-format="yyyyMMdd"
                  placeholder="选择时间"  >
                </el-date-picker>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.iOType" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>

            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area">
            <el-button type="success" class="mt-26" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
            <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
          </el-col>
        </el-row>
    </div>
    <div class="middle t-table mb-6">
      <el-table
        ref="multipleTable"
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
          label="航班状态"
          prop="status">
        </el-table-column>
        <el-table-column
          label="非法载运人数">
          <template slot-scope="scope">
            <div class="tc-b hand" title="查看详情" @click="getList2(scope.row.fltKey)">{{scope.row.illegalNum}}</div>
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
    <div class="middle">
      <el-table
        :data="tableData2"
        border
        style="width: 500px;">
        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="gender">
        </el-table-column>
        <el-table-column
          label="出生日期"
          prop="birthDay">
        </el-table-column>
        <el-table-column
          label="国籍"
          prop="nationalityName">
        </el-table-column>
        <el-table-column
          label="证件号码"
          prop="passportNo">
        </el-table-column>
        <el-table-column
          label="座位号"
          prop="seatNum">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tableData:null,
      tableData2:null,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:{},
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
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  activated(){
    this.getList(this.CurrentPage,this.pageSize,this.pd);
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
        "pd": pd
      }
      this.$api.post('/manage-platform/flightMonitor/queryIllegalCarryPage',p,
       r => {
         console.log(r)
         this.tableData=r.data.pdList;
         this.TotalResult=r.data.totalResult;
      })
    },
    getList2(fltKey){
      this.$api.post('/manage-platform/flightMonitor/queryIllegalTravelers',{'fltKey':fltKey},
       r => {
         console.log(r)
         this.tableData2=r.data;
      })
    },
  }
}
</script>

<style scoped>

</style>
