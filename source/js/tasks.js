
var _globals = {
  appActive: {
    data: undefined,
    cssFiles: []
  },
  tabPages: {
    webview: undefined,
    editor: undefined,
    path: undefined
  }
};

var myTask = {

  appsList: function (pageId, pageContent, event, dom) {

      var db = new cStorage('apps');
      var data = db.root('data').get();

      return function () {


          data.map(function (obj, key, value) {

            var parent = document.createElement('li');

            var child = document.createElement('div');
            child.innerHTML = obj.name;
            child.className = 'pageBtn';
            child.setAttribute('data-page', 'editor');
            child.setAttribute('data-task', 'appOpen');
            child.setAttribute('data-content', obj.id);
            parent.appendChild(child);

            var child = document.createElement('div');
            child.innerHTML = 'serve';
            child.className = 'pageBtn';
            child.setAttribute('data-task', 'appServe');
            child.setAttribute('data-content', obj.id);
            parent.appendChild(child);

            var child = document.createElement('div');
            child.innerHTML = 'settings';
            child.className = 'pageBtn';
            child.setAttribute('data-page', 'app');
            child.setAttribute('data-task', 'appEdit');
            child.setAttribute('data-content', obj.id);
            parent.appendChild(child);

            document.getElementById('apps.list').appendChild(parent);

          });

      };
  },
  appOpen: function (pageId, pageContent, event, dom) {

    //console.log('openApp: '+pageContent);

    var db = new cStorage('apps');
    var data = db.root('data').find({id: pageContent}).get();

    if (!data || !data.name || !data.localPath) {
      return false;
    }
    //console.log(data);

    _globals.appActive.data = data;

    var fs = require('fs');
    var exist = fs.existsSync(data.localPath+'/cHapp.json');
    if (!exist) {
      throw new Error("notif: missing folder / cHapp Project");
      return false
    }
    var json = fs.readFileSync(data.localPath+'/cHapp.json');
    if (json) {
      json = JSON.parse(json);
    }
    if (!json || !json.version) {
      throw new Error("notif: missing cHapp Project config file");
      return false
    }


    return function () {
      //console.log('myTask after');

      document.getElementById('editor.appname').innerHTML = data.name;
      myPager.switch('editor/home', 'editorTabHome', '', {container: 'editor.content'});

    };

  },
  appChooseFolder: function (pageId, pageContent, event, dom) {

    const dialog = remote.require('dialog')
    var path = dialog.showOpenDialog({ properties: [ 'openDirectory', 'createDirectory' ]});
    if (path) {
       document.getElementById('appLocalPath').value = path;
    }
    return false;

  },
  appEdit: function (pageId, pageContent, event, dom) {

    var db = new cStorage('apps');
    var data = db.root('data').find({id: pageContent}).get();

    if (!data || !data.name) {
      return false;
    }

    return function () {

      var form = new cForm('formApp');
      form.setValues(data);

      var nodes = document.getElementsByClassName('noEdit');
      for (var i = nodes.length-1; i >= 0; i--) {
        nodes[i].style.display = 'none';
      }

    }

  },
  appSave: function (pageId, pageContent, event, dom) {

    var db = new cStorage('apps').root('data');

    var form = new cForm('formApp');
    var valide = form.validate({
      required: 'invalide'
    });
    if (valide != true) {
      return false;
    }
    var obj = form.getValues();

    //console.log(obj);

    var myOverlay = new cOverlay({
      size: 5,
      root: './assets/img',
      file: 'spinner_gears.svg'
    }).show();

    //console.log(obj);




    //console.log(data.zipball_url);

    var downloadZip = function(name, url, zipfile, folder, callback ) {

      var AdmZip = require('adm-zip');
      var http = require('http');
      var fs = require('fs');

			var tmpFilePath = 'tmp.zip';
      var file = zipfile+'.zip';

			http.get(url+file, function(response) {
		 		response.on('data', function (data) {
		 			fs.appendFileSync(tmpFilePath, data)
				});
		 		response.on('end', function() {
		 			 var zip = new AdmZip(tmpFilePath)
		 			 zip.extractAllTo(folder, false);
           name = name.replace(/[^\w\s]/gi, '').replace(/ /gi,'-');
           fs.rename(folder+'/'+zipfile, folder+'/'+name);
		 			 fs.unlink(tmpFilePath)

           if (callback && typeof callback === 'function') {
             callback(name);
           }
			 	})
		 	});
		};

    if (!obj.id) {

      var linkVersion = '0.0.2'
      var linkZip = 'http://chrisland.de/cHapp-apps/'+linkVersion+'/';
      var linkFile = 'cHapp-app-'+obj.appVersion+'-'+linkVersion;

      downloadZip(obj.name, linkZip, linkFile, obj.localPath+'/', function (name) {

        obj.localPath = obj.localPath+'/'+name;
        obj.id = db.getUid('id');

        db.add(obj);
        myPager.switch('apps', 'appsList');
        myOverlay.destroy();

      });



    } else {

      db.find({id: obj.id}).edit(obj);
      myPager.switch('apps', 'appsList');
      myOverlay.destroy();


    }






    //console.log(obj);

  },

  appServe: function (pageId, pageContent, event, dom) {

    var db = new cStorage('apps');
    var data = db.root('data').find({id: pageContent}).get();

    if (!data || !data.name) {
      return false;
    }

    //console.log(pageContent, data.localPath);

    var shelljs = require('shelljs');
    shelljs.cd(data.localPath);
    shelljs.exec('phonegap serve', function(code, stdout, stderr) {
      console.log('Exit code:', code);
      console.log('Program output:', stdout);
      console.log('Program stderr:', stderr);
    });

  },

  editorClose: function (pageId, pageContent, event, dom) {

    myPager.switch('apps', 'appsList');

  },

  editorTabHome: function (pageId, pageContent, event, dom) {

    var data = myTaskHelper.getFile(_globals.appActive.data.localPath+'/www/index.html');
    var htmlparser = require("htmlparser");
    var handler = new htmlparser.DefaultHandler(function (error, dom) {
      if (error) {
        console.log(error);
      } else {
        myTaskHelper.findInHtmlObject(dom, 'tag', 'link', function (result) {
          //console.log(result);
          if (result && result.attribs.href) {
            _globals.appActive.cssFiles.push(result.attribs.href);
          }
        });
      }
    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(data);

  },

  editorTabPages: function (pageId, pageContent, event, dom) {

    var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/tmpl');
    //console.log(list);

    return function () {

      myTaskHelper.renderDirs( list, document.getElementById('editor.pages.files'), '', true );

      _globals.tabPages.webview = document.getElementById('editor.pages.preview.webview');

      var textarea = document.getElementById('editor.pages.content.editor');
      var CodeMirror = require('CodeMirror');
      _globals.tabPages.editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true
      });

      _globals.tabPages.editor.on('change', function (cm) {
        document.getElementById('editor.pages.save').classList.remove('disable');
         myTaskHelper.saveFile(rootPath+'/pagesTemp.html', cm.getValue(), function (path) {
           _globals.tabPages.webview.loadURL('file://'+path);

           _globals.tabPages.webview.addEventListener('dom-ready', function () {
             for (var i = 0; i < _globals.appActive.cssFiles.length; i++) {
               var data = myTaskHelper.getFile(_globals.appActive.data.localPath+'/www/'+_globals.appActive.cssFiles[i]);
               _globals.tabPages.webview.insertCSS(data+'');
             }
           });
         });
      });

      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabPagesShowDir: function (pageId, pageContent, event, dom) {

    if (!pageContent) {
      return false;
    }

    var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/tmpl/'+pageContent);

    if (!event.target.nextSibling || !event.target.nextSibling.classList.contains('childNode')) {
      var child = document.createElement('ul');
      child.className = 'childNode';
      event.target.parentNode.insertBefore(child, event.target.nextSibling);
    } else {
      child = event.target.nextSibling
    }

    myTaskHelper.renderDirs( list, child, pageContent+'/', true );

    myPager.events();

    myTaskHelper.setActive('editor.pages.files', 'active');

    return false;

  },
  editorTabPagesOpen: function (pageId, pageContent, event, dom) {

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

    return false;

  },
  editorTabPagesNew: function (pageId, pageContent, event, dom) {

    var myDialog = new cDialog({
      type: 'input',
      autoOpen: true,
      confirm: {
        text: 'Ok',
        handler: function (filename, e) {

          if (!filename) {
            return false;
          }

          myTaskHelper.saveFile(_globals.appActive.data.localPath+'/www/tmpl/'+filename+'.tpl', '', function () {

            var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/tmpl');
            myTaskHelper.renderDirs( list, document.getElementById('editor.pages.files'), '', true );

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
  editorTabPagesSave: function (pageId, pageContent, event, dom) {

    myTaskHelper.saveFile(_globals.tabPages.path, _globals.tabPages.editor.getValue(), function () {});

  },

  editorTabConfig: function (pageId, pageContent, event, dom) {

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabIndex: function (pageId, pageContent, event, dom) {

    var data = myTaskHelper.getFile(_globals.appActive.data.localPath+'/www/index.html');

    return function () {

      var textarea = document.getElementById('editor');
      textarea.value = data;

      var CodeMirror = require('CodeMirror');

      var editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true
      });

      myTaskHelper.editorSwitchTab(event.target);
    };

  },
  editorTabIcons: function (pageId, pageContent, event, dom) {

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabSplash: function (pageId, pageContent, event, dom) {

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabPlugins: function (pageId, pageContent, event, dom) {

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabAppjs: function (pageId, pageContent, event, dom) {

    var data = myTaskHelper.getFile(_globals.appActive.data.localPath+'/www/js/app.js');

    //console.log( JSON.parse(data) );



    return function () {

      var textarea = document.getElementById('editor');
      textarea.value = data;

      var CodeMirror = require('CodeMirror');

      var editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true
      });

      myTaskHelper.editorSwitchTab(event.target);
    };

  },
  editorTabStyle: function (pageId, pageContent, event, dom) {

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabTasks: function (pageId, pageContent, event, dom) {

    var data = myTaskHelper.getFile(_globals.appActive.data.localPath+'/www/js/tasks.js');

    //console.log(data);

    //var UglifyJS = require("uglifyjs");
    //var parsed = UglifyJS.parse(data);

    var esprima = require('esprima');
    var parsed = esprima.parse(data);
    //console.log(JSON.stringify(parsed, null, 4));

    console.log(parsed);
    console.log(parsed.body[0].declarations[0].init.callee.body.body[0].declarations[0].init.properties[0].value.body);

    var escodegen = require('escodegen');
    var reparsed = escodegen.generate(parsed.body[0].declarations[0].init.callee.body.body[0].declarations[0].init.properties[0].value.body.body[0]);

    console.log(reparsed);

    return function () {

      var textarea = document.getElementById('editor');
      textarea.value = data;

      var CodeMirror = require('CodeMirror');

      var editor = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true
      });


      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabFiles: function (pageId, pageContent, event, dom) {

    if (!_globals.appActive.data || !_globals.appActive.data.id) {
      return false;
    }

    var list = myTaskHelper.getDir(_globals.appActive.data.localPath);
    console.log(list);

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  }

};



var myTaskHelper = {

  editorSwitchTab: function (target) {

    var menus = document.getElementById('editor.nav').getElementsByClassName('pageBtn active');
    for (var i = menus.length - 1; i >= 0; i--) {
      menus[i].classList.remove('active');
    }

    target.classList.add('active');
  },
  niceSize: function (size) {

  	if (isNaN(size)) {
  		return false;
  	}
  	var kb = Math.round(size/1000);

  	if ( parseInt(kb) < 1) {
  		return size+' Byte';
  	} else if ( kb > 1000) {
  		return Math.round(kb/1000)+' MB';
  	} else {
  		return kb+' KB';
  	}


  },
  getFile: function (path) {

    var fs = require('fs');

    var data = fs.readFileSync(path);

    if (!data) {
      return false;
    }
    return data;

  },
  getDir: function (path) {

    var fs = require('fs');

    var data = fs.readdirSync(path);
    if (!data) {
      return false;
    }
    //console.log('local getDir', data);
    var ret = [];
    for (var i in data) {
      var stats = fs.statSync(path+'/'+data[i]);
      stats.name = data[i];
      stats.chmod = '';

      if (stats.size) {
        stats.size = myTaskHelper.niceSize(stats.size);
      } else {
        stats.size = 0;
      }
      var time = new Date(stats.ctime+'');
      stats.time = time.toLocaleString();

      if (stats.isDirectory()) {
        stats.ext = 'dir';
        stats.size = '-';
      } else {
        stats.ext = stats.name.split('.').pop().toLowerCase();
      }

      ret.push(stats);
      //console.log('stats',stats);
    }

    return ret;

  },
  renderDirs: function (list, node, parentPath, clean) {

    if (!list || !node) {
      return false;
    }
    console.log(list, node, parentPath, clean);
    if (!parentPath) {
      parentPath = '';
    }
    if (clean) {
      node.innerHTML = '';
    }

    for ( var i = 0; i < list.length; i++) {
      var parent = false;
      if (list[i].ext == 'tpl' || list[i].ext == 'html') {

        parent = document.createElement('li');

        var child = document.createElement('div');
        child.innerHTML = list[i].name;
        child.className = 'pageBtn';
        //child.setAttribute('data-page', 'editor');
        child.setAttribute('data-task', 'editorTabPagesOpen');
        child.setAttribute('data-content', parentPath+list[i].name);
        parent.appendChild(child);

      } else if (list[i].ext == 'dir') {

        parent = document.createElement('li');

        var child = document.createElement('div');
        child.innerHTML = list[i].name;
        child.className = 'pageBtn';
        //child.setAttribute('data-page', 'editor');
        child.setAttribute('data-task', 'editorTabPagesShowDir');
        child.setAttribute('data-content', parentPath+list[i].name);
        parent.appendChild(child);

      }

      if (parent) {
        node.appendChild(parent);
      }

    }

  },
  saveFile: function (file, content, callback) {

    var fs = require('fs');
    fs.writeFile(file, content, function(err) {
        if(err) {
            return console.log(err);
        }
        //console.log("The file was saved!");
        if (callback && typeof callback === 'function') {
          callback(file);
        }
    });

  },
  findInHtmlObject: function (obj, type, name, callback) {

    if (!obj || !type || !name) {
      return false;
    }
    for( var a = 0; a < obj.length; a++ ) {

      if(obj[a].type == type && obj[a].name == name) {
        //console.log('-found! ',obj[a]);
        if (callback && typeof callback === 'function') {
          callback(obj[a]);
        }
      }

      if (obj[a].children) {
        myTaskHelper.findInHtmlObject(obj[a].children, type, name, callback);
      }
    }

  },
  setActive: function (id, activeClass) {

    if (!id || !activeClass) {
      return false;
    }
    var menus = document.getElementById(id).getElementsByClassName(activeClass);
    for (var i = menus.length - 1; i >= 0; i--) {
      menus[i].classList.remove(activeClass);
    }
    event.target.classList.add(activeClass);

  }

};
