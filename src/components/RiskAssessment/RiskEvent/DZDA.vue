<template lang="html">
  <div class="bjsjck">

    <div class="middle">
      <el-row :gutter="10">

        <el-col :span="24">

          <div class="middle">
            <div class="boder1 pb-10"  ref="box0">
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
                      {{data0.NAME}}
                    </el-col>
                    <el-col :span="8">
                      <span>国籍/地区：</span>
                      {{data0.NATIONALITY_NAME}}
                    </el-col>
                    <el-col :span="8">
                      <span>出入类型：</span>
                      {{data0.FLIGHTTYPE_NAME}}
                    </el-col>
                    <el-col :span="8">
                      <span>性别：</span>
                      {{data0.GENDER_NAME}}
                    </el-col>
                    <el-col :span="8">
                      <span>证件号码：</span>
                      {{data0.PASSPORTNO}}
                    </el-col>
                    <el-col :span="8">
                      <span>风评结果：</span>
                      {{data0.NEWCHECKRESULT}}
                    </el-col>
                    <el-col :span="8">
                      <span>出生日期：</span>
                      {{data0.BIRTHDAY}}
                    </el-col>
                  </el-row>
                  <div class="ak-tip">
                    注：
                    <span class="tag1"></span><span class="mr-30">生效标签</span>
                    <span class="tag0"></span>失效标签
                  </div>
                  <div class="">
                    <el-popover
                      v-for="(x,ind) in dataTag.validList" :key="ind"
                      ref="popover"
                      placement="bottom"
                      width="200"
                      trigger="hover"
                      :content="x.REMARK">
                      <el-tag type="warning" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==1">{{x.TAG_NAME}}</el-tag>
                      <el-tag type="info" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==2">{{x.TAG_NAME}}</el-tag>
                    </el-popover>
                    <!-- <el-tag type="warning" size="small" class="mr-5" v-for="(x,ind) in dataTag.validList" :key="ind" v-if="x.OPERATION_TYPE==1">{{x.TAG_NAME}}</el-tag>
                    <el-tag type="info" size="small" class="mr-5" v-for="(x,ind) in dataTag.validList" :key="ind" v-if="x.OPERATION_TYPE==2">{{x.TAG_NAME}}</el-tag>
                     -->
                    <el-button type="success" size="mini" plain @click="addTagFn('1')">添加</el-button>
                    <el-button type="danger" size="mini" plain @click="addTagFn('2')">删除</el-button>

                    <el-button type="text" size="small" @click="moreShow=true" v-if="!moreShow">查看更多 ></el-button>
                    <el-button type="text" size="small" @click="moreShow=false" v-if="moreShow">收起<</el-button>
                  </div>
                </el-col>
              </el-row>


            </div>
            <div class="boder1 pb-10" ref="box1">
              <div class="title-green hand mt-10" @click="box1=!box1">
                标签详细信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box1">
                <div class="box1-content mb-9" v-for="(a,ind) in data1.particularsList" :key="ind">
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

                      <el-button type="text" size="small" class="gc-more">查看更多</el-button>
                    </div>
                  </div>
                </div>
                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 pb-10" ref="box2">
              <div class="title-green hand mt-10" @click="box2=!box2">
                风险评估信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box2">
                <el-table
                  :data="data2"
                  class="ak-table1"
                  style="width: 100%">
                  <el-table-column
                    label="序号"
                    type="index"
                    width="70">
                  </el-table-column>
                  <el-table-column
                    label="处理时间"
                    prop="ARCHIVE_TIME">
                  </el-table-column>
                  <el-table-column
                    label="中心/口岸"
                    prop="PORT_NAME">
                  </el-table-column>
                  <el-table-column
                    label="结果"
                    prop="NEWCHECKRESULT">
                  </el-table-column>
                  <el-table-column
                    label="追加描述"
                    prop="REMARK">
                  </el-table-column>
                  <el-table-column
                    label="处理人"
                    prop="PROCESSOR_PEOPLE">
                  </el-table-column>
                  <el-table-column
                    label="联系方式"
                    prop="PHONE">
                  </el-table-column>
                  <el-table-column
                    label="单位"
                    prop="DEPT_QC">
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" class="a-btn" icon="el-icon-view" title="事件处理查看" ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 pb-10" ref="box3">
              <div class="title-green hand mt-10" @click="box3=!box3">
                电子档案查询记录 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box3">
                <div class="box2-content mb-9 pl-20">
                  <el-row class="middle-msg-row2" :gutter="2">
                    <el-col :span="8" v-for="(x,ind) in data3" :key="ind">
                      <div class="">
                        <div class="da-box">
                          <span class="da-dot"></span><span>查询人：</span>
                          {{x.NAME}}
                        </div>
                        <div>
                          <span>查询时间：</span>
                          {{x.CREATETIME}}
                        </div>
                        <div :span="6">
                          <span>单位：</span>
                          {{x.DEPT}}
                        </div>
                      </div>
                    </el-col>

                  </el-row>
                </div>
                <!-- <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div> -->
              </div>
            </div>
            <div class="boder1 pb-10" ref="box4">
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
                      {{data4.nationalityName}}
                    </el-col>
                    <el-col :span="6">
                      <span>性别：</span>
                      {{data4.gender_name}}
                    </el-col>
                    <el-col :span="6">
                      <span>航空公司：</span>
                      {{data4.applicationsenderid}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客订票号：</span>
                      {{data4.tktnumber}}
                    </el-col>
                    <el-col :span="6">
                      <span>证件号码：</span>
                      {{data4.passportno}}
                    </el-col>
                    <el-col :span="6">
                      <span>出生日期：</span>
                      {{data4.birthday}}
                    </el-col>
                    <el-col :span="6">
                      <span>航班时间：</span>
                      {{data4.fltnoDate}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客状态：</span>
                      {{data4.passengerStatusName}}
                    </el-col>
                    <el-col :span="6">
                      <span>姓名：</span>
                      {{data4.name}}
                    </el-col>
                    <el-col :span="6">
                      <span>航班号：</span>
                      {{data4.flight_recordnum}}
                    </el-col>
                    <el-col :span="6" class="tc-999">
                      <span>出入标识：</span>
                      {{data4.flightType_name}}
                    </el-col>
                  </el-row>
                </div>
                <div class="box1-more">
                  <el-button type="text">展开更多 ﹀</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box5">
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
                    <template slot-scope="scope">
                      <el-button type="text" class="a-btn" icon="el-icon-view" title="查看" @click="moreFn('box5',scope.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1" ref="box6">
              <div class="title-green hand mt-10" @click="box6=!box6">
                出入境信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box6">
                <el-table
                  :data="data6"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="姓名"
                    prop="pers_name">
                  </el-table-column>
                  <el-table-column
                    label="出入标识"
                    prop="in_out_flag">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区"
                    prop="to_country_code">
                  </el-table-column>
                  <el-table-column
                    label="性别"
                    prop="pers_gender">
                  </el-table-column>
                  <el-table-column
                    label="出生日期"
                    prop="birth_date">
                  </el-table-column>
                  <el-table-column
                    label="证件类型"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box6',scope.row)">{{scope.row.cert_no}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="出入时间"
                    prop="imm_dt">
                  </el-table-column>
                  <el-table-column
                    label="出入口岸"
                    prop="imm_port">
                  </el-table-column>
                  <el-table-column
                    label="交通方式"
                    prop="trs_mode_na">
                  </el-table-column>
                  <el-table-column
                    label="交通工具"
                    prop="trs_id">
                  </el-table-column>
                  <el-table-column
                    label="前往地/出发地"
                    prop="to_country_code">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1" ref="box7">
              <div class="title-green hand mt-10" @click="box7=!box7">
                出入境证件信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box7">
                <el-table
                  :data="data7"
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
            <div class="boder1" ref="box8">
              <div class="title-green hand mt-10" @click="box8=!box8">
                签证(居留)签发信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box8">
                <el-table
                  :data="data8"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="英文姓名">
                    <template slot-scope="scope">
                      <span>{{scope.row.pers_name||scope.row.eng_name||scope.row.pers_name_en||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="中文姓名">
                    <template slot-scope="scope">
                      <span>{{scope.row.pers_name_cn||scope.row.chn_name||scope.row.pers_name_cn||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="性别">
                    <template slot-scope="scope">
                      <span>{{scope.row.pers_gender_na||scope.row.gender_na||scope.row.pers_gender_na||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="出生日期">
                    <template slot-scope="scope">
                      <span>{{scope.row.pers_birth_date||scope.row.birth_date||scope.row.pers_birth_date||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="证件号码">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box8',scope.row)">{{scope.row.cert_no||scope.row.cert_no||scope.row.passport_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区">
                    <template slot-scope="scope">
                      <span>{{nationalityName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="团队号">
                    <template slot-scope="scope">
                      <span>{{scope.row.group_no||scope.row.pers_name_en||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="签证种类">
                    <template slot-scope="scope">
                      <span>{{scope.row.holding_cert_type_na||scope.row.visa_type_na||scope.row.pers_name_en||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="签证号码">
                    <template slot-scope="scope">
                      <span>{{scope.row.holding_cert_no||scope.row.visa_no||scope.row.pers_name_en||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="审批机关">
                    <template slot-scope="scope">
                      <span>{{scope.row.accept_dept_na||scope.row.accept_organ_na||scope.row.issuing_organ_na||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="签发日期">
                    <template slot-scope="scope">
                      <span>{{scope.row.issuing_date||scope.row.visa_date||scope.row.issuing_date||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="有效期至">
                    <template slot-scope="scope">
                      <span>{{scope.row.cert_vld||scope.row.visa_vld||scope.row.cert_vld||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="有效次数">
                    <template slot-scope="scope">
                      <span>{{scope.row.visa_eff_nbr||scope.row.renewal_nbr||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="联系电话">
                    <template slot-scope="scope">
                      <span>{{scope.row.contact_tel||scope.row.domestic_tel||scope.row.pers_telno||'-'}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1" ref="box9">
              <div class="title-green hand mt-10" @click="box9=!box9">
                边检违法违规信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box9">
                <el-table
                  :data="data9"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="姓名"
                    prop="pers_name">
                  </el-table-column>
                  <el-table-column
                    label="证件种类"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    label="证件号码"
                    prop="cert_no">
                  </el-table-column>
                  <el-table-column
                    label="性别"
                    prop="gender_na">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区"
                    prop="pers_name">
                  </el-table-column>
                  <el-table-column
                    label="出生日期"
                    prop="birth_date">
                  </el-table-column>
                  <el-table-column
                    label="自述姓名"
                    prop="confess_name">
                  </el-table-column>
                  <el-table-column
                    label="自述出生日期"
                    prop="confess_birth_date">
                  </el-table-column>
                  <el-table-column
                    label="自述国家地区代码"
                    prop="confess_country_code">
                  </el-table-column>
                  <el-table-column
                    label="自述证件号码"
                    prop="confess_cert_no">
                  </el-table-column>
                  <el-table-column
                    label="往来国"
                    prop="tf_country_code">
                  </el-table-column>
                  <el-table-column
                    label="交通标识"
                    prop="trs_mode_na">
                  </el-table-column>
                  <el-table-column
                    label="查获时间"
                    prop="catch_dt">
                  </el-table-column>
                  <el-table-column
                    label="事件类型"
                    prop="evt_types_na">
                  </el-table-column>
                  <el-table-column
                    label="事件性质"
                    prop="evt_char_na">
                  </el-table-column>
                  <el-table-column
                    label="事件主题关键字"
                    prop="evt_theme">
                  </el-table-column>
                  <el-table-column
                    label="处理结果"
                    prop="ill_deal_rsn_na">
                  </el-table-column>
                  <el-table-column
                    label="查获口岸"
                    prop="">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1" ref="box10">
              <div class="title-green hand mt-10" @click="box10=!box10">
                遣返遣送信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box10">
                <el-table
                  :data="data10"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box10',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="人员类别"
                    prop="pers_imm_type_na">
                  </el-table-column>
                  <el-table-column
                    label="证件种类"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    label="业务类型"
                    prop="repat_type">
                  </el-table-column>
                  <el-table-column
                    label="第二证件号码"
                    prop="sec_cert_no">
                  </el-table-column>
                  <el-table-column
                    label="录入时间"
                    prop="edit_dt">
                  </el-table-column>
                  <el-table-column
                    label="遣返遣送口岸"
                    prop="repat_port_na">
                  </el-table-column>
                  <el-table-column
                    label="遣返遣送国家"
                    prop="repat_country_na">
                  </el-table-column>
                  <el-table-column
                    label="遣返遣送原因"
                    prop="repat_rsn_na">
                  </el-table-column>
                  <el-table-column
                    label="交通标识"
                    prop="trs_id">
                  </el-table-column>
                  <el-table-column
                    label="往来国"
                    prop="">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1"  ref="box11">
              <div class="title-green hand mt-10" @click="box11=!box11">
                外管常住/临住信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box11">
                <div class="box2-t-box">
                  <span>外管常住信息</span>
                </div>
                <el-table
                  :data="data11_1"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="英文姓名"
                    prop="eng_name">
                  </el-table-column>
                  <el-table-column
                    label="中文姓名"
                    prop="chn_name">
                  </el-table-column>
                  <el-table-column
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box11',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="出生日期"
                    prop="birth_date">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区"
                    prop="pers_country">
                  </el-table-column>
                  <el-table-column
                    label="性别"
                    prop="gender_na">
                  </el-table-column>
                  <el-table-column
                    label="签证号码"
                    prop="prmt_no">
                  </el-table-column>
                  <el-table-column
                    label="审批机关"
                    prop="issuing_organ_na">
                  </el-table-column>
                  <el-table-column
                    label="登记单位"
                    prop="">
                  </el-table-column>
                  <el-table-column
                    label="登记时间"
                    prop="">
                  </el-table-column>
                  <el-table-column
                    label="住宿地点"
                    prop="">
                  </el-table-column>
                </el-table>
                <div class="box2-t-box">
                  <span>外管临住信息</span>
                </div>
                <el-table
                  :data="data11_2"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="英文姓名"
                    prop="eng_name">
                  </el-table-column>
                  <el-table-column
                    label="中文姓名"
                    prop="chn_name">
                  </el-table-column>
                  <el-table-column
                    label="证件号码"
                    prop="hold_cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box11',scope.row)">{{scope.row.hold_cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="出生日期"
                    prop="birth_date">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区"
                    prop="country_na">
                  </el-table-column>
                  <el-table-column
                    label="性别"
                    prop="gender_na">
                  </el-table-column>
                  <el-table-column
                    label="签证号码"
                    prop="visas_no">
                  </el-table-column>
                  <el-table-column
                    label="审批机关"
                    prop="issuing_unit_na">
                  </el-table-column>
                  <el-table-column
                    label="登记单位"
                    prop="tsu_name">
                  </el-table-column>
                  <el-table-column
                    label="登记时间"
                    prop="">
                  </el-table-column>
                  <el-table-column
                    label="住宿地点"
                    prop="">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1" ref="box12">
              <div class="title-green hand mt-10" @click="box12=!box12">
                 出入境管理案事件信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box12">
                <el-table
                  :data="data12"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="案件名"
                    prop="">
                  </el-table-column>
                  <el-table-column
                    label="案事件性质"
                    prop="">
                  </el-table-column>
                  <el-table-column
                    label="涉案事件类别"
                    prop="">
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
            <div class="boder1" ref="box13">
              <div class="title-green hand mt-10" @click="box13=!box13">
                收缴证件/物品信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box13">
                <div class="box2-t-box">
                  <span>收缴证件信息</span>
                </div>
                <el-table
                  :data="data13_1"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="证件姓名"
                    prop="cert_name">
                  </el-table-column>
                  <el-table-column
                    label="证件类别"
                    prop="cert_type">
                  </el-table-column>
                  <el-table-column
                    label="收缴原因"
                    prop="capt_rsn_desc">
                  </el-table-column>
                  <el-table-column
                    label="收缴日期"
                    prop="capt_date">
                  </el-table-column>
                  <el-table-column
                    label="收缴人"
                    prop="capt_oper">
                  </el-table-column>
                  <el-table-column
                    label="部门"
                    prop="dept_na">
                  </el-table-column>
                </el-table>
                <div class="box2-t-box">
                  <span>收缴物品信息</span>
                </div>
                <el-table
                  :data="data13_2"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="名称"
                    prop="res_name">
                  </el-table-column>
                  <el-table-column
                    label="种类"
                    prop="res_name">
                  </el-table-column>
                  <el-table-column
                    label="数量"
                    prop="res_nbr">
                  </el-table-column>
                  <el-table-column
                    label="规格"
                    prop="res_specs">
                  </el-table-column>
                  <el-table-column
                    label="查获日期"
                    prop="seize_date">
                  </el-table-column>
                  <el-table-column
                    label="部门"
                    prop="dept_na">
                  </el-table-column>
                  <el-table-column
                    label="处理口岸"
                    prop="port_na">
                  </el-table-column>
                  <el-table-column
                    label="物品性质"
                    prop="res_prpt_na">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1" ref="box14">
              <div class="title-green hand mt-10" @click="box14=!box14">
                 携带枪支弹药信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box14">
                <el-table
                  :data="data14"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="携枪人姓名"
                    prop="gun_carrier">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区">
                    <template slot-scope="scope">
                      <span>{{nationalityName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box14',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="入境口岸"
                    prop="entry_port_na">
                  </el-table-column>
                  <el-table-column
                    label="出境口岸"
                    prop="exit_port_na">
                  </el-table-column>
                  <el-table-column
                    label="接待单位"
                    prop="rcpt_unit">
                  </el-table-column>
                  <el-table-column
                    label="批准机关"
                    prop="approval_unit">
                  </el-table-column>
                  <el-table-column
                    label="批准文号"
                    prop="approval_no">
                  </el-table-column>
                  <el-table-column
                    label="交通标识"
                    prop="trs_id">
                  </el-table-column>
                  <el-table-column
                    label="目的地"
                    prop="destination">
                  </el-table-column>
                  <el-table-column
                    label="登记时间"
                    prop="reg_dt">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1" ref="box15">
              <div class="title-green hand mt-10" @click="box15=!box15">
                 自助备案信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box15">
                <el-table
                  :data="data15"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="姓名"
                    prop="name">
                  </el-table-column>
                  <el-table-column
                    label="证号"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box15',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="证类"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    label="证件有效期"
                    prop="cert_vld">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1" ref="box16">
              <div class="title-green hand mt-10" @click="box16=!box16">
                 API信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box16">
                <el-table
                  :data="data16"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    label="中文姓名"
                    prop="psrchnname">
                  </el-table-column>
                  <el-table-column
                    label="国籍/地区"
                    prop="pdtcountry_na">
                  </el-table-column>
                  <el-table-column
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box16',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="证件类别"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    label="出生日期"
                    prop="pdtbirthday">
                  </el-table-column>
                  <el-table-column
                    label="出入境时间"
                    prop="aord_time">
                  </el-table-column>
                  <el-table-column
                    label="出发地"
                    prop="segdeptcode_na">
                  </el-table-column>
                  <el-table-column
                    label="航次"
                    prop="fltnumber">
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="boder1" ref="box17">
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
            <div class="boder1"  ref="box18">
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
            <div class="boder1" ref="box19">
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
            <div class="boder1" ref="box20">
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
    <el-dialog title="标签管理" :visible.sync="tagDialogVisible" width="640px">
      <el-checkbox-group v-model="tagCheckList" class="mb-20">
       <el-checkbox :label="x.LABELTYPE_CODE||x.SERIAL"  v-for="(x,ind) in tagList" :key="ind">{{x.LABELNAME||x.TAG_NAME}}</el-checkbox>
      </el-checkbox-group>
      <div class="f-bold mb-9">
        原因(必填)
      </div>
      <el-input
        class="mb-9"
        type="textarea"
        v-model="tagRemark"
        :rows="3"
        placeholder="请输入添加/删除原因">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="TagSave" size="small" :disabled="!tagRemark">确认</el-button>
        <el-button type="warning" @click="tagDialogVisible=false" size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="moreDialogVisible" width="640px">
      <MoreDialog :more-data="moredata" :more-type="moreType"></MoreDialog>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="TagSave" size="small">确认</el-button>
        <el-button type="warning" @click="tagDialogVisible=false" size="small">取消</el-button>
      </div> -->
    </el-dialog>
    <div class="gototop">
      <div class="shoutop" @click="toboxShow=!toboxShow">
        <div class="" v-if="toboxShow">
          <i class="el-icon-arrow-down"></i>
          收起
        </div>
        <div class="" v-else>
          <i class="el-icon-arrow-up"></i>
          展开
        </div>

      </div>
      <div class="" v-if="toboxShow">
        <div class="tobox" :class="{'toboxCheck':tobox==x.id}" v-for="x in rightList" @click="backtop(x)">
          {{x.name}}
        </div>
      </div>
      <div class="backtop" @click="backtop('top')">
        <i class="el-icon-upload2"></i>
        返回顶部
      </div>
    </div>
  </div>
</template>

<script>
import MoreDialog from './DZDATC'
export default {
  data(){
    return{
      user:{},
      moreShow:false,
      box1:false,
      box2:false,
      box3:false,
      box4:false,
      box5:false,
      box6:false,
      box7:false,
      box8:false,
      box9:false,
      box10:false,
      box11:false,
      box12:false,
      box13:false,
      box14:false,
      box15:false,
      box16:false,
      box17:false,
      box18:false,
      box19:false,
      box20:false,

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
      nationalityName:'',
      tagRemark:'',
      data0:{},
      dataTag:{},
      data1:{},
      data2:[],
      data3:[],
      data4:[],
      data5:[],
      data6:[],
      data7:[],
      data8:[],
      data9:[],
      data10:[],
      data11_1:[],
      data11_2:[],
      data12:[],
      data13_1:[],
      data13_2:[],
      data14:[],
      data15:[],
      data16:[],

      tagList:[],
      tagCheckList:[],
      tagDialogVisible:false,
      moreDialogVisible:false,
      moredata:{},
      moreType:'',
      rightList:[
        {
          name:"基本信息",
          id:"box0"
        },
        {
          name:"标签详情",
          id:"box1"
        },
        {
          name:"风险评估",
          id:"box2"
        },
        {
          name:"电子档案查询",
          id:"box3"
        },
        {
          name:"人员预报",
          id:"box4"
        },
        {
          name:"户籍信息",
          id:"box5"
        },
        {
          name:"出入境信息",
          id:"box6"
        },
        {
          name:"出入境证件",
          id:"box7"
        },
        {
          name:"签证(居留)签发",
          id:"box8"
        },
        {
          name:"边检违法违规",
          id:"box9"
        },
        {
          name:"遣返遣送信息",
          id:"box10"
        },
        {
          name:"外管常住/临住",
          id:"box11"
        },
        {
          name:"出入境管理案事件",
          id:"box12"
        },
        {
          name:"收缴证件/物品",
          id:"box13"
        },
        {
          name:"携带枪支弹药",
          id:"box14"
        },
        {
          name:"自助备案",
          id:"box15"
        },
        {
          name:"API信息",
          id:"box16"
        },
        {
          name:"工作单位",
          id:"box17"
        },
        {
          name:"铁路订票",
          id:"box18"
        },
        {
          name:"民航订票",
          id:"box19"
        },
        {
          name:"民航离岗",
          id:"box20"
        },
      ],
      ccTimer:null,
      tobox:'box0',
      toboxShow:false,
    }
  },
  components:{
    MoreDialog
  },
  mounted(){

  },
  activated(){
    this.nationality=this.$route.query.nationality;
    this.passportno=this.$route.query.passportno;
    this.getUsers();
    this.getUserBaseInfo();
    this.getUserTagInfo();
  },
  methods:{
    getUsers(){
      this.$api.post('/manage-platform/sysUserInfoController/querySysUserInfo',{},
       r => {
        this.user=r.data;
        console.log(this.user.userId)
        this.saveRiskQueryRecordLogInfo();

      })
    },
    saveRiskQueryRecordLogInfo(){
      console.log(this.user.userId)
      let p={
      	"nationality":this.nationality,
      	"passportno":this.passportno,
      	"userId":this.user.userId
      }
      this.$api.post('/manage-platform/riskRecordController/saveRiskQueryRecordLogInfo',p,
       r => {
         if(r.success){
           console.log("保存成功")
         }
       })
    },
    // 获取用户基础信息
    getUserBaseInfo(){
      let p={
      	"nationality":this.nationality,
      	"passportno":this.passportno,
      }
      this.$api.post('/manage-platform/riskRecordController/getUserBaseInfo',p,
       r => {
         this.data0=r.data
       })
    },
    // 获取用户标签信息
    getUserTagInfo(){
      let p={
        "nationality":this.nationality,
        "passportno":this.passportno,
      }
      this.$api.post('/manage-platform/riskRecordController/getUserTagInfo',p,
       r => {
         this.dataTag=r.data
       })
    },
    // 添加、删除标签
    addTagFn(type){
      this.tagCheckList=[];
      this.tagDialogVisible=true;
      let p={
        "type":type,
        "nationality":this.nationality,
        "passportno":this.passportno,
      }
      this.$api.post('/manage-platform/riskRecordController/getAddDellButtonTagInfo',p,
       r => {

         if(type==1){
           this.tagList=r.data.add
         }else{
           this.tagList=r.data.del
         }
       })
    },
    // 保存标签
    TagSave(){
      console.log(this.tagList,this.tagCheckList)

      if(this.tagList[0].LABELNAME){
        let p={
          "userId":this.user.userId,
        	"remark":this.tagRemark,
          "nationality":this.nationality,
          "passportno":this.passportno,
        	"list":this.tagCheckList,
        }
        this.$api.post('/manage-platform/riskRecordController/saveUserTagInfo',p,
         r => {
           if(r.success){
             this.$message({
               message: '恭喜你，添加成功！',
               type: 'success'
             });
             this.tagDialogVisible=false;
             this.getUserTagInfo();
           }
         })
      }else{
        let p={
          "userId":this.user.userId,
        	"remark":this.tagRemark,
          "nationality":this.nationality,
          "passportno":this.passportno,
        	"list":this.tagCheckList,
        }
        this.$api.post('/manage-platform/riskRecordController/updateUserTagInfo',p,
         r => {
           if(r.success){
             this.$message({
               message: '恭喜你，删除成功！',
               type: 'success'
             });
             this.tagDialogVisible=false;
             this.getUserTagInfo();
           }
         })
      }
    },
    // 获取标签详细信息
    getRecordTagInfo(){
      let p={
        "nationality":this.nationality,
        "passportno":this.passportno,
      }
      this.$api.post('/manage-platform/riskRecordController/getRecordTagInfo',p,
       r => {
         this.data1=r.data
       })
    },
    // 风险评估信息
    getRiskEventInfo(){
      let p={
        "nationality":this.nationality,
        "passportno":this.passportno,
      }
      this.$api.post('/manage-platform/riskRecordController/getRiskEventInfo',p,
       r => {
         this.data2=r.data
       })
    },
    // 获取前三个查询该电子档案人员记录
    getQueryRiskRecordUserInfo(){
      let p={
        "nationality":this.nationality,
        "passportno":this.passportno,
      }
      this.$api.post('/manage-platform/riskRecordController/getQueryRiskRecordUserInfo',p,
       r => {
         this.data3=r.data
       })
    },
    // 人员预报信息
    getRiskPersonnelForecasInfo(){
      let p={
        "eventSerial":this.data0.SERIAL
      }
      this.$api.post('/manage-platform/riskRecordController/getRiskPersonnelForecasInfo',p,
       r => {
         this.data4=r.data
       })
    },

    // 户籍信息接口
    getCensusInfo(){
      let p={
        "nationality":this.nationality,
        "passportno":this.passportno,
      }
      this.$api.post('/manage-platform/riskRecordController/getCensusInfo',p,
       r => {
         this.data5=r.data
       })
    },
    // 综合信息展示内容
    getRecordOtherInfo(type){
      let p={
        "nationality":"CHN",
        "passportno":"140215727",
        "birth":this.data0.BIRTHDAY,
        "type":type
      }
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getRecordOtherInfo',p,
       r => {
         this.nationalityName=r.data.nationalityName;
         switch (type) {
           case 'imm':
             this.data6=r.data.data.dcap_f_per_act_psr_imm;
             break;
           case 'immcard':
             this.data7=r.data.data.dcap_f_per_act_psr_imm;
             break;
           case 'visa':
             if(r.data.data.dcap_f_per_cert_chn_issue){
               this.data8=r.data.data.dcap_f_per_cert_chn_issue;
             }else if(r.data.data.dcap_f_per_cert_fgn_visa){
               this.data8=r.data.data.dcap_f_per_cert_fgn_visa;
             }else if(r.data.data.dcap_f_per_cert_hmt_issue){
               this.data8=r.data.data.dcap_f_per_cert_hmt_issue;
             }
             break;
           case 'illegal':
             this.data9=r.data.data.dcap_f_evt_psr_illegal;
             break;
           case 'repat':
             this.data10=r.data.data.dcap_f_evt_psr_repat;
             break;
           case 'resident':
             this.data11_1=r.data.data.dcap_f_per_fgn_resident_reg;
             break;
           case 'temp':
             this.data11_2=r.data.data.dcap_f_per_fgn_temp_reg;
             break;
           case 'fgncas':
             this.data12=r.data.data.dcap_f_evt_fgn_cas_person;
             break;
           case 'cert':
             this.data13_1=r.data.data.dcap_f_evt_capt_cert;
             break;
           case 'res':
             this.data13_2=r.data.data.dcap_f_evt_capt_res;
             break;
           case 'act':
             this.data14=r.data.data.dcap_f_evt_gun_act_psr_imm;
             break;
           case 'self':
             this.data15=r.data.data.dcap_f_per_rec_self_clearance;
             break;
           case 'api':
             this.data16=r.data.data.dcap_f_per_pred_api_psr_info;
             break;
           default:

         }

       })
    },
    moreFn(type,item){
      this.moreDialogVisible=true;
      this.moreType=type;
      this.moredata=item;
    },
    backtop(x){
      this.tobox;
      let box;
      if(x=='top'){
          this.tobox='box0';
          box=this.$refs.box0
      }else{
        this.tobox=x.id;
        box=this.$refs[x.id];
      }
      let that=this;
      let t = document.documentElement.scrollTop||document.body.scrollTop;
      let num=t,step=100;
      console.log(box.offsetTop,t);
      this.ccTimer=setInterval(function () {
        num=num+step;
        window.scrollTo(0,num);
        if(num>=box.offsetTop){
          window.scrollTo(0,box.offsetTop);
          clearInterval(that.ccTimer)
        }
      },100)
    }
  },
  watch:{
    box1:function(val){
      if(val){
        this.getRecordTagInfo();
      }
    },
    box2:function(val){
      if(val){
        this.getRiskEventInfo();
      }
    },
    box3:function(val){
      if(val){
        this.getQueryRiskRecordUserInfo();
      }
    },
    box4:function(val){
      if(val){
        this.getRiskPersonnelForecasInfo();
      }
    },
    box5:function(val){
      if(val){
        this.getCensusInfo();
      }
    },
    // 出入境信息
    box6:function(val){
      if(val){
        this.getRecordOtherInfo('imm');
      }
    },
    // 出入境证件
    box7:function(val){
      if(val){
        this.getRecordOtherInfo('immcard');
      }
    },
    // 签证(居留)签发信息
    box8:function(val){
      if(val){
        this.getRecordOtherInfo('visa');
      }
    },
    // 边检违法违规信息
    box9:function(val){
      if(val){
        this.getRecordOtherInfo('illegal');
      }
    },
    // 遣返遣送信息
    box10:function(val){
      if(val){
        this.getRecordOtherInfo('repat');
      }
    },
    // 外管常住/临住信息
    box11:function(val){
      if(val){
        this.getRecordOtherInfo('resident');
        this.getRecordOtherInfo('temp');
      }
    },
    // 出入境管理案事件
    box12:function(val){
      if(val){
        this.getRecordOtherInfo('fgncas');
      }
    },
    // 收缴证件/物品信息
    box13:function(val){
      if(val){
        this.getRecordOtherInfo('cert');
        this.getRecordOtherInfo('res');
      }
    },
    // 携带枪支弹药信息
    box14:function(val){
      if(val){
        this.getRecordOtherInfo('act');
      }
    },
    // 自助备案信息
    box15:function(val){
      if(val){
        this.getRecordOtherInfo('self');
      }
    },
    // API信息
    box16:function(val){
      if(val){
        this.getRecordOtherInfo('api');
      }
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
.gototop{
    position: fixed;
    right:30px;
    bottom: 50px;
    width: 100px;
    line-height: 20px;
    background-color: #ffffff;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.26);
    overflow: hidden;
    color: #666666;

}
.gototop > div {
    font-size: 12px;
    padding: 0 5px 0 8px;

    cursor:pointer;
}
.shoutop{
  color: #1a77c4;
  background-color: rgba(37,130,220,0.3);
  line-height: 18px;
  text-align: center;
  padding: 0!important;
}
.backtop{
  color: #1a77c4;
  background-color: rgba(37,130,220,0.3);
  line-height: 28px;

}
.tobox{
  padding-left: 8px;
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
  margin: 8px 0;
}
.toboxCheck{
  color: #1a77c4;
  border-left: 2px solid #1a77c4;
}
</style>
