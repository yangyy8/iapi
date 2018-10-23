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
                <span class="input-text">姓名：</span>
                <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">性別：</span>
                <el-select  placeholder="请选择"  size="small" clearable filterable class="input-input">
                  <el-option label="M - 男" value="M"></el-option>
                  <el-option label="F - 女" value="F"></el-option>
                  <el-option label="U - 未知" value="U"></el-option>
                </el-select>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
                <span class="input-text">出生日期：</span>
                <div class="input-input t-flex t-date">
                  <el-date-picker
                   type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                   value-format="yyyyMMddHHmm"
                   placeholder="开始时间" >
                  </el-date-picker>
                  <span class="septum">-</span>
                  <el-date-picker
                    type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                    value-format="yyyyMMddHHmm"
                    placeholder="结束时间">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">证件号：</span>
                <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">国籍：</span>
                <el-select  filterable clearable placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="item in nationAlone"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">标签：</span>
                <el-select  placeholder="请选择"  size="small" clearable filterable class="input-input">
                  <el-option label="M - 男" value="M"></el-option>
                  <el-option label="F - 女" value="F"></el-option>
                  <el-option label="U - 未知" value="U"></el-option>
                </el-select>
              </el-col>
              <!-- <el-col :sm="24" :md="12" :lg="8" class="input-item" style="justify-content: flex-end">
                <el-button type="success" class="mr-20" size="small" >查询</el-button>
                <el-button type="primary"  plain size="small" >重置</el-button>
              </el-col> -->

            </el-row>
          </el-col>
          <el-col :span="4" class="down-btn-area">
            <el-button type="success" class="mb-9" size="small" >查询</el-button>
            <el-button type="primary" plain size="small" >重置</el-button>
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
          label="序号"
          width="70">
        </el-table-column>
        <el-table-column
          label="姓名">
        </el-table-column>
        <el-table-column
          label="性别">
        </el-table-column>
        <el-table-column
          label="出生日期">
        </el-table-column>
        <el-table-column
          label="国籍">
        </el-table-column>
        <el-table-column
          label="证件号码">
        </el-table-column>
        <el-table-column
          label="标签">
        </el-table-column>
        <el-table-column
          label="照片">
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
export default {
  data(){
    return{
      tableData:null,
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:null,
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
      nationAlone:[]
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
    this.queryAirport();
    this.queryNationalityAlone();
  },
  methods:{
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r => {
         if(r.success){
           this.airport=r.data;
         }
      })
    },
    queryNationalityAlone(){
      this.$api.post('/manage-platform/codeTable/queryNationality',{},
       r => {
         if(r.success){
           this.nationAlone=r.data;
         }
      })
    },
  }
}
</script>

<style scoped>

</style>
