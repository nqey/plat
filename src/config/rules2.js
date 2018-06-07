export default {
  required: {
    validator(el) {
      return (el.value || '').trim().length > 0;
    },
    message() {
      return '必须输入！！！';
    },
  },
  maxlen: {
    validator(el, b) {
      const len = el.value.length;
      const valid = +b.length;
      return len <= valid;
    },
    message(b) {
      return `长度不能超过${b.length}个字符`;
    },
  },
};
