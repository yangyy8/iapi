<template lang="html">
  <div class="moreDialog">
    <div class="" v-if="moreType=='box6'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          出入标识：{{moreData.in_out_flag}}
        </el-col>
        <el-col :span="12">
          人员类别：{{moreData.pers_imm_type}}
        </el-col>
        <el-col :span="12">
          姓名：{{moreData.pers_name}}
        </el-col>
        <el-col :span="12">
          国籍/地区：{{moreData.to_country_code}}
        </el-col>
        <el-col :span="12">
          性别：{{moreData.pers_gender}}
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
          前往地/出发地：{{moreData.to_country_code}}
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
          国籍/地区：{{moreData.to_country_code||'-'}}
        </el-col>
        <el-col :span="12">
          身份：{{moreData.profession_code_na||'-'}}
        </el-col>
        <el-col :span="12">
          申请事由：{{moreData.birth_date}}
        </el-col>
        <el-col :span="12">
          证件类型：{{moreData.cert_type_na||moreData.passport_type}}
        </el-col>
        <el-col :span="12">
          证件号码：{{moreData.cert_no}}
        </el-col>
        <el-col :span="12">
          证件有效期：{{moreData.visas_type_na}}
        </el-col>
        <el-col :span="12">
          偕行人员：{{moreData.visas_no}}
        </el-col>
        <el-col :span="12">
          境外人员类别：{{moreData.entry_period}}
        </el-col>
        <el-col :span="12">
          人员地域类别：{{moreData.pers_reg_catg_na}}
        </el-col>
        <el-col :span="12">
          境外人员身份证号码：{{moreData.fgn_card_id}}
        </el-col>
        <el-col :span="12">
          原签证/居留许可种类：{{moreData.orig_visa_type_na}}
        </el-col>
        <el-col :span="12">
          原签证/居留许可号码：{{moreData.orig_visa_no}}
        </el-col>
        <el-col :span="12">
          原签证/居留许可停留期至：{{moreData.inspector_name}}
        </el-col>
        <el-col :span="12">
          签证种类：{{moreData.trs_mode_na}}
        </el-col>
        <el-col :span="12">
          签证号码：{{moreData.trs_id}}
        </el-col>
        <el-col :span="12">
          签证发放机关：{{moreData.to_country_code}}
        </el-col>
        <el-col :span="12">
          制定单位：{{moreData.issuing_unit_na}}
        </el-col>
        <el-col :span="12">
          签证有效期次数：{{moreData.channel_no}}
        </el-col>
        <el-col :span="12">
          团队号：{{moreData.tour_grp_no}}
        </el-col>
        <el-col :span="12">
          团队人数：{{moreData.dept_name}}
        </el-col>
        <el-col :span="12">
          签证签发日期：{{moreData.in_out_flag}}
        </el-col>
        <el-col :span="12">
          签证有效期限：{{moreData.self_channel_flag}}
        </el-col>
        <el-col :span="12">
          签证停留期：{{moreData.back_flag}}
        </el-col>
        <el-col :span="12">
          签证/居留许可事由：{{moreData.second_pers_name}}
        </el-col>
        <el-col :span="12">
          邀请单位名称：{{moreData.sec_cert_type_na}}
        </el-col>
        <el-col :span="12">
          邀请人中文姓名：{{moreData.sec_cert_no}}
        </el-col>
        <el-col :span="12">
          邀请人性别：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          邀请人出生日期：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          邀请人身份证号码：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          邀请人证件号码：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          邀请人详细地址：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          邀请人联系电话：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          受理单位：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          受理时间：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          居住地行政区划：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          居住地派出所名称：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          居住地详细地址：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          工作单位行政区划：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          工作(学习)单位所在派出所名称：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          工作单位组织机构名称：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          常住标识：{{moreData.sec_birth_date}}
        </el-col>
        <el-col :span="12">
          联系电话：{{moreData.sec_birth_date}}
        </el-col>

      </el-row>
    </div>
    <div class="" v-if="moreType=='box10'">
      <el-row style="line-height:32px;">
        <el-col :span="12">
          违法违规事件编号：{{moreData.ill_evt_id}}
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
    <div class="" v-if="moreType=='box11'">
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
          姓名：{{moreData.psrchnname}}
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
  props: ['moreData','moreType'],
  data(){
    return{

    }
  },
  mounted(){
    console.log(this.moreData)
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
