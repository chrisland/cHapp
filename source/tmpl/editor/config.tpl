<div class="submenue">
  <button id="editor.config.save" class="pageBtn disable flex btn" data-task="editorTabConfigSave">save Page</button>
</div>

<div class="content flex p-top-1">

  <div class="flex p-right-1">
    <div id="editor.config.ui" class="box-list">
      <form name="configForm">
        <ul>
          <li>
            <label>reverse-domain identifier</label>
            <input type="text" name="id" data-node="widget" required />
          </li>
          <li>
            <label>version</label>
            <input type="text" name="version" data-node="widget" required />
          </li>
          <li>
            <label>adroid: versionCode</label>
            <input type="text" name="widget.android.android-versionCode" data-node="widget" required />
          </li>
          <li>
            <label>ios: CFBundleVersion</label>
            <input type="text" name="widget.ios.ios-CFBundleVersion" data-node="widget" required />
          </li>
          <li>
            <label>wp: packageVersion</label>
            <input type="text" name="widget.windows.windows-packageVersion" data-node="widget" required />
          </li>
          <li>
            <label>name</label>
            <input type="text" name="name" data-node="name" required />
          </li>
          <li>
            <label>description</label>
            <input type="text" name="description"  data-node="description"  />
          </li>
          <li>
            <label>author</label>
            <input type="text" name="author"  data-node="author"  />
          </li>
          <li>
            <label>author email</label>
            <input type="text" name="author.email" data-node="author"  />
          </li>
          <li>
            <label>author href</label>
            <input type="text" name="author.href"  data-node="author" />
          </li>
          <li>
            <label>content</label>
            <input type="text" name="content.src"  data-node="content" />
          </li>
          <li>
            <label>access</label>
            <input type="text" name="access"  data-node="access" />
          </li>
          <li>
            <label>Fullscreen</label>
            <input type="text" name="Fullscreen"  data-node="preference" placeholder="true" />
          </li>
          <li>
            <label>DisallowOverscroll</label>
            <input type="text" name="DisallowOverscroll" data-node="preference" placeholder="true"  />
          </li>
          <li>
            <label>BackgroundColor</label>
            <input type="text" name="BackgroundColor" data-node="preference"  />
          </li>
          <li>
            <label>HideKeyboardFormAccessoryBar</label>
            <input type="text" name="HideKeyboardFormAccessoryBar" data-node="preference" placeholder="true" />
          </li>
          <li>
            <label>Orientation</label>
            <select name="Orientation" data-node="preference">
              <option value="default">default</option>
              <option value="landscape">landscape</option>
              <option value="portrait">portrait</option>
            </select>
          </li>
        </ul>
        <ul>
          <li>
            <label>phonegap-version</label>
            <input type="text" name="phonegap-version" data-node="preference" placeholder="" required />
          </li>
          <li>
            <label>permissions</label>
            <input type="text" name="permissions" data-node="preference" placeholder="" required />
          </li>
        </ul>
      </form>
    </div>
  </div>

  <div class="flex">
    <textarea id="editor.config.content"></textarea>
  </div>

</div>
