
<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text"><font class="yy-color">*</font> 时间范围：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begintime" format="yyyy-MM-dd"
               type="date" size="small" value-format="yyyyMMdd"
               v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
               placeholder="开始时间"  :picker-options="pickerOptions0" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endtime" format="yyyy-MM-dd"
                type="date" size="small" value-format="yyyyMMdd"
                v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航空公司名称：</span>
              <el-select v-model="pd.airline_company_id" filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="(item,ind) in company"
                   :key="ind"
                   :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME"
                   :value="item.AIRLINE_CODE" >
                 </el-option>
               </el-select>
            </el-col>
            <!-- <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">航班日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begin" format="yyyy-MM-dd HH:mm:ss"
               type="datetime" size="small" value-format="yyyyMMddHHmmss"
               placeholder="开始时间"  :picker-options="pickerOptions" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.end" format="yyyy-MM-dd HH:mm:ss"
                type="datetime" size="small" value-format="yyyyMMddHHmmss"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col> -->
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.fltno" class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">口岸：</span>
              <el-select  placeholder="请选择"  size="mini"  class="input-input" v-model="pd.port" filterable clearable @visible-change="portMethod">
                <el-option
                v-for="item in portName"
                :key="item.KADM"
                :value="item.KADM"
                :label="item.KADM+' - '+item.KAMC"
                ></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.flighttype"  filterable clearable  class="input-input"  placeholder="请选择"  size="small">
                  <el-option value="I" label="I - 入境">
                  </el-option>
                  <el-option value="O" label="O - 出境">
                  </el-option>
                  <!-- <el-option value="A" label="A - 入出境">
                  </el-option> -->
                </el-select>
              </el-col>
            <!-- <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">航班日期：</span>
              <el-date-picker
              v-model="pd.fltdate" format="yyyy-MM-dd" class="input-input"
              type="date" size="small" value-format="yyyyMMdd"
              placeholder="航班日期" >
            </el-date-picker>
            </el-col> -->
          </el-row>

          <!-- <el-row type="flex"  class="yy-line">

                <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text">行属性：</span>
                  <el-select v-model="typerow" filterable clearable  placeholder="请选择" size="small" class="input-input">
                      <el-option value="1" label="航空公司名称" >
                     </el-option>
                     <el-option  value="2" label="航班号">
                     </el-option>
                   </el-select>
                </el-col>



              </el-row> -->



        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>


    <div class="middle" @mouseover="mouseHeader">
      <el-row class="mb-15 yr">

        <el-button type="primary" size="small" name="xxzqxpj_data_export" @click="download(0)">统计数据导出</el-button>
        <el-button type="warning" size="small" name="xxzqxpj_detail_export" @click="download(5)">明细导出</el-button>
        </el-row>
      <el-table
        :data="tableData"
        class="mt-10 o-table3"
        @header-click="headerClick"
        border
        max-height="600"
        style="width: 100%;">
        <el-table-column
          prop="airline_company_id" sortable
          label="航空公司名称" width="200">
        </el-table-column>
        <el-table-column
          prop="fltno"
          label="航班号" sortable
          >
        </el-table-column>
        <el-table-column
          prop="ee_noboarding"
          label="有出入境记录无登机信息" sortable>
        </el-table-column>
        <el-table-column
          prop="brd_noee"
          label="有登机信息无出入境记录" sortable>
        </el-table-column>
        <el-table-column
          prop="error"
          label="国籍证号比对，航班号不一致" sortable
          >
        </el-table-column>
        <el-table-column
          prop="incomplete"
          label="信息不完整人数" sortable
          >
        </el-table-column>
        <el-table-column
          prop="chk_nopnr"
          label="缺少订票信息人数" sortable
          >
        </el-table-column>
        <el-table-column
          width="80"
          label="操作">
          <template slot-scope="scope">
              <el-button class="a-btn"  type="text" title="详情" icon="el-icon-tickets" name="xxzqxpj_detail" @click="details(scope.row)"></el-button>
         </template>
        </el-table-column>
      </el-table>
      <!-- <div class="middle-foot">
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
      </div> -->
    </div>
    <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"   width="60%">

        <div class="ak-tabs">
          <div class="ak-tab-item abehgt hand" :class="{'ak-checked':page==0}" @click="base">
            <!-- 漏报人员 -->
            有出入境记录无登机信息
          </div>
          <div class="ak-tab-item abehgt hand" :class="{'ak-checked':page==1}" @click="base1">
            <!-- 多报人员 -->
            有登机信息无出入境记录
          </div>
          <div class="ak-tab-item abehgt hand" :class="{'ak-checked':page==2}" @click="base2">
            <!-- 误报人员 -->
            国籍证号比对，航班号不一致
          </div>
          <div class="ak-tab-item abehgt hand" :class="{'ak-checked':page==3}" @click="base3">
            信息不完整人员
          </div>
          <div class="ak-tab-item abehgt hand" :class="{'ak-checked':page==4}" @click="base4">
            值机未订票人员
          </div>
        </div>
        <div class="ak-tab-pane" >
            <div v-show="page==0">
              <el-row class="mb-15 yr">
                <el-button type="primary" size="small" @click="download(1)">Excel导出</el-button>
                </el-row>
                  <el-table
                    :data="tableData1"
                    border
                    style="width: 100%;"
                    class="mt-10 o-table3"
                    @header-click="headerClick">
                    <el-table-column
                      prop="passportissuecountry"
                      label="国籍" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="passportno"
                      label="证号" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="name" sortable
                      label="姓名" >
                    </el-table-column>
                    <el-table-column
                      prop="gender"
                      label="性别" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="dateofbirth"
                      label="出生日期" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="eetime" sortable
                      label="出入境时间"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="fltno" sortable
                      label="航班号"
                      >
                    </el-table-column>
                  </el-table>
                  <div class="middle-foot">
                    <div class="page-msg">
                      <div class="">
                        共{{Math.ceil(TotalResult1/pageSize1)}}页
                      </div>
                      <div class="">
                        每页
                        <el-select v-model="pageSize1" @change="pageSizeChange1(pageSize1)" placeholder="10" size="mini" class="page-select">
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
                        共{{TotalResult1}}条
                      </div>
                    </div>
                    <el-pagination
                      background
                      @current-change="handleCurrentChange1"
                      :page-size="pageSize1"
                      layout="prev, pager, next"
                      :total="TotalResult1">
                    </el-pagination>
                  </div>
            </div>

            <div v-show="page==1">
              <el-row class="mb-15 yr">
                <el-button type="primary" size="small" @click="download(2)">Excel导出</el-button>
                </el-row>
                      <el-table
                        :data="tableData2"
                        border
                        style="width: 100%;"
                        class="mt-10 o-table3"
                        @header-click="headerClick">
                        <el-table-column
                          prop="passportissuecountry"
                          label="国籍" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="passportno"
                          label="证号" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="fltno"
                          label="航班号" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="fltdate"
                          label="航班日期" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="flttype"
                          label="类型" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="gender"
                          label="性别" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="dateofbirth"
                          label="出生日期" sortable
                          >
                        </el-table-column>
                      </el-table>
                      <div class="middle-foot">
                        <div class="page-msg">
                          <div class="">
                            共{{Math.ceil(TotalResult2/pageSize2)}}页
                          </div>
                          <div class="">
                            每页
                            <el-select v-model="pageSize2" @change="pageSizeChange2(pageSize2)" placeholder="10" size="mini" class="page-select">
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
                            共{{TotalResult2}}条
                          </div>
                        </div>
                        <el-pagination
                          background
                          @current-change="handleCurrentChange2"
                          :page-size="pageSize2"
                          layout="prev, pager, next"
                          :total="TotalResult2">
                        </el-pagination>
                      </div>
            </div>

            <div v-show="page==2">
              <el-row class="mb-15 yr">
                <el-button type="primary" size="small" @click="download(3)">Excel导出</el-button>
                </el-row>
                  <el-table
                    :data="tableData3"
                    border
                    style="width: 100%;"
                    class="mt-10 o-table3"
                    @header-click="headerClick">
                    <el-table-column
                      prop="fltno"
                      label="航班号" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="fltno_chk"
                      label="值机航班号" sortable
                      >
                    </el-table-column>

                    <el-table-column
                      prop="fltdate_chk"
                      label="航班日期" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="passportissuecountry"
                      label="国籍" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="passportno"
                      label="证号" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="姓名" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="gender"
                      label="性别" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="dateofbirth"
                      label="出生日期" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="name_chk"
                      label="值机姓名" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="gender_chk"
                      label="值机性别" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="birthday_chk"
                      label="值机出生日期" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="crjwybs"
                      label="出入境记录标识" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="passenger_recordnum"
                      label="值机人员标识" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="crrqsj"
                      label="出入境时间" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="iapi_receivetime"
                      label="值机时间" sortable
                      >
                    </el-table-column>
                  </el-table>
                  <div class="middle-foot">
                    <div class="page-msg">
                      <div class="">
                        共{{Math.ceil(TotalResult3/pageSize3)}}页
                      </div>
                      <div class="">
                        每页
                        <el-select v-model="pageSize3" @change="pageSizeChange3(pageSize3)" placeholder="10" size="mini" class="page-select">
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
                        共{{TotalResult3}}条
                      </div>
                    </div>
                    <el-pagination
                      background
                      @current-change="handleCurrentChange3"
                      :page-size="pageSize3"
                      layout="prev, pager, next"
                      :total="TotalResult3">
                    </el-pagination>
                  </div>
            </div>

            <div v-show="page==3">
              <el-row class="mb-15 yr">
                <el-button type="primary" size="small" @click="download(4)">Excel导出</el-button>
                </el-row>
                      <el-table
                        :data="tableData4"
                        border
                        style="width: 100%;"
                        class="mt-10 o-table3"
                        @header-click="headerClick">
                        <el-table-column
                          prop="fltno"
                          label="航班号" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="fltdate"
                          label="航班日期" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="passportissuecountry"
                          label="国籍" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="passportno"
                          label="证号" sortable
                          >
                        </el-table-column>

                        <el-table-column
                          prop="abono"
                          label="abo号码" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="gender"
                          label="性别" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="dateofbirth"
                          label="出生日期" sortable
                          >
                        </el-table-column>
                      </el-table>
                      <div class="middle-foot">
                        <div class="page-msg">
                          <div class="">
                            共{{Math.ceil(TotalResult4/pageSize4)}}页
                          </div>
                          <div class="">
                            每页
                            <el-select v-model="pageSize4" @change="pageSizeChange4(pageSize4)" placeholder="10" size="mini" class="page-select">
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
                            共{{TotalResult4}}条
                          </div>
                        </div>
                        <el-pagination
                          background
                          @current-change="handleCurrentChange4"
                          :page-size="pageSize4"
                          layout="prev, pager, next"
                          :total="TotalResult4">
                        </el-pagination>
                      </div>
            </div>

            <div v-show="page==4">
              <el-row class="mb-15 yr">
                <el-button type="primary" size="small" @click="download(6)">Excel导出</el-button>
                </el-row>
                      <el-table
                        :data="tableData5"
                        border
                        style="width: 100%;"
                        class="mt-10 o-table3"
                        @header-click="headerClick">
                        <el-table-column
                          prop="fltno"
                          label="航班号" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="fltdate"
                          label="航班日期" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="passportissuecountry"
                          label="国籍" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="passportno"
                          label="证号" sortable
                          >
                        </el-table-column>

                        <el-table-column
                          prop="flttype"
                          label="类型" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="name"
                          label="姓名" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="gender"
                          label="性别" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="dateofbirth"
                          label="出生日期" sortable
                          >
                        </el-table-column>
                      </el-table>
                      <div class="middle-foot">
                        <div class="page-msg">
                          <div class="">
                            共{{Math.ceil(TotalResult5/pageSize5)}}页
                          </div>
                          <div class="">
                            每页
                            <el-select v-model="pageSize5" @change="pageSizeChange5(pageSize5)" placeholder="10" size="mini" class="page-select">
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
                            共{{TotalResult5}}条
                          </div>
                        </div>
                        <el-pagination
                          background
                          @current-change="handleCurrentChange5"
                          :page-size="pageSize5"
                          layout="prev, pager, next"
                          :total="TotalResult5">
                        </el-pagination>
                      </div>
            </div>
        </div>


    </el-dialog>
  </div>
</template>
<script>

import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'

export default {
  data() {
    return {
      portName:[],
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      CurrentPage1: 1,
      pageSize1: 10,
      TotalResult1: 0,
      CurrentPage2: 1,
      pageSize2: 10,
      TotalResult2: 0,
      CurrentPage3: 1,
      pageSize3: 10,
      TotalResult3: 0,
      CurrentPage4: 1,
      pageSize4: 10,
      TotalResult4: 0,
      CurrentPage5: 1,
      pageSize5: 10,
      TotalResult5: 0,
      pd: {begintime:'',endtime:''},
      pd0:{},
      nation: [],
      company: [],
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
      showm:true,
      showh:true,
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      tableData5:[],
      multipleSelection: [],
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.pd.endtime != null) {
            let startT = formatDate(new Date(time.getTime()-1), 'yyyyMMddhhmmss');
            return startT > this.pd.endtime;
          } else if (this.pd.endtime == null) {
            return false
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
          return endT < this.pd.begintime;
        }
      },
          form: {},
          typerow:"1",
            page: 0,

    }
  },
  mounted() {
    this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(beginz, 'yyyyMMdd');
  },
  activated(){
      this.btnctlFn(this.$root.checkItem);
      this.queryNationality();
      // let time = new Date();
      // let endz = new Date();
      // let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
      // this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
      // this.pd.endtime = formatDate(endz, 'yyyyMMdd');
  },
  methods: {
    portMethod(){
      this.$api.post('/manage-platform/codeTable/queryAirportMatch1',{},
      r =>{
        if(r.success){
          this.portName = r.data
        }
      })
    },
    headerClick(column,event){
     event.target.title=column.label
   },
    base() {
      this.page = 0;
    },
    base1() {
      this.page = 1;
    },
    base2() {
      this.page = 2;
    },
    base3() {
      this.page = 3;
    },
    base4() {
      this.page = 4;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);

      console.log(`当前页: ${val}`);
    },
    pageSizeChange1(val) {
      this.getList1(this.CurrentPage1, val, this.pd0);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      this.getList1(val, this.pageSize1, this.pd0);
      console.log(`当前页: ${val}`);
    },
    pageSizeChange2(val) {
      this.getList2(this.CurrentPage2, val, this.pd0);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange2(val) {
      this.getList2(val, this.pageSize2, this.pd0);
      console.log(`当前页: ${val}`);
    },
    pageSizeChange3(val) {
      this.getList3(this.CurrentPage3, val, this.pd0);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange3(val) {
      this.getList3(val, this.pageSize3, this.pd0);
      console.log(`当前页: ${val}`);
    },
    pageSizeChange4(val) {
      this.getList4(this.CurrentPage4, val, this.pd0);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange4(val) {
      this.getList4(val, this.pageSize4, this.pd0);
      console.log(`当前页: ${val}`);
    },
    pageSizeChange5(val) {
      this.getList5(this.CurrentPage5, val, this.pd0);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange5(val) {
      this.getList5(val, this.pageSize5, this.pd0);
      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }
       let time = formatDate(new Date(), 'yyyyMMdd');
       if((this.pd.begintime>=time)||(this.pd.endtime>=time)){
         this.$alert('当前及以后的日期不可查询', '提示', {
           confirmButtonText: '确定',
         });
         return false
       }
      let p = {
        "begintime":pd.begintime,
        "endtime":pd.endtime,
        "fltno":pd.fltno,
        "fltdate":pd.fltdate,
        "airline_company_id":pd.airline_company_id,
        "port":pd.port,
        "flighttype":pd.flighttype
      };
       var url="/manage-platform/forecastEva/get_fccrt_bycompanyid";
      // if(this.typerow=="2"){
      //   url="/manage-platform/forecastEva/get_fccrt_byfltno";
      //   this.showh=true;
      //   this.showm=false;
      // }else {
      //   this.showh=false;
      //   this.showm=true;
      // }
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData = r.data;
          this.TotalResult = r.data.TotalResult;
          this.$nextTick(()=>{
            this.btnctlFn(this.$root.checkItem);
          })
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryAircompanyList', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data;
          }
        })
    },
     //漏报人员
      getList1(currentPage, showCount, pd) {

        let p = {
          "currentPage": currentPage,
          "showCount": showCount,
          "cdt": pd
        };

        this.$api.post('/manage-platform/forecastEva/get_ee_nobrdperson', p,
          r => {
            console.log(r);
            if (r.success) {
              this.tableData1 = r.data.resultList;
              this.TotalResult1 = r.data.totalResult;
            }
          });
      },
      //多报人员
       getList2(currentPage, showCount, pd) {
         let p = {
           "currentPage": currentPage,
           "showCount": showCount,
           "cdt": pd
         };
         this.$api.post('/manage-platform/forecastEva/get_brd_noeeperson', p,
           r => {
             console.log(r);
             if (r.success) {
               this.tableData2 = r.data.resultList;
               this.TotalResult2 = r.data.totalResult;
             }
           });
       },
       //误报人员
        getList3(currentPage, showCount, pd) {

          let p = {
            "currentPage": currentPage,
            "showCount": showCount,
            "cdt": pd
          };
          this.$api.post('/manage-platform/forecastEva/get_error_person', p,
            r => {
              console.log(r);
              if (r.success) {
                this.tableData3 = r.data.resultList;
                this.TotalResult3 = r.data.totalResult;
              }
            });
        },
        //信息不完整人员
         getList4(currentPage, showCount, pd) {

           let p = {
             "currentPage": currentPage,
             "showCount": showCount,
             "cdt": pd
           };

           this.$api.post('/manage-platform/forecastEva/get_incomplete_person', p,
             r => {
               console.log(r);
               if (r.success) {
                 this.tableData4 = r.data.resultList;
                 this.TotalResult4 = r.data.totalResult;
               }
             });
         },
         //值机未订票人员
         getList5(currentPage, showCount, pd) {

           let p = {
             "currentPage": currentPage,
             "showCount": showCount,
             "cdt": pd
           };

           this.$api.post('/manage-platform/forecastEva/get_chk_nopnr_person', p,
             r => {
               console.log(r);
               if (r.success) {
                 this.tableData5 = r.data.resultList;
                 this.TotalResult5 = r.data.totalResult;
               }
             });
         },

    details(i) {
      this.detailsDialogVisible = true;
      console.log("i.fltno",i.fltno);
      this.pd0.fltno=i.fltno;
      this.pd0.begintime=this.pd.begintime;
      this.pd0.endtime=this.pd.endtime;
      this.getList1(this.CurrentPage1, this.pageSize1, this.pd0);
      this.getList2(this.CurrentPage2, this.pageSize2, this.pd0);
      this.getList3(this.CurrentPage3, this.pageSize3, this.pd0);
      this.getList4(this.CurrentPage4, this.pageSize4, this.pd0);
      this.getList5(this.CurrentPage5, this.pageSize5, this.pd0);
    },

    download(n){
    //  var url="http://192.168.99.213:8080/manage-platform/forecastEva/export_fccrt_bycompanyid";
    var actions=this.$api.rootUrl;
     var url= actions+"/manage-platform/forecastEva/export_fccrt_bycompanyid";
     if(n==1){
       url= actions+"/manage-platform/forecastEva/exp_ee_nobrdperson";
     }else if(n==2){
       url=actions+"/manage-platform/forecastEva/exp_brd_noeeperson";
     }
     else if(n==3){
       url=actions+"/manage-platform/forecastEva/exp_error_person";
     }
     else if(n==4){
       url=actions+"/manage-platform/forecastEva/exp_incomplete_person";
     }else if(n==5){
       url=actions+"/manage-platform/forecastEva/exp_fccrt_all";
     }else if(n==6){
       url=actions+"/manage-platform/forecastEva/exp_chk_nopnr_person";
     }

      axios({
       method: 'post',
       url: url,
       data: {
           "begintime":this.pd.begintime,
           "endtime":this.pd.endtime,
           "fltno":this.pd0.fltno,
       },
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
       });
    },
    downloadM (data) {
        if (!data) {
            return
        }
        console.log("---"+data);
        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'xxzq'+format(new Date(),'yyyyMMddhhmmss')+'.xlsx')
        document.body.appendChild(link)
        link.click()
    },
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
.titile{font-size: 18px; line-height: 40px;border-bottom: 1px solid #368ECD; margin-bottom: 10px;}
.titlecontent{font-size: 16px;}
.abehgt{line-height: 30px;}
</style>
