<template lang="html">
  <div class="ryssjk">
    <div class="top mb-6">
      <el-row :gutter="2" class="pr-20">
        <el-col :sm="24" :md="12" :lg="8" class="input-item">
          <span class="input-text">航班号：</span>
          <el-input v-model="pd.fltNo" @blur="getList(CurrentPage,pageSize,pd)" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
        </el-col>

        <el-col :sm="24" :md="12"  :lg="8" class="input-item">
          <span class="input-text">出入标识：</span>
          <el-select v-model="pd.iOType"  @change="getList(CurrentPage,pageSize,pd)" placeholder="请选择"  size="small" clearable filterable class="block input-input">
            <el-option label="I - 入境" value="I"></el-option>
            <el-option label="O - 出境" value="O"></el-option>
            <el-option label="A - 入出境" value="A"></el-option>
          </el-select>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
          <span class="input-text">值机日期：</span>
          <div class="input-input t-flex t-date">
            <el-date-picker
             type="date" size="small"
             :editable="false"
             :clearable="false"
             @change="getList(CurrentPage,pageSize,pd)"
             v-model="pd.fltDateFr"
             value-format="yyyyMMdd"
             placeholder="开始时间" >
            </el-date-picker>
            <span class="septum">-</span>
            <el-date-picker
              type="date" size="small"
              :editable="false"
              :clearable="false"
              @change="getList(CurrentPage,pageSize,pd)"
              v-model="pd.fltDateTo"
              value-format="yyyyMMdd"
              placeholder="结束时间">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="middle mb-6">
      <div class="middle-tab">
        <div class="middle-tab-item hand" :class="{'middle-checked':pd.type==0}" @click="pd.type=0;getList(CurrentPage,pageSize,pd)">
          预检人员
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':pd.type==1}" @click="pd.type=1;getList(CurrentPage,pageSize,pd)">
          不准登机人员
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':pd.type==2}" @click="pd.type=2;getList(CurrentPage,pageSize,pd)">
          重点人员
        </div>
      </div>
      <div class="middle-tab-content">
        <el-button type="success"  icon="el-icon-refresh" size="small" class="mb-9 mr-15" @click="getList(CurrentPage,pageSize,pd)">刷新</el-button>
        <el-checkbox v-model="checked">自动刷新</el-checkbox>
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            label="姓名"
            prop="name"
            sortable
            width="110">
          </el-table-column>
          <el-table-column
            label="性别"
            prop="gender"
            width="80">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.gender=='F'">女</span>
                <span v-if="scope.row.gender=='M'">男</span>
                <span v-if="scope.row.gender=='U'">未知</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="出生日期"
            prop="birthDay"
            sortable
            width="160">
          </el-table-column>
          <el-table-column
            label="国籍"
            prop="nationalityName"
            sortable
            width="80">
          </el-table-column>
          <el-table-column
            label="出入标识"
            width="110">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.ioType=='I'">入境</span>
                <span v-if="scope.row.ioType=='O'">出境</span>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="旅客类别"
            prop="name"
            width="80">
          </el-table-column>
          <el-table-column
            label="值机状态"
            prop="name"
            width="120">
          </el-table-column>
          <el-table-column
            label="值机时间"
            prop="name"
            width="120">
          </el-table-column> -->
          <el-table-column
            label="证件种类"
            prop="cardTypeName"
            width="110">
          </el-table-column>
          <el-table-column
            label="证件号码"
            prop="passportNo"
            sortable
            width="150">
          </el-table-column>
          <el-table-column
            label="签证类别"
            prop="visaTypeName">
          </el-table-column>
          <el-table-column
            label="航班号"
            prop="fltno"
            sortable>
          </el-table-column>
          <el-table-column
            label="航班时间"
            prop="fltDate"
            width="180"
            sortable>
          </el-table-column>
          <el-table-column
            label="是否非法载运人员"
            prop="illegalMan"
            sortable>
          </el-table-column>
          <el-table-column
            label="是否重点关注人员"
            prop="focusMan"
            sortable>
          </el-table-column>
          <!-- <el-table-column
            label="操作">
          </el-table-column> -->
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
    <div class="down ry3">
      <div class="title-grey">
        人员监控列表
      </div>
      <el-table
        :data="tableData2"
        style="width: 451px"
        class="table2"
        border>
        <el-table-column
          label="姓名"
          prop="name"
          width="110">
        </el-table-column>
        <el-table-column
          label="证件号码"
          prop="passno"
          width="200">
        </el-table-column>
        <el-table-column
          label="国籍"
          prop="nationality"
          width="80">
        </el-table-column>
        <el-table-column
          label="操作"
          width="60">
          <template slot-scope="scope">
            <el-button type="text" class="a-btn" icon="el-icon-delete"  title="删除" @click="delMonitorPerson(scope.row.serial)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="success" size="mini" class="addbtn" @click="addDialogVisible=true">添加</el-button>

    </div>
    <el-dialog title="列表追加" :visible.sync="addDialogVisible" width="640px" :before-close="handleClose">
      <el-form :model="addform" ref="addForm" label-width="100px" style="width:520px">
          <el-form-item label="姓名：" prop="name">
            <el-input placeholder="请输入内容" size="small" v-model="addform.name" auto-complete="off" style="display:none"></el-input>
            <el-input placeholder="请输入内容" size="small" v-model="addform.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="证件号码：" prop="passno">
            <el-input placeholder="请输入内容" size="small" v-model="addform.passno" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="国籍：" prop="nationality">
            <!-- <el-input placeholder="请输入内容" size="small" v-model="addform.nationality" auto-complete="off"></el-input> -->
            <el-select v-model="addform.nationality" placeholder="请选择"  size="small" clearable filterable style="width:100%">
              <el-option
                v-for="item in nationAlone"
                :key="item.CODE"
                :label="item.CODE+' - '+item.CNAME"
                :value="item.CODE">
              </el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMonitorPerson" size="small">确认</el-button>
        <el-button type="warning" @click="cancelAdd" size="small">取消</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from '@/assets/js/date.js'

export default {
  data(){
    return{
      tableData:null,
      tableData2:null,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:{type:'0',fltDateFr:'',fltDateTo:''},
      airport:null,
      nationAlone:null,
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
      checked:true,
      addDialogVisible:false,
      addform:{}
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    // this.queryAirport();
    this.queryNationalityAlone();
  },
  activated(){
    let end = new Date();
    let begin = new Date(end - 24*60*60*1000);
    this.pd.fltDateFr= formatDate(begin, 'yyyyMMdd');
    this.pd.fltDateTo= formatDate(end, 'yyyyMMdd');
    this.getList2();
    this.getList(this.CurrentPage,this.pageSize,this.pd);

    if(this.checked){
      let that=this;
      this.timer=setInterval(function(){
        that.getList(that.CurrentPage,that.pageSize,that.pd);
      },15000)
    }

  },
  deactivated(){
　　clearInterval(this.timer)
  },
  watch:{
    checked:function(val){
      console.log(val)
      if(val){
        let that=this;
        this.timer=setInterval(function(){
          that.getList(that.CurrentPage,that.pageSize,that.pd);
        },15000)
      }else{
        clearInterval(this.timer);
      }
    }
  },
  methods:{
    pageSizeChange(val) {
      this.getList(this.CurrentPage,val,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirportMatch',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
    cancelAdd(){
      this.$refs['addForm'].resetFields();
      this.addDialogVisible=false;
    },
    handleClose(done) {
      this.$refs['addForm'].resetFields();
      done();
    },
    getList(CurrentPage,showCount,pd){
      let p={
        "showCount": showCount,
        "currentPage": CurrentPage,
        "totalResult": this.TotalResult,
        "pd": pd
      }
      this.$api.post('/manage-platform/travelerRealTime/queryRealTimePage',p,
       r => {
         console.log(r)
         this.tableData=r.data.pdList;
         this.TotalResult=r.data.totalResult;
      })
    },
    getList2(){
      this.$api.post('/manage-platform/travelerRealTime/queryMonitorPerson',{},
       r => {
         this.tableData2=r.data;
      })
    },
    addMonitorPerson(){
      this.$api.post('/manage-platform/travelerRealTime/addMonitorPerson',this.addform,
       r => {
         if(r.success){
           this.$message({
             type: 'success',
             message: '添加成功!'
           });
           this.$refs['addForm'].resetFields();
           this.addDialogVisible=false;
           this.getList2();
         }
      })
    },
    delMonitorPerson(serial){
      this.$confirm('确定删除吗?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(() => {
         this.$api.post('/manage-platform/travelerRealTime/delMonitorPerson',{	"serial": serial},
          r => {
            if(r.success){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getList2();
            }
         })

       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         });
       });

    },
  }
}
</script>

<style scoped>
.middle {
  background: none;
  padding: 0;
}
.middle-tab {
  /* width: 252px; */
  display: flex;
}
.middle-tab-item {
  /* width: 33.3%; */
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: #a2ddd7;
  color: #4bc3a0;
  padding: 0 20px;
}
.middle-tab-content{
  background: #fff;
  padding: 15px;
}
.ry3{
  position: relative;
}
.addbtn{
  position: absolute;
  left:475px;
  top:63px
}
</style>
