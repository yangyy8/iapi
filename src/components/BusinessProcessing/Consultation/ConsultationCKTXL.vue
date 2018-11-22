
<template lang="html">
  <div class="basicInfo">
    <div class="middle-top mb-2">
        <el-row type="flex" class="middle">
          <el-col :span="22" class="br pr-20">
            <div class="title-green ">
              查询条件
            </div>
            <el-row align="center" :gutter="2">
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">咨询人：</span>
                <el-select v-model="pd.CONSULTFROM" filterable clearable placeholder="请选择" size="small" class="input-input">
                  <el-option label="0 - 航空公司" value="0"></el-option>
                  <el-option label="1 - 乘客" value="1"></el-option>
                  <el-option label="2 - 其他" value="2"></el-option>
                </el-select>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">航站：</span>
                <el-select v-model="pd.STATIONFROM" filterable clearable placeholder="请选择" size="small" class="input-input" @visible-change="terminal">
                  <el-option
                  v-for="item in takeOffName"
                  :key="item.AIRPORT_CODE"
                  :value="item.AIRPORT_CODE"
                  :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                  </el-option>
                </el-select>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">人员姓名：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.NAME"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">固定电话：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.TELEPHONE"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">联系电话：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.CELLPHONE"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">传真：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.FAX"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">邮箱：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.EMAIL"  class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">其他：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.OTHER"  class="input-input"></el-input>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2" class="down-btn-area" style="padding-top:30px;">
            <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
          </el-col>
        </el-row>
    </div>

    <div class="middle">
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
          prop="CONSULTFROM"
          label="咨询类型">
        </el-table-column>
        <el-table-column
          prop="STATIONFROM"
          label="航站">
        </el-table-column>
        <el-table-column
          prop="NAME"
          label="咨询人">
        </el-table-column>
        <el-table-column
          prop="TELEPHONE"
          label="固定电话">
        </el-table-column>
        <el-table-column
          prop="CELLPHONE"
          label="移动电话">
        </el-table-column>
        <el-table-column
          prop="FAX"
          label="传真">
        </el-table-column>
        <el-table-column
          prop="EMAIL"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="OTHER"
          label="其他">
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
      dealer:{},
      pd:{},
      takeOffName:[],
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
    }
  },
  mounted() {
    this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  activated() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize);
      console.log(`当前页: ${val}`);
    },
    getList(currentPage,showCount,pd) {
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };
      this.$api.post('/manage-platform/consult/queryConsultAddressList',p,
        r => {
          console.log(r);
          if (r.success) {
            this.tableData = r.data.resultList;
            this.TotalResult = r.data.totalResult;
          }
        })
    },
    terminal(){//航站
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
  }
}
</script>

<style scoped>

</style>
