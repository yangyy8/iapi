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
                <el-select v-model="dd"  class="input-input" @visible-change="queryNationality" multiple placeholder="请选择"  size="small">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area" style="margin-top:25px;">
            <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>

          </el-col>
        </el-row>
       </div>
  <div class="middle">
    <el-row>
 <el-col :span="12" class="left">

   <el-table
     :data="tableData"
     border
     style="width: 100%;"
     @selection-change="handleSelectionChange">

             <el-table-column
               prop="instanceNumber"
               label="区域"
             >
             </el-table-column>
             <el-table-column
               prop="instanceName"
               label="实例名称"
             >
             </el-table-column>
             <el-table-column
               prop="status"
               label="状态"
             >
             </el-table-column>


   </el-table>
   <el-table
     :data="tableData"
     border
     style="width: 100%;"
     @selection-change="handleSelectionChange">
             <el-table-column
               prop="area"
               label="区域"
             >
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
   <el-table
     :data="tableData"
     border
     style="width: 100%;"
     @selection-change="handleSelectionChange">
             <el-table-column
               prop="area"
               label="区域"
             >
             </el-table-column>
             <el-table-column
               prop="adress"
               label="表空间名称"
             >
             </el-table-column>
             <el-table-column
               prop="state"
               label="总量"
             >
             </el-table-column>
             <el-table-column
               prop="mqstate"
               label="使用量"
             >
             </el-table-column>
             <el-table-column
               prop="mqsd"
               label="剩余量"
             >
             </el-table-column>
             <el-table-column
               prop="mqsd"
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
  created(){
    this.getlist({});
  },
  methods:{
    getlist(pd){
      this.$api.post('/eamp/monitorDB/queryMonitorDB',pd,
       r => {
         console.log(r);
         console.log(r.data.instance,"r.data.instance");

          this.tableData=r.data.instance;
         // this.TotalResult=r.data.totalResult;
      })
    }

  },
  data() {
    return {


    }
  },

}
</script>

<style scoped>
.right{border-left:2px  solid #DFF1FD; height: 100%; padding-left: 10px;}
.left{padding-right:  10px;}
</style>
