<div id="editor.platform.ios.tabnav" class="tab-nav">
  <button class="pageBtn flex tab-btn" data-task="platformIos.tab" data-content="editor.platform.ios.ui">config</button>
  <button class="pageBtn flex tab-btn" data-task="platformIos.tab" data-content="editor.platform.ios.splash">splash</button>
  <button class="pageBtn flex tab-btn" data-task="platformIos.tab" data-content="editor.platform.ios.icons">icons</button>
</div>

<div id="editor.platform.ios" class="content flex f-colum p-top-3 p-right-1">

  <h1>iOS</h1>

  <div class="p-bottom-1">
    <input type="checkbox" name="active" class="platformActive" id="editor.platform.ios.active"/> Active
  </div>



  <div id="editor.platform.ios.ui" class="box-list tab-page ">

    <h2>Config</h2>

    <form name="configForm" class="flex">
      <ul class="flex f-colum">

        <li>
          <label>ios-CFBundleVersion</label>
          <input type="text" name="widget.ios-CFBundleVersion" placeholder="" />
        </li>

        <li>
          <label>target-device</label>
          <select name="preference.target-device" >
            <option value=""> - </option>
            <option value="handset">handset</option>
            <option value="tablet">tablet</option>
            <option value="universal">universal</option>
          </select>
        </li>
        <li>
          <label>prerendered-icon</label>
          <select name="preference.prerendered-icon" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>detect-data-types</label>
          <input type="text" name="preference.detect-data-types" placeholder="" />
        </li>
        <li>
          <label>exit-on-suspend</label>
          <select name="preference.exit-on-suspend" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>deployment-target</label>
          <input type="text" name="preference.deployment-target" placeholder="" />
        </li>


        <li>
          <label>EnableViewportScale</label>
          <select name="preference.EnableViewportScale" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>MediaPlaybackAllowsAirPlay</label>
          <select name="preference.MediaPlaybackAllowsAirPlay" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>MediaPlaybackRequiresUserAction</label>
          <select name="preference.MediaPlaybackRequiresUserAction" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>AllowInlineMediaPlayback</label>
          <select name="preference.AllowInlineMediaPlayback" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>BackupWebStorage</label>
          <input type="text" name="preference.BackupWebStorage" placeholder="string, either none, local, or the default cloud" />
        </li>
        <li>
          <label>TopActivityIndicator</label>
          <select name="preference.TopActivityIndicator" >
            <option value=""> - </option>
            <option value="whiteLarge">whiteLarge</option>
            <option value="white">white</option>
            <option value="gray">gray</option>
          </select>
        </li>
        <li>
          <label>KeyboardDisplayRequiresUserAction</label>
          <select name="preference.KeyboardDisplayRequiresUserAction" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>SuppressesIncrementalRendering</label>
          <select name="preference.SuppressesIncrementalRendering" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>GapBetweenPages</label>
          <input type="text" name="preference.GapBetweenPages" placeholder="float, defaults to 0" />
        </li>
        <li>
          <label>PageLength</label>
          <input type="text" name="preference.PageLength" placeholder="float, defaults to 0" />
        </li>
        <li>
          <label>PaginationBreakingMode</label>
          <input type="text" name="preference.PaginationBreakingMode" placeholder="string, defaults to page" />
        </li>
        <li>
          <label>PaginationMode</label>
          <input type="text" name="preference.PaginationMode" placeholder="string, defaults to unpaginated" />
        </li>
        <li>
          <label>UIWebViewDecelerationSpeed</label>
          <input type="text" name="preference.UIWebViewDecelerationSpeed" placeholder="string, defaults to normal" />
        </li>
        <li>
          <label>ErrorUrl</label>
          <input type="text" name="preference.ErrorUrl" placeholder="string, not set by default" />
        </li>
        <li>
          <label>OverrideUserAgent</label>
          <input type="text" name="preference.OverrideUserAgent" placeholder="string, not set by default" />
        </li>
        <li>
          <label>AppendUserAgent</label>
          <input type="text" name="preference.AppendUserAgent" placeholder="string, not set by default" />
        </li>
        <li>
          <label>CordovaWebViewEngine</label>
          <input type="text" name="preference.CordovaWebViewEngine" placeholder="string, defaults to 'CDVUIWebViewEngine'" />
        </li>
        <li>
          <label>SuppressesLongPressGesture</label>
          <select name="preference.SuppressesLongPressGesture" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>
        <li>
          <label>Suppresses3DTouchGesture</label>
          <select name="preference.Suppresses3DTouchGesture" >
            <option value=""> - </option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </li>

      </ul>

    </form>
  </div>


  <div id="editor.platform.ios.splash" class="icons tab-page hidden">

    <h2>Splash</h2>

    <div class="item">
      <div class="preview"></div>
      <div class="head">Default~iphone</div>
      <div class="size">320 x 480</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformIos.splashAdd" data-content='{"file":"Default~iphone", "w":320, "h":480}'>add path</div>
      <div class="pageBtn" data-task="platformIos.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="320-480"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">Default@2x~iphone</div>
      <div class="size">640 x 960</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformIos.splashAdd" data-content='{"file":"Default@2x~iphone", "w":640, "h":960}'>add path</div>
      <div class="pageBtn" data-task="platformIos.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="640-960"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">Default-Portrait~ipad</div>
      <div class="size">768 x 1024</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformIos.splashAdd" data-content='{"file":"Default~iphone", "w":768, "h":1024}'>add path</div>
      <div class="pageBtn" data-task="platformIos.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="768-1024"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">Default-Portrait@2x~ipad</div>
      <div class="size">1536 x 2048</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformIos.splashAdd" data-content='{"file":"Default-Portrait@2x~ipad", "w":1536, "h":2048}'>add path</div>
      <div class="pageBtn" data-task="platformIos.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="1536-2048"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">Default-Landscape~ipad.png</div>
      <div class="size">1024 x 768</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformIos.splashAdd" data-content='{"file":"Default-Landscape~ipad.png", "w":1024, "h":768}'>add path</div>
      <div class="pageBtn" data-task="platformIos.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="1024-768"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">Default-Landscape@2x~ipad</div>
      <div class="size">2048 x 1536</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformIos.splashAdd" data-content='{"file":"Default-Landscape@2x~ipad", "w":2048, "h":1536}'>add path</div>
      <div class="pageBtn" data-task="platformIos.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="2048-1536"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">Default-568h@2x~iphone</div>
      <div class="size">640 x 1136</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformIos.splashAdd" data-content='{"file":"Default-568h@2x~iphone", "w":640, "h":1136}'>add path</div>
      <div class="pageBtn" data-task="platformIos.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="640-1136"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">Default-667h</div>
      <div class="size">750 x 1334</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformIos.splashAdd" data-content='{"file":"Default-667h", "w":750, "h":1334}'>add path</div>
      <div class="pageBtn" data-task="platformIos.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="750-1334"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">Default-736h</div>
      <div class="size">1242 x 2208</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformIos.splashAdd" data-content='{"file":"Default-736h", "w":1242, "h":2208}'>add path</div>
      <div class="pageBtn" data-task="platformIos.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="1242-2208"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">Default-Landscape-736h</div>
      <div class="size">2208 x 1242</div>
      <div class="sub"></div>
      <div class="pageBtn" data-task="platformIos.splashAdd" data-content='{"file":"Default-Landscape-736h", "w":2208, "h":1242}'>add path</div>
      <div class="pageBtn" data-task="platformIos.splashRemove">Remove</div>
      <input type="text" readonly  name="src" rel="2208-1242"/>
    </div>

  </div>


  <div id="editor.platform.ios.icons" class="icons tab-page hidden">

    <h2>Icons</h2>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-60@3x</div>
      <div class="size">180 x 180</div>
      <div class="sub">iPhone 6 Plus | iOS 8.0+</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-60@3x", "w":180, "h":180}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="180-180"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-60</div>
      <div class="size">60 x 60</div>
      <div class="sub">iPhone / iPod Touch | iOS 7.0+</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-60", "w":60, "h":60}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="60-60"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-60@2x</div>
      <div class="size">120 x 120</div>
      <div class="sub">iPhone / iPod Touch | iOS 7.0+</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-60@2x", "w":120, "h":120}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="120-120"/>
    </div>


    <div class="item">
      <div class="preview"></div>
      <div class="head">icon</div>
      <div class="size">57 x 57</div>
      <div class="sub">iPhone / iPod Touch | iOS 6.1</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon", "w":57, "h":57}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="57-57"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon@2x</div>
      <div class="size">114 x 114</div>
      <div class="sub">iPhone / iPod Touch | iOS 6.1</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon@2x", "w":114, "h":114}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="114-114"/>
    </div>



    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-small</div>
      <div class="size">29 x 29</div>
      <div class="sub">iPhone Spotlight and Settings Icon | iOS 6.1</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-small", "w":29, "h":29}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="29-29"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-small@2x</div>
      <div class="size">58 x 58</div>
      <div class="sub">iPhone Spotlight and Settings Icon</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-small@2x", "w":58, "h":58}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="58-58"/>
    </div>



    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-76</div>
      <div class="size">76 x 76</div>
      <div class="sub">iPad</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-76", "w":76, "h":76}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="76-76"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-76@2x.png</div>
      <div class="size">152 x 152</div>
      <div class="sub">iPad</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-76@2x.png", "w":152, "h":152}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="152-152"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-72</div>
      <div class="size">72 x 72</div>
      <div class="sub">iPad | iOS 6.1</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-72.png", "w":72, "h":72}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="72-72"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-72@2x</div>
      <div class="size">144 x 144</div>
      <div class="sub">iPad | iOS 6.1</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-72@2x.png", "w":144, "h":144}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="144-144"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-50</div>
      <div class="size">50 x 50</div>
      <div class="sub">iPad Spotlight and Settings Icon | iOS 6.1</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-50.png", "w":50, "h":50}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="50-50"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-50@2x</div>
      <div class="size">100 x 100</div>
      <div class="sub">iPad Spotlight and Settings Icon | iOS 6.1</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-50@2x.png", "w":100, "h":100}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="100-100"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-40</div>
      <div class="size">40 x 40</div>
      <div class="sub">Spotlight Icon</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-40.png", "w":40, "h":40}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="40-40"/>
    </div>

    <div class="item">
      <div class="preview"></div>
      <div class="head">icon-40@2</div>
      <div class="size">80 x 80</div>
      <div class="sub">Spotlight Icon</div>
      <div class="pageBtn" data-task="platformIos.iconAdd" data-content='{"file":"icon-20@2.png", "w":80, "h":80}'>add path</div>
      <div class="pageBtn" data-task="platformIos.iconRemove">Remove</div>
      <input type="text" readonly  name="src" rel="80-80"/>
    </div>


  </div>



</div>
