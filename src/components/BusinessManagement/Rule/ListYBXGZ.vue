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
                <span class="input-text">出入标识：</span>
                <el-select v-model="pd.IODIR" placeholder="请选择" filterable clearable size="small" class="input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
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
            <el-button type="success" class="mt-26" size="small" @click="getList(pd);V.$reset('demo')">查询</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle t-table" @mouseover="mouseHeader">
      <el-row class="mb-15">
        <el-button type="primary" size="small" name="ybxgzgl_add" @click="addTableList">新增</el-button>
        <el-button type="success" size="small" name="ybxgzgl_save" @click="save">保存并发布</el-button>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%"
        max-height="466"
        class="tableYbxgz o-table3 tableJY"
        @sort-change='sortChange'
        @header-click="headerClick">
        <el-table-column
          prop="IODIR"
          label="出入境方向"
          sortable='custom'
          width="130">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo" data-name="IODIR" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.IODIR" placeholder="请选择" size="mini" filterable clearable class="table-select">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <el-option label="A - 入出境" value="A"></el-option>
              </el-select>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          prop="PERSONNELTYPE"
          label="人员类别"
          width="150"
          sortable='custom'>
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo" data-name="PERSONNELTYPE" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.PERSONNELTYPE" placeholder="请选择" size="mini" filterable clearable class="table-select">
                <el-option label="0 - 中国内地人" value="0"></el-option>
                <el-option label="1 - 中国港澳台" value="1"></el-option>
                <el-option label="2 - 外国人" value="2"></el-option>
                <el-option label="3 - 全部" value="3"></el-option>
              </el-select>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="规则名称"
          width="160">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo" data-name="RULEDESC" data-type="input"
              v-validate-easy="[['required']]">
              <el-input v-model="scope.row.RULEDESC" size="mini" class="table-select"></el-input>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="字段名称"
          width="140">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo" data-name="FIELDNAME" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.FIELDNAME" filterable clearable @visible-change="codeName(scope.row.FIELDNAME,scope.row)" @change="inputMode(scope.row.FIELDNAME,scope.row)" placeholder="请选择"  size="mini" class="table-select">
                <el-option
                v-for="item in code"
                :key="item.FIELDNAME"
                :value="item.FIELDNAME"
                :label="item.FIELDDES">
                </el-option>
              </el-select>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          prop="OPERATORCHARACTER"
          label="运算符"
          width="120"
          sortable='custom'>
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo" data-name="OPERATORCHARACTER" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.OPERATORCHARACTER" placeholder="请选择" filterable clearable size="mini" class="table-select" v-show="dateShow==1">
                <el-option label="等于" value="0"></el-option>
                <el-option label="大于" value="1"></el-option>
                <el-option label="小于" value="2"></el-option>
                <el-option label="包含" value="3"></el-option>
                <el-option label="不包含" value="4"></el-option>
              </el-select>
              <el-select v-model="scope.row.OPERATORCHARACTER" placeholder="请选择" filterable clearable size="mini" class="table-select" v-show="dateShow==2">
                <el-option label="等于" value="0"></el-option>
              </el-select>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="取值"
          width="150">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo" data-name="VALUE" data-type="select"
              v-validate-easy="[['required']]" v-show="show==1">
              <el-select v-model="scope.row.VALUE" placeholder="请选择" size="mini" filterable clearable class="table-select">
                <el-option label="当前系统时间" value="sysdate"></el-option>
                <el-option label="一个月" value="sysdate+30"></el-option>
                <el-option label="两个月" value="sysdate+60"></el-option>
                <el-option label="三个月" value="sysdate+90"></el-option>
                <el-option label="六个月" value="sysdate+180"></el-option>
                <el-option label="九个月" value="sysdate+270"></el-option>
                <el-option label="一年" value="sysdate+360"></el-option>
              </el-select>
            </div>
            <div class="my-form-group" data-scope="demo" data-name="VALUE" data-type="input"
              v-validate-easy="[['required']]" v-show="show==2">
              <el-input placeholder="请输入内容" size="small" class="table-select" v-model="scope.row.VALUE"></el-input>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          prop="CHECKRESULT"
          label="反馈结果"
          width="180"
          sortable='custom'>
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo" data-name="CHECKRESULT" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.CHECKRESULT" placeholder="请选择" filterable clearable size="mini" class="table-select" @change="inschange(scope.row)">
                <el-option label="1Z - 禁止打印登机牌" value="1Z"></el-option>
                <el-option label="2Z - 请再次核对" value="2Z"></el-option>
                <el-option label="4Z - 数据错误" value="4Z"></el-option>
              </el-select>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="反馈结果描述"
          width="300">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo" data-name="RESPONSERESULT" data-type="textarea"
              v-validate-easy="[['required']]">
              <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="请输入内容" size="small" class="table-select" v-model="scope.row.RESPONSERESULT" maxlength="100"></el-input>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="130">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo" data-name="STATUS" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.STATUS" placeholder="请选择" filterable clearable size="mini" class="table-select">
                <el-option label="0 - 停用" value="0"></el-option>
                <el-option label="1 - 启用" value="1"></el-option>
              </el-select>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="70">
          <template slot-scope="scope">
            <div>
             <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" name="ybxgzgl_del" @click="deleteTableList(scope.$index,scope.row)"></el-button>
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
    this.V.$reset('demo');
    this.getList(this.pd);
  },
  activated(){
    this.V.$reset('demo');
    this.getList(this.pd);
  },
  methods:{
    headerClick(column,event){
      event.target.title=column.label
    },
    sortChange(column, prop, order){
      // console.log(column);
      // console.log(column.order);
      // console.log(column.prop);
      let p={
        'order':column.prop,
        'orderIo':column.order
      }
      this.$api.post('/manage-platform/ruleConfig/getRuleConfigList',p,
       r => {
         this.tableData=r.data;
         this.count = this.tableData.length;
      })
    },
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
       this.$api.post('/manage-platform/ruleConfig/getRuleConfigList',pd,
        r => {
          if(r.success){
            this.tableData=r.data;
            // this.TotalResult=r.data.totalResult;
            this.count = this.tableData.length;
            // this.allData = this.tableData;
            console.log(this.tableData)
          }

       })
     },
     addTableList(){//新增
       this.V.$reset('demo');
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
       this.tableData.unshift(this.modelTable);
       console.log(this.tableData)
     },
     deleteTableList(id,item){//删除本行
       this.$confirm('删除操作将删除本条数据,保存并发布后将同步更新至校验比对区内存数据库, 是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.V.$reset('demo1');
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
       this.V.$submit('demo', (canSumit,data) => {
         if(!canSumit) return
         let p = this.tableData.concat(this.operatorData);
         this.$api.post('/manage-platform/ruleConfig/addRuleConfigAll',p,
          r => {
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
/* .t-table .el-table__body-wrapper{
  overflow-y: auto;
} */
.mt-26{
  margin-top: 26px!important;
}
.tableYbxgz .cell{
  overflow: visible!important;
}
.tableJY .err__msg{
  top: 17px!important;
  z-index: 999;
}
</style>
