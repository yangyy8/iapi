<template lang="html">
  <div class="hbskb">
    <div class="middle mb-6">
        <el-row type="flex">
          <el-col :span="20" class="br pr-20">
            <!-- <div class="title-green ">
              查询条件
            </div> -->
            <el-row align="center" :gutter="2">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航站：</span>
                <el-select v-model="pd.port" placeholder="请选择" filterable clearable size="small" class="input-input">
                  <el-option
                    v-for="item in airport"
                    v-if="item.JCDM"
                    :key="item.JCDM"
                    :label="item.JCDM+' - '+item.KAMC"
                    :value="item.JCDM">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班日期：</span>
                <el-date-picker
                  class="input-input"
                  v-model="pd.fltDate"
                  :editable="false"
                  :clearable="false"
                  type="date" size="small" value-format="yyyyMMdd"
                  placeholder="选择时间"  >
                </el-date-picker>

              </el-col>
              <!-- <el-col :sm="24" :md="12" :lg="8" class="input-item" style="justify-content: flex-end">
                <el-button type="success" class="mr-20" size="small" >查询</el-button>
                <el-button type="primary"  plain size="small" >重置</el-button>
              </el-col> -->

            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area">
            <el-button type="success" class="mt-26" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
            <!-- <el-button type="primary" class="mb-15" plain size="small" >重置</el-button> -->
          </el-col>
        </el-row>
    </div>
    <div class="middle t-table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          label="出境">
          <el-table-column
            label="航班号"
            prop="out.fltNo">
          </el-table-column>
          <el-table-column
            label="目的站"
            prop="out.portTo">
          </el-table-column>
          <el-table-column
            label="计划起飞时间"
            prop="out.daDate">
          </el-table-column>
          <el-table-column
            label="航班状态">
            <template slot-scope="scope" v-if="scope.row.out!=null">
              <div>
                <span v-if="scope.row.out.status==0">计划</span>
                <span v-if="scope.row.out.status==1">值机</span>
                <span v-if="scope.row.out.status==3">已起飞</span>
                <span v-if="scope.row.out.status==4">已办理入境</span>
                <span v-if="scope.row.out.status==5">取消</span>
                <span v-if="scope.row.out.status==6">已到达</span>
                <span v-if="scope.row.out.status==7">已失效</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="机型备注"
            prop="out.airCode">
          </el-table-column>
          <el-table-column
            label="出发站"
            prop="out.portFrom">
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="入境">
          <el-table-column
            label="航班号"
            prop="in.fltNo">
          </el-table-column>
          <el-table-column
            label="出发站"
            prop="in.portFrom">
          </el-table-column>
          <el-table-column
            label="计划到达时间"
            prop="in.daDate">
          </el-table-column>
          <el-table-column
            label="航班状态">
            <template slot-scope="scope" v-if="scope.row.in!=null">
              <div >
                <span v-if="scope.row.in.status==0">计划</span>
                <span v-if="scope.row.in.status==1">值机</span>
                <span v-if="scope.row.in.status==3">已起飞</span>
                <span v-if="scope.row.in.status==4">已办理入境</span>
                <span v-if="scope.row.in.status==5">取消</span>
                <span v-if="scope.row.in.status==6">已到达</span>
                <span v-if="scope.row.in.status==7">已失效</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="机型备注"
            prop="in.airCode">
          </el-table-column>
          <el-table-column
            label="目的站"
            prop="in.portTo">
          </el-table-column>
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
import { formatDate } from '@/assets/js/date.js'
export default {
  data(){
    return{
      tableData:null,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:{fltDate:''},
      airport:null,
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
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryAirport();
  },
  activated(){
    this.getList(this.CurrentPage,this.pageSize,this.pd);
    let end = new Date();
    this.pd.fltDate= formatDate(end, 'yyyyMMdd');
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
    getList(CurrentPage,showCount,pd){
      let p={
    		"showCount": showCount,
    		"currentPage": CurrentPage,
        "totalResult": this.TotalResult,
    		"pd": pd
      }
      this.$api.post('/manage-platform/flightRealTime/querySchedulePage',p,
       r => {
         console.log(r)
         this.tableData=r.data.pdList;
         this.TotalResult=r.data.totalResult;
      })
    },
  }
}
</script>

<style scoped>

</style>
