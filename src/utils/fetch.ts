import nodeFetch from 'node-fetch';
import HttpsProxyAgent from 'https-proxy-agent';
import SocksProxyAgent from 'socks-proxy-agent';

export type ProxyType = 'HTTP' | 'HTTPS' | 'SOCKS4' | 'SOCKS5';

export interface ProxyConfig {
  proxy: string;
  proxyType: ProxyType;
}

function createProxyAgent(proxyConfig: ProxyConfig) {
  const { proxy, proxyType } = proxyConfig;
  
  if (proxyType === 'SOCKS4' || proxyType === 'SOCKS5') {
    return new (SocksProxyAgent as any)({
      proxy: proxy,
      type: proxyType === 'SOCKS5' ? 5 : 4
    });
  }
  
  return new (HttpsProxyAgent as any)(proxy);
}

export function createProxiedFetch(proxyConfig: ProxyConfig | undefined): typeof nodeFetch {
  if (!proxyConfig) {
    return nodeFetch;
  }
  
  const agent = createProxyAgent(proxyConfig);
  
  return ((url: string, options: any = {}) => {
    return nodeFetch(url, {
      ...options,
      agent
    });
  }) as typeof nodeFetch;
}

const fetch = nodeFetch;

export default fetch;