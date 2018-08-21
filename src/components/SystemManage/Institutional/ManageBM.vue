<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">部门简称：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">上级部门：</span>
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
              <span class="input-text">状态：</span>
              <el-select v-model="pd.STATUS" filterable clearable placeholder="请选择" size="small" class="input-input">
                 <el-option  value="1" label="1 - 启用">
                 </el-option>
                 <el-option  value="0" label="0 - 停用">
                 </el-option>
               </el-select>
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

        <el-button type="primary" size="small" @click="adds('','');form={};">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          prop="DEPT_QC"
          label="部门全称">
        </el-table-column>
        <el-table-column
          prop="DEPT_JC"
          label="部门简称"
          >
        </el-table-column>
        <el-table-column
          prop="DEPT_CODE"
          label="部门编码">
        </el-table-column>
        <el-table-column
          prop="PARENT_JC"
          label="上级部门"
          >
        </el-table-column>
        <el-table-column
          prop="STATUS"
          label="使用状态"
        >
        <template slot-scope="scope">
            {{scope.row.STATUS | fiftertype}}
          </template>
        </el-table-column>

        <el-table-column
          label="操作" width="250">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="adds(1,scope.row)">编辑</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="deletes(scope.row)">删除</el-button>
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
    <el-dialog :title="dialogText"  :visible.sync="addDialogVisible" width="400px;">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 上级部门：</span>

            <el-select v-model="form.PARENT_ID" v-if='tp==0' filterable clearable placeholder="请选择" size="small" class="yy-input-input">
              <el-option
                v-for="item in company"
                :key="item.SERIAL"
                :label="item.DEPT_JC"
                :value="item.SERIAL">
              </el-option>
             </el-select>

             <el-select v-else v-model="form.PARENT_ID"  :disabled="true" filterable clearable placeholder="请选择" size="small" class="yy-input-input">
               <el-option
                 v-for="item in company"
                 :key="item.SERIAL"
                 :label="item.DEPT_JC"
                 :value="item.SERIAL">
               </el-option>
              </el-select>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 部门名称：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.DEPT_QC" class="yy-input-input" ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 部门简称：</span>
            <el-input placeholder="请输入内容" size="small"   v-model="form.DEPT_JC" class="yy-input-input" ></el-input>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 部门编码：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.DEPT_CODE" class="yy-input-input" ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 状态：</span>
            <el-select v-model="form.STATUS"  placeholder="请选择" size="small" class="yy-input-input">
               <el-option  value="1" label="启用">
               </el-option>
               <el-option  value="0" label="停用">
               </el-option>
             </el-select>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 排列序号：</span>
            <el-input placeholder="请输入内容" size="small"   v-model="form.DEPT_ORDER" class="yy-input-input" ></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">保 存</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="详情"  :visible.sync="detailsDialogVisible" width="400px;">
      <el-form :model="dform" ref="detailsForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">上级部门：</span>
          <span class="yy-input-input detailinput">   {{dform.PARENT_JC }}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">部门名称：</span>
            <span class="yy-input-input detailinput"> {{dform.DEPT_QC }}</span>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">部门简称：</span>
            <span class="yy-input-input detailinput"> {{dform.DEPT_JC }}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">部门编码：</span>
          <span class="yy-input-input detailinput">   {{dform.DEPT_CODE }}</span>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">状态：</span>
              <span class="yy-input-input detailinput">  {{dform.STATUS | fiftertype}}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">排列序号：</span>
            <span class="yy-input-input detailinput">   {{dform.DEPT_ORDER}}</span>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取 消</el-button>
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
      tp: 0,
      value: '',
      value1: "",
      dialogText:"新增",
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
      dform:{},
    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
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
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/deptSys/selectAll', p,
        r => {
          console.log(r);
          this.tableData = r.data.deptList.pdList;
          this.TotalResult = r.data.deptList.totalResult;
        })
    },
    adds(i, n) {

      this.addDialogVisible = true;
      if (i == 1) {
        this.tp = 1;
        this.form = n;
        this.dialogText="编辑";
      }else {
          this.dialogText="新增";this.tp=0;
      }
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

      var url = "/manage-platform/deptSys/save";
      if (this.tp == 1) {
        url = "/manage-platform/deptSys/edit";

      }

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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
</style>
