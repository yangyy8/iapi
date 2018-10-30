
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
              <span class="input-text"><font color='red'>*</font> 时间范围：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begin" format="yyyy-MM-dd"
               type="date" size="small" value-format="yyyyMMddHHmmss"
               placeholder="开始时间"  :picker-options="pickerOptions0" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.end" format="yyyy-MM-dd"
                type="date" size="small" value-format="yyyyMMddHHmmss"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航空公司名称：</span>
              <el-select v-model="pd.airlineCompanyIdEqual" filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="(item,ind) in company"
                   :key="ind"
                   :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME"
                   :value="item.AIRLINE_CODE" >
                 </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.PASSPORTNO" class="input-input"></el-input>
            </el-col>
          </el-row>
          <el-row align="center"   :gutter="2" class="yy-line">

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">行属性：</span>
              <el-select v-model="typerow" filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option label="航空公司名称" value="1" >
                 </el-option>
                 <el-option label="航班号" value="2" >
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
  <!-- <div class="mb-2">

          <el-row type="flex" class="middle">
              <el-col :span="22" class="pr-20">

              <el-row align="center"   :gutter="2">

                <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text">行属性：</span>
                  <el-select v-model="pd.airrow" filterable clearable  placeholder="请选择" size="small" class="input-input">
                     <el-option text="航空公司名称" value="航空公司名称" >
                     </el-option>
                     <el-option text="航班号" value="航班号" >
                     </el-option>
                   </el-select>
                </el-col>

                <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text">列属性：</span>
                  <el-select v-model="pd.aircol" filterable clearable  placeholder="请选择" size="small" class="input-input">
                     <el-option text="漏报人数" value="漏报人数">
                     </el-option>
                     <el-option text="多报人数" value="多报人数">
                     </el-option>
                     <el-option text="误报人数" value="误报人数">
                     </el-option>
                     <el-option text="信息不完整人数" value="信息不完整人数">
                     </el-option>
                     <el-option text="缺少订票信息人数" value="缺少订票信息人数">
                     </el-option>

                   </el-select>
                </el-col>

              </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area">
            </el-col>
          </el-row>
  </div> -->


    <div class="middle">
      <el-row class="mb-15 yr">
        <el-button type="primary" size="small" @click="">Excel导出</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">

        <el-table-column
          prop="airline_company_id"

          label="航空公司名称" v-if='showm'
          >
        </el-table-column>
        <el-table-column
          prop="fltno"
          label="航班号" v-if='showh'>
        </el-table-column>

        <el-table-column
          prop="chkcount"
          label="值机数"
          >
        </el-table-column>
        <el-table-column
          prop="bkcount"
          label="订票数"
          >
        </el-table-column>
        <el-table-column
          prop="noprecount"
          label="值机未订票数"
          >
        </el-table-column>
        <!-- <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
         </template>
        </el-table-column> -->
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
    <!-- <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"
      width="600px">
      <el-form :model="form">
        <div class="titile">类别名称 </div>
        <el-row type="flex" class="mb-15">
          <el-col :span="24" class="titlecontent">
            {{form.loggerName}}
          </el-col>
            </el-row>
          <div class="titile">线程名称</div>
            <el-row type="flex" class="mb-15">
          <el-col :span="24" class="titlecontent">
            {{form.threadName}}
          </el-col>
        </el-row>
     <div class="titile">监控消息</div>
        <el-row type="flex" class="mb-15">
          <el-col :span="24" class="titlecontent">
            {{form.formattedMessage}}
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button  @click="detailsDialogVisible = false" size="small">取消</el-button>
      </span>
    </el-dialog> -->
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
      pd: {begintime:'',endtime:''},
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
      tableData: [],
      multipleSelection: [],
      pickerOptions0: {
        disabledDate: (time) => {
            if (this.pd.endtime != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMdd');
              return startT > this.pd.endtime;
            }else if(this.pd.endtime == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMdd');
            return endT < this.pd.begintime;
        }
      },
          form: {},
          typerow:'1',
          showm:true,
          showh:true,

    }
  },
  mounted() {
    this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);

    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');

  },
  activated(){
    this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.begintime = formatDate(beginz, 'yyyyMMdd');
    this.pd.endtime = formatDate(endz, 'yyyyMMdd');

  },
  methods: {
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
    getList(currentPage, showCount, pd) {
      // this.pd.begin=formatDate(this.pd.begin,"yyyyMMddhhssmm");
      // this.pd.end=formatDate(this.pd.end,"yyyyMMddhhssmm");


      // if(dayGap(this.pd.begin,this.pd.end,0)>1){
      //   this.$alert('只能查询某一天的日期', '提示', {
      //     confirmButtonText: '确定',
      //   });
      //   return false
      // }

      let p = {
        // "currentPage": currentPage,
        // "showCount": showCount,
        // "cdt": pd

      "begintime":pd.begintime,
      "endtime":pd.endtime,
      "fltno":pd.fltno,
      "airline_company_id":pd.airline_company_id

      };
      var url="/manage-platform/forecastEva/get_pnr_fccrt_bycompanyid";
      if(this.typerow=="2"){
        url="/manage-platform/forecastEva/get_pnr_fccrt_byfltno";
        this.showm=false;
        this.showh=true;
      }else {
        this.showm=true;
        this.showh=false;
      }
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData = r.data;
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
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.form=i;
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
</style>
