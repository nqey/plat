import rules from '@/config/rules2';

const msgName = 'validator';

const f = {
  newElement(v) {
    const newItem = document.createElement('span');
    newItem.setAttribute('name', msgName);
    const textnode = document.createTextNode(v);
    newItem.appendChild(textnode);
    return newItem;
  },
  insertAfter(newEl, targetEl) {
    const parentEl = targetEl.parentNode;
    if (parentEl.lastChild === targetEl) {
      parentEl.appendChild(newEl);
    } else {
      parentEl.insertBefore(newEl, targetEl.nextSibling);
    }
  },
  removeAfter(targetEl) {
    const parentEl = targetEl.parentNode;
    parentEl.removeChild(targetEl.nextSibling);
  },
  isHaveMessage(el) {
    if (!el) return false;
    const name = el.getAttribute('name');
    return name === msgName;
  },
};

export default (Vue) => {
  // 注册一个全局自定义指令 `v-required`
  Vue.directive(msgName, {
    // 当被绑定的元素插入到 DOM 中时……
    inserted(el, b) {
      const valid = (t) => {
        // 获取验证器
        const va = rules[t];
        // 判断消息是否有显示
        const isHm = f.isHaveMessage(el.nextSibling);
        // 验证内容
        const isVa = va.validator(el, b.value);
        if (!isVa && !isHm) {
          window.console.log(t);
          // 验证未通过且消息未显示时，显示消息
          const message = b.value.message || va.message(b.value);
          const newEl = f.newElement(message);
          f.insertAfter(newEl, el);
          return;
        } else if (isVa && isHm) {
          // 验证通过且消息显示时，不显示消息
          f.removeAfter(el);
        }
      };
      const fun = () => {
        const type = b.value.type || [];
        type.forEach(valid);
      };
      // 离开焦点时验证
      el.addEventListener('blur', fun);
    },
  });
};
