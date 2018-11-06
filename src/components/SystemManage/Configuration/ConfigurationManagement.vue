<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            配置管理
          </div>
          <!-- <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">角色：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.ROLE_NAME"  class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">状态：</span>
              <el-select v-model="pd.STATUS" clearable placeholder="请选择" size="small" class="input-input">
                 <el-option value="1" label="1 - 启用">
                 </el-option>
                 <el-option value="0" label="0 - 停用">
                 </el-option>
               </el-select>
            </el-col>
          </el-row> -->
        </el-col>
        <!-- <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col> -->
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={};">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          prop="MTYPE"
          label="配置类型">
        </el-table-column>
        <el-table-column
          prop="CVALUE"
          label="配置阀值">
        </el-table-column>
        <el-table-column
          prop="VALUETYPE"
          label="配置单位">
        </el-table-column>
        <el-table-column
          prop="MCHNDESC"
          label="中文描述">
        </el-table-column>

        <el-table-column
          label="操作" width="150">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini"   icon="el-icon-edit" @click="adds(1,scope.row)">编辑</el-button>
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
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="800px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 配置类型：</span>
            <el-input placeholder="请输入内容" size="small" maxlength="20"  v-model="form.MTYPE"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>

          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 配置阀值：</span>
            <el-input placeholder="请输入数字" size="small" maxlength="20"  v-model="form.CVALUE"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>

          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 配置单位：</span>
            <el-input placeholder="请输入内容" size="small" maxlength="250"  v-model="form.VALUETYPE"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>

          </el-col>
        </el-row>

                <el-row type="flex"  class="mb-6">
                  <el-col :span="24" class="input-item">
                    <span class="yy-input-text"><font class="yy-color">*</font> 配置类型中文描述：</span>
                      <el-input type="textarea"  placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.MCHNDESC" class="yy-input-input"></el-input>

                  </el-col>
                </el-row>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
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
        "pd": pd
      };
      this.$api.post('/manage-platform/monitorConfig/queryConfigList', p,
        r => {
          console.log("----" + r);
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
      this.$confirm('您是否确认删除此角色？', '提示', {
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
