<template lang="html">
  <div class="zlbg">

    <div class="middle">

      <el-table
        :data="tableData"
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
                  prop="ipAddress"
                  label="服务器地址"
                >
                </el-table-column>
                <el-table-column
                  prop="nodeStatus"
                  label="节点状态"
                >
                </el-table-column>
                <el-table-column
                  prop="queueStatus"
                  label="队列状态"
                >
                </el-table-column>
                <el-table-column
                  prop="queueNum"
                  label="队列深度"
                >
                </el-table-column>

      </el-table>

    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      pd: {},
      tableData: []
    }
  },
  created() {
    this.getList({});
  },
  methods: {
    getList(pd) {
      this.$api.post('/eamp/monitorMQ/queryMonitorMQ', pd,
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
      }else {
          return "DMZ区"
      }
      // return val*2
    }
  }

}
</script>

<style scoped>

</style>
