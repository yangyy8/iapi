
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
              <span class="input-text">航班号：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.PASSPORTNO" class="input-input"></el-input>
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
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">证件号码：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.PASSPORTNO" class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
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
              <span class="input-text">姓名：</span>
                <div class="input-input t-fuzzy t-flex">
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"   class="input-input"></el-input>
              &nbsp;<el-checkbox v-model="pd.ISBLURRED">模糊查询</el-checkbox>
            </div>
            </el-col>

              <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
              <span class="input-text">出生日期：</span>
                  <div class="input-input t-flex t-date">
              <el-date-picker
              v-model="pd.STARTBIRTH"
              type="date" size="small" value-format="yyyyMMddHHmmss"
              placeholder="开始时间" >
            </el-date-picker>
               <span class="septum">-</span>
            <el-date-picker
               v-model="pd.ENDBIRTH"
               type="date" size="small" value-format="yyyyMMddHHmmss"
               placeholder="结束时间"  >
            </el-date-picker>
            </div>
            </el-col>

          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="middle">

      <div class="middleair">
        <div class="middlecon">

          <div class="middleimg"> </div>
            <div style="text-align:center;  float:left;  margin-top: -15px;  width:40px; color:#12A6C4;line-height:20px;">
              &nbsp;<img src="../../../assets/img/dingpiao1.png" width="23px;" />
              订票
            </div>
            <div style=" text-align:center;  float:left; margin-top: -35px; margin-left:230px;  width:40px; color:#12A6C4;line-height:20px;">
              值机  &nbsp;<img src="../../../assets/img/zhiji0.png" width="23px;" />
            </div>
            <div style="text-align:center;  float:left;  margin-top: -15px;margin-left:230px;  width:40px; color:#12A6C4;line-height:20px;">
              &nbsp;<img src="../../../assets/img/chujing1.png" width="23px;" />
              出境
            </div>
            <div style="text-align:center; float:left; margin-top: -35px; margin-left:230px;   width:80px; color:#12A6C4;line-height:20px;">
              航班关闭
              &nbsp;<img src="../../../assets/img/hbgb1.png" width="23px;" />
            </div>
            <div style="text-align:center;  float:left;  margin-top: -15px;  margin-left:230px;   width:40px; color:#12A6C4;line-height:20px;">
              &nbsp;<img src="../../../assets/img/rujing1.png" width="23px;" />
              入境
            </div>


              <div style="width:300px;  line-height:25px;margin-top:50px; margin-left:-50px; font-size:14px;">
                订票时间：2018-09-09 11：20 ：11<br/>
                预定航班：CA123<br/>
                预定航班起飞时间：2018-09-20 9:00:00<br/>
                航空公司：XXXXXX
              </div>

              <div style="width:300px; margin-top:-300px;margin-left:250px;    line-height:25px; font-size:14px;">
                订票时间：2018-09-09 11：20 ：11<br/>
                预定航班：CA123<br/>
                预定航班起飞时间：2018-09-20 9:00:00<br/>
                航空公司：XXXXXX
              </div>
              <div style="width:300px; margin-left:460px;  margin-top:90px;  line-height:25px; font-size:14px;">
                订票时间：2018-09-09 11：20 ：11<br/>
                预定航班：CA123<br/>
                预定航班起飞时间：2018-09-20 9:00:00<br/>
                航空公司：XXXXXX
              </div>
              <div style="width:300px; margin-left:750px;  margin-top:-280px;  line-height:25px; font-size:14px;">
                订票时间：2018-09-09 11：20 ：11<br/>
                预定航班：CA123<br/>
                预定航班起飞时间：2018-09-20 9:00:00<br/>
                航空公司：XXXXXX
              </div>
              <div style="width:300px; margin-left:990px;  margin-top:80px;  line-height:25px; font-size:14px;">
                订票时间：2018-09-09 11：20 ：11<br/>
                预定航班：CA123<br/>
                预定航班起飞时间：2018-09-20 9:00:00<br/>
                航空公司：XXXXXX
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
      pd: {
        begin: '',
        end: '',
        synFlag: '0',
        rzlx: '0'
      },
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
          if (this.pd.end != null) {
            let startT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
            return startT > this.pd.end;
          } else if (this.pd.end == null) {
            return false
          }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
          let endT = formatDate(new Date(time.getTime()), 'yyyyMMddhhmmss');
          return endT < this.pd.begin;
        }
      },
      form: {},

    }
  },
  mounted() {
    this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    this.pd.begin = formatDate(beginz, 'yyyyMMddHHmmss');
    this.pd.end = formatDate(endz, 'yyyyMMddhhmmss');
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated() {
    this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    this.pd.begin = formatDate(beginz, 'yyyyMMddhhmmss');
    this.pd.end = formatDate(endz, 'yyyyMMddhhmmss');
    this.getList(this.CurrentPage, this.pageSize, this.pd);
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
      if (dayGap(this.pd.begin, this.pd.end, 0) > 1) {
        this.$alert('只能查询某一天的日期', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };

      this.$api.post("/manage-platform/log_event/queryListPageAll", p,
        r => {
          console.log(r);
          this.tableData = r.data.pd.resultList;
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
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.form = i;
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

.titile {
  font-size: 18px;
  line-height: 40px;
  border-bottom: 1px solid #368ECD;
  margin-bottom: 10px;
}

.titlecontent {
  font-size: 16px;
}

.middleair {
  background: url(../../../assets/img/air.png) no-repeat;
  height: 320px;
  margin-left: 5%;
  min-width: 1220px;
}

.middlecon {

  padding: 155px 20px;
}

.middleimg {
  background: url(../../../assets/img/lines.png) repeat-x;
  width: 88%;
  height: 5px;
  margin-left: 15px;

}
</style>
