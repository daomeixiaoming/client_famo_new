import { NetCfg } from "../../Game/Config/GameConfig";
import GameLogic from "../../Game/GameLogic";

const { ccclass, property } = cc._decorator;
/**
 * http 工具类
 */
export default class HttpUtils {

    private static SetResponsOpt(xhr: XMLHttpRequest, OnResponse) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                // DebugUtils.Log("http res("+ xhr.responseText.length + "):" + xhr.responseText);
                if ((xhr.status >= 200 && xhr.status < 300)) {
                    let dataRespones = null;
                    if (xhr.responseType === "text" || xhr.responseType === "json") {
                        dataRespones = xhr.responseText;
                    } else {
                        dataRespones = xhr.response;
                    }
                    if (OnResponse !== null) {
                        OnResponse(null, dataRespones);
                    }
                } else {
                    OnResponse(xhr.readyState + ":" + xhr.status, null);
                }
            }
        };

        xhr.onerror = function (err) {
            if (OnResponse) {
                OnResponse(err, null);
            }
        }

        xhr.ontimeout = function () {
            if (OnResponse) {
                OnResponse("Timeout", null);
            }
        }
    }

    /**
     * 
     * @param url 
     * @param params 
     * @param OnResponse 
     */
    public static Get(url: string, params: Object, OnResponse: Function): void {
        var xhr = new XMLHttpRequest();
        var requestURL = url;
        if (params) {
            let keys = Object.keys(params);
            for (let i = 0; i < keys.length; i++) {
                let key = keys[i];
                let path = '';
                if (i === 0) {
                    path = `?${key}=${params[key]}`;
                } else {
                    path = `&${key}=${params[key]}`;
                }
                requestURL = requestURL + path;
            }
        }
        // DebugUtils.Log("===========Get===========", requestURL);
        xhr.open("GET", requestURL, true);
        xhr.timeout = 8000;
        xhr.setRequestHeader("Content-Type", "application/json;charset=Utf-8");

        let token = NetCfg.token;
        if (token) {
            xhr.setRequestHeader("Authorization", token);
        }

        let appInfo = GameLogic.Instance.appInfo;
        if (appInfo) {
            xhr.setRequestHeader("appVersion", appInfo.appVersion);
            xhr.setRequestHeader("deviceId", appInfo.deviceId);
            xhr.setRequestHeader("deviceName", appInfo.deviceName);
            xhr.setRequestHeader("deviceType", appInfo.deviceType + "");
            xhr.setRequestHeader("systemVersion", appInfo.systemVersion);
        } else {
            xhr.setRequestHeader("appVersion", "0.0.0");
            xhr.setRequestHeader("deviceId", "test_123456");
            xhr.setRequestHeader("deviceName", "test_iPhone");
            xhr.setRequestHeader("deviceType", "1");
            xhr.setRequestHeader("systemVersion", "605.1.15");
        }
        HttpUtils.SetResponsOpt(xhr, OnResponse);

        xhr.send();
    }

    /**
     * 
     * @param url 
     * @param params 
     * @param jsonBody 
     * @param OnResponse 
     */
    public static PostJson(url: string, params: string, jsonBody: string, OnResponse: Function) {
        let xhr = new XMLHttpRequest();

        var requestURL = url;
        if (params) {
            requestURL = requestURL + "" + params;
        }
        // DebugUtils.Log("===========PostJson===========", requestURL);

        xhr.open("POST", requestURL, true);
        xhr.timeout = 8000;
        xhr.setRequestHeader("Content-Type", "application/json;charset=Utf-8");

        let token = NetCfg.token;
        if (token) {
            xhr.setRequestHeader("Authorization", token);
        }

        let appInfo = GameLogic.Instance.appInfo;
        if (appInfo) {
            xhr.setRequestHeader("appVersion", appInfo.appVersion);
            xhr.setRequestHeader("deviceId", appInfo.deviceId);
            xhr.setRequestHeader("deviceName", appInfo.deviceName);
            xhr.setRequestHeader("deviceType", appInfo.deviceType + "");
            xhr.setRequestHeader("systemVersion", appInfo.systemVersion);
        } else {
            xhr.setRequestHeader("appVersion", "0.0.0");
            xhr.setRequestHeader("deviceId", "test_123456");
            xhr.setRequestHeader("deviceName", "test_iPhone");
            xhr.setRequestHeader("deviceType", "1");
            xhr.setRequestHeader("systemVersion", "605.1.15");
        }

        HttpUtils.SetResponsOpt(xhr, OnResponse);
        xhr.send(jsonBody);
    }

    public static PostFrom(url: string, params: string, body: object, OnResponse: Function) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 5000;

        var requestURL = url;
        if (params) {
            requestURL = requestURL + "?" + params;
        }

        xhr.open("POST", requestURL, true);

        HttpUtils.SetResponsOpt(xhr, OnResponse);

        var formData = new FormData();
        for (var key in body) {
            formData.append(key, body[key]);
        }
        xhr.send(formData);
    }
}
