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
                <el-select v-model="pd.zone"  class="input-input"  filterable clearable  placeholder="请选择"  size="small">
                  <el-option value="0"  label="0 - DMZ区">
                  </el-option>
                  <el-option value="1"  label="1 - 业务平台区">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area" style="margin-top:25px;">
            <el-button type="success" size="small" @click="getlist(pd)">查询</el-button>
          </el-col>
        </el-row>
       </div>
  <div class="middle">
    <el-row>
 <el-col :span="24" @mouseover="mouseHeader">
    <div class="yy-title">实例状态监控</div>
   <el-table
     :data="tableData"
     border
     style="width: 100%;"
     class="mt-10 o-table3"
@header-click="headerClick"
    >
             <el-table-column
               label="区域" sortable>
               <template slot-scope="scope">
                 <div class="">
                   {{scope.row.zone | fifter1}}
                 </div>
               </template>
             </el-table-column>
             <el-table-column
               prop="instanceName"
               label="实例名称" sortable>
             </el-table-column>
             <el-table-column
               label="状态" sortable>
               <template slot-scope="scope">

                   {{scope.row.status | fifter2}}

               </template>
             </el-table-column>


   </el-table>

     <div class="yy-title">异常数据库对象监控</div>
   <el-table
     :data="tableData1"
     border
     style="width: 100%;"
     class="mt-10 o-table3"
     @header-click="headerClick"
     :default-sort = "{prop: 'createtime', order: 'descending'}"
      >
             <el-table-column
               label="区域" sortable
             >
             <template slot-scope="scope">
               <div class="">
                 {{scope.row.zone | fifter1}}
               </div>
             </template>
             </el-table-column>
             <el-table-column
               prop="typeStr"
               label="类型" sortable
             >
             </el-table-column>
             <el-table-column
               prop="name"
               label="名称" sortable
             >
             </el-table-column>
             <el-table-column
               label="状态" sortable
             >
             <template slot-scope="scope">
              {{scope.row.status | fifterstate}}
             </template>
             </el-table-column>
             <el-table-column
               prop="createtime"
               label="创建时间" sortable
             >
             </el-table-column>
             <el-table-column
               prop="lastupdatetime"
               label="最后编译时间" sortable
             >
             </el-table-column>

   </el-table>

   <!-- <el-col :span="12" class="right"> -->
        <div class="yy-title">表空间监控</div>
     <el-table
       :data="tableData2"
       border
       style="width: 100%;"
       class="mt-10 o-table3"
@header-click="headerClick"
      >
               <el-table-column
                 label="区域" sortable
               >
               <template slot-scope="scope">
                 <div class="">
                   {{scope.row.zone | fifter1}}
                 </div>
               </template>
               </el-table-column>
               <el-table-column
                 prop="tablespaceName" sortable
                 label="表空间名称"
               >
               </el-table-column>
               <el-table-column
                 prop="total"
                 label="总量" sortable
               >
               </el-table-column>
               <el-table-column
                 prop="used"
                 label="使用量" sortable
               >
               </el-table-column>
               <el-table-column
                 prop="free"
                 label="剩余量" sortable
               >
               </el-table-column>
               <el-table-column
                 prop="percent"
                 label="使用率" sortable
               >
               </el-table-column>

     </el-table>
   <!-- </el-col> -->
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
  //  this.getlist({});
  },
  methods: {
    headerClick(column,event){
     event.target.title=column.label
    },
    getlist(pd) {
      this.$api.post('/manage-platform/monitorData/queryMonitorDB', pd,
        r => {
          console.log(r);
          console.log(r.data.instance, "r.data.instance");

          this.tableData = r.data.instance;
          this.tableData1 = r.data.abnormal;
          this.tableData2 = r.data.tablespace;
        })
    }

  },
  filters: {

    fifter1(val) {
      if (val == 0) {
        return "DMZ区"
      } else if (val == 2) {
        return "整合分发区"
      } else if (val == 1) {
        return "业务平台区"
      }
      // return val*2
    },
    fifterstate(val){

      // if (val == "Y") {
        return "异常"
      // }
    },
    fifter2(val){
      if(val=="OPEN"){
        return  "正常";
      }else {
      return   "异常";
      }
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
