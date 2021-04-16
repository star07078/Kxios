const express = require('express');

const app = express();

let a = 10;
let b = 20;


app.get('/list',async (req, res)=>{
    console.log(3)
    res.header('Access-Control-Allow-Origin', '*')
    res.send({
        x: 1, y: 2
    })
})
app.get('/login',async (req, res)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.send({
        err: 0,
        data: '登录成功'
    })
})

app.listen(3000,()=>{console.log('服务器启动')})
