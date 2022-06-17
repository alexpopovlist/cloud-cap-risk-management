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
	const thisController = BaseController.extend("ns.customers.controller.tabs.Tender",
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


			}


		});

	// $.extend(true, thisController.prototype, QueryHelper, DialogHelper, EventsRSHelper, Document, EventsHelper);
	$.extend(true, thisController.prototype);
	return thisController;
});
