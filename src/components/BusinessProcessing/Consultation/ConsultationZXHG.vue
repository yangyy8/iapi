<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <span class="title-green">
            咨询回复
          </span>
          <el-row align="center" :gutter="2" style="margin-top:10px" id="form1">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" :data-scope="aa.ts" data-name="CONSULTFROM" data-type="select"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>咨询来源：</span>
              <el-select v-model="pd.CONSULTFROM" filterable clearable placeholder="请选择" size="small" class="input-input">
                <el-option label="0 - 航空公司" value="0"></el-option>
                <el-option label="1 - 乘客" value="1"></el-option>
                <el-option label="2 - 其他" value="2"></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" :data-scope="aa.ts" data-name="AIRLINE_CODE" data-type="select"
            v-validate-easy="[['required']]" v-if="pd.CONSULTFROM=='0'">
              <span class="input-text"><i class="t-must">*</i>航空公司：</span>
              <el-select v-model="pd.AIRLINE_CODE" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="applicationMethod">
                <el-option
                v-for="item in application"
                :key="item.AIRLINE_CODE"
                :value="item.AIRLINE_CODE"
                :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME">
                </el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="pd.CONSULTFROM == '0'||pd.CONSULTFROM == ''||pd.CONSULTFROM == undefined"
            :data-scope="aa.ts" data-name="TERMINAL" data-type="select"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>航站：</span>
              <el-select v-model="pd.TERMINAL" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="terminal">
                <el-option
                v-for="item in takeOffName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_NAME"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group"
            :data-scope="aa.ts" data-name="CONSULTNAME" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>咨询人：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.CONSULTNAME"  class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group"
            :data-scope="aa.ts" data-name="CONSULTFROMTYPE" data-type="select"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>咨询方式：</span>
              <el-select v-model="pd.CONSULTFROMTYPE" filterable clearable placeholder="请选择" size="small" class="input-input">
                <el-option label="0 - 移动电话" value="0"></el-option>
                <el-option label="1 - 传真" value="1"></el-option>
                <el-option label="2 - 邮箱" value="2"></el-option>
                <el-option label="3 - 固定电话" value="3"></el-option>
                <el-option label="4 - 其他" value="4"></el-option>
              </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="pd.CONSULTFROMTYPE=='0'"
            :data-scope="aa.ts" data-name="PHONE" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>移动电话：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.PHONE"  class="input-input" maxlength="25"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="pd.CONSULTFROMTYPE=='1'"
            :data-scope="aa.ts" data-name="CONSULTFAX" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>传真：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.CONSULTFAX"  class="input-input" maxlength="25"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="pd.CONSULTFROMTYPE=='2'"
            :data-scope="aa.ts" data-name="CONSULTEMAIL" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>邮箱：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.CONSULTEMAIL"  class="input-input" maxlength="50"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="pd.CONSULTFROMTYPE=='3'"
            :data-scope="aa.ts" data-name="INCOMINGPHONE" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>固定电话：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.INCOMINGPHONE"  class="input-input" maxlength="25"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item my-form-group" v-if="pd.CONSULTFROMTYPE=='4'"
            :data-scope="aa.ts" data-name="CONSULTFROMOTHERREMARK" data-type="input"
            v-validate-easy="[['required']]">
              <span class="input-text"><i class="t-must">*</i>其他：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.CONSULTFROMOTHERREMARK"  class="input-input"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:35px;">
          <el-button type="success" size="small" class="mb-15" @click="addToBook()">添加至通讯录</el-button>
          <el-button type="primary" size="small" plain @click="pd={CONSULTFROM:'',AIRLINE_CODE:'',TERMINAL:'',CONSULTNAME:'',CONSULTFROMTYPE:'',PHONE:'',CONSULTFAX:'',CONSULTEMAIL:'',INCOMINGPHONE:'',CONSULTFROMOTHERREMARK:''};V.$reset('txljiao')">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle"  @mouseover="mouseHeader" style="border-bottom:2px solid #38628C">
      <span>报送信息</span>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="NAME"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="CARDNUM"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="EXPIREDATE"
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
          prop="DEPARTDATESTR"
          label="计划起飞时间">
        </el-table-column>
        <el-table-column
          prop="VISANUMBER"
          label="签证号码">
        </el-table-column>
        <el-table-column
          prop="VISATYPE"
          label="签证种类">
        </el-table-column>
        <el-table-column
          prop="INSTRUCT_OLD"
          label="反馈状态">
        </el-table-column>
      </el-table>
      <el-row align="center" :gutter="2" type="flex">
        <el-col :span="24" class="input-item my-form-group" :data-scope="aa.all" data-name="DETAILS" data-type="textarea"
        v-validate-easy="[['required']]">
          <span class="yy-input-text width-lef"><i class="t-must">*</i>问题详情：</span>
          <el-input type="textarea" v-model="pd.DETAILS" maxlength="300" :autosize="{ minRows: 3, maxRows: 3}"></el-input>
        </el-col>
      </el-row>
    </div>

    <div class="middle mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="12" class="br pr-20">
            <el-row align="center" :gutter="2" type="flex">
              <el-col  :sm="20" :md="20" :lg="20"  class="input-item">
                <span class="input-text">回复意见：</span>
                <el-select v-model="pd.REPLYTYPE" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="replyCaliber" @change="replayC(pd.REPLYTYPE)">
                  <el-option
                   v-for="(item,ind) in caliber"
                   :key="ind"
                   :value="item.DESCRIBE"
                   :label="item.DESCRIBE">
                  </el-option>
                 </el-select>
              </el-col>
            </el-row>
            <el-row align="center" :gutter="2" type="flex">
              <el-col  :sm="20" :md="20" :lg="20"  class="input-item">
                <span class="input-text">中文：</span>
                <el-input type="textarea" placeholder="请输入内容" size="small" v-model="pd.CHNREPLY"  class="input-input"></el-input>
              </el-col>
            </el-row>
            <el-row align="center" :gutter="2" type="flex">
              <el-col  :sm="20" :md="20" :lg="20"  class="input-item">
                <span class="input-text">英文：</span>
                <el-input type="textarea" placeholder="请输入内容" size="small" v-model="pd.ENGREPLY"  class="input-input"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" class="down-btn-area" v-show="false">
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
        <el-col  :sm="24" :md="12" :lg="6"  class="input-item my-form-group" :data-scope="aa.all" data-name="RESULTOFHANDING" data-type="select"
        v-validate-easy="[['required']]">
          <span class="input-text t-width-inp"><i class="t-must">*</i>处理结果：</span>
          <el-select v-model="pd.RESULTOFHANDING" filterable clearable placeholder="请选择" size="small" class="input-input">
            <el-option label="0-不做处理" value="0"></el-option>
            <el-option label="1-变更指令(允许登机)" value="1"></el-option>
            <el-option label="2-变更指令(不准登机)" value="2"></el-option>
           </el-select>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="18"  class="input-item">
          <span class="input-text  t-width-bz">备注：</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.REMARKOFHANDING"  class="input-input"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row align="center" :gutter="2" type="flex" justify="center">
        <el-button type="primary" size="small" style="margin-left:20px!important" @click="saveT">保存</el-button>
        <el-button type="primary" size="small" style="margin-left:20px!important"><a href="javascript:history.back(-1)" style="color:#fff">返回</a></el-button>
        <el-button type="primary" size="small" style="margin-left:20px!important" @click="pd={};V.$reset('txl');V.$reset('txljiao')">清空</el-button>
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
            <span class="yy-input-text">国籍/地区：</span>
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
                <el-option value="0Z" label="0Z - 允许打印登机牌"></el-option>
              </span>
              <span v-if="form.LASTCHECKRESULT!='1Z'">
                <el-option value="1Z" label="1Z - 禁止打印登机牌"></el-option>
              </span>
              <span v-if="form.LASTCHECKRESULT!='2Z'">
                <el-option value="2Z" label="2Z - 请再次核对"></el-option>
              </span>
              <span v-if="form.LASTCHECKRESULT!='4Z'">
               <el-option value="4Z" label="4Z - 数据错误"></el-option>
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
          <el-input placeholder="请输入内容" size="small" v-model="ap.APPROVALUSER" v-verify.change.blur ="{regs:'required',submit:'demo2'}" class="yy-input-input"></el-input>
        </el-col>
      </el-row>
      <el-row  type="flex"  class="mb-15">
        <el-col :span="20">
          <span class="yy-input-text">授权密码：</span>
          <el-input placeholder="请输入内容" type="password" size="small" v-model="ap.APPROVALPW" v-verify.change.blur ="{regs:'required',submit:'demo2'}" class="yy-input-input"></el-input>
        </el-col>
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
      aa:{
        ts:'txl',
        all:'txl'
      },
      application:[],
      takeOffName:[],
      pd: {},
      nation: [],
      company: [],
      caliber: [],
      handlesDialogVisible:false,
      AuthDialogVisible:false,
      form: {},
      ap: {},

      value: '',
      value1: "",
      tableData: [],
      multipleSelection: [],
      dform: {},
    }
  },
  mounted() {

  },
  activated() {
    this.tableData=[];
    this.tableData.push(this.$route.query.review);
    this.pd=this.$route.query.review;
    this.V.$reset('txl');
    this.V.$reset('txljiao');
    // this.pretestResults = this.$route.query.details;
  },
  methods: {
    addToBook(){//添加至通讯录
      this.aa.ts='txljiao'
      let a=document.getElementById('form1');
      for(var i=0;i<a.children.length;i++){
        a.children[i].dataset.scope="txljiao"
      }
      this.V.$submit('txljiao', (canSumit,data) => {
        if(!canSumit) return
        var obj={};
        obj.CONSULTFROM = this.pd.CONSULTFROM;
        obj.STATIONFROM = this.pd.TERMINAL;
        obj.NAME = this.pd.CONSULTNAME;
        obj.TELEPHONE = this.pd.INCOMINGPHONE;
        obj.CELLPHONE = this.pd.PHONE;
        obj.FAX = this.pd.CONSULTFAX;
        obj.EMAIL= this.pd.CONSULTEMAIL;
        obj.OTHER = this.pd.CONSULTFROMOTHERREMARK;
        obj.AIRLINE_CODE = this.pd.AIRLINE_CODE;
        if(this.pd.AIRLINE_CODE!=''){
          obj.AIRLINE_CHN_NAME = this.appZhuan(this.pd.AIRLINE_CODE).split('-')[0];
          obj.AIRLINE_ENG_NAME = this.appZhuan(this.pd.AIRLINE_CODE).split('-')[1];
        }else{
          obj.AIRLINE_CHN_NAME='';
          obj.AIRLINE_ENG_NAME='';
        }
        this.$api.post('/manage-platform/consult/saveConsultAddress',obj,
          r => {
            if(r.success){
              this.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              });
            }
          })
      })
    },
    appZhuan(item){
      if(this.application.length!=0){
        for(var i=0;i<this.application.length;i++){
          if(item == this.application[i].AIRLINE_CODE){
            return this.application[i].AIRLINE_CHN_NAME+'-'+this.application[i].AIRLINE_ENG_NAME
          }
        }
      }else{
        return ''
      }
    },
    applicationMethod(){
      this.$api.post('/manage-platform/codeTable/queryAircompanyList',{},
       r =>{
         if(r.success){
           this.application = r.data;
         }
       })
    },
    terminal(){//航站
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
     added(){
       this.addedDialogVisible = true;
     },
    replyCaliber(){//回复口径
      this.$api.post('/manage-platform/consult/queryReplyList',{},
       r => {
         console.log(r);
         this.caliber = r.data
       })
    },
    replayC(val){
      this.$set(this.pd,'CHNREPLY','');
      this.$set(this.pd,'ENGREPLY','');
      for(var i=0;i<this.caliber.length;i++){
        if(this.caliber[i].DESCRIBE == val){
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
        }
      }
      this.handlesItem1("handlesForm", ap);
    },
    handlesItem1(formName, ap) {
      let p = {
        "IAPISERIAL": [this.$route.query.review.SERIAL],
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
      reply.INSTRUCT_OLD = this.$route.query.review.INSTRUCT_OLD;//原指令
      reply.INSTRUCT_NEW = this.form.INSTRUCT;//最终指令
      reply.DEALRESULT = 1;//变更
      reply.CHANGESERIAL = val;
      // reply.serial = this.$route.query.serial
      this.$api.post('/manage-platform/consult/saveConsult',reply,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，保存成功',
             type: 'success'
           });
         }
       })
       setTimeout(function(){
         window.history.go(-1);
       },1500);
    },
    saveT(){//变更
      this.aa.ts='txl';
      this.aa.all='txl';
      let a=document.getElementById('form1');
      for(var i=0;i<a.children.length;i++){
        a.children[i].dataset.scope="txl"
      }
      this.V.$submit('txl', (canSumit,data) => {
        if(!canSumit) return
        if(this.pd.RESULTOFHANDING == 1||this.pd.RESULTOFHANDING == 2){
          this.handlesDialogVisible = true;
          this.form.NAME = this.$route.query.review.INTG_CHNNAME;
          this.form.GENDER = this.$route.query.review.GENDER;
          this.form.DATEOFBIRTH = this.$route.query.review.DATEOFBIRTH;
          this.form.NATIONALITYC = this.$route.query.review.NATIONALITY;
          this.form.PASSPORTNO = this.$route.query.review.PASSPORTNO;
          this.form.INTG_VISANO = this.$route.query.review.VISANO;
          this.form.LASTCHECKRESULT = this.$route.query.review.LASTCHECKRESULT;
          this.form.LASTCHECKRESULTC = this.$route.query.review.LASTCHECKRESULT;
        }else{
          var objN = this.pd;
          objN.DEALRESULT = 0;//不变更

          // objN.serial = this.$route.query.serial
          // objN.serial = this.$route.query.serial;
          this.$api.post('/manage-platform/consult/saveConsult',objN,
           r => {
             if(r.success){
               this.$message({
                 message: '恭喜你，保存成功',
                 type: 'success'
               });
             }
           })
           setTimeout(function(){
             window.history.go(-1);
           },1500);
        }
      })
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
  margin-right: 0.5%;
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
  width: 6%!important;
}
</style>
