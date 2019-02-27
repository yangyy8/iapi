<template lang="html">
  <div class="zlbg">
    <div class="middle-top">
      <el-row type="flex" class="middle" justify="center">
        <el-col :span="24" style="text-align:center;font-size:24px">
            事件登记
        </el-col>
      </el-row>
    </div>
    <div class="middle mb-2" id="printMe" style="padding: 2% 17% 2% 13%;">
      <el-row type="flex"  class="mb-6">
        <el-col :span="12" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>登记人姓名：</span>
          <el-input placeholder="请输入姓名" size="small" v-model="userName"  class="yy-input-input" :disabled="true"></el-input>
        </el-col>
        <el-col :span="12" class="input-item">
          <span class="yy-input-text"><font class="yy-color">*</font>登记人账号：</span>
          <el-input placeholder="请输入账号" size="small" v-model="userId"  class="yy-input-input" :disabled="true"></el-input>
        </el-col>
      </el-row>

      <el-row type="flex"  class="mb-6">
        <el-col :span="12" class="input-item my-form-group" data-scope="demo1" data-name="RECORDTIMESTR" data-type="select"
          v-validate-easy="[['required']]">
          <span class="yy-input-text"><font class="yy-color">*</font>事件登记时间：</span>
            <el-date-picker
            v-model="form.RECORDTIMESTR"
            type="datetime" size="mini"
            placeholder="请输入时间"
            class="yy-input-input"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyyMMddHHmmss"
            :clearable="false">
          </el-date-picker>
        </el-col>
        <el-col :span="12" class="input-item my-form-group" data-scope="demo1" data-name="TYPE" data-type="select"
          v-validate-easy="[['required']]">
          <span class="yy-input-text"><font class="yy-color">*</font>事件来源：</span>
          <el-select placeholder="请选择" v-model="form.TYPE" filterable clearable  size="small" class="yy-input-input" @change="TypeReal">
            <el-option  value="1" label="上级通知"></el-option>
            <el-option  value="2" label="电话来电"></el-option>
            <el-option  value="3" label="信函/传真"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row type="flex"  class="mb-6" v-if="form.TYPE==2||form.TYPE==3">
        <el-col :span="12" class="input-item my-form-group" data-scope="demo1" data-name="SOURCENAME" data-type="input"
          v-validate-easy="[['required']]">
          <span class="yy-input-text" v-if="form.TYPE==2"><font class="yy-color">*</font>来电人姓名：</span>
          <span class="yy-input-text" v-else-if="form.TYPE==3"><font class="yy-color">*</font>来函人姓名：</span>
          <el-input placeholder="请输入姓名" size="small" v-model="form.SOURCENAME"  class="yy-input-input"></el-input>
        </el-col>
        <el-col :span="12" class="input-item my-form-group" data-scope="demo1" data-name="SOURCEPHONE" data-type="input"
          v-validate-easy="[['required']]">
          <span class="yy-input-text" v-if="form.TYPE==2"><font class="yy-color">*</font>来电人电话：</span>
          <span class="yy-input-text" v-else-if="form.TYPE==3"><font class="yy-color">*</font>来函人电话：</span>
          <el-input placeholder="请输入账号" size="small" v-model="form.SOURCEPHONE"  class="yy-input-input"></el-input>
        </el-col>
      </el-row>
      <!-- <el-row type="flex"  class="mb-6" v-if="form.TYPE==2||form.TYPE==3">
      </el-row> -->

      <el-row type="flex"  class="mb-6">
        <el-col :span="12" class="input-item my-form-group" data-scope="demo1" data-name="TITLE" data-type="input"
          v-validate-easy="[['required']]">
          <span class="yy-input-text"><font class="yy-color">*</font>标题：</span>
          <el-input placeholder="请输入标题" size="small" v-model="form.TITLE"  class="yy-input-input"></el-input>
        </el-col>
        <el-col :span="12" class="input-item">
          <span class="yy-input-text" style="width: 35.7%!important;">附件：</span>
          <el-col :span="20" class="input-item">
            <label class="file">
              上传附件
              <input type="file" name=""  @change="uploadFile">
            </label>
            <div class="" v-if="fileData">
              <div class="" v-for="(x,ind) in fileData" :key="ind">
                <span class="mr-30">{{x.name}}</span>
                <span @click="deleteFile" class="hand redx">删除</span>
              </div>
            </div>
          </el-col>
        </el-col>
      </el-row>
      <!-- <el-row type="flex"  class="mb-6">

      </el-row> -->
      <el-row type="flex" class="mb-6">
        <el-col :span="24" class="input-item my-form-group" data-scope="demo1" data-name="INCIDENTDESC" data-type="textarea"
          v-validate-easy="[['required']]">
          <span class="yy-input-text  widthts"><font class="yy-color">*</font>事件描述：</span>
         <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.INCIDENTDESC" class="yy-input-input widthtex"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row type="flex" justify="center">
        <el-button type="primary" @click="save" size="small">保存</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="getPdf(0)" size="small">打印</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
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
      fileData:{},
      form: {
        RECORDTIMESTR:''
      },
    }
  },
  mounted() {
    let time = new Date();
    this.form.RECORDTIMESTR=formatDate(time,'yyyyMMddhhmmss');
    this.getUser();

  },
  activated(){
    this.getUser();
  },
  methods: {
     TypeReal(){
       this.$set(this.form,'SOURCENAME','');
       this.$set(this.form,'SOURCEPHONE','')
     },
     getUser(){
       this.$api.post('/manage-platform/sysUserInfoController/querySysUserInfo',{},
         r => {
           this.userName = r.data.name;
           this.userId = r.data.userName;
         })
     },
     uploadFile(event){//获取上传的文件
       this.fileData=event.target.files;
     },
     upload(val){//上传文件
       var formData = new FormData();
       let arr=this.fileData;
       for(var i=0;i<arr.length;i++){
         formData.append("file",arr[i]);
       }
       formData.append("eventSerial",val);
       let p=formData;
       this.$api.post('/manage-platform/incident/upload',p,
        r =>{
          if(r.success){
            this.$message({
              message: '恭喜你，保存成功！',
              type: 'success'
            });
            this.form={};
            this.fileData=null;
          }else {
            this.fileData=null;
            return
          }
        },e => {
        },{'Content-Type': 'multipart/form-data'})
     },
     deleteFile(){
       this.fileData = null;
     },
     save(){
       // if(this.form.TYPE==1){
       //   console.log(this.form.TYPE);
       //   console.log(this.$validator);
       //   if (this.$validator.listener.demo2) {
       //     const result = this.$validator.verifyAll('demo2')
       //     console.log(result);
       //     if (result.indexOf(false) > -1) {
       //       return;
       //     }
       //   }
       // }else{
       //   if (this.$validator.listener.demo2&&this.$validator.listener.demo1) {
       //     const result = this.$validator.verifyAll('demo2');
       //     const result1 = this.$validator.verifyAll('demo1');
       //     if (result.indexOf(false) > -1 && result1.indexOf(false) > -1) {
       //       return;
       //     }
       //   }
       // }
       this.V.$submit('demo1', (canSumit,data) => {
         if(!canSumit) return
         this.$api.post('/manage-platform/incident/save',this.form,
           r => {
             if (r.success) {
               if(this.fileData.length){
                 this.upload(r.data);
               }else{
                 this.$message({
                   message: '恭喜你，保存成功！',
                   type: 'success'
                 });
                 this.form={};
               }
             } else {
               this.$message.error('保存失败！');
             }
           },e => {
             this.$message.error('失败了');
           })
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
  width: 30% !important;
}

.yy-input-input {
  width: 70% !important;
}
.widthts{
  width: 15.3%!important
}
.widthtex{
  width: 87.6%!important
}
.file {
    position: relative;
    display: inline-block;
    background: #ecf5ff;
    border: 1px solid #b3d8ff;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #409EFF;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    font-size: 12px;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #409EFF;
    border-color: #409EFF;
    color: #ffffff;
}
.padL{
  padding-left: 7%;
}
</style>
