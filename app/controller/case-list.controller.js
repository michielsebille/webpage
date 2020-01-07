/*global sap, _, console*/
(function() {

	"use strict";

	sap.ui.controller("app.controller.case-list", {

		init: function() {
			console.log("INFO: case-list.controller -> onInit");

			this.applicationController = sap.ui.getCore().byId("application").getController();

			this.iCaseItemsLength = 0;

			/* Create caseItems model */
			this.oCaseItemsModel = new sap.ui.model.json.JSONModel()
				.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

			/* Bind caseItems model to view */
			this.getView().setModel(this.oCaseItemsModel);

			/* Create caseItemCategories model, for filter */
			this.oCaseItemCategoriesModel = new sap.ui.model.json.JSONModel()
				.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

			/* Create caseItemTechniques model, for filter */
			this.oCaseItemTechniquesModel = new sap.ui.model.json.JSONModel()
				.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);

			this.loadCaseItems();
			this.createFilterDialog();
		},

		loadCaseItems: function() {
			console.log("INFO: case-list.controller -> loadCaseItems");

			/* Attach request completed to caseItems model, to fill filter models */
			var self = this;
			this.oCaseItemsModel.attachRequestCompleted(function() {
				self.iCaseItemsLength = _.size(this.getData().caseItems);

				var aCategories = _.chain(this.getData())
					.map() // removes caseItems parent object
					.flatten()
					.pluck("categories")
					.flatten()
					.pluck("text")
					.unique()
					.sortBy()
					.map(function(text) {
						return {
							key: text,
							text: text
						};
					})
					.value();

				aCategories.unshift({
					key: "*",
					text: sap.ui.getCore().getModel("i18n").getResourceBundle().getText("ALL")
				});

				var aTechniques = _.chain(this.getData())
					.map() // removes caseItems parent object
					.flatten()
					.pluck("techniques")
					.flatten()
					.pluck("text")
					.unique()
					.sortBy()
					.map(function(text) {
						return {
							key: text,
							text: text
						};
					})
					.value();

				aTechniques.unshift({
					key: "*",
					text: sap.ui.getCore().getModel("i18n").getResourceBundle().getText("ALL")
				});

				self.oCaseItemCategoriesModel.setData(aCategories);
				self.oCaseItemTechniquesModel.setData(aTechniques);

				self.updateFilterInfo();
			});

			/* Load case items */
			this.oCaseItemsModel.loadData("resources/data/case-items.json");
		},

		createFilterDialog: function() {
			console.log("INFO: case-list.controller -> createFilterDialog");
			var self = this;

			var oSelectCategory = new sap.m.Select(this.getView().getId() + "-category")
				.setModel(this.oCaseItemCategoriesModel)
				.bindAggregation("items", {
					path: "/",
					factory: function() {
						return new sap.ui.core.Item({
							key: "{key}",
							text: "{text}"
						});
					}
				});

			var oSelectTechnique = new sap.m.Select(this.getView().getId() + "-technique")
				.setModel(this.oCaseItemTechniquesModel)
				.bindAggregation("items", {
					path: "/",
					factory: function() {
						return new sap.ui.core.Item({
							key: "{key}",
							text: "{text}"
						});
					}
				});

			this.oFilterDialog = new sap.m.Dialog(this.getView().getId() + "-filter-dialog", {
				title: "{i18n>FILTER}",
				stretchOnPhone: true,
				content: new sap.m.FlexBox({
					direction: sap.m.FlexDirection.Column,
					items: [
						new sap.m.FlexBox({
							direction: sap.m.FlexDirection.Row,
							justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
							alignItems: sap.m.FlexAlignItems.Center,
							width: "100%",
							fitContainer: true,
							items: [
								new sap.m.Label({
									text: "{i18n>CATEGORY}"
								}),
								oSelectCategory
							]
						}),
						new sap.m.FlexBox({
							direction: sap.m.FlexDirection.Row,
							justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
							alignItems: sap.m.FlexAlignItems.Center,
							width: "100%",
							fitContainer: true,
							items: [
								new sap.m.Label({
									text: "{i18n>TECHNIQUE}"
								}),
								oSelectTechnique
							]
						})
					]
				}),
				buttons: [
					new sap.m.Button({
						text: "{i18n>FILTER}",
						press: function() {
							self.setFilter();
							sap.ui.getCore().byId(self.getView().getId() + "-filter-dialog").close();
						}
					}),
					new sap.m.Button({
						text: "{i18n>CANCEL}",
						press: function() {
							sap.ui.getCore().byId(self.getView().getId() + "-filter-dialog").close();
						}
					})
				]
			});
		},

		showFilterDialog: function() {
			this.oFilterDialog.open();
		},

		setFilter: function() {
			var sCategoryKey = sap.ui.getCore().byId(this.getView().getId() + "-category").getSelectedKey();
			var sTechniqueKey = sap.ui.getCore().byId(this.getView().getId() + "-technique").getSelectedKey();
			var bFilterActive = false;

			var oTechniqueFilter = new sap.ui.model.Filter("techniques", function(oValue) {
				if (sTechniqueKey === "*") {
					return true;
				} else {
					bFilterActive = true;
					var techniques = _.pluck(oValue, "text");
					return _.contains(techniques, sTechniqueKey);
				}
			});

			var oCategoryFilter = new sap.ui.model.Filter("categories", function(oValue) {
				if (sCategoryKey === "*") {
					return true;
				} else {
					bFilterActive = true;
					var categories = _.pluck(oValue, "text");
					return _.contains(categories, sCategoryKey);
				}
			});

			sap.ui.getCore().byId("case-list-tilecontainer").getBinding("tiles").filter([
				oTechniqueFilter,
				oCategoryFilter
			]);

			this.updateFilterInfo();

			if (bFilterActive) {
				sap.ui.getCore().byId("case-list-filter-erase-button").setVisible(true);
			} else {
				sap.ui.getCore().byId("case-list-filter-erase-button").setVisible(false);
			}
		},

		updateFilterInfo: function() {
			var iFilteredCaseItemsLength = sap.ui.getCore().byId("case-list-tilecontainer").getBinding("tiles").getLength();
			var sText = sap.ui.getCore().getModel("i18n").getResourceBundle().getText("FILTER_INFO", [iFilteredCaseItemsLength, this.iCaseItemsLength]);

			sap.ui.getCore().byId("case-list-filter-info").setText(sText);
		},

		eraseFilter: function() {
			sap.ui.getCore().byId(this.getView().getId() + "-category").setSelectedKey("*");
			sap.ui.getCore().byId(this.getView().getId() + "-technique").setSelectedKey("*");

			this.setFilter();
		}
	});
}());