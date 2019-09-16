<template lang="html">
  <div class="zlbg">
    <div class="middle mb-6">

      <el-row type="flex">
        <el-col :span="22" class="br pr-20">
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.FAMILYNAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
        <span class="input-text">性别：</span>
        <el-select v-model="pd.GENDER" placeholder="请选择"  filterable clearable size="small" class="input-input">
           <el-option value="U" label="U - 未知">
           </el-option>
           <el-option value="M" label="M - 男">
           </el-option>
           <el-option value="F" label="F - 女">
           </el-option>
         </el-select>
         </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">出生日期：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.BIRTHDATESTART" format="yyyy-MM-dd"
               type="date" size="small" value-format="yyyy-MM-dd"
               placeholder="开始时间" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.BIRTHDATESTARTEND" format="yyyy-MM-dd"
                type="date" size="small" value-format="yyyy-MM-dd"
                placeholder="结束时间" >
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
                <span class="input-text">国籍/地区：</span>
                <el-select v-model="pd.NATIONALITY" filterable clearable placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
            </el-col>
      <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
      <span class="input-text">证件种类：</span>
      <el-select v-model="pd.CARDTYPE" placeholder="请选择"  filterable clearable size="small" class="input-input">
        <el-option
          v-for="item in docCode"
          :key="item.CODE"
          :label="item.CODE+' - '+item.NAME"
          :value="item.CODE">
        </el-option>
      </el-select>
      </el-col>
      <el-col  :sm="24" :md="12" :lg="8"   class="input-item">
         <span class="input-text">证件号码：</span>
         <el-input placeholder="请输入内容" size="small" v-model="pd.CARDNO" class="input-input"></el-input>
      </el-col>
      </el-row>
     </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd,orders,direction)">查询</el-button>
          <el-button type="primary" plain size="small"  class="mt-15" @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-row class="mb-15">
        <el-button type="warning" size="small" name="tdrymd_batch_export" @click="exportdata">批量导出</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="mt-10 o-table3"
        @header-click="headerClick"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange">
        <!-- <el-table-column
         type="selection"
         width="40">
        </el-table-column> -->
        <el-table-column
          prop="RISKDICTIONARIES"
          label="姓名" sortable>
        </el-table-column>

         <el-table-column
           prop="GENDER"
          label="性别" sortable
          >
          <template slot-scope="scope">
              {{scope.row.GENDER | fiftersex}}
            </template>
        </el-table-column>
        <el-table-column
          prop="DATEOFBIRTH"
          label="出生日期" sortable>
        </el-table-column>
        <el-table-column
          prop="NATIONALITYNAME"
          label="国籍/地区" sortable>
        </el-table-column>
        <el-table-column
         prop="CARDTYPENAME" sortable
          label="证件种类">
        </el-table-column>
        <el-table-column
          prop="CARDNO" sortable
          label="证件号码">
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
  </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      orders:[],
      direction:0,
      pd: {},
      docCode: [],
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
      nation: [],
      multipleSelection: [],
    }
  },
  mounted() {
    this.queryNationality();
    this.queryDocCode();
  },
  activated() {
    this.queryNationality();
    this.queryDocCode();
    this.btnctlFn(this.$root.checkItem);
  },
  methods: {
    headerClick(column,event){
     event.target.title=column.label
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
    },
    handleCurrentChange(val) {
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
    },
    sortChange(data){
      this.orders=[data.prop];
      if(data.order=='descending'){
        this.direction=0
      }else{
        this.direction=1
      }
      // console.log(this.orders,this.direction)
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
    },
    reset(){
      this.CurrentPage=1;
      this.pageSize=10;
      this.pd={};
      this.orders=[];
      this.direction=0;
      this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
    },
    getList(currentPage,showCount,pd,orders,direction){
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd,
        "orders":orders,
        "direction":direction
      };
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getTDRYMD', p,
        r => {
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
          this.$nextTick(()=>{
            this.btnctlFn(this.$root.checkItem);
          })
        })
    },

    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);
          if (r.success) {
            this.nation = r.data;
          }
        })
    },
    queryDocCode() {
      this.$api.post('/manage-platform/cardAndVisaTypeController/queryDmDocCodeAndDmDocCodes', {},
        r => {
          //console.log(r);
          if (r.success) {
            this.docCode = r.data;
          }
        })
    },
    exportdata() {
      if(this.tableData.length==0){
        this.$message({
          message: '表格无数据！',
          type: 'warning'
        });
        return
      }
      let p = {
        "currentPage": this.CurrentPage,
        "showCount": this.pageSize,
        "pd": this.pd,
        "orders":this.orders,
        "direction":this.direction
      };
      this.$api.post('/manage-platform/riskRecordExtInterfaceController/getExcelTDRYMD', p,
        r => {
          this.downloadM(r)
        },e=>{},'','blob')
    },
    downloadM(data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data.data], {
        type: "application/octet-stream"
      }))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '偷渡人员名单.xlsx')
      document.body.appendChild(link)
      link.click()
    },
  },
  filters: {

    fiftersex(val) {
      if (val == "U") {

        return "未知"

      } else if (val == "M") {
        return "男"
      } else if (val == "F") {
        return "女";
      }else {
        return "";
      }
    },
    fiftertt(val) {

      if (val == 0) {
        return "无效";
      } else if(val == 1){
        return "有效";
      }

    }
  },
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
  width: 25% !important;
}

.yy-input-input {
  width: 68% !important;
}

.yycolor {
  background: green;
  padding: 3px 8px;
  color: #ffffff;
}

.yycolory {
  background: red;
  padding: 3px 8px;
  color: #ffffff;
}
</style>
