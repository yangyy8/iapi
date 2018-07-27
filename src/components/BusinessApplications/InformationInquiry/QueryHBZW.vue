<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br">
          <div class="title-green ">
            查询条件
          </div>
        <el-row align="center"   :gutter="2" class="pr-20">
          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
            <span class="input-text">航班号：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.flightNumber"   class="input-input"></el-input>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
          <span class="input-text">航班日期：</span>
          <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.departdateBegin"
               type="datetime" size="small"
               placeholder="开始时间"  :picker-options="pickerOptions1"
               value-format="yyyyMMddHHmmss">
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.departdateEnd"
                type="datetime" size="small"
                value-format="yyyyMMddHHmmss"
                placeholder="结束时间" :picker-options="pickerOptions1">
             </el-date-picker>
             </div>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
            <QueryNationality  filterable clearable :nationality="pd.NATIONALITY"  @transNation="getNation"></QueryNationality>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
            <span class="input-text">证件号码：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.cardnum"   class="input-input"></el-input>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
            <span class="input-text">姓名：</span>
            <el-input placeholder="请输入内容" size="small" v-model="pd.travellerSurname"   class="input-input"></el-input>
          </el-col>
          <el-col  :sm="24" :md="12" :lg="6"  class="input-item">
              <span class="input-text">性别：</span>
              <el-select v-model="pd.gender"  class="input-input"   filterable clearable  placeholder="请选择"  size="small">

                <el-option value="U" label="U - 未知">
                </el-option>
                <el-option value="W" label="W - 男">
                </el-option>
                <el-option value="F" label="F - 女">
                </el-option>
              </el-select>
            </el-col>

            <el-col  :sm="24" :md="12" :lg="6"   class="input-item">
            <span class="input-text">出生日期：</span>
            <div class="input-input t-flex t-date">
                 <el-date-picker
                 v-model="pd.birthdateBegin"
                 type="date" size="small"
                 placeholder="开始时间"  :picker-options="pickerOptions1">
               </el-date-picker>
                 <span class="septum">-</span>
               <el-date-picker
                  v-model="pd.birthdateEnd"
                  type="date" size="small"
                  placeholder="结束时间" :picker-options="pickerOptions1">
               </el-date-picker>
               </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle">
        <span class="libie">列表</span><span class="tubiao">图表</span>
    <div id="div1">
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
                <el-table-column
                  prop="tsname"
                  label="姓名" sortable>
                </el-table-column>
                <el-table-column
                  prop="gender"
                  label="性别" sortable>
                </el-table-column>
                <el-table-column
                  prop="birthdate"
                  label="出生日期" sortable>
                </el-table-column>
                <el-table-column
                  prop="nationality"
                  label="国籍" sortable>
                </el-table-column>
                <el-table-column
                  prop="cardnum"
                  label="证件号码" sortable>
                </el-table-column>
                <el-table-column
                  prop="flightNumber"
                  label="航班号" sortable>
                </el-table-column>
                <el-table-column
                  prop="departdate"
                  label="航班日期" sortable>
                </el-table-column>
                <el-table-column
                  prop="boardingsequence"
                  label="登记序号" sortable>
                </el-table-column>
                <el-table-column
                  prop="specifigseat"
                  label="座位号" sortable>
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="状态" sortable>
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
<div id="div2" style="display:none">
  <el-row align="center"  type="flex">
    <el-col  :span="5" style="border-right:1px solid #cccccc; margin-right:30px;">
        <img src="../../../assets/img/port.png">
    </el-col>
    <el-col  :span="190" style="padding-top:50px;">
      <ul class="planUL">
        <li class="planLifirst">
          <div  v-for="i in list1">
            {{i}}
          </div>
        </li>
        <li v-for="i in list2" class="planLi">
          <div class="" > </div>
          <div class="">{{i}}</div>
        </li>
      </ul>
    </el-col>
  </el-row>
</div>
    </div>
  </div>

</template>

<script>
import QueryNationality from '../../other/queryNationality'
export default {
  components: {
    QueryNationality
  },
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {},
      list1:[],
      list2:[],
      list3:["1E","3F","4G"],
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
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      form: {},
    }
  },
  mounted() {
    this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.getimgtable(this.CurrentPage, this.pageSize, this.pd);
  },
  methods: {
    handleSelectionChange(val) {
    this.multipleSelection = val;
    },
    getNation(msg){
      this.pd.NATIONALITY=msg;
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
      this.$api.post('/manage-platform/statusUpdate/seat/queryListPages', p,
        r => {
          console.log(r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);
          if (r.Success) {
            this.nation = r.Data;
          }
        })
    },

    getimgtable(currentPage, showCount, pd){
      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "pd": pd
      };
      this.$api.post('/manage-platform/statusUpdate/seat/queryListPagesSeat', p,
        r => {
          console.log(r);
          this.list1 = r.data.list123;
          this.list2 = r.data.listabc;
        })
    },

    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.$api.post('/manage-platform/nameList/getNameListData', i,
        r => {
          console.log(r);
          // this.tableData=r.Data.ResultList;
        })
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
.planUL{
  display: flex;
  /* flex-direction:column; */
}
.planLi{
  display: flex;
  margin: 5px;
  flex-direction: column;
}
/* .planLi:first-child div{
  border: none;
  background: none
} */
.planLi div{
  width: 20px;
  height: 20px;
  border: 1px #105D93 solid;
  background: #70BDEB; text-align: center;
}
.planLifirst{
  display: flex;
  margin: 5px;
  flex-direction: column;
}
.planLifirst div{
  width: 20px;
  height: 20px;
  text-align: center;

}
.planLi div:last-child{
  border: none;
  background: none;text-align: center;
}

.libie{
  width:100px; padding:6px 15px; background:#56A8FE; border:1px solid #56A8FE; color:#ffffff;cursor: pointer;
}
.tubiao{
width:100px; padding:6px 15px;  border:1px solid #56A8FE;cursor: pointer;
}
</style>
