<template lang="html">
  <div class="bjqk">
    <div class="top mb-6">

      <el-row :gutter="2" class="pr-20">

        <el-col :sm="24" :md="12" :lg="8" class="input-item">
          <span class="input-text">航站：</span>
          <el-select v-model="pd.port" placeholder="请选择" filterable clearable size="small" class="input-input">
            <el-option
              v-for="item in airport"
              :key="item.AIRPORT_CODE"
              :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
              :value="item.AIRPORT_CODE">
            </el-option>
          </el-select>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
          <span class="input-text">航班日期：</span>
          <div class="input-input t-flex t-date">
            <el-date-picker
              class="input-input"
              v-model="pd.fltDate"
              type="date" size="small" value-format="yyyyMMdd"
              placeholder="选择时间"  >
            </el-date-picker>
          </div>
        </el-col>

      </el-row>
    </div>
    <div class="middle t-table">
      <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9 mr-15">刷新</el-button>
      <el-checkbox v-model="checked">自动刷新</el-checkbox>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          label="航站"
          prop="portName">
        </el-table-column>
        <el-table-column
          label="出境">
          <el-table-column
            label="黑名单"
            prop="outBlkList">
          </el-table-column>
          <el-table-column
            label="临控名单"
            prop="outTctlList">
          </el-table-column>
          <el-table-column
            label="重点关注名单"
            prop="outFocus">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="入境">
          <el-table-column
            label="黑名单"
            prop="blkList">
          </el-table-column>
          <el-table-column
            label="临控名单"
            prop="tctlList">
          </el-table-column>
          <el-table-column
            label="重点关注名单"
            prop="focus">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="合计">
          <template slot-scope="scope">
            <div>{{scope.row.outBlkList+scope.row.outTctlList+scope.row.outFocus+scope.row.blkList+scope.row.tctlList+scope.row.focus}}</div>
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
export default {
  data(){
    return{
      tableData:null,
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
      checked:false
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryAirport();
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
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
    getList(CurrentPage,showCount,pd){
      let p={
        "showCount": showCount,
        "currentPage": CurrentPage,
        "pd": pd
      }
      this.$api.post('/manage-platform/alarmMonitor/queryAlarmInfoPage',p,
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
