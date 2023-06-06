# 各関数説明

## ptCore.js

### pretakeProtoStinckyFix
商品詳細(.fs-body-productがbodyにあるページ)でデフォルトで右側にある商品の件名や購入ボタンなどの概要要素をcssでstickyする際のバグ回避用関数。

```javascript:使用例

const stickyFix = new pretakeProtoStinckyFix('.fs-l-productLayout__item--2','.fs-l-productLayout');
stickyFix.evScroll();
stickyFix.obWatch(['active-style','is-modalOpen']);

```

## License
[MIT](https://www.opensource.org/licenses/mit-license.php)

## Author
yoshihisa ishikawa
