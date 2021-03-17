sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/m/MessageToast",
   "sap/ui/core/Fragment"
], function (Controller, MessageToast,Fragment) {
   "use strict";
   return Controller.extend("walkthrough.controller.HelloPanel", {
      onShowHello : function () {
         // read msg from i18n model
         var oBundle = this.getView().getModel("i18n").getResourceBundle();
         var sRecipient = this.getView().getModel("a").getProperty("/recipient/name");
         var sMsg = oBundle.getText("helloMsg", [sRecipient]);
         // show message
         MessageToast.show(sMsg);
	    },
		onOpenDialog : function () {
			this.getView().getModel("a").setProperty("/recipient/name", "World");
			this.getOwnerComponent().openHelloDialog();
		}
   });
});