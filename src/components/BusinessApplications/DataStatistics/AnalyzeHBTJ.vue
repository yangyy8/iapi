
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
              <span class="input-text"><font color="red">*</font>  时间范围：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begintime" format="yyyy-MM-dd"
              v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
               type="date" size="small" value-format="yyyyMMdd"
               placeholder="开始时间"  :picker-options="pickerOptions0" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endtime" format="yyyy-MM-dd"
                v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.fltno" class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航空公司名称：</span>
              <el-select v-model="pd.airline_company_id" filterable clearable   placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="(item,ind) in company"
                   :key="ind"
                   :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME"
                   :value="item.AIRLINE_CODE" >
                 </el-option>
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
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">起飞机场：</span>
                <el-select placeholder="请选择" v-model="pd.portfrom" filterable clearable @visible-change="takeOff" size="small" class="input-input">
                  <el-option
                  v-for="item in takeOffName"
                  :key="item.AIRPORT_CODE"
                  :value="item.AIRPORT_CODE"
                  :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">到达机场：</span>
                <el-select placeholder="请选择" v-model="pd.portto" filterable clearable @visible-change="landing" size="small" class="input-input">
                  <el-option
                  v-for="item in landingName"
                  :key="item.AIRPORT_CODE"
                  :value="item.AIRPORT_CODE"
                  :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                  </el-option>
                </el-select>
              </el-col>
          </el-row>

          <!-- <el-row type="flex" class="yy-line">
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text">行属性：</span>
                  <el-select v-model="typerow"   placeholder="请选择" size="small" class="input-input">
                     <el-option  value="1" label="航班号" ></el-option>
                   </el-select>
                </el-col> -->
                <!-- <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text">列属性：</span>
                  <el-select v-model="typecol" filterable clearable  placeholder="请选择" size="small" class="input-input">

                     <el-option text="预报预检数量" value="预报预检数量" >
                     </el-option>
                     <el-option text="不准登机人员数量" value="不准登机人员数量" >
                     </el-option>
                     <el-option text="旅客类型构成" value="旅客类型构成" >
                     </el-option>
                     <el-option text="性别构成" value="性别构成" >
                     </el-option>
                     <el-option text="旅客国家构成" value="旅客国家构成" >
                     </el-option>
                     <el-option text="值机渠道构成" value="值机渠道构成" >
                     </el-option>
                   </el-select>
                </el-col> -->
              <!-- </el-row> -->

        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">统计</el-button>
        </el-col>
      </el-row>
    </div>


    <div class="middle">

      <div class="ak-tab mb-20">
      <div class="ak-tabs">
        <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="base">
          图表
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="batch">
          报表
        </div>
      </div>

      <div class="ak-tab-pane" @mouseover="mouseHeader">
          <div v-show="page==0" >
            <div id="myChart" class="ppie">暂无数据</div>
            <div id="myChart2" class="ppie"></div>
            <div id="myChart3" class="ppie"></div>
            <div id="myChart4" class="ppie"></div>
            <div id="myChart5" class="ppie"></div>
            <div style="clear:both;"></div>
          </div>
          <div v-show="page==1">
<!--
            <el-table
     :data="tables"
     ref="multipleTable"
     tooltip-effect="dark"
     style="width: 100%"
     @selection-change='selectArInfo'>
     <el-table-column type="selection" width="45px"></el-table-column>
     <el-table-column label="序号" width="62px" type="index">
     </el-table-column>
     <template v-for='(col) in tableData'>
       <el-table-column
         sortable
         :show-overflow-tooltip="true"
         :prop="col.dataItem"
         :label="col.dataName"
         :key="col.dataItem"
         width="124px">
       </el-table-column>
     </template>
     <el-table-column label="操作" width="80" align="center">
       <template slot-scope="scope">
         <el-button size="mini" class="del-com" @click="delTabColOne()" ><i class="iconfont icon-shanchu"></i></el-button>
       </template>
     </el-table-column>

           </el-table> -->
           <el-row class="mb-15 yr">
             <el-button type="primary" size="small" name="hbtjfx_export" @click="download()">Excel导出</el-button>
             </el-row>
           <el-table
                 :data="tableData"
                 :summary-method="getSummaries"
                 show-summary
                 border
                 max-height="600"
                 style="width: 100%;"
                 class="mt-10 o-table3"
                 @header-click="headerClick"
                 >
                 <el-table-column
                   prop="fltno"
                   label="航班号" sortable
                   width="120">
                 </el-table-column>
                 <el-table-column
                   prop="checkincount" sortable
                   label="预报预检数量">
                 </el-table-column>
                   <el-table-column label="人员类别">
                     <el-table-column
                       prop="chk_ptype_fl" sortable
                       label="普通旅客">
                     </el-table-column>
                     <el-table-column
                       prop="chk_ptype_ddu" sortable
                       label="中转旅客">
                     </el-table-column>
                    </el-table-column>
                     <el-table-column label="性别构成">
                       <el-table-column
                         prop="chk_gender_m" sortable
                         label="男">
                       </el-table-column>
                       <el-table-column
                         prop="chk_gender_f" sortable
                         label="女">
                       </el-table-column>
                  </el-table-column>
                     <el-table-column label="国家构成">
                         <el-table-column
                           prop="foreign" sortable
                           label="外国人">
                         </el-table-column>
                         <el-table-column
                           prop="inland" sortable
                           label="内地居民">
                         </el-table-column>
                         <el-table-column
                           prop="gat" sortable
                           label="港澳台">
                         </el-table-column>
                    </el-table-column>

                    <el-table-column label="值机渠道">
                     <el-table-column
                       prop="chk_s" sortable
                       label="自助">
                     </el-table-column>
                     <el-table-column
                       prop="chk_c" sortable
                       label="柜台">
                     </el-table-column>
                   </el-table-column>
                 <el-table-column label="预检结果">
                   <el-table-column
                     prop="chk_0z" sortable
                     label="允许登机">
                   </el-table-column>
                   <el-table-column
                     prop="chk_1z" sortable
                     label="禁止登机">
                   </el-table-column>
                   <el-table-column
                     prop="chk_2z" sortable
                     label="再次检查">
                   </el-table-column>
                   <el-table-column
                     prop="datacheckcount" sortable
                     label="数据错误">
                   </el-table-column>
               </el-table-column>
               <el-table-column
                 label="操作"
                 min-width="50">
                 <template slot-scope="scope">
                   <el-button type="text"  class="a-btn" title="详情" size="mini" icon="el-icon-tickets" @click="nationDetails(scope.row)"></el-button>
                </template>
               </el-table-column>
               </el-table>

          </div>
        </div>
    </div>
  </div>
  <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="600px">
    <el-button  plain class="table-btn mb-9" size="small" @click="daochu">导出</el-button>
    <el-table
      :data="detailstableData"
      border
      class="o-table3"
      @header-click="headerClick"
      style="width: 100%;">
      <el-table-column
        prop="country"
        label="国籍/地区"
        sortable>
      </el-table-column>
      <el-table-column
        prop="chkcount"
        label="值机数"
        sortable>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="detailsDialogVisible = false" size="small">返 回</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import echarts from 'echarts'
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
import $ from 'jquery'
export default {
  data() {
    return {
      detailstableData:[],
      takeOffName:[],
      landingName:[],
      fltnoChange:'',
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {begintime:'',endtime:''},
      typerow:'1',
      typecol:'',

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
      page: 1,
      sData1:[],
      sData2:[],
      sData3:[],
      sData4:[],
      sData5:[],
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
      lineChart: null,
      company:"",
      daochuFlag:0,
      // tables: [{
      //   xiaoxue: '福兰',
      //   chuzhong: '加芳',
      //   gaozhong: '蒲庙',
      //   daxue: '西安',
      //   yanjiusheng: '西安',
      //   shangban: '北京'
      // }, {
      //   xiaoxue: '南坊',
      //   chuzhong: '礼泉',
      //   gaozhong: '礼泉',
      //   daxue: '西安',
      //   yanjiusheng: '西安',
      //   shangban: '南坊'
      // }, {
      //   xiaoxue: '马山',
      //   chuzhong: '加芳',
      //   gaozhong: '蒲庙',
      //   daxue: '西安',
      //   yanjiusheng: '重庆',
      //   shangban: '北京'
      // }],
      // tableData: [{
      //   dataItem: 'xiaoxue',
      //   dataName: '小学'
      // }, {
      //   dataItem: 'chuzhong',
      //   dataName: '初中'
      // }, {
      //   dataItem: 'gaozhong',
      //   dataName: '高中'
      // }, {
      //   dataItem: 'daxue',
      //   dataName: '大学'
      // }, {
      //   dataItem: 'yanjiusheng',
      //   dataName: '研究生'
      // }, {
      //   dataItem: 'shangban',
      //   dataName: '上班'
      // }]
       tableData:[
   //{
   // fltno:'AE15',
   // checkincount:110,
   // chk_ptype_fl:20,
   // chk_ptype_ddu:250,
   // chk_gender_m:200,
   // chk_gender_f:102,
   // foreign:510,
   // inland:600,
   // gat:141,
   // chk_s:12,
   // chk_c:231,
   // chk_0z:120,
   // chk_1z:21,
   // chk_2z:10,
   // datacheckcount:5
   //    },{
   //      fltno:'AE15',
   //      checkincount:101,
   //      chk_ptype_fl:20,
   //      chk_ptype_ddu:250,
   //      chk_gender_m:200,
   //      chk_gender_f:102,
   //      foreign:510,
   //      inland:600,
   //      gat:141,
   //      chk_s:12,
   //      chk_c:231,
   //      chk_0z:120,
   //      chk_1z:21,
   //      chk_2z:10,
   //      datacheckcount:5
   //    },{
   //      fltno:'EBD32',
   //      checkincount:330,
   //      chk_ptype_fl:20,
   //      chk_ptype_ddu:250,
   //      chk_gender_m:200,
   //      chk_gender_f:102,
   //      foreign:510,
   //      inland:600,
   //      gat:141,
   //      chk_s:12,
   //      chk_c:231,
   //      chk_0z:120,
   //      chk_1z:21,
   //      chk_2z:10,
   //      datacheckcount:5
   //    }
        ],
      arr1:[],


    }
  },
  mounted() {
   this.queryNationality();
  //this.setdates(this.tableData);

  //  this.drawLine();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    time.setDate(1);
    this.pd.begintime = formatDate(time, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');
  //  this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  created(){
    let that = this;
    window.sumDetails= that.sumDetails
  },
  activated() {
    this.queryNationality();
    this.btnctlFn(this.$root.checkItem);
  //  this.drawLine();
    // let time = new Date();
    // let endz = new Date();
    // let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    // this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    // this.pd.endtime = formatDate(endz, 'yyyyMMdd');
    //this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    takeOff(){//调用起飞机场
      let p={
        "flighttype":this.pd.flighttype,
        "type":0
      }
      this.$api.post('/manage-platform/codeTable/queryAirportByPortAndFlighttype',p,
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    landing(){//调用降落机场
      let p={
        "flighttype":this.pd.flighttype,
        "type":1
      }
      this.$api.post('/manage-platform/codeTable/queryAirportByPortAndFlighttype',p,
       r =>{
         if(r.success){
           this.landingName = r.data;
         }
       })
    },
    nationDetails(i){
      this.detailsDialogVisible = true;
      this.daochuFlag=0;
      this.fltnoChange = i.fltno;
      let p={
        "begintime":this.pd.begintime,
        "endtime":this.pd.endtime,
        "fltno":i.fltno,
        "flighttype":this.pd.flighttype
      }
      this.$api.post('/manage-platform/dataStatistics/get_country_detail',p,
       r =>{
         if(r.success){
           this.detailstableData=r.data;
         }
       })
    },
    sumDetails(){
      this.detailsDialogVisible = true;
      this.daochuFlag=1;
      this.$api.post('/manage-platform/dataStatistics/get_country_detail',this.pd,
       r =>{
         if(r.success){
           this.detailstableData=r.data;
         }
       })
    },
    daochu(){
      let p={}
      if(this.daochuFlag==0){
         p={
          "begintime":this.pd.begintime,
          "endtime":this.pd.endtime,
          "fltno":this.fltnoChange,
          "flighttype":this.pd.flighttype
        }
      }else if(this.daochuFlag==1){
        p=this.pd
      }

      this.$api.post('/manage-platform/dataStatistics/exp_country_detail',p,
       r =>{
          this.downloadM(r,1);
       },e=>{},'','blob')
    },
    // 获取表格选中时的数据
   // selectArInfo (val) {
   //   this.selectArr = val
   // },
   headerClick(column,event){
  event.target.title=column.label
},
    base() {
      this.page = 0;
    },
    batch() {
      this.page = 1;
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
    setdates(arr) {
          var obj = {},
              k, arr1 = [];
          for(var i = 0, len = arr.length; i < len; i++) {
              k = arr[i].fltno;
              if(obj[k])
                  obj[k]++;
              else
                  obj[k] = 1;
          }

          //保存结果{el-'元素'，count-出现次数}
          for(var o in obj) {
          		if(obj[o]===1){
              	this.arr1.push(0)
              }else{
                for(let i=0;i<obj[o];i++){
                  if(i===0){
                    this.arr1.push(obj[o])
                  }else{
                    this.arr1.push(1)
                  }
                }
              }

          }


      },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {

      if (columnIndex === 0) {
         if ( this.arr1[rowIndex] > 1) {
           return {
             rowspan:this.arr1[rowIndex],
             colspan: 1
           };
         }else if(this.arr1[rowIndex] == 0){
           return {
             rowspan: 1,
             colspan: 1
           };
         }else{
           return {
             rowspan: 0,
             colspan: 0
           };
         }
       }

  },
  getSummaries(param) {
      console.log("合计-------------",param,columns);
       const { columns, data } = param;
       const sums = [];
       columns.forEach((column, index) => {
         if (index === 0) {
           sums[index] = '合计';
           return;
         }
         const values = data.map(item => Number(item[column.property]));
         if (!values.every(value => isNaN(value))) {
           sums[index] = values.reduce((prev, curr) => {
             const value = Number(curr);
             if (!isNaN(value)) {
               return prev + curr;
             } else {
               return prev;
             }
           }, 0);
           sums[index] += '';
         } else {
           sums[index] = '';
         }
       });

       return sums;
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
    getList(currentPage, showCount, pd) {
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }


       if (this.pd.begintime== null|| this.pd.endtime == null) {
         this.$alert('时间范围不能为空', '提示', {
           confirmButtonText: '确定',
         });
         return false
       };
      let p = {
        "begintime": pd.begintime,
        "endtime": pd.endtime,
        "fltno": pd.fltno,
        "airline_company_id":pd.airline_company_id,
        "flighttype":pd.flighttype,
        "portfrom":pd.portfrom,
        "portto":pd.portto
      };

      this.$api.post("/manage-platform/dataStatistics/get_flt", p,
        r => {

          this.tableData = r.data;
          // console.log($('.el-table__footer '))
          $('.el-table__footer .has-gutter').find("td").last().children('.cell').empty();
          $('.el-table__footer .has-gutter').find("td").last().children('.cell').append('<button type="text"  class="el-button a-btn el-button--text el-button--mini" title="详情" size="mini" onclick="sumDetails()"><i class="el-icon-tickets"></i></button>')
          this.$nextTick(()=>{
            this.btnctlFn(this.$root.checkItem);
          })
          let arr=this.tableData;
          var sum1=0,sum01=0;
          var sum2=0,sum02=0;
          var sum3=0,sum03=0;
          var sum4=0,sum04=0;
          var sum5=0,sum05=0,sum005=0;
          for(var i=0;i<arr.length;i++){
            sum1+=parseInt(arr[i].checkincount);
            sum01+=parseInt(arr[i].chk_1z);
            sum2+=parseInt(arr[i].chk_ptype_fl);
            sum02+=parseInt(arr[i].chk_ptype_ddu);
            sum3+=parseInt(arr[i].chk_gender_m);
            sum03+=parseInt(arr[i].chk_gender_f);
            sum4+=parseInt(arr[i].chk_s);
            sum04+=parseInt(arr[i].chk_c);
            sum5+=parseInt(arr[i].foreign);
            sum05+=parseInt(arr[i].inland);
            sum005+=parseInt(arr[i].gat);

          }
          this.sData1=[{value:sum1, name:'总数'},{value:sum01, name:'不准登机人员数量'}];
          this.sData2=[{value:sum2, name:'普通旅客'},{value:sum02, name:'中转旅客'}];
          this.sData3=[{value:sum3, name:'男'},{value:sum03, name:'女'}];
          this.sData4=[{value:sum4, name:'自助'},{value:sum04, name:'柜台'}];
          this.sData5=[{value:sum5, name:'外国人'},{value:sum05, name:'内地居民'},{value:sum005, name:'港澳台'}];
        //  console.log(this.sData1+"------------"+sum0+"==="+sum00);
          this.drawLine();this.drawLine2();this.drawLine3();this.drawLine4();this.drawLine5();
        })
    },

    download(){
      this.$api.post('/manage-platform/dataStatistics/export_flt',this.pd,
       r =>{
         this.downloadM(r)
       },e=>{},'','blob')
    },
    downloadM (data,type) {
        if (!data) {
            return
        }

        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        if(type==1){
          link.setAttribute('download', '航空专题分析，国籍地区分布.xlsx')
        }else{
          link.setAttribute('download', 'hbtj'+format(new Date(),'yyyyMMddhhmmss')+'.xlsx')
        }
        document.body.appendChild(link)
        link.click()
    },

    // details(i) {
    //   this.detailsDialogVisible = true;
    //   console.log(i);
    //   this.form = i;
    // },
    drawLine() {
      this.lineChart = echarts.init(document.getElementById('myChart'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart')).resize;
        let that = this;
        this.lineChart.setOption({
          tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
          series: [
                {
                  name:'总数、不准登机人员数量',
                  type:'pie',
                  radius: ['30%', '50%'],
                  center: ['50%', '50%'],   //调整位置
                  data:this.sData1
                 }
                ]
          });
    },

    drawLine2() {
      this.lineChart = echarts.init(document.getElementById('myChart2'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart2')).resize;
        let that = this;
        this.lineChart.setOption({
          tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
          series: [
                {
                  name:'人员类别',
                  type:'pie',
                  radius: ['30%', '50%'],
                  center: ['50%', '50%'],   //调整位置
                  data:this.sData2
                 }
                ]
          });
    },
    drawLine3() {
      this.lineChart = echarts.init(document.getElementById('myChart3'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart3')).resize;
        let that = this;
        this.lineChart.setOption({
          tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
          series: [
                {
                  name:'性别构成',
                  type:'pie',
                  radius: ['30%', '50%'],
                  center: ['50%', '50%'],   //调整位置
                  data:this.sData3
                 }
                ]
          });
    },

    drawLine4() {
      this.lineChart = echarts.init(document.getElementById('myChart4'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart4')).resize;
        let that = this;
        this.lineChart.setOption({
          tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
          series: [
                {
                  name:'值机渠道',
                  type:'pie',
                  radius: ['30%', '50%'],
                  center: ['50%', '50%'],   //调整位置
                  data:this.sData4
                 }
                ]
          });
    },
    drawLine5() {
      this.lineChart = echarts.init(document.getElementById('myChart5'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart5')).resize;
        let that = this;
        this.lineChart.setOption({
          tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
          series: [
                {
                  name:'国家构成',
                  type:'pie',
                  radius: ['30%', '50%'],
                  center: ['50%', '50%'],   //调整位置
                  data:this.sData5
                 }
                ]
          });
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
.ppie{width:420px; height:300px; float:left; }


</style>
<style>
.ak-tab-pane .el-table thead.is-group th {
    background: #7A7A7D;
}
</style>
<style>
.el-table th > .cell {
  padding-right: 15px!important;
}
</style>
