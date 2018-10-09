<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="24" class="br pr-20">
          <span class="title-green">
            咨询回复
          </span>
        </el-col>
      </el-row>
    </div>
    <div class="middle" style="border-bottom:2px solid #38628C">
      <span>报送信息</span>
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
      <el-row align="center" :gutter="2" type="flex">
        <el-col :span="24" class="input-item">
          <span class="yy-input-text width-lef">预检结果：</span>
          <el-input type="textarea"></el-input>
        </el-col>
      </el-row>
      <el-row align="center" :gutter="2" type="flex" justify="center">
        <el-button type="primary" size="small" @click="">回复</el-button>
        <el-button type="primary" size="small" @click="" style="margin-left:20px!important">清空</el-button>
      </el-row>
    </div>

    <div class="middle mb-2">
      <!-- <span class="title-blue">回复口径</span> -->
      <el-row type="flex" class="middle">
        <el-col :span="12" class="br pr-20">
            <el-row align="center" :gutter="2" type="flex">
              <el-col  :sm="20" :md="20" :lg="20"  class="input-item">
                <span class="input-text">回复口径：</span>
                <el-select v-model="pd.DEPT_ID" filterable clearable placeholder="请选择" size="small" class="input-input">
                  <el-option>
                  </el-option>
                 </el-select>
              </el-col>
            </el-row>
            <el-row align="center" :gutter="2" type="flex">
              <el-col  :sm="20" :md="20" :lg="20"  class="input-item">
                <span class="input-text">中文：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
              </el-col>
            </el-row>
            <el-row align="center" :gutter="2" type="flex">
              <el-col  :sm="20" :md="20" :lg="20"  class="input-item">
                <span class="input-text">英文：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12" class="down-btn-area">
            <el-row align="center" type="flex">
              <el-button type="primary" class="width-btn" @click="">咨询辅助</el-button>
            </el-row>
            <el-row align="center" type="flex" style="margin-top:10px">
              <el-button type="warning" class="width-btn" @click="">生成法律文书</el-button>
            </el-row>
          </el-col>
        </el-row>
    </div>
    <div class="middle mb-2">
      <el-row align="center" :gutter="2" type="flex" justify="left">
        <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
          <span class="input-text t-width-inp">处理结果：</span>
          <el-select v-model="pd.DEPT_ID" filterable clearable placeholder="请选择" size="small" class="input-input">
            <el-option>
            </el-option>
           </el-select>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
          <span class="input-text t-width-inp">处理人：</span>
          <el-select v-model="pd.DEPT_ID" filterable clearable placeholder="请选择" size="small" class="input-input">
            <el-option>
            </el-option>
           </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row align="center" :gutter="2" type="flex" justify="center">
        <el-button type="primary" size="small" @click="">取消</el-button>
        <el-button type="primary" size="small" @click="" style="margin-left:20px!important">暂存</el-button>
        <el-button type="primary" size="small" @click="" style="margin-left:20px!important">保存</el-button>
        <el-button type="primary" size="small" @click="" style="margin-left:20px!important">退出</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // CurrentPage: 1,
      // pageSize: 10,
      // TotalResult: 0,
      pd: {},
      nation: [],
      company: [],

      value: '',
      value1: "",

      // options: [{
      //     value: 10,
      //     label: "10"
      //   },
      //   {
      //     value: 20,
      //     label: "20"
      //   },
      //   {
      //     value: 30,
      //     label: "30"
      //   }
      // ],
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
          // this.tableData = r.data.deptList.pdList;
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
.title-blue{
  color: #38628C
}
.width-btn{
  width:140px!important;
  height: 35px;
  line-height: 7px;
}
.t-width-inp{
  width: 18%!important;
}
</style>
