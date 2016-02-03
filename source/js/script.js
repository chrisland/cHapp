
var remote = require('remote');
var BrowserWindow = remote.require('browser-window');

var rootPath = process.cwd();

setDb();

var myPager = new cPager({
    container: 'page',
    start: 'apps',
    startTask: 'appsList',
    offButton: 'disable',
    preCache: [
      'apps','app','editor','editor/appjs','editor/config','editor/icons','editor/index','editor/pages',
      'editor/plugins','editor/splash','editor/style','editor/tasks'
    ],
    tasks: myTask
});


function setDb() {

  var db = new cStorage('apps');
  if ( db.isEmpty() ) {
    db.save({data:[]});
  }

}


// var remote = require('remote');
//
// var BrowserWindow = remote.require('browser-window');
//
// console.log(BrowserWindow);
//
// var params = {toolbar: false, resizable: false, show: true, height: 150, width: 400};
//
// aboutWindow = new BrowserWindow(params);
// aboutWindow.loadUrl('file://' + __dirname + '/tmpl/home.html');
