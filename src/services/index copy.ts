// index.ts
import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
class Request {
  // axios 实例
  instance: AxiosInstance;
  // 基础配置，url和超时时间
  baseConfig: AxiosRequestConfig = { baseURL: process.env.NEXT_PUBLIC_BASE_API, timeout: 60000 };

  constructor(config: AxiosRequestConfig) {
    // 使用axios.create创建axios实例
    this.instance = axios.create(Object.assign(this.baseConfig, config));

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        // 一般会请求拦截里面加token
        // const token = localStorage.getItem("token");
        // config.headers["Authorization"] = token;
        return config;
      },
      (err: any) => {
        return Promise.reject(err);
      }
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        // 直接返回res，当然你也可以只返回res.data
        return res.data;
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        return Promise.reject(err.response);
      }
    );
  }

  // 定义请求方法
  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<API.Result<T>> {
    return this.instance.get(url, config);
  }
  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<API.Result<T>>> {
    return this.instance.post(url, data, config);
  }
  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<API.Result<T>>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<API.Result<T>>> {
    return this.instance.delete(url, config);
  }
}
export default new Request({});