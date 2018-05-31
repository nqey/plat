const test = (() => {
  if (/cpsdb61.com/.test(window.location.hostname) || /test.com/.test(window.location.hostname)) {
    return 'test';
  } else if (/cpsdb.com/.test(window.location.hostname)) {
    return 'online';
  }
  return 'local';
})();
const LOCAL_URL = '.test.com';
const ENTERPRISE_BASE_URL = (() => {
  switch (test) {
    case 'test':
      return '//ep.cpsdb61.com/';
    case 'online':
      return '//ep.cpsdb.com/';
    default :
      return location.hostname;
  }
})();
const BASE_URL = (() => {
  switch (test) {
    case 'test':
      return '//base.cpsdb61.com/';
    case 'online':
      return '//base.cpsdb.com/';
    default :
      return location.hostname;
  }
})();
const EXAM_BASE_URL = (() => {
  switch (test) {
    case 'test':
      return '//exam.cpsdb61.com/';
    case 'online':
      return '//exam.cpsdb.com/';
    default :
      return location.hostname;
  }
})();
const DECLARE_BASE_URL = (() => {
  switch (test) {
    case 'test':
      return '//dec.cpsdb61.com/';
    case 'online':
      return '//dec.cpsdb.com/';
    default :
      return location.hostname;
  }
})();
const IMAGE_SERVER_URL = (() => {
  switch (test) {
    case 'test':
      return '//pic.cpsdb61.com/';
    case 'online':
      return '//pic.cpsdb.com/';
    default :
      return location.hostname;
  }
})();
const DOMAIN = (() => {
  switch (test) {
    case 'test':
      return 'cpsdb61.com';
    case 'online':
      return 'cpsdb.com';
    default :
      return location.hostname.indexOf(LOCAL_URL) >= 0 ? LOCAL_URL : location.hostname;
  }
})();
const GOODS_BASE_URL = (() => {
  switch (test) {
    case 'test':
      return '//g.cpsdb61.com/';
    case 'online':
      return '//g.cpsdb.com/';
    default :
      return location.hostname.indexOf(LOCAL_URL) >= 0 ? LOCAL_URL : location.hostname;
  }
})();
const FANS_BASE_URL = (() => {
  switch (test) {
    case 'test':
      return '//fans.cpsdb61.com/';
    case 'online':
      return '//fans.cpsdb.com/';
    default :
      return location.hostname.indexOf(LOCAL_URL) >= 0 ? LOCAL_URL : location.hostname;
  }
})();

// api
// 申报机构登录接口地址
const DECLARE_LOGIN_DO_ADDRESS = `${BASE_URL}publics/user/login`;
// 获取图片验证码
const CHECKNUMBER = `${BASE_URL}publics/checknumber.jpg?t=`;
// 粉丝接口地址
const FANS_ADDRESS = `${FANS_BASE_URL}platform/statistical/linechart`;
// 关注人数接口地址
const FANS_NUMBER_ADDRESS = `${FANS_BASE_URL}platform/statistical/fansnumber`;
// 二维码接口地址
const QR_CODE_ADDRESS = `${GOODS_BASE_URL}platform/statistical/code/everyday`;
// 二维码汇总统计接口地址
const QR_CODE_SUMMARY_ADDRESS = `${GOODS_BASE_URL}platform/statistical/code/summary`;
// 商品接口地址
const GOODS_ADDRESS = `${GOODS_BASE_URL}platform/statistical/sku/everyday`;
// 企业接口地址
const ENTERPRISE_ADDRESS = `${ENTERPRISE_BASE_URL}platform/statistical/enterprise/everyday`;
// 工厂接口地址
const FACTORY_ADDRESS = `${ENTERPRISE_BASE_URL}platform/statistical/factory/everyday`;
// 实时状态接口地址
const STATUS_ADDRESS = `${ENTERPRISE_BASE_URL}platform/statistical/query/count`;
// 二维码汇总统计
const SUMMARY_ADDRESS = `${GOODS_BASE_URL}platform/statistical/code/summary`;
// 分类
const CATEGORY_TREE = `${GOODS_BASE_URL}platform/category/tree`;
// 菜单
const MENU_MINE = `${BASE_URL}platform/system/menu/mine`;
// 我的申请记录列表、分页信息
const SUBSIDIES_ADDRESS = `${ENTERPRISE_BASE_URL}organiz/subsidy/record/query`;
// 补贴审核中的补贴金额统计数据
const THE_TOTAL_ADDRESS = `${ENTERPRISE_BASE_URL}platform/subsidy/statistical/amount`;
// 4.点击申请提现
const APPLY_WITHDRAWALS_ADDRESS = `${ENTERPRISE_BASE_URL}organiz/subsidy/withdraw`;

export {
  LOCAL_URL,
  test,
  ENTERPRISE_BASE_URL,
  BASE_URL,
  EXAM_BASE_URL,
  DECLARE_BASE_URL,
  IMAGE_SERVER_URL,
  DOMAIN,
  DECLARE_LOGIN_DO_ADDRESS,
  CHECKNUMBER,
  FANS_ADDRESS,
  FANS_NUMBER_ADDRESS,
  QR_CODE_ADDRESS,
  QR_CODE_SUMMARY_ADDRESS,
  GOODS_ADDRESS,
  ENTERPRISE_ADDRESS,
  FACTORY_ADDRESS,
  STATUS_ADDRESS,
  SUMMARY_ADDRESS,
  CATEGORY_TREE,
  MENU_MINE,
  SUBSIDIES_ADDRESS,
  THE_TOTAL_ADDRESS,
  APPLY_WITHDRAWALS_ADDRESS,
};
