sap.ui.define([
	"sap/ui/model/json/JSONModel"
], function(JSONModel) {
	"use strict";

	return {
		createJSONModel: function(oContext) {
			const oModel = new JSONModel({
				app: {
					delay: 10
				}
			});
			oModel.setDefaultBindingMode("TwoWay");
			return oModel;
		}
	};
})
