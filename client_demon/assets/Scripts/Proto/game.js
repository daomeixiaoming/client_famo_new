/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

const protobuf = require("../3rds/protobuf");

var $protobuf = protobuf

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.protoGame = (function() {

    /**
     * Namespace protoGame.
     * @exports protoGame
     * @namespace
     */
    var protoGame = {};

    protoGame.TestMsg = (function() {

        /**
         * Properties of a TestMsg.
         * @memberof protoGame
         * @interface ITestMsg
         * @property {string|null} [sendType] TestMsg sendType
         * @property {number|null} [sendNo] TestMsg sendNo
         */

        /**
         * Constructs a new TestMsg.
         * @memberof protoGame
         * @classdesc Represents a TestMsg.
         * @implements ITestMsg
         * @constructor
         * @param {protoGame.ITestMsg=} [properties] Properties to set
         */
        function TestMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * TestMsg sendType.
         * @member {string} sendType
         * @memberof protoGame.TestMsg
         * @instance
         */
        TestMsg.prototype.sendType = "";

        /**
         * TestMsg sendNo.
         * @member {number} sendNo
         * @memberof protoGame.TestMsg
         * @instance
         */
        TestMsg.prototype.sendNo = 0;

        /**
         * Creates a new TestMsg instance using the specified properties.
         * @function create
         * @memberof protoGame.TestMsg
         * @static
         * @param {protoGame.ITestMsg=} [properties] Properties to set
         * @returns {protoGame.TestMsg} TestMsg instance
         */
        TestMsg.create = function create(properties) {
            return new TestMsg(properties);
        };

        /**
         * Encodes the specified TestMsg message. Does not implicitly {@link protoGame.TestMsg.verify|verify} messages.
         * @function encode
         * @memberof protoGame.TestMsg
         * @static
         * @param {protoGame.ITestMsg} message TestMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.sendType != null && Object.hasOwnProperty.call(message, "sendType"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.sendType);
            if (message.sendNo != null && Object.hasOwnProperty.call(message, "sendNo"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.sendNo);
            return writer;
        };

        /**
         * Encodes the specified TestMsg message, length delimited. Does not implicitly {@link protoGame.TestMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protoGame.TestMsg
         * @static
         * @param {protoGame.ITestMsg} message TestMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        TestMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a TestMsg message from the specified reader or buffer.
         * @function decode
         * @memberof protoGame.TestMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protoGame.TestMsg} TestMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protoGame.TestMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.sendType = reader.string();
                    break;
                case 2:
                    message.sendNo = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a TestMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protoGame.TestMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protoGame.TestMsg} TestMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        TestMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a TestMsg message.
         * @function verify
         * @memberof protoGame.TestMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        TestMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.sendType != null && message.hasOwnProperty("sendType"))
                if (!$util.isString(message.sendType))
                    return "sendType: string expected";
            if (message.sendNo != null && message.hasOwnProperty("sendNo"))
                if (!$util.isInteger(message.sendNo))
                    return "sendNo: integer expected";
            return null;
        };

        /**
         * Creates a TestMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protoGame.TestMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protoGame.TestMsg} TestMsg
         */
        TestMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.protoGame.TestMsg)
                return object;
            var message = new $root.protoGame.TestMsg();
            if (object.sendType != null)
                message.sendType = String(object.sendType);
            if (object.sendNo != null)
                message.sendNo = object.sendNo | 0;
            return message;
        };

        /**
         * Creates a plain object from a TestMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protoGame.TestMsg
         * @static
         * @param {protoGame.TestMsg} message TestMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        TestMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.sendType = "";
                object.sendNo = 0;
            }
            if (message.sendType != null && message.hasOwnProperty("sendType"))
                object.sendType = message.sendType;
            if (message.sendNo != null && message.hasOwnProperty("sendNo"))
                object.sendNo = message.sendNo;
            return object;
        };

        /**
         * Converts this TestMsg to JSON.
         * @function toJSON
         * @memberof protoGame.TestMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        TestMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return TestMsg;
    })();

    protoGame.HelloMsg = (function() {

        /**
         * Properties of a HelloMsg.
         * @memberof protoGame
         * @interface IHelloMsg
         * @property {string|null} [value] HelloMsg value
         */

        /**
         * Constructs a new HelloMsg.
         * @memberof protoGame
         * @classdesc Represents a HelloMsg.
         * @implements IHelloMsg
         * @constructor
         * @param {protoGame.IHelloMsg=} [properties] Properties to set
         */
        function HelloMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HelloMsg value.
         * @member {string} value
         * @memberof protoGame.HelloMsg
         * @instance
         */
        HelloMsg.prototype.value = "";

        /**
         * Creates a new HelloMsg instance using the specified properties.
         * @function create
         * @memberof protoGame.HelloMsg
         * @static
         * @param {protoGame.IHelloMsg=} [properties] Properties to set
         * @returns {protoGame.HelloMsg} HelloMsg instance
         */
        HelloMsg.create = function create(properties) {
            return new HelloMsg(properties);
        };

        /**
         * Encodes the specified HelloMsg message. Does not implicitly {@link protoGame.HelloMsg.verify|verify} messages.
         * @function encode
         * @memberof protoGame.HelloMsg
         * @static
         * @param {protoGame.IHelloMsg} message HelloMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.value);
            return writer;
        };

        /**
         * Encodes the specified HelloMsg message, length delimited. Does not implicitly {@link protoGame.HelloMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protoGame.HelloMsg
         * @static
         * @param {protoGame.IHelloMsg} message HelloMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HelloMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HelloMsg message from the specified reader or buffer.
         * @function decode
         * @memberof protoGame.HelloMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protoGame.HelloMsg} HelloMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protoGame.HelloMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.value = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HelloMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protoGame.HelloMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protoGame.HelloMsg} HelloMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HelloMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HelloMsg message.
         * @function verify
         * @memberof protoGame.HelloMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HelloMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.value != null && message.hasOwnProperty("value"))
                if (!$util.isString(message.value))
                    return "value: string expected";
            return null;
        };

        /**
         * Creates a HelloMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protoGame.HelloMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protoGame.HelloMsg} HelloMsg
         */
        HelloMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.protoGame.HelloMsg)
                return object;
            var message = new $root.protoGame.HelloMsg();
            if (object.value != null)
                message.value = String(object.value);
            return message;
        };

        /**
         * Creates a plain object from a HelloMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protoGame.HelloMsg
         * @static
         * @param {protoGame.HelloMsg} message HelloMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HelloMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.value = "";
            if (message.value != null && message.hasOwnProperty("value"))
                object.value = message.value;
            return object;
        };

        /**
         * Converts this HelloMsg to JSON.
         * @function toJSON
         * @memberof protoGame.HelloMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HelloMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HelloMsg;
    })();

    protoGame.RewardInfo = (function() {

        /**
         * Properties of a RewardInfo.
         * @memberof protoGame
         * @interface IRewardInfo
         * @property {string|null} [nickname] RewardInfo nickname
         * @property {number|null} [reward] RewardInfo reward
         */

        /**
         * Constructs a new RewardInfo.
         * @memberof protoGame
         * @classdesc Represents a RewardInfo.
         * @implements IRewardInfo
         * @constructor
         * @param {protoGame.IRewardInfo=} [properties] Properties to set
         */
        function RewardInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RewardInfo nickname.
         * @member {string} nickname
         * @memberof protoGame.RewardInfo
         * @instance
         */
        RewardInfo.prototype.nickname = "";

        /**
         * RewardInfo reward.
         * @member {number} reward
         * @memberof protoGame.RewardInfo
         * @instance
         */
        RewardInfo.prototype.reward = 0;

        /**
         * Creates a new RewardInfo instance using the specified properties.
         * @function create
         * @memberof protoGame.RewardInfo
         * @static
         * @param {protoGame.IRewardInfo=} [properties] Properties to set
         * @returns {protoGame.RewardInfo} RewardInfo instance
         */
        RewardInfo.create = function create(properties) {
            return new RewardInfo(properties);
        };

        /**
         * Encodes the specified RewardInfo message. Does not implicitly {@link protoGame.RewardInfo.verify|verify} messages.
         * @function encode
         * @memberof protoGame.RewardInfo
         * @static
         * @param {protoGame.IRewardInfo} message RewardInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RewardInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.nickname);
            if (message.reward != null && Object.hasOwnProperty.call(message, "reward"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.reward);
            return writer;
        };

        /**
         * Encodes the specified RewardInfo message, length delimited. Does not implicitly {@link protoGame.RewardInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protoGame.RewardInfo
         * @static
         * @param {protoGame.IRewardInfo} message RewardInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RewardInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RewardInfo message from the specified reader or buffer.
         * @function decode
         * @memberof protoGame.RewardInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protoGame.RewardInfo} RewardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RewardInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protoGame.RewardInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.nickname = reader.string();
                    break;
                case 2:
                    message.reward = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RewardInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protoGame.RewardInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protoGame.RewardInfo} RewardInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RewardInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RewardInfo message.
         * @function verify
         * @memberof protoGame.RewardInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RewardInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.reward != null && message.hasOwnProperty("reward"))
                if (!$util.isInteger(message.reward))
                    return "reward: integer expected";
            return null;
        };

        /**
         * Creates a RewardInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protoGame.RewardInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protoGame.RewardInfo} RewardInfo
         */
        RewardInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.protoGame.RewardInfo)
                return object;
            var message = new $root.protoGame.RewardInfo();
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.reward != null)
                message.reward = object.reward | 0;
            return message;
        };

        /**
         * Creates a plain object from a RewardInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protoGame.RewardInfo
         * @static
         * @param {protoGame.RewardInfo} message RewardInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RewardInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.nickname = "";
                object.reward = 0;
            }
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.reward != null && message.hasOwnProperty("reward"))
                object.reward = message.reward;
            return object;
        };

        /**
         * Converts this RewardInfo to JSON.
         * @function toJSON
         * @memberof protoGame.RewardInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RewardInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RewardInfo;
    })();

    protoGame.BossStatus = (function() {

        /**
         * Properties of a BossStatus.
         * @memberof protoGame
         * @interface IBossStatus
         * @property {number|null} [blood] BossStatus blood
         * @property {number|null} [maxBlood] BossStatus maxBlood
         * @property {number|Long|null} [respawnTimer] BossStatus respawnTimer
         * @property {number|Long|null} [respawnAt] BossStatus respawnAt
         */

        /**
         * Constructs a new BossStatus.
         * @memberof protoGame
         * @classdesc Represents a BossStatus.
         * @implements IBossStatus
         * @constructor
         * @param {protoGame.IBossStatus=} [properties] Properties to set
         */
        function BossStatus(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BossStatus blood.
         * @member {number} blood
         * @memberof protoGame.BossStatus
         * @instance
         */
        BossStatus.prototype.blood = 0;

        /**
         * BossStatus maxBlood.
         * @member {number} maxBlood
         * @memberof protoGame.BossStatus
         * @instance
         */
        BossStatus.prototype.maxBlood = 0;

        /**
         * BossStatus respawnTimer.
         * @member {number|Long} respawnTimer
         * @memberof protoGame.BossStatus
         * @instance
         */
        BossStatus.prototype.respawnTimer = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * BossStatus respawnAt.
         * @member {number|Long} respawnAt
         * @memberof protoGame.BossStatus
         * @instance
         */
        BossStatus.prototype.respawnAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new BossStatus instance using the specified properties.
         * @function create
         * @memberof protoGame.BossStatus
         * @static
         * @param {protoGame.IBossStatus=} [properties] Properties to set
         * @returns {protoGame.BossStatus} BossStatus instance
         */
        BossStatus.create = function create(properties) {
            return new BossStatus(properties);
        };

        /**
         * Encodes the specified BossStatus message. Does not implicitly {@link protoGame.BossStatus.verify|verify} messages.
         * @function encode
         * @memberof protoGame.BossStatus
         * @static
         * @param {protoGame.IBossStatus} message BossStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BossStatus.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.blood != null && Object.hasOwnProperty.call(message, "blood"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.blood);
            if (message.maxBlood != null && Object.hasOwnProperty.call(message, "maxBlood"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.maxBlood);
            if (message.respawnTimer != null && Object.hasOwnProperty.call(message, "respawnTimer"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.respawnTimer);
            if (message.respawnAt != null && Object.hasOwnProperty.call(message, "respawnAt"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.respawnAt);
            return writer;
        };

        /**
         * Encodes the specified BossStatus message, length delimited. Does not implicitly {@link protoGame.BossStatus.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protoGame.BossStatus
         * @static
         * @param {protoGame.IBossStatus} message BossStatus message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BossStatus.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BossStatus message from the specified reader or buffer.
         * @function decode
         * @memberof protoGame.BossStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protoGame.BossStatus} BossStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BossStatus.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protoGame.BossStatus();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.blood = reader.int32();
                    break;
                case 2:
                    message.maxBlood = reader.int32();
                    break;
                case 3:
                    message.respawnTimer = reader.int64();
                    break;
                case 4:
                    message.respawnAt = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BossStatus message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protoGame.BossStatus
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protoGame.BossStatus} BossStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BossStatus.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BossStatus message.
         * @function verify
         * @memberof protoGame.BossStatus
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BossStatus.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.blood != null && message.hasOwnProperty("blood"))
                if (!$util.isInteger(message.blood))
                    return "blood: integer expected";
            if (message.maxBlood != null && message.hasOwnProperty("maxBlood"))
                if (!$util.isInteger(message.maxBlood))
                    return "maxBlood: integer expected";
            if (message.respawnTimer != null && message.hasOwnProperty("respawnTimer"))
                if (!$util.isInteger(message.respawnTimer) && !(message.respawnTimer && $util.isInteger(message.respawnTimer.low) && $util.isInteger(message.respawnTimer.high)))
                    return "respawnTimer: integer|Long expected";
            if (message.respawnAt != null && message.hasOwnProperty("respawnAt"))
                if (!$util.isInteger(message.respawnAt) && !(message.respawnAt && $util.isInteger(message.respawnAt.low) && $util.isInteger(message.respawnAt.high)))
                    return "respawnAt: integer|Long expected";
            return null;
        };

        /**
         * Creates a BossStatus message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protoGame.BossStatus
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protoGame.BossStatus} BossStatus
         */
        BossStatus.fromObject = function fromObject(object) {
            if (object instanceof $root.protoGame.BossStatus)
                return object;
            var message = new $root.protoGame.BossStatus();
            if (object.blood != null)
                message.blood = object.blood | 0;
            if (object.maxBlood != null)
                message.maxBlood = object.maxBlood | 0;
            if (object.respawnTimer != null)
                if ($util.Long)
                    (message.respawnTimer = $util.Long.fromValue(object.respawnTimer)).unsigned = false;
                else if (typeof object.respawnTimer === "string")
                    message.respawnTimer = parseInt(object.respawnTimer, 10);
                else if (typeof object.respawnTimer === "number")
                    message.respawnTimer = object.respawnTimer;
                else if (typeof object.respawnTimer === "object")
                    message.respawnTimer = new $util.LongBits(object.respawnTimer.low >>> 0, object.respawnTimer.high >>> 0).toNumber();
            if (object.respawnAt != null)
                if ($util.Long)
                    (message.respawnAt = $util.Long.fromValue(object.respawnAt)).unsigned = false;
                else if (typeof object.respawnAt === "string")
                    message.respawnAt = parseInt(object.respawnAt, 10);
                else if (typeof object.respawnAt === "number")
                    message.respawnAt = object.respawnAt;
                else if (typeof object.respawnAt === "object")
                    message.respawnAt = new $util.LongBits(object.respawnAt.low >>> 0, object.respawnAt.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a BossStatus message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protoGame.BossStatus
         * @static
         * @param {protoGame.BossStatus} message BossStatus
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BossStatus.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.blood = 0;
                object.maxBlood = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.respawnTimer = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.respawnTimer = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.respawnAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.respawnAt = options.longs === String ? "0" : 0;
            }
            if (message.blood != null && message.hasOwnProperty("blood"))
                object.blood = message.blood;
            if (message.maxBlood != null && message.hasOwnProperty("maxBlood"))
                object.maxBlood = message.maxBlood;
            if (message.respawnTimer != null && message.hasOwnProperty("respawnTimer"))
                if (typeof message.respawnTimer === "number")
                    object.respawnTimer = options.longs === String ? String(message.respawnTimer) : message.respawnTimer;
                else
                    object.respawnTimer = options.longs === String ? $util.Long.prototype.toString.call(message.respawnTimer) : options.longs === Number ? new $util.LongBits(message.respawnTimer.low >>> 0, message.respawnTimer.high >>> 0).toNumber() : message.respawnTimer;
            if (message.respawnAt != null && message.hasOwnProperty("respawnAt"))
                if (typeof message.respawnAt === "number")
                    object.respawnAt = options.longs === String ? String(message.respawnAt) : message.respawnAt;
                else
                    object.respawnAt = options.longs === String ? $util.Long.prototype.toString.call(message.respawnAt) : options.longs === Number ? new $util.LongBits(message.respawnAt.low >>> 0, message.respawnAt.high >>> 0).toNumber() : message.respawnAt;
            return object;
        };

        /**
         * Converts this BossStatus to JSON.
         * @function toJSON
         * @memberof protoGame.BossStatus
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BossStatus.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BossStatus;
    })();

    protoGame.BoxInfo = (function() {

        /**
         * Properties of a BoxInfo.
         * @memberof protoGame
         * @interface IBoxInfo
         * @property {number|null} [id] BoxInfo id
         * @property {number|null} [boxType] BoxInfo boxType
         */

        /**
         * Constructs a new BoxInfo.
         * @memberof protoGame
         * @classdesc Represents a BoxInfo.
         * @implements IBoxInfo
         * @constructor
         * @param {protoGame.IBoxInfo=} [properties] Properties to set
         */
        function BoxInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BoxInfo id.
         * @member {number} id
         * @memberof protoGame.BoxInfo
         * @instance
         */
        BoxInfo.prototype.id = 0;

        /**
         * BoxInfo boxType.
         * @member {number} boxType
         * @memberof protoGame.BoxInfo
         * @instance
         */
        BoxInfo.prototype.boxType = 0;

        /**
         * Creates a new BoxInfo instance using the specified properties.
         * @function create
         * @memberof protoGame.BoxInfo
         * @static
         * @param {protoGame.IBoxInfo=} [properties] Properties to set
         * @returns {protoGame.BoxInfo} BoxInfo instance
         */
        BoxInfo.create = function create(properties) {
            return new BoxInfo(properties);
        };

        /**
         * Encodes the specified BoxInfo message. Does not implicitly {@link protoGame.BoxInfo.verify|verify} messages.
         * @function encode
         * @memberof protoGame.BoxInfo
         * @static
         * @param {protoGame.IBoxInfo} message BoxInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoxInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.boxType != null && Object.hasOwnProperty.call(message, "boxType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.boxType);
            return writer;
        };

        /**
         * Encodes the specified BoxInfo message, length delimited. Does not implicitly {@link protoGame.BoxInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protoGame.BoxInfo
         * @static
         * @param {protoGame.IBoxInfo} message BoxInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BoxInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BoxInfo message from the specified reader or buffer.
         * @function decode
         * @memberof protoGame.BoxInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protoGame.BoxInfo} BoxInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoxInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protoGame.BoxInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.int32();
                    break;
                case 2:
                    message.boxType = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BoxInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protoGame.BoxInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protoGame.BoxInfo} BoxInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BoxInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BoxInfo message.
         * @function verify
         * @memberof protoGame.BoxInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BoxInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.boxType != null && message.hasOwnProperty("boxType"))
                if (!$util.isInteger(message.boxType))
                    return "boxType: integer expected";
            return null;
        };

        /**
         * Creates a BoxInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protoGame.BoxInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protoGame.BoxInfo} BoxInfo
         */
        BoxInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.protoGame.BoxInfo)
                return object;
            var message = new $root.protoGame.BoxInfo();
            if (object.id != null)
                message.id = object.id | 0;
            if (object.boxType != null)
                message.boxType = object.boxType | 0;
            return message;
        };

        /**
         * Creates a plain object from a BoxInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protoGame.BoxInfo
         * @static
         * @param {protoGame.BoxInfo} message BoxInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BoxInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.boxType = 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.boxType != null && message.hasOwnProperty("boxType"))
                object.boxType = message.boxType;
            return object;
        };

        /**
         * Converts this BoxInfo to JSON.
         * @function toJSON
         * @memberof protoGame.BoxInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BoxInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BoxInfo;
    })();

    /**
     * RequestCode enum.
     * @name protoGame.RequestCode
     * @enum {number}
     * @property {number} INVALID_REQUEST=0 INVALID_REQUEST value
     * @property {number} PING=1 PING value
     * @property {number} DEMO_REQUEST=2 DEMO_REQUEST value
     */
    protoGame.RequestCode = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "INVALID_REQUEST"] = 0;
        values[valuesById[1] = "PING"] = 1;
        values[valuesById[2] = "DEMO_REQUEST"] = 2;
        return values;
    })();

    /**
     * ResponseCode enum.
     * @name protoGame.ResponseCode
     * @enum {number}
     * @property {number} INVALID_RESPONSE=0 INVALID_RESPONSE value
     * @property {number} PONG=1 PONG value
     * @property {number} DEMO_RESPONSE=2 DEMO_RESPONSE value
     * @property {number} DEMON_SLAYING_REWARD_INFO=10 DEMON_SLAYING_REWARD_INFO value
     * @property {number} DEMON_SLAYING_BOSS_STATUS=11 DEMON_SLAYING_BOSS_STATUS value
     * @property {number} DEMON_SLAYING_BOX_REWARD=12 DEMON_SLAYING_BOX_REWARD value
     */
    protoGame.ResponseCode = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "INVALID_RESPONSE"] = 0;
        values[valuesById[1] = "PONG"] = 1;
        values[valuesById[2] = "DEMO_RESPONSE"] = 2;
        values[valuesById[10] = "DEMON_SLAYING_REWARD_INFO"] = 10;
        values[valuesById[11] = "DEMON_SLAYING_BOSS_STATUS"] = 11;
        values[valuesById[12] = "DEMON_SLAYING_BOX_REWARD"] = 12;
        return values;
    })();

    protoGame.RequestBody = (function() {

        /**
         * Properties of a RequestBody.
         * @memberof protoGame
         * @interface IRequestBody
         * @property {protoGame.ITestMsg|null} [demo] RequestBody demo
         */

        /**
         * Constructs a new RequestBody.
         * @memberof protoGame
         * @classdesc Represents a RequestBody.
         * @implements IRequestBody
         * @constructor
         * @param {protoGame.IRequestBody=} [properties] Properties to set
         */
        function RequestBody(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RequestBody demo.
         * @member {protoGame.ITestMsg|null|undefined} demo
         * @memberof protoGame.RequestBody
         * @instance
         */
        RequestBody.prototype.demo = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * RequestBody body.
         * @member {"demo"|undefined} body
         * @memberof protoGame.RequestBody
         * @instance
         */
        Object.defineProperty(RequestBody.prototype, "body", {
            get: $util.oneOfGetter($oneOfFields = ["demo"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new RequestBody instance using the specified properties.
         * @function create
         * @memberof protoGame.RequestBody
         * @static
         * @param {protoGame.IRequestBody=} [properties] Properties to set
         * @returns {protoGame.RequestBody} RequestBody instance
         */
        RequestBody.create = function create(properties) {
            return new RequestBody(properties);
        };

        /**
         * Encodes the specified RequestBody message. Does not implicitly {@link protoGame.RequestBody.verify|verify} messages.
         * @function encode
         * @memberof protoGame.RequestBody
         * @static
         * @param {protoGame.IRequestBody} message RequestBody message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestBody.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.demo != null && Object.hasOwnProperty.call(message, "demo"))
                $root.protoGame.TestMsg.encode(message.demo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified RequestBody message, length delimited. Does not implicitly {@link protoGame.RequestBody.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protoGame.RequestBody
         * @static
         * @param {protoGame.IRequestBody} message RequestBody message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RequestBody.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RequestBody message from the specified reader or buffer.
         * @function decode
         * @memberof protoGame.RequestBody
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protoGame.RequestBody} RequestBody
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestBody.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protoGame.RequestBody();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.demo = $root.protoGame.TestMsg.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RequestBody message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protoGame.RequestBody
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protoGame.RequestBody} RequestBody
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RequestBody.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RequestBody message.
         * @function verify
         * @memberof protoGame.RequestBody
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RequestBody.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.demo != null && message.hasOwnProperty("demo")) {
                properties.body = 1;
                {
                    var error = $root.protoGame.TestMsg.verify(message.demo);
                    if (error)
                        return "demo." + error;
                }
            }
            return null;
        };

        /**
         * Creates a RequestBody message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protoGame.RequestBody
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protoGame.RequestBody} RequestBody
         */
        RequestBody.fromObject = function fromObject(object) {
            if (object instanceof $root.protoGame.RequestBody)
                return object;
            var message = new $root.protoGame.RequestBody();
            if (object.demo != null) {
                if (typeof object.demo !== "object")
                    throw TypeError(".protoGame.RequestBody.demo: object expected");
                message.demo = $root.protoGame.TestMsg.fromObject(object.demo);
            }
            return message;
        };

        /**
         * Creates a plain object from a RequestBody message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protoGame.RequestBody
         * @static
         * @param {protoGame.RequestBody} message RequestBody
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RequestBody.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.demo != null && message.hasOwnProperty("demo")) {
                object.demo = $root.protoGame.TestMsg.toObject(message.demo, options);
                if (options.oneofs)
                    object.body = "demo";
            }
            return object;
        };

        /**
         * Converts this RequestBody to JSON.
         * @function toJSON
         * @memberof protoGame.RequestBody
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RequestBody.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RequestBody;
    })();

    protoGame.Request = (function() {

        /**
         * Properties of a Request.
         * @memberof protoGame
         * @interface IRequest
         * @property {protoGame.RequestCode|null} [cmd] Request cmd
         * @property {protoGame.IRequestBody|null} [body] Request body
         */

        /**
         * Constructs a new Request.
         * @memberof protoGame
         * @classdesc Represents a Request.
         * @implements IRequest
         * @constructor
         * @param {protoGame.IRequest=} [properties] Properties to set
         */
        function Request(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Request cmd.
         * @member {protoGame.RequestCode} cmd
         * @memberof protoGame.Request
         * @instance
         */
        Request.prototype.cmd = 0;

        /**
         * Request body.
         * @member {protoGame.IRequestBody|null|undefined} body
         * @memberof protoGame.Request
         * @instance
         */
        Request.prototype.body = null;

        /**
         * Creates a new Request instance using the specified properties.
         * @function create
         * @memberof protoGame.Request
         * @static
         * @param {protoGame.IRequest=} [properties] Properties to set
         * @returns {protoGame.Request} Request instance
         */
        Request.create = function create(properties) {
            return new Request(properties);
        };

        /**
         * Encodes the specified Request message. Does not implicitly {@link protoGame.Request.verify|verify} messages.
         * @function encode
         * @memberof protoGame.Request
         * @static
         * @param {protoGame.IRequest} message Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Request.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cmd != null && Object.hasOwnProperty.call(message, "cmd"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.cmd);
            if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                $root.protoGame.RequestBody.encode(message.body, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Request message, length delimited. Does not implicitly {@link protoGame.Request.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protoGame.Request
         * @static
         * @param {protoGame.IRequest} message Request message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Request.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Request message from the specified reader or buffer.
         * @function decode
         * @memberof protoGame.Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protoGame.Request} Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Request.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protoGame.Request();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cmd = reader.int32();
                    break;
                case 2:
                    message.body = $root.protoGame.RequestBody.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Request message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protoGame.Request
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protoGame.Request} Request
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Request.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Request message.
         * @function verify
         * @memberof protoGame.Request
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Request.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                switch (message.cmd) {
                default:
                    return "cmd: enum value expected";
                case 0:
                case 1:
                case 2:
                    break;
                }
            if (message.body != null && message.hasOwnProperty("body")) {
                var error = $root.protoGame.RequestBody.verify(message.body);
                if (error)
                    return "body." + error;
            }
            return null;
        };

        /**
         * Creates a Request message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protoGame.Request
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protoGame.Request} Request
         */
        Request.fromObject = function fromObject(object) {
            if (object instanceof $root.protoGame.Request)
                return object;
            var message = new $root.protoGame.Request();
            switch (object.cmd) {
            case "INVALID_REQUEST":
            case 0:
                message.cmd = 0;
                break;
            case "PING":
            case 1:
                message.cmd = 1;
                break;
            case "DEMO_REQUEST":
            case 2:
                message.cmd = 2;
                break;
            }
            if (object.body != null) {
                if (typeof object.body !== "object")
                    throw TypeError(".protoGame.Request.body: object expected");
                message.body = $root.protoGame.RequestBody.fromObject(object.body);
            }
            return message;
        };

        /**
         * Creates a plain object from a Request message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protoGame.Request
         * @static
         * @param {protoGame.Request} message Request
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Request.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.cmd = options.enums === String ? "INVALID_REQUEST" : 0;
                object.body = null;
            }
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                object.cmd = options.enums === String ? $root.protoGame.RequestCode[message.cmd] : message.cmd;
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = $root.protoGame.RequestBody.toObject(message.body, options);
            return object;
        };

        /**
         * Converts this Request to JSON.
         * @function toJSON
         * @memberof protoGame.Request
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Request.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Request;
    })();

    protoGame.Response = (function() {

        /**
         * Properties of a Response.
         * @memberof protoGame
         * @interface IResponse
         * @property {protoGame.ResponseCode|null} [cmd] Response cmd
         * @property {protoGame.IResponseBody|null} [body] Response body
         */

        /**
         * Constructs a new Response.
         * @memberof protoGame
         * @classdesc Represents a Response.
         * @implements IResponse
         * @constructor
         * @param {protoGame.IResponse=} [properties] Properties to set
         */
        function Response(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Response cmd.
         * @member {protoGame.ResponseCode} cmd
         * @memberof protoGame.Response
         * @instance
         */
        Response.prototype.cmd = 0;

        /**
         * Response body.
         * @member {protoGame.IResponseBody|null|undefined} body
         * @memberof protoGame.Response
         * @instance
         */
        Response.prototype.body = null;

        /**
         * Creates a new Response instance using the specified properties.
         * @function create
         * @memberof protoGame.Response
         * @static
         * @param {protoGame.IResponse=} [properties] Properties to set
         * @returns {protoGame.Response} Response instance
         */
        Response.create = function create(properties) {
            return new Response(properties);
        };

        /**
         * Encodes the specified Response message. Does not implicitly {@link protoGame.Response.verify|verify} messages.
         * @function encode
         * @memberof protoGame.Response
         * @static
         * @param {protoGame.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cmd != null && Object.hasOwnProperty.call(message, "cmd"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.cmd);
            if (message.body != null && Object.hasOwnProperty.call(message, "body"))
                $root.protoGame.ResponseBody.encode(message.body, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Response message, length delimited. Does not implicitly {@link protoGame.Response.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protoGame.Response
         * @static
         * @param {protoGame.IResponse} message Response message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Response message from the specified reader or buffer.
         * @function decode
         * @memberof protoGame.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protoGame.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protoGame.Response();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cmd = reader.int32();
                    break;
                case 2:
                    message.body = $root.protoGame.ResponseBody.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Response message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protoGame.Response
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protoGame.Response} Response
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Response message.
         * @function verify
         * @memberof protoGame.Response
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                switch (message.cmd) {
                default:
                    return "cmd: enum value expected";
                case 0:
                case 1:
                case 2:
                case 10:
                case 11:
                case 12:
                    break;
                }
            if (message.body != null && message.hasOwnProperty("body")) {
                var error = $root.protoGame.ResponseBody.verify(message.body);
                if (error)
                    return "body." + error;
            }
            return null;
        };

        /**
         * Creates a Response message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protoGame.Response
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protoGame.Response} Response
         */
        Response.fromObject = function fromObject(object) {
            if (object instanceof $root.protoGame.Response)
                return object;
            var message = new $root.protoGame.Response();
            switch (object.cmd) {
            case "INVALID_RESPONSE":
            case 0:
                message.cmd = 0;
                break;
            case "PONG":
            case 1:
                message.cmd = 1;
                break;
            case "DEMO_RESPONSE":
            case 2:
                message.cmd = 2;
                break;
            case "DEMON_SLAYING_REWARD_INFO":
            case 10:
                message.cmd = 10;
                break;
            case "DEMON_SLAYING_BOSS_STATUS":
            case 11:
                message.cmd = 11;
                break;
            case "DEMON_SLAYING_BOX_REWARD":
            case 12:
                message.cmd = 12;
                break;
            }
            if (object.body != null) {
                if (typeof object.body !== "object")
                    throw TypeError(".protoGame.Response.body: object expected");
                message.body = $root.protoGame.ResponseBody.fromObject(object.body);
            }
            return message;
        };

        /**
         * Creates a plain object from a Response message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protoGame.Response
         * @static
         * @param {protoGame.Response} message Response
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Response.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.cmd = options.enums === String ? "INVALID_RESPONSE" : 0;
                object.body = null;
            }
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                object.cmd = options.enums === String ? $root.protoGame.ResponseCode[message.cmd] : message.cmd;
            if (message.body != null && message.hasOwnProperty("body"))
                object.body = $root.protoGame.ResponseBody.toObject(message.body, options);
            return object;
        };

        /**
         * Converts this Response to JSON.
         * @function toJSON
         * @memberof protoGame.Response
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Response;
    })();

    protoGame.ResponseBody = (function() {

        /**
         * Properties of a ResponseBody.
         * @memberof protoGame
         * @interface IResponseBody
         * @property {protoGame.IHelloMsg|null} [demo] ResponseBody demo
         * @property {protoGame.IRewardInfo|null} [demonSlayingRewardInfo] ResponseBody demonSlayingRewardInfo
         * @property {protoGame.IBossStatus|null} [demonSlayingBossStatus] ResponseBody demonSlayingBossStatus
         * @property {protoGame.IBoxInfo|null} [demonSlayingBoxReward] ResponseBody demonSlayingBoxReward
         */

        /**
         * Constructs a new ResponseBody.
         * @memberof protoGame
         * @classdesc Represents a ResponseBody.
         * @implements IResponseBody
         * @constructor
         * @param {protoGame.IResponseBody=} [properties] Properties to set
         */
        function ResponseBody(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ResponseBody demo.
         * @member {protoGame.IHelloMsg|null|undefined} demo
         * @memberof protoGame.ResponseBody
         * @instance
         */
        ResponseBody.prototype.demo = null;

        /**
         * ResponseBody demonSlayingRewardInfo.
         * @member {protoGame.IRewardInfo|null|undefined} demonSlayingRewardInfo
         * @memberof protoGame.ResponseBody
         * @instance
         */
        ResponseBody.prototype.demonSlayingRewardInfo = null;

        /**
         * ResponseBody demonSlayingBossStatus.
         * @member {protoGame.IBossStatus|null|undefined} demonSlayingBossStatus
         * @memberof protoGame.ResponseBody
         * @instance
         */
        ResponseBody.prototype.demonSlayingBossStatus = null;

        /**
         * ResponseBody demonSlayingBoxReward.
         * @member {protoGame.IBoxInfo|null|undefined} demonSlayingBoxReward
         * @memberof protoGame.ResponseBody
         * @instance
         */
        ResponseBody.prototype.demonSlayingBoxReward = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * ResponseBody body.
         * @member {"demo"|"demonSlayingRewardInfo"|"demonSlayingBossStatus"|"demonSlayingBoxReward"|undefined} body
         * @memberof protoGame.ResponseBody
         * @instance
         */
        Object.defineProperty(ResponseBody.prototype, "body", {
            get: $util.oneOfGetter($oneOfFields = ["demo", "demonSlayingRewardInfo", "demonSlayingBossStatus", "demonSlayingBoxReward"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ResponseBody instance using the specified properties.
         * @function create
         * @memberof protoGame.ResponseBody
         * @static
         * @param {protoGame.IResponseBody=} [properties] Properties to set
         * @returns {protoGame.ResponseBody} ResponseBody instance
         */
        ResponseBody.create = function create(properties) {
            return new ResponseBody(properties);
        };

        /**
         * Encodes the specified ResponseBody message. Does not implicitly {@link protoGame.ResponseBody.verify|verify} messages.
         * @function encode
         * @memberof protoGame.ResponseBody
         * @static
         * @param {protoGame.IResponseBody} message ResponseBody message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResponseBody.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.demo != null && Object.hasOwnProperty.call(message, "demo"))
                $root.protoGame.HelloMsg.encode(message.demo, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.demonSlayingRewardInfo != null && Object.hasOwnProperty.call(message, "demonSlayingRewardInfo"))
                $root.protoGame.RewardInfo.encode(message.demonSlayingRewardInfo, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.demonSlayingBossStatus != null && Object.hasOwnProperty.call(message, "demonSlayingBossStatus"))
                $root.protoGame.BossStatus.encode(message.demonSlayingBossStatus, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.demonSlayingBoxReward != null && Object.hasOwnProperty.call(message, "demonSlayingBoxReward"))
                $root.protoGame.BoxInfo.encode(message.demonSlayingBoxReward, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ResponseBody message, length delimited. Does not implicitly {@link protoGame.ResponseBody.verify|verify} messages.
         * @function encodeDelimited
         * @memberof protoGame.ResponseBody
         * @static
         * @param {protoGame.IResponseBody} message ResponseBody message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ResponseBody.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ResponseBody message from the specified reader or buffer.
         * @function decode
         * @memberof protoGame.ResponseBody
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {protoGame.ResponseBody} ResponseBody
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResponseBody.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.protoGame.ResponseBody();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.demo = $root.protoGame.HelloMsg.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.demonSlayingRewardInfo = $root.protoGame.RewardInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.demonSlayingBossStatus = $root.protoGame.BossStatus.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.demonSlayingBoxReward = $root.protoGame.BoxInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ResponseBody message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof protoGame.ResponseBody
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {protoGame.ResponseBody} ResponseBody
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ResponseBody.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ResponseBody message.
         * @function verify
         * @memberof protoGame.ResponseBody
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ResponseBody.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.demo != null && message.hasOwnProperty("demo")) {
                properties.body = 1;
                {
                    var error = $root.protoGame.HelloMsg.verify(message.demo);
                    if (error)
                        return "demo." + error;
                }
            }
            if (message.demonSlayingRewardInfo != null && message.hasOwnProperty("demonSlayingRewardInfo")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.protoGame.RewardInfo.verify(message.demonSlayingRewardInfo);
                    if (error)
                        return "demonSlayingRewardInfo." + error;
                }
            }
            if (message.demonSlayingBossStatus != null && message.hasOwnProperty("demonSlayingBossStatus")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.protoGame.BossStatus.verify(message.demonSlayingBossStatus);
                    if (error)
                        return "demonSlayingBossStatus." + error;
                }
            }
            if (message.demonSlayingBoxReward != null && message.hasOwnProperty("demonSlayingBoxReward")) {
                if (properties.body === 1)
                    return "body: multiple values";
                properties.body = 1;
                {
                    var error = $root.protoGame.BoxInfo.verify(message.demonSlayingBoxReward);
                    if (error)
                        return "demonSlayingBoxReward." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ResponseBody message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof protoGame.ResponseBody
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {protoGame.ResponseBody} ResponseBody
         */
        ResponseBody.fromObject = function fromObject(object) {
            if (object instanceof $root.protoGame.ResponseBody)
                return object;
            var message = new $root.protoGame.ResponseBody();
            if (object.demo != null) {
                if (typeof object.demo !== "object")
                    throw TypeError(".protoGame.ResponseBody.demo: object expected");
                message.demo = $root.protoGame.HelloMsg.fromObject(object.demo);
            }
            if (object.demonSlayingRewardInfo != null) {
                if (typeof object.demonSlayingRewardInfo !== "object")
                    throw TypeError(".protoGame.ResponseBody.demonSlayingRewardInfo: object expected");
                message.demonSlayingRewardInfo = $root.protoGame.RewardInfo.fromObject(object.demonSlayingRewardInfo);
            }
            if (object.demonSlayingBossStatus != null) {
                if (typeof object.demonSlayingBossStatus !== "object")
                    throw TypeError(".protoGame.ResponseBody.demonSlayingBossStatus: object expected");
                message.demonSlayingBossStatus = $root.protoGame.BossStatus.fromObject(object.demonSlayingBossStatus);
            }
            if (object.demonSlayingBoxReward != null) {
                if (typeof object.demonSlayingBoxReward !== "object")
                    throw TypeError(".protoGame.ResponseBody.demonSlayingBoxReward: object expected");
                message.demonSlayingBoxReward = $root.protoGame.BoxInfo.fromObject(object.demonSlayingBoxReward);
            }
            return message;
        };

        /**
         * Creates a plain object from a ResponseBody message. Also converts values to other types if specified.
         * @function toObject
         * @memberof protoGame.ResponseBody
         * @static
         * @param {protoGame.ResponseBody} message ResponseBody
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ResponseBody.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.demo != null && message.hasOwnProperty("demo")) {
                object.demo = $root.protoGame.HelloMsg.toObject(message.demo, options);
                if (options.oneofs)
                    object.body = "demo";
            }
            if (message.demonSlayingRewardInfo != null && message.hasOwnProperty("demonSlayingRewardInfo")) {
                object.demonSlayingRewardInfo = $root.protoGame.RewardInfo.toObject(message.demonSlayingRewardInfo, options);
                if (options.oneofs)
                    object.body = "demonSlayingRewardInfo";
            }
            if (message.demonSlayingBossStatus != null && message.hasOwnProperty("demonSlayingBossStatus")) {
                object.demonSlayingBossStatus = $root.protoGame.BossStatus.toObject(message.demonSlayingBossStatus, options);
                if (options.oneofs)
                    object.body = "demonSlayingBossStatus";
            }
            if (message.demonSlayingBoxReward != null && message.hasOwnProperty("demonSlayingBoxReward")) {
                object.demonSlayingBoxReward = $root.protoGame.BoxInfo.toObject(message.demonSlayingBoxReward, options);
                if (options.oneofs)
                    object.body = "demonSlayingBoxReward";
            }
            return object;
        };

        /**
         * Converts this ResponseBody to JSON.
         * @function toJSON
         * @memberof protoGame.ResponseBody
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ResponseBody.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ResponseBody;
    })();

    return protoGame;
})();

module.exports = $root;
