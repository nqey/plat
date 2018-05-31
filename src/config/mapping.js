const ENTERPRISE_PAY_TYPE = {
  wait: '待支付',
  success: '支付成功',
  failed: '支付失败',
};

const ENTERPRISE_EVENT = {
  create: '创建',
  pay: '支付',
  confirm: '通过',
  reject: '不通过',
  authSubmit: '认证官采集完成',
  reject2: '认证官采集未通过',
  pendingModify: '初审修改',
  pending2Modify: '复审修改',
};

const PAY_METHOD = {
  alipayWeb: '支付宝',
  wechatpayQrcode: '微信',
  free: '全额补贴',
};

const ENTERPRISE_TYPE = {
  wait: '待支付',
  pending: '待初审',
  collectting: '待认证官上门采集',
  confirmFailed: '初审未通过',
  reject2: '审核未通过',
  pending2: '待复审',
  confirm2Failed: '复审未通过',
  passed: '通过审核',
};

const ID_TYPE = {
  1: '身份证',
  2: '驾驶证',
  3: '军官证',
};

const CODE_SCAN_EVENT = {
  create: '创建',

  // 工厂事件
  download: '下载',
  packet: '包装',

  // 经销商事件
  receive: '经销商验货',
  sold: '电商发货',
  allocate: '调货',
  exchange: '退换货',

  // 消费者事件
  scanValidate: '扫码验真伪',
};

const CODE_SCAN_APP_USER = {
  zhsapp: '用户',
  franchiserapp: '经销商',
  factoryapp: '工厂员工',
  printer: '喷码机',
  other: '其他',
};

const FRANCHISER_USER_STATE = {
  unusering: '信息未完善',
  wait: '信息待审核',
  failed: '审核未通过',
  usering: '正常',
  lock: '锁定',
};

const FACTORY_TYPE = {
  1: '生产工厂',
  2: '赋码工厂',
};

const FACTORY_STATE = {
  pending: '待审核',
  passed: '已审核',
  // deleted: '已作废',
  failed: '未通过',
};

const FACTORY_EVENT = {
  create: '创建',
  modify: '修改',
  submit: '提交审核',
  delete: '删除',
  confirm: '通过审核',
  reject: '不通过审核',
};

const TEMPLATE_TYPE = {
  goods: '商品模板',
  push: '推送模板',
};

const VALID_PERIOD_TYPE = {
  year: '年',
  month: '个月',
  day: '天',
};

const getShelflife = (value, type) => {
  if (value === -1) {
    return '永久';
  }
  return value + VALID_PERIOD_TYPE[type];
};

const GOODS_STATE = {
  onshelf: '上架',
  deleted: '删除',
  offshelf: '下架',
};

const CODE_TYPE = {
  1: '数据一物一码',
  2: '图像一物一码',
  3: '普通图像',
};

const CODE_DETAIL_STATE = {
  normal: '正常',
  highRisk: '异常',
};

const PLATFORM_USER_TYPE = {
  1: '平台',
  2: '省级服务中心',
  3: '市级服务中心',
  4: '市场部',
};

const CODE_STATE = {
  pending: '待审核',
  wait: '待支付',
  prepared: '可生产',
  generating: '二维码生成中',
  canceled: '已作废',
  abnormal: '异常',
};

export {
  ENTERPRISE_PAY_TYPE,
  ENTERPRISE_EVENT,
  PAY_METHOD,
  ENTERPRISE_TYPE,
  ID_TYPE,
  CODE_SCAN_EVENT,
  CODE_SCAN_APP_USER,
  FRANCHISER_USER_STATE,
  FACTORY_TYPE,
  FACTORY_STATE,
  FACTORY_EVENT,
  TEMPLATE_TYPE,
  VALID_PERIOD_TYPE,
  getShelflife,
  GOODS_STATE,
  CODE_TYPE,
  CODE_DETAIL_STATE,
  PLATFORM_USER_TYPE,
  CODE_STATE,
};
