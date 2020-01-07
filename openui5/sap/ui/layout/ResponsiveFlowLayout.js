/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/IntervalTrigger','sap/ui/core/theming/Parameters','./ResponsiveFlowLayoutData','./library'],function(q,C,I,P,R,l){"use strict";var a=C.extend("sap.ui.layout.ResponsiveFlowLayout",{metadata:{library:"sap.ui.layout",properties:{responsive:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}}});(function(){a.prototype.init=function(){this._rows=[];this._bIsRegistered=false;this._proxyComputeWidths=q.proxy(d,this);this.oRm=sap.ui.getCore().createRenderManager();this.oRm.writeStylesAndClasses=function(){this.writeStyles();this.writeClasses();};this.oRm.writeHeader=function(s,S,e){this.write('<div id="'+s+'"');if(S){for(var k in S){if(k==="width"&&S[k]==="100%"){this.addClass("sapUiRFLFullLength");}this.addStyle(k,S[k]);}}for(var i=0;i<e.length;i++){this.addClass(e[i]);}this.writeStylesAndClasses();this.write(">");};this._iRowCounter=0;};a.prototype.exit=function(){delete this._rows;if(this._IntervalCall){q.sap.clearDelayedCall(this._IntervalCall);this._IntervalCall=undefined;}if(this._resizeHandlerComputeWidthsID){sap.ui.core.ResizeHandler.deregister(this._resizeHandlerComputeWidthsID);}delete this._resizeHandlerComputeWidthsID;delete this._proxyComputeWidths;this.oRm.destroy();delete this.oRm;delete this._$DomRef;delete this._oDomRef;delete this._iRowCounter;};var u=function(t){var e=t.getContent();var r=[];var f=-1;var o={},L={};var s="";var h;var m=0,w=0,j=0;var B=false,M=false,k=false;for(var i=0;i<e.length;i++){m=R.MIN_WIDTH;w=R.WEIGHT;B=R.LINEBREAK;M=R.MARGIN;k=R.LINEBREAKABLE;h=_(e[i]);if(h instanceof R){B=h.getLinebreak();m=h.getMinWidth();w=h.getWeight();M=h.getMargin();k=h.getLinebreakable();}if(f<0||B){f++;r.push({height:-1,cont:[]});}j=r[f].cont.length;s=e[i].getId()+"-cont"+f+"_"+j;o={minWidth:m,weight:w,linebreakable:k,padding:M,control:e[i],id:s,breakWith:[]};var p=false;if(!k){for(var n=j;n>0;n--){L=r[f].cont[n-1];if(L.linebreakable){L.breakWith.push(o);p=true;break;}}}if(!p){r[f].cont.push(o);}}t._rows=r;};var g=function(o,$,t){var r=[];var e=10000000;var f=-1;var h=function(j){var k=q.sap.byId(o.cont[j].id);if(k.length>0){var m=k[0].offsetLeft;if(e>=m){r.push({cont:[]});f++;}e=m;r[f].cont.push(o.cont[j]);}};if(sap.ui.getCore().getConfiguration().getRTL()){for(var i=o.cont.length-1;i>=0;i--){h(i);}}else{for(var i=0;i<o.cont.length;i++){h(i);}}return r;};var b=function(o,w){var r=[];var e=-1;var f=0;var t=0;var i=0;var h=0,m=0;var j=0,k=0;for(j=0;j<o.cont.length;j++){f=0;t=0;for(k=i;k<=j;k++){t=t+o.cont[k].weight;}for(k=i;k<=j;k++){h=w/t*o.cont[k].weight;h=Math.floor(h);m=o.cont[k].minWidth;f+=Math.max(h,m);}if(e==-1||f>w){r.push({cont:[]});if(e!==-1){i=j;}e++;}r[e].cont.push(o.cont[j]);}return r;};var c=function(w,e){if(w.length!=e.length){return true;}for(var i=0;i<w.length;i++){if(w[i].cont.length!=e[i].cont.length){return true;}}return false;};a.prototype.renderContent=function(t,w){var r=t;var e=0;var W=[];var i=0,f=0,j=0,h=0;var k=0;var p=0;var o;var m=0,n=0;var B=[];var s=[];var v=this.getId();var H="";for(i=0;i<r.length;i++){p=0;W.length=0;e=100;s.length=0;s.push("sapUiRFLRow");if(r[i].cont.length<=1){s.push("sapUiRFLCompleteRow");}var x=v+"-row"+this._iRowCounter;var S={};this.oRm.writeHeader(x,S,s);k=0;for(f=0;f<r[i].cont.length;f++){k+=r[i].cont[f].weight;}for(j=0;j<r[i].cont.length;j++){o=r[i].cont[j];m=0;n=0;if(o.breakWith.length>0){m=o.weight;n=o.minWidth;for(var y=0;y<o.breakWith.length;y++){m+=o.breakWith[y].weight;n+=o.breakWith[y].minWidth;}}H=r[i].cont[j].id;s.length=0;S={"min-width":o.breakWith.length>0?n:o.minWidth};p=100/k*o.weight;var z=S["min-width"]/w*100;var A=Math.ceil(z);var D=Math.floor(p);if(D!==100&&A>D){p=A;}else{p=D;}p=e<p?e:p;e-=p;W.push(p);if(e>0&&j===(r[i].cont.length-1)){p+=e;}s.push("sapUiRFLContainer");S["width"]=p+"%";S["min-width"]=S["min-width"]+"px";this.oRm.writeHeader(H,S,s);s.length=0;s.push("sapUiRFLContainerContent");if(o.breakWith.length>0){s.push("sapUiRFLMultiContainerContent");}if(o.padding){s.push("sapUiRFLPaddingClass");}var E=this._addContentClass(o.control,j);if(E){s.push(E);}S={};this.oRm.writeHeader("",S,s);if(o.breakWith.length>0){H=r[i].cont[j].id+"-multi0";s.length=0;S={"min-width":n+"px"};var F=100/m*o.weight;F=Math.floor(F);B.push(F);s.push("sapUiRFLMultiContent");S["width"]=F+"%";if(r[i].cont[j].padding){s.push("sapUiRFLPaddingClass");}this.oRm.writeHeader(H,S,s);var G=F;this.oRm.renderControl(o.control);this.oRm.write("</div>");for(h=0;h<o.breakWith.length;h++){H=o.breakWith[h].id+'-multi'+(h+1);s.length=0;S={"min-width":o.breakWith[h].minWidth+"px"};F=100/m*o.breakWith[h].weight;F=Math.floor(F);B.push(F);G+=F;if(G<100&&h===(o.breakWith.length-1)){F+=100-G;}s.push("sapUiRFLMultiContent");S["width"]=F+"%";if(o.breakWith[h].padding){s.push("sapUiRFLPaddingClass");}this.oRm.writeHeader(H,S,s);this.oRm.renderControl(o.breakWith[h].control);this.oRm.write("</div>");}}else{this.oRm.renderControl(o.control);}this.oRm.write("</div>");this.oRm.write("</div>");}this.oRm.write("</div>");this._iRowCounter++;}};var d=function(e){this._iRowCounter=0;this._oDomRef=this.getDomRef();if(this._oDomRef){var s=this.getId();var f=q(this._oDomRef).width();var r=false;if(this._rows){for(var i=0;i<this._rows.length;i++){var $=this._$DomRef.find("#"+s+"-row"+i);var t=b(this._rows[i],f);var o=g(this._rows[i],$,this);r=c(o,t);var h=$.rect();var p=this._rows[i].oRect;if(h&&p){r=r||(h.width!==p.width)&&(h.height!==p.height);}r=r||(typeof(e)==="boolean"&&e);if(this._bLayoutDataChanged||r){if(sap.ui.Device.browser.internet_explorer){q(this._oDomRef).empty();}else{this._oDomRef.innerHTML="";}this._bLayoutDataChanged=false;this.renderContent(t,f);}}if(this._oDomRef.innerHTML===""){this.oRm.flush(this._oDomRef);for(var i=0;i<this._rows.length;i++){var T=q.sap.byId(s+"-row"+i).rect();this._rows[i].oRect=T;}}if(this._rows.length===0){if(this._resizeHandlerComputeWidthsID){sap.ui.core.ResizeHandler.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID;}}}}};a.prototype.onBeforeRendering=function(){u(this);if(this._resizeHandlerFullLengthID){sap.ui.core.ResizeHandler.deregister(this._resizeHandlerFullLengthID);delete this._resizeHandlerFullLengthID;}};a.prototype.onAfterRendering=function(e){this._oDomRef=this.getDomRef();this._$DomRef=q(this._oDomRef);this._proxyComputeWidths(true);if(this.getResponsive()){if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=sap.ui.core.ResizeHandler.register(this,this._proxyComputeWidths);}}else{if(this._resizeHandlerComputeWidthsID){sap.ui.core.ResizeHandler.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID;}}};a.prototype.onThemeChanged=function(e){if(e.type==="LayoutDataChange"){this._bLayoutDataChanged=true;}if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=sap.ui.core.ResizeHandler.register(this,this._proxyComputeWidths);}u(this);this._proxyComputeWidths();};a.prototype.onLayoutDataChange=a.prototype.onThemeChanged;var _=function(o){var L=o.getLayoutData();if(!L){return undefined;}else if(L instanceof R){return L;}else if(L.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var e=L.getMultipleLayoutData();for(var i=0;i<e.length;i++){var f=e[i];if(f instanceof R){return f;}}}};a.prototype.addContent=function(o){if(o&&this._IntervalCall){q.sap.clearDelayedCall(this._IntervalCall);this._IntervalCall=undefined;}this.addAggregation("content",o);};a.prototype.insertContent=function(o,i){if(o&&this._IntervalCall){q.sap.clearDelayedCall(this._IntervalCall);this._IntervalCall=undefined;}this.insertAggregation("content",o,i);};a.prototype.removeContent=function(o){if(o&&this._IntervalCall){q.sap.clearDelayedCall(this._IntervalCall);this._IntervalCall=undefined;}this.removeAggregation("content",o);};a.prototype._getAccessibleRole=function(){return null;};a.prototype._addContentClass=function(o,i){return null;};}());return a;},true);
