<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <div class="middle">
        <span class="tubiao hand borderL www" :class="{'checked':page==1}" @click="qq">文件管理</span><span class="tubiao hand borderR wwt" :class="{'checked':page==0}" @click="page=0">通讯录</span>
      </div>
      <el-row type="flex" class="middle" v-show="page==1" justify="center" style="padding-top:0px!important">
        <el-col  :sm="24" :md="12" :lg="10">
          <el-input placeholder="请输入内容" size="small" v-model="mcdt.FILENAME"></el-input>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="4"  class="input-item">
          &nbsp;&nbsp;&nbsp;
          <el-button type="success" size="small" @click="mgetList(mCurrentPage,mpageSize,mcdt)">搜索</el-button>&nbsp;&nbsp;&nbsp;
          <el-button type="success" size="small" @click="folderDialogVisible = true;fileData=null">文件上传</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="middle" v-show="page==0" style="padding-top:0px!important">
        <el-col :span="22" class="br">
          <el-row align="center"   :gutter="2" class="pr-20" type="flex" justify="center">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.NAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">账号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.USERNAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">手机号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.PHONE"  class="input-input"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,cdt)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
        <div id="div1" v-show="page==0">
          <el-row class="margin-bt">
            <el-button type="primary" size="mini" @click="adds(0,'');form={}">新增</el-button>
            <el-button type="success" size="mini" @click="batchI">批量导入</el-button>
            <el-button type="success" size="mini" @click="download">模板下载</el-button>
          </el-row>
          <el-table
            :data="tableData"
            border
            style="width: 100%;"
            class="o-table3"
            @header-click="headerClick">
            <el-table-column
              label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="NAME"
              label="姓名" sortable
              width="140">
            </el-table-column>
            <el-table-column
              prop="SEX"
              label="性别" sortable>
              <template slot-scope="scope">
                {{ scope.row.SEX | fiftersex }}
              </template>
            </el-table-column>
            <el-table-column
              prop="USERNAME"
              label="账号" sortable>
            </el-table-column>
            <el-table-column
              prop="DEPT_QC"
              label="部门" sortable>
            </el-table-column>
            <el-table-column
              prop="PHONE"
              label="电话" sortable>
            </el-table-column>
            <el-table-column
              prop="MAIL"
              label="邮箱" sortable>
            </el-table-column>
            <el-table-column
              prop="AIRPORT_NAME"
              label="航站名称" sortable>
            </el-table-column>
            <el-table-column
              label="操作" width="80">
              <template slot-scope="scope">
                <el-button type="text"  class="a-btn"  title="编辑" icon="el-icon-edit" @click="adds(1,scope.row)"></el-button>
                <el-button type="text"  class="a-btn"  title="删除" icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
             </template>
            </el-table-column>
          </el-table>
          <div class="middle-foot">
            <div class="page-msg">
              <div class="">
                共{{Math.ceil(TotalResult/pageSize)}}页
              </div>
              <div class="">
                每页
                <el-select v-model="pageSize" @change="pageSizeChange(pageSize)" placeholder="10" size="mini" class="page-select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                条
              </div>
              <div class="">
                共{{TotalResult}}条
              </div>
            </div>
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              layout="prev, pager, next"
              :total="TotalResult">
            </el-pagination>
          </div>
        </div>
        <div id="div2" v-show="page==1" class="margin-bt">
          <el-table
            :data="mtableData"
            border
            style="width: 100%;"
            class="o-table3"
            @header-click="headerClick">
            <el-table-column
              label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="FOLDER"
              label="文件夹名称" sortable
              width="140">
            </el-table-column>
            <el-table-column
              prop="FILENAME"
              label="文件名称" sortable>
            </el-table-column>
            <el-table-column
              prop="FILESIZE"
              label="文件大小" sortable>
            </el-table-column>
            <el-table-column
              prop="FILETYPE"
              label="文件类型" sortable>
            </el-table-column>
            <el-table-column
              prop="CREATETIMESTR"
              label="文件创建时间" sortable>
            </el-table-column>
            <el-table-column
              label="操作"
              width="80">
              <template slot-scope="scope">
                <a :href="scope.row.FILESERIAL" class="acolor"><el-button type="text"  class="a-btn"  title="文件下载" icon="el-icon-download" @click="a(scope.row.FILESERIAL)"></el-button></a>
                <el-button type="text"  class="a-btn"  title="删除" icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
             </template>
            </el-table-column>
          </el-table>
          <div class="middle-foot">
            <div class="page-msg">
              <div class="">
                共{{Math.ceil(mTotalResult/mpageSize)}}页
              </div>
              <div class="">
                每页
                <el-select v-model="mpageSize" @change="pageSizeChange(mpageSize)" placeholder="10" size="mini" class="page-select">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                条
              </div>
              <div class="">
                共{{mTotalResult}}条
              </div>
            </div>
            <el-pagination
              background
              @current-change="handleCurrentChange"
              :page-size="mpageSize"
              layout="prev, pager, next"
              :total="mTotalResult">
            </el-pagination>
          </div>
        </div>
    </div>
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>姓名：</span>
            <el-select placeholder="请选择" v-model="form.NAME" filterable clearable @visible-change="nameMethod(0)" size="small" class="yy-input-input" @change="nameMethodReal(form.NAME)" v-verify.change.blur ="{regs:'required',submit:'demo2'}">
              <el-option
              v-for="item in dutyName"
              :key="item.SERIAL"
              :value="item.NAME"
              :label="item.NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>性别：</span>
            <el-input size="small" v-model="form.SEXNAME"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>账号：</span>
            <el-input size="small" v-model="form.USERNAME"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>部门：</span>
            <el-input size="small" v-model="form.DEPT_QC"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>电话：</span>
            <el-input size="small" v-model="form.PHONE"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>邮箱：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.MAIL"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>航站：</span>
            <el-select placeholder="请选择" v-model="form.AIRPORT_CODE" filterable clearable @visible-change="terminal" size="small" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}">
              <el-option
              v-for="item in takeOffName"
              :key="item.AIRPORT_CODE"
              :value="item.AIRPORT_CODE"
              :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>



      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">保 存</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="文件上传" :visible.sync="folderDialogVisible"   width="640px" :before-close="uploadHandleClose">
      <el-form :model="releaseform" ref="releaseForm">
        <el-row type="flex"  class="mb-6" justify="center" :gutter="10">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">文件夹：</span>
            <!-- <el-input placeholder="请输入文件夹名" size="small"  v-model="folder"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input> -->
            <el-select placeholder="请选择" v-model="folder" filterable clearable @visible-change="folderMethod" size="small" class="input-inp">
              <el-option
              v-for="item in folderName"
              :key="item.SERIAL"
              :value="item.SERIAL"
              :label="item.FOLDER">
              <span style="float: left">{{item.FOLDER}}</span>
              <span style="float: right;margin-left:20px;line-height:2.5!important;" class="el-icon-circle-close" @click.stop="deleteItem(item.SERIAL)"></span>
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="2" class="input-item">
            <el-button @click="addFolder" size="small" type="primary">新 增</el-button>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="5" class="input-item">
          </el-col>
          <el-col :span="4" class="input-item">
            <label class="file">
              添加文件
              <input type="file" name=""  @change="uploadFile">
            </label>

          </el-col>
          <el-col :span="2" class="input-item">
            <div class="" v-if="fileData">
              <div class="" v-for="(x,ind) in fileData" :key="ind">
                <span class="mr-30">{{x.name}}</span>
              </div>
            </div>
          </el-col>


        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" name="button" @click="upload" size="small" style="margin-left:10px!important">上传</el-button>
        <el-button @click="uploadCancelUpload" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog
      title="文件夹名"
      :visible.sync="folderdialogVisible"
      width="30%"
      >
      <el-form  class="plan">
        <el-form-item label="文件夹名:" :label-width="formLabelWidth">
          <el-input v-model="fff" auto-complete="off" size="small"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="planSave">保存</el-button>
      </span>
    </el-dialog>

    <!--action="http://192.168.99.248:8081/manage-platform/addressManage/readExcel"  -->
    <el-dialog title="批量导入" :visible.sync="uploadDialogVisible"   width="640px"
    :before-close="handleClose">
      <el-form :model="importform" ref="importForm">
        <el-upload
          class="upload-demo"
          ref="upload"
          name="excel"
          :multiple="false"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :action="$api.rootUrl+'/manage-platform/addressManage/readExcel'"
          :on-success="uploadSuccess"
          :limit="1"
          :on-exceed="handleExceed"
          :before-upload="beforeUpload"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUpload" size="small">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {

  data() {
    return {
      delIndex:'',
      tp: 0,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,

      mCurrentPage: 1,
      mpageSize: 10,
      mTotalResult: 0,

      dialogText: "新增",
      addDialogVisible: false,//新增编辑
      uploadDialogVisible:false,//批量导入
      folderDialogVisible:false,//文件上传
      folderdialogVisible:false,//文件夹名
      page:0,
      fileLoad:'',

      mcdt:{},
      cdt:{},
      folder:'',//文件夹名
      folderName:[],//文件夹名列表
      formLabelWidth:'120px',
      fff:'',
      releaseform:{},
      importform:{},
      fileData:{},
      takeOffName:[],
      dutyName:[],

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
      mtableData:[],
      multipleSelection: [],
      form: {},

    }
  },
  mounted() {
    // this.getList(this.CurrentPage, this.pageSize, this.cdt)
    // this.mgetList(this.mCurrentPage,this.mpageSize,this.mcdt)
  },
  activated(){

  },
  methods: {
    a(item){
      console.log(item)
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    qq(){
      this.page=1;
      // this.mgetList(this.mCurrentPage,this.mpageSize,this.mcdt);
    },
    handleSelectionChange(val) {
    this.multipleSelection = val;
    },
    pageSizeChange(val) {
      if(this.page==0){
        this.getList(this.CurrentPage, val, this.cdt);
      }else if(this.page==1){
        this.mgetList(this.mCurrentPage,val,this.mcdt);
      }
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if(this.page==0){
        this.getList(val, this.pageSize, this.cdt);
      }else if(this.page==1){
        this.mgetList(val,this.mpageSize,this.mcdt);
      }
      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/addressManage/queryListPage', p,
        r => {
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    mgetList(currentPage, showCount, pd){
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/fileAssistant/queryListPage', p,
        r => {
          this.mtableData = r.data.resultList;
          this.mTotalResult = r.data.totalResult;
        })
    },
    uploadHandleClose(){
      this.uploadCancelUpload();
    },
    uploadCancelUpload(){
      this.folderDialogVisible=false;
    },
    handleClose(){//关闭文件上传模态框
      this.cancelUpload();
    },
    cancelUpload(){
      this.$refs.upload.clearFiles();
      this.uploadDialogVisible=false;
    },
    uploadFile(event){//获取上传的文件
      this.fileData=event.target.files;
    },
    folderZhuan(item){
      if(item!=''){
        for(var i =0;i<this.folderName.length;i++){
          if(item == this.folderName[i].SERIAL){
            return this.folderName[i].FOLDER
          }
        }
      }else{
        return ''
      }
    },
    upload(){//上传文件
      console.log(this.fileData);
      if(this.fileData == null){
        this.$message({
          message: '您还未选择文件',
          type: 'warning'
        });
        return
      }
      var formData = new FormData();
      let arr=this.fileData;
      for(var i=0;i<arr.length;i++){
        formData.append("file",arr[i]);
      }
      formData.append("folder",this.folderZhuan(this.folder));
      let p=formData;
      this.$api.post('/manage-platform/fileAssistant/uploadFile',p,
       r =>{
         if(r.success){
           this.$message({
             message: '恭喜你，上传成功！',
             type: 'success'
           });
           this.folderDialogVisible=false;
           this.mgetList(this.mCurrentPage,this.mpageSize,this.mcdt);
           this.fileData=null;
         }else {
           this.fileData=null;
           return
         }
       },e => {
       },{'Content-Type': 'multipart/form-data'})
    },
    batchI(){//批量导入
      if( this.$refs.upload){
        this.$refs.upload.clearFiles();
      }
      this.uploadDialogVisible = true;
    },
    download(){
      window.location.href=this.$api.rootUrl+'/manage-platform/templateFile/address_temple.xlsx'
    },
    uploadSuccess(response, file, fileList){
      console.log(response);
      if(response.success){
        this.uploadDialogVisible=false;
        this.rows = response.data.cdtList;
        this.$refs.upload.clearFiles();
        this.$message({
          duration:3000,
          message: '恭喜你，导入成功！',
          type: 'success'
        });
        this.getList(this.CurrentPage, this.pageSize, this.cdt)
      }else{
        this.$message({
          duration:3000,
          message: response.message,
          type: 'warning'
        });
      }
    },
    handleExceed(files, fileList){
      if(files.length!=0){
        this.$message({
          message: '只能上传一个文件！',
          type: 'warning'
        });
      }
    },
    beforeUpload(file){
      console.log(file);
    },
    submitUpload() {
      console.log(this.$refs.upload);
      if(this.$refs.upload.uploadFiles.length==0){
         this.$message({
          message: '请先选择文件！',
          type: 'warning'
        });
         return
       }
      this.$refs.upload.submit();
     // this.uploadDialogVisible=false;
    },
    addFolder(){//新增文件夹名
      this.folderdialogVisible = true;
    },
    folderMethod(){//文件夹列表
      this.$api.post('/manage-platform/fileAssistant/queryFolder',{},
        r => {
          if(r.success){
            this.folderName = r.data;
          }
        })
    },
    planSave(){//保存文件夹名称
      if(this.fff==''){
        this.$alert('文件夹名称不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let p={
        "folder":this.fff
      }
      this.$api.post('/manage-platform/fileAssistant/saveFolder',p,
        r => {
          if(r.success){
            this.folderdialogVisible = false;
          }
        })
    },
    deleteItem(i){//删除文件夹名称
      this.$confirm('文件夹名删除后将无法恢复, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let di = this.saveName.indexOf(i);
        // this.saveName.splice(di,1);
        let dei = {
          SERIAL:i,
        };
        this.$api.post('/manage-platform/fileAssistant/delete',dei,
         r =>{
           if(r.success){
             if(this.folder==i){
               this.folder='';
               this.folderMethod();
             }else{
               this.folderMethod();
             }
             this.$message({
               type: 'success',
               message: '操作成功!'
             });
           }
         })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    terminal(){//航站
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    nameMethod(){//姓名
      this.$api.post('/manage-platform/watch/queryUserAll',{},
        r => {
            if(r.success){
              this.dutyName = r.data;
            }
        })
    },
    nameMethodReal(val){//新增添值&编辑修改
      this.$set(this.form,'PHONE','');
      this.$set(this.form,'DEPT_QC','');
      this.$set(this.form,'USERNAME','');
      this.$set(this.form,'SEX','');
      let arr = this.dutyName;
      for(var i=0;i<arr.length;i++){
        if(arr[i].NAME == val){
          this.form.PHONE = arr[i].PHONE;//电话
          this.form.USERNAME = arr[i].USERNAME;//账号
          this.form.SEXNAME = arr[i].SEXNAME;
          this.form.SEX = arr[i].SEX;
          this.form.DEPT_QC = arr[i].DEPT_QC;
          this.form.DEPT_ID = arr[i].DEPT_ID;//部门id
          this.form.USERSERIAL = arr[i].SERIAL;//姓名
        }
      }
    },
    adds(n, i) {
      this.addDialogVisible = true;

      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        this.form=Object.assign({}, i);
        this.dialogText="编辑";
      }else {
        this.tp = 0;
        this.dialogText="新增";
      }

    },


    hangzhan(item){
      for(var i=0;i<this.takeOffName.length;i++){
        if(item == this.takeOffName[i].AIRPORT_CODE){
          return this.takeOffName[i].AIRPORT_NAME
        }
      }
    },
    addItem(formName) {
      if (this.$validator.listener.demo2) {
        const result = this.$validator.verifyAll('demo2')
        if (result.indexOf(false) > -1) {
          return;
        }
      }
      var url = "/manage-platform/addressManage/save";
      this.form.AIRPORT_NAME = this.hangzhan(this.form.AIRPORT_CODE);
      this.$api.post(url, this.form,
        r => {
          if (r.success) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
            this.addDialogVisible = false;
            this.getList(this.CurrentPage, this.pageSize, this.cdt);
          }
          this.$refs[formName].resetFields();
        }, e => {
          this.$message.error('失败了');
        })
    },

    deletes(i) {
      let p = {
        "SERIAL": i.SERIAL
      };
      this.$confirm('您是否确认删除本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(this.page==1){
          this.$api.post('/manage-platform/fileAssistant/delete', p,
            r => {
              if (r.success) {
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                });
                this.mgetList(this.mCurrentPage,this.mpageSize,this.mcdt);
              } else {
                this.$message.error(r.Message);
              }
            }, e => {
              this.$message.error('失败了');
            });
        }else if(this.page==0){
          this.$api.post('/manage-platform/addressManage/delete', p,
            r => {
              if (r.success) {
                this.$message({
                  message: '删除成功！',
                  type: 'success'
                });

                this.getList(this.CurrentPage,this.pageSize, this.cdt);
              } else {
                this.$message.error(r.Message);
              }
            }, e => {
              this.$message.error('失败了');
            });
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },


  },
    filters: {
        filterdate(n)
        {
          if(n=="" || n==null){
            return n;
          }else {
              return n.substring(0,n.length-3);
          }

        },
        fiftersex(val) {
          if (val == "0") {
            return "女"
          } else if (val == "1") {
            return "男"
          }
        },
        fiftecr(val) {
          if (val == "0Z") {
            return "允许打印登机牌";
          } else if (val == "1Z") {
            return "禁止打印登机牌";
          } else if (val == "2Z") {
            return "请再次核对";
          } else {
            return "数据错误";
          }
        },
        fifterbj(val) {
          if (val == "1") {
            return "产生报警";
          } else {
            return "未产生报警";
          }
        },

    }
}
</script>

<style scoped>
.add-dialog {
  /* padding-left:40px; */
}
.detail-msg-row {
  color: #999;
  line-height: 32px;
}
.detail-msg-row span {
  color: #333;
  display: inline-block;
  width: 60px;
}
.yy-input-text {
  width: 20% !important;
}

.yy-input-input {
  width: 70% !important;

}
.checked{
  background:#56A8FE; color:#ffffff;
}
.margin-bt{
  margin: 5px 0px !important;
}
.plan .el-input{
  width:75%!important;

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
.www{
  width: 48px;
}
.wwt{
  width: 38px;
}
</style>
<style media="screen">
/* .plan .el-input .el-input__inner{
  height: 32px!important;
} */
</style>
