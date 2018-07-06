<template lang="html">
  <div class="zlbg">

    <div class="middle">

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
                  label="服务器地址"
                >
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="节点状态"
                >
                </el-table-column>
                <el-table-column
                  prop="mqstate"
                  label="队列状态"
                >
                </el-table-column>
                <el-table-column
                  prop="mqsd"
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
      tableData: [{
             area: 'DMZ区',
             adress: '192.168.10.1',
             state: 'UP',
             mqstate:'UP',
             mqsd:'10000'
           }, {
             area: 'DMZ区',
             adress: '192.168.10.1',
             state: 'UP',
             mqstate:'UP',
             mqsd:'10000'
           }, {
             area: '整合分发区',
             adress: '10.1.6.10',
             state: 'DWON',
             mqstate:'DWON',
             mqsd:'556600'
           }]
    }
  },

}
</script>

<style scoped>

</style>
