<template lang="html">
  <div class="zhff">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">口岸名称：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.portname" class="input-input"></el-input>

            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">口岸编号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.portcode" class="input-input"></el-input>

            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">口岸地址：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.ipaddress" class="input-input"></el-input>

            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">接口状态：</span>
              <el-select v-model="pd.clientStatus" placeholder="请选择" filterable  size="small"   class="input-input">
                <el-option value="0" label="0 - 异常" ></el-option>
                <el-option value="1" label="1 - 正常" ></el-option>
               </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={};">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          type="Index"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="portcode"
          label="口岸编号"
          >
        </el-table-column>
        <el-table-column
          prop="portname"
          label="口岸名称" >
        </el-table-column>
        <el-table-column
          prop="ipaddress"
          label="口岸地址"
          >
        </el-table-column>
        <el-table-column
          prop="ipaddressBack"
          label="备用地址"
          >
        </el-table-column>
        <el-table-column
          label="接口状态"
          >
          <template slot-scope="scope">
              <span :class="{'yycolor':scope.row.clientStatus=='1','yycolory':scope.row.clientStatus=='0'}">  {{scope.row.clientStatus | fiftersate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="backlog1"
          label="预报积压数"
          >
        </el-table-column>
        <el-table-column
          prop="backlog2"
          label="申报积压数"
          >
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
      pd: {},
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

    }
  },

  mounted() {
      this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated(){
      this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      if(dayGap(this.pd.begin,this.pd.end,0)>1){
        this.$alert('只能查询某一天的日期', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post("/manage-platform/log_event/queryListPageAll", p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
  },
    filters: {
      fiftersate(val){
        if(val=="1"){

          return "正常"
        }else {

          return "异常"
        }
      }
    }
}
</script>
<style scoped>
.yycolor{ background: #00FF00; padding: 3px 8px;}
.yycolory{  background: #FF0000;padding: 3px 8px; }
</style>
