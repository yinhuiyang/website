module.exports =  function (type, versions, showAddVersionButton, name) {
  var getTime = require('./getTime.js');
  var getstatus = require('./getstatus.js');
  let li = ''
  var num = 2
  type == 2 && versions.length > 2? num = 2: num = versions.length
  for(let i = 0; i< num; i++) {
    li += `<li>
      <div>
        <a class="version-number" href="toVersion.do?versionid=${versions[i].versionid}">${versions[i].title}</a>
        <span class="time">${getTime(versions[i].planonlinetime)}</span>
        <span class="status ${versions[i].status== '8'|| versions[i].status== '9'? 'coos-green': ''}" >${getstatus(versions[i].status)}</span>
        <a class="a-link version-pencil" data-versionid="${versions[i].versionid}" ${showAddVersionButton == '1' ? '': 'style="display: none;"'}><i class="fa fa-pencil"></i></a>
        <a class="a-link versionDel" 
        data-versionid="${versions[i].versionid}"
        data-versionname="${name +''+versions[i].title}"
        ${showAddVersionButton == '1' ? '': 'style="display: none;"'}><i class="fa fa-trash-o"></i></a>
      </div>
    </li>`
  }
  return li
}