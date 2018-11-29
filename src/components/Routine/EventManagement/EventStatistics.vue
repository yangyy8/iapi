<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
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
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,cdt)">查询</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="middle">
      <el-button type="success"  class="mb-9" size="small" @click="tableDown">导出</el-button>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
      >
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
        <el-table-column
          prop="TITLE"
          label="标题"
          width="80px">
        </el-table-column>
        <el-table-column
          prop="NAME"
          label="登记人姓名">
        </el-table-column>
        <el-table-column
          prop="USERNAME"
          label="登记人账号"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="SOURCENAME"
          label="来源人姓名">
        </el-table-column>
        <el-table-column
          prop="SOURCEPHONE"
          label="来源人电话">
        </el-table-column>
        <el-table-column
          prop="HANDOVERNAME"
          label="交接人姓名">
        </el-table-column>
        <el-table-column
          prop="RECORDTIMESTR"
          label="事件时间">
        </el-table-column>
        <el-table-column
          prop="TYPE"
          label="事件类型">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200px">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="change(scope.row.SERIAL)">交接</el-button>
            <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
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
      width="700px"
      >
      <el-row align="center" style="width:100%">
        <h4 style="margin-top:0px!important">请选择接下来要交接的人</h4>
        <el-radio-group v-model="qqq">
          <el-radio v-for="(item,ind) in dutyName" :key="ind" :label="item.SERIAL" style="width:25%;margin-bottom: 7px;">{{item.NAME}}</el-radio>
        </el-radio-group>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeSave" size="small" type="primary">确 定</el-button>
        <el-button @click="changeDialogVisible = false" size="small">返 回</el-button>
      </div>
    </el-dialog>

    <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="500px">
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="20" class="input-item">
            <span class="yy-input-text">标题：</span>
            <el-input placeholder="请输入姓名" size="small" v-model="form.title"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}" :disabled="true"></el-input>
          </el-col>
        </el-row>

        <el-row type="flex"  class="mb-6">
          <el-col :span="20" class="input-item">
            <span class="yy-input-text">附件：</span>

            <el-button size="small" class="table-btn"><a :href="fitAdress" class="acolor">附件下载</a></el-button>
            <!-- <button type="button" class="table-btn" name="button">附件下载</button> -->
          </el-col>
        </el-row>

        <el-row type="flex" class="mb-6" >
          <el-col :span="20" class="input-item">
            <span class="yy-input-text">事件描述：</span>
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
    this.getList(this.CurrentPage,this.pageSize,this.cdt);
    this.queryNationality();
  },
  activated(){
    this.getList(this.CurrentPage,this.pageSize,this.cdt);
  },
  methods: {
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
      // const result = this.$validator.verifyAll('timeDemo')
      //  if (result.indexOf(false) > -1) {
      //    return
      //  }
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/incident/queryListPage', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
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
        })
    },

    details(i) {
      this.detailsDialogVisible = true;
      this.form.title=i.TITLE;
      this.form.content=i.INCIDENTDESC;
      this.fitAdress = i.FILESERIAL;
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
    }
  },

    filters: {

      fifter1(val) {
        if (val == "I") {
          return "入境";
        } else if(val == "O"){
          return "出境";
        }
      },
      fifter2(val) {
        if (val == "0") {
          return "计划";
        } else if(val == "1"){
          return "正在预检";
        }
        else if(val == "2"){
          return "完成预检";
        }
        else if(val == "3"){
          return "已起飞";
        }
        else if(val == "4"){
          return "已办理入境";
        }
        else if(val == "5"){
          return "取消";
        }
        else if(val == "6"){
          return "已到达";
        }
      },
      filterdate(n)
      {
        if(n=="" || n==null){
          return n;
        }else {
            return n.substring(0,n.length-3);
        }

      }

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
</style>
