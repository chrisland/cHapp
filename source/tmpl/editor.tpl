<div class="header">
  <div id="editor.appname" class="pageBtn editor_appname p-left-1" data-task="editorClose"></div>

  <ul id="editor.nav" class="menue">
    <li><button class="pageBtn" data-page="editor/serve" data-task="" data-container="editor.content">Serve</button></li>
    <li>
      <button>Config</button>
      <div>
        <ul>
          <li><button class="pageBtn" data-page="editor/config" data-task="config.init" data-container="editor.content">config</button></li>
          <li><button class="pageBtn" data-page="editor/plugins" data-task="editorTabPlugins" data-container="editor.content">plugins</button></li>
        </ul>
      </div>
    </li>
    <li>
      <button>Platform</button>
      <div>
        <ul>
          <li><button class="pageBtn" data-page="editor/platform/ios" data-task="platformIos.init" data-container="editor.content">iOS</button></li>
          <li><button class="pageBtn" data-page="editor/platform/android" data-task="platformAndroid.init" data-container="editor.content">Android</button></li>
          <li><button class="pageBtn" data-page="editor/platform/windows" data-task="platformWindows.init" data-container="editor.content">Windows</button></li>
        </ul>
      </div>
    </li>
    <li>
      <button>Code</button>
      <div>
        <ul>
          <li><button class="pageBtn" data-page="editor/index" data-task="editorTabIndex" data-container="editor.content">index</button></li>
          <li><button class="pageBtn" data-page="editor/appjs" data-task="editorTabAppjs" data-container="editor.content">appjs</button></li>
          <li><button class="pageBtn" data-page="editor/xml" data-task="xml.init" data-container="editor.content">config</button></li>
          <li><button class="pageBtn" data-page="editor/style" data-task="editorTabStyle" data-container="editor.content">styles</button></li>
        </ul>
      </div>
    </li>
    <li><button class="pageBtn" data-page="editor/pages" data-task="pages.init" data-container="editor.content">Pages</button></li>
    <li><button class="pageBtn" data-page="editor/tasks" data-task="tasks.init" data-container="editor.content">Tasks</button></li>
  </ul>
</div>

<div class="main flex">
  <div id="editor.content" class="flex f-colum"></div>
</div>
