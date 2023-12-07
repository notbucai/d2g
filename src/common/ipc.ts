/*
 * @Author: 不才 &lt;1450941858@qq.com&gt; (https://notbucai.com/)
 * @Date: 2023-12-07 19:59:09
 * @Last Modified by: 不才 <1450941858@qq.com> (https://notbucai.com/)
 * @Last Modified time: 2023-12-07 20:00:17
 * @Description: iframe 通信
 */

interface IpcData<T> {
  type: string;
  data?: T;
}

interface OnCallback<T> {
  (data: T): void;
}

class PostMessageIpc {
  private receive: Window;
  private write: Window;

  private listeners: Record<string, OnCallback<any>> = {};

  constructor(r: Window, w: Window) {
    this.receive = r;
    this.write = w;
    this.init();
  }

  private init() {
    this.receive.addEventListener("message", (event) => {
      const message: IpcData<string> = event.data;
      const { type, data } = message;
      let dataObj = {};
      if (data) {
        dataObj = JSON.parse(data);
      }
      const callback = this.listeners[type];
      if (callback) {
        callback(dataObj);
      }
    });
  }

  // 发送消息
  public send(type: string, data: object) {
    this.write.postMessage(
      {
        type,
        data: JSON.stringify(data),
      },
      "*"
    );
  }

  // 接收消息
  public on<T>(type: string, callback: OnCallback<T>) {
    this.listeners[type] = callback;
  }
}
