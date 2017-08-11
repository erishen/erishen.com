/**
 * Created by lei_sun on 2017/7/27.
 */

// 1 => TEST, 2 => PRO
const environment = 1;

// TEST 环境变量
const TEST_URL_PREFIX = '';
const TEST_LOGIN_URL = '';
const TEST_HEAD_EXTENSION_UID = '';

// PRO 环境变量
const PRO_URL_PREFIX = '';
const PRO_LOGIN_URL = '';
const PRO_HEAD_EXTENSION_UID = '';

var uid = TEST_HEAD_EXTENSION_UID;
if(environment == 2)
  uid = PRO_HEAD_EXTENSION_UID;

// 服务端需要传递的 head obj
var HEAD_OBJ = {};

// 处理后端接口返回值
var handleResponse = function(response){
  console.log('request succeeded with JSON response', response);
  if(response)
  {
      return response;
  }
  return null;
};

// 处理后端接口出错情况
var handleError = function(error){
  console.log('request failed', error);
  return true;
};

// 使用 whatwg-fetch 获取后端接口数据
exports.fetch = function(url, data, sucCallback, errCallback){
  console.log('fetch', url, data);

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  }

  function parseJSON(response) {
    console.log('parseJSON', response);
    return response.json();
  }

  var urlPrefix = TEST_URL_PREFIX;
  if(environment == 2)
    urlPrefix = PRO_URL_PREFIX;

  var newUrl = urlPrefix + url;
  var newData = {
    HEAD_OBJ,
    ...data
  };

  window.fetch(newUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Cache-Control": "no-cache"
    },
    credentials: 'include',
    body: JSON.stringify(newData)
  }).then(checkStatus)
    .then(parseJSON)
    .then(function(response) {
      var result = handleResponse(response);
      return sucCallback && sucCallback(result);
    }).catch(function(error) {
      if(handleError(error))
      {
        return errCallback && errCallback(error);
      }
  })
};

// 使用 jquery.ajax 获取后端接口数据
exports.ajax = function(url, data, sucCallback, errCallback){
  console.log('ajax', url, data);

  var urlPrefix = TEST_URL_PREFIX;
  if(environment == 2)
    urlPrefix = PRO_URL_PREFIX;

  var newUrl = urlPrefix + url;
  var newData = {
    HEAD_OBJ,
    ...data
  };

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": newUrl,
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "cache-control": "no-cache"
    },
    "processData": false,
    "data": JSON.stringify(newData)
  }

  $.ajax(settings).done(function (response) {
    var result = handleResponse(response);
    return sucCallback && sucCallback(result);
  }).fail(function(error){
    if(handleError(error))
    {
      return errCallback && errCallback(error);
    }
  });
};
