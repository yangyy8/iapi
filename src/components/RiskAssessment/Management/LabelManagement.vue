<template lang="html">
  <div class="zlbg">
    <div class="middle mb-6">
      <el-row type="flex" >
        <el-col :span="22" class="br pr-20">
          <el-row align="center"   :gutter="2" >
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">标签分类：</span>
              <el-select v-model="pd.LABELTYPE_CODE" filterable clearable  placeholder="请选择"  size="small" class="yy-input-input">
                <el-option
                  v-for="item in company"
                  :key="item.CODE"
                  :label="item.NAME"
                  :value="item.CODE">
                </el-option>
              </el-select>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">标签名称：</span>
              <el-input placeholder="请输入内容" size="small" v-model="pd.LABELNAME"  class="input-input"></el-input>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="8"  class="input-item">
              <span class="input-text">创建时间：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.BEGINDATE" format="yyyy-MM-dd HH:mm:ss"
               type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss"
               placeholder="开始时间"  >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.EXPIREDATE" format="yyyy-MM-dd HH:mm:ss"
                type="datetime" size="small" value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="结束时间">
            </el-date-picker>
          </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area">
          <el-button type="success" size="small" @click="CurrentPage=1;getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="middle" @mouseover="mouseHeader">
      <el-row class="mb-15">
        <el-button type="primary" size="small" @click="adds(0,'');form={};">新增</el-button>
        </el-row>
      <el-table
        :data="tableData"
        border
        style="width: 100%;"
        class="mt-10 o-table3"
        @header-click="headerClick"
        @sort-change="sortChange"
        >
        <el-table-column
          prop="LABELTYPE_NAME" sortable
          label="标签分类">
        </el-table-column>
         <el-table-column
          prop="LABELNAME" sortable
          label="标签名称"
          >
        </el-table-column>
        <el-table-column
          prop="LABELREASON" sortable
          label="标签描述">
        </el-table-column>
        <el-table-column
          prop="CREATEUSERNAME" sortable
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="CREATETIME" sortable
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="UPDATEUSERNAME" sortable
          label="最后更新人">
        </el-table-column>
        <el-table-column
          prop="UPDATETIME" sortable
          label="最后更新时间">
        </el-table-column>
        <el-table-column
          label="操作" width="120">
          <template slot-scope="scope">
              <el-button type="text" class="a-btn" title="详情"  icon="el-icon-tickets" @click="details(scope.row)"></el-button>
              <el-button type="text" class="a-btn" title="编辑"  icon="el-icon-edit" @click="adds(1,scope.row)"></el-button>
              <el-button type="text" class="a-btn" title="删除"  icon="el-icon-delete" @click="deletes(scope.row)"></el-button>
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
          :current-page.sync ="CurrentPage"
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="TotalResult">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="dialogText" :visible.sync="addDialogVisible" width="500px" >
      <el-form :model="form" ref="addForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo" data-name="LABELTYPE_CODE" data-type="select"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 标签分类：</span>
             <el-select v-model="form.LABELTYPE_CODE" filterable clearable  placeholder="请选择"  size="small" class="yy-input-input">
               <el-option
                 v-for="item in company"
                 :key="item.CODE"
                 :label="item.NAME"
                 :value="item.CODE">
               </el-option>
             </el-select>
          </el-col>
        </el-row>
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item my-form-group" data-scope="demo" data-name="LABELNAME" data-type="input"
            v-validate-easy="[['required']]">
            <span class="yy-input-text"><font class="yy-color">*</font> 标签名称：</span>
            <el-input placeholder="请输入内容(长度不超过11)" size="small" maxlength="11"  v-model="form.LABELNAME"  class="yy-input-input" ></el-input>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">标签描述：</span>
           <el-input type="textarea" placeholder="请输入内容" maxlength="1300" :autosize="{ minRows: 3, maxRows: 6}" v-model="form.LABELREASON" class="yy-input-input"></el-input>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addItem('addForm')" size="small">确 定</el-button>
        <el-button @click="addDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="详情" :visible.sync="detailsDialogVisible" width="500px" >
      <el-form :model="map" ref="mapForm">
        <el-row type="flex"  class="mb-6">
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">标签分类：</span>
          <span class="yy-input-input detailinput">  {{mapForm.LABELTYPE_NAME}}</span>
            </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">标签名称：</span>
          <span class="yy-input-input detailinput">  {{mapForm.LABELNAME}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">标签描述：</span>
          <span class="yy-input-input detailinput">  {{mapForm.LABELREASON}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">创建人：</span>
          <span class="yy-input-input detailinput">  {{mapForm.CREATEUSERNAME}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">创建时间：</span>
          <span class="yy-input-input detailinput">  {{mapForm.CREATETIME}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">最后更新人：</span>
          <span class="yy-input-input detailinput">  {{mapForm.UPDATEUSERNAME}}</span>
          </el-col>
        </el-row>
        <el-row type="flex" class="mb-6" >
          <el-col :span="24" class="input-item">
            <span class="yy-input-text">最后更新时间：</span>
          <span class="yy-input-input detailinput">  {{mapForm.UPDATETIME}}</span>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="detailsDialogVisible = false" size="small">取 消</el-button>
      </div>
    </el-dialog>

  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tp: 0,
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      orders:[],
      direction:0,
      pd: {},
      company: [],
      sertail:"",
      dialogText:"新增",
      addDialogVisible: false,
      detailsDialogVisible: false,
      menuDialogVisible: false,
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
      menudata: [],
      defaultProps: {
        children: 'menuList',
        label: 'name'
      },
      defaultChecked:[],
      multipleSelection: [],

      form: {},
      mapForm: {},
      map:{},
      Airport: [],
    }
  },
  mounted() {
    //this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
  },
  activated(){
  //  this.getList(this.CurrentPage, this.pageSize, this.pd);
    this.queryNationality();
  },
  methods: {
    headerClick(column,event){
  event.target.title=column.label
},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      // this.getList(this.CurrentPage, val, this.pd);
        this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // this.getList(val, this.pageSize, this.pd);
        this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
      console.log(`当前页: ${val}`);
    },
    sortChange(data){
   this.orders=[data.prop];
   if(data.order=='descending'){
     this.direction=0
   }else{
     this.direction=1
   }
   console.log(this.orders,this.direction)
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
      this.$api.post('/manage-platform/userLabel/getUserLabelPage', p,
        r => {
          console.log("----" + r);
          this.tableData = r.data.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryRiskLabeltypeList', {},
        r => {
          console.log(r);
          if (r.success) {
            this.company = r.data;
          }
        })
    },

    adds(n, i) {
      this.addDialogVisible = true;

      if (n != 0) {
        this.tp = 1;
        // this.form = i;
        this.form=Object.assign({}, i);
        this.dialogText="编辑";
      }else {
        this.tp = 0;
        this.dialogText="新增";
      }
      this.V.$reset("demo");
    },
    addItem(formName) {
      this.V.$submit('demo', (canSumit,data) => {
        // canSumit为true时，则所有该scope的所有表单验证通过
         if(!canSumit) return;
         // 只有验证全部通过才会执行
      // if(this.form.LABELTYPE_CODE=="" || this.form.LABELTYPE_CODE==undefined){
      //
      //       this.$message.error("请选择标签分类");
      //       return  false;
      // }
      // if(this.form.LABELNAME=="" || this.form.LABELNAME==undefined){
      //
      //       this.$message.error("标签名称不能为空");
      //       return  false;
      // }

      var url = "/manage-platform/userLabel/addUserLabel";
      if (this.tp == 1) {
        url = "/manage-platform/userLabel/updateUserLabel";
      }
      this.$api.post(url, this.form,
        r => {
          console.log(r);
          if (r.success) {
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
          } else {
            this.$message.error(r.Message);
          }

          this.$refs[formName].resetFields();
          this.addDialogVisible = false;
          this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
          // this.tableData=r.Data.ResultList;
        }, e => {
          this.$message.error('失败了');
        });
      });
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.mapForm = i;
    },
    deletes(i) {
      let p = {
        "SERIAL": i.SERIAL
      };
      this.$confirm('您是否确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        this.$api.post('/manage-platform/userLabel/deleteUserLabel', p,
          r => {
            console.log("===" + r);
            if (r.success) {
              this.$message({
                message: '删除成功！',
                type: 'success'
              });
             this.getList(this.CurrentPage,this.pageSize,this.pd,this.orders,this.direction);
            } else {
              this.$message.error(r.Message);
            }
          }, e => {
            this.$message.error('失败了');

          });


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    menus(i) {
      this.menuDialogVisible = true;
      this.sertail=i.SERIAL;
      let p = {
        "SERIAL": i.SERIAL
      };
      this.$api.post('/manage-platform/roleSys/goEditJuri', p,
        r => {
          console.log(r);
          if (r.success) {
            this.menudata = r.data.userTreeOne;
            let arr=r.data.userTreeOne,that=this;
            this.defaultChecked=r.data.checkList;
          }
        })


    },
menuItem(){

  let checkList=this.$refs.tree.getCheckedNodes();
  //let checkList=this.$refs.tree.getCheckedKeys();
  let p={
    // menuList:this.menudata,
   "ROLE_ID":this.sertail,
    checkList:checkList
  }
  this.$api.post('/manage-platform/roleSys/editJuri', p,
    r => {
      console.log(r);
      if (r.success) {
        this.$message({
          type: 'success',
          message: '保存成功'
        });
      }else{

  this.$message.error('保存失败');
      }
    })
        this.menuDialogVisible = false;

},
  },
  filters: {

    fifterstatus(val) {
      if (val == 0) {
        return "停用"

      } else {
        return "启用"
      }
      // return val*2
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
</style>
