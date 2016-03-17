myPager.addTask('serve', {

  cmd: undefined,
  start: function (pageId, pageContent, event, dom, scope) {

    console.log('---start',data);
    var db = new cStorage('apps');
    var data = db.root('data').find({id: pageContent}).get();

    if (!data || !data.name) {
      return false;
    }

    scope.cmd = undefined;

    var shelljs = require('shelljs');
    shelljs.cd(data.localPath);
    scope.cmd = shelljs.exec('phonegap serve', {async:true, silent:true});
    console.log(scope.cmd);
    scope.cmd.stdout.on('data', function(data) {
      console.log('## stdout');
      console.log(data);

      if ( data.indexOf('[error]') !=-1 ) {

        scope.cmd.kill();
        console.log('kill');

      } else if ( data.indexOf('listening') !=-1 ) {
        var ip = data.replace('listening on','').trim();
        console.log('#'+ip+'#');
      }

      /* ... do something with data ... */
    });
    scope.cmd.stderr.on('data', function(data) {
      console.log('## stderr');
      console.log(data);
      /* ... do something with data ... */
    });
    scope.cmd.stdin.on('data', function(data) {
      console.log('## stdin');
      console.log(data);
      /* ... do something with data ... */
    });


  },
  end: function (pageId, pageContent, event, dom, scope) {

    if (scope.cmd) {
      scope.cmd.kill();
    }
    console.log('---end');
  }

});
