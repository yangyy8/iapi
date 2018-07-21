<template>
<div class="nationlHBSSJK" :class="{'qgjk-zdh':zdh}">
  <div class="map-top">
    <h3 class="map-title">公安部出入境旅客检测体系</h3>
    <ul class="map-tabul">
      <li class="map-tabli mr-30 hand" :class="{'check-tab':tabId==1}" @click="tabId=1">
        <img src="../../../assets/img/qgjk/tab1_1.png" alt="" v-if="tabId==1">
        <img src="../../../assets/img/qgjk/tab1_0.png" alt="" v-else>
        <span>口岸监控</span>
      </li>
      <li class="map-tabli mr-30 hand" :class="{'check-tab':tabId==2}" @click="tabId=2;getJkHb()">
        <img src="../../../assets/img/qgjk/tab2_1.png" alt="" v-if="tabId==2">
        <img src="../../../assets/img/qgjk/tab2_0.png" alt="" v-else>
        <span>航班监控</span>
      </li>
      <li class="map-tabli hand" :class="{'check-tab':tabId==3}" @click="tabId=3;getRy()">
        <img src="../../../assets/img/qgjk/tab3_1.png" alt="" v-if="tabId==3">
        <img src="../../../assets/img/qgjk/tab3_0.png" alt="" v-else>
        <span>人员监控</span>
      </li>
    </ul>
    <img src="../../../assets/img/qgjk/big.png" alt="" class="zdh" @click="zdh=!zdh">
  </div>
  <transition name="el-zoom-in-left">
    <div class="left-list" v-if="showLeft">
      <img src="../../../assets/img/qgjk/list1.png" alt="" @click="getLeftData">
    </div>
  </transition>
  <transition name="el-zoom-in-left">
    <div class="left-box" v-if="!showLeft">
      <div class="left-box1 mb-6">
        <div class="box-title">
          <div class="title-top"></div>
          <div class="title-text">
            全国航班统计
          </div>
          <div class="title-down" @click="showLeft=true">
            收起
          </div>
        </div>
        <div class="box-content">
          <div class="content-top mb-6">
            当日航班数量统计
          </div>
          <div class="content-middle">
            <ul class="middleUl">
              <li class="middleLi content-middle-head">
                <div class="td1">

                </div>
                <div class="td2">
                  入境
                </div>
                <div class="td3">
                  出境
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  计划
                </div>
                <div class="td2">
                  {{hbsl.inScheduleCount}}
                </div>
                <div class="td3">
                  {{hbsl.outScheduleCount}}
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  预检
                </div>
                <div class="td2">
                  {{hbsl.inCheckCount}}
                </div>
                <div class="td3">
                  {{hbsl.outCheckCount}}
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  取消
                </div>
                <div class="td2">
                  {{hbsl.inCancelCount}}
                </div>
                <div class="td3">
                  {{hbsl.outCancelCount}}
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  重点
                </div>
                <div class="td2">
                  {{hbsl.inFocusCount}}
                </div>
                <div class="td3">
                  {{hbsl.outFocusCount}}
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  延误
                </div>
                <div class="td2">
                  {{hbsl.inDelayCount}}
                </div>
                <div class="td3">
                  {{hbsl.outDelayCount}}
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  实际
                </div>
                <div class="td2">
                  {{hbsl.inRealCount}}
                </div>
                <div class="td3">
                  {{hbsl.outRealCount}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="left-box1">
        <div class="box-title">
          <div class="title-top o-title"></div>
          <div class="title-text">
            口岸航班统计
          </div>
          <div class="title-down" @click="showLeft=true">
            收起
          </div>
        </div>
        <div class="box-content">
          <div class="content-middle">
            <ul class="middleUl">
              <li class="middleLi2 content-middle-head2">
                <div class="td1">

                </div>
                <div class="td2">
                  入境
                </div>
                <div class="td2">
                  出境
                </div>
                <div class="td2">
                  预检
                </div>
                <div class="td2">
                  重点
                </div>
                <div class="td2">
                  取消
                </div>
                <div class="td2">
                  延误
                </div>
              </li>
              <li class="middleLi2" v-for="i in kahb">
                <div class="td1">
                  {{i.portName}}
                </div>
                <div class="td2">
                  {{i.inScheduleCount}}
                </div>
                <div class="td2">
                  {{i.outScheduleCount}}
                </div>
                <div class="td2">
                  {{i.inCheckCount+i.outCheckCount}}
                </div>
                <div class="td2">
                  {{i.inFocusCount+i.outFocusCount}}
                </div>
                <div class="td2">
                  {{i.inCancelCount+i.outCancelCount}}
                </div>
                <div class="td2">
                  {{i.inDelayCount+i.outDelayCount}}
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <transition name="el-zoom-in-right">
    <div class="right-list" v-show="showRight">
      <img src="../../../assets/img/qgjk/list2.png" alt="" @click="getRightData">
    </div>
  </transition>
  <transition name="el-zoom-in-right">
    <div class="right-box" v-show="!showRight">
      <div class="left-box1 mb-6">
        <div class="box-title">
          <div class="title-top b-title"></div>
          <div class="title-text">
            全国人员统计
          </div>
          <div class="title-down" @click="showRight=true">
            收起
          </div>
        </div>
        <div class="box-content">
          <div class="content-top mb-6">
            当日人员概况
          </div>
          <div class="content-middle">
            <ul class="middleUl">
              <li class="middleLi3 content-middle-head3">
                <div class="td1">

                </div>
                <div class="td2">
                  入境
                </div>
                <div class="td2">
                  出境
                </div>
                <div class="td2">
                  过境
                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  计划
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  预检
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  登记
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  实际
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
                <div class="td2">
                  2880
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="left-box1">
        <div class="box-title">
          <div class="title-top g-title"></div>
          <div class="title-text">
            口岸人员统计
          </div>
          <div class="title-down" @click="showRight=true">
            收起
          </div>
        </div>
        <div class="box-content">
          <div class="content-middle">
            <ul class="middleUl">
              <li class="middleLi4 content-middle-head4">
                <div class="td1">

                </div>
                <div class="td2">
                  内地
                </div>
                <div class="td2">
                  港澳台
                </div>
                <div class="td2">
                  外国人
                </div>
                <div class="td2">
                  合计
                </div>
                <div class="td2">
                  命中
                </div>
              </li>
              <li class="middleLi4">
                <div class="td1">
                  北京
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
              </li>
              <li class="middleLi4">
                <div class="td1">
                  北京
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>

              </li>
              <li class="middleLi4">
                <div class="td1">
                  北京
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
              </li>
              <li class="middleLi4">
                <div class="td1">
                  北京
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
              </li>
              <li class="middleLi4">
                <div class="td1">
                  北京
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
                <div class="td2">
                  4000
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <transition name="el-zoom-in-top">
    <div class="tan-box" v-show="tabId==1">
      <span class="top-left"></span>
      <span class="top-right"></span>
      <span class="down-left"></span>
      <span class="down-right"></span>

      <div class="tan-row1 mb-20">
        <div class="tan-row-text mr-20">
          出入类型
        </div>
        <div class="tan-right">
          <el-radio v-model="crType" label="0" class="mr-15">全部</el-radio>
          <el-radio v-model="crType" label="1" class="mr-15">入境</el-radio>
          <el-radio v-model="crType" label="2">出境</el-radio>
        </div>
      </div>
      <div class="tan-row2 mb-20">
        <div class="tan-row-text">
          境内口岸
        </div>
        <div class="tan-content">
          <el-row>

          </el-row>
        </div>
      </div>
      <div class="tan-row2">
        <div class="tan-row-text">
          境外口岸
        </div>
      </div>
    </div>
  </transition>
  <transition name="el-zoom-in-top">
    <div class="tan-box width2" v-show="tabId==2">
      <span class="top-left"></span>
      <span class="top-right"></span>
      <span class="down-left"></span>
      <span class="down-right"></span>
      <div class="tan-row2">
        <div class="tan-row-text">
          航班筛选条件：
        </div>
        <el-row :gutter="10" class="bb">
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">航站/口岸：</span>
            <el-select placeholder="请选择"  filterable @visible-change="getHz" v-model="p1.port" size="mini"  class="item-input">
              <el-option
                v-for="item in HzList"
                :key="item.KADM"
                :value="item.KADM"
                :label="item.KADM+' - '+item.KAMC">

                </el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">航班号：</span>
            <el-input v-model="p1.fltNo" placeholder="请输入内容" size="mini"  class="item-input"></el-input>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">航空公司：</span>
            <el-select placeholder="请选择"  filterable @visible-change="getHkGs" v-model="p1.fltCompany" size="mini"  class="item-input">
              <el-option
                v-for="item in HgList"
                :key="item.AIRLINE_CODE"
                :value="item.AIRLINE_CODE"
                :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">航班日期：</span>
            <el-date-picker
              class="item-input"
              v-model="p1.fltDate"
              type="date" size="mini" value-format="yyyyMMdd"
              placeholder="选择时间"  >
            </el-date-picker>

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">出发时间：</span>
            <el-date-picker
              class="item-input"
              v-model="p1.departTime"
              type="date" size="mini" value-format="yyyyMMddHHmm"
              placeholder="选择时间"  >
            </el-date-picker>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">到达时间：</span>
            <el-date-picker
              class="item-input"
              v-model="p1.arriveTime"
              type="date" size="mini" value-format="yyyyMMddHHmm"
              placeholder="选择时间"  >
            </el-date-picker>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">出入标识：</span>
            <el-select placeholder="请选择" size="mini" v-model="p1.iOType" class="item-input">
              <el-option label="入境" value="I"></el-option>
              <el-option label="出境" value="O"></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="tan-btn-g">
          <el-button type="primary" size="small" class="mr-10" @click="cleartab2">清空</el-button>
          <!-- <el-button type="success" size="small" class="mr-10">取消</el-button> -->
          <el-button type="info" size="small" @click="getJkHb">确定</el-button>
        </div>
        <div class="tan-row-text">
          航班监控表：
        </div>
        <el-table
          :data="HBList"
          border
          style="width: 100%">
          <el-table-column
            prop="preDepartTime"
            label="预计起飞">
          </el-table-column>
          <el-table-column
            prop="preArriveTime"
            label="预计抵达">
          </el-table-column>
          <el-table-column
            prop="fltDate"
            label="航班日期">
          </el-table-column>
          <el-table-column
            prop="fltno"
            label="航班号">
          </el-table-column>
          <el-table-column
            prop="date"
            label="航空公司">
          </el-table-column>
          <el-table-column
            prop="from"
            label="出发地">
          </el-table-column>
          <el-table-column
            prop="to"
            label="到达地">
          </el-table-column>
          <el-table-column
            prop="date"
            label="清关城市">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div class="flex-r">
                <div class="ta-btn hand" @click="delJkHb(scope.row.fltKey)">删除</div>
              </div>
           </template>
          </el-table-column>
        </el-table>
        <div class="tan-btn-g">
          <el-button type="info" size="small"  @click="tabId=0">关闭</el-button>
        </div>
      </div>
    </div>
  </transition>

  <transition name="el-zoom-in-top">
    <div class="tan-box width3" v-show="tabId==3">
      <span class="top-left"></span>
      <span class="top-right"></span>
      <span class="down-left"></span>
      <span class="down-right"></span>
      <div class="tan-row2">
        <div class="tan-row-text">
          航班筛选条件：
        </div>
        <el-row :gutter="10" class="bb">
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">航站/口岸：</span>
            <el-select placeholder="请选择"  filterable @visible-change="getHz" v-model="p2.port" size="mini"  class="item-input">
              <el-option
                v-for="item in HzList"
                :key="item.KADM"
                :value="item.KADM"
                :label="item.KADM+' - '+item.KAMC">

                </el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">证件号码：</span>
            <el-input v-model="p2.passport" placeholder="请输入内容" size="mini"  class="item-input"></el-input>

          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">国籍：</span>
            <el-select placeholder="请选择"  filterable @visible-change="getGj" v-model="p2.NATIONALITY" size="mini"  class="item-input">
              <el-option
                v-for="item in GjList"
                :key="item.CODE"
                :value="item.CODE"
                :label="item.CODE+' - '+item.CNAME">

                </el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">姓名：</span>
            <el-input v-model="p2.name" placeholder="请输入内容" size="mini"  class="item-input"></el-input>

          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">性别：</span>
            <el-select placeholder="请选择" size="mini" v-model="p2.GENDER" class="item-input">
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="F"></el-option>
              <el-option label="未知" value="U"></el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">出生日期：</span>
            <el-date-picker
              class="item-input"
              v-model="p2.birthday"
              type="date" size="mini" value-format="yyyyMMdd"
              placeholder="选择时间"  >
            </el-date-picker>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">出入标识：</span>
            <el-select placeholder="请选择" size="mini" v-model="p2.iOType" class="item-input">
              <el-option label="入境" value="I"></el-option>
              <el-option label="出境" value="O"></el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">航班号：</span>
            <el-input v-model="p2.fltNo" placeholder="请输入内容" size="mini"  class="item-input"></el-input>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">航班日期：</span>
            <el-date-picker
              class="item-input"
              v-model="p2.fltDate"
              type="date" size="mini" value-format="yyyyMMdd"
              placeholder="选择时间"  >
            </el-date-picker>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">出发时间：</span>
            <el-date-picker
              class="item-input"
              v-model="p2.departTime"
              type="date" size="mini" value-format="yyyyMMddHHmm"
              placeholder="选择时间"  >
            </el-date-picker>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">到达时间：</span>
            <el-date-picker
              class="item-input"
              v-model="p2.arriveTime"
              type="date" size="mini" value-format="yyyyMMddHHmm"
              placeholder="选择时间"  >
            </el-date-picker>
          </el-col>
        </el-row>
        <div class="tan-btn-g">
          <el-button type="primary" size="small" class="mr-10" @click="cleartab3">清空</el-button>
          <!-- <el-button type="success" size="small" class="mr-10">取消</el-button> -->
          <el-button type="info" size="small" @click="getRy">查询</el-button>
        </div>
        <div class="tan-row-text">
          人员监控表：
        </div>
        <el-table
          :data="RyList"
          border
          style="width: 100%">
          <el-table-column
            prop="preDepartTime"
            label="预计起飞">
          </el-table-column>
          <el-table-column
            prop="preArriveTime"
            label="预计抵达">
          </el-table-column>
          <el-table-column
            prop="fltDate"
            label="航班日期">
          </el-table-column>
          <el-table-column
            prop="fltno"
            label="航班号">
          </el-table-column>
          <el-table-column
            prop="passportNo"
            label="证件号码">
          </el-table-column>
          <el-table-column
            prop="nationalityName"
            label="国籍">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="birthDay"
            label="出生日期">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <div class="flex-r">
                <div class="ta-btn hand" @click="delRy(scope.row.trvKey)">删除</div>
              </div>
           </template>
          </el-table-column>
        </el-table>
        <div class="tan-btn-g">
          <el-button type="info" size="small" @click="tabId=0">关闭</el-button>
        </div>
      </div>
    </div>
  </transition>
  <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart" class="canvas"></div>
</div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/world.js';

export default {
  props: {
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "700px"
    }
  },
  data() {
    return {
      zdh:false,
      tabId: 0,
      crType:0,
      newHbData:{},
      hbsl:{},
      kahb:{},
      rygk:{},
      kary:{},
      newHbData:[],
      showLeft: true,
      showRight: true,
      HzList:[],
      HgList:[],
      GjList:[],

      HBList:[],
      RyList:[],
      p1:{
        showCount:5,
        currentResult:0,
        currentPage:1
      },
      p2:{
        showCount:5,
        currentResult:0,
        currentPage:1
      },
      chart: null,
      tableData: [{
         date: '2016',
         name: '王小虎',
         address: '1518'
       }, {
         date: '2016',
         name: '王小虎',
         address: '1517'
       }],
      geoCoordMap: {
        '南宁': [108.479, 23.1152],
        '广州': [113.5107, 23.2196],
        '重庆': [107.7539, 30.1904],
        '芬兰': [24.909912, 60.169095],
        '美国': [-100.696295, 33.679979],
        '日本': [139.710164, 35.706962],
        '韩国': [126.979208, 37.53875],
        '瑞士': [7.445147, 46.956241],
        '东南亚': [117.53244, 5.300343],
        '澳大利亚': [135.193845, -25.304039],
        '德国': [13.402393, 52.518569],
        '英国': [-0.126608, 51.208425],
        '加拿大': [-102.646409, 59.994255]
      },
      planePath: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',

      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 3,
          rippleEffect: {
            brushType: 'stroke'
          },
          symbolSize: function(val) {
            return val[2] / 6;
          },
          data: [{
            // 这里面的数据，由于一开始就知道终点位置是什么，所以直接写死，如果通过ajax来获取数据的话，还要进行相应的处理
            name: "重庆",
            value: [107.7539, 30.1904, 30],
            label: {
              normal: {
                position: 'top'
              }
            }
          }, {
            name: '广州',
            value: [113.5107, 23.2196, 30],
            label: {
              normal: {
                position: 'right'
              }
            }
          }, {
            name: '南宁',
            value: [108.479, 23.1152, 30]
          }],
          itemStyle: {
            normal: {
              color: '#10fb46'
            }
          },
        }
      ], // 用来存储地图数据
    };
  },

  mounted() {
    this.initChart(this.series);
    // this.chinaConfigure();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    getLeftData(){
      this.showLeft=false;
      this.$api.post('/eamp/nationwide/getFlightCountToday',{},
       r => {
         console.log(r);
         this.hbsl=r.data;
      });
      this.$api.post('/eamp/nationwide/getFlightPortCountToday',{},
       r => {
         console.log(r);
         this.kahb=r.data;
      })
    },
    getRightData(){
      this.showRight=false;
      this.$api.post('/eamp/nationwide/getTravelerCountToday',{},
       r => {
         console.log(r);
         this.rygk=r.data;
      });
      this.$api.post('/eamp/nationwide/getTravelerPortCountToday',{},
       r => {
         console.log(r);
         this.kary=r.data;
      })
    },
    // 获取口岸航站
    getHz(){
      if(this.HzList.length==0){
        this.$api.post('/eamp/codeTable/queryAirportMatch',{},
          r => {
            console.log(r)
            this.HzList=r.data
          })
      }

    },
    // 获取航空公司
    getHkGs(){
      if(this.HgList.length==0){
        this.$api.post('/eamp/codeTable/queryAircompanyList',{},
          r => {
            console.log(r)
            this.HgList=r.data
          })
      }

    },
    // 获取国籍
    getGj(){
      if(this.HgList.length==0){
        this.$api.post('/eamp/codeTable/queryNationality',{},
          r => {
            console.log(r)
            this.GjList=r.data
          })
      }

    },
    // 最新航班监控信息取得
    getNewData(){
      this.$api.post('/eamp/nationwide/getFlightMonitorInfo',{},
       r => {
         console.log(r);
         this.newHbData=r.data;
      })
    },
    // 航班详细信息取得
    getXqHb(fk){
      // ?fk=CZ3221806162230
      this.$api.post('/eamp/nationwide/getFlightDetail',{fk:fk},
       r => {
         console.log(r);
      })
    },
    //口岸详细信息取得
    getXqKa(port){
      // ?fk=CZ3221806162230
      this.$api.post('/eamp/nationwide/getPortDetail',{port:port},
       r => {
         console.log(r);
      })
    },
    // 当前监控口岸取得
    getJkKa(){
      this.$api.post('/eamp/portMonitor/getMonitorPortInfo',{},
       r => {
         console.log(r);
      })
    },
    // 更新监控口岸
    updateJkKa(){
      let p={};
      this.$api.post('/eamp/portMonitor/updateMonitorPortInfo',p,
       r => {
         console.log(r);
      })
    },
    // 境内省列表取得
    getSList(){
      this.$api.post('/eamp/portMonitor/getInProvinceList',{},
       r => {
         console.log(r);
      })
    },
    // 境内口岸列表取得
    getKaList(){
      this.$api.post('/eamp/portMonitor/getInPortList',{},
       r => {
         console.log(r);
      })
    },
    // 境外国家列表取得
    getGjList(){
      this.$api.post('/eamp/portMonitor/getOutNationalityList',{},
       r => {
         console.log(r);
      })
    },
    // 境外口岸列表取得
    getJwKaList(){
      this.$api.post('/eamp/portMonitor/getOutPortList',{},
       r => {
         console.log(r);
      })
    },

    // 清空航班查询
    cleartab2(){
        this.p1={
          showCount:5,
          currentResult:0,
          currentPage:1
        }
    },
    // 清空人员查询
    cleartab3(){
        this.p2={
          showCount:5,
          currentResult:0,
          currentPage:1
        }
    },
    // 航班监控查询
    getJkHb(){
      this.$api.post('/eamp/flightMonitor/queryFlightPage',this.p1,
       r => {
         console.log(r);
         this.HBList=r.data.pdList
      })
    },
    // 添加监控航班
    addJkHb(){
      this.$api.post('/eamp/flightMonitor/getMonitorFlights',{},
       r => {
         console.log(r);
      })
    },
    // 删除监控航班delMonitorFlight
    delJkHb(fk){
      this.$api.post('/eamp/flightMonitor/delMonitorFlight',{fltKey:fk},
       r => {
         console.log(r);
         if(r.success){
           this.$message({
             message: '恭喜你，删除成功！',
             type: 'success'
           });
           this.getJkHb()
         }else{
           this.$message.error(r.message);
         }
      })
    },
    // 当前监控航班取得
    getDqJkHb(fk){
      this.$api.post('/eamp/flightMonitor/addMonitorFlight',{fltKey:fk},
       r => {
         console.log(r);
      })
    },

    // 人员监控查询
    getRy(){
      this.$api.post('/eamp/travelerMonitor/queryTravelerPage',this.p2,
       r => {
         console.log(r);
         this.RyList=r.data.pdList;
      })
    },
    // 添加监控人员
    addRy(){
      this.$api.post('/eamp/travelerMonitor/addMonitorTraveler',{},
       r => {
         console.log(r);
      })
    },
    // 删除监控人员
    delRy(tk){
      this.$api.post('/eamp/travelerMonitor/delMonitorTraveler',{trvKey:tk},
       r => {
         console.log(r);
         if(r.success){
           this.$message({
             message: '恭喜你，删除成功！',
             type: 'success'
           });
           this.getRy()
         }else{
           this.$message.error(r.message);
         }
      })
    },
    // 当前监控人员取得
    getDqRy(tk){
      this.$api.post('/eamp/travelerMonitor/getMonitorTravelers',{trvKey:tk},
       r => {
         console.log(r);
      })
    },

    initChart(series) {

      this.chart = echarts.init(this.$refs.myEchart);
      window.onresize = echarts.init(this.$refs.myEchart).resize;
      // 把配置和数据放这里
      this.chart.setOption({
        geo: {
          map: 'world', // 与引用进来的地图js名字一致
          roam: true, // 禁止缩放平移
          nameMap:{
            // 'China':'中国'
          },
          label:{
            // show:true,
            emphasis: {
              show: false
            }
          },
          itemStyle: { // 每个区域的样式
            borderWidth:10,
            normal: {
              areaColor: '#02b0d2'
            },
            emphasis: {
              areaColor: '#02b0d2'
            }
          },
          regions: [{ // 选中的区域
            name: 'China',
            selected: true,
            itemStyle: { // 高亮时候的样式
              emphasis: {
                areaColor: '#3dbb7a'
              }
            },
            label: { // 高亮的时候不显示标签
              emphasis: {
                show: false
              }
            }
          }]
          },
          tooltip : {
               trigger: 'item',
               formatter: '{b}<br/>{c}',
               backgroundColor:'#143652',
               padding:10,
               borderColor:'#028bd0',
               borderWidth:1
           },
          series: series, // 将之前处理的数据放到这里
          textStyle: {
            fontSize: 12
          }
      });
    }
  }
}
</script>
<style scoped>
@import 'nationalHBSSJK.css';
</style>
