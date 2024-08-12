module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1723424543953, function(require, module, exports) {
var __TEMP__ = require('./api/DefineComponent');var DefineComponent = __TEMP__['DefineComponent'];
var __TEMP__ = require('./api/InstanceInject/instanceConfig');var instanceConfig = __TEMP__['instanceConfig'];
var __TEMP__ = require('./api/navigateTo');var navigateTo = __TEMP__['navigateTo'];
var __TEMP__ = require('./api/RootComponent');var RootComponent = __TEMP__['RootComponent'];
var __TEMP__ = require('./api/SubComponent');var SubComponent = __TEMP__['SubComponent'];
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, 'DefineComponent', { enumerable: true, configurable: true, get: function() { return DefineComponent; } });Object.defineProperty(exports, 'instanceConfig', { enumerable: true, configurable: true, get: function() { return instanceConfig; } });Object.defineProperty(exports, 'navigateTo', { enumerable: true, configurable: true, get: function() { return navigateTo; } });Object.defineProperty(exports, 'RootComponent', { enumerable: true, configurable: true, get: function() { return RootComponent; } });Object.defineProperty(exports, 'SubComponent', { enumerable: true, configurable: true, get: function() { return SubComponent; } });
//# sourceMappingURL=index.js.map
}, function(modId) {var map = {"./api/DefineComponent":1723424543954,"./api/InstanceInject/instanceConfig":1723424543960,"./api/navigateTo":1723424543984,"./api/RootComponent":1723424543985,"./api/SubComponent":1723424543986}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543954, function(require, module, exports) {
var __TEMP__ = require('./normalizeOptions');var normalizeOptions = __TEMP__['normalizeOptions'];
/**
 * 把根组件选项和子组件选项转化为原生Component API选项并执行
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var DefineComponent = exports.DefineComponent = function (options) {
    Component(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    normalizeOptions(options));
};
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {"./normalizeOptions":1723424543955}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543955, function(require, module, exports) {
var __TEMP__ = require('../../../behaviors/BbeforeCreated');var BBeforeCreate = __TEMP__['BBeforeCreate'];
var __TEMP__ = require('../../../behaviors/BStore');var BStore = __TEMP__['BStore'];
var __TEMP__ = require('../../../utils/isEmptyObject');var isEmptyObject = __TEMP__['isEmptyObject'];
var __TEMP__ = require('../../InstanceInject/instanceConfig');var instanceConfig = __TEMP__['instanceConfig'];
var __TEMP__ = require('./computedWatchHandle');var computedWatchHandle = __TEMP__['computedWatchHandle'];
var __TEMP__ = require('./hijackHandle');var hijack = __TEMP__['hijack'];
var __TEMP__ = require('./hijackHandle/isPageCheck');var isPageCheck = __TEMP__['isPageCheck'];
var __TEMP__ = require('./hijackHandle/loadReceivedDataHandle');var loadReceivedDataHandle = __TEMP__['loadReceivedDataHandle'];
var __TEMP__ = require('./hijackHandle/onLoadReceivedDataHandle');var onLoadReceivedDataHandle = __TEMP__['onLoadReceivedDataHandle'];
var __TEMP__ = require('./initStore');var initStore = __TEMP__['initStore'];
var __TEMP__ = require('./injectInfoHandler');var injectInfoHandler = __TEMP__['injectInfoHandler'];
var __TEMP__ = require('./internalFieldProtection');var InternalFieldProtection = __TEMP__['InternalFieldProtection'];
var __TEMP__ = require('./rootComponentOptionHandle');var rootComponentOptionHandle = __TEMP__['rootComponentOptionHandle'];
var __TEMP__ = require('./sameFuncOptionsHandle');var sameFuncOptionsHandle = __TEMP__['sameFuncOptionsHandle'];
var __TEMP__ = require('./subComponentsOptionHandle');var subComponentsOptionHandle = __TEMP__['subComponentsOptionHandle'];
/**
 * 把DefineComponentOption转化为原生Component API支持的配置
 * @param defineComponentOption
 * @returns  返回符合原生Component API配置
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function normalizeOptions(defineComponentOption) {
    const rootComponentOption = defineComponentOption.rootComponent;
    const subComponentsOption = defineComponentOption.subComponents;
    const finalOptionsForComponent = injectInfoHandler({
        observers: {},
        data: {},
        methods: {},
        // 加入BStore,处理store字段的behavior
        behaviors: [BStore],
        externalClasses: [],
        pageLifetimes: {},
        isPage: false,
        properties: {},
        computed: {},
        watch: {},
        lifetimes: {},
        options: {},
    }, instanceConfig.injectInfo);
    /**
     * 为了更高的效率,在处理rootComponentOption和subComponentsOption数据时,把相同字段配置(pageLifetimes，lifetimes,watch,observers)收集到funcOptions中。
     * 后续再一起处理这些字段,整合进finalOptionsForComponent配置中。即funcConfig是一个临时中介对象。
     */
    const sameFuncOptions = {
        pageLifetimes: {},
        lifetimes: {},
        watch: {},
        observers: {},
    };
    if (rootComponentOption && !isEmptyObject(rootComponentOption)) {
        rootComponentOptionHandle(finalOptionsForComponent, sameFuncOptions, rootComponentOption);
    }
    if (subComponentsOption && !isEmptyObject(subComponentsOption)) {
        subComponentsOptionHandle(finalOptionsForComponent, subComponentsOption, sameFuncOptions);
    }
    sameFuncOptionsHandle(finalOptionsForComponent, rootComponentOption === null || rootComponentOption === void 0 ? void 0 : rootComponentOption.isPage, sameFuncOptions);
    // 配置与内部字段冲突验证
    InternalFieldProtection(finalOptionsForComponent);
    // 对页面传入参数进行处理 老框架劫持页面methods.onLoad,新框架劫持页面pageLifetimes.load
    if (finalOptionsForComponent.isPage) {
        hijack(finalOptionsForComponent.pageLifetimes, "load", [loadReceivedDataHandle]);
    }
    hijack(finalOptionsForComponent.methods, "onLoad", [onLoadReceivedDataHandle]);
    // 验证isPage字段是否配置正确
    hijack(finalOptionsForComponent.lifetimes, "attached", [isPageCheck(rootComponentOption === null || rootComponentOption === void 0 ? void 0 : rootComponentOption.isPage)]);
    // 页面时删除预设的虚拟组件字段
    if (finalOptionsForComponent.isPage && finalOptionsForComponent.options) {
        Reflect.deleteProperty(finalOptionsForComponent.options, "virtualHost");
    }
    // 初始化store数据到data并把store配置放入到data的__storeConfig__下为后续使用
    initStore(finalOptionsForComponent);
    // 处理computed和watch配置
    computedWatchHandle(finalOptionsForComponent);
    // BBeforeCreate在最后面,让BeforeCreate生命周期运行在最终建立组件时。
    finalOptionsForComponent.behaviors.push(BBeforeCreate);
    return finalOptionsForComponent;
};exports.normalizeOptions = normalizeOptions
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {"../../../behaviors/BbeforeCreated":1723424543956,"../../../behaviors/BStore":1723424543957,"../../../utils/isEmptyObject":1723424543959,"../../InstanceInject/instanceConfig":1723424543960,"./computedWatchHandle":1723424543961,"./hijackHandle":1723424543970,"./hijackHandle/isPageCheck":1723424543971,"./hijackHandle/loadReceivedDataHandle":1723424543972,"./hijackHandle/onLoadReceivedDataHandle":1723424543974,"./initStore":1723424543975,"./injectInfoHandler":1723424543976,"./internalFieldProtection":1723424543977,"./rootComponentOptionHandle":1723424543978,"./sameFuncOptionsHandle":1723424543982,"./subComponentsOptionHandle":1723424543983}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543956, function(require, module, exports) {
/**
 * 增加beforeCreate生命周期函数,便于测试
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var BBeforeCreate = exports.BBeforeCreate = Behavior({
    // @ts-ignore
    definitionFilter(options) {
        // 触发beforeCreate生命周期函数  options.lifetimes在之前被赋值过默认{}所以！
        const beforeCreateFunc = options.lifetimes.beforeCreate;
        if (beforeCreateFunc) {
            beforeCreateFunc.call(undefined, options);
        }
    },
});
//# sourceMappingURL=BbeforeCreated.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543957, function(require, module, exports) {
var __TEMP__ = require('../utils/deepEqual');var deepEqual = __TEMP__['deepEqual'];
var __TEMP__ = require('../utils/isEmptyObject');var isEmptyObject = __TEMP__['isEmptyObject'];
function reactionRegister(storeConfig) {
    const unequalData = {};
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { comparer, reaction, toJS } = require("mobx");
    // 存储reaction的disposer 需要保护内部字段验证
    this.disposer = {};
    for (const key in storeConfig) {
        const currentStoreValue = toJS(storeConfig[key]());
        /* istanbul ignore next 没办法测试啊,在打开一个页面后退回,修改store,再打开相同页面是会出现store数据不准确的问题*/
        // @ts-ignore this.data[key]一定存在
        if (!deepEqual(currentStoreValue, this.data[key])) {
            unequalData[key] = currentStoreValue;
        }
        // 添加响应式逻辑
        this.disposer[key] = reaction(storeConfig[key], (value) => {
            this.setData({
                [key]: toJS(value),
            });
        }, {
            equals: comparer.structural,
        });
    }
    delete this.data.__storeConfig__;
    /* istanbul ignore next  */
    if (!isEmptyObject(unequalData))
        this.setData(unequalData);
}
/**
 * 在attached(1.7.5之前在created中)生命周期中,建立store数据的reaction
 * 在detached生命周期中,清除store数据
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var BStore = exports.BStore = Behavior({
    lifetimes: {
        attached() {
            // 此时store数据已初始化到data中(initStore)
            const storeConfig = this.data.__storeConfig__;
            if (!storeConfig)
                return;
            reactionRegister.call(this, storeConfig);
        },
        detached() {
            /* istanbul ignore next 清除store数据 test中模拟了测试，所以忽略 框架(1.6.1)不支持 issue {@link https://github.com/wechat-miniprogram/miniprogram-simulate/issues/110}*/
            for (const key in this.disposer) {
                this.disposer[key]();
            }
        },
    },
});
//# sourceMappingURL=BStore.js.map
}, function(modId) { var map = {"../utils/deepEqual":1723424543958,"../utils/isEmptyObject":1723424543959}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543958, function(require, module, exports) {
function isSameType(a, b) {
    return Object.prototype.toString.call(a) === Object.prototype.toString.call(b);
}
// 定义一个辅助函数，用于判断两个对象的属性数量是否相同
function isSameSize(a, b) {
    return Object.keys(a).length === Object.keys(b).length;
}
// 定义一个辅助函数，用于判断两个函数的代码是否相同
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function isSameCode(a, b) {
    // 去除空格比较函数字符串
    return a.toString().split(" ").join("") === b.toString().split(" ").join("");
}
// 定义一个辅助函数，用于判断两个日期的时间戳是否相同
function isSameTime(a, b) {
    return a.getTime() === b.getTime();
}
// 定义一个辅助函数，用于判断两个正则表达式的模式和标志是否相同
function isSamePattern(a, b) {
    return a.source === b.source && a.flags === b.flags;
}
/**
 * 深度判断两个值是否相等,有一个值为非对象类型即使用Object.is判断。
 * 不支持原型上的属性
 * 两个函数使用toString()比较
 * 支持Date,RegExp
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function deepEqual(a, b) {
    // 如果两个值是原始类型或null，直接用Object.is比较
    if (a === null || b === null || typeof a !== "object" || typeof b !== "object") {
        if (typeof a !== "function" || typeof b !== "function") {
            return Object.is(a, b);
        }
    }
    // 如果两个值是对象类型，先判断它们的类型、构造函数和属性数量是否相同
    if (!isSameType(a, b) || a.constructor !== b.constructor || !isSameSize(a, b)) {
        return false;
    }
    // 如果两个值是函数类型，再判断它们的代码是否相同
    if (typeof a === "function") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        return isSameCode(a, b);
    }
    // 如果两个值是日期类型，再判断它们的时间戳是否相同
    if (a instanceof Date) {
        return isSameTime(a, b);
    }
    // // 如果两个值是正则表达式类型，再判断它们的模式和标志是否相同
    if (a instanceof RegExp) {
        return isSamePattern(a, b);
    }
    // 对于其他对象类型，递归地比较它们的每个属性和值是否深度相等
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    for (const key of keysA) {
        if (keysB.includes(key)) {
            // @ts-ignore
            if (!deepEqual(a[key], b[key])) {
                return false;
            }
        }
        else {
            return false;
        }
    }
    // 如果以上的条件都满足，说明两个值是深度相等的
    return true;
};exports.deepEqual = deepEqual
//# sourceMappingURL=deepEqual.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543959, function(require, module, exports) {
/**
 * 判断一个值是否为空对象 `{}`
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isEmptyObject(obj) {
    if (typeof obj !== "object" || obj === null || Array.isArray(obj) || obj instanceof Set || obj instanceof Map
        || obj instanceof WeakSet || obj instanceof WeakMap) {
        return false;
    }
    return Reflect.ownKeys(obj).length === 0;
};exports.isEmptyObject = isEmptyObject
//# sourceMappingURL=isEmptyObject.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543960, function(require, module, exports) {
/**
 * 实例配置接口
 */
class InstanceConfig {
    constructor() {
        this.info = {};
    }
    get injectInfo() {
        return this.info.injectInfo;
    }
    setInjectInfo(info) {
        if (info)
            this.info.injectInfo = info;
    }
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var instanceConfig = exports.instanceConfig = new InstanceConfig();
//# sourceMappingURL=instanceConfig.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543961, function(require, module, exports) {
var __TEMP__ = require('../../../../utils/deepEqual');var deepEqual = __TEMP__['deepEqual'];
var __TEMP__ = require('./computedUpdater');var computedUpdater = __TEMP__['computedUpdater'];
var __TEMP__ = require('./getPathsValue');var getPathsValue = __TEMP__['getPathsValue'];
var __TEMP__ = require('./getPropertiesValue');var getPropertiesValue = __TEMP__['getPropertiesValue'];
var __TEMP__ = require('./initComputedAndGetCache');var initComputedAndGetCache = __TEMP__['initComputedAndGetCache'];
var __TEMP__ = require('../../../../utils/assertNonNullable');var assertNonNullable = __TEMP__['assertNonNullable'];
var __TEMP__ = require('../../../../utils/deepClone');var deepClone = __TEMP__['deepClone'];
var __TEMP__ = require('../../../../utils/isEmptyObject');var isEmptyObject = __TEMP__['isEmptyObject'];
function initWatchOldValue(data, watchConfig) {
    const watchOldValue = {};
    for (const key in watchConfig) {
        // @ts-ignore 隐式索引
        watchOldValue[key] = deepClone(getPathsValue(data, key));
    }
    return watchOldValue;
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function computedWatchHandle(options) {
    // 计算属性初始化和首次依赖收集
    const computedConfig = options.computed;
    const rawPropertiesValue = getPropertiesValue(options.properties);
    if (computedConfig && !isEmptyObject(computedConfig)) {
        // 此时store已经初始化数据到data了(__storeConfig__)
        const __computedInitCache__ = initComputedAndGetCache(options, computedConfig, Object.assign(Object.assign({}, options.data), rawPropertiesValue));
        // 缓存放入data中
        options.data.__computedCache__ = __computedInitCache__;
        // 计算属性更新函数放入methods中 要做冲突判断,避免用户定义了同名methods字段
        options.methods.__computedUpdater__ = computedUpdater;
    }
    const observersConfig = options.observers;
    // 通过observers加入`**`字段来触发计算属性更新
    const originalFunc = observersConfig["**"];
    observersConfig["**"] = function () {
        var _a;
        // 任何setData都会触发计算属性更新(可能依赖数据并没变化)
        (_a = this.__computedUpdater__) === null || _a === void 0 ? void 0 : _a.call(this);
        originalFunc === null || originalFunc === void 0 ? void 0 : originalFunc.call(this);
    };
    // watch handle
    const watchConfig = options.watch;
    if (watchConfig && !isEmptyObject(watchConfig)) {
        const data = options.data;
        data.__watchOldValue__ = initWatchOldValue(Object.assign(Object.assign({}, data), rawPropertiesValue), watchConfig);
        const observersConfig = options.observers;
        for (const key in watchConfig) {
            const watchHadle = watchConfig[key];
            const originObserversHandle = observersConfig[key];
            // 在监控多个数据时,参数是多个值
            observersConfig[key] = function (...newValue) {
                originObserversHandle === null || originObserversHandle === void 0 ? void 0 : originObserversHandle.call(this, ...newValue);
                const watchOldValue = assertNonNullable(this.data.__watchOldValue__);
                const oldValue = watchOldValue[key];
                if (deepEqual(newValue, oldValue))
                    return;
                watchOldValue[key] = deepClone(newValue);
                watchHadle.call(this, ...newValue, ...oldValue);
            };
        }
    }
};exports.computedWatchHandle = computedWatchHandle
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {"../../../../utils/deepEqual":1723424543958,"./computedUpdater":1723424543962,"./getPathsValue":1723424543965,"./getPropertiesValue":1723424543966,"./initComputedAndGetCache":1723424543967,"../../../../utils/assertNonNullable":1723424543968,"../../../../utils/deepClone":1723424543969,"../../../../utils/isEmptyObject":1723424543959}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543962, function(require, module, exports) {
var __TEMP__ = require('../../../../utils/deepEqual');var deepEqual = __TEMP__['deepEqual'];
var __TEMP__ = require('./data-tracer');var deepProxy = __TEMP__['deepProxy'];var getProxyOriginalValue = __TEMP__['getProxyOriginalValue'];
var __TEMP__ = require('./dependencesOptimize');var removeSubDependences = __TEMP__['removeSubDependences'];
var __TEMP__ = require('./getPathsValue');var getPathsValue = __TEMP__['getPathsValue'];
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function computedUpdater(isUpdated = false) {
    for (const key in this.data.__computedCache__) {
        const itemCache = this.data.__computedCache__[key];
        let changed = false;
        for (const dep of itemCache.dependences) {
            // getPathsValue返回的是数组
            const curVal = getPathsValue(this.data, dep.paths.join("."))[0];
            // 检查依赖是否更新
            if (!deepEqual(curVal, dep.val)) {
                changed = true;
                break;
            }
        }
        if (changed) {
            const newDependences = [];
            const newValue = itemCache.method.call({ data: deepProxy(this.data, newDependences) });
            // 更新值不会立即再次进入**函数,而是当前**函数运行完毕后触发**函数,
            this.setData({
                [key]: getProxyOriginalValue(newValue),
            });
            isUpdated = true;
            // 更新依赖(优化)
            this.data.__computedCache__[key].dependences = removeSubDependences(newDependences);
            // 有一个计算属性更新就重新更新所有计算互相,避免后置依赖导致前置依赖错误
            return computedUpdater.call(this, isUpdated);
        }
    }
    return isUpdated;
};exports.computedUpdater = computedUpdater
//# sourceMappingURL=computedUpdater.js.map
}, function(modId) { var map = {"../../../../utils/deepEqual":1723424543958,"./data-tracer":1723424543963,"./dependencesOptimize":1723424543964,"./getPathsValue":1723424543965}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543963, function(require, module, exports) {
var __TEMP__ = require('./dependencesOptimize');var removePreviousDependence = __TEMP__['removePreviousDependence'];
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function deepProxy(data, dependences, basePath = []) {
    const handler = {
        get(target, prop) {
            if (prop === "__original__") {
                return target;
            }
            const val = target[prop];
            // 自身没有但原型链上有的属性不收集依赖
            if (prop in target && !Object.prototype.hasOwnProperty.call(target, prop)) {
                return typeof val === "function" ? val.bind(target) : val;
            }
            removePreviousDependence(dependences, basePath);
            const curPath = basePath.concat(prop);
            dependences.push({ paths: curPath, val });
            // 非对象不代理
            if (typeof val !== "object" || val === null)
                return val;
            return deepProxy(val, dependences, curPath);
        },
        set(_target, prop) {
            throw Error(`${prop}字段是只读的`);
        },
    };
    return new Proxy(data, handler);
};exports.deepProxy = deepProxy
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function getProxyOriginalValue(value) {
    if (typeof value !== "object" || value === null) {
        return value;
    }
    if (value.__original__)
        return value.__original__;
    const ret = Array.isArray(value) ? [] : {};
    for (const key in value) {
        // @ts-ignore 隐式索引
        ret[key] = getProxyOriginalValue(value[key]);
    }
    return ret;
};exports.getProxyOriginalValue = getProxyOriginalValue
//# sourceMappingURL=data-tracer.js.map
}, function(modId) { var map = {"./dependencesOptimize":1723424543964}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543964, function(require, module, exports) {
// 去除子依赖
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function removeSubDependences(dependences) {
    // 把dependences按照路径长度排序
    dependences.sort((a, b) => a.paths.length - b.paths.length);
    // 从最长的路径开始遍历,如果当前路径是上一个路径的子路径,则删除当前路径
    for (let f = 0; f < dependences.length; f++) {
        const sortPath = dependences[f].paths.toString();
        // 从后往前遍历,删除子依赖,保留父依赖
        for (let i = dependences.length - 1; i > f; i--) {
            const curPath = dependences[i].paths.toString();
            if (curPath.startsWith(sortPath)) {
                dependences.splice(i, 1);
            }
        }
    }
    return dependences;
};exports.removeSubDependences = removeSubDependences
// 当前依赖是上一个依赖的子依赖时,去除上一个依赖
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function removePreviousDependence(dependences, basePath) {
    if (dependences.length === 0 || basePath.length === 0)
        return dependences;
    const lastDependence = dependences[dependences.length - 1];
    if (lastDependence.paths.toString() === basePath.toString()) {
        dependences.pop();
    }
    return dependences;
};exports.removePreviousDependence = removePreviousDependence
//# sourceMappingURL=dependencesOptimize.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543965, function(require, module, exports) {
/**
 * 获取指定paths的值
 * @param this  - 组件实例 Instance
 * @param paths - 支持多字段(用`,`分开) 例如 'obj.xxx,a,b.**' 监控了3个字段
 * @returns unknown[] 每项对应paths每项的值
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function getPathsValue(data, paths) {
    const valueList = [];
    // ['obj.xxx','a','b.**'].forEach
    paths.split(",").forEach(path => {
        // path : 'obj.xxx' | 'a' | 'b.**'
        if (path.includes(".**")) {
            // "b.**" => 'b'
            path = path.slice(0, -3);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = path.split(".").reduce((pre, path) => {
            // pre有可能为undefined|null,比如obj是未初始化的计算属性(undefined),还有可能是properties的对象类型(默认为null)
            try {
                return pre[path];
            }
            catch (_a) {
                return undefined;
            }
        }, data);
        valueList.push(value);
    });
    return valueList;
};exports.getPathsValue = getPathsValue
//# sourceMappingURL=getPathsValue.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543966, function(require, module, exports) {
function getRequiredSingleValue(PropType) {
    switch (PropType) {
        case String:
            return "";
        case Number:
            return 0;
        case Array:
            return [];
        case Object:
            return null;
        case Boolean:
            return false;
        default:
            /* istanbul ignore next */
            throw Error("properties字段类型只能为 String | Number | Array | Object | Boolean ");
    }
}
function IsRequiredSingle(config) {
    return config instanceof Function;
}
function IsRequiredUnion(config) {
    return !Reflect.has(config, "value");
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function getPropertiesValue(propertiesOpt) {
    if (propertiesOpt === undefined)
        return;
    const result = {};
    for (const key in propertiesOpt) {
        const config = propertiesOpt[key];
        if (IsRequiredSingle(config)) {
            // @ts-ignore 隐式索引
            result[key] = getRequiredSingleValue(config);
        }
        else if (IsRequiredUnion(config)) {
            // @ts-ignore 隐式索引
            result[key] = getRequiredSingleValue(config.type);
        }
        else {
            // @ts-ignore 隐式索引
            result[key] = config.value;
        }
    }
    return result;
};exports.getPropertiesValue = getPropertiesValue
//# sourceMappingURL=getPropertiesValue.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543967, function(require, module, exports) {
var __TEMP__ = require('./data-tracer');var deepProxy = __TEMP__['deepProxy'];var getProxyOriginalValue = __TEMP__['getProxyOriginalValue'];
var __TEMP__ = require('./dependencesOptimize');var removeSubDependences = __TEMP__['removeSubDependences'];
/**
 * 如果依赖列表某项的首个字段值为undefined并且字段为其他计算属性字段(即被依赖的计算字段写在了依赖他的计算字段后面) 返回false, 否则返回true表示依赖有效。
 */
function isValidDependences(dependences, computedKeys) {
    for (const { paths: path, val } of dependences) {
        if ((val === undefined) && computedKeys.includes(path[0])) {
            return false;
        }
    }
    // 依赖有效
    return true;
}
/**
 * 把计算属性初始值加入到options.data中并返回缓存(递归函数)
 * @param options - 配置选项
 * @param computedConfig - 计算字段配置
 * @param initAllData - 初始化时全部的data包含(properties,data,和已经初始化后的computed字段)
 * @param uninitedkeys - 未初始化的key (默认为所有computedConfig的key)
 * @param computedCache - 返回的所有计算字段缓存(默认为空对象)
 * @returns  `computedCache` 计算字段缓存
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function initComputedAndGetCache(options, computedConfig, initAllData, uninitedkeys = Object.keys(computedConfig), computedCache = {}) {
    for (const key of uninitedkeys) {
        const computedFunc = computedConfig[key];
        const dependences = [];
        // 通过代理data获取计算字段的初始值和依赖
        let initValue = computedFunc.call({ data: deepProxy(initAllData, dependences) });
        // 去除当前已初始的计算属性key
        uninitedkeys = uninitedkeys.filter(ele => ele !== key);
        // 验证依赖是否有效
        if (isValidDependences(dependences, uninitedkeys)) {
            initValue = getProxyOriginalValue(initValue);
            // 把计算属性初始值加入到options.data中
            options.data[key] = initValue;
            // 把计算属性初始值加入到initAllData中,后续其他计算属性依赖时会可能会用到
            initAllData[key] = initValue;
            computedCache[key] = {
                dependences: removeSubDependences(dependences),
                method: computedFunc,
                value: initValue,
            };
        }
        else {
            // 把当前依赖不正确的key放到后面去
            uninitedkeys.push(key);
        }
    }
    // 看uninitedkey是否未空，空表示所有依赖收集完毕直接返回
    if (uninitedkeys.length === 0) {
        return computedCache;
    }
    // uninitedkey不为空,递归
    return initComputedAndGetCache(options, computedConfig, initAllData, uninitedkeys, computedCache);
};exports.initComputedAndGetCache = initComputedAndGetCache
//# sourceMappingURL=initComputedAndGetCache.js.map
}, function(modId) { var map = {"./data-tracer":1723424543963,"./dependencesOptimize":1723424543964}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543968, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function assertNonNullable(value) {
    /* istanbul ignore next  */
    if (value === null || value === undefined) {
        throw new Error(`${value} should not be null or undefined`);
    }
    return value;
};exports.assertNonNullable = assertNonNullable
//# sourceMappingURL=assertNonNullable.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543969, function(require, module, exports) {
/**
 * 深度克隆 函数相同 原型一致
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function deepClone(value) {
    if (typeof value !== "object" || value === null || value instanceof RegExp) {
        return value;
    }
    const clone = (Array.isArray(value) ? [] : {});
    Object.setPrototypeOf(clone, Object.getPrototypeOf(value));
    for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
            clone[key] = deepClone(value[key]);
        }
    }
    return clone;
};exports.deepClone = deepClone
//# sourceMappingURL=deepClone.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543970, function(require, module, exports) {
/**
 * 劫持指定配置字段,在原有配置前执行指定函数
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function hijack(config, field, before) {
    // @ts-ignore 隐式索引
    const originalFunc = config[field];
    // @ts-ignore 隐式索引
    config[field] = function (...args) {
        before.forEach(func => func.call(this, ...args));
        if (originalFunc)
            originalFunc.apply(this, args);
        // after.forEach(func => func.call(this, ...args));
    };
    return;
};exports.hijack = hijack
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543971, function(require, module, exports) {
/**
 * 劫持attached,根据this.route做判断 isPage值是否正确
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function isPageCheck(isPage) {
    return function () {
        const route = this.route;
        if (route && isPage !== true) {
            // 页面isPage值错误
            throw Error(`页面 /${route} 中, RootComponent构建页面时,isPage字段值应为 true`);
        }
        if (!route && isPage !== false && isPage !== undefined) {
            // 组件写了isPage = true
            throw Error(`组件 ${this.is} 中  RootComponent构建组件时,可不写isPage字段或值为 false`);
        }
    };
};exports.isPageCheck = isPageCheck
//# sourceMappingURL=isPageCheck.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543972, function(require, module, exports) {
/**
 * 针对通过 navigateTo传过来的数据对组件load周期传入数据解析
 * @param option - option中的url是拼接了encodeURIComponent转码的data对象的,key为INNERMARKER.url
 */
var __TEMP__ = require('../../../../utils/InnerMarker');var INNERMARKER = __TEMP__['INNERMARKER'];
/* istanbul ignore next miniprogram-simulate(当前版本 1.6.1) 无法测试load */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function loadReceivedDataHandle(option) {
    const innerData = option[INNERMARKER.url];
    // 未使用自定义的navigateTo
    if (innerData === undefined)
        return;
    // 使用navigateTo API
    const decodeOption = JSON.parse(decodeURIComponent(innerData));
    for (const key in decodeOption) {
        option[key] = decodeOption[key];
    }
    // 给onLoad劫持函数一个标记,判断在新框架下已经被解析过了
    option[INNERMARKER.url] = INNERMARKER.url;
};exports.loadReceivedDataHandle = loadReceivedDataHandle
//# sourceMappingURL=loadReceivedDataHandle.js.map
}, function(modId) { var map = {"../../../../utils/InnerMarker":1723424543973}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543973, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });var INNERMARKER = exports.INNERMARKER = {
    url: "__annil__", // url默认传值Data字段
};
//# sourceMappingURL=InnerMarker.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543974, function(require, module, exports) {
/**
 * 原生Component会对传入的对象字段匹配的properties字段setData赋值。不符合字段或Page时不会赋值。
 * 此函数为给实例setData赋值,默认传递值与properties相符(ts类型安全)。
 * @param option - 传入onLoad的参数 有以下两种可能
 * 1. 使用wx.navigateTo传值的。这种情况无内置字段 option[INNERMARKER.url] 等于 undefined
 * 2. 使用插件提供的navigateTo传值。这种情况 INNERMARKER.url被load周期劫持函数解码后赋值INNERMARKER.url字段为本身,即option[INNERMARKER.url] 等于 INNERMARKER.url
 */
var __TEMP__ = require('../../../../utils/InnerMarker');var INNERMARKER = __TEMP__['INNERMARKER'];
/* istanbul ignore next miniprogram-simulate(当前版本 1.6.1) 无法测试页面生命周期 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function onLoadReceivedDataHandle(option) {
    const innerData = option[INNERMARKER.url];
    // 情况1为undefined,2为INNERMARKER.url有值但不是本身,说明是老框架。3所以innerData等于 INNERMARKER.url即有组件配置了load(新框架在pageLifetimes.load中提前解析了)
    if (innerData === undefined)
        return;
    if (innerData !== INNERMARKER.url) {
        // 需要情况2 需要解析
        const decodeOption = JSON.parse(decodeURIComponent(innerData));
        for (const key in decodeOption) {
            option[key] = decodeOption[key];
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete option[INNERMARKER.url];
    this.setData(option);
};exports.onLoadReceivedDataHandle = onLoadReceivedDataHandle
//# sourceMappingURL=onLoadReceivedDataHandle.js.map
}, function(modId) { var map = {"../../../../utils/InnerMarker":1723424543973}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543975, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function initStore(finalOptionsForComponent) {
    const storeConfig = finalOptionsForComponent.store;
    if (storeConfig) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { toJS } = require("mobx");
        for (const key in storeConfig) {
            finalOptionsForComponent.data[key] = toJS(storeConfig[key]());
            // 把响应式数据配置保留在methods的__storeConfig__字段下带入到组件实例中(不用函数返回方式也可以,但不符合methods字段类型),后续再从原型上删除。
        }
        finalOptionsForComponent.data.__storeConfig__ = storeConfig;
        delete finalOptionsForComponent.store;
    }
};exports.initStore = initStore
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543976, function(require, module, exports) {
/**
 * 把injectInfo字段合并到finalOptionsForComponent
 * @remarks 规则：
 * 1. behaviors字段 push
 * 2. 对象字段 没有的话直接赋值，有的话Object.assign
 * @param finalOptionsForComponent
 * @param injectInfo
 * @returns finalOptionsForComponent
 */
function mergeOptions(finalOptionsForComponent, injectInfo) {
    for (const key in injectInfo) {
        const injectVal = injectInfo[key];
        if (key in finalOptionsForComponent) {
            // @ts-ignore
            const originalVal = finalOptionsForComponent[key];
            switch (key) {
                case "behaviors":
                    {
                        // @ts-ignore behaviors 是数组类型
                        finalOptionsForComponent[key].push(...injectVal);
                    }
                    break;
                default:
                    {
                        // @ts-ignore 覆盖目标
                        finalOptionsForComponent[key] = Object.assign(originalVal, injectVal);
                    }
                    break;
            }
        }
        else {
            // @ts-ignore
            finalOptionsForComponent[key] = injectVal;
        }
    }
    return finalOptionsForComponent;
}
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function injectInfoHandler(finalOptionsForComponent, injectInfo) {
    if (!injectInfo)
        return finalOptionsForComponent;
    return mergeOptions(finalOptionsForComponent, injectInfo);
};exports.injectInfoHandler = injectInfoHandler
//# sourceMappingURL=injectInfoHandler.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543977, function(require, module, exports) {
// 内部字段
const internalFiled = {
    methods: ["disposer", "__computedUpdater__"],
    data: ["__computedCache__", "__storeConfig__", "__watchOldValue__"],
};
/**
 * 报错的形式避免输入字段和内部字段冲突,保证config下不包含内部预定字段(列表)
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function InternalFieldProtection(finalOptionsForComponent) {
    const methodsFieldKeys = Object.keys(finalOptionsForComponent.methods);
    const dataFieldKeys = Object.keys(finalOptionsForComponent.data);
    for (const key of methodsFieldKeys) {
        if (internalFiled.methods.includes(key)) {
            throw Error(`methods配置中的${key}字段已被内部字段占用`);
        }
    }
    for (const key of dataFieldKeys) {
        if (internalFiled.data.includes(key)) {
            /* istanbul ignore next 同上*/
            throw Error(`data配置中的${key}字段已被内部字段占用`);
        }
    }
};exports.InternalFieldProtection = InternalFieldProtection
//# sourceMappingURL=internalFieldProtection.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543978, function(require, module, exports) {
var __TEMP__ = require('./customEventsHandle');var customEventsHandle = __TEMP__['customEventsHandle'];
var __TEMP__ = require('./otherFieldsHandle');var otherFieldsHandle = __TEMP__['otherFieldsHandle'];
var __TEMP__ = require('./sameFuncFieldsCollect');var sameFuncFieldsCollect = __TEMP__['sameFuncFieldsCollect'];
/**
 * 收集 rootComponentOptions 配置到 finalOptions 和 funcOptions 中
 * @param finalOptions - 收集配置对象
 * @param funcOptions  - 收集特殊配置对象字段
 * @param rootComponentOptions - 被收集的源配置对象
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function rootComponentOptionHandle(finalOptions, funcOptions, rootComponentOptions) {
    if (rootComponentOptions.customEvents)
        customEventsHandle(finalOptions.methods, rootComponentOptions.customEvents);
    if (rootComponentOptions.events)
        Object.assign(finalOptions.methods, rootComponentOptions.events);
    sameFuncFieldsCollect(rootComponentOptions, funcOptions);
    otherFieldsHandle(finalOptions, rootComponentOptions);
};exports.rootComponentOptionHandle = rootComponentOptionHandle
//# sourceMappingURL=rootComponentOptionHandle.js.map
}, function(modId) { var map = {"./customEventsHandle":1723424543979,"./otherFieldsHandle":1723424543980,"./sameFuncFieldsCollect":1723424543981}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543979, function(require, module, exports) {
// 类型守卫
function IsFullCustomEvents(customEventOptions) {
    return Object.prototype.toString.call(customEventOptions) === "[object Object]";
}
/**
 * 把customEvents字段配置变成函数放入到componentOptions.methods中
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function customEventsHandle(methods, customEventsConfig) {
    for (const key in customEventsConfig) {
        const customEventOptions = customEventsConfig[key];
        if (IsFullCustomEvents(customEventOptions)) {
            methods[key] = function (detail) {
                this.triggerEvent(key, detail, customEventOptions.options);
            };
        }
        else {
            methods[key] = function (detail) {
                this.triggerEvent(key, detail);
            };
        }
    }
};exports.customEventsHandle = customEventsHandle
//# sourceMappingURL=customEventsHandle.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543980, function(require, module, exports) {
/**
 * 其他字段加入到componentOptions对应字段配置中
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function otherFieldsHandle(finalOptions, rootComponentOptions) {
    for (const key in rootComponentOptions) {
        // @ts-ignore 隐式索引
        const config = rootComponentOptions[key];
        if (Array.isArray(config) === true) {
            //  "behaviors" || "externalClasses"是数组
            // @ts-ignore 只有 behaviors 和 externalClasses, 且都默认为[]
            finalOptions[key].push(...config);
        }
        else if (typeof config === "object") {
            // @ts-ignore 隐式索引
            Object.assign(finalOptions[key] || (finalOptions[key] = {}), config);
        }
        else {
            // 函数字段有 根组件有 `export` 子组件无此字段
            // @ts-ignore 隐式索引
            finalOptions[key] = config;
        }
    }
};exports.otherFieldsHandle = otherFieldsHandle
//# sourceMappingURL=otherFieldsHandle.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543981, function(require, module, exports) {
/**
 * 把配置为函数的字段方法收集到funcOptions中
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function sameFuncFieldsCollect(options, funcOptions) {
    var _a;
    let key;
    for (key in funcOptions) {
        const optionsKeyConfig = options[key];
        if (optionsKeyConfig) {
            for (const _key in optionsKeyConfig) {
                // @ts-ignore
                ((_a = funcOptions[key])[_key] || (_a[_key] = [])).push(optionsKeyConfig[_key]);
            }
        }
    }
};exports.sameFuncFieldsCollect = sameFuncFieldsCollect
//# sourceMappingURL=sameFuncFieldsCollect.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543982, function(require, module, exports) {
var __TEMP__ = require('../../../utils/isEmptyObject');var isEmptyObject = __TEMP__['isEmptyObject'];
/**
 * 把函数配置放入一个配置中依次运行
 */
function _sameFuncOptionsHandle(config, configList) {
    for (const key in configList) {
        // @ts-ignore 隐式索引
        config[key] = function (...args) {
            configList[key].forEach(ele => ele.call(this, ...args));
        };
    }
}
/**
 * 把函数列表配置放入一个配置中循环依次运行
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function sameFuncOptionsHandle(finalOptionsForComponent, isPage, funcOptions) {
    if (isPage) {
        // 页面时 生命周期方法(即 on 开头的方法),(https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/component.html)
        if (!isEmptyObject(funcOptions.pageLifetimes)) {
            _sameFuncOptionsHandle(finalOptionsForComponent.methods, funcOptions.pageLifetimes);
        }
    }
    else {
        // 组件时
        if (!isEmptyObject(funcOptions.pageLifetimes)) {
            _sameFuncOptionsHandle(finalOptionsForComponent.pageLifetimes, funcOptions.pageLifetimes);
        }
    }
    if (funcOptions.lifetimes)
        _sameFuncOptionsHandle(finalOptionsForComponent.lifetimes || (finalOptionsForComponent.lifetimes = {}), funcOptions.lifetimes);
    if (funcOptions.watch)
        _sameFuncOptionsHandle(finalOptionsForComponent.watch || (finalOptionsForComponent.watch = {}), funcOptions.watch);
};exports.sameFuncOptionsHandle = sameFuncOptionsHandle
//# sourceMappingURL=sameFuncOptionsHandle.js.map
}, function(modId) { var map = {"../../../utils/isEmptyObject":1723424543959}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543983, function(require, module, exports) {
var __TEMP__ = require('./otherFieldsHandle');var otherFieldsHandle = __TEMP__['otherFieldsHandle'];
var __TEMP__ = require('./sameFuncFieldsCollect');var sameFuncFieldsCollect = __TEMP__['sameFuncFieldsCollect'];
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function subComponentsOptionHandle(componentOptions, subComponents, funcOptions) {
    subComponents.forEach((subOption) => {
        if (subOption.events)
            Object.assign(componentOptions.methods, subOption.events);
        sameFuncFieldsCollect(subOption, funcOptions);
        otherFieldsHandle(componentOptions, subOption);
    });
};exports.subComponentsOptionHandle = subComponentsOptionHandle
//# sourceMappingURL=subComponentsOptionHandle.js.map
}, function(modId) { var map = {"./otherFieldsHandle":1723424543980,"./sameFuncFieldsCollect":1723424543981}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543984, function(require, module, exports) {
var __TEMP__ = require('../utils/InnerMarker');var INNERMARKER = __TEMP__['INNERMARKER'];
/**
 *  对象中可以使用 `"; / ? : @ & = + $ `, #"做为数据的一部分
 */
function _encodeURIComponent(option) {
    const result = {
        url: `${option.url}?${INNERMARKER.url}=${encodeURIComponent(JSON.stringify(option.data))}`,
    };
    Reflect.deleteProperty(option, "url");
    Reflect.deleteProperty(option, "data");
    return Object.assign(result, option);
}
/**
 * 页面onload参数中接受的数据值是传递的url解析后的字符串。例如:A页面通过`wx.navigateTo({url:'/pages/test/test?num=123&obj={"name":"zhao"}'})`
 * test页面onLoad(data)的参数data接受内容为` data = {num:"123",obj:"{"name":"zhao"}"}`即默认的url传的数据值为字符串,需要在接收时自行解析(JSON.parse)。且url采取ASCII编码只能接受0x20-0x7e区间的符号。无法使用一些特殊符号 如 ` :/?#[]@!$&'()*+,;= `。
 * navigateTo API 为 wx.navigateTo的语法糖,增加了data字段,最终的url数据拼接了通过encodeURIComponent编码(支持默认忽略的特殊符号)的data字段,在跳转页面的onload中通过decodeURIComponent解析url赋值给实例的data对象。为求使用时更加方便(无需对参数data解析再赋值)。且有ts类型提示。
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function navigateTo(option) {
    // @ts-ignore 隐式索引
    if (!option.data) {
        return wx.navigateTo(option);
    }
    else {
        return wx.navigateTo(_encodeURIComponent(option));
    }
};exports.navigateTo = navigateTo
//# sourceMappingURL=navigateTo.js.map
}, function(modId) { var map = {"../utils/InnerMarker":1723424543973}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543985, function(require, module, exports) {
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function RootComponent() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (options) => options;
};exports.RootComponent = RootComponent
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1723424543986, function(require, module, exports) {
/**
 * 子组件构建函数
 * @returns `(options:) => SubComponentDoc`
 */
if (!exports.__esModule) Object.defineProperty(exports, "__esModule", { value: true });function SubComponent() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return ((options) => options);
};exports.SubComponent = SubComponent
//# sourceMappingURL=index.js.map
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1723424543953);
})()
//miniprogram-npm-outsideDeps=["mobx"]
//# sourceMappingURL=index.js.map