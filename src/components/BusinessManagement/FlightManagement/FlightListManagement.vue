<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">洲：</span>
              <el-select placeholder="请选择" v-model="cdt.CONTINENTS_CODE" filterable clearable @visible-change="chau" @change="nationality(cdt.CONTINENTS_CODE)" size="small"  class="input-input">
                <el-option
                  v-for="item in chauName"
                  :key="item.code"
                  :value="item.code"
                  :label="item.code+' - '+item.name"
                ></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">国家：</span>
              <el-select placeholder="请选择" v-model="cdt.COUNTRY_CODE" filterable clearable size="small"  class="input-input" @visible-change="baseNation" @change="cityAble(cdt.COUNTRY_CODE)">
                <el-option
                  v-for="item in selection"
                  :key="item.CODE"
                  :value="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                ></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">城市：</span>
              <el-select placeholder="请选择" v-model="cdt.CITY_CODE" filterable clearable size="small"  class="input-input" @visible-change="city" :disabled="able">
                <el-option
                  v-for="item in cityName"
                  :key="item.citycode"
                  :value="item.citycode"
                  :label="item.citycode+' - '+item.cityname"
                ></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.FLT_CODE"  class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出发地：</span>
              <el-select placeholder="请选择" v-model="cdt.FLTDEPT" filterable clearable   size="small"  class="input-input">
                <el-option
                  v-for="item in startPark"
                  :key="item.code"
                  :value="item.code"
                  :label="item.code+' - '+item.name"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">目的地：</span>
              <el-select placeholder="请选择" v-model="cdt.FLTDEST" filterable clearable size="small"  class="input-input">
                <el-option
                  v-for="item in endPark"
                  :key="item.CODE"
                  :value="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出入境：</span>
              <el-select v-model="cdt.IN_OUT_FLAG" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <!-- <el-option label="G - 过境" value="G"></el-option>
                <el-option label="全部" value=""></el-option> -->
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text"><i class="t-must">*</i>航班日期：</span>
              <div class="input-input t-flex t-date">
                  <el-date-picker
                  v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                  v-model="cdt.SCHEDULEDEPARTURETIMESTR"
                  type="datetime" size="small"
                  placeholder="开始日期"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyyMMddHHmm"
                  :picker-options="pickerOptions">
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker
                   v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                   v-model="cdt.SCHEDULEARRIVETIMESTR"
                   type="datetime" size="small"
                   placeholder="结束日期"
                   format="yyyy-MM-dd HH:mm"
                   value-format="yyyyMMddHHmm"
                   :picker-options="pickerOptions1">
               </el-date-picker>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
          <el-button type="success" size="small" @click="">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={}">新增</el-button>
        <el-button type="success" size="small" @click="">批量导入</el-button>
        <el-button type="success" size="small" @click="">模板下载</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          label="序号"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="FLT_CODE"
          label="航班号">
        </el-table-column>
        <el-table-column
          prop="IN_OUT_FLAG"
          label="出入境">
        </el-table-column>
        <el-table-column
          prop="FLTDEPT"
          label="出发地">
        </el-table-column>
        <el-table-column
          prop="FLTDEST"
          label="目的地">
        </el-table-column>
        <el-table-column
          prop="SCHEDULEDEPARTURETIMESTR"
          label="航班开始日期">
        </el-table-column>
        <el-table-column
          prop="SCHEDULEARRIVETIMESTR"
          label="航班结束日期">
        </el-table-column>
        <el-table-column
          label="洲">
          <template slot-scope="scope">
            <span v-if="scope.row.DEPTAIRPORT&&scope.row.DESTAIRPORT">{{scope.row.DEPTAIRPORT.CONTINENTS_NAME+' | '+scope.row.DESTAIRPORT.CONTINENTS_NAME}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="国家">
          <template slot-scope="scope">
            <span v-if="scope.row.DEPTAIRPORT&&scope.row.DESTAIRPORT">{{scope.row.DEPTAIRPORT.COUNTRY_NAME+' | '+scope.row.DESTAIRPORT.COUNTRY_NAME}}</span>
            <span v-else></span>
          </template>
        </el-table-column>
        <el-table-column
          label="城市">
          <template slot-scope="scope">
            <span v-if="scope.row.DEPTAIRPORT&&scope.row.DESTAIRPORT">{{scope.row.DEPTAIRPORT.PROV_REGION_NAME+' | '+scope.row.DESTAIRPORT.PROV_REGION_NAME}}</span>
            <span v-else></span>

          </template>
        </el-table-column>
        <el-table-column
          label="操作" width="200">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="adds(1,scope.row)">编辑</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="deletes(scope.row)">删除</el-button>
         </template>
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
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>航班号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="form.FLT_CODE"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>航线：</span>
            <el-select placeholder="请选择" v-model="form.AIRWAY_CODE" filterable clearable @visible-change="terminal" size="small" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}">
              <el-option
              v-for="item in takeOffName"
              :key="item.AIRPORT_CODE"
              :value="item.AIRPORT_CODE"
              :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>


        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>航班开始时间：</span>
              <el-date-picker
              v-verify.change.blur ="{regs:'required',submit:'demo2'}"
              v-model="form.SCHEDULEDEPARTURETIMESTR"
              type="datetime" size="mini"
              placeholder="请选择航班开始时间"
              class="yy-input-input"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyyMMddHHmm">
            </el-date-picker>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>航班结束时间：</span>
              <el-date-picker
              v-verify.change.blur ="{regs:'required',submit:'demo2'}"
              v-model="form.SCHEDULEARRIVETIMESTR"
              type="datetime" size="mini"
              placeholder="请选择航班结束时间"
              class="yy-input-input"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyyMMddHHmm">
            </el-date-picker>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">班期：</span>
           <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.SCHEDULE_CODE" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">保 存</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  data() {
    return {
      tp: 0,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {},
      cdt:{},
      nation: [],
      company: [],
      startPark:[],
      endPark:[],
      chauName:[],
      selection:[],
      cityName:[],
      takeOffName:[],
      able:true,

      value: '',
      value1: "",
      dialogText: "新增",
      addDialogVisible: false,

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
      pickerOptions: {
        disabledDate: (time) => {
            if (this.pd.endFlightDepartdate != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.pd.endFlightDepartdate;
            }else if(this.pd.endFlightDepartdate == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            return endT < this.pd.startFlightDepartdate;
        }
      },
      form: {},
      dform: {},
    }
  },
  mounted() {
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    let flightStart = new Date(new Date().setHours(0,0,0,0));
    this.pd.startFlightDepartdate=formatDate(flightStart,'yyyyMMddhhmm');
    this.pd.endFlightDepartdate=formatDate(end,'yyyyMMddhhmm');
    this.getList(this.CurrentPage, this.pageSize, this.cdt);
  },
  activated() {
    this.getList(this.CurrentPage, this.pageSize, this.cdt);
  },
  methods: {
    queryNationality() {
      this.$api.post('/manage-platform/userSys/goAdd', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data.deptList;
          }
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.cdt);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.cdt);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/flightManage/queryListPage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
          console.log(this.tableData);
        })
    },
    terminal(){
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    chau(){//调用洲
      this.$api.post('/manage-platform/codeTable/queryContinentsCountry',{},
       r => {
         if(r.success){
           this.chauName = r.data;
         };
       })
    },
    nationality(data){//基础查询国籍与洲二级联动
      this.$set(this.cdt,'COUNTRY_CODE','');
      let arr=this.chauName;
      let that=this;
      for(var i=0;i<arr.length;i++){
        if(arr[i].code == data){
          that.selection=arr[i].countryList;
        }
      }
    },
    baseNation(){
      if(this.cdt.CONTINENTS_CODE==undefined||this.cdt.CONTINENTS_CODE==''){
        this.$api.post('/manage-platform/codeTable/queryNationality',{},
         r => {
           if(r.success){
             this.selection = r.data;
           };
         })
      }
    },
    cityAble(val){
      this.$set(this.cdt,'CITY_CODE','');
      if(val==undefined||val==''){
        this.able=true;
      }else{
        this.able=false;
      }
    },
    city(){//调用城市
      var countryCode='';
      countryCode = this.cdt.countryCode
      let p = {
        'countryCode':countryCode
      }
      this.$api.post('/manage-platform/codeTable/queryCity',p,
       r =>{
         if(r.success){
            this.cityName = r.data;
         }
       })
    },
    adds(n, i) {
      this.addDialogVisible = true;

      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        this.form=Object.assign({}, i);
        this.dialogText="编辑";
      }else {
        this.tp = 0;
        this.dialogText="新增";
      }

    },



    addItem(formName) {
      if (this.$validator.listener.demo2) {
        const result = this.$validator.verifyAll('demo2')
        if (result.indexOf(false) > -1) {
          return;
        }
      }
      var url = "/manage-platform/flightManage/changFlightManage";
      this.$api.post(url, this.form,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
          } else {
            this.$message.error('保存失败！');
          }
          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          this.getList(this.CurrentPage, this.pageSize, this.cdt);
          // this.tableData=r.Data.ResultList;
        }, e => {
          this.$message.error('失败了');
        })
    },

    deletes(i) {
      let p = {
        "FLT_CODE": i.FLT_CODE
      };
      this.$confirm('您是否确认删除本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/flightManage/deleteFlightManage', p,
          r => {
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getList(this.CurrentPage, this.pageSize, this.cdt);
            } else {
              this.$message.error(r.Message);
            }
          }, e => {
            this.$message.error('失败了');
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
  },
  filters: {
    fiftertype(val) {
      if (val == "0") {
        return "停用";
      } else {
        return "启用";
      }
    },
  }
}

function checkRate(nubmer) {　　
  var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
  　　　　
  if (!re.test(nubmer)) {　　　　
    return false;　　
  }
  return true;
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

.yy-input-text {
  width: 25% !important;
}
.width-ts{
  width: 20.3%!important;
}
</style>
