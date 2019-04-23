
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
               placeholder="开始时间"  :picker-options="pickerOptions0" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endtime" format="yyyy-MM-dd"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">出发地/目的地：</span>
                <el-select v-model="type" filterable clearable placeholder="请选择"  size="small" class="input-input">
                  <el-option value="1" label="出发地相同目的地不同">
                  </el-option>
                  <el-option value="2" label="出发地不同目的地相同">
                  </el-option>
                  <el-option value="3" label="出发地目的地均不同">
                  </el-option>
                </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">判断条件：</span>
                <el-select v-model="flag" filterable clearable  placeholder="请选择"  size="small" class="input-input">
                  <el-option value="1" label="国籍/地区+证件号码">
                  </el-option>
                  <el-option value="2" label="姓名+性别+出生日期">
                  </el-option>
                </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="CurrentPage=1;CurrentPage1=1;getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="middle">
      <!-- <el-row class="yr" style="margin-bottom:-20px;">
        <el-button type="primary" size="small" @click="download()">全部导出</el-button>
        <el-button type="warning" size="small" @click="download()">导出当前页</el-button>
      </el-row> -->
      <div class="ak-tab mb-20">
      <div class="ak-tabs">
        <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="base">
        重复值机
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="batch">
        重复订票
        </div>
      </div>

    <div class="ak-tab-pane" @mouseover="mouseHeader">
        <div v-show="page==0">
            <el-table
              :data="tableData"
              border
              style="width: 100%;"
              @sort-change="sortChange"
              class="mt-10 o-table3"
              @header-click="headerClick"
              @selection-change="handleSelectionChange">
              <el-table-column
                prop="nationality"
                label="国籍/地区" sortable>
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
                prop="fltdate"
                label="航班日期" sortable>
              </el-table-column>

              <el-table-column
                prop="fltno"
                label="航班号" sortable>
              </el-table-column>
              <el-table-column
                prop="cityfrom"
                label="出发地" sortable>
              </el-table-column>
              <el-table-column
                prop="cityto"
                label="到达地" sortable>
              </el-table-column>
              <el-table-column
                prop="port"
                label="口岸" sortable>
              </el-table-column>
              <!-- <el-table-column
                prop="average"
                label="操作">
              </el-table-column> -->
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
                :current-page.sync ="CurrentPage"
                :page-size="pageSize"
                layout="prev, pager, next"
                :total="TotalResult">
              </el-pagination>
            </div>
        </div>
        <div v-show="page==1">
                      <el-table
                        :data="tableData1"
                        border
                        style="width: 100%;"
                        class="mt-10 o-table3"
                        @sort-change="sortChange1"
                        @header-click="headerClick"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                          prop="nationality"
                          label="国籍/地区" sortable>
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
                          prop="departdate"
                          label="航班日期" sortable>
                        </el-table-column>

                        <el-table-column
                          prop="fltno"
                          label="航班号" sortable>
                        </el-table-column>

                        <el-table-column
                          prop="cityfrom"
                          label="出发地" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="cityto"
                          label="到达地" sortable>
                        </el-table-column>
                        <el-table-column
                          prop="port"
                          label="口岸" sortable>
                        </el-table-column>
                        <!-- <el-table-column
                          prop="average"
                          label="操作">
                        </el-table-column> -->
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
                          :current-page.sync ="CurrentPage1"
                          :page-size="pageSize1"
                          layout="prev, pager, next"
                          :total="TotalResult1">
                        </el-pagination>
                      </div>
        </div>
      </div>
    </div>
    </div>

  </div>
</template>
<script>
import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      CurrentPage1: 1,
      pageSize1: 10,
      TotalResult1: 0,
      pd: {begintime:'',endtime:''},
      type:"1",
      flag:"1",
      company: [],
      order:'',
      direction:0,
      order1:'',
      direction1:0,
      page:0,
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
      tableData1:[],
      multipleSelection: [],
      pickerOptions0: {
        disabledDate: (time) => {
            if (this.pd.endtime != null) {
              let startT = formatDate(new Date(time.getTime()-1),'yyyyMMddhhmmss');
              return startT > this.pd.endtime;
            }else if(this.pd.endtime == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
            return endT < this.pd.begintime;
         }
      },
          form: {},

    }
  },
  mounted() {

    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');
  //  this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated(){

    // let time = new Date();
    // let endz = new Date();
    // let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    // this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    // this.pd.endtime = formatDate(endz, 'yyyyMMdd');
    //this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  methods: {
    headerClick(column,event){
        event.target.title=column.label
    },
    base(){
    this.page=0;
    },
    batch()
    {
    this.page=1;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      // this.getList(this.CurrentPage, val, this.pd);
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
      console.log(`每页 ${val} 条`);
    },
    pageSizeChange1(val) {
      // this.getList1(this.CurrentPage1, val, this.pd);
      this.getList1(this.CurrentPage1,this.pageSize1,this.pd1,this.order1,this.direction1);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // this.getList(val, this.pageSize, this.pd);
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
      console.log(`当前页: ${val}`);
    },
    handleCurrentChange1(val) {
      // this.getList1(val, this.pageSize1, this.pd);
      this.getList1(this.CurrentPage1,this.pageSize1,this.pd1,this.order1,this.direction1);
      console.log(`当前页: ${val}`);
    },

    sortChange(column, prop, order){
      column.order=='ascending'?this.direction=1:this.direction=0;
      this.order=column.prop;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
    },
    sortChange1(column, prop, order){
      column.order=='ascending'?this.direction1=1:this.direction1=0;
      this.order1=column.prop;
      this.getList1(this.CurrentPage1,this.pageSize1,this.pd,this.order1,this.direction1);
    },
    getList(currentPage, showCount, pd,order,direction) {
      if (this.pd.begintime== null || this.pd.endtime == null) {
        this.$alert('时间范围不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      };
      if(order!=''){
      pd.order=order;
      pd.direction=direction;
       }
      console.log('order',pd.order);
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd,
      };
      var url="/manage-platform/SuspectPerson/getduppsnbycard_offdes";

      if(this.type=="1" && this.flag=="1" ){
       url="/manage-platform/SuspectPerson/getduppsnbycard_offdes";
      }else if(this.type=="2" && this.flag=="1" ){
       url="/manage-platform/SuspectPerson/getduppsnbycard_offsrc";
      }
      else if(this.type=="3" && this.flag=="1"){
       url="/manage-platform/SuspectPerson/getduppsnbycard_both";
      }
      else if(this.type=="1" && this.flag=="2"){
       url="/manage-platform/SuspectPerson/getduppsnbyname_offdes";
      }
      else if(this.type=="2" && this.flag=="2" ){
       url="/manage-platform/SuspectPerson/getduppsnbyname_offsrc";
      }
      else if(this.type=="3" && this.flag=="2" ){
       url="/manage-platform/SuspectPerson/getduppsnbyname_both";
      }
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })

      this.getList1(this.CurrentPage1,this.pageSize1,this.pd,this.order1,this.direction1);
    },
    getList1(currentPage1, showCount1, pd,order1,direction1) {
      if (this.pd.begintime== null || this.pd.endtime == null) {
        this.$alert('时间范围不能为空', '提示', {
          confirmButtonText: '确定',
        });
        return false
      };
      if(order1!=''){
        pd.order=order1;
        pd.direction=direction1;
      }
      let pp = {
        "currentPage": currentPage1,
        "showCount": showCount1,
        "cdt": pd,
      };
      var url="/manage-platform/SuspectPerson/getduppsnbycard_offdes";

      if(this.type=="1" && this.flag=="1"){
       url="/manage-platform/SuspectPerson/getduppsnpnrbycard_offdes";
      }else if(this.type=="2" && this.flag=="1"){
       url="/manage-platform/SuspectPerson/getduppsnpnrbycard_offsrc";
      }
      else if(this.type=="3" && this.flag=="1"){
       url="/manage-platform/SuspectPerson/getduppsnpnrbycard_both";
      }
      else if(this.type=="1" && this.flag=="2"){
       url="/manage-platform/SuspectPerson/getduppsnpnrbyname_offdes";
      }
      else if(this.type=="2" && this.flag=="2" ){
       url="/manage-platform/SuspectPerson/getduppsnpnrbyname_offsrc";
      }
      else if(this.type=="3" && this.flag=="2" ){
       url="/manage-platform/SuspectPerson/getduppsnpnrbyname_both";
      }
      this.$api.post(url, pp,
        r => {
          console.log(r);
          this.tableData1 = r.data.resultList;
          this.TotalResult1 = r.data.totalResult;
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.form=i;
    },
  }
}
</script>

<style scoped>
.ak-tab {}

.ak-tabs {
  display: flex;

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
