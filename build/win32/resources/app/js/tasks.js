
var _globals = {
  appActive: {
    data: undefined,

  },
  tabPages: {
    webview: undefined,
    editor: undefined,
    path: undefined
  },
  tabTasks: {
    editor: undefined,
    path: undefined
  },
  tabIndex: {
    editor: undefined,
    path: undefined,
    cssFiles: [],
    jsFiles: [],
    jsInline: []
  },
  tabAppjs: {
    editor: undefined,
    path: undefined
  },
  tabStyle: {
    editor: undefined,
    path: undefined
  },
  tabConfig: {
    parse: undefined,
    path: undefined,
    editor: undefined
  },
  tabXml: {
    editor: undefined
  },
  tabPlatform: {
    ios: {
      deactiveCache: undefined
    },
    android: {
      deactiveCache: undefined
    },
    windows: {
      deactiveCache: undefined
    }
  }
};

var myTask = {

  appsList: function (pageId, pageContent, event, dom) {

      var db = new cStorage('apps');
      var data = db.root('data').get();

      return function () {


          data.map(function (obj, key, value) {

            var parent = document.createElement('li');
            parent.className = 'flex border-bottom';

            var child = document.createElement('div');
            child.innerHTML = obj.name;
            child.className = 'pageBtn flex p-left-1 p-top-1 p-bottom-1';
            child.setAttribute('data-page', 'editor');
            child.setAttribute('data-task', 'appOpen');
            child.setAttribute('data-content', obj.id);
            parent.appendChild(child);

            var child = document.createElement('div');
            child.innerHTML = 'serve';
            child.className = 'pageBtn flex p-top-1 p-bottom-1';
            child.setAttribute('data-task', 'serve.start');
            child.setAttribute('data-content', obj.id);
            parent.appendChild(child);

            var child = document.createElement('div');
            child.innerHTML = 'end';
            child.className = 'pageBtn flex p-top-1 p-bottom-1';
            child.setAttribute('data-task', 'serve.end');
            child.setAttribute('data-content', obj.id);
            parent.appendChild(child);

            var child = document.createElement('div');
            child.innerHTML = 'settings';
            child.className = 'pageBtn flex p-top-1 p-bottom-1';
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

    _globals.tabIndex.path = _globals.appActive.data.localPath+'/www/index.html';
    _globals.tabAppjs.path = _globals.appActive.data.localPath+'/www/js/app.js';
    _globals.tabConfig.path = _globals.appActive.data.localPath+'/config.xml';

    _globals.tabConfig.parse = helper.configParse();

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



  editorClose: function (pageId, pageContent, event, dom) {

    myPager.switch('apps', 'appsList');

  },

  editorTabHome: function (pageId, pageContent, event, dom) {

    // TODO: check if all files exist if needed!

    var data = myTaskHelper.getFile(_globals.tabIndex.path);

    var htmlparser = require("htmlparser2");
    var parser = new htmlparser.Parser({
    	onopentag: function(name, attribs){
        //console.log("start:", name, attribs);
    		if(name === "link"){
          if (attribs.href) {
            _globals.tabIndex.cssFiles.push(attribs.href);
          }
    		}
    	},
    	ontext: function(text){
    		//console.log("-->",  text);
    	},
    	onclosetag: function(tagname){
        //console.log("end:",tagname);
    	}
    }, {decodeEntities: true});
    parser.write(data);
    parser.end();

    //console.log(_globals.appActive);

    return true;
  },


  editorTabIndex: function (pageId, pageContent, event, dom) {

    var data = myTaskHelper.getFile(_globals.tabIndex.path);
    if (!data) {
      return false;
    }
    _globals.tabIndex.cssFiles = [];
    _globals.tabIndex.jsFiles = [];
    _globals.tabIndex.jsInline = [];

    var needContainer = false;
    var scriptOpen = false;
    var htmlparser = require("htmlparser2");
    var parser = new htmlparser.Parser({
    	onopentag: function(name, attribs){
        //console.log('start:',name, attribs);
    		if(name === "script"){
    			//console.log("start:", name, attribs, scriptOpen);
          if (attribs.src) {
            //console.log(attribs.src);
            _globals.tabIndex.jsFiles.push(attribs.src);
          } else {
            scriptOpen = true;
            //console.log("start script!", scriptOpen);
          }
    		} else if (name === "link"){
          if (attribs.href) {
            _globals.tabIndex.cssFiles.push(attribs.href);
          }
    		}
        if (attribs.id == 'page') {
          needContainer = true;
        }
    	},
    	ontext: function(text){
    		//console.log("-->",scriptOpen,  text);
        if (text && scriptOpen) {
          _globals.tabIndex.jsInline.push(text);
          scriptOpen = false;
        }
    	},
    	onclosetag: function(tagname){
        //console.log("end:",tagname,scriptOpen);
    	}
    }, {decodeEntities: true});
    parser.write(data);
    parser.end();


    return function () {

      //console.log(_globals.appActive);

      require('codemirror/mode/xml/xml');
      require('codemirror/mode/javascript/javascript');
      require('codemirror/mode/css/css');
      require('codemirror/mode/htmlmixed/htmlmixed');

      var CodeMirror = require('codemirror/lib/codemirror');

      _globals.tabIndex.editor = CodeMirror.fromTextArea(document.getElementById('editor.index.content'), {
        lineNumbers: true,
        theme: 'crisper',
        mode: 'text/html'
      });
      _globals.tabIndex.editor.setValue(data+'');
      _globals.tabIndex.editor.refresh();
      _globals.tabIndex.editor.on('change', function (cm) {
        document.getElementById('editor.index.save').classList.remove('disable');
      });


      var node = document.getElementById('editor.index.cssFiles');
      var length = _globals.tabIndex.cssFiles.length;
      if (length < 1) {
        var node = document.getElementById('editor.index.cssFilesError');
        node.innerHTML = 'Missing CSS Files';
        node.classList.remove('hidden');
      } else {
        for (var i = 0; i < length; i++) {
          var child = document.createElement('div');
          child.innerHTML = _globals.tabIndex.cssFiles[i];
          node.appendChild(child);
        }
      }


      var node = document.getElementById('editor.index.jsFiles');
      var length = _globals.tabIndex.jsFiles.length;
      if (length < 1) {
        var node = document.getElementById('editor.index.jsFilesError');
        node.innerHTML = 'Missing JS Files';
        node.classList.remove('hidden');
      } else {
        var needCordova = false;
        for (var i = 0; i < length; i++) {
          var child = document.createElement('div');
          child.innerHTML = _globals.tabIndex.jsFiles[i];
          node.appendChild(child);
          if (_globals.tabIndex.jsFiles[i] == 'cordova.js') {
            needCordova = true;
          }
        }
        if (!needCordova) {
          var node = document.getElementById('editor.index.jsFilesError');
          node.innerHTML = 'Missing Cordova js File';
          node.classList.remove('hidden');
        }
      }

      var length = _globals.tabIndex.jsInline.length;
      if (length < 1) {
        var node = document.getElementById('editor.index.jsInlineError');
        node.innerHTML = 'Missing JS Inline';
        node.classList.remove('hidden');
      } else {
        var needInit = false;
        for (var i = 0; i < length; i++) {
          if ( _globals.tabIndex.jsInline[i].match('.initialize()') ) {
            needInit = true;
          }
        }
        if (!needInit) {
          var node = document.getElementById('editor.index.jsInlineError');
          node.innerHTML = 'Missing JS Inline initialize()';
          node.classList.remove('hidden');
        }
      }

      if (!needContainer) {
        var node = document.getElementById('editor.index.containerError');
        node.innerHTML = 'Maybe no Container definied ?';
        node.classList.remove('hidden');
      }


      myTaskHelper.editorSwitchTab(event.target);
    };

  },
  editorTabIndexSave: function (pageId, pageContent, event, dom) {

    myTaskHelper.saveFile(_globals.tabIndex.path, _globals.tabIndex.editor.getValue(), function () {
      myPager.switch('editor/index','editorTabIndex','',{container:'editor.content'});
    });

  },

  editorTabPlugins: function (pageId, pageContent, event, dom) {

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  },

  editorTabAppjs: function (pageId, pageContent, event, dom) {

    var data = myTaskHelper.getFile(_globals.tabAppjs.path);

    return function () {

      require('codemirror/mode/javascript/javascript');

      var CodeMirror = require('codemirror/lib/codemirror');
      _globals.tabAppjs.editor = CodeMirror.fromTextArea(document.getElementById('editor.appjs.content'), {
        lineNumbers: true,
        theme: 'crisper',
        mode: 'javascript'
      });
      _globals.tabAppjs.editor.setValue(data+'');
      _globals.tabAppjs.editor.on('change', function (cm) {
        document.getElementById('editor.appjs.save').classList.remove('disable');
      });

      myTaskHelper.editorSwitchTab(event.target);
    };

  },
  editorTabAppjsSave: function (pageId, pageContent, event, dom) {

    myTaskHelper.saveFile(_globals.tabAppjs.path, _globals.tabAppjs.editor.getValue(), function () {
      document.getElementById('editor.appjs.save').classList.add('disable');
    });

  },

  editorTabStyle: function (pageId, pageContent, event, dom) {

    var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/css/');
    _globals.tabStyle.editor = false;

    return function () {

      var node = document.getElementById('editor.style.files');

      for (var i = 0; i < list.length; i++) {
        if (list[i].ext == 'css') {
          var child = document.createElement('li');
          child.innerHTML = list[i].name;
          child.className = 'pageBtn';
          child.setAttribute('data-task', 'editorTabStyleOpen');
          child.setAttribute('data-content', list[i].name);

          if ( !_globals.tabIndex.cssFiles.includes('css/'+list[i].name) ) {
            child.className += ' invalide';
          }

          node.appendChild(child);
        }
      }

      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabStyleOpen: function (pageId, pageContent, event, dom) {

    if (!pageContent) {
      return false;
    }
    var data = myTaskHelper.getFile(_globals.appActive.data.localPath+'/www/css/'+pageContent);
    if (!data) {
      return false;
    }

    _globals.tabStyle.path = _globals.appActive.data.localPath+'/www/css/'+pageContent;

    if (_globals.tabStyle.editor) {
      _globals.tabStyle.editor.setValue(data+'');
    } else {
      require('codemirror/mode/css/css');

      var CodeMirror = require('codemirror/lib/codemirror');

      _globals.tabStyle.editor = CodeMirror.fromTextArea(document.getElementById('editor.style.content'), {
        lineNumbers: true,
        theme: 'crisper',
        mode: 'css'
      });
      _globals.tabStyle.editor.setValue(data+'');
      _globals.tabStyle.editor.on('change', function (cm) {
        document.getElementById('editor.style.save').classList.remove('disable');
      });
    }
    myTaskHelper.setActive('editor.style.files','active');

    return false;

  },
  editorTabStyleSave: function (pageId, pageContent, event, dom) {

    myTaskHelper.saveFile(_globals.tabStyle.path, _globals.tabStyle.editor.getValue(), function () {
      document.getElementById('editor.style.save').classList.add('disable');
    });

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

  saveFile: function (file, content, callback) {

    var fs = require('fs');
    fs.writeFile(file, content, function(err) {
        if(err) {
            return console.log(err);
        }
        //console.log("The file was saved!",file,content);
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
