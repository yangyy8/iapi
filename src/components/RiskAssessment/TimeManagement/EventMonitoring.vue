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
                <span class="input-text">航班时间：</span>
                <div class="input-input t-flex t-date">
                   <el-date-picker
                     v-model="pd.DATEOFBIRTHSTART"
                     type="date" size="small" value-format="yyyyMMdd"
                     placeholder="开始时间" align="right" >
                   </el-date-picker>
                   <span class="septum">-</span>
                   <el-date-picker
                      v-model="pd.DATEOFBIRTHEND"
                      type="date" size="small" align="right" value-format="yyyyMMdd"
                      placeholder="结束时间"  >
                  </el-date-picker>
              </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">出入境：</span>
              <el-select v-model="pd.NATIONALITY" filterable clearable placeholder="请选择"  size="small" class="input-input">
                <el-option
                  v-for="item in nationAlone"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">航班号：</span>
              <el-input placeholder="请输入内容" size="small" v-verify.input.blur="{regs:'required|max:35',submit:'demo'}" v-model="pd.CARDNO" clearable class="input-input"></el-input>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">中心/口岸：</span>
              <el-select v-model="pd.NATIONALITY" filterable clearable placeholder="请选择"  size="small" class="input-input">
                <el-option
                  v-for="item in nationAlone"
                  :key="item.CODE"
                  :label="item.CODE+' - '+item.CNAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>

            <el-col :sm="24" :md="12"  :lg="8" class="input-item">
              <span class="input-text">模型：</span>
              <el-select  placeholder="请选择"  size="small" v-model="pd.IN_OUT" clearable filterable class="block input-input">
                <el-option label="I - 入境" value="I"></el-option>
                <el-option label="O - 出境" value="O"></el-option>
                <el-option label="A - 入出境" value="A"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="3" class="down-btn-area">
          <el-button type="success" size="small"  class="mt-15" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查询</el-button>
          <el-button type="primary" class="mt-15" plain size="small" @click="reset">重置</el-button>
        </el-col>

      </el-row>
    </div>
    <div class="middle">
      <el-row>
        <el-button  size="small"  class="mb-15 table-btn" @click="">导出</el-button>
        <el-button  size="small"  class="mb-15 table-btn" @click="colorSet">色彩设置</el-button>
      </el-row>
      <el-table
        :data="tableData"
        border
        class="caozuo"
        style="width:100%;">
        <!-- <el-table-column
          type="index"
          label="序号"
          width="60">
        </el-table-column> -->
        <el-table-column
          prop="RECORDNUM"
          label="航班号"
          sortable>
        </el-table-column>
        <el-table-column
          prop="NATIONALITYNAME"
          sortable
          label="航班日期">

        </el-table-column>
        <el-table-column
          prop="CARDTYPENAME"
          label="到达时间">
        </el-table-column>
        <el-table-column
          prop="CARDNO"
          sortable
          label="出入境">
        </el-table-column>
        <el-table-column
          prop="FAMILYNAME"
          label="起飞机场">
        </el-table-column>
        <el-table-column
          prop="GENDER"
          width="60"
          label="到达机场">
        </el-table-column>
        <el-table-column
          prop="DATEOFBIRTH"
          label="预报旅客">
        </el-table-column>
        <el-table-column
          prop="BEGINDATE"
          label="预报中国旅客">
        </el-table-column>
        <el-table-column
          prop="ENDDATE"
          label="预报外籍旅客">
        </el-table-column>
        <el-table-column
          prop="BEGINDATE"
          label="一级预警人数">
        </el-table-column>
        <el-table-column
          prop="ENDDATE"
          label="二级预警人数">
        </el-table-column>
        <el-table-column
          prop="BEGINDATE"
          label="三级预警人数">
        </el-table-column>
        <el-table-column
          prop="ENDDATE"
          label="四级预警人数">
        </el-table-column>
        <el-table-column
          prop="BEGINDATE"
          label="五级预警人数">
        </el-table-column>
        <el-table-column
          prop="BEGINDATE"
          label="报警率">
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
          :current-page.sync ="CurrentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="色彩设置" :visible.sync="colorDialogVisible"   width="40%">
      <el-row align="center" class="mb-6">
        <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
          <span class="input-text tt-input-text">颜色值1：</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="t-input-input"></el-input>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
          <span class="input-text tt-input-text">区间：</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="input-input"></el-input>
          <span class="septum line-h">-</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="input-input"></el-input>
          <span class="septum line-h">%</span>
        </el-col>
      </el-row>
      <el-row align="center" class="mb-6">
        <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
          <span class="input-text tt-input-text">颜色值2：</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="t-input-input"></el-input>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
          <span class="input-text tt-input-text">区间：</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="input-input"></el-input>
          <span class="septum line-h">-</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="input-input"></el-input>
          <span class="septum line-h">%</span>
        </el-col>
      </el-row>
      <el-row align="center" class="mb-6">
        <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
          <span class="input-text tt-input-text">颜色值3：</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="t-input-input"></el-input>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
          <span class="input-text tt-input-text">区间：</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="input-input"></el-input>
          <span class="septum line-h">-</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="input-input"></el-input>
          <span class="septum line-h">%</span>
        </el-col>
      </el-row>
      <el-row align="center" class="pd-6 bb">
        <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
          <span class="input-text tt-input-text">颜色值4：</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="t-input-input"></el-input>
        </el-col>
        <el-col  :sm="24" :md="12" :lg="12"  class="input-item">
          <span class="input-text tt-input-text">区间：</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="input-input"></el-input>
          <span class="septum line-h">-</span>
          <el-input placeholder="请输入内容" size="small" v-model="pd.fltnoEqual"  class="input-input"></el-input>
          <span class="septum line-h">%</span>
        </el-col>
      </el-row>
      <h4>历史参数设置参考</h4>
      <el-row align="center" class="mb-6">
        <el-col  :sm="4" :md="4" :lg="4"  class="input-item" style="justify-content: center;">
          颜色值1：
        </el-col>
        <el-col  :sm="20" :md="20" :lg="20" style="margin-left:-20px">
          <span>历次设置的范围平均值 低区间平均值 60% 高区间平均值 100%</span><br/>
          <span style="padding-top:10px;display:inline-block">最近设置（）</span>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="colorDialogVisible = false" size="small">取消</el-button>
        <el-button type="primary" @click="" size="small">确定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data(){
    return{
      airport:[],
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:{NAMELIKE:'0'},
      nationAlone:[],
      colorDialogVisible:false,
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
    this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryNationalityAlone();
    this.queryAirport();
  },
  activated(){
    this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  methods:{
    colorSet(){
      this.colorDialogVisible = true;
    },
    reset(){
      this.CurrentPage=1;
      this.pageSize=10;
      this.pd={NAMELIKE:'0'};
      this.getList(this.CurrentPage,this.pageSize,this.pd);
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage,val,this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val,this.pageSize,this.pd);
      console.log(`当前页: ${val}`);
    },

    getList(currentPage,showCount,pd){
      let p={
      	"currentPage":currentPage,
      	"showCount":showCount,
      	"pd":pd
      };
      console.log(pd)

        this.$api.post('/manage-platform/nameListFocusList/getNameListFocusListPage',p,
         r => {
           console.log(r);
           this.tableData=r.data.resultList;
           this.TotalResult=r.data.totalResult;
        })

    },
    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         console.log(r);
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r => {
         console.log(r);
         if(r.success){
           this.airport=r.data;
           // this.$emit('transAirport',this.airportModel)
         }
      })
    },

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
