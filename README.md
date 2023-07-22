# 概要(v1.1.3)
## 使い方
### 通常ページ
ファイルから読み込む。
### スキミング防止対策がされているページ
cdn経由でここから読み込み。または別途cdn用アカウント制作してそちらから読み込む。

## ptProductStincky.min.js

### pretakeProtoStinckyFix( targetClass | string , targetWrap | string )
商品詳細(.fs-body-productがbodyにあるページ)でデフォルトで右側にある商品の件名や購入ボタンなどの概要要素をcssでstickyする際のバグ回避用オブジェクト。
（モーダルなどを開いた際に画面固定するとページ頭に表示が移動してしまうアレ）
#### 使い方
domを全て読み込んだタイミングで使う
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const stickyFix = new pretakeProtoStinckyFix('.fs-l-productLayout__item--2','.fs-l-productLayout');
  stickyFix.evScroll();
  stickyFix.obWatch(['active-style','is-modalOpen']);
});
```

## ptModal.min.js

### pretakeProtoModal( set | object , timeout | Number(optional) )
商品詳細(.fs-body-productがbodyにあるページ)で購入ボタン押した際にモーダル開く仕様の時使うオブジェクト。普通に連携しないモーダル設置する際も使用可能。
#### 使い方
domを全て読み込んだタイミングで使う
```javascript
const modal = new pretakeProtoModal({
  wrap: '.pt-modal__wrap',
  open: '.particular__open-btn',
  closed: '.fs-c-modal__close',
  closedBgElm: 'pt-modal__wrap',
  activeCls: 'active',
  aniCls: 'aniCls',
  isActiveB: '',
});
document.addEventListener('DOMContentLoaded', function() {
    modal.setModal();
});
```
#### 商品詳細の購入ボタン以外で使用する場合
cssは別途用意する。

``` html
<div class="om-modal__wrap">
  <span class="om-modal__close __mdl2" role="button" aria-label="閉じる"></span>
  <div class="om-modal__inn __mdl2">
  <!-- modal inside -->
  </div>
</div>

<div class="modal-open-btn">
  <div class="om-modal__open-btn __mdl2" role="button" aria-label="開く">
    <span class="fs-c-button__label">open modal</span>
  </div>
</div>
```
```javascript
const omModal = new pretakeProtoModal({
  wrap: '.om-modal__wrap',
  open: '.om-modal__open-btn',
  closed: '.om-modal__close',
  closedBgElm: 'om-modal__wrap',
  activeCls: 'active',
  aniCls: 'aniCls',
  isActiveB: '',
});
document.addEventListener('DOMContentLoaded', function() {
  omModal.setModal('.__mdl2');
});
```
### property
#### pretakeProtoModal.set.wrap(string)
wrap要素につけるclass,又はidを入れる。queryselectorの書き方と同じ。
#### pretakeProtoModal.set.open(string)
open要素につけるclass,又はidを入れる。queryselectorの書き方と同じ。
#### pretakeProtoModal.set.closed(string)
closed要素につけるclass,又はidを入れる。queryselectorの書き方と同じ。
#### pretakeProtoModal.set.closedBgElm(string)
背景要素につけるclassを入れる。
#### pretakeProtoModal.set.activeCls(string)
モーダルが開いた時にwrap要素につけるclassを入れる。
#### pretakeProtoModal.set.aniCls(string)
モーダルが開いた時にwrap要素につけるアニメーション用のclassを入れる。
#### pretakeProtoModal.set.isActiveB(string)
現状テスト状態。空の文字列で固定。

### メソッド
#### pretakeProtoModal.setModal( setNum | string (optional));
モーダルを初期化する。  
setNumに与えたクラス名がindex番号のかわりになる。
```javascript
// 複数のモーダルを作る場合
// 何も入れない場合「.__mdl1」が自動で入る
omModal.setModal(); // これは.__mdl1を対象にする
omModal.setModal('.__mdl2');
omModal.setModal('.__mdl3');
```
``` html
<!-- モーダルの「pretakeProtoModal.set.open」「pretakeProtoModal.set.closed」「モーダルの内容を入れる要素」にあたる要素に引数のクラスを付ける -->
<!-- この場合、「om-modal__close」「om-modal__open-btn」「om-modal__inn」 がそれ-->
<div class="om-modal__wrap">
  <span class="om-modal__close __mdl2" role="button" aria-label="閉じる"></span>

  <div class="om-modal__inn __mdl2">
  <!-- modal inside -->
  </div>
</div>

<div class="modal-open-btn">
  <div class="om-modal__open-btn __mdl2" role="button" aria-label="開く">
    <span class="fs-c-button__label">open modal</span>
  </div>
</div>
```

#### pretakeProtoModal.removeModal( setNum | string (optional));
モーダルを取り除く。int()すればオブジェクトを破壊するまでは初期化可能。  
取り除く際は、初期化と同じ引数にする。

## ptCore.js
## pretakeScript
FSで使用するテンプレートサイトで使う基本動作をまとめたメソッドやらオブジェクトを呼び出すオブジェクト。
### 使い方
head内のptCore.jsを読み込んだ後
```javascript
const pt = new pretakeScript();
const dropdownFooter = new pt.dropdown('f-acc-wrap',"f-acc-tit","f-acc-items","f-items-inn","is-active");
```

## pretakeScript.bodyClsContains( class | string )
bodyのクラス判別
return | bool
### 使い方
pretakeScriptを生成後
```javascript
if (pt.bodyClsContains('fs-body-product')) {
//bodyに「fs-body-product」があったときの処理
}
```

## pretakeScript.smoothScroll( ID | string , except | Array(optional) )
ページ内でIDで移動する時にスムーズに移動させる関数。

### 使い方
pretakeScriptを生成後
```javascript
pt.smoothScroll("glnav-block",["output-item-multi"]);
```
``` html
<!-- ↑ #で同名のIDの箇所へ移動する ↑ -->
<a href="#move-top">HOME</a>
```

### 引数
#### ID(string)
ページ内での追従グローバルナビなど画面上部に常に表示される要素のIDをつける。付けた要素の高さを計算してその分下にずらす。ない場合、空のdiv要素などにIDを付けてそれをbody内の上の方に配置して使用可。
#### except(Array)
モーダル、タグ切り替えなどで移動させたくないIDを使用している場合に使用。シャープはなし。
```javascript
pt.smoothScroll("glnav-block",["moveTo1","moveTo2","moveTo3"]);
```

## pretakeScript.smoothScrollSingle( elm | string , ID | string(optional) )
ページ内でIDで移動する時にスムーズに移動させる関数。  
単体では使わない。別の関数と組み合わせる際に使う。

### 使い方
pretakeScriptを生成後  
例 : トグルイベント後にスクロールするボタン設置する場合。  
(要素がdisplay:none;などで隠れているとスクロールしないため)
```javascript
//　トグルイベント初期化
// tglPanelオブジェクトに関しての動作はそちらの概要を参照
const tgl = new pt.tglPanel();
tgl.int();
//　クリック用のイベント関数
function clickEvent(e){
  const arr = this.outsideArr;
  // トグルイベント呼び出し
  tgl.call(index=2);
  // スクロールイベント
  pt.smoothScrollSingle(arr.elm,arr.ID);
};
// イベントリスナーに渡す引数
const arrCnt = {
  elm:"target-elm",
  ID:"glnav-block"
};
const clickElm = document.querySelector('.your-class');
clickElm.addEventListener('click' , {oustsideArr: arrCnt,handleEvent:clickEvent});
```
``` html
<!-- ↑ #で同名のIDの箇所へ移動する ↑ -->
<a href="#move-tglPanel2">HOME</a>

<div class="tab-panel">
  <div class="tab-panel__tab">
    <div class="tgl-swi tgl-swi__1 active">
      タブ1
    </div>
    <div class="tgl-swi tgl-swi__2">
      タブ2
    </div>
    <div class="tgl-swi tgl-swi__3">
      タブ3
    </div>
  </div>
  <div class="pane-target pane-target__1 show">
    <!-- パネル1 -->
  </div>
  <div class="pane-target pane-target__2">
    <!-- パネル1(ここへパネルを開いて移動) -->
    <div id="move-tglPanel2">
  </div>
  <div class="pane-target pane-target__3">
    <!-- パネル3 -->
  </div>
</div>
```

### 引数
#### elm(string)
移動先のID名をつける。#は無し。
#### ID(string)
ページ内での追従グローバルナビなど画面上部に常に表示される要素のIDをつける。付けた要素の高さを計算してその分下にずらす。ない場合、空のdiv要素などにIDを付けてそれをbody内の上の方に配置して使用可。


## pretakeScript.locationMoveToTag( ID | string)
他ページ移動時、追従ヘッダーなどで文章が隠れる際の位置調整用の関数。
### 使い方
pretakeScriptを生成後
```javascript
pt.locationMoveToTag("glnav-block");
```
### 引数
#### ID(string)
ページ内での追従グローバルナビなど画面上部に常に表示される要素のIDをつける。付けた要素の高さを計算してその分下にずらす。

## pretakeScript.inView(cls , op , anotherCls　| Object(optional) , addCls | string(optional) , onlyOnce | bool(optional))
画面内に入ったら特定の要素にクラスをつける関数。IntersectionObserver簡易版。

## pretakeScript.switchEvent(bp | Number , func | Function)
ブラウザの横幅が特定の幅になったら登録した関数をコールバックする関数

### 使い方
pretakeScriptを生成後
```javascript
const BREAK_POPINT = 800;
const setFunc = {
  mqMin: () => {
    console.log('幅800px超過の時');
  },
  mqMax: () => {
    console.log('幅800px以下の時');
  }
};
pt.switchEvent(BREAK_POPINT,setFunc);
```
eventListenerを使って幅でイベントを切り替える場合
```javascript
const BREAK_POPINT = 800;
const nodeElms = document.querySelector('.ym-class');

function funcMin(){
  console.log('幅800px超過の時');
};
function funcMax(){
  console.log('幅800px以下の時');
};

const setFunc = {
  mqMin: () => {
    nodeElms.addEventListener('click' , funcMin, false);
    nodeElms.removeEventListener('click' , funcMax, false);
  },
  mqMax: () => {
    nodeElms.addEventListener('click' , funcMax, false);
    nodeElms.removeEventListener('click' , funcMin, false);
  }
};
pt.switchEvent(BREAK_POPINT,setFunc);
```

### 引数
#### bp(Number)
切り替えの幅を指定。単位はつけない
```javascript
// これで800px
pt.switchEvent(800,setFunc);
```
#### func(Function)
切り替え時の関数を登録する。 
オブジェクトのkeyの名前は下記の例のもので固定（バグるので）
```javascript
const BREAK_POPINT = 800;
const setFunc = {
  //　関数はコールバック先で動かすので()不要
  mqMin: functionOne,
  mqMax: functionTwo
};
pt.switchEvent(BREAK_POPINT,setFunc);
```
## pretakeScript.dropdown( wrapper | string(optional), tarElm | string(optional), itemsWrap | string(optional), innItem | string(optional), tglCls | string(optional) )
クリックで開閉するドロップダウンを作るオブジェクト。
各引数に文字列を渡せば対象のclass名を変更可能。
### 使い方
pretakeScriptを生成、DOMの読みこみが終わった後。  
cssは各自用意する。
```javascript
//何も入れない場合デフォルトのclassを対象にする
//int()で初期化して使う
const dropdownFooter = new pt.dropdown();
dropdownFooter.int();
```
```html
<!-- 関数に引数を入れなかった場合 -->
<div class="acc__wrap">
	<p class="acc__ttl"><span class="__inn-txt">ドロップダウンタイトル</span><span class="acc__btn"></span></p>
	<div class="acc__list">
		<div class="acc__item"><p>ドロップダウン中身</p></div>
	</div>
</div>
```
### 引数
#### wrapper(string)
ドロップダウンの一番外側の要素につけるclass名を指定。「.」は無し。 
この要素で囲った内側にある要素がドロップダウンのイベントの対象になる。 
デフォルト = "acc__wrap"

#### tarElm(string)
ドロップダウンのクリック対象の要素につけるclass名を指定。「.」は無し。 
デフォルト = "acc__btn"

#### itemsWrap(string)
ドロップダウンの開閉の要素(外側)につけるclass名を指定。「.」は無し。 
デフォルト = "acc__list"

#### innItem(string)
ドロップダウンの開閉の要素(内側)につけるclass名を指定。「.」は無し。 
デフォルト = "acc__item"

#### tglCls(string)
ドロップダウンの開閉時、wrapperの要素につけるclass名を指定。「.」は無し。 
デフォルト = "is-active"

### メソッド
#### dropdown.int()
ドロップダウンを初期化する。

#### dropdown.remove()
ドロップダウンを取り除く。int()すればオブジェクトを破壊するまでは初期化可能。

## pretakeScript.tglPanel( tgl | string (optional), tab | string (optional), pane | string (optional))
トグルパネルを生成するオブジェクト。  
### 使い方
pretakeScriptを生成、DOMの読みこみが終わった後。  
cssは各自用意する。

```javascript
// 何も入れなければデフォルトの値で生成される。
// int()で初期化
const tgl = new pt.tglPanel();
tgl.int();
```
各タブ、パネルにはインデックス番号代わりのクラスをつける。  
「tgl-swi__*」「pane-target__*」がそれ。  
最初に開いておきたい要素にはそれぞれ「active」「show」を付けておく。
``` html
<div class="tab-panel">
  <div class="tab-panel__tab">
    <div class="tgl-swi tgl-swi__1 active">
      タブ1
    </div>
    <div class="tgl-swi tgl-swi__2">
      タブ2
    </div>
    <div class="tgl-swi tgl-swi__3">
      タブ3
    </div>
  </div>
  <div class="pane-target pane-target__1 show">
    <!-- パネル1 -->
  </div>
  <div class="pane-target pane-target__2">
    <!-- パネル2 -->
  </div>
  <div class="pane-target pane-target__3">
    <!-- パネル3 -->
  </div>
</div>
```
また、複数運用も可能  
大元のwrap要素にクラスを付け、以下のようにする。  
引数に値を渡す際は必ずクラス名が被らないようにする。「.」は無し。
```javascript
const tgl = new pt.tglPanel();
tgl.int('tab-panel__1');
tgl.int('tab-panel__2');
```
int()に入れた文字を大元のwrap要素にクラスとしてつける。
``` html
<div class="tab-panel tab-panel__1">
  <div class="tab-panel__tab">
    <div class="tgl-swi tgl-swi__1 active">
      タブ1
    </div>
  </div>
  <div class="pane-target pane-target__1 show">
    <!-- パネル1 -->
  </div>
</div>
<div class="tab-panel tab-panel__2">
  <div class="tab-panel__tab">
    <div class="tgl-swi tgl-swi__1 active">
      タブ1
    </div>
  </div>
  <div class="pane-target pane-target__1 show">
    <!-- パネル1 -->
  </div>
</div>
```
引数あり、なしを同時運用は不可。（バグります）
```javascript
//これはだめ
const tgl = new pt.tglPanel();
tgl.int();
tgl.int('tab-panel__1');
```

### 引数
####  tgl(string)
タブパネルの一番外側の要素につけるclass名を指定。「.」は有り。 
この要素で囲った内側にある要素がタブパネルのイベントの対象になる。 
デフォルト = ".tab-panel"

#### tab(string)
タブの要素につけるclass名を指定。「.」は無し。 
また、要素にはインデックス番号用のクラスも一緒につける。  
デフォルト = "tgl-swi"
```html
<div class="tab-panel__tab">
  <div class="tgl-swi tgl-swi__1 active">
    タブ1
  </div>
  <div class="tgl-swi tgl-swi__2">
    タブ2
  </div>
  <div class="tgl-swi tgl-swi__3">
    タブ3
  </div>
</div>
```

#### pane(string)
パネルの要素につけるclass名を指定。「.」は無し。 
また、要素にはインデックス番号用のクラスも一緒につける。  
デフォルト = "pane-target"

```html
<div class="pane-target pane-target__1 show">
  <!-- パネル1 -->
</div>
<div class="pane-target pane-target__2">
  <!-- パネル2 -->
</div>
<div class="pane-target pane-target__3">
  <!-- パネル3 -->
</div>
```
### メソッド
#### tglPanel.int( wrapLabel | string)
タブパネルを初期化する。
引数に値を渡した場合、オブジェクトを生成した際に指定したtglのクラス名＋wrapLabelの二つのクラス名で複数のタブパネルを作れる。

#### tglPanel.remove( wrapLabel | string)
タブパネルを取り除く。int()すればオブジェクトを破壊するまでは初期化可能。
取り除く際は、初期化と同じ引数にする。
```javascript
const tgl = new pt.tglPanel();
tgl.int('tab-panel__1');
// :
// :
// 何かしらの処理の後、タブパネルを取り除く
tgl.remove('tab-panel__1');
```

#### tglPanel.call( wrapLabel | string , index | Number)
特定のパネルをひらいだ状態にする。
初期化後に使用。
```javascript
// 初期化済みの状態で使用する
const tgl = new pt.tglPanel();
tgl.int();
const elm = document.querySelector('.ym-class');
elm.addEventListener('click' , (e)=>{
  // indexに渡した数字に該当するパネルが開く
  tgl.call(index=2);
});
```
初期化時に引数を渡している場合
```javascript
// 初期化済みの状態で使用する
const tgl = new pt.tglPanel();
tgl.int('tab-panel__1');
const elm = document.querySelector('.ym-class');
elm.addEventListener('click' , (e)=>{
  // indexに渡した数字に該当するパネルが開く
  tgl.call('tab-panel__1',2);
});
```

## pretakeScript.swapAnkr(tar | string ,url | string , cls | string(optional, oUrl | string(optional)) , oCls | string(optional))
futureShopの仕様で直接アンカーが付けられない文字に強引にアンカーを仕込む関数。  
主に商品詳細のレビューの「件」のところをクリックで移動したい時用。（いらない様な気もする…）
### 使い方
pretakeScriptを生成後
```javascript
// 吸い出しレビューがすでに見えている(トグルやモーダルで隠れていない)ならこれで動く
// 見えない場合は事前にトグルやモーダルを開いた状態にする工夫が必要。
if (document.querySelector('#output-review_rating fs-c-productReview__aggregateRating')) {
pt.swapAnkr('#output-review_rating .fs-c-aggregateRating__count','#output-reviw_desc','__ankr-pc','#output-reviw_desc-sp','__ankr-sp')  
}
```
### 引数
#### tar (string)
対象の要素を記載。中身は他の要素(spanやbなどインライン要素も含む)があるとうまくいかないことがあるのでので注意。
#### url (string)
対象のアンカーリンク先を記載。
#### cls (string)
付与するアンカーにつけるクラス名。「.」は無し。
#### oUrl(string)
対象のアンカーリンク先を記載。PCとSPとでアンカー先を分ける際に使用。
#### oCls (string)
付与するアンカーにつけるクラス名。「.」は無し。PCとSPとでアンカー先を分ける際に使用。


## pretakeScript.setEnvHeight()
ブラウザの縦幅(window.innerHeightで取れる値)を1/100にしてcssのカスタムプロパティーに登録する関数。単位はpx。
ブラウザ内の画面の高さを正確に描写する際に使用可。 
### 使い方
pretakeScriptを生成後
```javascript
pt.setEnvHeight();
```
```css
.my-class{
  /* --ym-env-vh = 1vh */
  /* vhと違い、URLを表示するアドレスバーも差し引かれた高さになる */
  min-height: calc(var(--ym-env-vh) * 100);
}
```

## omittedContent( string | string , count | Number)
文字数制限する関数。（呼び出し不可）
現状、「商品詳細の追従購入ボタンの商品名」、「パンくず（ptCore.jsを呼び出さない特定の下層ページを除く）」で自動で動く仕様にしてる。

## makeElements.js
DOM要素を新しく作ったり、移動、複製するためのjsファイル。  
基本的には商品詳細で本来置けない場所に要素をコピーしたり強引にDOMを移動するための関数セット。  
wordpressの記事など別ページの要素を呼び出す場合は使うこともできる。

### 使い方
head内で設置、任意の箇所で関数名で各関数を呼び出し。  
「単品、複数パターン」,「定期便」かでそれぞれ貼り付けるコードは変更する。

```html
<!-- idは商品詳細ページで使うので「makeElements-script」を必ずつける -->
<script type="text/javascript" src="{% items[/pt/js/makeElements.js] %}" id="makeElements-script"></script>
```
```html
<!-- 「単品、複数パターン」時は「pt.item.javascript_single_01.html」 -->
<!-- または「定期便」時は「pt.item.javascript_subscription.html」をそのまま使用 -->
<script id="single-script__based">
  (function () {
    // ~~~~~~~~
  }());
</script>
```

## reqHtlmGet( fileURL | URL, outputIdElm | string , selectElm | bool (optional), intName | string (optional) , callback | function(optional) )
wordpressの記事など別ページの要素を呼び出す時に使う関数。  
XMLHttpRequest簡易版(FetchAPIに切り替えるかも？)

### 使い方
呼び出し側
```html
<div class="sec__body-wp" id="clone-wp"></div>
<!-- 対象のDOMを読み込んでから -->
<script>
reqHtlmGet('https://yourwebsite/clone_top-media/','clone-wp',true,'#clone-wp__media');
</script>
```
「https://yourwebsite/clone_top-media/」側
```html
<div id="clone-wp__media" class="sec__media-wp">
  <!-- 読み込みたい内容。内容はwrap要素（この場合#clone-wp__media）も含む。 -->
</div>
```

### 引数
#### fileURL (URL)
呼び出す側のURLを記載。文字列扱い

#### outputIdElm (string)
呼び出し側のwrap要素につけているIDを記載（#は不要）

#### selectElm (bool)
そのページ全てを呼び出すか一部を呼び出すかを切り替える。  
falseで全て、trueで一部のみ呼び出す。  
デフォルト = false

#### intName (string)
呼び出す側の呼び出すwrap要素につけているID名、又はclass名を付ける。  
class名の場合複数箇所に同内容複写可能  
デフォルト = '#target'

#### callback (function)
呼び出し後に使用したいコールバック関数を入れる。  
渡した関数には、selectElm=falseの場合、XMLHttpRequest().responseText。  
selectElm=trueの場合、XMLHttpRequest().responseXMLが渡される。  
デフォルト =  new Object()

```html
<div class="sec__body-wp" id="clone-wp"></div>
<!-- 対象のDOMを読み込んでから -->
<script>
//引数は使う、使わない問わず付ける
function func(callArg){
  console.log('already done');
}
reqHtlmGet('https://yourwebsite/clone_top-media/','clone-wp',true,'#clone-wp__media',func);
</script>
```

## ptCopyHtmlData ( target | string, where | string )
特定の要素のDATA要素をコピーする。商品詳細ページ専用関数。

## ptCopyHtmlDelete ( target | string, where | string )
特定の要素のDOMをコピーして、元要素を消す。商品詳細ページ専用関数。

## ptDeleteHtml ( target | string )
特定の要素のDOMを消す。商品詳細ページ専用関数。

## ptCopyHtml ( target | string, where | string )
特定の要素のDOMをコピーする。商品詳細ページ専用関数。

## ptCreateSpanBtn()
特定の要素のDOMにspan要素で囲まれた文字を書き出す。商品詳細ページ専用関数。

## cartDummyQty()
特定の要素のDOMにダミーのselect要素（０固定）を書き出す。商品詳細ページ専用関数。

## License
[MIT](https://www.opensource.org/licenses/mit-license.php)

## Author
yoshihisa ishikawa
