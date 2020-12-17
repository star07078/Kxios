function InterceptorManager(){
    this.handlers = [];
}

InterceptorManager.prototype.use = function(res, rej){
    this.handlers.push({
        reslove: res,
        reject: rej
    })
}

export default InterceptorManager;