<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.NAME"  class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">值班时间：</span>
              <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="cdt.STARTTIME"
                 type="datetime"
                 size="small"
                 format="yyyy-MM-dd HH:mm"
                 value-format="yyyyMMddHHmm"
                 placeholder="开始时间"
                 :picker-options="pickerOptions">
                </el-date-picker>
                 <span class="septum">-</span>
                 <el-date-picker
                  v-model="cdt.ENDTIME"
                  type="datetime"
                  size="small"
                  format="yyyy-MM-dd HH:mm"
                  value-format="yyyyMMddHHmm"
                  placeholder="结束时间"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </div>
            </el-col>
            <!-- <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">部门：</span>
                <el-cascader
                  @visible-change="bumenMethod"
                  :options="bumen"
                  :props="props"
                  size="small"
                  v-model="cdt.deptList"
                  filterable
                  change-on-select
                  class="input-input"
                  clearable
                ></el-cascader>
            </el-col> -->
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">部门：</span>
              <el-button type="success" size="small" plain @click="getmodel">点击选择</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
              <el-button type="primary" size="small" plain @click="seeModel">点击查看</el-button>
            </el-col>
            <el-dialog title="单位选择" :visible.sync="modelDialogVisible" width="640px" :before-close="cancelModel">
              <el-input
                placeholder="输入模型关键字进行过滤"
                v-model="filterText">
              </el-input>
              <el-tree
                class="filter-tree"
                ref="tree"
                :data="treeData"
                show-checkbox
                node-key="DEPT_CODE"
                :filter-node-method="filterNode"
                :props="defaultProps"
                :default-checked-keys='keys'>
              </el-tree>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="getCheckedNodes" size="small">确认</el-button>
                <el-button type="primary" @click="resetModel" size="small" plain>重置</el-button>
                <el-button type="warning" @click="cancelModel" size="small">取消</el-button>
              </div>
            </el-dialog>
            <el-dialog title="单位选择详情" :visible.sync="seeModelDialogVisible" width="800px">
              <el-row align="center" style="width:100%">
                <span v-for="(item,ind) in dutyName" :key="ind" style="width:25%;margin-bottom: 7px;display:inline-block;line-height: 20px;">{{item.DEPT_NAME}}</span>
              </el-row>
              <div slot="footer" class="dialog-footer">
                <el-button @click="seeModelDialogVisible = false" size="small">取 消</el-button>
              </div>
            </el-dialog>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">账号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.USERNAME"  class="input-input"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,cdt);">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={}">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="o-table3"
        @header-click="headerClick">
        <el-table-column
          prop="NAME"
          label="姓名"
          sortable>
        </el-table-column>
        <el-table-column
          prop="USERNAME"
          label="账号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="DEPT_QC"
          label="部门"
          sortable>
        </el-table-column>
        <el-table-column
          prop="PHONE"
          label="电话"
          sortable>
        </el-table-column>
        <el-table-column
          prop="LEADERNAME"
          label="值班领导"
          sortable>
          </el-table-column>
          <el-table-column
            prop="STARTTIMESTR"
            label="值班开始时间"
            sortable>
          </el-table-column>
          <el-table-column
            prop="ENDTIMESTR"
            label="值班结束时间"
            sortable>
        </el-table-column>
        <el-table-column
          label="操作" width="80">
          <template slot-scope="scope">
              <el-button  type="text"  class="a-btn"  title="编辑" icon="el-icon-edit" @click="adds(1,scope.row)"></el-button>
              <el-button  type="text"  class="a-btn"  title="删除" icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
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
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="NAME" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>姓名：</span>
            <el-select placeholder="请选择" v-model="form.NAME" filterable clearable @visible-change="nameMethod(0)" size="small" class="yy-input-input" @change="nameMethodReal(form.NAME)">
              <el-option
              v-for="item in dutyName"
              :key="item.SERIAL"
              :value="item.NAME"
              :label="item.NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>账号：</span>
            <el-input placeholder="请输入账号" size="small" v-model="form.USERNAME"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>部门：</span>
            <el-input placeholder="请输入部门" size="small" v-model="form.DEPT_QC"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>电话：</span>
            <el-input placeholder="请输入电话" size="small" v-model="form.PHONE"  class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="LEADERNAME" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>值班领导：</span>
            <el-select placeholder="请选择" v-model="form.LEADERNAME" filterable clearable @visible-change="nameMethod(1)" size="small" class="yy-input-input" @change="leaderNameReal(form.LEADERNAME)">
              <el-option
              v-for="item in leaderName"
              :key="item.SERIAL"
              :value="item.NAME"
              :label="item.NAME">
              </el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="STARTTIMESTR" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>值班开始时间：</span>
              <el-date-picker
              v-model="form.STARTTIMESTR"
              type="datetime" size="mini"
              placeholder="请选择值班开始时间"
              class="yy-input-input"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyyMMddHHmm"
              :picker-options="pickerOptions2">
            </el-date-picker>

          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo2" data-name="ENDTIMESTR" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font>值班结束时间：</span>
              <el-date-picker
              v-model="form.ENDTIMESTR"
              type="datetime" size="mini"
              placeholder="请选择值班结束时间"
              class="yy-input-input"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyyMMddHHmm"
              :picker-options="pickerOptions3">
            </el-date-picker>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">保 存</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {formatDate,format} from '@/assets/js/date.js'
export default {
  data() {
    return {
      modelDialogVisible:false,
      seeModelDialogVisible:false,
      filterText:'',
      treeData: [],
      defaultProps: {
        children: 'childDeptList',
        label: 'DEPT_NAME',
      },
      keys:[],
      keysExample:[],
      keyCode:[],
      dutyName:[],
      flagCZ:0,
      flagQX:0,
      historyModel:null,

      bumen:[],
      tp: 0,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      cdt:{},
      // props:{
      //   label:'DEPT_QC',
      //   value:'DEPT_CODE',
      //   children:'childDeptList'
      // },
      pd: {},
      nation: [],
      company: [],
      dutyName:[],
      leaderName:[],

      value: '',
      value1: "",
      dialogText: "新增",
      addDialogVisible: false,
      detailsDialogVisible: false,
      sendDialogVisible:false,
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
      pickerOptions: {
        disabledDate: (time) => {
            if (this.cdt.ENDTIME != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.cdt.ENDTIME;
            }else if(this.cdt.ENDTIME == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            return endT < this.cdt.STARTTIME;
        }
      },
      pickerOptions2: {
        disabledDate: (time) => {
            if (this.form.ENDTIMESTR != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
              return startT > this.form.ENDTIMESTR;
            }else if(this.form.ENDTIMESTR == null){
              return false
            }
        }
      },
      pickerOptions3: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmm');
            return endT < this.form.STARTTIMESTR;
        }
      },
      form: {
        STARTTIMESTR:'',
        ENDTIMESTR:'',
      },
      dform: {},
    }
  },
  mounted() {
    // this.getList(this.CurrentPage, this.pageSize, this.cdt);
  },
  activated() {
    // this.getList(this.CurrentPage, this.pageSize, this.cdt);
  },
  watch:{
     filterText(val) {
       this.$refs.tree.filter(val);
     }
  },
  methods: {
    getmodel(){//点击选择
      this.filterText='';
      this.modelDialogVisible=true;
      if(this.flagCZ==1&&this.flagQX==1){
        this.keys = this.keysExample
        this.$refs.tree.setCheckedKeys(this.keys);
      }
      this.flagCZ = 0;
      this.flagQX = 0;
      this.$api.post('/manage-platform/watch/queryDeptLv2And3',{},
       r => {
         if(r.success){
           this.treeData=r.data;
         }
      })
      if(this.keys.length!=0){
        this.keys = this.$refs.tree.getCheckedKeys(true);
        this.$refs.tree.setCheckedKeys(this.keys);
      }
    },
    resetModel(){//重置
      this.flagCZ=1;
      if(this.cdt.deptList == undefined||this.cdt.deptList.length==0){//没有值的时候
        this.historyModel = [];
        this.keysExample = [];
      }else{
        this.historyModel = this.$refs.tree.getCheckedNodes(true,true);;//存入清空前的值
        this.keysExample = this.$refs.tree.getCheckedKeys(true);//先存值再清空
      }
      this.$refs.tree.setCheckedKeys([]);
    },
    cancelModel(){//取消
      this.flagQX=1;
      if(this.flagCZ == 1){
        this.cdt.deptList=this.historyModel;
      }
      this.modelDialogVisible=false
    },
    getCheckedNodes() {//确认
      this.cdt.deptList=this.$refs.tree.getCheckedNodes(true,true);
      this.keys = this.$refs.tree.getCheckedKeys(true);//先存值再清空
      this.modelDialogVisible=false;
    },
    seeModel(){
      this.dutyName = this.cdt.deptList;
      if(this.dutyName == undefined || this.dutyName.length == 0){
        this.$message('您还未选择单位');
      }else{
        this.seeModelDialogVisible = true;
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.DEPT_NAME.indexOf(value) !== -1;
    },
    bumenMethod(){
      this.$api.post('/manage-platform/watch/queryDeptLv2And3',{},
       r =>{
         if(r.success){
           this.bumen = r.data;
         }
       })
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.cdt);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.cdt);
      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/watch/queryListPage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    nameMethod(type){
      this.$api.post('/manage-platform/watch/queryUserAll',{},
        r => {
          if(type==0){
            this.dutyName = r.data;
          }else if(type==1){
            this.leaderName = r.data;
          }
        })
    },
    leaderNameReal(val){
      console.log(val);
      let arr = this.leaderName;
      for(var i=0;i<arr.length;i++){
        if(arr[i].NAME == val){
          this.form.LEADERSERIAL = arr[i].SERIAL;
        }
      }
    },
    nameMethodReal(val){//新增添值&编辑修改
      this.$set(this.form,'PHONE','');
      this.$set(this.form,'DEPT_QC','');
      this.$set(this.form,'USERNAME','');
      let arr = this.dutyName;
      for(var i=0;i<arr.length;i++){
        if(arr[i].NAME == val){
          this.form.PHONE = arr[i].PHONE;//电话
          this.form.USERNAME = arr[i].USERNAME;//账号
          this.form.DEPT_QC = arr[i].DEPT_QC;
          this.form.DEPT_ID = arr[i].DEPT_ID;//部门id
          this.form.USERSERIAL = arr[i].SERIAL;//姓名
        }
      }
    },
    adds(n, i) {//打开新增&编辑模态框
      this.addDialogVisible = true;
      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        this.form=Object.assign({}, i);
        this.form.STARTTIMESTR=formatDate(new Date(this.form.STARTTIMESTR),'yyyyMMddhhmm');
        this.form.ENDTIMESTR=formatDate(new Date(this.form.ENDTIMESTR),'yyyyMMddhhmm');
        this.dialogText="编辑";
      }else {
        this.tp = 0;
        this.dialogText="新增";
      }
      this.V.$reset('demo2')
    },
    addItem(formName) {//新增&编辑保存
      this.V.$submit('demo2', (canSumit,data) => {
        if(!canSumit) return
        this.$api.post('/manage-platform/watch/saveWatch', this.form,
          r => {
            console.log(r);
            if (r.success) {
              this.$message({
                message: '保存成功！',
                type: 'success'
              });
            } else {
              this.$message.error('保存失败！');
            }
            // this.$refs[formName].resetFields();
            this.addDialogVisible = false;
            this.getList(this.CurrentPage, this.pageSize, this.cdt);
            // this.tableData=r.Data.ResultList;
          }, e => {
            this.$message.error('失败了');
          })
      })
    },

    deletes(i) {
      this.$confirm('您是否确认删除本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let p = {
          'SERIAL':i.SERIAL
        }
        this.$api.post('/manage-platform/watch/delete',p,
          r => {
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getList(this.CurrentPage, this.pageSize, this.cdt);
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
      if (val == "0") {
        return "停用";
      } else {
        return "启用";
      }
    },
  }
}

function checkRate(nubmer) {　　
  var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/
  　　　　
  if (!re.test(nubmer)) {　　　　
    return false;　　
  }
  return true;
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
.width-ts{
  width: 20.3%!important;
}
</style>
