<template lang="html">
  <div class="zlbg">
    <div class="middle-top">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            配置管理
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="middle" style="padding-top:0px!important">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={};">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="TYPE"
          label="口径类型">
        </el-table-column>
        <el-table-column
          label="口径类型描述">
          <template slot-scope="scope">
            <span class="t-noWrap">{{scope.row.DESCRIBE}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="中文口径">
          <template slot-scope="scope">
            <span class="t-noWrap">{{scope.row.CHN}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="英文口径">
          <template slot-scope="scope">
            <span class="t-noWrap">{{scope.row.EN}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作" width="250">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini"  icon="el-icon-delete" @click="details(scope.row)">详情</el-button>
              <el-button class="table-btn" size="mini"  icon="el-icon-edit" @click="adds(1,scope.row)">编辑</el-button>
              <el-button class="table-btn" size="mini"  icon="el-icon-delete" @click="deletes(scope.row)">删除</el-button>
         </template>
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
          :current-page.sync ="CurrentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div> -->
    </div>
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="800px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 口径类型：</span>
            <el-input placeholder="请输入内容，最大字符为15" size="small" maxlength="15"  v-model="form.TYPE"  class="yy-input-input" v-verify.input.blur ="{regs:'required',submit:'Koujing'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 中文口径：</span>
            <el-input type="textarea" placeholder="请输入内容，最大字符为300"  maxlength="300" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.CHN"  class="yy-input-input" v-verify.input.blur ="{regs:'required',submit:'Koujing'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 英文口径：</span>
            <el-input type="textarea" placeholder="请输入内容，最大字符为300"  maxlength="300" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.EN"  class="yy-input-input" v-verify.input.blur ="{regs:'required',submit:'Koujing'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 口径类型描述：</span>
              <el-input type="textarea"  placeholder="请输入内容，最大字符为50"  maxlength="50":autosize="{ minRows: 3, maxRows: 6}" v-model="form.DESCRIBE" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'Koujing'}"></el-input>
          </el-col>
        </el-row>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="800px">
      <el-form :model="dform" ref="mapForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">口径类型：</span>
            <el-input placeholder="最大字符为15" size="small" maxlength="15"  v-model="dform.TYPE"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">中文口径：</span>
            <el-input type="textarea" placeholder="最大字符为300"  maxlength="300" :autosize="{ minRows: 3, maxRows: 6}" v-model="dform.CHN"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">英文口径：</span>
            <el-input type="textarea" placeholder="最大字符为300"  maxlength="300" :autosize="{ minRows: 3, maxRows: 6}" v-model="dform.EN"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">口径类型描述：</span>
              <el-input type="textarea"  placeholder="最大字符为50"  maxlength="50":autosize="{ minRows: 3, maxRows: 6}" v-model="dform.DESCRIBE" class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tp: 0,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      company: [],
      sertail:"",
      dialogText:"新增",
      addDialogVisible: false,
      detailsDialogVisible: false,
      menuDialogVisible: false,
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
      menudata: [],
      defaultProps: {
        children: 'menuList',
        label: 'name'
      },

      form: {},
      dform:{},
      mapForm: {},

    }
  },
  mounted() {
    this.getList();

  },
  activated() {
    this.getList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize);
      console.log(`当前页: ${val}`);
    },
    getList() {
      this.$api.post('/manage-platform/consult/queryReplyList',{},
        r => {
          this.tableData = r.data;
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/userSys/goAdd', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data.deptList;
          }
        })
    },

    adds(n, i) {
      this.addDialogVisible = true;
      if (n != 0) {
        this.tp = 1;
        this.form=Object.assign({}, i);
        this.dialogText="编辑";
      }else {
        this.tp = 0;
        this.dialogText="新增";
      }

    },
    addItem(formName) {
      if(this.$validator.listener.Koujing){
        const result = this.$validator.verifyAll('Koujing')
         if (result.indexOf(false) > -1) {
           return
         }
      }
      var url = "/manage-platform/consult/saveConsultReplyConfig";
      if (this.tp == 1) {
        url = "/manage-platform/consult/editConsultReplyConfig";
      }
      this.$api.post(url, this.form,
        r => {
          console.log(r);
          if (r.data.retMsg) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
          } else {
            this.$message.error(r.Message);
          }
          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          this.getList();
        }, e => {
          this.$message.error('失败了');
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      this.dform = i;
    },
    deletes(i) {
      let p = {
        "serial": i.SERIAL
      };
      this.$confirm('您是否确认删除此？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/consult/deleteConsultReplyConfig', p,
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
// trim(){
//   this.form.CVALUE=this.form.CVALUE.replace(/[^\w]/g,'');
// }
  },
  filters: {
    fifterstatus(val) {
      if (val == 1) {
        return "正常"
      } else if(val == 0){
        return "失效"
      }
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
  width: 20% !important;
}

.yy-input-input {
  width: 70% !important;
}
.t-noWrap{
  width: 200px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
