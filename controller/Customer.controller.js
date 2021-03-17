sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/m/MessageToast",
	"sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
	], function(Controller, History, UIComponent, MessageToast, Fragment, JSONModel, Filter, FilterOperator){
	"use strict";
	return Controller.extend("walkthrough.controller.Customer",{
		onInit: function () {
			var gData = new JSONModel({ 
				items: {
					 0: {"Country": "A"},
					 1: {"Country": "B"},
					 2: {"Country": "C"},
					 3: {"Country": "D"},
					 4: {"Country": "E"},
					 5: {"Country": "F"},
					 6: {"Country": "G"},
					 7: {"Country": "H"},
					 8: {"Country": "I"}
				}
			});
			this.getView().setModel(gData, "cust");
		},
		onExit: function() {
			MessageToast.show("Exit");
		},
		onNavBack: function() {
			var oPreviousHash = History.getInstance().getPreviousHash();
			this.byId("custname").resetProperty("value");
			this.getView().getModel("cust").setData({modelData:{}});
			if( oPreviousHash !== undefined ){
				window.history.go(-1);
			}else{
				UIComponent.getRouterFor(this).navTo("home",{},true);
			}
		},
		onValueHelp: function() {
			if (!this._oValueHelpDialog) {
				Fragment.load({
					name: "walkthrough.view.CustomerValue",
					controller: this
				}).then(function(oValueHelpDialog){
					this._oValueHelpDialog = oValueHelpDialog;
					this.getView().addDependent(this._oValueHelpDialog);
					this._oValueHelpDialog.open();
				}.bind(this));
			} else {
				this._oValueHelpDialog.open();
			}
		},
		handleValueHelpClose : function (oEvent) {
			var oSelectedItem = oEvent.getParameter("selectedItem"),
				oInput = this.byId("custname");
			if (oSelectedItem) {
				this.byId("custname").setValue(oSelectedItem.getTitle());
				var oModel3 = this.getView().getModel("invoice");
				var sContextPath = "/Customers";
				var that = this;
				oModel3.read(sContextPath, {
					filters: [
						new Filter({
							path: "CustomerID",
							operator: FilterOperator.EQ,
							value1: this.byId("custname").getValue()
						})
					], 
					async: false,
					success: function (oData, Response) {
						var result = oData.results;
						var dataSet = result[0];
						//that.getView().getModel("cust").setProperty("/items", result);
						that.getView().getModel("cust").setProperty("/CustomerID", dataSet.CustomerID);
						that.getView().getModel("cust").setProperty("/CompanyName", dataSet.CompanyName);
						that.getView().getModel("cust").setProperty("/ContactName", dataSet.ContactName);
						that.getView().getModel("cust").setProperty("/Address", dataSet.Address);
						that.getView().getModel("cust").setProperty("/ContactTitle", dataSet.ContactTitle);
						that.getView().getModel("cust").setProperty("/City", dataSet.City);
						that.getView().getModel("cust").setProperty("/Region", dataSet.Region);
						that.getView().getModel("cust").setProperty("/PostalCode", dataSet.PostalCode);
						that.getView().getModel("cust").setProperty("/Country", dataSet.Country);
						that.getView().getModel("cust").setProperty("/Phone", dataSet.Phone);
						that.getView().getModel("cust").setProperty("/Fax", dataSet.Fax);
						
					}
				});
			}
			if (!oSelectedItem) {
				oInput.resetProperty("value");
				this.getView().getModel("cust").setData({modelData:{}});
				this.getView().getModel("cust").updateBindings("true");
			}
		}
	});
});