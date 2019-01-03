<template lang="html">
  <div class="zlbg">
    <div class="mb-2">
      <div class="middle">
        <span class="tubiao hand borderL" :class="{'checked':page==0}" @click="page=0;startOut(CurrentPage,pageSize);">发件箱</span><span class="tubiao hand borderR" :class="{'checked':page==1}" @click="qq">收件箱</span>
        <el-button type="warning" size="mini" @click="sendMesssage">发送消息</el-button>
      </div>
      <el-row type="flex" class="middle" style="padding-top:0px!important">
        <el-col :span="22" class="br pr-20">
          <!-- <div class="title-green">
            查询条件
          </div> -->
          <el-row align="center" :gutter="2" type="flex" justify="center" v-show="page==0">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">口岸/部门：</span>
              <el-select v-model="outBu" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="queryNationality(0)" @change="nameId(outBu,0)">
                <el-option
                  v-for="item in company"
                  :key="item.SERIAL"
                  :label="item.DEPT_CODE+' - '+item.DEPT_JC"
                  :value="item.SERIAL">
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">收件人姓名：</span>
              <el-select v-model="pd.userId" filterable clearable placeholder="请选择" size="small" class="input-input" :disabled="able">
                <el-option
                  v-for="item in nameCllo"
                  :key="item.SERIAL"
                  :label="item.NAME"
                  :value="item.SERIAL">
                </el-option>
               </el-select>
            </el-col>
          </el-row>
          <el-row align="center" :gutter="2" type="flex" justify="center" v-show="page==1">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">口岸/部门：</span>
              <el-select v-model="inBu" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="queryNationality(2)" @change="nameId(inBu,2)">
                <el-option
                  v-for="item in inCompany"
                  :key="item.SERIAL"
                  :label="item.DEPT_JC"
                  :value="item.SERIAL">
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">发件人姓名：</span>
              <el-select v-model="pd1.userId" filterable clearable placeholder="请选择" size="small" class="input-input" :disabled="outAble">
                <el-option
                  v-for="item in outNameCllo"
                  :key="item.SERIAL"
                  :label="item.NAME"
                  :value="item.SERIAL">
                </el-option>
               </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="search">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">

      <div class="tableWrap" v-show="page==0">
        <el-table
          :data="outTableData"
          border
          style="width: 100%;"
          >
          <el-table-column
            prop="receiveStrList"
            label="收件人">
            <template slot-scope="scope">
              {{scope.row.receiveStrList|sendRange}}
            </template>
          </el-table-column>
          <el-table-column
            prop="DETAILS"
            label="消息内容">
          </el-table-column>
          <el-table-column
            prop="SENDTIMESTR"
            label="发送时间">
          </el-table-column>
          <el-table-column
            label="操作" width="70">
            <template slot-scope="scope">
              <el-button type="text"  class="a-btn"  title="详情" icon="el-icon-tickets" @click="outDetails(scope.row)"></el-button>
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
      <div class="tableWrap" v-show="page==1">

        <el-table
          :data="inTableData"
          border
          style="width: 100%;"
          >
          <el-table-column
            prop="informationSend.SENDERNAME"
            label="发送人">
          </el-table-column>
          <el-table-column
            prop="informationSend.DETAILS"
            label="发送内容">
          </el-table-column>
          <el-table-column
            prop="informationSend.SENDTIMESTR"
            label="发送时间">
          </el-table-column>
          <el-table-column
            label="读取状态">
            <template slot-scope="scope">
              {{scope.row.READSTATUS | fiftertype}}
            </template>
          </el-table-column>

          <el-table-column
            label="操作" width="80">
            <template slot-scope="scope">
                <el-button type="text"  class="a-btn"  title="回复" icon="el-icon-edit" @click="inReply(scope.row)"></el-button>
                <el-button type="text"  class="a-btn"  title="详情" icon="el-icon-tickets" @click="inDetails(scope.row)"></el-button>
           </template>
          </el-table-column>
        </el-table>
        <div class="middle-foot">
          <div class="page-msg">
            <div class="">
              共{{Math.ceil(inTotalResult/inPageSize)}}页
            </div>
            <div class="">
              每页
              <el-select v-model="inPageSize" @change="pageSizeChange(inPageSize)" placeholder="10" size="mini" class="page-select">
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
              共{{inTotalResult}}条
            </div>
          </div>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :page-size="inPageSize"
            layout="prev, pager, next"
            :total="inTotalResult">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="发送消息"  :visible.sync="sendDialogVisible" width="400px;">
      <el-form :model="sform" ref="addForm">
        <el-row type="flex"  class="mb-6" style="margin-left:85px">
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">口岸/部门：</span>
            <el-select  placeholder="请选择"  size="mini"  class="input-input" v-model="sendBu" filterable clearable @visible-change="queryNationality(1)" @change="nameId(sendBu,1)">
              <el-option
              v-for="item in sendCompany"
              :key="item.SERIAL"
              :value="item.SERIAL"
              :label="item.DEPT_CODE+' - '+item.DEPT_JC">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">接收人：</span>
            <el-select v-model="sform.RECEIVEID" filterable clearable  multiple placeholder="请选择" size="small" class="input-input"  :disabled="sendAble">
              <el-option
                v-for="item in sendNameCllo"
                :key="item.SERIAL"
                :label="item.NAME"
                :value="item.SERIAL">
              </el-option>
             </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" style="margin-left:85px">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width: 10.3%!important;">附件：</span>
            <label class="file">
              上传附件
              <input type="file" name=""  @change="uploadFile" multiple>
            </label>
            <div class="fileColl" v-if="fileData">
              <div class="" v-for="(x,ind) in fileData" :key="ind">
                <span class="mr-30">{{x.name}}</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text width-ts">发送内容：</span>
            <el-input type="textarea" v-model="sform.DETAILS"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendMesssageReal" size="small">发送</el-button>
        <el-button @click="sform={RECEIVEID:[]};fileData=null;sendBu=''" size="small" type="warning">清空</el-button>
      </div>
    </el-dialog>
    <el-dialog title="消息回复"  :visible.sync="addDialogVisible" width="400px;">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6" style="margin-left:85px">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">接收人：</span>
            <span class="review-span">{{form.RECEIVENAME}}</span>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">发送人：</span>
            <span class="review-span">{{form.informationSend.SENDERNAME}}</span>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">发送时间：</span>
            <span class="review-span">{{form.informationSend.SENDTIME}}</span>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6" style="margin-left:85px">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width: 8.3%!important;">附件：</span>
            <label class="file">
              上传附件
              <input type="file" name=""  @change="reviewUpload" multiple>
            </label>
            <div class="fileColl" v-if="reviewFile">
              <div class="" v-for="(x,ind) in reviewFile" :key="ind">
                <span class="mr-30">{{x.name}}</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:20.3%!important">回复内容：</span>
            <el-input type="textarea" v-model="replyContent" maxlength="300" :autosize="{ minRows: 3, maxRows: 6}" placeholder="请输入描述(不能超过300字)"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="inReplySend" size="small">发送</el-button>
        <el-button @click="" size="small" type="warning" @click="replyContent=''">清空</el-button>
      </div>
    </el-dialog>
    <el-dialog title="收件详情"  :visible.sync="inDetailsDialogVisible" width="400px;">
      <el-form :model="dform" ref="detailsForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">发送人：</span>
            <span class="yy-input-input detailinput">{{dform.informationSend.SENDERNAME}}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">发送时间：</span>
            <span class="yy-input-input detailinput"> {{dform.informationSend.SENDTIMESTR}}</span>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">回复时间：</span>
            <span class="yy-input-input detailinput">  {{dform.REPLYTIMESTR}}</span>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="tt-input">发送内容：</span>
            <span class="yy-input-input detailInp">  {{dform.informationSend.DETAILS}}</span>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="tt-input">回复内容：</span>
            <span class="yy-input-input detailInp">  {{dform.REPLYMESSAGE}}</span>
          </el-col>
        </el-row>
        <el-row class="mb-6">
          <el-col :span="24" class="infile">
            <div v-for="(d4,ind) in inFiles" :key="ind" class="infiledd">
              <span class="mr-30 avgerName">{{d4.FILENAME}}</span>
              <span class="mr-30 tc-999 avgera">上传时间：{{d4.CREATETIME}}</span>
              <!-- <el-button type="text" class="redx" @click="delFileInfo(d4.SERIAL)">删除</el-button> -->
              <el-button type="text" class="avgera"><a :href="d4.FILEURL" class="green" download="">下载</a></el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small" type="warning">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="发件详情"  :visible.sync="outDetailsDialogVisible" width="400px;">
      <el-table
        :data="outTableDataDetail"
        border
        style="width: 100%;">
        <el-table-column
          prop="RECEIVENAME"
          label="收件人姓名">
        </el-table-column>
        <el-table-column
          prop="REPLYMESSAGE"
          label="回复内容">
        </el-table-column>
        <el-table-column
          prop="REPLYTIMESTR"
          label="回复时间">
        </el-table-column>
        <el-table-column
          label="读取状态">
          <template slot-scope="scope">
            {{scope.row.READSTATUS | fiftertype}}
          </template>
        </el-table-column>
      </el-table>
      <el-row class="mb-6">
        <div class="infiledd" v-for="(d4,ind) in files" :key="ind">
          <span class="mr-30 avgerName">{{d4.FILENAME}}</span>
          <span class="mr-30 tc-999 avgera">上传时间：{{d4.CREATETIME}}</span>
          <!-- <el-button type="text" class="redx" @click="delFileInfo(d4.SERIAL)">删除</el-button> -->
          <el-button type="text" class="avgera"><a :href="d4.FILEURL" class="green" download="">下载</a></el-button>
        </div>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outDetailsDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,

      inCurrentPage: 1,
      inPageSize: 10,
      inTotalResult: 0,


      PageSize:10000,
      outTableData:[],
      inTableData:[],
      outTableDataDetail:[],
      outBu:'',
      inBu:'',
      sendBu:'',
      inCompany:[],

      pd: {},
      pd1:{},
      able:true,
      outAble:true,
      sendAble:true,
      nation: [],
      company: [],
      sendCompany:[],
      page:0,
      replyContent:'',//回复内容
      serialImp:'',
      nameCllo:[],
      sendNameCllo:[],
      outNameCllo:[],
      sform:{},
      fileData:{},
      reviewFile:{},
      fitAdress:'',
      sendAdress:'',
      files:[],
      inFiles:[],

      value: '',
      value1: "",
      dialogText: "新增",
      addDialogVisible: false,
      inDetailsDialogVisible: false,//收件详情
      outDetailsDialogVisible: false,//发件详情
      sendDialogVisible:false,
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
      form: {
        informationSend:{}
      },
      dform: {
        informationSend:{}
      },
    }
  },
  mounted() {
    this.startOut(this.CurrentPage, this.pageSize);
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
  },
  activated() {
    this.startOut(this.CurrentPage, this.pageSize);
  },
  methods: {
    qq(){
      this.page=1;
      this.startIn(this.inCurrentPage, this.inPageSize);
    },
     sendMesssage(){//发送消息
       this.sendBu="";
       this.sform={RECEIVEID:[]};
       this.fileData=null;
       this.sendDialogVisible = true;
     },
     search(){
       if(this.page==0){
         this.getList(this.CurrentPage, this.pageSize, this.pd);
       }else if(this.page==1){
         this.inGetList(this.inCurrentPage, this.inPageSize, this.pd1);
       }
     },
     sendMesssageReal(){
       console.log(this.sform.RECEIVEID.length)
       if(this.sform.RECEIVEID.length==0){
         this.$message({
          message: '接收人为必填项',
          type: 'error',
          duration:6000
        });
        return
       }
       if((this.sform.DETAILS == ''||this.sform.DETAILS == undefined)&&this.fileData == null){
         this.$message({
          message: '请上传附件或者填写发送内容',
          type: 'error',
          duration:6000
        });
        return
       }
       let arr = [];
       for(var i=0;i<this.sform.RECEIVEID.length;i++){
         let obj={};
         for(var j=0;j<this.sendNameCllo.length;j++){
           if(this.sform.RECEIVEID[i] == this.sendNameCllo[j].SERIAL){
             obj.RECEIVEID = this.sendNameCllo[j].SERIAL
             obj.RECEIVECODE = this.sendNameCllo[j].USERNAME
             obj.RECEIVENAME = this.sendNameCllo[j].NAME
           }
         }
         arr.push(obj);
         console.log(arr);
       }
       this.sform.receiveList = arr;
       this.$api.post('/manage-platform/information/saveInformationSend',this.sform,
         r =>{
           if(r.success){
             if(this.fileData){
               this.upload(r.data.serial,this.fileData);
             }else{
               this.$message({
                 message: '恭喜你，发送成功',
                 type: 'success'
               });
             }
             this.startOut(this.CurrentPage, this.pageSize);
             this.sendDialogVisible = false;
           }
         })
     },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      if(this.page==0){
        this.getList(this.CurrentPage, val, this.pd);
      }else if(this.page==1){
        this.inGetList(this.inCurrentPage, val, this.pd1);
      }
    },
    reviewUpload(event){
      this.reviewFile=event.target.files;
    },
    uploadFile(event){//获取上传的文件
      this.fileData=event.target.files;
    },
    upload(val,arr){//上传文件
      var formData = new FormData();
      // let arr=this.fileData;
      for(var i=0;i<arr.length;i++){
        formData.append("fileList",arr[i]);
      }
      formData.append("serial",val);
      if(this.page==0){
        formData.append('type',0)
      }else if(this.page==1){
        formData.append('type',1)
      }

      let p=formData;
      this.$api.post('/manage-platform/information/uploadFile',p,
       r =>{
         if(r.success){
           this.$message({
             message: '恭喜你，保存成功！',
             type: 'success'
           });
           this.fileData=null;
         }else {
           this.fileData=null;
           return
         }
       },e => {
       },{'Content-Type': 'multipart/form-data'})
    },
    handleCurrentChange(val) {
      if(this.page==0){
        this.getList(val, this.pageSize, this.pd);
      }else if(this.page==1){
        this.inGetList(val, this.inPageSize, this.pd1);
      }
      console.log(`当前页: ${val}`);
    },
    startOut(currentPage, showCount){
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
      }
      this.$api.post('/manage-platform/information/queryInformationSendList',p,
       r =>{
         this.outTableData = r.data.resultList;
         this.TotalResult = r.data.totalResult;
       })
    },
    startIn(currentPage, showCount){
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
      }
      this.$api.post('/manage-platform/information/queryInformationReceiveList',p,
       r =>{
         this.inTableData = r.data.resultList;
         this.inTotalResult = r.data.totalResult;
       })
    },
    getList(currentPage, showCount, pd) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post('/manage-platform/information/queryInformationSendListByReceiveId',p,
        r => {
          this.outTableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    inGetList(currentPage, showCount, pd){
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post('/manage-platform/information/queryInformationReceiveListBySendId',p,
       r => {
         this.inTableData = r.data.resultList;
         this.inTotalResult = r.data.totalResult;
       })
    },
    outDetails(row){
      this.outDetailsDialogVisible = true;
      let p={
        'serial':row.SERIAL
      }
      this.$api.post('/manage-platform/information/queryInformationSend',p,
        r =>{
          this.outTableDataDetail = r.data.receiveList;
          this.files = r.data.files;
        })
    },
    inDetails(row){
      this.inDetailsDialogVisible = true;
      let p={
        'serial':row.SERIAL
      }
      this.$api.post('/manage-platform/information/queryInformationReceive',p,
        r =>{
          this.dform = r.data;
          this.inFiles = r.data.files;
        })
    },
    inReply(row){//点击回复
      this.replyContent='';
      this.reviewFile=null;
      this.addDialogVisible = true;
      this.serialImp = row.SERIAL;
      let p={
        'serial':row.SERIAL
      }
      this.$api.post('/manage-platform/information/queryInformationReceive',p,
        r =>{
          this.form = r.data;
        })
    },
    inReplySend(){//点击回复发送
      let p={
        'SERIAL':this.serialImp,
        'REPLYMESSAGE':this.replyContent
      }
      this.$api.post('/manage-platform/information/saveInformationReceive',p,
        r =>{
          if(r.success){
            if(this.reviewFile.length){
              this.upload(r.data.serial,this.reviewFile);
            }else{
              this.$message({
                message: '恭喜你，回复成功',
                type: 'success'
              });
            }
          }
          this.addDialogVisible = false;
        })
    },
    queryNationality(type) {//口岸
      this.$api.post('/manage-platform/userSys/deptListSmall', {},
        r => {
          console.log(r);
          if (r.success) {
            if(type==0){
              this.company = r.data.deptList;
            }else if(type==1){
              this.sendCompany = r.data.deptList;
            }else if(type==2){
              this.inCompany = r.data.deptList;
            }
            console.log(this.company);
          }
        })
    },
    nameId(val,type){
      console.log(val)
      var obj={};
      obj.DEPT_ID = val;
      let p={
        'showCount':this.PageSize,
        'pd':obj
      }
      this.$api.post('/manage-platform/userSys/selectAll', p,
        r => {
          console.log(r);
          if(type==0){
            this.$set(this.pd,'userId','');
            if(val==''){
              this.able=true
            }else{
              this.able=false;
              this.nameCllo = r.data.userList.pdList;
            }

          }else if(type==1){
            this.$set(this.sform,'RECEIVEID',[]);
            if(val==''){
              this.sendAble=true;
            }else{
              this.sendAble=false;
              this.sendNameCllo = r.data.userList.pdList;
            }
            console.log(this.sendNameCllo);
          }else if(type==2){
            this.$set(this.pd1,'userId','');
            if(val==''){
              this.outAble=true;
            }else{
              this.outAble=false;
              this.outNameCllo = r.data.userList.pdList;
            }
          }
        })
    },

    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.dform = i;
    },
  },
  filters: {
    fiftertype(val) {
      if (val == 0) {
        return "未读";
      } else if(val == 1) {
        return "已读";
      }else if(val==2){
        return "已回"
      }
    },
    sendRange(val){
      if(val){
        var str = val.join(' ');
        return str
      }
    },
  }
}

function checkRate(nubmer) {　　
  var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
  　　　　
  if (!re.test(nubmer)) {　　　　
    return false;　　
  }
  return true;
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
  width: 25% !important;
}
.width-ts{
  width: 23%!important;
}
.checked{
  background:#56A8FE;
  color:#ffffff;
}
.tableWrap{
  margin-top: 10px;
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
.fileColl{
  padding-left: 20px;
}
.fileColl div{
  padding: 2px;
  box-sizing: border-box;
}
.infile{
  padding-left: 5%;
}
.infiledd{
  padding: 3px 0px;
}
.avgera{
  width: 20%;
  display: inline-block;
}
.avgerName{
  width: 30%;
  display: inline-block;
}
</style>
