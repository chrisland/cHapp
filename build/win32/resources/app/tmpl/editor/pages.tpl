<div class="submenue">
  <button id="editor.pages.save" class="pageBtn disable flex btn" data-task="pages.save">save Page</button>
  <button class="pageBtn flex btn" data-task="pages.newFile">add Page</button>
  <button class="pageBtn flex btn" data-task="pages.newFolder">add Folder</button>
</div>

<div class="content flex p-top-1 p-right-1 p-bottom-1">

  <div class="flex f-colum p-left-1 p-right-1">
    <ul id="editor.pages.files" class="box-list"></ul>
  </div>

  <div id="editor.pages.content" class="flex f-3">
    <textarea id="editor.pages.content.editor"></textarea>
  </div>
  <!--
  <div id="editor.pages.preview" class="flex f-3 box-border-black">
   <webview id="editor.pages.preview.webview" src=""></webview>
  </div>
-->
  <div id="editor.pages.preview.inner_wrap" class="flex f-3 f-colum">


    <div id="editor.pages.preview.phone-controls" class="flex">

      <div id="editor.pages.preview.views">
          <button value="1">Table View</button>
          <button value="2">Front View</button>
      </div>

      <div id="editor.pages.preview.phones">
          <button value="1">iPhone 6</button>
          <button value="2">Samsung Galaxy Note</button>
          <button value="3">Microsoft Lumia 1020</button>
          <button value="4">HTC One</button>
          <button value="5">iPad Mini</button>
      </div>
    </div>


        <!--The Main Thing-->
    <div id="editor.pages.preview.wrapper" class="phone-wrapper f-1 " style="">
      <div class="phone view_2" id="editor.pages.preview.phone_1" style="width: 360px; height: 640px;">
        <!-- <iframe src="" id="editor.pages.preview.frame_1"></iframe> -->
        <webview id="editor.pages.preview.webview" class="webview" src="" autosize="on" minwidth="" minheight=""></webview>
      </div>
    </div>


  </div>



</div>
