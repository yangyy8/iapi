<template lang="html">
  <div class="visaRules">
    <div class="middle mb-2">
      <el-row class="mb-15">
        <div class="title-green">
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
          prop="ruleName"
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
          prop="fieldNames"
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
          prop="theOperator"
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
          prop="valueFeedback"
          label="取值反馈结果">
          <template slot-scope="scope">
            <el-select v-model="value" placeholder="请选择"  size="mini" class="table-select">
              <el-option>
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          prop="feedbackResultDescription"
          label="反馈结果描述">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
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
    <div class="middle pd-0">
      <el-row type="flex" class="middle">
        <el-col :span="24" class="br pr-20">
          <el-row align="center" :gutter="2">
            <el-col :sm="24" :md="12" :lg="4" class="input-item">
              <span class="input-text color-font">|&nbsp;&nbsp;符合条件的国家（本国国籍）</span>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">反馈结果：</span>
              <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                <el-option>
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">反馈描述：</span>
              <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">状态：</span>
              <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                <el-option>
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="middle transfer-middle mb-2">
      <template>
        <el-transfer v-model="value1" :data="data"
        :button-texts="['', '']">
        </el-transfer>
      </template>
    </div>

    <div class="middle pd-0">
      <el-row type="flex" class="middle">
        <el-col :span="24" class="br pr-20">
          <el-row align="center" :gutter="2">
            <el-col :sm="24" :md="12" :lg="4" class="input-item">
              <span class="input-text color-font">|&nbsp;&nbsp;符合条件的入境口岸</span>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">反馈结果：</span>
              <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                <el-option>
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">反馈描述：</span>
              <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="6" class="input-item">
              <span class="input-text">状态：</span>
              <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                <el-option>
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="middle transfer-middle">
      <template>
        <el-transfer v-model="value1" :data="data"
        :button-texts="['', '']">
        </el-transfer>
      </template>
    </div>
  </div>





</template>

<script>
export default {
  data(){
    const generateData = _ => {
      const data = [];
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: '备选项 ${ i }',
        });
      }
      return data;
    };
    return{
      value:1,
      detailsDialogVisible:false,
      tableData: [
        {
          "ruleName": "左",
    			"fieldNames": "1",
    			"theOperator": '1',
    			"theValues": "男",
    			"valueFeedback": "1",
    			"feedbackResultDescription": 1,
    			"date": "1",
        }
      ],
      multipleSelection:[],
      data: generateData(),
      value1: [1, 4]

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
