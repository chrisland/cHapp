<div class="submenue">
  <button id="editor.pages.save" class="pageBtn disable flex btn" data-task="editorTabPagesSave">save Page</button>
  <button class="pageBtn flex btn" data-task="editorTabPagesNew">add Page</button>
</div>

<div class="content flex p-top-1 p-right-1 p-bottom-1">

  <div class="flex f-colum p-left-1 p-right-1">
    <ul id="editor.pages.files" class="box-list"></ul>
  </div>

  <div id="editor.pages.content" class="flex f-3">
    <textarea id="editor.pages.content.editor"></textarea>
  </div>

  <div id="editor.pages.preview" class="flex f-3 box-border-black">
    <webview id="editor.pages.preview.webview" src=""></webview>
  </div>

</div>
