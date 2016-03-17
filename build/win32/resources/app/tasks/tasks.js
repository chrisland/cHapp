myPager.addTask('tasks', {

  openDir: undefined,
  parsed: undefined,
  init: function (pageId, pageContent, event, dom, scope) {

    var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/tasks');

    return function () {

      helper.renderDirs( list, document.getElementById('editor.tasks.files'), '', true, ['tasks.open','tasks.showDir'], ['js'] );

      require('codemirror/mode/javascript/javascript');

      var CodeMirror = require('codemirror/lib/codemirror');

      _globals.tabTasks.editor = CodeMirror.fromTextArea(document.getElementById('editor.tasks.content.editor'), {
        lineNumbers: true,
        theme: 'crisper',
        mode: 'javascript'
      });

      _globals.tabTasks.editor.on('change', function (cm) {
        document.getElementById('editor.tasks.save').classList.remove('disable');
      });



      myTaskHelper.editorSwitchTab(event.target);
    };

  },
  showDir: function (pageId, pageContent, event, dom, scope) {

    if (!pageContent) {
      return false;
    }
    scope.openDir = pageContent;

    var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/tasks/'+pageContent);

    if (!event.target.nextSibling || !event.target.nextSibling.classList.contains('childNode')) {
      var child = document.createElement('ul');
      child.className = 'childNode';
      event.target.parentNode.insertBefore(child, event.target.nextSibling);
    } else {
      child = event.target.nextSibling
    }

    helper.renderDirs( list, child, pageContent+'/', true, ['tasks.open','tasks.showDir'], ['js'] );

    myPager.events();

    myTaskHelper.setActive('editor.tasks.files', 'active');

    return false;

  },
  open: function (pageId, pageContent, event, dom, scope) {

    if (!pageContent) {
      return false;
    }

    var data = myTaskHelper.getFile(_globals.appActive.data.localPath+'/www/tasks/'+pageContent);

    _globals.tabTasks.path = _globals.appActive.data.localPath+'/www/tasks/'+pageContent;

    myTaskHelper.setActive('editor.tasks.files', 'active');

    document.getElementById('editor.tasks.save').classList.add('disable');




    if (data) {

      _globals.tabTasks.editor.setValue(data+'');

      var esprima = require('esprima');
      var escodegen = require('escodegen');

      scope.parsed = esprima.parse(data+'');

      document.getElementById('editor.tasks.ui.name').value = helper.cutFirstLastChar(scope.parsed.body[0].expression.arguments[0].raw) || '';


      var root = document.getElementById('editor.tasks.ui.list');
      root.innerHTML = '';
      var properties = scope.parsed.body[0].expression.arguments[1].properties;
      var length = properties.length;
      for (var i = 0; i < length; i++) {

        //console.log(properties[i]);



        var val = helper.getReturnStatment(clone(properties[i].value.body));



        root.appendChild(helper.taskMakeChild(
          i,
          {
            name: [properties[i].key.name, function (e) {
              properties[e.target.i].key.name = e.target.value;
              _globals.tabTasks.editor.setValue(escodegen.generate(scope.parsed)+'');
            }],
            beforeDom: [val[0], function (e) {

              properties[e.target.i].value.body = esprima.parse('{'+e.target.value+'}');
              _globals.tabTasks.editor.setValue(escodegen.generate(scope.parsed)+'');
            }],
            disableDom: [val[1][2], function (e) {

            }],
            afterDom: [val[1][0],function (e) {


              properties[e.target.i].value.body.body[e.target.a].argument.body = esprima.parse('{'+e.target.value+'}');
              _globals.tabTasks.editor.setValue(escodegen.generate(scope.parsed)+'');
            }, val[1][1]],
            afterAnimation: []
          }
        ));

      }




    }
    return false;

  },
  newTask: function (pageId, pageContent, event, dom, scope) {

    var escodegen = require('escodegen');
    var esprima = require('esprima');

    var properties = scope.parsed.body[0].expression.arguments[1].properties;
    var length = properties.length;

    var node = esprima.parse('var obj = { "undefinied": function (pageId, pageContent, event, dom, scope) { return function () {}; } }')

    delete node.body[0].declarations[0].init.properties[0].key.raw;
    delete node.body[0].declarations[0].init.properties[0].key.value;
    node.body[0].declarations[0].init.properties[0].key.type = 'Identifier';

    properties[length] = node.body[0].declarations[0].init.properties[0];


    document.getElementById('editor.tasks.ui.list').appendChild(helper.taskMakeChild(
      length,
      {
        name: ['', function (e) {
          properties[e.target.i].key.name = e.target.value;
          _globals.tabTasks.editor.setValue(escodegen.generate(scope.parsed)+'');
        }],
        beforeDom: ['', function (e) {

          properties[e.target.i].value.body = esprima.parse('{'+e.target.value+'}');
          _globals.tabTasks.editor.setValue(escodegen.generate(scope.parsed)+'');
        }],
        disableDom: [false, function (e) {
          if (e.target.checked) {

          } else {

          }
        }],
        afterDom: ['',function (e) {

          var node = esprima.parse('{ return function () {}; }');
          console.log(node.body[0].body[0]);
          console.log(e.target.i, e.target.a);
          if (!e.target.a) {
            console.log(properties[e.target.i].value.body.body);
            console.log(properties[e.target.i].value.body.body[0]);
            console.log(properties[e.target.i].value.body.body[0].body);

            properties[e.target.i].value.body.body[0].body.push(node.body[0].body[0]);
            e.target.a = properties[e.target.i].value.body.body.length -1;
          }
          properties[e.target.i].value.body.body[0].body[e.target.a].argument.body = esprima.parse('{'+e.target.value+'}');
          _globals.tabTasks.editor.setValue(escodegen.generate(scope.parsed)+'');
        }],
        afterAnimation: []
      }
    ));

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
          myTaskHelper.saveFile(_globals.appActive.data.localPath+'/www/tasks/'+value+'.js', '', function () {

            var list = myTaskHelper.getDir(_globals.appActive.data.localPath+'/www/tasks');
            helper.renderDirs( list, document.getElementById('editor.tasks.files'), '', true, ['tasks.open','tasks.showDir'], ['js'] );

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

    console.log(_globals.tabTasks.path);
    console.log(_globals.tabTasks.editor.getValue());

    myTaskHelper.saveFile(_globals.tabTasks.path, _globals.tabTasks.editor.getValue(), function () {
      document.getElementById('editor.tasks.save').classList.add('disable');
    });

  }


});


function clone(obj) {
      if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
        return obj;

      if (obj instanceof Date)
        var temp = new obj.constructor(); //or new Date(obj);
      else
        var temp = obj.constructor();

      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj['isActiveClone'] = null;
          temp[key] = clone(obj[key]);
          delete obj['isActiveClone'];
        }
      }

      return temp;
    }
