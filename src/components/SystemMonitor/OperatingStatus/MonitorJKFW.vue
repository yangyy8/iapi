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
                <el-select v-model="pd.zone"  class="input-input"  placeholder="请选择"  size="small">
                  <el-option value=""  label="全部">
                  </el-option>
                  <el-option value="0"  label="DMZ区">
                  </el-option>
                  <el-option value="1"  label="整合分发区">
                  </el-option>
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
        style="width: 100%;">
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
          prop="url"
          label="URL"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="服务名称"
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="服务状态"
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
      pd: {zone:''},
      tableData:[]
    }
  },
  created() {
    this.getList(this.pd);

  },
  methods: {

    getList(pd) {
      this.$api.post('/eamp/monitorSpring/queryMonitorSpring', pd,
        r => {
          console.log(r);
          this.tableData = r.data;
        })
    },
  },
  filters:{

    fifter1(val){
      if(val==0){
        return "DMZ区"
      }else{
        return "整合分发区"
      }
      // return val*2
    }
  }

}
</script>

<style scoped>

</style>
