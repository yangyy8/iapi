<template lang="html">
  <div class="zlbg">
    <div class="mb-2">
      <div class="middle">
        <span class="tubiao hand borderL ww" :class="{'checked':page==0}" @click="page=0;startOut(CurrentPage,pageSize);">发件箱</span><span class="tubiao hand borderR ww" :class="{'checked':page==1}" @click="qq">收件箱</span>
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
                  :label="item.DEPT_CODE+' - '+item.DEPT_JC"
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
    <div class="middle" @mouseover="mouseHeader">

      <div class="tableWrap" v-show="page==0">
        <el-table
          :data="outTableData"
          border
          style="width: 100%;"
          class="o-table3"
          @header-click="headerClick"
          @sort-change="sortChange">
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
            label="发送时间"
            sortable>
          </el-table-column>
          <el-table-column
            label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="text"  class="a-btn"  title="详情" icon="el-icon-tickets" name="nbxxsf_detail" @click="outDetails(scope.row)"></el-button>
              <el-button type="text"  class="a-btn"  title="转发" icon="el-icon-share" name="nbxxsf_dispatch" @click="share(scope.row)"></el-button>
              <el-button type="text"  class="a-btn"  title="删除" icon="el-icon-delete" name="nbxxsf_del" @click="deleteOut(scope.row)"></el-button>
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
          class="o-table3"
          @header-click="headerClick"
          @sort-change="sortChange">
          <el-table-column
            prop="informationSend.SENDERNAMECHN"
            label="发送人">
          </el-table-column>
          <el-table-column
            prop="informationSend.DETAILS"
            label="发送内容">
          </el-table-column>
          <el-table-column
            prop="informationSend.SENDTIMESTR"
            label="发送时间"
            sortable>
          </el-table-column>
          <el-table-column
            prop="READSTATUS"
            label="读取状态">
            <template slot-scope="scope">
              {{scope.row.READSTATUS | fiftertype}}
            </template>
          </el-table-column>

          <el-table-column
            label="操作" width="100">
            <template slot-scope="scope">
                <el-button type="text"  class="a-btn"  title="回复" icon="el-icon-edit" @click="inReply(scope.row)"></el-button>
                <el-button type="text"  class="a-btn"  title="详情" icon="el-icon-tickets" @click="inDetails(scope.row)"></el-button>
                <el-button type="text"  class="a-btn"  title="删除" icon="el-icon-delete" @click="deleteIn(scope.row)"></el-button>
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
        <el-button type="primary" @click="sendMesssageReal(0)" size="small">发送</el-button>
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
            <span class="review-span">{{form.informationSend.SENDERNAMECHN}}</span>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">发送时间：</span>
            <span class="review-span">{{form.informationSend.SENDTIMESTR}}</span>
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
            <span class="yy-input-input detailinput">{{dform.informationSend.SENDERNAMECHN}}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">发送时间：</span>
            <span class="yy-input-input detailinput"> {{dform.informationSend.SENDTIMESTR}}</span>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="tt-input">发送内容：</span>
            <span class="yy-input-input detailInp">  {{dform.informationSend.DETAILS}}</span>
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
            <span class="tt-input">回复内容：</span>
            <span class="yy-input-input detailInp">  {{dform.REPLYMESSAGE}}</span>
          </el-col>
        </el-row>
        <el-row class="mb-6">
          <el-col :span="24" class="infile">
            <div v-for="(d4,ind) in inFiles" :key="ind" class="infiledd">
              <span class="mr-30 avgerName">{{d4.FILENAME}}</span>
              <span class="mr-30 tc-999 avgera">上传时间：{{d4.CREATETIMESTR}}</span>
              <!-- <el-button type="text" class="redx" @click="delFileInfo(d4.SERIAL)">删除</el-button> -->
              <el-button type="text" class="avgera"><a :href="d4.FILEURL" class="green" download="">下载</a></el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="inDetailsDialogVisible = false" size="small" type="warning">取消</el-button>
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
        <el-table-column
          width="280"
          label="回复附件">
          <template slot-scope="scope">
            <el-row class="mb-6">
              <div class="infiledd" v-for="(d4,ind) in scope.row.files" :key="ind">
                <span class="avgerTsName">{{d4.FILENAME}}</span>
                <el-button type="text" class="avgera"><a :href="d4.FILEURL" class="green" download="">下载</a></el-button>
              </div>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="mb-6">
        <div class="infiledd" v-for="(d4,ind) in files" :key="ind">
          <span class="mr-30 avgerName">{{d4.FILENAME}}</span>
          <span class="mr-30 tc-999 avgera">上传时间：{{d4.CREATETIMESTR}}</span>
          <!-- <el-button type="text" class="redx" @click="delFileInfo(d4.SERIAL)">删除</el-button> -->
          <el-button type="text" class="avgera"><a :href="d4.FILEURL" class="green" download="">下载</a></el-button>
        </div>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="outDetailsDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="转发消息"  :visible.sync="shareDialogVisible" width="400px;">
      <el-form :model="shareform" ref="addForm">
        <el-row type="flex"  class="mb-6" style="margin-left:85px">
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">口岸/部门：</span>
            <el-select  placeholder="请选择"  size="mini"  class="input-input" v-model="shareBu" filterable clearable @visible-change="queryNationality(3)" @change="nameId(shareBu,3)">
              <el-option
              v-for="item in shareCompany"
              :key="item.SERIAL"
              :value="item.SERIAL"
              :label="item.DEPT_CODE+' - '+item.DEPT_JC">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="10" class="input-item">
            <span class="yy-input-text">接收人：</span>
            <el-select v-model="shareform.RECEIVEID" filterable clearable  multiple placeholder="请选择" size="small" class="input-input"  :disabled="shareAble">
              <el-option
                v-for="item in shareNameCllo"
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
              <input type="file" name=""  @change="shareUpload" multiple>
            </label>
            <div class="fileColl" v-if="shareFileOld">
              <div class="" v-for="(x,ind) in shareFileOld" :key="ind">
                <span class="mr-30">{{x.FILENAME}}</span>
              </div>
            </div>
            <div class="fileColl" v-if="shareFile">
              <div class="" v-for="(x,ind) in shareFile" :key="ind">
                <span class="mr-30">{{x.name}}</span>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text width-ts">发送内容：</span>
            <el-input type="textarea" v-model="shareform.DETAILS"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendMesssageReal(1)" size="small">发送</el-button>
        <el-button @click="shareform={RECEIVEID:[]};shareFile=null;shareBu='';shareFileOld=[]" size="small" type="warning">清空</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order:'',
      direction:0,
      inOrder:'',
      inDirection:0,
      shareDialogVisible:false,
      shareform:{
        DETAILS:''
      },
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
      shareBu:'',
      inCompany:[],

      pd: {},
      pd1:{},
      able:true,
      outAble:true,
      sendAble:true,
      shareAble:true,
      nation: [],
      company: [],
      sendCompany:[],
      shareCompany:[],
      page:0,
      replyContent:'',//回复内容
      serialImp:'',
      nameCllo:[],
      sendNameCllo:[],
      outNameCllo:[],
      shareNameCllo:[],
      sform:{},
      fileData:{},
      reviewFile:{},
      shareFile:null,
      shareFileOld:[],
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
      beforeFiles:[],
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
    // this.startOut(this.CurrentPage, this.pageSize);
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
  },
  activated() {
    this.btnctlFn(this.$root.checkItem);
    // this.startOut(this.CurrentPage, this.pageSize);
  },
  methods: {
    sortChange(column, prop, order){
      if(this.page==0){
        column.order=='ascending'?this.direction=1:this.direction=0;
        this.order=column.prop;
        this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
      }else if(this.page==1){
        column.order=='ascending'?this.inDirection=1:this.inDirection=0;
        this.inOrder=column.prop;
        this.inGetList(this.inCurrentPage, this.inPageSize, this.pd1,this.inOrder,this.inDirection);
      }
    },
    share(val){
      this.shareform={RECEIVEID:[]};
      this.shareBu='';
      this.shareDialogVisible = true;
      this.shareform.DETAILS = val.DETAILS;
      this.shareFileOld = val.files;
      this.beforeFiles=[];
      if(this.shareFileOld.length!=0){
        for(var i=0;i<this.shareFileOld.length;i++){
          this.beforeFiles.push(this.shareFileOld[i].SERIAL);
        }
      }

    },
    deleteIn(val){
      this.$confirm('您是否确认删除本条数据？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/information/deleteReceiveInforBySerial',{'serial':val.SERIAL},
        r =>{
          if(r.success){
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.inGetList(this.inCurrentPage, this.inPageSize, this.pd1,this.inOrder,this.inDirection);
          }else {
            this.$message.error(r.Message);
          }
        },e => {
          this.$message.error('失败了');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    deleteOut(val){
      this.$confirm('您是否确认删除本条数据？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/information/deleteSendInforBySerial',{'serial':val.SERIAL},
        r =>{
          if(r.success){
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.getList(this.CurrentPage, this.pageSize, this.pd,this.order,this.direction);
          }else {
            this.$message.error(r.Message);
          }
        },e => {
          this.$message.error('失败了');
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    qq(){
      this.page=1;
      // this.startIn(this.inCurrentPage, this.inPageSize);
    },
     sendMesssage(){//发送消息
       this.sendBu="";
       this.sform={RECEIVEID:[]};
       this.fileData=null;
       this.sendDialogVisible = true;
     },
     search(){
       if(this.page==0){
         this.getList(this.CurrentPage, this.pageSize, this.pd,this.order,this.direction);
       }else if(this.page==1){
         this.inGetList(this.inCurrentPage, this.inPageSize, this.pd1,this.inOrder,this.inDirection);
       }
     },
     sendMesssageReal(type){

       if(type==0){
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
               console.log('发送消息',this.fileData)
               if(this.fileData){
                 this.upload(r.data.serial,this.fileData,0);//消息发送
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
       }else if(type==1){
         if(this.shareform.RECEIVEID.length==0){
           this.$message({
            message: '接收人为必填项',
            type: 'error',
            duration:6000
          });
          return
         }
         if((this.shareform.DETAILS == ''||this.shareform.DETAILS == undefined)&&this.shareFile == null){
           this.$message({
            message: '请上传附件或者填写发送内容',
            type: 'error',
            duration:6000
          });
          return
         }
         let arr = [];
         for(var i=0;i<this.shareform.RECEIVEID.length;i++){
           let obj={};
           for(var j=0;j<this.shareNameCllo.length;j++){
             if(this.shareform.RECEIVEID[i] == this.shareNameCllo[j].SERIAL){
               obj.RECEIVEID = this.shareNameCllo[j].SERIAL
               obj.RECEIVECODE = this.shareNameCllo[j].USERNAME
               obj.RECEIVENAME = this.shareNameCllo[j].NAME
             }
           }
           arr.push(obj);
           console.log(arr);
         }
         this.shareform.receiveList = arr;
         this.shareform.beforeFiles = this.beforeFiles
         console.log(this.shareform)
         this.$api.post('/manage-platform/information/saveInformationSend',this.shareform,
           r =>{
             if(r.success){
               console.log('转发发送',this.shareFile);
               if(this.shareFile){
                 this.upload(r.data.serial,this.shareFile,1);//转发消息
               }else{
                 this.$message({
                   message: '恭喜你，发送成功',
                   type: 'success'
                 });
               }
               this.startOut(this.CurrentPage, this.pageSize);
               this.shareDialogVisible = false;
             }
           })
       }

     },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      if(this.page==0){
        this.pageSize = val;
        this.getList(this.CurrentPage, val, this.pd,this.order,this.direction);
      }else if(this.page==1){
        this.inPageSize = val;
        this.inGetList(this.inCurrentPage, val, this.pd1,this.inOrder,this.inDirection);
      }
    },
    handleCurrentChange(val) {
      if(this.page==0){
        this.CurrentPage = val;
        this.getList(val, this.pageSize, this.pd,this.order,this.direction);
      }else if(this.page==1){
        this.inCurrentPage = val;
        this.inGetList(val, this.inPageSize, this.pd1,this.inOrder,this.inDirection);
      }
      console.log(`当前页: ${val}`);
    },
    reviewUpload(event){//消息回复的附件
      this.reviewFile=event.target.files;
    },
    uploadFile(event){//发件详情的附件
      this.fileData=event.target.files;
      console.log(this.fileData)
    },
    shareUpload(event){//发件详情的附件
      this.shareFile=event.target.files;
      console.log(this.shareFile)
    },
    upload(val,arr,t){//上传文件
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
      console.log('formData',formData)
      this.$api.post('/manage-platform/information/uploadFile',p,
       r =>{
         if(r.success){
           this.$message({
             message: '恭喜你，保存成功！',
             type: 'success'
           });
           if(t==0){
             this.fileData=null;
           }else if(t==1){
             this.shareFile=null
           }else if(t==2){
             this.reviewFile=null;
           }

         }else {
           if(t==0){
             this.fileData=null;
           }else if(t==1){
             this.shareFile=null
           }else if(t==2){
             this.reviewFile=null;
           }
           return
         }
       },e => {
       },{'Content-Type': 'multipart/form-data'})
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
    getList(currentPage, showCount, pd,order,direction) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd,
        "order":order,
        "direction":direction
      };
      this.$api.post('/manage-platform/information/queryInformationSendListByReceiveId',p,
        r => {
          this.outTableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
          this.$nextTick(()=>{
            this.btnctlFn(this.$root.checkItem);
          })
        })
    },
    inGetList(currentPage, showCount, pd,order,direction){
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd,
        "order":order,
        "direction":direction
      };
      this.$api.post('/manage-platform/information/queryInformationReceiveListBySendId',p,
       r => {
         this.inTableData = r.data.resultList;
         this.inTotalResult = r.data.totalResult;
         this.$nextTick(()=>{
           this.btnctlFn(this.$root.checkItem);
         })
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
          this.inFiles = r.data.informationSend.files;
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
            console.log(this.reviewFile)
            if(this.reviewFile){
              this.upload(r.data.serial,this.reviewFile,3);//回复发送
            }else{
              this.$message({
                message: '恭喜你，回复成功',
                type: 'success'
              });
            }
            this.addDialogVisible = false;
          }

        })
    },
    queryNationality(type) {//口岸
      this.$api.post('/manage-platform/userSys/selectAllDepts', {},
        r => {
          console.log(r);
          if (r.success) {
            if(type==0){
              this.company = r.data.deptList;
            }else if(type==1){
              this.sendCompany = r.data.deptList;
            }else if(type==2){
              this.inCompany = r.data.deptList;
            }else if(type==3){
              this.shareCompany = r.data.deptList;
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
          }else if(type==3){
            this.$set(this.shareform,'RECEIVEID',[]);
            if(val==''){
              this.shareAble=true;
            }else{
              this.shareAble=false;
              this.shareNameCllo = r.data.userList.pdList;
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
  width: 24%;
  display: inline-block;
}
.avgerName{
  width: 30%;
  display: inline-block;
}
.ww{
  width: 38px;
}
</style>
