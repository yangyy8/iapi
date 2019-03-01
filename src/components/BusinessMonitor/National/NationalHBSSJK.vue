<template>
<div class="nationlHBSSJK" :class="{'qgjk-zdh':zdh}" >
  <div class="mask" v-if="checkShow||checkShow2||checkShow3||checkShow4||checkShow5" @click.capture="closeBox"></div>
  <div class="map-top">
    <h3 class="map-title">国家移民管理局旅客预报预检系统</h3>
    <ul class="map-tabul">
      <li class="map-tabli mr-30 hand" :class="{'check-tab':tabId==1}" @click="tabId=1;getJkKa()">
        <img src="../../../assets/img/qgjk/tab1_1.png" alt="" v-if="tabId==1">
        <img src="../../../assets/img/qgjk/tab1_0.png" alt="" v-else>
        <span>口岸监控</span>
      </li>
      <li class="map-tabli mr-30 hand" :class="{'check-tab':tabId==2}" @click="tabId=2;getDqJkHb(1);">
        <img src="../../../assets/img/qgjk/tab2_1.png" alt="" v-if="tabId==2">
        <img src="../../../assets/img/qgjk/tab2_0.png" alt="" v-else>
        <span>航班监控</span>
      </li>
      <li class="map-tabli hand" :class="{'check-tab':tabId==3}" @click="tabId=3;getDqRy(1)">
        <img src="../../../assets/img/qgjk/tab3_1.png" alt="" v-if="tabId==3">
        <img src="../../../assets/img/qgjk/tab3_0.png" alt="" v-else>
        <span>人员监控</span>
      </li>
    </ul>
    <img src="../../../assets/img/qgjk/zxh.png" alt="" class="zdh" v-if="zdh" @click="zxhFn">
    <img src="../../../assets/img/qgjk/big.png" alt="" class="zdh" v-if="!zdh" @click="zdhFn">
  </div>
  <transition name="el-zoom-in-left">
    <div class="left-list" v-if="showLeft">
      <img src="../../../assets/img/qgjk/list1.png" alt="" @click="showLeft=false">
    </div>
  </transition>
  <transition name="el-zoom-in-left">
    <div class="left-box" v-if="!showLeft">
      <div class="left-box1 mb-6">
        <div class="box-title"  @click="showLeft=true">
          <div class="title-top"></div>
          <div class="title-text">
            全国航班统计
          </div>
          <div class="title-down">
            <img style="width:18px;height:18px" src="../../../assets/img/qgjk/sq.png" alt="">
          </div>
        </div>
        <div class="box-content">
          <div class="content-top mb-6">
            当日航班数量统计
          </div>
          <div class="content-middle">
            <ul class="middleUl">
              <li class="middleLi content-middle-head">
                <div class="td1">

                </div>
                <div class="td2">
                  入境
                </div>
                <div class="td3">
                  出境
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  计划
                </div>
                <div class="td2">
                  {{hbsl.inScheduleCount||0}}
                </div>
                <div class="td3">
                  {{hbsl.outScheduleCount||0}}
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  预检
                </div>
                <div class="td2">
                  {{hbsl.inCheckCount||0}}
                </div>
                <div class="td3">
                  {{hbsl.outCheckCount||0}}
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  取消
                </div>
                <div class="td2">
                  {{hbsl.inCancelCount||0}}
                </div>
                <div class="td3">
                  {{hbsl.outCancelCount||0}}
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  重点
                </div>
                <div class="td2">
                  {{hbsl.inFocusCount||0}}
                </div>
                <div class="td3">
                  {{hbsl.outFocusCount||0}}
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  延误
                </div>
                <div class="td2">
                  {{hbsl.inDelayCount||0}}
                </div>
                <div class="td3">
                  {{hbsl.outDelayCount||0}}
                </div>
              </li>
              <li class="middleLi">
                <div class="td1">
                  实际
                </div>
                <div class="td2">
                  {{hbsl.inRealCount||0}}
                </div>
                <div class="td3">
                  {{hbsl.outRealCount||0}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="left-box1">
        <div class="box-title"  @click="showLeft=true">
          <div class="title-top o-title"></div>
          <div class="title-text">
            口岸航班统计
          </div>
          <div class="title-down">
            <img style="width:18px;height:18px" src="../../../assets/img/qgjk/sq.png" alt="">
          </div>
        </div>
        <div class="box-content">
          <div class="content-middle">
            <div class="middleLi2 content-middle-head2">
              <div class="td1">
              </div>
              <div class="td2">
                计划
              </div>
              <div class="td2">
                预检
              </div>
              <div class="td2">
                重点
              </div>
              <div class="td2">
                取消
              </div>
              <div class="td2">
                延误
              </div>
              <div class="td2">
                实际
              </div>
            </div>
            <ul class="middleUl ulover">

              <div v-if="">

              </div>
              <li class="middleLi2" v-for="(i, index ) in kahb">
                <div class="td1">
                  {{i.portName||'xx'}}
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.inScheduleCount||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.outScheduleCount||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.inScheduleCount+i.outScheduleCount||0}}</span>
                  </el-popover>

                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.inCheckCount||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.outCheckCount||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.inCheckCount+i.outCheckCount||0}}</span>
                  </el-popover>
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.inFocusCount||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.outFocusCount||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.inFocusCount+i.outFocusCount||0}}</span>
                  </el-popover>
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.inCancelCount||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.outCancelCount||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.inCancelCount+i.outCancelCount||0}}</span>
                  </el-popover>
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.inDelayCount||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.outDelayCount||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.inDelayCount+i.outDelayCount||0}}</span>
                  </el-popover>
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.inRealCount||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.outRealCount||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.inRealCount+i.outRealCount||0}}</span>
                  </el-popover>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <transition name="el-zoom-in-right">
    <div class="right-list" v-show="showRight">
      <img src="../../../assets/img/qgjk/list2.png" alt="" @click="showRight=false">
    </div>
  </transition>
  <transition name="el-zoom-in-right">
    <div class="right-box" v-show="!showRight">
      <div class="left-box1 mb-6">
        <div class="box-content">
          <div class="content-top mb-6">
            当日人员概况
          </div>
          <div class="content-middle">
            <ul class="middleUl">
              <li class="middleLi3 content-middle-head3">
                <div class="td1">

                </div>
                <div class="td2">
                  入境
                </div>
                <div class="td2">
                  出境
                </div>
                <div class="td2">
                  过境
                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  计划
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div2 b-r">
                        <span>中国内地</span>
                        <span class="td2-pop-num1">{{rygk.order_in_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>港澳台</span>
                        <span class="td2-pop-num2">{{rygk.order_in_gat||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>外国人</span>
                        <span class="td2-pop-num2">{{rygk.order_in_frn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{rygk.order_in_chn+rygk.order_in_gat+rygk.order_in_frn||0}}</span>
                  </el-popover>

                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div2 b-r">
                        <span>中国内地</span>
                        <span class="td2-pop-num1">{{rygk.order_out_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>港澳台</span>
                        <span class="td2-pop-num2">{{rygk.order_out_gat||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>外国人</span>
                        <span class="td2-pop-num2">{{rygk.order_out_frn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{rygk.order_out_chn+rygk.order_out_gat+rygk.order_out_frn||0}}</span>
                  </el-popover>

                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div2 b-r">
                        <span>中国内地</span>
                        <span class="td2-pop-num1">{{rygk.order_pass_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>港澳台</span>
                        <span class="td2-pop-num2">{{rygk.order_pass_gat||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>外国人</span>
                        <span class="td2-pop-num2">{{rygk.order_pass_frn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{rygk.order_pass_chn+rygk.order_pass_gat+rygk.order_pass_frn||0}}</span>
                  </el-popover>

                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  预检
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div2 b-r">
                        <span>中国内地</span>
                        <span class="td2-pop-num1">{{rygk.chk_in_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>港澳台</span>
                        <span class="td2-pop-num2">{{rygk.chk_in_gat||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>外国人</span>
                        <span class="td2-pop-num2">{{rygk.chk_in_frn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{rygk.chk_in_chn+rygk.chk_in_gat+rygk.chk_in_frn||0}}</span>
                  </el-popover>

                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div2 b-r">
                        <span>中国内地</span>
                        <span class="td2-pop-num1">{{rygk.chk_out_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>港澳台</span>
                        <span class="td2-pop-num2">{{rygk.chk_out_gat||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>外国人</span>
                        <span class="td2-pop-num2">{{rygk.chk_out_frn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{rygk.chk_out_chn+rygk.chk_out_gat+rygk.chk_out_frn||0}}</span>
                  </el-popover>

                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div2 b-r">
                        <span>中国内地</span>
                        <span class="td2-pop-num1">{{rygk.chk_pass_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>港澳台</span>
                        <span class="td2-pop-num2">{{rygk.chk_pass_gat||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>外国人</span>
                        <span class="td2-pop-num2">{{rygk.chk_pass_frn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{rygk.chk_pass_chn+rygk.chk_pass_gat+rygk.chk_pass_frn||0}}</span>
                  </el-popover>

                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  登机
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div2 b-r">
                        <span>中国内地</span>
                        <span class="td2-pop-num1">{{rygk.brd_in_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>港澳台</span>
                        <span class="td2-pop-num2">{{rygk.brd_in_gat||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>外国人</span>
                        <span class="td2-pop-num2">{{rygk.brd_in_frn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{rygk.brd_in_chn+rygk.brd_in_gat+rygk.brd_in_frn||0}}</span>
                  </el-popover>
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div2 b-r">
                        <span>中国内地</span>
                        <span class="td2-pop-num1">{{rygk.brd_out_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>港澳台</span>
                        <span class="td2-pop-num2">{{rygk.brd_out_gat||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>外国人</span>
                        <span class="td2-pop-num2">{{rygk.brd_out_frn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{rygk.brd_out_chn+rygk.brd_out_gat+rygk.brd_out_frn||0}}</span>
                  </el-popover>
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div2 b-r">
                        <span>中国内地</span>
                        <span class="td2-pop-num1">{{rygk.brd_pass_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>港澳台</span>
                        <span class="td2-pop-num2">{{rygk.brd_pass_gat||0}}</span>
                      </div>
                      <div class="td2-pop-div2 b-r">
                        <span>外国人</span>
                        <span class="td2-pop-num2">{{rygk.brd_pass_frn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{rygk.brd_pass_chn+rygk.brd_pass_gat+rygk.brd_pass_frn||0}}</span>
                  </el-popover>
                </div>
              </li>
              <li class="middleLi3">
                <div class="td1">
                  实际
                </div>
                <div class="td2">
                  {{rygk.inRealCount||0}}

                </div>
                <div class="td2">
                  {{rygk.outRealCount||0}}

                </div>
                <div class="td2">
                  {{rygk.passRealCount||0}}

                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="box-title" @click="showRight=true">
          <div class="title-top b-title"></div>
          <div class="title-text">
            全国人员统计
          </div>
          <div class="title-down">
            <img style="width:18px;height:18px" src="../../../assets/img/qgjk/sq.png" alt="">
          </div>
        </div>
      </div>
      <div class="left-box1">

        <div class="box-content">
          <div class="content-middle">
            <div class="middleLi4 content-middle-head4">
              <div class="td1">

              </div>
              <div class="td2">
                内地
              </div>
              <div class="td2">
                港澳台
              </div>
              <div class="td2">
                外国人
              </div>
              <div class="td2">
                命中
              </div>
              <div class="td2">
                合计
              </div>

            </div>
            <ul class="middleUl ulover2">

              <li class="middleLi4" v-for="i in kary">
                <div class="td1">
                  {{i.portName}}

                </div>

                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.chk_in_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.chk_out_chn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.chk_in_chn+i.chk_out_chn||0}}</span>
                  </el-popover>
                </div>

                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.chk_in_gat||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.chk_out_gat||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.chk_in_gat+i.chk_out_gat||0}}</span>
                  </el-popover>
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.chk_in_frn||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.chk_out_frn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.chk_in_frn+i.chk_out_frn||0}}</span>
                  </el-popover>
                  <!-- {{i.inFrn+i.outFrn}} -->
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.matchIn||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.matchOut||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.matchIn+i.matchOut||0}}</span>
                  </el-popover>
                  <!-- {{i.matchIn+i.matchOut}} -->
                </div>
                <div class="td2">
                  <el-popover
                    placement="left"
                    width="200"
                    trigger="hover"
                    :popper-class="'td2-pop'">
                    <div class="td2-div">
                      <div class="td2-pop-div b-r">
                        <span>入境</span>
                        <span class="td2-pop-num1">{{i.matchIn+i.chk_in_frn+i.chk_in_gat+i.chk_in_chn||0}}</span>
                      </div>
                      <div class="td2-pop-div">
                        <span>出境</span>
                        <span class="td2-pop-num2">{{i.matchOut+i.chk_out_frn+i.chk_out_gat+i.chk_out_chn||0}}</span>
                      </div>
                    </div>
                    <span slot="reference" class="hand">{{i.matchIn+i.chk_in_frn+i.chk_in_gat+i.chk_in_chn+i.matchOut+i.chk_out_frn+i.chk_out_gat+i.chk_out_chn||0}}</span>
                  </el-popover>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="box-title" @click="showRight=true">
          <div class="title-top g-title"></div>
          <div class="title-text">
            口岸人员统计
          </div>
          <div class="title-down">
            <img style="width:18px;height:18px" src="../../../assets/img/qgjk/sq.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </transition>
  <transition name="el-zoom-in-top">
    <div class="tan-box" v-show="tabId==1" @click.self="closeBox">
      <span class="top-left"></span>
      <span class="top-right"></span>
      <span class="down-left"></span>
      <span class="down-right"></span>

      <div class="tan-row1 mb-20">
        <div class="tan-row-text mr-20">
          出入类型
        </div>
        <div class="tan-right">
          <el-radio-group v-model="crType">
            <el-radio label="A" class="mr-15">全部</el-radio>
            <el-radio label="I" class="mr-15">入境</el-radio>
            <el-radio label="O">出境</el-radio>
          </el-radio-group>

        </div>
      </div>
      <div class="tan-row2 mb-20">
        <div class="tan-row-text">
          境内口岸
        </div>
        <div class="tan-content">
          <div class="check-row">
            <div class="check-col mr-5">
              <span class="check-text">省</span>
              <div class="check-box">
                <div class="check-box-nei"  @click.self="getSList">
                  <div class="mr-5 mb-9" v-for="(x, ind) in checkList">
                    <span>{{x.name}}</span>
                    <i class="el-icon-circle-close" @click="checkList.splice(ind,1)"></i>
                  </div>

                </div>

                <div class="check-div" v-show="checkShow" @click.stop>
                  <i class="el-icon-close close" @click="checkShow=false"></i>
                  <header>
                    <ul class="classify">
                      <el-checkbox v-model="checkAll" @change="checkAllFn" true-label="1" false-label="0">全选</el-checkbox>
                      <li  v-for="(arr,key,index) in locationName"  @click="isClassify=key">
                        <span class="classify-a hand"  :class="{'check-a':isClassify==key}">{{key}}</span>
                      </li>
                    </ul>
                  </header>
                  <div class="site-name">

                    <div v-for="value of isClassify" class="list-div">
                      <div class="list-pre">{{value}}</div>
                      <div class="list-dd">
                        <div v-for="(val,index) in locationName[isClassify][value]" class="dd">
                          <label class="checkbox-item" :class="{'schecked':checkList.some(function(x){return x.code==val.code})}" >
                            <input type="checkbox" :value="val" v-model="checkList" class="checkbox-input">
                            <span class="list-a" >{{val.name}}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="check-col">
              <span class="check-text">口岸</span>
              <div class="check-box">
                <div class="check-box-nei"  @click.self="getKaList">
                  <div class="mr-5 mb-9" v-for="(x, ind) in checkList2">
                    <span>{{x.name}}</span>
                    <i class="el-icon-circle-close" @click="checkList2.splice(ind,1)"></i>
                  </div>

                </div>

                <div class="check-div" v-if="checkShow2">
                  <i class="el-icon-close close" @click="checkShow2=false;"></i>
                  <el-input  placeholder="请输入口岸"  v-model="port0" clearable size="mini" class="mb-9" @input="searchPort0"></el-input>

                  <header>
                    <ul class="classify">
                      <el-checkbox v-model="checkAll2" @change="checkAllFn2" true-label="1" false-label="0">全选</el-checkbox>
                      <li  v-for="(arr,key,index) in locationName2"  @click="isClassify2=key" v-if="searchP0">
                        <span class="classify-a hand" :class="{'check-a':isClassify2==key}">{{key}}</span>
                      </li>
                    </ul>
                  </header>
                  <div class="site-name">
                    <div v-for="value of isClassify2" class="list-div" v-if="searchP0">
                      <div class="list-pre">{{value}}</div>
                      <div class="list-dd">
                        <div v-for="(val,index) in locationName2[isClassify2][value]"  class="dd">
                          <label  class="checkbox-item" :class="{'schecked':checkList2.some(function(x){return x.code==val.code})}">
                            <input type="checkbox" :value="val" v-model="checkList2" class="checkbox-input">
                            <span class="list-a" >{{val.name}}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="list-dd" v-if="!searchP0">
                      <div v-for="(val,index) in searchP0list"  class="dd">
                        <label  class="checkbox-item" :class="{'schecked':checkList2.some(function(x){return x.code==val.code})}">
                          <input type="checkbox" :value="val" v-model="checkList2" class="checkbox-input" :disabled="!val.code">
                          <span class="list-a" >{{val.name}}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="tan-row2 pb-20 bb">
        <div class="tan-row-text">
          境外口岸
        </div>
        <div class="tan-content">
          <div class="check-row">
            <div class="check-col mr-5">
              <span class="check-text">洲</span>
              <div class="check-box">
                <div class="check-box-nei" @click.self="checkShow5=true;checkShow2=false;checkShow3=false;checkShow4=false;checkShow=false;">
                  <div class="mr-5 mb-9" v-for="(x, ind) in checkList5">
                    <span>{{x.name}}</span>
                    <i class="el-icon-circle-close" @click="checkList5.splice(ind,1)"></i>
                  </div>
                </div>

                <div class="check-div" v-if="checkShow5">
                  <i class="el-icon-close close" @click="checkShow5=false"></i>
                  <div class="site-name">
                    <el-checkbox v-model="checkAll5" @change="checkAllFn5" true-label="1" false-label="0">全选</el-checkbox>
                    <el-checkbox-group v-model="checkList5" @change="checkedZhou">
                      <el-checkbox v-for="x in locationName5" :key="x.code" :label="x" >{{x.name}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>

            </div>
            <div class="check-col mr-5">
              <span class="check-text">国家</span>
              <div class="check-box">
                <div class="check-box-nei"  @click.self="getGjList">
                  <div class="mr-5 mb-9" v-for="(x, ind) in checkList3">
                    <span>{{x.name}}</span>
                    <i class="el-icon-circle-close" @click="checkList3.splice(ind,1)"></i>
                  </div>
                </div>

                <div class="check-div" v-if="checkShow3">
                  <i class="el-icon-close close" @click="checkShow3=false"></i>
                  <el-input  placeholder="请输入国家"  v-model="gj1" clearable size="mini" class="mb-9" @input="searchGj"></el-input>

                  <header>
                    <ul class="classify">
                      <el-checkbox v-model="checkAll3" @change="checkAllFn3" true-label="1" false-label="0">全选</el-checkbox>
                      <li  v-for="(arr,key,index) in locationName3"  @click="isClassify3=key"  v-if="searchP">
                        <span class="classify-a hand" :class="{'check-a':isClassify3==key}">{{key}}</span>
                      </li>
                    </ul>
                  </header>
                  <div class="site-name">
                    <div v-for="value of isClassify3" class="list-div"  v-if="searchG">
                      <div class="list-pre">{{value}}</div>
                      <div class="list-dd">
                        <div v-for="(val,index) in locationName3[isClassify3][value]"  class="dd">
                          <label  class="checkbox-item" :class="{'schecked':checkList3.some(function(x){return x.code==val.code})}">
                            <input type="checkbox" :value="val" v-model="checkList3" class="checkbox-input">
                            <span class="list-a" >{{val.name}}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="list-dd" v-if="!searchG">
                      <div v-for="(val,index) in searchGlist"  class="dd">
                        <label  class="checkbox-item" :class="{'schecked':checkList3.some(function(x){return x.code==val.code})}">
                          <input type="checkbox" :value="val" v-model="checkList3" class="checkbox-input" :disabled="!val.code">
                          <span class="list-a" >{{val.name}}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="check-col ">
              <span class="check-text">口岸</span>
              <div class="check-box">
                <div class="check-box-nei"  @click.self="getJwKaList">

                  <div class="mr-5 mb-9" v-for="(x, ind) in checkList4">
                    <span>{{x.name}}</span>
                    <i class="el-icon-circle-close" @click="checkList4.splice(ind,1)"></i>
                  </div>
                </div>

                <div class="check-div" v-if="checkShow4">
                  <i class="el-icon-close close" @click="checkShow4=false"></i>
                  <el-input  placeholder="请输入口岸"  v-model="port1" clearable size="mini" class="mb-9" @input="searchPort"></el-input>
                  <header>
                    <ul class="classify">
                      <el-checkbox v-model="checkAll4" @change="checkAllFn4" true-label="1" false-label="0">全选</el-checkbox>
                      <li  v-for="(arr,key,index) in locationName4"  @click="isClassify4=key" v-if="searchP">
                        <span class="classify-a hand" :class="{'check-a':isClassify4==key}">{{key}}</span>
                      </li>
                    </ul>
                  </header>
                  <div class="site-name">
                    <div v-for="value of isClassify4" class="list-div" v-if="searchP">
                      <div class="list-pre">{{value}}</div>
                      <div class="list-dd">
                        <div v-for="(val,index) in locationName4[isClassify4][value]"  class="dd">
                          <label  class="checkbox-item" :class="{'schecked':checkList4.some(function(x){return x.code==val.code})}">
                            <input type="checkbox" :value="val" v-model="checkList4" class="checkbox-input">
                            <span class="list-a" >{{val.name}}</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="list-dd" v-if="!searchP">
                      <div v-for="(val,index) in searchPlist"  class="dd">
                        <label  class="checkbox-item" :class="{'schecked':checkList4.some(function(x){return x.code==val.code})}">
                          <input type="checkbox" :value="val" v-model="checkList4" class="checkbox-input" :disabled="!val.code">
                          <span class="list-a" >{{val.name}}</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="tan-btn-g">
        <el-button type="primary" size="small" class="mr-10" @click="clear0">清空</el-button>
        <el-button type="success"  class="mr-10" size="small" @click="updateJkKa">确定</el-button>
        <el-button type="warning" size="small"  @click="tabId=0">关闭</el-button>

      </div>
    </div>
  </transition>
  <transition name="el-zoom-in-top">
    <div class="tan-box width2" v-show="tabId==2">
      <span class="top-left"></span>
      <span class="top-right"></span>
      <span class="down-left"></span>
      <span class="down-right"></span>
      <div class="tan-row2">
        <div class="tan-row-text">
          航班筛选条件：
        </div>
        <el-row :gutter="10" class="bb">
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">航站/口岸：</span>
            <el-select filterable clearable v-model="p1.port" size="mini"  class="item-input" placeholder="请选择">
              <el-option
                v-for="item in HzList"
                :key="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                :value="item.AIRPORT_CODE">
              </el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">航班号：</span>
            <el-input v-model="p1.fltNo" placeholder="请输入内容" size="mini"  class="item-input"></el-input>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">航空公司：</span>
            <el-select placeholder="请选择"  filterable clearable v-model="p1.fltCompany" size="mini"  class="item-input">
              <el-option
                v-for="(item,index) in HgList"
                :key="index"
                :value="item.AIRLINE_CODE"
                :label="item.AIRLINE_CODE+' - '+item.AIRLINE_CHN_NAME"
              ></el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">航班日期：</span>
            <el-date-picker
              class="item-input"
              v-model="p1.fltDate"
              type="date" size="mini" value-format="yyyyMMdd"
              placeholder="选择时间">
            </el-date-picker>

          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">出发时间：</span>
            <el-date-picker
              class="item-input"
              v-model="p1.departTime"
              type="datetime" size="mini" value-format="yyyyMMddHHmm"
              placeholder="选择时间">
            </el-date-picker>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">到达时间：</span>
            <el-date-picker
              class="item-input"
              v-model="p1.arriveTime"
              type="datetime" size="mini" value-format="yyyyMMddHHmm"
              placeholder="选择时间">
            </el-date-picker>
          </el-col>
          <el-col :sm="24" :md="12" :lg="8" class="hb-item">
            <span class="item-text">出入标识：</span>
            <el-select placeholder="请选择" size="mini" clearable v-model="p1.ioType" class="item-input">
              <el-option label="I - 入境" value="I"></el-option>
              <el-option label="O - 出境" value="O"></el-option>
              <el-option label="A - 入出境" value=""></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div class="tan-btn-g">
          <el-button type="primary" size="small" class="mr-10" @click="cleartab2">清空</el-button>
          <!-- <el-button type="success" size="small" class="mr-10">取消</el-button> -->
          <el-button type="success" size="small" @click="getJkHb">查询</el-button>
        </div>
        <div class="tan-row-text">
          航班监控表：
        </div>
        <el-table
          :data="HBList"
          size="mini"
          border
          max-height="150"
          style="width: 100%">
          <el-table-column
            prop="preDepartTime"
            label="预计起飞"
            width="100"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="preArriveTime"
            label="预计抵达"
            width="100"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="fltDate"
            label="航班日期"
            width="89"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="fltno"
            label="航班号"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="aircompanyName"
            label="航空公司"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="from"
            label="出发地"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="to"
            label="到达地"
            :show-overflow-tooltip="true">
          </el-table-column>
          <!-- <el-table-column
            prop="date"
            label="清关城市">
          </el-table-column> -->
          <el-table-column
            label="操作"
            width="45">
            <template slot-scope="scope">
              <div class="flex-r">
                <div class="ta-btn hand" @click="addJkHb(scope.row)">添加</div>
              </div>
           </template>
          </el-table-column>
        </el-table>
        <div class="tan-row-text">
          当前航班情况：
        </div>
        <el-table
          :data="DqJkHb"
          size="mini"
          border
          max-height="150"
          style="width: 100%">
          <el-table-column
            prop="preDepartTime"
            label="预计起飞"
            width="100"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="preArriveTime"
            label="预计抵达"
            width="100"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="fltDate"
            label="航班日期"
            width="89"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="fltno"
            label="航班号"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="aircompanyName"
            label="航空公司"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="from"
            label="出发地"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="to"
            label="到达地"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="操作"
            width="45">
              <template slot-scope="scope">
                <div class="flex-r">
                  <div class="ta-btn hand" @click="delJkHb(scope.row.fltKey)">删除</div>
                </div>
             </template>
          </el-table-column>
        </el-table>
        <div class="tan-btn-g">
          <el-button type="success"  class="mr-10" size="small" @click="getNewData(2)">确定</el-button>
          <el-button type="warning" size="small"  @click="tabId=0">关闭</el-button>
        </div>
      </div>
    </div>
  </transition>

  <transition name="el-zoom-in-top">
    <div class="tan-box width3" v-show="tabId==3">
      <span class="top-left"></span>
      <span class="top-right"></span>
      <span class="down-left"></span>
      <span class="down-right"></span>
      <div class="tan-row2">
        <div class="tan-row-text">
          航班筛选条件：
        </div>
        <el-row :gutter="10" class="bb">
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">航站/口岸：</span>
            <el-select filterable clearable v-model="p2.port" size="mini"  class="item-input"  placeholder="请选择">
              <el-option
                v-for="item in HzList"
                :key="item.AIRPORT_CODE"
                :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
                :value="item.AIRPORT_CODE">
                </el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">证件号码：</span>
            <el-input v-model="p2.passport" placeholder="请输入内容" size="mini"  class="item-input"></el-input>

          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">国籍/地区：</span>
            <el-select placeholder="请选择"  filterable clearable v-model="p2.nationality" size="mini"  class="item-input">
              <el-option
                v-for="item in GjList"
                :key="item.CODE"
                :value="item.CODE"
                :label="item.CODE+' - '+item.CNAME">

                </el-option>
            </el-select>
          </el-col>

          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">姓名：</span>
            <el-input v-model="p2.name" placeholder="请输入内容" size="mini"  class="item-input"></el-input>

          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">性别：</span>
            <el-select placeholder="请选择" size="mini" clearable v-model="p2.gender" class="item-input">
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="F"></el-option>
              <el-option label="未知" value="U"></el-option>
            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">出生日期：</span>
            <el-date-picker
              class="item-input"
              v-model="p2.birthday"
              type="date" size="mini" value-format="yyyyMMdd"
              placeholder="选择时间"  >
            </el-date-picker>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">出入标识：</span>
            <el-select placeholder="请选择" size="mini" clearable v-model="p2.ioType" class="item-input">
              <el-option label="I - 入境" value="I"></el-option>
              <el-option label="O - 出境" value="O"></el-option>
              <el-option label="A - 入出境" value=""></el-option>

            </el-select>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">航班号：</span>
            <el-input v-model="p2.fltNo" placeholder="请输入内容" size="mini"  class="item-input"></el-input>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">航班日期：</span>
            <el-date-picker
              class="item-input"
              v-model="p2.fltDate"
              type="date" size="mini" value-format="yyyyMMdd"
              placeholder="选择时间"  >
            </el-date-picker>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">出发时间：</span>
            <el-date-picker
              class="item-input"
              v-model="p2.departTime"
              type="datetime" size="mini" value-format="yyyyMMddHHmmss"
              placeholder="选择时间"  >
            </el-date-picker>
          </el-col>
          <el-col :sm="24" :md="12" :lg="6" class="hb-item">
            <span class="item-text">到达时间：</span>
            <el-date-picker
              class="item-input"
              v-model="p2.arriveTime"
              type="datetime" size="mini" value-format="yyyyMMddHHmmss"
              placeholder="选择时间"  >
            </el-date-picker>
          </el-col>
        </el-row>
        <div class="tan-btn-g">
          <el-button type="primary" size="small" class="mr-10" @click="cleartab3">清空</el-button>
          <!-- <el-button type="success" size="small" class="mr-10">取消</el-button> -->
          <el-button type="success" size="small" @click="getRy">查询</el-button>
        </div>
        <div class="tan-row-text">
          人员监控表：
        </div>
        <el-table
          :data="RyList"
          size="mini"
          border
          max-height="150"
          style="width: 100%">
          <el-table-column
            prop="preDepartTime"
            label="预计起飞"
            width="140"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="preArriveTime"
            label="预计抵达"
            width="140"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="fltDate"
            label="航班日期"
            width="110"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="fltno"
            label="航班号"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="passportNo"
            label="证件号码"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="nationalityName"
            label="国籍/地区"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="birthDay"
            label="出生日期"
            width="110"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="操作"
            width="60">
            <template slot-scope="scope">
                <div class="ta-btn hand" @click="addRy(scope.row.trvKey)">添加</div>
           </template>
          </el-table-column>
        </el-table>
        <div class="tan-row-text">
          当前人员情况：
        </div>
        <el-table
          :data="DqRy"
          size="mini"
          border
          max-height="150"
          style="width: 100%">
          <el-table-column
            prop="preDepartTime"
            label="预计起飞"
            width="140"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="preArriveTime"
            label="预计抵达"
            width="140"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="fltDate"
            label="航班日期"
            width="110"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="fltno"
            label="航班号"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="passportNo"
            label="证件号码"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="nationalityName"
            label="国籍/地区"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            prop="birthDay"
            label="出生日期"
            width="110"
            :show-overflow-tooltip="true">
          </el-table-column>
          <el-table-column
            label="操作"
            width="60">
            <template slot-scope="scope">
              <div class="ta-btn hand" @click="delRy(scope.row.trvKey)">删除</div>
           </template>
          </el-table-column>
        </el-table>
        <div class="tan-btn-g">
          <el-button type="success"  class="mr-10" size="small" @click="getNewData(3)">确定</el-button>

          <el-button type="warning" size="small" @click="tabId=0">关闭</el-button>
        </div>
      </div>
    </div>
  </transition>
  <div :class="className" :id="id" :style="{height:height,width:width}" ref="myEchart" class="canvas"></div>
</div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import 'echarts/map/js/world.js';

export default {
  props: {
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "700px"
    }
  },
  data() {
    return {
      port0:"",
      port1:"",
      gj1:"",
      searchP0:true,
      searchP0list:[],
      searchP:true,
      searchPlist:[],
      searchG:true,
      searchGlist:[],
      sscheced:null,
      zdh:false,
      tabId: 0,
      crType:"A",
      newHbData:{},
      hbsl:{
        inScheduleCount:0,
        outScheduleCount:0,
        inCheckCount:0,
        outCheckCount:0,
        inCancelCount:0,
        outCancelCount:0,
        inFocusCount:0,
        outFocusCount:0,
        inDelayCount:0,
        outDelayCount:0,
        inRealCount:0,
        outRealCount:0
      },
      kahb:[],
      rygk:{
        inOrderCount:0,
        outOrderCount:0,
        passOrderCount:0,
        inCheckCount:0,
        outCheckCount:0,
        passCheckCount:0,
        boardIn:0,
        boardOut:0,
        boardPass:0,
        inRealCount:0,
        outRealCount:0,
        passRealCount:0
      },
      kary:{},
      newHbData:[],
      showLeft: false,
      showRight: false,
      HzList:[],
      HgList:[],
      GjList:[],

      HBList:[],
      RyList:[],
      DqJkHb:[],
      DqRy:[],
      p1:{
        showCount:5,
        currentResult:0,
        currentPage:1
      },
      p2:{},
      locationName:{
        ABCDE:{},
        FGHJ:{},
        KLMNP:{},
        QRSTW:{},
        XYZ:{}
      },
      isClassify:"ABCDE",
      checkShow:false,
      checkAll:'0',
      checkList:[],
      locationData:{},

      locationName2:{
        ABCDE:{},
        FGHJ:{},
        KLMNP:{},
        QRSTW:{},
        XYZ:{}
      },
      isClassify2:"ABCDE",
      checkShow2:false,
      checkAll2:'0',
      checkList2:[],
      locationData2:{},

      locationName3:{
        ABCDE:{},
        FGHJ:{},
        KLMNP:{},
        QRSTW:{},
        XYZ:{}
      },
      isClassify3:"ABCDE",
      checkShow3:false,
      checkAll3:'0',
      checkList3:[],
      locationData3:{},

      locationName4:{
        ABCDE:{},
        FGHJ:{},
        KLMNP:{},
        QRSTW:{},
        XYZ:{}
      },
      isClassify4:"ABCDE",
      checkShow4:false,
      checkAll4:'0',
      checkList4:[],
      locationData4:{},

      checkList5:[],
      checkShow5:false,
      checkAll5:'0',
      locationName5:[
        {
          code:1,
          name:"亚洲"
        },
        {
          code:2,
          name:"非洲"
        },
        {
          code:3,
          name:"欧洲"
        },
        {
          code:4,
          name:"大洋洲"
        },
        {
          code:5,
          name:"北美洲"
        },
        {
          code:6,
          name:"南美洲"
        }
      ],
      chart: null,
      geoCoordMap: {
        '南宁': [108.479, 23.1152],
        '广州': [113.5107, 23.2196],
        '重庆': [107.7539, 30.1904],
        '芬兰': [24.909912, 60.169095],
        '美国': [-100.696295, 33.679979],
        '日本': [139.710164, 35.706962],
        '韩国': [126.979208, 37.53875],
        '瑞士': [7.445147, 46.956241],
        '东南亚': [117.53244, 5.300343],
        '澳大利亚': [135.193845, -25.304039],
        '德国': [13.402393, 52.518569],
        '英国': [-0.126608, 51.208425],
        '加拿大': [-102.646409, 59.994255]
      },
      planePath: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
      planePath2:`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAOCAYAAADwikbvAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjdBMTk5Qzc2ODBDRTExRThCREI0OUYyQ0VFQkJEMzA0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjdBMTk5Qzc3ODBDRTExRThCREI0OUYyQ0VFQkJEMzA0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6N0ExOTlDNzQ4MENFMTFFOEJEQjQ5RjJDRUVCQkQzMDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6N0ExOTlDNzU4MENFMTFFOEJEQjQ5RjJDRUVCQkQzMDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7TGjsIAAAAs0lEQVR42mL4//8/AxZsDMRHgfgbEJ8HYnts6rBp5ATiN/9RwUcg5kdXy8SACbSBWBhNjA+I1dAVYtP8jwE7+EeMZhUcmpUxRLD4WQKIH6P5+TFUnKCfXwDxCjSxFVBxgjaDsCKazYrY1GGzmQ2IPdDE/IGYA5fNTEDsCMQTgfjZf+zgNRBPB2IvqHqwZlDkH/tPGgCp5wdp7v9PHuhnBBL3ga5XYCAdPAAFGCMDeYARIMAATRp4jXDkrA0AAAAASUVORK5CYII=`,
      XqKa:{},
      series: []

    };
  },
  mounted() {
    this.initChart(this.series);
    // this.getNewData();
    this.getHz();
    this.getGj();
    this.getHkGs();
    this.getLeftData();

  },
  activated(){
    this.initChart(this.series);
    this.getNewData0();
    this.getRightData()

  },
  created(){
    var _self = this;
    // document.onkeydown = function(e){
    //     alert(27)
    //     var key = window.event.keyCode;
    //       //console.log(key,_self.zdh)
    //     if(key==27&&_self.zdh){
    //
    //       _self.zxhFn();
    //     }
    // }

  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    searchPort0(){
      this.searchP0list=[];
      if(this.port0){
        this.searchP0=false;
        let obj =this.locationName2;
        let _this=this;
        for(var i in obj){
          for(var j in obj[i]){
            for(var x=0;x<obj[i][j].length;x++){
              if(obj[i][j][x].name.indexOf(_this.port0)>-1){
                console.log(obj[i][j][x])
                _this.searchP0list.push(obj[i][j][x])
              }
            }
          }
        }
        if(_this.searchP0list.length==0){
          console.log("没有此口岸！")
          _this.searchP0list=[{name:"没有此口岸！"}]
        }
      }else{
        this.searchP0=true;
      }

    },
    searchPort(){
      this.searchPlist=[];
      if(this.port1){
        this.searchP=false;
        let obj =this.locationName4;
        let _this=this;
        for(var i in obj){
          for(var j in obj[i]){
            for(var x=0;x<obj[i][j].length;x++){
              if(obj[i][j][x].name.indexOf(_this.port1)>-1){
                console.log(obj[i][j][x])
                _this.searchPlist.push(obj[i][j][x])
              }
            }
          }
        }
        if(_this.searchPlist.length==0){
          console.log("没有此口岸！")
          _this.searchPlist=[{name:"没有此口岸！"}]
        }
      }else{
        this.searchP=true;
      }

    },
    searchGj(){
      this.searchGlist=[];
      if(this.gj1){
        this.searchG=false;
        let obj =this.locationName3;
        let _this=this;
        for(var i in obj){
          for(var j in obj[i]){
            for(var x=0;x<obj[i][j].length;x++){
              if(obj[i][j][x].name.indexOf(_this.gj1)>-1){
                console.log(obj[i][j][x])
                _this.searchGlist.push(obj[i][j][x])
              }
            }
          }
        }
        if(_this.searchGlist.length==0){
          console.log("没有此国家！")
          _this.searchGlist=[{name:"没有此国家！"}]
        }
      }else{
        this.searchG=true;
      }

    },
    closeBox(){
      //console.log("hhhhhhhhhh")
      this.checkShow=false;this.checkShow2=false;this.checkShow3=false;this.checkShow4=false;this.checkShow5=false;

    },
    checkAllFn(){
      //console.log(this.checkAll);
      if(this.checkAll==1){
        for(var i in this.locationData){
          this.locationData[i].forEach(function (val) {
              if(this.checkList.indexOf(val)==-1){
                this.checkList.push(val)
              }
          }, this)
        }
      }else{
        this.checkList=[]
      }
    },
    checkAllFn2(){
      //console.log(this.locationData2)
      if(this.checkAll2==1){
        for(var i in this.locationData2){
          this.locationData2[i].forEach(function (val) {
            if(this.checkList2.indexOf(val)==-1){
              this.checkList2.push(val)
            }
          }, this)
        }
      }else{
        this.checkList2=[]
      }
    },
    checkAllFn3(){
      //console.log(this.locationData3)
      if(this.checkAll3==1){
        for(var i in this.locationData3){
          this.locationData3[i].forEach(function (val) {
            if(this.checkList3.indexOf(val)==-1){
              this.checkList3.push(val)
            }
          }, this)
        }
      }else{
        this.checkList3=[]
      }
    },
    checkAllFn4(){
      //console.log(this.locationData4)
      if(this.checkAll4==1){
        for(var i in this.locationData4){
          this.locationData4[i].forEach(function (val) {
            if(this.checkList4.indexOf(val)==-1){
              this.checkList4.push(val)
            }
          }, this)
        }
      }else{
        this.checkList4=[]
      }
    },
    checkAllFn5(){
      if(this.checkAll5==1){
        this.locationName5.forEach(function(val){
          if(this.checkList5.indexOf(val)==-1){
            this.checkList5.push(val)
          }
        },this)
      }else{
        this.checkList5=[];
      }

    },
    checkedZhou(){
      //console.log(this.checkList5)
    },
    zdhFn(){
      let element=document.documentElement;
      if(element.requestFullscreen){
        element.requestFullscreen();
      }
      else if(element.mozRequestFullScreen){
        element.mozRequestFullScreen();
      }
      else if(element.msRequestFullscreen){
        element.msRequestFullscreen();
      }
      else if(element.webkitRequestFullscreen){
        element.webkitRequestFullScreen();
      }
      this.chart.dispose();
      this.chart = null;
      this.zdh=true;
      this.height='1000px'
      let that = this;
      setTimeout(function(){
        that.initChart(that.series);
      },500)
    },
    zxhFn(){
      if(document.exitFullscreen){

      document.exitFullscreen();

      }

      else if(document.mozCancelFullScreen){

      document.mozCancelFullScreen();

      }

      else if(document.msExitFullscreen){

      document.msExiFullscreen();

      }

      else if(document.webkitCancelFullScreen){

      document.webkitCancelFullScreen();

      }
      this.chart.dispose();
      this.chart = null;
      this.zdh=false;
      this.height='700px'
      let that = this;
      setTimeout(function(){
        that.initChart(that.series);
      },500)
    },
    getLeftData(){
      // this.showLeft=false;
      this.$api.post('/manage-platform/nationwide/getFlightCountToday',{},
       r => {
         //console.log(r);
         if(r.data!=null){
           this.hbsl=r.data;
         }
      });
      this.$api.post('/manage-platform/nationwide/getFlightPortCountToday',{},
       r => {
         this.kahb=r.data
         //console.log(this.kahb.length);
      })
    },
    getRightData(){
      // this.showRight=false;
      this.$api.post('/manage-platform/nationwide/getTravelerCountToday',{},
       r => {
         //console.log(r);
         if(r.data!=null){
            this.rygk=r.data;
         }

      });
      this.$api.post('/manage-platform/nationwide/getTravelerPortCountToday',{},
       r => {
         //console.log(r);
         this.kary=r.data;
      })
    },
    // 获取口岸航站
    getHz(){
      if(this.HzList.length==0){
        this.$api.post('/manage-platform/codeTable/queryAirport',{},
        r => {
          //console.log(r);
          this.HzList=r.data
        })
      }
    },
    // 获取航空公司
    getHkGs(){
      if(this.HgList.length==0){
        this.$api.post('/manage-platform/codeTable/queryAircompanyList',{},
        r => {
          //console.log(r);
          this.HgList=r.data
        })
      }

    },
    // 获取国籍
    getGj(){
      if(this.HgList.length==0){
        this.$api.post('/manage-platform/codeTable/queryNationality',{},
          r => {
            //console.log(r)
            this.GjList=r.data
          })
      }

    },
    // 最新航班监控信息取得
    getNewData(type){
      this.$api.post('/manage-platform/nationwide/getFlightMonitorInfo',{},
       r => {
         //console.log(r);
         // this.newHbData=r.data;
         console.log("newHbData",r.data)
         this.createM(r.data,type)
      })
    },
    getNewData0(){
      this.$api.post('/manage-platform/nationwide/getPortMonitorInfo',{},
       r => {
         //console.log(r);
         // this.newHbData=r.data;
         // console.log("newHbData",r.data)
         this.createM0(r.data)
      })
    },
    // 动画
    createM0(data){
      this.chart.dispose();
      this.chart = null;
      this.series=[];
      let _this=this;
      let f={
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 6,
        rippleEffect: {
          brushType: 'stroke'
        },
        itemStyle: {
          normal: {
            color: '#ffffff'
          }
        },
        label:{
          show:true,
          normal: {
             formatter: '{b}',
             position: 'bottom',
             show: true,
             color:'#fea92c',
           },
          emphasis: {
             show: true
          }
        },
        tooltip:{
          trigger: 'item',
          // formatter: '{b}<br/>{c}',
          backgroundColor:'#143652',
          padding:10,
          borderColor:'#028bd0',
          borderWidth:1,
          enterable :true,
          // triggerOn:'click',
          formatter: function (params, ticket, callback) {
              _this.$api.get('/manage-platform/nationwide/getPortDetail',{port:params.data.value[2]},
               r => {
                 let data=r.data.flights;
                  let html ='';
                  let table='<table cellspacing="0" style="background:#09679d;font-size:12px;width:810px">\
                                  <thead style="display: table;table-layout: fixed;width:100%;">\
                                    <tr style="height:20px;display: table;table-layout: fixed;width:100%;">\
                                      <td style="height:20px!important;padding:0 5px!important;width:50px">航班号</td>\
                                      <td style="height:20px!important;padding:0 5px!important;width:110px;">出发地</td>\
                                      <td style="height:20px!important;padding:0 5px!important;width:110px;">到达地</td>\
                                      <td style="height:20px!important;padding:0 5px!important;width:115px;">预计起飞时间</td>\
                                      <td style="height:20px!important;padding:0 5px!important;width:115px;">预计到达时间</td>\
                                      <td style="height:20px!important;padding:0 0px!important;width:85px;">航班状态</td>\
                                      <td style="height:20px!important;padding:0 0px!important;width:50px;">订票数</td>\
                                      <td style="height:20px!important;padding:0 5px!important;width:50px;">载运旅客</td>\
                                      <td style="height:20px!important;padding:0 5px!important;width:50px;">不准入境</td>\
                                      <td style="height:20px!important;padding:0 5px!important;width:50px;">非法载运</td>\
                                    </tr>\
                                  </thead>\
                                <tbody style="max-height:240px!important;overflow-y:auto!important;display:block;width:100%;">';
                  for(var i in data){
                    let data2={};
                        data2.fltno=data[i].fltno||'-';
                        data2.preDepartTime=data[i].preDepartTime||'-';
                        data2.from=data[i].from||'-';
                        data2.to=data[i].to||'-';
                        data2.preArriveTime=data[i].preArriveTime||'-';
                        data2.statusName=data[i].statusName||'-';
                        data2.bookNum=data[i].bookNum||'0';
                        data2.boardingNum=data[i].boardingNum||'0';
                        data2.forbiddenNum=data[i].forbiddenNum||'0';
                        data2.illegalNum=data[i].illegalNum||'0';

                        console.log(data2)
                    table+='<tr style="background:#112b42;height:20px;display: table;table-layout: fixed;width:100%;">\
                              <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.fltno+'</td>\
                              <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:110px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">'+data2.from+'</td>\
                              <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:110px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">'+data2.to+'</td>\
                              <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:115px;">'+data2.preDepartTime+'</td>\
                              <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:115px;">'+data2.preArriveTime+'</td>\
                              <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:85px">'+data2.statusName+'</td>\
                              <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.bookNum+'</td>\
                              <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.boardingNum+'</td>\
                              <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.forbiddenNum+'</td>\
                              <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.illegalNum+'</td>\
                           </tr>'

                  }
                  html+=table+'</tbody></table></div>'

                 callback(ticket, html);
              })
              return 'Loading';
          },
        },

        symbolSize: 10,
        data: [],
      }
      // console.log(data)
      data.forEach(function(val,index,arr){
        // console.log(val)
        let a={
          name:val.portName,
          value:[val.jd,val.wd,val.port],
        }
        f.data.push(a)
      })

      this.series.push(f);
      console.log("this.series1======",this.series)
      this.initChart(this.series);

    },
    createM(data,type){
      this.series=[];
      let _this=this;
      if(type==1){
        let f={
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 6,
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            normal: {
              color: '#ffffff'
            }
          },
          tooltip:{
            trigger: 'item',
            // formatter: '{b}<br/>{c}',
            backgroundColor:'#143652',
            padding:10,
            borderColor:'#028bd0',
            borderWidth:1,
            enterable :true,
            // triggerOn:'click',
            formatter: function (params, ticket, callback) {
                _this.$api.get('/manage-platform/nationwide/getPortDetail',{port:params.data.value[2]},
                 r => {
                   let data=r.data.flights;
                    let html ='';
                    let table='<table cellspacing="0" style="background:#09679d;font-size:12px;width:690px">\
                                    <thead style="display: table;table-layout: fixed;width:100%;">\
                                      <tr style="height:20px;display: table;table-layout: fixed;width:100%;">\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px">航班号</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:110px;">到达地</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:115px;">预计起飞时间</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:115px;">预计到达时间</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:85px;">航班状态</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">订票数</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px;">载运旅客</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px;">不准入境</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px;">非法载运</td>\
                                      </tr>\
                                    </thead>\
                                  <tbody style="max-height:240px!important;overflow-y:auto!important;display:block;width:100%;">';
                    for(var i in data){
                      let data2={};
                          data2.fltno=data[i].fltno||'-';
                          data2.preDepartTime=data[i].preDepartTime||'-';
                          data2.to=data[i].to||'-';
                          data2.preArriveTime=data[i].preArriveTime||'-';
                          data2.statusName=data[i].statusName||'-';
                          data2.bookNum=data[i].bookNum||'0';
                          data2.boardingNum=data[i].boardingNum||'0';
                          data2.forbiddenNum=data[i].forbiddenNum||'0';
                          data2.illegalNum=data[i].illegalNum||'0';

                          console.log(data2)
                      table+='<tr style="background:#112b42;height:20px;display: table;table-layout: fixed;width:100%;">\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.fltno+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:110px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">'+data2.to+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:115px;">'+data2.preDepartTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:115px;">'+data2.preArriveTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:85px">'+data2.statusName+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.bookNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.boardingNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.forbiddenNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.illegalNum+'</td>\
                             </tr>'

                    }
                    html+=table+'</tbody></table></div>'
                   // //console.log(r);
                   // let data=r.data.flights[0];
                   // let html='<div class="katooltip">\
                   //            <span style="color:#31aafb">航班号：</span>'+data.fltno+' <span style="color:#31aafb">航班日期：</span>'+data.fltDate+'<span style="color:#31aafb">起飞地：</span>'+data.from+'<br>'+'\
                   //            <span style="color:#31aafb">到达地：</span>'+data.to+' <span style="color:#31aafb">起飞时间：</span>'+data.departTime+'<br>'+'\
                   //            <span style="color:#31aafb">预计到达时间：</span>'+data.preArriveTime+' <span style="color:#31aafb">载运旅客数：</span>'+data.boardingNum+'<br>'+'\
                   //            <span style="color:#31aafb">机组数：</span>'+data.checkNum+' <span style="color:#31aafb">不准入境人员：</span>'+data.forbiddenNum+'<br>'+'\
                   //           </div>'
                   callback(ticket, html);
                })
                return 'Loading';
            },
          },

          symbolSize: 10,
          data: [],
        }
        let t={
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 6,
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            normal: {
              color: '#ffffff'
            }
          },
          symbolSize: 10,
          data: [],
          tooltip:{
            trigger: 'item',
            // formatter: '{b}<br/>{c}',
            backgroundColor:'#143652',
            padding:10,
            borderColor:'#028bd0',
            borderWidth:1,
            enterable :true,
            // triggerOn:'click',
            formatter: function (params, ticket, callback) {
                _this.$api.get('/manage-platform/nationwide/getPortDetail',{port:params.data.value[2]},
                 r => {
                   let data=r.data.flights;
                    let html ='';
                    let table='<table cellspacing="0" style="background:#09679d;font-size:12px;width:690px">\
                                    <thead style="display: table;table-layout: fixed;width:100%;">\
                                      <tr style="height:20px;display: table;table-layout: fixed;width:100%;">\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px">航班号</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:110px;">起飞地</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:115px;">预计起飞时间</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:115px;">预计到达时间</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:85px;">航班状态</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">订票数</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">载运旅客</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">不准入境</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">非法载运</td>\
                                      </tr>\
                                    </thead>\
                                  <tbody style="max-height:240px!important;overflow-y:auto!important;display:block;width:100%;">';
                    for(var i in data){
                      let data2={};
                          data2.fltno=data[i].fltno||'-';
                          data2.preDepartTime=data[i].preDepartTime||'-';
                          data2.from=data[i].from||'-';
                          data2.preArriveTime=data[i].preArriveTime||'-';
                          data2.statusName=data[i].statusName||'-';
                          data2.bookNum=data[i].bookNum||'0';
                          data2.boardingNum=data[i].boardingNum||'0';
                          data2.forbiddenNum=data[i].forbiddenNum||'0';
                          data2.illegalNum=data[i].illegalNum||'0';

                      table+='<tr style="background:#112b42;height:20px;display: table;table-layout: fixed;width:100%;">\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.fltno+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:110px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">'+data2.from+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:115px;">'+data2.preDepartTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:115px;">'+data2.preArriveTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:85px">'+data2.statusName+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.bookNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.boardingNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.forbiddenNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.illegalNum+'</td>\
                             </tr>'

                    }
                    html+=table+'</tbody></table></div>'
                   // //console.log(r);
                   // let data=r.data.flights[0];
                   // let html='<div class="katooltip">\
                   //            <span style="color:#31aafb">航班号：</span>'+data.fltno+' <span style="color:#31aafb">航班日期：</span>'+data.fltDate+'<span style="color:#31aafb">起飞地：</span>'+data.from+'<br>'+'\
                   //            <span style="color:#31aafb">到达地：</span>'+data.to+' <span style="color:#31aafb">起飞时间：</span>'+data.departTime+'<br>'+'\
                   //            <span style="color:#31aafb">预计到达时间：</span>'+data.preArriveTime+' <span style="color:#31aafb">载运旅客数：</span>'+data.boardingNum+'<br>'+'\
                   //            <span style="color:#31aafb">机组数：</span>'+data.checkNum+' <span style="color:#31aafb">不准入境人员：</span>'+data.forbiddenNum+'<br>'+'\
                   //           </div>'
                   callback(ticket, html);
                })
                return 'Loading';
            },
          },

        }
        data.forEach(function(val,index,arr){
          let a={
            name:val.fp,
            value:[val.fj,val.fw,val.fc]
          }
          let b={
            name:val.tp,
            value:[val.tj,val.tw,val.tc]
          }
          f.data.push(a)
          t.data.push(b)
        })
        this.series.push(f)
        this.series.push(t)
      }else if(type==2){
        let x = {
            type: 'lines',
            // coordinateSystem: 'lines',
            zlevel: 4,
            //symbol: ['none', 'arrow'],   // 用于设置箭头
            symbolSize: 10,
            effect: {
              show: true,
              period: 80,
              trailLength: 0,
              symbol:this.planePath,
              symbolSize: 15,
              color:'#ffffff',
              loop:true
            },
            markPoint:{
              symbol:'circle',
              symbolSize:15,
              symbolOffset:[0,'20%'],
              color:'#000000'
            },
            lineStyle: {
              normal: {
                color: '#11fa46',
                width: 1.5,
                opacity: 0.6,
                curveness: -0.2
              }
            },
            data: [],// 特效的起始、终点位置
            tooltip:{
              trigger: 'item',
              // formatter: '{b}<br/>{c}',
              backgroundColor:'#143652',
              padding:10,
              borderColor:'#028bd0',
              borderWidth:1,
              enterable :true,
              // triggerOn:'click',

              formatter: function (params, ticket, callback) {
                //console.log(params)
                  let p={
                    dt:params.data.fk,
                    dtLst:params.data.dtLst
                  }
                  _this.$api.post('/manage-platform/nationwide/getFlightDetail',p,
                   r => {
                     // //console.log(r);
                     let data=r.data;
                     let html='<div class="katooltip" >\
                                <span style="color:#31aafb">航班号:</span><span style="color:red">'+data.fltno+' </span><span style="color:#31aafb">起飞地:</span>'+data.from+' <span style="color:#31aafb">到达地:</span>'+data.to+' <br>'
                    if(data.fltDate){
                      html+=' <span style="color:#31aafb">航班日期:</span>'+data.fltDate
                    }
                    if(data.preDepartTime){
                      html+=' <span style="color:#31aafb">预计起飞时间:</span>'+data.preDepartTime
                    }
                    if(data.preArriveTime){
                      html+='<span style="color:#31aafb">预计到达时间:</span>'+data.preArriveTime+'<br>'
                    }
                    if(r.data.travelers){
                      let table='<table cellspacing="0" style="background:#09679d; width:100%;font-size:12px">\
                                    <thead>\
                                    <tr style="height:20px;">\
                                      <td style="height:20px!important;">姓名</td><td style="height:20px!important;">性别</td><td style="height:20px!important;">国籍/地区</td><td style="height:20px!important;">出生日期</td>\
                                    </tr>\
                                    </thead>\
                                    <tbody id="tbody1">';
                      for(var i in r.data.travelers){
                        //console.log("i",r.data.travelers[i])
                        let t
                        table+='<tr style="background:#112b42;height:20px;">\
                                  <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;" class="name">'+r.data.travelers[i].name+'</td>\
                                  <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;">'+r.data.travelers[i].genderStr+'</td>\
                                  <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;">'+r.data.travelers[i].nationalityName+'</td>\
                                  <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;">'+r.data.travelers[i].birthDay+'</td>\
                                </tr>'
                      }
                      html+=table+'</tbody></table></div>'
                    }
                     callback(ticket, html);
                     console.log(document.getElementById("tbody1"));
                     document.getElementById("tbody1").addEventListener('click',function(e){
                       if(e.target.className=='name'){
                         var trNodes = e.target.parentNode.parentNode.childNodes;
                         console.log("trNodes:",trNodes)
                         for(var x=0;x<trNodes.length;x++){
                           let a =trNodes[x].firstElementChild.getElementsByTagName('div')[0];
                           console.log('a',a)
                           if(a){
                             trNodes[x].firstElementChild.removeChild(a);
                           }
                         }
                         if(e.target.children.length==0){

                           // removeChild()
                           var div=document.createElement('div');
                           e.target.appendChild(div);
                           e.target.style.position='relative';
                           div.style.position='absolute';
                           div.style.top='-30px';
                           div.style.left="80px";
                           div.style.background="rgba(14, 32, 62, 0.88)";
                           div.style.border="1px #01aed4 solid";
                           div.style.boxShadow="0 0 6px #0288d1";
                           div.style.borderRadius="3px";
                           div.style.padding="15px";
                           let tarr=r.data.travelers;
                           let traveler={};
                           for(var i=0;i<tarr.length;i++){
                             if(e.target.innerText==tarr[i].name){
                               traveler=tarr[i]
                               console.log(traveler)
                             }
                           }
                           let h1='';let h2='';let h3='';let h4='';
                           if(traveler.pnrflag==1){
                             h1='<li><span>✔</span>已订票</li>'
                           }else{
                             h1='<li class="o-step-err"><span>!</span>已订票</li>'
                           }
                           if(traveler.chkflag==1){
                             h2='<li><span>✔</span>已值机</li>'
                           }else{
                             h2='<li class="o-step-err"><span>!</span>已值机</li>'
                           }
                           if(traveler.eeflag==1){
                             h3='<li><span>✔</span>出入境手续</li>'
                           }else{
                             h3='<li class="o-step-err"><span>!</span>出入境手续</li>'
                           }
                           if(traveler.clsflag==1){
                             h4='<li><span>✔</span>航班关闭</li>'
                           }else{
                             h4='<li class="o-step-err"><span>!</span>航班关闭</li>'
                           }

                           var html='<ul class="o-step">'+h1+h2+h3+h4+'</ul>\
                             <span class="o-jiao"></span>';
                           div.innerHTML=html;

                         }
                       }
                     });
                  })
                  return 'Loading';
              },
            },
          };
        let f={
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 6,
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            normal: {
              color: '#ffffff'
            }
          },
          label:{
            show:true,
            normal: {
               formatter: '{b}',
               position: 'bottom',
               show: true,
               color:'#fea92c',
             },
            emphasis: {
               show: true
            }
          },
          tooltip:{
            trigger: 'item',
            // formatter: '{b}<br/>{c}',
            backgroundColor:'#143652',
            padding:10,
            borderColor:'#028bd0',
            borderWidth:1,
            enterable :true,
            // triggerOn:'click',
            formatter: function (params, ticket, callback) {
                _this.$api.get('/manage-platform/nationwide/getPortDetail',{port:params.data.value[2]},
                 r => {
                   let data=r.data.flights;
                    let html ='';
                    let table='<table cellspacing="0" style="background:#09679d;font-size:12px;width:690px">\
                                    <thead style="display: table;table-layout: fixed;width:100%;">\
                                      <tr style="height:20px;display: table;table-layout: fixed;width:100%;">\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px">航班号</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:110px;">到达地</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:115px;">预计起飞时间</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:115px;">预计到达时间</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:85px;">航班状态</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">订票数</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px;">载运旅客</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px;">不准入境</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px;">非法载运</td>\
                                      </tr>\
                                    </thead>\
                                  <tbody style="max-height:240px!important;overflow-y:auto!important;display:block;width:100%;">';
                    for(var i in data){
                      let data2={};
                          data2.fltno=data[i].fltno||'-';
                          data2.preDepartTime=data[i].preDepartTime||'-';
                          data2.to=data[i].to||'-';
                          data2.preArriveTime=data[i].preArriveTime||'-';
                          data2.statusName=data[i].statusName||'-';
                          data2.bookNum=data[i].bookNum||'0';
                          data2.boardingNum=data[i].boardingNum||'0';
                          data2.forbiddenNum=data[i].forbiddenNum||'0';
                          data2.illegalNum=data[i].illegalNum||'0';
                      table+='<tr style="background:#112b42;height:20px;display: table;table-layout: fixed;width:100%;">\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.fltno+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:110px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">'+data2.to+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:115px;">'+data2.preDepartTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:115px;">'+data2.preArriveTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:85px">'+data2.statusName+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.bookNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.boardingNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.forbiddenNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.illegalNum+'</td>\
                             </tr>'

                    }
                    html+=table+'</tbody></table></div>'
                   // //console.log(r);
                   // let data=r.data.flights[0];
                   // let html='<div class="katooltip">\
                   //            <span style="color:#31aafb">航班号：</span>'+data.fltno+' <span style="color:#31aafb">航班日期：</span>'+data.fltDate+'<span style="color:#31aafb">起飞地：</span>'+data.from+'<br>'+'\
                   //            <span style="color:#31aafb">到达地：</span>'+data.to+' <span style="color:#31aafb">起飞时间：</span>'+data.departTime+'<br>'+'\
                   //            <span style="color:#31aafb">预计到达时间：</span>'+data.preArriveTime+' <span style="color:#31aafb">载运旅客数：</span>'+data.boardingNum+'<br>'+'\
                   //            <span style="color:#31aafb">机组数：</span>'+data.checkNum+' <span style="color:#31aafb">不准入境人员：</span>'+data.forbiddenNum+'<br>'+'\
                   //           </div>'
                   callback(ticket, html);
                })
                return 'Loading';
            },
          },

          symbolSize: 10,
          data: [],
        }
        let t={
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 6,
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            normal: {
              color: '#ffffff'
            }
          },
          label:{
            show:true,
            normal: {
               formatter: '{b}',
               position: 'bottom',
               show: true,
               color:'#fea92c',
             },
            emphasis: {
               show: true
            }
          },
          symbolSize: 10,
          data: [],
          tooltip:{
            trigger: 'item',
            // formatter: '{b}<br/>{c}',
            backgroundColor:'#143652',
            padding:10,
            borderColor:'#028bd0',
            borderWidth:1,
            enterable :true,
            // triggerOn:'click',
            formatter: function (params, ticket, callback) {
                _this.$api.get('/manage-platform/nationwide/getPortDetail',{port:params.data.value[2]},
                 r => {
                   let data=r.data.flights;
                    let html ='';
                    let table='<table cellspacing="0" style="background:#09679d;font-size:12px;width:690px">\
                                    <thead style="display: table;table-layout: fixed;width:100%;">\
                                      <tr style="height:20px;display: table;table-layout: fixed;width:100%;">\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px">航班号</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:110px;">起飞地</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:115px;">预计起飞时间</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:115px;">预计到达时间</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:85px;">航班状态</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">订票数</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">载运旅客</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">不准入境</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">非法载运</td>\
                                      </tr>\
                                    </thead>\
                                  <tbody style="max-height:240px!important;overflow-y:auto!important;display:block;width:100%;">';
                    for(var i in data){
                      let data2={};
                          data2.fltno=data[i].fltno||'-';
                          data2.preDepartTime=data[i].preDepartTime||'-';
                          data2.from=data[i].from||'-';
                          data2.preArriveTime=data[i].preArriveTime||'-';
                          data2.statusName=data[i].statusName||'-';
                          data2.bookNum=data[i].bookNum||'0';
                          data2.boardingNum=data[i].boardingNum||'0';
                          data2.forbiddenNum=data[i].forbiddenNum||'0';
                          data2.illegalNum=data[i].illegalNum||'0';

                      table+='<tr style="background:#112b42;height:20px;display: table;table-layout: fixed;width:100%;">\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.fltno+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:110px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">'+data2.from+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:115px;">'+data2.preDepartTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:115px;">'+data2.preArriveTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:85px">'+data2.statusName+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.bookNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.boardingNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.forbiddenNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.illegalNum+'</td>\
                             </tr>'

                    }
                    html+=table+'</tbody></table></div>'
                   // //console.log(r);
                   // let data=r.data.flights[0];
                   // let html='<div class="katooltip">\
                   //            <span style="color:#31aafb">航班号：</span>'+data.fltno+' <span style="color:#31aafb">航班日期：</span>'+data.fltDate+'<span style="color:#31aafb">起飞地：</span>'+data.from+'<br>'+'\
                   //            <span style="color:#31aafb">到达地：</span>'+data.to+' <span style="color:#31aafb">起飞时间：</span>'+data.departTime+'<br>'+'\
                   //            <span style="color:#31aafb">预计到达时间：</span>'+data.preArriveTime+' <span style="color:#31aafb">载运旅客数：</span>'+data.boardingNum+'<br>'+'\
                   //            <span style="color:#31aafb">机组数：</span>'+data.checkNum+' <span style="color:#31aafb">不准入境人员：</span>'+data.forbiddenNum+'<br>'+'\
                   //           </div>'
                   callback(ticket, html);
                })
                return 'Loading';
            },
          },

        }
        data.forEach(function(val,index,arr){
          let a={
            name:val.fp,
            value:[val.fj,val.fw,val.fc]
          }
          let b={
            name:val.tp,
            value:[val.tj,val.tw,val.tc]
          }
          let c={
            fk:val.fk,
            dtLst:val.tks,
            coords:[[val.fj,val.fw],[val.tj,val.tw]]
          }
          f.data.push(a)
          t.data.push(b)
          x.data.push(c)
        })
        this.series.push(f)
        this.series.push(t)
        this.series.push(x)
      }else if(type==3){
        let x = {
            type: 'lines',
            // coordinateSystem: 'lines',
            zlevel: 4,
            //symbol: ['none', 'arrow'],   // 用于设置箭头
            symbolSize: 10,
            effect: {
              show: true,
              period: 80,
              trailLength: 0,
              symbol:this.planePath,
              symbolSize: 15,
              color:'#ffffff',
              loop:true
            },
            markPoint:{
              symbol:'circle',
              symbolSize:15,
              symbolOffset:[0,'20%'],
              color:'#000000'
            },
            lineStyle: {
              normal: {
                color: '#11fa46',
                width: 1.5,
                opacity: 0.6,
                curveness: -0.2
              }
            },
            data: [],// 特效的起始、终点位置
            tooltip:{
              trigger: 'item',
              // formatter: '{b}<br/>{c}',
              backgroundColor:'#143652',
              padding:10,
              borderColor:'#028bd0',
              borderWidth:1,
              enterable :true,
              // triggerOn:'click',

              formatter: function (params, ticket, callback) {
                //console.log(params)
                  let p={
                    dt:params.data.fk,
                    dtLst:params.data.dtLst
                  }
                  _this.$api.post('/manage-platform/nationwide/getFlightDetail',p,
                   r => {
                     // //console.log(r);
                     let data=r.data;
                     let html='<div class="katooltip" >\
                                <span style="color:#31aafb">航班号:</span><span style="color:red">'+data.fltno+' </span><span style="color:#31aafb">起飞地:</span>'+data.from+' <span style="color:#31aafb">到达地:</span>'+data.to+' <br>'
                    if(data.fltDate){
                      html+=' <span style="color:#31aafb">航班日期:</span>'+data.fltDate
                    }
                    if(data.preDepartTime){
                      html+=' <span style="color:#31aafb">预计起飞时间:</span>'+data.preDepartTime
                    }
                    if(data.preArriveTime){
                      html+='<span style="color:#31aafb">预计到达时间:</span>'+data.preArriveTime+'<br>'
                    }
                    if(r.data.travelers){
                      let table='<table cellspacing="0" style="background:#09679d; width:100%;font-size:12px">\
                                    <thead>\
                                    <tr style="height:20px;">\
                                      <td style="height:20px!important;">姓名</td><td style="height:20px!important;">性别</td><td style="height:20px!important;">国籍/地区</td><td style="height:20px!important;">出生日期</td>\
                                    </tr>\
                                    </thead>\
                                    <tbody id="tbody1">';
                      for(var i in r.data.travelers){
                        //console.log("i",r.data.travelers[i])
                        let t
                        table+='<tr style="background:#112b42;height:20px;">\
                                  <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;" class="name">'+r.data.travelers[i].name+'</td>\
                                  <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;">'+r.data.travelers[i].genderStr+'</td>\
                                  <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;">'+r.data.travelers[i].nationalityName+'</td>\
                                  <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;">'+r.data.travelers[i].birthDay+'</td>\
                                </tr>'
                      }
                      html+=table+'</tbody></table></div>'
                    }
                     callback(ticket, html);
                     console.log(document.getElementById("tbody1"));
                     document.getElementById("tbody1").addEventListener('click',function(e){
                       if(e.target.className=='name'){
                         var trNodes = e.target.parentNode.parentNode.childNodes;
                         console.log("trNodes:",trNodes)
                         for(var x=0;x<trNodes.length;x++){
                           let a =trNodes[x].firstElementChild.getElementsByTagName('div')[0];
                           console.log('a',a)
                           if(a){
                             trNodes[x].firstElementChild.removeChild(a);
                           }
                         }
                         if(e.target.children.length==0){

                           // removeChild()
                           var div=document.createElement('div');
                           e.target.appendChild(div);
                           e.target.style.position='relative';
                           div.style.position='absolute';
                           div.style.top='-30px';
                           div.style.left="80px";
                           div.style.background="rgba(14, 32, 62, 0.88)";
                           div.style.border="1px #01aed4 solid";
                           div.style.boxShadow="0 0 6px #0288d1";
                           div.style.borderRadius="3px";
                           div.style.padding="15px";
                           let tarr=r.data.travelers;
                           let traveler={};
                           for(var i=0;i<tarr.length;i++){
                             if(e.target.innerText==tarr[i].name){
                               traveler=tarr[i]
                               console.log(traveler)
                             }
                           }
                           let h1='';let h2='';let h3='';let h4='';
                           if(traveler.pnrflag==1){
                             h1='<li><span>✔</span>已订票</li>'
                           }else{
                             h1='<li class="o-step-err"><span>!</span>已订票</li>'
                           }
                           if(traveler.chkflag==1){
                             h2='<li><span>✔</span>已值机</li>'
                           }else{
                             h2='<li class="o-step-err"><span>!</span>已值机</li>'
                           }
                           if(traveler.eeflag==1){
                             h3='<li><span>✔</span>出入境手续</li>'
                           }else{
                             h3='<li class="o-step-err"><span>!</span>出入境手续</li>'
                           }
                           if(traveler.clsflag==1){
                             h4='<li><span>✔</span>航班关闭</li>'
                           }else{
                             h4='<li class="o-step-err"><span>!</span>航班关闭</li>'
                           }

                           var html='<ul class="o-step">'+h1+h2+h3+h4+'</ul>\
                             <span class="o-jiao"></span>';
                           div.innerHTML=html;

                         }
                       }
                     });
                  })
                  return 'Loading';
              },
            },
          };

        let f={
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 6,
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            normal: {
              color: '#ffffff'
            }
          },
          label:{
            show:true,
            normal: {
               formatter: '{b}',
               position: 'bottom',
               show: true,
               color:'#fea92c',
             },
            emphasis: {
               show: true
            }
          },
          tooltip:{
            trigger: 'item',
            // formatter: '{b}<br/>{c}',
            backgroundColor:'#143652',
            padding:10,
            borderColor:'#028bd0',
            borderWidth:1,
            enterable :true,
            // triggerOn:'click',
            formatter: function (params, ticket, callback) {
                _this.$api.get('/manage-platform/nationwide/getPortDetail',{port:params.data.value[2]},
                 r => {
                   let data=r.data.flights;
                    let html ='';
                    let table='<table cellspacing="0" style="background:#09679d;font-size:12px;width:690px">\
                                    <thead style="display: table;table-layout: fixed;width:100%;">\
                                      <tr style="height:20px;display: table;table-layout: fixed;width:100%;">\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px">航班号</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:110px;">到达地</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:115px;">预计起飞时间</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:115px;">预计到达时间</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:85px;">航班状态</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">订票数</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px;">载运旅客</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px;">不准入境</td>\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px;">非法载运</td>\
                                      </tr>\
                                    </thead>\
                                  <tbody style="max-height:240px!important;overflow-y:auto!important;display:block;width:100%;">';
                    for(var i in data){
                      let data2={};
                          data2.fltno=data[i].fltno||'-';
                          data2.preDepartTime=data[i].preDepartTime||'-';
                          data2.to=data[i].to||'-';
                          data2.preArriveTime=data[i].preArriveTime||'-';
                          data2.statusName=data[i].statusName||'-';
                          data2.bookNum=data[i].bookNum||'0';
                          data2.boardingNum=data[i].boardingNum||'0';
                          data2.forbiddenNum=data[i].forbiddenNum||'0';
                          data2.illegalNum=data[i].illegalNum||'0';

                          console.log(data2)
                      table+='<tr style="background:#112b42;height:20px;display: table;table-layout: fixed;width:100%;">\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.fltno+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:110px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">'+data2.to+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:115px;">'+data2.preDepartTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:115px;">'+data2.preArriveTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:85px">'+data2.statusName+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.bookNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.boardingNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.forbiddenNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.illegalNum+'</td>\
                             </tr>'

                    }
                    html+=table+'</tbody></table></div>'
                   // //console.log(r);
                   // let data=r.data.flights[0];
                   // let html='<div class="katooltip">\
                   //            <span style="color:#31aafb">航班号：</span>'+data.fltno+' <span style="color:#31aafb">航班日期：</span>'+data.fltDate+'<span style="color:#31aafb">起飞地：</span>'+data.from+'<br>'+'\
                   //            <span style="color:#31aafb">到达地：</span>'+data.to+' <span style="color:#31aafb">起飞时间：</span>'+data.departTime+'<br>'+'\
                   //            <span style="color:#31aafb">预计到达时间：</span>'+data.preArriveTime+' <span style="color:#31aafb">载运旅客数：</span>'+data.boardingNum+'<br>'+'\
                   //            <span style="color:#31aafb">机组数：</span>'+data.checkNum+' <span style="color:#31aafb">不准入境人员：</span>'+data.forbiddenNum+'<br>'+'\
                   //           </div>'
                   callback(ticket, html);
                })
                return 'Loading';
            },
          },

          symbolSize: 10,
          data: [],
        }
        let t={
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 6,
          rippleEffect: {
            brushType: 'stroke'
          },
          itemStyle: {
            normal: {
              color: '#ffffff'
            }
          },
          label:{
            show:true,
            normal: {
               formatter: '{b}',
               position: 'bottom',
               show: true,
               color:'#fea92c',
             },
            emphasis: {
               show: true
            }
          },
          symbolSize: 10,
          data: [],
          tooltip:{
            trigger: 'item',
            // formatter: '{b}<br/>{c}',
            backgroundColor:'#143652',
            padding:10,
            borderColor:'#028bd0',
            borderWidth:1,
            enterable :true,
            // triggerOn:'click',
            formatter: function (params, ticket, callback) {
                _this.$api.get('/manage-platform/nationwide/getPortDetail',{port:params.data.value[2]},
                 r => {
                   let data=r.data.flights;
                    let html ='';
                    let table='<table cellspacing="0" style="background:#09679d;font-size:12px;width:690px">\
                                    <thead style="display: table;table-layout: fixed;width:100%;">\
                                      <tr style="height:20px;display: table;table-layout: fixed;width:100%;">\
                                        <td style="height:20px!important;padding:0 5px!important;width:50px">航班号</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:110px;">起飞地</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:115px;">预计起飞时间</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:115px;">预计到达时间</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:85px;">航班状态</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">订票数</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">载运旅客</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">不准入境</td>\
                                        <td style="height:20px!important;padding:0 0px!important;width:50px;">非法载运</td>\
                                      </tr>\
                                    </thead>\
                                  <tbody style="max-height:240px!important;overflow-y:auto!important;display:block;width:100%;">';
                    for(var i in data){
                      let data2={};
                          data2.fltno=data[i].fltno||'-';
                          data2.preDepartTime=data[i].preDepartTime||'-';
                          data2.from=data[i].from||'-';
                          data2.preArriveTime=data[i].preArriveTime||'-';
                          data2.statusName=data[i].statusName||'-';
                          data2.bookNum=data[i].bookNum||'0';
                          data2.boardingNum=data[i].boardingNum||'0';
                          data2.forbiddenNum=data[i].forbiddenNum||'0';
                          data2.illegalNum=data[i].illegalNum||'0';

                      table+='<tr style="background:#112b42;height:20px;display: table;table-layout: fixed;width:100%;">\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 5px!important;width:50px">'+data2.fltno+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:110px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;">'+data2.from+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:115px;">'+data2.preDepartTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:115px;">'+data2.preArriveTime+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:85px">'+data2.statusName+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.bookNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.boardingNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.forbiddenNum+'</td>\
                                <td style="border:1px #143652 solid;height:20px!important;padding:0 0px!important;width:50px">'+data2.illegalNum+'</td>\
                             </tr>'

                    }
                    html+=table+'</tbody></table></div>'
                   // //console.log(r);
                   // let data=r.data.flights[0];
                   // let html='<div class="katooltip">\
                   //            <span style="color:#31aafb">航班号：</span>'+data.fltno+' <span style="color:#31aafb">航班日期：</span>'+data.fltDate+'<span style="color:#31aafb">起飞地：</span>'+data.from+'<br>'+'\
                   //            <span style="color:#31aafb">到达地：</span>'+data.to+' <span style="color:#31aafb">起飞时间：</span>'+data.departTime+'<br>'+'\
                   //            <span style="color:#31aafb">预计到达时间：</span>'+data.preArriveTime+' <span style="color:#31aafb">载运旅客数：</span>'+data.boardingNum+'<br>'+'\
                   //            <span style="color:#31aafb">机组数：</span>'+data.checkNum+' <span style="color:#31aafb">不准入境人员：</span>'+data.forbiddenNum+'<br>'+'\
                   //           </div>'
                   callback(ticket, html);
                })
                return 'Loading';
            },
          },

        }
        data.forEach(function(val,index,arr){
          let a={
            name:val.fp,
            value:[val.fj,val.fw,val.fc]
          }
          let b={
            name:val.tp,
            value:[val.tj,val.tw,val.tc]
          }
          let c={
            fk:val.fk,
            dtLst:val.tks,
            coords:[[val.fj,val.fw],[val.tj,val.tw]]
          }
          f.data.push(a)
          t.data.push(b)
          x.data.push(c)
        })
        this.series.push(f)
        this.series.push(t)
        this.series.push(x)
      }
      console.log("this.series2======",this.series)

      this.initChart(this.series);

    },
    // tabclick(e){
    //   console.log("###########",e)
    // },

    // 航班详细信息取得=========================================================================================
    getXqHb(fk){
      this.$api.get('/manage-platform/nationwide/getFlightDetail',{fk:fk},
       r => {
         //console.log(r);
      })
    },
    //口岸详细信息取得
    getXqKa(port){
      this.$api.get('/manage-platform/nationwide/getPortDetail',{port:port},
       r => {
         //console.log(r);
         this.XqKa=r.data.flights[0]
         //console.log(this.XqKa.aircompanyName)
      })
    },
    // 当前监控口岸取得
    getJkKa(){
      this.$api.post('/manage-platform/portMonitor/getMonitorPortInfo',{},
       r => {
         console.log("getJkKa",r);
         this.crType=r.data.ioType;
         this.checkAll2=r.data.iPortAll;
         this.checkList2=r.data.iPortObjLst;
         this.checkAll=r.data.iProvAll;
         this.checkList=r.data.iProvObjLst;
         this.checkAll5=r.data.oContAll;
         this.checkList5=r.data.oContObjLst;
         this.checkAll3=r.data.oCounAll;
         this.checkList3=r.data.oCounObjLst;
         this.checkAll4=r.data.oPortAll;
         this.checkList4=r.data.oPortObjLst;
      })
    },
    // 更新监控口岸
    updateJkKa(){

      let p={
        "iPortAll": this.checkAll2, // 境内口岸 0：未全选  1：全选
        "iPortLst": this.checkList2.map(function(val){
          return val.code
        },this), 	// 境内口岸 选中
        "iPortObjLst": this.checkList2, // 境内口岸 选中

        "iProvAll": this.checkAll,// 境内省 是否全选 0：未全选  1：全选
        "iProvLst": this.checkList.map(function(val){
          return val.code
        }),	// 境内省 选中
        "iProvObjLst": this.checkList,	// 境内省 选中

        "ioType": this.crType,	// 出入类型  I:入境，O:出境,A:全部
        "oContAll": this.checkAll5,	// 境外洲 0：未全选  1：全选
        "oContLst": this.checkList5.map(function(val){
          return val.code
        }),// 境外洲 选中
        "oContObjLst": this.checkList5,// 境外洲 选中

        "oCounAll": this.checkAll3,	// 境外国 0：未全选  1：全选
        "oCounLst": this.checkList3.map(function(val){
          return val.code
        }),
        "oCounObjLst": this.checkList3,

        "oPortAll": this.checkAll4,	// 境外口岸 0：未全选  1：全选
        "oPortLst": this.checkList4.map(function(val){
          return val.code
        }),		// 境外口岸 选中
        "oPortObjLst": this.checkList4,		// 境外口岸 选中

      };
      this.$api.post('/manage-platform/portMonitor/updateMonitorPortInfo',p,
       r => {
         console.log("updateJkKa",r);
         this.getNewData0();
         this.tabId=0;
      })
    },
    // 境内省列表取得
    getSList(){
      if(this.checkShow)return;
      this.checkShow=true;
      this.checkShow2=false;this.checkShow3=false;this.checkShow4=false;this.checkShow5=false;
      //console.log("ddddd",this.checkList)
      this.$api.post('/manage-platform/portMonitor/getInProvinceList',{},
       r => {
         this.locationData=r.data;
         let obj1=r.data;

         for(var i in obj1){
           for(var j in this.locationName){
             if(j.indexOf(i)>-1){
               this.$set(this.locationName[j],i,obj1[i]);
             }
           }
         }
         //console.log(this.locationName)
      })
    },
    // 境内口岸列表取得
    getKaList(){
      this.port0='';
      this.searchP0=true;
      if(this.checkShow2)return;
      let p=this.checkList.map(function(val){
        return val.code
      })
      //console.log("p",p);
      if(p.length==0){
        this.$message({
         message: '请先选择省！',
         type: 'warning'
       });
        return
      }

      this.locationName2={
        ABCDE:{},
        FGHJ:{},
        KLMNP:{},
        QRSTW:{},
        XYZ:{}
      }


      this.checkShow2=true;
      this.checkShow=false;this.checkShow3=false;this.checkShow4=false;this.checkShow5=false;


      this.$api.post('/manage-platform/portMonitor/getInPortList',{dtLst:p},
       r => {
         //console.log(r);
         this.locationData2=r.data;
         let obj1=r.data;
         for(var i in obj1){
           for(var j in this.locationName){
             if(j.indexOf(i)>-1){
               this.$set(this.locationName2[j],i,obj1[i]);
             }
           }
         }
      })
    },
    // 境外国家列表取得
    getGjList(){
      this.gj1='';
      this.searchG=true;

      if(this.checkShow3)return;

      let p=this.checkList5.map(function(val){
        return val.code
      })
      if(p.length==0){
        this.$message({
         message: '请先选择洲！',
         type: 'warning'
       });
        return
      }
      this.locationName3={
        ABCDE:{},
        FGHJ:{},
        KLMNP:{},
        QRSTW:{},
        XYZ:{}
      }
      this.checkShow3=true;
      this.checkShow2=false;this.checkShow=false;this.checkShow4=false;this.checkShow5=false;


      this.$api.post('/manage-platform/portMonitor/getOutNationalityList',{dtLst:p},
       r => {
         //console.log(r);
         this.locationData3=r.data;
         let obj1=r.data;
         for(var i in obj1){
           for(var j in this.locationName3){
             if(j.indexOf(i)>-1){
               this.$set(this.locationName3[j],i,obj1[i]);
             }
           }
         }
      })
    },
    // 境外口岸列表取得
    getJwKaList(){
      this.port1='';
      this.searchP=true;
      if(this.checkShow4)return;

      let p=this.checkList3.map(function(val){
        return val.code
      })
      if(p.length==0){
        this.$message({
         message: '请先选择洲和国家！',
         type: 'warning'
       });
        return
      }
      this.locationName4={
        ABCDE:{},
        FGHJ:{},
        KLMNP:{},
        QRSTW:{},
        XYZ:{}
      }
      this.checkShow4=true;
      this.checkShow2=false;this.checkShow3=false;this.checkShow=false;this.checkShow5=false;


      this.$api.post('/manage-platform/portMonitor/getOutPortList',{dtLst:p},
       r => {
         //console.log(r);
         this.locationData4=r.data;
         let obj1=r.data;
         for(var i in obj1){
           for(var j in this.locationName4){
             if(j.indexOf(i)>-1){
               this.$set(this.locationName4[j],i,obj1[i]);

             }
           }
         }
      })
    },
    clear0(){
      this.checkAll=0;
      this.checkAll2=0;
      this.checkAll3=0;
      this.checkAll4=0;
      this.checkAll5=0;
      this.checkList=[];
      this.checkList2=[];
      this.checkList3=[];
      this.checkList4=[];
      this.checkList5=[];
    },
    // 清空航班查询====================================================================================================
    cleartab2(){
        this.p1={
          showCount:5,
          currentResult:0,
          currentPage:1
        }
    },
    // 清空人员查询
    cleartab3(){
        this.p2={
          showCount:5,
          currentResult:0,
          currentPage:1
        }
    },
    // 航班监控查询
    getJkHb(){
      this.$api.post('/manage-platform/flightMonitor/queryFlightPage',this.p1,
       r => {
         //console.log(r);
         this.HBList=r.data.pdList

      })
    },
    // 添加监控航班addMonitorFlight
    addJkHb(fk){
      if(fk.to=="null"){
        this.$message.error('该条数据不完整无法添加');
        return
      }
      this.$api.get('/manage-platform/flightMonitor/addMonitorFlight',{fltKey:fk.fltKey},
       r => {
         //console.log(r);
         if(r.success){
           this.$message({
             message: '恭喜你，添加成功！',
             type: 'success'
           });
           this.getDqJkHb(2)
         }
      })
    },
    // 删除监控航班delMonitorFlight
    delJkHb(fk){
      this.$api.get('/manage-platform/flightMonitor/delMonitorFlight',{fltKey:fk},
       r => {
         //console.log(r);
         if(r.success){
           this.$message({
             message: '恭喜你，删除成功！',
             type: 'success'
           });
           this.getDqJkHb(2)
         }
      })
    },
    // 当前监控航班取得
    getDqJkHb(type){
      this.$api.get('/manage-platform/flightMonitor/getMonitorFlights',{},
       r => {
         //console.log(r);
         this.DqJkHb=r.data;
         if(type==2){
           this.getNewData(2)
         }
      })
    },

    // 人员监控查询=========================================================================================
    getreplace(name) {
      if (name == undefined) {
        return "";
      } else {
        return name.replace(/(^\s*)|(\s*$)/g, "").replace(/\s/g, "");
      }
    },
    getRy(){
      this.p2.name=this.getreplace(this.p2.name);
      //console.log("this.p2.name",this.p2.name)
      this.$api.post('/manage-platform/travelerMonitor/queryTravelerPage',this.p2,
       r => {
         //console.log(r);
         this.RyList=r.data.pdList;


      })
    },
    // 添加监控人员
    addRy(tk){
      this.$api.get('/manage-platform/travelerMonitor/addMonitorTraveler',{trvKey:tk},
       r => {
         //console.log(r);
         if(r.success){
           this.$message({
             message: '恭喜你，添加成功！',
             type: 'success'
           });
           this.getDqRy(2)
         }
      })
    },
    // 删除监控人员
    delRy(tk){
      this.$api.get('/manage-platform/travelerMonitor/delMonitorTraveler',{trvKey:tk},
       r => {
         //console.log(r);
         if(r.success){
           this.$message({
             message: '恭喜你，删除成功！',
             type: 'success'
           });
           this.getDqRy(2)
         }
      })
    },
    // 当前监控人员取得
    getDqRy(type){
      this.$api.post('/manage-platform/travelerMonitor/getMonitorTravelers',{},
       r => {
         //console.log(r);
         this.DqRy=r.data;
         if(type==2){
           this.getNewData(3)
         }

      })
    },

    initChart(series) {

      this.chart = echarts.init(this.$refs.myEchart);
      // window.onresize = echarts.init(this.$refs.myEchart).resize;
      // 把配置和数据放这里
      this.chart.setOption({
        geo: {
          map: 'world', // 与引用进来的地图js名字一致
          roam: true, // 禁止缩放平移
          scaleLimit:{
            min:0.8,
            max:8
          },
          nameMap:{
            // 'China':'中国'
          },
          label:{
            // show:true,
            emphasis: {
              show: false
            }
          },
          itemStyle: { // 每个区域的样式
            borderWidth:10,
            normal: {
              areaColor: '#02b0d2'
            },
            emphasis: {
              areaColor: '#02b0d2'
            }
          },
          regions: [{ // 选中的区域
            name: 'China',
            selected: true,
            itemStyle: { // 高亮时候的样式
              emphasis: {
                areaColor: '#3dbb7a'
              }
            },
            label: { // 高亮的时候不显示标签
              emphasis: {
                show: false
              }
            }
          }]
          },
          tooltip : {
               trigger: 'item',
               // formatter: '{b}<br/>{c}',
               backgroundColor:'#143652',
               padding:10,
               borderColor:'#028bd0',
               borderWidth:1,
               enterable :true,
               position:'inside',
               confine :true,
               // triggerOn:'click'
           },
          series: series, // 将之前处理的数据放到这里
          textStyle: {
            fontSize: 12
          }
      });
    }
  },
  watch:{
    checkList:function(val){
      if(val.length==0){
        this.checkList2=[];
        this.checkShow2=false;

      }
    },
    checkList5:function(val){
      if(val.length==0){

        this.checkAll5=0
        this.checkList3=[];
        this.checkShow3=false;
        if(this.checkList4){
          this.checkList4=[];
          this.checkShow4=false;
        }

      }
    },
    checkList3:function(val){
      if(val.length==0){
        this.checkList4=[];
        this.checkShow4=false;
      }
    },
    showLeft:function (val) {
      if(!val){
        this.getLeftData()
      }
    },
    showRight:function (val) {
      if(!val){
        this.getRightData()
      }
    },

  }
}

</script>
<style scoped>
@import 'nationalHBSSJK.css';
</style>
