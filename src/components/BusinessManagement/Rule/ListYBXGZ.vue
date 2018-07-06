<template lang="html">
  <div class="generalRule">
    <div class="middle-top mb-2">
        <el-row type="flex" class="middle">
          <el-col :span="20" class="br pr-20">
            <div class="title-green ">
              查询条件
            </div>
            <el-row align="center" :gutter="2">

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">出入境方向：</span>
                <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                  <el-option>
                  </el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">状态：</span>
                <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                  <el-option>
                  </el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">人员类别：</span>
                <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                  <el-option>
                  </el-option>
                </el-select>
              </el-col>

            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area">
            <el-button type="success" class="mt-26" size="small">查询</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="addDialogVisible=true">新增</el-button>
        <el-button type="success" size="small">保存</el-button>
        <el-button style="background-color:#4BC3A0;color:#fff" size="small">生效发布</el-button>
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
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="personnelCategory"
          label="人员类别"
          width="160">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="ruleName"
          label="规则名称"
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
          label="字段名称"
          width="130">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="theOperator"
          label="运算符">
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
          prop="feedbackTheResult"
          label="反馈结果">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="feedbackTheResult"
          label="反馈结果描述">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" size="small" class="table-select"></el-input>
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
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <div class="flex-r">
              <el-button class="table-btn" size="mini" plain icon="el-icon-delete">删除</el-button>
            </div>
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
    			"ruleName": '1',
    			"fieldNames": "男",
    			"theOperator": "1",
    			"theValues": 1,
    			"feedbackTheResult": "1",
          "feedbackTheResult": "1",
          "date":'1',
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
.mt-26{
  margin-top: 26px!important;
}

</style>
