export const env = (() => {
  if (/cpsdb61.com/.test(window.location.hostname)) {
    return 'test';
  } else if (/cpsdb.com/.test(window.location.hostname)) {
    return 'online';
  }
  return 'local';
})();

export const ENTERPRISE_BASE_URL = {
  test: '//ep.cpsdb61.com/',
  online: '//ep.cpsdb.com/',
  local: location.hostname,
}[env];

export const BASE_URL = {
  test: '//base.cpsdb61.com/',
  online: '//base.cpsdb.com/',
  local: location.hostname,
}[env];

export const EXAM_BASE_URL = {
  test: '//exam.cpsdb61.com/',
  online: '//exam.cpsdb.com/',
  local: location.hostname,
}[env];

export const DECLARE_BASE_URL = {
  test: '//dec.cpsdb61.com/',
  online: '//dec.cpsdb.com/',
  local: location.hostname,
}[env];

export const IMAGE_SERVER_URL = {
  test: '//pic.cpsdb61.com/',
  online: '//pic.cpsdb.com/',
  local: location.hostname,
}[env];

export const VIDEO_SERVER_URL = {
  test: '//video.cpsdb61.com/',
  online: '//video.cpsdb.com/',
  local: '//video.cpsdb61.com/',
}[env];

export const DOMAIN = {
  test: 'cpsdb61.com',
  online: 'cpsdb.com',
  local: location.hostname,
}[env];

export const GOODS_BASE_URL = {
  test: '//g.cpsdb61.com/',
  online: '//g.cpsdb.com/',
  local: location.hostname,
}[env];

export const FANS_BASE_URL = {
  test: '//fans.cpsdb61.com/',
  online: '//fans.cpsdb.com/',
  local: location.hostname,
}[env];

export const EXCEL_SERVER_URL = {
  test: '//adm.cpsdb61.com/',
  online: '//adm.cpsdb.com/',
  local: location.hostname,
}[env];

// api
// 获取二维码 + id
export const DECLARE_QCODE = `${DECLARE_BASE_URL}publics/qcode.jpg`;
export const DECLARE_QCODE2 = `${DECLARE_BASE_URL}platform/authofficer/download/qrcode.jpg?id=`;
// 总后台登录接口地址
export const PLATFORM_LOGIN_DO_ADDRESS = `${BASE_URL}publics/user/login`;
// 获取图片验证码
export const CHECKNUMBER = `${BASE_URL}publics/checknumber.jpg?t=`;
// 粉丝接口地址
export const FANS_ADDRESS = `${FANS_BASE_URL}platform/statistical/linechart`;
// 关注人数接口地址
export const FANS_NUMBER_ADDRESS = `${FANS_BASE_URL}platform/statistical/fansnumber`;
// 二维码接口地址
export const QR_CODE_ADDRESS = `${GOODS_BASE_URL}platform/statistical/code/everyday`;
// 二维码汇总统计接口地址
export const QR_CODE_SUMMARY_ADDRESS = `${GOODS_BASE_URL}platform/statistical/code/summary`;
// 商品接口地址
export const GOODS_ADDRESS = `${GOODS_BASE_URL}platform/statistical/sku/everyday`;
// 企业接口地址
export const ENTERPRISE_ADDRESS = `${ENTERPRISE_BASE_URL}platform/statistical/enterprise/everyday`;
// 工厂接口地址
export const FACTORY_ADDRESS = `${ENTERPRISE_BASE_URL}platform/statistical/factory/everyday`;
// 实时状态接口地址
export const STATUS_ADDRESS = `${ENTERPRISE_BASE_URL}platform/statistical/query/count`;
// 二维码汇总统计
export const SUMMARY_ADDRESS = `${GOODS_BASE_URL}platform/statistical/code/summary`;
// 分类
export const CATEGORY_TREE = `${GOODS_BASE_URL}platform/category/tree`;
// 添加分类
export const CATEGORY_TREE_ADD = `${GOODS_BASE_URL}platform/category/add`;
// 更新分类
export const CATEGORY_TREE_UPDATE = `${GOODS_BASE_URL}platform/category/update`;
// 查询分类列表
export const CATEGORY_TREE_QUERY = `${GOODS_BASE_URL}platform/category/query`;
// 查询分类总数
export const CATEGORY_TREE_QUERY_COUNT = `${GOODS_BASE_URL}platform/category/query/count`;
// 菜单
export const MENU_MINE = `${BASE_URL}platform/system/menu/mine`;
// 我的申请记录列表、分页信息
export const SUBSIDIES_ADDRESS = `${ENTERPRISE_BASE_URL}organiz/subsidy/record/query`;
// 补贴审核中的补贴金额统计数据
export const THE_TOTAL_ADDRESS = `${ENTERPRISE_BASE_URL}platform/subsidy/statistical/amount`;
// 点击申请提现
export const APPLY_WITHDRAWALS_ADDRESS = `${ENTERPRISE_BASE_URL}organiz/subsidy/withdraw`;
// 下拉获取银行列表
export const BANK_ADDRESS = `${ENTERPRISE_BASE_URL}publics/bank/list`;
// 申报机构详细
export const PLATFORM_ORGANIZ = `${DECLARE_BASE_URL}platform/organiz`;
// 申报官详细
export const PLATFORM_DECLARER = `${DECLARE_BASE_URL}platform/declarer`;
// 申报企业详细
export const PLATFORM_DECLARE_ENTERPRISE = `${DECLARE_BASE_URL}platform/declare/enterprise`;
// 动态条件查询下的考试对象的分页显示列表
export const PLATFORM_GET_EXAMS_LISTING = `${EXAM_BASE_URL}platform/declareexamination/exams/listing`;
// 动态条件查询下的考试对象总数
export const PLATFORM_GET_EXAMS_COUNTS = `${EXAM_BASE_URL}platform/declareexamination/exams/counts`;
// 该试卷的考生分页显示列表 + {id}
export const PLATFORM_POST_EXAMS_EXAMINEE_LISTING = `${EXAM_BASE_URL}platform/declareexamination/examinee/listing/`;
// 该试卷的考生分页显示列表总数 + {id}
export const PLATFORM_POST_EXAMS_EXAMINEE_COUNTS = `${EXAM_BASE_URL}platform/declareexamination/examinee/counts/`;
// 开启考卷 + {id}
export const PLATFORM_POST_EXAMS_EXAMINEE_ENTRANCE = `${EXAM_BASE_URL}platform/declareexamination/entrance/`;
// 复制考卷 + {id}
export const PLATFORM_POST_EXAMS_EXAMINEE_COPYING = `${EXAM_BASE_URL}platform/declareexamination/copying/`;
// 删除或者关闭考试 + {id}
export const PLATFORM_POST_EXAMS_EXAMINEE_CLOSEORDELETE = `${EXAM_BASE_URL}platform/declareexamination/closeOrDelete/`;
// qrcode 发送考试+ {id}
export const PLATFORM_POST_EXAMS_EXAMINEE_PUBLICATIONIMAGE = `${EXAM_BASE_URL}platform/declareexamination/publicationimage/`;
// url 发送考试
export const PLATFORM_POST_EXAMS_EXAMINEE_PUBLICATIONURL = `${EXAM_BASE_URL}platform/declareexamination/publicationurl/`;
// 设置时长
export const PLATFORM_POST_EXAMS_EXAMINEE_TIMESETTING = `${EXAM_BASE_URL}platform/declareexamination/timesetting`;
// 考试对象
export const PLATFORM_POST_EXAMS_EXAMINEE_OBJECTSETTING = `${EXAM_BASE_URL}platform/declareexamination/objectsetting`;
// 下载试卷
export const PLATFORM_POST_EXAMS_EXAMINEE_DOWNLOADEXCEL = `${EXAM_BASE_URL}platform/declareexamination/downloadexcel/`;
// 下载qrcode
export const PLATFORM_POST_EXAMS_EXAMINEE_DOWNLOADQRCODE = `${EXAM_BASE_URL}/platform/declareexamination/downloadqrcode/`;
// 考试的创建添加
export const PLATFORM_POST_EXAMS_CREATION = `${EXAM_BASE_URL}platform/declareexamination/creation`;
// 试卷的考题添加和编辑 + {id}
export const PLATFORM_POST_EXAMS_ADDITIONORUPDATING = `${EXAM_BASE_URL}platform/declareexamination/additionOrUpdating/`;
// 获取待编辑考试题目 + {id}
export const PLATFORM_POST_EXAMS_EDITION = `${EXAM_BASE_URL}platform/declareexamination/edition/`;
// 更改密码
export const UPDATE_PASSWORD = `${BASE_URL}platform/system/user/password`;
// 批量导入分类
export const CATEGORY_UPLOAD = `${GOODS_BASE_URL}platform/category/upload`;
// 查询分类列表
export const PLATFORM_BARCODE_QUERY = `${GOODS_BASE_URL}platform/barcode/query`;
// 查询分类总数
export const PLATFORM_BARCODE_QUERY_COUNT = `${GOODS_BASE_URL}platform/barcode/query/count`;
// 批量导入条码
export const BARCODE_UPLOAD = `${GOODS_BASE_URL}platform/barcode/upload`;
// 查询属性列表
export const PLATFORM_ATTRIBUTE_QUERY = `${GOODS_BASE_URL}platform/attribute/query`;
// 查询属性列表总数
export const PLATFORM_ATTRIBUTE_QUERY_COUNT = `${GOODS_BASE_URL}platform/attribute/query/count`;
// 新增销售属性
export const PLATFORM_ATTRIBUTE_ADD = `${GOODS_BASE_URL}platform/attribute/add`;
// 修改销售属性
export const PLATFORM_ATTRIBUTE_UPDATE = `${GOODS_BASE_URL}platform/attribute/update`;
// 批量导入销售属性
export const PLATFORM_ATTRIBUTE_UPLOAD = `${GOODS_BASE_URL}platform/attribute/upload`;
// 查看属性值
export const PLATFORM_ATTRIBUTE_VALUE_QUERY = `${GOODS_BASE_URL}platform/attribute/value/query`;
// 查看属性值总数
export const PLATFORM_ATTRIBUTE_VALUE_QUERY_COUNT = `${GOODS_BASE_URL}platform/attribute/value/query/count`;
// 新增销售属性值
export const PLATFORM_ATTRIBUTE_VALUE_QUERY_ADD = `${GOODS_BASE_URL}platform/attribute/value/add`;
// 更新销售属性值
export const PLATFORM_ATTRIBUTE_VALUE_QUERY_UPDATE = `${GOODS_BASE_URL}platform/attribute/value/update`;
// 分页查商品列表
export const PLATFORM_GOODS_QUERY = `${GOODS_BASE_URL}platform/goods/query`;
// 获取商品列表总数
export const PLATFORM_GOODS_QUERY_COUNT = `${GOODS_BASE_URL}platform/goods/query/count`;
// 获取/设置商品规则 + {goodsId}
export const PLATFORM_GOODS_RULES = `${GOODS_BASE_URL}platform/goods/rules/`;
// 分页查询模块列表
export const PLATFORM_MODULE_QUERY = `${GOODS_BASE_URL}platform/module/query`;
// 查询模块总数
export const PLATFORM_MODULE_QUERY_COUNT = `${GOODS_BASE_URL}platform/module/query/count`;
// 新增/修改模块
export const PLATFORM_MODULE_QUERY_UPDATE = `${GOODS_BASE_URL}platform/module/update`;
// 分页查询模板列表
export const PLATFORM_TEMPLATE_QUERY = `${GOODS_BASE_URL}platform/template/query`;
// 查询模板总数
export const PLATFORM_TEMPLATE_QUERY_COUNT = `${GOODS_BASE_URL}platform/template/query/count`;
// 新增/修改模板
export const PLATFORM_TEMPLATE_QUERY_UPDATE = `${GOODS_BASE_URL}platform/template/update`;
// 获取地区树
export const DECLARE_GET_AREA_TREE = `${BASE_URL}publics/area/tree`;
// 企业管理_初审列表、待采集列表、复审列表（分页）
export const PLATFORM_EP_QUERY = `${ENTERPRISE_BASE_URL}platform/ep/query`;
// 企业管理_初审列表、待采集列表、复审列表（分页） 总数
export const PLATFORM_EP_QUERY_COUNT = `${ENTERPRISE_BASE_URL}platform/ep/query/count`;
// 企业管理_初审列表详情（分页）
export const PLATFORM_EP_GET = `${ENTERPRISE_BASE_URL}platform/ep/get`;
// 企业管理_初审列表详情（通过）
export const PLATFORM_EP_CONFIRM = `${ENTERPRISE_BASE_URL}platform/ep/confirm`;
// 企业管理_初审列表详情（不通过）
export const PLATFORM_EP_REJECT = `${ENTERPRISE_BASE_URL}platform/ep/reject`;
// 企业管理_待采集列表详情（分页）
export const PLATFORM_EP_GET2 = `${ENTERPRISE_BASE_URL}platform/ep/get2`;
// 企业管理_待采集列表详情（指派认证官）
export const PLATFORM_EP_AUTHOFFICER = `${ENTERPRISE_BASE_URL}platform/ep/authofficer`;
// 企业管理_待采集列表详情（不通过）
export const PLATFORM_EP_REJECT2 = `${ENTERPRISE_BASE_URL}platform/ep/reject2`;
// 企业管理、已入库企业列表（分页）
export const PLATFORM_EP_QUERY_PASSED = `${ENTERPRISE_BASE_URL}platform/ep/query/passed`;
// 企业管理、已入库企业列表（分页） 总数
export const PLATFORM_EP_QUERY_PASSED_COUNT = `${ENTERPRISE_BASE_URL}platform/ep/query/passed/count`;
// 企业管理、已入库企业列表获取二维码
export const PLATFORM_FREECODE_GET = `${GOODS_BASE_URL}platform/freecode/get`;
// 企业管理、已入库企业列表获修改二维码
export const PLATFORM_FREECODE_SET = `${GOODS_BASE_URL}platform/freecode/set`;
// 企业管理、工厂中心列表（分页）
export const PLATFORM_FACTORY_QUERY = `${ENTERPRISE_BASE_URL}platform/factory/query`;
// 企业管理、工厂中心列表（分页） 总数
export const PLATFORM_FACTORY_QUERY_COUNT = `${ENTERPRISE_BASE_URL}platform/factory/query/count`;
// 企业管理、工厂审核通过（通过）
export const PLATFORM_FACTORY_CONFIRM = `${ENTERPRISE_BASE_URL}platform/factory/confirm`;
// 企业管理、工厂审核通过（不通过）
export const PLATFORM_FACTORY_REJECT = `${ENTERPRISE_BASE_URL}platform/factory/reject`;
// 企业管理、工厂详情
export const PLATFORM_FACTORY_GET = `${ENTERPRISE_BASE_URL}platform/factory/get`;
// 企业管理、工厂详情列表 （分页）
export const PLATFORM_CODE_EMPLOYEE_OPERATION = `${GOODS_BASE_URL}platform/code/employee/operation`;
// 企业管理、工厂详情列表 （总数）
export const PLATFORM_CODE_EMPLOYEE_OPERATION_COUNT = `${GOODS_BASE_URL}platform/code/employee/operation/count`;
// 企业管理、经销商列表（分页）
export const PLATFORM_FRANCHISER_QUERY = `${ENTERPRISE_BASE_URL}platform/franchiser/query`;
// 企业管理、经销商列表（分页） 总数
export const PLATFORM_FRANCHISER_QUERY_COUNT = `${ENTERPRISE_BASE_URL}platform/franchiser/query/count`;
// 企业管理、经销商列表扫码情况（分页）
export const PLATFORM_CODE_FRANCHISER_SCAN_QUERY = `${GOODS_BASE_URL}platform/code/franchiser/scan/query`;
// 企业管理、经销商列表扫码情况（分页） 总数
export const PLATFORM_CODE_FRANCHISER_SCAN_QUERY_COUNT = `${GOODS_BASE_URL}platform/code/franchiser/scan/query/count`;
// 企业管理、经销详情
export const PLATFORM_FRANCHISER_GET = `${ENTERPRISE_BASE_URL}platform/franchiser/get`;
// 企业管理、员工列表（分页）
export const PLATFORM_EMPLOYEE_QUERY = `${ENTERPRISE_BASE_URL}platform/employee/query`;
// 企业管理、员工列表（分页） 总数
export const PLATFORM_EMPLOYEE_QUERY_COUNT = `${ENTERPRISE_BASE_URL}platform/employee/query/count`;
// 二维码管理、二维码列表（分页）
export const PLATFORM_STATISTICAL_CODE_QUERY = `${GOODS_BASE_URL}platform/statistical/code/query`;
// 二维码管理、二维码列表（分页） 总数
export const PLATFORM_STATISTICAL_CODE_QUERY_COUNT = `${GOODS_BASE_URL}platform/statistical/code/query/count`;
// 二维码管理、二维码扫描明细
export const PLATFORM_CODE_GET_LOGS = `${GOODS_BASE_URL}platform/code/get/logs`;
// 二维码管理、二维码扫描异常
export const PLATFORM_CODE_GET_LOG = `${GOODS_BASE_URL}platform/code/get/log`;
// 二维码管理、获取赋码工厂名称
export const PLATFORM_FACTORY_USABLE = `${ENTERPRISE_BASE_URL}platform/factory/usable`;
// 认证官管理、认证官列表（分页）
export const PLATFORM_AUTHOFFICER_QUERY = `${DECLARE_BASE_URL}platform/authofficer/query`;
// 认证官管理、认证官列表（分页） 总数
export const PLATFORM_AUTHOFFICER_QUERY_COUNT = `${DECLARE_BASE_URL}platform/authofficer/query/count`;
// 认证官管理、认证官详情
export const PLATFORM_AUTHOFFICER_GET = `${DECLARE_BASE_URL}platform/authofficer/get`;
// 认证官管理、认证官详情编辑上传接口
export const PLATFORM_AUTHOFFICER_UPDATE = `${DECLARE_BASE_URL}platform/authofficer/update`;
// 系统消息、投诉列表（分页）
export const PLATFORM_COMPLAINT_LISTING = `${FANS_BASE_URL}platform/complaint/listing`;
// 系统消息、投诉列表（分页）总数
export const PLATFORM_COMPLAINT_COUNT = `${FANS_BASE_URL}platform/complaint/count`;
// 我的补贴金额
export const ORGANIZ_SUBSIDY_AMOUNT = `${ENTERPRISE_BASE_URL}organiz/subsidy/amount`;
// 申报官、申报机构补贴明细
export const ORGANIZ_SUBSIDY_DETAIL_QUERY = `${ENTERPRISE_BASE_URL}organiz/subsidy/detail/query`;
// 下拉获取银行列表
export const PUBLICS_BANK_LIST = `${ENTERPRISE_BASE_URL}publics/bank/list`;
// 点击申请提现
export const PLATFORM_SUBSIDY_WITHDRAW = `${ENTERPRISE_BASE_URL}platform/subsidy/withdraw`;
// 企业入库补贴申请提现信息确认
export const PLATFORM_SUBSIDY_WITHDRAW_RUKU = `${ENTERPRISE_BASE_URL}platform/subsidy/withdraw/ruku`;
// 我的申请记录列表、分页信息
export const PLATFORM_SUBSIDY_RECORD_QUERY = `${ENTERPRISE_BASE_URL}platform/subsidy/record/query`;
// 总后台补贴审核列表、分页
export const PLATFORM_SUBSIDY_QUERY = `${ENTERPRISE_BASE_URL}platform/subsidy/query`;
// 总后台补贴审核列表、分页
export const PLATFORM_SUBSIDY_COUNT = `${ENTERPRISE_BASE_URL}platform/subsidy/count`;
// 总后台补贴审核 审核接口(通过审核) + {subsidyId}
export const PLATFORM_SUBSIDY_PASS = `${ENTERPRISE_BASE_URL}platform/subsidy/pass/`;
// 总后台补贴审核 审核接口(不通过审核) + {subsidyId}
export const SUBSIDY_REJECTED = `${ENTERPRISE_BASE_URL}platform/subsidy/rejected/`;
// 总后台补贴审核 审核接口(延后审核) + {subsidyId}
export const PLATFORM_SUBSIDY_DELAYED = `${ENTERPRISE_BASE_URL}platform/subsidy/delayed/`;
// 补贴审核中的补贴金额统计数据
export const PLATFORM_SUBSIDY_STATISTICAL_AMOUNT = `${ENTERPRISE_BASE_URL}platform/subsidy/statistical/amount`;
// 省级、市级我的补贴金额
export const PLATFORM_SUBSIDY_PROVINCE_AMOUNT = `${ENTERPRISE_BASE_URL}platform/subsidy/province/amount`;
// 省级、市级补贴明细
export const PLATFORM_SUBSIDY_PROVINCE_DETAIL_QUERY = `${ENTERPRISE_BASE_URL}platform/subsidy/province/detail/query`;
// 省级、市级补贴明细总数
export const PLATFORM_SUBSIDY_PROVINCE_DETAIL_COUNT = `${ENTERPRISE_BASE_URL}platform/subsidy/province/detail/count`;
// 点击申请提现
export const PLATFORM_SUBSIDY_PROVINCE_WITHDRAW = `${ENTERPRISE_BASE_URL}platform/subsidy/province/withdraw`;
// 我的申请记录列表、分页信息
export const PLATFORM_SUBSIDY_PROVINCE_RECORD_QUERY = `${ENTERPRISE_BASE_URL}platform/subsidy/province/record/query`;
// 我的申请记录列表、分页信息总数
export const PLATFORM_SUBSIDY_PROVINCE_RECORD_COUNT = `${ENTERPRISE_BASE_URL}platform/subsidy/province/record/count`;
// 获取注册验证码 + {type}/{cellphone}
export const DECLARE_GET_VALIDATECODE = `${DECLARE_BASE_URL}publics/validatecode/`;
// 添加公告
export const PLATFORM_NOTICES = `${BASE_URL}platform/notices`;
// 删除公告 + {id:公告id}
export const PLATFORM_DELETE_NOTICES = `${BASE_URL}platform/notices/`;
// 在线修改公告 + {id:公告id}
export const PLATFORM_PUT_NOTICES = `${BASE_URL}platform/notices/`;
// 公告列表
export const PUBLICS_NOTICES_LISTING = `${BASE_URL}publics/notices/listing`;
// 公告列表总数
export const PUBLICS_NOTICES_COUNTS = `${BASE_URL}publics/notices/counts`;
// 系统公告详情 + {id}
export const PUBLICS_NOTICES_DETAILS = `${BASE_URL}publics/notices/details/`;
// 添加系统通告
export const PUBLICS_GET_NOTICES_ADDITIONS = `${DECLARE_BASE_URL}platform/notices/additions`;
// 申报机构基本信息初审
export const PLATFORM_POST_ORGANIZ_BASEWAITAUDIT = `${DECLARE_BASE_URL}platform/organiz/baseWaitAudit/`;
// 申报机构基本信息审核 + {id}
export const PLATFORM_PUT_ORGANIZ_BASEAUDIT = `${DECLARE_BASE_URL}platform/organiz/baseAudit/`;
// 申报机构登记信息初审
export const PLATFORM_POST_ORGANIZ_REGISTWAITAUDIT = `${DECLARE_BASE_URL}platform/organiz/registWaitAudit/`;
// 申报机构登记信息审核 + {id}
export const PLATFORM_PUT_ORGANIZ_REGISTAUDIT = `${DECLARE_BASE_URL}platform/organiz/registAudit/`;
// 申报官审核 + {id}
export const PLATFORM_PUT_DECLARER_AUDIT = `${DECLARE_BASE_URL}platform/declarer/audit/`;
// 申报官审核 + {id}
export const PLATFORM_PUT_DECLARER_WAITAUDIT = `${DECLARE_BASE_URL}platform/declarer/waitAudit/`;
// 申报企业审核
export const PLATFORM_PUT_DECLARER_ENTERPRISE_AUDIT = `${DECLARE_BASE_URL}platform/declare/enterprise/audit/`;
// 申报企业审核
export const PLATFORM_PUT_DECLARER_ENTERPRISE_WAITAUDIT = `${DECLARE_BASE_URL}platform/declare/enterprise/waitAudit/`;
// 查看考生试卷详情
export const PLATFORM_POST_EXAMS_EXAMINEE_DETAILS = `${EXAM_BASE_URL}/platform/declareexamination/details/`;
// 简答题打分
export const PLATFORM_POST_EXAMS_EXAMINEE_SCORES = `${EXAM_BASE_URL}/platform/declareexamination/scores`;
//  添加认证官
export const PUBLICS_AUTHOFFICER_CREATE = `${DECLARE_BASE_URL}publics/authofficer/create`;
// 认证官审核
export const PLATFORM_AUTHOFFICER_CONFIRM = `${DECLARE_BASE_URL}platform/authofficer/confirm`;
// 初审企业更新
export const PLATFORM_EP_PENDING_MODIFY = `${ENTERPRISE_BASE_URL}platform/ep/pending/modify`;
// 复审企业更新
export const PLATFORM_EP_PENDING2_MODIFY = `${ENTERPRISE_BASE_URL}platform/ep/pending2/modify`;
// 下载公函
export const PUBLICS_REGISTER_GET_LETTER_PDF = `${ENTERPRISE_BASE_URL}publics/register/get/letter.pdf`;
