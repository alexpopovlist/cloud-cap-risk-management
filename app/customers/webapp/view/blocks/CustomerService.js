sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var tabBlock = BlockBase.extend("ns.customers.view.blocks.CustomerService", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "ns.customers.view.tabs.CustomerService",
					type: "XML"
				},
				Expanded: {
					viewName: "ns.customers.view.tabs.CustomerService",
					type: "XML"
				}
			}
		}
	});
	return tabBlock;
}, true);
