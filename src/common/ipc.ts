/*
 * @Author: 不才 &lt;1450941858@qq.com&gt; (https://notbucai.com/)
 * @Date: 2023-12-07 19:59:09
 * @Last Modified by: 不才 <1450941858@qq.com> (https://notbucai.com/)
 * @Last Modified time: 2023-12-08 09:48:03
 * @Description: iframe 通信
 */

interface IpcData<T> {
  type: string;
  data?: T;
}

interface OnCallback<T> {
  (data: T): void;
}

export class PostMessageIpc {
  private receive: Window;
  private write: Window;

  private listeners: Record<string, OnCallback<any>> = {};

  private messageCallback?: (event: MessageEvent) => void;

  /**
   * 
   * @param r 监听（读），一般为 window
   * @param w 发送（写），一般为 window.parent 或 iframe window
   */
  constructor(r: Window, w: Window) {
    this.receive = r;
    this.write = w;
    this.init();
  }

  private init() {
    this.messageCallback = (event: MessageEvent) => {
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
    };
    this.receive.addEventListener("message", this.messageCallback);
  }

  public destroy() {
    if (this.messageCallback) {
      this.receive.removeEventListener("message", this.messageCallback);
    }
  }

  // 发送消息
  public send(type: string, data: any) {
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
