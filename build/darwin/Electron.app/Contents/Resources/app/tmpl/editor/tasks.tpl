<div class="submenue">
  <button id="editor.tasks.save" class="pageBtn disable flex btn" data-task="tasks.save">save Page</button>
  <button class="pageBtn flex btn" data-task="tasks.newFile">add Page</button>
  <button class="pageBtn flex btn" data-task="tasks.newTask">add Task</button>

</div>

<div class="content flex p-top-1 p-right-1 p-bottom-1">

  <div class="flex f-colum p-left-1 p-right-1">
    <ul id="editor.tasks.files" class="box-list"></ul>
  </div>

  <div id="editor.tasks.content" class="flex f-3">
    <textarea id="editor.tasks.content.editor"></textarea>
  </div>

  <div id="editor.tasks.ui" class="flex f-3 f-colum">
    <input type="text" id="editor.tasks.ui.name" placeholder="Scopename"/>

    <ul id="editor.tasks.ui.list" class="flex f-colum"></ul>

  </div>


</div>
