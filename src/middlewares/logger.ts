import path from 'path'
import log4js from 'log4js'

// 配置log4js
const layout = {
	type: 'pattern',
	pattern: '%d{yyyy-MM-dd hh:mm:ss.SSS} [%p] %m'
}

log4js.configure({
	appenders: {
		// 控制台输出
		console: { type: 'console' },
		// 日志文件
		file: { type: 'file', filename: path.join(__dirname, '../logs/server.log'), layout}
	},
	categories: {
		// 默认日志
		default: { appenders: [ 'file', 'console' ], level: 'debug' },
	}
})

// 获取默认日志
export const logger = log4js.getLogger()

