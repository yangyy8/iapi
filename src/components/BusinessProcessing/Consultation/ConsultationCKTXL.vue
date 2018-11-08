
<template lang="html">
  <div class="basicInfo">
    <div class="middle-top mb-2">
        <el-row type="flex" class="middle">
          <el-col :span="22" class="br pr-20">
            <div class="title-green ">
              通讯录
            </div>
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
          prop="CONSULTFROM"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="STATIONFROM"
          label="航站">
        </el-table-column>
        <el-table-column
          prop="NAME"
          label="人员姓名">
        </el-table-column>
        <el-table-column
          prop="TELEPHONE"
          label="固定电话">
        </el-table-column>
        <el-table-column
          prop="CELLPHONE"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="FAX"
          label="传真">
        </el-table-column>
        <el-table-column
          prop="EMAIL"
          label="邮箱">
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
    this.getList();
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
    getList() {
      // let p = {
      //   "currentPage": currentPage,
      //   "showCount": showCount,
      //   "cdt": pd
      // };
      this.$api.post('/manage-platform/consult/queryConsultAddressList',{},
        r => {
          console.log(r);
          if (r.success) {
            this.tableData = r.data.resultList;
            this.TotalResult = r.data.totalResult;
          }
        })
    },
  }
}
</script>

<style scoped>

</style>
