<template lang="html">
  <div class="bjsjck">
    <div class="top mb-2">
      事件编号：{{serial}}(客户提供唯一编码业务或方法)
    </div>
    <div class="middle">
      <el-row :gutter="15">
        <el-col :span="3">
          <div class="bjsj-l">
            <img src="../../../assets/img/bp_ap/ph_s.png" alt="" style="width:100%;">
            <span class="mb-2">综合风险等级</span>
            <el-rate :value="3" disabled class="mb-9"></el-rate>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">电子归档</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">综合查询</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">照片比对</el-button>
            <el-button type="success" size="small" style="width:100%">事件归档</el-button>
          </div>
        </el-col>
        <el-col :span="21">

          <div class="">
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
                  {{page0Data.passportType}}
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
                  v-for="(x,ind) in box1Data.validList" :key="ind"
                  ref="popover"
                  placement="bottom"
                  width="200"
                  trigger="hover"
                  :content="x.REMARK">
                  <el-tag type="warning" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==1">{{x.TAG_NAME}}</el-tag>
                  <el-tag type="info" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==2">{{x.TAG_NAME}}</el-tag>
                </el-popover>
                <el-button type="text" size="small" @click="moreShow=true" v-if="!moreShow">查看更多 ></el-button>
                <el-button type="text" size="small" @click="moreShow=false" v-if="moreShow">收起<</el-button>
              </div>

            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box1=!box1">
                标签详细信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box1">
                <div class="box1-content mb-9" v-for="(a,ind) in box1Data.particularsList" :key="ind">
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
                            <span class="step-t">添加人：</span><span class="mr-30">{{x.USERID}}</span>
                            <span>添加状态：</span><span class="tc-o">{{x.ADD_TAGTYPE}}</span>
                          </li>
                          <li>
                            <span class="step-t">原因：</span>
                            {{x.TAG_REMAR}}
                          </li>
                        </ul>
                      </div>

                      <el-button type="text" size="small" class="gc-more">查看更多</el-button>
                    </div>
                  </div>
                </div>

                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box2=!box2">
                命中模型信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box2">
                <div class="box2-content mb-9" v-for="b in box2Data" >
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
                  <el-button type="text">展开更多 ﹀</el-button>
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
                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
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
                  <div class="box2-content mb-9" v-for="d1 in box4Data.checkTacticsList">
                    <div class="gc-box">
                      <div><span class="b-dot"></span>{{d1.modelName}}：</div>
                      <div class="">
                        {{d1.model_describe}}
                      </div>
                    </div>
                  </div>

                </div>
                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
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
                <el-button type="text" @click="size.size8=size.size8+5">展开更多 ﹀</el-button>
              </div>
            </div>
            <div class=" pb-10">
              <div class="hc-btn">
                <el-button type="info" size="small" class="mr-20">返回</el-button>

                <el-button type="primary" size="small">导出</el-button>
              </div>

            </div>
          </div>

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      moreShow:false,
      box1:true,
      box2:true,
      box3:true,
      box4:true,
      box5:true,
      box6:true,
      box7:true,
      size:{size8:5},
      page0Data:{},
      box1Data:{},
      box2Data:[],
      box3Data:[],
      box4Data:[],
    }
  },
  activated(){
    this.serial=this.$route.query.serial;
    this.getRiskIapiInfo();
    this.getHisModelInfo();
    this.getRiskDescRecordInfo();
    console.log("ffff")
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
