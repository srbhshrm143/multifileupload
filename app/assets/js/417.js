"use strict";(self.webpackChunkmarketplace_template_poc=self.webpackChunkmarketplace_template_poc||[]).push([[417],{2417:function(N,h,g){g.r(h);var d=["second","minute","hour","day","week","month","year"];function w(e,t){if(t===0)return["just now","right now"];var r=d[Math.floor(t/2)];return e>1&&(r+="s"),[e+" "+r+" ago","in "+e+" "+r]}var D=["\u79D2","\u5206\u949F","\u5C0F\u65F6","\u5929","\u5468","\u4E2A\u6708","\u5E74"];function T(e,t){if(t===0)return["\u521A\u521A","\u7247\u523B\u540E"];var r=D[~~(t/2)];return[e+" "+r+"\u524D",e+" "+r+"\u540E"]}var c={},l=function(e,t){c[e]=t},E=function(e){return c[e]||c.en_US},U=function(e,t,r){var n=diffSec(e,r&&r.relativeDate);return formatDiff(n,getLocale(t))},m="timeago-id";function I(e){return e.getAttribute("datetime")}function p(e,t){e.setAttribute(m,t)}function A(e){return parseInt(e.getAttribute(m))}var u=[60,60,24,7,365/7/12,12];function s(e){return e instanceof Date?e:!isNaN(e)||/^\d+$/.test(e)?new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),new Date(e))}function b(e,t){var r=e<0?1:0;e=Math.abs(e);for(var n=e,a=0;e>=u[a]&&a<u.length;a++)e/=u[a];return e=Math.floor(e),a*=2,e>(a===0?9:1)&&(a+=1),t(e,a,n)[r].replace("%s",e.toString())}function S(e,t){var r=t?s(t):new Date;return(+r-+s(e))/1e3}function k(e){for(var t=1,r=0,n=Math.abs(e);e>=u[r]&&r<u.length;r++)e/=u[r],t*=u[r];return n=n%t,n=n?t-n:t,Math.ceil(n)}var o={},i=function(e){clearTimeout(e),delete o[e]};function v(e,t,r,n){i(A(e));var a=n.relativeDate,L=n.minInterval,_=S(t,a);e.innerText=b(_,r);var f=setTimeout(function(){v(e,t,r,n)},Math.min(Math.max(k(_),L||1)*1e3,2147483647));o[f]=0,p(e,f)}function $(e){e?i(getTimerId(e)):Object.keys(o).forEach(i)}function C(e,t,r){var n=e.length?e:[e];return n.forEach(function(a){v(a,I(a),E(t),r||{})}),n}l("en_US",w),l("zh_CN",T);const M=function(e){const t=document.querySelectorAll(`${e.detail.scope} .timeago`);t.length>0&&C(t,"en_US",{minInterval:60})};window.addEventListener("frame-rendered",M),window.dispatchEvent(new CustomEvent("frame-rendered",{detail:{scope:"body"}}))}}]);
