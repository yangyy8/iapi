<template lang="html">
  <div class="zlbg">
    <div class="middle-top">
      <el-row type="flex" class="middle" justify="center">
        <el-col :span="24" style="text-align:center;font-size:24px">
            事件登记
        </el-col>
      </el-row>
    </div>
    <div class="middle mb-2" id="printMe">
      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>登记人姓名：</span>
          <el-input placeholder="请输入姓名" size="small" v-model="userName"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>登记人账号：</span>
          <el-input placeholder="请输入账号" size="small" v-model="userId"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}" :disabled="true"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>事件登记时间：</span>
            <el-date-picker
            v-verify.change.blur ="{regs:'required',submit:'demo2'}"
            v-model="form.RECORDTIMESTR"
            type="datetime" size="mini"
            placeholder="请输入时间"
            class="yy-input-input"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyyMMddHHmmss">
          </el-date-picker>
        </el-col>
      </el-row>

      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>事件来源：</span>
          <el-select placeholder="请选择" v-model="form.TYPE" filterable clearable  size="small" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}">
            <el-option  value="1" label="上级通知"></el-option>
            <el-option  value="2" label="电话来电"></el-option>
            <el-option  value="3" label="信件"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row type="flex"  class="mb-6" v-show="form.TYPE==2||form.TYPE==3">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text" v-if="form.TYPE==2"><font class="yy-color">*</font>来电人姓名：</span>
          <span class="yy-input-text" v-else-if="form.TYPE==3"><font class="yy-color">*</font>信访人姓名：</span>
          <el-input placeholder="请输入姓名" size="small" v-model="form.SOURCENAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex"  class="mb-6" v-show="form.TYPE==2||form.TYPE==3">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text" v-if="form.TYPE==2"><font class="yy-color">*</font>来电人电话：</span>
          <span class="yy-input-text" v-else-if="form.TYPE==3"><font class="yy-color">*</font>信访人电话：</span>
          <el-input placeholder="请输入账号" size="small" v-model="form.SOURCEPHONE"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
        </el-col>
      </el-row>

      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>标题：</span>
          <el-input placeholder="请输入标题" size="small" v-model="form.TITLE"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex"  class="mb-6">
        <el-col :span="20" class="input-item">
          <span class="yy-input-text">附件：</span>
          <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            >
            <el-button size="small" class="table-btn">上传附件</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row type="flex" class="mb-6" >
        <el-col :span="20" class="input-item">
          <span class="yy-input-text">事件描述：</span>
         <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.INCIDENTDESC" class="yy-input-input widthts"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="save" size="small">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="" size="small" v-print="'#printMe'">打印</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button type="primary" @click="reset" size="small">重置</el-button>
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
      userName:'',
      userId:'',
      htmlTitle: '页面导出PDF文件名',
      page:0,
      detailsDialogVisible: false,

      form: {
        FILESERIAL:'',
      },

    }
  },
  mounted() {
    this.getUser();

  },
  activated(){
    this.getUser();
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
     getUser(){
       this.$api.post('/manage-platform/sysUserInfoController/querySysUserInfo',{},
         r => {
           this.userName = r.data.userName;
           this.userId = r.data.userId;
         })
     },
     save(){
       if (this.$validator.listener.demo2) {
         const result = this.$validator.verifyAll('demo2')
         if (result.indexOf(false) > -1) {
           return;
         }
       }
       this.$api.post('/manage-platform/incident/save',this.form,
         r => {
           if (r.success) {
             this.$message({
               message: '保存成功！',
               type: 'success'
             });
           } else {
             this.$message.error('保存失败！');
           }
         },e => {
           this.$message.error('失败了');
         })
     },
     reset(){
       this.form={FILESERIAL:''}
     }

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
