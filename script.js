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
      var points = Array.prototype.slice.call(document.getElementsByName("goodPoint"));
      points = filterEmptyText(points);
      
      var othersTitle = "この行動をやっていなかった世界線";
      var others = Array.prototype.slice.call(document.getElementsByName("anotherStory"));
      others = filterEmptyText(others);
  }else if(radio[1].checked) {
      var pointTitle = "この行動のまずかった点";
      var points = Array.prototype.slice.call(document.getElementsByName("badPoint"));
      points = filterEmptyText(points);
  
      var othersTitle = "行動の改善案";
      var others = Array.prototype.slice.call(document.getElementsByName("improvementPlan"));
      others = filterEmptyText(others);
  }
  const l_circumstance = "\* 行動の背景説明";
  const l_who = `|誰が|${who}|`;
  const l_when = `|いつ|${when}|`;
  const l_where = `|どこで|${where}|`;
  const l_why = `|なぜ|${why}|`;
  const l_whathow = `|何をどうした|${whathow}|`;
  const l_result = `|結果どうなった|${result}|`;

  const l_pointTitle = `\* ${pointTitle}`;
  const l_points = gatherItems(points);

  const l_othersTitle = `\* ${othersTitle}`;
  const l_others = gatherItems(others);

  const l_appendixTitle = `\* ${document.getElementById("appendix").placeholder}`;
  const l_appendix = "";

  const endText = "//必要に応じて丸括弧内を書き換えて記事にタグをつける。&tag(生活);とか\n&tag(test tag);\n//コメント欄を生成\n#pcomment";

  var res = [l_circumstance, l_who, l_when, l_where, l_why, l_whathow, l_result, l_pointTitle, l_points, l_othersTitle, l_others, l_appendixTitle, l_appendix, endText].join("\n");
  
  
  return res;
}
function gatherItems(items) {
  var tmp = "";
  items.forEach( function( item ) {
      tmp = `${tmp}-${item.value}\n`;
  });
  return tmp;
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

function filterEmptyText(items){
  var res = items.filter(word => word.value.length > 0);
  return res;
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
