export const env = (() => {
  if (/cpsdb61.com/.test(window.location.hostname)) {
    return 'test';
  } else if (/cpsdb.com/.test(window.location.hostname)) {
    return 'online';
  }
  return 'local';
})();
export const LOCAL_URL = '.test.com';

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

export const DOMAIN = {
  test: 'cpsdb61.com',
  online: 'cpsdb.com',
  local: location.hostname.indexOf(LOCAL_URL) >= 0 ? LOCAL_URL : location.hostname,
}[env];

export const GOODS_BASE_URL = {
  test: '//g.cpsdb61.com/',
  online: '//g.cpsdb.com/',
  local: location.hostname.indexOf(LOCAL_URL) >= 0 ? LOCAL_URL : location.hostname,
}[env];

export const FANS_BASE_URL = {
  test: '//fans.cpsdb61.com/',
  online: '//fans.cpsdb.com/',
  local: location.hostname.indexOf(LOCAL_URL) >= 0 ? LOCAL_URL : location.hostname,
}[env];

export const EXCEL_SERVER_URL = {
  test: '//adm.cpsdb61.com/',
  online: '//adm.cpsdb.com/',
  local: location.hostname,
}[env];

// api
// 申报机构登录接口地址
export const DECLARE_LOGIN_DO_ADDRESS = `${BASE_URL}publics/user/login`;
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
// 申报官列表
export const PLATFORM_GET_DECLARER_QUERY = `${DECLARE_BASE_URL}platform/declarer/query`;
// 申报官列表总数
export const PLATFORM_GET_DECLARER_COUNT = `${DECLARE_BASE_URL}platform/declarer/count`;
// 申报官删除 + {id}
export const PLATFORM_DELETE_DECLARER = `${DECLARE_BASE_URL}platform/declarer/delete/`;
// 申报机构删除 + {id}
export const PLATFORM_DELETE_ORGANIZ = `${DECLARE_BASE_URL}platform/organiz/delete/`;
// 申报机构查询
export const PLATFORM_GET_ORGANIZ_QUERY = `${DECLARE_BASE_URL}platform/organiz/query`;
// 申报机构分页总条数
export const PLATFORM_GET_ORGANIZ_COUNT = `${DECLARE_BASE_URL}platform/organiz/count`;
// 申报官企业列表
export const PLATFORM_GET_DECLARER_ENTERPRISE_QUERY = `${DECLARE_BASE_URL}platform/declare/enterprise/query`;
// 申报官企业列表总数
export const PLATFORM_GET_DECLARER_ENTERPRISE_COUNT = `${DECLARE_BASE_URL}platform/declare/enterprise/count`;
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
// 企业管理、已入库企业列表（分页）
export const PLATFORM_EP_QUERY_PASSED = `${ENTERPRISE_BASE_URL}platform/ep/query/passed`;
// 企业管理、已入库企业列表（分页） 总数
export const PLATFORM_EP_QUERY_PASSED_COUNT = `${ENTERPRISE_BASE_URL}platform/ep/query/passed/count`;
// 企业管理、工厂中心列表（分页）
export const PLATFORM_FACTORY_QUERY = `${ENTERPRISE_BASE_URL}platform/factory/query`;
// 企业管理、工厂中心列表（分页） 总数
export const PLATFORM_FACTORY_QUERY_COUNT = `${ENTERPRISE_BASE_URL}platform/factory/query/count`;
// 企业管理、经销商列表（分页）
export const PLATFORM_FRANCHISER_QUERY = `${ENTERPRISE_BASE_URL}platform/franchiser/query`;
// 企业管理、经销商列表（分页） 总数
export const PLATFORM_FRANCHISER_QUERY_COUNT = `${ENTERPRISE_BASE_URL}platform/franchiser/query/count`;

