<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="20" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>
          <el-row align="center"   :gutter="2" >

            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">监控区域：</span>
              <el-select v-model="pd.synflag" placeholder="请选择" size="small"  filterable clearable class="input-input">
                <el-option value="1" label="DMZ区" >
                </el-option>
                 <el-option value="" label="业务平台区" >
                 </el-option>

               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">日志类型：</span>
              <el-select v-model="pd.rzlx" placeholder="请选择"  filterable clearable size="small" class="input-input">
                <el-option value="" label="全部" >
                </el-option>
                <el-option value="0" label="0 - 系统日志" >
                </el-option>
                <el-option value="1" label="1 - 错误日志" >
                </el-option>
                <el-option value="2" label="2 - 操作日志" >
                </el-option>
               </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">生成时间：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begin"
               type="date" size="small" value-format="yyyyMMdd"
               placeholder="开始时间"  :picker-options="pickerOptions1">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.end"
                type="date" size="small" value-format="yyyyMMdd"
                placeholder="结束时间" :picker-options="pickerOptions1">
            </el-date-picker>
          </div>
            </el-col>

          </el-row>
        </el-col>
        <el-col :span="4" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>

        </el-col>

      </el-row>
    </div>
    <div class="middle">

      <el-table
        :data="tableData"
        border
        style="width: 100%;">


        <el-table-column
          prop="synFlag"
          label="监控区域"  sortable>

        </el-table-column>
        <el-table-column
          prop="rzlx"
          label="日志类型"  sortable
          >
        </el-table-column>
        <el-table-column
          prop="timestmp"
          label="生成时间" sortable>
        </el-table-column>
        <el-table-column
          prop="levelString"
          label="日志内容" sortable
          >
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="flex-r">

              <el-button class="table-btn" size="mini" plain icon="el-icon-tickets" @click="details(scope.row)">详情</el-button>
            </div>

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


    <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"
      width="600px">

      <el-form :model="form">
     <div class="titile">监控消息</div>
        <el-row type="flex" class="mb-15">
          <el-col :span="24" class="titlecontent">
            {{form.formattedMessage}}
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button  @click="detailsDialogVisible = false" size="small">取消</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {rzlx:""},
      nation: [],
      value: '',
      value1: "",
      addDialogVisible: false,
      detailsDialogVisible: false,
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

      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
          form: {},

    }
  },
  mounted() {
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
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      var url="eamp/log_event/queryListPage";
      if(pd.type=="1"){
        url="eamp/log_event/querylistPageExpretion";
      }
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
    this.form=i;
    },

  }
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
.titile{font-size: 18px; line-height: 40px;border-bottom: 1px solid #368ECD; margin-bottom: 10px;}
.titlecontent{font-size: 16px;}
</style>
