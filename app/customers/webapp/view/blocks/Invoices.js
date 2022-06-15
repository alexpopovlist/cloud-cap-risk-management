sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var tabBlock = BlockBase.extend("ns.customers.view.blocks.Invoices", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ns.customers.view.tabs.Invoices",
					type: "XML"
				},
				Expanded: {
					viewName: "ns.customers.view.tabs.Invoices",
					type: "XML"
				}
			}
		}
	});
	return tabBlock;
}, true);
