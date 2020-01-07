/*global sap, jQuery, console*/
(function() {
	"use strict";

	sap.ui.jsview("app.view.application", {

		getControllerName: function() {
			return "app.controller.application";
		},

		createContent: function(oController) {
			console.log("INFO: application.view -> createContent");

			jQuery.sap._vIsPortrait = jQuery.device.is.portrait;

			oController.init();

			var oShell = new sap.m.Shell("application-shell", {
				enableScrolling: false,
				showLogout: false,
				appWidthLimited: false
			});

			var oSplitApp = new sap.m.SplitApp("application-split-app", {
				initialDetail: "case-list-view",
				mode: sap.m.SplitAppMode.StrechCompressMode,
				width: "100%"
			});

			oSplitApp.addDetailPage(sap.ui.view({
				id: "case-list-view",
				viewName: "app.view.case-list",
				type: sap.ui.core.mvc.ViewType.JS
			}));

			oSplitApp.addDetailPage(sap.ui.view({
				id: "case-detail-view",
				viewName: "app.view.case-detail",
				type: sap.ui.core.mvc.ViewType.JS
			}));

			window.oSplitApp = oSplitApp;
			window.oShell = oShell;

			oShell.setApp(oSplitApp);

			jQuery.sap._oApp = oSplitApp;

			return oShell;
		}

	});
}());