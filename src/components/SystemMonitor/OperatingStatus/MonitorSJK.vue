<template lang="html">
  <div class="sjk">
      <div class="middle-top mb-2">
        <el-row type="flex" class="middle">

          <el-col :span="20" class="br">
            <div class="title-green">
              查询条件
            </div>
            <el-row align="center" type="flex" justify="center"   :gutter="2" class="pr-20">
              <el-col  :span="8"  class="input-item">
                <span class="input-text">监控区域：</span>
                <el-select v-model="pd.zone"  class="input-input"  placeholder="请选择"  size="small">
                  <el-option value=""  label="全部">
                  </el-option>
                  <el-option value="0"  label="DMZ区">
                  </el-option>
                  <el-option value="1"  label="整合分发区">
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
    <el-row>
 <el-col :span="12" class="left">
    <div class="yy-title">实例状态监控</div>
   <el-table
     :data="tableData"
     border
     style="width: 100%;"
    >
             <el-table-column
               label="区域">
               <template slot-scope="scope">
                 <div class="">
                   {{scope.row.zone | fifter1}}
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               prop="instanceName"
               label="实例名称">
             </el-table-column>
             <el-table-column
               prop="status"
               label="状态">
             </el-table-column>


   </el-table>

     <div class="yy-title">异常数据库对象监控</div>
   <el-table
     :data="tableData1"
     border
     style="width: 100%;"
  >
             <el-table-column

               label="区域"
             >
             <template slot-scope="scope">
               <div class="">
                 {{scope.row.zone | fifter1}}
               </div>
             </template>
             </el-table-column>
             <el-table-column
               prop="adress"
               label="类型"
             >
             </el-table-column>
             <el-table-column
               prop="state"
               label="名称"
             >
             </el-table-column>
             <el-table-column
               prop="mqstate"
               label="状态"
             >
             </el-table-column>
             <el-table-column
               prop="mqsd"
               label="创建时间"
             >
             </el-table-column>
             <el-table-column
               prop="mqsd"
               label="最后编译时间"
             >
             </el-table-column>

   </el-table>


 </el-col>
 <el-col :span="12" class="right">
      <div class="yy-title">表空间监控</div>
   <el-table
     :data="tableData2"
     border
     style="width: 100%;"
    >
             <el-table-column
               label="区域"
             >
             <template slot-scope="scope">
               <div class="">
                 {{scope.row.zone | fifter1}}
               </div>
             </template>
             </el-table-column>
             <el-table-column
               prop="tablespaceName"
               label="表空间名称"
             >
             </el-table-column>
             <el-table-column
               prop="total"
               label="总量"
             >
             </el-table-column>
             <el-table-column
               prop="free"
               label="使用量"
             >
             </el-table-column>
             <el-table-column
               prop="mqsd"
               label="剩余量"
             >
             </el-table-column>
             <el-table-column
               prop="percent"
               label="使用率"
             >
             </el-table-column>

   </el-table>
 </el-col>
</el-row>

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
      this.$api.post('/eamp/monitorData/queryMonitorDB', pd,
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
