<template lang="html">
  <div class="zlbg">
    <div class="middle mb-6">
      <el-row type="flex" >
        <el-col :span="22" class="br pr-20">
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">申请标题：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.APPLY_TITLE"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">申请类型：</span>
              <el-select v-model="pd.APPLY_TYPE" class="input-input"  filterable clearable placeholder="请选择"   size="small">
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
              <el-select v-model="pd.APPLY_STATUS" class="input-input"  filterable clearable placeholder="请选择"   size="small">
                <el-option value="10" label="10 - 暂存">
                </el-option>
                <el-option value="11" label="11 - 提交">
                </el-option>
                <el-option value="12" label="12 - 撤回">
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
          <el-button type="success" size="small" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={};">申请</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="mt-10 o-table3"
        @header-click="headerClick"
        >
        <el-table-column
        type="index"
        label="序号" width="55">
        </el-table-column>
        <el-table-column
          prop="APPLY_TITLE" sortable
          label="申请标题">
        </el-table-column>
         <el-table-column
          sortable
          label="申请类型"
          >
          <template slot-scope="scope">
              {{scope.row.APPLY_TYPE | fiftertype}}
            </template>
        </el-table-column>
        <el-table-column
          prop="APPLY_TIME" sortable
          label="申请时间">
        </el-table-column>
        <el-table-column
          prop="APPLY_DESCRIBE" sortable
          label="申请描述">
        </el-table-column>
        <el-table-column
          label="处理状态" sortable>
          <template slot-scope="scope">
              {{scope.row.APPLY_STATUS | fifterstatus}}
            </template>
        </el-table-column>
        <el-table-column
          prop="UPDATE_TIME" sortable
          label="处理时间">
        </el-table-column>
        <el-table-column
          prop="REMARK" sortable
          label="回复信息">
        </el-table-column>

        <el-table-column
          label="操作" width="160">
          <template slot-scope="scope">
              <el-button type="text" class="a-btn" title="撤回" icon="el-icon-sold-out" @click="withdraws(scope.row,12)"></el-button>
              <el-button type="text" class="a-btn" title="编辑" icon="el-icon-edit" @click="adds(1,scope.row)"></el-button>
              <el-button type="text" class="a-btn" title="删除" icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
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
          :current-page.sync ="CurrentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="APPLY_TITLE" data-type="input"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 申请标题：</span>
            <el-input placeholder="请输入内容(长度不能超过50)" size="small" maxlength="50"   v-model="form.APPLY_TITLE"  class="yy-input-input"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="APPLY_DESCRIBE" data-type="textarea"
            v-validate-easy="[['required']]">
            <span class="yy-input-text" ><font class="yy-color">*</font> 申请描述：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.APPLY_DESCRIBE" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="APPLY_TYPE" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 申请类型：</span>
            <el-select v-model="form.APPLY_TYPE" class="yy-input-input"  filterable clearable placeholder="请选择" @change="selectChange(form.APPLY_TYPE)"  size="small" >
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
        </el-row>
        <el-row type="flex"  class="mb-6" v-show="isshow" v-if="form.APPLY_TYPE=='99'">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"></span>
               <el-input placeholder="请输入类型内容" maxlength="250" size="small"  v-model="form.TYPE_DESC" class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">联系电话：</span>
           <el-input  size="small" placeholder="请输入内容" maxlength="250" v-model="form.PHONE" class="yy-input-input"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6 lht dialog-footer" >
          <el-col :span="24" style="">

            <label class="file">
              <img src="../../../../assets/img/fujian1.png" />
              <input type="file" name=""  @change="uploadFile">
            </label>

            <!-- <div class="" v-for="(ff,ind) in fileinfo" :key="ind">
              <span class="ml-50">{{ff.ACCESSORYNAME}}</span>
              <el-button type="text" class="redx" @click="delFileInfo(ff.SERIAL)">删除</el-button>
            </div> -->
            <div class="" v-if="fileinfos!=''">
              <!-- {{fileinfos}} -->
              <p v-html="fileinfos">{{fileinfos}}</p>
            </div>
            <div class="">
              <div class="" v-for="(x,ind) in fileData" :key="ind">
                <span class="mr-20">{{x.name}}</span>
                <!-- <el-button type="text" class="redx" @click="deletesF(ind)">删除</el-button> -->
              </div>
            </div>
          </el-col>
            </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="addItem('addForm',10)" size="small">保 存</el-button> -->
        <el-button type="primary" @click="addItem('addForm',11)" size="small">提 交</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="详情" :visible.sync="detailsDialogVisible"  >
      <el-form   ref="mapForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">申请标题：</span>
          <span class="yy-input-input detailinput">  {{mapForm.APPLY_TITLE}}</span>
            </el-col>
            <el-col :span="12" class="input-item">
              <span class="yy-input-text">申请类型：</span>
            <span class="yy-input-input detailinput">  {{mapForm.APPLY_TYPE | fiftertype}}</span>
            </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" v-if="mapForm.APPLY_TYPE=='99'">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">类型内容：</span>
          <span class="yy-input-input detailinput">  {{mapForm.TYPE_DESC}}</span>
          </el-col>

          <el-col :span="12" class="input-item">
            <span class="yy-input-text">申请描述：</span>
          <span class="yy-input-input detailinput">  {{mapForm.APPLY_DESCRIBE}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">申请时间：</span>
          <span class="yy-input-input detailinput">  {{mapForm.APPLY_TIME}}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">申请状态：</span>
          <span class="yy-input-input detailinput">  {{mapForm.APPLY_STATUS | fifterstatus}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">审核人：</span>
          <span class="yy-input-input detailinput">  {{mapForm.CHECK_USER}}</span>
          </el-col>
          <el-col :span="12" class="input-item">
            <span class="yy-input-text">审核时间：</span>
          <span class="yy-input-input detailinput">  {{mapForm.UPDATE_TIME }}</span>
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
      fileData: [],
      fileinfo: {},
      fileinfos:"",
      sertail: "",
      dialogText: "申请",
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

      defaultChecked: [],
      multipleSelection: [],

      form: {},
      mapForm: {},
      Airport: [],
      isshow: false,
      appid:"",
    }
  },
  mounted() {

  },
  activated() {

  },
  methods: {
    selectChange(i) {
      // this.$forceUpdate();

      if (i == "99") {
        this.isshow = true;
      } else {
        this.isshow = false;
      }

      if(this.form.TYPE_DESC==undefined){
      this.form.TYPE_DESC="";}
    },
    headerClick(column, event) {
      event.target.title = column.label
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
      this.$api.post('/manage-platform/apply/select', p,
        r => {
          this.tableData = r.data.pdList;
          this.TotalResult = r.data.totalResult;
        })
    },

    adds(n, i) {
      this.addDialogVisible = true;
      this.V.$reset("demo2");
      this.fileData=null;
      this.fileinfo=null;
      this.fileinfos="";
      if (n != 0) {
        this.tp = 1;
        let p = {
          "APPLY_ID": i.APPLY_ID
        };
        this.$api.post('/manage-platform/apply/goEdit', p,
          r => {
            console.log(r);
            if (r.success) {
              this.form = r.data;
            //  this.fileinfo=r.data.FILE_NAME;
            console.log('r.data.FILE_NAME',r.data.FILE_NAME);
            if(r.data.FILE_NAME!=undefined && r.data.FILE_NAME!=""){
              this.fileinfos="<a href='"+(this.$api.rootUrl+r.data.FILE_PATH+r.data.FILE_NAME)+"'>"+r.data.FILE_NAME+"</a>";
            }

            }
          })
          this.appid=i.APPLY_ID;
        this.dialogText = "编辑";
      } else {
        this.tp = 0;
        this.dialogText = "申请";
      }
    },
    addItem(formName,status) {

      this.V.$submit('demo2', (canSumit, data) => {
        // canSumit为true时，则所有该scope的所有表单验证通过
        if (!canSumit) return;
        // 只有验证全部通过才会执行

        var formData = new FormData();
        if (this.appid != "" && this.appid != undefined) {

          formData.append("APPLY_ID", this.appid);
        }
        if (this.fileData != null) {
          let arr = this.fileData;

          for (var i = 0; i < arr.length; i++) {
            formData.append("file", arr[i]);
          }
        }
        formData.append("APPLY_TITLE", this.form.APPLY_TITLE);
        formData.append("APPLY_DESCRIBE", this.form.APPLY_DESCRIBE);
        formData.append("APPLY_TYPE", this.form.APPLY_TYPE);
        formData.append("TYPE_DESC", this.form.TYPE_DESC);
        formData.append("PHONE", this.form.PHONE);
        formData.append("APPLY_STATUS", status);

        let p = formData;


        var url = "/manage-platform/apply/addApply";
        if (this.tp == 1) {
          url = "/manage-platform/apply/editApply";
        }

        this.$api.post(url, p,
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
    uploadFile(event) {

      // if(!this.fileData){
      //   console.log("this.fileData",event)
      //
      //   this.fileData = event.target.files;
      //   this.fileData = [...this.fileData];
      //   console.log("this.fileData",event)
      // }else{
      //   let arr=[...event.target.files];
      //   console.log(arr)
      //   let _this=this;
      //   let arr0=this.fileData;
      //   for (var i = 0; i < arr0.length; i++) {
      //     for(var j=0;j<arr.length;j++){
      //       if(arr0[i].name==arr[j].name){
      //         console.log(arr0[i].name,arr[j].name)
      //         arr.splice(j,1);
      //       }
      //     }
      //   }
      //   this.fileData=this.fileData.concat(arr);
      //   console.log(this.fileData)
      // }

      this.fileData = event.target.files;
    },
    deletesF(t) {
      // this.fileData.splice(t,1);
      // if(this.fileData.length==0){
      //   this.fileData=null
      // }
      // console.log(this.fileData);
      this.fileData=null;
    },
    delFileInfo(id) {
      let p = {
        "APPLY_ID": id
      };
      this.$confirm('您是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/apply/deleteFile', p,
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
    withdraws(i, s) { //撤回
      var sinfo = "撤回成功";

      let p = {
        "APPLY_ID": i.APPLY_ID,
        "APPLY_STATUS": s+"",
        "REMARK": sinfo
      };
      this.$confirm('您是否确认操作？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/apply/updateStatus', p,
          r => {
            if (r.success) {
              this.$message({
                message: sinfo + "！",
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
          message: '已取消操作'
        });
      });
    },
    details(i) {
      this.detailsDialogVisible = true;
      this.mapForm = i;
    },
    deletes(i) {

      let p = {
        "APPLY_ID": i.APPLY_ID,
      };
      this.$confirm('您是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/apply/delete', p,
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

  },
  filters: {
    fiftertype(val) {

      switch (val) {
        case "1":
          return "指标";
          break;
        case "2":
          return "字典";
          break;
        case "3":
          return "名单";
          break;
        case "4":
          return "标签";
          break;
        case "5":
          return "前台提问";
          break;
        case "99":
          return "其它";
          break;
        default:
          return "";
      }

    },
    fifterstatus(val) {
      switch (val) {
        case "10":
          return "暂存";
          break;
        case "11":
          return "提交";
          break;
        case "12":
          return "撤回";
          break;
        case "21":
          return "确认";
          break;
        case "22":
          return "退回";
          break;
        case "31":
          return "处理完成";
          break;
        default:
          return "暂存";
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
.lht {
  line-height: 40px;
  padding: 10px;
  border:1px solid #eeeeee;
  color: #1676C2;
}
.file {
  position: relative;
  display: inline-block;
  overflow: hidden;
  text-decoration: none;
  text-indent: 0;
  width: 305px;
  height: 21px;
}

.file input {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
