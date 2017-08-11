/**
 * Created by lei_sun on 2017/8/11.
 */
const utilIndex = require('./utils/index');

exports.index = function(app){
    app.get('/data', (req, res) => {
        var links = ['json'];
        var content = utilIndex.getLinks('data', links);
        res.send(content);
    });

    // 后端 JSON 数据接口
    app.get('/data/json', (req, res) => {
        res.send(JSON.stringify({ message: "Hello, World" }));
    });

    app.get('/data/json/*', (req, res) => {
        res.send(JSON.stringify({ message: "Hello, World" }));
    });
};