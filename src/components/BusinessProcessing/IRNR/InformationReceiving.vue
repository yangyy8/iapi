<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2" type="flex" justify="center">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">口岸/部门：</span>
              <el-select v-model="pd.userId" filterable clearable placeholder="请选择" size="small" class="input-input" @change="nameId(pd.userId)">
                <el-option
                  v-for="item in company"
                  :key="item.SERIAL"
                  :label="item.DEPT_JC"
                  :value="item.SERIAL">
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-select v-model="pd.id" filterable clearable placeholder="请选择" size="small" class="input-input">
                <el-option
                  v-for="item in nameCllo"
                  :key="item.NAME"
                  :label="item.NAME"
                  :value="item.NAME">
                </el-option>
               </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
          <el-button type="success" size="small" @click="addDialogVisible = true">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <span class="tubiao hand borderL" :class="{'checked':page==0}" @click="page=0;getList();">发件箱</span><span class="tubiao hand borderR" :class="{'checked':page==1}" @click="qq">收件箱</span>
      <div class="tableWrap" v-show="page==0">
        <el-table
          :data="outTableData"
          border
          style="width: 100%;"
          >
          <el-table-column
            prop="DETAILS"
            label="消息内容">
          </el-table-column>
          <el-table-column
            prop="SENDTIME"
            label="发送时间">
          </el-table-column>
          <el-table-column
            label="操作" width="200">
            <template slot-scope="scope">
              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="outDetails(scope.row)">详情</el-button>
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
        <el-row class="mb-5">
          <el-button type="warning" size="small" @click="sendMesssage">发送消息</el-button>
        </el-row>
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
            prop="informationSend.SENDTIME"
            label="发送时间">
          </el-table-column>
          <el-table-column
            prop="READSTATUS"
            label="读取状态">
            <template slot-scope="scope">
              {{scope.row.STATUS | fiftertype}}
            </template>
          </el-table-column>

          <el-table-column
            label="操作" width="200">
            <template slot-scope="scope">
                <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="inReply(scope.row)">回复</el-button>
                <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="inDetails(scope.row)">详情</el-button>
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
      <el-form :model="dform" ref="addForm">
        <el-row type="flex"  class="mb-6" style="margin-left:85px">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">接收口岸：</span>
            <el-select  placeholder="请选择"  size="mini"  class="input-input" v-model="dform.port" filterable clearable @visible-change="portMethod">
              <el-option
              v-for="item in portName"
              :key="item.KADM"
              :value="item.KADM"
              :label="item.KAMC"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">接收人：</span>
            <span class="yy-input-input detailinput"> {{dform.DEPT_QC }}</span>
          </el-col>
          <el-col :span="8" class="input-item">
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
              :file-list="fileList">
              <el-button size="small" class="table-btn">上传附件</el-button>
            </el-upload>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text width-ts">回复内容：</span>
            <el-input type="textarea" v-model="dform.DETAILS"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sendMesssageReal" size="small">发送</el-button>
        <el-button @click="" size="small" type="warning">清空</el-button>
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

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text width-ts">回复内容：</span>
            <el-input type="textarea" v-model="replyContent"></el-input>
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
            <span class="yy-input-input detailinput"> {{dform.informationSend.SENDTIME}}</span>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">回复时间：</span>
            <span class="yy-input-input detailinput">  {{dform.REPLYTIME}}</span>
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small" type="warning">下载附件</el-button>
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
          prop="REPLYTIME"
          label="回复时间">
        </el-table-column>
        <el-table-column
          prop="RECEIVETYPE"
          label="读取状态">
          <template slot-scope="scope">
            {{scope.row.STATUS | fiftertype}}
          </template>
        </el-table-column>
      </el-table>
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

      pd: {},
      nation: [],
      company: [],
      portName:[],
      page:0,
      replyContent:'',//回复内容
      serialImp:'',
      nameCllo:[],

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
      pickerOptions1: {
        // shortcuts: [{
        //   text: '今天',
        //   onClick(picker) {
        //     picker.$emit('pick', new Date());
        //   }
        // }, {
        //   text: '昨天',
        //   onClick(picker) {
        //     const date = new Date();
        //     date.setTime(date.getTime() - 3600 * 1000 * 24);
        //     picker.$emit('pick', date);
        //   }
        // }, {
        //   text: '一周前',
        //   onClick(picker) {
        //     const date = new Date();
        //     date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        //     picker.$emit('pick', date);
        //   }
        // }]
      },
      form: {
        informationSend:{}
      },
      dform: {
        informationSend:{}
      },
    }
  },
  mounted() {
    this.getList();
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
  },
  activated() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    qq(){
      this.page=1;
      this.getList();
    },
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
     sendMesssage(){//发送消息
       this.sendDialogVisible = true;
     },
     sendMesssageReal(){
       this.$api.post('/manage-platform/information/saveInformationSend',p,
         r =>{
           if(r.success){
             this.$message({
               message: '恭喜你，发送成功',
               type: 'success'
             });
           }
         })
     },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
      // let p = {
      //   "currentPage": currentPage,
      //   "showCount": showCount,
      //   "pd": pd
      // };
      if(this.page==0){
        this.$api.post('/manage-platform/information/queryInformationSendList',{},
          r => {
            console.log(r);
            this.outTableData = r.data.resultList;
            this.TotalResult = r.data.totalResult;
          })
      }else if(this.page==1){
        this.$api.post('/manage-platform/information/queryInformationReceiveList',{},
         r => {
           this.inTableData = r.data.resultList;
           this.inTotalResult = r.data.totalResult;
         })
      }
    },
    outDetails(row){
      this.outDetailsDialogVisible = true;
      let p={
        'serial':row.SERIAL
      }
      this.$api.post('/manage-platform/information/queryInformationSend',p,
        r =>{
          this.outTableDataDetail = r.data.receiveList;
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
        })
    },
    inReply(row){//点击回复
      this.replyContent='';
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
      var entity = {};
      entity.serial = this.serialImp;
      entity.REPLYMESSAGE = this.replyContent;
      let p={
        'entity':entity
      }
      this.$api.post('/manage-platform/information/saveInformationReceive',p,
        r =>{
          if(r.success){
            this.$message({
              message: '恭喜你，发送成功',
              type: 'success'
            });
          }
          this.addDialogVisible = false;
        })
    },
    queryNationality() {//口岸
      this.$api.post('/manage-platform/userSys/deptListSmall', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data.deptList;
            console.log(this.company);
          }
        })
    },
    nameId(val){
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
          this.nameCllo = r.data.userList.pdList;
        })
      // let arr = this.company;
      // this.nameCllo = [];
      // for(var i=0;i<arr.length;i++){
      //   if(arr[i].DEPT_JC == val){
      //     console.log(arr[i]);
      //     this.nameCllo.push(arr[i].NAME)
      //   }
      // }
      // console.log(this.nameCllo);
    },
    review(n) {

      this.form=Object.assign({}, n);
    },


    addItem(formName) {
      if (this.form.DEPT_ORDER != undefined && this.form.DEPT_ORDER != "") {
        if (!checkRate(this.form.DEPT_ORDER)) {
          this.$message.error('排列序号必须为数字，请重新输入！');
          return;
        }
      }

      if (this.$validator.listener.demo2) {
        const result = this.$validator.verifyAll('demo2')
        if (result.indexOf(false) > -1) {
          return;
        }
      }

       var url = "/manage-platform/deptSys/edit";

      this.$api.post(url, this.form,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
          } else {
            this.$message.error('保存失败！');
          }
          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          this.getList();
          // this.tableData=r.Data.ResultList;
        }, e => {
          this.$message.error('失败了');
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.dform = i;
    },
    deletes(i) {
      let p = {
        "SERIAL": i.SERIAL
      };
      this.$confirm('您是否确认删除此部门？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/deptSys/delete', p,
          r => {
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getList();
            } else {
              this.$message.error(r.Message);
            }
          }, e => {
            this.$message.error('失败了');
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    portMethod(){
      this.$api.post('/manage-platform/codeTable/queryAirportMatch',{},
      r =>{
        if(r.success){
          this.portName = r.data
        }
      })
    }
  },
  filters: {
    fiftertype(val) {
      if (val == "0") {
        return "停用";
      } else {
        return "启用";
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
  width: 20.3%!important;
}
.checked{
  background:#399bfe;
  color:#ffffff;
}
.tubiao{
  width:100px; padding:6px 15px;
  border:1px solid #399bfe;
  font-size: 13px;
}
.borderL{
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
.borderR{
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
.tableWrap{
  margin-top: 10px;
}
</style>
