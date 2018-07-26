<template lang="html">
  <div class="generalRule">
    <div class="middle-top mb-2">
        <el-row type="flex" class="middle">
          <el-col :span="22" class="br pr-20">
            <div class="title-green ">
              查询条件
            </div>
            <el-row align="center" :gutter="2">

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">出入境方向：</span>
                <el-select v-model="pd.IODIR" placeholder="请选择" filterable clearable size="small" class="input-input">
                  <el-option label="0 - 出境" value="0"></el-option>
                  <el-option label="1 - 入境" value="1"></el-option>
                  <el-option label="2 - 全部" value="2"></el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">状态：</span>
                <el-select v-model="pd.STATUS" placeholder="请选择" filterable clearable size="small" class="input-input">
                  <el-option label="0 - 停用" value="0"></el-option>
                  <el-option label="1 - 启用" value="1"></el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">人员类别：</span>
                <el-select v-model="pd.PERSONNELTYPE" placeholder="请选择" filterable clearable  size="small" class="input-input">
                  <el-option label="0 - 中国内地人" value="0"></el-option>
                  <el-option label="1 - 中国港澳台" value="1"></el-option>
                  <el-option label="2 - 外国人" value="2"></el-option>
                  <el-option label="3 - 全部" value="3"></el-option>
                </el-select>
              </el-col>

            </el-row>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="success" class="mt-26" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="addTableList">新增</el-button>
        <el-button type="success" size="small" @click="save">保存并发布</el-button>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          label="出入境方向"
          width="180">
          <template slot-scope="scope">
            <el-select v-model="scope.row.IODIR" placeholder="请选择"  size="mini" class="table-select">
              <el-option label="出境" value="0"></el-option>
              <el-option label="入境" value="1"></el-option>
              <el-option label="全部" value="2"></el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="人员类别"
          width="160">
          <template slot-scope="scope">
            <el-select v-model="scope.row.PERSONNELTYPE" placeholder="请选择"  size="mini" class="table-select">
              <el-option label="中国内地人" value="0"></el-option>
              <el-option label="中国港澳台" value="1"></el-option>
              <el-option label="外国人" value="2"></el-option>
              <el-option label="全部" value="3"></el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="规则名称"
          width="160">
          <template slot-scope="scope">
            <el-input v-model="scope.row.RULEDESC" size="mini" class="table-select"></el-input>
         </template>
        </el-table-column>
        <el-table-column
          label="字段名称"
          width="130">
          <template slot-scope="scope">
            <el-select v-model="scope.row.FIELDNAME" @visible-change="codeName(scope.row.FIELDNAME)" placeholder="请选择"  size="mini" class="table-select">
              <el-option
              v-for="item in code"
              :key="item.FIELDNAME"
              :value="item.FIELDNAME"
              :label="item.FIELDDES">
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="运算符">
          <template slot-scope="scope">
            <el-select v-model="scope.row.OPERATORCHARACTER" placeholder="请选择"  size="mini" class="table-select">
              <el-option label="等于" value="0"></el-option>
              <el-option label="大于" value="1"></el-option>
              <el-option label="小于" value="2"></el-option>
              <el-option label="包含" value="3"></el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="取值">
          <template slot-scope="scope">
            <el-select v-model="scope.row.VALUE" placeholder="请选择"  size="mini" class="table-select">
              <el-option label="当前系统时间" value="sysdate">
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="反馈结果">
          <template slot-scope="scope">
            <el-select v-model="scope.row.CHECKRESULT" placeholder="请选择"  size="mini" class="table-select">
              <el-option label="2Z" value="2Z">
              </el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="反馈结果描述">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" size="small" class="table-select" v-model="scope.row.RESPONSERESULT"></el-input>
         </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-select v-model="scope.row.STATUS" placeholder="请选择"  size="mini" class="table-select">
              <el-option label="停用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <div class="flex-r">
              <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="deleteTableList(scope.$index)">删除</el-button>
            </div>
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
    </div>

  </div>



</template>

<script>
export default {
  data(){
    return{
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      detailsDialogVisible:false,
      pd:{},
      options:[
        {
          value:10,
          label:"10"
        },
        {
          value:20,
          label:"20"
        },
        {
          value:30,
          label:"30"
        }
      ],
      tableData: [
        {
          "IODIR": "",
    			"PERSONNELTYPE": "",
    			"RULEDESC": '',
    			"FIELDNAME": "",
    			"OPERATORCHARACTER": "",
    			"VALUE": '',
    			"CHECKRESULT": "",
          "RESPONSERESULT":'',
          "STATUS": "",
          "FIELDTYPE":''
        }
      ],
      modelTable:{
        "IODIR": "",
        "PERSONNELTYPE": "",
        "RULEDESC": '',
        "FIELDNAME": "",
        "OPERATORCHARACTER": "",
        "VALUE": '',
        "CHECKRESULT": "",
        "RESPONSERESULT":'',
        "STATUS": "",
        "FIELDTYPE":''
      },
      cleanTable:{
        "IODIR": "",
        "PERSONNELTYPE": "",
        "RULEDESC": '',
        "FIELDNAME": "",
        "OPERATORCHARACTER": "",
        "VALUE": '',
        "CHECKRESULT": "",
        "RESPONSERESULT":'',
        "STATUS": "",
        "FIELDTYPE":''
      },
      multipleSelection:[],
      code:[]
    }
  },
  mounted() {
    this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  methods:{
    handleSelectionChange(val) {
       this.multipleSelection = val;
     },
     pageSizeChange(val) {
       this.getList(this.CurrentPage,val,this.pd);
       console.log(`每页 ${val} 条`);
     },
     handleCurrentChange(val) {
       this.getList(val,this.pageSize,this.pd);
       console.log(`当前页: ${val}`);
     },
     getList(currentPage,showCount,pd){
       let p={
       	"currentPage":currentPage,
       	"showCount":showCount,
       	"pd":pd
       };
       console.log(pd)
       this.$api.post('/manage-platform/ruleConfig/getRuleConfigPage',p,
        r => {
          console.log(r);
          this.tableData=r.data.resultList;
          this.TotalResult=r.data.totalResult;
       })
     },
     addTableList(){//新增
       this.tableData.push(this.modelTable);
       this.modelTable = this.cleanTable;
     },
     deleteTableList(id){//删除本行
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.tableData.splice(id,1);
         this.save();

       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         });
       });

     },
     save(){
       let p = this.tableData;
       this.$api.post('/manage-platform/ruleConfig/addRuleConfigAll',p,
        r => {
          console.log(r);
          if(r.success == false){
            this.$message.error(r.message);
          }else{
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }
       })

     },
     codeName(name){//字段名称的接口
       console.log(name);
       this.$api.post('/manage-platform/ruleConfig/getRuleConfigFieldNameList',{},
        r => {
          console.log(r);
          if(r.success){
            this.code = r.data
          }
       })
     }

  }
}
</script>

<style scoped>

</style>
<style media="screen">

.el-table__body{
    table-layout:auto !important;
}
.mt-26{
  margin-top: 26px!important;
}

</style>
