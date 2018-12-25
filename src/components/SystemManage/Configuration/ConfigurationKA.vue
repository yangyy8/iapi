<template lang="html">
  <div class="zhff">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">口岸名称：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.portname" class="input-input"></el-input>

            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">口岸编号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.portcode" class="input-input"></el-input>

            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">口岸地址：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.ipaddress" class="input-input"></el-input>

            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">口岸开关：</span>
              <el-select v-model="pd.status" placeholder="请选择" filterable  size="small"   class="input-input">
                <el-option value="0" label="0 - 关闭" ></el-option>
                <el-option value="1" label="1 - 开启" ></el-option>
               </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={};">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          type="index"
          label="序号" width="60">
        </el-table-column>
        <el-table-column
          prop="portcode"
          label="口岸编号"
          >
        </el-table-column>
        <el-table-column
          prop="portname"
          label="口岸名称" >
        </el-table-column>
        <el-table-column
          prop="ipaddress"
          label="口岸地址"
          >
        </el-table-column>
        <el-table-column
          prop="ipaddressBack"
          label="备用地址"
          >
        </el-table-column>
        <el-table-column
          label="口岸开关"
          >
          <template slot-scope="scope">
              <span :class="{'yycolor':scope.row.status=='1','yycolory':scope.row.status=='0'}">  {{scope.row.status | fiftersate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="300"
          label="操作">
          <template slot-scope="scope">
              <!-- <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button> -->
              <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="adds(1,scope.row)">编辑</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="deletes(scope.row)">删除</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-close" v-if="scope.row.status=='1'" @click="deletes(scope.row)">关闭</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-check" v-if="scope.row.status=='0'" @click="deletes(scope.row)">开启</el-button>
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
    <el-dialog
      :title="dialogText"
      :visible.sync="addDialogVisible"
      width="600px">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="input-text"><font class="yy-color">*</font> 口岸名称：</span>
            <el-input placeholder="请输入内容" size="small" maxlength="100"  v-model="form.portname"  class="input-input" v-verify.change.blur ="{regs:'required',submit:'demoka'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="input-text"><font class="yy-color">*</font> 口岸编号：</span>
            <el-input placeholder="请输入内容(长度不超过32)" size="small" maxlength="32"  v-model="form.portcode"  class="input-input" v-verify.change.blur ="{regs:'required',submit:'demoka'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="input-text"><font class="yy-color">*</font> 口岸地址：</span>
            <el-input placeholder="请输入内容(长度不超过11)" size="small" maxlength="100"  v-model="form.ipaddress"  class="input-input" v-verify.change.blur ="{regs:'required',submit:'demoka'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="input-text"><font class="yy-color">*</font> 备用地址：</span>
            <el-input placeholder="请输入内容(长度不超过11)" size="small" maxlength="100"  v-model="form.ipaddressBack"  class="input-input" v-verify.change.blur ="{regs:'required',submit:'demoka'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="input-text"><font class="yy-color">*</font> 口岸开关：</span>
            <el-select v-model="form.status" placeholder="请选择" filterable clearable  size="small"   class="input-input" v-verify.change.blur ="{regs:'required',submit:'demoka'}">
              <el-option value="0" label="0 - 关闭" ></el-option>
              <el-option value="1" label="1 - 开启" ></el-option>
             </el-select>
          </el-col>
        </el-row>
        <!-- <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"> 备注：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="600" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.COUNT" class="yy-input-input"></el-input>
          </el-col>
        </el-row> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>

          <el-button type="info" @click="conarts('addForm')" size="small">连接测试</el-button>
          <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="连接测试"
      :visible.sync="detailsDialogVisible"
      width="400px">

        <div class="titile">{{mmsg}} </div>

      <span slot="footer" class="dialog-footer">
        <el-button  @click="detailsDialogVisible = false" size="small">取消</el-button>
      </span>
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
      dialogText: "新增",
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
      mmsg:"",
      form: {},

    }
  },

  mounted() {
      this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated(){
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

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post("/manage-platform/portStatus/select", p,
        r => {
          console.log(r);
          this.tableData = r.data.pdList;
          this.TotalResult = r.data.totalResult;
        })
    },
     adds(n, i) {
        this.addDialogVisible = true;
        if (n != 0) {
          this.tp = 1;
          // this.form = i;
        //  this.form=Object.assign({}, i);
        let p={
          "portcode":i.portcode
        };
        this.$api.post("/manage-platform/portConfig/goEdie", p,
          r => {
            this.form = r.data;
          })

          this.dialogText="编辑";
        }else {
          this.tp=0;
          this.dialogText="新增";
        }
      },
      panduan(){

      if(this.form.portname=undefined || this.form.portname=="")
      {
            this.$message.error("口岸名称不能为空！"); return false;
      }
      if(this.form.portcode==undefined || this.form.portcode=="")
      {
            this.$message.error("口岸编号不能为空！"); return false;
      }
      if(this.form.ipaddress==undefined || this.form.ipaddress=="")
      {
            this.$message.error("口岸地址不能为空！"); return false;
      }
      if(this.form.ipaddressBack==undefined || this.form.ipaddressBack=="")
      {
            this.$message.error("备用地址不能为空！"); return false;
      }
      if(this.form.status==undefined || this.form.status==null)
      {
            this.$message.error("口岸开关不能为空！"); return false;
      }
       return true;
      },
      addItem(formName) {
              // if(this.$validator.listener.demoka){
              //   const result = this.$validator.verifyAll('demoka')
              //    if (result.indexOf(false) > -1) {
              //      return
              //    }
              // }
        console.log("this.panduan",this.panduan());
        if(this.panduan){
          return;
        }
        var url = "/manage-platform/portConfig/add";
        if (this.tp == 1) {
          url = "/manage-platform/portConfig/edit";
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
              this.$message.error(r.Message);
            }
            this.$refs[formName].resetFields();
            this.addDialogVisible = false;
            this.getList(this.CurrentPage, this.pageSize, this.pd);
            // this.tableData=r.Data.ResultList;
          }, e => {
            this.$message.error('失败了');
          })
      },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.form=i;
    },
    deletes(i) {
      let p = {
        "portcode": i.portcode
      };
      this.$confirm('您是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/portConfig/delete', p,
          r => {
            console.log("===" + r);
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getList(this.CurrentPage, this.pageSize, this.pd);
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
    conarts(){

        this.$api.post('/manage-platform/portConfig/connTest', this.form,
          r => {

            if (r.success) {
              this.mmsg=r.data;
              this.detailsDialogVisible=true;
            } else {
              this.$message.error(r.Message);
            }
          }, e => {
            this.$message.error('失败了');
          });
    },
  },
  filters: {
    fiftersate(val){
      if(val=="1"){

        return "开启"
      }else {

        return "关闭"
      }
    }
  }
}
</script>
<style scoped>
.yycolor{ background: #00FF00; padding: 3px 8px;}
.yycolory{  background: #FF0000;padding: 3px 8px; }
.input-text{width: 20%!important;}
.input-input{width: 75%!important;}
.titile{width: 100%;font-size: 16px; text-align: center; color: #FF0000}
</style>
