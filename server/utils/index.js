/**
 * Created by lei_sun on 2017/8/11.
 */
const logger = require('../../build/lib/logger');

exports.getLinks = function(prefix, links){
    var content = [];
    var linksLen = links.length;
    logger.info('getLinks', prefix, links);

    for(var i = 0; i < linksLen; i++)
    {
        var link = links[i];
        var str = '<p><a href="/' + prefix + '/' + link + '">' + link + '</a></p>';
        content.push(str);
    }
    logger.info('content', content);
    return content.join('');
};
