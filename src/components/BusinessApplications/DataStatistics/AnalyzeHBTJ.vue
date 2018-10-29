
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
              <span class="input-text">时间范围：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begintime" format="yyyy-MM-dd HH:mm:ss"
               type="datetime" size="small" value-format="yyyyMMddHHmmss"
               placeholder="开始时间"  :picker-options="pickerOptions" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.endtime" format="yyyy-MM-dd HH:mm:ss"
                type="datetime" size="small" value-format="yyyyMMddHHmmss"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.fltno" class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
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
            </el-col>



          </el-row>

          <el-row type="flex" class="yy-line">
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                  <span class="input-text">行属性：</span>
                  <el-select v-model="typerow" filterable clearable  placeholder="请选择" size="small" class="input-input">

                     <el-option text="航班号" value="航班号" >
                     </el-option>
                   </el-select>
                </el-col>
                <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
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
                </el-col>
              </el-row>

        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
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

      <div class="ak-tab-pane" >
          <div v-show="page==0" >
            <div id="myChart" style="width:500px; height:500px;"></div>
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


           <el-table
                 :data="tableData"
                 :span-method="objectSpanMethod"
                 :summary-method="getSummaries"
                 show-summary
                 border
                 >
                 <el-table-column
                   prop="fltno"
                   label="航班号"
                   width="120">
                 </el-table-column>
                 <el-table-column
                   prop="checkincount"
                   label="预报预检数量">
                 </el-table-column>
                   <el-table-column label="人员类别">
                     <el-table-column
                       prop="chk_ptype_fl"
                       label="普通旅客">
                     </el-table-column>
                     <el-table-column
                       prop="chk_ptype_ddu"
                       label="中转旅客">
                     </el-table-column>
                    </el-table-column>
                     <el-table-column label="性别构成">
                       <el-table-column
                         prop="chk_gender_m"
                         label="男">
                       </el-table-column>
                       <el-table-column
                         prop="chk_gender_f"
                         label="女">
                       </el-table-column>
                  </el-table-column>
                     <el-table-column label="国籍构成">
                         <el-table-column
                           prop="foreign"
                           label="外国人">
                         </el-table-column>
                         <el-table-column
                           prop="inland"
                           label="内地居民">
                         </el-table-column>
                         <el-table-column
                           prop="inland"
                           label="港澳台">
                         </el-table-column>
                    </el-table-column>

                    <el-table-column label="值机渠道">
                     <el-table-column
                       prop="chk_s"
                       label="自助">
                     </el-table-column>
                     <el-table-column
                       prop="chk_c"
                       label="柜台">
                     </el-table-column>
                   </el-table-column>
                 <el-table-column label="预检结果">
                   <el-table-column
                     prop="chk_0z"
                     label="允许登机">
                   </el-table-column>
                   <el-table-column
                     prop="chk_1z"
                     label="禁止登机">
                   </el-table-column>
                   <el-table-column
                     prop="chk_2z"
                     label="再次检查">
                   </el-table-column>
                   <el-table-column
                     prop="datacheckcount"
                     label="数据错误">
                   </el-table-column>
               </el-table-column>
               </el-table>

          </div>
        </div>
    </div>
  </div>
  </div>
</template>
<script>
import echarts from 'echarts'
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
      pd: {

      },
      typerow:'',
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
      page: 0,
sData1:[{value:535, name:'总数'},{value:310, name:'不准登机人员数量'}],
      multipleSelection: [],
      // pickerOptions0: {
      //   disabledDate: (time) => {
      //     if (this.pd.end != null) {
      //       let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
      //       return startT > this.pd.end;
      //     } else if (this.pd.end == null) {
      //       return false
      //     }
      //   }
      // },
      // pickerOptions1: {
      //   disabledDate: (time) => {
      //     let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
      //     return endT < this.pd.begin;
      //   }
      // },
      form: {},
      lineChart: null,
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
      tableData:[{
   fltno:'AE15',
   checkincount:110,
   chk_ptype_fl:20,
   chk_ptype_ddu:250,
   chk_gender_m:200,
   chk_gender_f:102,
   foreign:510,
   inland:600,
   gat:141,
   chk_s:12,
   chk_c:231,
   chk_0z:120,
   chk_1z:21,
   chk_2z:10,
   datacheckcount:5
      },{
        fltno:'AE15',
        checkincount:101,
        chk_ptype_fl:20,
        chk_ptype_ddu:250,
        chk_gender_m:200,
        chk_gender_f:102,
        foreign:510,
        inland:600,
        gat:141,
        chk_s:12,
        chk_c:231,
        chk_0z:120,
        chk_1z:21,
        chk_2z:10,
        datacheckcount:5
      },{
        fltno:'EBD32',
        checkincount:330,
        chk_ptype_fl:20,
        chk_ptype_ddu:250,
        chk_gender_m:200,
        chk_gender_f:102,
        foreign:510,
        inland:600,
        gat:141,
        chk_s:12,
        chk_c:231,
        chk_0z:120,
        chk_1z:21,
        chk_2z:10,
        datacheckcount:5
      }],
      arr1:[],


    }
  },
  mounted() {
  //  this.queryNationality();
this.setdates(this.tableData);

    // this.drawLine();
    // let time = new Date();
    // let endz = new Date();
    // let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    // this.pd.begin = formatDate(beginz, 'yyyyMMddHHmmss');
    // this.pd.end = formatDate(endz, 'yyyyMMddhhmmss');
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated() {
    //this.queryNationality();
      this.drawLine();
    // let time = new Date();
    // let endz = new Date();
    // let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    // this.pd.begin = formatDate(beginz, 'yyyyMMddhhmmss');
    // this.pd.end = formatDate(endz, 'yyyyMMddhhmmss');
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    // 获取表格选中时的数据
   // selectArInfo (val) {
   //   this.selectArr = val
   // },
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

          console.log("======"+this.arr1+"+==="+arr.length);
      },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log("1-------------"+this.arr1[rowIndex]+"--"+rowIndex);
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
    // if (columnIndex === 0) {
    //   if (rowIndex % 2 === 0) {
    //     return {
    //       rowspan: 2,
    //       colspan: 1
    //     };
    //   } else {
    //     return {
    //       rowspan: 0,
    //       colspan: 0
    //     };
    //   }
    // }
  },
  getSummaries(param) {
      console.log("合计-------------");
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
        console.log("合计-------------"+sums);
       return sums;
     },

    getList(currentPage, showCount, pd) {
      // this.pd.begin=formatDate(this.pd.begin,"yyyyMMddhhssmm");
      // this.pd.end=formatDate(this.pd.end,"yyyyMMddhhssmm");
      // if (dayGap(this.pd.begin, this.pd.end, 0) > 1) {
      //   this.$alert('只能查询某一天的日期', '提示', {
      //     confirmButtonText: '确定',
      //   });
      //   return false
      // }

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };

      this.$api.post("/manage-platform/dataStatistics/get_flt", p,
        r => {
          console.log("2-----"+r);
          //this.tableData = r.data;
          //this.TotalResult = r.data.totalResult;
          this.sData1="[{value:535, name:'总数'},{value:310, name:'不准登机人员数量'}]";
          console.log(this.sData1+"------------");
          this.drawLine();
        })
    },
    // queryNationality() {
    //   this.$api.post('/manage-platform/codeTable/queryNationality', {},
    //     r => {
    //       console.log(r);
    //       if (r.success) {
    //         this.nation = r.data;
    //       }
    //     })
    // },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.form = i;
    },
    drawLine() {

      this.lineChart = echarts.init(document.getElementById('myChart'), 'light');
      window.onresize = echarts.init(document.getElementById('myChart')).resize;
      let that = this;
     console.log("走没走----");
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
            center: ['50%', '30%'],   //调整位置
            data:this.sData1
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


</style>
<style>
.ak-tab-pane .el-table thead.is-group th {
    background: #7A7A7D;
}
</style>
