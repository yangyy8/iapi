<template lang="html">
  <div class="bjsjck">
    <div class="top mb-2">
      事件编号：{{serial}}
    </div>
    <div class="middle">
      <el-row :gutter="10">
        <el-col :span="3">
          <div class="bjsj-l">
            <img src="../../../assets/img/bp_ap/ph_s.png" alt="" style="width:100%;">
            <span class="mb-2">综合风险等级</span>
            <el-rate :value="3" disabled class="mb-9"></el-rate>
            <el-button type="primary" size="small" class="mb-9" style="width:100%" @click="$router.push({name:'DZDA',query:{nationality:page0Data.nationality,passportno:page0Data.passportno}})">电子档案</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">综合查询</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">照片比对</el-button>
            <el-button type="success" size="small" style="width:100%" :disabled="!operation_type">事件归档</el-button>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="ak-tab">
            <div class="ak-tabs">
              <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="page=0">
                风评信息
              </div>
              <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="page=1">
                核查信息
              </div>
            </div>
          </div>
          <div class="ak-tab-pane" v-if="page==0">
            <div class="boder1 pb-10">
              <div class="title-green ">
                预报信息
              </div>
              <el-row class="middle-msg-row" :gutter="4">
                <el-col :span="6">
                  <span>姓名：</span>
                  {{page0Data.name}}
                </el-col>
                <el-col :span="6">
                  <span>国籍/地区：</span>
                  {{page0Data.nationalityName}}
                </el-col>
                <el-col :span="6">
                  <span>出入类型：</span>
                  {{page0Data.flightTypeName}}
                </el-col>
                <el-col :span="6">
                  <span>出发地：</span>
                  {{page0Data.origin}}
                </el-col>
                <el-col :span="6">
                  <span>性别：</span>
                  {{page0Data.genderName}}
                </el-col>
                <el-col :span="6">
                  <span>证件类型：</span>
                  {{page0Data.passportTypeName}}
                </el-col>
                <el-col :span="6">
                  <span>航班号：</span>
                  {{page0Data.fltno}}
                </el-col>
                <el-col :span="6">
                  <span>目的地：</span>
                  {{page0Data.destination}}
                </el-col>
                <el-col :span="6">
                  <span>出生日期：</span>
                  {{page0Data.birthday}}
                </el-col>
                <el-col :span="6">
                  <span>证件号码：</span>
                  {{page0Data.passportno}}
                </el-col>
                <el-col :span="6">
                  <span>航班日期：</span>
                  {{page0Data.fltnoDate}}
                </el-col>
                <el-col :span="6">
                  <span>报警时间：</span>
                  {{page0Data.createTime}}
                </el-col>

              </el-row>
              <div class="ak-tip">
                注：
                <span class="tag1"></span><span class="mr-30">生效标签</span>
                <span class="tag0"></span>失效标签
              </div>
              <div class="">
                <el-popover
                  v-for="(x,ind) in box1Data.validList" :key="ind" v-if="ind<size.size0"
                  ref="popover"
                  placement="bottom"
                  width="200"
                  trigger="hover"
                  :content="x.REMARK">
                  <el-tag type="warning" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==1">{{x.TAG_NAME}}</el-tag>
                  <el-tag type="info" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==2">{{x.TAG_NAME}}</el-tag>
                </el-popover>

                <el-button type="text" size="small" @click="moreShow=true;size.size0=box1Data.validList.length+1" v-if="!moreShow&&box1Data.validList.length>6">查看更多 ></el-button>
                <el-button type="text" size="small" @click="moreShow=false;size.size0=6" v-if="moreShow">收起<</el-button>
              </div>

            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box1=!box1">
                标签详细信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box1">
                <div class="box1-content mb-9" v-for="(a,ind) in box1Data.particularsList" :key="ind" v-if="ind<size.size1">
                  <el-tag type="warning" size="small" v-if="a.operation_type==1">{{a.tag_name}}</el-tag>
                  <el-tag type="info" size="small" v-if="a.operation_type==2">{{a.tag_name}}</el-tag>

                  <div class="gc-box">
                    <span>标签描述：</span>{{a.tag_remar}}
                  </div>
                  <div class="gc-box">
                    <span>过程：</span>
                    <div class="gc-r-box">
                      <div class="step-box" v-for="(x,y) in a.list" :key="y">
                        <div class="step-time mr-5 tc-333">{{x.CREATETIME.slice(0,10)}}</div>
                        <div class="mr-15 step-icon">
                          <div class="step-dot"></div>
                          <div class="step-line"></div>
                        </div>
                        <ul class="step-content">
                          <li>
                            <span class="step-t">添加人：</span><span class="mr-30">{{x.USERNAME}}</span>
                            <span>添加状态：</span><span class="tc-o">{{x.OPERATION_TYPENAME}}</span>
                          </li>
                          <li>
                            <span class="step-t">原因：</span>
                            {{x.REMARK}}
                          </li>
                        </ul>
                      </div>
                      <el-button type="text" size="small" class="gc-more" v-if="">查看更多</el-button>
                    </div>
                  </div>
                </div>

                <div class="box1-more">

                  <el-button type="text" @click="size.size1=box1Data.particularsList.length+1" v-if="box1Data.particularsList.length>3&&size.size1==3">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size1=3" v-if="size.size1==box1Data.particularsList.length+1">收起 ︿</el-button>

                </div>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box2=!box2">
                命中模型信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box2">
                <div class="box2-content mb-9" v-for="(b,ind) in box2Data" :key="ind" v-if="ind<size.size2">
                  <div class="box2-t-box">
                    <span>{{b.modelName}}</span>
                    <el-button type="primary" plain size="small">模型相关案例</el-button>
                  </div>
                  <div class="gc-box">
                    <span>风险等级：</span> <el-rate :value="b.grade" disabled class="mt-5"></el-rate>
                  </div>

                  <div class="gc-box">
                    <span>模型描述：</span>{{b.modelDesc}}
                  </div>
                  <div class="gc-box">
                    <span>指标描述：</span>
                    <div class="">
                      {{b.targetDesc}}
                    </div>
                  </div>
                </div>

                <div class="box1-more">
                  <el-button type="text" @click="size.size2=box2Data.length+1" v-if="box2Data.length>3&&size.size2==3">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size2=3" v-if="size.size2==box2Data.length+1">收起 ︿</el-button>
                </div>
              </div>
            </div>
            <div class="pb-10">
              <div class="title-green hand mt-10" @click="box3=!box3">
                原指标名称信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box3">
                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>自动计算信息</span>
                  </div>
                  <el-row class="middle-msg-row2" :gutter="2">
                    <el-col :span="6" v-for="(c1,ind) in box3Data.autoTargetInfo" :key="ind" :class="{'redx':c1.ISHIT==1}">
                      <span>{{c1.TARGET_NAME}}：</span>
                      {{c1.TARGET_VALUE}}
                    </el-col>
                  </el-row>
                </div>
                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>手动计算信息</span>
                  </div>
                  <el-row class="middle-msg-row2" :gutter="2">
                    <el-col :span="6" v-for="(c2,ind) in box3Data.manualTargetInfo" :key="ind" :class="{'redx':c1.ISHIT==1}">
                      <span>{{c2.TARGET_NAME}}：</span>
                      {{c1.TARGET_VALUE}}
                    </el-col>

                  </el-row>
                </div>
                <!-- <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div> -->
              </div>
            </div>
          </div>
          <div class="ak-tab-pane" v-if="page==1">
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box4=!box4">
                核查策略 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box4">
                <!-- <el-button type="primary" plain size="small">模型相关案例</el-button> -->
                <div class="box2-content mb-9" v-for="(d1,ind) in box4Data.checkTacticsList" :key="ind" v-if="ind<size.size3">
                  <div class="gc-box">
                    <div><span class="b-dot"></span>{{d1.modelName}}：</div>
                    <div class="">
                      {{d1.model_describe}}
                    </div>
                  </div>
                </div>
                <div class="box1-more">
                  <el-button type="text" @click="size.size3=box4Data.checkTacticsList.length+1" v-if="box4Data.checkTacticsList.length>3&&size.size3==3">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size3=3" v-if="size.size3==box4Data.checkTacticsList.length+1">收起 ︿</el-button>
                </div>
                <div class="gc-box">
                  <div class="">
                    自定义内容：
                  </div>
                  <div class="">
                    <div class="" v-for="(d2,ind) in box4Data.listRiskCustom" :key="ind">
                      {{d2.content}} <el-button type="text" class="redx" @click="delListCustom1(d2.serial)">删除</el-button>
                    </div>
                    <div class="" v-for="(x,ind) in listRiskCustom" :key="ind">
                      {{x.content}} <el-button type="text" class="redx" @click="delListCustom(ind)">删除</el-button>
                    </div>
                  </div>
                </div>
                <div class="hc-box">
                  <el-input
                    :disabled="!operation_type"
                    class="mr-10"
                    type="textarea"
                    :rows="3"
                    v-model="addListCustom"
                    placeholder="请输入内容">
                  </el-input>
                  <el-button type="success" size="small" plain @click="addCustomFn" :disabled="!addListCustom">添加</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box5=!box5">
                指标录入 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box5" class="hc-box">
                <el-row align="center" :gutter="2" style="width:100%" class="mr-15">
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-for="(d3,ind) in box4Data.listRiskIndex" :key="ind">
                    <span class="input-text">{{d3.index_name}}：</span>
                    <el-input :disabled="!operation_type" placeholder="请输入内容" size="small" class="input-input mr-10" v-model="d3.index_value"></el-input>
                    <i v-if="operation_type" class="el-icon-close redx hand" @click="delRiskIndexInfo(d3.serial)"></i>
                  </el-col>
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item" v-for="(d3,ind) in checkList" :key="ind">
                    <span class="input-text">{{d3.index_name}}：</span>
                    <el-input placeholder="请输入内容" size="small" class="input-input mr-10" v-model="d3.index_value"></el-input>
                    <i class="el-icon-close redx hand" @click="delRiskIndexInfo0(d3.serial)"></i>
                  </el-col>
                </el-row>
                <el-button type="success" size="small" plain class="mb-6" :disabled="!operation_type" @click="getAddRiskIndexInfo">添加</el-button>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box6=!box6">
                附件 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box6">
                <div class="" v-for="(d4,ind) in box4Data.listRiskUpload" :key="ind">
                  <span class="mr-30">{{d4.upload_name}}</span>
                  <span class="mr-30 tc-999">上传人：{{d4.userName}}</span>
                  <span class="mr-30 tc-999">上传时间：{{d4.createTime}}</span>
                  <el-button v-if="operation_type" type="text" class="redx" @click="delFileInfo(d4.serial)">删除</el-button>
                  <el-button v-if="operation_type" type="text" ><a :href="d4.url_patch" class="green">下载</a></el-button>
                </div>
                <div class="" v-if="fileData">
                  <div class="" v-for="(x,ind) in fileData" :key="ind">
                    <span class="mr-30">{{x.name}}</span>

                  </div>
                </div>
                <label class="file" v-if="operation_type">
                  添加附件
                  <input type="file" name="" multiple="multiple" @change="uploadFile">
                </label>
                <!-- <button type="button" name="button" @click="upload">上传</button> -->
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box7=!box7">
                简要描述 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box7">
                <el-input
                  :disabled="!operation_type"
                  class="mr-10 mb-9"
                  type="textarea"
                  v-model="box4Data.riskDescRecordEntity.remark"
                  :rows="3"
                  placeholder="请输入描述意见">
                </el-input>
                <el-row align="center" :gutter="2">
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span class="mr-5">核查阶段 </span>
                    <el-select :disabled="!operation_type" v-model="box4Data.riskDescRecordEntity.check_stage" filterable clearable placeholder="请选择"  size="small" class="input-input">
                      <el-option label="1 - 前期核查" value="1"></el-option>
                      <el-option label="2 - 见面核查" value="2"></el-option>
                    </el-select>
                  </el-col>
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span  class="mr-5">核查结果 </span>
                    <el-select :disabled="!operation_type" v-model="box4Data.riskDescRecordEntity.check_result" filterable clearable placeholder="请选择"  size="small" class="input-input">
                      <el-option label="1 - 完全排除嫌疑" value="1"></el-option>
                      <el-option label="2 - 未能排除嫌疑扭转至口岸" value="2"></el-option>
                      <el-option label="3 - 未能排除嫌疑扭转至梅沙" value="3"></el-option>

                    </el-select>
                  </el-col>
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span  class="mr-5">流转至 </span>
                    <el-select :disabled="!operation_type" v-model="box4Data.riskDescRecordEntity.change_port" filterable clearable placeholder="请选择"  size="small" class="input-input">
                      <el-option
                        v-for="item in airport"
                        v-if="item.DEPT_CODE"
                        :key="item.DEPT_CODE"
                        :label="item.DEPT_CODE+' - '+item.DEPT_JC"
                        :value="item.DEPT_CODE">
                      </el-option>
                    </el-select>
                  </el-col>

                </el-row>
              </div>
            </div>
            <div class="boder1 pb-10" v-if="operation_type">
              <div class="hc-btn">
                <el-button type="info" size="small" class="mr-20">返回</el-button>

                <el-button type="success" size="small" @click="saveRiskDescRecordInfo">确定</el-button>
              </div>

            </div>
            <div class="pb-10">
              <div class="title-green mt-10">
                本次风评记录
              </div>
              <div class="gc-box f-14" v-for="(d5,ind) in box4Data.listDescRecord" :key="ind" v-if="ind<size.size8">
                <div class="mr-5">{{ind+1}}</div>
                <div class="">
                  <div class="">
                    <span class="mr-30">核查时间：{{d5.createTime}}</span><span>核查人：{{d5.userName}}</span>
                  </div>
                  <div class="">
                    操作类型：{{d5.operation_typeName}}
                  </div>
                  <div class="gc-box">
                    <div>核查过程：</div>
                    <div class="">
                      {{d5.course_typeName}}
                    </div>
                  </div>
                  <div class="">
                    核查阶段：{{d5.check_stageName}}
                  </div>
                  <div class="">
                    核查结果：{{d5.check_resultName}}
                  </div>
                </div>
              </div>

              <div class="box2-more">
                <el-button type="text" @click="size.size8=box4Data.listDescRecord.length+1" v-if="box4Data.listDescRecord.length>3&&size.size8==3">展开更多 ﹀</el-button>
                <el-button type="text" @click="size.size8=3" v-if="size.size8==box4Data.listDescRecord.length+1">收起 ︿</el-button>

              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog title="添加指标" :visible.sync="czDialogVisible" width="640px">
      <el-checkbox-group v-model="checkList" class="mb-20">
       <el-checkbox :label="x"  v-for="(x,ind) in box5Data" :key="ind">{{x.index_name}}</el-checkbox>
     </el-checkbox-group>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="czSave" size="small">确认</el-button>
        <el-button type="warning" @click="czDialogVisible=false" size="small">取消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      user:null,
      operation_type:null,
      delIndex:'',
      airport:null,
      page:0,
      page0Data:{},
      moreShow:false,
      box1:true,
      box1Data:{},
      box2:true,
      box2Data:[],
      box3:true,
      box3Data:{},
      box4:true,
      box4Data:{},
      box5:true,
      box5Data:{},
      box6:true,
      box7:true,
      size:{size0:6,size1:3,size2:3,size3:3,size8:3},
      serial:null,
      fileData:null,
      addListCustom:null,
      listRiskCustom:[],
      czDialogVisible:false,
      checkList:[],
      fuji:true
    }
  },
  mounted(){
    this.queryAirport();
  },
  activated(){

    this.getUers();
    this.page=this.$route.query.page;
    this.operation_type=this.$route.query.operation_type;
    this.serial=this.$route.query.serial;
    if(this.page==0){
      this.getRiskIapiInfo();
      this.getHisModelInfo();
      this.getOperationalTargetInfo();
    }else if(this.page==1){
      this.getRiskDescRecordInfo();
    }
  },
  watch:{
    page:function(val){
      if(val==0){
        this.getRiskIapiInfo();
        this.getHisModelInfo();
        this.getOperationalTargetInfo();
      }else if(val==1){
        this.getRiskDescRecordInfo();

      }
    }
  },
  methods:{
    getUers(){
      this.$api.post('/manage-platform/sysUserInfoController/querySysUserInfo',{},
       r => {
        console.log(r)
        this.user=r.data;
      })
    },
    queryAirport(){
      this.$api.post('/manage-platform/riskEventController/getDeptInfo',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
    // 预报信息
    getRiskIapiInfo(){
      let p={
        "eventSerial": this.serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/getRiskIapiInfo',p,
       r => {
         this.page0Data=r.data;
         this.getRiskEventTagInfo(this.page0Data.passportno,this.page0Data.nationality)
      })
    },
    // 当前事件标签及标签详情信息
    getRiskEventTagInfo(passportno,nationality){
      let p={
        "passportno":passportno,
	      "nationality":nationality
      }
      this.$api.post('/manage-platform/riskEventWarningController/getRiskEventTagInfo',p,
       r => {
         this.box1Data=r.data;
      })
    },
    // 命中模型信息
    getHisModelInfo(){
      let p={
        "eventSerial": this.serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/getHisModelInfo',p,
       r => {
         this.box2Data=r.data;
      })
    },
    // 获取运算指标信息
    getOperationalTargetInfo(){
      let p={
        "eventSerial": this.serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/getOperationalTargetInfo',p,
       r => {
         this.box3Data=r.data
      })
    },
    // page=1
    // 获取简要描述/核查阶段/核查结果/流转及记录过程
    getRiskDescRecordInfo(){
      let p={
        "eventSerial": this.serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/getRiskDescRecordInfo',p,
       r => {
         this.box4Data=r.data;
         this.box4Data.riskDescRecordEntity.operation_type=this.operation_type;
      })
    },
    // 添加自定义
    addCustomFn(){
      this.addListCustom={
        content:this.addListCustom,
        // type:1
      }
      this.listRiskCustom.push(this.addListCustom);
      this.addListCustom='';
    },
    // 删除自定义
    delListCustom(ind){
      this.listRiskCustom.splice(ind,1)
    },
    // 删除自定义真的
    delListCustom1(serial){
      let p={
        "serial": serial,
        "userId": this.user.userId
      }
      if(this.delIndex.indexOf("1,")==-1){
        this.delIndex+="1,"
      }

      this.$api.post('/manage-platform/riskEventWarningController/updateRiskCustomInfo ',p,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，删除成功！',
             type: 'success'
           });
           this.getRiskDescRecordInfo();
         }
      })
    },
    // 指标弹窗
    getAddRiskIndexInfo(){
      let p={
        "eventSerial": this.serial
      }
      this.czDialogVisible=true;
      this.$api.post('/manage-platform/riskEventWarningController/getAddRiskIndexInfo',p,
       r => {
         this.box5Data=r.data.listRiskTarget;
         let arr=this.box5Data;
         let that=this;
         for(var i =0;i<arr.length;i++){
           arr[i].index_name=arr[i].TARGET_NAME
         }
      })
    },
    czSave(){
      console.log(this.checkList)
    },
    // 删除指标信息
    delRiskIndexInfo(serial){
      let p={
        "serial": serial,
        "userId": this.user.userId
      }
      if(this.delIndex.indexOf("2,")==-1){
        this.delIndex+="2,"
      }
      this.$api.post('/manage-platform/riskEventWarningController/delRiskIndexInfo',p,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，删除成功！',
             type: 'success'
           });
           this.getRiskDescRecordInfo();
         }
      })
    },
    // 获取要上传的文件
    uploadFile(event){
      this.fileData=event.target.files;
      console.log(event);
    },
    // 上传附件
    upload(serial){
      console.log("this.fileData",this.fileData)
      var formData = new FormData();
      let arr=this.fileData;

      for(var i=0;i<arr.length;i++){
        formData.append("file",arr[i]);
      }
      formData.append("eventSerial",this.serial);
      formData.append("userId",this.user.userId);
      console.log(formData)
      let p=formData
      console.log("p----------",p)

      this.$api.post('/manage-platform/riskEventWarningController/upload',p,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，上传成功！',
             type: 'success'
           });
           if(this.delIndex.indexOf("3,")==-1){
             this.delIndex+="3,"
           }
           // this.getRiskDescRecordInfo();
           this.fileData=null;
           return true;
         }else {
           this.fileData=null;
           return false;
         }
      },e => {

      },{'Content-Type': 'multipart/form-data'})
    },
    // 删除附件
    delFileInfo(serial){
      let p={
        "serial": serial,
        "delUser": this.user.userId
      }
      if(this.delIndex.indexOf("3,")==-1){
        this.delIndex+="3,"
      }
      this.$api.post('/manage-platform/riskEventWarningController/delFileInfo',p,
       r => {
         if(r.success){
           this.$message({
             message: '恭喜你，删除成功！',
             type: 'success'
           });
           this.getRiskDescRecordInfo();
         }
      })
    },
    // 下载
    download(serial){
      let p={
        "serial": serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/download',p,
       r => {

      })
    },
    // 保存校验描述/核查阶段/结果/流转
    saveRiskDescRecordInfo(){
      if(this.fileData){
        this.upload();
      }else{

      }
      console.log(this.upload())
      if(this.listRiskCustom.length>0&&is.delIndex.indexOf("1,")==-1){
        this.delIndex+="1,"
      }
      if(this.checkList.length>0&&is.delIndex.indexOf("2,")==-1){
        this.delIndex+="2,"
      }
      let p={
        custom:this.listRiskCustom,
        descRecord:this.box4Data.riskDescRecordEntity,
        addIndex:this.checkList,
        userId:this.user.userId,
        eventSerial: this.serial,
        delIndex:this.delIndex,
      };
      this.$api.post('/manage-platform/riskEventWarningController/saveRiskDescRecordInfo',p,
       r => {
         // this.box5Data=r.data;
         if(r.success){
           this.$message({
             message: '恭喜你，保存成功！',
             type: 'success'
           });
           this.getRiskDescRecordInfo();
           this.listRiskCustom=[];
         }
      })
    },
  }
}
</script>

<style scoped>
.middle{
  color: #666666;
}
.bjsj-l{
  border: 1px #dddddd solid;
  border-radius: 3px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.middle-msg-row span{
  display: inline-block;
  width: 85px;
  text-align: right;
}
.middle-msg-row2 span{
  /* display: inline-block;
  width: 175px;
  text-align: right; */
}
.ak-tip{
  font-size: 14px;
  color: #999;
}
.tag1{
  display: inline-block;
  width: 16px;
  height: 12px;
  background:rgba(230, 162, 60, 0.9);
  border-radius: 4px;
  margin: 1px;
  vertical-align: middle;
}
.tag0{
  display: inline-block;
  width: 16px;
  height: 12px;
  background:rgba(144, 147, 153, 0.6);
  border-radius: 4px;
  margin: 1px;
  vertical-align: middle;
}
.box1-more{
  background: #eef9ff;
  text-align: center;
}
.box2-more{
  text-align: center;

}
.box2-t-box{
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
.box2-t-box{
  color: #333;
  font-weight: bold;
}
.gc-box{
  display: flex;
}
.hc-box{
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
}
.hc-btn{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0 30px;
}
.gc-r-box{
  position: relative;
}
.gc-more{
  position: absolute;
  bottom: 5px;
  left: 30px;
}
.gc-box>span{
  width: 85px;
  text-align: right;
}
.b-dot{
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #2a81ce;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
  margin-bottom: 4px;
}
.step-box{
  display: flex;
  /* align-items: center; */
}
.step-icon{
  position: relative;
  padding: 5px 5px 0;
}
.step-dot{
  width: 12px;
  height: 12px;
  background: #35acff;
  border-radius: 50%;
  position: absolute;
  left: 0px;
}
.step-line{
  width: 2px;
  height: 75px;
  background: #35acff;
  position: absolute;
  /* top: 0; */
}
/* .step-line:last-of-type{
  height: 60px;
} */
.step-content{
  /* border-left: 2px solid #35acff; */
  height: 75px;
}
/* .step-content:last-of-type{
  height: 60px;
} */
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
</style>
