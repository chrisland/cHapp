<div class="header">
  <div class="logo"></div>
  <ul>
    <li class="pageBtn" data-page="apps" data-task="appSave">Save</li>
  </ul>
</div>


<form name="formApp" onSubmit="return false;">

  <ul>
    <li>
      <label>Name</label>
      <input type="text" name="name" required />
    </li>
    <li class="noEdit">
      <label>localPath</label>
      <input type="text" id="appLocalPath" name="localPath" readonly required />
      <button class="pageBtn" data-task="appChooseFolder">Select Folder</button>
    </li>
    <li class="noEdit">
      <label>App Version</label>
      <select name="appVersion" required>
        <option value="blank">_blank</option>
      </select>
    </li>
  </ul>

  <input type="hidden" name="id" readonly />

</form>
