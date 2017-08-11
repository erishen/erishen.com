/**
 * Created by lei_sun on 2017/8/11.
 */
const utilIndex = require('./utils/index');

// 后端 EJS 模板渲染页面
exports.index = function(app){
    // 使用 EJS 模板
    app.engine('.html', require('ejs').__express);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');

    app.get('/ejs', (req, res) => {
        var links = ['seo'];
        var content = utilIndex.getLinks('ejs', links);
        res.send(content);
    });

    // SEO 页面
    app.get('/ejs/seo', (req, res) => {
        res.render('seo', { title: 'SEO' });
    });

    app.get('/ejs/seo/*', (req, res) => {
        res.render('seo', { title: 'SEO' });
    });
};