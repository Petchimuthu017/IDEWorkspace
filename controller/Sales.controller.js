sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast",
	"../model/formatter",
	"sap/ui/core/routing/History"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast, formatter, History) {
	"use strict";
	return Controller.extend("walkthrough.Sales.controller", {
		formatter: formatter,
		onInit: function () {
			this.getView().setBusy(true);
			var gData = new JSONModel({
				Order: "",
				Items: {},
				busy: false
			});
			this.getView().setModel(gData, "global");
			this.getOwnerComponent().getRouter().getRoute("sales").attachPatternMatched(this._onObjectMatched, this);
			this.getView().setBusy(false);
		},
		getFirstOrder: function(){
			var oModel4 = this.getView().getModel("invoice");
			var sPath = "/Orders";
			oModel4.read(sPath, {
				async: false,
				success: function(oData, Response){
					return oData.results[0].OrderID;
				}
			});
		},
		_onObjectMatched: function () {
			var oModel3 = this.getView().getModel("invoice");
			var sOrder = this.getFirstOrder();
			var sContextPath = "/Order_Details",
				that = this;
			oModel3.read(sContextPath, {
				filters: [
					new Filter({
						path: "OrderID",
						operator: FilterOperator.EQ,
						value1: sOrder
					})
				],
				async: false,
				success: function (oData, Response) {
					that.getView().getModel("global").setProperty("/Items", oData.results);
				}
			});
		},
		onItemPress: function (oEvent) {
			var sOrder = oEvent.getSource().getProperty("title");
			this.getView().getModel("global").setProperty("/busy",true);
			var oModel3 = this.getView().getModel("invoice"),
				sContextPath = "/Order_Details",
				that = this;
			oModel3.read(sContextPath, {
				filters: [
					new Filter({
						path: "OrderID",
						operator: FilterOperator.EQ,
						value1: sOrder
					})
				],
				async: false,
				success: function (oData, Response) {
					that.getView().getModel("global").setProperty("/Items", oData.results);
					that.getView().getModel("global").setProperty("/Order", sOrder);
				}
			});
			this.getView().getModel("global").setProperty("/busy",false);
			//var oList = this.byId("itemList");
			//var oBinding = oList.getBinding("items");
			//oBinding.refresh(true);
			MessageToast.show("Order " + sOrder + " selected");
			this.byId("salesview").toDetail(this.createId("detail"));
			/*	var iFilter = [];
				iFilter.push(new Filter("OrderID", FilterOperator.EQ, sOrder));
				var oList = this.byId("itemList");
				var oBinding = oList.getBinding("items");
				oBinding.filter(iFilter);*/
		},
		onNavBack: function(){
			var oPrevious = History.getInstance().getPreviousHash();
			this.getView().getModel("global").setProperty("/Items", {} );
			this.getView().getModel("global").setProperty("/Order", "");
			if(oPrevious !== undefined){
				window.history.go(-1);
			} else{
				this.getOwnerComponent().getRouter().navTo("home", {}, true);
			}
		},
		toMaster: function(){
			this.byId("salesview").toMaster(this.createId("master"));
		}
	});
});