sap.ui.define([
	"ns/customers/controller/BaseController"
], function(BaseController) {
	"use strict";

	/**
	 * @class
	 * @extends sap.ui.core.mvc.BaseController
	 *
	 * @constructor
	 * @public
	 * @alias zgagarin.zsupplyproc.controller.tabs.General
	 */
	const thisController = BaseController.extend("ns.customers.controller.tabs.Overview",
		/** @lends zgagarin.zsupplyproc.controller.tabs.General.prototype */
		{
			// Common: Common,

			// _textAreaDialog: null,

			/**
			 * Инициализирует вкладку Основная Информация.
			 */
			onInit: function() {
				// if (this.getStateProperty("/_GET").Tab === "General") {
					// this.do(this.processLoad.bind(this), [true]);
				// }
			},

			/**
			 * Загружает данные для вкладки Основная Информация.
			 * @param {boolean} [bTabReload] Если true, то обновляет/задает биндинг таблицы участников рабочей группы.
			 * Если первый заход на вкладку и значение bTabReload равно true, то происходит принудительное обновление аггрегаций всех элементов со справочниками.
			 * !bTabReload передается в makeElementBinding.
			 */
			processLoad: function(bTabReload) {
				var oPercentInput = this.byId("idPossibilityToIncreaseLimitPercent");
				if (!!oPercentInput) {
					oPercentInput.addEventDelegate({
						onsapfocusleave: this.onPossibilityToIncreaseLimitPercentFocusLeaveHandler.bind(this)
					});
				}
				var bIsReloaded = this.getStateProperty("/prevTabId") === this.getPageController().getSelectedTabView().getId();
				if (!!this.getStateProperty("/app/currentView")) {

					if (this.getStateProperty("/app/action") !== "PL") {
						const sPaymentTermsTableId = (this.getStateProperty("/app/action") === "RS") ? "smartPaymentConditionsTableRS" : "smartPaymentConditionsTable";
						const sPaymentTermsTableBindingPath = (this.getStateProperty("/app/action") === "RS") ? "to_LimitPaymentTerm" : "to_PaymentTerm";
						if (!bIsReloaded) {
							this.executeRefreshSmartTable(sPaymentTermsTableId, sPaymentTermsTableBindingPath);
						}

						if (bTabReload && !bIsReloaded) {
							this.executeRefreshSmartTable("st_Workgroup", "to_Workgrp");
						}
					}

					this.getPageController().rebindAggregation("tokens", {
						path: this.createCurrentKey("/") + "/to_RelB2BNum",
						template: this.getTemplateForEInput("{b2b_number}", "{b2brel_guid}")
					}, this.byId("linkedProcedureETP"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("items", {
						path: this.createCurrentKey("/") + "/to_RelB2BNum",
						template: this.getTemplateForEMultiJoin("{b2b_number}")
					}, this.byId("linkedProcedureETPView"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("tokens", {
						path: this.createCurrentKey("/") + "/to_PfssRfx",
						template: this.getTemplateForEInput("{to_Pfss_Rfx_t/pfss_rfx_Text}", "{pfss_rfx}"),
						parameters: {
							expand: "to_Pfss_Rfx_t"
						},
					}, this.byId("idPfssRfx"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("items", {
						path: this.createCurrentKey("/") + "/to_PfssRfx",
						template: this.getTemplateForEMultiJoin("{to_Pfss_Rfx_t/pfss_rfx_Text}"),
						parameters: {
							expand: "to_Pfss_Rfx_t"
						},
					}, this.byId("idPfssRfxView"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("tokens", {
						path: this.createCurrentKey("/") + "/to_Invest",
						template: this.getTemplateForEInput("{to_Invest_t/invest_Text}", "{invest}"),
						parameters: {
							expand: "to_Invest_t"
						},
					}, this.byId("idInvest"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("items", {
						path: this.createCurrentKey("/") + "/to_Invest",
						template: this.getTemplateForEMultiJoin("{to_Invest_t/invest_Text}"),
						parameters: {
							expand: "to_Invest_t"
						},
					}, this.byId("idInvestTxt"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("tokens", {
						path: this.createCurrentKey("/") + "/to_CurrPurch",
						template: this.getTemplateForEInput("{to_CurrPurchHead/purch_name}", "{current_purch}"),
						parameters: {
							expand: "to_CurrPurchHead"
						},
					}, this.byId("idCurrent_purch"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("items", {
						path: this.createCurrentKey("/") + "/to_CurrPurch",
						template: this.getTemplateForEMultiJoin("{to_CurrPurchHead/purch_name}"),
						parameters: {
							expand: "to_CurrPurchHead"
						},
					}, this.byId("idCurrent_purchTxt"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("tokens", {
						path: this.createCurrentKey("/") + "/to_PurchBrunch",
						template: this.getTemplateForEInput("{to_OrgObject/ObjectText}", "{purch_for_brunch}"),
						parameters: {
							expand: "to_OrgObject"
						},
					}, this.byId("involvedOrganizations"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("items", {
						path: this.createCurrentKey("/") + "/to_PurchBrunch",
						template: this.getTemplateForEMultiJoin("{to_OrgObject/ObjectText}"),
						parameters: {
							expand: "to_OrgObject"
						},
					}, this.byId("involvedOrganizationsTxt"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("tokens", {
						path: this.createCurrentKey("/") + "/to_ProcComp",
						template: this.getTemplateForEInput("{to_OrgObject/ObjectText}", "{proc_comp}"),
						parameters: {
							expand: "to_OrgObject"
						},
					}, this.byId("branchesForDelegation"), bTabReload && !bIsReloaded);

					this.getPageController().rebindAggregation("items", {
						path: this.createCurrentKey("/") + "/to_ProcComp",
						template: this.getTemplateForEMultiJoin("{to_OrgObject/ObjectText}"),
						parameters: {
							expand: "to_OrgObject"
						},
					}, this.byId("branchesForDelegationTxt"), bTabReload && !bIsReloaded);

					const sPenaltiesControlId = this.getStateProperty("/_GET").Tab === 'RS' ? "penaltiesRS" : "penalties";
					const sNavPropForPenalties = this.getStateProperty("/_GET").Tab === 'RS' ? "/to_LimitPenalties" : "/to_Penalties";
					const sPenaltiesTxtControlId = this.getStateProperty("/_GET").Tab === 'RS' ? "penaltiesTxtRS" : "penaltiesTxt";

					this.getPageController().rebindAggregation("tokens", {
						path: this.createCurrentKey("/") + sNavPropForPenalties,
						template: this.getTemplateForEInput("{to_Penalties_t/penalties_Text}", "{penalties}"),
						parameters: {
							expand: "to_Penalties_t"
						},
					}, this.byId(sPenaltiesControlId), !bIsReloaded);

					this.getPageController().rebindAggregation("items", {
						path: this.createCurrentKey("/") + sNavPropForPenalties,
						template: this.getTemplateForEMultiJoin("{to_Penalties_t/penalties_Text}"),
						parameters: {
							expand: "to_Penalties_t"
						},
					}, this.byId(sPenaltiesTxtControlId), !bIsReloaded);

					this.makeElementBinding(!bTabReload || !!bIsReloaded || this.getStateProperty("/app/action") === "PL");
				} else {
					this.setStateProperty("/prevTabId", this.getPageController().getSelectedTabView().getId());
					this.doResolve();
				}

			}


		});

	// $.extend(true, thisController.prototype, QueryHelper, DialogHelper, EventsRSHelper, Document, EventsHelper);
	$.extend(true, thisController.prototype);
	return thisController;
});
