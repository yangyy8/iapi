<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" >

            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">用户名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.USERNAME"  class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">单位：</span>
              <el-select v-model="pd.DEPT_ID"  filterable clearable  placeholder="请选择" size="small" class="input-input">
                 <el-option
                   v-for="item in company"
                   :key="item.SERIAL"
                   :label="item.DEPT_JC"
                   :value="item.SERIAL">
                 </el-option>
               </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">状态：</span>
              <el-select v-model="pd.STATUS"  clearable   placeholder="请选择" size="small" class="input-input">

                 <el-option value="1" label="1 - 启用">
                 </el-option>
                 <el-option value="0" label="0 - 停用">
                 </el-option>
               </el-select>
            </el-col>


          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:30px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">

        <el-button type="primary" size="small" @click="adds(0,'');">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        >
        <el-table-column
          prop="EMPLOYEE_CARD" sortable
          label="警号">
        </el-table-column>
        <el-table-column
          prop="NAME" sortable
          label="民警姓名"
          >
        </el-table-column>
        <el-table-column
          prop="USERNAME" sortable
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="CERTIFICATE_NO" sortable
          label="身份证"
          >
        </el-table-column>
        <el-table-column
          label="性别" sortable
        >
        <template slot-scope="scope">
          {{scope.row.SEX | fiftersex}}

        </template>
        </el-table-column>
        <el-table-column
          prop="PHONE"
          label="联系方式" sortable
        >
        </el-table-column>
        <el-table-column
          label="状态" sortable
        >
        <template slot-scope="scope">
          {{scope.row.STATUS | fifterstatus}}
        </template>
        </el-table-column>
        <el-table-column
          label="操作" width="120">
          <template slot-scope="scope">
              <el-button  type="text"  class="a-btn" size="mini" title="详情" icon="el-icon-tickets" @click="details(scope.row.SERIAL)"></el-button>
              <el-button  type="text"  class="a-btn" size="mini" title="编辑" icon="el-icon-edit" @click="adds(1,scope.row.SERIAL)"></el-button>
              <el-button  type="text"  class="a-btn" size="mini" title="删除" icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
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
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 姓名：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.NAME" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 用户名：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.USERNAME" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>

          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 密码：</span>
            <el-input placeholder="请输入内容" type="password" size="small"  v-model="form.PASSWORD" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 确认密码：</span>
            <el-input placeholder="请输入内容" size="small" type="password"  v-model="form.UNPASSWORD" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 警号：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.EMPLOYEE_CARD" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 状态：</span>
            <el-select v-model="form.STATUS"   placeholder="请选择" size="small" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}">
            <el-option value="1" label="启用">
              </el-option>
              <el-option value="0" label="停用">
              </el-option>
             </el-select>

          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">性别：</span>
            <el-select v-model="form.SEX"   placeholder="请选择" size="small" class="yy-input-input" >
              <el-option value="1" label="男">
              </el-option>
              <el-option value="0" label="女">
              </el-option>
             </el-select>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 部门：</span>
            <el-select v-model="form.DEPT_ID"  filterable clearable placeholder="请选择" size="small" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}">
               <el-option

                 v-for="item in company"
                 :key="item.SERIAL"
                 :label="item.DEPT_JC"
                 :value="item.SERIAL" >
               </el-option>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 联系方式：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.PHONE" class="yy-input-input"  v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>

          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">身份证号：</span>
            <el-input placeholder="请输入内容" size="small"  v-model="form.CERTIFICATE_NO" class="yy-input-input" ></el-input>

          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" style="margin-left:-120px;">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 角色(可多选)：</span>
            <el-select v-model="form.roleList" multiple   placeholder="请选择" size="small" style="width:76%;" >
               <el-option
                 v-for="item in role"
                 :key="item.SERIAL"
                 :label="item.ROLE_NAME"
                 :value="item.SERIAL" >
               </el-option>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" style="margin-left:-120px;">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">备注：</span>
            <el-input type="textarea"  placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.REMARKS" style="width:76%;"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
        <el-button @click="addDialogVisible=false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="700px" >
      <el-form :model="map" ref="mapForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">姓名：</span>
          <span class="yy-input-input detailinput">  {{map.NAME}}</span>
            </el-col>
            <el-col :span="12" class="input-item">
              <span class="yy-input-text">用户名：</span>
            <span class="yy-input-input detailinput">  {{map.USERNAME}}</span>
              </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">性别：</span>
            <span class="yy-input-input detailinput">  {{map.SEX=="0"?"女":map.SEX=="1"?"男":"未知"}}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">部门：</span>
          <span class="yy-input-input detailinput">  {{map.DEPT_JC}}</span>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">状态：</span>
          <span class="yy-input-input detailinput">  {{map.STATUS=="0"?"停用":"启用"}}</span>
          </el-col>

          <el-col :span="12" class="input-item">
            <span class="yy-input-text">联系方式：</span>
          <span class="yy-input-input detailinput">  {{map.PHONE}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
          <span class="yy-input-text">角色：</span>
          <span class="yy-input-input detailinput">  {{map.roleList}}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">身份证号：</span>
          <span class="yy-input-input detailinput">  {{map.CERTIFICATE_NO}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" style="margin-left:-120px;">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">备注：</span>
          <span class="yy-input-input detailinput">  {{map.REMARKS}}</span>
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
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {},
      company: [],
      role:[],
      map:{},
      dialogText:"新增",
      tp: 0,
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
    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryrole();
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
      this.$api.post('/manage-platform/userSys/selectAll', p,
        r => {
          console.log(r);
          this.tableData = r.data.userList.pdList;
          this.TotalResult = r.data.userList.totalResult;
        })
    },

    queryNationality() {
      this.$api.post('/manage-platform/userSys/deptListSmall', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data.deptList;
          }
        })
    },

    queryrole() {
      this.$api.post('/manage-platform/userSys/roleList', {},
        r => {
          console.log(r);

          if (r.success) {
            this.role = r.data.roleList;
          }
        })
    },
    adds(n, i) {

      this.addDialogVisible = true;
      if (n != 0) {


        this.dialogText="编辑";
        this.tp = 1;
        let p={
          "SERIAL":i
        };
         this.$api.post('/manage-platform/userSys/goEdit', p,
           r => {
             console.log(r);
             if (r.success) {
               this.form = r.data;
               this.form.UNPASSWORD=this.form.PASSWORD;
               let lists=[];
               let arr=r.data.chooseRoleList;
               for(var i in arr){
                 lists.push(arr[i].SERIAL)
               }
               this.form.roleList=lists;
             }
           })

      }else {
        this.form={};
        this.$set(this.form,'roleList',[]);
        this.dialogText="新增";
      }

    },
    addItem(formName) {
      if(this.form.PASSWORD!=this.form.UNPASSWORD && this.form.UNPASSWORD!=""){

        this.$message.error('两次密码输入不一致，请重新输入！'); return;
      }


      if(this.$validator.listener.demo2){
        const result = this.$validator.verifyAll('demo2')
         if (result.indexOf(false) > -1) {
           return
         } else {

      }}

      var url = "/manage-platform/userSys/save";
      if (this.tp == 1) {
        url = "/manage-platform/userSys/edit";
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
          this.addDialogVisible = false;
          this.$refs[formName].resetFields();
          this.getList(this.CurrentPage, this.pageSize, this.pd);
        }, e => {
          this.$message.error('失败了');
        })

    },
    details(i) {
      this.detailsDialogVisible = true;

      let p={
        "SERIAL":i
      };
       this.$api.post('/manage-platform/userSys/showDetai', p,
         r => {
           console.log(r);
           if (r.success) {
             this.map = r.data;
           }
         })
    },
    deletes(i) {
      let p = {
        "SERIAL": i.SERIAL
      };
      this.$confirm('您是否确认删除此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$api.post('/manage-platform/userSys/delete', p,
          r => {
            console.log("===" + r);
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

    fifterstatus(val) {
      if (val == 0) {
        return "停用"

      } else {
        return "启用"
      }
    },
    fiftersex(val) {
      if (val == 0) {
        return "女"

      } else if (val == 1) {
        return "男"
      } else {
        return "未知";
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
  width: 70% !important;

}
</style>
