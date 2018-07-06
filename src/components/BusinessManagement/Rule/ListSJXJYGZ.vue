<template lang="html">
  <div class="dataItemCheck">
    <div class="middle-top mb-2">
        <el-row type="flex" class="middle">
          <el-col :span="22" class="br pr-20">
            <div class="title-green ">
              查询条件
            </div>
            <el-row align="center" :gutter="2">

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">出入境方向：</span>
                <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                  <el-option>
                  </el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">状态：</span>
                <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                  <el-option>
                  </el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">字段名称：</span>
                <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
              </el-col>

              <el-col :sm="24" :md="12" :lg="6" class="input-item">
                <span class="input-text">人员类别：</span>
                <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                  <el-option>
                  </el-option>
                </el-select>
              </el-col>

            </el-row>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="success" class="mt-31" size="small">查询</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="addDialogVisible=true">新增</el-button>
        <el-button type="success" size="small">保存并发布</el-button>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="entryAndExit"
          label="出入境方向"
          width="180">
        </el-table-column>
        <el-table-column
          prop="personnelCategory"
          label="人员类别"
          width="160">

        </el-table-column>
        <el-table-column
          prop="fieldNames"
          label="字段名称"
          width="130">
        </el-table-column>
        <el-table-column
          prop="theValues"
          label="取值">
        </el-table-column>
        <el-table-column
          prop="date"
          label="状态">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="restrictive"
          label="限制性">
        </el-table-column>
        <el-table-column
          prop="minimumLength"
          label="最小长度">
        </el-table-column>
        <el-table-column
          prop="maximumLength"
          label="最大长度">
        </el-table-column>

      </el-table>
    </div>

  </div>



</template>

<script>
export default {
  data(){
    return{
      value:1,
      detailsDialogVisible:false,
      tableData: [
        {
          "entryAndExit": "左",
    			"personnelCategory": "1",
    			"fieldNames": '1',
    			"theValues": "男",
    			"date": "1",
    			"restrictive": 1,
    			"minimumLength": "1",
          "maximumLength": "1",
        }
      ],
      multipleSelection:[]
    }
  },
  methods:{
    handleSelectionChange(val) {
       this.multipleSelection = val;
     }
  }
}
</script>

<style scoped>

</style>
<style media="screen">

.el-table__body{
    table-layout:auto !important;
}
.mt-31{
  margin-top: 31px!important;
}

</style>
