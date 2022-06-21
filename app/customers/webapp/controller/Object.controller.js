sap.ui.define([
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"../model/formatter",
	"sap/m/MessageToast",
	"sap/base/util/uid"

], function (BaseController, JSONModel, History, formatter, MessageToast, uid) {
	"use strict";

	return BaseController.extend("ns.customers.controller.Object", {

		formatter: formatter,

		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */

		/**
		 * Called when the worklist controller is instantiated.
		 * @public
		 */
		onInit : function () {
			// Model used to manipulate control states. The chosen values make sure,
			// detail page shows busy indication immediately so there is no break in
			// between the busy indication for loading the view's meta data
			var oViewModel = new JSONModel({
					busy : true,
					delay : 0,
					mode: "view",
					new: false,
					customer: {
						"ShortName": "",
						"Name": "",
						"RegistrationNumber": "",
						"RegistrationCountry": "",
						"TaxID": "",
						"RegistrationState": ""
					}
				});
			this.getRouter().getRoute("object").attachPatternMatched(this._onObjectMatched, this);
			this.getRouter().getRoute("new").attachPatternMatched(this._onObjectMatched, this);
			this.setModel(oViewModel, "objectView");

			var aStages = [
				{"stage": "PR Creating a purchase requisition", "plan": "31.01.2022", "forecast": "31.01.2022", "fact":"31.01.2022"},
				{"stage": "ITB Approval of the invitation to bid package", "plan": "28.02.2022", "forecast": "28.02.2022", "fact":"28.02.2022"},
				{"stage": "RFQ Sending an invitation to participate", "plan": "04.03.2022", "forecast": "04.03.2022", "fact":"04.03.2022"},
				{"stage": "RFQ Submission of proposals", "plan": "24.03.2022", "forecast": "24.03.2022", "fact":"24.03.2022"},
				{"stage": "TBE Technical evaluation approval", "plan": "24.04.2022", "forecast": "24.04.2022", "fact":"24.04.2022"},
				{"stage": "CBE Commercial appraisal approval", "plan": "25.04.2022", "forecast": "25.04.2022", "fact":"25.04.2022"},
				{"stage": "RTAI Send to committee", "plan": "28.04.2022", "forecast": "29.04.2022", "fact":"29.04.2022"},
				{"stage": "RTA Committee", "plan": "12.05.2022", "forecast": "12.05.2022", "fact":"12.05.2022"}
			];

			var aStagesContract = [
				{"stage": "Launch of SAP approval", "plan": "", "forecast": "", "fact":"waiting"},
				{"stage": "SAP contract approval", "plan": "", "forecast": "", "fact":"waiting"},
				{"stage": "Obtaining corporate approval", "plan": "-", "forecast": "-", "fact":"not required"},
				{"stage": "CDS contract signing", "plan": "waiting", "forecast": "waiting", "fact":"waiting"}
			]

			oViewModel.setProperty('/WorkFlow', aStages);
			oViewModel.setProperty('/WorkFlowContract', aStagesContract);
			// this.setModel(oViewModel, "state");
		},
		/* =========================================================== */
		/* event handlers                                              */
		/* =========================================================== */


		/**
		 * Event handler  for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the worklist route.
		 * @public
		 */
		onNavBack : function() {
			var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				// eslint-disable-next-line sap-no-history-manipulation
				history.go(-1);
			} else {
				this.getRouter().navTo("worklist", {}, true);
			}
		},

		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched : function (oEvent) {
			var sObjectId =  oEvent.getParameter("arguments").objectId;
			if (!!sObjectId){
				this._bindView("/LegalInformation" + sObjectId);
			} else {
				var oViewModel = this.getModel("objectView");
				oViewModel.setProperty("/busy", false);
				oViewModel.setProperty("/new", true);
				oViewModel.setProperty("/mode", "edit");

				var oEntry = {
					LegalInformation:{
						"Name": "Name",
						"ShortName": "ShortName"
					},
				};

				var sPath = this.getModel().createEntry("/Customer", {
					properties: oEntry,
					refreshAfterChange: true
				}).getPath();

				this.getView().bindElement({path: sPath});

			}
		},

		/**
		 * Binds the view to the object path.
		 * @function
		 * @param {string} sObjectPath path to the object to be bound
		 * @private
		 */
		_bindView : function (sObjectPath) {
			var oViewModel = this.getModel("objectView");

			this.getView().bindElement({
				path: sObjectPath,
				events: {
					change: this._onBindingChange.bind(this),
					dataRequested: function () {
						oViewModel.setProperty("/busy", true);
					},
					dataReceived: function () {
						oViewModel.setProperty("/busy", false);
					}
				}
			});
		},

		_onBindingChange : function () {
			var oView = this.getView(),
				oViewModel = this.getModel("objectView"),
				oElementBinding = oView.getElementBinding(),
				oModel = this.getModel();

			// No data for the binding
			if (!oElementBinding.getBoundContext()) {
				this.getRouter().getTargets().display("objectNotFound");
				return;
			}

			var oResourceBundle = this.getResourceBundle(),
					sPath = oView.getBindingContext().getPath();

			// oView.getBindingContext().requestObject().then((function (oObject) {
			// 	var sObjectId = oObject.ID,
			// 		sObjectName = oObject.ID;
			//
			//
			// 	oViewModel.setProperty("/busy", false);
			// 	// oViewModel.setProperty("/shareSendEmailSubject",
			// 	// oResourceBundle.getText("shareSendEmailObjectSubject", [sObjectId]));
			// 	// oViewModel.setProperty("/shareSendEmailMessage",
			// 		// oResourceBundle.getText("shareSendEmailObjectMessage", [sObjectName, sObjectId, location.href]));
			// }).bind(this));

			oModel.read(sPath, {
				success: function(oData){
						var oViewModel = this.getModel("objectView");

						oViewModel.setProperty("/busy", false);
					}.bind(this)
				})
		},

		onEditPressHandler: function() {
			var oStateModel = this.getModel("objectView");
			oStateModel.setProperty("/mode", "edit");
		},

		handleSaveActiveVersionHandler: function() {
			var oStateModel = this.getModel("objectView"),
					oViewModel = this.getModel("objectView"),
					oNewItem = oViewModel.getProperty("/customer");

			if (oViewModel.getProperty("/new")) {
				oStateModel.setProperty("/mode", "view");
				oStateModel.setProperty("/new", false);
				this.getRouter().navTo("worklist", {}, true);


				this.getModel().create("/LegalInformation", oNewItem, {
					success: function(oData, response) {
						var oCustomer = {
							"ShortName": "",
							"Name": "",
							"RegistrationNumber": "",
							"RegistrationCountry": "",
							"TaxID": "",
							"RegistrationState": ""
						};

						var oViewModel = this.getModel("objectView");

						oViewModel.setProperty("/customer", oCustomer);
						//sap.ui.core.BusyIndicator.hide();
						// if (mSettings.success) {
						// 	mSettings.success.call(this, oData, response);
						// }
					}.bind(this),
					error: function(oError) {
						//sap.ui.core.BusyIndicator.hide();
						// if (mSettings.error) {
						// 	mSettings.error.call(this, oError);
						// }
						debugger;
					}.bind(this),
				})
				// MessageToast.show('Create new customer successful');
			} else {
				oStateModel.setProperty("/mode", "view");
			}
		}

	});

});
