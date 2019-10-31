/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(["require","promise","ojs/ojlogger"],function(t,e,n){"use strict";e.polyfill();var r={};"undefined"!=typeof window?r=window:"undefined"!=typeof self&&(r=self);var s=r.oj,o={version:"7.2.0",revision:"2019-09-12_18-05-50",noConflict:function(){r.oj=s}};r.oj=o,o.Assert={};o.Assert.forceDebug=function(){o.Assert.DEBUG=!0},o.Assert.clearDebug=function(){o.Assert.DEBUG=!1},o.Assert.isDebug=function(){return!0===o.Assert.DEBUG},o.Assert.assert=function(t,e){if(o.Assert.DEBUG&&!t){var n=e||"";if(arguments.length>2){n+="(";for(var r=2;r<arguments.length;r+=1)n+=arguments[r];n+=")"}o.Assert.assertionFailed(n,1)}},o.Assert.failedInAbstractFunction=function(){o.Assert.DEBUG&&o.Assert.assertionFailed("Abstract function called",1)},o.Assert.assertPrototype=function(t,e,n){if(o.Assert.DEBUG){var r=e.prototype;if(null!=t)o.Assert.assertType(e,"function",null,1,!1),Object.prototype.isPrototypeOf.call(r,t)||o.Assert.assertionFailed("object '"+t+"' doesn't match prototype "+r,1,n);else o.Assert.assertionFailed("null object doesn't match prototype "+r,1,n)}},o.Assert.assertPrototypeOrNull=function(t,e,n){if(o.Assert.DEBUG&&null!=t){o.Assert.assertType(e,"function",null,1,!1);var r=e.prototype;Object.prototype.isPrototypeOf.call(r,t)||o.Assert.assertionFailed("object '"+t+"' doesn't match prototype "+r,1,n)}},o.Assert.assertPrototypes=function(t,e,n,r){if(o.Assert.DEBUG){var s=e.prototype,i=n.prototype,a=Object.prototype.isPrototypeOf;a.call(s,t)||a.call(i,t)||o.Assert.assertionFailed("object '"+t+"' doesn't match prototype "+s+" or "+i,1,r)}},o.Assert.assertDomNodeOrNull=function(t,e){o.Assert.DEBUG&&t&&void 0===t.nodeType&&o.Assert.assertionFailed(t+" is not a DOM Node",e+1)},o.Assert.assertDomNode=function(t,e){o.Assert.DEBUG&&(t&&void 0!==t.nodeType||o.Assert.assertionFailed(t+" is not a DOM Node",e+1))},o.Assert.assertDomElement=function(t,e){o.Assert.DEBUG&&(o.Assert.assertDomNode(t,1),1!==t.nodeType?o.Assert.assertionFailed(t+" is not a DOM Element",1):e&&t.nodeName!==e&&o.Assert.assertionFailed(t+" is not a "+e+" Element",1))},o.Assert.assertDomElementOrNull=function(t,e){o.Assert.DEBUG&&null!=t&&(o.Assert.assertDomNode(t,1),1!==t.nodeType?o.Assert.assertionFailed(t+" is not a DOM Element",1):e&&t.nodeName!==e&&o.Assert.assertionFailed(t+" is not a "+e+" Element",1))},o.Assert.assertType=function(t,e,n,r,s){if(o.Assert.DEBUG&&!(null==t&&s||typeof t===e)){var i=t+" is not of type "+e;n&&(i=n+i),r||(r=0),o.Assert.assertionFailed(i,r+1)}},o.Assert.assertObject=function(t,e){o.Assert.DEBUG&&o.Assert.assertType(t,"object",e,1,!1)},o.Assert.assertObjectOrNull=function(t,e){o.Assert.DEBUG&&o.Assert.assertType(t,"object",e,1,!0)},o.Assert.assertNonEmptyString=function(t,e){o.Assert.DEBUG&&(o.Assert.assertType(t,"string",e,1,!1),o.Assert.assert(t.length>0,"empty string"))},o.Assert.assertString=function(t,e){o.Assert.DEBUG&&o.Assert.assertType(t,"string",e,1,!1)},o.Assert.assertStringOrNull=function(t,e){o.Assert.DEBUG&&o.Assert.assertType(t,"string",e,1,!0)},o.Assert.assertFunction=function(t,e){o.Assert.DEBUG&&o.Assert.assertType(t,"function",e,1,!1)},o.Assert.assertFunctionOrNull=function(t,e){o.Assert.DEBUG&&o.Assert.assertType(t,"function",e,1,!0)},o.Assert.assertBoolean=function(t,e){o.Assert.DEBUG&&o.Assert.assertType(t,"boolean",e,1,!1)},o.Assert.assertNumber=function(t,e){o.Assert.DEBUG&&o.Assert.assertType(t,"number",e,1,!1)},o.Assert.assertNumberOrNull=function(t,e){o.Assert.DEBUG&&o.Assert.assertType(t,"number",e,1,!0)},o.Assert.assertArray=function(t,e){o.Assert.DEBUG&&(Array.isArray(t)||(void 0===e&&(e=t+" is not an array"),o.Assert.assertionFailed(e,1)))},o.Assert.assertArrayOrNull=function(t,e){o.Assert.DEBUG&&null!=t&&(Array.isArray(t)||(void 0===e&&(e=t+" is not an array"),o.Assert.assertionFailed(e,1)))},o.Assert.assertNonNumeric=function(t,e){o.Assert.DEBUG&&(isNaN(t)||(void 0===e&&(e=t+" is convertible to a number"),o.Assert.assertionFailed(e,1)))},o.Assert.assertNumeric=function(t,e){o.Assert.DEBUG&&isNaN(t)&&(void 0===e&&(e=t+" is not convertible to a number"),o.Assert.assertionFailed(e,1))},o.Assert.assertInSet=function(t,e,n){if(null==t||void 0===e[t.toString()]){if(void 0===n){for(var r=" is not in set: {",s=Object.keys(e),i=0;i<s.length;i++){r+=s[i],r+=","}n=t+(r+="}")}o.Assert.assertionFailed(n,1)}},o.Assert.assertionFailed=function(t,e,n){e||(e=0);var r="Assertion";throw n&&(r+=" ("+n+")"),r+=" failed: ",void 0!==t&&(r+=t),new Error(r)};var i,a,l,c,u,f,d=r.__oj_Assert_DEBUG;void 0!==d&&(o.Assert.DEBUG=d),o.CollectionUtils={},o.CollectionUtils.copyInto=function(t,e,n,r,s){return o.CollectionUtils._copyIntoImpl(t,e,n,r,s,0)},o.CollectionUtils.isPlainObject=function(t){if(null!==t&&"object"==typeof t)try{var e=Object.prototype.hasOwnProperty;if(t.constructor&&e.call(t.constructor.prototype,"isPrototypeOf"))return!0}catch(t){}return!1},o.CollectionUtils._copyIntoImpl=function(t,e,n,r,s,i){var a;if(null==s&&(s=Number.MAX_VALUE),t&&e&&t!==e)for(var l=Object.keys(e),c=0;c<l.length;c++){var u=l[c];a=n?n(u):u;var f=e[u],d=!1;if(r&&i<s){var p=t[a];o.CollectionUtils.isPlainObject(f)&&(null==p||o.CollectionUtils.isPlainObject(p))&&(d=!0,t[a]=p||{},o.CollectionUtils._copyIntoImpl(t[a],f,n,!0,s,i+1))}d||(t[a]=f)}return t},o.Object=function(){this.Init()},o.Object.superclass=null,o.Object._typeName="oj.Object",o.Object._GET_FUNCTION_NAME_REGEXP=/function\s+([\w$][\w$\d]*)\s*\(/,o.Object.prototype={},o.Object.prototype.constructor=o.Object,o.Object.createSubclass=function(t,e,n){o.Assert.assertFunction(t),o.Assert.assertFunctionOrNull(e),o.Assert.assertStringOrNull(n),void 0===e&&(e=o.Object),o.Assert.assert(t!==e,"Class can't extend itself");var r=o.Object._tempSubclassConstructor;r.prototype=e.prototype,t.prototype=new r,t.prototype.constructor=t,t.superclass=e.prototype,n&&(t._typeName=n)},o.Object.copyPropertiesForClass=function(t,e){o.Assert.assertFunction(t),o.Assert.assert(null!=e,"source object cannot be null");for(var n=Object.keys(e),r=0;r<n.length;r++){var s=n[r];t.prototype[s]=e[s]}},o.Object._tempSubclassConstructor=function(){},o.Object.prototype.getClass=function(t){if(void 0===t)t=this;else if(null===t)return null;return t.constructor},o.Object.prototype.clone=function(){var t=new this.constructor;return o.CollectionUtils.copyInto(t,this),t},o.Object.prototype.toString=function(){return this.toDebugString()},o.Object.prototype.toDebugString=function(){return this.getTypeName()+" Object"},o.Object.getTypeName=function(t){o.Assert.assertFunction(t);var e=t._typeName;if(null==e){var n=t.toString(),r=o.Object._GET_FUNCTION_NAME_REGEXP.exec(n);e=r?r[1]:"anonymous",t._typeName=e}return e},o.Object.prototype.getTypeName=function(){return o.Object.getTypeName(this.constructor)},o.Object.prototype.Init=function(){o.Assert.isDebug()&&o.Assert.assert(this.getTypeName,"Not an oj.Object");var t=this.constructor;t._initialized||o.Object._initClasses(t)},o.Object.ensureClassInitialization=function(t){o.Assert.assertFunction(t),t._initialized||o.Object._initClasses(t)},o.Object.prototype.equals=function(t){return this===t},o.Object.createCallback=function(t,e){return o.Assert.assertFunction(e),e.bind(t)},o.Object._initClasses=function(t){o.Assert.isDebug()&&(o.Assert.assertFunction(t),o.Assert.assert(!t._initialized)),t._initialized=!0;var e=t.superclass;if(e){var n=e.constructor;n&&!n._initialized&&o.Object._initClasses(n)}var r=t.InitClass;r&&r.call(t)},o.Object.compareValues=function(t,e){if(t===e)return!0;if(typeof t!==typeof e)return!1;if(null===t||null===e)return!1;if(t.constructor===e.constructor){if(Array.isArray(t))return o.Object._compareArrayValues(t,e);if(t.constructor===Object)return o.Object.__innerEquals(t,e);if(t.valueOf&&"function"==typeof t.valueOf)return t.valueOf()===e.valueOf()}return!1},o.Object._compareArrayValues=function(t,e){if(t.length!==e.length)return!1;for(var n=0,r=t.length;n<r;n++)if(!o.Object.compareValues(t[n],e[n]))return!1;return!0},o.Object._compareIdIndexObject=function(t,e){if("number"==typeof t&&"number"==typeof e||"string"==typeof t&&"string"==typeof e)return t===e;if("object"==typeof t&&"object"==typeof e){if(t.id&&e.id)return t.id===e.id&&(!t.index||!e.index||t.index===e.index);if(t.index&&e.index)return t.index===e.index}return!1},o.Object._compareArrayIdIndexObject=function(t,e){if(!t)return!e||0===e.length;if(!e)return!t||0===t.length;if(t.length!==e.length)return!1;for(var n=0;n<t.length;n++){for(var r=!1,s=0;s<e.length;s++)if(o.Object._compareIdIndexObject(t[n],e[s])){r=!0;break}if(!r)return!1}return!0},o.Object.__innerEquals=function(t,e){if(t===e)return!0;if(!(t instanceof Object&&e instanceof Object))return!1;if(t.constructor!==e.constructor)return!1;var n,r,s=Object.prototype.hasOwnProperty,i=Object.keys(t);for(r=0;r<i.length;r++)if(n=i[r],s.call(t,n)){if(!s.call(e,n))return!1;if(t[n]!==e[n]){if("object"!=typeof t[n])return!1;if(!o.Object.__innerEquals(t[n],e[n]))return!1}}var a=Object.keys(e);for(r=0;r<a.length;r++)if(n=a[r],s.call(e,n)&&!s.call(t,n))return!1;return 0!==i.length||0!==a.length||JSON.stringify(t)===JSON.stringify(e)},o.Object.isEmpty=function(t){var e;if(null==t)return!0;for(e in t)if(t.hasOwnProperty(e))return!1;return!0},o.__isAmdLoaderPresent=function(){return"function"==typeof define&&define.amd},o.__getRequirePromise=function(t,e){return o.__isAmdLoaderPresent()?new Promise(function(n,r){e([t],n,r)}):null},o.StringUtils={},o.StringUtils._TRIM_ALL_RE=/^\s*|\s*$/g,o.StringUtils.isEmpty=function(t){return null===t||0===o.StringUtils.trim(t).length},o.StringUtils.isEmptyOrUndefined=function(t){return!(void 0!==t&&!o.StringUtils.isEmpty(t))},o.StringUtils.isString=function(t){return null!==t&&("string"==typeof t||t instanceof String)},o.StringUtils.trim=function(t){return o.StringUtils.isString(t)?t.replace(o.StringUtils._TRIM_ALL_RE,""):t},o.StringUtils.hashCode=function(t){var e=0;if(0===t.length)return e;for(var n=0;n<t.length;n++){e=(e<<5)-e+t.charCodeAt(n),e&=e}return e},String.prototype.startsWith||(String.prototype.startsWith=function(t,e){return e=e||0,this.substr(e,t.length)===t}),String.prototype.endsWith||(String.prototype.endsWith=function(t,e){var n=this.toString();("number"!=typeof e||!isFinite(e)||Math.floor(e)!==e||e>n.length)&&(e=n.length),e-=t.length;var r=n.lastIndexOf(t,e);return-1!==r&&r===e}),o.AgentUtils=function(){},o.AgentUtils.BROWSER={IE:"ie",FIREFOX:"firefox",SAFARI:"safari",CHROME:"chrome",EDGE:"edge",UNKNOWN:"unknown"},o.AgentUtils.ENGINE={TRIDENT:"trident",WEBKIT:"webkit",GECKO:"gecko",BLINK:"blink",EDGE_HTML:"edgehtml",UNKNOWN:"unknown"},o.AgentUtils.OS={WINDOWS:"Windows",SOLARIS:"Solaris",MAC:"Mac",UNKNOWN:"Unknown",ANDROID:"Android",IOS:"IOS",WINDOWSPHONE:"WindowsPhone",LINUX:"Linux"},o.AgentUtils.DEVICETYPE={PHONE:"phone",TABLET:"tablet",OTHERS:"others"},o.AgentUtils.getAgentInfo=function(t){o.StringUtils.isEmptyOrUndefined(t)&&(t=navigator.userAgent),t=t.toLowerCase();var e=o.StringUtils.hashCode(t),n=o.AgentUtils._currAgentInfo;if(n&&n.hashCode===e)return{os:n.os,browser:n.browser,browserVersion:n.browserVersion,deviceType:n.deviceType,engine:n.engine,engineVersion:n.engineVersion,hashCode:n.hashCode};var r=o.AgentUtils.OS.UNKNOWN,s=o.AgentUtils.BROWSER.UNKNOWN,i=0,a=o.AgentUtils.DEVICETYPE.OTHERS,l=o.AgentUtils.ENGINE.UNKNOWN,c=0;return t.indexOf("iphone")>-1||t.indexOf("ipad")>-1?r=o.AgentUtils.OS.IOS:t.indexOf("mac")>-1?r=o.AgentUtils.OS.MAC:t.indexOf("sunos")>-1?r=o.AgentUtils.OS.SOLARIS:t.indexOf("android")>-1?r=o.AgentUtils.OS.ANDROID:t.indexOf("linux")>-1?r=o.AgentUtils.OS.LINUX:t.indexOf("windows phone")>-1?r=o.AgentUtils.OS.WINDOWSPHONE:t.indexOf("win")>-1&&(r=o.AgentUtils.OS.WINDOWS),r===o.AgentUtils.OS.ANDROID?a=t.indexOf("mobile")>-1?o.AgentUtils.DEVICETYPE.PHONE:o.AgentUtils.DEVICETYPE.TABLET:r===o.AgentUtils.OS.IOS&&(a=t.indexOf("iphone")>-1?o.AgentUtils.DEVICETYPE.PHONE:o.AgentUtils.DEVICETYPE.TABLET),t.indexOf("msie")>-1?(s=o.AgentUtils.BROWSER.IE,i=o.AgentUtils._parseFloatVersion(t,/msie (\d+[.]\d+)/),t.indexOf("trident")&&(l=o.AgentUtils.ENGINE.TRIDENT,c=o.AgentUtils._parseFloatVersion(t,/trident\/(\d+[.]\d+)/))):t.indexOf("trident")>-1?(s=o.AgentUtils.BROWSER.IE,i=o.AgentUtils._parseFloatVersion(t,/rv:(\d+[.]\d+)/),t.indexOf("trident")&&(l=o.AgentUtils.ENGINE.TRIDENT,c=o.AgentUtils._parseFloatVersion(t,/trident\/(\d+[.]\d+)/))):t.indexOf("edge")>-1?(s=o.AgentUtils.BROWSER.EDGE,i=c=o.AgentUtils._parseFloatVersion(t,/edge\/(\d+[.]\d+)/),l=o.AgentUtils.ENGINE.EDGE_HTML):t.indexOf("chrome")>-1?(s=o.AgentUtils.BROWSER.CHROME,(i=o.AgentUtils._parseFloatVersion(t,/chrome\/(\d+[.]\d+)/))>=28?(l=o.AgentUtils.ENGINE.BLINK,c=i):(l=o.AgentUtils.ENGINE.WEBKIT,c=o.AgentUtils._parseFloatVersion(t,/applewebkit\/(\d+[.]\d+)/))):t.indexOf("safari")>-1?(s=o.AgentUtils.BROWSER.SAFARI,i=o.AgentUtils._parseFloatVersion(t,/version\/(\d+[.]\d+)/),l=o.AgentUtils.ENGINE.WEBKIT,c=o.AgentUtils._parseFloatVersion(t,/applewebkit\/(\d+[.]\d+)/)):t.indexOf("firefox")>-1&&(s=o.AgentUtils.BROWSER.FIREFOX,i=o.AgentUtils._parseFloatVersion(t,/rv:(\d+[.]\d+)/),l=o.AgentUtils.ENGINE.GECKO,c=o.AgentUtils._parseFloatVersion(t,/gecko\/(\d+)/)),n={hashCode:e,os:r,browser:s,browserVersion:i,deviceType:a,engine:l,engineVersion:c},o.AgentUtils._currAgentInfo=n,{os:n.os,browser:n.browser,browserVersion:n.browserVersion,deviceType:n.deviceType,engine:n.engine,engineVersion:n.engineVersion,hashCode:n.hashCode}},o.AgentUtils._parseFloatVersion=function(t,e){var n=t.match(e);if(n){var r=n[1];if(r)return parseFloat(r)}return 0},i=/(^array)|(\|array)/,a=/(^object)|(\|object)/,l=/\s*\[[^]*\]\s*/,c=/\s*\{[^]*\}\s*/,u=/^(?:\{\{)([^]+)(?:\}\})$/,f=/^(?:\[\[)([^]+)(?:\]\])$/,o.__AttributeUtils={},o.__AttributeUtils.getExpressionInfo=function(t){var e={};if(t){var n=t.trim(),r=u.exec(n);(r=r?r[1]:null)||(e.downstreamOnly=!0,r=(r=f.exec(n))?r[1]:null),e.expr=r}return e},o.__AttributeUtils.attributeToPropertyName=function(t){return t.toLowerCase().replace(/-(.)/g,function(t,e){return e.toUpperCase()})},o.__AttributeUtils.propertyNameToAttribute=function(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})},o.__AttributeUtils.eventTypeToEventListenerProperty=function(t){return"on"+t.substr(0,1).toUpperCase()+t.substr(1)},o.__AttributeUtils.eventListenerPropertyToEventType=function(t){return/^on[A-Z]/.test(t)?t.substr(2,1).toLowerCase()+t.substr(3):null},o.__AttributeUtils.propertyNameToChangeEventType=function(t){return t+"Changed"},o.__AttributeUtils.eventTriggerToEventType=function(t){return"oj"+t.substr(0,1).toUpperCase()+t.substr(1)},o.__AttributeUtils.coerceValue=function(t,e,n,r){if(!r)throw new Error("Unable to parse "+e+"='"+n+"' for "+t+" with id "+t.id+" . This attribute only supports data bound values. Check the API doc for supported types");var s=r.toLowerCase(),u=l.test(n),f=c.test(n);if(i.test(s)&&u||a.test(s)&&f||"any"===s&&(u||f))try{return JSON.parse(n)}catch(r){throw new Error("Unable to parse "+e+"='"+n+"' for "+t.tagName+" with id "+t.id+" to a JSON Object. Check the value for correct JSON syntax, e.g. double quoted strings. "+r)}else{if("boolean"===s)return o.__AttributeUtils.coerceBooleanValue(t,e,n,r);if("number"===s){if(!isNaN(n))return Number(n)}else if(-1!==r.split("|").indexOf("string")||"any"===s)return n}throw new Error("Unable to parse "+e+"='"+n+"' for "+t+" with id "+t.id+" to a "+r+".")},o.__AttributeUtils.coerceBooleanValue=function(t,e,n,r){if(null==n||"true"===n||""===n||n.toLowerCase()===e)return!0;if("false"===n)return!1;throw new Error("Unable to parse "+e+"='"+n+"' for "+t+" with id "+t.id+" to a "+r+".")},"undefined"!=typeof window&&window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(t){var e,n=(this.document||this.ownerDocument).querySelectorAll(t),r=this;do{for(e=n.length;--e>=0&&n.item(e)!==r;);}while(e<0&&(r=r.parentElement));return r}),o.ElementUtils={isValidCustomElementName:function(t){var e=new Set(["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"]).has(t),n=/^[a-z][.0-9_a-z]*-[-.0-9_a-z]*$/.test(t);return!e&&n&&!t.startsWith("oj-bind-",0)}},o.EventSource=function(){this.Init()},o.Object.createSubclass(o.EventSource,o.Object,"oj.EventSource"),o.EventSource.prototype.Init=function(){this._eventHandlers=[],o.EventSource.superclass.Init.call(this)},o.EventSource.prototype.on=function(t,e){for(var n=!1,r=0;r<this._eventHandlers.length;r++)if(this._eventHandlers[r].eventType===t&&this._eventHandlers[r].eventHandlerFunc===e){n=!0;break}n||this._eventHandlers.push({eventType:t,eventHandlerFunc:e})},o.EventSource.prototype.off=function(t,e){for(var n=this._eventHandlers.length-1;n>=0;n--)if(this._eventHandlers[n].eventType===t&&this._eventHandlers[n].eventHandlerFunc===e){this._eventHandlers.splice(n,1);break}},o.EventSource.prototype.handleEvent=function(t,e){for(var n=0;n<this._eventHandlers.length;n++){var r=this._eventHandlers[n];if(r.eventType===t&&!1===r.eventHandlerFunc.apply(this,Array.prototype.slice.call(arguments).slice(1)))return!1}return!0},o.KeyUtils={},o.KeyUtils.equals=function(t,e){return o.Object.compareValues(t,e)},function(){if("undefined"!=typeof window){var t;if(!((t=document.createEvent("Event")).initEvent("foo",!0,!0),t.preventDefault(),t.defaultPrevented)){var e=Event.prototype.preventDefault;Event.prototype.preventDefault=function(){this.cancelable&&(e.call(this),Object.defineProperty(this,"defaultPrevented",{get:function(){return!0},configurable:!0}))}}"function"!=typeof window.CustomEvent&&(n.prototype=Object.getPrototypeOf(new n("bogusEvent")),window.CustomEvent=n)}function n(t,e){e=e||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n}}(),function(){var t,e;"undefined"!=typeof window&&!window.setImmediate&&window.postMessage&&(window.setImmediate=function(){var r=arguments[0],s=Array.prototype.slice.call(arguments,1);"function"!=typeof r&&(r=new Function(r.toString()));var o=(isNaN(e)&&(e=0),e+=1);return t||(t=new Map),t.set(o,{callback:r,args:s}),1===t.size&&window.addEventListener("message",n),window.postMessage({id:o,message:"oj-setImmediate"},"*"),o},window.clearImmediate=r);function n(e){var n=e.data;if(n&&"oj-setImmediate"===n.message){var s=n.id,o=t.get(s);if(r(s),o){var i=o.callback,a=o.args;i.apply(window,a)}}}function r(e){t&&(t.delete(e),t.size<1&&(window.removeEventListener("message",n),t=null))}}(),function(){if("undefined"!=typeof window&&!window.__extends){var t,e=this&&this.__extends||(t=Object.setPrototypeOf,function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)});window.__extends=e}}(),"undefined"!=typeof window&&(window.Symbol?(window.Symbol.asyncIterator||(window.Symbol.asyncIterator="asyncIterator"),window.Symbol.iterator||(window.Symbol.iterator="iterator")):(window.Symbol={},window.Symbol.asyncIterator="asyncIterator",window.Symbol.iterator="iterator")),function(){if("undefined"!=typeof window&&0===new window.Set([0]).size){var t=window.Set;function e(e){var n=new t;return e&&e.forEach(n.add,n),n}e.prototype=t.prototype,e.prototype.constructor=e,window.Set=e}}();var p=r.__ojCheckpointManager;return o.CHECKPOINT_MANAGER={},o.CHECKPOINT_MANAGER.startCheckpoint=function(t,e){p&&p.startCheckpoint(t,e)},o.CHECKPOINT_MANAGER.endCheckpoint=function(t){p&&p.endCheckpoint(t)},o.CHECKPOINT_MANAGER.getRecord=function(t){return p?p.getRecord(t):void 0},o.CHECKPOINT_MANAGER.matchRecords=function(t){return p?p.matchRecords(t):[]},o.CHECKPOINT_MANAGER.dump=function(t){n.info(function(){for(var e="Checkpoint Records:",n=o.CHECKPOINT_MANAGER.matchRecords(t),r=0;r<n.length;r++){var s=n[r];e=e+"\n"+s.name;var i=s.description;null!=i&&(e=e+" ("+i+")"),e=(e+=":\n")+"start: "+s.start+"\tduration: "+s.duration}return e})},o});