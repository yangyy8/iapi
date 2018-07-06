<template lang="html">
  <div class="visaRules">
    <div class="middle">
      <el-row class="mb-15">
        <div class="title-green ">
          过境免签规则
        </div>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="entryAndExit"
          label="规则名称"
          width="180">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="personnelCategory"
          label="字段名称"
          width="160">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="fieldNames"
          label="运算符"
          width="130">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="theValues"
          label="取值">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="取值反馈结果">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="date"
          label="反馈结果描述">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
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
