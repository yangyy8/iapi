<template lang="html">
  <div class="zlbg">
    <div class="middle mb-6">
      <el-row type="flex">
        <el-col :span="22" class="br pr-20">

          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">模型名称：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"  class="input-input"></el-input>
            </el-col>


        <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text">提交审核日期：</span>
            <div class="input-input t-flex t-date">
            <el-date-picker
              v-model="pd.BEGINDATE" format="yyyy-MM-dd HH:mm:ss"
              type="datetime" size="small" value-format="yyyyMMddHHmmss"
              placeholder="开始时间"  :picker-options="pickerOptions" >
          </el-date-picker>
             <span class="septum">-</span>
             <el-date-picker
            v-model="pd.EXPIREDATE" format="yyyy-MM-dd HH:mm:ss"
            type="datetime" size="small" value-format="yyyyMMddHHmmss"
            placeholder="结束时间" :picker-options="pickerOptions1" >
              </el-date-picker>
            </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">最后处理日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.BEGINDATE" format="yyyy-MM-dd HH:mm:ss"
               type="datetime" size="small" value-format="yyyyMMddHHmmss"
               placeholder="开始时间"  :picker-options="pickerOptions" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.EXPIREDATE" format="yyyy-MM-dd HH:mm:ss"
                type="datetime" size="small" value-format="yyyyMMddHHmmss"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">所属口岸：</span>
              <el-select v-model="pd.LABELTYPE_CODE" class="input-input"  filterable clearable placeholder="请选择"   size="small">
                <el-option value="北京" label="北京">
                </el-option>
                <el-option value="上海" label="上海">
                </el-option>
                <el-option value="广东" label="广东">
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">处理人：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">审核状态：</span>
              <el-select v-model="pd.LABELTYPE_CODE" class="input-input"  filterable clearable placeholder="请选择"   size="small">
                <el-option value="审核通过" label="审核通过">
                </el-option>
                <el-option value="审核不通过" label="审核不通过">
                </el-option>

               </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">

      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
        type="Index"
        label="序号">
        </el-table-column>
        <el-table-column
          prop="LABELTYPE_NAME"
          label="模型名称">
        </el-table-column>
         <el-table-column
          prop="NAME"
          label="模型简称"
          >
        </el-table-column>
        <el-table-column
          prop="CREATEUSER"
          label="模型描述">
        </el-table-column>
        <el-table-column
          prop="CREATETIME"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="CREATETIME"
          label="提交审核日期" width="130">
        </el-table-column>
        <el-table-column
          prop="CREATETIME"
          label="最后处理日期" width="130">
        </el-table-column>
        <el-table-column
          prop="CREATETIME"
          label="处理人">
        </el-table-column>
        <el-table-column
          prop="CREATETIME"
          label="有效日期">
        </el-table-column>
        <el-table-column
          prop="CREATETIME"
          label="所属口岸">
        </el-table-column>
        <el-table-column
          prop="CREATETIME"
          label="模型状态">
        </el-table-column>
        <el-table-column
          prop="CREATETIME"
          label="发布状态">
        </el-table-column>
        <el-table-column
          label="操作" width="250">
          <template slot-scope="scope">
              <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="adds(1,scope.row)">审核通过</el-button>
              <el-button class="table-btn" size="mini" plain icon="el-icon-edit" @click="adds(1,scope.row)">审核不通过</el-button>
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
    <el-dialog title="审核" :visible.sync="addDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 类型：</span>
            <el-select v-model="form.LABELTYPE_CODE" class="yy-input-input"  filterable clearable placeholder="请选择" size="small">
              <el-option value="涉恐类" label="涉恐类">
              </el-option>
              <el-option value="偷渡类" label="偷渡类">
              </el-option>
              <el-option value="三非类" label="三非类">
              </el-option>
              <el-option value="变换身份类" label="变换身份类">
              </el-option>
              <el-option value="其他" label="其他">
              </el-option>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 问题名称：</span>
            <el-input placeholder="请输入内容(不能超过20个汉字)" size="small" maxlength="20"  v-model="form.NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">问题描述：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.REASON" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="500px" >
      <el-form :model="map" ref="mapForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">类型：</span>
          <span class="yy-input-input detailinput">  {{mapForm.LABELTYPE_NAME}}</span>
            </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">问题名称：</span>
          <span class="yy-input-input detailinput">  {{mapForm.NAME}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">问题描述：</span>
          <span class="yy-input-input detailinput">  {{mapForm.REASON}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">创建人：</span>
          <span class="yy-input-input detailinput">  {{mapForm.CREATEUSER}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">创建时间：</span>
          <span class="yy-input-input detailinput">  {{mapForm.CREATETIME}}</span>
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
      defaultChecked:[],
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
      mapForm: {},
      Airport: [],
    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
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
      this.$api.post('/manage-platform/roleSys/selectPara', p,
        r => {
          this.tableData = r.data.roleList.pdList;
          this.TotalResult = r.data.roleList.totalResult;
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
      var url = "/manage-platform/roleSys/save";
      if (this.tp == 1) {
        url = "/manage-platform/roleSys/edit";
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
  width: 25% !important;
}
.yy-input-input {
  width: 68% !important;
}
</style>
