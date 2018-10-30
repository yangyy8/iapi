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
            <el-button type="primary" size="small" @click="">咨询历史</el-button>
            <el-button type="primary" size="small" @click="" style="margin-left:20px!important">查看通讯录</el-button>
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
              <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">航站：</span>
              <el-select v-model="pd.DEPT_ID" filterable clearable placeholder="请选择" size="small" class="input-input">
                <el-option></el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">咨询方式：</span>
              <el-select v-model="pd.DEPT_ID" filterable clearable placeholder="请选择" size="small" class="input-input">
                <el-option></el-option>
               </el-select>
            </el-col>
          </el-row>
          <el-row align="center" :gutter="2" type="flex" style="margin-top:10px">
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">咨询号码：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">联系方式：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
            </el-col>
          </el-row>
          <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc">
            <el-button type="success" size="small" @click="">添加至通讯录</el-button>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="warning" size="small" @click="added">咨询问题</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          prop="DEPT_QC"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="DEPT_JC"
          label="证件号码"
          >
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="证件有效期">
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="国籍/地区">
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="出入境类型">
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="航班号">
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="计划起飞时间">
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="签证号码">
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="签证种类">
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="反馈状态">
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
      <el-row align="center" :gutter="2" type="flex">
        <el-col :span="24" class="input-item">
          <span class="yy-input-text width-lef">问题详情：</span>
          <el-input type="textarea"></el-input>
        </el-col>
      </el-row>
      <el-row align="center" :gutter="2" type="flex" justify="center" style="margin-top:10px;padding-bottom:20px;border-bottom:1px dotted #ccc">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {},
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
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
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
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post('/manage-platform/deptSys/selectAll', p,
        r => {
          console.log(r);
          this.tableData = r.data.deptList.pdList;
          this.TotalResult = r.data.deptList.totalResult;
        })
    },
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
</style>
