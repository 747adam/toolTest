!(function (e, t) { typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = t() : typeof define === 'function' && define.amd ? define(t) : (e = e || self).FormHelper = t() }(this, function () { 'use strict'; function e (t) { var n = 'pendding'; var r = function () {}; var i = function () {}; var o = function (e) { n === 'pendding' && (n = 'reject', i(e)) }; try { t(function (e) { n === 'pendding' && (n = 'resolve', r(e)) }, o) } catch (e) { o(e) } return e.prototype.done = function (e) { return n === 'pendding' && (r = e), this }, e.prototype.fail = function (e) { return n === 'pendding' && (i = e), this }, this } var t = { name: function (e) { return /^[a-zA-Z\u4e00-\u9fa5]+$/.test(e) }, email: function (e) { return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(e) }, cellphone: function (e) { return /^[0]{1}[9]{1}(([0-9]){8})$/.test(e) }, required: function (e) { return !!e && (!(Array.isArray(e) && !e.length) && !!String(e).trim().length) } }; var n = { name: '${field}格式錯誤，請填寫中文或半形英文', email: '${field}格式錯誤，請填正確的EMAIL', cellphone: '${field}格式錯誤，請填手機號碼', required: '${field}為必填欄位' }; function r (e, t) { var n; var r = e.find(function (e) { return e === 'required' }); return (!t || (n = t, Array.isArray(n) && n.length === 0)) && !r } function i (e) { return { type: e.getAttribute('data-validate-type'), validName: e.getAttribute('data-validate-name'), value: (function (e) { if (e.type === 'checkbox' || e.type === 'radio') { var t = !1; var n = document.getElementsByName(e.name); if (!n.length) return e.checked; for (var r = 0; r < n.length && !(t = n[r].checked); r++);return t } return e.value }(e)) } } function o (e) { return e.map(function (e) { return (function (e) { var i = ''; var o = e.type.split('|'); if (r(o, e.value)) return { valid: !i, errorMsg: i }; for (let r = 0; r < o.length; r++) { var u = t[o[r]]; if (u) { if (!u(e.value)) { i += n[o[r]].replace('${field}', e.validName || ''), i += '\n'; break } } else console.log('驗證 Type 不支持') } return { valid: !i, errorMsg: i } }(e)) }).reduce(function (e, t) { return t.errorMsg && (e += t.errorMsg), e }, '') } return function t (n) { if (this.form = document.querySelector(n), this.form) return t.prototype.validate = function () { return o(function (e) { for (var t = e.querySelectorAll('*'), n = [], r = {}, o = 0; o < t.length; o++) { const e = i(t[o]); if (e.type) { var u = t[o].name; if (u) { if (r[u]) continue; r[u] = e }n.push(e) } } return n }(this.form)) }, t.prototype.submit = function (t) { return new e(function (e, n) { var r = ''; for (var i in t)r += r === '' ? i + '=' + t[i] : '&' + i + '=' + t[i]; var o = new XMLHttpRequest(); o.onreadystatechange = function () { if (this.readyState === 4 && this.status === 200) { var t = JSON.parse(o.responseText.trim()); t.success ? e(t) : n(t) } }, o.open('POST', '/api/addMessage'), o.send(r) }) }, this; console.error('請傳入正確的表單') } }))
