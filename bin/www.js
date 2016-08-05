var then = require('thenjs');

var app = require('../src/server/app');

then(function (defer) {
  app.listen(3100, defer);
}).then(function () {

  console.log('ims server started localhost:3100');
}).fail(function (defer, err) {
  console.log(err);
});
