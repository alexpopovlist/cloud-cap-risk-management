sap.ui.define([
	"./BaseController",
	"../model/stateModel",
	"../Constants"

], function (BaseController, StateModel, Constants) {
	"use strict";

	return BaseController.extend("ns.deals.controller.App", {

		onInit : function () {
			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());

			this.setModel(StateModel.createJSONModel(this), "state");
			if (Constants.MAIN_FEATURE === true){
				// TODO do logic main. Configuration in Constants.js file
			}
		}
	});

});
