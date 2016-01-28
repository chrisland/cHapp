
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
            child.innerHTML = 'controlls';
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
  appEdit: function (pageId, pageContent, event, dom) {

    return function () {

    }

  },
  appOpen: function (pageId, pageContent, event, dom) {

    //console.log('openApp: '+pageContent);

    var db = new cStorage('apps');
    var data = db.root('data').find({id: pageContent}).get();

    if (!data || !data.name) {
      return false;
    }
    //console.log(data);

    return function () {
      //console.log('myTask after');

      document.getElementById('editor.appname').innerHTML = data.name;

    };

  },
  appChooseFolder: function (pageId, pageContent, event, dom) {


    const dialog = remote.require('dialog')
    var path = dialog.showOpenDialog({ properties: [ 'openDirectory', 'createDirectory' ]});
    if (path) {
      document.getElementById('form.localPath').value = path;
    }
  },
  appSave: function (pageId, pageContent, event, dom) {

    var db = new cStorage('apps').root('data');

    var obj = {
      id: document.getElementById('form.id').value || db.getUid('id'),
      name: document.getElementById('form.name').value,
      localPath: document.getElementById('form.localPath').value,
      appVersion: document.getElementById('form.appVersion').value
    };

    var myOverlay = new cOverlay({
      size: 5,
      root: './assets/img',
      file: 'spinner_gears.svg'
    }).show();

    //console.log(obj);

    var AdmZip = require('adm-zip');
    var http = require('http')
    var fs = require('fs')


    //console.log(data.zipball_url);

    var downloadZip = function(url, folder, callback ) {

			var tmpFilePath = 'tmp.zip'

			http.get(url, function(response) {
		 		response.on('data', function (data) {
		 			fs.appendFileSync(tmpFilePath, data)
				});
		 		response.on('end', function() {
		 			 var zip = new AdmZip(tmpFilePath)
		 			 zip.extractAllTo(folder)
		 			 fs.unlink(tmpFilePath)

           if (callback && typeof callback === 'function') {
             callback();
           }
			 	})
		 	});
		};

    downloadZip(obj.appVersion, obj.localPath+'/', function () {


      db.add(obj);
      myPager.switch('apps', 'appsList');
      myOverlay.destroy();

    });




    //console.log(obj);

  },
  editorClose: function (pageId, pageContent, event, dom) {

    myPager.switch('apps', 'appsList');

  },

  editorTabPages: function (pageId, pageContent, event, dom) {

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabConfig: function (pageId, pageContent, event, dom) {

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabIndex: function (pageId, pageContent, event, dom) {

    return function () {
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

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabStyle: function (pageId, pageContent, event, dom) {

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  },
  editorTabTasks: function (pageId, pageContent, event, dom) {

    return function () {
      myTaskHelper.editorSwitchTab(event.target);
    };
  }

};


var myTaskHelper = {

  editorSwitchTab: function (target) {
    document.getElementById('form.name')

    var menus = document.getElementById('editor.nav').getElementsByClassName('pageBtn active');
    for (var i = menus.length - 1; i >= 0; i--) {
      menus[i].classList.remove('active');
    }

    target.classList.add('active');
  }

};
