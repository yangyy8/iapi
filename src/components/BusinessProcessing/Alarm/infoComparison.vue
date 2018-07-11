<template lang="html">
  <div class="infoComparison">
    <el-row type="flex">
      <el-col :span="16" class="mr-2">
        <div class="middle middle-top mb-2">
          <div class="title-green">
            信息比对
          </div>
          <!-- <el-table
            class="o-th1"
            :data="tableData"
            border
            style="width: 100%;">
            <el-table-column

              label="类别"
              width="180">

            </el-table-column>
            <el-table-column
              prop="name"
              label="旅客信息"
              width="320">
            </el-table-column>
            <el-table-column
              prop="address"
              label="名单信息"
              width="310">
            </el-table-column>
            <el-table-column
              prop="address"
              label="比对结果">
            </el-table-column>
          </el-table> -->
          <table class="o-th1" cellspacing="0">
            <tr class="thead">
              <th>类别</th>
              <th>旅客信息</th>
              <th>名单信息</th>
              <th>比对结果</th>
            </tr>
            <tr>
              <td>姓名</td>
              <td>张某某</td>
              <td>张某某</td>
              <td>张某某</td>
            </tr>
            <tr>
              <td>性别</td>
              <td>张某某</td>
              <td>张某某</td>
              <td>张某某</td>
            </tr>
            <tr>
              <td>出生日期</td>
              <td>张某某</td>
              <td>张某某</td>
              <td>张某某</td>
            </tr>
            <tr>
              <td>证件号码</td>
              <td>张某某</td>
              <td>张某某</td>
              <td>张某某</td>
            </tr>
            <tr>
              <td>国籍</td>
              <td>张某某</td>
              <td>张某某</td>
              <td>张某某</td>
            </tr>
          </table>
        </div>
        <div class="middle mb-6">
          <div class="title-green">
            名单补充信息
          </div>
          <el-row type="flex" class="mb-9">
            <el-col :span="8" class="input-item">
              <span class="input-text">姓名：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="input-text">等级编号：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="input-text">职业身份：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
          </el-row>
          <el-row type="flex" class="mb-9">
            <el-col :span="8" class="input-item">
              <span class="input-text">处理结果：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="input-text">等级编号：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="input-text">职业身份：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
          </el-row>
          <el-row type="flex" class="mb-9">
            <el-col :span="8" class="input-item">
              <span class="input-text">处理结果：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="input-text">等级编号：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="input-text">职业身份：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
          </el-row>
          <el-row type="flex" class="mb-9">
            <el-col :span="8" class="input-item">
              <span class="input-text">处理结果：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="input-text">等级编号：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
            <el-col :span="8" class="input-item">
              <span class="input-text">职业身份：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input"></el-input>
            </el-col>
          </el-row>
          <el-row type="flex">
            <el-col :span="24" class="input-item">
              <span class="input-text2">备注：</span>
              <el-input placeholder="请输入内容" size="small" :disabled="true" class="input-input2"></el-input>
            </el-col>
          </el-row>
        </div>
        <div class="down">
          <div class="title-grey">
            判断结果
          </div>
          <el-row type="flex" class="mb-15">
            <el-col :span="4">
              <div class="radio-g">
                <el-radio-group v-model="radio1" class="radio-g-area">
                  <el-radio :label="3">备选项</el-radio>
                  <el-radio :label="6">备选项</el-radio>
                  <el-radio :label="9">备选项</el-radio>
                </el-radio-group>
              </div>
            </el-col>
            <el-col :span="17">
              <div class="textarea-g">
                <div class="textarea-text">甄选说明:</div>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 5, maxRows: 5}"
                  placeholder="请输入内容"
                  v-model="textarea3"
                  class="textarea-input">
                </el-input>
              </div>

            </el-col>
            <el-col :span="3" class="down-btn-area">
              <el-button type="primary" size="small" class="mb-15">确定</el-button>
              <el-button type="warning" size="small">取消</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="top boder1">
          <div class="title-green mb-0">
            信息比对
          </div>
        </div>
        <div class="middle boder1">
          <div class="l-m-title ">
            人员照片
          </div>
          <div class="img-checkbox1 mb-15">
            <div >
              <label for="p1" class="img-checkbox-item">
                <img src="../../../assets/img/bp_ap/photo.png" alt="" :class="{'ch-img':checkedImg==1}">
                <i class="el-icon-circle-check " :class="{'cheched-img':checkedImg==1}"></i>
              </label>
              <input type="radio" name="pPhoto" value="1"  v-model="checkedImg" id="p1" class="img-checkbox-input">

            </div>
            <div>
              <label for="p2" class="img-checkbox-item">
                <img src="../../../assets/img/bp_ap/photo.png" alt="" :class="{'ch-img':checkedImg==2}">
                <i class="el-icon-circle-check" :class="{'cheched-img':checkedImg==2}"></i>
              </label>
              <input type="radio" name="pPhoto" value="2" v-model="checkedImg" id="p2" class="img-checkbox-input">

            </div>

          </div>
          <div class="l-m-title ">
            布控照片
          </div>
          <div class="img-checkbox1">
            <div >
              <label for="b1" class="img-checkbox-item">
                <img src="../../../assets/img/bp_ap/photo2.png" alt="" :class="{'ch-img':checkedImg2==1}">
                <i class="el-icon-circle-check " :class="{'cheched-img':checkedImg2==1}"></i>
              </label>
              <input type="radio" name="pPhoto" value="1"  v-model="checkedImg2" id="b1" class="img-checkbox-input">

            </div>
            <div>
              <label for="b2" class="img-checkbox-item">
                <img src="../../../assets/img/bp_ap/photo2.png" alt="" :class="{'ch-img':checkedImg2==2}">
                <i class="el-icon-circle-check" :class="{'cheched-img':checkedImg2==2}"></i>
              </label>
              <input type="radio" name="pPhoto" value="2" v-model="checkedImg2" id="b2" class="img-checkbox-input">

            </div>
            <div>
              <label for="b3" class="img-checkbox-item">
                <img src="../../../assets/img/bp_ap/photo2.png" alt="" :class="{'ch-img':checkedImg2==3}">
                <i class="el-icon-circle-check" :class="{'cheched-img':checkedImg2==3}"></i>
              </label>
              <input type="radio" name="pPhoto" value="3" v-model="checkedImg2" id="b3" class="img-checkbox-input">

            </div>
            <div>
              <label for="b4" class="img-checkbox-item">
                <img src="../../../assets/img/bp_ap/photo2.png" alt="" :class="{'ch-img':checkedImg2==4}">
                <i class="el-icon-circle-check" :class="{'cheched-img':checkedImg2==4}"></i>
              </label>
              <input type="radio" name="pPhoto" value="4" v-model="checkedImg2" id="b4" class="img-checkbox-input">

            </div>

          </div>
        </div>
        <div class="middle mb-2">
          <div class="img-box mb-15">
            <img src="../../../assets/img/bp_ap/photo.png" alt="" class="mr-20">
            <img src="../../../assets/img/bp_ap/photo2.png" alt="">

          </div>
          <div class="btn-succ-box">
            <el-button type="success" plain class="btn-succ" size="small">成功按钮</el-button>

          </div>
        </div>
        <div class="middle res-height">
          <el-row type="flex" class="res-height">
            <el-col :span="6" class="res-item1">
              指纹比对
            </el-col>
            <el-col :span="6" class="res-item1">
              比对结果
            </el-col>
            <el-col :span="12" class="res-item2">
              <div class="">
                顺序比重数：
                <span>10</span>枚
              </div>
              <div class="">
                顺序比重数：
                <span>10</span>枚
              </div>
            </el-col>


          </el-row>
        </div>
      </el-col>

    </el-row>

  </div>
</template>

<script>
export default {
  data() {
   return {
     textarea3:"",
     value: '223333333333',
     checkedImg:1,
     checkedImg2:1,
     tableData: [{
       date: '2016-05-02',
       name: '王小虎',
       address: '上海市'
     }, {
       date: '2016-05-04',
       name: '王小虎',
       address: 'ff'
     }, {
       date: '2016-05-01',
       name: '王小虎',
       address: '陀区金'
     }, {
       date: '2016-05-03',
       name: '王小虎',
       address: '上海市'
     }],
     radio1:3
   }
 }
}
</script>

<style scoped>

.radio-g-area{
  height: 75px;
  width: 100px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}
.textarea-g{
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
.textarea-text{
  width: 70px;
}
.l-m-title{
  color: #7f7f7f;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 14px;
}
.img-checkbox1{
  display: flex;

}
.img-checkbox1 img{
  width: 80px;
  height: 100px;
  margin-bottom: 5px;
  margin-right: 3px;
}
.img-checkbox-item{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.img-checkbox-input{
  display: none;
}
.el-icon-circle-check{
  color: #b4b4b4;
}
.cheched-img{
  color: #0baaee;
}
.ch-img{
  border: 1px #0baaee solid;
}
.img-box{
  display: flex;
  justify-content: center;
}
.img-box img{
  height: 160px;
  width: 128px;
}
.btn-succ-box{
  display: flex;
  justify-content: center;
  align-items:center;
}
.btn-succ{
  width: 280px;
}
.res-height{
  height: 80px;
}
.res-item1{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.res-item1:first-child{
  color: rgb(75, 195, 160);
  border-right: 1px #d1d1d1 solid;
}
.res-item2{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.res-item2 span{
  margin: 0 12px;
  color: #ff8f47;
}
.o-th1{
  width: 100%;
  border: 1px #eee solid;

}
.o-th1 th,.o-th1 td{
  border: 1px #eee solid;
  height: 32px!important;
  padding: 0!important;

}
.o-th1 th{
  color: #fff;
  font-size: 16px;
  background-color: #858585;
}
</style>
