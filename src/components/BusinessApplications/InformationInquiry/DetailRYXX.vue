<template lang="html">
  <div class="">
    <el-form :model="dform" ref="detailsForm">
      <div class="redx" v-show="!isIAPI">暂无值机信息</div>
      <div class="" v-show="isShow&&isIAPI">
        <div class="t-hrtitle">值机信息</div>
        <div class="hrtitle-child">基本信息</div>
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
        <div class="hrtitle-child">航班信息</div>
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
          <el-col :span="8" class="t-el-content"><div class="t-el-text">降落机场：</div><div class="t-el-sub">{{dform.FLIGHTTYPE=='O'?(dform.PORTSTR):dform.FLIGHTTYPE=='I'?(dform.CITYTONAME):''}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">备降口岸：</div><div class="t-el-sub">{{dform.CHANGEPORTSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司联系电话：</div><div class="t-el-sub">{{dform.AIRLINEPHONE}}</div></el-col>
        </el-row>
        <div class="hrtitle-child">其他信息</div>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司传真：</div><div class="t-el-sub">{{dform.AIRLINEFAX}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航信发送报文时间：</div><div class="t-el-sub">{{dform.GAPP_RECEIVETIMESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航信接受报文时间：</div><div class="t-el-sub">{{dform.GAPP_SENDTIMESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">流水号：</div><div class="t-el-sub">{{dform.TID}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客订票号：</div><div class="t-el-sub">{{dform.RECORDLOCATER}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客中间名：</div><div class="t-el-sub">{{dform.MIDDLENAME}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客类型：</div><div class="t-el-sub">{{dform.PASSENGERTYPESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客值机方式：</div><div class="t-el-sub">{{dform.VIDSTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">出入境手续：</div><div class="t-el-sub">{{dform.EEFLAG==1?'是':'否'}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">是否订票：</div><div class="t-el-sub">{{dform.PNRFLAG==1?'是':'否'}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">是否值机：</div><div class="t-el-sub">{{dform.CHKFLAG==1?'是':'否'}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">航班是否关闭：</div><div class="t-el-sub">{{dform.CLSFLAG==1?'是':'否'}}</div></el-col>
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
      </div>
      <!-- 订票信息 -->
      <div class="redx" v-show="!isPnr">暂无订票信息</div>
      <div v-show="isPnr">
        <div class="t-hrtitle">订票信息</div>
        <div class="hrtitle-child">基本信息</div>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">姓名：</div><div class="t-el-sub">{{dpform.pnrName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">性别：</div><div class="t-el-sub">{{dpform.PNR_GENDER=="F"?"女":dpform.PNR_GENDER=="M"?"男":"全部"}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出生日期：</div><div class="t-el-sub">{{dpform.pnrBirthdayName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">国籍：</div><div class="t-el-sub">{{dpform.pnrNationaName}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件号码：</div><div class="t-el-sub">{{dpform.PNR_PASSPORTNO}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">证件有效期：</div><div class="t-el-sub">{{dpform.PNR_CARDEXPIREDATESTR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">航班号：</div><div class="t-el-sub">{{dpform.PNR_FLTNO}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">航班日期：</div><div class="t-el-sub">{{dpform.PNR_FLTDATE1STR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">出入标识：</div><div class="t-el-sub">{{dpform.PNR_FLTTYPE=="O"?"出境":dpform.PNR_FLTTYPE=="I"?"入境":"全部"}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">起飞城市：</div><div class="t-el-sub">{{dpform.originName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">到达城市：</div><div class="t-el-sub">{{dpform.destinationName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">起飞机场：</div><div class="t-el-sub">{{dpform.pnrCityfromName}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">到达机场：</div><div class="t-el-sub">{{dpform.pnrCitytoName}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">计划起飞时间：</div><div class="t-el-sub">{{dpform.departdateStr}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">计划到达时间：</div><div class="t-el-sub">{{dpform.arrivdateStr}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">电子客票号：</div><div class="t-el-sub">{{dpform.TKTNUMBER}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">旅客订票号：</div><div class="t-el-sub">{{dpform.PNR_RCI}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">代理所在城市：</div><div class="t-el-sub">{{dpform.LOCATION_IDENTIFICATION_NAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">航班飞机型号：</div><div class="t-el-sub">{{dpform.MAXLENGTH}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">订票时间：</div><div class="t-el-sub">{{dpform.PNR_RCIDATESTR}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">旅客登机序号：</div><div class="t-el-sub">{{dpform.BOARDINGSEQUENCE}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">座位号：</div><div class="t-el-sub">{{dpform.PNR_SPECIFIGSEAT}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">座位所属：</div><div class="t-el-sub">{{dpform.PNR_CARBINCLASSDESIGNATOR}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">旅客其他姓名：</div><div class="t-el-sub">{{dpform.otherName}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">携带婴儿标志：</div><div class="t-el-sub">{{dpform.baby==1?'是':'否'}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">订单旅客数量：</div><div class="t-el-sub">{{dpform.tifSum}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">乘机人行李数量：</div><div class="t-el-sub">{{dpform.NUMBEROFPIECES}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="12" class="t-el-content"><div class="t-el-text">代理人IATAID号或虚拟IATA号：</div><div class="t-el-sub">{{dpform.TRAVEL_AGENT_IDENTIFICATION}}</div></el-col>
          <el-col :span="12" class="t-el-content"><div class="t-el-text">PNR报文发送方：</div><div class="t-el-sub">{{dpform.pnrFsf}}</div></el-col>
        </el-row>
        <el-row type="flex"  class="t-detail">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">订座系统分配给某个代理或Office的ID号：</div><div class="t-el-sub">{{dpform.IN_HOUSE_IDENTIFICATION}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box1=!box1">订票人住址<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in addList" v-if="box1" :key="ind">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">城市：</div><div class="t-el-sub">{{i.CITY_NAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">国家：</div><div class="t-el-sub">{{i.COUNTRY_NAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">街道号和街道名称：</div><div class="t-el-sub">{{i.STREET_AND_NUMBER}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box2=!box2">订票人联系方式<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in lftList" v-if="box2" :key="ind">
          <el-col :span="24" class="t-el-content"><div class="t-el-text">订票人联系方式：</div><div class="t-el-sub">{{i.CONTENT}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box3=!box3">非航空服务（汽车，旅馆）<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in msgList" v-if="box3" :key="ind">
          <div class="" v-for="j in i.tvlLv3List" style="width: 100%;">
            <el-col :span="8" class="t-el-content"><div class="t-el-text">服务的类型：</div><div class="t-el-sub">{{i.RESPONSE_TYPE}}</div></el-col>
            <el-col :span="8" class="t-el-content"><div class="t-el-text">服务提供者姓名：</div><div class="t-el-sub">{{j.PLACE_NAME}}</div></el-col>
            <el-col :span="8" class="t-el-content"><div class="t-el-text">服务提供者地址：</div><div class="t-el-sub">{{j.PRODUCT_IDENTIFICATION}}</div></el-col>
          </div>
        </el-row>
        <div class="hrtitle-child" @click="box4=!box4">订单特殊需求<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in ssrList" v-if="box4" :key="ind">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">订票人特殊请求类型：</div><div class="t-el-sub">{{i.SPECIAL_REQUIREMENT_TYPE}}</div></el-col>
          <el-col :span="18" class="t-el-content"><div class="t-el-text">订票人特殊请求描述：</div><div class="t-el-sub">{{i.FREETXT}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box5=!box5">分离旅客信息<i class="el-icon-d-caret"></i></div>
        <el-row class="t-detail" v-for="(i,ind) in eqnList" v-if="box5" :key="ind">
          <el-col :span="24" class="t-el-content"><div class="t-el-text">分离的人数：</div><div class="t-el-sub">{{i.eqnCount}}</div></el-col>
          <el-row type="flex"  v-for="(j,ind) in i.rciList" style="width:100%" :key="ind">
            <el-col :span="12" class="t-el-content"><div class="t-el-text">记录分离后的编号所属的航空公司代码：</div><div class="t-el-sub">{{j.COMPANY_IDENTIFICATION}}</div></el-col>
            <el-col :span="12" class="t-el-content"><div class="t-el-text">分离后的记录编号：</div><div class="t-el-sub">{{j.RESERVATION_CONTROL_NUMBER}}</div></el-col>
          </el-row>
        </el-row>
        <div class="hrtitle-child" @click="box6=!box6">旅客联系方式<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in lftListTwo" v-if="box6" :key="ind">
          <el-col :span="24" class="t-el-content"><div class="t-el-text">旅客联系方式：</div><div class="t-el-sub">{{i.CONTENT}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box7=!box7">旅客住址<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in addListTwo" v-if="box7" :key="ind">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">城市：</div><div class="t-el-sub">{{i.CITY_NAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">国家：</div><div class="t-el-sub">{{i.COUNTRY_NAME}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">街道号和街道名称：</div><div class="t-el-sub">{{i.STREET_AND_NUMBER}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box8=!box8">常旅客信息<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in ftiListTwo" v-if="box8" :key="ind">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">常旅客ID：</div><div class="t-el-sub">{{i.FREQUENT_T_IDENIFICATION}}</div></el-col>
          <el-col :span="6" class="t-el-content"><div class="t-el-text">常旅客登机：</div><div class="t-el-sub">{{i.MEMBERSHIP_LEVEL}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box9=!box9">旅客特殊需求<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in ssrListTwo" v-if="box9" :key="ind">
          <el-col :span="6" class="t-el-content"><div class="t-el-text">旅客特殊服务请求类型：</div><div class="t-el-sub">{{i.SPECIAL_REQUIREMENT_TYPE}}</div></el-col>
          <el-col :span="18" class="t-el-content"><div class="t-el-text">旅客特殊服务内容：</div><div class="t-el-sub">{{i.FREETXT}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box10=!box10">订票人机票更改记录<i class="el-icon-d-caret"></i></div>
        <el-row class="t-detail" v-for="(i,ind) in messageThr" v-if="box10" :key="ind">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">变更操作者的ID信息：</div><div class="t-el-sub">{{i.abi.TRAVEL_AGENT_IDENTIFICATION}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">变更者的城市代码：</div><div class="t-el-sub">{{i.abi.PLACE}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">变更时间：</div><div class="t-el-sub">{{i.abi.DATDATESTR}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">变更者的所属航司或GDS：</div><div class="t-el-sub">{{i.abi.COMPANY_IDENTIFICATION}}</div></el-col>
          <el-col style="width:100%" v-for="(j,ind) in i.hisGr11List" :key="ind">
            <div class="t-detail">
              <el-row>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客类型：</div><div class="t-el-sub">{{j.hisGr11.NAME_TYPE}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">旅客姓名：</div><div class="t-el-sub">{{j.hisGr11.NAME_TYPE}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">其他姓名：</div><div class="t-el-sub">{{j.hisGr11.OTHER_NAMES}}</div></el-col>
              </el-row>
              <el-row type="flex">
                <el-col :span="8" class="t-el-content"><div class="t-el-text">携带不占座婴儿标识：</div><div class="t-el-sub">{{j.hisGr11.TRAVELLER_A_BY_INFANT_ID}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">特殊服务类型：</div><div class="t-el-sub">{{j.hisGr11.SPECIAL_REQUIREMENT_TYPE}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">行李数量：</div><div class="t-el-sub">{{j.tbdGr11Count.SUM}}</div></el-col>
              </el-row>
            </div>
            <el-row type="flex" class="t-detail">
              <el-col :span="24" class="t-el-content"><div class="t-el-text">特殊需求描述：</div><div class="t-el-sub">{{j.hisGr11.SSRFREETXT}}</div></el-col>
            </el-row>

            <div class="t-detail" v-for="it in j.tvlList">
              <div class="t-detail" style="color: #3F96F2;">航班信息</div>
              <el-row type="flex">
                <el-col :span="8" class="t-el-content"><div class="t-el-text">航班号：</div><div class="t-el-sub">{{it.FLIGHT_NUMBER}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">航空公司：</div><div class="t-el-sub">{{it.OPERATING_AIRLINE_CODE}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞时间：</div><div class="t-el-sub">{{it.DEPARTURE}}</div></el-col>
              </el-row>
              <el-row type="flex">
                <el-col :span="8" class="t-el-content"><div class="t-el-text">到达时间：</div><div class="t-el-sub">{{it.ARRIVAL}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">起飞机场：</div><div class="t-el-sub">{{it.LAST_DEPARTURE_AIRPORT_NAME}}</div></el-col>
                <el-col :span="8" class="t-el-content"><div class="t-el-text">降落机场：</div><div class="t-el-sub">{{it.FIRST_ARRIVAL_AIRPORT_NAME}}</div></el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <div class="hrtitle-child" @click="box11=!box11">订票人付款信息<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in fopList" v-if="box11" :key="ind">
          <el-col :span="12" class="t-el-content"><div class="t-el-text">订票人付款方式：</div><div class="t-el-sub">{{i.PAYMENT_TYPE}}</div></el-col>
          <el-col :span="12" class="t-el-content"><div class="t-el-text">订票人付款账号：</div><div class="t-el-sub">{{i.ACCOUNT_NUMBER}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box12=!box12">票价信息<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in monList" v-if="box12" :key="ind">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">客票金额类型：</div><div class="t-el-sub">{{i.MONETARY_AMOUNT_TYPE}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">金额：</div><div class="t-el-sub">{{i.AMOUNT}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">货币代码：</div><div class="t-el-sub">{{i.CURRENCY}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box13=!box13">票税信息<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in txdList" v-if="box13" :key="ind">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">税金额：</div><div class="t-el-sub">{{i.TAX_AMOUNT}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">货币类型：</div><div class="t-el-sub">{{i.CURRENCY}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">税类型：</div><div class="t-el-sub">{{i.TAX_TYPE}}</div></el-col>
        </el-row>
        <div class="hrtitle-child" @click="box14=!box14">旅客行李情况<i class="el-icon-d-caret"></i></div>
        <el-row type="flex"  class="t-detail" v-for="(i,ind) in messageFive" v-if="box14" :key="ind">
          <el-col :span="8" class="t-el-content"><div class="t-el-text">乘机人行李条码：</div><div class="t-el-sub">{{i.BAG_LICENSE_PLATE}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">乘机人连续条码数量：</div><div class="t-el-sub">{{i.CONSECUTIVE_TAGS_SERIAL_NUM}}</div></el-col>
          <el-col :span="8" class="t-el-content"><div class="t-el-text">乘机人行李目的地：</div><div class="t-el-sub">{{i.PLACE_OF_DESTINATION_NAME}}</div></el-col>
        </el-row>
      </div>
    </el-form>
  </div>

</template>

<script>
export default {
  data(){
    return {
      isShow:true,
      isIAPI:true,
      isPnr:true,
      dform:{},
      dpform:{},
      addList:[],
      eqnList:[],
      lftList:[],
      msgList:[],
      ssrList:[],

      addListTwo:[],
      lftListTwo:[],
      ftiListTwo:[],
      ssrListTwo:[],

      messageThr:[],

      fopList:[],
      monList:[],
      txdList:[],

      messageFive:[],

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
      SERIAL:this.SERIAL,
      detailType:this.detailType,//0:综查，1：pnr
      pnrType:this.pnrType,//6:批量pnr,8:自定义pnr
      SERIALPnr:this.SERIALPnr,
      SERIALSelf:this.SERIALSelf,
    }
  },
  props:['detailType','SERIAL','CHK_SERIAL','PNR_TID','PNR_TKTNUMBER','PNR_TRAVELLER_SURNAME_TIF','PNR_TRAVELLER_GIVEN_NAME_TIF','SERIALPnr','PNR_TIDPnr','PNR_TKTNUMBERPnr','SERIALSelf','PNR_TIDSelf','PNR_TKTNUMBERSelf','pnrType'],
  watch:{
    SERIAL:function(newVal,oldVal){
      console.log(newVal,oldVal);
      this.SERIAL = newVal;
      this.detailShow();
    },
    detailType:function(newVal,oldVal){
      console.log(newVal,oldVal);
      this.detailType = newVal;
    },
    pnrType:function(newVal,oldVal){
      console.log(newVal,oldVal);
      this.pnrType = newVal;
    },
    SERIALPnr:function(newVal,oldVal){
      console.log(newVal,oldVal);
      this.SERIALPnr = newVal;
      this.detailShow();
    },
    SERIALSelf:function(newVal,oldVal){
      console.log(newVal,oldVal);
      this.SERIALSelf = newVal;
      this.detailShow();
    }
  },
  mounted(){
    this.detailShow()
  },
  methods:{
    detailShow(){
      if(this.detailType==0){
        this.isShow=true;
        let p={
          'SERIAL':this.SERIAL,
          'CHK_SERIAL':this.CHK_SERIAL,
          'PNR_TID':this.PNR_TID,
          'PNR_TKTNUMBER':this.PNR_TKTNUMBER,
          'PNR_TRAVELLER_SURNAME_TIF':this.PNR_TRAVELLER_SURNAME_TIF,
          'PNR_TRAVELLER_GIVEN_NAME_TIF':this.PNR_TRAVELLER_GIVEN_NAME_TIF
        }
        this.$api.post('/manage-platform/iapiHead/queryIapiHeadInfo',p,
         r =>{
           if(r.success){
             if(r.data.IAPINULL == 0){//有数据
               this.isIAPI = true;
               this.dform = r.data.IAPI;
             }else if(r.data.IAPINULL == 1){
               this.isIAPI = false;
             }
             if(r.data.PNRNULL == 0){//有数据
               this.isPnr = true;
               this.dpform = r.data.pnrBasis;
               if(r.data.pnrTif){
                 this.$api.post('/manage-platform/pnr/queryPnrGr1InfoNew',r.data.pnrTif,
                  r =>{
                    this.addList = r.data.addList;//订票人住址
                    this.lftList = r.data.lftList;//订票人联系方式
                    this.msgList = r.data.msgList;//服务
                    this.ssrList = r.data.ssrList;//订单特殊需求
                    this.eqnList = r.data.eqnList;//分离旅客信息
                    this.dpform.pnrFsf = r.data.COMPANY_IDENTIFICATION;//pnr发送方
                    this.dpform.tifSum = r.data.tifSum;//订单旅客数量
                    this.dpform.LOCATION_IDENTIFICATION_NAME = r.data.orgInfo.LOCATION_IDENTIFICATION_NAME;//代理所在城市
                    this.dpform.TRAVEL_AGENT_IDENTIFICATION = r.data.orgInfo.TRAVEL_AGENT_IDENTIFICATION;//代理人IATAID号或虚拟IATA号
                    this.dpform.IN_HOUSE_IDENTIFICATION = r.data.orgInfo.IN_HOUSE_IDENTIFICATION;//订座系统分配给某个代理或Office的ID号
                  })
                  this.$api.post('/manage-platform/pnr/queryPassengersLv3Gr2New',r.data.pnrTif,
                  r =>{
                    this.addListTwo = r.data.addList;//旅客住址
                    this.lftListTwo = r.data.lftList;//旅客联系方式
                    this.ftiListTwo = r.data.ftiList;//常旅客信息
                    this.ssrListTwo = r.data.ssrList;//旅客特殊需求
                    this.dpform.otherName = r.data.tif.OTHER_NAMES;//旅客其他姓名
                    this.dpform.baby = r.data.tif.T_A_BY_INFANT_INDICATOR;//携带婴儿标志
                  })
                  let p={
                    "showCount": 10,
                   "currentPage": 1,
                   "pd": r.data.pnrTif
                  }
                  this.$api.post('/manage-platform/pnr/queryHisGr10ListPageNew',p,
                   r =>{
                      this.messageThr = r.data.resultList;
                   })
                  this.$api.post('/manage-platform/pnr/queryTikcetsGr3New',r.data.pnrTif,
                    r =>{
                      this.fopList = r.data.fopList;//付款方式
                      this.monList = r.data.monList;//票价信息
                      this.txdList = r.data.txdList;//票税信息
                    })
                  this.$api.post('/manage-platform/pnr/queryTbdGr7InfoNew',r.data.pnrTif,
                   r =>{
                     this.messageFive = r.data.tbdDetailsList;
                     this.dpform.NUMBEROFPIECES = r.data.NUMBEROFPIECES;//乘机人行李数
                     this.dpform.TYPE_OF_AIRCRAFT = r.data.TYPE_OF_AIRCRAFT;//航班飞机型号
                     this.dpform.BOARDINGSEQUENCE = r.data.BOARDINGSEQUENCE;//旅客登机序号
                   })
               }
             }else if(r.data.PNRNULL == 1){
               this.isPnr = false;
             }
           }
         })
      }else if(this.detailType==1){
        this.isShow=false;
        let n={}
        if(this.pnrType == 6){
          n = {
            'SERIAL':this.SERIALPnr,
            // 'PNR_TID':this.PNR_TIDPnr,
            // 'PNR_TKTNUMBER':this.PNR_TKTNUMBERPnr
          }
        }else if(this.pnrType == 8){
          n = {
            'SERIAL':this.SERIALSelf,
            // 'PNR_TID':this.PNR_TIDSelf,
            // 'PNR_TKTNUMBER':this.PNR_TKTNUMBERSelf
          }
        }
        this.$api.post('/manage-platform/iapiHead/queryPnrBatchInfo',n,
         r =>{
           if(r.success){
             this.isPnr=true;
             this.dpform = r.data.pnrBasis;
             if(r.data.pnrTif){
               this.$api.post('/manage-platform/pnr/queryPnrGr1InfoNew',r.data.pnrTif,
                r =>{
                  this.addList = r.data.addList;//订票人住址
                  this.lftList = r.data.lftList;//订票人联系方式
                  this.msgList = r.data.msgList;//服务
                  this.ssrList = r.data.ssrList;//订单特殊需求
                  this.eqnList = r.data.eqnList;//分离旅客信息
                  this.dpform.pnrFsf = r.data.COMPANY_IDENTIFICATION;//pnr发送方
                  this.dpform.tifSum = r.data.tifSum;//订单旅客数量
                  this.dpform.LOCATION_IDENTIFICATION_NAME = r.data.orgInfo.LOCATION_IDENTIFICATION_NAME;//代理所在城市
                  this.dpform.TRAVEL_AGENT_IDENTIFICATION = r.data.orgInfo.TRAVEL_AGENT_IDENTIFICATION;//代理人IATAID号或虚拟IATA号
                  this.dpform.IN_HOUSE_IDENTIFICATION = r.data.orgInfo.IN_HOUSE_IDENTIFICATION;//订座系统分配给某个代理或Office的ID号
                })
                this.$api.post('/manage-platform/pnr/queryPassengersLv3Gr2New',r.data.pnrTif,
                r =>{
                  this.addListTwo = r.data.addList;//旅客住址
                  this.lftListTwo = r.data.lftList;//旅客联系方式
                  this.ftiListTwo = r.data.ftiList;//常旅客信息
                  this.ssrListTwo = r.data.ssrList;//旅客特殊需求
                  this.dpform.otherName = r.data.tif.OTHER_NAMES;//旅客其他姓名
                  this.dpform.baby = r.data.tif.T_A_BY_INFANT_INDICATOR;//携带婴儿标志
                })
                let p={
                 "showCount": 10,
                 "currentPage": 1,
                 "pd": r.data.pnrTif
                }
                this.$api.post('/manage-platform/pnr/queryHisGr10ListPageNew',p,
                 r =>{
                    this.messageThr = r.data.resultList;
                 })
                this.$api.post('/manage-platform/pnr/queryTikcetsGr3New',r.data.pnrTif,
                  r =>{
                    this.fopList = r.data.fopList;//付款方式
                    this.monList = r.data.monList;//票价信息
                    this.txdList = r.data.txdList;//票税信息
                  })
                this.$api.post('/manage-platform/pnr/queryTbdGr7InfoNew',r.data.pnrTif,
                 r =>{
                   this.messageFive = r.data.tbdDetailsList;
                   this.dpform.NUMBEROFPIECES = r.data.NUMBEROFPIECES;//乘机人行李数
                   this.dpform.TYPE_OF_AIRCRAFT = r.data.TYPE_OF_AIRCRAFT;//航班飞机型号
                   this.dpform.BOARDINGSEQUENCE = r.data.BOARDINGSEQUENCE;//旅客登机序号
                 })
             }
           }else{
             this.isPnr=false;
           }
         })
      }
    },
  }
}
</script>

<style lang="css">
</style>
