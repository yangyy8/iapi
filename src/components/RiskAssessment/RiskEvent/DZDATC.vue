<template lang="html">
  <div class="moreDialog">
    <div class="" v-if="moreType=='box6'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          出入标识:
          <span v-if="moreData.in_out_flag==1">入境</span>
          <span v-if="moreData.in_out_flag==2">出境</span>
        </el-col>
        <el-col :span="12">
          人员类别：{{moreData.pers_imm_type_na}}
        </el-col>
        <el-col :span="12">
          姓名：{{moreData.pers_name}}
        </el-col>
        <el-col :span="12">
          国籍/地区：{{moreData.country_na}}
        </el-col>
        <el-col :span="12">
          性别：{{moreData.pers_gender_na}}
        </el-col>
        <el-col :span="12">
          出生日期：{{moreData.birth_date}}
        </el-col>
        <el-col :span="12">
          证件类型：{{moreData.cert_type_na}}
        </el-col>
        <el-col :span="12">
          证件号码：{{moreData.cert_no}}
        </el-col>
        <el-col :span="12">
          签证类型：{{moreData.visas_type_na}}
        </el-col>
        <el-col :span="12">
          签证号码：{{moreData.visas_no}}
        </el-col>
        <el-col :span="12">
          停留期：{{moreData.entry_period}}
        </el-col>
        <el-col :span="12">
          出入时间：{{moreData.imm_time}}
        </el-col>
        <el-col :span="12">
          出入口岸：{{moreData.imm_port}}
        </el-col>
        <el-col :span="12">
          出入境事由：{{moreData.imm_rsn_code_na}}
        </el-col>
        <el-col :span="12">
          检查员号：{{moreData.inspector}}
        </el-col>
        <el-col :span="12">
          检查员姓名：{{moreData.inspector_name}}
        </el-col>
        <el-col :span="12">
          交通方式：{{moreData.trs_mode_na}}
        </el-col>
        <el-col :span="12">
          交通工具：{{moreData.trs_id}}
        </el-col>
        <el-col :span="12">
          前往地/出发地：{{moreData.to_country}}
        </el-col>
        <el-col :span="12">
          发证机关：{{moreData.issuing_unit_na}}
        </el-col>
        <el-col :span="12">
          通道号：{{moreData.channel_no}}
        </el-col>
        <el-col :span="12">
          旅行团号：{{moreData.tour_grp_no}}
        </el-col>
        <el-col :span="12">
          部门名称：{{moreData.dept_name}}
        </el-col>
        <el-col :span="12">
          自定义描述：{{moreData.in_out_flag}}
        </el-col>
        <el-col :span="12">
          自助通道标记：{{moreData.self_channel_flag}}
        </el-col>
        <el-col :span="12">
          后台补录标记：{{moreData.back_flag}}
        </el-col>
        <el-col :span="12">
          第二姓名：{{moreData.second_pers_name}}
        </el-col>
        <el-col :span="12">
          第二证件类型：{{moreData.sec_cert_type_na}}
        </el-col>
        <el-col :span="12">
          第二证件号码：{{moreData.sec_cert_no}}
        </el-col>
        <el-col :span="12">
          第二出生日期：{{moreData.sec_birth_date}}
        </el-col>
      </el-row>
    </div>
    <div class="" v-if="moreType=='box7'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          姓名：{{moreData.pers_name_cn}}
        </el-col>
        <el-col :span="12">
          拼音姓名：{{moreData.pers_name_py}}
        </el-col>
        <el-col :span="12">
          别名/曾用名：{{moreData.pers_name_sec}}
        </el-col>
        <el-col :span="12">
          性别：{{moreData.pers_gender_na}}
        </el-col>
        <el-col :span="12">
          出生日期：{{moreData.pers_birth_date}}
        </el-col>
        <el-col :span="12">
          国籍/地区：{{moreData.pers_country}}
        </el-col>
        <el-col :span="12">
          民族：{{moreData.pers_nation}}
        </el-col>
        <el-col :span="12">
          出生地：{{moreData.pers_birth_address}}
        </el-col>
        <el-col :span="12">
          身份证号：{{moreData.pers_card_id}}
        </el-col>
        <el-col :span="12">
          文化程度：{{moreData.education_code}}
        </el-col>
        <el-col :span="12">
          职级职称：{{moreData.position_grade_code}}
        </el-col>
        <el-col :span="12">
          户籍地：{{moreData.rsdt_region_code}}
        </el-col>
        <el-col :span="12">
          派出所：{{moreData.police_dept_name}}
        </el-col>
        <el-col :span="12">
          现住地：{{moreData.curr_address}}
        </el-col>
        <el-col :span="12">
          工作单位：{{moreData.work_unit}}
        </el-col>
        <el-col :span="12">
          职业：{{moreData.profession_code}}
        </el-col>
        <el-col :span="12">
          证件类型：{{moreData.cert_type_na}}
        </el-col>
        <el-col :span="12">
          证件号码：{{moreData.cert_no}}
        </el-col>
        <el-col :span="12">
          办证类别：{{moreData.apply_type}}
        </el-col>
        <el-col :span="12">
          原持证号码：{{moreData.holding_cert_typ}}
        </el-col>
        <el-col :span="12">
          前往国/地区：{{moreData.to_country_code}}
        </el-col>
        <el-col :span="12">
          出境事由：{{moreData.exit_reason_cod}}
        </el-col>
        <el-col :span="12">
          签证机关：{{moreData.issuing_uni}}
        </el-col>
        <el-col :span="12">
          制证单位：{{moreData.accred_unit}}
        </el-col>
        <el-col :span="12">
          签发日期：{{moreData.issuing_date}}
        </el-col>
        <el-col :span="12">
          有效期至：{{moreData.cert_vld}}
        </el-col>
        <el-col :span="12">
          受理时间：{{moreData.accept_dt}}
        </el-col>
        <el-col :span="12">
          受理机关：{{moreData.accept_dept}}
        </el-col>
        <el-col :span="12">
          备注：{{moreData.remakrs}}
        </el-col>
        <el-col :span="12">
          数据来源：{{moreData.data_src_flag}}
        </el-col>
        <el-col :span="12">
          联系电话：{{moreData.contact_tel}}
        </el-col>
        <el-col :span="12">
          手机号码：{{moreData.mobile_no}}
        </el-col>
        <el-col :span="12">
          上报省份：{{moreData.rpt_prov}}
        </el-col>
        <el-col :span="12">
          异地标识：{{moreData.remote_flag}}
        </el-col>
      </el-row>
    </div>
    <div class="" v-if="moreType=='box8'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          英文姓名：{{moreData.pers_name||moreData.eng_name||moreData.pers_name_en||'-'}}
        </el-col>
        <el-col :span="12">
          中文姓名：{{moreData.pers_name_cn||moreData.chn_name||moreData.pers_name_cn||'-'}}
        </el-col>
        <el-col :span="12">
          性别：{{moreData.pers_gender_na||moreData.gender_na||'-'}}
        </el-col>
        <el-col :span="12">
          出生日期：{{moreData.pers_birth_date||moreData.birth_date||'-'}}
        </el-col>
        <el-col :span="12">
          国籍/地区：{{moreData.country_na||'-'}}
        </el-col>
        <!--<el-col :span="12">
          身份：{{moreData.fgn_sts||'-'}}
        </el-col>-->
        <el-col :span="12">
          申请事由：{{moreData.apply_rsn_na||'-'}}
        </el-col>
        <el-col :span="12">
          证件类型：{{moreData.cert_type_na||moreData.passport_type||'-'}}
        </el-col>
        <el-col :span="12">
          证件号码：{{moreData.cert_no||'-'}}
        </el-col>
        <el-col :span="12">
          证件有效期：{{moreData.visa_type_na||'-'}}
        </el-col>
        <el-col :span="12">
          偕行人员：{{moreData.accompany_nbr||'-'}}
        </el-col>
        <!--<el-col :span="12">
          境外人员类别：{{moreData.fgn_type||'-'}}
        </el-col>-->
        <el-col :span="12">
          人员地域类别：{{moreData.pers_reg_catg_na||'-'}}
        </el-col>
        <!--<el-col :span="12">
          境外人员身份证号码：{{moreData.fgn_card_id||'-'}}
        </el-col>-->
        <el-col :span="12">
          原签证/居留许可种类：{{moreData.orig_visa_type_na||'-'}}
        </el-col>
        <el-col :span="12">
          原签证/居留许可号码：{{moreData.orig_visa_no||'-'}}
        </el-col>
        <el-col :span="12">
          原签证/居留许可停留期至：{{moreData.orig_visa_vld||'-'}}
        </el-col>
        <el-col :span="12">
          签证种类：{{moreData.visa_type_na||'-'}}
        </el-col>
        <el-col :span="12">
          签证号码：{{moreData.visa_no||'-'}}
        </el-col>
        <el-col :span="12">
          签证发放机关：{{moreData.visa_assign_dept_na||'-'}}
        </el-col>
        <el-col :span="12">
          制证单位：{{moreData.accred_unit_na||'-'}}
        </el-col>
        <el-col :span="12">
          签证有效次数：{{moreData.visa_eff_nbr||'-'}}
        </el-col>
        <el-col :span="12">
          团队号：{{moreData.group_no||'-'}}
        </el-col>
        <el-col :span="12">
          团队人数：{{moreData.group_nbr||'-'}}
        </el-col>
        <el-col :span="12">
          签证签发日期：{{moreData.visa_date||'-'}}
        </el-col>
        <el-col :span="12">
          签证有效期：{{moreData.visa_vld||'-'}}
        </el-col>
        <el-col :span="12">
          签证停留期：{{moreData.visa_valid_na||'-'}}
        </el-col>
        <el-col :span="12">
          签证/居留许可事由：{{moreData.visa_rstd_rsn_na||'-'}}
        </el-col>
        <el-col :span="12">
          邀请单位名称：{{moreData.invt_unit_name||'-'}}
        </el-col>
        <el-col :span="12">
          邀请人中文姓名：{{moreData.invt_chn_name||'-'}}
        </el-col>
        <el-col :span="12">
          邀请人性别：{{moreData.invt_gender_na||'-'}}
        </el-col>
        <el-col :span="12">
          邀请人出生日期：{{moreData.invt_birth_date||'-'}}
        </el-col>
        <el-col :span="12">
          邀请人身份证号码：{{moreData.invt_card_id||'-'}}
        </el-col>
        <el-col :span="12">
          邀请人证件号码：{{moreData.invt_cert_no||'-'}}
        </el-col>
        <el-col :span="12">
          邀请人详细地址：{{moreData.invt_address||'-'}}
        </el-col>
        <el-col :span="12">
          邀请人联系电话：{{moreData.invt_tel||'-'}}
        </el-col>
        <el-col :span="12">
          受理单位：{{moreData.accept_organ_na||'-'}}
        </el-col>
        <el-col :span="12">
          受理时间：{{moreData.accept_dt||'-'}}
        </el-col>
        <el-col :span="12">
          居住地行政区划：{{moreData.curr_region_na||'-'}}
        </el-col>
        <el-col :span="12">
          居住地派出所名称：{{moreData.curr_lps_name||'-'}}
        </el-col>
        <el-col :span="12">
          居住地详细地址：{{moreData.curr_address||'-'}}
        </el-col>
        <el-col :span="12">
          工作单位行政区划：{{moreData.unit_region_na||'-'}}
        </el-col>
        <el-col :span="12">
          工作(学习)单位所在派出所名称：{{moreData.unit_lps_name||'-'}}
        </el-col>
        <el-col :span="12">
          工作单位组织机构名称：{{moreData.unit_org_name||'-'}}
        </el-col>
        <el-col :span="12">
          常住标识：{{moreData.resident_flag||'-'}}
        </el-col>
        <el-col :span="12">
          联系电话：{{moreData.domestic_tel||'-'}}
        </el-col>

      </el-row>
    </div>
    <div class="" v-if="moreType=='box9'">
      <div class="ak-tab">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':desctype==0}" @click="desctype=0">
            违法违规人员信息
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':desctype==1}" @click="desctype=1;descMeth()">
            案事件和处理结果
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':desctype==2}" @click="desctype=2;descMeth()">
            收缴证件及物品信息
          </div>
        </div>
      </div>
      <div class="ak-tab-pane pt-10" @mouseover="mouseHeader">
        <el-row style="line-height:32px;" v-if="desctype==0">
          <el-col :span="12">
            违法违规事件编号：{{moreData.evt_id}}
          </el-col>
          <el-col :span="12">
            姓名：{{moreData.pers_name}}
          </el-col>
          <el-col :span="12">
            性别：{{moreData.gender_na}}
          </el-col>
          <el-col :span="12">
            出生日期：{{moreData.birth_date}}
          </el-col>
          <el-col :span="12">
            国籍/地区：{{moreData.country_na}}
          </el-col>
          <el-col :span="12">
            证件类型：{{moreData.cert_type_na}}
          </el-col>
          <el-col :span="12">
            证件号码：{{moreData.cert_no}}
          </el-col>
          <el-col :span="12">
            居住地行政区划：{{moreData.curr_region_na}}
          </el-col>
          <el-col :span="12">
            人员类别：{{moreData.pers_imm_type_na}}
          </el-col>
          <el-col :span="12">
            发证地行政区划：{{moreData.cert_region_na}}
          </el-col>
          <el-col :span="12">
            原出入境日期：{{moreData.orig_imm_date}}
          </el-col>
          <el-col :span="12">
            原出入口岸：{{moreData.orig_imm_port_na}}
          </el-col>
          <el-col :span="12">
            出入境目的：{{moreData.imm_purpose}}
          </el-col>
          <el-col :span="12">
            遣返遣送国家：{{moreData.repat_country_na}}
          </el-col>
          <el-col :span="12">
            处理部门：{{moreData.deal_dept_na}}
          </el-col>
          <el-col :span="12">
            查中标志：{{moreData.catch_flag}}
          </el-col>
          <el-col :span="12">
            业务类型：{{moreData.repat_type}}
          </el-col>
          <el-col :span="12">
            遣返遣送备注：{{moreData.repat_remarks}}
          </el-col>
          <el-col :span="12">
            录入人：{{moreData.edit_oper}}
          </el-col>
          <el-col :span="12">
            录入时间：{{moreData.edit_dt}}
          </el-col>
          <el-col :span="12">
            交通标识：{{moreData.trs_id}}
          </el-col>
          <el-col :span="12">
            处理结果描述：{{moreData.deal_rslt_desc}}
          </el-col>
          <el-col :span="12">
            查获时间：{{moreData.seize_dt}}
          </el-col>
          <el-col :span="12">
            第二姓名：{{moreData.second_name}}
          </el-col>
          <el-col :span="12">
            第二出生日期：{{moreData.sec_birth_date}}
          </el-col>
          <el-col :span="12">
            第二证件类型：{{moreData.sec_cert_type}}
          </el-col>
          <el-col :span="12">
            第二证件号码：{{moreData.sec_cert_no}}
          </el-col>
          <el-col :span="12">
            第二证类名称：{{moreData.sec_cert_type_na}}
          </el-col>
        </el-row>
        <el-row style="line-height:32px;" v-if="desctype==1">
          <el-row style="line-height:32px;">
            <el-col :span="12">
              事件编号：{{descData.evt_id||'-'}}
            </el-col>
            <el-col :span="12">
              事件类别：{{descData.evt_types||'-'}}
            </el-col>
            <el-col :span="12">
              事件性质：{{descData.evt_char_code||'-'}}
            </el-col>
            <el-col :span="12">
              公文种类：{{descData.docs_type_na||'-'}}
            </el-col>
            <el-col :span="12">
              审批人：{{descData.approver||'-'}}
            </el-col>
            <el-col :span="12">
              处理结果：{{descData.ill_deal_rsn_na||'-'}}
            </el-col>
            <el-col :span="24">
              事件主题：{{descData.evt_theme||'-'}}
            </el-col>
            <el-col :span="24">
              事件描述：{{descData.evt_desc||'-'}}
            </el-col>
          </el-row>
          <div class="title-green mt-10">
            处理意见
          </div>
          <el-row style="line-height:32px;">
            <el-col :span="24">
              {{descData.deal_opinion||'-'}}
            </el-col>
         </el-row>
        </el-row>
        <div class="" v-if="desctype==2">
          <div class="box2-t-box">
            <span>收缴证件信息</span>
          </div>
          <el-table
            :data="certData_1"
            class="ak-table2"
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
          <div class="box2-t-box">
            <span>收缴物品信息</span>
          </div>
          <el-table
            :data="certData_2"
            class="ak-table2"
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
        </div>
      </div>

    </div>
    <div class="" v-if="moreType=='box10'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          事件编号：{{moreData.ill_evt_id}}
        </el-col>
        <el-col :span="12">
          姓名：{{moreData.name}}
        </el-col>
        <el-col :span="12">
          性别：{{moreData.gender}}
        </el-col>
        <el-col :span="12">
          出生日期：{{moreData.birth_date}}
        </el-col>
        <el-col :span="12">
          国籍/地区：{{moreData.country_code}}
        </el-col>
        <el-col :span="12">
          证件类型：{{moreData.cert_type_na}}
        </el-col>
        <el-col :span="12">
          证件号码：{{moreData.cert_no}}
        </el-col>
        <el-col :span="12">
          居住地行政区划：{{moreData.curr_region_na}}
        </el-col>
        <el-col :span="12">
          人员类别：{{moreData.pers_imm_type_na}}
        </el-col>
        <el-col :span="12">
          发证地行政区划：{{moreData.cert_region_na}}
        </el-col>
        <el-col :span="12">
          原出入境日期：{{moreData.orig_imm_date}}
        </el-col>
        <el-col :span="12">
          原出入口岸：{{moreData.orig_imm_port_na}}
        </el-col>
        <el-col :span="12">
          出入境目的：{{moreData.imm_purpose}}
        </el-col>
        <el-col :span="12">
          遣返遣送国家：{{moreData.repat_country_na}}
        </el-col>
        <el-col :span="12">
          处理部门：{{moreData.deal_dept_na}}
        </el-col>
        <el-col :span="12">
          查中标志：{{moreData.catch_flag}}
        </el-col>
        <el-col :span="12">
          业务类型：{{moreData.repat_type}}
        </el-col>
        <el-col :span="12">
          遣返遣送备注：{{moreData.repat_remarks}}
        </el-col>
        <el-col :span="12">
          录入人：{{moreData.edit_oper}}
        </el-col>
        <el-col :span="12">
          录入时间：{{moreData.edit_dt}}
        </el-col>
        <el-col :span="12">
          交通标识：{{moreData.trs_id}}
        </el-col>
        <el-col :span="12">
          处理结果描述：{{moreData.deal_rslt_desc}}
        </el-col>
        <el-col :span="12">
          查获时间：{{moreData.seize_dt}}
        </el-col>
        <el-col :span="12">
          第二姓名：{{moreData.second_name}}
        </el-col>
        <el-col :span="12">
          第二出生日期：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          第二证件类型：{{moreData.sec_cert_type}}
        </el-col>
        <el-col :span="12">
          第二证件号码：{{moreData.sec_cert_no}}
        </el-col>
        <el-col :span="12">
          第二证类名称：{{moreData.sec_cert_type_na}}
        </el-col>
      </el-row>
    </div>
    <div class="" v-if="moreType=='box1101'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          英文姓名：{{moreData.eng_name}}
        </el-col>
        <el-col :span="12">
          中文姓名：{{moreData.chn_name}}
        </el-col>
        <el-col :span="12">
          性别：{{moreData.gender_na}}
        </el-col>
        <el-col :span="12">
          出生日期：{{moreData.birth_date}}
        </el-col>
        <el-col :span="12">
          国籍/地区：{{moreData.pers_country||moreData.country_na}}
        </el-col>
        <el-col :span="12">
          证件种类：{{moreData.cert_type_na||moreData.hold_cert_type}}
        </el-col>
        <el-col :span="12">
          证件号码：{{moreData.cert_no||moreData.hold_cert_no}}
        </el-col>

        <el-col :span="12">
          证件有效期：{{moreData.cert_vld}}
        </el-col>
        <el-col :span="12">
          人员类别：{{moreData.pers_type}}
        </el-col>
        <el-col :span="12">
          身份：{{moreData.fgn_sts}}
        </el-col>
        <el-col :span="12">
          境外人员身份证号：{{moreData.fgn_card_id}}
        </el-col>
        <el-col :span="12">
          签证(注)种类：{{moreData.visas_type_na||'-'}}
        </el-col>
        <el-col :span="12">
          签证(注)号码：{{moreData.prmt_no||moreData.visas_no}}
        </el-col>
        <el-col :span="12">
          证件内人数：{{moreData.in_cert_nb}}
        </el-col>
        <el-col :span="12">
          入境事由：{{moreData.entry_rsn_code}}
        </el-col>
        <el-col :span="12">
          居留事由：{{moreData.rsdt_rsn_code}}
        </el-col>
        <el-col :span="12">
          居留许可签发日期：{{moreData.prmt_issuing_date}}
        </el-col>
        <el-col :span="12">
          居留许可有效期至：{{moreData.prmt_vld}}
        </el-col>
        <el-col :span="12">
          签发机关：{{moreData.issuing_organ}}
        </el-col>
        <el-col :span="12">
          上报省份：{{moreData.rpt_prov_na||'-'}}
        </el-col>
        <el-col :span="12">
          常住人员联系电话：{{moreData.rsdt_fgn_tel||'-'}}
        </el-col>
        <el-col :span="12">
          单位区划：{{moreData.curr_wu_region_na||'-'}}
        </el-col>
        <el-col :span="12">
          单位派出所：{{moreData.curr_wu_lps_name||'-'}}
        </el-col>
        <el-col :span="12">
          工作单位：{{moreData.curr_wu_name||'-'}}
        </el-col>
        <el-col :span="12">
          工作地城市：{{moreData.work_city_na||'-'}}
        </el-col>
        <el-col :span="12">
          工作起始时间：{{moreData.work_start_date||'-'}}
        </el-col>
        <el-col :span="12">
          工作终止时间：{{moreData.work_end_date||'-'}}
        </el-col>
        <el-col :span="12">
          工作状态类型：{{moreData.work_sts_type||'-'}}
        </el-col>
        <el-col :span="12">
          居住地城市：{{moreData.rsdt_city_na||'-'}}
        </el-col>
        <el-col :span="12">
          居住地区划：{{moreData.curr_region_na||'-'}}
        </el-col>
        <el-col :span="12">
          居住地派出所：{{moreData.curr_lps_name||'-'}}
        </el-col>
        <el-col :span="12">
          居住地详细地址：{{moreData.curr_address||'-'}}
        </el-col>
        <el-col :span="12">
          居住状态类型：{{moreData.rsdt_sts_type||'-'}}
        </el-col>
      </el-row>
    </div>
    <div class="" v-if="moreType=='box1102'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          英文姓名：{{moreData.eng_name}}
        </el-col>
        <el-col :span="12">
          中文姓名：{{moreData.chn_name}}
        </el-col>
        <el-col :span="12">
          数据来源：{{moreData.data_src_flag||'-'}}
        </el-col>
        <el-col :span="12">
          性别：{{moreData.gender_na}}
        </el-col>
        <el-col :span="12">
          出生日期：{{moreData.birth_date}}
        </el-col>
        <el-col :span="12">
          国籍/地区：{{moreData.country_na}}
        </el-col>
        <el-col :span="12">
          证件类型：{{moreData.hold_cert_type_na}}
        </el-col>
        <el-col :span="12">
          证件号码：{{moreData.hold_cert_no}}
        </el-col>
        <el-col :span="12">
          签证(注)种类：{{moreData.visas_type_na||'-'}}
        </el-col>
        <el-col :span="12">
          签证(注)号码：{{moreData.visas_no}}
        </el-col>
        <el-col :span="12">
          签证(注)有效期：{{moreData.visas_vld}}
        </el-col>
        <el-col :span="12">
          住宿日期：{{moreData.stay_date||'-'}}
        </el-col>
        <el-col :span="12">
          留宿单位地址：{{moreData.stay_address||'-'}}
        </el-col>
        <el-col :span="12">
          离开日期：{{moreData.leave_date||'-'}}
        </el-col>
        <el-col :span="12">
          接待单位：{{moreData.rcpt_unit||'-'}}
        </el-col>
        <el-col :span="12">
          登记单位行政区划：{{moreData.tsu_region_na||'-'}}
        </el-col>
        <el-col :span="12">
          登记单位：{{moreData.tsu_name||'-'}}
        </el-col>
        <el-col :span="12">
          上报省份：{{moreData.rpt_prov_na||'-'}}
        </el-col>
        <el-col :span="12">
          上报城市：{{moreData.sjsbcs_na||'-'}}
        </el-col>
        <el-col :span="12">
          备注：{{moreData.remakrs||'-'}}
        </el-col>
      </el-row>
    </div>
    <div class="" v-if="moreType=='box12'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          英文姓名：{{moreData.eng_name}}
        </el-col>
        <el-col :span="12">
          中文姓名：{{moreData.chn_name}}
        </el-col>
        <el-col :span="12">
          数据来源：{{moreData.data_src_flag||'-'}}
        </el-col>
        <el-col :span="12">
          性别：{{moreData.gender_na}}
        </el-col>
        <el-col :span="12">
          出生日期：{{moreData.birth_date}}
        </el-col>
        <el-col :span="12">
          国籍/地区：{{moreData.pers_country||moreData.country_na}}
        </el-col>
        <el-col :span="12">
          证件类型：{{moreData.cert_type_na||moreData.hold_cert_type}}
        </el-col>
        <el-col :span="12">
          证件号码：{{moreData.cert_no||moreData.hold_cert_no}}
        </el-col>
        <el-col :span="12">
          签证(注)类型：{{moreData.visas_type_na||'-'}}
        </el-col>
        <el-col :span="12">
          签证(注)号码：{{moreData.prmt_no||moreData.visas_no}}
        </el-col>
        <el-col :span="12">
          签证(注)有效期：{{moreData.prmt_vld||moreData.visas_vld}}
        </el-col>
        <el-col :span="12">
          住宿日期：{{moreData.stay_date||'-'}}
        </el-col>
        <el-col :span="12">
          留宿单位地址：{{moreData.stay_address||'-'}}
        </el-col>
        <el-col :span="12">
          离开日期：{{moreData.leave_date||'-'}}
        </el-col>
        <el-col :span="12">
          接待单位：{{moreData.rcpt_unit||'-'}}
        </el-col>
        <el-col :span="12">
          登记单位行政区划：{{moreData.tsu_region_na||'-'}}
        </el-col>
        <el-col :span="12">
          登记单位：{{moreData.tsu_name||'-'}}
        </el-col>
        <el-col :span="12">
          上报省份：{{moreData.rpt_prov_na||'-'}}
        </el-col>
        <el-col :span="12">
          上报城市：{{moreData.sjsbcs_na||'-'}}
        </el-col>
        <el-col :span="12">
          备注：{{moreData.remakrs||'-'}}
        </el-col>
      </el-row>
    </div>
    <div class="" v-if="moreType=='box14'">
      <el-row style="line-height:32px;" class="boder1">
        <el-col :span="12">
          证件号码：{{moreData.cert_no}}
        </el-col>
        <el-col :span="12">
          联系电话：{{moreData.contact_tel}}
        </el-col>
        <el-col :span="12">
          携枪人姓名：{{moreData.gun_carrier||'-'}}
        </el-col>
        <el-col :span="12">
          批准机关：{{moreData.approval_unit}}
        </el-col>
        <el-col :span="12">
          国籍/地区：{{moreData.country_code}}
        </el-col>
        <el-col :span="12">
          批准文号：{{moreData.approval_no}}
        </el-col>
        <el-col :span="12">
          入境口岸：{{moreData.entry_port_na}}
        </el-col>
        <el-col :span="12">
          交通标识：{{moreData.cert_no||moreData.hold_cert_no}}
        </el-col>
        <el-col :span="12">
          过境口岸：{{moreData.trans_port_na||'-'}}
        </el-col>
        <el-col :span="12">
          值班领导：{{moreData.on_duty_leader_na}}
        </el-col>
        <el-col :span="12">
          接待单位：{{moreData.rcpt_unit}}
        </el-col>
        <el-col :span="12">
          备注：{{moreData.remark||'-'}}
        </el-col>
        <el-col :span="12">
          联系人姓名：{{moreData.contact_name||'-'}}
        </el-col>
      </el-row>
      <div class="box2-t-box">
        枪支信息
      </div>
      <el-row style="line-height:32px;" class="boder1">
        <el-col :span="12">
            枪支弹药序号：{{moreData.stay_address||'-'}}
        </el-col>
        <el-col :span="12">
            子弹型号：{{moreData.stay_address||'-'}}
        </el-col>
        <el-col :span="12">
            枪支名称：{{moreData.stay_address||'-'}}
        </el-col>
        <el-col :span="12">
            子弹数量：{{moreData.stay_address||'-'}}
        </el-col>
        <el-col :span="12">
            枪支号码：{{moreData.stay_address||'-'}}
        </el-col>
        <el-col :span="12">
            枪支弹药类别：{{moreData.stay_address||'-'}}
        </el-col>
        <el-col :span="12">
            枪支数量：{{moreData.stay_address||'-'}}
        </el-col>
        <el-col :span="12">
            暂存标志：{{moreData.stay_address||'-'}}
        </el-col>
      </el-row>
    </div>
    <div class="" v-if="moreType=='box15'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          姓名：{{moreData.name}}
        </el-col>
        <el-col :span="12">
          证件类型：{{moreData.cert_type_na}}
        </el-col>
        <el-col :span="12">
          证件号码：{{moreData.cert_no}}
        </el-col>
        <el-col :span="12">
          国籍/地区：{{moreData.country_code}}
        </el-col>
        <el-col :span="12">
          疑难字说明：{{moreData.complex_desc}}
        </el-col>
        <el-col :span="12">
          性别：{{moreData.gender_na}}
        </el-col>
        <el-col :span="12">
          出生日期：{{moreData.birth_date}}
        </el-col>
        <el-col :span="12">
          民族：{{moreData.nation_na}}
        </el-col>
        <el-col :span="12">
          证件有效期：{{moreData.cert_vld}}
        </el-col>
        <el-col :span="12">
          签证有效期：{{moreData.visas_vld}}
        </el-col>
        <el-col :span="12">
          签证(注)号码：{{moreData.visas_no}}
        </el-col>
        <el-col :span="12">
          签证(注)类别：{{moreData.visas_type_na}}
        </el-col>
        <el-col :span="12">
          停留期限：{{moreData.period}}
        </el-col>
        <el-col :span="12">
          自定义代码：{{moreData.user_define_code}}
        </el-col>
        <el-col :span="12">
          操作员代码：{{moreData.oper_code}}
        </el-col>
        <el-col :span="12">
          操作员：{{moreData.oper_code_na}}
        </el-col>
        <el-col :span="12">
          操作日期：{{moreData.oper_date}}
        </el-col>
        <el-col :span="12">
          采集地点：{{moreData.gather_place_na}}
        </el-col>
        <el-col :span="12">
          发证机关：{{moreData.issuing_orfan_na}}
        </el-col>
        <el-col :span="12">
          前往来自国：{{moreData.tf_country_na}}
        </el-col>
        <el-col :span="12">
          第二姓名：{{moreData.second_name}}
        </el-col>
        <el-col :span="12">
          第二出生日期：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          第二证件号码：{{moreData.sec_cert_no}}
        </el-col>
        <el-col :span="12">
          第二证件类型：{{moreData.sec_cert_type}}
        </el-col>
        <el-col :span="12">
          自助人类别：{{moreData.ss_pers_type_na}}
        </el-col>
        <el-col :span="12">
          第二签证名称：{{moreData.sec_visas_type_na}}
        </el-col>
        <el-col :span="12">
          第二签证号码：{{moreData.sec_visas_no}}
        </el-col>
        <el-col :span="12">
          第二签证类别：{{moreData.sec_visas_type}}
        </el-col>
      </el-row>
    </div>
    <div class="" v-if="moreType=='box16'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          姓名：
            <span v-if="moreData.psrchnname!='-'">{{moreData.psrchnname}}</span>
            <span v-else>{{moreData.psrname}}</span>
        </el-col>
        <el-col :span="12">
          消息发送时间：{{moreData.dttm}}
        </el-col>
        <el-col :span="12">
          出入标识：{{moreData.aord}}
        </el-col>
        <el-col :span="12">
          航空公司：{{moreData.fltairl_na}}
        </el-col>
        <el-col :span="12">
          航班：{{moreData.fltnumber}}
        </el-col>
        <el-col :span="12">
          航班后缀：{{moreData.fltsuffix}}
        </el-col>
        <el-col :span="12">
          航班日期：{{moreData.fltdate}}
        </el-col>
        <el-col :span="12">
          来自城市：{{moreData.fltcity_na}}
        </el-col>
        <el-col :span="12">
          来自国家：{{moreData.fltcountry_na}}
        </el-col>
        <el-col :span="12">
          出发地：{{moreData.fltdept_na}}
        </el-col>
        <el-col :span="12">
          出发时间：{{moreData.fltdepttm}}
        </el-col>
        <el-col :span="12">
          目的地：{{moreData.fltdest_na}}
        </el-col>
        <el-col :span="12">
          到达时间：{{moreData.staarvetm}}
        </el-col>
        <el-col :span="12">
          中文姓名：{{moreData.psrchnname}}
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name:"MoreDialog",
  props: ['moreData','moreType','descDetail'],
  data(){
    return{
      desctype:0,
      descData:{},
      certData_1:[],
      certData_2:[],
    }
  },
  mounted(){
    console.log(this.moreData)
  },
  methods: {
    descMeth(){
      if(this.desctype==1){
        let p={
          "gender":(this.descDetail.gender=="M"||this.descDetail.gender=='1')?'1':(this.descDetail.gender=="F"||this.descDetail.gender=='2')?'2':'',
          "nationality":this.descDetail.nationality,
          "passportno":this.descDetail.passportno,
          "birth":this.descDetail.birthday,
          "ename":this.descDetail.name,
          "type":'opinion'
        }
        this.$api.post('/manage-platform/riskRecordExtInterfaceController/getRecordOtherInfo',p,
          r =>{
            if(r.success){
              this.descData = r.data;
            }
          })
      }else if(this.desctype==2){
        let p={
          "gender":(this.descDetail.gender=="M"||this.descDetail.gender=='1')?'1':(this.descDetail.gender=="F"||this.descDetail.gender=='2')?'2':'',
          "nationality":this.descDetail.nationality,
          "passportno":this.descDetail.passportno,
          "birth":this.descDetail.birthday,
          "ename":this.descDetail.name,
          "type":'cert'
        }
        this.$api.post('/manage-platform/riskRecordExtInterfaceController/getRecordOtherInfo',p,
          r =>{
            if(r.success){
              this.certData_1 = r.data.data.dcap_f_evt_capt_cert;
            }
          })
          let pl={
            "gender":(this.descDetail.gender=="M"||this.descDetail.gender=='1')?'1':(this.descDetail.gender=="F"||this.descDetail.gender=='2')?'2':'',
            "nationality":this.descDetail.nationality,
            "passportno":this.descDetail.passportno,
            "birth":this.descDetail.birthday,
            "ename":this.descDetail.name,
            "type":'res'
          }
          this.$api.post('/manage-platform/riskRecordExtInterfaceController/getRecordOtherInfo',pl,
            r =>{
              if(r.success){
                this.certData_2 = r.data.data.dcap_f_evt_capt_res;
              }
            })
      }
    },
  }
}
</script>

<style scoped>
</style>
