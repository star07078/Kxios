
import InterceptorManager from './InterceptorManager.js'
import utils from './utils.js'

function Kxios(config){
    // 初始化配置
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    }
    this.config = config;
}
// 拦截器的调用
// this.interceptors.request.use()
Kxios.prototype.request = function(config){
    // 请求需要的配置s
    // 合并后的参数
    var config = utils.mergeConfig(this.config, config);

    // 调用链 
    var chain = [this.dispatchRequest, undefined];

    // 循环取出请求拦截器内注册的所有函数
    var requestHandlers = this.interceptors.request.handlers;
    var requestHandlersLen = requestHandlers.length;
    for(var i=0; i<requestHandlersLen; i++){
        chain.unshift(requestHandlers[i].reslove, requestHandlers[i].reject)
    }
    // 响应拦截器
    var responseHandlers = this.interceptors.response.handlers;
    var responseHandlersLen = responseHandlers.length;
    for(var i=0; i<requestHandlersLen; i++){
        chain.push(responseHandlers[i].reslove, responseHandlers[i].reject)
    }
    
    // 把所有函数挂载在promise的then上面
    var promise = Promise.resolve(config);
    while(chain.length){
                                 // res           rej
        promise = promise.then( chain.shift(), chain.shift() )
    }
    return promise;
    // return this.dispatchRequest(config);
}

Kxios.prototype.dispatchRequest = function(config){
    return new Promise(function(res, rej){
        var xhr = new XMLHttpRequest();
        xhr.open(config.method, config.url, true)
        xhr.send()
        xhr.onload = function(){
            var responseData = {
                data: JSON.parse(this.responseText),
                status: this.status,
                statusText: this.statusText
            }
            res(this.responseText)
        }
    })
}

var method = ['get','delete','head','options'];
for(var i=0; i<method.length; i++){
    (function(i){
        var methodName = method[i];
        Kxios.prototype[methodName] = function(url, config){
            return this.request(utils.deepMerge(config || {},{
                url: url,
                method: methodName
            }))
        }
    }(i))
}

var method2 = ['post','put','patch'];
 for(var i=0; i<method2.length; i++){
      (function(i){
        var methodName = method2[i];
        Kxios.prototype[methodName] = function(url, data, mergeConfig){
            return this.request(utils.deepMerge(config || {},{
                method: methodName,
                url: url,
                data: data
            }))
        }
      }(i))
 }

export default Kxios;