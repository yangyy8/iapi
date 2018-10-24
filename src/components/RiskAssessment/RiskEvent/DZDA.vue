<template lang="html">
  <div class="bjsjck">
    <!-- <div class="top mb-2">
      事件编号：349082340982342348(客户提供唯一编码业务或方法)
    </div> -->
    <div class="middle">
      <el-row :gutter="10">
        <!-- <el-col :span="3">
          <div class="bjsj-l">
            <img src="../../../assets/img/bp_ap/ph_s.png" alt="" style="width:100%;">
            <span class="mb-2">综合风险等级</span>
            <el-rate :value="3" disabled class="mb-9"></el-rate>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">电子归档</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">综合查询</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">照片比对</el-button>
            <el-button type="success" size="small" style="width:100%">事件归档</el-button>
          </div>
        </el-col> -->
        <el-col :span="24">
          <!-- <div class="ak-tab">
            <div class="ak-tabs">
              <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="page=0">
                风评信息
              </div>
              <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="page=1;">
                核查信息
              </div>
            </div>
          </div> -->
          <div class="middle">
            <div class="boder1 pb-10">
              <el-row :gutter="10">
                <el-col :span="3">
                  <div class="bjsj-l2">
                    <img src="../../../assets/img/bp_ap/ph_s.png" alt="" style="height:150px;">
                    <span >综合风险等级</span>
                    <el-rate :value="3" disabled></el-rate>
                  </div>
                </el-col>
                <el-col :span="21">
                  <div class="title-green ">
                    基本信息
                  </div>
                  <el-row class="middle-msg-row" :gutter="4">
                    <el-col :span="8">
                      <span>姓名：</span>
                      张某某
                    </el-col>
                    <el-col :span="8">
                      <span>国籍/地区：</span>
                      张某某
                    </el-col>
                    <el-col :span="8">
                      <span>出入类型：</span>
                      风评次数
                    </el-col>
                    <el-col :span="8">
                      <span>性别：</span>
                      张某某
                    </el-col>
                    <el-col :span="8">
                      <span>证件号码：</span>
                      张某某
                    </el-col>
                    <el-col :span="8">
                      <span>风评结果：</span>
                      张某某
                    </el-col>
                    <el-col :span="8">
                      <span>出生日期：</span>
                      张某某
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
                </el-col>
              </el-row>


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
                风险评估信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box2" >
                <el-table
                  :data="tableData1"
                  class="ak-table1"
                  style="width: 100%">
                  <el-table-column
                    label="序号"
                    width="70">
                  </el-table-column>
                  <el-table-column
                    label="处理时间">
                  </el-table-column>
                  <el-table-column
                    label="中心/口岸">
                  </el-table-column>
                  <el-table-column
                    label="结果">
                  </el-table-column>
                  <el-table-column
                    label="追加描述">
                  </el-table-column>
                  <el-table-column
                    label="处理人">
                  </el-table-column>
                  <el-table-column
                    label="联系方式">
                  </el-table-column>
                  <el-table-column
                    label="单位">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                  </el-table-column>
                </el-table>
                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box3=!box3">
                电子档案查询记录 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box3">
                <div class="box2-content mb-9 pl-20">
                  <el-row class="middle-msg-row2" :gutter="2">
                    <el-col :span="8">
                      <div class="">
                        <div class="da-box">
                          <span class="da-dot"></span><span>查询人：</span>
                          张某某
                        </div>
                        <div>
                          <span>查询时间：</span>
                          张某某
                        </div>
                        <div :span="6">
                          <span>单位：</span>
                          张
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="">
                        <div class="da-box">
                          <span class="da-dot"></span><span>查询人：</span>
                          张某某
                        </div>
                        <div>
                          <span>查询时间：</span>
                          张某某
                        </div>
                        <div :span="6">
                          <span>单位：</span>
                          张
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="">
                        <div class="da-box">
                          <span class="da-dot"></span><span>查询人：</span>
                          张某某
                        </div>
                        <div>
                          <span>查询时间：</span>
                          张某某
                        </div>
                        <div :span="6">
                          <span>单位：</span>
                          张
                        </div>
                      </div>
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
                人员预报信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box4">
                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>基本信息</span>
                  </div>
                  <el-row class="middle-msg-row2" :gutter="2">
                    <el-col :span="6">
                      <span>国籍地区：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>性别：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>航空公司：</span>
                      张
                    </el-col>
                    <el-col :span="6">
                      <span>旅客订票号：</span>
                      某某
                    </el-col>
                    <el-col :span="6">
                      <span>证件号码：</span>
                      某某
                    </el-col>
                    <el-col :span="6">
                      <span>出生日期：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>航班时间：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>旅客状态：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>姓名：</span>
                      张某某
                    </el-col>
                    <el-col :span="6">
                      <span>航班号：</span>
                      是
                    </el-col>
                    <el-col :span="6" class="tc-999">
                      <span>出入标识：</span>
                      A1311441
                    </el-col>
                  </el-row>
                </div>
                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box5=!box5">
                户籍信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box5">
                <el-table
                  :data="tableData2"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    label="身份证号">
                  </el-table-column>
                  <el-table-column
                    label="性别">
                  </el-table-column>
                  <el-table-column
                    label="出生日期">
                  </el-table-column>
                  <el-table-column
                    label="民族">
                  </el-table-column>
                  <el-table-column
                    label="住址详情">
                  </el-table-column>
                  <el-table-column
                    label="服务住所">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box6=!box6">
                出入境信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box6">
                <el-table
                  :data="tableData3"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    label="出入标识">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区">
                  </el-table-column>
                  <el-table-column
                    label="性别">
                  </el-table-column>
                  <el-table-column
                    label="出生日期">
                  </el-table-column>
                  <el-table-column
                    label="证件类型">
                  </el-table-column>
                  <el-table-column
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    label="出入时间">
                  </el-table-column>
                  <el-table-column
                    label="出入口岸">
                  </el-table-column>
                  <el-table-column
                    label="交通方式">
                  </el-table-column>
                  <el-table-column
                    label="交通工具">
                  </el-table-column>
                  <el-table-column
                    label="前往地/出发地">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box7=!box7">
                出入境证件信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box7">
                <el-table
                  :data="tableData4"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    label="性别">
                  </el-table-column>
                  <el-table-column
                    label="出生日期">
                  </el-table-column>
                  <el-table-column
                    label="证件类型">
                  </el-table-column>
                  <el-table-column
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    label="原证件号码">
                  </el-table-column>
                  <el-table-column
                    label="身份证号">
                  </el-table-column>
                  <el-table-column
                    label="户籍">
                  </el-table-column>
                  <el-table-column
                    label="审批机关">
                  </el-table-column>
                  <el-table-column
                    label="签发日期">
                  </el-table-column>
                  <el-table-column
                    label="证件有效期至">
                  </el-table-column>
                  <el-table-column
                    label="联系电话">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box8=!box8">
                签证(居留)签发信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box8">
                <el-table
                  :data="tableData5"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="英文姓名">
                  </el-table-column>
                  <el-table-column
                    label="中文姓名">
                  </el-table-column>
                  <el-table-column
                    label="性别">
                  </el-table-column>
                  <el-table-column
                    label="出生日期">
                  </el-table-column>
                  <el-table-column
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区">
                  </el-table-column>
                  <el-table-column
                    label="团队号">
                  </el-table-column>
                  <el-table-column
                    label="签证种类">
                  </el-table-column>
                  <el-table-column
                    label="签证号码">
                  </el-table-column>
                  <el-table-column
                    label="审批机关">
                  </el-table-column>
                  <el-table-column
                    label="签发日期">
                  </el-table-column>
                  <el-table-column
                    label="有效期至">
                  </el-table-column>
                  <el-table-column
                    label="有效次数">
                  </el-table-column>
                  <el-table-column
                    label="联系电话">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box9=!box9">
                边检违法违规信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box9">
                <el-table
                  :data="tableData6"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    label="证件种类">
                  </el-table-column>
                  <el-table-column
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    label="性别">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区">
                  </el-table-column>
                  <el-table-column
                    label="出生日期">
                  </el-table-column>
                  <el-table-column
                    label="自述姓名">
                  </el-table-column>
                  <el-table-column
                    label="自述出生日期">
                  </el-table-column>
                  <el-table-column
                    label="自述国家地区代码">
                  </el-table-column>
                  <el-table-column
                    label="自述证件号码">
                  </el-table-column>
                  <el-table-column
                    label="往来国">
                  </el-table-column>
                  <el-table-column
                    label="交通标识">
                  </el-table-column>
                  <el-table-column
                    label="查获时间">
                  </el-table-column>
                  <el-table-column
                    label="事件类型">
                  </el-table-column>
                  <el-table-column
                    label="事件性质">
                  </el-table-column>
                  <el-table-column
                    label="事件主题关键字">
                  </el-table-column>
                  <el-table-column
                    label="处理结果">
                  </el-table-column>
                  <el-table-column
                    label="查获口岸">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box10=!box10">
                遣返遣送信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box10">
                <el-table
                  :data="tableData7"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    label="人员类别">
                  </el-table-column>
                  <el-table-column
                    label="证件种类">
                  </el-table-column>
                  <el-table-column
                    label="业务类型">
                  </el-table-column>
                  <el-table-column
                    label="第二证件号码">
                  </el-table-column>
                  <el-table-column
                    label="录入时间">
                  </el-table-column>
                  <el-table-column
                    label="遣返遣送口岸">
                  </el-table-column>
                  <el-table-column
                    label="遣返遣送国家">
                  </el-table-column>
                  <el-table-column
                    label="遣返遣送原因">
                  </el-table-column>
                  <el-table-column
                    label="交通标识">
                  </el-table-column>
                  <el-table-column
                    label="往来国">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box11=!box11">
                外管常住/临住信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box11">
                <div class="box2-t-box">
                  <span>外管常住信息</span>
                </div>
                <el-table
                  :data="tableData8"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="英文姓名">
                  </el-table-column>
                  <el-table-column
                    label="中文姓名">
                  </el-table-column>
                  <el-table-column
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    label="出生日期">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区">
                  </el-table-column>
                  <el-table-column
                    label="性别">
                  </el-table-column>
                  <el-table-column
                    label="签证号码">
                  </el-table-column>
                  <el-table-column
                    label="审批机关">
                  </el-table-column>
                  <el-table-column
                    label="登记单位">
                  </el-table-column>
                  <el-table-column
                    label="登记时间">
                  </el-table-column>
                  <el-table-column
                    label="住宿地点">
                  </el-table-column>
                </el-table>
                <div class="box2-t-box">
                  <span>外管临住信息</span>
                </div>
                <el-table
                  :data="tableData9"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="英文姓名">
                  </el-table-column>
                  <el-table-column
                    label="中文姓名">
                  </el-table-column>
                  <el-table-column
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    label="出生日期">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区">
                  </el-table-column>
                  <el-table-column
                    label="性别">
                  </el-table-column>
                  <el-table-column
                    label="签证号码">
                  </el-table-column>
                  <el-table-column
                    label="审批机关">
                  </el-table-column>
                  <el-table-column
                    label="登记单位">
                  </el-table-column>
                  <el-table-column
                    label="登记时间">
                  </el-table-column>
                  <el-table-column
                    label="住宿地点">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box12=!box12">
                 出入境管理案事件信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box12">
                <el-table
                  :data="tableData10"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="案件名">
                  </el-table-column>
                  <el-table-column
                    label="案事件性质">
                  </el-table-column>
                  <el-table-column
                    label="涉案事件类别">
                  </el-table-column>
                  <el-table-column
                    label="立(受)案时间">
                  </el-table-column>
                  <el-table-column
                    label="案件数据来源">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box13=!box13">
                收缴证件/物品信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box13">
                <div class="box2-t-box">
                  <span>收缴证件信息</span>
                </div>
                <el-table
                  :data="tableData11"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="证件姓名">
                  </el-table-column>
                  <el-table-column
                    label="证件类别">
                  </el-table-column>
                  <el-table-column
                    label="收缴原因">
                  </el-table-column>
                  <el-table-column
                    label="收缴日期">
                  </el-table-column>
                  <el-table-column
                    label="收缴人">
                  </el-table-column>
                  <el-table-column
                    label="部门">
                  </el-table-column>
                </el-table>
                <div class="box2-t-box">
                  <span>收缴物品信息</span>
                </div>
                <el-table
                  :data="tableData12"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="名称">
                  </el-table-column>
                  <el-table-column
                    label="种类">
                  </el-table-column>
                  <el-table-column
                    label="数量">
                  </el-table-column>
                  <el-table-column
                    label="规格">
                  </el-table-column>
                  <el-table-column
                    label="查获日期">
                  </el-table-column>
                  <el-table-column
                    label="部门">
                  </el-table-column>
                  <el-table-column
                    label="处理口岸">
                  </el-table-column>
                  <el-table-column
                    label="物品性质">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box14=!box14">
                 携带枪支弹药信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box14">
                <el-table
                  :data="tableData13"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="携枪人姓名">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区">
                  </el-table-column>
                  <el-table-column
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    label="入境口岸">
                  </el-table-column>
                  <el-table-column
                    label="出境口岸">
                  </el-table-column>
                  <el-table-column
                    label="接待单位">
                  </el-table-column>
                  <el-table-column
                    label="批准机关">
                  </el-table-column>
                  <el-table-column
                    label="批准文号">
                  </el-table-column>
                  <el-table-column
                    label="交通标识">
                  </el-table-column>
                  <el-table-column
                    label="目的地">
                  </el-table-column>
                  <el-table-column
                    label="登记时间">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box15=!box15">
                 自助备案信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box15">
                <el-table
                  :data="tableData14"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    label="证号">
                  </el-table-column>
                  <el-table-column
                    label="证类">
                  </el-table-column>
                  <el-table-column
                    label="证件有效期">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box16=!box16">
                 API信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box16">
                <el-table
                  :data="tableData15"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="中文姓名">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区">
                  </el-table-column>
                  <el-table-column
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    label="证件类别">
                  </el-table-column>
                  <el-table-column
                    label="出生日期">
                  </el-table-column>
                  <el-table-column
                    label="出入境时间">
                  </el-table-column>
                  <el-table-column
                    label="出发地">
                  </el-table-column>
                  <el-table-column
                    label="航次">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box17=!box17">
                 工作单位信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box17">
                <el-table
                  :data="tableData16"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    label="证号">
                  </el-table-column>
                  <el-table-column
                    label="职务">
                  </el-table-column>
                  <el-table-column
                    label="报送单位">
                  </el-table-column>
                  <el-table-column
                    label="报送单位联系人">
                  </el-table-column>
                  <el-table-column
                    label="报送单位联系人电话">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box18=!box18">
                 铁路订票信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box18">
                <el-table
                  :data="tableData17"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    label="证件号码">
                  </el-table-column>
                  <el-table-column
                    label="票号">
                  </el-table-column>
                  <el-table-column
                    label="车次">
                  </el-table-column>
                  <el-table-column
                    label="乘车日期">
                  </el-table-column>
                  <el-table-column
                    label="发站">
                  </el-table-column>
                  <el-table-column
                    label="到站">
                  </el-table-column>
                  <el-table-column
                    label="序号">
                  </el-table-column>
                  <el-table-column
                    label="状态">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box19=!box19">
                 民航订票信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box19">
                <el-table
                  :data="tableData18"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="订票记录编号">
                  </el-table-column>
                  <el-table-column
                    label="旅客中文姓名">
                  </el-table-column>
                  <el-table-column
                    label="旅客英文姓名">
                  </el-table-column>
                  <el-table-column
                    label="身份证件类型">
                  </el-table-column>
                  <el-table-column
                    label="身份证件号码">
                  </el-table-column>
                  <el-table-column
                    label="航班号">
                  </el-table-column>
                  <el-table-column
                    label="起飞航站">
                  </el-table-column>
                  <el-table-column
                    label="当前出发日期">
                  </el-table-column>
                  <el-table-column
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    label="当前出发时间">
                  </el-table-column>
                  <el-table-column
                    label="到达航站">
                  </el-table-column>
                  <el-table-column
                    label="当地到达日期">
                  </el-table-column>
                  <el-table-column
                    label="当地到达时间">
                  </el-table-column>
                  <el-table-column
                    label="操作代理人代码">
                  </el-table-column>
                  <el-table-column
                    label="团体标识">
                  </el-table-column>
                  <el-table-column
                    label="团体名称">
                  </el-table-column>
                  <el-table-column
                    label="操作日期">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1">
              <div class="title-green hand mt-10" @click="box20=!box20">
                 民航离岗信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box20">
                <el-table
                  :data="tableData19"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="订票记录编号">
                  </el-table-column>
                  <el-table-column
                    label="旅客中文姓名">
                  </el-table-column>
                  <el-table-column
                    label="旅客英文姓名">
                  </el-table-column>
                  <el-table-column
                    label="身份证件类型">
                  </el-table-column>
                  <el-table-column
                    label="身份证件号码">
                  </el-table-column>
                  <el-table-column
                    label="航班号">
                  </el-table-column>
                  <el-table-column
                    label="起飞航站">
                  </el-table-column>
                  <el-table-column
                    label="当前出发日期">
                  </el-table-column>
                  <el-table-column
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    label="当前出发时间">
                  </el-table-column>
                  <el-table-column
                    label="到达航站">
                  </el-table-column>
                  <el-table-column
                    label="当地到达日期">
                  </el-table-column>
                  <el-table-column
                    label="当地到达时间">
                  </el-table-column>
                  <el-table-column
                    label="操作代理人代码">
                  </el-table-column>
                  <el-table-column
                    label="团体标识">
                  </el-table-column>
                  <el-table-column
                    label="团体名称">
                  </el-table-column>
                  <el-table-column
                    label="操作日期">
                  </el-table-column>
                </el-table>
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
      box8:true,
      box9:true,
      box10:true,
      box11:true,
      box12:true,
      box13:true,
      box14:true,
      box15:true,
      box16:true,
      box17:true,
      box18:true,
      box19:true,
      box20:true,

      tableData1:null,
      tableData2:null,
      tableData3:null,
      tableData4:null,
      tableData5:null,
      tableData6:null,
      tableData7:null,
      tableData8:null,
      tableData9:null,
      tableData10:null,
      tableData11:null,
      tableData12:null,
      tableData13:null,
      tableData14:null,
      tableData15:null,
      tableData16:null,
      tableData17:null,
      tableData18:null,
      tableData19:null,

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
.bjsj-l2{
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
.da-box{
  position: relative;
}
.da-dot{
  display: inline-block;
  width: 12px;
  height: 12px;
  background: #35acff;
  border-radius: 50%;
  position: absolute;
  left: -15px;
  top:10px;
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
