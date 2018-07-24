<template lang="html">
  <div class="zlbg">

    <div class="middle">

      <el-table
        :data="tableData"
        border
        style="width: 100%;">

                <el-table-column
                  label="区域" sortable
                >
                <template slot-scope="scope">
                    {{scope.row.synFlag | fifter1 }}
                </template>
                </el-table-column>
                <el-table-column

                  label="节点类型" sortable
                >
                <template slot-scope="scope">
                    {{scope.row.type | fifter2 }}
                </template>
                </el-table-column>
                <el-table-column
                  prop="hostaddress"
                  label="节点地址" sortable
                >
                </el-table-column>
                <el-table-column
                  label="节点状态" sortable
                >
                <template slot-scope="scope">
                    {{scope.row.status | fifter3 }}
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
      pd: {},
    }
  },
  created() {
    this.getList({});
  },
  methods: {
    getList(pd) {
      this.$api.post('/manage-platform/monitorRedis/queryMonitorRedis', pd,
        r => {
          console.log(r);
          this.tableData = r.data;

        })
    },
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
        return "DMZ区"
      }
      // return val*2
    },
    fifter2(val) {
      return "主节点"
    },
    fifter3(val) {
      if (val == 0) {
        return "UP";
      } else {
        return "DOWN";
      }

  }
}

}
</script>

<style scoped>

</style>
