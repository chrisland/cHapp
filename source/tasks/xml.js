myPager.addTask('xml', {


  init: function (pageId, pageContent, event, dom, scope) {



    var data = myTaskHelper.getFile(_globals.tabConfig.path);
    if (!data) {
      return false;
    }

    return function () {

      require('codemirror/mode/xml/xml');

      var CodeMirror = require('codemirror/lib/codemirror');

      _globals.tabXml.editor = CodeMirror.fromTextArea(document.getElementById('editor.xml.content'), {
        lineNumbers: true,
        theme: 'crisper',
        mode: 'xml'
      });
      _globals.tabXml.editor.setValue(data+'');

      _globals.tabXml.editor.on('change', function (cm) {
        document.getElementById('editor.xml.save').classList.remove('disable');
      });


      myTaskHelper.editorSwitchTab(event.target);


    }
  },
  save: function (pageId, pageContent, event, dom, scope) {

    myTaskHelper.saveFile(_globals.tabConfig.path, _globals.tabXml.editor.getValue(), function () {
      document.getElementById('editor.xml.save').classList.add('disable');
    });

  }

});
