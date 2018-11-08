<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="24" class="br pr-20">
          <span class="title-green">
            咨询处理
          </span>&nbsp;|&nbsp;
          <span>事件编号：1111111111111</span>
          <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc">
            <el-button type="primary" size="small" @click="$router.push({name:'ConsultingHistory'})">咨询历史</el-button>
            <el-button type="primary" size="small" @click="$router.push({name:'ConsultationCKTXL'})" style="margin-left:20px!important">查看通讯录</el-button>
          </el-row>
        </el-col>
      </el-row>

      <el-row type="flex" class="middle" style="padding-top:0px!important">
        <el-col :span="24" class="br pr-20">
          <span class="title-green">
            咨询来源
          </span>&nbsp;|&nbsp;
          <span>时间：2018-05-20</span>
          <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px">
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">咨询人：</span>
              <el-select v-model="entity.CONSULTFROM" filterable clearable placeholder="请选择" size="small" class="input-input">
                <el-option label="航空公司" value="0"></el-option>
                <el-option label="乘客" value="1"></el-option>
                <el-option label="其他" value="2"></el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">航站：</span>
              <el-select v-model="entity.STATIONFROM" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="terminal">
                <el-option
                v-for="item in takeOffName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.NAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">固定电话：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.TELEPHONE"  class="input-input"></el-input>
            </el-col>

          </el-row>
          <el-row align="center" :gutter="2" type="flex" style="margin-top:10px">
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">电话：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.CELLPHONE"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">传真：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.FAX"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">邮箱：</span>
              <el-input placeholder="请输入内容" size="small" v-model="entity.EMAIL"  class="input-input"></el-input>
            </el-col>
          </el-row>
          <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc">
            <el-button type="success" size="small" @click="addToBook">添加至通讯录</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row type="flex" class="middle" style="padding-top:0px!important">
        <el-col :span="22" class="br pr-20">
          <span class="title-green">
            咨询问题
          </span>&nbsp;|&nbsp;
          <div style="display:inline-block" class="problem-type">
            <span>问题类型</span>
            <el-radio-group v-model="entity.CONSULTTYPE">
              <el-radio :label="0">旅客校验</el-radio>
              <el-radio :label="1">业务咨询</el-radio>
              <el-radio :label="2">其他</el-radio>
            </el-radio-group>
          </div>

          <el-row align="center" :gutter="2" style="margin-top:10px" v-show="entity.CONSULTTYPE==0">
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">证件号码：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.PASSPORTNO"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">国籍/地区：</span>
              <el-select v-model="pd.NATIONALITY" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="baseNation">
                <el-option

                  v-for="item in selection"
                  :key="item.CODE"
                  :value="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                ></el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.FLTNO"  class="input-input" v-verify.input.blur="{regs:'required',submit:'timeDemo'}"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">航班日期：</span>
              <el-date-picker
                v-model="pd.DEPARTDATE"
                type="datetime" size="small"
                placeholder="航班日期"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyyMMddHHmm">
            </el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:35px;">
          <el-button type="success" class="mb-15" size="small"  @click="getList(CurrentPage,pageSize,pd);">查询</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        v-show="entity.CONSULTTYPE==0">
        <el-table-column
          prop="INTG_CHNNAME"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="PASSPORTNO"
          label="证件号码"
          >
        </el-table-column>
        <el-table-column
          prop="PASSPORTEXPIREDATE"
          label="证件有效期">
        </el-table-column>
        <el-table-column
          prop="NATIONALITY"
          label="国籍/地区">
        </el-table-column>
        <el-table-column
          prop="GENDER"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="DATEOFBIRTH"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="FLIGHTTYPE"
          label="出入境类型">
        </el-table-column>
        <el-table-column
          prop="FLTNO"
          label="航班号">
        </el-table-column>
        <el-table-column
          prop="DEPARTDATE"
          label="计划起飞时间"
          width="140">
        </el-table-column>
        <el-table-column
          prop="VISANO"
          label="签证号码">
        </el-table-column>
        <el-table-column
          prop="VISATYPE"
          label="签证种类">
        </el-table-column>
        <el-table-column
          prop="LASTCHECKRESULT"
          label="反馈状态">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          fixed="right">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="entryDetails(scope.row)">录入</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="$router.push({name:'ConsultationZXHG'})">回复</el-button>
         </template>
        </el-table-column>
      </el-table>
      <div class="middle-foot" v-show="entity.CONSULTTYPE==0">
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
          :total="TotalResult"
          v-show="entity.CONSULTTYPE==0">
        </el-pagination>
      </div>
      <el-row align="center" :gutter="2" type="flex" v-show="entity.CONSULTTYPE==1||entity.CONSULTTYPE==2">
        <el-col :span="24" class="input-item">
          <span class="yy-input-text width-lef">问题详情：</span>
          <el-input type="textarea"></el-input>
        </el-col>
      </el-row>
      <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc" v-show="entity.CONSULTTYPE==1||entity.CONSULTTYPE==2">
        <el-button type="primary" size="small" @click="">回复</el-button>
        <el-button type="primary" size="small" @click="" style="margin-left:20px!important">清空</el-button>
      </el-row>
    </div>

    <el-dialog title="新增"  :visible.sync="addedDialogVisible" width="400px;">
      <el-form :model="dform" ref="detailsForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">监控类型：</span>
          <span class="yy-input-input detailinput">   {{dform.PARENT_JC }}</span>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">报警阈值：</span>
            <span class="yy-input-input detailinput"> {{dform.DEPT_QC }}</span>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">阈值单位：</span>
            <span class="yy-input-input detailinput"> {{dform.DEPT_JC }}</span>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addedDialogVisible = false" size="small" type="warning">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="录入详情"  :visible.sync="detailsDialogVisible" width="400px;">
      <el-form :model="dform" ref="detailsForm">
        <el-row :gutter="2">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text tt-width">问题详情：</span>
            <el-input type="textarea" class="height80"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="detailsDialogVisible = false">保存</el-button>
        <el-button type="primary" size="small" @click="" style="margin-left:20px!important">清空</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,

      entity:{
        CONSULTTYPE:0
      },
      takeOffName:[],
      pd: {},
      selection:[],

      nation: [],
      company: [],
      value: '',
      value1: "",
      addedDialogVisible:false,
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
      form: {},
      dform: {},
    }
  },
  mounted() {
    this.baseNation();
  },
  activated() {

  },
  methods: {
     added(){
       this.addedDialogVisible = true;
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
    getList(currentPage, showCount, pd) {
      const result = this.$validator.verifyAll('timeDemo')
       if (result.indexOf(false) > -1) {
         return
       }
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post('/manage-platform/consult/queryConsultIapiInfo', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    terminal(){//航站
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    addToBook(){//添加至通讯录
      this.$api.post('/manage-platform/consult/saveConsultAddress',this.entity,
        r => {
          console.log(r);
          if(r.success){
            this.$message({
              message: '恭喜你，添加成功',
              type: 'success'
            });
          }
        })
    },
    baseNation(){//国籍
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.selection = r.data;
         };
       })
    },
    entryDetails(row){//录入详情
      console.log(row);
      // this.detailsDialogVisible = true
    }
  },

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
.width-lef{
  width: 5%!important;
}
.tt-width{
  width: 15%!important;
}
.height80{
  height: 80px;
}
</style>
<style media="screen">
  .problem-type .el-radio{
    margin-left: 30px!important;
  }
</style>
