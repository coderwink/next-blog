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
    let apiUrl = 'http://localhost:3000' + process.env.NEXT_PUBLIC_BASE_API + path;
    // 对参数进行拼接
    if (args.method?.toLocaleLowerCase() === 'get' && args.hasOwnProperty('query')) {
      console.log("存在参数，进行一个处理");
    }
    return new Request(apiUrl, args)
  }

  public async get<T>(
    path: string,
    args: RequestInitData = { method: "get" }
  ): Promise<HttpResponse<API.Result<T>>> {
    // 判断一下是否存在

    return await this.http<T>(this.createRequest<T>(path, args));
  };

  public async post<T>(
    path: string,
    body: any,
    args: RequestInit = { method: "post", body: JSON.stringify(body) }
  ): Promise<HttpResponse<T>> {
    return await this.http<T>(new Request(path, args));
  };

  public async put<T>(
    path: string,
    body: any,
    args: RequestInit = { method: "put", body: JSON.stringify(body) }
  ): Promise<HttpResponse<T>> {
    return await this.http<T>(new Request(path, args));
  };


}
export default Http