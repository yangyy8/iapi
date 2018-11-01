<template lang="html">
  <div class="bjsjck">
    <div class="top mb-2">
      事件编号：{{serial}}(客户提供唯一编码业务或方法)
    </div>
    <div class="middle">
      <el-row :gutter="10">
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
          <div class="ak-tab">
            <div class="ak-tabs">
              <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="page=0">
                风评信息
              </div>
              <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="page=1;">
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
                <el-tag type="warning" size="small" class="mr-5" v-for="(x,ind) in box1Data" :key="ind" v-if="x.OPERATION_TYPE==1">{{x.TAG_NAME}}</el-tag>
                <el-tag type="info" size="small" class="mr-5" v-for="(x,ind) in box1Data" :key="ind" v-if="x.OPERATION_TYPE==2">{{x.TAG_NAME}}</el-tag>

                <el-button type="text" size="small" @click="moreShow=true" v-if="!moreShow">查看更多 ></el-button>
                <el-button type="text" size="small" @click="moreShow=false" v-if="moreShow">收起<</el-button>
              </div>

            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box1=!box1">
                标签详细信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box1">
                <div class="box1-content mb-9">
                  <el-tag type="warning" size="small">维吾尔族人员</el-tag>
                  <div class="gc-box">
                    <span>标签描述：</span>外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员
                  </div>
                  <div class="gc-box">
                    <span>过程：</span>
                    <div class="gc-r-box">
                      <div class="step-box">
                        <div class="step-time mr-5 tc-333">2018-09-21</div>
                        <div class="mr-15 step-icon">
                          <div class="step-dot"></div>
                          <div class="step-line"></div>
                        </div>
                        <ul class="step-content">
                          <li>
                            <span class="step-t">审批人：</span><span class="mr-30">李先生</span>
                            <span>审批结果：</span><span class="tc-o">生效</span>
                          </li>
                          <li>
                            <span class="step-t">原因：</span>
                            经过查询，因为什么什么什么什么
                          </li>
                        </ul>
                      </div>
                      <div class="step-box">
                        <div class="step-time mr-5 tc-333">2018-09-21</div>
                        <div class="mr-15 step-icon">
                          <div class="step-dot"></div>
                          <div class="step-line"></div>
                        </div>
                        <ul class="step-content">
                          <li>
                            <span class="step-t">审批人：</span><span class="mr-30">李先生</span>
                            <span>审批结果：</span><span class="tc-o">生效</span>
                          </li>
                          <li>
                            <span class="step-t">原因：</span>
                            经过查询，因为什么什么什么什么
                          </li>
                        </ul>
                      </div>
                      <el-button type="text" size="small" class="gc-more">查看更多</el-button>
                    </div>
                  </div>
                </div>
                <div class="box1-content mb-9">
                  <el-tag type="info" size="small">维吾尔族人员</el-tag>
                  <div class="gc-box">
                    <span>标签描述：</span>外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员
                  </div>
                  <div class="gc-box">
                    <span>过程：</span>
                    <div class="gc-r-box">
                      <div class="step-box">
                        <div class="step-time mr-5 tc-333">2018-09-21</div>
                        <div class="mr-15 step-icon">
                          <div class="step-dot"></div>
                          <div class="step-line"></div>
                        </div>
                        <ul class="step-content">
                          <li>
                            <span class="step-t">审批人：</span><span class="mr-30">李先生</span>
                            <span>审批结果：</span><span class="tc-o">生效</span>
                          </li>
                          <li>
                            <span class="step-t">原因：</span>
                            经过查询，因为什么什么什么什么
                          </li>
                        </ul>
                      </div>
                      <div class="step-box">
                        <div class="step-time mr-5 tc-333">2018-09-21</div>
                        <div class="mr-15 step-icon">
                          <div class="step-dot"></div>
                          <div class="step-line"></div>
                        </div>
                        <ul class="step-content">
                          <li>
                            <span class="step-t">审批人：</span><span class="mr-30">李先生</span>
                            <span>审批结果：</span><span class="tc-o">生效</span>
                          </li>
                          <li>
                            <span class="step-t">原因：</span>
                            经过查询，因为什么什么什么什么
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
                    <el-col :span="6" class="tc-999">
                      <span>旅客户籍行政区划：</span>
                      是
                    </el-col>
                    <el-col :span="6" class="tc-999">
                      <span>旅客身份证号：</span>
                      是
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
                    <el-col :span="6" class="tc-999">
                      <span>入境计划停留时长：</span>
                      A1311441
                    </el-col>
                    <el-col :span="6" class="tc-999">
                      <span>出境计划前往国：</span>
                      是
                    </el-col>
                    <el-col :span="6" class="tc-999">
                      <span>出境航班：</span>
                      是
                    </el-col>
                    <el-col :span="6" class="tc-999">
                      <span>是否前往小商品集散地：</span>
                      是
                    </el-col>

                  </el-row>
                </div>
                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div>
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
                <div class="box2-content mb-9">
                  <div class="gc-box">
                    <div><span class="b-dot"></span>涉疆人员模型：</div>
                    <div class="">
                      外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员<br/>
                      外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员<br/>
                    </div>
                  </div>
                </div>
                <div class="box2-content mb-9" v-for="d1 in box4Data.checkTacticsList">
                  <div class="gc-box">
                    <div><span class="b-dot"></span>{{d1.modelName}}：</div>
                    <div class="">
                      {{d1.model_describe}}
                    </div>
                  </div>
                </div>
                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div>
                <div class="gc-box">
                  <div class="">
                    自定义内容：
                  </div>
                  <div class="">
                    <div class="">
                      人物描写的运用很普通，人物描写的母的是刻画人物描写的运用很普通 <el-button type="text" class="redx">删除</el-button>
                    </div>
                    <div class="" v-for="d2 in box4Data.listRiskCustom">
                      {{d2.CONTENT}} <el-button type="text" class="redx">删除</el-button>
                    </div>
                  </div>
                </div>
                <div class="hc-box">
                  <el-input
                    class="mr-10"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容">
                  </el-input>
                  <el-button type="success" size="small" plain>添加</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box5=!box5">
                指标录入 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box5" class="hc-box">
                <div class="input-item mr-30">
                  <span class="input-text">出境航班：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </div>
                <el-button type="success" size="small" plain class="mb-6">添加</el-button>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box6=!box6">
                附件 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box6">

                <el-button type="primary" size="small" plain>添加附件</el-button>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box7=!box7">
                简要描述 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box7">
                <el-input
                  class="mr-10 mb-9"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入描述意见">
                </el-input>
                <el-row align="center" :gutter="2">
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span class="mr-5">核查阶段 </span>
                    <el-select  filterable clearable placeholder="请选择"  size="small" class="input-input">
                      <el-option label="前期核查" value="1"></el-option>
                    </el-select>
                  </el-col>
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span  class="mr-5">核查结果 </span>
                    <el-select  filterable clearable placeholder="请选择"  size="small" class="input-input">
                      <el-option label="前期核查" value="1"></el-option>
                    </el-select>
                  </el-col>
                  <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                    <span  class="mr-5">流转至 </span>
                    <el-select  filterable clearable placeholder="请选择"  size="small" class="input-input">
                      <el-option label="前期核查" value="1"></el-option>
                    </el-select>
                  </el-col>

                </el-row>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="hc-btn">
                <el-button type="info" size="small" class="mr-20">返回</el-button>

                <el-button type="success" size="small">确定</el-button>
              </div>

            </div>
            <div class="pb-10">
              <div class="title-green mt-10">
                本次风评记录
              </div>
              <div class="gc-box f-14">
                <div class="mr-5">1.</div>
                <div class="">
                  <div class="">
                    <span class="mr-30">核查时间：2018-09-19 14:23:43</span><span>核查人：张先生</span>
                  </div>
                  <div class="">
                    操作类型：核查
                  </div>
                  <div class="gc-box">
                    <div>核查过程：</div>
                    <div class="">
                      人物描写的运用很普通，人物描写的母的是刻画人物描写的运用很普通<br/>
                      人物描写的运用很普通，人物描写的母的是刻画人物描写的运用很普通
                    </div>
                  </div>
                  <div class="">
                    核查阶段：前期核查
                  </div>
                  <div class="">
                    核查结果：排除嫌疑
                  </div>
                </div>
              </div>
              <div class="gc-box f-14">
                <div class="mr-5">2.</div>
                <div class="">
                  <div class="">
                    <span class="mr-30">核查时间：2018-09-19 14:23:43</span><span>核查人：张先生</span>
                  </div>
                  <div class="">
                    操作类型：核查
                  </div>
                  <div class="gc-box">
                    <div>核查过程：</div>
                    <div class="">
                      人物描写的运用很普通，人物描写的母的是刻画人物描写的运用很普通<br/>
                      人物描写的运用很普通，人物描写的母的是刻画人物描写的运用很普通
                    </div>
                  </div>
                  <div class="">
                    核查阶段：前期核查
                  </div>
                  <div class="">
                    核查结果：排除嫌疑
                  </div>
                </div>
              </div>
              <div class="box2-more">
                <el-button type="text">展开更多 ﹀</el-button>
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
      box4Data:null,
      box5:true,
      box6:true,
      box7:true,
      serial:null,
    }
  },
  activated(){
    this.page=this.$route.query.page;
    this.serial=this.$route.query.serial;
    if(this.page==0){
      this.getRiskIapiInfo();
      this.getHisModelInfo();
      this.getOperationalTargetInfo();
    }else if(this.page==1){
      this.getRiskDescRecordInfo();
    }
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
         this.box1Data=r.data.validList
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
         this.box4Data=r.data
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
