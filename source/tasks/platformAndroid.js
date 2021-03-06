
myPager.addTask('platformAndroid', {


  init: function (pageId, pageContent, event, dom, scope) {
    //console.log('---> init', pageId, pageContent, event, dom, scope);


    var xmlDoc = helper.configParse();
    var platform = xmlDoc.querySelector('platform[name="android"]');

    return function () {

      var active = document.getElementById('editor.platform.android.active');
      if (platform) {
        active.checked = true;
      } else {
        active.checked = false;
        helper.platformDisableForm(dom);

      }
      active.onchange = function (e) {
        if (e.target.checked) {
          helper.configAddPlatform('android');
          myPager.switch(pageId,'platformAndroid.init',pageContent,{container:'editor.content'});
          return false;
        } else {
          helper.configRemovePlatform('android');
          helper.platformDisableForm(dom);
        }
      };


      if (platform) {

        var iconsDom = document.getElementById('editor.platform.android.icons');
        var nodes = platform.querySelectorAll('icon');
        var length = nodes.length;
        for (var i = 0; i < length; i++) {
          var node = iconsDom.querySelector('input[rel="'+nodes[i].getAttribute('width')+'-'+nodes[i].getAttribute('height')+'"]');
          node.value = nodes[i].getAttribute('src');
          node.parentNode.querySelector('.preview').style.backgroundImage = 'url(file://'+_globals.appActive.data.localPath+'/'+node.value+')';
        }


        var iconsDom = document.getElementById('editor.platform.android.splash');
        var nodes = platform.querySelectorAll('splash');
        var length = nodes.length;
        for (var i = 0; i < length; i++) {
          var node = iconsDom.querySelector('input[rel="'+nodes[i].getAttribute('width')+'-'+nodes[i].getAttribute('height')+'"]');
          node.value = nodes[i].getAttribute('src');
          node.parentNode.querySelector('.preview').style.backgroundImage = 'url(file://'+_globals.appActive.data.localPath+'/'+node.value+')';
        }

        var form = new cForm('configForm');

        helper.configFieldsUi('editor.platform.android.ui', xmlDoc, 'android',  { change: function () {
          form.validate({required: 'invalide'});
        },
        saved: function (xmlStr) {
          //console.log('done', xmlStr);
          //_globals.tabConfig.editor.setValue(xmlStr+'');
        } });


      }

      if (event && event.target) {
        helper.editorSwitchTab(event.target);
      }

    };
  },
  iconAdd: function (pageId, pageContent, event, dom, scope) {

    const dialog = remote.require('dialog')
    var path = dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['png'] }
      ]
    });
    var params = JSON.parse(pageContent);
    if (path[0] && params.file) {

       helper.makeIconFolder('android', function (err) {
         if (err) {
           return false;
         }
         var newPathFile = 'res/icon/android/'+params.file+'.png';
         var newPath = _globals.appActive.data.localPath+'/'+newPathFile;

         helper.copyFile(path[0], newPath, function () {
           helper.configAppendIcon('android', newPathFile, params.w, params.h, params.density , function () {
             event.target.parentNode.querySelector('input[name="src"]').value = newPathFile;
             event.target.parentNode.querySelector('.preview').style.backgroundImage = 'url(file://'+_globals.appActive.data.localPath+'/'+newPathFile+')';
           });
         });
       });
    }

  },
  iconRemove: function (pageId, pageContent, event, dom, scope) {

    var path = event.target.parentNode.querySelector('input[name="src"]').value
    if (!path) {
      return false;
    }
    var r = confirm("Also delete the locale file?");
    if (r == true) {
        var pathLong = _globals.appActive.data.localPath +'/'+ path;
        helper.delteFile(pathLong);
    }
    helper.configRemoveIcon('android',path, function () {
      event.target.parentNode.querySelector('input[name="src"]').value = '';
      event.target.parentNode.querySelector('.preview').style.backgroundImage = 'url()';
    });

  },
  splashAdd: function (pageId, pageContent, event, dom, scope) {

    const dialog = remote.require('dialog')
    var path = dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        { name: 'Images', extensions: ['png'] }
      ]
    });
    var params = JSON.parse(pageContent);
    if (path[0] && params.file) {

       helper.makeSplashFolder('android', function (err) {
         if (err) {
           return false;
         }
         var newPathFile = 'res/splash/android/'+params.file+'.png';
         var newPath = _globals.appActive.data.localPath+'/'+newPathFile;

         helper.copyFile(path[0], newPath, function () {
           helper.configAppendSplash('android', newPathFile, params.w, params.h, params.density, function () {
             event.target.parentNode.querySelector('input[name="src"]').value = newPathFile;
             event.target.parentNode.querySelector('.preview').style.backgroundImage = 'url(file://'+_globals.appActive.data.localPath+'/'+newPathFile+')';
           });
         });
       });
    }

  },
  splashRemove: function (pageId, pageContent, event, dom, scope) {

    var path = event.target.parentNode.querySelector('input[name="src"]').value
    if (!path) {
      return false;
    }
    var r = confirm("Also delete the locale file?");
    if (r == true) {
        var pathLong = _globals.appActive.data.localPath +'/'+ path;
        helper.delteFile(pathLong);
    }
    helper.configRemoveSplash('android', path, function () {
      event.target.parentNode.querySelector('input[name="src"]').value = '';
      event.target.parentNode.querySelector('.preview').style.backgroundImage = 'url()';
    });

  },
  tab: function (pageId, pageContent, event, dom, scope) {

    helper.switchTab(pageContent, 'editor.platform.android.tabnav', event.target);

  }




});
