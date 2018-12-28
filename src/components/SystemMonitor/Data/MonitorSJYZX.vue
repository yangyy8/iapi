<template lang="html">
  <div class="listAnalysis">
    <div class="middle middle-top">

      <el-button type="success"   size="small" class="mb-9" @click="getData">查询</el-button>
      <table class="o-table2" cellspacing="0">
        <tr class="th1">
          <th align="center"></th>
          <th align="center">内存数据(MD5值)</th>
          <th align="center">业务平台(MD5值)</th>
          <th align="center">查询同步时间</th>
          <th align="center" width="100">是否一致</th>
          <th align="center" width="100">操作</th>
        </tr>
        <tr>
          <td class="th3">入境黑名单</td>
          <td class="tc1">{{tableData1.blackinredis}}</td>
          <td class="tc2">{{tableData1.blackindb}}</td>
          <td class="tc1">{{tableData1.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData1.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData1.isequal==1 || tableData1.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
          <el-button v-if="tableData1.isequal==1" @click="getTB('1')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>
          </td>
        </tr>
        <tr>
          <td class="th3">出境黑名单</td>
          <td class="tc1">{{tableData2.blackoutredis}}</td>
          <td class="tc2">{{tableData2.blackoutdb}}</td>
          <td class="tc1">{{tableData2.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData2.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData2.isequal==1 || tableData2.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
          <el-button v-if="tableData2.isequal==1" @click="getTB('2')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>
          </td>
        </tr>
        <tr>
          <td class="th3">失效签证</td>
          <td class="tc1">{{tableData3.invalidredis}}</td>
          <td class="tc2">{{tableData3.invaliddb}}</td>
          <td class="tc1">{{tableData3.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData3.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData3.isequal==1 || tableData3.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
            <el-button v-if="tableData3.isequal==1" @click="getTB('3')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>

          </td>
        </tr>
        <tr>
          <td class="th3">入境白名单</td>
          <td class="tc1">{{tableData4.whiteinredis}}</td>
          <td class="tc2">{{tableData4.whiteindb}}</td>
          <td class="tc1">{{tableData4.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData4.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData4.isequal==1 || tableData4.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
            <el-button v-if="tableData4.isequal==1" @click="getTB('4')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>

          </td>
        </tr>
        <tr>
          <td class="th3">出境白名单</td>
          <td class="tc1">{{tableData5.whiteoutredis}}</td>
          <td class="tc2">{{tableData5.whiteoutdb}}</td>
          <td class="tc1">{{tableData5.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData5.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData5.isequal==1 || tableData5.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
            <el-button v-if="tableData5.isequal==1" @click="getTB('5')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>

          </td>
        </tr>
        <tr>
          <td class="th3">入境临控名单</td>
          <td class="tc1">{{tableData6.ctlinredis}}</td>
          <td class="tc2">{{tableData6.ctlindb}}</td>
          <td class="tc1">{{tableData6.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData6.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData6.isequal==1 || tableData6.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
          <el-button v-if="tableData6.isequal==1" @click="getTB('6')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>

          </td>
        </tr>
        <tr>
          <td class="th3">出境临控名单</td>
          <td class="tc1">{{tableData7.ctloutredis}}</td>
          <td class="tc2">{{tableData7.ctloutdb}}</td>
          <td class="tc1">{{tableData7.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData7.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData7.isequal==1 || tableData7.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
            <el-button v-if="tableData7.isequal==1" @click="getTB('7')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>

          </td>
        </tr>
        <tr>
          <td class="th3">数据项校验</td>
          <td class="tc1">{{tableData8.dataruleredis}}</td>
          <td class="tc2">{{tableData8.dataruledb}}</td>
          <td class="tc1">{{tableData8.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData8.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData8.isequal==1 || tableData8.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
          <el-button v-if="tableData8.isequal==1" @click="getTB('8')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>

          </td>
        </tr>
        <tr>
          <td class="th3">业务规则</td>
          <td class="tc1">{{tableData9.busruleredis}}</td>
          <td class="tc2">{{tableData9.busruledb}}</td>
          <td class="tc1">{{tableData9.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData9.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData9.isequal==1 || tableData9.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
            <el-button v-if="tableData9.isequal==1" @click="getTB('9')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>
          </td>
        </tr>
        <tr>
          <td class="th3">入境失效证件</td>
          <td class="tc1">{{tableData10.invalidinredis}}</td>
          <td class="tc2">{{tableData10.invalidindb}}</td>
          <td class="tc1">{{tableData10.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData10.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData10.isequal==1 || tableData10.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
            <el-button v-if="tableData10.isequal==1" @click="getTB('10')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>

          </td>
        </tr>

        <tr>
          <td class="th3">出境失效证件</td>
          <td class="tc1">{{tableData11.invalidoutredis}}</td>
          <td class="tc2">{{tableData11.invalidoutdb}}</td>
          <td class="tc1">{{tableData11.SYNCTIME}}</td>
          <td class="tc2">
            <img v-if="tableData11.isequal==0" src="../../../assets/img/hook.png"/>
            <img v-else-if="tableData11.isequal==1 || tableData11.isequal==2" src="../../../assets/img/cross.png"/>
            <i v-else class="el-icon-loading"></i>
          </td>
          <td class="tc1">
            <el-button v-if="tableData11.isequal==1" @click="getTB('11')"  plain size="mini" class="btn">同步</el-button>
          <el-button  v-else  size="mini" :disabled="true">同步</el-button>

          </td>
        </tr>
      </table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="30%"
      >
      <span style="font-size:20px;">{{dtext}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getsuretb()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData1: {blackinredis:'---',blackindb:'---',SYNCTIME:'---'},
      tableData2: {blackoutredis:'---',blackoutdb:'---',SYNCTIME:'---'},
      tableData3: {invalidredis:'---',invaliddb:'---',SYNCTIME:'---'},
      tableData4: {whiteinredis:'---',whiteindb:'---',SYNCTIME:'---'},
      tableData5: {whiteoutredis:'---',whiteoutdb:'---',SYNCTIME:'---'},
      tableData6: {ctlinredis:'---',ctlindb:'---',SYNCTIME:'---'},
      tableData7: {ctloutredis:'---',ctloutdb:'---',SYNCTIME:'---'},
      tableData8: {dataruleredis:'---',dataruledb:'---',SYNCTIME:'---'},
      tableData9: {busruleredis:'---',busruledb:'---',SYNCTIME:'---'},
      tableData10: {invalidinredis:'---',invalidindb:'---',SYNCTIME:'---'},
      tableData11: {invalidoutredis:'---',invalidoutdb:'---',SYNCTIME:'---'},
      centerDialogVisible: false,
      num: "1",
      dtext: "该数据同步时间较长，需要等待..."
    }
  },
  mounted() {
  //  this.getData();
  },
  methods: {
    getData() {

      this.getList("1");
      this.getList("2");
      this.getList("3");
      this.getList("4");
      this.getList("5");
      this.getList("6");
      this.getList("7");
      this.getList("8");
      this.getList("9");
      var that = this;
      setTimeout(function() {
        that.getList("10");
        that.getList("11");
      }, 1000);
    },
    getList(i) {

      let p = {
        "VALUE": i
      };

      this.$api.post('/manage-platform/monitorData/dataConsistency', p,
        r => {
          switch (i) {
            case "1":
              this.tableData1 = r.data;
              break;
            case "2":
              this.tableData2 = r.data;
              break;
            case "3":
              this.tableData3 = r.data;
              break;
            case "4":
              this.tableData4 = r.data;
              break;
            case "5":
              this.tableData5 = r.data;
              break;
            case "6":
              this.tableData6 = r.data;
              break;
            case "7":
              this.tableData7 = r.data;
              break;
            case "8":
              this.tableData8 = r.data;
              break;
            case "9":
              this.tableData9 = r.data;
              break;
            case "10":
              this.tableData10 = r.data;
              break;
            case "11":
              this.tableData11 = r.data;
              break;

            default:
              break;
          }

        })
    },

    getTB(n) {
      this.num = n;
      this.centerDialogVisible = true;
    },

    getsuretb() {
      let p = {
        "VALUE": this.num
      };

      this.$api.post('/manage-platform/monitorData/syncData', p,
        r => {
           console.log('---'+r.data.success);
          if (r.data.success) {
            if (this.num != "8" && this.num != "9") {
              var md = "Visa";
              if (this.num == "1") {
                md = "Blkin";
              } else if (this.num == "2") {
                md = "Blkout";
              } else if (this.num == "3") {
                md = "Visa";
              } else if (this.num == "4") {
                md = "Whtin";
              } else if (this.num == "5") {
                md = "Whtout";
              } else if (this.num == "6") {
                md = "Tctlin";
              } else if (this.num == "7") {
                md = "Tctlout";
              } else if (this.num == "10") {
                md = "BlkinCard";
              } else if (this.num == "11") {
                md = "BlkoutCard";
              }
              let pp = {
                "nameListType": md
              };
              console.log('===='+md);
              this.$api.post('/manage-platform/exchange/synDataNameListBatchInfo', pp,
                s => {
                    console.log('++++++++++++'+s.success);
                  if (s.data.success) {
                    this.$message({
                      message: s.data.message,
                      type: 'success'
                    });
                    this.centerDialogVisible = false;
                  }
                });
            } else {
                console.log('ddddd');
              this.$message({
                message: r.data.message,
                type: 'success'
              });
              this.centerDialogVisible = false;
            }
          } else {
              console.log('ffff'+r.data.message);
            this.$message.error(r.data.message);
            this.centerDialogVisible = false;
          }
        });
       this.getList(this.num);
    }
  },
}
</script>

<style scoped>
.o-table2 {
  width: 100%;
}

.o-table2 tr {
  height: 40px;
}

.o-table2 td,
th {
  border: 1px #eee solid;
  height: 40px;
  padding: 0 !important;
  /* height: 32px; */
}

.th1 {
  background: #909399;
  color: #fff;
}

.th2 {
  background: #d0ebfc;
  color: #3367a3;
}

.th3 {
  background: #78a4d1;
  color: #fff;
}

.th4 {
  background: #8db3d8;
  color: #fff;
}

.tc1 {
  color: #439227;
}

.tc2 {
  color: #fb6d55
}

.btn {
  background: #78A4D1;
  color: #FFFFFF;
  border: 1px #78A4D1 solid;
}
</style>
