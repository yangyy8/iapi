<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">配置类型：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.MTYPE"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">配置单位：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.VALUETYPE"  class="input-input"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="padding-top:28px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" name="xtcssz_add" @click="adds(0,'');form={};">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          prop="MTYPE"
          label="配置类型" sortable>
        </el-table-column>
        <el-table-column
          prop="CVALUE"
          label="配置阀值" sortable>
        </el-table-column>
        <el-table-column
          prop="VALUETYPE"
          label="配置单位" sortable>
        </el-table-column>
        <el-table-column
          prop="MCHNDESC"
          label="中文描述" sortable>
        </el-table-column>
        <el-table-column
          label="操作" width="70">
          <template slot-scope="scope">
              <el-button type="text"  class="a-btn" size="mini" title="编辑"   icon="el-icon-edit" name="xtcssz_edit" @click="adds(1,scope.row)"></el-button>
  <!-- <el-button class="table-btn" size="mini"  icon="el-icon-delete" @click="deletes(scope.row)"></el-button> -->
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
          :current-page.sync ="CurrentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="800px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo" data-name="MTYPE" data-type="input"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 配置类型：</span>
            <el-input placeholder="请输入内容，最大字符为15" size="small" maxlength="15"  v-model="form.MTYPE"  class="yy-input-input" ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo" data-name="CVALUE" data-type="input"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 配置阀值：</span>
            <el-input placeholder="请输入数字" size="small" maxlength="10" @keyup="trim()"  v-model="form.CVALUE"  class="yy-input-input" ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo" data-name="VALUETYPE" data-type="input"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 配置单位：</span>
            <el-input placeholder="请输入内容，最大字符为15" size="small" maxlength="15"  v-model="form.VALUETYPE"  class="yy-input-input" ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo" data-name="MCHNDESC" data-type="textarea"
            v-validate-easy="[['required']]">
           <span class="yy-input-text"><font class="yy-color">*</font> 配置类型中文描述：</span>
            <el-input type="textarea"  placeholder="请输入内容，最大字符为50"  maxlength="50":autosize="{ minRows: 3, maxRows: 6}" v-model="form.MCHNDESC" class="yy-input-input"  ></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CurrentPage=1;addItem('addForm')" size="small">确 定</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <!-- <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="500px" >
      <el-form :model="map" ref="mapForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">角色名：</span>
          <span class="yy-input-input detailinput">  {{mapForm.ROLE_NAME}}</span>
            </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">状态：</span>
          <span class="yy-input-input detailinput">  {{mapForm.STATUS=="1"?"启用":"停用"}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">创建时间：</span>
          <span class="yy-input-input detailinput">  {{mapForm.CREATE_TIME}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">备注：</span>
          <span class="yy-input-input detailinput">  {{mapForm.REMARKS}}</span>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog> -->
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
      pd: {},
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
      mapForm: {},
    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated() {
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
        "cdt": pd
      };
      this.$api.post('/manage-platform/monitorConfig/queryConfigList', p,
        r => {

          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
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
        // this.form = i;
        this.form=Object.assign({}, i);
        this.dialogText="编辑";
      }else {
        this.tp = 0;
        this.dialogText="新增";
      }
        this.V.$reset("demo")
    },
    addItem(formName) {
      this.V.$submit('demo', (canSumit,data) => {
      // canSumit为true时，则所有该scope的所有表单验证通过
      if(!canSumit) return;
      // 只有验证全部通过才会执行

    if(this.form.MCHNDESC==undefined || this.form.MCHNDESC=="")
    {
    this.$message.error("配置类型中文描述不能为空，请重新输入！");return ;

    }

      var url = "/manage-platform/monitorConfig/saveConfig";
      if (this.tp == 1) {
        url = "/manage-platform/monitorConfig/editConfig";
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
          this.getList(this.CurrentPage, this.pageSize, this.pd);
          // this.tableData=r.Data.ResultList;
        }, e => {
          this.$message.error('失败了');
        })
      });
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.mapForm = i;
    },
    deletes(i) {
      let p = {
        "SERIAL": i.SERIAL
      };
      this.$confirm('您是否确认删除此？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$api.post('/manage-platform/roleSys/delete', p,
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
    menus(i) {
      this.menuDialogVisible = true;
      this.sertail=i.SERIAL;
      let p = {
        "SERIAL": i.SERIAL
      };
      this.$api.post('/manage-platform/roleSys/goEditJuri', p,
        r => {
          console.log(r);
          if (r.success) {
            this.menudata = r.data.userTreeOne;
            let arr=r.data.userTreeOne,that=this;
          this.defaultChecked=r.data.checkList;
          }
        })
    },
menuItem(){
  let checkList=this.$refs.tree.getCheckedNodes();
  //let checkList=this.$refs.tree.getCheckedKeys();
  let p={
    // menuList:this.menudata,
   "ROLE_ID":this.sertail,
    checkList:checkList
  }
  this.$api.post('/manage-platform/roleSys/editJuri', p,
    r => {
      console.log(r);
      if (r.success) {
        this.$message({
          type: 'success',
          message: '保存成功'
        });
      }else{

  this.$message.error('保存失败');
      }
    })
    this.menuDialogVisible = false;
},
trim(){

  this.form.CVALUE=this.form.CVALUE.replace(/[^\w]/g,'');
}
  },
  filters: {
    fifterstatus(val) {
      if (val == 0) {
        return "停用"
      } else {
        return "启用"
      }
      // return val*2
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
</style>
