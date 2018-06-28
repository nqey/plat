class Notifier {
  Notifier() {
    this.listeners = [];
  }

  /**
   * 生产者调用此方法
   * @param type : 消息类型
   * @param messge ： 消息体
   */
  sendMessage(type, messge) {
    this.listeners.forEach((listener) => {
      if (listener.$subscribeType === type) {
        listener.onMessage(messge);
      }
    });
  }

  /**
   * 订阅消息
   * TODO: 所有监听消息者都实现  onMessage(message)
   * @param listener ： 订阅者
   * @param type ： 订阅的消息类型
   */
  subscribe(type, listener) {
    listener.$subscribeType = type;
    if (!listener.onMessage) {
      throw new Error('没有实现onMessage不能订阅消息');
    }
    this.listners.push(listener);
  }

  unsubscribe(other) {
    const index = this.listners.indexOf(other);
    if (index >= 0) {
      this.listners.splice(index, 1);
    }
  }

}

const notifier = new Notifier();

export default { notifier };
