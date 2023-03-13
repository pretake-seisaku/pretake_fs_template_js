const reqHtlmGet = function (fileURL, outputIdElm, selectElm = false, intName = '#target') {
  var req = new XMLHttpRequest(),
    method = "GET",
    file = fileURL;
  var divTarget = document.getElementById(outputIdElm);
  if (!selectElm) {
    req.open(method, file, true);
    req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        var rest = req.responseText;
        divTarget.innerHTML = rest;
      }
    };
    req.send();
  } else {
    req.responseType = "document";
    req.open(method, file, true);
    req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        var restxt = req.responseXML; 
        var int = restxt.querySelector(intName);
        divTarget.innerHTML = int.outerHTML;
      }
    };
    req.send();
  }
};
const ptCopyHtmlData = function (target, where) {
  if (document.querySelector(target)) {
    const nodeElm = document.querySelector(target);
    const outputElm = document.querySelectorAll(where);
    const arr = Array.prototype.slice.call(outputElm);

    for (let i = 0; i < arr.length; i++) {
      const elm1 = nodeElm.dataset.productId;
      const elm2 = nodeElm.dataset.verticalVariationNo;
      const elm3 = nodeElm.dataset.horizontalVariationNo;
      arr[i].dataset.productId = elm1;
      arr[i].dataset.verticalVariationNo = elm2;
      arr[i].dataset.horizontalVariationNo = elm3;
    }
  }
};
const ptCopyHtmlDelete = function (target, where) {
  if (document.querySelector(target)) {
    const nodeElm = document.querySelector(target);
    const nodeElmOuter = nodeElm.outerHTML;
    const outputElm = Array.prototype.slice.call(document.querySelectorAll(where));
    if (outputElm.length === 1) {
      outputElm[0].innerHTML = nodeElmOuter;
      nodeElm.remove();
    } else {
      for (let i = 0; i < outputElm.length; i++) {
        outputElm[i].innerHTML = nodeElmOuter;
      }
      nodeElm.remove();
    };
  }
};
const ptDeleteHtml = function (target) {
  if (document.querySelector(target)) {
    const nodeElm = document.querySelector(target);
    nodeElm.remove();
  }
};
const ptCopyHtml = function (target, where) {
  if (document.querySelector(target)) {
    const nodeElm = document.querySelector(target);
    const nodeElmOuter = nodeElm.outerHTML;
    const outputElm = Array.prototype.slice.call(document.querySelectorAll(where));

    if (outputElm.length === 1) {
      outputElm[0].innerHTML = nodeElmOuter;
    } else {
      for (let i = 0; i < outputElm.length; i++) {
        outputElm[i].innerHTML = nodeElmOuter;
      }
    };
  }
};
const ptCreateSpanBtn = function (emls, txt, type = 'outstock') {
  const tar = Array.prototype.slice.call(document.querySelectorAll(emls));
  const fragment = document.createDocumentFragment();
  let wrapItem; 
  const spanItem = document.createElement('span');
  spanItem.className = 'fs-c-button__label';
  spanItem.textContent = txt;
  if (type == 'outstock') {
    wrapItem = document.createElement('div');
    wrapItem.className = 'out-stock';
  } else if (type == 'vari') {
    wrapItem = document.createElement('a');
    wrapItem.href = '#output-item-multi';
    wrapItem.className = 'particular__open-btn __mdl1';
  };
  wrapItem.appendChild(spanItem);
  fragment.appendChild(wrapItem);
  if (tar.length === 1) {
    tar[0].appendChild(fragment);
  } else {
    for (let i = 0; i < tar.length; i++) {
      tar[i].appendChild(fragment);
    }
  };
}

function cartDummyQty(ID) {
  const fragment = document.createDocumentFragment();
  const spanItem = document.createElement('span');
  spanItem.className = 'fs-c-productQuantityAndWishlist__quantity fs-c-quantity';
  const select = document.createElement('select');
  select.className = 'fs-c-quantity__select fs-system-quantity-list'; 
  const option = document.createElement('option');
  option.value = 0;
  option.appendChild(document.createTextNode('0'));
  option.selected = true;
  select.appendChild(option);
  spanItem.appendChild(select);
  fragment.appendChild(spanItem);
  document.querySelector(ID).appendChild(fragment);
};