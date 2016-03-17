myPager.addTask('serve', {

  cmd: undefined,
  ip: undefined,
  start: function (pageId, pageContent, event, dom, scope) {

    //console.log('---start');

    if (!_globals.appActive.data || !_globals.appActive.data.localPath) {
      return false;
    }

    scope.setStatus('', 'loading...');

    scope.cmd = undefined;
    scope.ip = undefined;

    var shelljs = require('shelljs');
    shelljs.cd(_globals.appActive.data.localPath);
    scope.cmd = shelljs.exec('phonegap serve', {async:true, silent:true});
    //console.log(scope.cmd);
    scope.cmd.stdout.on('data', function(data) {
      //console.log('## stdout');
      //console.log(data);

      if ( data.indexOf('[error]') !=-1 ) {

        scope.cmd.kill();
        //console.log('kill');
        scope.setStatus('', 'killed after error');

      } else if ( data.indexOf('listening') !=-1 ) {
        var ip = data.split('listening on');
        scope.ip = ip[1].trim();
        //console.log(scope.ip);

        scope.setStatus(scope.ip, 'listening');
      }

      /* ... do something with data ... */
    });
    scope.cmd.stderr.on('data', function(data) {
      //console.log('## stderr');
      //console.log(data);
      /* ... do something with data ... */
    });
    scope.cmd.stdin.on('data', function(data) {
      //console.log('## stdin');
      //console.log(data);
      /* ... do something with data ... */
    });


  },
  end: function (pageId, pageContent, event, dom, scope) {

    if (scope.cmd) {
      scope.cmd.kill();
    }
    //console.log('---end');
    scope.setStatus('', 'killed');
  },
  setStatus: function (ip, str) {

    document.getElementById('editor.serve.ip').innerHTML = ip || '';
    document.getElementById('editor.serve.status').innerHTML = str || '';

    if (ip) {
      document.getElementById('editor.serve.open').classList.remove('hidden');
    } else {
      document.getElementById('editor.serve.open').classList.add('hidden');
    }

  },
  open: function (pageId, pageContent, event, dom, scope) {

    const shell = require('electron').shell;
    shell.openExternal('http://'+scope.ip);
  }

});
