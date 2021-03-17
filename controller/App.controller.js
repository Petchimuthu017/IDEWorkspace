sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/core/routing/History"
], function (Controller, MessageToast,History) {
   "use strict";
	return Controller.extend("walkthrough.controller.App", {
		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
    	onShowBye : function () {
      	// read msg from i18n model
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
         var sRecipient = this.getView().getModel("a").getProperty("/recipient/name");
         var sYear = this.getView().getModel("b").getProperty("/recipient/year/2");
         var sMsg = oBundle.getText("ByeMsg", [sRecipient,sYear]);
         // show message
         MessageToast.show(sMsg);
    	},
    	onOpenDialog : function () {
      		this.getView().getModel("a").setProperty("/recipient/name", "Muthu");
			this.getOwnerComponent().openHelloDialog();
		},
		onNavBack: function(){
			var oPrevious = History.getInstance().getPreviousHash();
			if(oPrevious !== undefined){
				window.history.go(-1);
			} else{
				this.getOwnerComponent().getRouter().navTo("home", {}, true);
			}
		}
 
   });
});