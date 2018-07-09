<template lang="html">
  <div class="zlbg">

    <div class="middle">

      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >

                <el-table-column
                  prop="zone"
                  label="区域"
                >
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
  created(){
  this.getList({});
  },
  methods:{
    getList(pd){
      this.$api.post('/eamp/monitorMQ/queryMonitorMQ',pd,
       r => {
         console.log(r);
         this.tableData=r.data;

      })
    },
  },
  data() {
    return {

    }
  },

}
</script>

<style scoped>

</style>
