/**
 * Created by lei_sun on 2017/8/11.
 */
const logger = require('../build/lib/logger')
const utilIndex = require('./utils/index');
const superagent = require('superagent');
const cheerio = require('cheerio');

exports.index = function(app){
    app.get('/crawler', (req, res) => {
        var links = ['cnodejs', 'csdn'];
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
            var content = [];
            var index = 0;
            $('#topic_list .topic_title').each((idx, element) => {
                index++;
                var $element = $(element);
                content.push('<p>' + index + '. <a href="' + (url + $element.attr('href')) + '" target="_blank">' + $element.attr('title') + '</a></p>');
            });
            res.send(content.join(''));
        });
    });

    app.get('/crawler/csdn', (req, res) => {
        var url = 'http://www.csdn.net';
        superagent.get(url).end((err, sres)=>{
            if(err)
            {
                res.send(err);
                return;
            }
            var $ = cheerio.load(sres.text);
            var content = [];
            var index = 0;
            $('.news_list li a').each((idx, element) => {
                index++;
                var $element = $(element);
                content.push('<p>' + index + '. <a href="' + $element.attr('href') + '" target="_blank">' + $element.attr('title') + '</a></p>');
            });

            $('.box.flow li h3 a').each((idx, element) => {
                index++;
                var $element = $(element);
                content.push('<p>' + index + '. <a href="' + $element.attr('href') + '" target="_blank">' + $element.attr('title') + '</a></p>');
            });

            res.send(content.join(''));
        });
    });
};