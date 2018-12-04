
<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件   <span style="padding-left:20px;color:#FF9F9F;font-size:14px;font-weight:lighter">注：国籍/地区证号，国籍姓名性别出生日期二选一</span>
          </div>
          <el-row align="center"   :gutter="2">
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text"><font color="red">*</font> 航班号：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.fltno" class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">航班日期：</span>

               <el-date-picker
               v-model="pd.fltdate" format="yyyy-MM-dd" class="input-input"
               type="date" size="small" value-format="yyyyMMdd"
               placeholder="开始时间">
             </el-date-picker>

            </el-col>
           </el-row>
              <el-row align="center"   :gutter="2" class="yy-line">


            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                <span class="input-text"><font color="red">*</font> 国籍/地区：</span>
                <el-select v-model="pd.nationality" filterable clearable placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">证件号码：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.cardnum" class="input-input"></el-input>
             </el-col>
            </el-row>
            <el-row align="center"   :gutter="2" class="yy-line">
              <el-col  :sm="24" :md="12" :lg="11"   class="input-item">
                <span class="input-text">姓名：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.name"   class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text">性别：</span>
                  <el-select v-model="pd.gender"  class="input-input"   filterable clearable  placeholder="请选择"  size="small">
                    <el-option value="U" label="U - 未知">
                    </el-option>
                    <el-option value="M" label="M - 男">
                    </el-option>
                    <el-option value="F" label="F - 女">
                    </el-option>
                  </el-select>
                </el-col>
              <el-col  :sm="24" :md="12" :lg="11"   class="input-item">
              <span class="input-text">出生日期：</span>
              <el-date-picker
              v-model="pd.birthday"
              type="date" size="small" value-format="yyyyMMdd" class="input-input"
              placeholder="开始时间" >
            </el-date-picker>

            </el-col>
    </el-row>

        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">统计</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="middle">

      <div class="middleair">
        <div class="middlecon">

          <div class="middleimg"> </div>
            <div style="text-align:center;  float:left;  margin-top: -15px;  width:40px; color:#12A6C4;line-height:20px;">
              &nbsp; <img src="../../../assets/img/dingpiao1.png" width="23px;" v-if='dp' /><img src="../../../assets/img/dingpiao0.png" width="23px;" v-else />
              订票
            </div>
            <div style=" text-align:center;  float:left; margin-top: -35px; margin-left:230px;  width:40px; color:#12A6C4;line-height:20px;">
              值机  &nbsp;<img src="../../../assets/img/zhiji1.png" width="23px;" v-if='zj' /><img src="../../../assets/img/zhiji0.png" width="23px;"  v-else />
            </div>
            <div style="text-align:center;  float:left;  margin-top: -15px;margin-left:230px;  width:40px; color:#12A6C4;line-height:20px;">
              &nbsp;<img src="../../../assets/img/chujing1.png" width="23px;" v-if='cj' /><img src="../../../assets/img/chujing0.png" width="23px;"  v-else />
              出境

            </div>
            <div style="text-align:center; float:left; margin-top: -35px; margin-left:230px;   width:80px; color:#12A6C4;line-height:20px;">
              航班关闭
              &nbsp;<img src="../../../assets/img/hbgb1.png" width="23px;" v-if='gb' /><img src="../../../assets/img/hbgb0.png" width="23px;"  v-else />
            </div>
            <div style="text-align:center;  float:left;  margin-top: -15px;  margin-left:230px;   width:40px; color:#12A6C4;line-height:20px;">
              &nbsp;<img src="../../../assets/img/rujing1.png" width="23px;" v-if='rj'/><img src="../../../assets/img/rujing0.png" width="23px;" v-else />
              入境
            </div>
              <div style="width:300px;  line-height:25px;margin-top:45px; margin-left:-50px; font-size:14px; height:90px;">
                <span v-if='dp'>
                    订票时间：{{rst1.steptime}}<br/>
                    预定航班：{{rst1.fltno}}<br/>
                    预定航班起飞时间：{{rst1.departdate}}<br/>
                 </span>
              </div>
              <div style="width:300px; margin-top:-250px;margin-left:220px; line-height:25px; font-size:14px;height:80px;" >
                  <span v-if='zj'>
                    值机时间：{{rst2.steptime}}<br/>
                    值机渠道：{{rst2.other1}}<br/>
                    值机校验结果：{{rst2.other2}}
                 </span>
              </div>
              <div style="width:300px; margin-left:460px;  margin-top:78px;  line-height:25px; font-size:14px; height:55px;" >
                 <span v-if='cj'>
                    出境时间：{{rst3.steptime}}<br/>
                    出境口岸：{{rst3.cityfrom}}
                  </span>
              </div>
              <div style="width:300px; margin-left:750px;  margin-top:-168px;  line-height:25px; font-size:14px; height:30px;">
                <span v-if='gb'>
                  关闭时间：{{rst4.departdate}}<br/>
                </span>
              </div>
              <div style="width:300px; margin-left:1000px;  margin-top:75px;  line-height:25px; font-size:14px;height:55px;" v-if='rj'>
                <span v-if='rj'>
                  入境时间：{{rst5.steptime}}<br/>
                 入境口岸：{{rst5.cityto}}<br/>
                </span>

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
      rst1:[],
      rst2:[],
      rst3:[],
      rst4:[],
      rst5:[],
      dp:false,
      zj:false,
      cj:false,
      gb:false,
      rj:false,

    }
  },
  mounted() {
    this.queryNationality();
    // let time = new Date();
    // let endz = new Date();
    // let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    // this.pd.begin = formatDate(beginz, 'yyyyMMddHHmmss');
    // this.pd.end = formatDate(endz, 'yyyyMMddhhmmss');
  //  this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated() {
    this.queryNationality();
    // let time = new Date();
    // let endz = new Date();
    // let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    // this.pd.begin = formatDate(beginz, 'yyyyMMddhhmmss');
    // this.pd.end = formatDate(endz, 'yyyyMMddhhmmss');
    // this.getList(this.CurrentPage, this.pageSize, this.pd);
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

if(this.pd.fltno==undefined || this.pd.fltno.trim()==""){
    this.$alert('航班号不能为空！', '提示', {
      confirmButtonText: '确定',
    });
    return false
}
if(this.pd.nationality==undefined){
    this.$alert('国籍/地区不能为空！', '提示', {
      confirmButtonText: '确定',
    });
    return false
}

if(this.pd.cardnum==undefined || this.pd.cardnum.trim()==""){
  if(this.pd.name==undefined || this.pd.gender==undefined || this.pd.birthday==undefined || this.pd.name.trim()==""  || this.pd.birthday.trim()==""){
    this.$alert('证件号码或者姓名性别出生日期二选一！', '提示', {
      confirmButtonText: '确定',
    });
    return false
  }
}


      let p = {

        "fltno":pd.fltno,
        "fltdate":pd.fltdate,
        "nationality":pd.nationality,
        "cardnum":pd.cardnum,
        "name":pd.name,
        "birthday":pd.birthday

      };

      this.$api.post("/manage-platform/PersonLocation/get_person_location", p,
        r => {

          let arr=r.data;
          var len= arr.length;

        for(var i=0;i<len;i++)
        {
          if(arr[i].step=="订票")
          {
             this.dp=true;
             this.rst1=arr[i];

          }
           if(arr[i].step=="值机")
           {
             this.zj=true;
            this.rst2=arr[i];
            // console.log("==="+this.rst2.steptime+"--"+this.zj);
           }
           if(arr[i].step=="出境")
           {
             this.cj=true;
            this.rst3=arr[i];

           }
           if(arr[i].step=="登机")
           {
             this.gb=true;
            this.rst4=arr[i];
           }
           if(arr[i].step=="入境")
           {
             this.rj=true;
             this.rst5=arr[i];
           }

        }


        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);

            this.nation = r.data;

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
  background: url(../../../assets/img/line.png) repeat-x;
  width: 88%;
  height: 5px;
  margin-left: 15px;

}
</style>
