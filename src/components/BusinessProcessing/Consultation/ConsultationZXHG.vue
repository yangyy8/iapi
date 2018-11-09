<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="24" class="br pr-20">
          <span class="title-green">
            咨询回复
          </span>
        </el-col>
      </el-row>
    </div>
    <div class="middle" style="border-bottom:2px solid #38628C">
      <span>报送信息</span>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          prop="INTG_CHNNAME"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="PASSPORTNO"
          label="证件号码"
          >
        </el-table-column>
        <el-table-column
          prop="PASSPORTEXPIREDATE"
          label="证件有效期">
        </el-table-column>
        <el-table-column
          prop="NATIONALITY"
          label="国籍/地区">
        </el-table-column>
        <el-table-column
          prop="GENDER"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="DATEOFBIRTH"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="FLIGHTTYPE"
          label="出入境类型">
        </el-table-column>
        <el-table-column
          prop="FLTNO"
          label="航班号">
        </el-table-column>
        <el-table-column
          prop="DEPARTDATE"
          label="计划起飞时间">
        </el-table-column>
        <el-table-column
          prop="VISANO"
          label="签证号码">
        </el-table-column>
        <el-table-column
          prop="VISATYPE"
          label="签证种类">
        </el-table-column>
        <el-table-column
          prop="LASTCHECKRESULT"
          label="反馈状态">
        </el-table-column>
      </el-table>
      <!-- <div class="middle-foot">
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
      </div> -->
      <el-row align="center" :gutter="2" type="flex">
        <el-col :span="24" class="input-item">
          <span class="yy-input-text width-lef">预检结果：</span>
          <el-input type="textarea" v-model="pretestResults"></el-input>
        </el-col>
      </el-row>
    </div>

    <div class="middle mb-2">
      <!-- <span class="title-blue">回复口径</span> -->
      <el-row type="flex" class="middle">
        <el-col :span="12" class="br pr-20">
            <el-row align="center" :gutter="2" type="flex">
              <el-col  :sm="20" :md="20" :lg="20"  class="input-item">
                <span class="input-text">回复口径：</span>
                <el-select v-model="pd.REPLYTYPE" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="replyCaliber" @change="replayC(pd.REPLYTYPE)">
                  <el-option
                   v-for="item in caliber"
                   :key="item.TYPE"
                   :value="item.TYPE"
                   :label="item.DESCRIBE">
                  </el-option>
                 </el-select>
              </el-col>
            </el-row>
            <el-row align="center" :gutter="2" type="flex">
              <el-col  :sm="20" :md="20" :lg="20"  class="input-item">
                <span class="input-text">中文：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.CHNREPLY"  class="input-input"></el-input>
              </el-col>
            </el-row>
            <el-row align="center" :gutter="2" type="flex">
              <el-col  :sm="20" :md="20" :lg="20"  class="input-item">
                <span class="input-text">英文：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.ENGREPLY"  class="input-input"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" class="down-btn-area">
            <el-row align="center" type="flex">
              <el-button type="primary" class="width-btn" @click="">咨询辅助</el-button>
            </el-row>
            <el-row align="center" type="flex" style="margin-top:10px">
              <el-button type="warning" class="width-btn" @click="">生成法律文书</el-button>
            </el-row>
          </el-col>
        </el-row>
    </div>
    <div class="middle mb-2">
      <el-row align="center" :gutter="2" type="flex" justify="left">
        <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
          <span class="input-text t-width-inp">处理结果：</span>
          <el-select v-model="pd.RESULTOFHANDING" filterable clearable placeholder="请选择" size="small" class="input-input">
            <el-option label="0-不做处理" value="0"></el-option>
            <el-option label="1-变更指令(允许登机)" value="1"></el-option>
            <el-option label="2-变更指令(不准登机)" value="2"></el-option>
           </el-select>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="18"  class="input-item">
          <span class="input-text  t-width-bz">备注：</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.REMARKOFHANDING"  class="input-input"></el-input>
          <!-- <el-input type="textarea" v-model="pd.REMARKOFHANDING"></el-input> -->
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row align="center" :gutter="2" type="flex" justify="center">
        <!-- <el-button type="primary" size="small" @click="">取消</el-button>
        <el-button type="primary" size="small" @click="" style="margin-left:20px!important">暂存</el-button> -->
        <el-button type="primary" size="small" @click="" style="margin-left:20px!important" @click="saveT">保存</el-button>
        <!-- <el-button type="primary" size="small" @click="" style="margin-left:20px!important">退出</el-button> -->
      </el-row>
    </div>
    <el-dialog title="指令变更" :visible.sync="handlesDialogVisible" width="900px">
      <el-form :model="form" ref="handlesForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">姓名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.NAME" class="yy-input-input" :disabled="true"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">性别：</span>
              <el-input placeholder="请输入内容" size="small" v-model="form.GENDER=='U'?'未知':form.GENDER=='M'?'男':'女'" class="yy-input-input" :disabled="true"></el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="yy-input-text">出生日期：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.DATEOFBIRTH"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">国籍：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.NATIONALITYC" class="yy-input-input" :disabled="true"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.PASSPORTNO" class="yy-input-input" :disabled="true"> </el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="yy-input-text">签证号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.INTG_VISANO" class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">当前反馈状态：</span>
            <el-select v-model="form.LASTCHECKRESULT"  placeholder="请选择"    size="small" class="yy-input-input" :disabled="true">
              <el-option value="0Z" label="0Z - 允许打印登机牌">
              </el-option>
              <el-option value="1Z" label="1Z - 禁止打印登机牌">
              </el-option>
              <el-option value="2Z" label="2Z - 请再次核对">
              </el-option>
              <el-option value="4Z" label="4Z - 数据错误">
              </el-option>
             </el-select>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">反馈状态说明：</span>
            <el-input placeholder="" size="small"  v-model="form.LASTCHECKRESULTC" class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>
        <hr/>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:20%">变更后反馈状态：</span>
            <el-select v-model="form.INSTRUCT"  placeholder="请选择"  filterable clearable  @change="inschange(form.INSTRUCT)"  size="small" style="width:82%">
              <span v-if="form.LASTCHECKRESULT!='0Z'">
              <el-option value="0Z" label="0Z - 允许打印登机牌">
              </el-option>
             </span>
              <span v-if="form.LASTCHECKRESULT!='1Z'">
              <el-option value="1Z" label="1Z - 禁止打印登机牌">
              </el-option>
            </span>
            <span v-if="form.LASTCHECKRESULT!='2Z'">
              <el-option value="2Z" label="2Z - 请再次核对">
              </el-option>
                </span>
              <span v-if="form.LASTCHECKRESULT!='4Z'">
              <el-option value="4Z" label="4Z - 数据错误">
              </el-option>
                </span>
             </el-select>
          </el-col>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:20%">变更状态说明(FreeText)：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.INSTRUCTC" style="width:82%"></el-input>
          </el-col>
        </el-row>


        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:20%">变更描述：</span>
           <el-input type="textarea" v-model="form.CHANGERESON"   placeholder="请输入变更描述(不能超过250字)" maxlength="250"  :autosize="{ minRows: 3, maxRows: 6}" style="width:82%;" ></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handlessys()" size="small">变更</el-button>
        <el-button @click="handlesDialogVisible = false" size="small">取消</el-button>

      </div>

    </el-dialog>

    <el-dialog  title="操作授权" :visible.sync="AuthDialogVisible"  append-to-body width="500px">

      <el-row  type="flex"  class="mb-15">
            <el-col :span="20">
            <span class="yy-input-text">授权账号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="ap.APPROVALUSER" v-verify.change.blur ="{regs:'required',submit:'demo2'}" class="yy-input-input"></el-input></el-col>
      </el-row>
      <el-row  type="flex"  class="mb-15">
            <el-col :span="20">
              <span class="yy-input-text">授权密码：</span>
              <el-input placeholder="请输入内容" type="password" size="small" v-model="ap.APPROVALPW" v-verify.change.blur ="{regs:'required',submit:'demo2'}" class="yy-input-input"></el-input></el-col>

      </el-row>
      <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="Authorization(ap)" size="small">确认授权</el-button>
        <el-button @click="AuthDialogVisible = false" size="small">取消</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // CurrentPage: 1,
      // pageSize: 10,
      // TotalResult: 0,
      pd: {},
      nation: [],
      company: [],
      caliber: [],
      pretestResults:'',
      handlesDialogVisible:false,
      AuthDialogVisible:false,
      form: {},
      ap: {},
      changeId:'',

      value: '',
      value1: "",

      // options: [{
      //     value: 10,
      //     label: "10"
      //   },
      //   {
      //     value: 20,
      //     label: "20"
      //   },
      //   {
      //     value: 30,
      //     label: "30"
      //   }
      // ],
      tableData: [],
      multipleSelection: [],

      dform: {},
    }
  },
  mounted() {
    // this.tableData.push(this.$route.query.review);
    console.log(this.$route.query.review);
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated() {
    this.tableData=[];
    this.tableData.push(this.$route.query.review);
    this.pretestResults = this.$route.query.details;
    console.log(this.$route.query.details);
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
     added(){
       this.addedDialogVisible = true;
     },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // pageSizeChange(val) {
    //   this.getList(this.CurrentPage, val, this.pd);
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   this.getList(val, this.pageSize, this.pd);
    //
    //   console.log(`当前页: ${val}`);
    // },
    // getList(currentPage, showCount, pd) {
    //   let p = {
    //     "currentPage": currentPage,
    //     "showCount": showCount,
    //     "pd": pd
    //   };
    //   this.$api.post('/manage-platform/deptSys/selectAll', p,
    //     r => {
    //       console.log(r);
    //       // this.tableData = r.data.deptList.pdList;
    //       this.TotalResult = r.data.deptList.totalResult;
    //     })
    // },
    replyCaliber(){//回复口径
      this.$api.post('/manage-platform/consult/queryReplyList',{},
       r => {
         console.log(r);
         this.caliber = r.data
       })
    },
    replayC(val){
      for(var i=0;i<this.caliber.length;i++){
        if(this.caliber[i].TYPE == val){
          this.pd.CHNREPLY = this.caliber[i].CHN;
          this.pd.ENGREPLY = this.caliber[i].EN;
        }
      }
    },
    handlessys() {
      this.AuthDialogVisible = true;
      this.ap = {};
    },
    Authorization(ap) {
      if (this.$validator.listener.demo2) {
        const result = this.$validator.verifyAll('demo2')
        if (result.indexOf(false) > -1) {
          return
        } else {

        }
      }
      this.handlesItem1("handlesForm", ap);
    },
    handlesItem1(formName, ap) {
      let p = {
        "IAPISERIAL": [this.form.SERIAL],
        "CREATEUSER": "杨小",
        "APPROVALUSER": ap.APPROVALUSER,

        "APPROVALPW": ap.APPROVALPW,
        "INSTRUCT": this.form.INSTRUCT,
        "CHANGERESON": this.form.CHANGERESON
      };
      this.$api.post('/manage-platform/iapiUnscolicited/instructChangeTab', p,
        r => {
          console.log(r);
          if(r.success){
            // this.changeId = r.data.changeStatusSERIAL;
            if (r.data.success) {//变更成功
              this.$message({
                message: '变更成功！',
                type: 'success'
              });
              this.saveBg(r.data.changeStatusSERIAL)//保存成功
            } else {
              this.$message.error(r.data.msg);
            }
            this.$refs[formName].resetFields();
            this.handlesDialogVisible = false;
            this.AuthDialogVisible = false;
          }
          // this.getList(this.CurrentPage, this.pageSize, this.pd);
        }, e => {
          this.$message.error('失败了');
        })
    },
    inschange(n) {
      var content = "";
      if (n == "0Z") {
        content = "OK TO BOARD";
      } else if (n == "1Z") {
        content = "NO BOARD";
      } else if (n == "2Z") {
        content = "CHECK AGAIN";
      } else if (n == "4Z") {
        content = "DATA ENTRY ERROR";
      }
      this.form.INSTRUCTC = content;
    },
    saveBg(val){//指令变更保存
      var reply = {};
      reply = this.pd;
      reply.INSTRUCT_OLD = this.$route.query.review.LASTCHECKRESULT;//原指令
      reply.INSTRUCT_NEW = this.form.INSTRUCT;//最终指令
      reply.DEALRESULT = 1;//变更
      reply.CHANGESERIAL = val;
      reply.serial = this.$route.query.serial
      this.$api.post('/manage-platform/consult/saveConsultReply',reply,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，保存成功',
             type: 'success'
           });
         }
       })
    },
    saveT(){//变更
      if(this.pd.RESULTOFHANDING == 1||this.pd.RESULTOFHANDING == 2){
        this.handlesDialogVisible = true;
        this.form.NAME = this.$route.query.review.INTG_CHNNAME;
        this.form.GENDER = this.$route.query.review.GENDER;
        this.form.DATEOFBIRTH = this.$route.query.review.DATEOFBIRTH;
        this.form.NATIONALITYC = this.$route.query.review.NATIONALITY;
        this.form.PASSPORTNO = this.$route.query.review.PASSPORTNO;
        this.form.INTG_VISANO = this.$route.query.review.VISANO;
        this.form.LASTCHECKRESULT = this.$route.query.review.LASTCHECKRESULT;
      }else{
        var objN = this.pd;
        objN.DEALRESULT = 0;//不变更
        // objN.serial = this.$route.query.serial
        objN.serial = '1';
        this.$api.post('/manage-platform/consult/saveConsultReply',objN,
         r => {
           if(r.success){
             this.$message({
               message: '恭喜你，保存成功',
               type: 'success'
             });
           }
         })
      }
    }

  },

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
.width-lef{
  width: 5%!important;
}
.title-blue{
  color: #38628C
}
.width-btn{
  width:140px!important;
  height: 35px;
  line-height: 7px;
}
.t-width-inp{
  width: 18%!important;
}
.t-width-bz{
  width: 5%!important;
}
</style>
