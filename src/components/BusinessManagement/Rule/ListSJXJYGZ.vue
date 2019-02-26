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
                <span class="input-text">规则状态：</span>
                <el-select v-model="pd.STATUS" placeholder="请选择" filterable clearable  size="small" class="input-input">
                  <el-option label="0 - 停用" value="0"></el-option>
                  <el-option label="1 - 启用" value="1"></el-option>
                </el-select>
              </el-col>

              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">人员类别：</span>
                <el-select v-model="pd.PERSONNELTYPE" placeholder="请选择" filterable clearable size="small" class="input-input">
                  <el-option label="0 - 中国内地人" value="0"></el-option>
                  <el-option label="1 - 中国港澳台" value="1"></el-option>
                  <el-option label="2 - 外国人" value="2"></el-option>
                  <el-option label="3 - 全部" value="3"></el-option>
                </el-select>
              </el-col>

            </el-row>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="success" class="mt-26" size="small" @click="getList(pd);V.$reset('demo1');">查询</el-button>
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
        style="width: 100%;"
        class="tableSj o-table3 tableJY"
        @sort-change='sortChange'
        @header-click="headerClick">
        <el-table-column
          prop="IODIR"
          sortable='custom'
          label="出入境方向"
          width="120">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo1" data-name="IODIR" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.IODIR" placeholder="请选择" filterable clearable size="mini" class="table-select">
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
          sortable='custom'
          width="150">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo1" data-name="PERSONNELTYPE" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.PERSONNELTYPE" placeholder="请选择" filterable clearable size="mini" class="table-select">
                <el-option label="0 - 中国内地人" value="0"></el-option>
                <el-option label="1 - 中国港澳台" value="1"></el-option>
                <el-option label="2 - 外国人" value="2"></el-option>
                <el-option label="3 - 全部" value="3"></el-option>
              </el-select>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="字段名称"
          width="170">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo1" data-name="FIELDNAME" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.FIELDNAME" filterable clearable @visible-change="codeName(scope.row.FIELDNAME)" placeholder="请选择"  size="mini" class="table-select">
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
          prop="MAXLENGTH"
          label="最大长度"
          width="120"
          sortable='custom'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.MAXLENGTH" size="small" class="table-select" @blur="max(scope.row)" @focus="lengthFoc(scope.row.MAXLENGTH)"></el-input>
         </template>
        </el-table-column>
        <el-table-column
          prop="MINLENGTH"
          label="最小长度"
          width="120"
          sortable='custom'>
          <template slot-scope="scope">
            <el-input v-model="scope.row.MINLENGTH" size="small" class="table-select" @blur="min(scope.row)" @focus="lengthFoc(scope.row.MINLENGTH)"></el-input>
         </template>
        </el-table-column>
        <el-table-column
          prop="CHECKRESULT"
          label="反馈结果"
          width="150"
          sortable='custom'>
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo1" data-name="CHECKRESULT" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.CHECKRESULT" filterable clearable placeholder="请选择"  size="mini" class="table-select" @change="inschange(scope.row)">
                <el-option label="1Z-禁止打印登机牌" value="1Z"></el-option>
                <el-option label="2Z-请再次核对" value="2Z"></el-option>
                <el-option label="4Z-数据错误" value="4Z"></el-option>
              </el-select>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="反馈结果描述"
          width="280">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo1" data-name="CHECKREMARK" data-type="textarea"
              v-validate-easy="[['required']]">
              <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 2}" placeholder="请输入内容" size="small" class="table-select" v-model="scope.row.CHECKREMARK" maxlength="100"></el-input>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          prop="INPUT"
          label="限制性"
          width="130"
          sortable='custom'>
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo1" data-name="INPUT" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.INPUT" placeholder="请选择" filterable clearable  size="mini" class="table-select">
                <el-option label="0 - 必填项" value="0"></el-option>
                <el-option label="1 - 选录项" value="1"></el-option>
              </el-select>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          prop="STATUS"
          label="规则状态"
          width="120"
          sortable='custom'>
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo1" data-name="STATUS" data-type="select"
              v-validate-easy="[['required']]">
              <el-select v-model="scope.row.STATUS" placeholder="请选择" filterable clearable size="mini" class="table-select">
                <el-option label="0 - 停用" value="0"></el-option>
                <el-option label="1 - 启用" value="1"></el-option>
              </el-select>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="正则"
          width="100"
          v-if="false">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo1" data-name="REGULAR" data-type="input"
              v-validate-easy="[['required']]">
              <el-input v-model="scope.row.REGULAR" size="small" class="table-select"></el-input>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="时间"
          width="100"
          v-if="false">
          <template slot-scope="scope">
            <div class="my-form-group" data-scope="demo1" data-name="VALIDTIME" data-type="input"
              v-validate-easy="[['required']]">
              <el-input v-model="scope.row.VALIDTIME" size="small" class="table-select"></el-input>
            </div>
         </template>
        </el-table-column>
        <el-table-column
          label="操作" width="70">
          <template slot-scope="scope">
            <div>
              <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" @click="deleteTableList(scope.$index,scope.row)"></el-button>
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

      ],
      modelTable:{
        "IODIR": "",
        "PERSONNELTYPE": "",
        "FIELDNAME": "",
        "MAXLENGTH":'',
        "MINLENGTH":'',
        "CHECKRESULT": "4Z",
        "CHECKREMARK": '',
        "INPUT": "0",
        "STATUS":'1',
        "CTLTYPE":'U',
        "REGULAR":'',
        "VALIDTIME":''
      },
      cleanTable:{
        "IODIR": "",
        "PERSONNELTYPE": "",
        "FIELDNAME": "",
        "MAXLENGTH":'',
        "MINLENGTH":'',
        "CHECKRESULT": "4Z",
        "CHECKREMARK": '',
        "INPUT": "0",
        "STATUS":'1',
        "CTLTYPE":'U',
        "REGULAR":'',
        "VALIDTIME":''
      },
      multipleSelection:[],
      code:[],
      operatorData:[],
      allData:[],
      count:0
    }
  },
  mounted() {
    this.codeName();
    this.V.$reset('demo1');
    this.getList(this.pd);
  },
  activated(){
    this.V.$reset('demo1');
    this.getList(this.pd);

  },
  methods:{
    headerClick(column,event){
      event.target.title=column.label
    },
    sortChange(column, prop, order){
      console.log(column);
      console.log(column.order);
      console.log(column.prop);
      let p={
        'order':column.prop,
        'orderIo':column.order
      }
      this.$api.post('/manage-platform/dataCheck/getDataCheckList',p,
       r => {
         for(var i=0;i<r.data.length;i++){
           if(r.data[i].MAXLENGTH == -1){
             r.data[i].MAXLENGTH = ''
           }
           if(r.data[i].MINLENGTH == -1){
             r.data[i].MINLENGTH = ''
           }
           if(r.data[i].REGULAR == -1){
             r.data.REGULAR = ''
           }
           if(r.data[i].VALIDTIME == -1){
             r.data.VALIDTIME = ''
           }
         }
         this.tableData=r.data;
         this.allData=this.tableData;
         // this.TotalResult=r.data.totalResult;
         this.count = this.tableData.length;
      })
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
      n.CHECKREMARK = content;
    },
     getList(pd){

       this.$api.post('/manage-platform/dataCheck/getDataCheckList',pd,
        r => {
          for(var i=0;i<r.data.length;i++){
            if(r.data[i].MAXLENGTH == -1){
              r.data[i].MAXLENGTH = ''
            }
            if(r.data[i].MINLENGTH == -1){
              r.data[i].MINLENGTH = ''
            }
            if(r.data[i].REGULAR == -1){
              r.data.REGULAR = ''
            }
            if(r.data[i].VALIDTIME == -1){
              r.data.VALIDTIME = ''
            }
          }
          this.tableData=r.data;
          this.allData=this.tableData;
          // this.TotalResult=r.data.totalResult;
          this.count = this.tableData.length;
       })
     },
     addTableList(){//新增
       this.V.$reset('demo1');
       this.count++;
       this.modelTable={
         "IODIR": "",
         "PERSONNELTYPE": "",
         "FIELDNAME": "",
         "MAXLENGTH":'',
         "MINLENGTH":'',
         "CHECKRESULT": "4Z",
         "CHECKREMARK": 'DATA ENTRY ERROR',
         "INPUT": "0",
         "STATUS":'1',
         "CTLTYPE":'U',
         "REGULAR":'',
         "VALIDTIME":''
       };
       this.modelTable.CTLTYPE='I';
       this.tableData.unshift(this.modelTable);
     },
     deleteTableList(id,item){//删除本行
       this.$confirm('删除操作将删除本条数据,保存并发布后将同步更新至校验比对区内存数据库,是否继续?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.V.$reset('demo1');
         this.count--;
         item.CTLTYPE='D';
         let d = item;
         this.tableData.splice(id,1);
         this.operatorData.push(d);
         // this.allData = this.tableData.concat(this.operatorData);
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         });
       });

     },
     save(){
       this.V.$submit('demo1', (canSumit,data) => {
         if(!canSumit) return
         let p = this.tableData.concat(this.operatorData);
         this.$api.post('/manage-platform/dataCheck/addDataCheck',p,
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
       })
     },
     codeName(name){//字段名称的接口
       this.$api.post('/manage-platform/dataCheck/getDataCheckFieldNameList',{},
        r => {
          if(r.success){
            this.code = r.data
          }
       })

     },
     max(item){
       for(var i=0;i<this.code.length;i++){
         if(item.FIELDNAME == this.code[i].FIELDNAME){
           if(this.code[i].FMAXVALUE != -1){
             if(item.MAXLENGTH>this.code[i].FMAXVALUE){
               this.$message({
                 type: 'warning',
                 message: '最大值不能大于'+this.code[i].FMAXVALUE+'!'
               });
             }
           }
         }
       }
     },
     min(item){
       for(var i=0;i<this.code.length;i++){
         if(item.FIELDNAME == this.code[i].FIELDNAME){
           if(this.code[i].FMINVALUE != -1){
             this.$message({
               type: 'warning',
               message: '最小值不能小于'+this.code[i].FMINVALUE+'!'
             });
           }
         }
       }
     },
     lengthFoc(item){
       // if(item == undefined||item == ''){
       //   this.$message({
       //     type: 'warning',
       //     message: '此项留空则系统不做校验处理'
       //   });
       // }
     }
  }
}
</script>

<style scoped>

</style>
<style media="screen">
.t-table .el-table__body-wrapper{
  max-height: 466px;
  overflow-y: auto;
}
.mt-26{
  margin-top: 26px!important;
}
.tableSj .cell{
  overflow: visible!important;
}
.example-error{
  padding: 9px!important;
}
.tableJY .err__msg{
  top: 17px!important;
  z-index: 999;
}
</style>
