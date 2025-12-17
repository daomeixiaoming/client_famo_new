import { NetCfg } from "../../../Game/Config/GameConfig";
import { protoGame } from "../../../Proto/game";
import DebugUtils from "../../Utils/DebugUtils";
import EventMgr from "../EventMgr";

const { ccclass, property } = cc._decorator;

export enum State {
    Disconnected = 0, // 断开连接
    Connecting = 1, // 正在连接
    Connected = 2, // 已经连接;
};

export const NetMsg = {
    NetConnecting: "net_connecting", //开始连接
    NetMessage: "net_message", //收到消息
    NetDisconnect: "net_disconnect",//断开连接
    NetConnect: "net_connect", //连接成功
}

@ccclass
export class NetMgr extends cc.Component {
    public static Instance: NetMgr = null as unknown as NetMgr;
    private url: string = "ws://127.0.0.1:6081/ws";

    private sock: WebSocket | null = null;
    public state: number = State.Disconnected;

    pingTimer: number = null;
    pongTimer: number = null;
    pingInterval: number = 1000 * 10;  //间隔3秒向服务器发送心跳
    pongTimeout: number = 1000 * 5;
    reconnectAttempts: number = 0; //重连次数  
    maxReconnectAttempts: number = 5; //最大次数

    public isStart = false;

    onLoad(): void {
        if (NetMgr.Instance === null) {
            NetMgr.Instance = this;
        }
        else {
            this.destroy();
            return;
        }

        this.state = State.Disconnected;
    }

    public Init(url: string): void {
        // DebugUtils.Log("===========NetMgr.Init=========", url);
        this.url = url;

        this.isStart = true;

        if (!this.sock) {
            this.state = State.Disconnected;
            // this.isFirstConnect = true;

            this.connect_to_server();
        }
    }

    protected onDestroy(): void {
        DebugUtils.Log("===========NetMgr.onDestroy=========");
    }

    /**
     * 发送数
     * @param data_arraybuf 
     */
    public send_data(data_arraybuf: any) {
        // DebugUtils.Log("===========NetMgr.send_data=========",data_arraybuf);
        if (this.state === State.Connected && this.sock) {
            this.sock.send(data_arraybuf);
        }
    }

    // 连接服务器
    private connect_to_server(): void {
        DebugUtils.Log("===========NetMgr.connect_to_server=========");
        if (this.state !== State.Disconnected) {
            return;
        }

        // 抛出一个正在重新连接的事件;
        EventMgr.Instance.Emit(NetMsg.NetConnecting, null);

        this.state = State.Connecting;
        this.sock = new WebSocket(this.url);    // H5标准，底层做好了;
        this.sock.binaryType = "arraybuffer";   // blob, 二进制;

        this.sock.onopen = this._on_opened.bind(this);
        this.sock.onmessage = this._on_recv_data.bind(this);
        this.sock.onclose = this._on_socket_close.bind(this);
        this.sock.onerror = this._on_socket_err.bind(this);
    }

    // 收到消息
    private _on_recv_data(event: any) {
        const uint8Array = new Uint8Array(event.data);
        let buf = protoGame.Response.decode(uint8Array);
        // console.error("==========_on_recv_data=============", buf);
        if (buf) {
            let ctype = buf.cmd;
            if (ctype === protoGame.ResponseCode.PONG) { //收到心跳
                this.resetTimeout();
            } else {
                EventMgr.Instance.Emit(NetMsg.NetMessage, event.data);
            }
        }
    }

    //收到心跳回复
    private resetTimeout(): void {
        DebugUtils.Log("========心跳回复==========");
        // 收到 pong，清除超时计时器
        if (this.pongTimer) {
            clearTimeout(this.pongTimer);
            this.pongTimer = null;
        }
    }

    private _on_socket_close(event: any) {
        console.warn("===========NetMgr._on_socket_close=================", this.state);
        this.close_socket();
        // 重连
        // this.handleNetworkIssue();
    }

    private _on_socket_err(event: any) {
        console.warn("===========NetMgr._on_socket_err=================", this.state);
        this.close_socket();
    }

    // 手动关闭连接
    public CloseSocket() {
        console.warn("===========NetMgr.CloseSocket=================", this.state);
        if (this.state === State.Connected) {
            if (this.sock !== null) {
                this.sock.close();
                this.sock = null;
            }
        }

        this.isStart = false;
    }

    //断开连接
    private close_socket() {
        console.warn("===========NetMgr.close_socket=================", this.state);
        if (this.state === State.Connected) {
            if (this.sock !== null) {
                this.sock.close();
                this.sock = null;
            }
        }
        EventMgr.Instance.Emit(NetMsg.NetDisconnect, null);
        this.state = State.Disconnected;
    }

    // 连接成功了
    private _on_opened(event: any) {
        this.state = State.Connected;
        console.warn("connect to server: " + this.url + " sucess!");

        this.reconnectAttempts = 0; // 重置重连尝试次数
        this.startHeartbeat(); //启动心跳

        EventMgr.Instance.Emit(NetMsg.NetConnect, null);
    }

    update(dt: number) {
        if (!this.isStart) {
            return;
        }

        if (this.state !== State.Disconnected) {
            return;
        }
        // console.warn("===========NetMgr.update=================", this.state);
        this.connect_to_server();
    }

    //发送心跳
    private setPingReq() {
        let res = protoGame.Request.create({
            cmd: protoGame.RequestCode.PING
        });
        let buf = protoGame.Request.encode(res).finish();
        DebugUtils.Log("========发送心跳==========");
        this.send_data(buf);
    }

    // 开始心跳
    private startHeartbeat() {
        this.stopHeartbeat(); // 先清除已有计时器
        //发送第一次心跳  
        this.setPingReq();
        //开始计时，间隔一段时间发送心跳
        this.pingTimer = setInterval(() => {
            // DebugUtils.Log("==========startHeartbeat0============", this.sock, this.sock.readyState);
            if (this.sock && this.sock.readyState === WebSocket.OPEN) {
                try {
                    DebugUtils.Log("==========startHeartbeat1============");
                    this.setPingReq();       // 发送 ping。
                    // 定义计时器
                    // this.pongTimer = setTimeout(() => {
                    //     console.warn('Heartbeat timeout, connection may be dead');
                    //     this.handleNetworkIssue();
                    // }, this.pongTimeout) as unknown as number;
                } catch (error) {
                    DebugUtils.Log("==========startHeartbeat2============");
                    // this.handleNetworkIssue();
                }
            }
        }, this.pingInterval);
    }

    private handleNetworkIssue() {
        DebugUtils.Log('Handle network issue');
        // this.isConnected = false;
        this.stopHeartbeat();
        if (this.sock) {
            // 如果状态是CLOSING或CLOSED，就不需要再调用close了
            if (this.sock.readyState === WebSocket.OPEN) {
                this.sock.close(); // 尝试正常关闭，触发onclose
            } else {
                // 如果状态不是OPEN，可能已经断开了，直接模拟onclose或重连
                this.scheduleReconnect();
            }
        } else {
            this.scheduleReconnect();
        }
    }

    // 安排重连
    private scheduleReconnect(): void {
        // 避免重复重连
        if (this.pongTimer) {
            clearTimeout(this.pongTimer);
            this.pongTimer = null;
        }

        // 检查是否超过最大重试次数
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            // 这里可以通知UI，让用户手动重连
            return;
        }

        // 使用指数退避策略，重连间隔逐渐增加
        const delay = Math.pow(2, this.reconnectAttempts) * 1000;
        this.pongTimer = setTimeout(() => {
            DebugUtils.Log(`Attempting to reconnect... (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
            this.reconnectAttempts++;
            this.connect_to_server(); // 重新连接
        }, delay) as unknown as number;
    }


    // 停止心跳
    public stopHeartbeat() {
        if (this.pingTimer) {
            clearInterval(this.pingTimer);
            this.pingTimer = null;
        }
        if (this.pongTimer) {
            clearTimeout(this.pongTimer);
            this.pongTimer = null;
        }
    }
}
