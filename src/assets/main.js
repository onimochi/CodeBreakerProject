
// 隠しパラメータ
let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');


/****************************************
*  するfunction
* 「推測を送る」ボタンを押すと実行される
*****************************************/
function guess() {
    // ユーザー入力のDOMエレメントを取得
    let input = document.getElementById('user-guess');
    // 隠しinputの両者の値が空ならば、乱数を発生させる
    if( answer.value === '' || attempt.value === '' ) {
      setHiddenFields();
    }
    // DOM要素を検証し、入力が4文字であるかどうか
    // validateInput()関数でバリデートする
    if( !validateInput( input.value ) ) {
      return false;
    } else {
      // ちゃんと4文字入力されていれば、「試行回数」を1増やす
      attempt.value++;
    }
    // getResults()関数で結果を判定したのち、結果メッセージを出力
    const MAX_ATTEMPT = 10;
    if(getResults(input.value)){
      setMessage( "You Win! :)" );
      showAnswer(true);
      showReplay();
    } else if ( attempt.value >= MAX_ATTEMPT ) {
      setMessage( "You Lose! :(" );
      showAnswer(false);
      showReplay();
    } else {
      setMessage( "Incorrect, try again." );
    }
}

/****************************************
*  解答をスタイリングつつ表示するfunction
*****************************************/
function showAnswer(isWin) {
  let code = document.getElementById('code');
  code.innerHTML = answer.value;
  if(isWin) {
    code.className += ' success'
  } else {
    code.className += ' failure'
  }
}

/****************************************
*  リプレイ表示切り替えfunction
*****************************************/
function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}

/****************************************
*  ユーザー入力が正解と一致するか判定するfunction
*****************************************/
function getResults(userInput) {
  let resultDiv = document.getElementById('results');
  // 結果表示用HTML
  // ユーザーの入力をdivに記録し
  let addResultDiv = '<div class="row"><span class="col-md-6">' + userInput + '</span><div class="col-md-6">';
  // 一致した文字数を格納する変数
  // 答えに応じてアイコンをaddResultDivに追加していく
  let correctCount = 0;
  for (let i in userInput) {
    // 答えの同じ位置のcharacterと比較
    if (userInput[i] === answer.value[i]) {
      // 位置が合っていればOKアイコンをつける
      addResultDiv += '<span class="glyphicon glyphicon-ok">'
      correctCount++;
    } else if (answer.value.includes(userInput[i])) {
      addResultDiv += '<span class="glyphicon glyphicon-transfer"></span>'
    } else {
      addResultDiv += '<span class="glyphicon glyphicon-remove"></span>'
    }
  }
  // 最後にアイコンを追加し終わったら閉じタグをaddResultDivに追加
  addResultDiv += '</div></div>'
  // DOMに書き出す
  resultDiv.innerHTML += addResultDiv;

  if( correctCount === 4 ){
    return true;
  } else {
    return false;
  }

}

/*********************
*  乱数を生成するfunction
**********************/
function setHiddenFields() {
  const MAX = 9999;
  const MIN = 0;
  // answerに1-9999までの乱数を格納
  let strAnswer = ( Math.floor(Math.random() * ( MAX - (MIN + 1) ) + MIN )).toString();
  // 4桁以外の場合は先頭に0をつける
  while ( strAnswer.length < 4 ) {
    strAnswer = "0" + strAnswer;
  }
  // 解答に乱数をセット
  answer.value = strAnswer;
  // 試行回数を0に初期化する
  attempt.value = 0;
}

/**************************
*  メッセージを出力するfunction
***************************/
function setMessage(outputMessage) {
  // messageラベルをパラメータに与えられた文に設定する
  let message = document.getElementById('message');
  message.innerHTML = outputMessage;
}

/****************************************
*  ユーザー入力が4文字であることをヴァリデートするfunction
*****************************************/
// フォームはtype="number"になってるけど、
// userInputはtoSrting()しなくていいの？
function validateInput(userInput) {
  if( userInput.toString().length === 4 ){
    return true;
  } else {
    setMessage( "Guesses must be exactly 4 characters long." );
    return false;
  }
}
