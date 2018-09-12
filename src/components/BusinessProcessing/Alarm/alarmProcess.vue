<template lang="html">
  <div class="alarmProcess">
    <div class="top mb-6">
      <el-row type="flex" class="row-bg">
        事件编号：
        <el-input
          placeholder="请输入内容"
          size="small"
          v-model="eventserial"
          :disabled="true"
          class="apInput">
        </el-input>
      </el-row>

    </div>
    <div class="middle mb-6">
      <div class="middle-tab">

        <div v-if="$route.query.type!=0" class="middle-tab-item hand" style="height: 40px;line-height: 40px;" :class="{'middle-checked':tabIsShow==false}" @click="getList">
          基本信息
        </div>
        <div class="middle-tab-item hand" style="height: 40px;line-height: 40px;" :class="{'middle-checked':tabIsShow==true}" @click="shijian">
          事件文档
        </div>
      </div>
      <div class="middle-tab-content" v-show="!tabIsShow">
        <div class="middle-content1">
          <el-row type="flex" style="font-size:15px;">
            <el-col :span="20" class="middle-msg-left">
              <el-row type="flex" class="middle-msg-row">
                <el-col :span="5">
                  <span>姓名：</span>
                  {{iapiMap.name}}

                </el-col>
                <el-col :span="5">
                  <span>性别：</span>
                  {{iapiMap.gender}}

                </el-col>
                <el-col :span="5">
                  <span>出生日期：</span>
                  {{iapiMap.dateofbirth}}

                </el-col>
                <el-col :span="5">
                  <span>证件号码：</span>
                  {{iapiMap.passportno}}

                </el-col>
                <el-col :span="4">
                  <span>国籍/地区：</span>
                  {{iapiMap.nationality}}

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row">
                <el-col :span="5">
                  <span>签证号码：</span>
                  {{iapiMap.visano}}

                </el-col>
                <el-col :span="5">
                  <span>出入类型：</span>
                  {{iapiMap.flightType}}

                </el-col>
                <el-col :span="5">
                  <span>第二证号：</span>
                  {{iapiMap.otherNo}}

                </el-col>
                <el-col :span="5">
                  <span>第二国籍：</span>
                  {{iapiMap.otherNationality}}

                </el-col>

              </el-row>
              <el-row type="flex" class="middle-msg-row">
                <el-col :span="5">
                  <span>航班号：</span>
                  {{iapiMap.fltno}}

                </el-col>
                <el-col :span="5">
                  <span>出发地：</span>
                  {{iapiMap.origin}}

                </el-col>
                <el-col :span="5">
                  <span>目的地：</span>
                  {{iapiMap.destination}}

                </el-col>
                <el-col :span="8">
                  <span>报警时间：</span>
                  {{iapiMap.createtime}}

                </el-col>

              </el-row>

            </el-col>
            <el-col :span="4" class="middle-msg-right">
              <el-button type="warning" size="small" @click="rcgz">远程查询</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="middle-content1 position">
          <div class="title-green">
            待甄别名单列表
          </div>
          <div class="middle-msg" v-if="msgData>0">
            当前有<span>{{msgData}}</span>个名单未完成甄别
          </div>
          <el-table
            :data="listMap"
            border
            style="width: 100%;">
            <el-table-column
              type="index"
              label="序号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="dh"
              label="档号"
              >
            </el-table-column>
            <el-table-column
              prop="alarmType"
              label="名单类型">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="dateofbirth"
              label="出生日期">
            </el-table-column>
            <el-table-column
              prop="nationality"
              label="国籍/地区">
            </el-table-column>
            <el-table-column
              prop="visaType"
              label="证件种类">
            </el-table-column>
            <el-table-column
              prop="passportno"
              label="证件号码">
            </el-table-column>

            <el-table-column
              prop="visano"
              label="签证号码">
            </el-table-column>
            <el-table-column

              label="甄别状态"
              width="80">
              <template slot-scope="scope">
              <span v-if="scope.row.status==1">已甄别</span>

              <span v-else>未甄别</span>

              </template>
            </el-table-column>

            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button v-if="scope.row.status==1" icon="el-icon-tickets" class="table-btn" size="mini" plain @click="$router.push({name:'infoComparison',query:{status:scope.row.status,AlarmType:$route.query.AlarmType,dh:scope.row.dh,isZDGZ:$route.query.isZDGZ,NameListType:scope.row.alarmTypeNum,eventserial:eventserial,iapiSerial:iapiMap.iapiSerial,visaNo:scope.row.visano,inOut:iapiMap.flightType,nationAndPass:scope.row.nationalityCode+scope.row.passportno}})">查看</el-button>
                <el-button v-else class="table-btn" icon="el-icon-edit"  size="mini" plain @click="$router.push({name:'infoComparison',query:{status:scope.row.status,AlarmType:$route.query.AlarmType,dh:scope.row.dh,isZDGZ:$route.query.isZDGZ,NameListType:scope.row.alarmTypeNum,eventserial:eventserial,iapiSerial:iapiMap.iapiSerial,visaNo:scope.row.visano,inOut:iapiMap.flightType,nationAndPass:scope.row.nationalityCode+scope.row.passportno}})">甄别</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="middle-tab-content" v-show="tabIsShow">
        <div id="printMe">
          <div class="middle-content1 ">
            <div class="title-green">
              人员信息
            </div>
            <el-row type="flex" >
              <el-col class="middle-msg-img">
                <img src="../../../assets/img/bp_ap/ph_s.png" alt="" style="width:100%;height:100%">
              </el-col>
              <el-col class="middle-msg-text">
                <el-row type="flex" class="middle-msg-row2">
                  <el-col :span="6">
                    <span>姓名</span>
                    {{warnMap.name}}
                  </el-col>
                  <el-col :span="6">
                    <span>性别</span>
                    {{warnMap.gender}}
                  </el-col>
                  <el-col :span="6">
                    <span>出生日期</span>
                    {{warnMap.birthday}}

                  </el-col>
                </el-row>
                <el-row type="flex" class="middle-msg-row2">
                  <el-col :span="6">
                    <span>国籍</span>
                    {{warnMap.nationality}}

                  </el-col>
                  <el-col :span="6">
                    <span>证件号码</span>
                    {{warnMap.passportno}}

                  </el-col>
                  <el-col :span="6">
                    <span>签证号码</span>
                    {{warnMap.visano}}

                  </el-col>
                </el-row>
                <el-row type="flex" class="middle-msg-row2">
                  <el-col :span="6">
                    <span>出入标识</span>
                    {{warnMap.flightType}}

                  </el-col>
                  <el-col :span="6">
                    <span>第二证号</span>
                    {{warnMap.otherNo}}

                  </el-col>
                  <el-col :span="6">
                    <span>第二国籍</span>
                    {{warnMap.otherIssuecountry}}

                  </el-col>
                </el-row>
                <el-row type="flex" class="middle-msg-row2">
                  <el-col :span="6">
                    <span>航班号</span>
                    {{warnMap.fltno}}

                  </el-col>
                  <el-col :span="6">
                    <span>出发地</span>
                    {{warnMap.cityFrom}}

                  </el-col>
                  <el-col :span="6">
                    <span>目的地</span>
                    {{warnMap.cityto}}

                  </el-col>
                </el-row>
                <el-row type="flex" class="middle-msg-row2">
                  <el-col :span="6">
                    <span>报警类型</span>
                    {{warnMap.alarmtype}}

                  </el-col>
                  <el-col :span="6">
                    <span>报警时间</span>
                    {{warnMap.alarmtime}}

                  </el-col>

                </el-row>

              </el-col>

            </el-row>
          </div>
          <div class="middle-content1 ">
            <div class="title-green">
              甄别信息
            </div>
            <el-table
              :data="listMap2"
              border
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="dh"
                label="档号">
              </el-table-column>
              <el-table-column
                prop="namelistType"
                label="名单类型">
              </el-table-column>
              <el-table-column
                prop="namelistName"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="namelistGendor"
                label="性别">
              </el-table-column>
              <el-table-column
                prop="namelistBirthday"
                label="出生日期">
              </el-table-column>
              <el-table-column
                prop="namelistNationalityDesc"
                label="国籍">
              </el-table-column>
              <el-table-column
                prop="visatype"
                label="证件种类">
              </el-table-column>
              <el-table-column
                prop="namelistPassportno"
                label="证件号码">
              </el-table-column>

              <el-table-column
                prop="visano"
                label="签证号码">
              </el-table-column>
              <el-table-column
                prop="confirmResult"
                label="甄别结果">
              </el-table-column>
              <el-table-column
                prop="compareDesc"
                label="甄别说明">
              </el-table-column>
            </el-table>

          </div>
          <div class="middle-content1 mb-2">
            <div class="title-grey">
              处理结果
            </div>
            <el-row type="flex" class="middle-text-g">
              <el-col :span="4">
                <span>处理结果：</span>
                {{warnMap.distinguishResult}}
              </el-col>
              <el-col :span="4">
                <span>处理人：</span>
                {{warnMap.solver}}
              </el-col>
              <el-col :span="4">
                <span>审批人：</span>
                {{warnMap.approver}}
              </el-col>

            </el-row>
          </div>
        </div>

        <div class="middle-content1 middle-btn-g">
          <el-button type="primary" class="mr-22" size="small" @click="getPdf(0)">打印</el-button>
          <el-button type="success" class="mr-22" size="small" @click="getPdf(1)">导出</el-button>
          <el-button type="warning" size="small" @click="$router.go(-1)" v-if="$route.query.type!=0">返回</el-button>

        </div>
      </div>
    </div>
    <div class="down" v-show="!tabIsShow">
      <div class="title-grey">
        甄别结果
      </div>
      <el-row type="flex" class="mb-15">
        <el-col :span="20">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="甄别说明必须填写原因(不超过100个字符)"
            v-model="pd.CHANGE_RESON">
          </el-input>
        </el-col>
        <el-col :span="4" class="down-btn-area">
          <el-button type="primary" class="mb-15" size="small" @click="handeles()" v-show="iapiMap.instructNew==null" >确定</el-button>
          <el-button type="info" class="mb-15" size="small" @click="archive" v-show="iapiMap.instructNew">归档</el-button>
          <el-button type="warning" size="small" @click="$router.go(-1);">返回</el-button>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="6" class="input-item">
          <span >处理结果：</span>
          <el-select v-model="pd.DEALRESULT" placeholder="请选择" filterable size="small" class="input-input" v-if="$route.query.isZDGZ==1">
            <el-option label="0 - 不做变更处理" value="0"></el-option>
            <!-- <el-option label="数据推送" value="2"></el-option> -->
          </el-select>
          <el-select v-model="pd.DEALRESULT" placeholder="请选择" filterable size="small" class="input-input" v-else>
            <el-option label="0 - 不做变更处理" value="0"></el-option>
            <el-option label="1 - 变更处理" value="1"></el-option>
            <!-- <el-option label="数据推送" value="2"></el-option> -->
          </el-select>
        </el-col>
        <el-col :span="6" class="input-item">
          <span >处理人：</span>
          <el-input placeholder="请输入内容" size="small" class="input-input" v-model="userMap.userName" disabled></el-input>
        </el-col>
        <el-col :span="6" class="input-item">
          <span >审批人：</span>
          <el-input placeholder="请输入内容" size="small" class="input-input" v-model="userMap.approver" disabled></el-input>
        </el-col>

      </el-row>
    </div>

    <el-dialog title="指令变更" :visible.sync="handlesDialogVisible" width="900px">
      <el-form :model="form" ref="handlesForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">姓名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="iapiMap.name" class="yy-input-input" :disabled="true"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">性别：</span>
              <el-input placeholder="请输入内容" size="small" v-model="iapiMap.gender=='U'?'未知':form.GENDER=='M'?'男':'女'" class="yy-input-input" :disabled="true"></el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="yy-input-text">出生日期：</span>
            <el-input placeholder="请输入内容" size="small" v-model="iapiMap.dateofbirth"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">国籍：</span>
            <el-input placeholder="请输入内容" size="small" v-model="iapiMap.nationality" class="yy-input-input" :disabled="true"></el-input>

          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="iapiMap.passportno" class="yy-input-input" :disabled="true"> </el-input>
          </el-col>

          <el-col :span="8" class="input-item">
            <span class="yy-input-text">签证号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="iapiMap.visano" class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">当前反馈状态：</span>
            <el-select v-model="iapiMap.instructOld"  placeholder="请选择"    size="small" class="yy-input-input" :disabled="true">
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
            <el-input placeholder="请输入内容" size="small"  v-model="iapiMap.INSTRUCTC" class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>
        <hr/>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:18%">变更后反馈状态：</span>
            <el-select v-model="ap.INSTRUCT"  placeholder="请选择" filterable clearable  @change="inschange(ap.INSTRUCT)"  size="small" style="width:82%">
              <span v-if="iapiMap.instructOld!='0Z'">
                <el-option value="0Z" label="0Z - 允许打印登机牌"></el-option>
              </span>
              <span v-if="iapiMap.instructOld!='1Z'">
                <el-option value="1Z" label="1Z - 禁止打印登机牌"></el-option>
              </span>
              <span v-if="iapiMap.instructOld!='2Z'">
                <el-option value="2Z" label="2Z - 请再次核对"></el-option>
              </span>
              <span v-if="iapiMap.instructOld!='4Z'">
                <el-option value="4Z" label="4Z - 数据错误"></el-option>
              </span>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:18%">变更状态说明(FreeText)：</span>
            <el-input placeholder="请输入内容" size="small" v-verify.input.blur ="{regs:'required|noCinese',submit:'demo2'}" v-model="ap.INSTRUCTC" style="width:82%"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text" style="width:18%">变更描述：</span>
           <el-input type="textarea" v-model="ap.CHANGERESON"  placeholder="请输入变更描述(不能超过250字)" max="250" :autosize="{ minRows: 3, maxRows: 6}" style="width:82%;" ></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="handlesItem1('handlesForm')" size="small">变更</el-button> -->
        <el-button type="primary" @click="AuthDialogVisible=true" size="small">变更</el-button>
        <el-button @click="handlesDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>


    <el-dialog  title="操作授权" :visible.sync="AuthDialogVisible"  append-to-body width="500px">
      <el-row  type="flex"  class="mb-15">
            <el-col :span="20">
            <span class="yy-input-text">授权账号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="ap.userName" class="yy-input-input"></el-input></el-col>
      </el-row>
      <el-row  type="flex"  class="mb-15">
            <el-col :span="20">
              <span class="yy-input-text">授权密码：</span>
              <el-input placeholder="请输入内容" type="password" size="small" v-model="ap.password" class="yy-input-input"></el-input>
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
  // props:{
  //   eventserial: {
  //     type: String,
  //     default: "ddddd"
  //   },
  //   type:{
  //     type: Number,
  //     default: 1
  //   }
  // },
  data() {
    return {
      htmlTitle: '页面导出PDF文件名',
      eventserial: "ddddddd",
      type:1,
      tabIsShow: false,
      iapiMap: {},
      listMap: [],
      userMap: {},
      warnMap: {},
      listMap2: [],
      form: {},
      ap: {},
      pd: {DEALRESULT:"0"},
      AuthDialogVisible: false,
      handlesDialogVisible: false,
      tableData: [],
      msgData: 0
    }
  },
  mounted() {
    this.msgData=0;

    // if(this.$route.query.eventserial){
    let _this=this;
    setTimeout(function(){
      _this.eventserial = _this.$route.query.eventserial;
      console.log(_this.$route.query,1);
      if(_this.$route.query.type==0) {
        _this.shijian();
      }else{
        _this.getList();
      }
    },400)

  },
  activated(){
    this.msgData=0;
    console.log(this.$route.query.eventserial,1,this.msgData);
    let _this=this;
    // setTimeout(function(){
      this.eventserial = this.$route.query.eventserial;
      console.log(this.$route.query,1);
      if(this.$route.query.type==0) {
        this.shijian();
      }else{
        this.getList();
      }
    // },400)
  },
  methods: {
    getList() {
      this.tabIsShow=false;
      let p = {
        "currentPage": 0,
        "showCount": 3,
        "pd": {
          eventserial: this.eventserial
        }
      };
      if (this.$route.query.isZDGZ) {
        this.$api.post('/manage-platform/pnrAlarmEvent/queryPnrAlarmPassInfo', p,
          r => {
            console.log(r);
            this.iapiMap = r.data.iapiMap
            this.listMap = r.data.listMap;
            this.userMap = r.data.userMap;
            var arr = this.listMap
            var thar = this;
            this.pd.CHANGE_RESON = "";
            for (var i in arr) {
              if (arr[i].status == 0) {
                console.log(arr[i].status)
                this.msgData++;
              }
              if(this.iapiMap.instructNew){
                this.pd.CHANGE_RESON=this.iapiMap.change_reson+"\n";
              }else if (arr[i].status == 1) {
                this.pd.CHANGE_RESON += parseInt(i)+ 1 + ". 档号："+arr[i].dh+" 名单类型："+arr[i].alarmType+" 甄别结果："+arr[i].confirmResult+" 甄别说明：" + arr[i].compareDesc + "\n";
              }

            }
          })
      } else {
        this.$api.post('/manage-platform/alarmEvents/getListAlarmEventsInfo', p,
          r => {
            console.log(r);
            this.iapiMap = r.data.iapiMap
            this.listMap = r.data.listMap;
            this.userMap = r.data.userMap;
            var arr = this.listMap;
            var thar = this;
            this.pd.CHANGE_RESON = "";
            let tt="";
            for (var i=0;i<arr.length;i++) {
              if (arr[i].status == 0) {
                console.log(arr[i].status)
                this.msgData++;
              }
              if(arr[i].status == 1){
                tt+= parseInt(i)+ 1 + ". 档号："+arr[i].dh+" 名单类型："+arr[i].alarmType+" 甄别结果："+arr[i].confirmResult+" 甄别说明：" + arr[i].compareDesc + "\n";
              }
            }

            if(this.iapiMap.instructNew){
              console.log("ttttttttttttttttttttttttttttttt",tt)
              this.pd.CHANGE_RESON=this.iapiMap.change_reson;

              if(this.iapiMap.instructNew!=this.iapiMap.instructOld){
                this.pd.DEALRESULT='1'
                this.pd.CHANGE_RESON=tt+'\n 变更说明：'+this.iapiMap.change_reson;

              }

            }else{
              this.pd.DEALRESULT='0'
              this.pd.CHANGE_RESON=tt

            }

          })
      }

    },
    shijian() {
      this.tabIsShow = true;
      this.documentInfo()
    },
    upDate(ap) {
      if (this.pd.DEALRESULT == 1) {
        if(this.pd.DEALRESULT==1){
          this.pd.INSTRUCT_OLD=this.iapiMap.instructOld;
        }
        let p = {
          "IAPISERIAL": this.iapiMap.iapiSerial,
          "EVENTSERIAL":this.eventserial,
          "CREATEUSER": this.userMap.userId,
          "APPROVALUSER": ap.userName,
          "APPROVALPW": ap.password,
          "INSTRUCT": ap.INSTRUCT,
          "INSTRUCTC":ap.INSTRUCTC,
          "CHANGERESON": ap.CHANGERESON
        };
        // this.$api.post('/manage-platform/alarmEvents/getUpdateResult',p,
        this.$api.post('/manage-platform/iapiUnscolicited/eventAlarmTab', p,
          r => {
            console.log(r);
            if (r.success) {
              if(r.data.success){
                this.$message({
                  message: '恭喜你，操作成功！',
                  type: 'success'
                });
                // this.isUpdate = false;
                this.AuthDialogVisible = false;
                this.handlesDialogVisible = false;
                this.getList();
              }else {
                this.$message.error(r.data.msg);
              }


            }
          })
      }else{
        this.pd.INSTRUCT_OLD=this.iapiMap.instructOld;
        this.pd.eventserial=this.eventserial;
        this.pd.USERID=this.userMap.userId;

        let p={
          "currentPage":0,
          "showCount":3,
           pd:this.pd
        };
        this.$confirm('是否确定?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           this.$api.post('/manage-platform/alarmEvents/getUpdateResult',p,
            r => {
              console.log(r);
              if (r.success) {
                this.$message({
                   message: '恭喜你，甄别成功！',
                   type: 'success'
                 });
                 // this.isUpdate = false;
                 this.getList();
              }
            })
         })

      }


    },

    archive() {
      this.pd.eventserial = this.eventserial;
      this.pd.userid = this.userMap.userId;
      this.pd.approvaluser = this.ap.userName;
      this.pd.savecontent = this.pd.CHANGE_RESON;
      let p = {
        "currentPage": 0,
        "showCount": 3,
        "pd": this.pd
      };

      this.$api.post('/manage-platform/alarmEvents/archiveDocument', p,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '归档完毕！',
              type: 'success'
            });
            // this.isUpdate = true;
            var arr = this.listMap;
            this.pd.CHANGE_RESON = "";
            for (var i in arr) {
              if (!arr[i].compareDesc) {
                this.pd.CHANGE_RESON += parseInt(i + 1) + "." + arr[i].compareDesc + "\n";
                console.log(this.pd.CHANGE_RESON)
              }
            }

          } else {
            this.$message.error(r.message);
          }

          window.history.go(-1);

        })
    },
    documentInfo() {
      let sjwd;
      this.$route.query.isZDGZ ? sjwd = 1 : sjwd = 0;
      let p = {
        "currentPage": 0,
        "showCount": 3,
        "pd": {
          sjwd: sjwd,
          eventserial: this.eventserial
        }
      };
      this.$api.post('/manage-platform/alarmEvents/getEventDocumentInfo', p,
        r => {
          console.log(r);
          this.warnMap = r.data.warnMap
          this.listMap2 = r.data.listMap;
          // if(r.success){
          //   this.$message({
          //     message: '恭喜你，操作成功！',
          //     type: 'success'
          //   });
          // }else{
          //   this.$message.error(r.message);
          // }
        })
    },
    Authorization(ap) {
      this.upDate(ap);
    },
    handeles() {
      if(this.msgData>0){
        this.$alert('您尚有'+this.msgData+'条名单未做甄别处理，请先完成名单甄别操作!', '提示', {
         confirmButtonText: '确定',
         type: 'warning'
        });
        return
      }
      if (this.pd.DEALRESULT == 1) {
        this.handlesDialogVisible = true;
      }else {
        this.upDate(this.ap);
      }

    },
    rcgz(){
      this.$message({
          message: '功能开发中！',
          type: 'warning'
        });
    },
    inschange(n){
      var content="";
      if (n == "0Z") {
        content= "OK TO BOARD";
      } else if (n == "1Z") {
        content= "NO BOARD";
      } else if (n == "2Z") {
        content= "CHECK AGAIN";
      } else if (n == "4Z"){
        content= "DATA ENTRY ERROR";
      }
      this.ap.INSTRUCTC=content;
    }

  },
  // watch:{
  //   iapiMap.instructOld:function(n){
  //     if (n == "0Z") {
  //       this.iapiMap.INSTRUCTC= "OK TO BOARD";
  //     } else if (n == "1Z") {
  //       this.iapiMap.INSTRUCTC= "NO BOARD";
  //     } else if (n == "2Z") {
  //       this.iapiMap.INSTRUCTC= "CHECK AGAIN";
  //     } else if (n == "4Z"){
  //       this.iapiMap.INSTRUCTC= "DATA ENTRY ERROR";
  //     }
  //   }
  // }
}
</script>

<style scoped>
.apInput {
  width: 330px;

}

.middle {
  background: none;
  padding: 0;
}

.middle-tab {
  width: 252px;
  /* background: #fff; */
  display: flex;

}

.middle-tab-item {
  width: 50%;
  text-align: center;
  background: #a2ddd7;
  color: #4bc3a0;
}

.middle-checked {
  background: #fff;
  border-top: 3px #4bc3a0 solid;
}

.middle-content1 {
  background: #fff;
  padding: 15px 20px 5px 20px;
}

.position {
  position: relative;
}

.middle-msg {
  position: absolute;
  left: 140px;
  top: 15px;
  background: #fdddde;
  border: 1px #fea9ac solid;
  padding: 0 15px;
}

.middle-msg span {
  color: #fd5457;
  font-size: 18px;
  font-weight: bold;
}

.middle-msg-left {
  padding-right: 60px;
  border-right: 1px #eee solid;
}

.middle-msg-img {
  width: 130px;
  margin-right: 60px;
}

.middle-msg-row {
  border-bottom: 1px #eee solid;
  color: #666;
  height: 38px;
  line-height: 38px;
}

.middle-msg-row:last-child {
  border: none;
}

.middle-msg-row span {
  display: inline-block;
  width: 80px;
  color: #333;
}
.middle-msg-row2{
  line-height: 32px;
}
.middle-msg-row2 span {
  display: inline-block;
  width: 75px;
  color: #333;
  font-weight: bold;
}

.middle-msg-right {
  display: flex;
  justify-content: center;
  align-items: center;
}

.middle-text-g span {
  font-weight: bold;
}

.middle-btn-g {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
}
</style>
