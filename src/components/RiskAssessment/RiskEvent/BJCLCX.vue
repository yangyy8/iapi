<template lang="html">
  <div class="bjsjck">
    <div class="top mb-2">
      <el-button type="warning" size="small" class="mr-20" @click="$router.go(-1)">返回</el-button>
      事件编号：{{serial}}
    </div>
    <div class="middle">
      <el-row :gutter="15">
        <el-col :span="3">
          <div class="bjsj-l">
            <img :src="imgURL" alt="" style="width:100%;">
            <span class="mb-2">综合风险等级</span>
            <el-rate :value="parseInt($route.query.grade||box2Data[0].grade)" disabled class="mb-9"></el-rate>
            <el-button type="primary" size="small" class="mb-9" style="width:100%" @click="$router.push({name:'DZDA',query:{nationality:page0Data.nationality,passportno:page0Data.passportno,grade:$route.query.grade||box2Data[0].grade,type:2}})">电子档案</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">综合查询</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">照片比对</el-button>
            <el-button type="success" size="small" style="width:100%"  @click="openGdTc(page0Data)">事件追加</el-button>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="" id="printMe">
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
                  <span>初始上机地：</span>
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
                  <span>最终下机地：</span>
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
                  v-for="(x,ind) in box1Data.validList" :key="ind" v-if="x.REMARK&&ind<size.size0"
                  placement="bottom"
                  width="200"
                  trigger="hover"
                  :content="x.REMARK">
                  <el-tag type="warning" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==1">{{x.TAG_NAME}}</el-tag>
                  <el-tag type="info" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==2">{{x.TAG_NAME}}</el-tag>
                </el-popover>
                <el-tag type="warning"  v-for="(x,ind) in box1Data.validList" :key="ind" v-if="!x.REMARK&&x.OPERATION_TYPE==1&&ind<size.size0" size="small" class="mr-5">{{x.TAG_NAME}}</el-tag>
                <el-tag type="info"   v-for="(x,ind) in box1Data.validList" :key="ind" v-if="!x.REMARK&&x.OPERATION_TYPE==2&&ind<size.size0" size="small" class="mr-5">{{x.TAG_NAME}}</el-tag>
                <el-button type="text" size="small" @click="moreShow=true;size.size0=box1Data.validList.length" v-if="!moreShow&&box1Data.validList.length>6">查看更多 ></el-button>
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
                      <div class="step-box" v-for="(x,y) in a.list" :key="y" v-if="y<a.TAGSIZE">
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

                      <el-button type="text" size="small" class="gc-more" @click="a.TAGSIZE=a.list.length+3" v-if="a.list.length>2&&a.TAGSIZE==2">查看更多</el-button>
                      <el-button type="text" size="small" class="gc-more" @click="a.TAGSIZE=2" v-if="a.TAGSIZE==a.list.length+3">收起</el-button>

                    </div>
                  </div>
                </div>

                <div class="box1-more">
                  <el-button type="text" @click="size.size1=box1Data.particularsList.length+4" v-if="box1Data.particularsList.length>3&&size.size1==3">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size1=3" v-if="size.size1==box1Data.particularsList.length+4">收起 ︿</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box2=!box2">
                命中模型信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box2">
                <div class="box2-content mb-9" v-for="(b,ind) in box2Data"  v-if="ind<size.size2">
                  <div class="box2-t-box">
                    <span>{{b.modelName}}</span>
                    <el-button type="primary" plain size="small" @click="getModelCaseInfo(b.model_code,b.model_version)">模型相关案例</el-button>
                  </div>
                  <div class="gc-box">
                    <span>风险等级：</span> <el-rate :value="parseInt(b.grade)" disabled class="mt-5"></el-rate>
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
                  <el-button type="text" @click="size.size2=box2Data.length+4" v-if="box2Data.length>3&&size.size2==3">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size2=3" v-if="size.size2==box2Data.length+4">收起 ︿</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box3=!box3">
                原指标名称信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box3">
                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>自动计算信息</span>
                  </div>
                  <el-row class="middle-msg-row2" :gutter="2">
                    <el-col :span="6" v-for="(c1,ind) in box3Data.autoTargetInfo" :key="ind" v-if="ind<size.size301">
                      <el-tooltip effect="light" :content="c1.TARGET_NAME" placement="top-start" v-if="c1.TARGET_NAME">
                        <span class="msg-t" :class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}">{{c1.TARGET_NAME}}</span>
                      </el-tooltip>
                      <span class="msg-t" :class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}" v-else>{{c1.TARGET_NAME}}</span>
                      :
                      <el-tooltip effect="light" :content="c1.TARGET_VALUE" placement="top-start" v-if="c1.TARGET_VALUE">
                        <span class="msg-text" :class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}">{{c1.TARGET_VALUE}}</span>
                      </el-tooltip>
                      <span class="msg-text" :class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}" v-else>{{c1.TARGET_VALUE}}</span>

                    </el-col>


                  </el-row>
                  <div class="box1-more">
                    <el-button type="text" @click="size.size301=box3Data.autoTargetInfo.length+17" v-if="box3Data&&box3Data.autoTargetInfo.length>16&&size.size301==16">展开更多 ﹀</el-button>
                    <el-button type="text" @click="size.size301=16" v-if="size.size301==box3Data.autoTargetInfo.length+17">收起 ︿</el-button>
                  </div>
                </div>

                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>手动计算信息</span>
                  </div>
                  <el-row class="middle-msg-row2" :gutter="2">
                    <el-col :span="6" v-for="(c2,ind) in box3Data.manualTargetInfo" :key="ind"  v-if="ind<size.size302">
                      <el-tooltip effect="light" :content="c2.TARGET_NAME" placement="top-start" v-if="c2.TARGET_NAME">
                        <span class="msg-t" :class="{'tc-999':!c2.TARGET_VALUE,'redx':c2.ISHIT==1}">{{c2.TARGET_NAME}}</span>
                      </el-tooltip>
                      <span class="msg-t" :class="{'tc-999':!c2.TARGET_VALUE,'redx':c2.ISHIT==1}" v-else>{{c2.TARGET_NAME}}</span>
                      :
                      <el-tooltip effect="light" :content="c2.TARGET_VALUE" placement="top-start" v-if="c2.TARGET_VALUE">
                        <span class="msg-text" :class="{'tc-999':!c2.TARGET_VALUE,'redx':c2.ISHIT==1}">{{c2.TARGET_VALUE}}</span>
                      </el-tooltip>
                      <span class="msg-text" :class="{'tc-999':!c2.TARGET_VALUE,'redx':c2.ISHIT==1}" v-else>{{c2.TARGET_VALUE}}</span>

                    </el-col>

                  </el-row>
                  <div class="box1-more">
                    <el-button type="text" @click="size.size302=box3Data.manualTargetInfo.length+17" v-if="box3Data&&box3Data.manualTargetInfo.length>16&&size.size302==16">展开更多 ﹀</el-button>
                    <el-button type="text" @click="size.size302=16" v-if="size.size302==box3Data.manualTargetInfo.length+17">收起 ︿</el-button>
                  </div>
                </div>

              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box4=!box4">
                 核查信息<i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box4">
                <!-- <el-button type="primary" plain size="small">模型相关案例</el-button> -->

                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>核查策略</span>
                  </div>
                  <div class="box2-content mb-9" v-for="(d1,ind) in box4Data.checkTacticsList" v-if="ind<size.size4">
                    <div>
                      <div><span class="b-dot"></span>{{d1.modelName}}：</div>
                      <div class="gc-box">
                        <div class="">
                          前期核查策略：
                        </div>
                        <div style="width:90%">
                          {{d1.strategy}}
                        </div>
                      </div>
                      <div class="gc-box">
                        <div class="">
                          见面核查策略：
                        </div>
                        <div style="width:90%">
                          {{d1.strategy_spot}}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div class="box1-more">
                  <el-button type="text" @click="size.size4=box4Data.checkTacticsList.length+4" v-if="box4Data.checkTacticsList.length>3&&size.size4==3">展开更多 ﹀</el-button>
                  <el-button type="text" @click="size.size4=3" v-if="size.size4==box4Data.checkTacticsList.length+4">收起 ︿</el-button>
                </div>
                <div class="boder1 gc-box pb-10">
                  <div class="">
                    自定义内容：
                  </div>
                  <div class="">
                    <div class="" v-for="(d2,ind) in box4Data.listRiskCustom" :key="ind">
                      {{d2.content}}
                    </div>

                  </div>
                </div>
                <div class="box2-content boder1 pb-10">
                  <div class="box2-t-box">
                    <span>指标录入</span>
                  </div>
                  <div class="gc-box wrap">
                    <div class="mr-20"  v-for="(d3,ind) in box4Data.listRiskIndex">
                      <span class="tc-333">{{d3.index_name}}：</span>
                      {{d3.index_value}}
                    </div>
                  </div>
                </div>
                <div class="box2-content boder1 pb-10">
                  <div class="box2-t-box">
                    <span>附件</span>
                  </div>
                  <div class="">
                    <div class="" v-for="(d4,ind) in box4Data.listRiskUpload" :key="ind">
                      <span class="mr-30">{{d4.upload_name}}</span>
                      <span class="mr-30 tc-999">上传人：{{d4.userName}}</span>
                      <span class="mr-30 tc-999">上传时间：{{d4.createTime}}</span>
                      <el-button type="text" ><a :href="d4.url_patch" class="green">下载</a></el-button>
                    </div>
                  </div>
                </div>
                <div class="box2-content">
                  <div class="box2-t-box">
                    <span>简要描述</span>
                  </div>
                  <div class="">
                    <div class="">
                      {{box4Data.riskDescRecordEntity.remark}}
                    </div>
                    <el-row align="center" :gutter="2">
                      <el-col  :sm="24" :md="12" :lg="8" >
                        <span class="mr-5">核查阶段：</span>
                        <span class="tc-333">{{box4Data.riskDescRecordEntity.check_stageName}}</span>
                      </el-col>
                      <el-col  :sm="24" :md="12" :lg="8" >
                        <span  class="mr-5">核查结果： </span>
                        <span class="tc-333">{{box4Data.riskDescRecordEntity.check_resultName}}</span>
                      </el-col>
                      <el-col  :sm="24" :md="12" :lg="8"  >
                        <span  class="mr-5">流转至： </span>
                      <span class="tc-333">{{box4Data.riskDescRecordEntity.change_portName}}</span>
                      </el-col>

                    </el-row>
                  </div>
                </div>
              </div>

            </div>

            <div class="boder1 pb-10">
              <div class="title-green mt-10">
                本次风评记录
              </div>
              <el-table
                :data="box4Data.listDescRecord"
                class="ak-table1"
                :class="{'ak-t1':size.size8==true,'ak-t2':size.size8==false}"
                style="width: 100%">
                <el-table-column
                  label="序号"
                  type="index"
                  width="70">
                </el-table-column>
                <el-table-column
                  label="核查时间"
                  prop="createTime">
                </el-table-column>
                <el-table-column
                  label="核查人"
                  prop="userName">
                </el-table-column>
                <el-table-column
                  label="操作类型"
                  prop="operation_typeName">
                </el-table-column>
                <el-table-column
                  label="核查过程"
                  prop="course_typeName">
                </el-table-column>
                <el-table-column
                  label="核查阶段"
                  prop="check_stageName">
                </el-table-column>
                <el-table-column
                  label="核查结果"
                  prop="check_resultName">
                </el-table-column>
                <el-table-column
                  label="详情"
                  prop="xq"
                  :show-overflow-tooltip="true">
                </el-table-column>
              </el-table>
              <div class="box2-more" v-if="box4Data.listDescRecord.length>5">
                <el-button type="text" @click="size.size8=false" v-if="size.size8">展开更多 ﹀</el-button>
                <el-button type="text" @click="size.size8=true" v-if="!size.size8">收起 ︿</el-button>
              </div>
            </div>
            <div class=" pb-10">
              <div class="hc-btn">
                <el-button type="info" size="small" class="mr-20" @click="$router.go(-1)">返回</el-button>

                <el-button type="primary" size="small"  @click="getPdf(1)">导出</el-button>
              </div>

            </div>
          </div>

        </el-col>
      </el-row>
    </div>
    <GDTC :gtitle="'事件追加'" :gvisible="gdDialogVisible" :garr="checkeditem" :gtype="'2'" @gclose="gclose"></GDTC>
    <el-dialog title="模型相关案例描述" :visible.sync="modelDialogVisible" width="640px">
      <div class="mb-20">
        <div class="" v-for="(x,ind) in modeldec" >
          <p v-if="x.CASE_NARRATION">{{x.CASE_NARRATION}}</p>
          <p v-else>该模型没有案例描述！</p>
        </div>

      </div>

      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="czSave" size="small">确认</el-button>
        <el-button type="warning" @click="czDialogVisible=false" size="small">取消</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import GDTC from './GDTC'
import imgUrl from '../../../assets/img/bp_ap/ph_s.png'

export default {
  components:{GDTC},

  data(){
    return{
      serial:'',
      htmlTitle: '页面信息',
      moreShow:false,
      box1:true,
      box2:true,
      box3:true,
      box4:true,
      box5:true,
      box6:true,
      box7:true,
      size:{size0:6,size1:3,size2:3,size301:16,size302:16,size4:3,size8:true},
      page0Data:{},
      box1Data:{validList:[],particularsList:[]},
      box2Data:[],
      box3Data:{autoTargetInfo:[],manualTargetInfo:[]},
      box4Data:{checkTacticsList:[],listDescRecord:[],listRiskCustom:[],listRiskUpload:[],listRiskIndex:[],riskDescRecordEntity:{}},

      gdDialogVisible:false,
      checkeditem:null,
      modelDialogVisible:false,
      modeldec:null,
      imgURL:imgUrl,
    }
  },
  activated(){
    this.serial=this.$route.query.serial;
    this.getRiskIapiInfo();
    this.getHisModelInfo();
    this.getRiskDescRecordInfo();
    this.getOperationalTargetInfo();
  },
  methods:{
    // 预报信息
    getRiskIapiInfo(){
      let p={
        "eventSerial": this.serial
      }
      this.$api.post('/manage-platform/riskEventWarningController/getRiskIapiInfo',p,
       r => {
         this.page0Data=r.data;
         this.getRiskEventTagInfo(this.page0Data.passportno,this.page0Data.nationality);
         this.getPhotoInf(r.data.passportno,r.data.nationality,r.data.birthday,r.data.name);

      })
    },
    getPhotoInf(passportno,nationality,birthday,name){
      let p={}
      if(nationality=="CHN"){
        p={
          "type": 'photo',
          "nationality": nationality,
          "passportno": passportno,
        }
      }else{
        p={
          "passportno": passportno,
          "nationality": nationality,
          "birthday": birthday,
          "name": name,
          "type": 'photo',
        }
      }

      this.$api.post('/manage-platform/riskRecordController/getPhotoInf',p,
       r => {
         console.log(r)
         this.imgURL=r.data.url||imgUrl;
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
    openGdTc(item){
      this.checkeditem=item;
      this.gdDialogVisible=true;
    },
    gclose(data){
      console.log(data)
      this.gdDialogVisible=data;
    },
    // 模型案例
    getModelCaseInfo(code,ver){
      let p={
        "model_code":code,
        "model_version":ver

      }
      this.$api.post('/manage-platform/riskEventWarningController/getModelCaseInfo',p,
       r => {
         this.modelDialogVisible=true;
         this.modeldec=r.data
      })
    }
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
  width: 107px;
  text-align: right;
}
.middle-msg-row2 .msg-t{

  display: inline-block;
  vertical-align: middle;
  max-width: 35%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
  /* text-align: right; */
}
.middle-msg-row2 .msg-text{
  display: inline-block;
  vertical-align: middle;
  max-width: 65%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
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
.wrap{
  flex-wrap: wrap;
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
</style>
