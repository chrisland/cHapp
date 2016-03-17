
var helper = {

  editorSwitchTab: function (target) {

    var menus = document.getElementById('editor.nav').getElementsByClassName('pageBtn active');
    for (var i = menus.length - 1; i >= 0; i--) {
      menus[i].classList.remove('active');
    }

    target.classList.add('active');
  },
  copyFile: function(source, target, cb) {

    //console.log(source)
    //console.log(target);

    var fs = require('fs')
    fs.readFile(source, function (err, data) {
        if (err) throw err;
        fs.writeFile(target, data, function (err) {
            if (err) throw err;
            //console.log('It\'s saved!');
            cb();
        });
    });

  },
  delteFile: function(source) {

    //console.log(source)
    //console.log(target);

    var fs = require('fs')
    return fs.unlinkSync(source);

  },
  makeIconFolder: function (platform, callback) {

    var fs = require('fs');

    var cb2 = function (e) {
      if (e) {
        return false;
      }
      fs.mkdir(_globals.appActive.data.localPath+'/res/icon/'+platform, 0777, function(err) {
          if (err) {
              if (err.code == 'EEXIST') {
                callback(null); // ignore the error if the folder already exists
              } else {
                callback(err); // something else went wrong
              }
          } else {
            callback(null); // successfully created folder
          }
      });
    };

    var cb = function (e) {
      if (e) {
        return false;
      }
      fs.mkdir(_globals.appActive.data.localPath+'/res/icon', 0777, function(err) {
          if (err) {
              if (err.code == 'EEXIST') {
                cb2(null); // ignore the error if the folder already exists
              } else {
                cb2(err); // something else went wrong
              }
          } else {
            cb2(null); // successfully created folder
          }
      });
    };

    fs.mkdir(_globals.appActive.data.localPath+'/res', 0777, function(err) {
        if (err) {
            if (err.code == 'EEXIST') {
              cb(null); // ignore the error if the folder already exists
            } else {
              cb(err); // something else went wrong
            }
        } else {
          cb(null); // successfully created folder
        }
    });


  },
  makeSplashFolder: function (platform, callback) {

    var fs = require('fs');

    var cb2 = function (e) {
      if (e) {
        return false;
      }
      fs.mkdir(_globals.appActive.data.localPath+'/res/splash/'+platform, 0777, function(err) {
          if (err) {
              if (err.code == 'EEXIST') {
                callback(null); // ignore the error if the folder already exists
              } else {
                callback(err); // something else went wrong
              }
          } else {
            callback(null); // successfully created folder
          }
      });
    };

    var cb = function (e) {
      if (e) {
        return false;
      }
      fs.mkdir(_globals.appActive.data.localPath+'/res/splash', 0777, function(err) {
          if (err) {
              if (err.code == 'EEXIST') {
                cb2(null); // ignore the error if the folder already exists
              } else {
                cb2(err); // something else went wrong
              }
          } else {
            cb2(null); // successfully created folder
          }
      });
    };

    fs.mkdir(_globals.appActive.data.localPath+'/res', 0777, function(err) {
        if (err) {
            if (err.code == 'EEXIST') {
              cb(null); // ignore the error if the folder already exists
            } else {
              cb(err); // something else went wrong
            }
        } else {
          cb(null); // successfully created folder
        }
    });


  },
  configParse: function (force) {
    if (!force && _globals.tabConfig.parse) {
      return _globals.tabConfig.parse;
    } else {
      var data = myTaskHelper.getFile(_globals.tabConfig.path);
      if (!data) {
        return false;
      }

      var parser = new DOMParser();
      _globals.tabConfig.parse = parser.parseFromString(data,"text/xml");

      //console.log(xmlDoc);
      return _globals.tabConfig.parse || false;
    }
  },
  configParseSave: function (xmlDoc, cb, hook) {

    var oSerializer = new XMLSerializer();
    var sXML = oSerializer.serializeToString(xmlDoc);

    //console.log(sXML);
    if (hook) {
      sXML = hook(sXML);
    }
    var pd = require('pretty-data2').pd;
    sXML =  pd.xml(sXML);

    myTaskHelper.saveFile(_globals.tabConfig.path, sXML, function (path) {
      //console.log('done!!!!!!!!');
      cb(sXML);
    });

  },
  configAddPlatform: function (name) {
    if (!name) {
      return false;
    }
    var xmlDoc = this.configParse();
    var platform = xmlDoc.querySelector('platform[name="'+name+'"]');
    if (platform) {
      return platform;
    }
    if (_globals.tabPlatform[name] && _globals.tabPlatform[name].deactiveCache) {
      var node = _globals.tabPlatform[name].deactiveCache;
    } else {
      var node = xmlDoc.createElement("platform");
      node.setAttribute('name', name);
    }
    xmlDoc.querySelector('widget').appendChild(node);
    this.configParseSave(xmlDoc, function () {
      //console.log('done!!!!!!!!');
    });
    return node;
  },
  configRemovePlatform: function (name) {
    if (!name) {
      return false;
    }
    var xmlDoc = this.configParse();
    var platform = xmlDoc.querySelector('platform[name="'+name+'"]');
    if (!platform) {
      return true;
    }
    _globals.tabPlatform[name].deactiveCache = platform;
    platform.remove();
    this.configParseSave(xmlDoc, function () {
      //console.log('done!!!!!!!!');
    });
    return true;
  },
  configAppendIcon: function (platform, path, width, height, density , cb) {

    var xmlDoc = helper.configParse();
    var platform = xmlDoc.querySelector('platform[name="'+platform+'"]');
    if (!platform) {
      return false;
    }
    if (platform == 'ios') {
      var node = platform.querySelector('icon[width="'+width+'"][height="'+height+'"]');
    } else if (platform == 'android') {
      var node = platform.querySelector('icon[density="'+density+'"]');
    }

    if (!node) {
      node = xmlDoc.createElement("icon");

      if (width) { node.setAttribute('width', width); }
      if (height) { node.setAttribute('height', height); }
      if (density) { node.setAttribute('density', density); }
      platform.appendChild(node);
    }

    node.setAttribute('src',path);
    helper.configParseSave(xmlDoc, function () {
      if (cb) { cb(); }
    });
    return false;
  },

  configRemoveIcon: function (platform, path, cb) {

    var xmlDoc = helper.configParse();
    var platform = xmlDoc.querySelector('platform[name="'+platform+'"]');
    if (!platform) {
      return false;
    }
    var node = platform.querySelector('icon[src="'+path+'"]');
    if (!node) {
      return false;
    }
    node.remove();
    helper.configParseSave(xmlDoc, function () {
      if (cb) { cb(); }
    });

  },
  configAppendSplash: function (platform, path, width, height, density,  cb) {

    var xmlDoc = helper.configParse();
    var platform = xmlDoc.querySelector('platform[name="'+platform+'"]');
    if (!platform) {
      return false;
    }
    if (platform == 'ios') {
      var node = platform.querySelector('splash[width="'+width+'"][height="'+height+'"]');
    } else if (platform == 'android') {
      var node = platform.querySelector('splash[density="'+density+'"]');
    }
    if (!node) {
      node = xmlDoc.createElement("splash");
      if (width) { node.setAttribute('width', width); }
      if (height) { node.setAttribute('height', height); }
      if (density) { node.setAttribute('density', density); }
      platform.appendChild(node);
    }
    node.setAttribute('src',path);
    helper.configParseSave(xmlDoc, function () {
      if (cb) { cb(); }
    });
    return false;
  },

  configRemoveSplash: function (platform, path, cb) {

    var xmlDoc = helper.configParse();
    var platform = xmlDoc.querySelector('platform[name="'+platform+'"]');
    if (!platform) {
      return false;
    }
    var node = platform.querySelector('splash[src="'+path+'"]');
    if (!node) {
      return false;
    }
    node.remove();
    helper.configParseSave(xmlDoc, function () {
      if (cb) { cb(); }
    });

  },
  configFieldsUi: function (domid, xmlDoc, platform, cb) {

    if (!xmlDoc) {
      return false;
    }
    var parent = xmlDoc.querySelector('widget');
    if (platform) {
      parent = xmlDoc.querySelector('platform[name="'+platform+'"]');
    }


    var fields = document.getElementById(domid).querySelectorAll('input, select');
    for (var i = 0; i < fields.length; i++) {

      //console.log(fields[i].name);

      var arr = fields[i].name.split('.');
      if (arr[1]) {

        //console.log(node);
        if (arr[0] == 'preference') {

          var node = xmlDoc.querySelector(arr[0]+'[name="'+arr[1]+'"]');
          if (node) {
            fields[i].value = node.getAttribute('value') || '';
          }
        } else {
          var node = xmlDoc.querySelector(arr[0]);
          if (node) {
            fields[i].value = node.getAttribute(arr[1]) || '';
          }
        }

      } else {
        var node = xmlDoc.querySelector(arr[0]) || '';
        if (node) {
          fields[i].value = node.innerHTML;
        }
      }


      fields[i].onchange = function (e) {

        if (cb.change) {
          cb.change();
        }


        //console.log(e.target.value, e.target.name, e.target.getAttribute('data-node') );

        var arr = e.target.name.split('.');
        //console.log(arr);

        if (arr[1]) {
          if (arr[0] == 'preference') {

            var node = xmlDoc.querySelector(arr[0]+'[name="'+arr[1]+'"]');
            if (node) {
              if (e.target.value) {
                node.setAttribute('value', e.target.value);
              } else {
                node.remove();
              }

            } else {
              node = xmlDoc.createElement(arr[0]);
              node.setAttribute('name', arr[1]);
              node.setAttribute('value', e.target.value);
              parent.appendChild(node);
            }

          } else {
            var node = xmlDoc.querySelector(arr[0]);
            if (node) {
              node.setAttribute(arr[1], e.target.value);
            } else {
              node = xmlDoc.createElement(arr[0]);
              node.setAttribute(arr[1], e.target.value);
              parent.appendChild(node);
            }
          }
        } else {
          var node = xmlDoc.querySelector(arr[0]) || '';
          if (node) {
            node.innerHTML = e.target.value;
          }
        }



        helper.configParseSave(xmlDoc, function (xmlStr) {

          if (cb.saved) {
            cb.saved(xmlStr);
          }


        });

        return false;
      };
    }

  },
  platformDisableForm: function (dom) {

    var fields = dom.querySelectorAll('input:not(.platformActive), select');
    for (var i = 0; i < fields.length; i++) {
      fields[i].setAttribute('disabled', 'true');
    }

  },
  switchTab: function (showDomId, navDomId, target) {

    if (!showDomId) {
      return false;
    }
    var nodes = document.querySelectorAll('.tab-page');
    for (var i = nodes.length - 1; i >= 0; i--) {
      nodes[i].classList.add('hidden');
    }
    document.getElementById(showDomId).classList.remove('hidden');


    var menus = document.getElementById(navDomId).getElementsByClassName('pageBtn active');
    for (var i = menus.length - 1; i >= 0; i--) {
      menus[i].classList.remove('active');
    }

    target.classList.add('active');


    return false;

  },
  renderDirs: function (list, node, parentPath, clean, task, ext) {

    if (!list || !node) {
      return false;
    }
    //console.log(list, node, parentPath, clean);
    if (!parentPath) {
      parentPath = '';
    }
    if (clean) {
      node.innerHTML = '';
    }

    for ( var i = 0; i < list.length; i++) {
      var parent = false;
      if (ext.includes(list[i].ext)) {

        parent = document.createElement('li');

        var child = document.createElement('div');
        child.innerHTML = list[i].name;
        child.className = 'pageBtn';
        //child.setAttribute('data-page', 'editor');
        child.setAttribute('data-task', task[0]);
        child.setAttribute('data-content', parentPath+list[i].name);
        parent.appendChild(child);

      } else if (list[i].ext == 'dir') {

        parent = document.createElement('li');

        var child = document.createElement('div');
        child.innerHTML = list[i].name;
        child.className = 'pageBtn';
        //child.setAttribute('data-page', 'editor');
        child.setAttribute('data-task', task[1]);
        child.setAttribute('data-content', parentPath+list[i].name);
        parent.appendChild(child);

      }

      if (parent) {
        node.appendChild(parent);
      }

    }

  },
  makeFolder: function (path, cb) {

    if (!path) {
      return false;
    }
    var fs = require('fs');
    fs.mkdir(path, 0777, function () {
      cb();
    });

  },
  taskMakeChild: function (i, obj) {


    var parent = document.createElement('li');
    parent.className = 'flex border-bottom';

    var child = document.createElement('input');
    child.type = 'text';
    child.name = 'name';
    child.className = 'flex';
    child.placeholder = 'Functionname';
    child.value = obj.name[0] || '';
    child.i = i;
    parent.appendChild(child);
    child.onchange = obj.name[1] || null;


    var child = document.createElement('textarea');
    child.name = 'beforeDom';
    child.className = 'flex';
    child.value = obj.beforeDom[0] || '';
    child.i = i;
    parent.appendChild(child);
    child.onchange = obj.beforeDom[1] || null;

    var child = document.createElement('input');
    child.type = 'checkbox';
    child.name = 'disableDom';
    child.className = '';
    child.checked = obj.disableDom[0] || false;
    child.i = i;
    parent.appendChild(child);
    child.onchange = obj.disableDom[1] || null;

    var child = document.createElement('textarea');
    child.name = 'afterDom';
    child.className = 'flex';
    child.value = obj.afterDom[0] || '';
    child.i = i;
    child.a = obj.afterDom[2] || null;
    parent.appendChild(child);
    child.onchange = obj.afterDom[1] || null;

/*
    var child = document.createElement('textarea');
    child.name = 'afterAnimation';
    child.className = 'flex';
    child.value = obj.afterAnimation[0] || '';
    parent.appendChild(child);
    child.onchange = obj.afterAnimation[1] || null;

*/


    return parent;


  },
  cutFirstLastChar: function (str) {
    str = str.substr(0, str.length-1);
    return str.substr(1, str.length-2);
  },
  getReturnStatment: function (obj) {

    var escodegen = require('escodegen');

    var val = [ obj, []];
    for (var a = obj.body.length -1; a >= 0; a--) {
      //console.log(a, val, properties[i].value.body.body[a]);

      if (obj.body[a].type == 'ReturnStatement') {

        if (obj.body[a].argument.raw = 'false'
        && !obj.body[a].argument.body) {

          val[1][2] = true;
          val[1][0] = '';
          val[1][1] = a;
          val[0].body.splice(a, 1);

          a = -1;

        } else if (obj.body[a].argument.type = 'FunctionExpression') {

          val[1][0] = helper.cutFirstLastChar(escodegen.generate(obj.body[a].argument.body)).trim();
          val[1][1] = a;

          val[0].body.splice(a, 1);

          a = -1;


        }

      }

    }
    val[0] = helper.cutFirstLastChar(escodegen.generate(val[0])).trim();


    return val;


  }


}
