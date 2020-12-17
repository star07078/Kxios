import defaultConfig from './defaultConfig.js';
import utils from './utils.js';
import Kxios from './kxios.js';

function createInstance(){
    var context = new Kxios();
    // console.log(context)
    var instance = utils.bind(Kxios.prototype.request, context);
    // console.log(Kxios.prototype.request)
    // console.log(instance)
    // 把kxios上的函数和属性都赋给instance
    utils.extend(instance, Kxios.prototype, context);
    utils.extend(instance, context);
    
    return instance;
}
var kxios = createInstance(defaultConfig);

// console.log(kxios)

export default kxios;