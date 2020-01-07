/*global sap, console*/
(function() {
	"use strict";

	sap.ui.controller("app.controller.application", {

		init: function() {
			console.log("INFO: application.controller -> init");

			this.loadI18n();
		},

		loadI18n: function() {
			console.log("INFO: application.controller -> loadI18n");

			var i18nApplicationBundle = new sap.ui.model.resource.ResourceModel({
				bundleUrl: "app/i18n/i18n.properties"
			});

			sap.ui.getCore().setModel(i18nApplicationBundle, "i18n");
		},

		getBar: function(bDisplayNavBack) {
			console.log("INFO: application.controller -> getBar");

			var oBar = new sap.m.Bar({
				contentMiddle: [
					new sap.m.Image({
						src: "resources/images/oliver-logo-clean.png",
						densityAware: false,
						height: "20px"
					})
				],
			}).addStyleClass("application-bar");

			if (bDisplayNavBack) {
				oBar.addContentLeft(new sap.m.Button({
					icon: "sap-icon://nav-back",
					press: function() {
						var activeDetailPageId = sap.ui.getCore().byId("application-split-app").getCurrentDetailPage().getId();
						var oView = sap.ui.getCore().byId(activeDetailPageId);

						if (typeof(oView.getController().onBeforeNavigateBack) === "function") {
							oView.getController().onBeforeNavigateBack()
								.then(function() {
									sap.ui.getCore().byId("application-split-app").backDetail();
								});
						} else {
							sap.ui.getCore().byId("application-split-app").backDetail();
						}

						if (typeof(oView.getController().onAfterNavigateBack) === "function") {
							oView.getController().onAfterNavigateBack();
						}
					}
				}).addStyleClass("application-bar-button-back"));
			}

			return oBar;
		},

		navigateToDetail: function(sViewId, mOptions) {
			console.log("INFO: application.controller -> navigateToDetail", sViewId);

			var oView = sap.ui.getCore().byId(sViewId);

			if (typeof(oView.getController().onBeforeNavigate) === "function") {
				oView.getController().onBeforeNavigate(mOptions)
					.then(function() {
						sap.ui.getCore().byId("application-split-app").toDetail(sViewId);
					})
					.catch(function() {
						// TODO ERROR
					});
			} else {
				sap.ui.getCore().byId("application-split-app").toDetail(sViewId);
			}
		}

	});
}());