import nodeFetch from 'node-fetch';
export type ProxyType = 'HTTP' | 'HTTPS' | 'SOCKS4' | 'SOCKS5';
export interface ProxyConfig {
    proxy: string;
    proxyType: ProxyType;
}
export declare function createProxiedFetch(proxyConfig: ProxyConfig | undefined): typeof nodeFetch;
declare const fetch: typeof nodeFetch;
export default fetch;
//# sourceMappingURL=fetch.d.ts.map