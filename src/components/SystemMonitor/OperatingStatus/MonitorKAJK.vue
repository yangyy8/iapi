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
              <el-select v-model="pd.clientStatus" placeholder="请选择" filterable clearable   size="small"   class="input-input">
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
    <div class="middle" @mouseover="mouseHeader">

      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="mt-10 o-table3"
        @header-click="headerClick">
        <el-table-column
          type="index"
          label="序号" width="60">
        </el-table-column>
        <el-table-column
          prop="portcode"
          label="口岸编号"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="portname"
          label="口岸名称" sortable>
        </el-table-column>
        <el-table-column
          label="口岸地址"
          sortable
          >
           <template slot-scope="scope">
            <span>{{scope.row.ipaddress}}</span> <span :class="{'ycolor':scope.row.clientStatus=='1','ycolory':scope.row.clientStatus=='0'}">{{scope.row.clientStatus|fiftersate}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="备用地址"
          sortable
          >
          <template slot-scope="scope">
            <span>{{scope.row.ipaddressBack}}</span><span :class="{'ycolor':scope.row.clientStatus=='1','ycolory':scope.row.clientStatus=='0'}">{{scope.row.clientBackStatus|fiftersate}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          label="接口状态"
          >
          <template slot-scope="scope">
              <span :class="{'yycolor':scope.row.clientStatus=='1','yycolory':scope.row.clientStatus=='0'}">  {{scope.row.clientStatus | fiftersate }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="backlog1"
          label="预报积压数"
          sortable
          >
        </el-table-column>
        <el-table-column
          prop="backlog2"
          label="申报积压数"
          sortable
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
      //this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated(){
    //  this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    headerClick(column,event){
    event.target.title=column.label
    },
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

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post("/manage-platform/portStatus/select", p,
        r => {
          console.log(r);
          this.tableData = r.data.pdList;
          this.TotalResult = r.data.totalResult;
        })
    },
  },
    filters: {
      fiftersate(val){
        if(val=="1"){

          return "( 正常 )"
        }else if(val=="0"){

          return "( 异常 )"
        }
      }
    }
}
</script>
<style scoped>
.yycolor{ background: green; padding: 3px 8px; color: #ffffff;}
.yycolory{  background: red;padding: 3px 8px; color: #ffffff;}
.ycolor{ color: green;padding-left:10px; font-size:12px;}
.ycolory{  color: red; padding-left:10px; font-size:12px;}
</style>
