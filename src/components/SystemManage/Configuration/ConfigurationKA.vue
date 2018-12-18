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
          type="Index"
          label="序号">
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
          width="180"
          label="操作">
          <template slot-scope="scope">
              <!-- <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button> -->
              <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="adds(1,scope.row)">编辑</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="deletes(scope.row)">删除</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-close" @click="deletes(scope.row)">关闭</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-check" @click="deletes(scope.row)">开启</el-button>
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
      title="dialogText"
      :visible.sync="addDialogVisible"
      width="600px">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>口岸名称：</span>
            <el-input placeholder="请输入内容(长度不超过11)" size="small" maxlength="11"  v-model="form.NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>口岸编号：</span>
            <el-input placeholder="请输入内容(长度不超过11)" size="small" maxlength="11"  v-model="form.NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>口岸地址：</span>
            <el-input placeholder="请输入内容(长度不超过11)" size="small" maxlength="11"  v-model="form.NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>备用地址：</span>
            <el-input placeholder="请输入内容(长度不超过11)" size="small" maxlength="11"  v-model="form.NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>口岸开关：</span>
            <el-select v-model="form.synFlag" placeholder="请选择" filterable  size="small"   class="input-input">
              <el-option value="0" label="0 - 关闭" ></el-option>
              <el-option value="1" label="1 - 开启" ></el-option>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">备注：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="600" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.COUNT" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"
      width="600px">
      <el-form :model="form">
        <div class="titile">类别名称 </div>
        <el-row type="flex" class="mb-15">
          <el-col :span="24" class="titlecontent">
            {{form.loggerName}}
          </el-col>
            </el-row>
          <div class="titile">线程名称</div>
            <el-row type="flex" class="mb-15">
          <el-col :span="24" class="titlecontent">
            {{form.threadName}}
          </el-col>
        </el-row>
     <div class="titile">监控消息</div>
        <el-row type="flex" class="mb-15">
          <el-col :span="24" class="titlecontent">
            {{form.formattedMessage}}
          </el-col>
        </el-row>
      </el-form>

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
      nation: [],
      value: '',
      value1: "",
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
      if(dayGap(this.pd.begin,this.pd.end,0)>1){
        this.$alert('只能查询某一天的日期', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post("/manage-platform/log_event/queryListPageAll", p,
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
              if(this.$validator.listener.demo2){
                const result = this.$validator.verifyAll('demo2')
                 if (result.indexOf(false) > -1) {
                   return
                 } else {
                 }
              }
        var url = "/manage-platform/riskNamelistType/addnamelistType";
        if (this.tp == 1) {
          url = "/manage-platform/riskNamelistType/updatenamelistType";
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
</style>
