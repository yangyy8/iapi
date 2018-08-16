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
               placeholder="开始时间" align="right" :picker-options="pickerOptions1"
               value-format="yyyyMMdd">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endDateofbirth"
                type="date" size="small" align="right"
                placeholder="结束时间"  :picker-options="pickerOptions1"
                value-format="yyyyMMdd">
            </el-date-picker>
          </div>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <!-- <QueryNationality  :nationality="pd.nationalityEqual"  @transNation="getNation"></QueryNationality> -->
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
            <el-input placeholder="请输入内容" size="small" v-model="pd.passportnoEqual" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual" class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.startFlightDepartdate"
               type="datetime" size="small"
               placeholder="开始时间"  :picker-options="pickerOptions1"
               value-format="yyyyMMddHHmmss">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endFlightDepartdate"
                type="datetime" size="small"
                placeholder="结束时间"  :picker-options="pickerOptions1"
                value-format="yyyyMMddHHmmss">
            </el-date-picker>
          </div>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model='pd.flighttypeEqual' placeholder="请选择" filterable clearable size="small" class="input-input">

                  <el-option value="I" label="I - 入境"></el-option>
                    <el-option value="O" label="O - 出境"></el-option>
              </el-select>
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
        @sort-change="ccc()"
      >
        <el-table-column
          prop="NAME"
          sortable
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="INTG_CHNNAME"
          sortable
          label="中文姓名">
        </el-table-column>
        <el-table-column
          prop="GENDERNAME"
          label="性别"
          sortable
          >

        </el-table-column>
        <el-table-column
          prop="BIRTHDAY"
          label="出生日期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="NATIONALITYNAME"
          label="国籍/地区"
          sortable>
        </el-table-column>
        <el-table-column
          prop="PASSPORTNO"
          label="证件号码"
          sortable>
        </el-table-column>
        <el-table-column
          prop="FLTNO"
          label="航班号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="DEPARTDATESTRING"
          label="航班日期"
          sortable>
        </el-table-column>
        <el-table-column
          prop="FLIGHTTYPE"
          label="出入标识"
          sortable>
        </el-table-column>
        <el-table-column
          prop="INSTRUCT_NEW"
          label="反馈结果"
          sortable>
        </el-table-column>
        <el-table-column
          prop="TYPE"
          label="命中人员类别" width="170"
          sortable>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          sortable
          width="180">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">报表</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="getMore(scope.row)">详情</el-button>
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

    <!-- <el-dialog
      title="查询结果"
      :visible.sync="queryDialogVisible"
      width="1110px"
      >
      <div class="add-dialog">
        <el-table :data="gridData">
          <el-table-column property="name" label="姓名" width="150"></el-table-column>
          <el-table-column property="gender" label="性别" width="200"></el-table-column>
          <el-table-column property="birthDate" label="出生日期"></el-table-column>
          <el-table-column property="nationality" label="国籍" width="200"></el-table-column>
          <el-table-column property="idCard" label="身份证号"></el-table-column>
          <el-table-column property="" label="是否同值机" width="200"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="queryDialogVisible = false" size="small">确定</el-button>
      </span>
    </el-dialog> -->
    <el-dialog title="查看详情" :visible.sync="detailsDialogVisible">
      <el-form :model="dform" ref="detailsForm">
        <div class="hrtitle">基本信息</div>
        <el-row type="flex"  class="mb-6">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">姓名：</div><div class="t-el-sub">{{dform.CNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">性别：</div><div class="t-el-sub">{{dform.GENDERNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出生日期：</div><div class="t-el-sub">{{dform.BIRTHDAYSTR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出入境类型：</div><div class="t-el-sub">{{dform.FLIGHTINOUT}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">国籍：</div><div class="t-el-sub">{{dform.NATIONALITYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件号码：</div><div class="t-el-sub">{{dform.PASSPORTNO}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件颁发国：</div><div class="t-el-sub">{{dform.PASSPORTISSUECOUNTRYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件有效期：</div><div class="t-el-sub">{{dform.PASSPORTEXPIREDATESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件签发日期：</div><div class="t-el-sub">{{dform.PASSPORTISSUEDATESTR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出生国：</div><div class="t-el-sub">{{dform.BIRTHCOUNTRYNAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">居住国：</div><div class="t-el-sub">{{dform.RESIDENCENAME}}</div></el-col>
        </el-row>
        <div class="hrtitle">航班信息</div>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班号：</div><div class="t-el-sub">{{dform.FLTNO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班日期：</div><div class="t-el-sub">{{dform.FLIGHTDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞机场：</div><div class="t-el-sub">{{dform.CITYFROMNAME}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">预计起飞时间：</div><div class="t-el-sub">{{dform.DEPARTDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">到达机场：</div><div class="t-el-sub">{{dform.CITYTONAME}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">预计到达时间：</div><div class="t-el-sub">{{dform.ARRIVDATESTR}}</div></el-col>

        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">原预检结果：</div><div class="t-el-sub">{{dform.CHECKRESULTNAME}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">最终预检结果：</div><div class="t-el-sub">{{dform.LASTCHECKRESULTSTR}}</div></el-col>
          <!-- <el-col :span="8">是否有效：{{dform.PASSENGERSTATUSSTR==0?"无效":"有效"}}</el-col> -->
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班状态：</div><div class="t-el-sub">{{dform.FLIGHTSTATUSSTR==0?"取消":"起飞"}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班起飞时间：</div><div class="t-el-sub">{{dform.LASTUPDATETIMEUPSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班取消时间：</div><div class="t-el-sub">{{dform.LASTUPDATETIMEDOWNSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">降落口岸：</div><div class="t-el-sub">{{dform.PORTSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">备降口岸：</div><div class="t-el-sub">{{dform.CHANGEPORTSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司联系电话：</div><div class="t-el-sub">{{dform.AIRLINEPHONE}}</div></el-col>
        </el-row>
        <div class="hrtitle">其他信息</div>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司传真：</div><div class="t-el-sub">{{dform.AIRLINEFAX}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航信发送报文时间：</div><div class="t-el-sub">{{dform.GAPP_RECEIVETIMESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航信接受报文时间：</div><div class="t-el-sub">{{dform.GAPP_SENDTIMESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">流水号：</div><div class="t-el-sub">{{dform.TID}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">ICS记录编号：</div><div class="t-el-sub">{{dform.RECORDLOCATER}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客中间名：</div><div class="t-el-sub">{{dform.MIDDLENAME}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客类型：</div><div class="t-el-sub">{{dform.PASSENGERTYPESTR=="FL"?"普通旅客":"中转旅客"}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客值机方式：</div><div class="t-el-sub">{{dform.VIDSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客状态：</div><div class="t-el-sub">{{dform.PASSENGERSTATUSSTR==0?"已值机":dform.PASSENGERSTATUS==1?"已登机":"未登机"}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">是否报警：</div><div class="t-el-sub">{{dform.ISEVENT}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">ABO唯一标识：</div><div class="t-el-sub">{{dform.ABONO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件号码：</div><div class="t-el-sub">{{dform.OTHER_NO}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件有效期：</div><div class="t-el-sub">{{dform.OTHER_EXPIREDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件颁发国：</div><div class="t-el-sub">{{dform.OTHER_ISSUECOUNTRYSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">其他证件签发日期：</div><div class="t-el-sub">{{dform.OTHERDOCUMENTISSUEDATESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证号码：</div><div class="t-el-sub">{{dform.VISANO}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证有效期：</div><div class="t-el-sub">{{dform.VISAEXPIREDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证国家：</div><div class="t-el-sub">{{dform.VISAISSUECOUNTRYSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">签证签发日期：</div><div class="t-el-sub">{{dform.VISAISSUEDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞城市：</div><div class="t-el-sub">{{dform.ORIGINSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地地址：</div><div class="t-el-sub">{{dform.DESTADDRESS}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地城市：</div><div class="t-el-sub">{{dform.DESTCITY}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的的所在省：</div><div class="t-el-sub">{{dform.DESTSTATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地国家：</div><div class="t-el-sub">{{dform.DESTCOUNTRYSTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">目的地邮编：</div><div class="t-el-sub">{{dform.DESTPOSTALCODE}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">边检接收时间：</div><div class="t-el-sub">{{dform.IAPI_RECEIVETIMESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">边检回复时间：</div><div class="t-el-sub">{{dform.IAPI_RESPONSETIMESTR}}</div></el-col>
        </el-row>
        <!-- 数据有效性 -->
        <div class="" v-show="isCheck">
          <div class="hrtitle">数据有效性</div>
          <el-row type="flex"  class="mb-6">
            <el-col :span="6" class="t-el-content"><div class="t-el-text">属性名：</div><div class="t-el-sub">{{check.FIELDNAME}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">属性值：</div><div class="t-el-sub">{{check.FIELDVALUES}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">是否必填：</div><div class="t-el-sub">{{check.INPUT}}</div></el-col>
            <el-col :span="6" class="t-el-content"><div class="t-el-text">最小长度：</div><div class="t-el-sub">{{check.MINLENGTH}}</div></el-col>
          </el-row>

          <el-row type="flex"  class="mb-6">
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
          <el-row type="flex"  class="mb-6">
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
          style="width: 100%;">
          <el-table-column
            prop="NAME"
            label="姓名" sortable
          >
          </el-table-column>
          <el-table-column

            label="性别" sortable
            width="80"
          >
          <template slot-scope="scope">
            {{scope.row.GENDER | fiftersex}}
          </template>
          </el-table-column>
          <el-table-column
            prop="DATEOFBIRTH"
            label="出生日期" sortable
            >
          </el-table-column>
          <el-table-column
            prop="NATIONALITYC"
            label="国籍" sortable
          >
          </el-table-column>

          <el-table-column
            prop="PASSPORTNO"
            label="证件号码" sortable
          >
          </el-table-column>

          <el-table-column
            prop="FLTNO"
            label="航班号" sortable
          >
          </el-table-column>
          <el-table-column
            prop="SCHEDULEDEPARTURETIME"
            label="航班日期" sortable
            >
          </el-table-column>

          <el-table-column
            label="预检结果" sortable
              width="120"
            >
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
import QueryNationality from '../../other/queryNationality'
export default {
  components: {
    QueryNationality
  },
  data(){
    return{
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      nation:[],

      hcurrentPage:1,//当前页数
      hpageSize:10, //每页显示个数选择器的选项设置
      hshowCount:10,//每页显示的记录数
      htotalResult:0,//总条数
      htotalPage:1,//总页数
      pnrEve:'',

      pd: {"isBlurred":false},
      queryDialogVisible: false,
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
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      form: {},

    }
  },
  mounted() {
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    hpageSizeChange(val){//历次数据
      this.getHistoryList(this.hcurrentPage,val,this.historyCdt);
    },
    getNation(msg){
      this.pd.nationalityEqual=msg;
      console.log("============",this.pd.nationalityEqual)
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
      if(i.EVENTTYPE == '0'){
        this.$router.push({name:'alarmProcess',query:{eventserial:i.EVENTSERIAL,type:0}})
      }else if(i.EVENTTYPE == '3'){
        this.$router.push({name:'alarmProcess',query:{eventserial:i.EVENTSERIAL,type:0}})
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
    reviewDetail(){
      let ss={
        "event":this.eve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',ss,
       r =>{
         if(r.data== true){
            this.$router.push({name:'alarmProcess',query:{eventserial:this.eve,type:0}})
         }else if(r.data == false){
           this.$router.push({name:'alarmProcess',query:{eventserial:this.eve,type:1}})
         }
       })
    },

    reviewCallDetail(){//查看PNR预报警详情
      let cc={
        "event":this.pnrEve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',ss,
       r =>{
         if(r.data== true){
            this.$router.push({name:'alarmProcess',query:{eventserial:this.eve,type:0,isZDGZ:1}})
         }else if(r.data == false){
           this.$router.push({name:'alarmProcess',query:{eventserial:this.eve,type:1,isZDGZ:1}})
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
.add-dialog{
  /* padding-left:40px; */
}
</style>
<style media="screen">
.hrtitle {
  height: 35px;
  line-height: 35px;
  border: none;
  color: #3F96F2;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #3F96F2;
},
.hrt {
  height: 35px;
  line-height: 35px;
  border: none;
  color: #3F96F2;
  font-size: 16px;
  font-weight: bold;
  border-top: 1px solid #3F96F2;
}
.mb-6 {
  line-height: 20px;
  margin-top: 10px;
}
.d-input-input{
  line-height: 30px;
  width: 70%!important;
}
</style>
