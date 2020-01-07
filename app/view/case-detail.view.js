/*global sap, console*/
(function() {
	"use strict";

	sap.ui.jsview("app.view.case-detail", {
		getControllerName: function() {
			return "app.controller.case-detail";
		},

		createContent: function(oController) {
			console.log("INFO: case-detail.view -> createContent");

			oController.init();

			return new sap.m.Page("case-detail-page", {
				customHeader: oController.applicationController.getBar(true),
				subHeader: this.getSubHeader(),
				content: this.getPageContent(),
			}).addStyleClass("page-background");
		},

		getSubHeader: function() {
			return new sap.m.Bar({
				contentMiddle: [
					new sap.m.Title({
						text: {
							path: "/client",
							formatter: function(sValue) {
								return sValue + ":";
							}
						}
					}).addStyleClass("application-subheader-title"),
					new sap.m.Title({
						text: "{/name}"
					}).addStyleClass("application-subheader-title")
				]
			}).addStyleClass("application-subheader");
		},

		getPageContent: function() {
			var sDirection = jQuery.device.is.phone ? sap.m.FlexDirection.Column : sap.m.FlexDirection.Row;

			return new sap.m.FlexBox("case-detail-content", {
				direction: sap.m.FlexDirection.Column,
				items: [
					new sap.m.FlexBox({
						direction: sDirection,
						items: [
							this.getContentBlock("{i18n>COSTOMUR}", "/customer"),
							this.getContentBlock("{i18n>BUSINESS_CASE}", "/businessCase", "content-block-green")
						]
					}),
					this.getContentImages(),
					new sap.m.FlexBox({
						direction: sDirection,
						items: [
							this.getContentBlock("{i18n>SOLUTION}", "/solution", "content-block-green"),
							this.getContentBlock("{i18n>DELIVERED}", "/delivered")
						]
					})
				]
			});
		},

		getContentBlock: function(sTitle, sValuePath, sStyleClass) {
			var sClass = jQuery.device.is.phone ? "content-block-100" : "content-block-50";

			var oBlock = new sap.m.FlexBox({
				direction: sap.m.FlexDirection.Column,
				items: [
					new sap.m.Title({
						text: sTitle
					}).addStyleClass("content-block-title"),
					new sap.m.Text({
						text: {
							path: sValuePath,
							formatter: function(sValue) {
								if (!sValue) {
									sValue = sap.ui.getCore().getModel("i18n").getResourceBundle().getText("NO_CONTENT");
								}

								return sValue;
							}
						}
					}).addStyleClass("first-flex-item")
				]
			}).addStyleClass("content-block").addStyleClass(sClass);

			if (sStyleClass) {
				oBlock.addStyleClass(sStyleClass);
			}

			return oBlock;
		},

		getContentImages: function() {
			var self = this;

			var oTileContainer = new sap.m.TileContainer("case-detail-tile-container", {
				height: "11rem"
			}).bindAggregation("tiles", {
				path: "/attachments",
				factory: function(sId, oContext) {
					return new sap.m.CustomTile({
						content: [
							new sap.m.Image({
								src: "{source}",
								densityAware: false
							}).addStyleClass("case-detail-image")
						],
						press: function() {
							self.getController().oDialogCarousel.setActivePage(oContext.getProperty("attachmentId"));
							self.getController().oDialog.open();
						}
					}).addStyleClass("case-detail-tile");
				}
			});

			return new sap.m.FlexBox({
				items: oTileContainer
			}).addStyleClass("content-block");
		}
	});
}());