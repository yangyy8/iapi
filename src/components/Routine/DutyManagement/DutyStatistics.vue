<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br">
          <div class="title-green ">
            查询条件
          </div>
        <el-row align="center"   :gutter="2" class="pr-20" type="flex" justify="center">
          <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
            <span class="input-text">姓名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.DEPT_JC"  class="input-input"></el-input>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item" v-show="page==0">
            <span class="input-text"><i class="t-must">*</i>值班时间：</span>
            <div class="input-input t-flex t-date">
               <el-date-picker
               v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
               v-model="pd.startCreatetime"
               type="datetime"
               size="small"
               value-format="yyyyMMddHHmmss"
               placeholder="开始时间"
               >
              </el-date-picker>
               <span class="septum">-</span>
               <el-date-picker
                v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
                v-model="pd.endCreatetime"
                type="datetime"
                size="small"
                value-format="yyyyMMddHHmmss"
                placeholder="结束时间"
                >
              </el-date-picker>
            </div>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="input-item" v-show="page==1">
            <span class="input-text"><i class="t-must">*</i>统计月份</span>
            <div class="input-input t-flex t-date">
               <el-date-picker
               v-verify.input.blur="{regs:'required',submit:'timeDemo'}"
               v-model="pd.startCreatetime"
               type="datetime"
               size="small"
               value-format="yyyyMMddHHmmss"
               placeholder="统计月份"
               >
              </el-date-picker>

            </div>
          </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
        <span class="tubiao hand" :class="{'checked':page==1}" @click="qq">日历</span><span class="tubiao hand" :class="{'checked':page==0}" @click="page=0;getList(CurrentPage,pageSize,pd)">列表</span>
        <el-button type="success" size="small" @click="" style="vertical-align: 2px;">导出</el-button>
        <div id="div1" v-show="page==0">
          <el-table
            :data="tableData"
            border
            style="width: 100%;">
            <el-table-column
              prop="tsname"
              label="姓名" sortable
              width="140">
            </el-table-column>
            <el-table-column
              prop="gender"
              label="账号" sortable>
            </el-table-column>
            <el-table-column
              prop="birthdate"
              label="岗位" sortable>
            </el-table-column>
            <el-table-column
              prop="nationalityStr"
              label="工作时长" sortable>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
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
        <div id="div2" v-show="page==1">
          <el-row align="center"  type="flex">
              222222222222

          </el-row>
        </div>
    </div>
    <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text"><font class="yy-color">*</font>姓名：</span>
            <el-input placeholder="请输入内容(不能超过20个汉字)" size="small" maxlength="20"  v-model="form.ROLE_NAME"  class="yy-input-input" v-verify.change.blur ="{regs:'required',submit:'demo2'}"></el-input>

          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">值班时段：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="250" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.REMARKS" class="yy-input-input"></el-input>
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

import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {

  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      page:0,
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
  let begin =new Date(time - 1000 * 60 * 60 * 24 * 30);
  this.pd.departdateBegin=formatDate(begin,'yyyyMMddhhmm');
  this.pd.departdateEnd=formatDate(end,'yyyyMMddhhmm');

  },
  activated(){

  },
  methods: {
    qq(){
      this.page=1;
    },
    handleSelectionChange(val) {
    this.multipleSelection = val;
    },
    getNation(msg){
      this.pd.NATIONALITY=msg;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {

      if(dayGap(this.pd.departdateBegin,this.pd.departdateEnd,0)>30){
        this.$alert('查询时间间隔不能超过一个月', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/statusUpdate/seat/queryListPages', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    details(){
      this.detailsDialogVisible = true;
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
.tubiao{
width:100px; padding:6px 15px;  border:1px solid #56A8FE;
}
</style>
