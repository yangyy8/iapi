<template lang="html">
  <div class="eventbjsj">
    <div class="middle mb-6">
      <el-row type="flex">
        <el-col :span="22" class="pr-20">
          <el-row align="center" :gutter="2">
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
              <span class="input-text">姓名：</span>
              <el-input v-model="pd.name" placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">出生日期：</span>
              <div class="input-input t-flex t-date">
                <el-date-picker
                 type="date" size="small" format="yyyy-MM-dd"
                 v-model="pd.birthdayStart"
                 value-format="yyyyMMdd"
                 placeholder="开始时间" >
                </el-date-picker>
                <span class="septum">-</span>
                <el-date-picker
                  type="date" size="small" format="yyyy-MM-dd"
                  v-model="pd.birthdayEnd"
                  value-format="yyyyMMdd"
                  placeholder="结束时间">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">性別：</span>
              <el-select v-model="pd.gender" placeholder="请选择"  size="small" clearable filterable class="input-input">
                <el-option label="M - 男" value="1"></el-option>
                <el-option label="F - 女" value="2"></el-option>
                <el-option label="U - 未知" value="3"></el-option>
              </el-select>
            </el-col>
            <el-col :sm="24" :md="12" :lg="8" class="input-item">
              <span class="input-text">标签：</span>
              <el-select v-model="pd.tag_code" placeholder="请选择"  size="small" clearable filterable class="block input-input">
                <el-option
                  v-for="item in tagList"
                  :key="item.SERIAL"
                  :label="item.LABELNAME"
                  :value="item.LABELTYPE_CODE">
                </el-option>
              </el-select>
            </el-col>
          </el-row>


        </el-col>

        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
          <!-- <el-button type="primary" plain size="small" >重置</el-button> -->
        </el-col>
      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <div class="">
        <el-table
          class="mt-10"
          ref="multipleTable"
          :data="tableData"
          border
          style="width: 100%;">
          <el-table-column
            label="姓名"
            sortable
            prop="NAME">
          </el-table-column>
          <el-table-column
            label="性别"
            sortable
            prop="GENDERNAME">
          </el-table-column>
          <el-table-column
            label="出生日期"
            sortable
            prop="BIRTHDAY">
          </el-table-column>
          <el-table-column
            label="国籍/地区"
            sortable
            prop="NATIONALITYNAME">
          </el-table-column>
          <el-table-column
            label="证件号"
            sortable
            prop="PASSPORTNO">
          </el-table-column>
          <el-table-column
            label="标签"
            sortable
            prop="TAG_CODE"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="照片">
            <template slot-scope="scope">
              <span class="tc-b hand" @click="getPhotoInf(scope.row.PASSPORTNO,scope.row.NATIONALITY,scope.row.BIRTHDAY,scope.row.ENAME)">查看</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button type="text" class="a-btn" icon="el-icon-view" title="查看" @click="$router.push({name:'DZDA',query:{nationality:scope.row.NATIONALITY,passportno:scope.row.PASSPORTNO,nav2Id:scope.row.PASSPORTNO+scope.row.NATIONALITY,title:scope.row.NAME+'电子档案'}})"></el-button>
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
    <el-dialog title="照片" :visible.sync="czDialogVisible" width="500px" :show-close="false">
      <div class="img-div">
        <img :src="imgURL" alt="">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="czDialogVisible=false" size="small">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import GDTC from './GDTC'
import imgUrl from '../../../assets/img/bp_ap/ph_s.png'
export default {
  data(){
    return{
      moreShow:false,
      page: 0,
      multipleSelection:null,
      tableData:[],
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:{nationality:'',name:'',passportno:'',birthdayStart:'',birthdayEnd:''},
      nationAlone:null,
      docCode:null,
      tagList:[],
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
      checkeditem:{},
      imgURL:imgUrl,
      czDialogVisible:false,
    }
  },
  mounted(){
    this.queryNationalityAlone();
    this.getRiskUserLabelInfo();
  },
  activated(){
    if(this.$route.query.list){
      let data=this.$route.query.list;
      this.pd.nationality=data.nationality[0];
      this.pd.passportno=data.passportno;
      this.pd.name=data.lkname;
      this.pd.birthdayStart=data.dateofbirth;
      this.pd.birthdayEnd=data.dateofbirth;
      console.log(this.pd)
      this.getList(this.CurrentPage,this.pageSize,this.pd);
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if(this.multipleSelection.length==0){
        this.isdisable=true;
      }else{
        this.isdisable=false;
      }
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage,val,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },
    handleClose(done) {
      // this.czform={};
      done();
    },
    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
    getRiskUserLabelInfo(){
      this.$api.post('/manage-platform/riskRecordController/getRiskUserLabelInfo',{},
       r => {
         if(r.success){
           this.tagList=r.data;
         }
      })
    },

    getList(CurrentPage,showCount,pd){
      // if(!this.pd.nationality||!this.pd.passportno){
      //   this.$message.error('请先填写国籍地区和证件号！');
      // }
      if(this.pd.birthdayStart||this.pd.birthdayEnd){
        if(!(this.pd.birthdayEnd&&this.pd.birthdayStart)){
          this.$message.error('请输入完整的出生日期区间！');
          return
        }
      }
      let p={
        "showCount": showCount,
        "currentPage": CurrentPage,
        "pd": pd
      }
      this.$api.post('/manage-platform/riskRecordController/getRecordInfo',p,
       r => {
         console.log(r)
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    },
    getPhotoInf(passportno,nationality,birthday,name){
      this.czDialogVisible=true;
      let p={}
      if(nationality=="CHN"){
        p={
          "type": 'photo',
          "nationality": nationality,
          "passportno": passportno,
        }
      }else{
        p={
          "passportno": passportno,
          "nationality": nationality,
          "birthday": birthday,
          "name": name,
          "type": 'photo',
        }
      }

      this.$api.post('/manage-platform/riskRecordController/getPhotoInf',p,
       r => {
         console.log(r)
         this.imgURL=r.data.url||imgUrl;
      })
    }
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
