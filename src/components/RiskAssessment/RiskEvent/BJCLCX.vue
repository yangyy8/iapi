<template lang="html">
  <div class="bjsjck">
    <div class="top mb-2">
      事件编号：349082340982342348(客户提供唯一编码业务或方法)
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
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>国籍/地区：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>出入类型：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>出发地：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>性别：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>证件类型：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>航班号：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>目的地：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>出生日期：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>证件号码：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>航班日期：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>报警时间：</span>
                  2018-07-09 13:23:22
                </el-col>

              </el-row>
              <div class="ak-tip">
                注：
                <span class="tag1"></span><span class="mr-30">生效标签</span>
                <span class="tag0"></span>失效标签
              </div>
              <div class="">
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
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
                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>外籍涉疆重点人员</span>
                    <el-button type="primary" plain size="small">模型相关案例</el-button>
                  </div>
                  <div class="gc-box">
                    <span>风险等级：</span> <el-rate :value="3" disabled class="mt-5"></el-rate>
                  </div>

                  <div class="gc-box">
                    <span>模型描述：</span>外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员
                  </div>
                  <div class="gc-box">
                    <span>指标描述：</span>
                    <div class="">
                      外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员<br/>
                      外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员<br/>
                    </div>
                  </div>
                </div>
                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>外籍涉疆重点人员</span>
                    <el-button type="primary" plain size="small">模型相关案例</el-button>
                  </div>
                  <div class="gc-box">
                    <span>风险等级：</span> <el-rate :value="3" disabled class="mt-5"></el-rate>
                  </div>

                  <div class="gc-box">
                    <span>模型描述：</span>外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员
                  </div>
                  <div class="gc-box">
                    <span>指标描述：</span>
                    <div class="">
                      外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员<br/>
                      外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员<br/>
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
                    <el-col :span="6">
                      <span>中文姓名：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>英文姓名：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>姓：</span>
                      张
                    </el-col>
                    <el-col :span="6">
                      <span>中间名：</span>
                      某某
                    </el-col>
                    <el-col :span="6">
                      <span>名：</span>
                      某某
                    </el-col>
                    <el-col :span="6">
                      <span>性别：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>出生日期：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>国籍/地区：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>证件号码：</span>
                      张某某
                    </el-col>
                    <el-col :span="6" class="redx">
                      <span>是否黑名单人员：</span>
                      是
                    </el-col>
                    <el-col :span="6" class="redx">
                      <span>重点关注库掌握人员：</span>
                      A1311441
                    </el-col>
                    <el-col :span="6" class="redx">
                      <span>是否重点上机地：</span>
                      是
                    </el-col>
                    <el-col :span="6">
                      <span>是否重点下机地：</span>
                      是
                    </el-col>
                    <el-col :span="6" class="tc-999">
                      <span>签证签发停留期：</span>
                      是
                    </el-col>
                    <el-col :span="6" class="tc-999">
                      <span>证件签发地：</span>
                      是
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
                    <el-col :span="6">
                      <span>是否常驻第三国：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>商贸目的地：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>旅游目的地：</span>
                      张
                    </el-col>
                    <el-col :span="6">
                      <span>旅客入境活动区域：</span>
                      某某
                    </el-col>
                    <el-col :span="6">
                      <span>是否高端企业：</span>
                      某某
                    </el-col>
                    <el-col :span="6">
                      <span>旅客入境目的：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>常驻国：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>前往国：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>出境日期：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>前台采集停留期：</span>
                      是
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
                  <div class="gc-box">
                    <div><span class="b-dot"></span>涉疆人员模型：</div>
                    <div class="">
                      外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员<br/>
                      外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员<br/>
                    </div>
                  </div>
                </div>
                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div>
                <div class="boder1 pb-10">
                  添加内容：人物描写的运用很普通，人物描写的母的是刻画人物描写的运用很普通
                </div>
                <div class="box2-content boder1 pb-10">
                  <div class="box2-t-box">
                    <span>指标录入</span>
                  </div>
                  <div class="gc-box">
                    <span>出境航班：</span>
                    zdwss
                  </div>
                </div>
                <div class="box2-content boder1 pb-10">
                  <div class="box2-t-box">
                    <span>附件</span>
                  </div>
                  <div class="gc-box">
                    <span>出境航班：</span>
                    zdwss
                  </div>
                </div>
                <div class="box2-content">
                  <div class="box2-t-box">
                    <span>简要描述</span>
                  </div>
                  <div class="">
                    <div class="">
                      逗我呢发好囧伙食费或司法局伙食费合计金额活化能
                    </div>
                    <el-row align="center" :gutter="2">
                      <el-col  :sm="24" :md="12" :lg="8" >
                        <span class="mr-5">核查阶段：</span>
                        <span class="tc-333">哈哈哈</span>
                      </el-col>
                      <el-col  :sm="24" :md="12" :lg="8" >
                        <span  class="mr-5">核查结果： </span>
                        <span class="tc-333">哈哈哈</span>
                      </el-col>
                      <el-col  :sm="24" :md="12" :lg="8"  >
                        <span  class="mr-5">流转至： </span>
                      <span class="tc-333">哈哈哈</span>
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
              <div class="box1-more">
                <el-button type="text">展开更多 ﹀</el-button>
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

    }
  },
  activated(){
    this.box2=true;
  },
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
