// index.ts
interface FetchdefaultConfig {
  baseURL?: string;
  timeout?: number;
}
interface HttpResponse<T> extends Response {
  parsedBody?: T;
}
interface RequestInitData extends RequestInit {
  query?: any
}

class Http {
  // axios 实例
  // 基础配置，url和超时时间
  baseConfig: FetchdefaultConfig = { baseURL: process.env.NEXT_PUBLIC_BASE_API, timeout: 60000 };
  constructor() {
    console.log("环境开始搭建");

    if (process.env.NODE_ENV === 'development') { // 开发环境
      this.baseConfig.baseURL = `http://localhost:${process.env.Port}${process.env.NEXT_PUBLIC_BASE_API}`
    } else { //线上环境
      this.baseConfig.baseURL = `http://43.142.133.70:10000/api`;
    }

    console.log(`环境搭建成功，当前环境:${process.env.NODE_ENV} `);
    console.log(`当前请求api地址:${this.baseConfig.baseURL} `);
  }
  public async http<T>(
    request: RequestInfo
  ): Promise<HttpResponse<API.Result<T>>> {
    const response: HttpResponse<API.Result<T>> = await fetch(
      request
    );
    try {
      // may error if there is no body
      response.parsedBody = await response.json();
    } catch (ex) { }

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response;
  }

  public createRequest<T>(path: string, args: RequestInitData) {

    let apiUrl = this.baseConfig.baseURL + path;
    // 对参数进行拼接
    if (args.method?.toLocaleLowerCase() === 'get' && args.hasOwnProperty('query')) {
      console.log("存在参数，进行一个处理");

      Object.keys(args.query).forEach((key: string, index) => {
        if (index === 0) {
          apiUrl = apiUrl + '?' + key + '=' + args.query[key]
        } else {
          apiUrl = apiUrl + '&' + key + '=' + args.query[key]
        }
      });
    }
    return new Request(apiUrl, args)
  }

  public async get<T>(
    path: string,
    args: RequestInitData = { method: "get" }
  ): Promise<HttpResponse<API.Result<T>>> {
    return await this.http<T>(this.createRequest<T>(path, args));
  };

  public async post<T>(
    path: string,
    body: any,
    args: RequestInit = { method: "post", body: JSON.stringify(body) }
  ): Promise<HttpResponse<API.Result<T>>> {
    return await this.http<T>(this.createRequest<T>(path, args));
  };

  public async put<T>(
    path: string,
    body: any,
    args: RequestInit = { method: "put", body: JSON.stringify(body) }
  ): Promise<HttpResponse<API.Result<T>>> {
    return await this.http<T>(this.createRequest<T>(path, args));
  };

}
export default Http