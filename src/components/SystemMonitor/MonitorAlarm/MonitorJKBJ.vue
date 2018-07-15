<template lang="html">
  <div class="sjk">
      <div class="middle-top mb-2">
        <el-row type="flex" class="middle">

            <el-col :span="22" class="br pr-20">
            <div class="title-green">
              查询条件
            </div>
              <el-row align="center"   :gutter="2" >
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">监控对象：</span>
                <el-select v-model="pd.airlineCompanyIdEqual" filterable @visible-change="queryNationality" placeholder="请选择" size="small" class="input-input">
                   <el-option
                     v-for="item in company"
                     :key="item.AIRLINE_CODE"
                     :label="item.AIRLINE_CHN_NAME"
                     :value="item.AIRLINE_CODE" >
                   </el-option>
                 </el-select>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">报警类型：</span>
                <el-select v-model="pd.airlineCompanyIdEqual" filterable @visible-change="queryNationality" placeholder="请选择" size="small" class="input-input">
                   <el-option
                     v-for="item in company"
                     :key="item.AIRLINE_CODE"
                     :label="item.AIRLINE_CHN_NAME"
                     :value="item.AIRLINE_CODE" >
                   </el-option>
                 </el-select>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">处理状态：</span>
                <el-select v-model="pd.airlineCompanyIdEqual" filterable @visible-change="queryNationality" placeholder="请选择" size="small" class="input-input">
                   <el-option
                     v-for="item in company"
                     :key="item.AIRLINE_CODE"
                     :label="item.AIRLINE_CHN_NAME"
                     :value="item.AIRLINE_CODE" >
                   </el-option>
                 </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area" style="margin-top:25px;">
            <el-button type="success" size="small" @click="getList(pd)">查询</el-button>

          </el-col>
        </el-row>
       </div>
  <div class="middle">

   <el-table
     :data="tableData"
     border
     style="width: 100%;"
    >
    <el-table-column
      prop="instanceName"
      label="监控对象">
    </el-table-column>
             <el-table-column
               label="监控区域">
               <template slot-scope="scope">
                 <div class="">
                   {{scope.row.zone | fifter1}}
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               prop="instanceName"
               label="报警类型">
             </el-table-column>
             <el-table-column
               prop="instanceName"
               label="报警时间">
             </el-table-column>
             <el-table-column
               prop="instanceName"
               label="报警内容">
             </el-table-column>
             <el-table-column
               prop="instanceName"
               label="处理人">
             </el-table-column>
             <el-table-column
               prop="instanceName"
               label="处理时间">
             </el-table-column>
             <el-table-column
               label="操作">
               <template slot-scope="scope">
                 <div class="flex-r">
                   <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
                 </div>
              </template>
             </el-table-column>


   </el-table>



  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pd: {
        zone: ""
      },
      tableData: [],
      tableData1: [],
      tableData2: []
    }
  },
  created() {
    this.getlist({});
  },
  methods: {
    getlist(pd) {
      this.$api.post('/eamp/monitorDB/queryMonitorDB', pd,
        r => {
          console.log(r);
          console.log(r.data.instance, "r.data.instance");

          this.tableData = r.data.instance;
          this.tableData2 = r.data.tablespace;
        })
    }

  },
  filters: {

    fifter1(val) {
      if (val == 0) {
        return "DMZ区"
      } else if (val == 1) {
        return "整合分发区"
      } else if (val == 2) {
        return "业务平台区"
      } else {
        return ""
      }
      // return val*2
    }
  }

}
</script>

<style scoped>
.right {
  border-left: 2px solid #DFF1FD;
  height: 100%;
  padding-left: 10px;
}

.left {
  padding-right: 10px;
}
</style>
