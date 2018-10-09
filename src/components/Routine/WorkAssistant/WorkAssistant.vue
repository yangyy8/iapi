<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle" v-show="page==1" justify="center">
        <el-col  :sm="24" :md="12" :lg="10">
          <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"></el-input>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="4"  class="input-item">
          &nbsp;&nbsp;&nbsp;
          <el-button type="success" size="small" @click="">搜索</el-button>&nbsp;&nbsp;&nbsp;
          <el-button type="success" size="small" @click="">文件上传</el-button>
        </el-col>
      </el-row>
      <el-row type="flex" class="middle" v-show="page==0">
        <el-col :span="22" class="br">
          <div class="title-green ">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" class="pr-20" type="flex" justify="center">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">账号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">手机号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
        <span class="tubiao hand" :class="{'checked':page==1}" @click="qq">文件管理</span><span class="tubiao hand" :class="{'checked':page==0}" @click="page=0;getList(CurrentPage,pageSize,pd)">通讯录</span>
        <div id="div1" v-show="page==0">
          <el-row class="margin-bt">
            <el-button type="primary" size="small" @click="adds(0,'')">新增</el-button>
          </el-row>
          <el-table
            :data="tableData"
            border
            style="width: 100%;">
            <el-table-column
              prop="tsname"
              label="姓名" sortable
              width="140">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别" sortable>
            </el-table-column>
            <el-table-column
              prop="birthdate"
              label="账号" sortable>
            </el-table-column>
            <el-table-column
              prop="nationalityStr"
              label="岗位" sortable>
            </el-table-column>
            <el-table-column
              prop="nationalityStr"
              label="电话" sortable>
            </el-table-column>
            <el-table-column
              label="操作">
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
        <div id="div2" v-show="page==1">
          <el-row align="center"  type="flex" justify="center">
              <el-col :span="15">
                <h3>啦啦爬啦啦啦啦啦啦啦啦绿绿绿绿绿</h3>
                <div class="">
                  二排坡隧道位于云南省石林县大、小锁卜所村和松树凹村之间。这里，抬眼是山、低头是崎岖的山路；这里，远离城市的喧嚣，没有普通车站熙熙攘攘的旅客，但这里，也是春运安全保卫的主战场。从警22年的铁路民警李华，是这里唯一的民警。
                </div>
              </el-col>
          </el-row>
        </div>
    </div>
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>姓名：</span>
            <el-input placeholder="请输入姓名" size="small" maxlength="20"  v-model="form.ROLE_NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>性别：</span>
            <el-select v-model="form.STATUS" clearable placeholder="请选择" size="small" class="input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}">
               <el-option value="M" label="男"></el-option>
               <el-option value="F" label="女"></el-option>
               <el-option value="U" label="未知"></el-option>
             </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">账号：</span>
            <el-input placeholder="请输入账号" size="small" maxlength="20"  v-model="form.ROLE_NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">岗位：</span>
            <el-input placeholder="请输入岗位" size="small" maxlength="20"  v-model="form.ROLE_NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">电话：</span>
            <el-input placeholder="请输入电话" size="small" maxlength="20"  v-model="form.ROLE_NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
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

import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {

  data() {
    return {
      tp: 0,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      dialogText: "新增",
      addDialogVisible: false,
      page:0,
      pd: {
        "isBlurred":false,
        departdateBegin:'',
        departdateEnd:'',
      },
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

    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd)
    let time = new Date();
    let end = new Date();
    let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
    this.pd.departdateBegin=formatDate(begin,'yyyyMMddhhmm');
    this.pd.departdateEnd=formatDate(end,'yyyyMMddhhmm');
  },
  activated(){

  },
  methods: {
    qq(){
      this.page=1;
    },
    handleSelectionChange(val) {
    this.multipleSelection = val;
    },
    getNation(msg){
      this.pd.NATIONALITY=msg;
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

      if(dayGap(this.pd.departdateBegin,this.pd.departdateEnd,0)>30){
        this.$alert('查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/statusUpdate/seat/queryListPages', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
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
        this.dialogText="新增";
      }

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
        filterdate(n)
        {
          if(n=="" || n==null){
            return n;
          }else {
              return n.substring(0,n.length-3);
          }

        },
        fiftersex(val) {
          if (val == "F") {
            return "女"
          } else if (val == "M") {
            return "男"
          } else if (val == "U") {
            return "未知"
          }
        },
        fiftecr(val) {
          if (val == "0Z") {
            return "允许打印登机牌";
          } else if (val == "1Z") {
            return "禁止打印登机牌";
          } else if (val == "2Z") {
            return "请再次核对";
          } else {
            return "数据错误";
          }
        },
        fifterbj(val) {
          if (val == "1") {
            return "产生报警";
          } else {
            return "未产生报警";
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
  width: 20% !important;
}

.yy-input-input {
  width: 70% !important;

}
.checked{
  background:#56A8FE; color:#ffffff;
}
.tubiao{
width:100px; padding:6px 15px;  border:1px solid #56A8FE;
}
.margin-bt{
  margin: 5px 0px !important;
}
</style>
