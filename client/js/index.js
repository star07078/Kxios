// import Kxios from './kxios/kxios.js'
import kxios from './kxios/index.js'


kxios({
    url: 'http://localhost:3000/list',
    method: 'get'
})
.then(function(data){
    console.log(data)
    return data
})
