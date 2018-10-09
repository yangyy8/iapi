<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2" type="flex" justify="center">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">口岸/部门：</span>
              <el-select v-model="pd.DEPT_ID" filterable clearable placeholder="请选择" size="small" class="input-input">
                <el-option
                  v-for="item in company"
                  :key="item.SERIAL"
                  :label="item.DEPT_JC"
                  :value="item.SERIAL">
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
            </el-col>

          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="warning" size="small" @click="sendMesssage">发送消息</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          prop="DEPT_QC"
          label="发送人">
        </el-table-column>
        <el-table-column
          prop="DEPT_JC"
          label="接收人"
          >
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="消息内容">
        </el-table-column>
        <el-table-column
          prop="PARENT_JC"
          label="发送时间"
          >
        </el-table-column>
        <el-table-column
          prop="STATUS"
          label="状态"
        >
        <template slot-scope="scope">
            {{scope.row.STATUS | fiftertype}}
          </template>
        </el-table-column>

        <el-table-column
          label="操作" width="200">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="review(scope.row)">回复</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
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
    <el-dialog title="发送消息"  :visible.sync="sendDialogVisible" width="400px;">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6" style="margin-left:85px">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">接收口岸：</span>
          <span class="yy-input-input detailinput">   {{dform.PARENT_JC }}</span>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">接收人：</span>
            <span class="yy-input-input detailinput"> {{dform.DEPT_QC }}</span>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">附件：</span>
            <el-upload
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" class="table-btn">上传附件</el-button>
            </el-upload>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text width-ts">回复内容：</span>
            <el-input type="textarea"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">发送</el-button>
        <el-button @click="" size="small" type="warning">清空</el-button>
      </div>
    </el-dialog>
    <el-dialog title="消息回复"  :visible.sync="addDialogVisible" width="400px;">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6" style="margin-left:85px">
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">接收人：</span>
            <span class="review-span">李四</span>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">发送人：</span>
            <span class="review-span">张萌萌</span>
          </el-col>
          <el-col :span="8" class="input-item">
            <span class="yy-input-text">发送时间：</span>
            <span class="review-span">2018-09-20</span>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text width-ts">回复内容：</span>
            <el-input type="textarea"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">发送</el-button>
        <el-button @click="" size="small" type="warning">清空</el-button>
      </div>
    </el-dialog>
    <el-dialog title="详情"  :visible.sync="detailsDialogVisible" width="400px;">
      <el-form :model="dform" ref="detailsForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">接收人：</span>
          <span class="yy-input-input detailinput">   {{dform.PARENT_JC }}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">发送时间：</span>
            <span class="yy-input-input detailinput"> {{dform.DEPT_QC }}</span>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">发送人：</span>
            <span class="yy-input-input detailinput"> {{dform.DEPT_JC }}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">接收时间：</span>
          <span class="yy-input-input detailinput">   {{dform.DEPT_CODE }}</span>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="tt-input">消息内容：</span>
            <span class="yy-input-input detailInp">  {{dform.STATUS | fiftertype}}</span>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small" type="warning">下载附件</el-button>
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
      dialogText: "新增",
      addDialogVisible: false,
      detailsDialogVisible: false,
      sendDialogVisible:false,
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
    this.queryNationality();
  },
  activated() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    handleRemove(file, fileList) {
       console.log(file, fileList);
     },
     handlePreview(file) {
       console.log(file);
     },
     handleExceed(files, fileList) {
       this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
     },
     beforeRemove(file, fileList) {
       return this.$confirm(`确定移除 ${ file.name }？`);
     },
     sendMesssage(){
       this.sendDialogVisible = true;
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
    review(n) {
      this.addDialogVisible = true;
      this.form=Object.assign({}, n);
    },
    queryNationality() {
      this.$api.post('/manage-platform/userSys/deptList', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data.deptList;
          }
        })
    },

    addItem(formName) {
      if (this.form.DEPT_ORDER != undefined && this.form.DEPT_ORDER != "") {
        if (!checkRate(this.form.DEPT_ORDER)) {
          this.$message.error('排列序号必须为数字，请重新输入！');
          return;
        }
      }

      if (this.$validator.listener.demo2) {
        const result = this.$validator.verifyAll('demo2')
        if (result.indexOf(false) > -1) {
          return;
        }
      }

       var url = "/manage-platform/deptSys/edit";

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
          this.getList();
          // this.tableData=r.Data.ResultList;
        }, e => {
          this.$message.error('失败了');
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.dform = i;
    },
    deletes(i) {
      let p = {
        "SERIAL": i.SERIAL
      };
      this.$confirm('您是否确认删除此部门？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/deptSys/delete', p,
          r => {
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getList();
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
