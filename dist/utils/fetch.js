"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxiedFetch = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const https_proxy_agent_1 = __importDefault(require("https-proxy-agent"));
const socks_proxy_agent_1 = __importDefault(require("socks-proxy-agent"));
function createProxyAgent(proxyConfig) {
    const { proxy, proxyType } = proxyConfig;
    if (proxyType === 'SOCKS4' || proxyType === 'SOCKS5') {
        return new socks_proxy_agent_1.default({
            proxy: proxy,
            type: proxyType === 'SOCKS5' ? 5 : 4
        });
    }
    return new https_proxy_agent_1.default(proxy);
}
function createProxiedFetch(proxyConfig) {
    if (!proxyConfig) {
        return node_fetch_1.default;
    }
    const agent = createProxyAgent(proxyConfig);
    return ((url, options = {}) => {
        return (0, node_fetch_1.default)(url, {
            ...options,
            agent
        });
    });
}
exports.createProxiedFetch = createProxiedFetch;
const fetch = node_fetch_1.default;
exports.default = fetch;
