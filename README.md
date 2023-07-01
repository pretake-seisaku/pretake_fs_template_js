# 概要
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
#### property
##### pretakeProtoModal.set.wrap(string)
wrap要素につけるclass,又はidを入れる。queryselectorの書き方と同じ。
##### pretakeProtoModal.set.open(string)
open要素につけるclass,又はidを入れる。queryselectorの書き方と同じ。
##### pretakeProtoModal.set.closed(string)
closed要素につけるclass,又はidを入れる。queryselectorの書き方と同じ。
##### pretakeProtoModal.set.closedBgElm(string)
背景要素につけるclassを入れる。
##### pretakeProtoModal.set.activeCls(string)
モーダルが開いた時にwrap要素につけるclassを入れる。
##### pretakeProtoModal.set.aniCls(string)
モーダルが開いた時にwrap要素につけるアニメーション用のclassを入れる。
##### pretakeProtoModal.set.isActiveB(string)
現状テスト状態。空の文字列で固定。

## ptCore.js
### pretakeScript
FSで使用するテンプレートサイトで使う基本動作をまとめたメソッドやらオブジェクトを呼び出すオブジェクト。
#### 使い方
head内のptCore.jsを読み込んだ後
```javascript
const pt = new pretakeScript();
const dropdownFooter = new pt.dropdown('f-acc-wrap',"f-acc-tit","f-acc-items","f-items-inn","is-active");
```

### pretakeScript.bodyClsContains( class | string )
bodyのクラス判別
return | bool
#### 使い方
pretakeScriptを生成後
```javascript
if (pt.bodyClsContains('fs-body-product')) {
//bodyに「fs-body-product」があったときの処理
}
```

### pretakeScript.smoothScroll( ID | string , except | Array(optional) )
ページ内でIDで移動する時にスムーズに移動させる関数。

#### 使い方
pretakeScriptを生成後
```javascript
pt.smoothScroll("glnav-block",["output-item-multi"]);
```
``` html
<!-- ↑ #で同名のIDの箇所へ移動する ↑ -->
<a href="#move-top">HOME</a>
```

#### 引数
##### ID(string)
ページ内での追従グローバルナビなど画面上部に常に表示される要素のIDをつける。付けた要素の高さを計算してその分下にずらす。ない場合、空のdiv要素などにIDを付けてそれをbody内の上の方に配置して使用可。
##### except(Array)
モーダル、タグ切り替えなどで移動させたくないIDを使用している場合に使用。シャープはなし。
```javascript
pt.smoothScroll("glnav-block",["moveTo1","moveTo2","moveTo3"]);
```

### pretakeScript.locationMoveToTag( ID | string)
他ページ移動時、追従ヘッダーなどで文章が隠れる際の位置調整用の関数。
#### 使い方
pretakeScriptを生成後
```javascript
pt.locationMoveToTag("glnav-block");
```
#### 引数
##### ID(string)
ページ内での追従グローバルナビなど画面上部に常に表示される要素のIDをつける。付けた要素の高さを計算してその分下にずらす。

### pretakeScript.inView(cls , op , anotherCls　| Object(optional) , addCls | string(optional) , onlyOnce | bool(optional))
画面内に入ったら特定の要素にクラスをつける関数。IntersectionObserver簡易版。

### pretakeScript.switchEvent
ブラウザの横幅が特定の幅になったら登録した関数をコールバックする関数

#### 使い方
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

### omittedContent( string | string , count | Number)
文字数制限する関数。（呼び出し不可）
現状、「商品詳細の追従購入ボタンの商品名」、「パンくず（ptCore.jsを呼び出さない特定の下層ページを除く）」で自動で動く仕様にしてる。

## License
[MIT](https://www.opensource.org/licenses/mit-license.php)

## Author
yoshihisa ishikawa
