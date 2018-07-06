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
        mqstate: 'UP',
        mqsd: '10000'
      }, {
        area: 'DMZ区',
        adress: '192.168.10.1',
        state: 'UP',
        mqstate: 'UP',
        mqsd: '10000'
      }, {
        area: '整合分发区',
        adress: '10.1.6.10',
        state: 'DWON',
        mqstate: 'DWON',
        mqsd: '556600'
      }]
    }
  },

}
</script>

<style scoped>

</style>
