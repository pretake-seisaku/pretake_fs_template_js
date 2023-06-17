# 概要
## 使い方
### 通常ページ
ファイルから読み込み
### スキミング防止対策がされているページ
cdn経由でここから読み込み

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

### pretakeProtoModal( set | object , timeout | Number )
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
const pt = new pretakeScript();
if (pt.bodyClsContains('fs-body-product')) {
//bodyに「fs-body-product」があったときの処理
}
```

## License
[MIT](https://www.opensource.org/licenses/mit-license.php)

## Author
yoshihisa ishikawa
