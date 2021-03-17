sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/ODataModel",
	 "sap/m/MessageToast",
	"jquery.sap.global",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	], function(Controller,JSONModel,ODataModel,MessageToast, jQuery,Filter, FilterOperator) {
		"use strict";
		return Controller.extend("walkthrough.controller.Home" , {
			onInit: function() {
				var count1 = {
					invcount : "0",
					ordcount : "0",
					custcount: "0"
				};
			var oModel2 = new JSONModel(count1);
        	this.getView().setModel(oModel2, "count");
			this.getOwnerComponent().getRouter().getRoute("home").attachPatternMatched(this._onfillCount, this);
			},
			_onfillCount: function() {
			var oModel = this.getView().getModel("invoice"),
			// sContextPath = "/Invoices/$count?$filter=ShipCity eq 'Berlin'",
			sContextPath = "/Invoices/$count",
			that = this;
			oModel.read(sContextPath, {
/*				filters:[
					new Filter({
						path: "ShipCity",
						operator: FilterOperator.EQ,
						value1: "Berlin"
					})
				], */
				async: false,
				success: function(oData, Response) {
					that.getView().getModel("count").setProperty( "/invcount", Response.body);
				}
			});
			sContextPath = "/Orders/$count";
			that = this;
			oModel.read(sContextPath, {
				async: false,
				success: function(oData, Response){
					that.getView().getModel("count").setProperty( "/ordcount", Response.body);
				}
			});
			sContextPath = "/Customers/$count";
			that = this;
			oModel.read(sContextPath, {
				async: false,
				success: function(oData, Response){
					that.getView().getModel("count").setProperty( "/custcount", Response.body);
				}
			});
			},
			onTilePress: function(){
				var sMsg = "Tile Pressed";
				MessageToast.show(sMsg);
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview");
			},
			onTileOrder: function(){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("sales");
			},
			onTileCustomer: function(){
				this.getOwnerComponent().getRouter().navTo("customer");
			},
			onOpenDialog : function () {
      		this.getView().getModel("a").setProperty("/recipient/name", "Muthu");
			this.getOwnerComponent().openHelloDialog();
			}
		});
	});