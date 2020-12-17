function isArray(val){
    return Object.prototype.toString.call(val) == '[object Array]';
}
function isObject(val){
    return typeof val == 'object' && val != null;
}

function deepCopy(obj){
    var newObj = isArray(obj) ? [] : {};
    for(var attr in obj){
        if(isObject(obj[attr])){
            newObj[attr] = deepCopy(obj[attr]);
        }else{
            newObj[attr] = obj[attr];
        }
    }
    return newObj;
}

function deepMerge(obj1, obj2){
    var obj = deepCopy(obj1);
    for(var attr in obj2){
        var val = obj[attr];
        var val2 = obj2[attr];
        if(isObject(val) && isObject(val2)){
            obj[attr] = deepMerge(val, val2);
        }else if(isObject(val2)){
            obj[attr] = deepCopy(val2)
        }else{
            obj[attr] = obj2[attr]
        }
    }
    return obj;
}

function mergeConfig(config1, config2){
    var config = deepCopy(config1);
    var proper1 = ['url','method','data','params'];
    for(var proper in config2){
        if(proper1.indexOf(proper) != -1){
            config[proper] = config2[proper]
        }else{
            if(isObject(config2[proper])){
                config[proper] = deepMerge(config[proper], config2[proper]);
            }else{
                config[proper] = config2[proper]
            }
        }
    }
    return config;
}   

function bind(fn, context){
    return function(){
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i])
        }
        return fn.apply(context,args);
    }
}

function extend(fn, pro, ext){
    for(var attr in pro){
        if(typeof pro[attr] === 'function'){
            fn[attr] = bind(pro[attr], ext);
        }else{
            fn[attr] = pro[attr]
        }
    }
}
export default {
    isArray,
    isObject,
    deepCopy,
    deepMerge,
    mergeConfig,
    bind,
    extend
}

