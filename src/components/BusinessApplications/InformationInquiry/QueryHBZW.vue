<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br">
          <div class="title-green ">
            查询条件
          </div>
        <el-row align="center"   :gutter="2" class="pr-20">
          <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
            <span class="input-text"><font style="color:red">*</font> 航班号：</span>
            <el-input placeholder="请输入内容" v-verify.input.blur="{regs:'required',submit:'timeDemo'}" size="small" v-model="pd.flightNumber"   class="input-input"></el-input>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
          <span class="input-text"><font style="color:red">*</font> 航班日期：</span>
          <div class="input-input t-flex t-date">
               <el-date-picker
               v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
               v-model="pd.departdateBegin"
               type="datetime" size="small"
               placeholder="开始时间"  :picker-options="pickerOptions"
               format="yyyy-MM-dd HH:mm"
               value-format="yyyyMMddHHmm">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                v-model="pd.departdateEnd"
                type="datetime" size="small"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyyMMddHHmm"
                placeholder="结束时间" :picker-options="pickerOptions1">
             </el-date-picker>
             </div>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="pd.falg"  class="input-input"   filterable clearable  placeholder="请选择"  size="small">
                <el-option value="I" label="I - 入境">
                </el-option>
                <el-option value="O" label="O - 出境">
                </el-option>
              </el-select>
            </el-col>
          <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
            <span class="input-text">姓名：</span>
            <div class="input-input t-fuzzy t-flex">
              <el-input placeholder="请输入内容" v-model="pd.travellerSurname" size="small"></el-input>
              <el-checkbox v-model="pd.isBlurred">模糊查询</el-checkbox>
            </div>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">性别：</span>
              <el-select v-model="pd.gender"  class="input-input"   filterable clearable  placeholder="请选择"  size="small">
                <el-option value="U" label="U - 未知">
                </el-option>
                <el-option value="M" label="M - 男">
                </el-option>
                <el-option value="F" label="F - 女">
                </el-option>
              </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
            <span class="input-text">出生日期：</span>
            <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.birthdateBegin"
                 type="date" size="small"
                 placeholder="开始时间"  >
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.birthdateEnd"
                  type="date" size="small"
                  placeholder="结束时间" >
               </el-date-picker>
               </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
              <span class="input-text">国籍/地区：</span>
              <el-select v-model="pd.NATIONALITY" filterable clearable @visible-change="queryNationality" placeholder="请选择"  size="small" class="input-input">
                <el-option
                  v-for="item in nation"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.cardnum"   class="input-input"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
        <span class="tubiao hand" :class="{'checked':page==0}" @click="page=0;getList(CurrentPage,pageSize,pd)">列表</span><span class="tubiao hand" :class="{'checked':page==1}" @click="qq">图表</span>
    <div id="div1" v-show="page==0">
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
       <el-table-column
          prop="intgChnname"
          label="中文姓名" >
        </el-table-column>
        <el-table-column
          prop="tsname"
          label="姓名" >
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别" sortable>
        </el-table-column>
        <el-table-column
          prop="birthdate"
          label="出生日期" sortable>
        </el-table-column>
        <el-table-column
          prop="nationalityStr"
          label="国籍/地区" sortable>
        </el-table-column>
        <el-table-column
          prop="cardnum"
          label="证件号码" sortable>
        </el-table-column>
        <el-table-column
          prop="flightNumber"
          label="航班号" sortable>
        </el-table-column>
        <el-table-column
          label="航班日期" sortable>
              <template slot-scope="scope">
                {{scope.row.departdate | filterdate}}
              </template>
        </el-table-column>
        <el-table-column
          prop="boardingsequence"
          label="登机序号" sortable>
        </el-table-column>
        <el-table-column
          prop="specifigseat"
          label="座位号" sortable>
        </el-table-column>
        <el-table-column
          prop="passengerstatus"
          label="人员状态" sortable>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
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
<div id="div2" v-show="page==1">
  <el-row align="center"  type="flex">
    <el-col  :span="5" style="border-right:1px solid #cccccc; margin-right:30px;">
        <img src="../../../assets/img/port.png">
    </el-col>
    <el-col  :span="190" style="padding-top:50px;">
      <ul class="planUL">
        <li class="planLifirst">
          <div  v-for="i in list1">
            {{i}}
          </div>
        </li>
        <li v-for="i in list2" class="planLi">
          <div class="" > </div>
          <div class="">{{i}}</div>
        </li>
      </ul>
    </el-col>
  </el-row>
</div>
    </div>

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
  </div>
</template>

<script>
import AlarmProcess from '../../BusinessProcessing/Alarm/alarmProcess'
import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  components: {AlarmProcess},
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      page:0,
      pd: {
        "isBlurred":false,
        departdateBegin:'',
        departdateEnd:'',
      },

      dform:{},
      rules:{},
      check:{},
      isCheck:false,
      isName:true,
      isRules:true,
      isCall:false,

      hcurrentPage:1,//当前页数
      hpageSize:10, //每页显示个数选择器的选项设置
      hshowCount:10,//每页显示的记录数
      htotalResult:0,//总条数
      htotalPage:1,//总页数
      historyCdt:{},
      queryDialogVisible: false,
      pnrDialogVisible:false,
      pnrEve:'',
      eve:'',
      detailstableData: [],//详情里面的列表

      list1:[],
      list2:[],
      list3:["1E","3F","4G"],
      nation: [],
      value: '',
      value1: "",
      addDialogVisible: false,
      detailsDialogVisible: false,
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
      multipleSelection: [],
      pickerOptions: {
        disabledDate: (time) => {
            if (this.pd.departdateEnd != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.pd.departdateEnd;
            }else if(this.pd.departdateEnd == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            return endT < this.pd.departdateBegin;
        }
      },
      form: {},
      nav1Id:null
    }
  },
  mounted() {
  this.nav1Id=this.$route.query.nav1Id
  //  this.getList(this.CurrentPage, this.pageSize, this.pd);
  // this.getimgtable(this.CurrentPage, this.pageSize, this.pd);
  this.queryNationality();

  let time = new Date();
  let end = new Date();
  let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
  this.pd.departdateBegin=formatDate(begin,'yyyyMMddhhmm');
  this.pd.departdateEnd=formatDate(end,'yyyyMMddhhmm');

  },
  methods: {
    getHistoryListPnr(hcurrentPage,hshowCount,historyCdt){
      let ghl = {
        "currentPage":hcurrentPage,
      	"showCount":hshowCount,
      	"cdt":historyCdt
      };
      // this.historyBased();
      this.$api.post('/manage-platform/iapiUnscolicited/queryHistory',ghl,
      r =>{
        this.detailstableData = r.data.resultList;
        this.htotalResult = r.data.totalResult;
        this.htotalPage = r.data.totalPage;
      })
    },
    hpageSizeChange(val){//历次数据
      this.getHistoryListPnr(this.hcurrentPage,val,this.historyCdt);
    },
    hhandleCurrentChange(val){ //历次数据
      this.getHistoryListPnr(val,this.hshowCount,this.historyCdt);
    },

    qq(){
      this.page=1;
      this.getimgtable(0,10,this.pd);
    },
    handleSelectionChange(val) {
    this.multipleSelection = val;
    },
    getNation(msg){
      this.pd.NATIONALITY=msg;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }
      if(this.pd.flightNumber==""||this.pd.flightNumber==undefined){
        this.$alert('航班号不能为空！', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      if(dayGap(this.pd.departdateBegin,this.pd.departdateEnd,0)>30){
        this.$alert('查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/statusUpdate/seat/queryListPages', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);
          if (r.success) {
            this.nation = r.data;
          }
        })
    },

    getimgtable(currentPage, showCount, pd){
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/statusUpdate/seat/queryListPagesSeat', p,
        r => {
          console.log(r);
          this.list1 = r.data.list123;
          this.list2 = r.data.listabc;
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      this.historyCdt.NATIONALITY = i.nationality;
      this.historyCdt.PASSPORTNO = i.cardnum;
      console.log(i);
      this.getHistoryListPnr(this.hcurrentPage,this.hshowCount,this.historyCdt);
      this.$api.post('/manage-platform/pnr/queryPnrInfo',{serial:i.globalserial},
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
      this.queryDialogVisible = true;
      let ss={
        "event":this.eve
      }
      this.$api.post('/manage-platform/eventManagement/isFinishEventHandle',ss,
       r =>{
         if(r.data== true){
            this.$router.push({query:{eventserial:this.eve,type:0,nav1Id:this.nav1Id}})
         }else if(r.data == false){
           this.$router.push({query:{eventserial:this.eve,type:1,nav1Id:this.nav1Id}})
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
            this.$router.push({query:{eventserial:this.pnrEve,type:0,isZDGZ:1,nav1Id:this.nav1Id}})
         }else if(r.data == false){
           this.$router.push({query:{eventserial:this.pnrEve,type:1,isZDGZ:1,nav1Id:this.nav1Id}})
         }
       })
    },
  },
    filters: {
        filterdate(n)
        {
          if(n=="" || n==null){
            return n;
          }else {
              return n.substring(0,n.length-3);
          }

        }

    }
}
</script>

<style scoped>
.add-dialog {
  /* padding-left:40px; */
}
.detail-msg-row {
  color: #999;
  line-height: 32px;
}
.detail-msg-row span {
  color: #333;
  display: inline-block;
  width: 60px;
}
.planUL{
  display: flex;
  /* flex-direction:column; */
}
.planLi{
  display: flex;
  margin: 5px;
  flex-direction: column;
}
/* .planLi:first-child div{
  border: none;
  background: none
} */
.planLi div{
  width: 20px;
  height: 20px;
  border: 1px #105D93 solid;
  background: #70BDEB; text-align: center;
}
.planLifirst{
  display: flex;
  margin: 5px;
  flex-direction: column;
}
.planLifirst div{
  width: 20px;
  height: 20px;
  text-align: center;

}
.planLi div:last-child{
  border: none;
  background: none;text-align: center;
}

.checked{
  background:#56A8FE; color:#ffffff;
}
.tubiao{
width:100px; padding:6px 15px;  border:1px solid #56A8FE;
}
</style>
