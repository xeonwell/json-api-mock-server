/**
 * Created by xeonwell on 2017-02-21.
 */
/**
 * config file
 * @type {{isMockEnabled: boolean, isCacheFile: boolean, isDebug: boolean, successRate: number, proxyOptions: {target: string, changeOrigin: boolean}}}
 */
module.exports = {
  isMockEnabled: true,
  /**
   * 是否缓存读取的json文件
   */
  isCacheFile: false,
  /**
   * 是否debug模式
   */
  isDebug: true,
  /**
   * 接口调用成功几率, 0 ~ 1
   */
  successRate: 1,
  /**
   * 代理地址设置
   */
  proxyOptions: {
    target: process.env.PROXY_TARGET || 'http://localhost:8090',
    changeOrigin: true
  }
}
