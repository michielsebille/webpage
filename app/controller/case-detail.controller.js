/*global sap, Q, console*/
(function() {
	"use strict";

	sap.ui.controller("app.controller.case-detail", {

		init: function() {
			console.log("INFO: case-detail.controller -> init");

			this.applicationController = sap.ui.getCore().byId("application").getController();

			this.oCaseItemModel = new sap.ui.model.json.JSONModel()
				.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

			this.createDialog();

			this.getView().setModel(this.oCaseItemModel);
			this.oDialogCarousel.setModel(this.oCaseItemModel);
		},

		onBeforeNavigate: function(mOptions) {
			console.log("INFO: case-detail.controller -> onBeforeNavigate", mOptions);
			mOptions = mOptions || {};

			this.oCaseItemModel.setData(mOptions.oData);
			this.oCaseItemModel.updateBindings();

			return new Q();
		},

		onAfterNavigateBack: function() {
			console.log("INFO: case-detail.controller -> onAfterNavigateBack");

			new Q.delay(500).then(function() {
				sap.ui.getCore().byId("case-detail-tile-container").scrollIntoView(0);
			});
		},

		createDialog: function() {
			var self = this;

			this.oDialogCarousel = new sap.m.Carousel("case-detail-carousel").bindAggregation("pages", {
				path: "/attachments",
				factory: function(sId, oContext) {
					return new sap.m.Page(oContext.getProperty("attachmentId"), {
						showHeader: false,
						enableScrolling: false,
						content: new sap.m.Image({
							src: "{source}",
							densityAware: false
						}).addStyleClass("case-detail-image")
					});
				}
			});

			this.oDialog = new sap.m.Dialog({
				title: "{i18n>IMAGES}",
				content: this.oDialogCarousel,
				contentWidth: "80%",
				contentHeight: "80%",
				endButton: new sap.m.Button({
					text: "{i18n>CLOSE}",
					press: function() {
						self.oDialog.close();
					}
				})
			});
		}
	});
}());