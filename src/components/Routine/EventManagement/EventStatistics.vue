<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <!-- <section></section> -->
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">登记人姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.NAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">登记人账号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.USERNAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">来源人姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.SOURCENAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">来源人电话：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.SOURCEPHONE"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">交接人姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.HANDOVERNAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">交接人账号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.HANDOVERLOGIN"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">事件标题：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.TITLE"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">事件登记时间：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="cdt.STARTRECORDTIME"
               type="datetime" size="small"
               placeholder="开始时间"
               format="yyyy-MM-dd HH:mm:ss"
               value-format="yyyyMMddHHmmss">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="cdt.ENDRECORDTIME"
                type="datetime" size="small"
                placeholder="结束时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyyMMddHHmmss">
            </el-date-picker>
          </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" >
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,cdt,order,direction)" class="mb-15">查询</el-button>
          <el-button type="primary" plain size="small" @click="reset">重置</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-button type="success"  class="mb-9" size="small" name="sjlb_export" @click="tableDown">导出</el-button>
      <el-table
        ref="sort"
        :data="tableData"
        border
        style="width: 100%;"
        class="o-table3"
        @header-click="headerClick"
        @sort-change='sortChange'>
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
        <el-table-column
          prop="TITLE"
          label="标题"
          width="80px"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="NAME"
          label="登记人姓名"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="USERNAME"
          label="登记人账号"
          width="100px"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="SOURCENAME"
          label="来源人姓名"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="SOURCEPHONE"
          label="来源人电话"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="HANDOVERNAME"
          label="交接人姓名"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="RECORDTIMESTR"
          label="事件时间"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="TYPE"
          label="事件来源"
          sortable='custom'>
          <template slot-scope="scope">
            {{scope.row.TYPE|fifter1}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button type="text"  class="a-btn"  title="交接"  icon="el-icon-edit-outline" name="sjlb_duty" @click="change(scope.row.SERIAL)"></el-button>
            <el-button type="text"  class="a-btn"  title="详情"  icon="el-icon-tickets" name="sjlb_detail" @click="details(scope.row)"></el-button>
            <el-button type="text"  class="a-btn"  title="删除"  icon="el-icon-delete" name="sjlb_del" @click="deletes(scope.row)"></el-button>
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
    <el-dialog
      title="交接班"
      :visible.sync="changeDialogVisible"
      width="1000px"
      >
      <el-row align="center" style="width:100%">
        <h4 style="margin-top:0px!important">请选择接下来要交接的人</h4>
        <el-radio-group v-model="qqq">
          <el-radio v-for="(item,ind) in dutyName" :key="ind" :label="item.SERIAL" style="width:25%;margin-bottom: 7px;">{{item.EMPLOYEE_CARD+' - '+item.NAME}}</el-radio>
        </el-radio-group>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeSave" size="small" type="primary">确 定</el-button>
        <el-button @click="changeDialogVisible = false" size="small">返 回</el-button>
      </div>
    </el-dialog>

    <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="700px">
      <el-form :model="form" ref="addForm" style="font-size:16px">
        <div id="printMe">
          <el-row type="flex"  class="mb-30" justify="center">
            <el-col :span="24"><div class="tt-title">{{form.title}}</div></el-col>
          </el-row>
          <el-row class="mb-6 fz-16" style="padding: 0px 10px 0px 5.5%;">
            <el-col :span="12" class="t-el-content mb-9"><div class="t-el-text">登记人姓名：</div><div class="t-el-sub">{{form.NAME}}</div></el-col>
            <el-col :span="12" class="t-el-content mb-9"><div class="t-el-text">登记人账号：</div><div class="t-el-sub">{{form.USERNAME}}</div></el-col>
            <el-col :span="12" class="t-el-content mb-9"><div class="t-el-text">来源人姓名：</div><div class="t-el-sub">{{form.SOURCENAME}}</div></el-col>
            <el-col :span="12" class="t-el-content mb-9"><div class="t-el-text">来源人电话：</div><div class="t-el-sub">{{form.SOURCEPHONE}}</div></el-col>
            <el-col :span="12" class="t-el-content mb-9"><div class="t-el-text">交接人姓名：</div><div class="t-el-sub">{{form.HANDOVERNAME}}</div></el-col>
            <el-col :span="12" class="t-el-content mb-9"><div class="t-el-text">交接时间：</div><div class="t-el-sub">{{form.HANDOVERTIMESTR}}</div></el-col>
            <el-col :span="12" class="t-el-content mb-9"><div class="t-el-text">事件时间：</div><div class="t-el-sub">{{form.RECORDTIMESTR}}</div></el-col>
            <el-col :span="12" class="t-el-content mb-9"><div class="t-el-text">事件来源：</div><div class="t-el-sub">{{form.TYPE}}</div></el-col>
            <el-col :span="22" class="t-el-content mb-9"><div class="t-el-text">事件描述：</div><div class="t-el-sub t-w" style="text-align:justify">{{form.content}}</div></el-col>
            <!-- <el-col :span="12" class="input-item">
              <span class="yy-input-text" style="width:27%!important">标题：</span>
              <el-input placeholder="请输入姓名" size="small" v-model="form.title"  class="yy-input-input" :disabled="true"></el-input>
            </el-col> -->
          </el-row>
        </div>

        <!-- <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text widthText">事件描述：</span>
            <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 6, maxRows: 12}" v-model="form.content" class="yy-input-input widthContent" :disabled="true"></el-input>
          </el-col>
        </el-row> -->
        <el-row class="mb-6">
          <el-col :span="12" class="input-item">
            <span class="yy-input-text fz-16" style="width:24%!important;">附件：</span>
            <el-button size="mini" class="table-btn fz-16"><a :href="fitAdress" class="acolor">附件下载</a></el-button>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">返 回</el-button>
        <el-button v-print="'#printMe'" size="small" type="primary">打 印</el-button>
        <!-- <el-button @click="getPdf(0)" size="small" type="primary">打 印</el-button> -->
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {

  data() {
    return {
      order:'',
      direction:0,
      htmlTitle: '页面导出PDF文件名',
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      cdt:{},
      dutyName:[],
      nation: [],
      company:[],
      addDialogVisible: false,
      detailsDialogVisible: false,
      changeDialogVisible:false,
      qqq:'',
      fitAdress:'',
      changeRow:[],
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
      form: {},
    }
  },
  mounted() {
    // this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
    this.queryNationality();
  },
  activated(){
    this.btnctlFn(this.$root.checkItem);
  },
  methods: {
    sortChange(column, prop, order){
      column.order=='ascending'?this.direction=1:this.direction=0;
      this.order=column.prop;
      this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
    },
    reset(){
      this.cdt={};
      this.$nextTick(()=>{
        let sortArr = this.$refs.sort.$children
        for(var i=0;i<sortArr.length;i++){
          if(sortArr[i].columnConfig&&sortArr[i].columnConfig.order){
            sortArr[i].columnConfig.order = ''
            return false
          }
        }
      })
      this.direction=0;
      this.orders="";
      this.CurrentPage=1;
      this.pageSize=10;
      this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList(this.CurrentPage, val, this.cdt,this.order,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.getList(val, this.pageSize, this.cdt,this.order,this.direction);
      this.CurrentPage = val;
      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd,order,direction) {
      // const result = this.$validator.verifyAll('timeDemo')
      //  if (result.indexOf(false) > -1) {
      //    return
      //  }
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd,
        "order":order,
        "direction":direction
      };
      this.$api.post('/manage-platform/incident/queryListPage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
          this.$nextTick(()=>{
            this.btnctlFn(this.$root.checkItem);
          })
        })
    },
    nameMethod(){//姓名
      this.$api.post('/manage-platform/watch/queryUserAll',{},
        r => {
            if(r.success){
              this.dutyName = r.data;
            }
        })
    },
    change(i){
      this.nameMethod();
      this.changeDialogVisible = true;
      this.changeRow = i;
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryAircompanyList', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data;
          }
        })
    },
    changeSave(){//交接保存
      var name="";
      for(var i=0;i<this.dutyName.length;i++){
        if(this.dutyName[i].SERIAL == this.qqq){
          name = this.dutyName[i].NAME;
        }
      }
      let p={
        'SERIAL':this.changeRow,
        'HANDOVERLOGIN':this.qqq,
        'HANDOVERNAME':name
      }
      this.$api.post('/manage-platform/incident/handover', p,
        r => {
          if (r.success) {
            this.$message({
              message: '恭喜你，交接成功！',
              type: 'success'
            });
          }
          this.changeDialogVisible = false;
          console.log(this.CurrentPage);
          this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
        })
    },

    details(i) {
      this.detailsDialogVisible = true;
      this.form.title=i.TITLE;
      this.form.content=i.INCIDENTDESC;
      this.fitAdress = i.FILESERIAL;
      this.form.NAME=i.NAME;
      this.form.USERNAME=i.USERNAME;
      this.form.SOURCENAME=i.SOURCENAME;
      this.form.SOURCEPHONE=i.SOURCEPHONE;
      this.form.HANDOVERNAME=i.HANDOVERNAME;
      this.form.RECORDTIMESTR=i.RECORDTIMESTR;
      this.form.HANDOVERTIMESTR=i.HANDOVERTIMESTR;
      this.form.TYPE=this.fifterZ(i.TYPE);
    },
    downloadM (data) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', format(new Date(),'yyyy-MM-dd hh:mm:ss')+'.xlsx')
        document.body.appendChild(link)
        link.click()
    },
    tableDown(){
      axios({
       method: 'post',
       // url: 'http://192.168.99.245:8081/manage-platform/incident/exportListPage',
       url: this.$api.rootUrl+"/manage-platform/incident/exportListPage",
       data: {
         "currentPage": 1,
         "showCount": 600,
         "cdt": this.cdt
       },
       responseType: 'blob'
       }).then(response => {
           this.downloadM(response)
       });
    },
    deletes(i) {
      this.$confirm('您是否确认删除本条数据？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let p = {
          'serial':i.SERIAL
        }
        this.$api.post('/manage-platform/incident/delete',p,
          r => {
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
              this.getList(this.CurrentPage, this.pageSize, this.cdt,this.order,this.direction);
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
    fifterZ(val){
      if (val == 1) {
        return "上级通知";
      } else if(val == 2){
        return "电话来电";
      } else if(val == 3){
        return "信件"
      }
    }
  },

    filters: {
      fifter1(val) {
        if (val == 1) {
          return "上级通知";
        } else if(val == 2){
          return "电话来电";
        } else if(val == 3){
          return "信件"
        }
      },
    }
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
.widthText{
  width: 14%!important;
}
.widthContent{
  width: 80%!important;
}
</style>
