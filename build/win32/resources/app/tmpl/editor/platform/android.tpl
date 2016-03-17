<div id="editor.platform.android.tabnav" class="tab-nav">
  <button class="pageBtn flex tab-btn" data-task="platformIos.tab" data-content="editor.platform.android.ui">config</button>
  <button class="pageBtn flex tab-btn" data-task="platformIos.tab" data-content="editor.platform.android.splash">splash</button>
  <button class="pageBtn flex tab-btn" data-task="platformIos.tab" data-content="editor.platform.android.icons">icons</button>
</div>

<div id="editor.platform.android" class="content flex f-colum p-top-1 p-right-1">

  <h1>android</h1>

  <div class="p-bottom-1">
    <input type="checkbox" name="active" class="platformActive" id="editor.platform.android.active"/> Active
  </div>


  <div id="editor.platform.android.ui" class="box-list tab-page">
    <form name="configForm" class="flex">
      <ul class="flex f-colum">

        <li>
          <label>android-versionCode</label>
          <input type="text" name="widget.android-versionCode" placeholder="" />
        </li>
        <li>
          <label>android-minSdkVersion</label>
          <input type="text" name="preference.android-minSdkVersion" placeholder="" />
        </li>
        <li>
          <label>android-maxSdkVersion</label>
          <input type="text" name="preference.android-maxSdkVersion" placeholder="" />
        </li>
        <li>
          <label>android-targetSdkVersion</label>
          <input type="text" name="preference.android-targetSdkVersion" placeholder="" />
        </li>
        <li>
          <label>android-installLocation</label>
          <select name="preference.android-installLocation" >
            <option value=""> - </option>
            <option value="internalOnly">internalOnly</option>
            <option value="auto">auto</option>
            <option value="preferExternal">preferExternal</option>
          </select>
        </li>
        <li>
          <label>android-windowSoftInputMode</label>
          <select name="preference.android-windowSoftInputMode" >
            <option value=""> - </option>
            <option value="stateUnspecified">stateUnspecified</option>
            <option value="stateUnchanged">stateUnchanged</option>
            <option value="stateHidden">stateHidden</option>
            <option value="stateAlwaysHidden">stateAlwaysHidden</option>
            <option value="stateVisible">stateVisible</option>
            <option value="stateAlwaysVisible">stateAlwaysVisible</option>
            <option value="adjustUnspecified">adjustUnspecified</option>
            <option value="adjustResize">adjustResize</option>
            <option value="adjustPan">adjustPan</option>
          </select>
        </li>
        <li>
          <label>android-build-tool</label>
          <input type="text" name="preference.android-build-tool" placeholder="" />
        </li>
        <li>
          <label>SplashScreen</label>
          <input type="text" name="preference.SplashScreen" placeholder="" />
        </li>
        <li>
          <label>SplashScreenDelay</label>
          <input type="text" name="preference.SplashScreenDelay" placeholder="" />
        </li>
        <li>
          <label>KeepRunning</label>
          <select name="preference.KeepRunning" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>LoadUrlTimeoutValue</label>
          <input type="text" name="preference.LoadUrlTimeoutValue" placeholder="number in milliseconds, default to 20000" />
        </li>
        <li>
          <label>InAppBrowserStorageEnabled</label>
          <select name="preference.InAppBrowserStorageEnabled" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>LoadingDialog</label>
          <input type="text" name="preference.LoadingDialog" placeholder="string, defaults to null" />
        </li>
        <li>
          <label>LoadingPageDialog</label>
          <input type="text" name="preference.LoadingPageDialog" placeholder="string, defaults to null" />
        </li>
        <li>
          <label>ErrorUrl</label>
          <input type="text" name="preference.ErrorUrl" placeholder="URL, defaults to null" />
        </li>
        <li>
          <label>ShowTitle</label>
          <input type="text" name="preference.ShowTitle" placeholder="boolean, defaults to false" />
        </li>
        <li>
          <label>LogLevel</label>
          <select name="preference.LogLevel" >
            <option value=""> - </option>
            <option value="ERROR">ERROR</option>
            <option value="WARN">WARN</option>
            <option value="INFO">INFO</option>
            <option value="DEBUG">DEBUG</option>
            <option value="VERBOSE">VERBOSE</option>
          </select>
        </li>
        <li>
          <label>AndroidLaunchMode</label>
          <input type="text" name="preference.AndroidLaunchMode" placeholder="string, defaults to singleTop" />
        </li>
        <li>
          <label>DefaultVolumeStream</label>
          <input type="text" name="preference.DefaultVolumeStream" placeholder="string, defaults to default" />
        </li>
        <li>
          <label>OverrideUserAgent</label>
          <input type="text" name="preference.OverrideUserAgent" placeholder="string, not set by default" />
        </li>
        <li>
          <label>AppendUserAgent</label>
          <input type="text" name="preference.AppendUserAgent" placeholder="string, not set by default" />
        </li>

      </ul>
    </form>
  </div>


  <div id="editor.platform.android.splash" class="icons tab-page hidden">

    <h2>Splash</h2>

    <div class="item">
      <div class="preview"></div>
      <div class="head">port-ldpi</div>
      <div class="size">320 x 426</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.splashAdd" data-content='{"file":"port-ldpi", "w":320, "h":426, "density":"land-hdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="320-426"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">port-mdpi</div>
      <div class="size">320 x 470</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.splashAdd" data-content='{"file":"port-mdpi", "w":320, "h":470, "density":"land-hdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="320-470"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">port-hdpi</div>
      <div class="size">480 x 640</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.splashAdd" data-content='{"file":"port-hdpi", "w":480, "h":640, "density":"land-hdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="480-640"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">port-xhdpi</div>
      <div class="size">720 x 960</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.splashAdd" data-content='{"file":"port-xhdpi", "w":720, "h":960, "density":"land-hdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="720-960"/>
    </div>




    <div class="item">
      <div class="preview"></div>
      <div class="head">land-ldpi</div>
      <div class="size">426 x 320</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.splashAdd" data-content='{"file":"land-ldpi", "w":426, "h":320, "density":"land-hdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="426-320"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">land-mdpi</div>
      <div class="size">470 x 320</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.splashAdd" data-content='{"file":"land-mdpi", "w":470, "h":320, "density":"land-hdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="470-320"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">land-hdpi</div>
      <div class="size">640 x 480</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.splashAdd" data-content='{"file":"land-hdpi", "w":640, "h":480, "density":"land-hdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="640-480"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">land-xhdpi</div>
      <div class="size">960 x 720</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.splashAdd" data-content='{"file":"land-xhdpi", "w":960, "h":720, "density":"land-hdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="960-720"/>
    </div>

  </div>


  <div id="editor.platform.android.icons" class="icons tab-page hidden">

    <h2>Icons</h2>

    <div class="item">
      <div class="preview"></div>
      <div class="head">ldpi</div>
      <div class="size">36 x 36</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.iconAdd" data-content='{"file":"ldpi", "w":36, "h":36, "density":"ldpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="36-36"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">mdpi</div>
      <div class="size">48 x 48</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.iconAdd" data-content='{"file":"mdpi", "w":48, "h":48, "density":"mdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="48-48"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">hdpi</div>
      <div class="size">72 x 72</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.iconAdd" data-content='{"file":"hdpi", "w":72, "h":72, "density":"hdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="72-72"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">xhdpi</div>
      <div class="size">96 x 96</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.iconAdd" data-content='{"file":"xhdpi", "w":96, "h":96, "density":"xhdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="96-96"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">xxhdpi</div>
      <div class="size">144 x 144</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformAndroid.iconAdd" data-content='{"file":"xxhdpi", "w":144, "h":144, "density":"xxhdpi"}'>add path</div>
      <div class="pageBtn" data-task="platformAndroid.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="144-144"/>
    </div>

  </div>



</div>
