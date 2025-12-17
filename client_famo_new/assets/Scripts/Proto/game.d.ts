import * as $protobuf from "protobufjs";
/** Namespace protoGame. */
export namespace protoGame {

    /** Properties of a TestMsg. */
    interface ITestMsg {

        /** TestMsg sendType */
        sendType?: (string|null);

        /** TestMsg sendNo */
        sendNo?: (number|null);
    }

    /** Represents a TestMsg. */
    class TestMsg implements ITestMsg {

        /**
         * Constructs a new TestMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: protoGame.ITestMsg);

        /** TestMsg sendType. */
        public sendType: string;

        /** TestMsg sendNo. */
        public sendNo: number;

        /**
         * Creates a new TestMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TestMsg instance
         */
        public static create(properties?: protoGame.ITestMsg): protoGame.TestMsg;

        /**
         * Encodes the specified TestMsg message. Does not implicitly {@link protoGame.TestMsg.verify|verify} messages.
         * @param message TestMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protoGame.ITestMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TestMsg message, length delimited. Does not implicitly {@link protoGame.TestMsg.verify|verify} messages.
         * @param message TestMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protoGame.ITestMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TestMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TestMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protoGame.TestMsg;

        /**
         * Decodes a TestMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TestMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protoGame.TestMsg;

        /**
         * Verifies a TestMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TestMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TestMsg
         */
        public static fromObject(object: { [k: string]: any }): protoGame.TestMsg;

        /**
         * Creates a plain object from a TestMsg message. Also converts values to other types if specified.
         * @param message TestMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protoGame.TestMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TestMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HelloMsg. */
    interface IHelloMsg {

        /** HelloMsg value */
        value?: (string|null);
    }

    /** Represents a HelloMsg. */
    class HelloMsg implements IHelloMsg {

        /**
         * Constructs a new HelloMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: protoGame.IHelloMsg);

        /** HelloMsg value. */
        public value: string;

        /**
         * Creates a new HelloMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HelloMsg instance
         */
        public static create(properties?: protoGame.IHelloMsg): protoGame.HelloMsg;

        /**
         * Encodes the specified HelloMsg message. Does not implicitly {@link protoGame.HelloMsg.verify|verify} messages.
         * @param message HelloMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protoGame.IHelloMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HelloMsg message, length delimited. Does not implicitly {@link protoGame.HelloMsg.verify|verify} messages.
         * @param message HelloMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protoGame.IHelloMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HelloMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HelloMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protoGame.HelloMsg;

        /**
         * Decodes a HelloMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HelloMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protoGame.HelloMsg;

        /**
         * Verifies a HelloMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HelloMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HelloMsg
         */
        public static fromObject(object: { [k: string]: any }): protoGame.HelloMsg;

        /**
         * Creates a plain object from a HelloMsg message. Also converts values to other types if specified.
         * @param message HelloMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protoGame.HelloMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HelloMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RewardInfo. */
    interface IRewardInfo {

        /** RewardInfo nickname */
        nickname?: (string|null);

        /** RewardInfo reward */
        reward?: (number|null);
    }

    /** Represents a RewardInfo. */
    class RewardInfo implements IRewardInfo {

        /**
         * Constructs a new RewardInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: protoGame.IRewardInfo);

        /** RewardInfo nickname. */
        public nickname: string;

        /** RewardInfo reward. */
        public reward: number;

        /**
         * Creates a new RewardInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RewardInfo instance
         */
        public static create(properties?: protoGame.IRewardInfo): protoGame.RewardInfo;

        /**
         * Encodes the specified RewardInfo message. Does not implicitly {@link protoGame.RewardInfo.verify|verify} messages.
         * @param message RewardInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protoGame.IRewardInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RewardInfo message, length delimited. Does not implicitly {@link protoGame.RewardInfo.verify|verify} messages.
         * @param message RewardInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protoGame.IRewardInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RewardInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RewardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protoGame.RewardInfo;

        /**
         * Decodes a RewardInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RewardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protoGame.RewardInfo;

        /**
         * Verifies a RewardInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RewardInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RewardInfo
         */
        public static fromObject(object: { [k: string]: any }): protoGame.RewardInfo;

        /**
         * Creates a plain object from a RewardInfo message. Also converts values to other types if specified.
         * @param message RewardInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protoGame.RewardInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RewardInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BossStatus. */
    interface IBossStatus {

        /** BossStatus blood */
        blood?: (number|null);

        /** BossStatus maxBlood */
        maxBlood?: (number|null);

        /** BossStatus respawnTimer */
        respawnTimer?: (number|Long|null);

        /** BossStatus respawnAt */
        respawnAt?: (number|Long|null);
    }

    /** Represents a BossStatus. */
    class BossStatus implements IBossStatus {

        /**
         * Constructs a new BossStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: protoGame.IBossStatus);

        /** BossStatus blood. */
        public blood: number;

        /** BossStatus maxBlood. */
        public maxBlood: number;

        /** BossStatus respawnTimer. */
        public respawnTimer: (number|Long);

        /** BossStatus respawnAt. */
        public respawnAt: (number|Long);

        /**
         * Creates a new BossStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BossStatus instance
         */
        public static create(properties?: protoGame.IBossStatus): protoGame.BossStatus;

        /**
         * Encodes the specified BossStatus message. Does not implicitly {@link protoGame.BossStatus.verify|verify} messages.
         * @param message BossStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protoGame.IBossStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BossStatus message, length delimited. Does not implicitly {@link protoGame.BossStatus.verify|verify} messages.
         * @param message BossStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protoGame.IBossStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BossStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BossStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protoGame.BossStatus;

        /**
         * Decodes a BossStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BossStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protoGame.BossStatus;

        /**
         * Verifies a BossStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BossStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BossStatus
         */
        public static fromObject(object: { [k: string]: any }): protoGame.BossStatus;

        /**
         * Creates a plain object from a BossStatus message. Also converts values to other types if specified.
         * @param message BossStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protoGame.BossStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BossStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BoxInfo. */
    interface IBoxInfo {

        /** BoxInfo id */
        id?: (number|null);

        /** BoxInfo boxType */
        boxType?: (number|null);
    }

    /** Represents a BoxInfo. */
    class BoxInfo implements IBoxInfo {

        /**
         * Constructs a new BoxInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: protoGame.IBoxInfo);

        /** BoxInfo id. */
        public id: number;

        /** BoxInfo boxType. */
        public boxType: number;

        /**
         * Creates a new BoxInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BoxInfo instance
         */
        public static create(properties?: protoGame.IBoxInfo): protoGame.BoxInfo;

        /**
         * Encodes the specified BoxInfo message. Does not implicitly {@link protoGame.BoxInfo.verify|verify} messages.
         * @param message BoxInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protoGame.IBoxInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BoxInfo message, length delimited. Does not implicitly {@link protoGame.BoxInfo.verify|verify} messages.
         * @param message BoxInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protoGame.IBoxInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BoxInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BoxInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protoGame.BoxInfo;

        /**
         * Decodes a BoxInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BoxInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protoGame.BoxInfo;

        /**
         * Verifies a BoxInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BoxInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BoxInfo
         */
        public static fromObject(object: { [k: string]: any }): protoGame.BoxInfo;

        /**
         * Creates a plain object from a BoxInfo message. Also converts values to other types if specified.
         * @param message BoxInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protoGame.BoxInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BoxInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** RequestCode enum. */
    enum RequestCode {
        INVALID_REQUEST = 0,
        PING = 1,
        DEMO_REQUEST = 2
    }

    /** ResponseCode enum. */
    enum ResponseCode {
        INVALID_RESPONSE = 0,
        PONG = 1,
        DEMO_RESPONSE = 2,
        DEMON_SLAYING_REWARD_INFO = 10,
        DEMON_SLAYING_BOSS_STATUS = 11,
        DEMON_SLAYING_BOX_REWARD = 12
    }

    /** Properties of a RequestBody. */
    interface IRequestBody {

        /** RequestBody demo */
        demo?: (protoGame.ITestMsg|null);
    }

    /** Represents a RequestBody. */
    class RequestBody implements IRequestBody {

        /**
         * Constructs a new RequestBody.
         * @param [properties] Properties to set
         */
        constructor(properties?: protoGame.IRequestBody);

        /** RequestBody demo. */
        public demo?: (protoGame.ITestMsg|null);

        /** RequestBody body. */
        public body?: "demo";

        /**
         * Creates a new RequestBody instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestBody instance
         */
        public static create(properties?: protoGame.IRequestBody): protoGame.RequestBody;

        /**
         * Encodes the specified RequestBody message. Does not implicitly {@link protoGame.RequestBody.verify|verify} messages.
         * @param message RequestBody message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protoGame.IRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestBody message, length delimited. Does not implicitly {@link protoGame.RequestBody.verify|verify} messages.
         * @param message RequestBody message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protoGame.IRequestBody, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestBody message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestBody
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protoGame.RequestBody;

        /**
         * Decodes a RequestBody message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestBody
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protoGame.RequestBody;

        /**
         * Verifies a RequestBody message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestBody message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestBody
         */
        public static fromObject(object: { [k: string]: any }): protoGame.RequestBody;

        /**
         * Creates a plain object from a RequestBody message. Also converts values to other types if specified.
         * @param message RequestBody
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protoGame.RequestBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestBody to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Request. */
    interface IRequest {

        /** Request cmd */
        cmd?: (protoGame.RequestCode|null);

        /** Request body */
        body?: (protoGame.IRequestBody|null);
    }

    /** Represents a Request. */
    class Request implements IRequest {

        /**
         * Constructs a new Request.
         * @param [properties] Properties to set
         */
        constructor(properties?: protoGame.IRequest);

        /** Request cmd. */
        public cmd: protoGame.RequestCode;

        /** Request body. */
        public body?: (protoGame.IRequestBody|null);

        /**
         * Creates a new Request instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Request instance
         */
        public static create(properties?: protoGame.IRequest): protoGame.Request;

        /**
         * Encodes the specified Request message. Does not implicitly {@link protoGame.Request.verify|verify} messages.
         * @param message Request message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protoGame.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Request message, length delimited. Does not implicitly {@link protoGame.Request.verify|verify} messages.
         * @param message Request message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protoGame.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Request message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protoGame.Request;

        /**
         * Decodes a Request message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protoGame.Request;

        /**
         * Verifies a Request message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Request message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Request
         */
        public static fromObject(object: { [k: string]: any }): protoGame.Request;

        /**
         * Creates a plain object from a Request message. Also converts values to other types if specified.
         * @param message Request
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protoGame.Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Request to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Response. */
    interface IResponse {

        /** Response cmd */
        cmd?: (protoGame.ResponseCode|null);

        /** Response body */
        body?: (protoGame.IResponseBody|null);
    }

    /** Represents a Response. */
    class Response implements IResponse {

        /**
         * Constructs a new Response.
         * @param [properties] Properties to set
         */
        constructor(properties?: protoGame.IResponse);

        /** Response cmd. */
        public cmd: protoGame.ResponseCode;

        /** Response body. */
        public body?: (protoGame.IResponseBody|null);

        /**
         * Creates a new Response instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Response instance
         */
        public static create(properties?: protoGame.IResponse): protoGame.Response;

        /**
         * Encodes the specified Response message. Does not implicitly {@link protoGame.Response.verify|verify} messages.
         * @param message Response message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protoGame.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link protoGame.Response.verify|verify} messages.
         * @param message Response message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protoGame.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protoGame.Response;

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protoGame.Response;

        /**
         * Verifies a Response message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Response
         */
        public static fromObject(object: { [k: string]: any }): protoGame.Response;

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @param message Response
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protoGame.Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Response to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ResponseBody. */
    interface IResponseBody {

        /** ResponseBody demo */
        demo?: (protoGame.IHelloMsg|null);

        /** ResponseBody demonSlayingRewardInfo */
        demonSlayingRewardInfo?: (protoGame.IRewardInfo|null);

        /** ResponseBody demonSlayingBossStatus */
        demonSlayingBossStatus?: (protoGame.IBossStatus|null);

        /** ResponseBody demonSlayingBoxReward */
        demonSlayingBoxReward?: (protoGame.IBoxInfo|null);
    }

    /** Represents a ResponseBody. */
    class ResponseBody implements IResponseBody {

        /**
         * Constructs a new ResponseBody.
         * @param [properties] Properties to set
         */
        constructor(properties?: protoGame.IResponseBody);

        /** ResponseBody demo. */
        public demo?: (protoGame.IHelloMsg|null);

        /** ResponseBody demonSlayingRewardInfo. */
        public demonSlayingRewardInfo?: (protoGame.IRewardInfo|null);

        /** ResponseBody demonSlayingBossStatus. */
        public demonSlayingBossStatus?: (protoGame.IBossStatus|null);

        /** ResponseBody demonSlayingBoxReward. */
        public demonSlayingBoxReward?: (protoGame.IBoxInfo|null);

        /** ResponseBody body. */
        public body?: ("demo"|"demonSlayingRewardInfo"|"demonSlayingBossStatus"|"demonSlayingBoxReward");

        /**
         * Creates a new ResponseBody instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ResponseBody instance
         */
        public static create(properties?: protoGame.IResponseBody): protoGame.ResponseBody;

        /**
         * Encodes the specified ResponseBody message. Does not implicitly {@link protoGame.ResponseBody.verify|verify} messages.
         * @param message ResponseBody message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: protoGame.IResponseBody, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ResponseBody message, length delimited. Does not implicitly {@link protoGame.ResponseBody.verify|verify} messages.
         * @param message ResponseBody message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: protoGame.IResponseBody, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ResponseBody message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ResponseBody
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): protoGame.ResponseBody;

        /**
         * Decodes a ResponseBody message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ResponseBody
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): protoGame.ResponseBody;

        /**
         * Verifies a ResponseBody message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ResponseBody message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ResponseBody
         */
        public static fromObject(object: { [k: string]: any }): protoGame.ResponseBody;

        /**
         * Creates a plain object from a ResponseBody message. Also converts values to other types if specified.
         * @param message ResponseBody
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: protoGame.ResponseBody, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ResponseBody to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
