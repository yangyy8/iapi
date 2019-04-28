import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/content/:navId',
      name: 'Content',
      meta: {logined:true},
      component: resolve => require(['@/components/content'], resolve),

      children: [
        // 业务处理=================================================================================================================================

        // 报警处理---------------------------------------------------------------------------------------------------
        //名单报警处理---------------------------------------------------------------------------------------------------
        {
          path: "ProcessMDBJ",
          name: "ProcessMDBJ",
          component: resolve => require(['@/components/BusinessProcessing/Alarm/ProcessMDBJ'], resolve),

        },
        {
          path: "alarmProcess",
          name: "alarmProcess",
          component: resolve => require(['@/components/BusinessProcessing/Alarm/alarmProcess'], resolve),
        },
        //应急校验码管理
        {
          path: "CodeYJJYM",
          name: "CodeYJJYM",
          component: resolve => require(['@/components/BusinessProcessing/Ccode/CodeYJJYM'], resolve),

        },
        {
          path: "infoComparison",
          name: "infoComparison",
          component: resolve => require(['@/components/BusinessProcessing/Alarm/infoComparison'], resolve),
        },

        //二次查控报警
        {
          path: "ProcessECBDBJ",
          name: "ProcessECBDBJ",
          component: resolve => require(['@/components/BusinessProcessing/Alarm/ProcessECBDBJ'], resolve),
        },
        //重点关注人员预报警
        {
          path: "ProcessZDGZRY",
          name: "ProcessZDGZRY",
          component: resolve => require(['@/components/BusinessProcessing/Alarm/ProcessZDGZRY'], resolve),
        },
        //常规业务处理-------------------------------------------------------------------------------
        //指令变更
        {
          path: "ProcessZLBG",
          name: "ProcessZLBG",
          component: resolve => require(['@/components/BusinessProcessing/ZLBG/ProcessZLBG'], resolve),
        },
        //备降航班处理-------------------------------------------------------------------------------
        //航班状态变更
        {
          path: "ProcessHBZT",
          name: "ProcessHBZT",
          component: resolve => require(['@/components/BusinessProcessing/BJHB/ProcessHBZT'], resolve),
        },
        // 咨询处理 Consultation----------------------------------------------------------------------------
        // 咨询历史  ConsultingHistory
        {
          path: "ConsultingHistory",
          name: "ConsultingHistory",
          component: resolve => require(['@/components/BusinessProcessing/Consultation/ConsultingHistory'], resolve),
        },
        // 咨询登记  ConsultationZXDJ
        {
          path: "ConsultationZXDJ",
          name: "ConsultationZXDJ",
          component: resolve => require(['@/components/BusinessProcessing/Consultation/ConsultationZXDJ'], resolve),
        },
        // 查看通讯录  ConsultationCKTXL
        {
          path: "ConsultationCKTXL",
          name: "ConsultationCKTXL",
          component: resolve => require(['@/components/BusinessProcessing/Consultation/ConsultationCKTXL'], resolve),
        },
        // 咨询回顾  ConsultationZXHG
        {
          path: "ConsultationZXHG",
          name: "ConsultationZXHG",
          component: resolve => require(['@/components/BusinessProcessing/Consultation/ConsultationZXHG'], resolve),
        },
        // 内部信息收发 IRNR-------------------------------------------------------------------------------
        // 信息收发  InformationReceiving
        {
          path: "InformationReceiving",
          name: "InformationReceiving",
          component: resolve => require(['@/components/BusinessProcessing/IRNR/InformationReceiving'], resolve),
        },

        // 业务应用===================================================================================================================================
        // 信息查询---------------------------------------------------------------------------------------------------
        //人员信息查询
        // {
        //   path: "QueryRYXX",
        //   name: "QueryRYXX",
        //   component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryRYXX'], resolve),
        // },
        {
          path: "QueryRYXX",
          name: "QueryRYXX",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryRYXX'], resolve),
          children:[
            //综合查询
            // {
            //   path: "/",
            //   name: "QueryRYXX",
            //   redirect: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryRYXXZH'], resolve),
            // },
            //综合查询
            {
              path: "QueryRYXXZH",
              name: "QueryRYXXZH",
              component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryRYXXZH'], resolve),
            },
            //批量查询
            {
              path: "QueryRYXXPL",
              name: "QueryRYXXPL",
              component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryRYXXPL'], resolve),
            },
            //自定义查询
            {
              path: "QueryRYXXZDY",
              name: "QueryRYXXZDY",
              component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryRYXXZDY'], resolve),
            },
          ]

        },
        // 业务事件查询
        {
          path: "QueryYWSJ",
          name: "QueryYWSJ",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryYWSJ'], resolve),

        },
        // {
        //   path: "QueryYWSJD",
        //   name: "QueryYWSJD",
        //   component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryYWSJD'], resolve),
        // },
        // 航班信息查询
        {
          path: "QueryHBXX",
          name: "QueryHBXX",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryHBXX'], resolve),

        },
        // 命中人员查询
        {
          path: "QueryMZRY",
          name: "QueryMZRY",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryMZRY'], resolve),

        },
        // 关联人员路由
        {
          path: "QueryYWSJD",
          name: "QueryYWSJD",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryYWSJD'], resolve),

        },
        // 关联人员查询
        {
          path: "QueryGLRY",
          name: "QueryGLRY",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryGLRY'], resolve),

        },

        // 航班座位查询
        {
          path: "QueryHBZW",
          name: "QueryHBZW",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryHBZW'], resolve),

        },
        // 校验比对结果查询
        {
          path: "QueryJYBDJG",
          name: "QueryJYBDJG",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryJYBDJG'], resolve),

        },
        // 综合查询
        {
          path: "QueryAll",
          name: "QueryAll",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryAll'], resolve),

        },

        //专题数据统计------------------------------------------------------------------------------------------------------
        //  综合数据分析
        {
          path: "AnalyzeZHSJ",
          name: "AnalyzeZHSJ",
          component: resolve => require(['@/components/BusinessApplications/DataStatistics/AnalyzeZHSJ'], resolve),

        },
        //  航班统计分析
        {
          path: "AnalyzeHBTJ",
          name: "AnalyzeHBTJ",
          component: resolve => require(['@/components/BusinessApplications/DataStatistics/AnalyzeHBTJ'], resolve),

        },
        //  航线专题分析
        {
          path: "AnalyzeHXZT",
          name: "AnalyzeHXZT",
          component: resolve => require(['@/components/BusinessApplications/DataStatistics/AnalyzeHXZT'], resolve),

        },
        //  航空公司专题分析
        {
          path: "AnalyzeHKGS",
          name: "AnalyzeHKGS",
          component: resolve => require(['@/components/BusinessApplications/DataStatistics/AnalyzeHKGS'], resolve),
        },
        //  口岸/机场专题分析
        {
          path: "AnalyzeKAJC",
          name: "AnalyzeKAJC",
          component: resolve => require(['@/components/BusinessApplications/DataStatistics/AnalyzeKAJC'], resolve),
        },
        //   名单比对专题分析
        {
          path: "AnalyzeMDBD",
          name: "AnalyzeMDBD",
          component: resolve => require(['@/components/BusinessApplications/DataStatistics/AnalyzeMDBD'], resolve),
        },
        //   数据校验专题分析
        {
          path: "AnalyzeSJJY",
          name: "AnalyzeSJJY",
          component: resolve => require(['@/components/BusinessApplications/DataStatistics/AnalyzeSJJY'], resolve),
        },
        // 预报质量评价  QualityAssessment--------------------------------------------------------------------------------
        // 质量综合评价pnr        AppraiseZLZH
        {
          path: "AppraiseZLZH",
          name: "AppraiseZLZH",
          component: resolve => require(['@/components/BusinessApplications/QualityAssessment/AppraiseZLZH'], resolve),
        },
        //  预报时效性评价          AppraiseYBSX
        {
          path: "AppraiseYBSX",
          name: "AppraiseYBSX",
          component: resolve => require(['@/components/BusinessApplications/QualityAssessment/AppraiseYBSX'], resolve),
        },
        // 信息准确性评价          AppraiseXXZQ
        {
          path: "AppraiseXXZQ",
          name: "AppraiseXXZQ",
          component: resolve => require(['@/components/BusinessApplications/QualityAssessment/AppraiseXXZQ'], resolve),
        },
        // 可疑人员筛查  ScreeningStudies----------------------------------------------------------------------------------
        // 重复人员预警      ScreeningCFRYYJ
        {
          path: "ScreeningCFRYYJ",
          name: "ScreeningCFRYYJ",
          component: resolve => require(['@/components/BusinessApplications/ScreeningStudies/ScreeningCFRYYJ'], resolve),
        },
        //  失踪人员筛查      ScreeningSZRY
        {
          path: "ScreeningSZRY",
          name: "ScreeningSZRY",
          component: resolve => require(['@/components/BusinessApplications/ScreeningStudies/ScreeningSZRY'], resolve),
        },
        //  频次可疑人员      ScreeningPCKYRY
        {
          path: "ScreeningPCKYRY",
          name: "ScreeningPCKYRY",
          component: resolve => require(['@/components/BusinessApplications/ScreeningStudies/ScreeningPCKYRY'], resolve),
        },
        // 校验比对结果---------------------------------------------------------------------------------------------------
        //数据项校验结果查询
        {
          path: "DataItem",
          name: "DataItem",
          component: resolve => require(['@/components/BusinessApplications/CheckResult/DataItem'], resolve),

        },
        //业务规则校验结果查询
        {
          path: "Rules",
          name: "Rules",
          component: resolve => require(['@/components/BusinessApplications/CheckResult/Rules'], resolve),

        },
        //名单比对结果查询
        {
          path: "ListComparison",
          name: "ListComparison",
          component: resolve => require(['@/components/BusinessApplications/CheckResult/ListComparison'], resolve),

        },
        // 业务管理===================================================================================================================================
        //名单管理-----------------------------------------------------------------------------------------------------
        // 名单数据分析
        {
          path: "ListMDSJFX",
          name: "ListMDSJFX",
          component: resolve => require(['@/components/BusinessManagement/List/ListMDSJFX'], resolve),

        },
        // 白名单管理
        {
          path: "ListBMD",
          name: "ListBMD",
          component: resolve => require(['@/components/BusinessManagement/List/ListBMD'], resolve),

        },
        // 临控名单管理-
        {
          path: "ListLKMD",
          name: "ListLKMD",
          component: resolve => require(['@/components/BusinessManagement/List/ListLKMD'], resolve),

        },
        // 重点关注名单管理-
        {
          path: "LIstZDGZRYMD",
          name: "LIstZDGZRYMD",
          component: resolve => require(['@/components/BusinessManagement/List/LIstZDGZRYMD'], resolve),

        },
        //业务规则管理--------------------------------------------------------------------------------------------
        //数据项校验规则管理
        {
          path: "ListSJXJYGZ",
          name: "ListSJXJYGZ",
          component: resolve => require(['@/components/BusinessManagement/Rule/ListSJXJYGZ'], resolve),

        },
        //一般性规则管理
        {
          path: "ListYBXGZ",
          name: "ListYBXGZ",
          component: resolve => require(['@/components/BusinessManagement/Rule/ListYBXGZ'], resolve),

        },
        //免签规则管理
        {
          path: "ListMQGZ",
          name: "ListMQGZ",
          component: resolve => require(['@/components/BusinessManagement/Rule/ListMQGZ'], resolve),

        },
        // 航班管理 FlightManagement---------------------------------------------------------------------------------------------
        // 机场列表管理  AirportListManagement
        {
          path: "AirportListManagement",
          name: "AirportListManagement",
          component: resolve => require(['@/components/BusinessManagement/FlightManagement/AirportListManagement'], resolve),
        },
        // 航班列表管理  FlightListManagement
        {
          path: "FlightListManagement",
          name: "FlightListManagement",
          component: resolve => require(['@/components/BusinessManagement/FlightManagement/FlightListManagement'], resolve),
        },

        // 业务监控===============================================================
        //全国监控-------------------------
        //全国航班实时监控
        {
          path: "NationalHBSSJK",
          name: "NationalHBSSJK",
          component: resolve => require(['@/components/BusinessMonitor/National/NationalHBSSJK'], resolve),

        },
        //航班时刻表
        {
          path: "NationalHBSKB",
          name: "NationalHBSKB",
          component: resolve => require(['@/components/BusinessMonitor/National/NationalHBSKB'], resolve),

        },
        //航班实时监控
        {
          path: "HBSSJK",
          name: "HBSSJK",
          component: resolve => require(['@/components/BusinessMonitor/National/HBSSJK'], resolve),

        },
        //人员实时监控
        {
          path: "RYSSJK",
          name: "RYSSJK",
          component: resolve => require(['@/components/BusinessMonitor/National/RYSSJK'], resolve),

        },
        // 口岸监控--------------------------
        // 口岸流量预测
        {
          path: "PredictKALL",
          name: "PredictKALL",
          component: resolve => require(['@/components/BusinessMonitor/Port/PredictKALL'], resolve),

        },
        // 航班监控--------------------------
        // PNR报送状况监控
        {
          path: "MonitorPNRBS",
          name: "MonitorPNRBS",
          component: resolve => require(['@/components/BusinessMonitor/Flight/MonitorPNRBS'], resolve),

        },
        // 非法载运监控
        {
          path: "MonitorFFZY",
          name: "MonitorFFZY",
          component: resolve => require(['@/components/BusinessMonitor/Flight/MonitorFFZY'], resolve),

        },
        // 非法报送监控
        {
          path: "MonitorFFBS",
          name: "MonitorFFBS",
          component: resolve => require(['@/components/BusinessMonitor/Flight/MonitorFFBS'], resolve),

        },
        // 报警监控----------------------------------
        // 报警情况监控
        {
          path: "MonitorBJQK",
          name: "MonitorBJQK",
          component: resolve => require(['@/components/BusinessMonitor/Alarm/MonitorBJQK'], resolve),

        },

        //系统管理=================================================================================================
        //机构管理-----------------------------------------------------------------------------------
        //部门管理
        {
          path: "ManageBM",
          name: "ManageBM",
          component: resolve => require(['@/components/SystemManage/Institutional/ManageBM'], resolve),

        },
        //用户管理
        {
          path: "ManageYH",
          name: "ManageYH",
          component: resolve => require(['@/components/SystemManage/Institutional/ManageYH'], resolve),

        },
        //角色管理
        {
          path: "ManageJS",
          name: "ManageJS",
          component: resolve => require(['@/components/SystemManage/Institutional/ManageJS'], resolve),

        },
        //配置管理--------------------------------------------------------------------------------
        //配置管理
        {
          path: "ConfigurationManagement",
          name: "ConfigurationManagement",
          component: resolve => require(['@/components/SystemManage/Configuration/ConfigurationManagement'], resolve),

        },
        //口岸配置管理
        {
          path: "ConfigurationKA",
          name: "ConfigurationKA",
          component: resolve => require(['@/components/SystemManage/Configuration/ConfigurationKA'], resolve),
        },
        //配置管理
        {
          path: "ConfigurationHFKJ",
          name: "ConfigurationHFKJ",
          component: resolve => require(['@/components/SystemManage/Configuration/ConfigurationHFKJ'], resolve),
        },
        //权限管理--------------------------------------------------------------------------------
        //用户管理
        {
          path: "ManageJZYH",
          name: "ManageJZYH",
          component: resolve => require(['@/components/SystemManage/Permission/ManageJZYH'], resolve),

        },
        //用户认证与登录
        {
          path: "ManageDL",
          name: "ManageDL",
          component: resolve => require(['@/components/SystemManage/Permission/ManageDL'], resolve),

        },
        // 监控参数配置 MPC---------------------------------------------------------------------
        // 系统监控参数配置 ParameterConfiguration
        {
          path: "ParameterConfiguration",
          name: "ParameterConfiguration",
          component: resolve => require(['@/components/SystemManage/MPC/ParameterConfiguration'], resolve),

        },
        //系统监控==================================================================================================
        //运行状态监控--------------------------------------------------------------------
        //服务器监控
        {
          path: "MonitorFWQ",
          name: "MonitorFWQ",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorFWQ'], resolve),

        },
        //Logstash监控
        {
          path: "MonitorLS",
          name: "MonitorLS",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorLS'], resolve),

        },
        //mongodb监控
        {
          path: "MonitorDB",
          name: "MonitorDB",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorDB'], resolve),

        },
        //elasticsearch监控
        {
          path: "MonitorES",
          name: "MonitorES",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorES'], resolve),
        },
        //数据库监控
        {
          path: "MonitorSJK",
          name: "MonitorSJK",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorSJK'], resolve),

        },
        //应用程序监控
        {
          path: "MonitorYYCX",
          name: "MonitorYYCX",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorYYCX'], resolve),

        },
        //接口服务监控
        {
          path: "MonitorJKFW",
          name: "MonitorJKFW",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorJKFW'], resolve),

        },
        //Redis监控
        {
          path: "MonitorRedis",
          name: "MonitorRedis",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorRedis'], resolve),

        },

        //MQ监控
        {
          path: "MonitorMQ",
          name: "MonitorMQ",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorMQ'], resolve),

        },
        //边界交换平台监控
        {
          path: "MonitorBJJHPT",
          name: "MonitorBJJHPT",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorBJJHPT'], resolve),

        },
        //口岸状态监控
        {
          path: "MonitorKAJK",
          name: "MonitorKAJK",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorKAJK'], resolve),

        },
        //数据监控--------------------------------------------------------------------------------------
        //数据一致性监控
        {
          path: "MonitorSJYZX",
          name: "MonitorSJYZX",
          component: resolve => require(['@/components/SystemMonitor/Data/MonitorSJYZX'], resolve),

        },
        //技术网关监控
        {
          path: "MonitorJSWG",
          name: "MonitorJSWG",
          component: resolve => require(['@/components/SystemMonitor/Data/MonitorJSWG'], resolve),

        },
        //整合分发监控
        {
          path: "MonitorZHFF",
          name: "MonitorZHFF",
          component: resolve => require(['@/components/SystemMonitor/Data/MonitorZHFF'], resolve),

        },
        //数据定位
        {
          path: "MonitorSJDW",
          name: "MonitorSJDW",
          component: resolve => require(['@/components/SystemMonitor/Data/MonitorSJDW'], resolve),

        },
        //日志监控-------------------------------------------------------------------------------------
        //日志监控
        {
          path: "MonitorRZJK",
          name: "MonitorRZJK",
          component: resolve => require(['@/components/SystemMonitor/Log/MonitorRZJK'], resolve),

        },
        //风评监控
        {
          path: "MonitorFPRZ",
          name: "MonitorFPRZ",
          component: resolve => require(['@/components/SystemMonitor/Log/MonitorFPRZ'], resolve),

        },
        //性能监控------------------------------------------------------------------------------------
        //校验比对性能监控
        {
          path: "MonitorJYBDXN",
          name: "MonitorJYBDXN",
          component: resolve => require(['@/components/SystemMonitor/Performance/MonitorJYBDXN'], resolve),

        },
        //整合分发性能监控
        {
          path: "MonitorZHFFXN",
          name: "MonitorZHFFXN",
          component: resolve => require(['@/components/SystemMonitor/Performance/MonitorZHFFXN'], resolve),

        },
        //口岸分发性能监控
        {
          path: "MonitorKAFF",
          name: "MonitorKAFF",
          component: resolve => require(['@/components/SystemMonitor/Performance/MonitorKAFF'], resolve),

        },
        //监控报警
        {
          path: "MonitorJKBJ",
          name: "MonitorJKBJ",
          component: resolve => require(['@/components/SystemMonitor/MonitorAlarm/MonitorJKBJ'], resolve),

        },
        //菜单设置
        {
          path: "Menu",
          name: "Menu",
          component: resolve => require(['@/components/SysMenu/Menu'], resolve),
        },

        //个人中心
        {
          path: "ManageCenter",
          name: "ManageCenter",
          component: resolve => require(['@/components/SysMenu/ManageCenter'], resolve),
        },

        //修改密码
        {
          path: "UpdatePass",
          name: "UpdatePass",
          component: resolve => require(['@/components/SysMenu/UpdatePass'], resolve),
        },
        // 日常工作================================================================================================
        // 值班管理 DutyManagement----------------------------------------------------------------------------
        // 值班登记 DutyRegistration
        {
          path: "DutyRegistration",
          name: "DutyRegistration",
          component: resolve => require(['@/components/Routine/DutyManagement/DutyRegistration'], resolve),
        },
        // 值班统计 DutyStatistics
        {
          path: "DutyStatistics",
          name: "DutyStatistics",
          component: resolve => require(['@/components/Routine/DutyManagement/DutyStatistics'], resolve),
        },
        // 事件管理 EventManagement---------------------------------------------------------------------------
        // 事件登记 EventRegistration
        {
          path: "EventRegistration",
          name: "EventRegistration",
          component: resolve => require(['@/components/Routine/EventManagement/EventRegistration'], resolve),
        },
        // 事件查询 EventStatistics
        {
          path: "EventStatistics",
          name: "EventStatistics",
          component: resolve => require(['@/components/Routine/EventManagement/EventStatistics'], resolve),
        },
        // 工作提示 WorkHints-------------------------------------------------------------------------------------
        // 提示方式 Hint
        {
          path: "Hint",
          name: "Hint",
          component: resolve => require(['@/components/Routine/WorkHints/Hint'], resolve),
        },
        // 提示管理 PromptManagement
        {
          path: "PromptManagement",
          name: "PromptManagement",
          component: resolve => require(['@/components/Routine/WorkHints/PromptManagement'], resolve),
        },
        // 工作助手 WorkAssistant---------------------------------------------------------------------------------
        // 工作助手 WorkAssistant
        {
          path: "WorkAssistant",
          name: "WorkAssistant",
          component: resolve => require(['@/components/Routine/WorkAssistant/WorkAssistant'], resolve),
        },
  //风险评估 RiskAssessment==========================================================================
        // 风险事件 ---------------------------------------------------------------------------------
        // 风险报警事件
        {
          path: "EventBJSJ",
          name: "EventBJSJ",
          component: resolve => require(['@/components/RiskAssessment/RiskEvent/EventBJSJ'], resolve),
          children:[

          ]
        },
        // 已归档风险报警事件
        {
          path: "EventBJSJYGD",
          name: "EventBJSJYGD",
          component: resolve => require(['@/components/RiskAssessment/RiskEvent/EventBJSJYGD'], resolve),
        },
        // 人员指标查询
        {
          path: "RYZBCX",
          name: "RYZBCX",
          component: resolve => require(['@/components/RiskAssessment/RiskEvent/RYZBCX'], resolve),
        },
        // 风险报警事件查看
        {
          path: "BJSJCK",
          name: "BJSJCK",
          component: resolve => require(['@/components/RiskAssessment/RiskEvent/BJSJCK'], resolve),
        },
        // 电子档案查询
        {
          path: "FileDZDA",
          name: "FileDZDA",
          component: resolve => require(['@/components/RiskAssessment/RiskEvent/FileDZDACX'], resolve),
        },
        // 批量导出
        {
          path: "PLDC",
          name: "PLDC",
          component: resolve => require(['@/components/RiskAssessment/RiskEvent/PLDC'], resolve),
        },
        // 电子档案
        {
          path: "DZDA",
          name: "DZDA",
          component: resolve => require(['@/components/RiskAssessment/RiskEvent/DZDA'], resolve),
        },
        // 风险报警事件查询
        {
          path: "BJCLCX",
          name: "BJCLCX",
          component: resolve => require(['@/components/RiskAssessment/RiskEvent/BJCLCX'], resolve),
        },
        //模型管理
        {
          path: "ModelManagement",
          name: "ModelManagement",
          component: resolve => require(['@/components/RiskAssessment/Management/ModelManagement'], resolve),
        },
        //名单管理
        {
          path: "RosterManagement",
          name: "RosterManagement",
          component: resolve => require(['@/components/RiskAssessment/Management/RosterManagement'], resolve),
        },
        //名单类型管理
        {
          path: "RosterTypeManagement",
          name: "RosterTypeManagement",
          component: resolve => require(['@/components/RiskAssessment/Management/RosterTypeManagement'], resolve),
        },
        //策略管理
        {
          path: "TacticsManagement",
          name: "TacticsManagement",
          component: resolve => require(['@/components/RiskAssessment/Management/TacticsManagement'], resolve),
        },
        //指标管理
        {
          path: "KPIManagement",
          name: "KPIManagement",
          component: resolve => require(['@/components/RiskAssessment/Management/KPIManagement'], resolve),
        },
        //需求申请
        {
          path: "NeedApply",
          name: "NeedApply",
          component: resolve => require(['@/components/RiskAssessment/Management/Demand/NeedApply'], resolve),
        },
        //需求审核
        {
          path: "NeedReview",
          name: "NeedReview",
          component: resolve => require(['@/components/RiskAssessment/Management/Demand/NeedReview'], resolve),
        },

        //人员标签管理
        {
          path: "LabelManagement",
          name: "LabelManagement",
          component: resolve => require(['@/components/RiskAssessment/Management/LabelManagement'], resolve),
        },
        //模型测试管理
        {
          path: "TestManagement",
          name: "TestManagement",
          component: resolve => require(['@/components/RiskAssessment/Management/TestManagement'], resolve),
        },
        //模型审批管理
        {
          path: "AuditManagement",
          name: "AuditManagement",
          component: resolve => require(['@/components/RiskAssessment/Management/AuditManagement'], resolve),
        },
        //名单字典项管理
        {
          path: "DictionaryManagement",
          name: "DictionaryManagement",
          component: resolve => require(['@/components/RiskAssessment/Management/DictionaryManagement'], resolve),
        },

        //交流讨论管理
        //排行榜
        {
          path: "Ranklist",
          name: "Ranklist",
          component: resolve => require(['@/components/RiskAssessment/Management/Forum/Ranklist'], resolve),
        },
        //讨论区
        {
          path: "Discussion",
          name: "Discussion",
          component: resolve => require(['@/components/RiskAssessment/Management/Forum/Discussion'], resolve),
        },
        //发起帖子
        {
          path: "Sponsor",
          name: "Sponsor",
          component: resolve => require(['@/components/RiskAssessment/Management/Forum/Sponsor'], resolve),
        },
        //阅读帖子
        {
          path: "ReadTopics",
          name: "ReadTopics",
          component: resolve => require(['@/components/RiskAssessment/Management/Forum/ReadTopics'], resolve),
        },

        //事件监控 EventMonitoring
        {
          path: "EventMonitoring",
          name: "EventMonitoring",
          component: resolve => require(['@/components/RiskAssessment/TimeManagement/EventMonitoring'], resolve),
        },
        //模型使用情况 ModelUse
        {
          path: "ModelUse",
          name: "ModelUse",
          component: resolve => require(['@/components/RiskAssessment/StatisticalAnalysis/ModelUse'], resolve),
        },
        //定制化首页 HomePage
        {
          path: "HomePage",
          name: "HomePage",
          component: resolve => require(['@/components/RiskAssessment/StatisticalAnalysis/HomePage'], resolve),
        },
      ]
    }
  ]
})
