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
                  prop="type"
                  label="节点类型"
                >
                </el-table-column>
                <el-table-column
                  prop="state"
                  label="节点地址"
                >
                </el-table-column>
                <el-table-column
                  prop="mqstate"
                  label="节点状态"
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
             type: '主节点',
             state: '192.168.10.1',
             mqstate:'UP'
           }, {
             area: 'DMZ区',
             type: '主节点',
             state: '192.168.10.1',
             mqstate:'UP'
           }, {
             area: 'DMZ区',
             type: '主节点',
             state: '192.168.10.1',
             mqstate:'DWON'
           }]
    }
  },

}
</script>

<style scoped>

</style>
