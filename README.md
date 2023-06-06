# 各関数説明

## ptCore.js

### pretakeProtoStinckyFix
商品詳細(.fs-body-productがbodyにあるページ)でデフォルトで右側にある商品の件名や購入ボタンなどの概要要素をcssでstickyする際のバグ回避用関数。
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

### pretakeProtoModal
商品詳細(.fs-body-productがbodyにあるページ)で購入ボタン押した際にモーダル開く仕様の時使う関数。
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
## License
[MIT](https://www.opensource.org/licenses/mit-license.php)

## Author
yoshihisa ishikawa
