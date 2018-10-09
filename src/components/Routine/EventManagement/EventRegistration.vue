<template lang="html">
  <div class="zlbg">
    <div class="middle-top">
      <el-row type="flex" class="middle" justify="center">
        <el-col :span="24" style="text-align:center;font-size:24px">
            事件登记
        </el-col>
      </el-row>
    </div>
    <div class="middle mb-2">
      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>登记人姓名：</span>
          <el-input placeholder="请输入内容" size="small" maxlength="20"  v-model="form.ROLE_NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>登记人账号：</span>
          <el-input placeholder="请输入内容" size="small" maxlength="20"  v-model="form.ROLE_NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>事件登记时间：</span>

            <el-date-picker
            v-verify.change.blur ="{regs:'required',submit:'demo2'}"

            type="date" size="mini"
            placeholder="请输入时间"
            class="yy-input-input"
            value-format="yyyyMMdd">
          </el-date-picker>

        </el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>事件来源：</span>
          <el-input placeholder="请输入内容" size="small" maxlength="20"  v-model="form.ROLE_NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>标题：</span>
          <el-input placeholder="请输入内容" size="small" maxlength="20"  v-model="form.ROLE_NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>附件：</span>
          <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" class="table-btn">上传附件</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row type="flex" class="mb-6" >
        <el-col :span="20" class="input-item">
          <span class="yy-input-text">事件描述：</span>
         <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.REMARKS" class="yy-input-input widthts"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="" size="small">新增</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="" size="small">打印</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="" size="small">重置</el-button>
    </el-row>
    </div>
  </div>
</template>
<script>

import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {

  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      page:0,
      pd: {
        "isBlurred":false,
        departdateBegin:'',
        departdateEnd:'',
      },
      detailsDialogVisible: false,
      options: [{
          value: 10,
          label: "10"
        },
        {
          value: 20,
          label: "20"
        },
        {
          value: 30,
          label: "30"
        }
      ],
      tableData: [],
      multipleSelection: [],
      form: {},

    }
  },
  mounted() {
  let time = new Date();
  let end = new Date();
  let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
  this.pd.departdateBegin=formatDate(begin,'yyyyMMddhhmm');
  this.pd.departdateEnd=formatDate(end,'yyyyMMddhhmm');

  },
  activated(){

  },
  methods: {
    handleRemove(file, fileList) {
       console.log(file, fileList);
     },
     handlePreview(file) {
       console.log(file);
     },
     handleExceed(files, fileList) {
       this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
     },
     beforeRemove(file, fileList) {
       return this.$confirm(`确定移除 ${ file.name }？`);
     },


  },

}
</script>
<style scoped>
.yy-input-text {
  width: 20% !important;
}

.yy-input-input {
  width: 20% !important;
}
.widthts{
  width: 70%!important
}
</style>
