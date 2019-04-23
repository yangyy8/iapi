<template lang="html">
  <div class="bjsjck">

    <div class="middle">
      <!-- <el-button type="warning" size="small" class="mr-20" @click="$router.go(-1)">返回</el-button> -->

      <el-row :gutter="10">
        <el-col :span="24">
          <div class="middle">
            <div class="boder1 pb-10"  ref="box0">
              <el-row :gutter="10">
                <el-col :span="3">
                  <div class="bjsj-l2">
                    <img :src="imgURL" alt="" style="height:150px;">
                    <span >综合风险等级</span>
                    <el-rate :value="parseInt($route.query.grade||data0.GRADE)" disabled></el-rate>
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
                      v-for="(x,ind) in dataTag.validList" :key="ind" v-if="x.REMARK&&ind<size.size0"
                      placement="bottom"
                      width="200"
                      trigger="hover"
                      :content="x.REMARK">
                      <el-tag type="warning" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==1">{{x.TAG_NAME}}</el-tag>
                      <el-tag type="info" slot="reference" size="small" class="mr-5" v-if="x.OPERATION_TYPE==2">{{x.TAG_NAME}}</el-tag>
                    </el-popover>
                    <el-tag type="warning"  v-for="(x,ind) in dataTag.validList" :key="ind" v-if="!x.REMARK&&x.OPERATION_TYPE==1&&ind<size.size0" size="small" class="mr-5">{{x.TAG_NAME}}</el-tag>
                    <el-tag type="info"   v-for="(x,ind) in dataTag.validList" :key="ind" v-if="!x.REMARK&&x.OPERATION_TYPE==2&&ind<size.size0" size="small" class="mr-5">{{x.TAG_NAME}}</el-tag>

                    <el-button type="success" size="mini" plain @click="addTagFn('1')">添加</el-button>
                    <el-button type="danger" size="mini" plain @click="addTagFn('2')">删除</el-button>
                    <el-button type="text" size="small" @click="moreShow=true;size.size0=dataTag.validList.length" v-if="!moreShow&&dataTag.validList.length>8">查看更多 ></el-button>
                    <el-button type="text" size="small" @click="moreShow=false;size.size0=8" v-if="moreShow">收起<</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="boder1 " ref="box1">
              <div class="title-green hand mt-10" @click="box1=!box1">
                标签详细信息 <i class="el-icon-d-caret"></i><span>({{data1.particularsList.length||0}})</span>
              </div>
              <div v-if="box1">
                <div class="box1-content mb-9" v-for="(a,ind) in data1.particularsList" :key="ind" v-if="ind<size.size1">
                  <el-tag type="warning" size="small" v-if="a.operation_type==1">{{a.tag_name}}</el-tag>
                  <el-tag type="info" size="small" v-if="a.operation_type==2">{{a.tag_name}}</el-tag>

                  <div class="gc-box">
                    <span>标签描述：</span>{{a.tag_remar}}
                  </div>
                  <div class="gc-box">
                    <span>过程：</span>
                    <div class="gc-r-box">
                      <div class="step-box" v-for="(x,y) in a.list" :key="y"  v-if="y<a.TAGSIZE">
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
                <div class="box1-more" v-if="data1.particularsList.length!=0">
                  <el-button type="text" class="mr-15" @click="size.size1=data1.particularsList.length+4" v-if="data1.particularsList.length>3&&size.size1==3">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="size.size1=3" v-if="size.size1==data1.particularsList.length+4">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(2)">导出</el-button>

                </div>
              </div>
            </div>
            <div class="boder1 " ref="box2">
              <div class="title-green hand mt-10" @click="box2=!box2">
                风险评估信息 <i class="el-icon-d-caret"></i><span>({{data2.length||0}})</span>
              </div>
              <div v-if="box2">
                <el-table
                  :data="data2"
                  class="ak-table1"
                  :class="{'ak-t1':pageSize.page1==true,'ak-t2':pageSize.page1==false}"
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="序号"
                    type="index"
                    width="70">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="处理时间"
                    prop="ARCHIVE_TIME">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="中心/口岸"
                    prop="PORT_NAME">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="结果"
                    prop="NEWCHECKRESULTNAME">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="追加描述"
                    prop="REMARK">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="处理人"
                    prop="PROCESSOR_PEOPLE">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="联系方式"
                    prop="PHONE">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="单位"
                    prop="DEPT_QC">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" class="a-btn" icon="el-icon-view" title="事件处理查看"  @click="$router.push({name:'BJCLCX',query:{serial:scope.row.EVENTSERIAL,grade:scope.row.grade,nav2Id:scope.row.EVENTSERIAL+2,title:data0.NAME+'已归档查询'}})"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data2.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page1=false" v-if="pageSize.page1&&data2.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page1=true" v-if="!pageSize.page1">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(3)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1 " ref="box3">
              <div class="title-green hand mt-10" @click="box3=!box3">
                电子档案查询记录 <i class="el-icon-d-caret"></i><span>({{data3.length||0}})</span>
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
            <div class="boder1 " ref="box4">
              <div class="title-green hand mt-10" @click="box4=!box4">
                人员预报信息 <i class="el-icon-d-caret"></i><span></span>
              </div>
              <div v-if="box4">
                <div class="box2-content mb-9">
                  <div class="box2-t-box">
                    <span>基本信息</span>
                  </div>
                  <el-row class="middle-msg-row2" :gutter="2">
                    <el-col :span="6">
                      <span>国籍地区：</span>
                      {{data4.IAPI.NATIONALITYNAME||'-'}}
                    </el-col>
                    <el-col :span="6">
                      <span>姓名：</span>
                      {{data4.IAPI.CNAME}}
                    </el-col>
                    <el-col :span="6">
                      <span>性别：</span>
                      {{data4.IAPI.GENDERNAME}}
                    </el-col>
                    <el-col :span="6">
                      <span>出生日期：</span>
                      {{data4.IAPI.BIRTHDAYSTR}}
                    </el-col>
                    <el-col :span="6">
                      <span>出入标识：</span>
                      {{data4.IAPI.FLIGHTINOUT}}
                    </el-col>
                    <!-- <el-col :span="6">
                      <span>航空公司：</span>
                      {{data4.applicationsenderid}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客订票号：</span>
                      {{data4.tktnumber}}
                    </el-col> -->


                    <!-- <el-col :span="6">
                      <span>航班时间：</span>
                      {{data4.fltnoDate}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客状态：</span>
                      {{data4.passengerStatusName}}
                    </el-col> -->

                    <!-- <el-col :span="6">
                      <span>航班号：</span>
                      {{data4.flight_recordnum}}
                    </el-col> -->
                    <el-col :span="6">
                      <span>证件号码：</span>
                      {{data4.IAPI.PASSPORTNO}}
                    </el-col>
                    <el-col :span="6">
                      <span>证件颁发国：</span>
                      {{data4.IAPI.PASSPORTISSUECOUNTRYNAME}}
                    </el-col>
                    <el-col :span="6">
                      <span>证件有效期：</span>
                      {{data4.IAPI.PASSPORTEXPIREDATESTR}}
                    </el-col>
                    <el-col :span="6">
                      <span>证件签发日期：</span>
                      {{data4.IAPI.PASSPORTISSUEDATESTR}}
                    </el-col>
                    <el-col :span="6">
                      <span>出生国：</span>
                      {{data4.IAPI.BIRTHCOUNTRYNAME}}
                    </el-col>
                    <el-col :span="6">
                      <span>居住国：</span>
                      {{data4.IAPI.RESIDENCENAME}}
                    </el-col>
                  </el-row>
                  <!-- <el-row class="middle-msg-row2" :gutter="2" v-if="data4Show">
                    <el-col :span="6">
                      <span>证件种类：</span>
                      {{data4.passportTypeName}}
                    </el-col>
                    <el-col :span="6">
                      <span>计划起飞时间：</span>
                      {{data4.departDate}}
                    </el-col>
                    <el-col :span="6">
                      <span>计划到达时间：</span>
                      {{data4.arrivDate}}
                    </el-col>
                    <el-col :span="6">
                      <span>座位号：</span>
                      {{data4.Specifigseat}}
                    </el-col>
                    <el-col :span="6">
                      <span>航班状态：</span>
                      {{data4.flightStatusName}}
                    </el-col>
                    <el-col :span="6">
                      <span>证件有效期：</span>
                      {{data4.passportexpireDate}}
                    </el-col>
                    <el-col :span="6">
                      <span>证件签发日期：</span>
                      {{data4.passportissueDate}}
                    </el-col>
                    <el-col :span="6">
                      <span>证件签发国：</span>
                      {{data4.passportissuecountryName}}
                    </el-col>
                    <el-col :span="6">
                      <span>签证号码：</span>
                      {{data4.visano}}
                    </el-col>
                    <el-col :span="6">
                      <span>签证有效期：</span>
                      {{data4.visaexpireDate}}
                    </el-col>
                    <el-col :span="6">
                      <span>其他证件号码：</span>
                      {{data4.other_no}}
                    </el-col>
                    <el-col :span="6">
                      <span>其他证件有效期：</span>
                      {{data4.other_expiredate}}
                    </el-col>

                    <el-col :span="6">
                      <span>其他证件签发日期：</span>
                      {{data4.other_issuecountryName}}
                    </el-col>
                    <el-col :span="6">
                      <span>航空公司联系电话：</span>
                      {{data4.airlinePhone}}
                    </el-col>
                    <el-col :span="6">
                      <span>边检回复日期：</span>
                      {{data4.iapi_responseTime}}
                    </el-col>
                    <el-col :span="6">
                      <span>ABO唯一标识：</span>
                      {{data4.aboNo}}
                    </el-col>
                    <el-col :span="6">
                      <span>值机时间：</span>
                      {{data4.lastupdateTime}}
                    </el-col>
                    <el-col :span="6">
                      <span>起飞机场：</span>
                      {{data4.cityFromName}}
                    </el-col>
                    <el-col :span="6">
                      <span>降落机场：</span>
                      {{data4.passportissueDate}}
                    </el-col>
                    <el-col :span="6">
                      <span>PNR报文发送方：</span>
                      {{data4.Company_Identification}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客唯一编号：</span>
                      {{data4.reference_number}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客类型：</span>
                      {{data4.passenger_type}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客其他姓名：</span>
                      {{data4.other_names}}
                    </el-col>
                    <el-col :span="6">
                      <span>携带婴儿标志：</span>
                      {{data4.t_a_by_infant_indicator}}
                    </el-col>

                    <el-col :span="6">
                      <span>票号发起时间：</span>
                      {{data4.phCreateTime}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客地址：</span>
                      {{data4.street_and_number}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客城市：</span>
                      {{data4.city_Name}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客省(州)：</span>
                      {{data4.country_Sub_entity_Name}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客国家代码：</span>
                      {{data4.country_Coded}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客邮政编码：</span>
                      {{data4.postcode_Identification}}
                    </el-col>
                    <el-col :span="6">
                      <span>常旅客航空公司代码：</span>
                      {{data4.airline_Designator}}
                    </el-col>
                    <el-col :span="6">
                      <span>常旅客编号：</span>
                      {{data4.frequent_T_Idenification}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客特殊需求类型：</span>
                      {{data4.special_Requirement_Type}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客特殊需求描述：</span>
                      {{data4.freetxt}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客超额行李数量：</span>
                      {{data4.quantity}}
                    </el-col>
                    <el-col :span="6">
                      <span>付款方式：</span>
                      {{data4.payment_Type}}
                    </el-col>

                    <el-col :span="6">
                      <span>付款账号(卡号)：</span>
                      {{data4.accountNumber}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客行李数量：</span>
                      {{data4.numberofpieces}}
                    </el-col>
                    <el-col :span="6">
                      <span>记录变更时间：</span>
                      {{data4.createTime}}
                    </el-col>
                    <el-col :span="6">
                      <span>记录变更类型：</span>
                      {{data4.information_Type}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更旅客姓：</span>
                      {{data4.traveller_Surname}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更旅客名：</span>
                      {{data4.traveller_Given_Name}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更旅客其他姓名：</span>
                      {{data4.changeOther_names}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更旅客携带婴儿标志：</span>
                      {{data4.traveller_A_by_Infant_Id}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更特殊需求类型：</span>
                      {{data4.changeSpecial_Requirement_Type}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更特殊需求描述：</span>
                      {{data4.ssrfreetxt}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更航空公司：</span>
                      {{data4.company_Identification1}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更起飞机场：</span>
                      {{data4.board_city}}
                    </el-col>

                    <el-col :span="6">
                      <span>变更降落机场：</span>
                      {{data4.off_city}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅馆入住时间：</span>
                      {{data4.first_Date}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客结束入住时间：</span>
                      {{data4.second_date}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅馆地址：</span>
                      {{data4.place}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅馆名字：</span>
                      {{data4.place_Name}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单分离旅客数量：</span>
                      {{data4.number_of_Units}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单编号：</span>
                      {{data4.ddbh}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单发起时间：</span>
                      {{data4.ddfqTime}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单联系人姓：</span>
                      {{data4.ddlxrx}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单联系人名：</span>
                      {{data4.ddlxrm}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单联系人地址：</span>
                      {{data4.ddlxradd}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单联系人城市：</span>
                      {{data4.ddlxrCity}}
                    </el-col>

                    <el-col :span="6">
                      <span>订单联系人省(州)：</span>
                      {{data4.ddlxrs}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单联系人国家代码：</span>
                      {{data4.ddlxrgjcode}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单联系人邮政编码：</span>
                      {{data4.ddlxryzbm}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单联系人电话：</span>
                      {{data4.ddlxrdh}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单联系人传真：</span>
                      {{data4.ddlxrcz}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单旅客数量：</span>
                      {{data4.ddlksl}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单铁树需求类型：</span>
                      {{data4.ddxqlx}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单特殊需求描述：</span>
                      {{data4.ddxqms}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客电话：</span>
                      {{data4.lkdh}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客传真：</span>
                      {{data4.lkcz}}
                    </el-col>
                    <el-col :span="6">
                      <span>付款人地址：</span>
                      {{data4.fkrdz}}
                    </el-col>
                    <el-col :span="6">
                      <span>付款人城市：</span>
                      {{data4.fkrcs}}
                    </el-col>

                    <el-col :span="6">
                      <span>付款人省(州)：</span>
                      {{data4.fkrs}}
                    </el-col>
                    <el-col :span="6">
                      <span>付款人国家代码：</span>
                      {{data4.fkrgjdm}}
                    </el-col>
                    <el-col :span="6">
                      <span>付款人邮政编码：</span>
                      {{data4.fkryzbm}}
                    </el-col>
                    <el-col :span="6">
                      <span>付款人电话：</span>
                      {{data4.fkrdh}}
                    </el-col>
                    <el-col :span="6">
                      <span>付款人传真：</span>
                      {{data4.fkrcz}}
                    </el-col>
                    <el-col :span="6">
                      <span>航班飞机型号：</span>
                      {{data4.hbfjxh}}
                    </el-col>
                    <el-col :span="6">
                      <span>航班check-in时间：</span>
                      {{data4.check_in}}
                    </el-col>
                    <el-col :span="6">
                      <span>旅客舱位级别：</span>
                      {{data4.lkjwjb}}
                    </el-col>
                    <el-col :span="6">
                      <span>订单其他旅客信息：</span>
                      {{data4.ddqtlkxx}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更行李数量：</span>
                      {{data4.bgxlsl}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更航班号：</span>
                      {{data4.bghbh}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更起飞时间：</span>
                      {{data4.bgqfsj}}
                    </el-col>
                    <el-col :span="6">
                      <span>变更到达时间：</span>
                      {{data4.bgddsj}}
                    </el-col>
                  </el-row> -->
                </div>
                <div class="box1-more">
                  <el-button type="text" @click="detailsDialogVisible=true">展开更多 ﹀</el-button>
                  <!-- <el-button type="text" @click="data4Show=false" v-if="data4Show">收起 ︿</el-button> -->

                </div>
              </div>
            </div>
            <div class="boder1" ref="box5">
              <div class="title-green hand mt-10" @click="box5=!box5">
                户籍信息 <i class="el-icon-d-caret"></i><span>({{num2.hjnum||0}})</span>
              </div>
              <div v-if="box5">
                <el-table
                  :data="data5"
                  :class="{'ak-t1':pageSize.page2==true,'ak-t2':pageSize.page2==false}"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="姓名"
                    prop="XM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="身份证号"
                    prop="SFZH">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="性别"
                    prop="XB">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出生日期"
                    prop="CSRQ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="民族"
                    prop="MZ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="住址详情"
                    prop="ZZXZ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="服务住所"
                    prop="FWCS">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="操作">
                    <template slot-scope="scope">
                      <el-button type="text" class="a-btn" icon="el-icon-view" title="查看" @click="moreFn('box5',scope.row)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data5.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page2=false" v-if="pageSize.page2&&data5.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page2=true" v-if="!pageSize.page2">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(4)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box6">
              <div class="title-green hand mt-10" @click="box6=!box6">
                出入境信息 <i class="el-icon-d-caret"></i><span>({{num.imm||0}})</span>
              </div>
              <div v-if="box6">
                <el-table
                  :data="data6"
                  class="ak-table2"
                  :class="{'ak-t1':data6.length<5,'ak-t2':pageSize.page2==false}"
                  border
                  style="width: 100%"
                  :style="{height:240*pageSize.page3+'px'}">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="姓名"
                    prop="pers_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出入标识"
                    width="80"
                    prop="in_out_flag">
                    <template slot-scope="scope">
                      <span v-if="scope.row.in_out_flag==1">入境</span>
                      <span v-if="scope.row.in_out_flag==2">出境</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="国籍/地区"
                    prop="country_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="性别"
                    width="60"
                    prop="pers_gender">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pers_gender==1">男</span>
                      <span v-if="scope.row.pers_gender==2">女</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出生日期"
                    width="100"
                    prop="birth_date">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件类型"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <!--<span class="tc-b hand" @click="moreFn('box6',scope.row)">{{scope.row.cert_no}}</span>-->
                      <span class="tc-b hand" @click="moreFn('box6',scope.row)">123456</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出入时间"
                    prop="imm_dt">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出入口岸"
                    prop="imm_port">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="交通方式"
                    prop="trs_mode_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="交通工具"
                    prop="trs_id">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="前往地/出发地"
                    prop="to_country">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data6.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page3=pageSize.page3+1" v-if="pageSize.page3+2<=data6.length/5&&data6.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page3=1" v-if="data6.length/5<pageSize.page3+2">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(5)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box7">
              <div class="title-green hand mt-10" @click="box7=!box7">
                出入境证件信息 <i class="el-icon-d-caret"></i><span>({{num.immcardNum||0}})</span>
              </div>
              <div v-if="box7">
                <el-table
                  :data="data7"
                  :class="{'ak-t1':pageSize.page4==true,'ak-t2':pageSize.page4==false}"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="姓名"
                    prop="pers_name_cn">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="性别"
                    prop="pers_gender">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pers_gender==1">男</span>
                      <span v-if="scope.row.pers_gender==2">女</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出生日期"
                    prop="pers_birth_date">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件类型"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box7',scope.row)">{{scope.row.cert_no}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="原证件号码"
                    prop="holding_cert_type">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="身份证号"
                    prop="pers_card_id">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="户籍"
                    prop="rsdt_region_code">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="审批机关"
                    prop="issuing_unit">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="签发日期"
                    prop="issuing_date">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件有效期至"
                    prop="cert_vld">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="联系电话"
                    prop="contact_tel">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data7.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page4=false" v-if="pageSize.page4&&data7.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page4=true" v-if="!pageSize.page4">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(6)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box8">
              <div class="title-green hand mt-10" @click="box8=!box8">
                签证(居留)签发信息 <i class="el-icon-d-caret"></i><span>({{num.visa||0}})</span>
              </div>
              <div v-if="box8">
                <el-table
                  :data="data8"
                  :class="{'ak-t1':pageSize.page5==true,'ak-t2':pageSize.page5==false}"
                  class="ak-table2"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="英文姓名">
                    <template slot-scope="scope">
                      <span>{{scope.row.eng_name||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="中文姓名">
                    <template slot-scope="scope">
                      <span>{{scope.row.chn_name||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="性别">
                    <template slot-scope="scope">
                      <span>{{scope.row.gender_na||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出生日期">
                    <template slot-scope="scope">
                      <span>{{scope.row.birth_date||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件号码">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box8',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="国籍/地区">
                    <template slot-scope="scope">
                      <span>{{scope.row.country_na}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="团队号">
                    <template slot-scope="scope">
                      <span>{{scope.row.group_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="签证种类">
                    <template slot-scope="scope">
                      <span>{{scope.row.visa_type_na||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="签证号码">
                    <template slot-scope="scope">
                      <span>{{scope.row.visa_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="审批机关">
                    <template slot-scope="scope">
                      <span>{{scope.row.visa_assign_dept_na||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="签发日期">
                    <template slot-scope="scope">
                      <span>{{scope.row.visa_date||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="有效期至">
                    <template slot-scope="scope">
                      <span>{{scope.row.visa_vld||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="有效次数">
                    <template slot-scope="scope">
                      <span>{{scope.row.visa_eff_nbr||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="联系电话">
                    <template slot-scope="scope">
                      <span>{{scope.row.domestic_tel||'-'}}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data8.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page5=false" v-if="pageSize.page5&&data8.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page5=true" v-if="!pageSize.page5">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(7)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box9">
              <div class="title-green hand mt-10" @click="box9=!box9">
                边检违法违规信息 <i class="el-icon-d-caret"></i><span>({{num.illegal||0}})</span>
              </div>
              <div v-if="box9">
                <el-table
                  :data="data9"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page6==true,'ak-t2':pageSize.page6==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="姓名"
                    prop="pers_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件种类"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box9',scope.row)">{{scope.row.cert_no}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="性别"
                    prop="gender_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="国籍/地区"
                    prop="country_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出生日期"
                    prop="birth_date">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="自述姓名"
                    prop="confess_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="自述出生日期"
                    prop="confess_birth_date">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="自述国家地区代码"
                    prop="confess_country_code">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="自述证件号码"
                    prop="confess_cert_no">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="往来国"
                    prop="tf_country_code">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="交通标识"
                    prop="trs_mode_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="查获时间"
                    prop="catch_dt">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="事件类型"
                    prop="evt_types_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="事件性质"
                    prop="evt_char_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="事件主题关键字"
                    prop="evt_theme">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="处理结果"
                    prop="ill_deal_rsn_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="查获口岸"
                    prop="">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data9.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page6=false" v-if="pageSize.page6&&data9.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page6=true" v-if="!pageSize.page6">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(8)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box10">
              <div class="title-green hand mt-10" @click="box10=!box10">
                遣返遣送信息 <i class="el-icon-d-caret"></i><span>({{num.repat||0}})</span>
              </div>
              <div v-if="box10">
                <el-table
                  :data="data10"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page7==true,'ak-t2':pageSize.page7==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box10',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="人员类别"
                    prop="pers_imm_type_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件种类"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="业务类型"
                    prop="repat_type">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="第二证件号码"
                    prop="sec_cert_no">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="录入时间"
                    prop="edit_dt">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="遣返遣送口岸"
                    prop="repat_port_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="遣返遣送国家"
                    prop="repat_country_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="遣返遣送原因"
                    prop="repat_rsn_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="交通标识"
                    prop="trs_id">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="往来国"
                    prop="">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data10.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page7=false" v-if="pageSize.page7&&data10.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page7=true" v-if="!pageSize.page7">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(9)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1"  ref="box11">
              <div class="title-green hand mt-10" @click="box11=!box11">
                外管常住/临住信息 <i class="el-icon-d-caret"></i><span>({{(num.resident||0)+(num.temp||0)}})</span>
              </div>
              <div v-if="box11">
                <div class="box2-t-box">
                  <span>外管常住信息</span>
                </div>
                <el-table
                  :data="data11_1"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page8==true,'ak-t2':pageSize.page8==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="英文姓名"
                    prop="eng_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="中文姓名"
                    prop="chn_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box1101',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出生日期"
                    prop="birth_date">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="国籍/地区"
                    prop="pers_country">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="性别"
                    prop="gender_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="签证号码"
                    prop="prmt_no">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="审批机关"
                    prop="issuing_organ_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="登记单位"
                    prop="">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="登记时间"
                    prop="">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="住宿地点"
                    prop="">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data11_1.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page8=false" v-if="pageSize.page8&&data11_1.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page8=true" v-if="!pageSize.page8">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(10)">导出</el-button>
                </div>
                <div class="box2-t-box">
                  <span>外管临住信息</span>
                </div>
                <el-table
                  :data="data11_2"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page9==true,'ak-t2':pageSize.page9==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="英文姓名"
                    prop="eng_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="中文姓名"
                    prop="chn_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件号码"
                    prop="hold_cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box1102',scope.row)">{{scope.row.hold_cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出生日期"
                    prop="birth_date">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="国籍/地区"
                    prop="country_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="性别"
                    prop="gender_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="签证号码"
                    prop="visas_no">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="登记时间"
                    prop="stay_date">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="签发单位"
                    prop="issuing_unit_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="住宿地点"
                    prop="stay_address">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data11_2.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page9=false" v-if="pageSize.page9&&data11_2.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page9=true" v-if="!pageSize.page9">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(11)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box12">
              <div class="title-green hand mt-10" @click="box12=!box12">
                 出入境管理案事件信息 <i class="el-icon-d-caret"></i><span>({{num.fgncas||0}})</span>
              </div>
              <div v-if="box12">
                <el-table
                  :data="data12"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page10==true,'ak-t2':pageSize.page10==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="案件名"
                    prop="case_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="案事件性质"
                    prop="case_nature_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="涉案事件类别"
                    prop="case_type_ext">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="立(受)案时间"
                    prop="case_reg_dt">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="案件数据来源"
                    prop="">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data12.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page10=false" v-if="pageSize.page10&&data12.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page10=true" v-if="!pageSize.page10">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(12)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box13">
              <div class="title-green hand mt-10" @click="box13=!box13">
                收缴证件/物品信息 <i class="el-icon-d-caret"></i><span>({{(num.cert||0)+(num.res||0)}})</span>
              </div>
              <div v-if="box13">
                <div class="box2-t-box">
                  <span>收缴证件信息</span>
                </div>
                <el-table
                  :data="data13_1"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page11==true,'ak-t2':pageSize.page11==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件姓名"
                    prop="cert_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件类别"
                    prop="cert_type">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="收缴原因"
                    prop="capt_rsn_desc">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="收缴日期"
                    prop="capt_date">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="收缴人"
                    prop="capt_oper">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="部门"
                    prop="dept_na">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data13_1.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page11=false" v-if="pageSize.page11&&data13_1.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page11=true" v-if="!pageSize.page11">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(13)">导出</el-button>
                </div>
                <div class="box2-t-box">
                  <span>收缴物品信息</span>
                </div>
                <el-table
                  :data="data13_2"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page12==true,'ak-t2':pageSize.page12==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="名称"
                    prop="res_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="种类"
                    prop="res_name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="数量"
                    prop="res_nbr">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="规格"
                    prop="res_specs">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="查获日期"
                    prop="seize_date">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="部门"
                    prop="dept_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="处理口岸"
                    prop="port_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="物品性质"
                    prop="res_prpt_na">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data13_2.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page12=false" v-if="pageSize.page12&&data13_2.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page12=true" v-if="!pageSize.page12">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(14)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box14">
              <div class="title-green hand mt-10" @click="box14=!box14">
                 携带枪支弹药信息 <i class="el-icon-d-caret"></i><span>({{num.act||0}})</span>
              </div>
              <div v-if="box14">
                <el-table
                  :data="data14"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page13==true,'ak-t2':pageSize.page13==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="携枪人姓名"
                    prop="gun_carrier">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="国籍/地区">
                    <template slot-scope="scope">
                      <span>{{nationalityName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box14',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="入境口岸"
                    prop="entry_port_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出境口岸"
                    prop="exit_port_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="接待单位"
                    prop="rcpt_unit">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="批准机关"
                    prop="approval_unit">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="批准文号"
                    prop="approval_no">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="交通标识"
                    prop="trs_id">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="目的地"
                    prop="destination">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="登记时间"
                    prop="reg_dt">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data14.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page13=false" v-if="pageSize.page13&&data14.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page13=true" v-if="!pageSize.page13">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(15)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box15">
              <div class="title-green hand mt-10" @click="box15=!box15">
                 自助备案信息 <i class="el-icon-d-caret"></i><span>({{num.self||0}})</span>
              </div>
              <div v-if="box15">
                <el-table
                  :data="data15"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page14==true,'ak-t2':pageSize.page14==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="姓名"
                    prop="name">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证号"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box15',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证类"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件有效期"
                    prop="cert_vld">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data15.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page14=false" v-if="pageSize.page14&&data15.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page14=true" v-if="!pageSize.page14">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(16)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box16">
              <div class="title-green hand mt-10" @click="box16=!box16">
                 API信息 <i class="el-icon-d-caret"></i><span>({{num.api||0}})</span>
              </div>
              <div v-if="box16">
                <el-table
                  :data="data16"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page15==true,'ak-t2':pageSize.page15==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="姓名"
                    prop="psrchnname">
                    <template slot-scope="scope">
                      <span v-if="scope.row.psrchnname!='-'">{{scope.row.psrchnname}}</span>
                      <span v-else>{{scope.row.psrname}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="国籍/地区"
                    prop="pdtcountry_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件号码"
                    prop="cert_no">
                    <template slot-scope="scope">
                      <span class="tc-b hand" @click="moreFn('box16',scope.row)">{{scope.row.cert_no||'-'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件类别"
                    prop="cert_type_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出生日期"
                    prop="pdtbirthday">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出入境时间"
                    prop="aord_time">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="出发地"
                    prop="segdeptcode_na">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="航次"
                    prop="fltnumber">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data16.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page15=false" v-if="pageSize.page15&&data16.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page15=true" v-if="!pageSize.page15">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(17)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box17">
              <div class="title-green hand mt-10" @click="box17=!box17">
                 工作单位信息 <i class="el-icon-d-caret"></i><span>({{data17.length||0}})</span>
              </div>
              <div v-if="box17">
                <el-table
                  :data="data17"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page16==true,'ak-t2':pageSize.page16==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="姓名">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证号">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="职务">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="报送单位">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="报送单位联系人">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="报送单位联系人电话">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data17.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page16=false" v-if="pageSize.page16&&data17.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page16=true" v-if="!pageSize.page16">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(18)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box18">
              <div class="title-green hand mt-10" @click="box18=!box18">
                 铁路订票信息 <i class="el-icon-d-caret"></i><span>({{num2.tlnum||0}})</span>
              </div>
              <div v-if="box18">
                <el-table
                  :data="data18"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page17==true,'ak-t2':pageSize.page17==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="姓名"
                    prop="XM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="证件号码"
                    prop="ZJHM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="票号"
                    prop="PH">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="车次"
                    prop="CC">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="乘车日期"
                    prop="CCRQ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="发站"
                    prop="FZ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="到站"
                    prop="DZ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="序号"
                    prop="XH">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="状态"
                    prop="ZT">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data18.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page17=false" v-if="pageSize.page17&&data18.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page17=true" v-if="!pageSize.page17">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(19)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box19">
              <div class="title-green hand mt-10" @click="box19=!box19">
                 民航订票信息 <i class="el-icon-d-caret"></i><span>({{num2.mhdpnum||0}})</span>
              </div>
              <div v-if="box19">
                <el-table
                  :data="data19"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page18==true,'ak-t2':pageSize.page18==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="订票记录编号"
                    prop="DPJLBH">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="旅客中文姓名"
                    prop="LKZWXM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="旅客英文姓名"
                    prop="LKYWX">
                    <template slot-scope="scope">
                      <span>{{scope.row.LKYWM+scope.row.LKYWX}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="身份证件类型"
                    prop="SFZJLX">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="身份证件号码"
                    prop="SFZJHM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="航班号"
                    prop="HBH">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="起飞航站"
                    prop="QFHZ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="当前出发日期"
                    prop="DDCFRQ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="类型"
                    prop="">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="当前出发时间"
                    prop="DDCFSJ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="到达航站"
                    prop="DDHZ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="当地到达日期"
                    prop="DDDDRQ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="当地到达时间"
                    prop="DDDDSJ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="操作代理人代码"
                    prop="CZDLRDM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="团体标识"
                    prop="TTBZ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="团体名称"
                    prop="TTMC">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="操作日期"
                    prop="CZSJ">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data19.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page18=false" v-if="pageSize.page18&&data19.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page18=true" v-if="!pageSize.page18">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(20)">导出</el-button>
                </div>
              </div>
            </div>
            <div class="boder1" ref="box20">
              <div class="title-green hand mt-10" @click="box20=!box20">
                 民航离港信息 <i class="el-icon-d-caret"></i><span>({{num2.mhlgnum||0}})</span>
              </div>
              <div v-if="box20">
                <el-table
                  :data="data20"
                  class="ak-table2"
                  :class="{'ak-t1':pageSize.page19==true,'ak-t2':pageSize.page19==false}"
                  border
                  style="width: 100%">
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="订票记录编号"
                    prop="DPJLBH">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="旅客中文姓名"
                    prop="LKZWXM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="旅客英文姓名"
                    prop="LKYWXM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="身份证件类型"
                    prop="SFZJLX">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="身份证件号码"
                    prop="SFZHM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="航班号"
                    prop="HBH">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="起飞航站"
                    prop="QFHZ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="当前出发日期"
                    prop="DQCFRQ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="类型"
                    prop="LX">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="当前出发时间"
                    prop="DQCFSJ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="到达航站"
                    prop="DDHZ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="当地到达日期"
                    prop="DDDDRQ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="当地到达时间"
                    prop="DDDDSJ">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="操作代理人代码"
                    prop="CZDLRDM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="团体标识"
                    prop="TTBS">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="团体名称"
                    prop="TTMM">
                  </el-table-column>
                  <el-table-column
                    :show-overflow-tooltip="true"
                    label="操作日期"
                    prop="CZRQ">
                  </el-table-column>
                </el-table>
                <div class="box1-more" v-if="data20.length>0">
                  <el-button type="text" class="mr-15" @click="pageSize.page19=false" v-if="pageSize.page19&&data20.length>5">展开更多 ﹀</el-button>
                  <el-button type="text" class="mr-15" @click="pageSize.page19=true" v-if="!pageSize.page19">收起 ︿</el-button>
                  <el-button type="text" @click="exportFn(21)">导出</el-button>
                </div>
              </div>
            </div>
            <div style="text-align: center;margin-top:25px;">
              <el-button type="primary" size="small" @click="exportFn(0)">导出</el-button>
            </div>
          </div>

        </el-col>
      </el-row>

    </div>
    <el-dialog title="标签管理" :visible.sync="tagDialogVisible" width="640px" :before-close="handleClose">
      <el-checkbox-group v-model="tagCheckList" class="mb-20 o-checkbox-g2">
       <el-checkbox :label="x.SERIAL"  v-for="(x,ind) in tagList" :key="ind">{{x.LABELNAME||x.TAG_NAME}}</el-checkbox>
      </el-checkbox-group>
      <div class="f-bold mb-9">
        原因<span class="redx">(必填)</span>
      </div>
      <el-input
        class="mb-9"
        type="textarea"
        v-model="tagRemark"
        :rows="3"
        placeholder="请输入添加/删除原因">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="TagSave" size="small">确认</el-button>
        <el-button type="warning" @click="tagDialogVisible=false;tagCheckList=[];tagRemark=''" size="small">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="moreDialogVisible" width="700px">
      <MoreDialog :more-data="moredata" :more-type="moreType"></MoreDialog>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="TagSave" size="small">确认</el-button>
        <el-button type="warning" @click="tagDialogVisible=false" size="small">取消</el-button>
      </div> -->
    </el-dialog>
    <el-dialog title="查看详情" :visible.sync="detailsDialogVisible">
      <Detail :detailType="0" :SERIAL="data0.iapiHeadSerial" :CHK_SERIAL="''" :PNR_TID="''" :PNR_TKTNUMBER="''" :PNR_TRAVELLER_SURNAME_TIF="''" :PNR_TRAVELLER_GIVEN_NAME_TIF="''"></Detail>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>
      </div>
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
import imgUrl from '../../../assets/img/bp_ap/ph_s.png'
import Detail from '../../BusinessApplications/InformationInquiry/DetailRYXX'

export default {
  data(){
    return{
      nationality:'',
      passportno:'',
      idcard:'',
      gender:'0',
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
      size:{size0:8,size1:3,size2:3,size301:16,size302:16,size4:3,size8:3},
      pageSize:{page1:true,page2:true,page3:1,page4:true,page5:true,page6:true,page7:true,page8:true,page9:true,page10:true,page11:true,page12:true,page13:true,page14:true,page15:true,page16:true,page17:true,page18:true,page19:true},
      nationalityName:'',
      tagRemark:'',
      data0:{},
      dataTag:{validList:[]},
      data1:{particularsList:[]},
      data2:[],
      data3:[],
      data4:{IAPI:{}},
      data4Show:false,
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
      data17:[],
      data18:[],
      data19:[],
      data20:[],
      tagList:[],
      tagCheckList:[],
      tagDialogVisible:false,
      moreDialogVisible:false,
      detailsDialogVisible:false,
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
          name:"民航离港",
          id:"box20"
        },
      ],
      ccTimer:null,
      tobox:'box0',
      toboxShow:false,
      imgURL:imgUrl,
      num:{"imm": 0,"immcardNum": 0,"visa":0,"res": 0,"act": 0,"fgncas": 0,"repat": 0,"resident":0,"temp":0,"self": 0,"cert": 0,"api": 0,"illegal": 0},
      num2:{hjnum:0,tlnum:0,mhdpnum:0,mhlgnum:0}
    }
  },
  components:{
    MoreDialog,Detail
  },
  mounted(){

  },
  activated(){
    this.data0={};
    this.imgURL=imgUrl;
    this.nationality=this.$route.query.nationality;
    this.passportno=this.$route.query.passportno;
    this.idcard=this.$route.query.idcard;
    this.gender='0';
    this.getUsers();
    this.getUserBaseInfo();
    this.getUserTagInfo();

    // this.init();

    this.moreShow=false;
    this.box1=false;
    this.box2=false;
    this.box3=false;
    this.box4=false;
    this.box5=false;
    this.box6=false;
    this.box7=false;
    this.box8=false;
    this.box9=false;
    this.box10=false;
    this.box11=false;
    this.box12=false;
    this.box13=false;
    this.box14=false;
    this.box15=false;
    this.box16=false;
    this.box17=false;
    this.box18=false;
    this.box19=false;
    this.box20=false;
  },
  methods:{
    init(){
      // if(this.data0&&this.data1.particularsList.length==0){
        this.getRecordTagInfo();
      // };
      // if(this.data1&&this.data2.length==0){
        this.getRiskEventInfo();
      // };
      // if(this.data2&&this.data3.length==0){
        this.getQueryRiskRecordUserInfo();
      // };
      // if(this.data3&&this.data4.length==0){
      // };
      // if(this.data4&&this.data5.length==0){
        this.getCensusInfo();
      // };
      // if(this.data5&&this.data6.length==0){
        this.getRecordOtherInfo('imm');
      // };
      // if(this.data6&&this.data7.length==0){
        this.getRecordOtherInfo('immcard');
      // };
      // if(this.data7&&this.data8.length==0){
        this.getRecordOtherInfo('visa');
      // };
      // if(this.data8&&this.data9.length==0){
        this.getRecordOtherInfo('illegal');
      // };
      // if(this.data9&&this.data10.length==0){
        this.getRecordOtherInfo('repat');
      // };
      // if(this.data10&&this.data11_1.length==0){
        this.getRecordOtherInfo('resident');
        this.getRecordOtherInfo('temp');
      // };
      // if(this.data11_1&&this.data12.length==0){
        this.getRecordOtherInfo('fgncas');
      // };
      // if(this.data12&&this.data13_1.length==0){
        this.getRecordOtherInfo('cert');
        this.getRecordOtherInfo('res');
      // };
      // if(this.data13_1&&this.data14.length==0){
        this.getRecordOtherInfo('act');
      // };
      // if(this.data14&&this.data15.length==0){
        this.getRecordOtherInfo('self');
      // };
      // if(this.data15&&this.data16.length==0){
        this.getRecordOtherInfo('api');
      // };
    },
    pageSizeChange(val) {
      this.pageSize.page1=val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage=val
      console.log(`当前页: ${val}`);
    },
    getUsers(){
      this.$api.post('/manage-platform/sysUserInfoController/querySysUserInfo',{},
       r => {
        this.user=r.data;
        // console.log(this.user.userId)
        this.saveRiskQueryRecordLogInfo();

      })
    },
    saveRiskQueryRecordLogInfo(){
      // console.log(this.user.userId)
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
         this.data0=r.data;
         if(r.data.GENDER_NAME=='男'){
           this.gender='1'
         }else if(r.data.GENDER_NAME=='女'){
           this.gender='2'
         }else{
           this.gender='0'
         }
         this.getPhotoInf(r.data.PASSPORTNO,r.data.NATIONALITY,r.data.BIRTHDAY,r.data.NAME,r.data.GENDER_NAME);
         // this.getRiskPersonnelForecasInfo();
         this.getRecordOtherInfo('num');
         this.getCRCCNumInfo();
         if(!this.idcard){
           this.getRecordOtherInfo('immcard');
         }
       })
    },
    getCRCCNumInfo(){
      let p={
        // "nationality":this.nationality,
        "passportno":this.idcard||this.data0.PASSPORTNO,
      }
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getCRCCNumInfo',p,
       r => {
         this.num2=r.data
       })
    },
    getPhotoInf(passportno,nationality,birthday,name,gender){
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
          "gender":gender=="男"?'1':gender=="女"?'2':'0',
          "type": 'photo',
        }
      }
      this.$api.post('/manage-platform/riskRecordController/getPhotoInf',p,
       r => {
         // console.log(r)
         this.imgURL=r.data.url||imgUrl;
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
         if(r.success){
           var arrAfter=[];
           var arrReal=[];
           for(var i=0;i<r.data.validList.length;i++){
             if(arrAfter.indexOf(r.data.validList[i].TAG_NAME)==-1){
               arrAfter.push(r.data.validList[i].TAG_NAME);
               arrReal.push(r.data.validList[i])
             }
           }
           r.data.validList = arrReal;
           this.dataTag=r.data
         }
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
    handleClose(done) {
      this.tagCheckList=[];
      this.tagRemark='';
      done();
    },
    // 保存标签
    TagSave(){
      console.log(this.tagList,this.tagCheckList)
      if(this.tagCheckList.length==0){
        this.$message.error('请先选择标签');
        return
      }else if(!this.tagRemark){
        this.$message.error('请先填备注');
        return
      }

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
             this.tagCheckList=[];
             this.tagRemark='';
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
      console.log("---",this.data0.iapiHeadSerial)
      if(!this.data0.iapiHeadSerial){
        return
      }
      let p={
        SERIAL:this.data0.iapiHeadSerial
      }
      console.log(p)
      this.$api.post('/manage-platform/iapiHead/queryIapiHeadInfo',p,
       r => {
         this.data4=r.data
       })
    },
    // getRiskPersonnelForecasInfo(){
    //   let p={
    //     "eventSerial":this.data0.SERIAL
    //   }
    //   this.$api.post('/manage-platform/riskRecordController/getRiskPersonnelForecasInfo',p,
    //    r => {
    //      this.data4=r.data
    //    })
    // },

    // 户籍信息接口
    getCensusInfo(){
      let p={
        // "nationality":this.nationality,
        // "passportno":this.passportno,
        "passportno":this.idcard
      }
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getCensusInfo',p,
       r => {
         this.data5=r.data
       })
    },
    // 综合信息展示内容
    getRecordOtherInfo(type){
      let p={
        "gender":this.gender,
        "nationality":this.nationality,
        "passportno":this.passportno,
        "birth":this.data0.BIRTHDAY,
        "ename":this.data0.ENAME,
        "type":type
      }
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getRecordOtherInfo',p,
       r => {
         this.nationalityName=r.data.nationalityName;
         switch (type) {
           case 'imm':
             if(r.data.data.dcap_f_per_act_psr_imm){
               this.data6=r.data.data.dcap_f_per_act_psr_imm;
             }
             break;
           case 'immcard':
             if(r.data.data.immcard){
               this.data7=r.data.data.immcard;
               if(!this.idcard){
                 this.idcard=this.data7[0].pers_card_id
               }
             }else{}
             break;
           case 'visa':
             if(r.data.data.dcap_f_per_cert_fgn_visa){
               this.data8=r.data.data.dcap_f_per_cert_fgn_visa;
             }
             // if(r.data.data.dcap_f_per_cert_chn_issue){
             //   this.data8=r.data.data.dcap_f_per_cert_chn_issue;
             // }else if(r.data.data.dcap_f_per_cert_fgn_visa){
               // this.data8=r.data.data.dcap_f_per_cert_fgn_visa;
             // }else if(r.data.data.dcap_f_per_cert_hmt_issue){
             //   this.data8=r.data.data.dcap_f_per_cert_hmt_issue;
             // }
             break;
           case 'illegal':
             if(r.data.data.dcap_f_evt_psr_illegal){
               this.data9=r.data.data.dcap_f_evt_psr_illegal;
             }
             break;
           case 'repat':
             if(r.data.data.dcap_f_evt_psr_repat){
               this.data10=r.data.data.dcap_f_evt_psr_repat;
             }
             break;
           case 'resident':
             if(r.data.data.dcap_f_per_fgn_resident_reg){
               this.data11_1=r.data.data.dcap_f_per_fgn_resident_reg;
             }
             break;
           case 'temp':
             if(r.data.data.dcap_f_per_fgn_temp_reg){
               this.data11_2=r.data.data.dcap_f_per_fgn_temp_reg;
             }
             break;
           case 'fgncas':
             if(r.data.data.dcap_f_evt_fgn_cas_person){
               this.data12=r.data.data.dcap_f_evt_fgn_cas_person;
             }
             break;
           case 'cert':
             if(r.data.data.dcap_f_evt_capt_cert){
               this.data13_1=r.data.data.dcap_f_evt_capt_cert;
             }
             break;
           case 'res':
             if(r.data.data.dcap_f_evt_capt_res){
               this.data13_2=r.data.data.dcap_f_evt_capt_res;
             }
             break;
           case 'act':
             if(r.data.data.dcap_f_evt_gun_act_psr_imm){
               this.data14=r.data.data.dcap_f_evt_gun_act_psr_imm;
             }
             break;
           case 'self':
             if(r.data.data.dcap_f_per_rec_self_clearance){
               this.data15=r.data.data.dcap_f_per_rec_self_clearance;
             }
             break;
           case 'api':
             if(r.data.data.dcap_f_per_pred_api_psr_info){
               this.data16=r.data.data.dcap_f_per_pred_api_psr_info;
             }
             break;
           case 'num':
              this.num=r.data.data
             break;
           default:

         }

       })
    },
    // 铁路订票
    getRailwayInfo(){
      let p={
        // "nationality":this.nationality,
        // "passportno":this.passportno,
        "passportno":this.idcard
      }
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getRailwayInfo',p,
       r => {
         this.data18=r.data
       })
    },
    // 民航订票
    getCivilAviationInfo(){
      let p={
        // "nationality":this.nationality,
        // "passportno":this.passportno,
        "passportno":this.idcard||this.data0.PASSPORTNO
      }
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getCivilAviationInfo',p,
       r => {
         this.data19=r.data
       })
    },
    // 民航离港
    getCivilAviationAbsencesInfo(){
      let p={
        // "nationality":this.nationality,
        // "passportno":this.passportno,
        "passportno":this.idcard||this.data0.PASSPORTNO
      }
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getCivilAviationAbsencesInfo',p,
       r => {
         this.data20=r.data
       })
    },
    exportFn(type){
      let p={
        "nationality":this.nationality,
        "passportno":this.passportno,
        "type":type
      }
      this.$api.post('/manage-platform/excelController/export',p,
       r => {
         console.log("data",r)
         // if (!r) {
         //     return
         // }
         let url = window.URL.createObjectURL(new Blob([r.data],{type:"application/octet-stream"}))

         let link = document.createElement('a')
         link.style.display = 'none'
         link.href = url;
         link.setAttribute('download', 'download.xlsx')
         document.body.appendChild(link)
         link.click()
       },e=>{},'','blob')
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
    $route:function(val){
      if(val.query.nationality&&val.query.passportno){
        this.nationality=val.query.nationality;
        this.passportno=val.query.passportno;
        this.getUsers();
        this.getUserBaseInfo();
        this.getUserTagInfo();
        this.moreShow=false;
        this.box1=false;
        this.box2=false;
        this.box3=false;
        this.box4=false;
        this.box5=false;
        this.box6=false;
        this.box7=false;
        this.box8=false;
        this.box9=false;
        this.box10=false;
        this.box11=false;
        this.box12=false;
        this.box13=false;
        this.box14=false;
        this.box15=false;
        this.box16=false;
        this.box17=false;
        this.box18=false;
        this.box19=false;
        this.box20=false;
      }

    },
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
        console.log("this.data6",this.data6)
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
    // 铁路订票
    box18:function(val){
      if(val){
        this.getRailwayInfo();
      }
    },
    // 民航订票
    box19:function(val){
      if(val){
        this.getCivilAviationInfo();
      }
    },
    // 民航离港
    box20:function(val){
      if(val){
        this.getCivilAviationAbsencesInfo();
      }
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
  height: 32px;
  background: #eef9ff;
  text-align: center;
  display: flex;
  justify-content: center;
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
