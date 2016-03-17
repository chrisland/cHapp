myPager.addTask('config', {


  init: function (pageId, pageContent, event, dom, scope) {


    return function () {


      var form = new cForm('configForm');

      var xmlDoc = helper.configParse(true);

      helper.configFieldsUi('editor.config.ui', xmlDoc, false,
      {
        change: function () {
          form.validate({required: 'invalide'});
        },
        saved: function (xmlStr) {
          //console.log('done');
        }
      });




      myTaskHelper.editorSwitchTab(event.target);


    }
  }

});
