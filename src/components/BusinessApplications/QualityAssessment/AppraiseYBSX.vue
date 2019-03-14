
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
               v-model="pd.fltdate" format="yyyy-MM-dd HH:mm:ss"
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
            <!-- <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">航班日期：</span>
              <el-date-picker
              v-model="pd.fltdate" format="yyyy-MM-dd" class="input-input"
              type="date" size="small" value-format="yyyyMMdd"
              placeholder="航班日期" >
            </el-date-picker>
            </el-col> -->
          </el-row>
          <!-- <el-row type="flex" class="yy-line">

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

        <el-button type="primary" size="small" @click="download(0)">统计数据导出</el-button>
        <el-button type="warning" size="small" @click="download(5)">明细导出</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        class="mt-10 o-table3"
        @header-click="headerClick"
        max-height="600"
        style="width: 100%;">


        <el-table-column
          prop="airline_company_id" sortable
          label="航空公司名称" width="200">

        </el-table-column>
        <el-table-column
          prop="fltno" sortable
          label="航班号"
          >
        </el-table-column>

        <!-- <el-table-column
          prop="flttype"
          label="航班类型" >
        </el-table-column>
        <el-table-column
          prop="nationality"
          label="国籍/地区" >
        </el-table-column>
        <el-table-column
          prop="passportno"
          label="证件号码" >
        </el-table-column> -->
        <el-table-column
          prop="noreport" sortable
          label="关闭报文未报数量" >
        </el-table-column>
        <el-table-column
          prop="ontime" sortable
          label="关闭报文准时预报数量" >
        </el-table-column>
        <el-table-column
          prop="later" sortable
          label="关闭报文晚报数量">
        </el-table-column>
        <el-table-column
          prop="msg_ontime" sortable
          label="值机报文准时预报数量" >
        </el-table-column>
        <el-table-column
          prop="msg_noreport" sortable
          label="值机报文未报数量" >
        </el-table-column>
        <el-table-column
          prop="msg_later" sortable
          label="值机报文晚报数量" >
        </el-table-column>
        <!-- <el-table-column
          prop="levelString"
          label="起飞地"
          >
        </el-table-column>
        <el-table-column
          prop="levelString"
          label="到达地"
          >
        </el-table-column>
        <el-table-column
          prop="levelString"
          label="预计出发日期"
          >
        </el-table-column>
        <el-table-column
          prop="levelString"
          label="预计抵达日期"
          >
        </el-table-column>
        <el-table-column
          prop="levelString"
          label="报文类型"
          >
        </el-table-column>
        <el-table-column
          prop="levelString"
          label="时效异常类型"
          >
        </el-table-column>
        <el-table-column
          prop="levelString"
          label="晚报时间" sortable
          >
        </el-table-column> -->
        <el-table-column
          width="70"
          label="操作">
          <template slot-scope="scope">
              <el-button  type="text"  class="a-btn"  title="详情"  icon="el-icon-tickets" @click="details(scope.row)"></el-button>
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
      :visible.sync="detailsDialogVisible">
        <div class="ak-tabs">
          <div class="ak-tab-item abehgt hand" :class="{'ak-checked':page==0}" @click="base">
            未关闭报航班
          </div>
          <div class="ak-tab-item abehgt hand" :class="{'ak-checked':page==1}" @click="base1">
            晚报关闭报航班
          </div>
          <div class="ak-tab-item abehgt hand" :class="{'ak-checked':page==2}" @click="base2">
            值机报晚报人员
          </div>
          <div class="ak-tab-item abehgt hand" :class="{'ak-checked':page==3}" @click="base3">
            无值机报晚报人员
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
                      prop="airline_company_id"
                      label="航空公司名称" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="fltno"
                      label="航班号" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="flttype"
                      label="类型" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="localdeparturetime"
                      label="起飞时间" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="localarrivetime"
                      label="降落时间" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="cityfrom"
                      label="出发地" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="cityto"
                      label="目的地" sortable
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
                          prop="airline_company_id"
                          label="航空公司名称" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="fltno"
                          label="航班号" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="flttype"
                          label="类型" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="localdeparturetime"
                          label="起飞时间" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="localarrivetime"
                          label="降落时间" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="cityfrom"
                          label="出发地" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="cityto"
                          label="目的地" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="iapi_receivetime"
                          label="关闭报文接收时间" sortable
                          >
                        </el-table-column>
                        <el-table-column
                          prop="close_threshold" sortable
                          label="阈值"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="offset"
                          label="大于阈值的偏差" sortable
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
                      prop="flttype"
                      label="类型" sortable
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
                      prop="passengertype"
                      label="旅客类型" sortable>
                    </el-table-column>
                    <el-table-column
                      prop="vid"
                      label="值机渠道" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="closetime"
                      label="关闭报文接收时间" sortable
                      >
                    </el-table-column>
                    <el-table-column
                      prop="chktime"
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
                          prop="abono"
                          label="abo号码" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="fltno" sortable
                          label="航班号"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="dptime" sortable
                          label="计划飞起时间"
                          >
                        </el-table-column>
                        <el-table-column
                          prop="artime" sortable
                          label="计划降落时间"
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
      downfltno:'',
      multipleSelection: [],
      pickerOptions0: {
        disabledDate: (time) => {
          if (this.pd.endtime != null) {
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
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
          typerow:'1',
          page:0

    }
  },
  mounted() {
    this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');
  },
  activated(){
      this.queryNationality();
      let time = new Date();
      let endz = new Date();
      let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
      this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
      this.pd.endtime = formatDate(endz, 'yyyyMMdd');
  },
  methods: {
    headerClick(column,event){
      console.log(column,event)
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
      this.getList1(this.CurrentPage1, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      this.getList1(val, this.pageSize1, this.pd);
      console.log(`当前页: ${val}`);
    },
    pageSizeChange2(val) {
      this.getList2(this.CurrentPage2, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange2(val) {
      this.getList2(val, this.pageSize2, this.pd);
      console.log(`当前页: ${val}`);
    },
    pageSizeChange3(val) {
      this.getList3(this.CurrentPage3, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange3(val) {
      this.getList3(val, this.pageSize3, this.pd);
      console.log(`当前页: ${val}`);
    },
    pageSizeChange4(val) {
      this.getList4(this.CurrentPage4, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange4(val) {
      this.getList4(val, this.pageSize4, this.pd);
      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }

      let p = {

        "begintime":pd.begintime,
        "endtime":pd.endtime,
        "fltno":pd.fltno,
        "fltdate":pd.fltdate,
        "airline_company_id":pd.airline_company_id
      };
      var url="/manage-platform/forecastEva/get_fctime_bycompanyid";

      // if(this.typerow=="2"){
      //   url="/manage-platform/forecastEva/get_fctime_byfltno";
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
          this.TotalResult = r.data.totalResult;
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
    //无关闭报航班
     getList1(currentPage, showCount, pd) {

       let p = {
         "currentPage": currentPage,
         "showCount": showCount,
         "cdt": pd
       };

       this.$api.post('/manage-platform/forecastEva/get_noreport_flt', p,
         r => {
           console.log(r);
           if (r.success) {
             this.tableData1 = r.data.resultList;
             this.TotalResult1 = r.data.totalResult;
           }
         });
     },
     //晚报关闭报航班
      getList2(currentPage, showCount, pd) {
        let p = {
          "currentPage": currentPage,
          "showCount": showCount,
          "cdt": pd
        };
        this.$api.post('/manage-platform/forecastEva/get_laterreport_flt', p,
          r => {
            console.log(r);
            if (r.success) {
              this.tableData2 = r.data.resultList;
              this.TotalResult2 = r.data.totalResult;
            }
          });
      },
      //值机报晚报人员
       getList3(currentPage, showCount, pd) {

         let p = {
           "currentPage": currentPage,
           "showCount": showCount,
           "cdt": pd
         };
         this.$api.post('/manage-platform/forecastEva/get_laterreport_person', p,
           r => {
             console.log(r);
             if (r.success) {
               this.tableData3 = r.data.resultList;
               this.TotalResult3= r.data.totalResult;
             }
           });
       },
       //无值机报晚报人员
        getList4(currentPage, showCount, pd) {

          let p = {
            "currentPage": currentPage,
            "showCount": showCount,
            "cdt": pd
          };

          this.$api.post('/manage-platform/forecastEva/get_noreport_person', p,
            r => {
              console.log(r);
              if (r.success) {
                this.tableData4 = r.data.resultList;
                this.TotalResult4 = r.data.totalResult;
              }
            });
        },
   details(i) {
     this.detailsDialogVisible = true;
     this.downfltno=i.fltno;
     this.pd0.fltno=i.fltno;
     this.pd0.begintime=this.pd.begintime;
     this.pd0.endtime=this.pd.endtime;
     console.log(i.fltno+"---------");
     this.getList1(this.CurrentPage1, this.pageSize1, this.pd0);
     this.getList2(this.CurrentPage2, this.pageSize2, this.pd0);
     this.getList3(this.CurrentPage3, this.pageSize3, this.pd0);
     this.getList4(this.CurrentPage4, this.pageSize4, this.pd0);
   },

    download(n){
      //var url="http://192.168.99.213:8080/manage-platform/forecastEva/export_fctime_bycompanyid";
      var actions=this.$api.rootUrl;
      var url=actions+"/manage-platform/forecastEva/export_fctime_bycompanyid";
    let p={
         "begintime":this.pd.begintime,
         "endtime":this.pd.endtime,
         "fltno":this.pd.fltno,
         "airline_company_id":this.pd.airline_company_id
     };
      if(n==1){
        url= actions+"/manage-platform/forecastEva/exp_noreport_flt";
      }else if(n==2){

        url=actions+"/manage-platform/forecastEva/exp_laterreport_flt";
      }
      else if(n==3){

        url=actions+"/manage-platform/forecastEva/exp_laterreport_person";
      }
      else if(n==4){

        url=actions+"/manage-platform/forecastEva/exp_noreport_person";
      }else if(n==5){

        url=actions+"/manage-platform/forecastEva/exp_fctime_all";
      }
      if(n==1 || n==2 || n==3 || n==4 || n==5){

        p={
            "begintime":this.pd.begintime,
            "endtime":this.pd.endtime,
            "fltno":this.downfltno
        };
      }


      axios({
       method: 'post',
       url: url,
       data:p,
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
       });
    },
    downloadM (data) {
        if (!data) {
            return
        }

        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', 'ybsx'+format(new Date(),'yyyyMMddhhmmss')+'.xlsx')
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
