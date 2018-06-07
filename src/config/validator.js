/**
 * 示例：
  <input type="text" v-qc-validator="validator">
  validator: {
    type: ['required', 'maxlen'], //验证类型
    message: {
      required: 'aaa',//不设置时使用默认消息
      maxlen: 'bbb',  //不设置时使用默认消息
    },
    length: 2, //验证长度
  },
 */
import rules from '@/config/rules2';

const msgName = 'qc-validator';

const elementEvents = {
  newElement(v) {
    const newItem = document.createElement('span');
    newItem.setAttribute('name', msgName);
    newItem.style.color = 'red';
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
  // 删除消息
  removeAfter(targetEl) {
    const isHm = elementEvents.isHaveMessage(targetEl.nextSibling);
    if (!isHm) return;
    const parentEl = targetEl.parentNode;
    parentEl.removeChild(targetEl.nextSibling);
  },
  // 消息是否显示
  isHaveMessage(el) {
    if (!el) return false;
    const name = el.getAttribute('name');
    return name === msgName;
  },
};

export default (Vue) => {
  // 注册一个全局自定义指令 `v-validator`
  Vue.directive(msgName, {
    // 当被绑定的元素插入到 DOM 中时……
    inserted(el, b) {
      const fun = () => {
        // 删除消息
        elementEvents.removeAfter(el);
        const type = b.value.type || [];
        for (let i = 0; i < type.length; i += 1) {
          // 获取验证类型
          const t = type[i];
          // 获取验证器
          const va = rules[t];
          // 开始验证
          const isVa = va.validator(el, b.value);
          if (!isVa) {
            // 验证未通过
            const message = b.value.message[t] || va.message(b.value);
            const newEl = elementEvents.newElement(message);
            // 显示消息
            elementEvents.insertAfter(newEl, el);
            break;
          }
        }
      };
      // 离开焦点时验证
      el.addEventListener('blur', fun);
    },
  });
};
