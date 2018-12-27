<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="10" >
          <el-button type="success" size="small" @click="getList(pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          label="区域"
          sortable>
          <template slot-scope="scope">
            {{scope.row.synFlag | fifter1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="节点类型"
          sortable>
          <template slot-scope="scope">
            {{scope.row.stateStrName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="节点地址"
          sortable>
        </el-table-column>
        <el-table-column
          label="节点状态"
          sortable>
          <template slot-scope="scope">
              {{scope.row.health | fifter3 }}
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
      tableData: [],
    }
  },
  mounted() {
  //  this.getList();
  },
  activated() {
  //  this.getList();
  },
  methods: {
    getList() {
      this.$api.post('/manage-platform/monitorMongoDb/queryMonitorMongoDb',{},
        r => {
          this.tableData = r.data;
        })
    },
  },
  filters: {
    fifter1(val) {
      if(val==0){
        return "DMZ区"
      }else{
        return "业务平台区"
      }
    },
    fifter3(val) {
      if (val == 0) {
        return "down";
      } else {
        return "up";
      }
  }
}

}
</script>

<style scoped>

</style>
