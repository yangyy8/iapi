<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2 middle">
      <div class="title-green ">
        查询条件
      </div>
      <el-row type="flex" style="height:100%">
        <el-col :span="22" class="br flex-c pr-20">
          <el-row align="center" style="width:50%">
            <el-col :sm="24" :md="12" :lg="12" class="input-item">
              <span class="input-text ttt"><i class="t-must">*</i>值班月份：</span>
              <div class="input-input">
                 <el-date-picker
                 v-model="cdt.TIME"
                 size="small"
                 value-format="yyyyMM"
                 format="yyyy-MM"
                 placeholder="统计月份"
                 class="input-inp"
                 type="month">
                </el-date-picker>
              </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt.NAME"  class="input-input"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="searchD">查询</el-button>
        </el-col>
      </el-row>
      <!-- <el-row type="flex" style="height:100%" v-show="page==1">
        <el-col :span="22" class="br flex-c pr-20">
          <el-row align="center" style="width:50%">
            <el-col :sm="24" :md="12" :lg="12" class="input-item">
              <span class="input-text"><i class="t-must">*</i>值班月份：</span>
              <div class="input-input">
                 <el-date-picker
                 v-verify.input.blur="{regs:'required',submit:'timeDemo2'}"
                 v-model="cdt1.TIME"
                 size="small"
                 value-format="yyyyMM"
                 format="yyyy-MM"
                 placeholder="统计月份"
                 type="month">
                </el-date-picker>
              </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="cdt1.NAME"  class="input-input"></el-input>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,cdt1)">查询</el-button>
        </el-col>
      </el-row> -->
    </div>
    <div class="middle" @mouseover="mouseHeader">
        <span class="tubiao hand borderL wwd" :class="{'checked':page==0}" @click="qq">日历</span><span class="tubiao hand borderR wwd" :class="{'checked':page==1}" @click="page=1">列表</span>
        <el-button type="success" size="mini" name="zbtj_export" @click="tableDown">导出</el-button>
        <div id="div1" v-show="page==1" class="mt-10">
          <el-table
            :data="tableData"
            border
            style="width: 100%;"
            class="o-table3"
            @header-click="headerClick">
            <el-table-column
              label="序号"
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="NAME"
              label="姓名" sortable
              width="140">
            </el-table-column>
            <el-table-column
              prop="USERNAME"
              label="账号" sortable>
            </el-table-column>
            <el-table-column
              prop="DEPT_QC"
              label="部门" sortable>
            </el-table-column>
            <el-table-column
              prop="PHONE"
              label="电话" sortable>
            </el-table-column>
            <el-table-column
              prop="LEADERNAME"
              label="值班领导" sortable>
            </el-table-column>
            <el-table-column
              prop="JOBTIME"
              label="工作时长" sortable>
            </el-table-column>
            <el-table-column
              label="操作" width="70">
              <template slot-scope="scope">
                <el-button type="text"  class="a-btn"  title="详情" plain icon="el-icon-tickets" @click="details(scope.row)"></el-button>
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
        <div id="div2" v-show="page==0" class="mt-10">
          <el-row align="center" type="flex" style="height:100%">
              <el-col :span='24'>
                <el-row align="center" style="width:100%">
                  <el-col v-for="(item,ind) in tableHeader" :key="ind" style="width:14%">
                    <div class="" style="width:100%;border:1px solid #F4F4F4;text-align:center;background-color:#F4F4F4;border-bottom:none!important;font-weight:bold;font-size:14px">
                      {{item}}
                    </div>
                  </el-col>
                </el-row>
                <el-row align="center" style="width:100%">
                  <el-col v-for="(item,ind) in tableBody" :key="ind" style="width:14%">
                    <div class="" style="width:100%;height:85px;border:1px solid #F4F4F4;overflow-y: auto;">
                      <span style="display:inline-block;text-align:right;width:100%;padding-right:5px;box-sizing:border-box;font-size:14px">{{item.DATE}}</span>
                      <ul>
                        <li v-for="n in item.USER" style="display:flex;justify-content:space-between;padding:0 10px 0px 10px;margin-bottom:5px;box-sizing:border-box;font-size:13px;background-color:#DDBCD9;border-radius:10px;height:21px;line-height: 21px;color:#fff">
                          <i style="">{{n.NAME}}</i>
                          <span style="">{{n.JOBTIME}}</span>
                        </li>
                      </ul>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
          </el-row>
        </div>
    </div>
    <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">姓名：</span>
            <el-input placeholder="请输入姓名" size="small" v-model="form.NAME"  class="yy-input-input" :disabled="true"></el-input>

          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">值班时段：</span>
            <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.content" class="yy-input-input" :disabled="true"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">返 回</el-button>
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
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      page:0,
      cdt:{
        TIME:''
      },
      // cdt1:{
      //   TIME:''
      // },

      tableHeader:[],
      tableBody:[],
      pd: {
        "isBlurred":false,
        departdateBegin:'',
        departdateEnd:'',
      },
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
      form: {},

    }
  },
  mounted() {
  let time = new Date();
  let end = new Date();
  this.cdt.TIME=formatDate(time,'yyyyMM');
  // this.cdt1.TIME=formatDate(end,'yyyyMM');
  let that = this;
  setTimeout(function(){
    that.getGraph(that.cdt);
  },100)
  },
  activated(){
    // this.getGraph(this.cdt);
    this.btnctlFn(this.$root.checkItem);
  },
  methods: {
    headerClick(column,event){
      event.target.title=column.label
    },
    searchD(){
      if(this.page==0){
        this.getGraph(this.cdt)
      }else if(this.page==1){
        this.getList(this.CurrentPage,this.pageSize,this.cdt)
      }
    },
    qq(){
      this.page=0;
      // this.getGraph(this.cdt);
    },
    handleSelectionChange(val) {
    this.multipleSelection = val;
    },
    getNation(msg){
      this.pd.NATIONALITY=msg;
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
      if(this.cdt.TIME==''||this.cdt.TIME==null){
        this.$message({
          message: '值班月份不能为空',
          type: 'warning'
        });
        return
      }
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/watch/queryCensusListPage', p,
        r => {
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
          this.$nextTick(()=>{
            this.btnctlFn(this.$root.checkItem);
          })
        })
    },
    getGraph(pd){
      if(this.cdt.TIME==''||this.cdt.TIME==null){
        this.$message({
          message: '值班月份不能为空',
          type: 'warning'
        });
        return
      }
      this.$api.post('/manage-platform/watch/queryCensusGraph', this.cdt,
        r => {
          if(r.success){
            this.tableHeader = r.data.HEADER;
            this.tableBody = r.data.CONTENT;
          }
        })
    },
    details(row){
      let p={
        'USERSERIAL':row.USERSERIAL,
        'TIME':this.cdt.TIME
      }
      this.form.NAME=row.NAME;
      this.$api.post('/manage-platform/watch/queryCensusInfo',p,
        r => {
          if(r.success){
            var str="";
            for(var i=0;i<r.data.length;i++){
              str+=r.data[i].STARTTIMESTR+' -- '+r.data[i].ENDTIMESTR + '\n'
            }
            this.form.content = str;
            this.detailsDialogVisible = true;
          }
        })
    },
    downloadM (data,type) {
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
      if(this.page==0){
        axios({
         method: 'post',
         // url: 'http://192.168.99.248:8080/manage-platform/watch/exportGraphIo',
         url: this.$api.rootUrl+"/manage-platform/watch/exportGraphIo",
         data: {
             "TIME":this.cdt.TIME,
             "NAME":this.cdt.NAME
         },
         responseType: 'blob'
         }).then(response => {
             this.downloadM(response)
         });
      }else if(this.page==1){
        axios({
         method: 'post',
         // url: 'http://192.168.99.248:8081/manage-platform/watch/exportListPageIo',
         url: this.$api.rootUrl+"/manage-platform/watch/exportListPageIo",
         data: {
             "currentPage": 1,
             "showCount": 600,
             "cdt":this.cdt
         },
         responseType: 'blob'
         }).then(response => {
             this.downloadM(response)
         });
      }
    }
  },
    filters: {
        filterdate(n)
        {
          if(n=="" || n==null){
            return n;
          }else {
              return n.substring(0,n.length-3);
          }

        },
        fiftersex(val) {
          if (val == "F") {
            return "女"
          } else if (val == "M") {
            return "男"
          } else if (val == "U") {
            return "未知"
          }
        },
        fiftecr(val) {
          if (val == "0Z") {
            return "允许打印登机牌";
          } else if (val == "1Z") {
            return "禁止打印登机牌";
          } else if (val == "2Z") {
            return "请再次核对";
          } else {
            return "数据错误";
          }
        },
        fifterbj(val) {
          if (val == "1") {
            return "产生报警";
          } else {
            return "未产生报警";
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
.yy-input-text {
  width: 20% !important;
}

.yy-input-input {
  width: 70% !important;

}
.checked{
  background:#56A8FE; color:#ffffff;
}
.ttt{
  width:40%!important;
}
.t-table{
  width: 100%;
  /* border:1px solid #ccc; */
}
.t-table tr th{
  /* border-right: 1px solid #ccc; */
  padding: 0px!important;
  box-sizing: border-box;
}
.t-table tr td{
  border:1px solid #ccc;
}
.t-th{
  background-color: #F4F4F4;
}
.wwd{
  width: 24px;
}
</style>
