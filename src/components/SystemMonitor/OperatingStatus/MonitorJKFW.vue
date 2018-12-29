<template lang="html">
  <div class="jkfw">
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
                <el-option value="0"  label="0 - DMZ区"></el-option>
                <el-option value="1"  label="1 - 业务平台区"></el-option>
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
    :default-sort = "{prop: 'name', order: 'descending'}"
    style="width: 100%;">
    <el-table-column
      label="所属系统"
      sortable>
      <template slot-scope="scope">
        <div class="">
          {{scope.row.zone | fifter3}}
        </div>
      </template>
    </el-table-column>
    <el-table-column
      label="区域" sortable>
      <template slot-scope="scope">

        {{scope.row.zone | fifter1}}

      </template>
    </el-table-column>
    <el-table-column
      prop="url"
      label="URL"
      sortable>
    </el-table-column>
    <el-table-column
      prop="name"
      label="服务名称"
      sortable>
    </el-table-column>
    <el-table-column
      label="服务状态"
      sortable>
      <template slot-scope="scope">
         <span :class="{'yycolor':scope.row.status=='UP','yycolory':scope.row.status=='DOWN'}">   {{scope.row.status | fifter2}}</span>
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
      pd: {zone:'0'},
      tableData:[]
    }
  },
  mounted() {
    //this.getList(this.pd);
  },
  activated() {
  //  this.getList(this.pd);
  },

  methods: {
    getList(pd) {
      this.$api.post('/manage-platform/monitorSpring/queryMonitorSpring',pd,
        r => {
          this.tableData = r.data;
        })
    },
  },
  filters:{
    fifter1(val){
      if(val==0){
        return "DMZ区"
      }else{
        return "业务平台区"
      }
    },
    fifter3(val){
      if(val == 0){
        return '值机校验系统'
      }else if(val == 1){
        return '业务平台子系统'
      }else if(val == 2){
        return '整合分发子系统'
      }else if(val == 3){
        return '风险评估子系统'
      }
    },
    fifter2(val){
      if(val=="UP"){
        return  "正常";
      }else {
      return   "异常";
      }
    }
  }

}
</script>

<style scoped>
.yycolor{ background: green; padding: 3px 8px; color: #ffffff;}
.yycolory{  background: red;padding: 3px 8px; color: #ffffff;}
</style>
