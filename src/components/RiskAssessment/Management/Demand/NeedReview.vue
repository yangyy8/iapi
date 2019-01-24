<template lang="html">
  <div class="zlbg">
    <div class="middle mb-6">
      <el-row type="flex" >
        <el-col :span="22" class="br pr-20">

          <el-row align="center"   :gutter="2" >

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">申请标题：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.targetSign"  class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">申请类型：</span>
              <el-select v-model="pd.targetType" class="input-input"  filterable clearable placeholder="请选择"   size="small">
                <el-option value="1" label="1 - 指标">
                </el-option>
                <el-option value="2" label="2 - 字典">
                </el-option>
                <el-option value="3" label="3 - 名单">
                </el-option>
                <el-option value="4" label="4 - 标签">
                </el-option>
                <el-option value="5" label="5 - 前台提问">
                </el-option>
                <el-option value="99" label="99 - 其它">
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">处理状态：</span>
              <el-select v-model="pd.showDistrick" class="input-input"  filterable clearable placeholder="请选择"   size="small">
                <el-option value="11" label="11 - 申请">
                </el-option>
                <el-option value="12" label="12 - 撤回">
                </el-option>
                <el-option value="13" label="13 - 删除">
                </el-option>
                <el-option value="21" label="21 - 确认">
                </el-option>
                <el-option value="22" label="22 - 退回">
                </el-option>
                <el-option value="31" label="31 - 处理完成">
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
        class="mt-10 o-table3"
        @header-click="headerClick"
        >
        <el-table-column
        type="Index"
        label="序号">
        </el-table-column>
        <el-table-column
          prop="TARGET_SIGN" sortable
          label="申请标题">
        </el-table-column>
        <el-table-column
         prop="TARGET_NAME" sortable
         label="申请类型"
         >
       </el-table-column>
         <el-table-column
          prop="TARGET_NAME" sortable
          label="申请口岸"
          >
        </el-table-column>
        <el-table-column
          prop="CALCULATION" sortable
          label="申请人">
        </el-table-column>
        <el-table-column
          prop="TARGET_DESCRIBE" sortable
          label="申请时间">
        </el-table-column>
        <el-table-column
          prop="TARGET_TYPE" sortable
          label="申请描述">
        </el-table-column>
        <el-table-column
          prop="CLASS_NAME" sortable
          label="联系方式">
        </el-table-column>
        <el-table-column
          label="处理状态" sortable>
          <template slot-scope="scope">
              {{scope.row.SHOW_DISTRICK | fiftertype}}
            </template>
        </el-table-column>
        <el-table-column
          label="操作" width="160">
          <template slot-scope="scope">
              <el-button type="text" class="a-btn" title="确认" icon="el-icon-check" @click="adds(1,scope.row)"></el-button>
              <el-button type="text" class="a-btn" title="退回" icon="el-icon-sold-out" @click="adds(1,scope.row)"></el-button>
              <el-button type="text" class="a-btn" title="处理完成" icon="el-icon-edit-outline" @click="deletes(scope.row)"></el-button>
              <el-button type="text" class="a-btn"   title="状态详情"  icon="el-icon-tickets" @click="details(scope.row)"></el-button>
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
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="targetSign" data-type="input"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 申请标题：</span>
            <el-input placeholder="请输入内容(长度不能超过50)" size="small" maxlength="50"  :disabled="form.targetId!=null"  v-model="form.targetSign"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">申请描述：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.targetDescribe" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="targetType" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 申请类型：</span>
            <el-select v-model="form.targetType" class="yy-input-input"  filterable clearable placeholder="请选择" @change="selectChange"  size="small" >
              <el-option value="指标" label="1 - 指标">
              </el-option>
              <el-option value="字典" label="2 - 字典">
              </el-option>
              <el-option value="名单" label="3 - 名单">
              </el-option>
              <el-option value="标签" label="4 - 标签">
              </el-option>
              <el-option value="其它" label="5 - 其它">
              </el-option>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="showDistrick" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 处理状态：</span>
            <el-select v-model="form.showDistrick" class="yy-input-input"  filterable clearable placeholder="请选择" @change="selectChange"  size="small" >
              <el-option value="1" label="1 - 申请">
              </el-option>
              <el-option value="2" label="2 - 确认">
              </el-option>
              <el-option value="3" label="3 - 处理完成">
              </el-option>
              <el-option value="4" label="4 - 删除">
              </el-option>
              <el-option value="5" label="5 - 退回">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">联系电话：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.script" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="500px" >
      <el-table
        :data="tableData1"
        border
        style="width: 100%;"
        class="mt-10 o-table3"
        @header-click="headerClick"
        >
        <el-table-column
        type="Index"
        label="序号" >
        </el-table-column>
        <el-table-column
          prop="TARGET_SIGN" sortable
          label="操作人">
        </el-table-column>
         <el-table-column
          prop="TARGET_NAME" sortable
          label="状态"
          >
        </el-table-column>
        <el-table-column
          prop="CALCULATION" sortable
          label="时间">
        </el-table-column>
        <el-table-column
          prop="TARGET_DESCRIBE" sortable
          label="备注">
        </el-table-column>

      </el-table>
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
      tableData1: [],
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
    //this.getList(this.CurrentPage, this.pageSize, this.pd);
    //this.queryNationality();
  },
  activated(){
    //getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    selectChange(){
      this.$forceUpdate();
    },
    headerClick(column,event){
    event.target.title=column.label
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
      this.$api.post('/manage-platform/target/select', p,
        r => {
          this.tableData = r.data.pdList;
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
        this.V.$reset("demo2");
      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        // this.form=Object.assign({}, i);
        this.form.targetId=i.TARGET_ID;
        this.form.targetSign=i.TARGET_SIGN;
        this.form.targetName=i.TARGET_NAME;
        this.form.targetDescribe=i.TARGET_DESCRIBE;
        this.form.targetType=i.TARGET_TYPE;
        this.form.targetSource=i.TARGET_SOURCE;
        this.form.calculation=i.CALCULATION;
        this.form.className=i.CLASS_NAME;
        this.form.para=i.PARA;
        this.form.script=i.SCRIPT;
        this.form.showDistrick=i.SHOW_DISTRICK;
        this.dialogText="编辑";
      }else {
        this.tp = 0;
        this.dialogText="新增";
      }
    },
    addItem(formName) {

      this.V.$submit('demo2', (canSumit,data) => {
          // canSumit为true时，则所有该scope的所有表单验证通过
           if(!canSumit) return;
           // 只有验证全部通过才会执行

      var url = "/manage-platform/target/addTarger";
      if (this.tp == 1) {
        url = "/manage-platform/target/editTarger";
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
        });
      });
    },
    details(i) {
      this.detailsDialogVisible = true;
      let p = {
        "targetId": i.TARGET_ID
      };
      this.$api.post('/manage-platform/target/showDetai', p,
        r => {
          this.mapForm = r.data;
        })
    },
    deletes(i) {

      let p = {
        "targetId": i.TARGET_ID,
        "targetSign": i.TARGET_SIGN,
      };
      this.$confirm('您是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/target/deleteTarger', p,
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
    fiftertype(val) {
      if (val == 1) {
        return "人员基本信息"
      } else if (val == 2){
        return "证件信息"
      }
      else if (val == 3){
        return "航班信息"
      }
      else if (val == 4){
        return "在华情况"
      }
      else {
        return "其他"
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
  width: 25% !important;
}
.yy-input-input {
  width: 68% !important;
}
</style>
