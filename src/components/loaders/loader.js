export function fnLoaderShow () {
  var blockUI = document.querySelector('.loader')
  blockUI.setAttribute('style', 'display:inline')
}

export function fnLoaderHide () {
  var blockUI = document.querySelector('.loader')
  blockUI.setAttribute('style', 'display:none')
}
