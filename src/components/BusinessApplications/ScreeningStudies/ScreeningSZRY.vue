<template lang="html">
  <div class="rank">

    <div class="middle">
      <!-- <el-row class="yr" style="margin-bottom:-20px;">
        <el-button type="primary" size="small" @click="download()">全部导出</el-button>
        <el-button type="warning" size="small" @click="download()">导出当前页</el-button>
      </el-row> -->
      <div class="ak-tab mb-20">
      <div class="ak-tabs">
        <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="base">
          订票未值机人员
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="base1">
          值机未登机人员
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==2}" @click="base2">
          登机无出入境记录人员
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==3}" @click="base3">
          有出入境记录无登机信息
        </div>
      </div>
    <div class="ak-tab-pane" >
        <div v-show="page==0">
          <el-row type="flex" class="middle">
            <el-col :span="22" class="br pr-20">
              <div class="title-green">
                查询条件
              </div>

              <el-row align="center"   :gutter="2">
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text"> 航班号：</span>
                  <el-input placeholder="请输入内容" size="small" v-model="pd.fltno"  class="input-input"></el-input>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text"><font class="yy-color">*</font> 时间范围：</span>
                  <div class="input-input t-flex t-date">
                   <el-date-picker
                   v-model="pd.begintime" format="yyyy-MM-dd"
                   type="date" size="small" value-format="yyyyMMdd"
                   v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                   placeholder="开始时间"  :picker-options="pickerOptions1" >
                 </el-date-picker>
                   <span class="septum">-</span>
                 <el-date-picker
                    v-model="pd.endtime" format="yyyy-MM-dd"
                    type="date" size="small" value-format="yyyyMMdd"
                    v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                    placeholder="结束时间" :picker-options="pickerOptions2" >
                </el-date-picker>
              </div>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text">口岸：</span>
                  <el-select filterable clearable v-model="pd.port" size="mini"  class="input-input" placeholder="请选择">
                        <el-option
                          v-for="item in pport"
                          :key="item.AIRPORT_CODE"
                          :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                          :value="item.AIRPORT_CODE">
                        </el-option>
                   </el-select>
                 </el-col>
              </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
              <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
            </el-col>
          </el-row>


            <el-table
              :data="tableData"
              border
              style="width: 100%;">
              <el-table-column
                prop="fltno"
                label="航班号" sortable>
              </el-table-column>
              <el-table-column
                prop="departdate"
                label="计划起飞时间" sortable>
              </el-table-column>
              <el-table-column
                prop="passportno"
                label="证件号码" sortable>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名" sortable>
              </el-table-column>
              <el-table-column
                prop="gender"
                label="性别" sortable>
              </el-table-column>
              <el-table-column
                prop="birthday"
                label="出生日期" sortable>
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
        <div v-show="page==1">
          <el-row type="flex" class="middle">
            <el-col :span="22" class="br pr-20">
              <div class="title-green">
                查询条件
              </div>

              <el-row align="center"   :gutter="2">
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text"> 航班号：</span>
                  <el-input placeholder="请输入内容" size="small" v-model="pd1.fltno"  class="input-input"></el-input>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text"><font class="yy-color">*</font>  时间范围：</span>
                  <div class="input-input t-flex t-date">
                   <el-date-picker
                   v-model="pd1.begintime" format="yyyy-MM-dd"
                   type="date" size="small" value-format="yyyyMMdd"
                   v-verify.input.blur="{regs:'required',submit:'timeDemo1'}"
                   placeholder="开始时间"  :picker-options="pickerOptions3" >
                 </el-date-picker>
                   <span class="septum">-</span>
                 <el-date-picker
                    v-model="pd1.endtime" format="yyyy-MM-dd"
                    type="date" size="small" value-format="yyyyMMdd"
                    v-verify.input.blur="{regs:'required',submit:'timeDemo1'}"
                    placeholder="结束时间" :picker-options="pickerOptions4" >
                </el-date-picker>
              </div>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text">口岸：</span>
                  <el-select filterable clearable v-model="pd1.port" size="mini"  class="input-input" placeholder="请选择">
                        <el-option
                          v-for="item in pport"
                          :key="item.AIRPORT_CODE"
                          :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                          :value="item.AIRPORT_CODE">
                        </el-option>
                   </el-select>
                 </el-col>
              </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
              <el-button type="success" size="small" @click="getList1(CurrentPage1,pageSize1,pd1)">查询</el-button>
            </el-col>
          </el-row>


            <el-table
              :data="tableData1"
              border
              style="width: 100%;">
              <el-table-column
                prop="fltno"
                label="航班号" sortable>
              </el-table-column>
              <el-table-column
                prop="departdate"
                label="计划起飞时间" sortable>
              </el-table-column>
              <el-table-column
                prop="passportno"
                label="证件号码" sortable>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名" sortable>
              </el-table-column>
              <el-table-column
                prop="gender"
                label="性别" sortable>
              </el-table-column>
              <el-table-column
                prop="birthday"
                label="出生日期" sortable>
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
        <div v-show="page==2">
          <el-row type="flex" class="middle">
            <el-col :span="22" class="br pr-20">
              <div class="title-green">
                查询条件
              </div>

              <el-row align="center"   :gutter="2">
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text"> 航班号：</span>
                  <el-input placeholder="请输入内容" size="small" v-model="pd2.fltno"  class="input-input"></el-input>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text"> <font class="yy-color">*</font> 时间范围：</span>
                  <div class="input-input t-flex t-date">
                   <el-date-picker
                   v-model="pd2.begintime" format="yyyy-MM-dd"
                   type="date" size="small" value-format="yyyyMMdd"
                   v-verify.input.blur="{regs:'required',submit:'timeDemo2'}"
                   placeholder="开始时间"  :picker-options="pickerOptions5" >
                 </el-date-picker>
                   <span class="septum">-</span>
                 <el-date-picker
                    v-model="pd2.endtime" format="yyyy-MM-dd"
                    type="date" size="small" value-format="yyyyMMdd"
                    v-verify.input.blur="{regs:'required',submit:'timeDemo2'}"
                    placeholder="结束时间" :picker-options="pickerOptions6" >
                </el-date-picker>
              </div>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text">口岸：</span>
                  <el-select filterable clearable v-model="pd2.port" size="mini"  class="input-input" placeholder="请选择">
                        <el-option
                          v-for="item in pport"
                          :key="item.AIRPORT_CODE"
                          :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                          :value="item.AIRPORT_CODE">
                        </el-option>
                   </el-select>
                 </el-col>
              </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
              <el-button type="success" size="small" @click="getList2(CurrentPage2,pageSize2,pd2)">查询</el-button>
            </el-col>
          </el-row>
            <el-table
              :data="tableData2"
              border
              style="width: 100%;">
              <el-table-column
                prop="fltno"
                label="航班号" sortable>
              </el-table-column>
              <el-table-column
                prop="departdate"
                label="计划起飞时间" sortable>
              </el-table-column>
              <el-table-column
                prop="passportno"
                label="证件号码" sortable>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名" sortable>
              </el-table-column>
              <el-table-column
                prop="gender"
                label="性别" sortable>
              </el-table-column>
              <el-table-column
                prop="birthday"
                label="出生日期" sortable>
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
        <div v-show="page==3">
          <el-row type="flex" class="middle">
            <el-col :span="22" class="br pr-20">
              <div class="title-green">
                查询条件
              </div>

              <el-row align="center"   :gutter="2">
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text"> 航班号：</span>
                  <el-input placeholder="请输入内容" size="small" v-model="pd3.fltno"  class="input-input"></el-input>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text"><font class="yy-color">*</font>  时间范围：</span>
                  <div class="input-input t-flex t-date">
                   <el-date-picker
                   v-model="pd3.begintime" format="yyyy-MM-dd"
                   type="date" size="small" value-format="yyyyMMdd"
                   v-verify.input.blur="{regs:'required',submit:'timeDemo3'}"
                   placeholder="开始时间"  :picker-options="pickerOptions7" >
                 </el-date-picker>
                   <span class="septum">-</span>
                 <el-date-picker
                    v-model="pd3.endtime" format="yyyy-MM-dd"
                    type="date" size="small" value-format="yyyyMMdd"
                    v-verify.input.blur="{regs:'required',submit:'timeDemo3'}"
                    placeholder="结束时间" :picker-options="pickerOptions8" >
                </el-date-picker>
              </div>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text">口岸：</span>
                  <el-select filterable clearable v-model="pd3.port" size="mini"  class="input-input" placeholder="请选择">
                        <el-option
                          v-for="item in pport"
                          :key="item.AIRPORT_CODE"
                          :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                          :value="item.AIRPORT_CODE">
                        </el-option>
                   </el-select>
                 </el-col>
              </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
              <el-button type="success" size="small" @click="getList3(CurrentPage3,pageSize3,pd3)">查询</el-button>
            </el-col>
          </el-row>


            <el-table
              :data="tableData3"
              border
              style="width: 100%;">
              <el-table-column
                prop="fltno"
                label="航班号" sortable>
              </el-table-column>
              <el-table-column
                prop="departdate"
                label="计划起飞时间" sortable>
              </el-table-column>
              <el-table-column
                prop="passportno"
                label="证件号码" sortable>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名" sortable>
              </el-table-column>
              <el-table-column
                prop="gender"
                label="性别" sortable>
              </el-table-column>
              <el-table-column
                prop="birthday"
                label="出生日期" sortable>
              </el-table-column>
              <el-table-column
                prop="eetime"
                label="入出境时间" sortable>
              </el-table-column>
              <!-- <el-table-column
                prop="port"
                label="入出境口岸">
              </el-table-column> -->
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
      </div>
    </div>
    </div>
  </div>
  </div>
</template>
<script>
import {
  formatDate
} from '@/assets/js/date.js'
import {
  dayGap
} from '@/assets/js/date.js'
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
      pd: {begintime:'',endtime:''},
      pd1: {begintime:'',endtime:''},
      pd2: {begintime:'',endtime:''},
      pd3: {begintime:'',endtime:''},
      page: 0,
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
      pport:[],
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      pickerOptions1: {
        disabledDate: (time) => {
          if (this.pd.endtime != null) {
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
            return startT > this.pd.endtime;
          } else if (this.pd.endtime == null) {
            return false
          }
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
          return endT < this.pd.begintime;
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
          if (this.pd1.endtime != null) {
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
            return startT > this.pd1.endtime;
          } else if (this.pd1.endtime == null) {
            return false
          }
        }
      },
      pickerOptions4: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
          return endT < this.pd1.begintime;
        }
      },
      pickerOptions5: {
        disabledDate: (time) => {
          if (this.pd2.endtime != null) {
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
            return startT > this.pd2.endtime;
          } else if (this.pd2.endtime == null) {
            return false
          }
        }
      },
      pickerOptions6: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
          return endT < this.pd2.begintime;
        }
      },
      pickerOptions7: {
        disabledDate: (time) => {
          if (this.pd3.endtime != null) {
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
            return startT > this.pd3.endtime;
          } else if (this.pd3.endtime == null) {
            return false
          }
        }
      },
      pickerOptions8: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
          return endT < this.pd3.begintime;
        }
      },
    }
  },
  mounted() {
  this.getHz();
    // let time = new Date();
    // let endz = new Date();
    // let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    // this.pd.begintime = formatDate(endz, 'yyyyMMdd');
    // this.pd.endtime = formatDate(endz, 'yyyyMMdd');
    // this.pd1.begintime = formatDate(beginz, 'yyyyMMdd');
    // this.pd1.endtime = formatDate(endz, 'yyyyMMdd');
    // this.pd2.begintime = formatDate(beginz, 'yyyyMMdd');
    // this.pd2.endtime = formatDate(endz, 'yyyyMMdd');
    // this.pd3.begintime = formatDate(beginz, 'yyyyMMdd');
    // this.pd3.endtime = formatDate(endz, 'yyyyMMdd');
  },
  activated() {
    this.getHz();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.begintime = formatDate(endz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');
    this.pd1.begintime = formatDate(endz, 'yyyyMMdd');
    this.pd1.endtime = formatDate(endz, 'yyyyMMdd');
    this.pd2.begintime = formatDate(endz, 'yyyyMMdd');
    this.pd2.endtime = formatDate(endz, 'yyyyMMdd');
    this.pd3.begintime = formatDate(endz, 'yyyyMMdd');
    this.pd3.endtime = formatDate(endz, 'yyyyMMdd')

  },
  methods: {

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
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);
      console.log(`当前页: ${val}`);
    },
    pageSizeChange1(val) {
      this.getList1(this.CurrentPage1, val, this.pd1);
      console.log(`1每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      this.getList1(val, this.pageSize1, this.pd1);
      console.log(`1当前页: ${val}`);
    },
    pageSizeChange2(val) {
      this.getList2(this.CurrentPage2, val, this.pd2);
      console.log(`2每页 ${val} 条`);
    },
    handleCurrentChange2(val) {
      this.getList2(val, this.pageSize2, this.pd2);
      console.log(`2当前页: ${val}`);
    },
    pageSizeChange3(val) {
      this.getList3(this.CurrentPage3, val, this.pd3);
      console.log(`3每页 ${val} 条`);
    },
    handleCurrentChange3(val) {
      this.getList3(val, this.pageSize3, this.pd3);
      console.log(`3当前页: ${val}`);
    },
    // 获取口岸航站
    getHz(){
      if(this.pport.length==0){
        this.$api.post('/manage-platform/codeTable/queryAirport',{},
        r => {

          this.pport=r.data
        })
      }
    },
    getList(currentPage, showCount, pd) {
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }
      // if (this.pd.fltno==undefined || this.pd.fltno.trim() == "") {
      //   this.$alert('航班号不能为空', '提示', {
      //     confirmButtonText: '确定',
      //   });
      //   return false
      // };
      if (this.pd.begintime.trim()== "" || this.pd.endtime.trim() == "") {
        this.$alert('时间范围不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      };
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
     var url="/manage-platform/SuspectPerson/get_bk_nochk";
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          if(r.data.totalResult!="" && r.data.totalResult!=undefined){
          this.TotalResult = r.data.totalResult;
        }
        })

    },
    getList1(currentPage1, showCount1, pd1) {
      const result = this.$validator.verifyAll('timeDemo1')
       if (result.indexOf(false) > -1) {
         return
       }
      // if (this.pd1.fltno==undefined || this.pd1.fltno.trim() == "") {
      //   this.$alert('航班号不能为空', '提示', {
      //     confirmButtonText: '确定',
      //   });
      //   return false
      // };
      if (this.pd1.begintime.trim()== "" || this.pd1.endtime.trim() == "") {
        this.$alert('时间范围不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      };
      let p = {
        "currentPage": currentPage1,
        "showCount": showCount1,
        "cdt": pd1
      };
     var url="/manage-platform/SuspectPerson/get_chk_nobrd";
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData1 = r.data.resultList;
          if(r.data.totalResult!="" && r.data.totalResult!=undefined){
          this.TotalResult1 = r.data.totalResult;
        }
        })
    },
    getList2(currentPage2, showCount2, pd2) {
      const result = this.$validator.verifyAll('timeDemo2')
       if (result.indexOf(false) > -1) {
         return
       }
      // if (this.pd2.fltno==undefined || this.pd2.fltno.trim() == "") {
      //   this.$alert('航班号不能为空', '提示', {
      //     confirmButtonText: '确定',
      //   });
      //   return false
      // };
      if (this.pd2.begintime.trim()== "" || this.pd2.endtime.trim() == "") {
        this.$alert('时间范围不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      };
      let p = {
        "currentPage": currentPage2,
        "showCount": showCount2,
        "cdt": pd2
      };
     var url="/manage-platform/SuspectPerson/get_brd_noee";
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData2 = r.data.resultList;
          if(r.data.totalResult!="" && r.data.totalResult!=undefined){
          this.TotalResult2 = r.data.totalResult;
        }
        })
    },
    getList3(currentPage3, showCount3, pd3) {
      const result = this.$validator.verifyAll('timeDemo3')
       if (result.indexOf(false) > -1) {
         return
       }
      // if (this.pd3.fltno==undefined || this.pd3.fltno.trim() == "") {
      //   this.$alert('航班号不能为空', '提示', {
      //     confirmButtonText: '确定',
      //   });
      //   return false
      // };
      if (this.pd3.begintime.trim()== "" || this.pd3.endtime.trim() == "") {
        this.$alert('时间范围不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      };
      let p = {
        "currentPage": currentPage3,
        "showCount": showCount3,
        "cdt": pd3
      };
     var url="/manage-platform/SuspectPerson/get_ee_nobrd";
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData3 = r.data.resultList;
          if(r.data.totalResult!="" && r.data.totalResult!=undefined){
          this.TotalResult3 = r.data.totalResult;
        }
        })
    },
  }
}
</script>

<style scoped>
.rank {
  background: #ffffff;
  min-height: 750px;
}
.ak-tab-item {
  background: #399bfe;
  color: #fff;
  font-size: 14px;
  margin-right: 6px;
  border-radius: 5px 5px 0 0;
  padding: 0 16px;
}

.ak-checked {
  background: #fff;
  color: #399bfe;
  border: 1px #399bfe solid;
  border-bottom: 1px #fff solid;
  margin-bottom: -1px;
}

.ak-tab-pane {
  border: 1px #399bfe solid;
  padding: 20px;
  border-radius: 0 5px 5px 5px;
}
</style>
