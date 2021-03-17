sap.ui.define([
   "sap/ui/core/UIComponent",
   "sap/ui/model/json/JSONModel",
   "sap/ui/model/resource/ResourceModel",
   "./controller/HelloDialog",
   "sap/ui/Device"
], function (UIComponent, JSONModel, ResourceModel, HelloDialog, Device) {
   "use strict";
   return UIComponent.extend("walkthrough.Component", {
	  metadata : {
            manifest: "json"
      },
      init : function () {
         // call the init function of the parent
         UIComponent.prototype.init.apply(this, arguments);
         // set data model
         var oData = {
            recipient : {
               name : "World",
               year : { 
               	1: "2020",
               	2: "2021"
               }
            }
         };
         var oModel = new JSONModel(oData);
         this.setModel(oModel, "a");
         // set data model
         var oData1 = {
            recipient : {
               name : "World",
               year : { 
               	1: "2019",
               	2: "2020"
               }
            }
         };
         var oModel1 = new JSONModel(oData1);
         this.setModel(oModel1, "b");
         // set i18n model
         var i18nModel = new ResourceModel({
            bundleName : "walkthrough.i18n.i18n"
         });
            this.setModel(i18nModel, "i18n");
        // set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
        // set dialog
			this._helloDialog = new HelloDialog(this.getRootControl());
		// create the views based on the url/hash
			this.getRouter().initialize();
	},
	getContentDensityClass : function () {
		if (!this._sContentDensityClass) {
			if (!Device.support.touch) {
				this._sContentDensityClass = "sapUiSizeCompact";
			} else {
				this._sContentDensityClass = "sapUiSizeCozy";
			}
		}
		return this._sContentDensityClass;
	},


	exit : function() {
		this._helloDialog.destroy();
		delete this._helloDialog;
	},

	openHelloDialog : function () {
		this._helloDialog.open();
   }
   });
});
