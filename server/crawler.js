/**
 * Created by lei_sun on 2017/8/11.
 */
const logger = require('../build/lib/logger')
const utilIndex = require('./utils/index');
const superagent = require('superagent');
const cheerio = require('cheerio');

exports.index = function(app){
    app.get('/crawler', (req, res) => {
        var links = ['cnodejs', 'cnodejs2'];
        var content = utilIndex.getLinks('crawler', links);
        res.send(content);
    });

    // 爬取 https://cnodejs.org 的内容
    app.get('/crawler/cnodejs', (req, res) => {
        var url = 'https://cnodejs.org';
        superagent.get(url).end((err, sres)=>{
            //logger.info(err, sres);
            if(err)
            {
                res.send(err);
                return;
            }

            var $ = cheerio.load(sres.text);
            var items = [];
            $('#topic_list .topic_title').each((idx, element) => {
                var $element = $(element);
                items.push({
                    title: $element.attr('title'),
                    href: $element.attr('href')
                });
            });

            var content = [];
            var itemsLen = items.length;
            for(var i = 0; i < itemsLen; i++)
            {
                var itemObj = items[i];
                var title = itemObj.title;
                var href = url + itemObj.href;
                content.push('<p><a href="' + href + '" target="_blank">' + title + '</a></p>');
            }
            res.send(content.join(''));
        });
    });

    app.get('/crawler/cnodejs2', (req, res) => {
        res.send('cnodejs2');
    });
};