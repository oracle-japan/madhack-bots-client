/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(["ojs/ojcore","jquery","ojs/ojcontext","ojs/ojcomponentcore","ojs/ojlogger","promise","jqueryui-amd/position"],function(e,t,r,i,o){"use strict";e.PopupService=function(){this.Init()},e.Object.createSubclass(e.PopupService,e.Object,"oj.PopupService"),e.PopupService.prototype.Init=function(){e.PopupService.superclass.Init.call(this)},e.PopupService.getInstance=function(t){return e.PopupService._popupService||(e.PopupService._popupService=new e.PopupServiceImpl),e.PopupService._popupService},e.PopupService.prototype.open=function(t){e.Assert.failedInAbstractFunction()},e.PopupService.prototype.close=function(t){e.Assert.failedInAbstractFunction()},e.PopupService.prototype.changeOptions=function(t){e.Assert.failedInAbstractFunction()},e.PopupService.prototype.triggerOnDescendents=function(t,r,i){e.Assert.failedInAbstractFunction()},e.PopupService.prototype.destroy=function(){e.PopupService._popupService=null},e.PopupService.MODALITY={NONE:"none",MODAL:"modal",MODELESS:"modeless"},e.PopupService.EVENT={POPUP_REMOVE:"ojPopupRemove",POPUP_CLOSE:"ojPopupClose",POPUP_REFRESH:"ojPopupRefresh",POPUP_AUTODISMISS:"ojPopupAutoDismiss",POPUP_BEFORE_OPEN:"ojPopupBeforeOpen",POPUP_AFTER_OPEN:"ojPopupAfterOpen",POPUP_BEFORE_CLOSE:"ojPopupBeforeClose",POPUP_AFTER_CLOSE:"ojPopupAfterClose"},e.PopupService.LAYER_LEVEL={TOP_LEVEL:"topLevel",NEAREST_ANCESTOR:"nearestAncestor"},e.PopupService.OPTION={POPUP:"popup",EVENTS:"events",MODALITY:"modality",LAUNCHER:"launcher",POSITION:"position",LAYER_SELECTORS:"layerSelectors",LAYER_LEVEL:"layerLevel",CONTEXT:"context",CUSTOM_ELEMENT:"customElement"},e.PopupServiceImpl=function(){this.Init()},e.Object.createSubclass(e.PopupServiceImpl,e.PopupService,"oj.PopupServiceImpl"),e.PopupServiceImpl.prototype.open=function(r){e.Assert.assertObject(r);var n=r[e.PopupService.OPTION.POPUP];e.Assert.assertPrototype(n,t);var s=e.ZOrderUtils.getStatus(n);if(s===e.ZOrderUtils.STATUS.UNKNOWN||s===e.ZOrderUtils.STATUS.BEFORE_OPEN||s===e.ZOrderUtils.STATUS.CLOSE){var l=r[e.PopupService.OPTION.LAUNCHER];e.Assert.assertPrototype(l,t);var a=r[e.PopupService.OPTION.POSITION];e.Assert.assertObjectOrNull(a);var p=r[e.PopupService.OPTION.EVENTS];e.Assert.assertObject(p);var u=r[e.PopupService.OPTION.MODALITY];(!u||e.PopupService.MODALITY.MODELESS!==u&&e.PopupService.MODALITY.MODAL!==u)&&(u=e.PopupService.MODALITY.NONE);var c=r[e.PopupService.OPTION.LAYER_SELECTORS];e.Assert.assertString(c);var d=r[e.PopupService.OPTION.CUSTOM_ELEMENT],_=r[e.PopupService.OPTION.LAYER_LEVEL];(!_||e.PopupService.LAYER_LEVEL.TOP_LEVEL!==_&&e.PopupService.LAYER_LEVEL.NEAREST_ANCESTOR!==_)&&(_=e.PopupService.LAYER_LEVEL.NEAREST_ANCESTOR);var O=p[e.PopupService.EVENT.POPUP_BEFORE_OPEN];O&&t.isFunction(O)||(O=e.PopupServiceImpl._defaultBeforeOpenCallback);var E=p[e.PopupService.EVENT.POPUP_AFTER_OPEN];e.ZOrderUtils.setStatus(n,e.ZOrderUtils.STATUS.OPENING),e.DomUtils.setLogicalParent(n,l),e.ZOrderUtils.addToAncestorLayer(n,l,u,c,_,d);var S,v=function(){try{n.removeAttr("aria-hidden"),this._assertEventSink(),i.subtreeShown(n[0])}catch(e){o.error("Error opening popup:\n%o",e)}finally{e.ZOrderUtils.setStatus(n,e.ZOrderUtils.STATUS.OPEN),E&&E(r);var s=e.ZOrderUtils.getFirstAncestorLayer(n);if(e.Assert.assertPrototype(s,t),e.ZOrderUtils.applyEvents(s,p),!e.ZOrderUtils._getSurrogate(s)&&t.isFunction(p[e.PopupService.EVENT.POPUP_REMOVE]))(0,p[e.PopupService.EVENT.POPUP_REMOVE])()}};v=v.bind(this);try{S=O(r)}catch(e){o.error("Error before open popup:\n%o",e)}finally{S&&S instanceof Promise?S.then(v):v()}}else this._assertEventSink()},e.PopupServiceImpl._defaultBeforeOpenCallback=function(r){var i=r[e.PopupService.OPTION.POPUP];e.Assert.assertPrototype(i,t);var o=r[e.PopupService.OPTION.POSITION];i.show(),o&&i.position(o)},e.PopupServiceImpl.prototype.close=function(r){e.Assert.assertObject(r);var n=r[e.PopupService.OPTION.POPUP];e.Assert.assertPrototype(n,t);var s=e.ZOrderUtils.getOpenPopupLayer(n);e.Assert.assertPrototype(s,t);var l=r[e.PopupService.OPTION.EVENTS];l?l=t.extend(e.ZOrderUtils.getEvents(s),l):(l=e.ZOrderUtils.getEvents(s),r[e.PopupService.OPTION.EVENTS]=l);var a=e.ZOrderUtils.getStatus(n);if(a!==e.ZOrderUtils.STATUS.OPEN&&a!==e.ZOrderUtils.STATUS.BEFORE_CLOSE||!l)this._assertEventSink();else{var p=l[e.PopupService.EVENT.POPUP_BEFORE_CLOSE];p&&t.isFunction(p)||(p=e.PopupServiceImpl._defaultBeforeCloseCallback);var u=l[e.PopupService.EVENT.POPUP_AFTER_CLOSE];e.ZOrderUtils.setStatus(n,e.ZOrderUtils.STATUS.CLOSING),e.ZOrderUtils.applyEvents(s,{});var c,d=function(){try{n.hide(),n.attr("aria-hidden","true"),n.css({top:"auto",bottom:"auto",left:"auto",right:"auto"}),e.ZOrderUtils.removeFromAncestorLayer(n),e.DomUtils.setLogicalParent(n,null),this._assertEventSink(),i.subtreeHidden(n[0])}catch(e){o.error("Error closing popup:\n%o",e)}finally{e.ZOrderUtils.setStatus(n,e.ZOrderUtils.STATUS.CLOSE),u&&t.isFunction(u)&&u(r)}};d=d.bind(this);try{c=p(r)}catch(e){o.error("Error before close popup:\n%o",e)}finally{c&&c instanceof Promise?c.then(d):d()}}},e.PopupServiceImpl._defaultBeforeCloseCallback=function(r){var i=r[e.PopupService.OPTION.POPUP];e.Assert.assertPrototype(i,t),i.hide()},e.PopupServiceImpl.prototype.changeOptions=function(r){e.Assert.assertObject(r);var i=r[e.PopupService.OPTION.POPUP];if(e.Assert.assertPrototype(i,t),e.ZOrderUtils.getStatus(i)===e.ZOrderUtils.STATUS.OPEN){var o=e.ZOrderUtils.getOpenPopupLayer(i);e.Assert.assertPrototype(o,t);var n=r[e.PopupService.OPTION.EVENTS];n&&e.ZOrderUtils.applyEvents(o,n);var s=r[e.PopupService.OPTION.MODALITY];s&&e.ZOrderUtils.applyModality(o,s);var l=r[e.PopupService.OPTION.LAYER_SELECTORS];e.StringUtils.isEmptyOrUndefined(l)||o.attr("class",l)}},e.PopupServiceImpl.prototype.triggerOnDescendents=function(t,r,i){if(e.ZOrderUtils.isPopupOpen(t)){var o={};o.event=r,o.argsArray=i;var n=e.ZOrderUtils.getFirstAncestorLayer(t);e.ZOrderUtils.postOrderVisit(n,this._triggerOnDescendentsVisitCallback,o)}},e.PopupServiceImpl.prototype._triggerOnDescendentsVisitCallback=function(r,i){var o=i.event,n=i.argsArray,s=e.ZOrderUtils.getEvents(r);return s&&t.isFunction(s[o])&&s[o].apply(this,n),e.ZOrderUtils.VISIT_RESULT.ACCEPT},e.PopupServiceImpl.prototype._assertEventSink=function(){var t,r,i,o=e.ZOrderUtils.hasPopupsOpen(),n=this._callbackEventFilter;if(!o&&n){for(window.removeEventListener("resize",e.PopupServiceImpl._refreshCallback,!0),window.removeEventListener("scroll",e.PopupServiceImpl._refreshCallback,!0),(r=document.documentElement).removeEventListener("mousewheel",e.PopupServiceImpl._refreshCallback,!0),r.removeEventListener("DOMMouseScroll",e.PopupServiceImpl._refreshCallback,!0),this._callbackEventFilter=null,t=0;t<e.PopupServiceImpl._REDISTRIBUTE_EVENTS.length;t++)i=e.PopupServiceImpl._REDISTRIBUTE_EVENTS[t],r.removeEventListener(i,n,!0);var s=this._simpleTapRecognizer;s&&(s.destroy(),this._simpleTapRecognizer=null)}else if(o&&!n){for(window.addEventListener("resize",e.PopupServiceImpl._refreshCallback,!0),window.addEventListener("scroll",e.PopupServiceImpl._refreshCallback,!0),(r=document.documentElement).addEventListener("mousewheel",e.PopupServiceImpl._refreshCallback,!0),r.addEventListener("DOMMouseScroll",e.PopupServiceImpl._refreshCallback,!0),n=this._eventFilterCallback.bind(this),this._callbackEventFilter=n,t=0;t<e.PopupServiceImpl._REDISTRIBUTE_EVENTS.length;t++)i=e.PopupServiceImpl._REDISTRIBUTE_EVENTS[t],r.addEventListener(i,n,!0);e.DomUtils.isTouchSupported()&&(this._simpleTapRecognizer=new e.SimpleTapRecognizer(n))}},e.PopupServiceImpl.prototype._eventFilterCallback=function(r){var i=t(r.target);if(e.ZOrderUtils.hasPopupsOpen()){if(!e.DomUtils.isChromeEvent(r)&&("focus"!==r.type||i.is(":focusable"))){var o=e.ZOrderUtils.getDefaultLayer();if("keydown"!==r.type||!e.ZOrderUtils.hasModalDialogOpen()||e.DomUtils.isAncestor(o[0],i[0])){var n,s=e.ZOrderUtils.getFirstAncestorLayer(i);if(o[0]!==s[0]?s.hasClass(e.PopupServiceImpl._FOCUS_WITHIN_SELECTOR)||((n=this._lastFocusLayer)&&n.removeClass(e.PopupServiceImpl._FOCUS_WITHIN_SELECTOR),s.addClass(e.PopupServiceImpl._FOCUS_WITHIN_SELECTOR),this._lastFocusLayer=s):(n=this._lastFocusLayer)&&(n.removeClass(e.PopupServiceImpl._FOCUS_WITHIN_SELECTOR),this._lastFocusLayer=null),"focus"!==r.type||"-1"!==i.attr("tabindex")){for(var l={},a=e.PopupServiceImpl._COPY_SAFE_EVENT_PROPERTIES,p={},u=0;u<a.length;u++){var c=a[u],d=r[c];void 0===d||t.isFunction(d)||(p[c]=d)}l.event=t.Event(r,p),e.ZOrderUtils.postOrderVisit(o,e.PopupServiceImpl._redistributeVisitCallback,l)}}else e.ZOrderUtils.eatEvent(r)}}else this._assertEventSink()},e.PopupServiceImpl._redistributeVisitCallback=function(r,i){var o=e.ZOrderUtils.getEvents(r),n=i.event;return o&&t.isFunction(o[e.PopupService.EVENT.POPUP_AUTODISMISS])&&o[e.PopupService.EVENT.POPUP_AUTODISMISS](n),e.ZOrderUtils.VISIT_RESULT.ACCEPT},e.PopupServiceImpl._refreshCallback=function(r){var i=e.PopupServiceImpl._refreshTimerId;isNaN(i)&&(e.PopupServiceImpl._refreshTimerId=window.setTimeout(function(){e.PopupServiceImpl._refreshTimerId=Number.NaN;var r=e.ZOrderUtils.getDefaultLayer();t.isFunction(window.requestAnimationFrame)?e.PopupServiceImpl._afRequestId=window.requestAnimationFrame(function(){e.PopupServiceImpl._afRequestId=null,e.ZOrderUtils.postOrderVisit(r,e.PopupServiceImpl._refreshVisitCallback)}):e.ZOrderUtils.postOrderVisit(r,e.PopupServiceImpl._refreshVisitCallback)},e.PopupServiceImpl._REFRESH_DELAY))},e.PopupServiceImpl._refreshVisitCallback=function(r,i){if(i.level>0)return e.ZOrderUtils.VISIT_RESULT.REJECT;var o=e.ZOrderUtils.getEvents(r);return o&&t.isFunction(o[e.PopupService.EVENT.POPUP_REFRESH])&&o[e.PopupService.EVENT.POPUP_REFRESH](),e.ZOrderUtils.VISIT_RESULT.ACCEPT},e.PopupServiceImpl.prototype.destroy=function(){e.PopupServiceImpl.superclass.destroy.call(this)},e.PopupServiceImpl._FOCUS_WITHIN_SELECTOR="oj-focus-within",e.PopupServiceImpl._REDISTRIBUTE_EVENTS=["focus","mousedown","keydown"],e.PopupServiceImpl._COPY_SAFE_EVENT_PROPERTIES=["altKey","bubbles","cancelable","ctrlKey","currentTarget","eventPhase","metaKey","relatedTarget","shiftKey","target","timeStamp","view","which","button","buttons","clientX","clientY","offsetX","offsetY","pageX","pageY","screenX","screenY","toElement","char","charCode","key","keyCode"],e.PopupServiceImpl._REFRESH_DELAY=10,e.ZOrderUtils={},e.ZOrderUtils.STATUS={UNKNOWN:0,BEFORE_OPEN:.5,OPENING:1,OPEN:2,BEFORE_CLOSE:2.5,CLOSING:3,CLOSE:4},e.ZOrderUtils._STATUS_DATA="oj-popup-status",e.ZOrderUtils.getStatus=function(r){r instanceof Element&&(r=t(r));var i=r.data(e.ZOrderUtils._STATUS_DATA);return isNaN(i)?e.ZOrderUtils.STATUS.UNKNOWN:i},e.ZOrderUtils.setStatus=function(r,i){r instanceof Element&&(r=t(r)),i>e.ZOrderUtils.STATUS.UNKNOWN&&i<=e.ZOrderUtils.STATUS.CLOSE&&r.data(e.ZOrderUtils._STATUS_DATA,i)},e.ZOrderUtils.getFirstAncestorLayer=function(t){if(!t)return e.ZOrderUtils.getDefaultLayer();for(var r=t;r&&r.length>0&&r.attr(e.ZOrderUtils._SURROGATE_ATTR)!==e.ZOrderUtils._DEFAULT_LAYER_ID;){if(e.ZOrderUtils._hasSurrogate(r[0]))return r;r=r.parent()}return e.ZOrderUtils.getDefaultLayer()},e.ZOrderUtils.getDefaultLayer=function(){var r=t(document.getElementById(e.ZOrderUtils._DEFAULT_LAYER_ID));return r.length>0?r:((r=t("<div>")).attr("role","presentation"),r.attr("id",e.ZOrderUtils._DEFAULT_LAYER_ID),r.prependTo(t(document.body)),r)},e.ZOrderUtils.addToAncestorLayer=function(r,o,n,s,l,a){var p=r[0];if(e.ZOrderUtils._hasSurrogate(p.parentNode))throw new Error("JET Popup is already open - id: "+p.getAttribute("id"));var u=e.ZOrderUtils.getFirstAncestorLayer(l===e.PopupService.LAYER_LEVEL.TOP_LEVEL?null:o),c=t("<div>"),d=r.attr("id");e.StringUtils.isEmptyOrUndefined(d)?c.uniqueId():c.attr("id",[d,"layer"].join("_")),c.attr("role","presentation"),c.addClass(s),r.after(c),e.ZOrderUtils._createSurrogate(c,a),i.subtreeDetached(p),r.appendTo(c),r.data(e.ZOrderUtils._LAYER_ID_DATA,c.attr("id")),c.appendTo(u),i.subtreeAttached(p),e.ZOrderUtils.applyModality(c,n)},e.ZOrderUtils._getSurrogate=function(t){var r=t.attr(e.ZOrderUtils._SURROGATE_ATTR);if(r)return document.getElementById(r)},e.ZOrderUtils.applyEvents=function(r,o,n){n||(n=t(e.ZOrderUtils._getSurrogate(r))),r.data(e.ZOrderUtils._EVENTS_DATA,o),n.length>0&&o&&t.isFunction(o[e.PopupService.EVENT.POPUP_REMOVE])&&i.setComponentOption(n[0],"beforeDestroy",o[e.PopupService.EVENT.POPUP_REMOVE])},e.ZOrderUtils.getEvents=function(t){return t.data(e.ZOrderUtils._EVENTS_DATA)},e.ZOrderUtils._createSurrogate=function(r,i){var o="script";i&&(o="oj-surrogate");var n=t(document.createElement(o)),s=r.attr("id");e.StringUtils.isEmptyOrUndefined(s)||n.attr("id",[s,"surrogate"].join("_")),i&&n.attr("data-oj-binding-provider","none"),n.insertBefore(r),i||n.ojSurrogate();var l=n.attr("id");return r.attr(e.ZOrderUtils._SURROGATE_ATTR,l),n},e.ZOrderUtils._removeSurrogate=function(r){var o=r.attr(e.ZOrderUtils._SURROGATE_ATTR);r.removeAttr(e.ZOrderUtils._SURROGATE_ATTR);var n=t(document.getElementById(o)),s=n.length>0;return s&&(r.insertAfter(n),i.setComponentOption(n[0],"beforeDestroy",null),n.remove()),s},e.ZOrderUtils.getOpenPopupLayer=function(r){var i=r.parent();if(!i||0===i.length){var o=r.data(e.ZOrderUtils._LAYER_ID_DATA);i=t(document.getElementById(o))}return i},e.ZOrderUtils.removeFromAncestorLayer=function(t){var r=e.ZOrderUtils.getOpenPopupLayer(t);e.ZOrderUtils.preOrderVisit(r,e.ZOrderUtils._closeDescendantPopupsCallback),e.ZOrderUtils._removeOverlayFromAncestorLayer(r),r.removeData(e.ZOrderUtils._EVENTS_DATA),r.removeData(e.ZOrderUtils._MODALITY_DATA),t.removeData(e.ZOrderUtils._LAYER_ID_DATA);var o=t[0];i.subtreeDetached(o),e.ZOrderUtils._removeSurrogate(r)&&o&&o.parentElement?(e.DomUtils.unwrap(t,r),i.subtreeAttached(o)):r.remove()},e.ZOrderUtils._closeDescendantPopupsCallback=function(r,i){if(i.level>0)return e.ZOrderUtils.VISIT_RESULT.REJECT;var o=r.data(e.ZOrderUtils._EVENTS_DATA);return o&&t.isFunction(o[e.PopupService.EVENT.POPUP_CLOSE])&&o[e.PopupService.EVENT.POPUP_CLOSE](),e.ZOrderUtils.VISIT_RESULT.ACCEPT},e.ZOrderUtils.applyModality=function(t,r){var i=t.data(e.ZOrderUtils._MODALITY_DATA);t.data(e.ZOrderUtils._MODALITY_DATA,r),e.StringUtils.isEmptyOrUndefined(i)?e.PopupService.MODALITY.MODAL===r?e.ZOrderUtils._addOverlayToAncestorLayer(t):e.ZOrderUtils._removeOverlayFromAncestorLayer(t):i!==r&&(r!==i&&r===e.PopupService.MODALITY.MODAL?e.ZOrderUtils._addOverlayToAncestorLayer(t):e.ZOrderUtils._removeOverlayFromAncestorLayer(t)),r===e.PopupService.MODALITY.MODAL?t.attr("aria-modal","true"):t.removeAttr("aria-modal")},e.ZOrderUtils.hasModalDialogOpen=function(){for(var r=e.ZOrderUtils.getDefaultLayer().children(),i=r.length-1;i>-1;i--){if(t(r[i]).hasClass(e.ZOrderUtils._OVERLAY_SELECTOR))return!0}return!1},e.ZOrderUtils._addOverlayToAncestorLayer=function(r){var i=t("<div>");i.addClass(e.ZOrderUtils._OVERLAY_SELECTOR),i.addClass(r[0].className),i.attr("role","presentation");var o=r.attr("id");e.StringUtils.isEmptyOrUndefined(o)?i.uniqueId():i.attr("id",[o,"overlay"].join("_")),r.before(i);var n=i.attr("id");r.attr(e.ZOrderUtils._OVERLAY_ATTR,n)},e.ZOrderUtils._removeOverlayFromAncestorLayer=function(r){var i=r.attr(e.ZOrderUtils._OVERLAY_ATTR);e.StringUtils.isEmptyOrUndefined(i)||(r.removeAttr(e.ZOrderUtils._OVERLAY_ATTR),t(document.getElementById(i)).remove())},e.ZOrderUtils.VISIT_RESULT={ACCEPT:0,REJECT:1,COMPLETE:2},e.ZOrderUtils._VISIT_TRAVERSAL={PRE_ORDER:0,POST_ORDER:1},e.ZOrderUtils.postOrderVisit=function(t,r,i){var o=i;i||(o={}),o.level=0,o.type=e.ZOrderUtils._VISIT_TRAVERSAL.POST_ORDER,e.ZOrderUtils._visitTree(t,r,o)},e.ZOrderUtils.preOrderVisit=function(t,r,i){var o=i;i||(o={}),o.level=0,o.type=e.ZOrderUtils._VISIT_TRAVERSAL.PRE_ORDER,e.ZOrderUtils._visitTree(t,r,o)},e.ZOrderUtils._visitTree=function(r,i,o){for(var n=o.level,s=r.children(),l=s.length-1;l>-1;l--){var a=t(s[l]);if(e.ZOrderUtils._hasSurrogate(a[0])){var p;if(o.type===e.ZOrderUtils._VISIT_TRAVERSAL.PRE_ORDER){if((p=i(a,o))===e.ZOrderUtils.VISIT_RESULT.COMPLETE)return p;if(p===e.ZOrderUtils.VISIT_RESULT.REJECT)break}if(o.level=n+1,p=e.ZOrderUtils._visitTree(a,i,o),o.level=n,p===e.ZOrderUtils.VISIT_RESULT.COMPLETE)return p;if(o.type===e.ZOrderUtils._VISIT_TRAVERSAL.POST_ORDER){if((p=i(a,o))===e.ZOrderUtils.VISIT_RESULT.COMPLETE)return p;if(p===e.ZOrderUtils.VISIT_RESULT.REJECT)break}}}return e.ZOrderUtils.VISIT_RESULT.ACCEPT},e.ZOrderUtils._hasSurrogate=function(t){return!(!t||1!==t.nodeType||!t.hasAttribute(e.ZOrderUtils._SURROGATE_ATTR))},e.ZOrderUtils.hasPopupsOpen=function(){return e.ZOrderUtils.getDefaultLayer().children().length>0},e.ZOrderUtils.getOpenPopupCount=function(){var t={popupCount:0},r=e.ZOrderUtils.getDefaultLayer();return e.ZOrderUtils.preOrderVisit(r,e.ZOrderUtils._openPopupCountCallback,t),t.popupCount},e.ZOrderUtils._openPopupCountCallback=function(t,r){return r.popupCount+=1,e.ZOrderUtils.VISIT_RESULT.ACCEPT},e.ZOrderUtils.findOpenPopups=function(){var r={},i=[];r.popups=i;var o=e.ZOrderUtils.getDefaultLayer();return e.ZOrderUtils.preOrderVisit(o,e.ZOrderUtils._openPopupsCallback,r),i=r.popups,t(i)},e.ZOrderUtils._openPopupsCallback=function(t,r){return r.popups.push(t[0]),e.ZOrderUtils.VISIT_RESULT.ACCEPT},e.ZOrderUtils.isAboveTopModalLayer=function(r){if(!r||!e.ZOrderUtils.hasPopupsOpen())return!0;var i=function(){var r={topLayer:null},i=e.ZOrderUtils.getDefaultLayer();if(e.ZOrderUtils.preOrderVisit(i,function(r,i){if(i.level>0)return e.ZOrderUtils.VISIT_RESULT.REJECT;var o=i.topLayer;return o?e.ZOrderUtils.compareStackingContexts(t(r),t(o))>0&&(i.topLayer=r):i.topLayer=r,e.ZOrderUtils.VISIT_RESULT.ACCEPT},r),r.topLayer)return r.topLayer[0]}();if(!i)return!0;var o=function(r){var i={topModalPopup:null};if(r.hasAttribute(e.ZOrderUtils._OVERLAY_ATTR)&&(i.topModalPopup=t(r)),e.ZOrderUtils.postOrderVisit(t(r),function(t,r){return t[0].hasAttribute(e.ZOrderUtils._OVERLAY_ATTR)?(r.topModalPopup=t,e.ZOrderUtils.VISIT_RESULT.COMPLETE):e.ZOrderUtils.VISIT_RESULT.ACCEPT},i),i.topModalPopup)return i.topModalPopup[0]}(i);return!o||(e.DomUtils.isAncestorOrSelf(o,r)||e.ZOrderUtils.compareStackingContexts(t(o),t(r))<0)},e.ZOrderUtils.compareStackingContexts=function(r,i){function o(r,i){var o,n=["absolute","relative","fixed"],s=r.parents(),l=[];for(o=s.length-1;o>-1;o--)l.push(t(s[o]));(s=l).push(r);var a=[],p=0;for(o=0;o<s.length;o++){var u=s[o],c=u.css("position"),d=e.DomUtils.getCSSLengthAsFloat(u.css("opacity")),_=e.DomUtils.getCSSLengthAsInt(u.css("z-index")),O=t.inArray(u[0],u.parent().children());t.inArray(c,n)>-1&&_>0?(a.push({weight:[p,_,O],order:[O]}),p+=1):d<1?(a.push({weight:[p,1,O],order:[O]}),p+=1):i&&a.push({weight:[0,0,O],order:[O]})}return a}function n(e,t){for(var r=Math.max(e.length,t.length),i=0;i<r;i++){var o=i<e.length?e[i]:0,n=i<t.length?t[i]:0;if(o!==n)return o<n?-1:1}return 0}e.Assert.assertPrototype(r,t),e.Assert.assertPrototype(i,t);var s,l,a=o(r,!1),p=o(i,!1),u=Math.max(a.length,p.length);for(s=0;s<u;s++)if(0!==(l=n(s<a.length?a[s].weight:[-1],s<p.length?p[s].weight:[-1])))return l;for(a=o(r,!0),p=o(i,!0),u=Math.max(a.length,p.length),s=0;s<u;s++)if(0!==(l=n(s<a.length?a[s].order:[-1],s<p.length?p[s].order:[-1])))return l;return 0},e.ZOrderUtils.eatEvent=function(e){e.stopPropagation(),e.preventDefault()},e.ZOrderUtils.isPopupOpen=function(t){var r=t.parent();return!(!r||1!==r.length||!e.ZOrderUtils._hasSurrogate(r[0]))},e.ZOrderUtils._EVENTS_DATA="oj-popup-events",e.ZOrderUtils._MODALITY_DATA="oj-popup-modality",e.ZOrderUtils._DEFAULT_LAYER_ID="__oj_zorder_container",e.ZOrderUtils._SURROGATE_ATTR="data-oj-surrogate-id",e.ZOrderUtils._LAYER_ID_DATA="oj-popup-layer-id",e.ZOrderUtils._OVERLAY_ATTR="data-oj-overlayid",e.ZOrderUtils._OVERLAY_SELECTOR="oj-component-overlay",e.__registerWidget("oj.ojSurrogate",t.oj.baseComponent,{version:"1.0.0",widgetEventPrefix:"oj",options:{beforeDestroy:null},_ComponentCreate:function(){this._super(),this.element.uniqueId()},_invokeBeforeDestroy:function(){var e=this.options.beforeDestroy;this.options.beforeDestroy=null,e&&e()},_destroy:function(){this._invokeBeforeDestroy(),this.element.removeUniqueId(),this._super()},_NotifyDetached:function(){this._invokeBeforeDestroy(),this._super()}});e.CustomElementBridge.register("oj-surrogate",{metadata:{properties:{beforeDestroy:{type:"function"}},extension:{_WIDGET_NAME:"ojSurrogate"}}}),e.SimpleTapRecognizer=function(e){this._tapCallback=e,this.Init()},e.Object.createSubclass(e.SimpleTapRecognizer,e.Object,"oj.SimpleTapRecognizer"),e.SimpleTapRecognizer.prototype.Init=function(){e.SimpleTapRecognizer.superclass.Init.call(this);var t=this._eventHandler.bind(this);this._eventHandlerCallback=t;for(var r=document.documentElement,i=0;i<e.SimpleTapRecognizer._TOUCHEVENTS.length;i++)r.addEventListener(e.SimpleTapRecognizer._TOUCHEVENTS[i],t,!0)},e.SimpleTapRecognizer.prototype._eventHandler=function(t){var r=this._tapCallback,i=t.type;if("touchstart"===i)this._touchStartEvent=t,this._touchStartEvent._tapStart=(new Date).getTime();else if("touchmove"===i||"touchcancel"===i)this._touchStartEvent=null;else if("touchend"===i){if(this._touchStartEvent){var o=this._touchStartEvent._tapStart;if(isNaN(o))r(this._touchStartEvent);else(new Date).getTime()-o<e.SimpleTapRecognizer._PRESSHOLDTHRESSHOLD&&r(this._touchStartEvent)}this._touchStartEvent=null}},e.SimpleTapRecognizer.prototype.destroy=function(){this._tapCallback=null;var t=this._eventHandlerCallback;this._eventHandlerCallback=null;for(var r=document.documentElement,i=0;i<e.SimpleTapRecognizer._TOUCHEVENTS.length;i++)r.removeEventListener(e.SimpleTapRecognizer._TOUCHEVENTS[i],t,!0)},e.SimpleTapRecognizer._TOUCHEVENTS=["touchstart","touchmove","touchcancel","touchend"],e.SimpleTapRecognizer._PRESSHOLDTHRESSHOLD=700,e.PopupLiveRegion=function(){this.Init()},e.Object.createSubclass(e.PopupLiveRegion,e.Object,"oj.PopupLiveRegion"),e.PopupLiveRegion.prototype.Init=function(){e.PopupLiveRegion.superclass.Init.call(this),isNaN(e.PopupLiveRegion._refCounter)?e.PopupLiveRegion._refCounter=1:e.PopupLiveRegion._refCounter+=1},e.PopupLiveRegion.prototype.destroy=function(){if(!isNaN(e.PopupLiveRegion._refCounter)&&(e.PopupLiveRegion._refCounter-=1,e.PopupLiveRegion._refCounter<1)){var r=t(document.getElementById(e.PopupLiveRegion._POPUP_LIVE_REGION_ID));r.length>0&&r.remove()}},e.PopupLiveRegion.prototype.announce=function(r){if(!e.StringUtils.isEmpty(r)){var i=e.PopupLiveRegion._getLiveRegion();i.children().remove(),t("<div>").text(r).appendTo(i)}},e.PopupLiveRegion._getLiveRegion=function(){var r=t(document.getElementById(e.PopupLiveRegion._POPUP_LIVE_REGION_ID));return 0===r.length&&((r=t("<div>")).attr({id:e.PopupLiveRegion._POPUP_LIVE_REGION_ID,role:"log","aria-live":"polite","aria-relevant":"additions"}),r.addClass("oj-helper-hidden-accessible"),r.appendTo(document.body)),r},e.PopupLiveRegion._POPUP_LIVE_REGION_ID="__oj_popup_arialiveregion",e.PopupSkipLink=function(r,i,o,n,s){e.Assert.assertPrototype(r,t),e.Assert.assertString(i),e.Assert.assertFunction(o),e.Assert.assertStringOrNull(n),this._options={insertBefore:!1,preventKeyEvents:!0},s&&(this._options=Object.assign({},this._options,s)),this._sibling=r,this._message=i,this._callback=o,this._id=n,this.Init()},e.Object.createSubclass(e.PopupSkipLink,e.Object,"oj.PopupSkipLink"),e.PopupSkipLink.prototype.Init=function(){e.PopupSkipLink.superclass.Init.call(this);var r=this._sibling,i=this._callback,o=this._message,n=this._options.insertBefore,s=this._options.preventKeyEvents;this._message=null;var l=this._id;this._id=null;var a=t(document.getElementById(l));a.length<1&&(a=t("<a>").attr({tabindex:"-1",href:"#",role:"link"})),a.attr("id",l),a.addClass("oj-helper-hidden-accessible"),a.text(o),n?a.insertBefore(r):a.insertAfter(r),a.on("click",e.PopupSkipLink._activateHandler.bind(this,i)),s&&a.on("keydown keyup keypress",e.PopupSkipLink._keyHandler),r.data(e.PopupSkipLink._SKIPLINK_ATTR,a)},e.PopupSkipLink._activateHandler=function(t,r){e.ZOrderUtils.eatEvent(r),window.setImmediate(t)},e.PopupSkipLink._keyHandler=function(r){r.keyCode===t.ui.keyCode.ENTER&&e.ZOrderUtils.eatEvent(r)},e.PopupSkipLink.prototype.destroy=function(){var t=this._sibling;if(delete this._sibling,delete this._callback,t){var r=t.data(e.PopupSkipLink._SKIPLINK_ATTR);t.removeData(e.PopupSkipLink._SKIPLINK_ATTR),r&&(r.off("click keydown keyup keypress"),r.remove())}},e.PopupSkipLink.prototype.getLink=function(){var t,r=this._sibling;return r&&(t=r.data(e.PopupSkipLink._SKIPLINK_ATTR)),t},e.PopupSkipLink._SKIPLINK_ATTR="oj-skiplink",e.PopupWhenReadyMediator=function(e,t,r,i){this._element=e,this._operation=t,this._widgetName=r,this._isCustomElement=!!i,this.Init()},e.Object.createSubclass(e.PopupWhenReadyMediator,e.Object,"oj.PopupWhenReadyMediator"),e.PopupWhenReadyMediator.prototype.Init=function(){e.PopupWhenReadyMediator.superclass.Init.call(this),this._resolvedQueue=[],this._callback=this._eventHandler.bind(this);var t=this._operation,i=["oj"];this._isCustomElement?(i.push(t.charAt(0).toUpperCase()),i.push(t.slice(1))):i.push(t);var o=i.join("");this._eventType=o,this._element.on(o,this._callback);var n=r.getContext(this._element[0]).getBusyContext(),s={description:this._getBusyStateDescription.bind(this,this._element,this._operation,this._widgetName)},l=n.addBusyState(s);this.AddPromiseExecutor(l),this._whenReadyPromise=new Promise(this.AddPromiseExecutor.bind(this))},e.PopupWhenReadyMediator.prototype._getBusyStateDescription=function(e,t,r){return r+" identified by '"+e.attr("id")+"' is busy animating on the '"+t+"' operation."},e.PopupWhenReadyMediator.prototype._deliverResolved=function(e){var t=this._resolvedQueue;this._resolvedQueue=null;var r=e||this._operation;this._operation=null;for(var i=0;i<t.length;i++)try{t[i](r)}catch(e){o.error("Error resolving whenReady promises:\n%o",e)}this._whenReadyPromise=Promise.resolve("none")},e.PopupWhenReadyMediator.prototype.destroy=function(){if(this._resolvedQueue&&this._deliverResolved("none"),this._callback){var e=this._eventType;this._element.off(e,this._callback)}this._callback=null,this._element=null,this._operation=null,this._whenReadyPromise=null,this._widgetName=null,this._eventType=null},e.PopupWhenReadyMediator.prototype.getWhenReadyPromise=function(){return this._whenReadyPromise},e.PopupWhenReadyMediator.prototype._eventHandler=function(e){e.target===this._element[0]&&(this._element.off(e.type,this._callback),this._deliverResolved(),this._callback=null)},e.PopupWhenReadyMediator.prototype._getPendingOperation=function(){return this._operation?this._operation:"none"},e.PopupWhenReadyMediator.prototype.AddPromiseExecutor=function(e,t){this._resolvedQueue&&this._resolvedQueue.push(e)},e.PopupWhenReadyMediator.prototype.isOperationPending=function(e,t,r,i){var n=!1,s=this._widgetName,l=this._getPendingOperation();if(t===l)o.info("An %s instance invoked a '%s' operation while pending animation of the same type of operation.  The second request will be ignored.",s,t),n=!0;else if("none"!==l){o.info("An %s instance invoked a '%s' operation while pending animation of a '%s' operation. The second request will be invoked after the pending operation completes.",s,t,l),new Promise(this.AddPromiseExecutor.bind(this)).then(function(){this[r].apply(this,i)}.bind(e)),n=!0}return n},e.PositionUtils={},e.PositionUtils.normalizeHorizontalAlignment=function(r,i){for(var o=t.extend({},r),n=0;n<e.PositionUtils._ALIGN_RULE_PROPERTIES.length;n++){var s=e.PositionUtils._ALIGN_RULE_PROPERTIES[n],l=o[s];if(l)if(e.StringUtils.isString(l))o[s]=l.replace("start",i?"right":"left").replace("end",i?"left":"right").replace("<",i?"+":"-").replace(">",i?"-":"+");else for(var a=0;a<e.PositionUtils._SUB_ALIGN_RULE_PROPERTIES.length;a++){var p=e.PositionUtils._SUB_ALIGN_RULE_PROPERTIES[a],u=l[p];e.StringUtils.isString(u)&&(l[p]=u.replace("start",i?"right":"left").replace("end",i?"left":"right").replace("<",i?"+":"-").replace(">",i?"-":"+"))}}return o},e.PositionUtils.normalizePositionOf=function(e,t,r){return"event"===e?r:null==e||"launcher"===e?t:e},e.PositionUtils._normalizeEventForPosition=function(e){t.each(["pageX","pageY"],function(t,r){if(e&&void 0===e[r]&&e.originalEvent){var i,o=e.originalEvent,n=o.type;if(i="touchstart"===n||"touchmove"===n?"touches":"touchend"===n?"changedTouches":null){var s=o[i][0];s&&(e[r]=s[r])}}})},e.PositionUtils._ALIGN_RULE_PROPERTIES=["my","at"],e.PositionUtils._SUB_ALIGN_RULE_PROPERTIES=["vertical","horizontal"],e.PositionUtils.isAligningPositionClipped=function(t){if(t.target&&t.target.height>0&&t.target.width>0){var r=t.target.element;return!e.PositionUtils.isWithinViewport(r)}return!1},e.PositionUtils.isWithinViewport=function(r){function i(t,r){var i;if(["hidden","scroll","auto"].indexOf(r.overflowY)>-1){if(t.bottom-r.top<-1)return!1;if(i="auto"===r.overflowX&&r.scrollWidth>r.innerWidth||"scroll"===r.overflowX?e.DomUtils.getScrollBarWidth():0,r.bottom-i-t.top<1)return!1}return!(["hidden","scroll","auto"].indexOf(r.overflowX)>-1&&(i="auto"===r.overflowY&&r.scrollHeight>r.innerHeight||"scroll"===r.overflowY?e.DomUtils.getScrollBarWidth():0,t.right-(r.left+("rtl"===e.DomUtils.getReadingDirection()?i:0))<-1||t.left-(r.right-("ltr"===e.DomUtils.getReadingDirection()?i:0))>-1))}function o(e){var r=e[0];if(1===r.nodeType){var i=t.extend({},r.getBoundingClientRect());return i.overflowX=e.css("overflow-x"),i.overflowY=e.css("overflow-y"),i.innerHeight=e.innerHeight(),i.innerWidth=e.innerWidth(),i.scrollHeight=r.scrollHeight,i.scrollWidth=r.scrollWidth,i}return{height:0,width:0}}function n(t){return["fixed","absolute","relative"].indexOf(t.css("position"))>-1&&(Math.abs(e.DomUtils.getCSSLengthAsInt(t.css("top")))>0||Math.abs(e.DomUtils.getCSSLengthAsInt(t.css("bottom")))>0||Math.abs(e.DomUtils.getCSSLengthAsInt(t.css("left")))>0||Math.abs(e.DomUtils.getCSSLengthAsInt(t.css("right")))>0)}if(!r)return!1;if(t.isWindow(r[0])||n(r))return!0;for(var s,l=o(r),a=!0,p=r.parent();a&&p&&p.length>0&&"BODY"!==p[0].nodeName&&1===p[0].nodeType&&!n(p);){if("visible"!==(s=p).css("overflow-x")||"visible"!==s.css("overflow-y")){var u=o(p);u.height>0&&u.width>0&&(a=i(l,u))}p=p.parent()}return a},e.PositionUtils._ANIMATION_TRANSFORM_ORIGIN_RULES={"right-top":"right top","right-middle":"right center","right-bottom":"right bottom","left-top":"left top","left-middle":"left center","left-bottom":"left bottom","center-top":"center top","center-middle":"center center","center-bottom":"center bottom"},e.PositionUtils._ALIGN_MNEMONIC_DATA="oj-popup-align-mnemonic",e.PositionUtils.captureTransformOriginAnimationEffectsOption=function(t,r){var i=[r.horizontal,r.vertical].join("-");t.data(e.PositionUtils._ALIGN_MNEMONIC_DATA,i)},e.PositionUtils.addTransformOriginAnimationEffectsOption=function(t,r){var i,o;e.StringUtils.isString(r)?(o=!0,i=r):(o=!1,i=JSON.stringify(r));var n=/#myPosition/g;if(i.match(n)){var s=t.data(e.PositionUtils._ALIGN_MNEMONIC_DATA);e.StringUtils.isEmptyOrUndefined(s)&&(s="center-middle");var l=e.PositionUtils._ANIMATION_TRANSFORM_ORIGIN_RULES[s];i=i.replace(n,l),r=o?i:JSON.parse(i)}return r},e.PositionUtils._JQUI_MNEMONIC_GRP_REGX=/^(\w+)(\+|-)?(\d+)?/,e.PositionUtils._VERTICAL_ENUM_TST_REGX=/^top$|^center$|^bottom$/,e.PositionUtils._HORIZONTAL_ENUM_TST_REGX=/^start$|^left$|^center$|^end$|^right$/,e.PositionUtils._COLLISION_ENUM_TST_REGX=/^none$|^flip$|^flipfit$|^fit$|^flipcenter$/,e.PositionUtils._parsePositionNmnemonic=function(t,r){var i=[null,Number.NaN],o=e.PositionUtils._JQUI_MNEMONIC_GRP_REGX.exec(t);if(o[1]&&r.test(o[1])&&(i[0]=o[1],o[2])){var n=parseInt(o[3],10);isNaN(n)||(n*="-"===o[2]?-1:1,i[1]=n)}return i},e.PositionUtils._parseJSON=function(t){if(e.StringUtils.isString(t)&&/^{/.test(t)&&/}$/.test(t))try{return JSON.parse(t)}catch(e){}return null},e.PositionUtils._coerceMyAtToJet=function(r,i,o,n){var s=e.PositionUtils._parseJSON(i);s&&(i=s),(s=e.PositionUtils._parseJSON(o))&&(o=s),n||(n={});var l,a=t.extend({},n),p={x:0,y:0};if(o&&"x"in o&&"y"in o&&(p.x=e.DomUtils.getCSSLengthAsInt(o.x),p.y=e.DomUtils.getCSSLengthAsInt(o.y)),e.StringUtils.isString(i)){var u=i.split(/\s/);u.length>0&&!e.StringUtils.isEmpty(u[0])&&(l=e.PositionUtils._parsePositionNmnemonic(u[0],e.PositionUtils._HORIZONTAL_ENUM_TST_REGX))[0]&&(a.horizontal=l[0],isNaN(l[1])||(p.x=l[1])),u.length>1&&!e.StringUtils.isEmpty(u[1])&&(l=e.PositionUtils._parsePositionNmnemonic(u[1],e.PositionUtils._VERTICAL_ENUM_TST_REGX))[0]&&(a.vertical=l[0],isNaN(l[1])||(p.y=l[1]))}else i&&("horizontal"in i&&(l=e.PositionUtils._parsePositionNmnemonic(i.horizontal,e.PositionUtils._HORIZONTAL_ENUM_TST_REGX))[0]&&(a.horizontal=l[0],isNaN(l[1])||(p.x=l[1])),"vertical"in i&&(l=e.PositionUtils._parsePositionNmnemonic(i.vertical,e.PositionUtils._VERTICAL_ENUM_TST_REGX))[0]&&(a.vertical=l[0],isNaN(l[1])||(p.y=l[1])));var c={};return c[r]=a,c.offset=p,c},e.PositionUtils._coerceCollisionToJet=function(t,r){var i=r;return e.PositionUtils._COLLISION_ENUM_TST_REGX.test(t)&&(i=t),{collision:i}},e.PositionUtils._coerceOfToJet=function(r,i){var o=e.PositionUtils._parseJSON(r);o&&(r=o);var n=i;if(e.StringUtils.isString(r))n=r;else if(t.isWindow(r))n="window";else if(r instanceof Element||r instanceof t){(r=t(r)).uniqueId(),n="#"+function(e){for(var t=[],r=/\w|_|-/,i=0;i<e.length;i++){var o=e.substring(i,i+1);r.test(o)?t.push(o):t.push("\\"+o)}return t.join("")}(r.attr("id"))}else r instanceof Event||r instanceof t.Event?("pageX"in r||"pageY"in r)&&((n={}).x=e.DomUtils.getCSSLengthAsFloat(r.pageX),n.y=e.DomUtils.getCSSLengthAsFloat(r.pageY)):r&&("x"in r||"y"in r)&&((n={}).x=e.DomUtils.getCSSLengthAsFloat(r.x),n.y=e.DomUtils.getCSSLengthAsFloat(r.y));return{of:n}},e.PositionUtils.coerceToJet=function(r,i){r||(r={});var o=e.PositionUtils._parseJSON(r);o&&(r=o),i||(i={});var n=i.my,s=i.at,l=i.collision,a=i.of,p=e.PositionUtils._coerceMyAtToJet("my",r.my,r.offset,n),u=e.PositionUtils._coerceMyAtToJet("at",r.at,null,s),c={offset:{x:p.offset.x+u.offset.x,y:p.offset.y+u.offset.y}};return delete p.offset,delete u.offset,t.extend({},p,u,c,e.PositionUtils._coerceCollisionToJet(r.collision,l),e.PositionUtils._coerceOfToJet(r.of,a),function(e,r){return{using:t.isFunction(e)?e:r}}(r.using,void 0))},e.PositionUtils.coerceToJqUi=function(r){function i(e,t){var i=[];if(r[e][t]?i.push(r[e][t]):i.push("center"),"my"===e&&r.offset){var o="horizontal"===t?"x":"y",n=r.offset[o];isNaN(n)||0===n||(i.push(n>0?"+":""),i.push(Math.floor(n).toString()))}return i.join("")}var o={};["my","at"].forEach(function(e){if(r[e]){var t=[];t.push(i(e,"horizontal")),t.push(" "),t.push(i(e,"vertical")),o[e]=t.join("")}});var n=r.of;if(e.StringUtils.isString(n))o.of="window"===n?window:n;else if(n&&!e.StringUtils.isString(n)&&"x"in n&&"y"in n){var s=n.x,l=n.y,a=document.createEvent("MouseEvents");a.initMouseEvent("click",!0,!0,window,1,s,l,s,l,!1,!1,!1,!1,0,null),o.of=t.Event(a,{pageX:s,pageY:l})}else o.of=n;return r.collision&&(o.collision=r.collision),r.using&&(o.using=r.using),o},t.ui.position.flipcenter={left:function(r,i){var o=r.left;t.ui.position.flip.left.call(this,r,i);var n=i.within,s=n.isWindow?n.scrollLeft:n.offset.left,l=n.width,a=r.left-i.collisionPosition.marginLeft,p=s-a,u=a+i.collisionWidth-l-s;(p>0||u>0)&&("right"===i.at[0]?o-=i.targetWidth/2:"left"===i.at[0]&&(o+=i.targetWidth/2),o-=("rtl"===e.DomUtils.getReadingDirection()?-1:1)*(i.elemWidth/2),r.left=Math.max(0,o))},top:function(e,r){var i=e.top;t.ui.position.flip.top.call(this,e,r);var o=r.within,n=o.isWindow?o.scrollTop:o.offset.top,s=r.within.height,l=e.top-r.collisionPosition.marginTop,a=n-l,p=l+r.collisionHeight-s-n;(a>0||p>0)&&("top"===r.at[1]?i+=r.targetHeight/2:"bottom"===r.at[1]&&(i-=r.targetHeight/2),i+=r.elemHeight/2,e.top=Math.max(0,i))}};var n=t.ui.position.flip.left;t.ui.position.flip={left:n.bind(this),top:function(e,t){var r,i,o=t.within,n=o.offset.top+o.scrollTop,s=o.height,l=o.isWindow?o.scrollTop:o.offset.top,a=e.top-t.collisionPosition.marginTop,p=a-l,u=a+t.collisionHeight-s-l;r="top"===t.my[1]?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,i="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0;var c,d,_=-2*t.offset[1];p<0?((c=e.top+r+i+_+t.collisionHeight-s-n)<0||c<Math.abs(p))&&u<0&&p>u&&(e.top+=r+i+_):u>0&&((d=e.top-t.collisionPosition.marginTop+r+i+_-l)>0||Math.abs(d)<u)&&(e.top+=r+i+_)}}});