var _ = require('lodash'),
  fs = require('fs'),
  then = require('thenjs'),
  request = require('request'),
  glob = require('glob'),
  pathToRegexp = require('path-to-regexp'),
  router = require('express').Router();
var multer = require('multer');

var upload = multer();
var config = require('../config'),
  routerArray = [],
  allRouterFiles = glob.sync(__dirname + '/**/*.json');

// loop all router config files
allRouterFiles.forEach(function (file) {
  var routerDef = JSON.parse(fs.readFileSync(file));

  if (!Array.isArray(routerDef)) {
    throw new Error(file + ' was not correct');
  }

  routerArray = routerArray.concat(routerDef);
});

// loop all router items
routerArray.forEach(function (routerItem) {


  var url = routerItem.url,
    toPath = pathToRegexp.compile(routerItem.target),
    host = config.api[routerItem.api],
    method = routerItem.method,
    opt = {
      method: method,
      json: true,
      headers: {
        'Accept': 'application/json, text/plain,application/x-www-form-urlencoded, */*',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/36.0.1985.125 Safari/537.36'
      }
    };
  if (!routerItem.file) {
    router[routerItem.method.toLowerCase()](url, handler);
    function handler(req, res) {
      opt.headers['Content-type'] = req.headers['Content-type'];
      opt.url = host + toPath(req.params);
      opt.qs = req.query;
      opt.body = req.body;
      opt['form'] = req.body;
      if (req.get('X-Auth-Token')) {
        opt.headers['X-Auth-Token'] = req.get('X-Auth-Token');
        opt.headers['Cookie'] = req.get('X-Auth-Token')
      }
      then(function (defer) {
        request(opt, defer);
      }).then(function (defer, resp) {
        res.json(resp.body);
      }).fail(function (defer, err) {

        res.json(err);
      });
    }
  } else {
    router[routerItem.method.toLowerCase()](url, upload.single(routerItem.fieldname), fileupload);
    function fileupload(req, res) {
      if (req.get('X-Auth-Token')) {
        opt.headers['X-Auth-Token'] = req.get('X-Auth-Token');
        opt.headers['Cookie'] = req.get('X-Auth-Token')
      }
      opt.headers['Content-type'] = 'multipart/form-data';
      opt.url = host + toPath(req.params);
      then(function (defer) {
        var r= request(opt, defer);
        var form = r.form();
        form.append('name', req.file.fieldname);
        form.append(req.file.fieldname,req.file.buffer, {filename:req.file.originalname});
      }).then(function (defer, resp) {
        res.json(resp.body);
      }).fail(function (defer, err) {
        res.json(err);
      });
    }


  }

});

module.exports = router;
