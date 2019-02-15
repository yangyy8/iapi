<template lang="html">
  <div class="zlbg">
    <div class="middle mb-6">
      <el-row type="flex" >
        <el-col :span="22" class="br pr-20">

          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">字典名称：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.NAME" maxlength="11"  class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">创建时间：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.BEGINDATE" format="yyyy-MM-dd HH:mm:ss"
               type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss"
               placeholder="开始时间"   >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.EXPIREDATE" format="yyyy-MM-dd HH:mm:ss"
                type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间"  >
            </el-date-picker>
          </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={};">新增</el-button>
        <el-button type="success" size="small" @click="download">模板下载</el-button>
        <el-button type="info" size="small" @click="batchsdelete">批量删除</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="mt-10 o-table3"
@header-click="headerClick"
        @selection-change="handleSelectionChange">
        <el-table-column
         type="selection"
         width="40">
        </el-table-column>
        <el-table-column
          prop="NAME" sortable
          label="字典名称">
        </el-table-column>
         <el-table-column
          prop="DESCRIBE" sortable
          label="字典描述"
          >
        </el-table-column>
        <el-table-column
          prop="DETAILSCOUNT" sortable
          label="指标数量">
        </el-table-column>
        <el-table-column
          prop="CREATEUSERNAME"
          label="创建人" sortable>
        </el-table-column>
        <el-table-column
          prop="CREATETIME"
          label="创建时间" sortable>
        </el-table-column>
        <el-table-column
          label="操作" width="150">
          <template slot-scope="scope">
              <el-button type="text" class="a-btn" title="编辑"  icon="el-icon-edit" @click="adds(1,scope.row)"></el-button>
              <el-button type="text" class="a-btn" title="导入"  icon="el-icon-upload2" @click="showUpload(scope.row)"></el-button>
              <el-button type="text" class="a-btn" title="导出"   icon="el-icon-download" @click="tableDown(scope.row)"></el-button>
              <el-button type="text" class="a-btn" title="删除"   icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
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
        <!-- <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font> 字典项类型：</span>
            <el-select v-model="form.LABELTYPE_CODE" class="yy-input-input"  filterable clearable placeholder="请选择" size="small">
              <el-option value="机场" label="机场">
              </el-option>
              <el-option value="国家" label="国家">
              </el-option>
              <el-option value="其它" label="其它">
              </el-option>

             </el-select>
          </el-col>
        </el-row> -->
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo" data-name="NAME" data-type="input"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 字典名称：</span>
            <el-input placeholder="请输入内容(长度不超过11)" size="small"  maxlength="11"  v-model="form.NAME"  class="yy-input-input" ></el-input>
          </el-col>
        </el-row>
        <!-- <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"> 代码项：</span>
            <el-input placeholder="请输入内容" size="small"   v-model="form.NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"> 代码中文描述：</span>
            <el-input placeholder="请输入内容" size="small"   v-model="form.NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>
          </el-col>
        </el-row> -->
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">字典项描述：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="60" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.DESCRIBE" class="yy-input-input"></el-input>
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
            <span class="yy-input-text">字典名称：</span>
          <span class="yy-input-input detailinput">  {{mapForm.LABELTYPE_NAME}}</span>
            </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">代码项：</span>
          <span class="yy-input-input detailinput">  {{mapForm.NAME}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">代码中文描述：</span>
          <span class="yy-input-input detailinput">  {{mapForm.REASON}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">字典描述：</span>
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
    </el-dialog> -->

    <el-dialog title="上传模板" :visible.sync="uploadDialogVisible"  width="640px">
      <el-form  ref="releaseForm">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action='actions+"/manage-platform/riskDictionaries/riskReadExcel/"+getSerial'
          :file-list="fileList"
          multiple
          :on-success="upSuccess"
          :before-upload="beforeAvatarUpload"
          :limit="1"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传EXCEL文件</div>
        </el-upload>
      </el-form>
    </el-dialog>

  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      tp: 0,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      actions: "",
      pd: {},
      company: [],
      fileList:[],
      sertail: "",
      getSerial: "",
      dialogText: "新增",
      addDialogVisible: false,
      detailsDialogVisible: false,
      menuDialogVisible: false,
      uploadDialogVisible: false,
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
      defaultChecked: [],
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
    this.queryNationality();
  },
  activated() {
    //this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    headerClick(column,event){
   event.target.title=column.label
 },
    download() {
      window.location.href = this.$api.rootUrl + '/manage-platform/templateFile/riskDictionariesEtails.xlsx'
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
    open(content) {

      this.$alert(content, '提示', {
        confirmButtonText: '确定',
        type: 'warning'
      });
    },
    getList(currentPage, showCount, pd) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post('/manage-platform/riskDictionaries/getRiskDictionariesPage', p,
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
        this.form = Object.assign({}, i);
        this.dialogText = "编辑";
      } else {
        this.tp = 0;
        this.dialogText = "新增";
      }
        this.V.$reset("demo")
    },
    addItem(formName) {
      this.V.$submit('demo', (canSumit, data) => {
        // canSumit为true时，则所有该scope的所有表单验证通过
        if (!canSumit) return;
        // 只有验证全部通过才会执行
        var url = "/manage-platform/riskDictionaries/addRiskDictionaries";
        if (this.tp == 1) {
          url = "/manage-platform/riskDictionaries/updateRiskDictionaries";
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
      console.log(i);
      this.mapForm = i;
    },
    deletes(i) {
      let p = {
        "id": i.SERIAL
      };
      this.$confirm('此字典名称删除后导入的详情代码项也一并删除，您是否确认删除？？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/riskDictionaries/deleteRiskDictionaries', p,
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

    beforeAvatarUpload(file) {
      console.log(file.type)
      const isEXL = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

      if (!isEXL) {
        this.$message.error('上传文件只能是 xlsx 格式!');
      }
      return isEXL;
    },
    showUpload(i) {

      this.getSerial = i.SERIAL;
      //this.actions="http://192.168.99.247:8080";
      this.actions = this.$api.rootUrl;
      this.uploadDialogVisible = true;
      console.log(this.$refs.upload);
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles();
      }
    },
    submitUpload() {
      console.log(this.$refs.upload.uploadFiles);
      if (this.$refs.upload.uploadFiles.length == 0) {
        this.$message({
          message: '请先选择文件！',
          type: 'warning'
        });
        return
      }
      // alert(this.$refs);
      this.$refs.upload.submit();
    },
    upSuccess(r) {
      console.log(r);
      if (r.success) {
        this.$message({
          message: r.data,
          type: 'success'
        });

      } else {
        this.$message.error(r.message);
      }
      this.uploadDialogVisible = false;
      this.getList(this.CurrentPage, this.pageSize, this.pd);
    },
    tableDown(i) {
      console.log(this.$api.rootUrl)
      axios({
        method: 'post',
        url: this.$api.rootUrl + "/manage-platform/riskDictionaries/exportFileIo",
        data: {
          "id": i.SERIAL,
        },
        responseType: 'blob'
      }).then(response => {
        this.downloadM(response)
      });
    },
    downloadM(data, type) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data.data], {
        type: "application/octet-stream"
      }))
      console.log(url)
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', 'riskDictionariesEtails.xlsx')
      document.body.appendChild(link)
      link.click()
    },
    batchsdelete() {

      if (this.multipleSelection.length == 0) {

        this.open("请选择列表内容！");
        return;

      }
      console.log(this.multipleSelection);

      let p = {
        "ids": this.multipleSelection
      };
      this.$confirm('此字典名称删除后导入的详情代码项也一并删除，您是否确认删除？？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.post('/manage-platform/riskDictionaries/deleteRiskDictionariess', p,
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
