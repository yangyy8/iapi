<template lang="html">
  <div class="eventbjsj">
    <div class="middle mb-6">
      <el-row type="flex">
        <el-col :span="22" class="pr-20">
          <el-row align="center" :gutter="2">
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航空公司：</span>
              <el-select v-model="pd.fltnoTopTwo" placeholder="请选择" filterable clearable size="small" class="input-input">
                <el-option
                  v-for="(item,ind) in company"
                  :key="ind"
                  :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME"
                  :value="item.AIRLINE_CODE" >
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.fltno"  class="input-input"></el-input>
            </el-col>
            <!-- <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">航班日期：</span>
              <div class="input-input t-flex t-date">
                <el-date-picker
                 type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                 v-model="pd.fltnoDate_start"
                 value-format="yyyyMMddHHmmss"
                 placeholder="开始时间" >
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker
                  type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                  v-model="pd.fltnoDate_end"
                  value-format="yyyyMMddHHmmss"
                  placeholder="结束时间">
                </el-date-picker>
              </div>
            </el-col> -->
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">国籍/地区：</span>
              <el-select v-model="pd.nationality" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                <el-option
                  v-for="item in nationAlone"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">证件号：</span>
              <el-input v-model="pd.passportno" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出生日期：</span>
              <div class="input-input t-flex t-date">
                <el-date-picker
                 type="date" size="small" format="yyyy-MM-dd"
                 v-model="pd.birthday_start"
                 value-format="yyyyMMdd"
                 placeholder="开始时间" >
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker
                  type="date" size="small" format="yyyy-MM-dd"
                  v-model="pd.birthday_end"
                  value-format="yyyyMMdd"
                  placeholder="结束时间">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">姓名：</span>
              <el-input v-model="pd.name" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">性別：</span>
              <el-select v-model="pd.gender" placeholder="请选择"  size="small" clearable filterable class="input-input">
                <el-option label="M - 男" value="1"></el-option>
                <el-option label="F - 女" value="2"></el-option>
                <el-option label="U - 未知" value="3"></el-option>
              </el-select>
            </el-col>

          </el-row>


        </el-col>

        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd,order,direction)">查询</el-button>
          <!-- <el-button type="primary" plain size="small" >重置</el-button> -->
        </el-col>
      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <div class="">
        <el-table
          class="mt-10"
          :data="tableData"
          @sort-change="sortChange"
          border
          style="width: 100%;">
          <el-table-column
            label="国籍/地区"
            sortable="custom"
            prop="nationality"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="证件号"
            sortable="custom"
            prop="passportno"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="姓名"
            prop="chnName"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="性别"
            sortable="custom"
            prop="gender"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="出生日期"
            sortable="custom"
            prop="birthday"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="航班号"
            prop="fltno"
            sortable="custom"
            :show-overflow-tooltip="true">
          </el-table-column>
          <!-- <el-table-column
            label="航班日期"
            prop="fltnoDate"
            sortable="custom"
            width="101"
            :show-overflow-tooltip="true">
          </el-table-column> -->
          <el-table-column
            label="是否风评"
            sortable="custom"
            prop="risk_status"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="风评时间"
            sortable="custom"
            prop="risk_end_time"
            :show-overflow-tooltip="true">
          </el-table-column>

          <el-table-column
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button type="text" class="a-btn" icon="el-icon-view" title="查看" @click="$router.push({name:'RYZBCXXQ',query:{nationality:scope.row.nationalityCode,passportno:scope.row.passportno,flight_recordnum:scope.row.flight_recordnum,nav2Id:scope.row.passportno+scope.row.nationality,title:scope.row.chnName+'详情'}})"></el-button>
              <!-- <el-button type="text" class="a-btn" icon="el-icon-edit-outline"  title="事件追加" @click="openGdTc(scope.row)"></el-button> -->

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

    </div>
    <!-- <GDTC :gtitle="'事件追加'" :gvisible="gdDialogVisible" :garr="checkeditem"  @gclose="gclose"></GDTC> -->
    <!-- <el-dialog title="照片" :visible.sync="czDialogVisible" width="500px" :show-close="false">
      <div class="img-div">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="czDialogVisible=false" size="small">确认</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script>
// import GDTC from './GDTC'
import { formatDate } from '@/assets/js/date.js'
export default {
  data(){
    return{

      tableData:[],
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      order:[],
      direction:0,
      pd:{nationality:'',name:'',passportno:'',birthdayStart:'',birthdayEnd:''},
      nationAlone:[],
      company:[],

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
      czDialogVisible:false,


    }
  },
  mounted(){
    this.queryNationalityAlone();
    this.queryAircompanyList();
    // let begin = new Date();
    // // console.log(begin+24*60*60*1000)
    // let end = new Date(begin.getTime()+24*60*60*1000);
    //
    // this.pd.fltnoDate_start= formatDate(begin, 'yyyyMMdd')+'000000';
    // this.pd.fltnoDate_end= formatDate(end, 'yyyyMMdd')+'000000';
  },
  activated(){

  },
  methods:{

    pageSizeChange(val) {
      this.pageSize=val
      // this.tableData=this.tlist.slice(this.pageSize*(this.CurrentPage-1),this.pageSize*(this.CurrentPage-1)+this.pageSize);
      this.getList(this.CurrentPage,val,this.pd,this.order,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.CurrentPage=val
      // this.tableData=this.tlist.slice(this.pageSize*(this.CurrentPage-1),this.pageSize*(this.CurrentPage-1)+this.pageSize);
      this.getList(val,this.pageSize,this.pd,this.order,this.direction);
      console.log(`当前页: ${val}`);
    },
    sortChange(data){
      console.log(data)
      this.order=[data.prop];
      if(data.order=='descending'){
        this.direction=0
      }else{
        this.direction=1
      }
      console.log(this.order,this.direction)

      this.getList(this.CurrentPage,this.pageSize,this.pd,this.order,this.direction);
    },

    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
    queryAircompanyList() {
      this.$api.post('/manage-platform/codeTable/queryAircompanyList', {},
        r => {
          if (r.success) {
            this.company = r.data;
          }
        })
    },


    getList(CurrentPage,showCount,pd,order,direction){
      // if(!this.pd.nationality){
      //   this.$message.error('请先填写国籍地区！');
      //   return
      // }
      // if(this.pd.birthdayStart||this.pd.birthdayEnd){
      //   if(!(this.pd.birthdayEnd&&this.pd.birthdayStart)){
      //     this.$message.error('请输入完整的出生日期区间！');
      //     return
      //   }
      // }
      let p={
        "showCount": showCount,
        "currentPage": CurrentPage,
        "pd": pd,
        "orders":order,
	      "direction":direction
      }
      this.$api.post('/manage-platform/riskIndexController/getIndexQueryInfo',p,
       r => {

         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },

  }
}
</script>

<style scoped>

.img-div{
  width: 200px;
  margin: 0 auto;
}
.img-div img{
  width: 100%;
}
</style>
