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
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 全部" value="A"></el-option>
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
            <el-button type="success" class="mt-26" size="small" @click="getList(pd)">查询</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle t-table">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="addTableList">新增</el-button>
        <el-button type="success" size="small" @click="save">保存并发布</el-button>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%"
        max-height="466">
        <el-table-column
          label="出入境方向"
          width="130">
          <template slot-scope="scope">
            <el-select v-model="scope.row.IODIR" placeholder="请选择" v-verify.change.blur="{regs:'required',submit:'demo'}" size="mini" filterable clearable class="table-select">
              <el-option label="I - 入境" value="I"></el-option>
              <el-option label="O - 出境" value="O"></el-option>
              <el-option label="A - 全部" value="A"></el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="人员类别"
          width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.PERSONNELTYPE" placeholder="请选择" v-verify.input.blur="{regs:'required',submit:'demo'}" size="mini" filterable clearable class="table-select">
              <el-option label="0 - 中国内地人" value="0"></el-option>
              <el-option label="1 - 中国港澳台" value="1"></el-option>
              <el-option label="2 - 外国人" value="2"></el-option>
              <el-option label="3 - 全部" value="3"></el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="规则名称"
          width="160">
          <template slot-scope="scope">
            <el-input v-model="scope.row.RULEDESC" v-verify.input.blur="{regs:'required',submit:'demo',mode:'insert'}" size="mini" class="table-select"></el-input>
         </template>
        </el-table-column>
        <el-table-column
          label="字段名称"
          width="140">
          <template slot-scope="scope">
            <el-select v-model="scope.row.FIELDNAME" v-verify.input.blur="{regs:'required',submit:'demo'}" filterable clearable @visible-change="codeName(scope.row.FIELDNAME,scope.row)" @change="inputMode(scope.row.FIELDNAME,scope.row)" placeholder="请选择"  size="mini" class="table-select">
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
          label="运算符"
          width="120">
          <template slot-scope="scope">
            <el-select v-model="scope.row.OPERATORCHARACTER" v-verify.input.blur="{regs:'required',submit:'demo'}" placeholder="请选择" filterable clearable size="mini" class="table-select" v-show="dateShow==1">
              <el-option label="等于" value="0"></el-option>
              <el-option label="大于" value="1"></el-option>
              <el-option label="小于" value="2"></el-option>
              <el-option label="包含" value="3"></el-option>
              <el-option label="不包含" value="4"></el-option>
            </el-select>
            <el-select v-model="scope.row.OPERATORCHARACTER" v-verify.input.blur="{regs:'required',submit:'demo'}" placeholder="请选择" filterable clearable size="mini" class="table-select" v-show="dateShow==2">
              <el-option label="等于" value="0"></el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="取值"
          width="150">
          <template slot-scope="scope">
            <el-select v-model="scope.row.VALUE" placeholder="请选择" v-verify.input.blur="{regs:'required',submit:'demo'}" size="mini" filterable clearable class="table-select" v-show="show==1">
              <el-option label="当前系统时间" value="sysdate"></el-option>
              <el-option label="一个月" value="sysdate+30"></el-option>
              <el-option label="两个月" value="sysdate+60"></el-option>
              <el-option label="三个月" value="sysdate+90"></el-option>
              <el-option label="六个月" value="sysdate+180"></el-option>
              <el-option label="九个月" value="sysdate+270"></el-option>
              <el-option label="一年" value="sysdate+360"></el-option>
            </el-select>
            <el-input placeholder="请输入内容" size="small" class="table-select" v-verify.input.blur="{regs:'required',submit:'demo'}" v-model="scope.row.VALUE" v-show="show==2"></el-input>
         </template>
        </el-table-column>
        <el-table-column
          label="反馈结果"
          width="180">
          <template slot-scope="scope">
            <el-select v-model="scope.row.CHECKRESULT" v-verify.input.blur="{regs:'required',submit:'demo'}" placeholder="请选择" filterable clearable size="mini" class="table-select" @change="inschange(scope.row)">
              <el-option label="1Z - 禁止打印登机牌" value="1Z"></el-option>
              <el-option label="2Z - 请再次核对" value="2Z"></el-option>
              <el-option label="4Z - 数据错误" value="4Z"></el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="反馈结果描述"
          width="300">
          <template slot-scope="scope">
            <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" v-verify.input.blur="{regs:'required',submit:'demo'}" placeholder="请输入内容" size="small" class="table-select" v-model="scope.row.RESPONSERESULT" maxlength="100"></el-input>
         </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="130">
          <template slot-scope="scope">
            <el-select v-model="scope.row.STATUS" v-verify.input.blur="{regs:'required',submit:'demo'}" placeholder="请选择" filterable clearable size="mini" class="table-select">
              <el-option label="0 - 停用" value="0"></el-option>
              <el-option label="1 - 启用" value="1"></el-option>
            </el-select>
         </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="130"
          fixed="right">
          <template slot-scope="scope">
            <div>
             <el-button class="table-btn" size="mini" plain icon="el-icon-delete" @click="deleteTableList(scope.$index,scope.row)">删除</el-button>
           </div>
         </template>
        </el-table-column>

      </el-table>
      <div class="middle-foot">
        <div class="page-msg">
          <div class="">
            共{{count}}条数据
          </div>
        </div>
      </div>
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
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div> -->
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
      count:0,
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

      ],
      modelTable:{
        "IODIR": "",
        "PERSONNELTYPE": "",
        "RULEDESC": '',
        "FIELDNAME": "",
        "OPERATORCHARACTER": "",
        "VALUE": '',
        "CHECKRESULT": "2Z",
        "RESPONSERESULT":'',
        "STATUS": "1",
        "FIELDTYPE":'',
        "CTLTYPE":'U'
      },
      cleanTable:{
        "IODIR": "",
        "PERSONNELTYPE": "",
        "RULEDESC": '',
        "FIELDNAME": "",
        "OPERATORCHARACTER": "",
        "VALUE": '',
        "CHECKRESULT": "2Z",
        "RESPONSERESULT":'',
        "STATUS": "1",
        "FIELDTYPE":'',
        "CTLTYPE":'U'
      },
      multipleSelection:[],
      code:[],
      show:1,
      dateShow:1,
      operatorData:[]
    }
  },
  mounted() {
    this.codeName();
    this.getList(this.pd);
  },
  activated(){
    this.getList(this.pd);
  },
  methods:{
    inschange(n) {
      var content = "";
      if (n.CHECKRESULT == "0Z") {
        content = "OK TO BOARD";
      } else if (n.CHECKRESULT == "1Z") {
        content = "NO BOARD";
      } else if (n.CHECKRESULT == "2Z") {
        content = "CHECK AGAIN";
      } else if (n.CHECKRESULT == "4Z") {
        content = "DATA ENTRY ERROR";
      }
      n.RESPONSERESULT = content;
    },
    // handleSelectionChange(val) {
    //    this.multipleSelection = val;
    //  },
    //  pageSizeChange(val) {
    //    this.getList(this.CurrentPage,val,this.pd);
    //    console.log(`每页 ${val} 条`);
    //  },
    //  handleCurrentChange(val) {
    //    this.getList(val,this.pageSize,this.pd);
    //    console.log(`当前页: ${val}`);
    //  },
     getList(pd){
       let p={
       	// "currentPage":currentPage,
       	// "showCount":showCount,
       	"pd":pd
       };
       this.$api.post('/manage-platform/ruleConfig/getRuleConfigList',p,
        r => {
          this.tableData=r.data;
          // this.TotalResult=r.data.totalResult;
          this.count = this.tableData.length;
          // this.allData = this.tableData;
       })
     },
     addTableList(){//新增
       this.count++;
       this.modelTable={
         "IODIR": "",
         "PERSONNELTYPE": "",
         "RULEDESC": '',
         "FIELDNAME": "",
         "OPERATORCHARACTER": "",
         "VALUE": '',
         "CHECKRESULT": "2Z",
         "RESPONSERESULT":'',
         "STATUS": "1",
         "FIELDTYPE":'',
         "CTLTYPE":'U'
       }
       this.modelTable.CTLTYPE='I';
       this.tableData.push(this.modelTable);
       console.log(this.tableData);
       // this.modelTable = this.cleanTable;
       // this.allDate = this.tableData;
       // console.log(this.allDate)
     },
     deleteTableList(id,item){//删除本行
       this.$confirm('删除操作将同步更新至校验比对区内存数据库, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.count--;
         item.CTLTYPE='D';
         let d = item;
         let before = this.tableData.length;
         this.tableData.splice(id,1);
         let after = this.tableData.length;
         this.operatorData.push(d);
         if(before > after){
           this.$message({
             type: 'success',
             message: '更新成功!'
           });
         }else{
           this.$message({
             type: 'success',
             message: '更新失败!'
           });
         }
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         });
       });

     },
     save(){
       const result = this.$validator.verifyAll('demo')
       console.log(result);
        if (result.indexOf(false) > -1) {
          return
        }
       let p = this.tableData.concat(this.operatorData);
       this.$api.post('/manage-platform/ruleConfig/addRuleConfigAll',p,
        r => {
          console.log(r);
          if(r.success == false){
            this.$message.error(r.message);
          }else{
            this.operatorData = [];
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.getList(this.pd);
          }
       })

     },
     codeName(name,codeRow){//字段名称的接口

       this.$api.post('/manage-platform/ruleConfig/getRuleConfigFieldNameList/0',{},
        r => {
          console.log(r);
          if(r.success){
            this.code = r.data
            for(var i=0;i<this.code.length;i++){
              if(this.code[i].FIELDNAME == name){
                codeRow.FIELDTYPE = this.code[i].FIELDTYPE;
              }
            }
          }
       })
     },
     inputMode(item,rowBase){
       console.log(item);
       this.$set(rowBase,'VALUE','');
       this.$set(rowBase,'OPERATORCHARACTER','');
       for(var i=0;i<this.code.length;i++){
         if(this.code[i].FIELDTYPE==5){
           this.show=1;
           this.dateShow=1;
         }else{
           this.show=2;
           this.dateShow=2;
         }
       }

     }

  }
}
</script>

<style scoped>

</style>
<style media="screen">
.t-table .el-table__body-wrapper{
  overflow-y: auto;
}
.el-table__body{
    table-layout:auto !important;
}
.mt-26{
  margin-top: 26px!important;
}
.el-message-box{
  width:430px!important;
}
/* .example-error{
  font-size: 12px;
    color: rgb(51, 51, 51);
    position: absolute;
    top: 0px!important;
    left: 0px!important;
    background-color: rgb(255, 255, 255);
    padding: 2px 8px;
    margin: 0px;
    z-index: 99;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;
    border-radius: 4px;
    left: unset!important;
    right: -73px!important;
    color: red!important;
    padding: 6px!important;
}
.example-error b{
    position: absolute;
    left: -6px!important;
    bottom: 14px!important;
    width: 8px;
    height: 8px;
    display: block;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    transform: rotateZ(133deg)!important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background-color: rgb(255, 255, 255);
} */
.cell{
  overflow: visible!important;
}
</style>
