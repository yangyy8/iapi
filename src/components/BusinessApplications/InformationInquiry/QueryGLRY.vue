<template lang="html">
  <div class="rank">

    <div class="middle-top mb-2">
      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件   <span class="gg">注：证件号码或者姓名性别出生日期条件二选一</span>
          </div>
          <el-row align="center"   :gutter="2">
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text"><font color="red">*</font> 航班号：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.fltno" class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">航班日期：</span>
               <el-date-picker
               v-model="pd.fltdate" format="yyyy-MM-dd" class="input-input"
               type="date" size="small" value-format="yyyyMMdd"
               placeholder="选择时间">
             </el-date-picker>
            </el-col>
           </el-row>
            <el-row align="center"   :gutter="2" class="yy-line">
              <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text"><font color="red">*</font> 国籍/地区：</span>
                  <el-select v-model="pd.nationality" filterable clearable  placeholder="请选择"  size="small" class="input-input">
                    <el-option
                      v-for="item in nation"
                      :key="item.CODE"
                      :label="item.CODE+' - '+item.CNAME"
                      :value="item.CODE">
                    </el-option>
                  </el-select>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                <span class="input-text">证件号码：</span>
                  <el-input placeholder="请输入内容" size="small" v-model="pd.cardnum" class="input-input"></el-input>
               </el-col>
            </el-row>
            <el-row align="center"   :gutter="2" class="yy-line">
              <el-col  :sm="24" :md="12" :lg="11"   class="input-item">
                <span class="input-text">姓名：</span>
                <el-input placeholder="请输入内容" size="small" v-model="pd.name"   class="input-input"></el-input>
              </el-col>
              <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                  <span class="input-text">性别：</span>
                  <el-select v-model="pd.gender"  class="input-input"   filterable clearable  placeholder="请选择"  size="small">
                    <el-option value="U" label="U - 未知">
                    </el-option>
                    <el-option value="M" label="M - 男">
                    </el-option>
                    <el-option value="F" label="F - 女">
                    </el-option>
                  </el-select>
                </el-col>
              <el-col  :sm="24" :md="12" :lg="11"   class="input-item">
              <span class="input-text">出生日期：</span>
              <el-date-picker
              v-model="pd.birthday"
              type="date" size="small" format="yyyy-MM-dd" value-format="yyyyMMdd" class="input-input"
              placeholder="选择时间">
            </el-date-picker>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"   class="input-item">
              <span class="input-text">值机间隔参数：</span>
              <el-input placeholder="10" size="small" v-model="pd.intervel"  class="input-input"></el-input>
            </el-col>
        </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)" class="mb-15">查询</el-button>
          <el-button type="success" size="small" @click="reset" class="mb-15">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <div class="middle">
      <div class="ak-tab mb-20">
      <div class="ak-tabs">
        <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="base">
          同订票人员
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="base1">
          同值机人员
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==2}" @click="base2">
          同航班人员
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==3}" @click="base3">
          临近座位人员
        </div>
      </div>
    <div class="ak-tab-pane" @mouseover="mouseHeader">
        <div v-show="page==0">
            <el-table
              :data="tableData"
              border
              style="width: 100%;"
              class="mt-10 o-table3"
              @header-click="headerClick">
              <el-table-column
                prop="fltno"
                label="航班号" sortable>
              </el-table-column>
              <el-table-column
                prop="departdate"
                label="计划起飞时间" width="130"  sortable>
              </el-table-column>
              <el-table-column
                prop="arrivdate"
                label="计划到达时间" width="130"  sortable>
              </el-table-column>
              <el-table-column
                prop="citfrom"
                label="出发地" sortable>
              </el-table-column>
              <el-table-column
                prop="cityto"
                label="到达地" sortable>
              </el-table-column>
              <el-table-column
                prop="nationality"
                label="国籍/地区" sortable>
              </el-table-column>
              <el-table-column
                prop="cardnum"
                label="证件号码" sortable>
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名" sortable>
              </el-table-column>
              <el-table-column
                prop="gender"
                label="性别" sortable>
              </el-table-column>
              <el-table-column
                prop="birthday"
                label="出生日期" sortable>
              </el-table-column>
              <el-table-column
                prop="rci"
                label="订单号" sortable>
              </el-table-column>
              <el-table-column
                prop="rcitime"
                label="订单时间" sortable>
              </el-table-column>
            </el-table>
            <div class="middle-foot">
              <div class="page-msg">
                <div class="">
                共{{TotalResult}}条
                </div>
              </div>
            </div>
        </div>
        <div v-show="page==1">
          <el-table
            :data="tableData1"
            border
            style="width: 100%;"
            class="mt-10 o-table3"
            @header-click="headerClick">
            <el-table-column
              prop="fltno"
              label="航班号" sortable>
            </el-table-column>
            <el-table-column
              prop="departdate"
              label="计划起飞时间" width="130"  sortable>
            </el-table-column>
            <el-table-column
              prop="arrivdate"
              label="计划到达时间" width="130"  sortable>
            </el-table-column>
            <el-table-column
              prop="citfrom"
              label="出发地" sortable>
            </el-table-column>
            <el-table-column
              prop="cityto"
              label="到达地" sortable>
            </el-table-column>
            <el-table-column
              prop="nationality"
              label="国籍/地区" sortable>
            </el-table-column>
            <el-table-column
              prop="cardnum"
              label="证件号码" sortable>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名" sortable>
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别" sortable>
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="出生日期" sortable>
            </el-table-column>
            <el-table-column
              prop="chktime"
              label="值机时间" sortable>
            </el-table-column>
            <el-table-column
              prop="specifigseat"
              label="座位号" sortable>
            </el-table-column>
          </el-table>
          <div class="middle-foot">
            <div class="page-msg">
              <div class="">
              共{{TotalResult1}}条
              </div>
            </div>
          </div>
        </div>

        <div v-show="page==2">

          <el-table
            :data="tableData2"
            border
            style="width: 100%;"
            class="mt-10 o-table3"
            @header-click="headerClick">
            <el-table-column
              prop="fltno"
              label="航班号" sortable>
            </el-table-column>
            <el-table-column
              prop="departdate"
              label="计划起飞时间" width="130"  sortable>
            </el-table-column>
            <el-table-column
              prop="arrivdate"
              label="计划到达时间" width="130"  sortable>
            </el-table-column>
            <el-table-column
              prop="citfrom"
              label="出发地" sortable>
            </el-table-column>
            <el-table-column
              prop="cityto"
              label="到达地" sortable>
            </el-table-column>
            <el-table-column
              prop="nationality"
              label="国籍/地区" sortable>
            </el-table-column>
            <el-table-column
              prop="cardnum"
              label="证件号码" sortable>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名" sortable>
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别" sortable>
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="出生日期" sortable>
            </el-table-column>
            <el-table-column
              prop="chktime"
              label="值机时间" sortable>
            </el-table-column>
            <el-table-column
              prop="specifigseat"
              label="座位号" sortable>
            </el-table-column>
          </el-table>

            <div class="middle-foot">
              <div class="page-msg">
                <div class="">
                  共{{Math.ceil(TotalResult2/pageSize2)}}页
                </div>
                <div class="">
                  每页
                  <el-select v-model="pageSize2" @change="pageSizeChange2(pageSize2)" placeholder="10" size="mini" class="page-select">
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
                  共{{TotalResult2}}条
                </div>
              </div>
              <el-pagination
                background
                @current-change="handleCurrentChange2"
                :page-size="pageSize2"
                layout="prev, pager, next"
                :total="TotalResult2">
              </el-pagination>
            </div>

        </div>
        <div v-show="page==3">

          <el-table
            :data="tableData3"
            border
            style="width: 100%;"
            class="mt-10 o-table3"
            @header-click="headerClick">
            <el-table-column
              prop="fltno"
              label="航班号" sortable>
            </el-table-column>
            <el-table-column
              prop="departdate"
              label="计划起飞时间" width="130" sortable>
            </el-table-column>
            <el-table-column
              prop="arrivdate"
              label="计划到达时间" width="130"  sortable>
            </el-table-column>
            <el-table-column
              prop="citfrom"
              label="出发地" sortable>
            </el-table-column>
            <el-table-column
              prop="cityto"
              label="到达地" sortable>
            </el-table-column>
            <el-table-column
              prop="nationality"
              label="国籍/地区" sortable>
            </el-table-column>
            <el-table-column
              prop="cardnum"
              label="证件号码" sortable>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名" sortable>
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别" sortable>
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="出生日期" sortable>
            </el-table-column>
            <el-table-column
              prop="chktime"
              label="值机时间" sortable>
            </el-table-column>
            <el-table-column
              prop="specifigseat"
              label="座位号" sortable>
            </el-table-column>
          </el-table>
          <div class="middle-foot">
            <div class="page-msg">
              <div class="">
              共{{TotalResult3}}条
              </div>
            </div>
          </div>
        </div>

      </div>
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
      CurrentPage1: 1,
      pageSize1: 10,
      TotalResult1: 0,
      CurrentPage2: 1,
      pageSize2: 10,
      TotalResult2: 0,
      CurrentPage3: 1,
      pageSize3: 10,
      TotalResult3: 0,
      CurrentPage4: 1,
      pageSize4: 10,
      TotalResult4: 0,
      pd: {
        fltno:'',
        fltdate:'',
        cardnum:'',
        name:'',
        gender:'',
        birthday:'',
        intervel:10,
        nationality:'',
      },
      pd1: {},
      pd2: {},
      pd3: {},
      pd4: {},
      nation:[],
      page: 0,
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
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [],
      isRoute:false,
    }
  },

  mounted() {
    this.queryNationality();
    // if(this.$route.query.page==undefined){
    //   this.page=0
    // }else{
    //   this.page = this.$route.query.page;
    // }
    // this.page = this.$route.query.page;
    // this.pd.fltno = this.$route.query.row.FLTNO;
    // this.pd.fltdate = this.zhuanhuan(this.$route.query.row.FLTDATESTR);
    // this.pd.nationality = this.$route.query.row.NATIONALITY;
    // this.pd.cardnum = this.$route.query.row.PASSPORTNO;
    // this.pd.name = this.$route.query.row.linkName;
    // this.pd.gender = this.sexZhuan(this.$route.query.row.GENDER);
    // this.pd.birthday = this.zhuanhuan(this.$route.query.row.iapiBirthdayName);
  },
  activated() {
    this.queryNationality();
    console.log(this.$route.query.row)
    // if(this.$route.query.page==undefined){
    //   this.page=0
    // }else{
    // }
    if(this.$route.query.row){
      this.page = this.$route.query.page;
      this.pd.fltno = this.$route.query.row.FLTNO;
      this.pd.fltdate = this.zhuanhuan(this.$route.query.row.FLTDATESTR);
      this.pd.nationality = this.$route.query.row.NATIONALITY;
      this.pd.cardnum = this.$route.query.row.PASSPORTNO;
      // this.pd.name = this.$route.query.row.linkName;
      this.pd.gender = this.sexZhuan(this.$route.query.row.GENDER);
      this.pd.birthday = this.zhuanhuan(this.$route.query.row.iapiBirthdayName);
    }
    // console.log(this.$route.query.row.NATIONALITY)
  },
  methods: {
    reset(){
      this.pd = {
        fltno:'',
        fltdate:'',
        cardnum:'',
        name:'',
        gender:'',
        birthday:'',
        intervel:10,
        nationality:'',
      }
      this.tableData=[];
      this.tableData1=[];
      this.tableData2=[];
      this.tableData3=[];
      this.TotalResult2=0;
      this.currentPage2=1;
    },
    zhuanhuan(val){
      return val.split('-').join('');
    },
    sexZhuan(val){
      if(val == '女'){
        return 'F'
      }else if(val == '男'){
        return 'M'
      }else if(val == '未知'){
        return 'U'
      }
    },
    headerClick(column,event){
      event.target.title=column.label
    },
    base() {
      this.page = 0;
    },
    base1() {
      this.page = 1;
    },
    base2() {
      this.page = 2;
    },
    base3() {
      this.page = 3;
    },
    base4() {
      this.page = 4;
    },

    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);
      console.log(`当前页: ${val}`);
    },
    pageSizeChange1(val) {
      this.getList1(this.CurrentPage1, val, this.pd);
      console.log(`1每页 ${val} 条`);
    },
    handleCurrentChange1(val) {
      this.getList1(val, this.pageSize1, this.pd);
      console.log(`1当前页: ${val}`);
    },
    pageSizeChange2(val) {
      this.getList2(this.CurrentPage2, val, this.pd);
      console.log(`2每页 ${val} 条`);
    },
    handleCurrentChange2(val) {
      this.getList2(val, this.pageSize2, this.pd);
      console.log(`2当前页: ${val}`);
    },
    pageSizeChange3(val) {
      this.getList3(this.CurrentPage3, val, this.pd);
      console.log(`3每页 ${val} 条`);
    },
    handleCurrentChange3(val) {
      this.getList3(val, this.pageSize3, this.pd);
      console.log(`3当前页: ${val}`);
    },
    pageSizeChange4(val) {
      this.getList4(this.CurrentPage4, val, this.pd);
      console.log(`4每页 ${val} 条`);
    },
    handleCurrentChange4(val) {
      this.getList4(val, this.pageSize4, this.pd);
      console.log(`4当前页: ${val}`);
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);

            this.nation = r.data;

        })
    },
    getList(currentPage, showCount, pd) {

      if(this.pd.fltno==undefined || this.pd.fltno.trim()==""){
          this.$alert('航班号不能为空！', '提示', {
            confirmButtonText: '确定',
          });
          return false
      }
      if(this.pd.nationality==undefined || this.pd.nationality==""){
          this.$alert('国籍/地区不能为空！', '提示', {
            confirmButtonText: '确定',
          });
          return false
      }

      if(this.pd.cardnum==undefined || this.pd.cardnum.trim()==""){
        if(this.pd.name==undefined || this.pd.gender==undefined || this.pd.birthday==undefined || this.pd.name.trim()==""  || this.pd.birthday.trim()==""){
          this.$alert('证件号码或者姓名性别出生日期二选一！', '提示', {
            confirmButtonText: '确定',
          });
          return false
        }
      }
    let p = {
      "fltno":pd.fltno,
      "fltdate":pd.fltdate,
      "nationality":pd.nationality,
      "cardnum":pd.cardnum,
      "name":pd.name,
      "birthday":pd.birthday,
      "birthday":pd.birthday,
      "birthday":pd.birthday
    };

    var url="/manage-platform/relatedperson/get_related_book";
    this.$api.post(url, p,
      r => {
        console.log(r);
        this.tableData = r.data;
        this.TotalResult=r.data.length;
      });

    this.getList1(currentPage, showCount, pd);
    this.getList2(currentPage, showCount, pd);
    this.getList3(currentPage, showCount, pd);
    },
    getList1(currentPage1, showCount1, pd1) {
      let p = {
        "fltno":pd1.fltno,
        "fltdate":pd1.fltdate,
        "nationality":pd1.nationality,
        "cardnum":pd1.cardnum,
        "name":pd1.name,
        "birthday":pd1.birthday,
        "intervel":pd1.intervel
      };
     var url="/manage-platform/relatedperson/get_related_check";
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData1 = r.data;
          this.TotalResult1=r.data.length;
        })
    },
    selectChange(){
      this.$forceUpdate();
    },
    getList2(currentPage2, showCount2, pd2) {
      let p = {
        "currentPage": currentPage2,
        "showCount": showCount2,
        "cdt": pd2
      };
     var url="/manage-platform/relatedperson/get_related_flt";
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData2 = r.data.resultList;
          this.TotalResult2 = r.data.totalResult;
        })
    },
    getList3(currentPage3, showCount3, pd3) {

        let p = {

          "fltno":pd3.fltno,
          "fltdate":pd3.fltdate,
          "nationality":pd3.nationality,
          "cardnum":pd3.cardnum,
          "name":pd3.name,
          "birthday":pd3.birthday
        };

     var url="/manage-platform/relatedperson/get_related_seat";
      this.$api.post(url, p,
        r => {
          console.log(r);
          this.tableData3 = r.data;
            this.TotalResult3=r.data.length;
        })
    },

  }
}
</script>

<style scoped>
.rank{background: #ffffff; min-height: 750px;}
.gg{padding-left:20px;color:#FF9F9F;font-size:14px;font-weight:lighter}
.ak-checked{
  border: 1px #399bfe solid;
  border-bottom: 1px #fff solid;
}
</style>
