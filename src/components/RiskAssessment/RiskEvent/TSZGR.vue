<template lang="html">
  <div class="whitelist">
    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="21" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center" :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">到达时间：</span>
                <div class="input-input t-flex t-date">
                   <el-date-picker
                     v-model="cdt.arriveTimeStart"
                     type="datetime"
                     size="small"
                     format="yyyy-MM-dd HH:mm:ss"
                     value-format="yyyyMMddHHmmss"
                     placeholder="开始时间">
                   </el-date-picker>
                   <span class="septum">-</span>
                   <el-date-picker
                      v-model="cdt.arriveTimeEnd"
                      type="datetime"
                      size="small"
                      align="right"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyyMMddHHmmss"
                      placeholder="结束时间">
                  </el-date-picker>
              </div>
            </el-col>

            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">机场：</span>
              <el-select placeholder="请选择机场" v-model="cdt.port" filterable clearable @visible-change="takeOff" size="small" class="input-input">
                <el-option
                v-for="item in takeOffName"
                :key="item.AIRPORT_CODE"
                :value="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">类别：</span>
              <el-select v-model="cdt.type" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="请选择" value="0"></el-option>
                <el-option label="姓名超过四个字" value="1"></el-option>
                <el-option label="无中文姓名" value="2"></el-option>
                <el-option label="中国旅行证" value="3"></el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">出入标识：</span>
              <el-select v-model="cdt.flighttype" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3" class="down-btn-area">
          <el-button type="success" size="small"  class="mt-15" @click="CurrentPage=1;getList(CurrentPage,pageSize,cdt,order,direction)">查询</el-button>
          <!-- <el-button type="primary" class="mt-15" plain size="small" @click="reset">重置</el-button> -->
        </el-col>

      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-row>
        <el-button  size="small"  class="mb-15 table-btn" @click="tableDown">导出</el-button>
      </el-row>
      <el-table
        ref="sort"
        :data="tableData"
        border
        style="width:100%;"
        class="o-table3"
        @sort-change='sortChange'
        @header-click="headerClick">
        <!-- <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column> -->
        <el-table-column
          prop="psrchnname"
          label="姓名"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="psrgender_na"
          sortable='custom'
          label="性别">
        </el-table-column>
        <el-table-column
          prop="pdtbirthday"
          label="出生日期"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="pdtcountry_na"
          label="国籍地区"
          sortable='custom'>
          <!-- <template slot-scope="scope">
            {{ scope.row.FLIGHTTYPE | fifterInOut}}
          </template> -->
        </el-table-column>
        <el-table-column
          prop="cert_no"
          label="证件号"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="cert_type_na"
          label="证件类型"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="trs_id"
          label="航班号"
          sortable='custom'>
        </el-table-column>
        <el-table-column
          prop="staarvetm"
          label="到达时间"
          sortable='custom'>
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
import {formatDate,format} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
import axios from 'axios'
export default {
  data(){
    return{
      takeOffName:[],
      order:'',
      direction:0,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      cdt:{type:'0',arriveTimeStart:'',arriveTimeEnd:'',port:'PEK',flighttype:'I'},
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
      tableData: [],
    }
  },
  mounted(){
    let begin = new Date();
    let end = new Date(begin.getTime()+24*60*60*1000);
    this.cdt.arriveTimeStart= formatDate(begin, 'yyyyMMdd')+'000000';
    this.cdt.arriveTimeEnd= formatDate(end, 'yyyyMMdd')+'000000';
    this.takeOff()
  },
  activated(){
  },
  methods:{
    takeOff(){//调用起飞机场
      let p={
        "flighttype":"O",
         "type":0
      }
      this.$api.post('/manage-platform/codeTable/queryAirportByPortAndFlighttype',p,
       r =>{
         if(r.success){
           this.takeOffName = r.data;
         }
       })
    },
    sortChange(column, prop, order){
      column.order=='ascending'?this.direction=1:this.direction=0;
      this.order=column.prop;
      this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
    },
    headerClick(column,event){
      event.target.title=column.label
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
      let p={
        "currentPage": this.CurrentPage,
        "showCount": this.pageSize,
        "pd": this.cdt,
        "order":this.order,
        "direction":this.direction
      }
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/exportTSZGRInfo',p,
       r =>{
         this.downloadM(r)
       },e=>{},'','blob')
    },
    // reset(){
    //   this.CurrentPage=1;
    //   this.pageSize=10;
    //   this.cdt={
    //     startFlightDate:'',
    //     endFlightDate:''
    //   };
    //   let end = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
    //   let begin =new Date(new Date().setHours(0,0,0,0));
    //   this.cdt.startFlightDate=formatDate(begin,'yyyyMMddhhmmss');
    //   this.cdt.endFlightDate=formatDate(end,'yyyyMMddhhmmss');
    //   this.$nextTick(()=>{
    //     let sortArr = this.$refs.sort.$children
    //     for(var i=0;i<sortArr.length;i++){
    //       if(sortArr[i].columnConfig&&sortArr[i].columnConfig.order){
    //         sortArr[i].columnConfig.order = ''
    //         return false
    //       }
    //     }
    //   })
    //   this.getList(this.CurrentPage,this.pageSize,this.cdt,this.order,this.direction);
    // },
    pageSizeChange(val) {
      this.pageSize = val;
      this.getList(this.CurrentPage,val,this.cdt,this.order,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage = val;
      this.getList(val,this.pageSize,this.cdt,this.order,this.direction);
      console.log(`当前页: ${val}`);
    },

    getList(currentPage,showCount,pd,order,direction){
      let p={
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd,
        "order":order,
        "direction":direction
      }
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getTSZGRInfo',p,
        r =>{
          if(r.success){
            this.tableData = r.data.data.chnSpecial;
            this.TotalResult = r.data.data.total;
          }
        })
    },
  },
  filters: {
    fifterInOut(val){
      if(val=="O"){
        return "出境"
      }else if(val == "I"){
        return "入境"
      }
    }

  }
}
</script>

<style scoped>
.add-dialog{
  /* padding-left:40px; */
}
.line-h{
  line-height: 30px
}
.t-input-input{
  width: 60%!important;
}
.pd-6{
  padding-bottom: 6px!important
}
.bb{
  border-bottom: 1px solid #ccc;
}
.tt-input-text{
  width: 24%!important;
}
.wrapper{
  padding-left:3%;
}

</style>
