myPager.addTask('pages', {

  openDir: undefined,
  init: function (pageId, pageContent, event, dom, scope) {

    var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/tmpl');

    return function () {

      helper.renderDirs( list, document.getElementById('editor.pages.files'), '', true, ['pages.open','pages.showDir'], ['tpl','html'] );

      _globals.tabPages.webview = document.getElementById('editor.pages.preview.webview');

      require('codemirror/mode/xml/xml');
      require('codemirror/mode/javascript/javascript');
      require('codemirror/mode/css/css');
      require('codemirror/mode/htmlmixed/htmlmixed');

      var CodeMirror = require('codemirror/lib/codemirror');

      _globals.tabPages.editor = CodeMirror.fromTextArea(document.getElementById('editor.pages.content.editor'), {
        lineNumbers: true,
        theme: 'crisper',
        mode: 'text/html'
      });

      _globals.tabPages.editor.on('change', function (cm) {
        document.getElementById('editor.pages.save').classList.remove('disable');
         myTaskHelper.saveFile(rootPath+'/pagesTemp.html', cm.getValue(), function (path) {

           _globals.tabPages.webview.loadURL('file://'+path);

           _globals.tabPages.webview.addEventListener('dom-ready', function () {
             for (var i = 0; i < _globals.tabIndex.cssFiles.length; i++) {
               var data = myTaskHelper.getFile(_globals.appActive.data.localPath+'/www/'+_globals.tabIndex.cssFiles[i]);
               _globals.tabPages.webview.insertCSS(data+'');
               _globals.tabPages.webview.openDevTools();
             }
           });

           //document.getElementById('editor.pages.preview.frame_1').src = 'file://'+path;
         });
      });

      console.log(_preview);
      _preview.init();

      myTaskHelper.editorSwitchTab(event.target);

    }
  },
  showDir: function (pageId, pageContent, event, dom, scope) {

    if (!pageContent) {
      return false;
    }
    scope.openDir = pageContent;

    var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/tmpl/'+pageContent);

    if (!event.target.nextSibling || !event.target.nextSibling.classList.contains('childNode')) {
      var child = document.createElement('ul');
      child.className = 'childNode';
      event.target.parentNode.insertBefore(child, event.target.nextSibling);
    } else {
      child = event.target.nextSibling
    }

    helper.renderDirs( list, child, pageContent+'/', true, ['pages.open','pages.showDir'], ['tpl','html'] );

    myPager.events();

    myTaskHelper.setActive('editor.pages.files', 'active');

    return false;

  },
  open: function (pageId, pageContent, event, dom, scope) {

    if (!pageContent) {
      return false;
    }

    var data = myTaskHelper.getFile(_globals.appActive.data.localPath+'/www/tmpl/'+pageContent);

    if (!data) {
      return false;
    }
    _globals.tabPages.path = _globals.appActive.data.localPath+'/www/tmpl/'+pageContent;
    _globals.tabPages.editor.setValue(data+'');

    myTaskHelper.setActive('editor.pages.files', 'active');

    document.getElementById('editor.pages.save').classList.add('disable');





    return false;

  },
  newFile: function (pageId, pageContent, event, dom, scope) {

    var myDialog = new cDialog({
      type: 'input',
      autoOpen: true,
      confirm: {
        text: 'Ok',
        handler: function (value, e) {

          if (!value) {
            return false;
          }
          if (scope.openDir) {
            value = scope.openDir+'/'+value;
          }
          myTaskHelper.saveFile(_globals.appActive.data.localPath+'/www/tmpl/'+value+'.tpl', '', function () {

            var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/tmpl');
            helper.renderDirs( list, document.getElementById('editor.pages.files'), '', true, ['pages.open','pages.showDir'], ['tpl','html'] );

            myPager.events();

          });
        }
      },
      abort: {
        text: 'Abort',
        handler: function (e) {
          //console.log('Abort! done');
          return false;
        }
      }
    });

    return false;
    //var path = document.getElementById('editor.pages.files.new').value;


  },
  newFolder: function (pageId, pageContent, event, dom, scope) {

    var myDialog = new cDialog({
      type: 'input',
      autoOpen: true,
      confirm: {
        text: 'Ok',
        handler: function (value, e) {

          if (!value) {
            return false;
          }
          if (scope.openDir) {
            value = scope.openDir+'/'+value;
          }
          helper.makeFolder(_globals.appActive.data.localPath+'/www/tmpl/'+value, function () {

            var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/tmpl');
            helper.renderDirs( list, document.getElementById('editor.pages.files'), '', true, ['pages.open','pages.showDir'], ['tpl','html'] );

            myPager.events();

          });
        }
      },
      abort: {
        text: 'Abort',
        handler: function (e) {
          //console.log('Abort! done');
          return false;
        }
      }
    });

    return false;



  },
  save: function (pageId, pageContent, event, dom) {

    myTaskHelper.saveFile(_globals.tabPages.path, _globals.tabPages.editor.getValue(), function () {
      document.getElementById('editor.pages.save').classList.add('disable');
    });

  }

});
