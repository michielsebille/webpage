/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ListItemBaseRenderer','sap/ui/core/Renderer'],function(q,L,R){"use strict";var F=R.extend(L);F.renderLIAttributes=function(r,f){r.addClass("sapMFeedListItemTitleDiv");if(f._showSeparators===sap.m.ListSeparators.None){r.addClass("sapMFeedListShowSeparatorsNone");}else{r.addClass("sapMFeedListShowSeparatorsAll");}};F.renderLIContent=function(r,f){var m=f.getId(),i=sap.ui.Device.system.phone;r.write('<div');r.addClass('sapMFeedListItem');r.writeClasses();r.write('>');if(!!f.getShowIcon()){this._writeImageControl(r,f,m);}if(i){r.write('<div class= "sapMFeedListItemHeader ');if(!!f.getShowIcon()){r.write('sapMFeedListItemHasFigure ');}if(!!f.getSender()&&!!f.getTimestamp()){r.write('sapMFeedListItemFullHeight');}r.write('" >');if(!!f.getSender()){r.write('<p id="'+m+'-name" class="sapMFeedListItemTextName">');r.renderControl(f._getLinkSender(false));r.write('</p>');}if(!!f.getTimestamp()){r.write('<p class="sapMFeedListItemTimestamp">');r.writeEscaped(f.getTimestamp());r.write('</p>');}r.write('</div>');r.write('<p class="sapMFeedListItemText">');r.write('<span id="'+m+'-realtext" class="sapMFeedListItemText">');if(!!f._checkTextIsExpandable()){this._writeCollapsedText(r,f,m);}else{r.writeEscaped(f.getText(),true);r.write('</span>');}r.write('</p>');if(!!f.getInfo()){r.write('<p class="sapMFeedListItemFooter">');if(!!f.getInfo()){r.write('<span id="'+m+'-info" class="sapMFeedListItemInfo">');r.writeEscaped(f.getInfo());r.write('</span>');}r.write('</p>');}}else{r.write('<div class= "sapMFeedListItemText ');if(!!f.getShowIcon()){r.write('sapMFeedListItemHasFigure ');}r.write('" >');r.write('<p id="'+m+'-text" class="sapMFeedListItemTextText" >');if(!!f.getSender()){r.write('<span id="'+m+'-name" class="sapMFeedListItemTextName">');r.renderControl(f._getLinkSender(true));r.write(' ');r.write('</span>');}r.write('<span id="'+m+'-realtext" class="sapMFeedListItemTextString">');if(!!f._checkTextIsExpandable()){this._writeCollapsedText(r,f,m);}else{r.writeEscaped(f.getText(),true);r.write('</span>');}r.write('</p>');if(!!f.getInfo()||!!f.getTimestamp()){r.write('<p class="sapMFeedListItemFooter">');if(!sap.ui.getCore().getConfiguration().getRTL()){if(!!f.getInfo()){this._writeInfo(r,f,m);if(!!f.getTimestamp()){r.write("<span>&#160&#160&#x00B7&#160&#160</span>");}}if(!!f.getTimestamp()){this._writeTimestamp(r,f,m);}}else{if(!!f.getTimestamp()){this._writeTimestamp(r,f,m);}if(!!f.getInfo()){if(!!f.getTimestamp()){r.write("<span>&#160&#160&#x00B7&#160&#160</span>");}this._writeInfo(r,f,m);}}r.write('</p>');}r.write('</div>');}r.write('</div>');};F._writeImageControl=function(r,f,m){r.write('<figure id="'+m+'-figure"');r.addClass('sapMFeedListItemFigure');if(!f.getIcon()){r.addClass('sapMFeedListItemIsDefaultIcon');}r.writeClasses();r.write('>');r.renderControl(f._getImageControl());r.write('</figure>');};F._writeCollapsedText=function(r,f,m){if(f._bTextExpanded){r.writeEscaped(f._sFullText,true);r.write('</span>');r.write('<span id="'+m+'-threeDots" class ="sapMFeedListItemTextString">');r.write("&#32");r.write('</span>');}else{r.writeEscaped(f._getCollapsedText(),true);r.write('</span>');r.write('<span id="'+m+'-threeDots" class ="sapMFeedListItemTextString">');r.write("&#32&#46&#46&#46&#32");r.write('</span>');}var l=f._getLinkExpandCollapse();l.addStyleClass("sapMFeedListItemLinkExpandCollapse");r.renderControl(l);};F._writeTimestamp=function(r,f,m){r.write('<span id="'+m+'-timestamp">');r.writeEscaped(f.getTimestamp());r.write('</span>');};F._writeInfo=function(r,f,m){r.write('<span id="'+m+'-info">');r.writeEscaped(f.getInfo());r.write('</span>');};return F;},true);
