/*global sap, console*/
(function() {
	"use strict";

	sap.ui.jsview("app.view.case-list", {
		getControllerName: function() {
			return "app.controller.case-list";
		},

		createContent: function(oController) {
			console.log("INFO: case-list.view -> createContent");

			oController.init();

			var oTileContainerDetail = new sap.m.TileContainer("case-list-tilecontainer").bindAggregation("tiles", {
				path: "/caseItems",
				factory: function() {
					return new sap.m.StandardTile({
						title: "{name}",
						icon: "{image}",
						iconDensityAware: false,
						info: "{client}",
						press: function(e) {
							var sPath = e.getSource().getBindingContext().getPath();
							var oData = e.getSource().getBindingContext().getModel().getProperty(sPath);

							oController.applicationController.navigateToDetail("case-detail-view", {
								oData: oData
							});
						}
					});
				}
			}).addStyleClass("zSapMTCScrl");

			return new sap.m.Page("case-list-page", {
				customHeader: oController.applicationController.getBar(),
				subHeader: this.getSubHeader(),
				footer: this.getFooter(),
				content: oTileContainerDetail,
			}).addStyleClass("page-background");
		},

		getFooter: function() {
			var self = this;

			return new sap.m.Bar({
				contentMiddle: new sap.m.Text("case-list-filter-info", {
					text: "{i18n>FILTER_INFO}"
				}),
				contentRight: new sap.m.Button("case-list-filter-erase-button", {
					text: "{i18n>ERASE_FILTER}",
					visible: false,
					press: function() {
						self.getController().eraseFilter();
					}
				})
			});
		},

		getSubHeader: function() {
			var self = this;

			return new sap.m.Bar({
				contentMiddle: new sap.m.Title({
					text: "{i18n>PROJECTS}"
				}).addStyleClass("application-subheader-title"),
				contentRight: new sap.m.Button("case-list-filter-button", {
					icon: "sap-icon://filter",
					press: function() {
						self.getController().showFilterDialog();
					}
				})
			}).addStyleClass("application-subheader");
		}
	});
}());