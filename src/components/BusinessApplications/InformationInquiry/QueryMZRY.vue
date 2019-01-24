<template lang="html">
  <div class="whitelist">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green ">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">姓名：</span>
              <div class="input-input t-fuzzy t-flex">
                <el-input placeholder="请输入内容" v-model="pd.familyname" size="small"></el-input>
                <el-checkbox v-model="pd.isBlurred">模糊查询</el-checkbox>
              </div>
              <!-- <span class="input-text">姓名：</span>
              <el-input  placeholder="请输入" size="small" v-model="pd.familyname" class="input-input"></el-input> -->
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">性别：</span>
              <el-select  placeholder="请选择"  size="small" filterable clearable v-model="pd.genderEqual"  class="input-input">
                <el-option label="U - 未知" value="U"></el-option>
                <el-option label="M - 男" value="M"></el-option>
                <el-option label="F - 女" value="F"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出生日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.startDateofbirth"
               type="date" size="small"
               placeholder="开始时间" align="right"
               value-format="yyyyMMdd">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endDateofbirth"
                type="date" size="small" align="right"
                placeholder="结束时间"
                value-format="yyyyMMdd">
            </el-date-picker>
          </div>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">国籍/地区：</span>
                <el-select v-model="pd.nationalityEqual" filterable clearable @visible-change="queryNationality" placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.passportno" class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.fltno" class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">机场：</span>
              <el-select  v-model="pd.port" @change="getList(CurrentPage,pageSize,pd)" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option
                  v-for="item in airport"
                  v-if="item.JCDM"
                  :key="item.JCDM"
                  :label="item.JCDM+' - '+item.KAMC"
                  :value="item.JCDM">
                </el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text"><i class="t-must">*</i>航班日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.startFlightDepartdate"
               type="date" size="small"
               placeholder="开始时间"
               value-format="yyyyMMdd">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endFlightDepartdate"
                type="date" size="small"
                placeholder="结束时间"
                value-format="yyyyMMdd">
            </el-date-picker>
          </div>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text"><i class="t-must">*</i>命中时间：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.startCreatetime"
               type="datetime"
               size="small"
               placeholder="开始时间"
               :picker-options="pickerOptions"
               value-format="yyyyMMddHHmmss">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endCreatetime"
                type="datetime"
                size="small"
                placeholder="结束时间"
                :picker-options="pickerOptions1"
                value-format="yyyyMMddHHmmss">
            </el-date-picker>
          </div>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">命中人员类别：</span>
              <el-select v-model='pd.eventtype' placeholder="请选择" size="small" filterable clearable class="input-input">
                  <el-option value="0" label="0 - 白名单"></el-option>
                    <el-option value="1" label="1 - 临控名单"></el-option>
                    <el-option value="2" label="2 - 黑名单 - 不准入境"></el-option>
                    <el-option value="3" label="3 - 黑名单 - 失效证件"></el-option>
                    <el-option value="4" label="4 - 黑名单 - 失效签证"></el-option>
                    <el-option value="5" label="5 - 风险评估人员"></el-option>
                    <el-option value="6" label="6 - 特殊关注对象"></el-option>
                    <el-option value="7" label="7 - 二次查控对象"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-table
        :data="tableData"
        border
        fit
        style="width: 100%;"
        class="mt-10 o-table3"
        @header-click="headerClick">
        <el-table-column
          prop="NAME"
          width="100"
          sortable
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="INTG_CHNNAME"
          sortable
          width="110"
          label="中文姓名">
        </el-table-column>
        <el-table-column
          prop="CITYFROMNAME"
          label="出发地"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="CITYTONAME"
          label="目的地"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="GENDERNAME"
          label="性别"
          sortable>
        </el-table-column>
        <el-table-column
          prop="BIRTHDAY"
          label="出生日期"
          width="110"
          sortable>
        </el-table-column>
        <el-table-column
          prop="NATIONALITYNAME"
          label="国籍/地区"
          width="110"
          sortable>
        </el-table-column>
        <el-table-column
          prop="PASSPORTNO"
          label="证件号码"
          width="110"
          sortable>
        </el-table-column>
        <el-table-column
          prop="FLTNO"
          label="航班号"
          width="100"
          sortable>
        </el-table-column>
        <el-table-column
          prop="DEPARTDATESTRING"
          label="航班日期"
          width="150"
          sortable>
        </el-table-column>
        <el-table-column
          prop="CREATETIMESTR"
          label="命中时间"
          width="160"
          sortable>
        </el-table-column>
        <el-table-column
          prop="INSTRUCT_NEW"
          label="反馈结果"
          width="110"
          sortable>
        </el-table-column>
        <el-table-column
          prop="TYPE"
          label="命中人员类别"
          width="130"
          sortable>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          sortable
          width="80">
          <template slot-scope="scope">
            <el-button type="text"  class="a-btn" title="报表" icon="el-icon-document" @click="details(scope.row)"></el-button>
            <el-button type="text"  class="a-btn" title="详情"  plain icon="el-icon-tickets" @click="getMore(scope.row)"></el-button>
         </template>
        </el-table-column>
      </el-table>
      <div class="middle-foot">
        <div class="page-msg">
          <div class="">
            共{{Math.ceil(TotalResult/pageSize)}}页
          </div>
          <div class="">
            每页
            <el-select v-model="pageSize" @change="pageSizeChange(pageSize)" placeholder="10" size="mini" class="page-select">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            条
          </div>
          <div class="">
            共{{TotalResult}}条
          </div>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="事件文档"
      :visible.sync="queryDialogVisible"
      width="1220px"
      >
      <AlarmProcess></AlarmProcess>
    </el-dialog>
    <el-dialog
      title="PNR预报警详情"
      :visible.sync="pnrDialogVisible"
      width="1220px"
      >
      <AlarmProcess></AlarmProcess>
    </el-dialog>
    <el-dialog title="查看详情" :visible.sync="detailsDialogVisible">
      <el-form :model="dform" ref="detailsForm">
        <div class="hrtitle">基本信息</div>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">姓名：</div><div class="t-el-sub">{{dform.CNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">性别：</div><div class="t-el-sub">{{dform.GENDERNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出生日期：</div><div class="t-el-sub">{{dform.BIRTHDAYSTR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出入境类型：</div><div class="t-el-sub">{{dform.FLIGHTINOUT}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">国籍/地区：</div><div class="t-el-sub">{{dform.NATIONALITYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件号码：</div><div class="t-el-sub">{{dform.PASSPORTNO}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件颁发国：</div><div class="t-el-sub">{{dform.PASSPORTISSUECOUNTRYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件有效期：</div><div class="t-el-sub">{{dform.PASSPORTEXPIREDATESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件签发日期：</div><div class="t-el-sub">{{dform.PASSPORTISSUEDATESTR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出生国：</div><div class="t-el-sub">{{dform.BIRTHCOUNTRYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">居住国：</div><div class="t-el-sub">{{dform.RESIDENCENAME}}</div></el-col>
        </el-row>
        <div class="hrtitle">航班信息</div>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班号：</div><div class="t-el-sub">{{dform.FLTNO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班日期：</div><div class="t-el-sub">{{dform.FLIGHTDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞机场：</div><div class="t-el-sub">{{dform.CITYFROMNAME}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">预计起飞时间：</div><div class="t-el-sub">{{dform.DEPARTDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">到达机场：</div><div class="t-el-sub">{{dform.CITYTONAME}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">预计到达时间：</div><div class="t-el-sub">{{dform.ARRIVDATESTR}}</div></el-col>

        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">原预检结果：</div><div class="t-el-sub">{{dform.CHECKRESULTNAME}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">最终预检结果：</div><div class="t-el-sub">{{dform.LASTCHECKRESULTSTR}}</div></el-col>
          <!-- <el-col :span="8">是否有效：{{dform.PASSENGERSTATUSSTR==0?"无效":"有效"}}</el-col> -->
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班状态：</div><div class="t-el-sub">{{dform.FLIGHTSTATUSSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班起飞时间：</div><div class="t-el-sub">{{dform.LASTUPDATETIMEUPSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班取消时间：</div><div class="t-el-sub">{{dform.LASTUPDATETIMEDOWNSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">降落口岸：</div><div class="t-el-sub">{{dform.PORTSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">备降口岸：</div><div class="t-el-sub">{{dform.CHANGEPORTSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司联系电话：</div><div class="t-el-sub">{{dform.AIRLINEPHONE}}</div></el-col>
        </el-row>
        <div class="hrtitle">其他信息</div>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司传真：</div><div class="t-el-sub">{{dform.AIRLINEFAX}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航信发送报文时间：</div><div class="t-el-sub">{{dform.GAPP_RECEIVETIMESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航信接受报文时间：</div><div class="t-el-sub">{{dform.GAPP_SENDTIMESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">流水号：</div><div class="t-el-sub">{{dform.TID}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">ICS记录编号：</div><div class="t-el-sub">{{dform.RECORDLOCATER}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客中间名：</div><div class="t-el-sub">{{dform.MIDDLENAME}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客类型：</div><div class="t-el-sub">{{dform.PASSENGERTYPESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客值机方式：</div><div class="t-el-sub">{{dform.VIDSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客状态：</div><div class="t-el-sub">{{dform.PASSENGERSTATUSSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">是否报警：</div><div class="t-el-sub">{{dform.ISEVENT}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">ABO唯一标识：</div><div class="t-el-sub">{{dform.ABONO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件号码：</div><div class="t-el-sub">{{dform.OTHER_NO}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件有效期：</div><div class="t-el-sub">{{dform.OTHER_EXPIREDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件颁发国：</div><div class="t-el-sub">{{dform.OTHER_ISSUECOUNTRYSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件签发日期：</div><div class="t-el-sub">{{dform.OTHERDOCUMENTISSUEDATESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证号码：</div><div class="t-el-sub">{{dform.VISANO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证有效期：</div><div class="t-el-sub">{{dform.VISAEXPIREDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证国家：</div><div class="t-el-sub">{{dform.VISAISSUECOUNTRYSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证签发日期：</div><div class="t-el-sub">{{dform.VISAISSUEDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞城市：</div><div class="t-el-sub">{{dform.ORIGINSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地地址：</div><div class="t-el-sub">{{dform.DESTADDRESS}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地城市：</div><div class="t-el-sub">{{dform.DESTCITY}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的的所在省：</div><div class="t-el-sub">{{dform.DESTSTATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地国家：</div><div class="t-el-sub">{{dform.DESTCOUNTRYSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地邮编：</div><div class="t-el-sub">{{dform.DESTPOSTALCODE}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">边检接收时间：</div><div class="t-el-sub">{{dform.IAPI_RECEIVETIMESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">边检回复时间：</div><div class="t-el-sub">{{dform.IAPI_RESPONSETIMESTR}}</div></el-col>
        </el-row>
        <!-- 数据有效性 -->
        <div class="" v-show="isCheck">
          <div class="hrtitle">数据有效性</div>
          <el-row type="flex"  class="t-detail">
            <el-col :span="6" class="t-el-content"><div class="t-el-text">属性名：</div><div class="t-el-sub">{{check.FIELDNAME}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">属性值：</div><div class="t-el-sub">{{check.FIELDVALUES}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">是否必填：</div><div class="t-el-sub">{{check.INPUT}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">最小长度：</div><div class="t-el-sub">{{check.MINLENGTH}}</div></el-col>
          </el-row>

          <el-row type="flex"  class="t-detail">
            <el-col :span="6" class="t-el-content"><div class="t-el-text">最大长度：</div><div class="t-el-sub">{{check.MAXLENGTH}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">正则表达式：</div><div class="t-el-sub">{{check.REGULAR}}</div></el-col>
            <el-col :span="12" class="t-el-content"><div class="t-el-text">错误描述：</div><div class="t-el-sub">{{check.DETAIL}}</div></el-col>
          </el-row>
        </div>

        <!-- 名单比中详情 -->
        <div class="" v-show="isName">
          <div class="hrtitle">名单比中详情</div>
          <el-row type="flex"  class="mb-6">
            <el-col :span="6">
              <el-button type="primary" plain name="button"  size="mini" @click="reviewDetail">查看评价详情</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- 业务规则校验不通过 -->
        <div class="" v-show="isRules">
          <div class="hrtitle">业务规则校验不通过</div>
          <el-row type="flex"  class="t-detail">
            <el-col :span="6" class="t-el-content"><div class="t-el-text">规则名称：</div><div class="t-el-sub">{{rules.MATCHRRULE}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">返回状态：</div><div class="t-el-sub">{{rules.STATUS}}</div></el-col>
            <el-col :span="12" class="t-el-content"><div class="t-el-text">错误详情：</div><div class="t-el-sub">{{rules.CHECKREMARK}}</div></el-col>
          </el-row>
        </div>
        <!-- PNR预报警 -->
        <div class="" v-show="isCall">
          <div class="hrtitle">PNR预报警</div>
          <el-row type="flex"  class="mb-6">
            <el-col :span="6">
              <el-button type="primary" plain name="button"  size="mini" @click="reviewCallDetail">查看PNR预报警详情</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="hrtitle" style="margin-bottom:10px">历史值机信息</div>
        <el-table
          :data="detailstableData"
          border
          style="width: 100%;"
          class="mt-10 o-table3"
          @header-click="headerClick">
          <el-table-column
            prop="NAME"
            label="姓名"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            label="性别"
            sortable
            width="80">
          <template slot-scope="scope">
            {{scope.row.GENDER | fiftersex}}
          </template>
          </el-table-column>
          <el-table-column
            prop="DATEOFBIRTH"
            label="出生日期"
            sortable
            width="130">
          </el-table-column>
          <el-table-column
            prop="NATIONALITYC"
            label="国籍/地区"
            sortable>
          </el-table-column>
          <el-table-column
            prop="PASSPORTNO"
            label="证件号码"
            sortable
            width="130">
          </el-table-column>
          <el-table-column
            prop="FLTNO"
            label="航班号"
            sortable
            width="120">
          </el-table-column>
          <el-table-column
            prop="SCHEDULEDEPARTURETIME"
            label="航班日期"
            sortable
            width="140">
          </el-table-column>
          <el-table-column
            label="预检结果"
            sortable
            width="120">
            <template slot-scope="scope">
              {{scope.row.CHECKRESULT | fiftecr}}
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="最终预检结果" sortable
            width="120"
            >
            <template slot-scope="scope">
              {{scope.row.LASTCHECKRESULT | fiftecr}}
            </template>
          </el-table-column> -->
          <el-table-column
            label="报警信息" sortable
            width="120"
            >
            <template slot-scope="scope">
              {{scope.row.STATUS | fifterbj}}
            </template>
          </el-table-column>
        </el-table>
        <div class="middle-foot">
          <div class="page-msg">
            <div class="">
              共{{htotalPage}}页
            </div>
            <div class="">
              每页
              <el-select v-model="hshowCount" @change="hpageSizeChange(hshowCount)" placeholder="10" size="mini" class="page-select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              条
            </div>
            <div class="">
              共{{htotalResult}}条
            </div>
          </div>
          <el-pagination
            background
            @current-change="hhandleCurrentChange"
            :page-size="hshowCount"
            layout="prev, pager, next"
            :total="htotalResult">
          </el-pagination>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取消</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import AlarmProcess from '../../BusinessProcessing/Alarm/alarmProcess'
import QueryNationality from '../../other/queryNationality'
import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  components: {
    QueryNationality
  },
  components: {AlarmProcess},
  data(){
    return{
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      nation:[],
      eventserial:'',
      type:0,
      airport:[],

      pnrEventserial:'',
      pnrType:0,
      isZDGZ:1,

      hcurrentPage:1,//当前页数
      hpageSize:10, //每页显示个数选择器的选项设置
      hshowCount:10,//每页显示的记录数
      htotalResult:0,//总条数
      htotalPage:1,//总页数
      pnrEve:'',

      pd: {
        "isBlurred":false,
        startCreatetime:'',
        endCreatetime:'',
        startFlightDepartdate:'',
        endFlightDepartdate:''
      },
      queryDialogVisible: false,
      pnrDialogVisible:false,
      options: [{
          value: 10,
          label: "10"
        },
        {
          value: 20,
          label: "20"
        },
        {
          value: 30,
          label: "30"
        }
      ],
      tableData: [],
      eve:'',
      dform:{},
      rules:{},
      check:{},
      historyCdt:{},
      isCheck:false,
      isName:false,
      isRules:false,
      isCall:false,
      detailstableData: [],
      multipleSelection: [],
      detailsDialogVisible:false,
      lazyQuery:'',
      pickerOptions: {
        disabledDate: (time) => {
            if (this.pd.endCreatetime != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
              return startT > this.pd.endCreatetime;
            }else if(this.pd.endCreatetime == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
            return endT < this.pd.startCreatetime;
        }
      },
      form: {},
      nav1Id:null,
      nav2Id:null
    }
  },
  mounted() {
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
    let time = new Date();
    let end = new Date();
    let createStar = new Date(new Date().setHours(0,0,0,0));
    this.pd.startCreatetime=formatDate(createStar,'yyyyMMddhhmmss');
    this.pd.endCreatetime=formatDate(end,'yyyyMMddhhmmss');

    let flightStart = new Date(new Date().setHours(0,0,0,0));
    this.pd.startFlightDepartdate=formatDate(flightStart,'yyyyMMdd');
    this.pd.endFlightDepartdate=formatDate(end,'yyyyMMdd');
    this.queryAirport();
  },
  activated(){
    this.nav1Id=this.$route.query.nav1Id
    this.nav2Id=this.$route.query.nav2Id
  },
  filters: {
    discount: function(value) {
      return value.substring(0,16);
    },
    fiftersex(val) {
      if (val == "F") {
        return "女"
      } else if (val == "M") {
        return "男"
      } else if (val == "U") {
        return "未知"
      }
    },
    fiftecr(val) {
      if (val == "0Z") {
        return "允许打印登机牌";
      } else if (val == "1Z") {
        return "禁止打印登机牌";
      } else if (val == "2Z") {
        return "请再次核对";
      } else {
        return "数据错误";
      }
    },
    fifterbj(val) {
      if (val == "1") {
        return "产生报警";
      } else {
        return "未产生报警";
      }
    },
  },
  methods: {
    headerClick(column,event){
        event.target.title=column.label
      },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    hpageSizeChange(val){//历次数据
      this.getHistoryList(this.hcurrentPage,val,this.historyCdt);
    },
    getNation(msg){
      this.pd.nationalityEqual=msg;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    hhandleCurrentChange(val){ //历次数据
      this.getHistoryList(val,this.hshowCount,this.historyCdt);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);
      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
    if((this.pd.startFlightDepartdate!=undefined && this.pd.startFlightDepartdate!=null)
       && (this.pd.endFlightDepartdate!=undefined && this.pd.endFlightDepartdate!=null))
    {
      if(dayGap(this.pd.startFlightDepartdate,this.pd.endFlightDepartdate,1)>30){
        this.$alert('查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
    }else if((this.pd.startCreatetime!=undefined && this.pd.startCreatetime!=null)
           && (this.pd.endCreatetime!=undefined && this.pd.endCreatetime!=null)) {

             if(dayGap(this.pd.startCreatetime,this.pd.endCreatetime,1)>30){
               this.$alert('查询时间间隔不能超过一个月', '提示', {
                 confirmButtonText: '确定',
               });
               return false
             }
    }else {
      this.$alert('航班日期和命中日期至少其中一项不能为空', '提示', {
        confirmButtonText: '确定',
      });
      return false
    }
      pd.saveflag=1;
      pd.instructNew="1Z";
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/event/queryEventHisListPage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirportMatch',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
    getHistoryList(hcurrentPage,hshowCount,historyCdt){
      let gh = {
        "currentPage":hcurrentPage,
      	"showCount":hshowCount,
      	"pd":historyCdt
      };
      this.$api.post('/manage-platform/iapiUnscolicited/queryHistory',gh,
      r =>{
        this.detailstableData = r.data.pdList;
        this.htotalResult = r.data.totalResult;
        this.htotalPage = r.data.totalPage;
      })
    },
    details(i){
      this.queryDialogVisible = true;
      this.eventserial = i.EVENTSERIAL;
      if(i.EVENTTYPE == '0'){
        this.$router.push({query:{eventserial:i.EVENTSERIAL,type:0,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
      }else if(i.EVENTTYPE == '3'){
        this.$router.push({query:{eventserial:i.EVENTSERIAL,type:0,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
      }else if(i.EVENTTYPE == '4'){}
    },
    getMore(item){
        console.log(item);
        this.detailsDialogVisible = true;
        this.historyCdt.NATIONALITY = item.NATIONALITY;
        this.historyCdt.PASSPORTNO = item.PASSPORTNO;
        this.getHistoryList(this.hcurrentPage,this.hshowCount,this.historyCdt);
        // let gm = {
        //   "serial":item
        // }
        this.$api.post('/manage-platform/iapi/queryIapiInfo',{serial:item.REFSERIAL},
         r =>{
           if(r.success){
             this.dform = r.data.IAPI;
             if(r.data.hasOwnProperty('CHECKDATA') == false){
               this.isCheck = false;
             }else{
               this.isCheck = true;
               this.check = r.data.CHECKDATA;
             }

             if(r.data.hasOwnProperty('RULELIST') == false){
               this.isRules = false;
             }else{
               this.isRules = true;
               this.rules = r.data.RULELIST;
             }

             if(r.data.hasOwnProperty('EVENT') == false){
               this.isName = false;
             }else{
               this.isName = true;
               this.eve = r.data.EVENT;
             }

             if(r.data.hasOwnProperty('PNREVENT') == false){
               this.isCall = false;
             }else{
               this.isCall = true;
               this.pnrEve = r.data.PNREVENT;
             }
           }
         })

    },
    reviewDetail(){//名单比重详情
      this.queryDialogVisible = true;
      let ss={
        "event":this.eve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',ss,
       r =>{
         if(r.data== true){
            this.$router.push({query:{eventserial:this.eve,type:0,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
         }else if(r.data == false){
           this.$confirm('报警事件还未处理，请归档后再重试', '提示', {
             confirmButtonText: '确定',
             type: 'warning'
           })
           // this.$router.push({query:{eventserial:this.eve,type:1,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
         }
       })
    },

    reviewCallDetail(){//查看PNR预报警详情
      this.pnrDialogVisible = true;
      let cc={
        "event":this.pnrEve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',cc,
       r =>{
         if(r.data== true){
            this.$router.push({query:{eventserial:this.pnrEve,type:0,isZDGZ:1,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
         }else if(r.data == false){
           this.$confirm('报警事件还未处理，请归档后再重试', '提示', {
             confirmButtonText: '确定',
             type: 'warning'
           })
           // this.$router.push({query:{eventserial:this.pnrEve,type:1,isZDGZ:1,nav1Id:this.nav1Id,nav2Id:this.nav2Id}})
         }
       })
    },
    queryNationality(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         console.log(r);
         if(r.success){
           this.nation=r.data;
         }
      })
    },
  }
}
</script>

<style scoped>

</style>
<style media="screen">
.d-input-input{
  line-height: 30px;
  width: 70%!important;
}
</style>
