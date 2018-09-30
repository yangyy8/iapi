<template lang="html">
  <div class="zlbg">

    <div class="middle middle-top">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="added">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          prop="DEPT_QC"
          label="监控类型">
        </el-table-column>
        <el-table-column
          prop="DEPT_JC"
          label="报警阈值"
          >
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="阈值单位">
        </el-table-column>
        <el-table-column
          label="操作" width="200">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="review(scope.row)">修改</el-button>
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
      pickerOptions1: {
        // shortcuts: [{
        //   text: '今天',
        //   onClick(picker) {
        //     picker.$emit('pick', new Date());
        //   }
        // }, {
        //   text: '昨天',
        //   onClick(picker) {
        //     const date = new Date();
        //     date.setTime(date.getTime() - 3600 * 1000 * 24);
        //     picker.$emit('pick', date);
        //   }
        // }, {
        //   text: '一周前',
        //   onClick(picker) {
        //     const date = new Date();
        //     date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
        //     picker.$emit('pick', date);
        //   }
        // }]
      },
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
.width-ts{
  width: 20.3%!important;
}
</style>
