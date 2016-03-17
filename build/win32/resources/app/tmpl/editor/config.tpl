<div class="submenue"></div>

<div class="content flex p-top-1">

  <div class="flex p-right-1">
    <div id="editor.config.ui" class="box-list">
      <form name="configForm">
        <ul>
          <li>
            <label>reverse-domain identifier</label>
            <input type="text" name="widget.id"  required />
          </li>
          <li>
            <label>version</label>
            <input type="text" name="widget.version" required />
          </li>
          <li>
            <label>name</label>
            <input type="text" name="name"  required />
          </li>
          <li>
            <label>description</label>
            <input type="text" name="description"   />
          </li>
          <li>
            <label>author</label>
            <input type="text" name="author" />
          </li>
          <li>
            <label>author email</label>
            <input type="text" name="author.email"  />
          </li>
          <li>
            <label>author href</label>
            <input type="text" name="author.href"   />
          </li>
          <li>
            <label>content</label>
            <input type="text" name="content.src"   />
          </li>


          <li>
            <label>phonegap-version</label>
            <input type="text" name="preference.phonegap-version"  placeholder="" required />
          </li>
          <li>
            <label>orientation</label>
            <select name="preference.orientation" >
              <option value="default">default</option>
              <option value="landscape">landscape</option>
              <option value="portrait">portrait</option>
            </select>
          </li>
          <li>
            <label>fullscreen</label>
            <input type="text" name="preference.fullscreen" placeholder="true" />
          </li>




          <li>
            <label>access</label>
            <input type="text" name="access.origin" placeholder="*" />
          </li>

          <li>
            <label>DisallowOverscroll (Android, iOS)</label>
            <input type="text" name="preference.DisallowOverscroll"  placeholder="true"  />
          </li>
          <li>
            <label>BackgroundColor (Android)</label>
            <input type="text" name="preference.BackgroundColor"   />
          </li>

        </ul>
      </form>
    </div>
  </div>



</div>
