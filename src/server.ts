// 读取配置的环境变量
import dotenv from 'dotenv'
dotenv.config()

// 编译后的绝对路径映射插件
import 'module-alias/register'
// 配置文件
import { serverConfig } from '@/config'

// diy module 自建模块
import FW from './lib/server'

// routes
import routes from './routes'

// 允许跨域访问的源
const allowOrigins = ['http://localhost:8088', 'https://ep.sugarat.top', 'https://ep.dev.sugarat.top']

const app = new FW((req, res) => {
    const { method } = req
    if (allowOrigins.includes(req.headers.origin)) {
        // 允许跨域
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
    }
    //跨域允许的header类型
    res.setHeader('Access-Control-Allow-Headers', '*')
    // 允许跨域携带cookie
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    // 允许的方法
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    // 设置响应头
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    // 对预检请求放行
    if (method === 'OPTIONS') {
        res.end()
        // 表示处理结束，内部不再处理这个请求
        return true
    }
})

// 注册路由
app.addRoutes(routes)

app.listen(serverConfig.port, serverConfig.hostname, () => {
    console.log('-----', new Date().toLocaleString(), '-----')
    console.log('server start success', `http://${serverConfig.hostname}:${serverConfig.port}`)
})
