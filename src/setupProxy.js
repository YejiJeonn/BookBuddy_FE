const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            "proxy": "http://localhost:8080",
            target: 'http://localhost:8080',	// 서버 URL or localhost:설정한포트번호
            changeOrigin: true,
        })
    );
};