function gatherAllText() {
  var who = document.getElementById("who").value;
  var when = document.getElementById("when").value;
  var where = document.getElementById("where").value;
  var why = document.getElementById("why").value;
  var whathow = document.getElementById("whathow").value;
  var result = document.getElementById("result").value;


  radio = document.getElementsByName('maker');
  if(radio[0].checked) {
      var pointTitle = "この行動の良かった点";
      var points = alignNotEmptyElements(document.getElementsByName("goodPoint"));
      
      var othersTitle = "この行動をやっていなかった世界線";
      var others = alignNotEmptyElements(document.getElementsByName("anotherStory"));

  }else if(radio[1].checked) {
      var pointTitle = "この行動のまずかった点";
      var points = alignNotEmptyElements(document.getElementsByName("badPoint"));
  
      var othersTitle = "行動の改善案";
      var others = alignNotEmptyElements(document.getElementsByName("improvementPlan"));
  }
  const l_circumstance = "\* 行動の背景説明";
  const l_who = `|誰が|${who}|`;
  const l_when = `|いつ|${when}|`;
  const l_where = `|どこで|${where}|`;
  const l_why = `|なぜ|${why}|`;
  const l_whathow = `|何をどうした|${whathow}|`;
  const l_result = `|結果どうなった|${result}|`;

  const l_pointTitle = `\* ${pointTitle}`;
  const l_points = points;

  const l_othersTitle = `\* ${othersTitle}`;
  const l_others = others;

  const l_appendixTitle = `\* ${document.getElementById("appendix1").placeholder}`;
  const l_appendix = alignNotEmptyElements(document.getElementsByName("appendix"));

  const endText = "//必要に応じて丸括弧内を書き換えて記事にタグをつける。&tag(生活);とか\n&tag(test tag);\n//コメント欄を生成\n#pcomment";

  var res = [l_circumstance, l_who, l_when, l_where, l_why, l_whathow, l_result, l_pointTitle, l_points, l_othersTitle, l_others, l_appendixTitle, l_appendix, endText].join("\n");
  
  
  return res;
}

function itemizeTextsOnWiki(items) {
  var tmp = "";
  items.forEach( function( item ) {
      tmp = `${tmp}-${item.value}\n`;
  });
  return tmp;
}

function filterEmptyText(items){
  var res = items.filter(word => word.value.length > 0);
  return res;
}

function alignNotEmptyElements(items) {
  var items_array = Array.prototype.slice.call(items);
  items_array = filterEmptyText(items_array);
  return itemizeTextsOnWiki(items_array);
}

function copy2Clipboard() {
  var copyTarget = gatherAllText();
  navigator.clipboard.writeText(copyTarget).then(success,faild);

  function success(){
      alert("コピーできました");
  }
  function faild(){
      alert("コピー失敗しました。ブラウザを変えてみたらうまくいくかも");
  }
  
}


function formSwitch(){
  radio = document.getElementsByName('maker');
  if(radio[0].checked) {
      document.getElementById('goodchoice').style.display = "";
      document.getElementById('badchoice').style.display = "none";
  }else if(radio[1].checked) {
      document.getElementById('goodchoice').style.display = "none";
      document.getElementById('badchoice').style.display = "";
  }
}

window.onload = formSwitch();

var i = 1 ;
function addForm(name, parentId) {
  var input_data = document.createElement('textarea');
  input_data.className = 'large';
  input_data.id = 'inputform_' + i;
  input_data.name = name;
  input_data.placeholder = '追加フォーム-' + i;
  // var parent = document.getElementById('form_area');
  var parent = document.getElementById('form_area_' + parentId);
  parent.appendChild(input_data);

  var button_data = document.createElement('button');
  button_data.id = i;
  button_data.onclick = function(){deleteBtn(this, parentId);}
  button_data.innerHTML = '削除';
  var input_area = document.getElementById(input_data.id);
  parent.appendChild(button_data);

  i++ ;
}

function deleteBtn(target, parentId) {
  var target_id = target.id;
  var parent = document.getElementById('form_area_' + parentId);
  var ipt_id = document.getElementById('inputform_' + target_id);
  var tgt_id = document.getElementById(target_id);
  parent.removeChild(ipt_id);
  parent.removeChild(tgt_id);	
}
